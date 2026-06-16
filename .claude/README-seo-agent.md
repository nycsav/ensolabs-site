# Enso Labs SEO & Brand Agent

Plain-English guide to the recurring brand/SEO automation in this folder. You don't need to write code to use any of it.

## What problem this solves
Three things kept slipping between the daily automated SEO run and needed a human:
1. **Studio voice** — copy that says "I" instead of "we".
2. **Stale third-party profiles** — Crunchbase / LinkedIn / RocketReach / ZoomInfo still showing old titles ("Enso Partners", "AI & CX Innovation Lead").
3. **Search gaps** — terms like "AI strategy consultant NYC" where ensolabs.ai wasn't showing up.

This agent finds all three and hands you ready-to-paste fixes. It never edits your external profiles and never deploys on its own — you stay in control.

## How to run it
In Claude Code (or Cowork), just type:

```
/seo-monitor
```

That runs all three checks and writes a dated report to `drafts/seo-monitor/`. You can also narrow it: `/seo-monitor voice`, `/seo-monitor entity`, or `/seo-monitor gaps`.

## What's in here
- `commands/seo-monitor.md` — the `/seo-monitor` command (the thing you run).
- `agents/entity-drift-scout.md` — the helper that checks your third-party profiles and drafts corrections. The command calls it automatically.
- `scripts/voice-lint.mjs` — a tiny checker for "I" vs "we". Run alone with `node .claude/scripts/voice-lint.mjs`.

## How it connects to the daily run
The daily morning SEO engine now also runs the voice lint each day and the entity-drift scout weekly (Fridays). So most weeks you just read the report. Run `/seo-monitor` manually any time you want a fresh check — e.g. after publishing a new article or updating LinkedIn.

## The rules it follows
- Studio language is always "we", never "I" — except Strategy to Ship insight articles, which are intentional first-person founder field notes (those are flagged for review, not corrected).
- The Gore client stays confidential ("Fortune 500 manufacturer").
- External profiles are yours to edit — the agent only drafts the text.
