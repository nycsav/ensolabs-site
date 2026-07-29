# Handoff: Berkeley Agentic AI Summit — demand-side-gap insight + figure + OG — berkeley-agentic-summit-demand-side-gap

> Source: Cowork session 28 Jul 2026 (article drafted in `enso-berkeley-handoff` Drive folder + zip). Figure
> designed via Magic Patterns (`components/DemandSideGapCard.tsx`, editor `jpeuaxq1hhecjajzb59rto`), rendered to a
> static PNG with `scripts/generate-og-berkeley-demand-side-gap.js`. OG rendered with `scripts/generate-og-berkeley.js`.
> Executed in Claude Code with `/ship-handoff berkeley-agentic-summit-demand-side-gap` in manual-review mode
> (not auto-merge) so the Vercel preview + OG card get eyeballed before merge, per the Cowork brief's explicit ask.
> Article draft: `drafts/insights/2026-07-28-berkeley-agentic-summit-demand-side-gap.md` · Pending entry:
> `drafts/insights/_PENDING-berkeley-agentic-summit-demand-side-gap-entry.ts`

## Summary
New insight article: "Berkeley is solving the supply side. The demand side is where agents die." — a
demand-side/marketing argument tied to the Berkeley RDI Agentic AI Summit (Aug 1–2, 2026), arguing the summit's
100% supply-side agenda misses the actual failure point (customer/segmentation/data readiness) behind Gartner's
40%+ agentic-project cancellation forecast. Event-tied, short shelf life — publish before Aug 1.

## Target
- Branch: `design/berkeley-agentic-summit-demand-side-gap` (auto via /ship-handoff)
- Files ADDED:
  1. `public/images/insights/berkeley-agentic-summit-demand-side-gap.png` (2800×1760, Warm Signal, in-body figure)
  2. `public/og/og-berkeley-agentic-summit-demand-side-gap.png` (1200×630, navy/teal — matches the sitewide
     `generate-og.js` template family, per the corrections doc's explicit `#0d1321`/`#5ce0d2` instruction)
  3. `drafts/insights/2026-07-28-berkeley-agentic-summit-demand-side-gap.md` (human-readable draft copy)
  4. `drafts/insights/_PENDING-berkeley-agentic-summit-demand-side-gap-entry.ts` (reference copy of the entry)
  5. `scripts/generate-og-berkeley-demand-side-gap.js`, `scripts/generate-og-berkeley.js` (render scripts, kept
     for reproducibility — same pattern as `scripts/generate-og-sf-summits.js`)
- File EDITED: `lib/insights.ts` — new entry prepended as `INSIGHTS[0]` (newest-first).
- Do NOT touch: `app/**`, `components/**`, `app/globals.css`, `lib/schema.ts`, existing insights/slugs,
  `public/llms.txt` (updated in the ship step per CLAUDE.md's full-scan directive).

## Brand system honored
- In-body figure: Warm Signal — Paper `#F7F1E6` ground, Ink `#1E1813`/Ink Deep `#16110B` text, Coral `#F0512E`
  on exactly one stat (`40%+`, the Gartner cancellation figure), Lora headline, Inter Tight body, JetBrains Mono
  kickers/sources. No dark-navy/teal on this asset.
- OG card: navy/teal terminal palette (`#0d1321`-family gradient, `#5ce0d2` accent), matching the sitewide
  default OG template — a deliberate exception the corrections doc calls out explicitly for social cards only.
- Article closer: fixed "researched and drafted inside our own signal2noise engine" → "Strategy to Ship engine"
  per the repo's standing rule (signal2noise is retired/never customer-facing) — decided without asking Sav,
  per the repo's own "don't ask when a reasonable default exists" operating mode.
- Confidential client referred to only as "Fortune 500 manufacturer" throughout — verified, no real name present.

## Killed-claims check (run against the full article text)
Verified absent: MIT NANDA "95% of GenAI pilots fail", "AI traffic converts 4x better" / ChatGPT-vs-paid-search
conversion claims, any 2026 CAC-inflation figure, any promise to improve AI/LLM visibility, and the confidential
client's real name. All source citations in the draft trace to a named, dated source (Gartner, Adobe/Oxford
Economics, Salesforce, SparkToro/Similarweb, Crunchbase).

## LinkedIn distribution — explicitly NOT a content-ops pack
Per Sav's direct instruction mid-run: replicate the exact pattern used for the AGI Summit launch (2026-07-22) —
one promo post + one LinkedIn native article, no carousel/X/newsletter/Medium. This also matches the content-ops
repo's own non-negotiable rule (`strategy-to-ship-content-ops/CLAUDE.md` §3a: exactly one LinkedIn asset per
published article) — the carousel-centric plan in the original Cowork brief pointed at an example pack that
itself violates that rule. No `out/packs/` build was run for this article.

## Acceptance checklist (Claude Code confirms before PR)
- [ ] Both PNGs exist at the exact paths above; OG is exactly 1200×630; figure is 2800×1760.
- [ ] Figure is Paper-ground Warm Signal; OG is navy/teal. Coral appears only on the `40%+` stat in the figure.
- [ ] `lib/insights.ts` has the new entry as `INSIGHTS[0]`, with `lens: 'Brand'`, `pillar: 'Consult'`,
      `sourceCredit: 'Strategy to Ship'`.
- [ ] No "signal2noise" or `signals.ensolabs.ai` anywhere in the new content.
- [ ] `npm run build` passes; `/insights/berkeley-agentic-summit-demand-side-gap` prerenders.
- [ ] Existing slugs untouched; no protected paths in the diff (this run is NOT auto-merge — held for Sav's
      visual review of the Vercel preview + OG card per the brief's explicit ask).
- [ ] POST-MERGE: purge edge + `curl -s https://ensolabs.ai/insights/berkeley-agentic-summit-demand-side-gap`
      shows the new copy externally, then run LinkedIn Post Inspector on the live URL before any post goes out.

## Out of scope
- The second article (`cannot-optimize-into-model-recommendation`, held for Aug 4) — not part of this run.
- The `brief-layer/` MCP server, `rdi-mcp/data/rdi-agenda.json`, and other zip contents — not needed to publish.
- Any `out/packs/` distribution pack build (see LinkedIn section above).
- The Brief Sprint fixed fee — still needs Sav; the CTA ships without a price.
