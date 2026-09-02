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
- Static OG image at public/og-default.png (1200x630, puppeteer-generated) — this is the navy "Strategy → Ship" card and is the SITE default ONLY (homepage / non-article pages). It must NEVER be what an insight article link renders.
- **OG per-article standing rule (set 2026-08-19 — the "Strategy → Ship image shows on every article" fix):** every insight MUST ship with a per-slug OG at `public/og/og-<slug>.png` (1200×630). `app/insights/[slug]/page.tsx` auto-wires og:image + twitter:image to that path, so the tags are already correct. The bug people reported was NOT a tag bug — it was **LinkedIn caching `og-default` from a first share that happened before the per-slug OG existed.** THE FIX, mandatory for EVERY article: the moment it is live and BEFORE its first LinkedIn share, run the URL through **LinkedIn Post Inspector** (`https://www.linkedin.com/post-inspector/inspect/<url-encoded-url>`) to force LinkedIn to (re)cache the correct per-slug OG. This is the only reliable cache-bust and it fixes desktop AND mobile shares. For a photo-led OG (e.g. the Berkeley Campanile on the FDE piece), write a 1200×630 image to the slug path and it overrides the templated card automatically. All 21 existing articles were pre-warmed 2026-08-19; new articles must be pre-warmed on publish.
- **Signature photography OG standard (set 2026-09-02):** every NEW article's primary OG/social image should use the photographic system in `scripts/lib/photo-og-template.js` (`renderPhotoOg`), not the typographic/graphic-card systems — this is Enso's differentiated, ownable look for social shares going forward. Rules: (1) source photo must match `brand/strategy-to-ship/.../brand-principles.md` §9 — warm-graded documentary photography, real people in real rooms, decisive crop with negative space for type; never stock "AI" imagery, glowing brains, robots, or neural-net clipart; (2) download the chosen photo into `public/images/photography/<slug>-<subject>.jpg` and pass that local path to the template — never hot-link a CDN URL into the generated image; (3) write a short per-article generator script (see `scripts/generate-fde-part3-photo-og.js` for the pattern: kicker, headline lines, dek, output path) rather than hand-rolling new HTML each time; (4) still pre-warm via LinkedIn Post Inspector per the rule above, and use a filename LinkedIn has never cached if replacing an existing article's OG. This does not retroactively require re-doing existing articles' OGs — apply going forward, and opportunistically when an article gets a refresh.
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

## Lead Gen & Client Development — standing rules (set 2026-08-14 per Sav)
The Perplexity Computer engine emails Enso lead intelligence daily from `computer@mail.perplexity.ai`.
There are THREE distinct streams and they are NOT the same thing — never conflate them:

| Subject pattern | What it actually is | Handling |
|---|---|---|
| `Enso signal leads — N new (N hot)` | **OUTBOUND prospects our engine found.** Nobody contacted us. Each carries a scored buying signal + a copy-paste LinkedIn note written FOR Sav to send. | `Leads → Hot` (Label_28) + STAR + **keep in inbox** until sent |
| `Enso leads — N new (N hot)` | **INBOUND** website form submissions, scored. As of Aug 2026 these are ~100% VA/offshore-staffing spam. | `Leads → Nurture` (Label_30) + archive. Only promote to Hot if score ≥40 AND a real ICP company |
| `Enso GA4 digest` / `Enso competitor intel` | Traffic + market analytics, no person to contact | `Leads → Intel` (Label_31) + archive |

**Daily hygiene (every run, no exceptions).** Read every lead email in full — never act on the subject line alone; the hot names, scores, signals, and ready-to-send copy live in the body. Then file in the SAME run: hot leads starred and left visible, everything else labeled and archived. A run that leaves read lead mail sitting unfiled is incomplete. Never delete received mail.

**Hot-lead SLA.** A signal lead is perishable — it is pegged to a dated hiring/appointment event, and its value decays fast. Surface hot leads the day they arrive with the note ready to paste. Any `Leads → Hot` item older than 5 days goes to the TOP of the next report with a finish-or-drop decision ask; past 14 days the underlying signal is stale — re-verify the person is still in role before Sav sends, or archive it.

**Account-based, not lead-based.** When 2+ contacts surface at the same company, treat it as ONE account play and say so — multi-thread the account rather than sending isolated notes. Always report leads grouped by company, never as a flat list.

