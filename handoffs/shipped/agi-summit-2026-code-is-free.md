# Handoff: AGI Summit 2026 — "When code is free" figures + OG — agi-summit-2026-code-is-free

> FOR CLAUDE DESIGN — build the 3 article figures + hero/OG in the LOCKED **Warm Signal** system, commit PNGs to the stable paths below.
> Then Claude Code executes `/ship-handoff agi-summit-2026-code-is-free` (inserts the pending insights entry, builds, PRs, auto-merges on green).
> Article draft: `drafts/insights/2026-07-20-agi-summit-2026-code-is-free.md` · Pending entry: `drafts/insights/_PENDING-agi-summit-2026-code-is-free-entry.ts`
> One spec = one PR. Do not touch app/, components/, globals.css, or existing insights.

## Summary
Four Warm Signal assets for the AGI Summit 2026 recap insight ("When code is free, the moat is everything the model isn't."): a market-backdrop stat board, Owyang's flywheel ring, the Rao×Owyang convergence map, and the 1200×630 hero/OG. The article body already references the exact paths below.

## Target
- Branch: `design/agi-summit-2026-code-is-free` (auto via /ship-handoff)
- Files to ADD (stable paths, referenced by the article body):
  1. `public/images/insights/agi-summit-2026-market-backdrop.png`
  2. `public/images/insights/agi-summit-2026-flywheel.png`
  3. `public/images/insights/agi-summit-2026-convergence-map.png`
  4. `public/og/og-agi-summit-2026-code-is-free.png` (1200×630 exactly)
- File /ship-handoff will edit: `lib/insights.ts` (prepend the pending entry). Nothing else.
- Do NOT touch: `app/**`, `components/**`, `app/globals.css`, `lib/schema.ts`, existing insights/slugs, `public/llms.txt` (updated in the ship step).

## Brand system (LOCKED — Warm Signal, NOT the old dark/teal)
- Ground: **Paper `#F7F1E6`** (figures 1–3); **Ink Deep `#16110B`** allowed only for the OG per the brand's dark OG template. Cards/insets: Paper 2 `#EEE5D3`.
- Text: **Ink `#1E1813`** on paper; **`#F3ECDD`** on the dark OG. Muted/meta: **Slate `#79705F`** (`#9b8f78` on dark). Hairlines: **Line `#DDD2BC`**.
- **Ship Coral `#F0512E` is THE signal** — arrows, stamps, one highlighted figure — held to ~5–10% of each composition. Never a large fill. Secondary warm accent: **Ledger Amber `#E0A23C`**.
- **Enso Teal `#5CE0D2` ONLY in the "from Enso Labs" endorsement** — nowhere else.
- Type: **Lora 500–600** headlines (tight leading 1.05–1.15) · **Inter Tight 400–500** body · **JetBrains Mono 11–14px uppercase, 0.08em letter-spacing** for kickers/datelines/source lines.
- Motifs: the **strategy→ship lane** (dotted route, coral →), the **release ledger** (dated mono list), the **coral rubber stamp** (slightly rotated, ~-4°).
- HARD NOs: no dark-navy `#0d1321`/teal-accent compositions (stale signal2noise aesthetic), no glowing brains, no robots, no neural-net clipart, no gradients-as-decoration. The → arrow is ALWAYS Ship Coral.

## Figure 1 — Market backdrop (stat board), `agi-summit-2026-market-backdrop.png`
Paper ground, ~1600×1000. Mono kicker top-left: `AGI SUMMIT 2026 · FIELD NOTES · CRUNCHBASE H1 2026 DATA`.
**Four stat tiles** (Paper 2 cards, Line hairline borders, Lora figure + Inter Tight label + mono footnote). Exact copy:
1. `$510B` — "Record global venture funding, H1 2026" — mono note: `MORE THAN ALL OF 2025 ($440B)`
2. `70%+` — "Of Q2 capital went to AI companies" — mono note: `UP FROM ~50% A YEAR EARLIER`
3. `53%` — "Of Q2 went to just 16 rounds of $1B+" — mono note: `$108.6B OF Q2'S $205B`
4. `43%` — "Of H1 went to two companies" — mono note: `OPENAI + ANTHROPIC · $217B`
Coral is allowed on ONE figure only (recommend the `43%`) — the rest set in Ink.
**Below the tiles: a single horizontal stacked bar** titled in mono `WHERE Q2'S $205B WENT`. Three segments, labeled with value + share:
- Anthropic — `$65B` (31.7%) — Ledger Amber
- Other $1B+ rounds (15) — `$43.6B` (21.3%) — Slate
- Everything else (5,000+ startups) — `$96.4B` (47.0%) — Paper 2 with Line border
(No coral in the bar — coral stays reserved for the one tile + arrow accents.)
Source line, mono, bottom: `SOURCE: NEWS.CRUNCHBASE.COM · H1 2026 GLOBAL REPORT` + the endorsement `S→S · FROM ENSO LABS` (teal on "from Enso Labs" only, → in coral).

