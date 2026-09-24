# Scheduled-task incident review — Sep 3–24, 2026
*Written Thu Sep 24, 2026, ~11:30 AM ET. Evidence: 149 run transcripts, 25 task prompts, 6 rule files, 3 prior audits. Three independent review passes.*

## TL;DR

- **Nothing was random.** 60+ logged errors trace back to 5 causes. All 5 are now fixed or gated.
- **Biggest cause: every Heller run loaded ~1.7 MB of rules and logs before doing any work.** The hub was 210 KB, `active-tasks.md` was 1.35 MB, `email-log.md` 640 KB. Runs hit the context limit ("autocompact thrash") and died before their Slack post or close-out — 8 dead runs, 4 of 6 harvester runs among them.
- **Second: tasks were running 2–3 times.** A launchd job, a claude.ai cloud copy, and the Cowork task all fired the same work. Sep 23: harvester ×3, approval-queue ×2, Eton pre-brief ×2.
- **Third: "sent / filed / deployed" was asserted without a receipt.** Nine cases where a draft was reported as sent, a deploy as live, or a file as written.
- **Fourth: rulebooks contradicted each other** (optimizer "never writes" vs ads CLAUDE.md "apply negatives"; cron tasks "never send" vs inbox-sweep "full authority to send").
- **Fifth: a dead tool (`mcp__workspace__bash`) was still called** in 6 runs; fallbacks went to the wrong connector.
- **What changed today:** hub swapped to 15 KB · logs rotated · launchd twin retired · ads rulebook de-conflicted · gates added to all 24 prompts · model rule fixed · inbox-sweep made draft-only.
- **What needs you (2 clicks):** pause the 15 cloud copies at claude.ai → Scheduled, then set each task's model to Sonnet 4.6 / Haiku 4.5 in task settings.

---

## 1. Fixes applied today (all reversible — backups named)

| # | Fix | Where | Backup |
|---|---|---|---|
| 1 | Heller hub swapped: 210 KB → 15 KB (the Sep 22 consolidated draft, 12 rules + Section 0) | `~/Documents/Claude/Heller/CLAUDE.md` | `CLAUDE-ARCHIVE-2026-09.md` |
| 2 | `active-tasks.md` rotated (1.35 MB → 31 KB, last 250 lines live) | `Heller/Tasks/` | `Tasks/Archive/active-tasks-through-2026-09-24.md` |
| 3 | `email-log.md` rotated (640 KB → 31 KB) | `Heller/Emails/` | `Emails/Archive/email-log-through-2026-09-24.md` |
| 4 | Headless launchd approval-queue twin unloaded (was failing daily at 7:31, exit 78 "Operation not permitted") | `~/Library/LaunchAgents/` | `_disabled/com.enso.heller.approval-queue.plist.2026-09-24` |
| 5 | Ads rulebook: removed "INTELLIGENCE PIPELINE" + "AUTONOMOUS OPTIMIZATION POLICY" blocks that let the monitor-only optimizer write to the account | `Heller/AI-Google-Ads/CLAUDE.md` | `CLAUDE-ARCHIVE-2026-09-24.md` lines 111–169 |
| 6 | Model rule: "Opus 4.8 for ALL" → Sonnet 4.6 scans / Haiku 4.5 filing / Opus interactive only | `~/Documents/Claude/CLAUDE.md` §Model Standard; AI-GA Rule 13 | in-line note |
| 7 | **RUNTIME GATES header added to all 24 task prompts** (dead-tool ban, duplicate-fire guard, late-fire rule, read caps, receipts rule, never-send, confidential-client, close-out order, NOT-THIS-TASK) | `~/Claude/Scheduled/*/SKILL.md` | `~/Claude/Scheduled/_backup-2026-09-24/` |
| 8 | `linkedin-inbox-sweep` → **draft-only** (was auto-sending on LinkedIn) | its SKILL.md gate 10 | backup as above |
| 9 | `daily-event-scan` malformed double frontmatter fixed | its SKILL.md | backup |
| 10 | Stale duplicate task folder moved aside | `~/Documents/Claude/_STALE-Scheduled-copies-do-not-use/` | rename only |
| 11 | Cloud copy of `heller-keyword-harvester` paused (was a second writer on the ad account) | claude.ai → Scheduled | toggle |
| 12 | Daily health check now audits duplicates, sleep, and reads 6 official docs; leads with fixes | `mcp-infrastructure-health-check` prompt | — |

## 2. Error log — Heller (client-facing)

