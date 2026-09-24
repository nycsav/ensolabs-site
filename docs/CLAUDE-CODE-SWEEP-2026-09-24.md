# One-pass scheduled-task sweep — paste into Claude Code

Open Claude Code at `/Users/savbanerjee/Projects/ensolabs-site` and paste everything below the line. Model: Sonnet 4.6 is fine. Expect ~20 minutes.

---

You are doing a one-pass clean sweep of Sav Banerjee's Claude Cowork scheduled tasks after a 3-week incident. Read `docs/INCIDENT-REVIEW-2026-09-24.md` first (5 min). Then do ALL of the following in order, verifying each step before moving on. Never ask a clarifying question when a default exists; state assumptions in one line. Never push to master.

## STEP 1 — Inventory (read-only)
- Local tasks: read `~/Library/Application Support/Claude/local-agent-mode-sessions/*/*/scheduled-tasks.json` → list every `id`, `enabled`, `cronExpression`, `filePath`.
- Prompts: every `~/Claude/Scheduled/<id>/SKILL.md`. Confirm each has exactly ONE `## ⛔ RUNTIME GATES — added 2026-09-24` block right after the frontmatter (24 should). Backups are in `~/Claude/Scheduled/_backup-2026-09-24/`.
- Print a table: task | enabled | cron | prompt KB | has gates.

## STEP 2 — Models in frontmatter (Cowork honors `model:` in SKILL.md frontmatter; see `eligard-weekly-performance-digest/SKILL.md` for the pattern)
Add or replace a `model:` line in every SKILL.md frontmatter:
- `model: claude-haiku-4-5` → daily-inbox-cleanup, linkedin-lead-processor, job-sweep-daily, heller-friday-billing-prep, heller-monthly-report-reminder, mcp-infrastructure-health-check
- `model: claude-sonnet-4-6` → every other task (all Heller scans, email-scan, approval-queue, optimizer, harvester, event-scan, news-brief, partnerships, seo-audit, s2n, pipeline-close, llmwiki, credential-sweep, board-sweep, li-perf, inbox-sweep, status-call prep/followup, eton-monthly, lead-engine)
- No task gets Opus or Fable. Remove any `model: claude-opus-4-8` line.

## STEP 3 — Dead references inside prompts (fix in place, keep the backups)
- `heller-daily-google-ads-optimizer`: STEP 2E references `_alk_khin_step2e.py`, which does not exist; the dated copies do (`heller-google-ads-mcp/_alk_khin_step2e_0924.py` etc). Replace the reference with: "run the NEWEST `_alk_khin_step2e_*.py` in `AI-Google-Ads/heller-google-ads-mcp/` (ls -t | head -1); if none is newer than 7 days, run `python3 heller_ads.py perf <cid> <date-range>` for 7583405456 and 6430710264 instead."
- `heller-eton-monthly-paid-search-report`: `_eton_july_report_0820.py` does not exist. Replace with the `heller_ads.py perf` CLI + the PDF step already in the prompt.
- `heller-approval-queue` Guardrail 3: `AI-Google-Ads/Tasks/write-log.jsonl` → `AI-Google-Ads/heller-google-ads-mcp/write-log.jsonl`.
- Any prompt still mentioning `mcp__workspace__bash` as a tool to USE, `/sessions/`, `events-inbox-filer`, `sf-*` watches, "9:20 PM" inbox cleanup, "3:45 PM" news brief, "SF window active", or `Documents/Claude/Scheduled/` → delete or correct the line (the gates header already overrides, but remove the contradiction).
- Grep every prompt for `she/her` referring to Sav and change to `he/him` (hub #50).
- Grep every prompt and both Heller CLAUDE.md files for "Strategy → Ship" / "S→S" → "Strategy to Ship".

## STEP 4 — Scripts (create, then run once to prove they work)
- `scripts/ops/rotate-logs.sh`: for `~/Documents/Claude/Heller/Tasks/active-tasks.md` and `~/Documents/Claude/Heller/Emails/email-log.md`, if size > 200 KB: move to `Archive/<name>-through-<date>.md`, recreate the file with a 2-line header + `tail -250` of the archive. Idempotent. Run it (it should print "nothing to rotate" today — both were rotated this morning).
- `scripts/ops/seo-run.sh`: `git checkout -b seo/$(date +%F)` (or reuse if exists) → `npm run build` → on non-zero exit print the last 30 lines and exit 1 → `git push -u origin HEAD` → `gh pr create --fill --base master`. Run `npm run build` now and paste the last 5 lines as proof the site builds on the current tree.
- Test the Heller ads path: `cd ~/Documents/Claude/Heller/AI-Google-Ads/heller-google-ads-mcp && python3 heller_ads.py selftest` → must print PREFLIGHT PASS. If it doesn't, stop and report the exact error; do not modify the ad account.

## STEP 5 — ensolabs-site CLAUDE.md (protected path → branch + PR, never merge)
On branch `ops/incident-2026-09-24`:
- Add section `## Scheduled-run gates (2026-09-24)` mirroring gates 1–9 from `~/Claude/Scheduled/heller-approval-queue/SKILL.md`.
- In "Send authority" add: "Applies to interactive sessions only. Unattended scheduled runs never send (see Scheduled Task Rules)."
- In "Token-Lean Operations" fix "8a/5p PT" → "8a/5p ET" and replace the model bullet with: Haiku 4.5 filing / Sonnet 4.6 scans / Opus interactive only (set in SKILL.md frontmatter).
- In "KNOWN-BROKEN SURFACES" add item 7: "`mcp__workspace__bash` — dead (useradd exit 12) since at least 2026-09-15; use Desktop Commander `start_process`." and item 8: "claude.ai cloud copies of local tasks — a second runner; keep every task local-only; the daily health check flags any name active in both places."
- Commit the untracked `PREP-Hanwha-Flora-2026-09-22.md`? NO — leave untracked files alone. Commit only CLAUDE.md, docs/, scripts/ops/.
- `gh pr create --title "ops: scheduled-task incident fixes 2026-09-24" --body-file docs/INCIDENT-REVIEW-2026-09-24.md --base master`. Print the PR URL. Do not merge.

## STEP 6 — Local task enable state (make the local list the single source of truth)
Using the Cowork task list only (`scheduled-tasks.json` is read-only for you — do NOT edit it; list what SHOULD change instead):
Print a table of the 15 tasks whose claude.ai cloud copy is still active (Ai platforms partnerships monitor [already paused], Job Triage [paused], Lead Processor [paused], Heller daily google ads optimizer, Enso ai news brief [paused], LLM Wiki, Ensolabs seo audit, Heller weekly status call prep, Enso pipeline close, Daily event scan, Signal2noise intelligence, Heller weekly status call followup, Weekly credential sweep, Weekly event board sweep, Heller friday billing prep) with: local enabled? | cloud active? | ACTION. The rule: pause the cloud copy, enable the local one, never both. Sav does the 11 remaining cloud pauses in one pass at https://claude.ai/scheduled-task (toggle on each card's page); the local enables are done in Cowork → Scheduled.

## STEP 7 — Verify + report
- Re-run STEP 1's table; every prompt must show gates=1 and a model line.
- `git diff --stat master..ops/incident-2026-09-24`.
- Write `docs/SWEEP-RESULT-2026-09-24.md`: TL;DR (5 bullets), what changed, build output, selftest output, PR URL, and the one remaining human action (11 cloud toggles).
