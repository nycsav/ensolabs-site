# Enso Labs Design → Code Handoff

Plain-English guide to the handoff pipeline in this folder. You don't need to write code
to use it. It exists so a design made in Claude Design reaches **production** in one line,
without you re-explaining the branch/build/PR steps or clicking merge on routine work.

## What problem this solves
The old loop had three manual steps every handoff:
1. Copy-paste the design handoff text into Claude Code.
2. Claude Code re-derived the same branch/build/PR mechanics each run.
3. Assets rode on expiring URLs that could die mid-run.

This pipeline kills all three: the handoff is a committed file, the mechanics are codified
once, and recurring assets live in `public/`.

## How to run it
Two ways in, one engine underneath.

**A. `/goal <objective>` — one line, no design step.** For self-contained changes (a copy
fix, a link, a credential, metadata). It drafts the handoff from your sentence, then runs
the engine (branch → build → PR → auto-merge on green). It defers design-heavy work back to
Claude Design instead of guessing.

```
/goal add a careers link to the footer
```

**B. `/ship-handoff <slug>` — for design work.** When Claude Design has already written
`handoffs/<slug>.md` (layouts, components, brand/hero work), run:

```
/ship-handoff <slug>
```

e.g. `/ship-handoff perplexity-partner`. Leave the slug off (`/ship-handoff`) to run the
newest handoff in `handoffs/`. It will:
- branch `design/<slug>` off master,
- apply the handoff spec,
- run `npm run build`,
- push and open a PR,
- and **auto-merge on green**: GitHub merges the moment the Vercel check passes, so it
  goes live with no click from you. A failing build never merges.

**The one exception — the tripwire.** If the change touches agent-behavior / config /
brand-critical files (`CLAUDE.md`, `.claude/`, `globals.css`, schema, `next.config`,
`package.json`, `vercel.json`), auto-merge is withheld and the PR waits for you. Routine
content — page copy, credentials, sections — flows hands-off. Force review on any run with
a 4th arg `review` or `NO_AUTOMERGE=1`.

## The one-line loop with Claude Design
1. In Claude Design, get your asset/page. Claude Design also writes `handoffs/<slug>.md`.
2. In Claude Code: `/ship-handoff <slug>` (or, for a simple change with no design, just
   `/goal <objective>` — skip Claude Design entirely).
3. It merges itself when the build passes — you do nothing (unless the tripwire holds it). Done.

## What's in here
- `commands/goal.md` — the `/goal <objective>` front door: drafts a handoff, then ships it.
- `commands/ship-handoff.md` — the `/ship-handoff` command (ships a handoff Claude Design wrote).
- `scripts/ship-handoff.sh` — the branch + PR executor. Reuses the same sandbox-safe
  rules as `safe-deploy.sh` (no `git rm`, rename stale locks). `safe-deploy.sh` still
  handles the daily SEO engine's direct-to-master pushes; this one is branch-only.
- `../handoffs/_TEMPLATE.md` — copy this to write a new handoff.
- `../handoffs/shipped/` — executed handoffs are archived here automatically.

## The rules it follows
- **Never pushes to master directly** — always a branch + PR. Routine PRs auto-merge on a
  green Vercel check; a broken build never merges; protected-path diffs wait for you.
- One-time setup for auto-merge lives in `AUTOMERGE-SETUP.md` (run once).
- Studio language is always "we", never "I".
- The Gore client stays confidential ("Fortune 500 manufacturer").
- Strategy to Ship brand rules apply (arrow → always Ship Coral, "Powered by Enso Labs").
- Recurring brand assets are committed in `public/`, not fetched from expiring URLs.
