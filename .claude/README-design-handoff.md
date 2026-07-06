# Enso Labs Design → Code Handoff

Plain-English guide to the handoff pipeline in this folder. You don't need to write code
to use it. It exists so a design made in Claude Design reaches a reviewable production PR
in **one line**, without you re-explaining the branch/build/PR steps every time.

## What problem this solves
The old loop had three manual steps every handoff:
1. Copy-paste the design handoff text into Claude Code.
2. Claude Code re-derived the same branch/build/PR mechanics each run.
3. Assets rode on expiring URLs that could die mid-run.

This pipeline kills all three: the handoff is a committed file, the mechanics are codified
once, and recurring assets live in `public/`.

## How to run it
In Claude Code, type:

```
/ship-handoff <slug>
```

e.g. `/ship-handoff perplexity-partner`. Leave the slug off (`/ship-handoff`) to run the
newest handoff in `handoffs/`. It will:
- branch `design/<slug>` off master,
- apply the handoff spec,
- run `npm run build`,
- push and open a **PR + Vercel preview**,
- and **stop** — it never merges. You review the preview and merge.

## The one-line loop with Claude Design
1. In Claude Design, get your asset/page. Claude Design also writes `handoffs/<slug>.md`.
2. In Claude Code: `/ship-handoff <slug>`.
3. Review the Vercel preview → merge the PR. Done.

## What's in here
- `commands/ship-handoff.md` — the `/ship-handoff` command (the thing you run).
- `scripts/ship-handoff.sh` — the branch + PR executor. Reuses the same sandbox-safe
  rules as `safe-deploy.sh` (no `git rm`, rename stale locks). `safe-deploy.sh` still
  handles the daily SEO engine's direct-to-master pushes; this one is branch-only.
- `../handoffs/_TEMPLATE.md` — copy this to write a new handoff.
- `../handoffs/shipped/` — executed handoffs are archived here automatically.

## The rules it follows
- **Never auto-merges and never pushes to master** — always a PR + preview for you to approve.
- Studio language is always "we", never "I".
- The Gore client stays confidential ("Fortune 500 manufacturer").
- Strategy to Ship brand rules apply (arrow → always Ship Coral, "Powered by Enso Labs").
- Recurring brand assets are committed in `public/`, not fetched from expiring URLs.
