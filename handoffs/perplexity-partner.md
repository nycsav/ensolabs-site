# Handoff: Perplexity Computer Implementation Partner credential — perplexity-partner

> Written by Claude Design. Execute in Claude Code with `/ship-handoff perplexity-partner`.
> First handoff to run on the automated path.

## Summary
Enso Labs has joined the **Perplexity Computer Implementation Partner Program**. Add an
on-brand partner credential to the site so the affiliation shows up for visitors and in
search. This is a credential/badge in **Enso Labs' own** dark/teal system — do NOT recreate
Perplexity's branded UI, logo lockups, or product screenshots. Text credential only.

## Target
- Primary: `app/page.tsx` — add a compact "Partnerships" credential.
  - Best placement: inside/after the **Clients §07** section (partner recognition sits
    naturally with the client wall). If that reads crowded, place a one-line credential in
    the **Proof §03** band instead. Read the actual section markup and choose.
- Secondary (small): `components/Footer.tsx` — add a single credential line.
- Optional SEO: `lib/schema.ts` — if there is an Organization/ProfessionalService schema,
  add the partner program to `memberOf` / `knowsAbout` (only if it slots in cleanly).
- Do NOT touch: hero, Live Intelligence §04, methodology, insights.

## Changes (exact)
1. **`app/page.tsx`** — add a "Partnerships" credential block. Suggested markup shape
   (adapt to the section's existing components/classes; match neighboring cards):
   - Kicker (mono, existing kicker style): `PARTNERSHIPS`
   - Credential line (Inter Tight):
     > "Perplexity Computer Implementation Partner"
   - Supporting line (studio voice, one sentence):
     > "We help teams onboard, integrate, and get real value out of Perplexity Computer — faster, with a senior team that builds, not just advises."
   - Link (opens in new tab, `rel="noopener"`), teal accent, existing link style:
     > text: "About the program →"  href: `https://www.perplexity.ai/hub/computer-partners`
   - The `→` uses the existing arrow treatment for this (Enso, not Strategy to Ship) surface.
2. **`components/Footer.tsx`** — add one credential line near the attribution block:
   > "Perplexity Computer Implementation Partner"
   Link it to the program hub URL above. Keep it visually subordinate to existing footer text.

## Assets
- No new assets required for v1 (text credential).
- If/when the program provides an official partner badge SVG/PNG, drop it at
  `public/images/perplexity-partner-badge.svg` and swap the text credential's kicker for it
  in a follow-up handoff. Do not fabricate or trace a Perplexity logo.

## Brand / content rules to honor
- This is an **Enso Labs** surface → use the studio system (navy `--bg`, electric teal
  `--teal`, Inter Tight). NOT the Strategy to Ship warm palette.
- Studio voice "we", never "I". No hype words ("frontier", "revolutionary", etc.).
- Do not recreate Perplexity branded UI; text credential + outbound link only.
- Gore client stays "Fortune 500 manufacturer".

## Acceptance checklist (Claude Code confirms before PR)
- [ ] `npm run build` passes.
- [ ] Credential copy matches the exact text above.
- [ ] Homepage credential matches the surrounding section's styling (spacing, kicker, card).
- [ ] Footer line renders and links out with `rel="noopener"` in a new tab.
- [ ] Renders correctly at desktop + mobile widths (mobile fixes inside `@media` only).
- [ ] No recreation of Perplexity's logo/branded UI; outbound link is the official hub URL.
- [ ] If schema touched: JSON-LD still validates (`npm run build` clean, no schema errors).

## Out of scope
- The LinkedIn post itself (that's manual — post Mon ~9–10am ET, tag Alex + Perplexity).
- Any site "news card" pointing to the LinkedIn post URL — that's a follow-up handoff once
  the post is live and Sav sends the URL.
- Redesigning the Clients or Proof sections.
