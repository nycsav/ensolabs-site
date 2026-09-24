# Scheduled-task sweep result — 2026-09-24

*Run by Claude Code from `docs/CLAUDE-CODE-SWEEP-2026-09-24.md`, Thu Sep 24, 2026 (afternoon ET). Companion to `docs/INCIDENT-REVIEW-2026-09-24.md`.*

## TL;DR

- **25 active prompts now carry the runtime-gates block and a `model:` line** (24 from the morning + `mcp-infrastructure-health-check`, which had been missed; backup added to `_backup-2026-09-24/`). 6 on Haiku 4.5, 19 on Sonnet 4.6. Zero Opus/Fable lines anywhere in `~/Claude/Scheduled/` (the merged `eligard-weekly-performance-digest` lost its `claude-opus-4-8` line; 12 body-text "Opus 4.8" mentions were corrected to match the frontmatter).
- **Dead references removed:** `_alk_khin_step2e.py` (optimizer STEP 2E), `_eton_july_report_0820.py` (Eton monthly), the `/sessions/` + `mcp__workspace__bash` + `git push origin master` deploy path in `ensolabs-seo-audit`, the 3:45 PM afternoon news-brief run, the 9:20 PM inbox-cleanup history, `events-inbox-filer` / `sf-*` in the health check, a "Strategy → Ship" brand line in signal2noise, and 5 she/her pronouns. `heller-approval-queue` Guardrail 3 already pointed at `heller-google-ads-mcp/write-log.jsonl`; both Heller CLAUDE.md files were already arrow-free.
- **Two ops scripts created and proven:** `scripts/ops/rotate-logs.sh` (ran: "nothing to rotate") and `scripts/ops/seo-run.sh` (branch → build → push → PR; `npm run build` passes on the current tree).
- **Heller ads path verified:** `heller_ads.py selftest` → `PREFLIGHT PASS` (api=v24, login MCC 5982565266, account 5823108382). No ad account was touched.
- **CLAUDE.md updated on branch `ops/incident-2026-09-24`** (gates section, send-authority scope line, ET fix, model bullet, known-broken 7 + 8) and opened as a PR. Not merged. **One human action remains: 11 cloud toggles** (table below) — then enable the 14 local copies in Cowork → Scheduled.

## What changed

### Prompts (`~/Claude/Scheduled/<id>/SKILL.md`)

| Task | Model | Other edits |
|---|---|---|
| daily-inbox-cleanup | haiku-4-5 | 9:20 PM history removed (3 lines); her→him ×3 |
| linkedin-lead-processor | haiku-4-5 | — |
| job-sweep-daily | haiku-4-5 | — |
| heller-friday-billing-prep | haiku-4-5 | description "Opus 4.8" → "Haiku 4.5" |
| heller-monthly-report-reminder | haiku-4-5 | — |
| mcp-infrastructure-health-check | haiku-4-5 | **gates block added** (gate 10 = monthly `rotate-logs.sh` step); `events-inbox-filer, sf-* watches` dropped from the alert list |
| heller-daily-google-ads-optimizer | sonnet-4-6 | STEP 2E: newest `_alk_khin_step2e_*.py` (`ls -t`), else `heller_ads.py perf` per CID; her→his; body + description model text |
| heller-eton-monthly-paid-search-report | sonnet-4-6 | `_eton_july_report_0820.py` template → `heller_ads.py perf` + dated `_eton_report_*.py` + existing PDF step; description model text |
| heller-approval-queue | sonnet-4-6 | body "Model: claude-opus-4-8" → sonnet; description |
| heller-keyword-harvester | sonnet-4-6 | same |
| ensolabs-seo-audit | sonnet-4-6 | deploy = `scripts/ops/seo-run.sh`; `/sessions/` + `mcp__workspace__bash` repo path removed; step 5–7 rewritten (branch/PR, receipt = sha + PR URL, "live" only after merge + external curl) |
| enso-ai-news-brief | sonnet-4-6 | 3:45 PM afternoon-delta block deleted; one run/day; body model text |
| enso-pipeline-close | sonnet-4-6 | body model text |
| weekly-credential-sweep | sonnet-4-6 | body + description model text |
| weekly-event-board-sweep | sonnet-4-6 | body + description model text |
| heller-weekly-status-call-prep | sonnet-4-6 | herself/she → himself/he |
| signal2noise-intelligence | sonnet-4-6 | "Strategy → Ship" brand line → "Strategy to Ship" |
| ai-platforms-partnerships-monitor, daily-email-scan, daily-event-scan, enso-lead-engine-daily, heller-weekly-status-call-followup, linkedin-inbox-sweep, linkedin-weekly-performance-pull, llmwiki-daily-agent | sonnet-4-6 | model line only |
| eton-sep23-optimization-call-prep, eton-sep23-call-followup, alk-khin-tier2-execute, eligard-hcp-import-signoff-check (one-offs in the Cowork list, no gates by design) | sonnet-4-6 | model line only |
| eligard-weekly-performance-digest (merged Jun 21, disabled) | — | `model: claude-opus-4-8` removed |

