# Enso Labs — Unified Project Guide
## For Claude Cowork, Claude Code, and all AI tools

---

## Overview
Enso Labs is an AI transformation and agentic systems studio founded by Sav Banerjee. This project contains the studio website (ensolabs.ai). **Strategy to Ship** (formerly signal2noise; renamed June 2026, designed via Claude Design) is the studio's news-intelligence/publishing brand, published natively on the Insights page (ensolabs.ai/insights) — NOT a separate site.

> **DEPRECATED — DO NOT RESURRECT:** The standalone `signals.ensolabs.ai` domain, the PlannerAPI/Firebase deployment, and GA4 `G-CJ18GXXPMX` are permanently retired (May 2026). The news-intelligence engine lives only at ensolabs.ai/insights. Never link to, embed, or reference signals.ensolabs.ai anywhere.

## Operating mode — how to work with Sav
Sav is the creative director; the AI tools are the developers. Sav's time is scarce
(frequent travel/events). Optimize for throughput.
- Do NOT ask clarifying questions when a reasonable default exists. Decide, act, and
  state the assumption in one line. Ask ONE pointed question only when a choice is truly
  irreversible or the intent is genuinely ambiguous.
- Always respond with the next actionable step, executed — not a plan handed back for approval.
- Never push to master directly. Ship as a branch + PR. Routine content handoffs
  auto-merge on a green Vercel check (a broken build never merges); config/brand-critical
  diffs (`CLAUDE.md`, `.claude/`, `globals.css`, schema, `next.config`, `package.json`,
  `vercel.json`) are held for Sav's review.

## Quick Reference
- **Framework:** Next.js 14, App Router, TypeScript
- **Styling:** Custom CSS (globals.css), OKLCH color system
- **Deploy:** Push to master → Vercel auto-deploys
- **Domain:** ensolabs.ai
- **GitHub:** nycsav/ensolabs-site
- **GA4:** G-5N15QMQ962
- **Strategy to Ship:** news-intelligence/publishing brand published on ensolabs.ai/insights (standalone signals.ensolabs.ai DEPRECATED — see Overview)

## Design → Code Handoff (the one-line loop)
Designs from Claude Design reach production via committed handoff files — no re-pasting,
no re-deriving branch/build/PR mechanics.

- Handoffs live in `handoffs/<slug>.md` (versioned). Executed ones move to `handoffs/shipped/`.
- Run in Claude Code: `/ship-handoff <slug>` (or `/ship-handoff` for the newest handoff).
  It branches `design/<slug>` off master, applies the spec, runs `npm run build`, pushes,
  opens a PR, and **auto-merges on green** for routine handoffs (Vercel check passes →
  GitHub squash-merges → live). Protected-path diffs are withheld for Sav's review.
  Green-gated auto-merge is configured once via `AUTOMERGE-SETUP.md`.
- Mechanics are codified in `.claude/scripts/ship-handoff.sh` (branch + PR; reuses the
  sandbox-safe rules from `safe-deploy.sh`: no `git rm`, rename stale locks). `safe-deploy.sh`
  still handles the daily SEO engine's direct-to-master pushes.
- Recurring brand assets are committed under `public/` (stable paths), not fetched from
  expiring URLs. One-off assets are downloaded into `public/` by the handoff before editing.
- Plain-English guide: `.claude/README-design-handoff.md`. New handoff template: `handoffs/_TEMPLATE.md`.
- Definition of "live" = an EXTERNAL fetch is clean, not deploy-status. After any content
  change, purge the CDN/edge cache for the changed route(s) and verify with
  `curl -s https://ensolabs.ai<route>` (no browser, no auth). Confirm the raw HTML contains
  the new copy and NOT the old. "Vercel READY" and "source is correct" are necessary but
  NOT sufficient — statically-generated routes are edge-cached and a redeploy alone may not
  purge them for outside visitors. Content routes that change should set a sane
  `export const revalidate` (e.g. 300) so a stale edge copy self-heals within minutes.

## Deploy
```bash
git add -A && git commit -m "description" && git push origin master
# Vercel auto-deploys from GitHub. No manual deploy needed.
```