**Hard stop — Claude never sends.** LinkedIn connection requests, InMails, and emails to third parties are always Sav's to send. Claude prepares, scores, groups, drafts, and files; Sav clicks send. Never auto-connect, never auto-message, never buy a Sales Navigator seat or credits.

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

## Session History
Session logs live in `docs/HISTORY.md` (moved 2026-07-27 — CLAUDE.md loads into every run, so history is archived out of the hot path). Append new session logs there, not here.

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
- **TWO RUNS PER DAY — consolidated (set 2026-07-27, token-lean program).** All daily event work happens in exactly two runs: the **morning run (8:00 AM PT)** — full scan (daily-event-scan Jobs 1–3: calendar reconcile + frontier alert + digest), the SF-prep briefing content, and inbox filing — and the **evening run (5:00 PM PT)** — delta-only scan (new/changed events since morning) + inbox filing. Any daily-event-scan or events-inbox-filer firing OUTSIDE these two slots must no-op immediately (one-line "consolidated into 8a/5p runs" and stop — do not scan). `sf-high-frontier-prep` is absorbed into the morning run and should be paused as a separate task. `hackathon-radar-weekly` folds into `weekly-event-board-sweep` (one weekly sweep, not two). Inbox filing per PR #22's intent (label + archive event emails, keep action items visible) happens inside the two runs, not as separate firings.
- **Sources:** Luma, Bond AI SF (luma.com/genai-sf), and Cerebral Valley SF are the primary crawl set while in SF. **Eventbrite is REMOVED — do not scan it.**
- **SF FOCUS WINDOW: Jul 7 → Aug 7, 2026.** Sav is physically in San Francisco; scan SF-proper events only, present all times in **PT**, suppress NYC. (Extends the earlier Aug 3 end date to **Aug 7**. Revert to the NYC scan and delete SF-mode blocks after Aug 7.)
- **RECONCILED TRUTHS — do NOT re-nag across ANY scheduled task (set 2026-07-29 per Sav):** (1) the **Perplexity partnership follow-up is CLOSED** — recording / credits / office-visit items all handled; stop surfacing them unless Sav reopens. (2) the **SF return flight is BOOKED** — the Aug 2 5 PM "DECIDE" block is resolved; drop it from open loops. These were still showing as open because run-state wasn't propagating — reconcile from `SF-Prep-state.json` (this task's source of truth), not from stale task prompts. Remaining SF human-only loops: finish the IBM Partner Plus portal verification + take Silver/badging, and decide the Berkeley VIP Reception (Aug 1).
- **The bar (what to surface):** (1) frontier-lab / marquee-builder events AND (2) workshops that **build on Sav's existing career skills & professional goals** — agent engineering, evals, AI strategy/positioning, GTM, frontier research. A strong skill-building workshop qualifies even if it is not frontier-hosted.
- **Sav is male (he/him) — NEVER surface women-only / women-in-tech events** (e.g., "Women in AI Breakfast + Panel", women-founder-only dinners/rooms). Exclude them from every scan, digest, table, and ad-hoc recommendation, across all scheduled tasks AND Claude chats. Do not re-surface. (Set 2026-07-10.)
- **Register → Google Calendar (EVERY registration, standing rule set 2026-07-10):** whenever Claude registers/RSVPs Sav for ANY event — ad-hoc chat request OR scheduled task — immediately add it to Google Calendar via `enso-google` (check first, NEVER duplicate). Color by Enso Fit v2 (🟢 green 8+, 🟡 yellow 6–7.5, ⚪ gray ≤5/pending/waitlist); put 📍location · 🔗link · ⭐score + one-line why in the event. Confirmed/approved → normal color; pending host approval or waitlist → gray ⏳ hold; a PAID event not yet paid → gray ⏳ hold labeled "payment pending" until Sav pays, then promote to its score color. The daily `daily-event-scan` (JOB 1) remains the calendar's steady-state owner and will reconcile, so match its format and dedupe.
- **AUTO-APPLY REGISTRATION at composite ≥7.5 — non-discretionary + JOIN WAITLISTS WHEN FULL (set 2026-08-11 per Sav; supersedes the old >7 threshold).** For any FREE, simple-RSVP NYC-proper room scoring ≥7.5 that Sav isn't already registered/pending for, REGISTER him ON SIGHT the same run it's found (Claude in Chrome, his logged-in Luma) — never surface a qualifying room as "your call" and wait. **If a qualifying room is SOLD OUT / FULL, JOIN THE WAITLIST (don't skip)** — this is THE fix for "events fill fast and we keep missing rooms / never even hit the waitlist"; join even if it time-conflicts with a staged event, and note the conflict for Sav. Rooms scoring 7.0–7.49 are surfaced with a 1-click RSVP link + recommendation, NOT auto-registered (never silently dropped). Hard-stops unchanged (never auto-submit → skip + flag): payment / ticket purchase, account creation, CAPTCHA, crypto wallet, private/sensitive fields (ARR / funding stage / phone), substantive freeform application essays, network referrals. Never pay / buy / send. Applies to `daily-event-scan` JOB 2.5 AND any ad-hoc event request in chat.
- **MANDATORY TL;DR TABLE — every deliverable and every response.** Lead with a one-line TL;DR, then a clean table. Columns, in this exact order: **Date | Time (PT) | Event | Score | Rationale to attend** (add a Link column when surfacing RSVPs). One tight, complete sentence per rationale cell. Mobile-first: short lines, no bullet stacks where a table works, no walls of text. Sav reads these on his phone while traveling — optimize for a 10-second scan.

## Scheduled Task Rules
### Google Calendar = single source of truth for deadlines & tasks (standing rule — set 2026-08-10 per Sav)
Every run that surfaces a dated deadline OR a task Sav owes writes it to Google Calendar via `enso-google` — not just event RSVPs. Applies to the `ai-platforms-partnerships-monitor`, event scans, job runs, and any ad-hoc digest.
- **Scope:** (1) hard deadlines (credit/voucher expiries, migration cutoffs, course due-dates, program lapses) AND (2) open action items Sav owes (partner follow-ups, onboarding steps, "claim this perk," "reply to X"). If the digest lists it under NEEDS ATTENTION / THIS WEEK / a roster's "unclaimed," it belongs on the calendar.
- **Mechanics:** all-day events FAIL on this connector — always create a short **timed hold** (15 min). Dated deadlines land on/near their date; undated tasks get a short **near-term** hold (next 1–3 days) so they resurface. Times in ET for partner/client work.
- **Dedupe first:** `calendar_list_events` over the window before creating — never duplicate an existing hold (match by summary/date). Update in place if it moved.
- **Color:** deadlines/task holds = colorId 5 (banana); event RSVPs keep the Enso Fit v2 colors from the event-scan rule below.
- **Never** book, pay, or send from the calendar — these are reminders only; the underlying action stays Sav's (login/2FA/payment/third-party send remain hard-stops).

### Token-Lean Operations (standing rule — set 2026-07-27)
Context: the week of Jul 20 the Claude Max plan hit its usage cap mid-week (a runaway hourly PR check-in loop + 7 event-related firings/day + job scanning on two surfaces at once). These rules cut recurring burn ~30–40% and apply to EVERY scheduled task, Routine, and agent session on this account. Every task reads this section at runtime — cadence rules here override older per-task prompts.
- **Event ops: two runs/day.** See "Event Scan — Standing Preferences" above. Firings outside the 8a/5p PT slots no-op immediately.
- **Job scanning: ONE surface.** The cloud Routine `daily-job-scan` (1×/weekday, 9 AM ET) is the sole scanning owner. The Cowork `job-scan-morning` task is PAUSED — if it fires, no-op immediately. `weekly-pipeline-review` stays as the Monday rollup. (The guiliana-career-command-center Vercel crons bill the separate API account, not Max — they are out of scope here.)
- **SEO engine: daily delta, weekly full scan.** The daily run checks ONLY articles added/changed since the last run plus the marquee list — the full every-article sweep of `lib/insights.ts` runs Mondays only. Batch content pushes to ≤1 push/day (bundle fixes into one commit). Voice lint stays daily (cheap); entity-drift scout stays weekly.
- **PR watching: webhooks, not clocks.** PR event subscriptions are the primary signal. Self check-ins (send_later) max 2×/day, waking hours only (9 AM / 5 PM PT), NEVER overnight, NEVER hourly chains. Docs-only or held-for-review PRs get zero scheduled check-ins — Sav is the next actor, not the clock.
- **Model routing for scheduled tasks (per the model-routing-policy skill).** Mechanical tasks (inbox filing, health checks, stand-up digests, labeling) → Haiku 4.5. Scans and content runs (event scan, job scan, SEO engine, monitors) → Sonnet 4.6. Fable 5 / Opus are for interactive strategy, design, and genuinely hard builds ONLY — never for a recurring scan. (Found 2026-07-27: `daily-job-scan` was running on Fable 5 [1m] twice a day.)
- **No mega-sessions on autopilot.** Multi-repo clone-and-audit sweeps, 31-repo scans, and similar large jobs run only on Sav's explicit request, never as a side effect of another task.

### No event drafts in Gmail (standing rule — set 2026-07-05)
- Event/digest/briefing scheduled tasks must deliver IN-APP ONLY — the Cowork run output + the in-app completion notification are the ping. NEVER create Gmail drafts or self-emails (to sav@ensopartners.co) for event scans, digests, frontier alerts, or SF-prep briefings. Self-notification drafts were clogging the Drafts folder.
- Applies to: `daily-event-scan` (Job 2 frontier alert + Job 3 morning digest), `sf-high-frontier-prep` (daily briefing), and any future event/monitor task. Patched 2026-07-05.
- Exceptions (still allowed): (1) `weekly-event-board-sweep` may create genuine follow-up OUTREACH drafts (relationship engine) — those are intentional, not daily self-notifications; (2) `ai-platforms-partnerships-monitor` review-only reply drafts for real partner emails. Neither should produce daily event-digest self-drafts.
- Hard line for ALL scheduled tasks: never SEND to third parties, never auto-register, never buy. Deliver reports in the Cowork output; only create a Gmail draft when the task explicitly exists to prepare an outreach/reply draft for Sav to review.

### Keep inboxes & folders as clean as possible (standing rule — set 2026-07-05)
- Default to tidy: don't leave automated self-notification drafts, duplicate files, or stray artifacts behind. Deliver in-app; if a task must write, write to its canonical file/location, not a new scratch copy.
- Gmail Drafts: no self-addressed automated drafts (event digests, briefings, radar alerts, canaries). If any accumulate, trash them. Exceptions that MAY stay: genuine outreach/reply drafts Sav asked for, and the intentional labeled deliverables (`daily-ai-terms-lesson` "AI terms" copies, `signal2noise`/`wins-to-profiles` "[S2N]" LinkedIn drafts) — leave those unless Sav says otherwise.
- Inbox: keep it filed — `events-inbox-filer` labels/archives events daily; other monitors label + archive informational mail and keep only true action items visible.
- When cleaning is ambiguous (could delete something Sav wants), verify contents first, clear the clearly-automated clutter, and flag the rest for a quick yes/no rather than guessing.
- Cleanup done 2026-07-05: trashed 8 stale event self-notification drafts (SF-prep briefings + daily event digests + frontier radar alerts, Jun 30–Jul 3).
- **MANDATORY POST-RUN INBOX CLEANUP (set 2026-08-04 per Sav): EVERY run — scheduled or ad-hoc — ends with an email hygiene pass before the final report.** For job runs: application confirmations/receipts, rejections, swept alert digests, and job-board promos → "Jobs → Applied" (Label_19) + archive; self-forwarded job/newsletter mail → "Jobs → Forwarded" (Label_23) + archive; items needing Sav → "Jobs → Action" (Label_18), starred, LEFT in inbox; resolved action threads → Label_18 → Label_19 + archive. Other runs file to their own canonical labels (events → Label_8, etc.). Never delete received mail; never touch Heller/client threads. A run that leaves processed mail sitting in the inbox is incomplete.
- **Re-affirmed + widened 2026-08-06 per Sav: the hygiene pass applies to EVERY surface and EVERY interaction that touches job mail — scheduled runs, ad-hoc chat requests, screenshot-driven asks, and Claude Code sessions alike.** Each processed email moves to its respective folder in the SAME turn it is handled, not at day-end. Routing recap: applied/receipts/rejections/swept digests/recruiter mail assessed-and-declined → Label_19 + archive · Sav's self-forwards → Label_23 + archive · live action items (recruiter threads awaiting Sav, interview logistics, 2-min finishes) → Label_18 + STARRED, kept in inbox · event invites encountered mid-job-run → Label_8 + archive. Every application outcome (submitted, staged, held, excluded) must ALSO be registered as a Notion Career Command Center row in the same turn — inbox filed + tracker recorded = the definition of done.
- **STALE ACTION ITEMS surface EVERY run (set 2026-08-06 per Sav, after Jefferies/Epsilon/Pluto sat silent in Jobs → Action):** every job-run report MUST end with a "WAITING ON SAV" list — every "Jobs → Action" (Label_18) thread older than 48h, each with its ONE-step finish (e.g. "type OTP", "log into iCIMS", "call Pluto"). Parking an email in Label_18 is triage, not completion — an action item nobody re-surfaces is a dropped ball. If a Label_18 item ages past 7 days, escalate it to the TOP of the report with a decision ask (finish or archive).
- **UNSENT DRAFTS ARE A DROPPED BALL — check Drafts EVERY run (set 2026-08-25 per Sav, after the Accenture near-miss).** On 2026-08-21 Sav wrote two excellent post-interview follow-ups (Zaryab Abbasi + a note for Raj) and never hit Send; both sat in Drafts for 4 days while the run report described them as "sent." Root cause: the sweep read the Sent folder loosely and treated a composed message as a delivered one. **Every run must now list every Gmail DRAFT addressed to a THIRD PARTY that is older than 24h, at the TOP of the report under "NOT SENT — needs your click."** Verify delivery against the Sent folder or the thread's message list — a draft ID returns "caller does not have permission" on `get_thread`, which is the tell. Consolidate multi-part drafts into ONE addressed, signed, ready-to-send message and trash the stale versions, so the remaining action is a single click. Claude still never sends to third parties; the click stays Sav's.
- **SAY WHERE THINGS ARE SAVED, WITH A FULL PATH (set 2026-08-25 per Sav).** Sav is dyslexic and runs dozens of parallel projects — "staged," "recorded," or "saved" with no location is worse than useless, it creates stress and he cannot verify the work exists. Every report that claims something was written must give the exact path or destination (`/Users/savbanerjee/Projects/Professional: Jobs & Resumes/<file>.md`, a named calendar hold, a Gmail label, a Notion row). Never describe a rule as "added" when it was only *proposed* — either write it to this file in the same turn or say plainly that it is a suggestion awaiting his go.
- **APPLY ON SIGHT, EVERY MORNING, FASTEST-FIRST (set 2026-08-25 per Sav — four rules given together).**
  1. **When Sav sends a list or screenshot of roles, open each one on LinkedIn and apply.** Not "surface," not "recommend" — open the posting, verify it, and submit. A list handed over is an instruction to apply, and the ≥9.0 approval gate is considered pre-released for any role Sav personally sent.
  2. **Be proactive every morning and get applications IN ASAP.** Speed is the edge: "Be an early applicant" and "top applicant" windows close within hours. The morning run submits, it does not stage for later.
  3. **Mine the interview pattern, then go find more of it.** Every run studies which roles are actually converting to interviews (as of Aug 2026: Cresta Forward Deployed PM · Auquan AI Applied Engineer · Accenture AWS Agentic Delivery Lead · Horizon Media SVP Product Experience · Mitchell Martin VP AI Transformation → the through-line is **forward-deployed / applied-AI delivery leadership at AI-native companies**), runs fresh searches against that pattern, and submits. Don't wait to be handed a list.
  4. **Never duplicate an application.** STEP 4.5 stays mandatory and is now enforced per-company AND per-role-title: search BOTH inboxes including Sent for the company name and the role title before every submit. Same company + different role is allowed only when there is no rejection on file in the last 30 days and fewer than 3 live applications there.
- **RESUME ATTACHMENT — the Greenhouse/MyGreenhouse autofill trap (found 2026-08-25).** Greenhouse autofill silently attaches `Sav_Banerjee_Master.pdf` from Sav's MyGreenhouse profile. That file is the SUPERSEDED July-14 version (no Berkeley RDI, no Forward Deployed Strategist series). **On every Greenhouse application: remove the autofilled resume and attach the correct Aug-19 archetype by hand.** Root fix pending: swap the default at https://my.greenhouse.io/profile to `Sav_Banerjee_ForwardDeployed_v4.pdf`.
- **KNOWN BLOCKER — browser file upload (found 2026-08-25).** `mcp__claude-in-chrome__file_upload` is disabled in Cowork sessions; it rejects `paths` outright and instructs not to retry. Consequence: **any ATS requiring a resume file attachment cannot be submitted from Cowork.** Those roles must be prepped (every other field completed, correct posting open in a tab) and handed to Sav as an attach-and-submit, OR the run must move to Claude Code, where local file access works. Never report such a role as "applied."

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

### E. KNOWN-BROKEN SURFACES — read before reporting any blocker (set 2026-08-25)
Sav's words, 2026-08-25: *"I cannot keep track of these broken MCP connectors every single time, every single day."*
These are DIAGNOSED. Do not re-diagnose them, do not re-surface them as news, do not stall on them.
Use the stated workaround, note it in one line, keep going.

**1. CHROME — canonical browser is Profile 10 / `sav@ensopartners.co`.**
Root cause of the recurring "which browser?" prompt and of tabs vanishing: the Claude extension
(`fcoeoabgfenejglbffodgkkbkcdhcgfn`) is installed in THREE places —
Chrome `Default` (sav.banerjee@gmail.com), Chrome `Profile 10` (sav@ensopartners.co), and **Comet**.
Each registers as a separate "Browser" on the account, so Claude binds to whichever wins the race.
- **CANONICAL deviceId: `4bde578f-c14b-442a-b028-c7cee39e3fbc` ("Browser 1") = Chrome Profile 10 = sav@ensopartners.co.**
  Verified 2026-08-25 by loading myaccount.google.com in it. This is where his LinkedIn / Gmail / ATS
  sessions live. It already matches `pairedDeviceId` in `claude_desktop_config.json`.
- **Every run: call `select_browser` with that deviceId. Never ask Sav which browser** (standing rule since 8/13).
- PERMANENT FIX (needs Sav, 2 min, once): remove the Claude extension from Chrome `Default` and from
  Comet, keeping it ONLY in Profile 10. Until he does, `select_browser` on the canonical ID is the workaround.

**2. RESUME FILE UPLOAD IS IMPOSSIBLE FROM COWORK — this is why applications stall one click short.**
- `mcp__claude-in-chrome__file_upload` is DISABLED in Cowork sessions. Tested and confirmed 2026-08-25;
  it rejects `paths` outright. Do not retry it, do not report it as a surprise.
- The osascript → native macOS file-picker workaround ALSO fails: osascript lacks Accessibility
  (assistive access) permission. `System Events` returns error -25211.
- **UNBLOCK (needs Sav, once):** System Settings → Privacy & Security → Accessibility → enable **Terminal**.
- Until then: any ATS needing a file attachment must be driven to the final screen, with every other field
  completed, and handed over as an attach-and-submit. Reveal the correct resume in Finder (`open -R`) and
  put its full path on the clipboard (`pbcopy`) so the handoff is a drag, not a hunt. Never call it "applied".

**3. STALE RESUMES PRE-ATTACHED BY ATS PROFILES — check EVERY time, on every ATS.**
Known bad autofills on Sav's existing candidate accounts:
- **Greenhouse / MyGreenhouse** → `Sav_Banerjee_Master.pdf` (superseded July-14 version)
- **JPMorganChase / Oracle HCM** → `SavBanerjee_Jan2023.pdf` (three years stale — found 2026-08-25)
Always REMOVE the autofilled file and attach the correct Aug-19 archetype. Assume every ATS with a saved
profile has a stale resume on it until proven otherwise.

**4. NOTION "Career Command Center" — query quota.**
The workspace hits Notion's Query Data Source usage limit. When it does, dedupe cannot be verified, so
**write nothing to Notion** (the never-duplicate rule wins) and log the run to
`/Users/savbanerjee/Projects/Professional: Jobs & Resumes/RUN-LOG-<date>.md` instead. Say so in the report.

**5. DESKTOP COMMANDER flaps.** It disconnected/reconnected 3× in one session on 2026-08-25. It is a
Cowork *plugin* with an app-managed lifecycle — it is NOT in `claude_desktop_config.json` and must not be
added there (that would create a duplicate server). Treat a drop as transient: wait, re-run `ToolSearch`,
retry once. Do not report it as a blocker unless it fails twice in a row.

**6. UNUSED PLUGIN BUNDLES generate the daily "needs authentication" noise.**
`marketing:*` (ahrefs, amplitude, amplitude-eu, canva, figma, klaviyo, similarweb, supermetrics, hubspot)
and `productivity:*` (asana, atlassian, clickup, linear, monday) have never been authorized and never will be.
Recommend Sav uninstall those two plugin bundles in the Cowork plugin manager. Keep Notion + Slack.
Until removed: ignore their auth warnings silently — never surface them to Sav as an issue.

**Standing rule:** a blocker listed in this section is ALREADY KNOWN. Report it at most once, in one line,
inside the run's blocked-sources list. Never lead a report with it, and never ask Sav to re-diagnose it.
