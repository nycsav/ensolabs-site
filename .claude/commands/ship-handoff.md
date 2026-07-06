---
description: Execute a Claude Design handoff end-to-end — branch off master, apply the handoff spec, npm run build, push, open a PR, and green-gated auto-merge (merges itself when Vercel passes). Config/brand-critical diffs are held for review.
argument-hint: "[handoff slug, e.g. perplexity-partner] (default: newest file in handoffs/)"
model: opus
---

You are running the **Enso Labs Design → Code Handoff**. This turns a design produced in
Claude Design into a live production change in one step, so Sav never re-explains the
branch/build/PR mechanics and never has to click merge on routine work. Handoff slug =
`$ARGUMENTS` (default: the most recently modified file in `handoffs/`, ignoring `_TEMPLATE.md`).

Work autonomously. Never push to master directly — always branch + PR. Routine handoffs
**auto-merge on green** (GitHub merges the moment the Vercel check passes; a failing build
never merges). Diffs touching protected paths (`CLAUDE.md`, `.claude/`, `globals.css`,
schema, `next.config`, `package.json`, `vercel.json`) are held for Sav's review.

## 1. Resolve the handoff
- If `$ARGUMENTS` is empty, pick the newest `handoffs/*.md` except `_TEMPLATE.md`.
- Read `handoffs/<slug>.md` fully. It is the spec: what to change, which files, exact
  copy, assets, and an acceptance checklist. If the file references assets under
  `public/`, confirm they exist (recurring brand assets are committed, not fetched from
  expiring URLs). If a one-off asset URL is present, download it into the path the
  handoff names before editing.

## 2. Branch
Run: `bash .claude/scripts/ship-handoff.sh start <slug>`
This fetches master and creates `design/<slug>` off `origin/master`. Do all edits here.

## 3. Apply the handoff
Make exactly the changes the handoff specifies — no scope creep. Follow the repo rules in
CLAUDE.md (studio "we", Gore client confidential, Strategy to Ship brand rules, mobile
fixes inside `@media` only, never modify base CSS rules). Delete files via the filesystem
connector or `mv` — never `git rm` (the sandbox blocks unlink()).

## 4. Verify (build must pass)
- `npm run build` — must succeed. Fix type/build errors before proceeding.
- `npx tsc --noEmit` if the change touches types.
- Re-read the handoff's acceptance checklist and confirm each item.
- **Cache + external-render check (REQUIRED for content changes) — "live" = an external
  curl is clean, NOT deploy-status.** After the change deploys, purge the CDN/edge cache for
  the changed route(s) (a fresh production deploy; static content routes should set
  `export const revalidate`), then run `curl -s https://ensolabs.ai<route>` for each changed
  route and assert the NEW string is present and the OLD string absent, e.g.
  `curl -s https://ensolabs.ai | grep -q "<new>" && ! curl -s https://ensolabs.ai | grep -qi "<old>" && echo EXTERNAL_OK || echo "STALE: edge still serving old HTML"`.
  If the external curl is stale, the task is NOT done — purge and re-verify. Never report
  "live" off deploy-status alone (the exact gap that shipped stale HTML on 2026-07-06).

## 5. Ship (auto-merge on green)
Run: `bash .claude/scripts/ship-handoff.sh ship <slug> "design: <short subject>"`
This stages, commits (Co-Authored-By Claude), pushes the branch, opens a PR, and enables
green-gated auto-merge — UNLESS the diff touches protected paths (then it's held for review).
GitHub merges automatically when the Vercel check passes; you do not wait on a human.
- To force manual review on a specific run, append a 4th arg `review` or set `NO_AUTOMERGE=1`.
- Confirm the Vercel deployment reaches READY via the Vercel MCP and capture the preview URL.
  (If auto-merge fired, that same commit deploys to production once merged.)

## 6. Archive + report
- Move the executed handoff to `handoffs/shipped/<slug>.md` (via fs/`mv`, then `git add -A`
  on the same branch) so `handoffs/` only holds pending work.
- Summarize in chat, tight: branch · files changed · build status · **Vercel preview URL** ·
  PR URL · and whether it **auto-merged** or is **held for review** (say which, and why if held).

Do NOT pad with process narration. The PR and preview do the talking.