## Pages
- app/page.tsx — Home (hero, 3 pillars, proof metrics, Strategy to Ship feed, methodology, clients, CTA)
- app/services/page.tsx — Services (4 tracks + 6 FAQs with schema)
- app/services/claude-managed-services/page.tsx — Claude Managed Services offering
- app/services/ai-growth-marketing/page.tsx — AI Growth & Commercial Systems (Commercial/Growth Core — the Madison Avenue engine; agentic go-to-market, segmentation, brand governance, campaign optimization)
- app/work/page.tsx — Work overview (4 case study cards)
- app/work/[slug]/page.tsx — Individual case studies with Article schema + ShareButtons
  - /work/gore — AI Market Intelligence Platform (Fortune 500 manufacturer — CONFIDENTIAL, never name the client)
  - /work/heller — AI Center of Excellence for Pharma
  - /work/trading-terminal — Enso Trading Terminal
  - /work/enterprise-ai — Enterprise AI Enablement
- app/insights/page.tsx — Insights (LIGHT/WARM theme) + Strategy to Ship embed + articles
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
- components/S2NLink.tsx — Strategy to Ship link/embed component

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
- FAQ schema on /services, /contact, home, and insight articles (auto-renders when an insight has a `faqs` array)
- LocalBusiness schema on /contact (geo: 40.7362, -73.9903)

