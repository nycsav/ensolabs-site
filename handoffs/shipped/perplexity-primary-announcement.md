# Handoff: Perplexity Implementation Partner — primary credential + announcement card — perplexity-primary-announcement

> Drafted by /goal from Sav's objective (2026-07-06). Executed same run.

## Summary
Make "Perplexity Computer Implementation Partner" the one prominent, accurate Perplexity credential on the site: add the co-branded announcement card + image, and remove the two stale claims ("Perplexity Business Fellowship" hero chip, "Perplexity Fellow" footer line) we don't hold.

## Target
- `app/page.tsx` — hero chip + Clients-section Partnerships block.
- `components/Footer.tsx` — Certified column.
- `public/images/perplexity-enso-partnership.png` — committed asset (from Sav's Downloads).
- Do NOT touch: Anthropic / Google / OpenAI / IBM credentials.

## Changes (exact)
1. **`public/images/perplexity-enso-partnership.png`** — commit the co-branded Perplexity × Enso Labs partnership graphic (1920×1080).
2. **`app/page.tsx`** — replace the PR #7 text Partnerships block with an image-forward **announcement card**: image (links to the program hub) + headline "Enso Labs joins the Perplexity Implementation Partners Program" + studio-voice line + "About the program →". This is the ONE prominent placement.
3. **`app/page.tsx`** — remove the stale hero chip `Perplexity Business Fellowship`.
4. **`components/Footer.tsx`** — remove the stale `Perplexity Fellow` line (keep the accurate "Perplexity Computer Implementation Partner" affiliations line from PR #7).

## Deliberately NOT in this PR (flagged for a follow-up accuracy sweep)
- "Perplexity AI Business Fellowship winner" still appears in person/org bios + schema on `app/about/page.tsx`, `app/about/sav-banerjee/page.tsx`, `app/services/page.tsx`, `app/services/claude-managed-services/page.tsx`, `app/editorial-policy/page.tsx`, and `lib/schema.ts`. `lib/schema.ts` is a PROTECTED path (would block auto-merge) and these are higher-judgment bio edits — needs its own reviewed pass.

## Acceptance
- [x] `npm run build` passes.
- [x] Announcement card renders with the committed image; links to the program hub, new tab, `rel="noopener"`.
- [x] Stale hero chip + footer "Fellow" removed; other partners untouched.
- [x] No protected paths in the diff (auto-merge eligible).
