# Handoff: The Forward Deployed Strategist — Part 1 visual assets — forward-deployed-strategist-series-part1

> For Claude Design (Strategy → Ship publishing engine) to produce the visual images, then Claude Code to place them via `/ship-handoff forward-deployed-strategist-series-part1`.
> One spec = one PR. Design first (assets), then placement. Manual-review mode — Sav eyeballs the Vercel preview before merge.

## Summary
Create the launch visual set for **"The Forward Deployed Strategist"** — a 4-part Strategy → Ship editorial series. Part 1 is the thesis: the agency/consulting strategist has always been the *deployment strategist* seat of forward deployment; AI just attached the last mile. Assets must carry the **repositioned angle** — forward deployment as a strategy-and-consulting discipline from the Madison Avenue / digital / CX / data-strategy lineage, NOT an engineering role.

Source copy: `Professional: Jobs & Resumes/FDE-Agency-Strategy-Article.md` (Part 1, first-person, ~1,400 words, data + "two seats" section included).

## FOR CLAUDE DESIGN — load the locked system first
Design under the **Strategy → Ship** brand (the warm editorial media brand, NOT the Enso navy/teal studio brand). Before designing, read the locked system — do not reinvent:
1. `/strategy-to-ship-design-system.md` (brand brief + principles)
2. `/brand/strategy-to-ship/tokens.css` (color/type/spacing tokens)
3. `/brand/strategy-to-ship/style-guide.html` (living visual guideline — open it)
4. `/brand/strategy-to-ship/wordmark.svg`, `og-dark.png`, `og-light.png` (reference assets)

Non-negotiable brand rules: Lora (headlines) · Inter Tight (body/UI) · JetBrains Mono (kickers, datelines, "PART 1 OF 4"). Paper `#F7F1E6` · Ink `#1E1813` · Ink Deep `#16110B` · **Ship Coral `#F0512E` = THE signal (arrow, stamp, ONE accent word; ~5–10% max)** · Ledger Amber `#E0A23C` · Slate `#79705F` · Line `#DDD2BC`. Enso Teal `#5CE0D2` ONLY for a "from Enso Labs" link. The → glyph is always Ship Coral. Editorial, not an ad: lead with the headline/idea. Warm documentary imagery of real people/rooms — NEVER stock "AI", glowing brains, robots, or neural-net clipart.

## Assets to produce
1. **Series masthead / lockup** — "STRATEGY → SHIP · The Forward Deployed Strategist" with a reusable "PART 1 OF 4" system (JetBrains Mono kicker). Used across all four parts.
2. **Hero in-body figure — "The two seats of forward deployment" (Warm Signal, ~2800×1760).** The core visual argument:
   - Two seats side by side: **Forward Deployed Engineer** (writes the code) and **Deployment Strategist** (scopes the problem, aligns the C-suite, defines the outcome, owns adoption). Make the *strategist seat* the coral-accented hero.
   - Beneath the strategist seat, map the lineage → **brand & advertising strategy · digital strategy · CX strategy · data strategy** feeding into it.
   - One-line frame: "Palantir always sent two. The market only talks about one."
3. **Market-data figure (Warm Signal, in-body or square).** Verified, dated, small JetBrains Mono source labels:
   - **New York overtook San Francisco as the #1 FDE hub — ~35% of postings vs SF ~11%**, concentrated in fintech/regulated *(coral hero stat)* (Paraform, Apr 2026)
   - FDE demand up ~10x in 18 months; total comp $300K–$600K+ (2026)
   - Consulting pyramid cracking: McKinsey growth ~2%, headcount −10%; ~25% fees outcome-based (2026)
   - Agencies contracting: WPP revenue −6.6% Q1 2026; holdco revenue fell while ad spend rose +8.6% (2026)
4. **LinkedIn carousel 1080×1350** (the lead surface, post NATIVE): cover ("The best Forward Deployed Engineers have been forward deployed all along") → atomic slides (the two seats · beyond the deck · the agency lineage · the NY/fintech data) → CTA to the full essay.
5. **Pull-quote cards** (Lora on Paper, coral accent), 1080×1080:
   - "The scarce half is the word in the middle: *forward*."
   - "Palantir always sent two. The market only talks about one."
   - "It just wasn't called forward deployment. It was called account planning, digital, CX, and data strategy."
6. **OG / social card 1200×630** — two versions: Strategy → Ship dark editorial (`og-dark`) for the article share, AND, IF this ships as an ensolabs.ai/insights piece, a matching **navy/teal site OG** (`#0d1321` gradient + `#5ce0d2`) so the site card matches the sitewide `generate-og.js` family. The social/editorial card uses Strategy → Ship; the site OG card uses the Enso terminal palette (deliberate split — social ≠ site chrome).

## Placement targets (Claude Code, after assets exist)
- `public/images/insights/forward-deployed-strategist-part1.png` (hero figure, stable path)
- `public/og/og-forward-deployed-strategist-part1.png` (1200×630 site OG)
- Carousel + pull-quote + square assets → `public/images/strategy-to-ship/forward-deployed-strategist/` (social; not linked from site chrome)
- If Part 1 is published to Insights: add the `lib/insights.ts` entry (studio-voice adaptation or first-person, Sav's call) referencing the hero image + site OG. Held for Sav's review since first-person voice differs from the studio default.

## Brand / content rules to honor
- Series masthead + article are **first-person** (Sav's manifesto). Social captions/CTAs use Strategy → Ship editorial voice.
- Close every published surface with **"Powered by Enso Labs."** Arrow → always Ship Coral `#F0512E`.
- No "signal2noise" / `signals.ensolabs.ai` anywhere. No stock-AI imagery.
- Confidential client stays "Fortune 500 manufacturer."
- External anchor (Vasuman Moza / Varick Agents) is a validating voice, not a competitor callout.

## Acceptance checklist (Claude Code confirms before PR)
- [ ] Hero figure is Warm Signal (Paper ground); coral appears only on the strategist seat + the NY hero stat.
- [ ] Site OG is exactly 1200×630, navy/teal; social OG is Strategy → Ship dark.
- [ ] "PART 1 OF 4" masthead renders; reusable for Parts 2–4.
- [ ] `npm run build` passes; any new `/insights` route prerenders.
- [ ] No deprecated signal2noise references; JSON-LD/OG intact.

## Out of scope
- The forward-deployed **service copy** (services page + homepage + llms.txt) — already edited in a separate routine content diff; do not re-touch here.
- Parts 2–4 assets (Berkeley recap, the-brief, regulated playbook) — reuse the masthead when those ship; not this run.
