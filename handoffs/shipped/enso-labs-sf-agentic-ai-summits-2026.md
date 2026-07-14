# Handoff — Enso Labs in SF (AGI Summit + Berkeley Agentic AI Summit announcement) — enso-labs-sf-agentic-ai-summits-2026

> Written by Claude Design. Executed in Claude Code with `/ship-handoff enso-labs-sf-agentic-ai-summits-2026`.
> Routine content handoff → auto-merges on green. Source brief: `uploads/Draft_SF-Summits-Announcement-Package.md` (Claude Design project).
> EXECUTED 2026-07-14 — dates bumped from 2026-07-13 to 2026-07-14 per the handoff's own instruction (shipped after Jul 13). Facts re-verified against agisummit.ai + rdi.berkeley.edu on 2026-07-14.

## Summary
Publish the "Enso Labs in SF" summit-announcement Insight (AGI Summit, Jul 18–19 · Berkeley Agentic AI Summit, Aug 1–2) plus its branded "Meet us in SF." social cards. Adding the insight auto-wires the home Live Intelligence feed, /insights (featured), sitemap.xml, feed.xml, llms-full.txt, the MCP endpoint, and FAQPage/Article/Breadcrumb JSON-LD. One new OG generator + two PNGs. No app/component/CSS changes.

## Target
- Branch: `design/enso-labs-sf-agentic-ai-summits-2026`
- Files touched:
  - `lib/insights.ts` — prepended one `Insight` entry (slug `enso-labs-sf-agentic-ai-summits-2026`, dated 2026-07-14)
  - `scripts/generate-og-sf-summits.js` — new generator (photo version A: full-bleed Golden Gate + navy scrim)
  - `package.json` — added `og:sf-summits` npm script
  - `public/og/og-enso-labs-sf-agentic-ai-summits-2026.png` (1200×630) + `…-portrait.png` (1080×1350) — generated
  - `public/llms.txt` — Insights count 17→18 + new first list item; new first Recent Coverage bullet
- NOT touched: `app/**`, `components/**`, `app/globals.css`, `lib/schema.ts`, other insights.

## Acceptance checklist (verified 2026-07-14)
- [x] `npm run build` passes; `/insights/enso-labs-sf-agentic-ai-summits-2026` prerendered (SSG .html/.meta/.rsc present)
- [x] `npm run og:sf-summits` emitted both PNGs at exact sizes (1200×630 + 1080×1350); eyeballed — Golden Gate sunset under navy scrim, Lora "Meet us in SF.", one-line dek, two translucent event chips with dates/venues/stats + agisummit.ai / rdi.berkeley.edu, ONE coral swept-ribbon arrow, "Book 20 minutes in SF" pill, centered ENSO LABS lockup
- [x] Article OG referenced at `/og/og-enso-labs-sf-agentic-ai-summits-2026.png` (hero image = same path)
- [x] Article is #1 in home feed and featured on `/insights` (newest date, 2026-07-14)
- [x] `public/llms.txt` count reads 18; both new bullets present
- [x] No references to deprecated signal2noise / signals.ensolabs.ai
- [x] Event facts verified live (agisummit.ai · rdi.berkeley.edu/events/agentic-ai-summit-2026)
- [ ] POST-MERGE: external render check — `curl -s https://ensolabs.ai/insights/enso-labs-sf-agentic-ai-summits-2026` clean + homepage shows the card

## Notes
- The generator inlines only the CSS used by the photo-version posters (unused line-art/B-version rules from the design file trimmed); rendered output identical to the design.
- LinkedIn post + native article are drafted in the content-ops pack (private repo) — posted manually, out of scope here.
