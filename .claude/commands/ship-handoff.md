---
description: Execute a Claude Design handoff end-to-end — branch off master, apply the handoff spec, npm run build, push, open a PR + Vercel preview. Never merges; Sav reviews and merges.
argument-hint: "[handoff slug, e.g. perplexity-partner] (default: newest file in handoffs/)"
model: opus
---

You are running the **Enso Labs Design → Code Handoff**. This turns a design produced in
Claude Design into a reviewable production PR in one step, so Sav never re-explains the
branch/build/PR mechanics. Handoff slug = `$ARGUMENTS` (default: the most recently
modified file in `handoffs/`, ignoring `_TEMPLATE.md`).

Work autonomously. **Never push to master and never merge** — this flow is branch + PR +
Vercel preview only. Sav reviews the preview and merges.

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

## 5. Ship as a PR (never merge)
Run: `bash .claude/scripts/ship-handoff.sh ship <slug> "design: <short subject>"`
This stages, commits (Co-Authored-By Claude), pushes the branch, and opens a PR. Vercel
builds a preview from the branch automatically. Confirm the deployment reaches READY via
the Vercel MCP and capture the preview URL.

## 6. Archive + report
- Move the executed handoff to `handoffs/shipped/<slug>.md` (via fs/`mv`, then `git add -A`
  on the same branch) so `handoffs/` only holds pending work.
- Summarize in chat, tight: branch name · files changed · build status · **Vercel preview
  URL** · PR URL · the human-gated next step ("review preview → merge PR").

Do NOT pad with process narration. The PR and preview do the talking.