Assumptions stated: the one-off tasks got Sonnet because they sit in the Cowork task list; `job-scan-morning` (paused, retired per Token-Lean rule) was left untouched and should be deleted from the sidebar. The `9:20 PM` / `3:45 PM` mentions that were purely historical were reworded rather than left, so a grep stays clean.

### Repo (`ops/incident-2026-09-24`)

- `CLAUDE.md`: new `## Scheduled-run gates (2026-09-24)` at the top of Scheduled Task Rules (gates 1–9 verbatim from `heller-approval-queue`); "Applies to interactive sessions only. Unattended scheduled runs never send" under Send authority; "8a/5p PT" → "8a/5p ET"; model bullet = Haiku filing / Sonnet scans / Opus interactive only, set in SKILL.md frontmatter; KNOWN-BROKEN items 7 (`mcp__workspace__bash`) and 8 (cloud copies). Note: the branch also carries the previously uncommitted CLAUDE.md edits from 9/16, 9/20 and 9/22 (event-scan resync, work-authorization facts, LinkedIn maintenance) that were sitting in the working tree on master.
- `scripts/ops/rotate-logs.sh`, `scripts/ops/seo-run.sh` (new, executable).
- `docs/INCIDENT-REVIEW-2026-09-24.md`, `docs/CLAUDE-CODE-SWEEP-2026-09-24.md`, this file.
- Left untracked on purpose: `PREP-Hanwha-Flora-2026-09-22.md`, `docs/STATE.md`, `docs/SOURCE-FEED-AUDIT.md`, `Enso Labs Website/`, carousel slides, PRD .docx, `flora-hanwha-call-prep.html`, `public/images/ibm/`, `scripts/generate-ibm-harness-diagrams.js`, and the modified `content/` files.

## Build output (`npm run build`, current tree, exit 0)

```
  ├ chunks/117-14dd35a9dd2203e1.js                            31.7 kB
  ├ chunks/fd9d1056-e3d373074663785d.js                       53.6 kB
  └ other shared chunks (total)                               1.97 kB
○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)
ƒ  (Dynamic)  server-rendered on demand
```

## Selftest output

```
$ cd ~/Documents/Claude/Heller/AI-Google-Ads/heller-google-ads-mcp && ./.venv/bin/python3 heller_ads.py selftest
PREFLIGHT PASS — OK api=v24 login_mcc=5982565266 account=5823108382 (Tolmar Campaigns (prev. Heller Agency))
```

## rotate-logs.sh output

```
ok: active-tasks 33 KB (<=200 KB)
ok: email-log 32 KB (<=200 KB)
nothing to rotate
```

## PR

https://github.com/nycsav/ensolabs-site/pull/96 — not merged; Sav reviews.

## Enable-state table (STEP 6) — the one remaining human action

Rule: pause the cloud copy first, then enable the local one. Never both. `scheduled-tasks.json` was not edited.

| # | Cloud task (claude.ai/scheduled-task) | Local id | Local enabled? | Cloud active? | ACTION |
|---|---|---|---|---|---|
| 1 | AI platforms partnerships monitor | ai-platforms-partnerships-monitor | yes | paused | none — already correct |
| 2 | Job Triage | job-sweep-daily | no | paused | enable local |
| 3 | Lead Processor | linkedin-lead-processor | no | paused | enable local |
| 4 | Enso AI news brief | enso-ai-news-brief | no | paused | enable local |
| 5 | Heller daily google ads optimizer | heller-daily-google-ads-optimizer | no | **active** | pause cloud → enable local |
| 6 | LLM Wiki | llmwiki-daily-agent | no | **active** | pause cloud → enable local |
| 7 | Ensolabs SEO audit | ensolabs-seo-audit | no | **active** | pause cloud → enable local |
| 8 | Heller weekly status call prep | heller-weekly-status-call-prep | no | **active** | pause cloud → enable local |
| 9 | Enso pipeline close | enso-pipeline-close | no | **active** | pause cloud → enable local |
| 10 | Daily event scan | daily-event-scan | no | **active** | pause cloud → enable local |
| 11 | Signal2noise intelligence | signal2noise-intelligence | no | **active** | pause cloud → enable local |
| 12 | Heller weekly status call followup | heller-weekly-status-call-followup | no | **active** | pause cloud → enable local |
| 13 | Weekly credential sweep | weekly-credential-sweep | no | **active** | pause cloud → enable local |
| 14 | Weekly event board sweep | weekly-event-board-sweep | no | **active** | pause cloud → enable local |
| 15 | Heller friday billing prep | heller-friday-billing-prep | no | **active** | pause cloud → enable local |