## Figure 2 — Owyang's flywheel, `agi-summit-2026-flywheel.png`
Paper ground, ~1400×1400 (square). Mono kicker: `JEREMIAH OWYANG · BLITZSCALING VENTURES · "HOW TO WIN WHEN CODE IS FREE"`.
A five-node ring, clockwise, joined by **Ship Coral arrows** (the only coral): **Data → Community → Product-led growth → Distribution → Network effects → (back to Data)**.
Node labels in Lora; one-line Inter Tight descriptor under each (exact copy):
- Data — "The proprietary lever few can access"
- Community — "Users become product innovation + de-facto-standard loyalty"
- Product-led growth — "Features that spread user to user"
- Distribution — "Partner channels that enter markets at low cost"
- Network effects — "Be the center of the ecosystem"
Center of the ring: a coral rubber stamp, rotated ~-4°: `SPIN YOUR FLYWHEEL`.
Footnote, mono: `WORKED EXAMPLE ON STAGE: COMPOSIO — 1,000+ APP CONNECTIONS, JUST-IN-TIME TOOL CALLS`.

## Figure 3 — The convergence map, `agi-summit-2026-convergence-map.png`
Paper ground, ~1600×1000. Mono kicker: `TWO TALKS, ONE MAP · AGI SUMMIT 2026`. Column headers in Lora: left "Crunchbase — what's fundable" (mono subhead: `KETAKI RAO · CPO`), right "Blitzscaling — what's durable" (mono subhead: `JEREMIAH OWYANG · GP`).
**Five rows**, each left item joined to its right item by a **Ship Coral →** on a dotted strategy→ship lane. Exact pairs:
1. Proprietary data + learning loops → Data
2. Momentum → Community
3. Embedded in the workflow → Product-led growth
4. Distribution → Distribution
5. Defensible moat → Network effects
Release-ledger footer, mono, dated: `2026-07-18 · RAO — "HOW TO BUILD A FUNDABLE AI STARTUP"` / `2026-07-19 · OWYANG — "HOW TO WIN WHEN CODE IS FREE"` / `2026-07-20 · S→S — THIS CONVERGENCE`. Endorsement lockup bottom-right.

## Figure 4 — Hero / OG, `og-agi-summit-2026-code-is-free.png` (1200×630 EXACTLY)
Dark OG template: **Ink Deep `#16110B`** ground, text `#F3ECDD`.
- Masthead, mono: `S→S` (→ coral) + hairline + `FROM ENSO LABS` (teal, the only teal).
- Dateline, mono: `AGI SUMMIT 2026 · PALACE OF FINE ARTS, SF · JUL 18–19`
- Headline, Lora, large (the headline is the art): **"When code is free, the moat is everything the model isn't."** (Option: set "everything the model isn't" with a coral-underline or the word "isn't" in coral — one coral moment max.)
- Right side: a release-ledger sidebar in mono: `$510B H1 FUNDING · 70%+ OF Q2 TO AI · 43% TO TWO COMPANIES` — or a coral `FIELD NOTES` stamp, rotated. Pick one, not both.
- No photography required; if used, warm-graded real-room only.

## Assets
- Fonts already in the repo/brand kit (Lora, Inter Tight, JetBrains Mono). Reference: `brand/strategy-to-ship/style-guide.html`, `tokens.css`, `wordmark.svg`, `og-dark.png`/`og-light.png`.
- No downloads from expiring URLs; commit PNGs at the stable paths above.

## Brand / content rules to honor
- Studio voice "we", never "I". No hype words. All figure copy above is final — do not paraphrase the data.
- Arrow → ALWAYS Ship Coral `#F0512E`. "Powered by Enso Labs" stays the article closer (already in the body).
- Gore stays "Fortune 500 manufacturer" (not referenced in any figure — keep it that way).
- No references to deprecated signals.ensolabs.ai / signal2noise anywhere.

## Acceptance checklist (Claude Code confirms before PR)
- [ ] All four PNGs exist at the exact paths above; OG is exactly 1200×630.
- [ ] Figures 1–3 are Paper-ground Warm Signal; OG is Ink-Deep dark template. Zero dark-navy `#0d1321` / stray teal.
- [ ] Coral ≤ ~10% of each composition; every → arrow is `#F0512E`; teal appears only in "from Enso Labs".
- [ ] Data values match this spec exactly ($510B · 70%+ · 53%/16 rounds/$108.6B · 43%/$217B · $65B/$43.6B/$96.4B · scorecard 82/74/68/65/53 if shown).
- [ ] Type: Lora headlines, Inter Tight body, JetBrains Mono meta — no substitutes.
- [ ] `lib/insights.ts` gets the pending entry from `drafts/insights/_PENDING-agi-summit-2026-code-is-free-entry.ts` prepended, verbatim.
- [ ] `npm run build` passes; `/insights/agi-summit-2026-code-is-free` prerenders; article renders all four images.
- [ ] Existing slugs untouched; no protected paths in the diff.
- [ ] POST-MERGE: purge edge + `curl -s https://ensolabs.ai/insights/agi-summit-2026-code-is-free` shows the new copy externally.

## Out of scope
- LinkedIn M/W/F posts and Post Inspector pre-warm (drafted after the article is live).
- `public/llms.txt` count/coverage bump — handled in the ship step per CLAUDE.md's full-scan directive.
- Any edit to the Pipeline-2.0 kickoff file (its dark/teal imagery note is stale; noted, deliberately not "fixed" in this run).
