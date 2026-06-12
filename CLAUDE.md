# Enso Labs — Unified Project Guide
## For Claude Cowork, Claude Code, and all AI tools

---

## Overview
Enso Labs is an AI transformation and agentic systems studio founded by Sav Banerjee. This project contains the studio website (ensolabs.ai). **Strategy to Ship** (formerly signal2noise; renamed June 2026, designed via Claude Design) is the studio's news-intelligence/publishing brand, published natively on the Insights page (ensolabs.ai/insights) — NOT a separate site.

> **DEPRECATED — DO NOT RESURRECT:** The standalone `signals.ensolabs.ai` domain, the PlannerAPI/Firebase deployment, and GA4 `G-CJ18GXXPMX` are permanently retired (May 2026). The news-intelligence engine lives only at ensolabs.ai/insights. Never link to, embed, or reference signals.ensolabs.ai anywhere.

## Quick Reference
- **Framework:** Next.js 14, App Router, TypeScript
- **Styling:** Custom CSS (globals.css), OKLCH color system
- **Deploy:** Push to master → Vercel auto-deploys
- **Domain:** ensolabs.ai
- **GitHub:** nycsav/ensolabs-site
- **GA4:** G-5N15QMQ962
- **Strategy to Ship:** news-intelligence/publishing brand (formerly signal2noise) published on ensolabs.ai/insights (standalone signals.ensolabs.ai DEPRECATED — see Overview)

## Deploy
```bash
git add -A && git commit -m "description" && git push origin master
# Vercel auto-deploys from GitHub. No manual deploy needed.
```

## Pages
- app/page.tsx — Home (hero, 3 pillars, proof metrics, signal2noise feed, methodology, clients, CTA)
- app/services/page.tsx — Services (3 tracks + 6 FAQs with schema)
- app/services/claude-managed-services/page.tsx — Claude Managed Services offering
- app/work/page.tsx — Work overview (4 case study cards)
- app/work/[slug]/page.tsx — Individual case studies with Article schema + ShareButtons
  - /work/gore — AI Market Intelligence Platform (Fortune 500 manufacturer — CONFIDENTIAL, never name the client)
  - /work/heller — AI Center of Excellence for Pharma
  - /work/trading-terminal — Enso Trading Terminal
  - /work/enterprise-ai — Enterprise AI Enablement
- app/insights/page.tsx — Insights (LIGHT/WARM theme) + signal2noise embed + articles
- app/insights/[slug]/page.tsx — Individual insight articles (11 articles)
- app/industries/financial-services/page.tsx — Financial Services vertical page
- app/about/page.tsx — Studio story + Sav bio (third person) + headshot
- app/contact/page.tsx — Contact form + address + social links
- app/built-with-ai/page.tsx — 24-hour build case study
- app/editorial-policy/page.tsx — Editorial and content policy

## Components
- components/Nav.tsx — Navigation with hamburger mobile menu (client component)
- components/Footer.tsx — Footer with AI attribution line
- components/ContactForm.tsx — Formspree-connected form (client component)
- components/ShareButtons.tsx — Copy link, LinkedIn, Twitter/X, Email sharing
- components/Analytics.tsx — GA4 with event tracking (client component)
- components/JsonLd.tsx — JSON-LD schema renderer
- components/NycClock.tsx — Real-time NYC clock display
- components/Arrow.tsx — Animated arrow/chevron element
- components/ThemeMount.tsx — Theme initialization on mount
- components/Reveal.tsx — Scroll-triggered reveal animations
- components/OgFrame.tsx — OG image frame component
- components/S2NLink.tsx — signal2noise link/embed component

## Key Libraries
- lib/schema.ts — All JSON-LD builders (Organization, Person, ProfessionalService, Product, FAQ, LocalBusiness, Article, Breadcrumb, WebSite, ContactPoint, Blog)
- lib/insights.ts — Insight articles data array (add new articles here)
- lib/site.ts — Site constants, metadata defaults, canonical URLs

