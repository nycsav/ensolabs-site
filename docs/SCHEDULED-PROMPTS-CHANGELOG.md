# Scheduled-task prompt changelog

One entry per change set. Every prompt edit made by Claude gets logged here the same day, with the backup folder and per-task diffs. Cowork reads `<id>/SKILL.md` at run time, so an edit here is live on the next fire — the on/off state is separate (Cowork → Scheduled, `scheduled-tasks.json`, never edited by Claude).

## 2026-09-24 — incident sweep (two passes)

**Backups:** `_backup-2026-09-24/<id>.SKILL.md` (25 files, pre-change). **Diffs:** `_changelog/2026-09-24-<id>.diff` (one per task). **Full write-up:** `~/Projects/ensolabs-site/docs/SWEEP-RESULT-2026-09-24.md` and `docs/INCIDENT-REVIEW-2026-09-24.md` (PR #96).

Pass 1 (Cowork, morning): `## ⛔ RUNTIME GATES — added 2026-09-24` block inserted after the frontmatter of 24 prompts; `linkedin-inbox-sweep` made draft-only; `daily-event-scan` double frontmatter fixed.

Pass 2 (Claude Code, afternoon):
- `model:` frontmatter line on all 25 active prompts + 4 one-offs. Haiku 4.5: daily-inbox-cleanup, linkedin-lead-processor, job-sweep-daily, heller-friday-billing-prep, heller-monthly-report-reminder, mcp-infrastructure-health-check. Sonnet 4.6: everything else. `eligard-weekly-performance-digest`: `model: claude-opus-4-8` removed. 12 body/description "Opus 4.8" mentions corrected to match.
- `mcp-infrastructure-health-check`: gates block added (missed in pass 1); gate 10 = monthly `scripts/ops/rotate-logs.sh`; `events-inbox-filer, sf-* watches` dropped from the alert list.
- `heller-daily-google-ads-optimizer` STEP 2E: `_alk_khin_step2e.py` (missing) → newest `_alk_khin_step2e_*.py`, else `heller_ads.py perf` per CID.
- `heller-eton-monthly-paid-search-report`: `_eton_july_report_0820.py` (missing) → `heller_ads.py perf` + dated `_eton_report_*.py` + existing PDF step.
- `ensolabs-seo-audit`: deploy path = `scripts/ops/seo-run.sh` (branch → build → PR); `/sessions/`, `mcp__workspace__bash`, `git push origin master` removed; steps 5–7 rewritten with receipt rule.
- `enso-ai-news-brief`: 3:45 PM afternoon-delta block deleted (one run/day).
- `daily-inbox-cleanup`: 9:20 PM history lines removed; her → him ×3.
- `heller-daily-google-ads-optimizer`, `heller-weekly-status-call-prep`: she/her → he/him.
- `signal2noise-intelligence`: "Strategy → Ship" brand line → "Strategy to Ship".
- Verified unchanged because already correct: `heller-approval-queue` Guardrail 3 write-log path; both Heller CLAUDE.md files (no arrows).

**Not done by Claude (Sav):** pause 11 cloud copies at claude.ai/scheduled-task, then enable 14 local tasks — table in SWEEP-RESULT. `job-scan-morning` is retired and can be deleted from the sidebar.
