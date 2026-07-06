# Handoff: <TITLE> — <slug>

> Written by Claude Design. Executed in Claude Code with `/ship-handoff <slug>`.
> One spec = one PR. Keep it scoped: describe only what should change.

## Summary
<One or two plain sentences: what this handoff adds/changes and why.>

## Target
- Branch: `design/<slug>` (auto)
- Pages/files to touch: `app/...`, `components/...`, `lib/...`
- Do NOT touch: <anything explicitly out of scope>

## Changes (exact)
1. **<file path>** — <what to change>. Exact copy:
   > "<final copy, ready to paste — studio 'we', no hype words>"
2. **<file path>** — <what to change>.

## Assets
- <asset name> → committed at `public/images/<file>` (stable path). If not present, add it.
- One-off asset (this handoff only): download `<url>` → `public/...` before editing.
- If none: "No new assets."

## Brand / content rules to honor
- Studio voice "we", never "I". No hype words.
- Strategy to Ship: arrow → always Ship Coral `#F0512E`; "Powered by Enso Labs".
- Gore client stays "Fortune 500 manufacturer" (confidential).
- Mobile fixes inside `@media` only; never modify base CSS rules.

## Acceptance checklist (Claude Code confirms before PR)
- [ ] `npm run build` passes.
- [ ] Copy matches the exact text above.
- [ ] Renders correctly at desktop + mobile widths.
- [ ] No new external links to deprecated `signals.ensolabs.ai` / signal2noise.
- [ ] JSON-LD / OG unaffected (or updated if the handoff says so).

## Out of scope
<Explicitly list what NOT to change so the run stays tight.>