## Styles
- app/globals.css — ALL styles including mobile overrides
- CRITICAL: Mobile fixes are INSIDE @media queries only. Never modify base CSS rules.
- Color system: OKLCH with teal accent (#5ce0d2), dark navy background (#0d1321)
- Typography: Inter Tight (display), JetBrains Mono (code/labels)

## Content Rules
- Studio language: always "we", never "I"
- Sav Banerjee in third person on About page
- "Get in Touch" CTA (not "Book a Discovery Call" or "Book intro call")
- Three pillars: AI Transformation | Agentic Systems | Financial AI
- No client names without explicit approval (the /work/gore case study client is CONFIDENTIAL — always use "Global Materials Manufacturer" or "Fortune 500 manufacturer", never the actual company name)
- Strategy to Ship brand rules: wordmark is "Strategy → Ship" (Lora serif), monogram is "S→S", the arrow glyph → is ALWAYS Ship Coral #F0512E (never recolored), lowercase handle "strategy → ship" allowed for social/URLs
- "Powered by Enso Labs" close on all Strategy to Ship content
- signal2noise is the historical name (always lowercase) — do NOT use it in new customer-facing work
- Canonical domains: ensolabs.ai (never www.ensolabs.ai or ensopartners.co)

## SEO / AEO / GEO
- 71 JSON-LD schema blocks across 13 pages (validated, 0 issues)
- Per-page unique OG tags with absolute URLs
- Dynamic OG images for case studies and insights (edge runtime)
- Static OG image at public/og-default.png (1200x630, puppeteer-generated)
- AEO definition-lead sentences on every page
- robots.ts allows: GPTBot, ClaudeBot, PerplexityBot, Applebot, Google-Extended, meta-externalagent
- MCP endpoint at /.well-known/mcp.json
- RSS feed at /feed.xml
- Sitemap at /sitemap.xml (25 URLs)
- FAQ schema on /services and /contact
- LocalBusiness schema on /contact (geo: 40.7362, -73.9903)

## Strategy to Ship (news-intelligence engine)
- The studio's news-intelligence/publishing brand — **formerly signal2noise** (renamed June 2026 via Claude Design).
- Lives natively on the Insights page (app/insights/page.tsx) — "Live Intelligence" section + curated essays. NO external iframe, NO separate domain.
- Referenced on Home page in the Live Intelligence section (links to /insights)
- Standalone signals.ensolabs.ai + PlannerAPI/Firebase deployment are DEPRECATED and must not be referenced or redeployed
- Note: "Strategy to Ship." is ALSO the Enso Labs studio tagline in lib/site.ts — the brand and the tagline intentionally share the name (tagline turned into a product).

### Strategy to Ship brand system (locked — read before designing)
- Authoritative files (4 locked sources + kickoff prompt):
  - STRATEGY_TO_SHIP_DESIGN_KICKOFF.md — paste-in design kickoff prompt
  - strategy-to-ship-design-system.md — brand brief + principles ("Warm Signal")
  - brand/strategy-to-ship/tokens.css — color/type/spacing tokens
  - brand/strategy-to-ship/style-guide.html — living visual guideline
  - brand/strategy-to-ship/wordmark.svg, og-dark.png, og-light.png — reference assets
- Palette: Paper #F7F1E6 · Ink #1E1813 · Ship Coral #F0512E (THE signal — arrow, stamps, ~5-10% max) · Ledger Amber #E0A23C; Enso Teal #5CE0D2 ONLY for "from Enso Labs" links
- Type: Lora (headlines) · Inter Tight (body/UI) · JetBrains Mono (kickers, datelines, version tags)

## Content Distribution Flow

## Brand Assets
- Logo SVG: public/images/logo-white.svg (teal chevron #5ce0d2, white wordmark)
- Headshot: public/images/sav-banerjee.jpg
- OG image: public/og-default.png (puppeteer-generated, 1200x630)
- Favicon: public/favicon.svg, favicon.ico, favicon-16x16.png, favicon-32x32.png
- Apple touch icon: public/apple-touch-icon.png

## Contact Info
- Address: 31 Union Square West, 6th Floor, New York, NY 10003
- Email: sav@ensopartners.co
- LinkedIn (personal): linkedin.com/in/savbanerjee
- LinkedIn (company): linkedin.com/company/enso-partners
- GitHub: github.com/nycsav

## Analytics
- GA4: G-5N15QMQ962 (ensolabs.ai — single property)
- Vercel Analytics: enable in dashboard
- Event tracking: form_submit, share clicks, signal2noise feed clicks
- (G-CJ18GXXPMX for signals.ensolabs.ai is RETIRED)

## Weekly Maintenance Tasks
- [ ] Verify the signal2noise / Live Intelligence section on /insights is current
- [ ] Check all pages load (6 main + 4 case studies + insights)
- [ ] Review GA4 traffic for patterns
- [ ] Draft 3 LinkedIn posts (Mon/Wed/Fri)
- [ ] Check mobile responsiveness on phone
- [ ] Update insight articles with new content if needed
- [ ] Check OG image previews when sharing links

## AI Attribution (footer)
"Designed with Claude Design · Built with Claude Code · Intelligence by signal2noise · Human-in-the-loop: Sav Banerjee"

## Built With
- Strategy & Research: Claude Chat (Opus 4.6)
- Visual Prototyping: Claude Design
- Production Code: Claude Code
- Content Intelligence: signal2noise (PlannerAPI)
- Browser Automation: Claude in Chrome
- File Operations: Desktop Commander
- Deployment: Vercel (auto-deploy from GitHub)
- DNS: GoDaddy
- Analytics: GA4

## Session Log — May 7-8, 2026
### Completed
- Google Search Console verified for ensolabs.ai
- Sitemap submitted: https://ensolabs.ai/sitemap.xml (22 URLs)
- Old Wix URL removals requested for www.ensolabs.ai/*
- Home page indexing requested in GSC
- IndexNow submitted (13 URLs, 202 Accepted)
- Old Wix ensolabs.ai site unpublished
- Old Wix ensopartners.co site unpublished
- Vercel redirect configured: ensopartners.co → ensolabs.ai (308)
- All 15 pages live (including built-with-ai, financial-services, editorial-policy, claude-managed-services)
- All 12 SEO files live (llms.txt, security.txt, IndexNow, MCP endpoint, etc.)
- Entity disambiguation schemas (foundingDate 2020, sameAs, knowsAbout)
- OG image branded and working in iMessage/social sharing
- GA4 connected (G-5N15QMQ962)
- GitHub portfolio — 5 public repos with professional READMEs
- Resume updated (Sav_Banerjee_Resume_2026_FINAL.docx in Google Drive)
- Perplexity job tracker master prompt saved to Google Drive
### Pending (immediate)
- Renew ensolabs.ai domain at GoDaddy (expires June 5, 2026)
- LinkedIn profile update (copy ready in Google Drive)
- signal2noise SEO fixes (PlannerAPI repo)
### Pending (backlog — not yet started)
- Create /services/agentic-ai-consulting page
- Create /services/claude-agent-development page
- Create /locations/new-york page
- Create /about/sav-banerjee deep bio page
- Create /comparisons/boutique-vs-big-4 page
- Fix signal2noise canonical URLs, OG image, robots.txt, sitemap

## Session Log — May 16, 2026
### Completed
- Notion Developer Platform Hackathon prep (May 16-17, Notion HQ SF)
- signal2noise-notion-hackathon repo created (github.com/nycsav/signal2noise-notion-hackathon)
- askSignal2Noise agent tool built for Notion Workers (Perplexity + Claude pipeline)
- ensolabs-site .gitignore cleaned — resumes, cover letters, personal files excluded
- Notion workspace updated — signal2noise HQ page polished with architecture, links, status
- CLAUDE.md synced — added missing pages, components, libraries
### Active
- Notion Hackathon build (May 16-17): porting signal2noise to Notion Developer Platform
- Worker deployment: askSignal2Noise tool + database sync pending first successful deploy
## Two Workflows
### Workflow 1: ensolabs.ai Website
- Daily/weekly content, SEO, AEO, GEO updates via Cowork
- Major features via Claude Code
- Analytics review Monday mornings
- New insight articles 2-4x per month
### Workflow 2: Strategy to Ship Content Engine (formerly signal2noise)
- Daily signal generation published on ensolabs.ai/insights (the engine's only home)
- Content flows to: ensolabs.ai/insights, LinkedIn (Mon/Wed/Fri), newsletter
- No separate deploy — ships with the main site via Vercel auto-deploy
