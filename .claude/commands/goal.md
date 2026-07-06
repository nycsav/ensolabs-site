---
description: Ship a plain-English objective end-to-end. Drafts a handoff spec from your sentence, then branches, builds, opens a PR, and auto-merges on green. Use for self-contained changes (copy, a credential, metadata). For design-heavy work, use the handoff Claude Design writes + /ship-handoff.
argument-hint: "<plain-English objective, e.g. add a careers link to the footer>"
model: opus
---

You are running **/goal** — the one-line front door to the Enso Labs Design → Code
pipeline. Sav gave a plain-English objective: `$ARGUMENTS`. Your job is to turn it into a
shipped production change by DRAFTING a handoff spec and then running the exact same
engine `/ship-handoff` uses. Work autonomously; Sav is time-pressed and will not review
routine work.

## Guardrail — know when to stop and defer
`/goal` is for **self-contained, low-judgment** changes: copy edits, a link, a credential
line, metadata/SEO tweaks, a small section using existing components and styles.

If the objective needs real **design judgment** — a new layout, a new visual component, a
page redesign, brand/hero work, anything where "what should it look like" is open — do NOT
guess. Stop and reply: "This needs a design pass in Claude Design. Ask it to write
`handoffs/<slug>.md`, then run `/ship-handoff <slug>`." Then end. Shipping a weak guess is
worse than deferring.

## 1. Derive a slug + draft the handoff
- Make a short kebab slug from the objective (e.g. "add a careers link to the footer" →
  `footer-careers-link`). If `handoffs/<slug>.md` exists, suffix `-2`, `-3`, …
- Copy `handoffs/_TEMPLATE.md` → `handoffs/<slug>.md` and fill EVERY section from the
  objective + the repo. Read the actual target files first (grep/read `app/`, `components/`,
  `lib/`) so the spec names real files, real components, and real class conventions — never
  invented ones. Write exact final copy in the studio voice ("we", never "I"; no hype words).
- Honor all repo brand rules: Gore client stays "Fortune 500 manufacturer"; Strategy to
  Ship arrow → always Ship Coral `#F0512E` + "Powered by Enso Labs"; Enso studio surfaces
  use the navy/teal system; no recreation of third-party branded UI (text + outbound link
  only). Fill the acceptance checklist concretely.
- Commit the drafted handoff so there's a versioned trail. Show Sav the spec's Summary +
  Changes list in one tight block BEFORE editing code, so the intent is on record.

## 2. Run the engine (identical to /ship-handoff steps 2–6)
- `bash .claude/scripts/ship-handoff.sh start <slug>` — branch `design/<slug>` off master.
- Apply the handoff exactly — no scope creep beyond what you wrote.
- `npm run build` must exit 0 (and `npx tsc --noEmit` if types changed). Fix before shipping.
- `bash .claude/scripts/ship-handoff.sh ship <slug> "design: <short subject>"` — commits,
  pushes, opens a PR, and enables green-gated auto-merge UNLESS the diff hits a protected
  path (`CLAUDE.md`, `.claude/`, `globals.css`, schema, `next.config`, `package.json`,
  `vercel.json`), in which case it's held for Sav. Append `review` / set `NO_AUTOMERGE=1`
  to force manual review on a risky run.
- Confirm the Vercel deployment reaches READY via the Vercel MCP; capture the preview URL.
- **External-render gate (REQUIRED) — "live" = an external curl is clean, NOT deploy-status.**
  After deploy, purge the CDN/edge cache for the changed route(s) (static content routes set
  `export const revalidate`), then `curl -s https://ensolabs.ai<route>` and assert the NEW
  copy is present and the OLD copy absent. If stale, purge and re-verify — never report
  "live" off deploy-status alone.
- Move the handoff to `handoffs/shipped/<slug>.md` (fs/`mv`, then `git add -A` on the branch).

## 3. Report (tight)
One block: the objective → the slug · files changed · build status · **Vercel URL** · PR URL ·
and whether it **auto-merged on green** or is **held for review** (say which, and why if held).
No process narration.
