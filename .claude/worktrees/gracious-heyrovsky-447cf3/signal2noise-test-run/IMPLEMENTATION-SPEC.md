# signal2noise — Vercel Pipeline Implementation Spec

**For:** Claude Code build sessions
**Date:** May 13, 2026
**Repo:** ~/Projects/ensolabs-site (nycsav/ensolabs-site)
**Goal:** Consolidate signal2noise content engine into ensolabs-site on Vercel. Kill Firebase Hosting + Cloud Functions. Keep Firestore data as migration source only.

---

## Architecture Summary

Everything runs in the ensolabs-site Next.js 14 project on Vercel Pro:

- **Database:** Neon Postgres (free tier, via Vercel Marketplace)
- **Cron 1:** `/api/cron/generate-cards` — daily 6am ET, generates intelligence cards
- **Cron 2:** `/api/cron/publish-linkedin` — Mon/Wed/Fri 9am ET, posts to LinkedIn
- **OG Images:** `/api/og/[slug]` — dynamic branded card images via `@vercel/og`
- **Pages:** `/insights/[slug]` — dynamic insight pages from Postgres
- **Models:** Perplexity sonar (scan) + sonar-pro (enrich) + Claude Sonnet 4.6 (rewrite)

---

## 1. Database Schema (Neon Postgres)

### Install

Add Neon Postgres via Vercel Marketplace. Connection string auto-populates as `POSTGRES_URL` env var.

Install drizzle-orm for type-safe queries:
```bash
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

### Schema (drizzle)

```typescript
// lib/db/schema.ts
import { pgTable, text, timestamp, integer, boolean, jsonb, uuid } from 'drizzle-orm/pg-core';

export const cards = pgTable('cards', {
  id: uuid('id').primaryKey().defaultRandom(),
  
  // Content
  title: text('title').notNull(),
  summary: text('summary').notNull(),
  signals: text('signals').array().notNull(),        // key observations
  moves: text('moves').array().notNull(),             // actionable recommendations
  keyStat: text('key_stat'),                          // headline number for OG image
  
  // Classification — 3-layer taxonomy
  pillar: text('pillar').notNull(),                   // ai_strategy | brand_performance | competitive_intel | media_trends
  type: text('type').notNull().default('brief'),      // brief | hot_take | datapulse
  topics: text('topics').array().notNull().default([]), // AI Finance, Enterprise Agents, etc.
  entities: jsonb('entities').default({}),             // { companies: [], products: [], industries: [] }
  
  // Source tracking
  source: text('source'),                             // primary source name
  sourceUrl: text('source_url'),                      // primary source URL
  sourceTier: integer('source_tier'),                 // 1-5 per editorial framework
  allSources: jsonb('all_sources').default([]),       // [{ name, url, tier }]
  
  // Macro narrative mapping
  macroNarrative: text('macro_narrative'),            // implementation_gap | agent_economics | measurement_collapse | build_vs_buy
  
  // Publishing state
  priority: integer('priority').notNull().default(50),
  slug: text('slug').notNull().unique(),
  publishedAt: timestamp('published_at').notNull().defaultNow(),
  
  // LinkedIn publishing
  linkedinPosted: boolean('linkedin_posted').notNull().default(false),
  linkedinPostedAt: timestamp('linkedin_posted_at'),
  linkedinPostUrl: text('linkedin_post_url'),
  linkedinPostText: text('linkedin_post_text'),       // store the formatted post
  linkedinImageUrl: text('linkedin_image_url'),
  
  // Insights page publishing  
  insightPublished: boolean('insight_published').notNull().default(true),
  
  // Deduplication
  contentHash: text('content_hash'),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  cardId: uuid('card_id').references(() => cards.id),
  platform: text('platform').notNull(),               // linkedin | twitter | newsletter
  postText: text('post_text').notNull(),
  postUrl: text('post_url'),
  imageUrl: text('image_url'),
  postedAt: timestamp('posted_at').notNull().defaultNow(),
  hashtags: text('hashtags').array().default([]),
});
```

### Indexes

```sql
CREATE INDEX idx_cards_pillar ON cards(pillar);
CREATE INDEX idx_cards_published_at ON cards(published_at DESC);
CREATE INDEX idx_cards_linkedin_posted ON cards(linkedin_posted);
CREATE INDEX idx_cards_slug ON cards(slug);
CREATE INDEX idx_cards_topics ON cards USING GIN(topics);
CREATE INDEX idx_cards_content_hash ON cards(content_hash);
```

---

## 2. Vercel Cron Configuration

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/generate-cards",
      "schedule": "0 10 * * *"
    },
    {
      "path": "/api/cron/publish-linkedin",
      "schedule": "0 13 * * 1,3,5"
    }
  ]
}
```