| Date | Task | What happened | Root cause |
|---|---|---|---|
| 09-03 | email-scan | Eligard HCP confirmation reported SENT; it was a draft | No receipt rule |
| 09-03 | status-followup | Run stalled on connector error, nothing written, no report | Connector + silent exit |
| 09-06 | Eton monthly report | Stalled after one data pull — no PDF | Missing script `_eton_july_report_0820.py` |
| 09-08 | approval-queue | False "sent" propagated to 3 files; hours written to a non-existent week file | No receipt rule |
| 09-09 | harvester | Called banned bash; ran billing skill in its lane | Dead tool + scope drift |
| 09-10 | approval-queue | Gmail connector error on long draft → stray empty draft | Built-in connector drop |
| 09-11 | harvester | Autocompact thrash before Step 3 — 0 writes | 1.7 MB mandatory reads |
| 09-11 | billing-prep | ~2h duplicate timesheet rows left in place | No dedupe rule |
| 09-14 | approval-queue | Draft to Annie misstated who owns the work | No "quote the ask" rule |
| 09-16 | approval-queue ×2 | Two runs 1 min apart raced on the board file; run B sent to a live thread | Duplicate fire |
| 09-17/18 | optimizer | Mac slept mid-run ×3 | Clamshell sleep |
| 09-18 | approval-queue | Sep 18 hours logged twice incl. a 5 PM run that hadn't happened | Duplicate fire + no receipt |
| 09-18→21 | optimizer | Khindivi went dark Sep 18; not caught until Monday | Friday digest silent-by-design |
| 09-19 | optimizer | Wrote a live budget change ($16→$15) from the monitor-only lane | Contradictory ads rulebook |
| 09-19 | approval-queue | Reported a draft ID that was never created | No receipt rule |
| 09-21 | approval-queue | 5 emails to the team in 90 min, one after "stop" | Contradictory send rules (#49 vs #51) |
| 09-21 | optimizer | Parallel task rewrote billing file, dropped a 1.0h row | Two writers, no append-only |
| 09-23 | harvester ×2 | Both runs thrashed; zero writes | 1.7 MB reads + duplicate fire |
| 09-23 | email-scan ×2 | Both crashed at close-out before the Slack post; both called banned bash | Dead tool + close-out order |
| 09-23 | approval-queue ×2 | Two emails to Ireland reporting a bot-traffic page as "most visited" | No source check + duplicate fire |
| 09-23 | Eton pre-brief | Deck missed the brief (13 pp measurement, no ad-level recs), 5 min before the call; fired twice | Scope + duplicate fire |

## 3. Error log — Enso Labs / personal

| Date | Task | What happened | Root cause |
|---|---|---|---|
| 09-03 | news-brief, partnerships, s2n | All three died mid-run, no report | Mac sleep |
| 09-03…18 | pipeline-close, lead-processor | Printed the confidential client's name while flagging that a source used it | No "never reproduce" rule |
| 09-08 | lead-engine vs lead-processor | Same lead mail filed to Intel by one, Hot by the other | Two owners of one stream |
| 09-08, 16 | seo-audit | "Deployed / READY" with no build, no curl; canonicals declared absolute, were relative | Dead bash → no build; no receipt |
| 09-11 | inbox-cleanup ×4 | Four fires in one hour during DNS outage | Scheduler retry |
| 09-14 | job-sweep | Wrote an apply file with EEO Disability="Yes" | Simplify autofill; no BLANK rule in prompt |
| 09-14 | event-scan | Sep-2025 listing pushed as "decide today" | No year check |
| 09-16 | lead-processor | `newer_than:1d` missed a digest | Rolling window (banned) |
| 09-17 | inbox-cleanup | enso-google down → 40 writes on built-in Gmail | Wrong fallback |
| 09-18, 23 | inbox-cleanup | Archived STARRED Partnerships→Active and Jobs→Action threads | No exclusion list |
| 09-18 | job-sweep | Triage task SUBMITTED an application | Scope drift |
| 09-18 | seo-audit | Session edited CLAUDE.md directly (protected path) | No branch/PR gate in prompt |
| 09-21 | lead-processor | Confirmed: 6 AM sweep archives lead mail before 10 AM processor runs | Task ordering |
| 09-21 | s2n | "→" wordmark; 2025 stat labelled 2026 | Brand-lock not in prompt |
| 09-22 | linkedin-inbox-sweep | Sent 4 LinkedIn replies: offered dates that don't exist, replied to a competitor pitching Sav | Unattended send authority |
| 09-23 | linkedin-inbox-sweep | Canonical Chrome absent, used another profile; replied to an Aug-16 recruiter | No device check; no age check |
| 09-23 | partnerships | Missed 4 partner emails; ended silent | Rolling window + silent exit |

## 4. Root causes → fix status

| # | Cause | Errors explained | Fix | Status |
|---|---|---|---|---|
| 1 | Context exhaustion: 1.7 MB of mandatory reads per Heller run | ~10 dead/degraded runs | Hub 15 KB; logs rotated; read caps in every prompt | ✅ done |
| 2 | Duplicate runners (launchd + cloud + Cowork) | ~12 | launchd retired; harvester cloud paused; dup-fire guard in prompts; **15 cloud copies await your pause** | 🟡 you |
| 3 | Claims without receipts | ~19 | Receipts rule (gate 5) in every prompt; hub Section 0.2 | ✅ done |
| 4 | Contradictory rules (send/draft/write/model) | ~8 | Hub consolidated; ads blocks removed; inbox-sweep draft-only; model rule reversed | ✅ done (model click = you) |
| 5 | Dead tools + wrong fallback | ~9 | Gate 1 in every prompt; seo-audit rebuilt around Desktop Commander + PR | ✅ done |
| 6 | Mac clamshell sleep | ~14 | Not fixed (you said overnight schedulers need the Mac asleep) — late-fire rule now makes runs say so and go delta-only | 🟡 accepted |

## 5. What needs you (in order)

1. **claude.ai → Scheduled: pause the 15 active cloud copies** (Job Triage, AI platforms monitor, Lead Processor, Ads optimizer, AI news brief, LLM Wiki, SEO audit, Status call prep, Status call followup, Pipeline close, Event scan, Signal2noise, Credential sweep, Event board sweep, Friday billing prep). Then reply **"cloud off"** and I enable the local copies, which already carry today's gates. Until then those 15 run from cloud prompts I cannot edit.
2. **Task settings → model:** Sonnet 4.6 for scans/content; Haiku 4.5 for inbox-cleanup, lead-processor, job-sweep, billing-prep. No Opus on any recurring task.
3. **Decide:** `linkedin-inbox-sweep` is now draft-only. If you want warm-inbound auto-send back, say so and I'll re-enable it with a recruiter/vendor/competitor exclusion.

## 6. Claude Code prompt (for what Cowork can't do)

Paste into Claude Code opened at `/Users/savbanerjee/Projects/ensolabs-site`:

```
Read docs/INCIDENT-REVIEW-2026-09-24.md first. Then, on a branch `ops/incident-2026-09-24` (never master):

1. CLAUDE.md (protected path, PR only): add a section "## Scheduled-run gates (2026-09-24)" that mirrors the 10 RUNTIME GATES in ~/Claude/Scheduled/heller-approval-queue/SKILL.md (gates 1–9 are generic; omit gate 10). In "Send authority", add one line: "Applies to interactive sessions only. Unattended scheduled runs never send (see Scheduled Task Rules)." In "Token-Lean Operations", fix the stale "8a/5p PT" → "8a/5p ET". In "KNOWN-BROKEN SURFACES" add: "7. mcp__workspace__bash — dead (useradd exit 12) since at least 2026-09-15; use Desktop Commander start_process."
2. .claude/scripts/ensolabs-seo-audit: none exists — create scripts/ops/seo-run.sh that does: git checkout -b seo/$(date +%F) → npm run build → exit non-zero on failure → git push -u → gh pr create --fill. The seo-audit task prompt now calls this flow via Desktop Commander.
3. In /Users/savbanerjee/Documents/Claude/Heller/AI-Google-Ads/: `_alk_khin_step2e.py` and `_eton_july_report_0820.py` are referenced by the optimizer STEP 2E and the Eton monthly task but do not exist. Either restore them from git history or replace both references with the equivalent `heller_ads.py` CLI calls; run `python3 heller_ads.py selftest` via Desktop Commander and paste PREFLIGHT PASS.
4. Write a 20-line `scripts/ops/rotate-logs.sh` that rotates Heller/Tasks/active-tasks.md and Heller/Emails/email-log.md when >200 KB (same format as today's rotation: archive + keep last 250 lines with a header). Add it as a monthly step to the mcp-infrastructure-health-check prompt.
5. Open the PR with the incident review linked. Do not merge — Sav reviews.
```

## 7. What looked fine (do not over-fix)
approval-queue 09-04/09/15/17/22 · email-scan 09-08/10/16/17/21 · optimizer digests 09-14/16/17/18 (0 writes, gates PASS) · billing-prep 09-04/18 · status-call prep+followup 09-10/17 (refused to fabricate a missing transcript) · credential-sweep both runs · li-perf 09-21 · s2n 09-09/18 · board-sweep 09-21 · event-scan 09-04/21 · seo-audit 09-21 (only run that curl-verified) · lead-engine 09-18/24 · partnerships 09-22.

## 8. Sources
- Run transcripts: `~/Library/Application Support/Claude/local-agent-mode-sessions/…/local_<id>.json` (ids in the review agents' logs, this session)
- Prior audits: `Heller/INSTRUCTIONS-AUDIT-2026-09-22.md`, `Heller/CLAUDE-CONSOLIDATED-DRAFT-2026-09.md`, `Heller/OPERATING-CONTRACT-DRAFT-2026-09-22.md`
- Docs: [Schedule recurring tasks in Claude Cowork](https://support.claude.com/en/articles/13854387-schedule-recurring-tasks-in-claude-cowork) · [Cowork on web/desktop/mobile](https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile) · [Claude Code desktop scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks)
