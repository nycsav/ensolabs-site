# Strategy to Ship — Distribution Engine: Stack + Build Plan

*Implementation companion to `STRATEGY_TO_SHIP_DISTRIBUTION_ENGINE.md` (the "what/why" spec).
This doc is the "with what / in what order." Research current as of June 2026; sources inline.
Drafted by Claude Code for Sav Banerjee. **Plan only — no feature code shipped yet.***

---

## 0. The architecture (agreed with Sav)

```
①  Publish article on the front end (ensolabs.ai/insights)   ← the trigger, your one human write
②  Engine RENDERS the assets (OG card, LinkedIn carousel PDF, square/signal cards)   ← your own app
③  Engine DRAFTS per-channel copy (LinkedIn post + 1st comment, X thread, newsletter, Medium)   ← Claude
④  You APPROVE the pack in Slack (✅ / regenerate)
⑤  Engine PUBLISHES the easy channels via API/MCP (X, newsletter, Medium-canonical)
⑥  LinkedIn: carousel posts via the COMPLIANT document API; the newsletter EDITION is the one human click
```

**One DNA, every surface.** The article URL is the destination we earn the click to — every channel
gets a native asset, not a pasted link (per the native-first spec).

---

## 1. Recommended end-to-end stack (one pick per layer)

| Layer | Pick | Why (one line) | Cost |
|---|---|---|---|
| **Planning / backlog** | **Notion** *(you have it)* | Right shape for a content calendar; write unattended via its **token REST API** (the hosted OAuth MCP can't run headless). | $0 incremental |
| **Render (visual assets)** | **Your Next.js app** (Satori `ImageResponse` + Puppeteer→PDF) | The OG/carousel "factory" lives in your repo — brand-locked, free on Vercel. Puppeteer + sharp are already installed. | $0 |
| **Copy (per-channel drafts)** | **Claude** (a Claude Code skill / API) | Atomizes one article into LinkedIn/X/newsletter/Medium copy in your locked voice + Gore rule. | ~$2–5/mo API |
| **Publish — X + LinkedIn carousel** | **Late / Zernio API** (backup: Publer) | Only cheap option that posts a real **PDF carousel + first-comment + personal & company pages + X threads** via API. Compliant (rides LinkedIn's official Marketing API). | ~$6/mo |
| **Publish — newsletter** | **Buttondown** | Markdown-native, **one API call fires the send**, free public archive + RSS. Built for solo writers. | ~$9/mo @1k subs |
| **Publish — Medium mirror** | **Medium "Import Story"** (canonical-safe) | API is closed to new accounts; Import auto-sets `rel=canonical` back to ensolabs.ai. One paste. | $0 |
| **Approval gate** | **Slack** *(you have it)* | Simplest: react ✅ to approve (endpoint-free polling). Optional upgrade: real Approve/Regenerate **buttons** via self-hosted **n8n "Send and Wait."** | $0 (or n8n self-host) |
| **Tracking** | **GA4** *(you have it)* + native platform stats | Canonical-page SEO/AEO + per-platform saves/dwell/replies. Clicks are a weak 2026 signal — don't optimize for them. | $0 |

### What can't fully automate (and the workaround)
- **LinkedIn newsletter EDITION** → no API, and automating the UI violates LinkedIn ToS (real 2026 ban waves).
  *Workaround:* auto-publish a normal LinkedIn **article/post** for reach (compliant API), and keep the
  *newsletter edition* as a **paste-ready draft → one human click** in LinkedIn's UI. [learn.microsoft.com, Apr 2026]
- **Medium** → no new API tokens issued. *Workaround:* the **Import Story** tool (manual paste, auto-canonical). [github.com/Medium]
- **X reach** → non-paying accounts posting links get ~0 reach; the API also bills **$0.20 per link-post**.
  *Workaround:* treat X as optional/lower-priority, or budget **X Premium ~$8/mo** on the posting account. [buffer.com, Oct 2025]

---

## 2. Your weekly operating workflow (the week collapses to a morning + an approval)

| When | Who | Step | Time |
|---|---|---|---|
| **Mon AM** | **You** | Write **one** pillar article in Markdown; publish on `/insights`. **This is your main work.** | 45–60 min |
| *on publish* | Automation | Render OG card + **LinkedIn carousel PDF** + square/signal cards; draft LinkedIn post + first comment, X thread, newsletter, Medium copy → assemble a **distribution pack**. | ~0 (you) |
| **Mon AM** | **You** | Slack pings you the pack preview → **✅ approve** or "regenerate." | 2–5 min |
| *on approve* | Automation | Post **X thread** (Late API), **send Buttondown newsletter**, post **LinkedIn carousel** (Late compliant API). | ~0 (you) |
| **Mon AM** | **You** | The only manual clicks: **LinkedIn newsletter edition** (if running one) + optional **Medium Import**. | ~5 min |
| **Tue–Fri** | Automation + you | Engine drips pre-drafted atomized stats/quotes on the **M/W/F** cadence; each is a 10-second Slack ✅. | ~2 min/day |

**Net: ~1 hour of writing + ~10 min of approvals per article.** No downloading, no manual posting (except the one LinkedIn newsletter click).

---

## 3. Monthly cost (small / solo scale)

| Item | $/mo |
|---|---|
| Notion, Slack, Vercel, GA4 | $0 (already have) |
| Late / Zernio (X + LinkedIn carousel API) | ~$6 |
| Buttondown (newsletter, ~1k subs; free under 100) | ~$9 |
| Claude API (copy drafting) | ~$2–5 |
| X API link-posts (~low volume) | ~$2–5 |
| X Premium (only if you want X reach) | ~$8 |
| **Total** | **~$25–35/mo** (or ~$17 without X) |

Well under the PRD's "~$95/mo at full scale" ceiling — and vs. Crayon/enterprise tools at $20–40k/yr.

---

## 4. Phased build sequence (grounded in this repo, dependency-ordered)

### Phase 1 — Fix the OG render route (the asset "factory"). **← start here**
*The per-article OG image 500s in production: the dynamic Vercel function `readFileSync`s
`public/images/logo-white.svg` + `public/og/claude-icon.png`, which Vercel doesn't bundle into the
function. Proven by reproduction (200 locally, 500 in prod). This route is the foundation for every
visual asset, so it's the first dependency.*
- **Files:** `components/OgFrame.tsx`, `lib/og/` (move the 2 assets here, read like the fonts, or base64-inline), `app/insights/[slug]/opengraph-image.tsx`, `app/insights/[slug]/page.tsx` (point `og:image` at the dynamic route instead of the hand-made `/og/og-<slug>.png`).
- **Delivers:** per-article OG cards that generate automatically, in brand, with zero manual PNG work.
- **Verify:** `curl -I` the prod OG route → **200**; LinkedIn Post Inspector shows the card.

### Phase 2 — Carousel render route → PDF
- **New** app route (e.g. `app/insights/[slug]/carousel/route.ts`) renders the locked carousel and exports a **PDF** (Puppeteer, already installed; sharp for image ops).
- **Blocker to resolve:** the brief named `docs/engine/reference/linkedin-carousel.dc.html` + `content-engine.dc.html` as the visual source of truth — **these files don't exist in the repo.** We build from the brand lock + `style-guide.html` unless you can drop those `.dc.html` references in.
- **Delivers:** a brand-locked LinkedIn carousel PDF per article.
- **Verify:** generate a PDF for an existing article; eyeball Space Mono + ribbon + coral ≤10%.

### Phase 3 — Copy engine (Claude skill)
- A `strategy-to-ship-distribute` skill: read the canonical article → atomize → draft LinkedIn post + first comment, X thread, newsletter, Medium copy. Honors "we," the brand lock, **Gore = "a Fortune 500 manufacturer,"** "Powered by Enso Labs."
- **Delivers:** the text half of the distribution pack. **Drafts only.**
- **Verify:** run on a published article; review the drafts.

### Phase 4 — Publish layer
- Wire **Late/Zernio** (X threads + LinkedIn carousel/post + first comment) and **Buttondown** (newsletter send). Notion-token writes for the backlog log.
- **Delivers:** one command turns an approved pack into live posts.
- **Verify:** dry-run to a test profile / draft send.

### Phase 5 — Slack approval gate
- Post the assembled pack to Slack → **✅ approve / regenerate** (emoji-poll first; n8n buttons later).
- **Delivers:** the human checkpoint; nothing ships unapproved.
- **Verify:** full dry run: publish → pack → Slack → approve → posts.

### Phase 6 — Backlog + schedule + tracking
- Notion backlog; scheduled **M/W/F** drip of atomized atoms; a simple per-post tracking log.
- **Delivers:** the always-on cadence around each pillar.
- **Verify:** a week runs with only approvals from you.

---

## 5. Open decisions + risks (settle before/at build)

1. **LinkedIn carousel route — the key one.** Compliant **API (Late/Zernio, ~$6/mo, no ban risk)** vs **browser automation** (your first instinct; works but ToS-banned, ban risk). **Recommendation: use the compliant API for the carousel + posts; reserve the browser/manual click ONLY for the newsletter edition** (the one thing with truly no API). Best of both — reach without risking the account.
2. **Publisher pick.** Late/Zernio (cheap, **newly rebranded — pilot before trusting**) vs Publer ($10, more proven) vs Ayrshare ($149, most proven). *Rec: pilot Late, keep Publer as fallback.*
3. **ESP.** Buttondown (rec) vs Resend (free <1k but no archive). Confirm your subscriber count + list import.
4. **X — worth it?** Per-link $0.20 + Premium ~$8/mo for reach. *Rec: launch without X; add later if you want it.*
5. **Approval style.** Emoji ✅ poll (simplest, $0) vs n8n Approve/Regenerate buttons (nicer, needs n8n self-host).
6. **Accounts to designate.** Which **LinkedIn personal profile** + **company page**, which **X** account, **Medium** (no token → Import).
7. **Missing reference files.** The `.dc.html` carousel/engine visual sources don't exist in-repo — provide them or we build from the brand lock.

**Risks:** LinkedIn API deprecates versions periodically (keep a manual fallback); Late/Zernio is new (pilot it); never run LinkedIn UI automation as a silent bot at scale.

---

## 6. Already done this session (brand alignment — separate P1)
The brand is now aligned to `docs/brand/STRATEGY-TO-SHIP-BRAND-LOCK.md`: **Space Mono 700 + coral swept ribbon**
across `tokens.css/ts`, `style-guide.html`, `OgFrame.tsx`, the `/insights` theme, `layout.tsx`, the footer,
and `CLAUDE.md`. Lora/`→`/`S→S` removed from all code. Gore confidentiality rule added. Build green.
**Uncommitted — pending your visual review + "go."**

## The single most important decision to proceed
**Confirm the LinkedIn carousel route: compliant API (Late/Zernio) — my recommendation — or browser automation?**
That one choice fixes the publisher pick, the cost, the risk profile, and the Phase 2/4 build.