Note: Vercel cron uses UTC. 10:00 UTC = 6:00 AM ET. 13:00 UTC = 9:00 AM ET.

Secure with CRON_SECRET env var:
```typescript
// lib/cron-auth.ts
export function verifyCronSecret(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}
```

---

## 3. Card Generation — `/api/cron/generate-cards`

### Route Handler

```typescript
// app/api/cron/generate-cards/route.ts
import { NextResponse } from 'next/server';
import { verifyCronSecret } from '@/lib/cron-auth';
import { generateCards } from '@/lib/signal2noise/generate';

export const maxDuration = 300; // 5 min max on Vercel Pro

export async function GET(request: Request) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const result = await generateCards();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Card generation failed:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
```

### Generation Logic

```typescript
// lib/signal2noise/generate.ts

// Step 1: RSS scan — pull from curated source list
// Step 2: Perplexity sonar scan — broad pillar queries (4 calls, ~$0.001 each)
// Step 3: Merge + rank + deduplicate against last 30 days in Postgres
// Step 4: Perplexity sonar-pro enrichment on top 5 stories (~$0.015 each)
// Step 5: Structure into cards with Claude Haiku 4.5 (~$0.002 each)
// Step 6: Auto-tag: pillar (from prompt), topics (Claude assigns 1-3), entities (Claude extracts)
// Step 7: Generate slug, content hash, priority score
// Step 8: Insert into Postgres

// Total per run: ~4 sonar + 5 sonar-pro + 5 Haiku = ~$0.10/day = ~$3/month
```

### RSS Source List

```typescript
// lib/signal2noise/sources.ts
export const RSS_SOURCES = [
  // Tier 1 — Premier Research
  { name: 'McKinsey', url: 'https://www.mckinsey.com/rss/insights', tier: 1, pillar: 'ai_strategy' },
  { name: 'BCG', url: 'https://www.bcg.com/rss.xml', tier: 1, pillar: 'ai_strategy' },
  
  // Tier 2 — Platform Research  
  { name: 'Anthropic', url: 'https://www.anthropic.com/rss.xml', tier: 2, pillar: 'ai_strategy' },
  { name: 'OpenAI', url: 'https://openai.com/blog/rss.xml', tier: 2, pillar: 'ai_strategy' },
  { name: 'Google AI', url: 'https://blog.google/technology/ai/rss/', tier: 2, pillar: 'ai_strategy' },
  
  // Tier 3 — Trade Publications
  { name: 'Digiday', url: 'https://digiday.com/feed/', tier: 3, pillar: 'media_trends' },
  { name: 'Ad Age', url: 'https://adage.com/feed', tier: 3, pillar: 'brand_performance' },
  { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', tier: 3, pillar: 'ai_strategy' },
  
  // Tier 4 — Data Providers
  { name: 'eMarketer', url: 'https://www.emarketer.com/rss', tier: 4, pillar: 'media_trends' },
  
  // Tier 5 — Emerging Signals
  { name: 'VentureBeat', url: 'https://venturebeat.com/feed/', tier: 5, pillar: 'competitive_intel' },
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', tier: 5, pillar: 'ai_strategy' },
  // ... expand to 15-20 sources
];
```

### Perplexity API Calls

```typescript
// lib/signal2noise/perplexity.ts

// Broad scan (sonar) — one per pillar
const scanPrompt = (pillar: string) => `
  What are the most significant developments in ${pillar} from the last 24 hours?
  Focus on enterprise implications for CMOs, agency owners, and CX leaders.
  Return: headline, one-sentence summary, primary source, key data point if available.
  Limit to top 3-5 stories. Skip anything without a concrete data point or named source.
`;

// Deep enrichment (sonar-pro) — one per top story
const enrichPrompt = (headline: string, summary: string) => `
  Research this story in depth: "${headline}" — ${summary}
  
  Return:
  1. Three additional data points from different sources
  2. The counter-argument or competing perspective
  3. Specific implications for: (a) CMOs at $50-500M companies, (b) agency owners, (c) CX leaders
  4. One concrete "your next move" action a marketing leader could take Monday
  
  Use search_recency_filter: day. Cite all sources.