### Priority Content to Surface (SEO / AEO / GEO — keep current)
Standing rule for every SEO/AEO/GEO scan (daily engine + any manual pass): **surface ALL current content, don't rely on a hardcoded list.** New Insights ship often — auto-discover them, don't wait to be told.
- **Full-scan directive:** each run, enumerate EVERY article in `lib/insights.ts` (not just a fixed priority set) and confirm each has: FAQ schema (a `faqs` array → auto-renders FAQPage JSON-LD + visible block), Article + Breadcrumb schema, `dateModified` fresh, OG tags (hex only, never oklch), an answer-lead first sentence, and ≥2 internal links (ideally /services + /contact). Fix gaps in place.
- **New content propagates automatically to:** the home "Live Intelligence" feed (`LATEST` = 3 newest insights by date, `app/page.tsx`), `public/llms.txt` (Insights list + Recent Coverage), `sitemap.ts`, and `feed.xml`. On every scan verify the newest pieces actually appear in llms.txt (both the Insights list AND Recent Coverage) and add them if missing.
- **Positioning (evolved 2026-07-10):** the studio now leads with **Agentic Managed Services** — we encode domain expertise into **managed agents** and operate them; productized IP = "Cores" (working name, not final). The **Commercial/Growth Core** (`/services/ai-growth-marketing`) is the Madison Avenue engine — growth marketing / marketing engineering / GTM engineering reframed as "a 15-year craft, built as agents." Keep this angle across home + services + llms.txt; do NOT revert to the old "shipped AI products / decision intelligence" framing. (Home H1 still "Strategy to Ship." — swap to "Managed services. Managed agents." pending Sav's explicit call.)
- **Marquee pieces to keep maximally discoverable (verify each scan):**
  - Perplexity Implementation Partnership — `/insights/enso-labs-perplexity-implementation-partner` (also a home FAQ + llms.txt Partnerships/Services/Recent Coverage). Keywords: Perplexity Computer, Implementation Partner, Perplexity Implementation Partners Program.
  - Claude Managed Agents (Strategy to Ship) — `/insights/claude-managed-agents-strategy-to-ship`. Keywords: Claude Managed Agents, outcomes, dreaming, multiagent orchestration, agentic AI.
  - Google I/O 2026 Part 1 (Hackathon) — `/insights/google-io-hackathon-managed-agents-omni-antigravity`
  - Google I/O 2026 Part 2 (After-Hours) — `/insights/google-io-after-hours-deepmind-strategy-signal`
  - AI Growth & Commercial Systems — `/services/ai-growth-marketing` (Commercial/Growth Core, the Madison Avenue engine). Keywords: agentic marketing, marketing engineering, GTM engineering, brand governance agents, AI growth marketing NYC, agentic go-to-market.
- **When adding a NEW marquee piece:** add its slug to this list, ensure a `faqs` array exists on the article, and add a one-line Recent Coverage entry in `public/llms.txt`.

## Strategy to Ship (news-intelligence engine)
- The studio's news-intelligence/publishing brand — renamed June 2026 via Claude Design.
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
- LinkedIn (company): linkedin.com/company/ensopartners-labs
- GitHub: github.com/nycsav

## Analytics
- GA4: G-5N15QMQ962 (ensolabs.ai — single property)
- Vercel Analytics: enable in dashboard
- Event tracking: form_submit, share clicks, Strategy to Ship feed clicks (GA event_category "Strategy to Ship")
- (G-CJ18GXXPMX for signals.ensolabs.ai is RETIRED)

## Weekly Maintenance Tasks
- [ ] Verify the Strategy to Ship / Live Intelligence section on /insights is current
- [ ] Check all pages load (6 main + 4 case studies + insights)
- [ ] Review GA4 traffic for patterns
- [ ] Draft 3 LinkedIn posts (Mon/Wed/Fri)
- [ ] Check mobile responsiveness on phone
- [ ] Update insight articles with new content if needed
- [ ] Check OG image previews when sharing links

## AI Attribution (footer)
"Designed with Claude Design · Built with Claude Code · Intelligence by Strategy → Ship · Human-in-the-loop: Sav Banerjee" (the → arrow renders in Ship Coral #F0512E)

## Built With
- Strategy & Research: Claude Chat (Opus 4.6)
- Visual Prototyping: Claude Design
- Production Code: Claude Code
- Content Intelligence: Strategy to Ship (PlannerAPI)
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
- Strategy to Ship SEO fixes (PlannerAPI repo)
### Pending (backlog — not yet started)
- Create /services/agentic-ai-consulting page
- Create /services/claude-agent-development page
- Create /locations/new-york page
- Create /about/sav-banerjee deep bio page
- Create /comparisons/boutique-vs-big-4 page
- Fix Strategy to Ship canonical URLs, OG image, robots.txt, sitemap

## Session Log — May 16, 2026
### Completed
- Notion Developer Platform Hackathon prep (May 16-17, Notion HQ SF)
- signal2noise-notion-hackathon repo created (github.com/nycsav/signal2noise-notion-hackathon)
- askSignal2Noise agent tool built for Notion Workers (Perplexity + Claude pipeline)
- ensolabs-site .gitignore cleaned — resumes, cover letters, personal files excluded
- Notion workspace updated — Strategy to Ship HQ page polished with architecture, links, status
- CLAUDE.md synced — added missing pages, components, libraries
### Active
- Notion Hackathon build (May 16-17): porting Strategy to Ship to Notion Developer Platform
- Worker deployment: askSignal2Noise tool + database sync pending first successful deploy
## Two Workflows
### Workflow 1: ensolabs.ai Website
- Daily/weekly content, SEO, AEO, GEO updates via Cowork
- Major features via Claude Code
- Analytics review Monday mornings
- New insight articles 2-4x per month
### Workflow 2: Strategy to Ship Content Engine
- Daily signal generation published on ensolabs.ai/insights (the engine's only home)
- Content flows to: ensolabs.ai/insights, LinkedIn (Mon/Wed/Fri), newsletter
- No separate deploy — ships with the main site via Vercel auto-deploy

## Event Scan — Standing Preferences (set 2026-07-06)
Applies to `daily-event-scan`, `weekly-event-board-sweep`, `hackathon-radar-weekly`, and ANY event/digest deliverable or ad-hoc event answer.
- **Sources:** Luma, Bond AI SF (luma.com/genai-sf), and Cerebral Valley SF are the primary crawl set while in SF. **Eventbrite is REMOVED — do not scan it.**
- **SF FOCUS WINDOW: Jul 7 → Aug 7, 2026.** Sav is physically in San Francisco; scan SF-proper events only, present all times in **PT**, suppress NYC. (Extends the earlier Aug 3 end date to **Aug 7**. Revert to the NYC scan and delete SF-mode blocks after Aug 7.)
- **The bar (what to surface):** (1) frontier-lab / marquee-builder events AND (2) workshops that **build on Sav's existing career skills & professional goals** — agent engineering, evals, AI strategy/positioning, GTM, frontier research. A strong skill-building workshop qualifies even if it is not frontier-hosted.
- **Sav is male (he/him) — NEVER surface women-only / women-in-tech events** (e.g., "Women in AI Breakfast + Panel", women-founder-only dinners/rooms). Exclude them from every scan, digest, table, and ad-hoc recommendation, across all scheduled tasks AND Claude chats. Do not re-surface. (Set 2026-07-10.)
- **Register → Google Calendar (EVERY registration, standing rule set 2026-07-10):** whenever Claude registers/RSVPs Sav for ANY event — ad-hoc chat request OR scheduled task — immediately add it to Google Calendar via `enso-google` (check first, NEVER duplicate). Color by Enso Fit v2 (🟢 green 8+, 🟡 yellow 6–7.5, ⚪ gray ≤5/pending/waitlist); put 📍location · 🔗link · ⭐score + one-line why in the event. Confirmed/approved → normal color; pending host approval or waitlist → gray ⏳ hold; a PAID event not yet paid → gray ⏳ hold labeled "payment pending" until Sav pays, then promote to its score color. The daily `daily-event-scan` (JOB 1) remains the calendar's steady-state owner and will reconcile, so match its format and dedupe.
- **Rolling 4-week all-events visibility (standing rule — set 2026-07-13 per Sav):** the calendar must show EVERY registered event — both ✅ approved/confirmed AND ⏳ pending/waitlist — across all workstreams for the next ~4 weeks, so Sav has complete visibility of his work days and weeks at a glance. `daily-event-scan` (JOB 1) keeps this current: on each run, reconcile the inbox's registered events (pending + approved) against the calendar and add any missing, color-coded by status (🟢 approved 8+, 🟡 6–7.5, ⚪/gray ⏳ pending·waitlist·payment-pending), never duplicating. Promote ⏳ → score color the moment an approval email lands. Keep a human-readable mirror in the deliverables file **`Professional: Jobs & Resumes/SF-Events-Master-4Week.md`** (mobile-first table, grouped by week, with conflict calls) and refresh it whenever the set materially changes.
- **NOTE — separate "work-tracking" Google Calendar:** Claude's Google tools can create/update/delete calendar *events* but CANNOT create a brand-new Google Calendar (no `calendars.insert` exposed). To get a dedicated workstream-tracking calendar, Sav must create it in Google Calendar and share edit access, then Claude will populate/maintain it; otherwise workstream events live on the primary calendar with the color/status convention above.
- **VERIFY registration AND payment in BOTH the inbox AND the Luma account before asserting status (standing rule — set 2026-07-11; "we cannot afford to make mistakes").** Never label an event registered/unregistered/paid/unpaid/pending from the calendar or from memory alone — confirm against the actual Luma "Registration confirmed" + ticket/payment email (ticket type, amount, card last-4, date) AND, when any doubt remains, the Luma account "My Ticket" page. Only after that verification do you set the calendar color/status. **AGI Summit 2026 (Jul 18–19, Palace of Fine Arts) is PAID + CONFIRMED — $254.15 on Jul 8 2026 (code MELLY 15% off, card ···2002); it is GREEN/✅ on the calendar. Do NOT re-flag it "payment pending."** Applies to every scan, digest, frontier alert, and ad-hoc answer.
- **MANDATORY TL;DR TABLE — every deliverable and every response.** Lead with a one-line TL;DR, then a clean table. Columns, in this exact order: **Date | Time (PT) | Event | Score | Rationale to attend** (add a Link column when surfacing RSVPs). One tight, complete sentence per rationale cell. Mobile-first: short lines, no bullet stacks where a table works, no walls of text. Sav reads these on his phone while traveling — optimize for a 10-second scan.

## Scheduled Task Rules
### No event drafts in Gmail (standing rule — set 2026-07-05)
- Event/digest/briefing scheduled tasks must deliver IN-APP ONLY — the Cowork run output + the in-app completion notification are the ping. NEVER create Gmail drafts or self-emails (to sav@ensopartners.co) for event scans, digests, frontier alerts, or SF-prep briefings. Self-notification drafts were clogging the Drafts folder.
- Applies to: `daily-event-scan` (Job 2 frontier alert + Job 3 morning digest), `sf-high-frontier-prep` (daily briefing), and any future event/monitor task. Patched 2026-07-05.
- Exceptions (still allowed): (1) `weekly-event-board-sweep` may create genuine follow-up OUTREACH drafts (relationship engine) — those are intentional, not daily self-notifications; (2) `ai-platforms-partnerships-monitor` review-only reply drafts for real partner emails. Neither should produce daily event-digest self-drafts.
- Hard line for ALL scheduled tasks: never SEND to third parties, never auto-register, never buy. Deliver reports in the Cowork output; only create a Gmail draft when the task explicitly exists to prepare an outreach/reply draft for Sav to review.

### Keep inboxes & folders as clean as possible (standing rule — set 2026-07-05)
- Default to tidy: don't leave automated self-notification drafts, duplicate files, or stray artifacts behind. Deliver in-app; if a task must write, write to its canonical file/location, not a new scratch copy.
- Gmail Drafts: no self-addressed automated drafts (event digests, briefings, radar alerts, canaries). If any accumulate, trash them. Exceptions that MAY stay: genuine outreach/reply drafts Sav asked for, and the intentional labeled deliverables (`daily-ai-terms-lesson` "AI terms" copies, `signal2noise`/`wins-to-profiles` "[S2N]" LinkedIn drafts) — leave those unless Sav says otherwise.
- Inbox: keep it filed — `events-inbox-filer` labels/archives events; other monitors label + archive informational mail and keep only true action items visible.
- **Inbox = a "needs my attention" queue — file emails only once processed (standing rule — set 2026-07-13 per Sav).** An email is moved out of the inbox into its **specific respective folder** (topic-appropriate label — Events for event mail, Heller for Heller, Job Applications for jobs, AI Tools & Platforms for platform mail, etc.) ONLY when BOTH are true: (1) Sav has **engaged with it** — he has read it, and/or it has been discussed in a Claude session here — AND (2) there is **no outstanding task** on it. Unread or still-actionable mail STAYS in the inbox. Nothing is ever deleted — move + archive only (archive = remove the `INBOX` label; the message stays under its folder label, fully searchable).
  - **In live Claude chat sessions:** after Sav reads/discusses specific emails and nothing is left to do, Claude files those exact emails to their respective folders at the end of the exchange.
  - **In the scheduled `events-inbox-filer` (4x/day, 8a/1p/6p/9p ET):** a cron can't see Sav's chats, so it uses **`is:read` as the proxy for "processed."** It files ONLY event emails that are already READ **and** have no outstanding action (confirmations, reminders, recaps, digests, read pending/waitlist/update/cancellation notices — the host acts on those, not Sav). It LEAVES in the inbox: any UNREAD event email, and any read one still needing Sav to act (a person's 1:1 invite awaiting his yes/no, a payment step, or a message needing a reply). Never touch client/job/billing/personal/bot mail. Tool: `mcp__enso-google__gmail_modify_labels(message_id, add_label_ids=["<folder label id>"], remove_label_ids=["INBOX"])`.
- When cleaning is ambiguous (could delete something Sav wants), verify contents first, clear the clearly-automated clutter, and flag the rest for a quick yes/no rather than guessing.
- Cleanup done 2026-07-05: trashed 8 stale event self-notification drafts (SF-prep briefings + daily event digests + frontier radar alerts, Jun 30–Jul 3).

### Every email carries the signature — UNIVERSAL (standing rule — set 2026-07-05, scope-confirmed 2026-07-06)
- **EVERY email out of the account carries the signature — no exceptions by task, recipient, or type.** Enso Labs and Enso Partners are the SAME account (sav@ensopartners.co, which also receives sav@ensolabs.ai). Clients, partners, events, vendors, internal, cold outreach — new threads AND replies — all get it. Whenever any email or Gmail draft is composed (by any scheduled task, any skill, or an ad-hoc request), it MUST include the signature.
- **Why it was missing:** Gmail's saved signature is applied by the Gmail **web UI only**. Every draft/email created through the Gmail **API** — how all automation composes mail — is built WITHOUT it. So it must be appended EXPLICITLY every time; it will never appear on its own.
- **How:** always pass BOTH `htmlBody` (the clean-anchor HTML block) and `body` (plain-text fallback, no `http://` prefixes). Never end an email on the message body with no sign-off.
- **Source of truth — ONE place:** `/Users/savbanerjee/Projects/ensolabs-site/EMAIL_SIGNATURE.md`, verified against Sav's live "Enso Labs Jul" Gmail signature (2026-07-06). If the signature changes, edit only that file.
- **This rule OVERRIDES any older inline sign-off baked into an individual task prompt** (e.g. an `sign "Sav / Enso Labs / sav@ensolabs.ai"` line in `ai-platforms-partnerships-monitor` step 8) — use the canonical block instead. Do NOT hardcode the signature into task prompts; every task reads this rule + the file at runtime, so it applies everywhere automatically without editing each task.
- **Only true non-exception:** a block of social-post COPY meant for Sav to paste into LinkedIn (the `signal2noise`/`wins-to-profiles` "[S2N]" post text) is pasted content, not an email being sent — don't inject the email signature INTO the post copy itself.
- This does NOT instruct tasks to start emailing. The in-app-only / no-self-notification-drafts rules stand; this only governs mail that IS composed.

## Automation Program — Zero-Touch Operations (set 2026-07-06)
**Goal:** cut Sav's daily manual work (the daily Google reconnect + per-run permission clicks) so scheduled tasks run themselves. Claude is the command center across Cowork, Claude Code, and the connector stack — it tracks this and keeps it healthy.

### A. What ALREADY runs without asking Sav (standing authorities — permission-free)
- **Connector auto-heal** (granted 2026-07-05): `mcp-infrastructure-health-check` auto-fixes/keeps every connector up — retries with backoff, resets Desktop Commander config drift, recreates missing Chrome tab groups — silently, no permission, every 6:45 AM.
- **Enso Labs site blockers** (granted 2026-06-03): autonomously fix deploy / GSC / sitemap / indexing blockers; report-and-notify, don't ask first.
- **Free-event auto-register** (2026-06-25): sign Sav up for FREE events via the browser; hard-stop at payment / account creation / CAPTCHA / wallet.
- **Every enabled scheduled task** already fires non-interactively on its cron — it does NOT need a per-run click today.

### B. The daily Google-login problem — the real fix (enso-google)
- **Root cause:** the BUILT-IN Google connector's OAuth login expires ~daily (known Cowork bug) → forces a manual reconnect.
- **Permanent fix, already built + live:** self-hosted **enso-google** MCP (Sav's own Google Cloud OAuth app, Internal / In-Production) → **non-expiring refresh token**, never needs re-auth. Probed GREEN 2026-07-06.
- **Connector routing rule (so tasks stop breaking on the daily drop):**
  - CALENDAR read + create/update → use **enso-google** first (full CRUD, never expires).
  - GMAIL read (search + read message) → use **enso-google** first (never expires).
  - GMAIL write (create draft, apply label) → still needs the **built-in** Gmail connector (enso-google is read-only for mail). These few write-steps are the ONLY ones a Google drop can still block.
- **Part D — repoint (next concrete step):** move every calendar + Gmail-read scheduled task onto enso-google via `update_scheduled_task`; keep only Gmail-draft/label steps on the built-in connector. Do this per-task, never a blind flip of an autonomous writer (see the "don't flip autonomous tasks without asking" rule).

### C. The TWO things automation still CANNOT remove (honest hard limits)
1. **Keep the Claude desktop app open + logged in.** Scheduled tasks only fire while the app is running; no automation can hold it open for you. Leave it open overnight.
2. **The one-time Google OAuth consent click**, and only IF the built-in connector is needed for a Gmail WRITE and it has dropped. An agent cannot type Google credentials or click a consent screen (security boundary). enso-google avoids this for all reads + calendar; only Gmail-write steps can still hit it.
- **Unchanged by design, for safety:** sending mail to third parties, purchases, deleting data, granting new OAuth/permissions, and changing account settings ALWAYS need Sav's explicit go. "Act mode" speeds the safe, reversible work — it does not remove these guardrails.

### D. Command-center tracking
- Daily 6:45 AM `mcp-infrastructure-health-check` is the watchdog: canary → auto-heal → uptime log (`~/Documents/Claude/connector-uptime-log.md`) → report (`~/Documents/Claude/MCP-Health-Report.md`). Review the uptime streak weekly to confirm the daily drop is gone.
- This section is the source of truth for the automation model; update it here (one place), don't hardcode routing into individual task prompts.
