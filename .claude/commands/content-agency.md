# /content-agency — Content Agency Harness orchestrator

Runs the 4-agent content pipeline for a new Strategy to Ship insight. Spec: `handoffs/content-agency-harness.md`. Design system: `docs/brand/STRATEGY-TO-SHIP-BRAND-LOCK.md` §8 (the 36-point-gap card).

## Usage
`/content-agency "<brief>"` — or `/content-agency resume <slug>` to continue a stalled pipeline from its `state.json` status.

## Phase 0 — Parse the brief
Extract topic, primary keyword, angle, audience, and a URL-safe slug (≤ 6 words, from the working title). Make reasonable assumptions and state them in one line — do not ask.

## Phase 1 — Initialize
`mkdir -p content-pipeline/<slug>` and write `state.json`:
```json
{ "slug": "", "topic": "", "keyword": "", "angle": "", "audience": "", "brief": "<verbatim>",
  "status": "research", "research_complete": false, "draft_complete": false,
  "editorial_complete": false, "published": false, "url": null, "pr_url": null,
  "linkedin_post_path": null, "created_at": "<ISO>", "updated_at": "<ISO>" }
```

## Phase 2 — Research → `content-researcher`
"Run the full research pass for content-pipeline/<slug>/. Read state.json for the brief; write research.md; update state.json." Wait for `status === "drafting"`.

## Phase 3 — Draft → `content-developer`
"Draft the article for content-pipeline/<slug>/. Read research.md + state.json; write draft.md and visuals.md; update state.json." Wait for `status === "editorial"`.

## Phase 4 — Editorial → `content-editor`
"Run the editorial gate for content-pipeline/<slug>/. Write draft-final.md + editorial-notes.md; update state.json." Wait for `"publishing"` or `"needs_revision"`. On `needs_revision`: show editorial-notes.md 🚩 items to Sav and stop. Resume after he resolves them.

## Phase 5 — Publish → `content-publisher`
"Publish content-pipeline/<slug>/. Read draft-final.md, visuals.md, state.json. Run all nine steps; ship as branch + PR; update state.json."

## Phase 6 — Report
Relay the publisher's final report and the LinkedIn Post Inspector URL. Say where every file is with a full path.

## Rules every phase inherits
Studio "we"; the /work/gore client is "a Fortune 500 manufacturer"; no fabricated numbers; every card renders through `scripts/lib/s2s-card-template.js`; new photography per article; never `git add -A`; branch + PR, never master; hex colors only in OG code.