`;
```

### Tagging Logic (Claude Haiku step)

```typescript
// Part of the Haiku structuring prompt:
const tagPrompt = `
  Classify this intelligence card:
  
  PILLAR (exactly one): ai_strategy | brand_performance | competitive_intel | media_trends
  
  TOPICS (1-3 from this list): AI Finance, Enterprise Agents, MCP / Tool Use, RAG / Retrieval, 
  AI Governance, Search / AEO, Attribution, AI Ops / MLOps, Creative AI, Retail Media, 
  Platform Shifts, AI Workforce, Data Privacy, Agent Economics, Build vs Buy
  If none fit, suggest a new topic (max 3 words).
  
  ENTITIES: Extract all named companies, products, and industries mentioned.
  
  MACRO NARRATIVE (exactly one): implementation_gap | agent_economics | measurement_collapse | build_vs_buy
  
  Return as JSON: { pillar, topics: [], entities: { companies: [], products: [], industries: [] }, macroNarrative }
`;
```

---

## 4. LinkedIn Publishing — `/api/cron/publish-linkedin`

### Route Handler

```typescript
// app/api/cron/publish-linkedin/route.ts
export const maxDuration = 120;

export async function GET(request: Request) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // 1. Query Postgres: highest priority card from last 7 days where linkedin_posted = false
  // 2. Pass card to Claude Sonnet 4.6 with editorial voice system prompt for LinkedIn rewrite
  // 3. Generate OG image URL: https://ensolabs.ai/api/og/{slug}
  // 4. Post to LinkedIn API (Community Management API, OAuth 2.0)
  // 5. Update card in Postgres: linkedin_posted = true, linkedin_posted_at, linkedin_post_url
  // 6. Insert into posts table for distribution tracking
}
```

### Sonnet Rewrite System Prompt

```typescript
const LINKEDIN_SYSTEM_PROMPT = `
You are the editorial voice of signal2noise, an AI intelligence publication by Enso Labs.

VOICE: Analytical, pragmatic, concise, direct, credible. Write as if briefing a busy CMO before a board meeting.

STRUCTURE:
1. Hook (first 2 lines, ~40 chars): Specific stat that creates tension. Teases insight below the fold.
2. Body (200-350 words): Layer 2-3 data sources with synthesis. Name implications for specific roles. Include 3-4 bullet points with metrics.
3. CTA: Tactical "Your next move" line + link to full analysis + question to drive comments.

FRAMING PATTERNS:
- Tension: "The [X]% Problem:", "Two Camps Are Emerging:", "The Window Is Closing On…"
- Implication: "What this means for CMOs is…", "For agency owners, the question is…"
- Action: "Your next move:", "Start here:", "The 3-step audit:"

ABSOLUTE RULES:
- No emojis (except one 📊 for CTA link if needed)
- No hashtag stuffing (max 4-5 relevant hashtags at end)
- No hype words: "revolutionary", "game-changing", "paradigm shift"
- No tagging 10+ people
- No vague recommendations ("consider evaluating")
- Every post must pass: Can a CMO act on this? Is there a clear next move? Can this be quoted in a board presentation?