**Sav:** 11 cloud pauses (rows 5–15) in one pass at https://claude.ai/scheduled-task, then 14 local enables (rows 2–15) in Cowork → Scheduled. Cloud state above is taken from the sweep brief, not re-read from claude.ai this run.

## Final verification table

| task | enabled | cron | prompt KB | gates | model |
|---|---|---|---|---|---|
| heller-monthly-report-reminder | True | `0 9 25 * *` | 9 | 1 | claude-haiku-4-5 |
| daily-email-scan | True | `0 8,12,17 * * 1-6` | 21 | 1 | claude-sonnet-4-6 |
| heller-daily-google-ads-optimizer | False | `15 8 * * *` | 19 | 1 | claude-sonnet-4-6 |
| heller-friday-billing-prep | False | `0 16 * * 5` | 12 | 1 | claude-haiku-4-5 |
| signal2noise-intelligence | False | `0 8 * * 1,3,5` | 10 | 1 | claude-sonnet-4-6 |
| ensolabs-seo-audit | False | `0 9 * * 1-5` | 23 | 1 | claude-sonnet-4-6 |
| job-scan-morning | False | `0 5,14 * * 1-5` | 7 | 0 | — |
| mcp-infrastructure-health-check | True | `45 6 * * *` | 14 | 1 | claude-haiku-4-5 |
| heller-keyword-harvester | True | `30 9 * * 1,3,5` | 16 | 1 | claude-sonnet-4-6 |
| weekly-event-board-sweep | False | `45 8 * * 1` | 10 | 1 | claude-sonnet-4-6 |
| ai-platforms-partnerships-monitor | True | `30 7,15 * * 1-5` | 18 | 1 | claude-sonnet-4-6 |
| daily-event-scan | False | `0 8,17 * * 1,3,5` | 26 | 1 | claude-sonnet-4-6 |
| heller-approval-queue | True | `0 9 * * *` | 16 | 1 | claude-sonnet-4-6 |
| job-sweep-daily | False | `45 7 * * 1-5` | 10 | 1 | claude-haiku-4-5 |
| daily-inbox-cleanup | True | `0 6 * * *` | 12 | 1 | claude-haiku-4-5 |
| enso-ai-news-brief | False | `45 7 * * *` | 13 | 1 | claude-sonnet-4-6 |
| enso-lead-engine-daily | True | `0 8 * * 1-5` | 5 | 1 | claude-sonnet-4-6 |
| enso-pipeline-close | False | `30 16 * * 1-5` | 13 | 1 | claude-sonnet-4-6 |
| weekly-credential-sweep | False | `45 9 * * 1` | 7 | 1 | claude-sonnet-4-6 |
| heller-eton-monthly-paid-search-report | True | `0 8 6 * *` | 8 | 1 | claude-sonnet-4-6 |
| linkedin-lead-processor | False | `0 10 * * 1-5` | 9 | 1 | claude-haiku-4-5 |
| heller-weekly-status-call-prep | False | `0 9 * * 4` | 6 | 1 | claude-sonnet-4-6 |
| heller-weekly-status-call-followup | False | `0 13 * * 4` | 6 | 1 | claude-sonnet-4-6 |
| linkedin-weekly-performance-pull | True | `30 10 * * 1` | 5 | 1 | claude-sonnet-4-6 |
| llmwiki-daily-agent | False | `0 8 * * 1-5` | 5 | 1 | claude-sonnet-4-6 |
| linkedin-inbox-sweep | True | `30 9 * * 1-5` | 6 | 1 | claude-sonnet-4-6 |
| eton-sep23-optimization-call-prep | False | `None` | 3 | 0 | claude-sonnet-4-6 |
| eton-sep23-call-followup | False | `None` | 3 | 0 | claude-sonnet-4-6 |
| alk-khin-tier2-execute | False | `None` | 4 | 0 | claude-sonnet-4-6 |
| eligard-hcp-import-signoff-check | True | `None` | 3 | 0 | claude-sonnet-4-6 |