MAP TOPICS TO HASHTAGS:
- AI Finance → #AIFinance
- Enterprise Agents → #EnterpriseAI #AgenticAI  
- MCP / Tool Use → #MCP #AITools
- AI Governance → #AIGovernance
- Agent Economics → #AgentEconomics
- (always include #EnsoLabs)

INPUT: You receive a structured intelligence card with title, summary, signals, moves, topics, entities, and macro narrative.
OUTPUT: A complete LinkedIn post ready to publish. No preamble, no "here's the post" — just the post text.
`;
```

### LinkedIn API Integration

```typescript
// lib/signal2noise/linkedin.ts
// Use LinkedIn Community Management API v2
// OAuth 2.0 with refresh token stored in env vars:
//   LINKEDIN_ACCESS_TOKEN
//   LINKEDIN_REFRESH_TOKEN  
//   LINKEDIN_PERSON_URN (urn:li:person:YOUR_ID)

// Post with image:
// 1. Register image upload → get uploadUrl
// 2. PUT image binary to uploadUrl
// 3. Create post with image asset URN

// Endpoint: https://api.linkedin.com/rest/posts
// Docs: https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api
```

---

## 5. OG Image Generation — `/api/og/[slug]`

```typescript
// app/api/og/[slug]/route.tsx
import { ImageResponse } from 'next/og';
import { db } from '@/lib/db';
import { cards } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

// Load Inter Tight font
const interTightBold = fetch(
  new URL('../../../public/fonts/InterTight-Bold.woff', import.meta.url)
).then((res) => res.arrayBuffer());

const interTight = fetch(
  new URL('../../../public/fonts/InterTight-Regular.woff', import.meta.url)
).then((res) => res.arrayBuffer());

const PILLAR_COLORS = {
  ai_strategy: '#7C60DD',
  brand_performance: '#378ADD',
  competitive_intel: '#D85A30',
  media_trends: '#1D9E75',
};

const PILLAR_LABELS = {
  ai_strategy: 'AI STRATEGY',
  brand_performance: 'BRAND PERFORMANCE',
  competitive_intel: 'COMPETITIVE INTEL',
  media_trends: 'MEDIA TRENDS',
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const [boldFont, regularFont] = await Promise.all([interTightBold, interTight]);
  
  const card = await db.select().from(cards).where(eq(cards.slug, params.slug)).limit(1);
  
  if (!card.length) {
    return new Response('Not found', { status: 404 });
  }

  const { title, pillar, keyStat, publishedAt } = card[0];
  const pillarColor = PILLAR_COLORS[pillar] || '#7C60DD';
  const pillarLabel = PILLAR_LABELS[pillar] || 'INTELLIGENCE';

  return new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630,
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#0d1321',
        padding: '48px 64px',
        fontFamily: 'Inter Tight',
      }}>
        {/* Teal accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, backgroundColor: '#5ce0d2' }} />
        
        {/* Teal chevron */}
        <svg width="14" height="36" viewBox="0 0 14 36" style={{ marginBottom: 24 }}>
          <polygon points="0,0 14,18 0,36" fill="#5ce0d2" />
        </svg>
        
        {/* Pillar badge */}
        <div style={{
          display: 'flex', alignItems: 'center',
          border: `1px solid ${pillarColor}`,
          borderRadius: 4, padding: '4px 12px',
          marginBottom: 20, alignSelf: 'flex-start',
        }}>
          <span style={{ color: pillarColor, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>
            {pillarLabel}
          </span>
        </div>
        
        {/* Title */}
        <div style={{
          color: '#ffffff', fontSize: 40, fontWeight: 700,
          lineHeight: 1.25, flex: 1, maxWidth: '90%',
        }}>
          {title}
        </div>
        
        {/* Date */}
        <div style={{ color: '#788098', fontSize: 14, marginBottom: 16 }}>
          {new Date(publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        
        {/* Divider */}
        <div style={{ width: '100%', height: 1, backgroundColor: '#283046', marginBottom: 16 }} />
        
        {/* Key stat */}
        {keyStat && (
          <div style={{ color: '#b4b9c3', fontSize: 15, marginBottom: 16 }}>
            {keyStat}
          </div>
        )}
        
        {/* Footer bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 46,
          backgroundColor: '#12192a', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 64px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#5ce0d2', fontSize: 13, fontWeight: 700 }}>signal2noise</span>
            <span style={{ color: '#788098', fontSize: 13 }}>· Powered by Enso Labs</span>
          </div>
          <span style={{ color: '#788098', fontSize: 13 }}>ensolabs.ai/insights</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter Tight', data: boldFont, weight: 700 },
        { name: 'Inter Tight', data: regularFont, weight: 400 },
      ],
    }
  );
}
```

---

## 6. Dynamic Insight Pages — `/insights/[slug]`

```typescript
// app/insights/[slug]/page.tsx
// Replace current hardcoded INSIGHTS array lookup with Postgres query

// generateStaticParams: query all card slugs for SSG
// generateMetadata: per-card OG image at /api/og/[slug], Article schema
// Page: render card content (summary, signals as bullet list, moves as action items)
// Keep existing hardcoded essays as "featured" insights above the dynamic feed
```

### Metadata

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const card = await getCardBySlug(params.slug);
  return {
    title: card.title,
    description: card.summary.slice(0, 160),
    alternates: { canonical: `/insights/${card.slug}` },
    openGraph: {
      title: card.title,
      description: card.summary.slice(0, 160),
      url: `/insights/${card.slug}`,
      images: [{ url: `https://ensolabs.ai/api/og/${card.slug}`, width: 1200, height: 630 }],
    },
  };
}
```

---

## 7. Environment Variables

Add to Vercel project settings:

```
# Database
POSTGRES_URL=            # Auto-set by Neon Marketplace integration

# Cron security
CRON_SECRET=             # openssl rand -base64 32

# Perplexity
PPLX_API_KEY=            # From Perplexity API settings

# Claude  
ANTHROPIC_API_KEY=       # From Anthropic console

# LinkedIn
LINKEDIN_ACCESS_TOKEN=   # OAuth 2.0 token
LINKEDIN_REFRESH_TOKEN=  # For auto-refresh
LINKEDIN_PERSON_URN=     # urn:li:person:YOUR_ID
```

---

## 8. Migration from Firebase

### Data migration (one-time)

```typescript
// scripts/migrate-firestore.ts
// 1. Read all discover_cards from Firestore
// 2. Map to new Postgres schema (add topics, entities, macroNarrative as empty/auto-tagged)
// 3. Generate slugs from titles
// 4. Insert into Neon Postgres
// 5. Verify count matches
```

### What to keep from PlannerAPI repo

- `docs/EDITORIAL_VOICE.md` → copy to `lib/signal2noise/editorial-voice.ts` as system prompt
- `docs/DAILY_INTEL_FRAMEWORK.md` → reference for card generation prompts
- `functions/src/utils/validateDiscoverCard.ts` → port to `lib/signal2noise/validate.ts`
- Deduplication logic → port to Postgres queries (simpler than Firestore)

### What to kill

- Firebase Hosting (signals.ensolabs.ai) → redirect to ensolabs.ai/insights OR sunset
- Firebase Cloud Functions (all 10+) → replaced by 2 Vercel cron routes
- Firestore (discover_cards collection) → replaced by Neon Postgres
- n8n workflow → replaced by /api/cron/publish-linkedin
- PlannerAPI frontend (React/Vite) → not needed, ensolabs.ai serves the pages

---

## 9. Build Order (for Claude Code sessions)

### Session 1: Database + Schema
1. Add Neon Postgres via Vercel Marketplace
2. Install drizzle-orm, create schema
3. Run migration to create tables
4. Migrate existing Firestore cards (optional, for history)

### Session 2: Card Generation
1. Create `/api/cron/generate-cards` route
2. Build RSS parser (`lib/signal2noise/rss.ts`)
3. Build Perplexity integration (`lib/signal2noise/perplexity.ts`)
4. Build card structuring with Haiku (`lib/signal2noise/structure.ts`)
5. Build tagging + dedup logic
6. Add vercel.json cron config
7. Test locally with `vercel dev`

### Session 3: OG Images + Insight Pages
1. Download Inter Tight .woff files to `public/fonts/`
2. Create `/api/og/[slug]` edge route
3. Update `/insights/[slug]` to query Postgres
4. Update `/insights` index to show dynamic cards alongside existing essays
5. Update `/feed.xml` to pull from Postgres

### Session 4: LinkedIn Publishing
1. Set up LinkedIn OAuth (Community Management API)
2. Create `/api/cron/publish-linkedin` route
3. Build Sonnet rewrite step with editorial voice prompt
4. Build LinkedIn API posting with image upload
5. Test with a single post (manual trigger)

### Session 5: Deploy + Verify
1. Push to master → Vercel deploys
2. Verify cron jobs fire correctly
3. Verify OG images render on social sharing
4. Verify insight pages are indexed (request in GSC)
5. Monitor first automated LinkedIn post
6. Set up signals.ensolabs.ai → ensolabs.ai/insights redirect

---

## 10. Monthly Cost Estimate

| Service | Cost | Notes |
|---------|------|-------|
| Vercel Pro | $20 | Already paying |
| Neon Postgres | $0 | Free tier (0.5 GB) |
| Perplexity API | ~$5 | From $50 Max credit |
| Claude API (Sonnet) | ~$1 | 12 posts × $0.05 + 150 Haiku calls × $0.002 |
| Claude API (Opus) | ~$1 | 2-4 flagship essays/month |
| **Total incremental** | **~$7/month** | Beyond existing subscriptions |
