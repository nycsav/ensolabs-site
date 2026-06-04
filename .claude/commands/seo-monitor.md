---
description: Run the Enso Labs recurring brand/SEO monitor — studio-voice lint, third-party entity-drift check, and search content-gap scan. Drafts fixes; never auto-publishes or edits external sites.
argument-hint: "[optional focus: voice | entity | gaps | all] (default all)"
model: opus
---

You are running the **Enso Labs SEO & Brand Monitor**. This catches the three recurring things that drift between the daily automated SEO run: studio-voice slips, stale third-party profiles, and search gaps where ensolabs.ai isn't showing up. Focus = `$ARGUMENTS` (default: `all`).

Work autonomously. Produce a single dated report and ready-to-act drafts. **Never edit external sites and never publish/deploy from this command** — it is a review-and-draft tool. Use plain English; Sav directs strategy, you do the legwork.

## 1. Studio-voice lint (`voice` or `all`)
Run: `node .claude/scripts/voice-lint.mjs`
- **VIOLATION** lines (pages/components) break the "always we, never I" rule — list each with a one-line suggested rewrite to first-person-plural. Do NOT auto-edit; the human approves.
- **REVIEW** lines (insight articles) are intentional founder field-note voice — list the count only, note they're expected, flag only anything that reads as studio (not personal) copy.

## 2. Entity-drift check (`entity` or `all`)
Delegate to the **entity-drift-scout** subagent (Task tool). It checks Crunchbase, LinkedIn, RocketReach, ZoomInfo, and the "Sav Banerjee AI strategy" SERP against canonical facts and returns paste-ready corrections. Include its full report. These are MANUAL actions — Sav (or you, with account access) must paste them; this command does not touch external accounts.

## 3. Content-gap scan (`gaps` or `all`)
Run these WebSearch queries and record whether ensolabs.ai appears in the top 10, and which competitors rank:
- "AI strategy consultant NYC"
- "AI transformation consulting New York"
- "agentic systems consultant NYC"
- "Claude implementation partner"
- "Sav Banerjee AI strategy" (brand/recruiter term)
- "Cerebral Valley hackathon 2026" (priority-content term)

For each gap (we're absent but a competitor ranks), propose the smallest fix: a new page, a section on an existing page, or an insight article. Cross-check against the backlog in CLAUDE.md (e.g. /locations/new-york shipped; /services/agentic-ai-consulting, /comparisons/boutique-vs-big-4 still open) so you don't re-suggest done work.

## Output
Write the report to `drafts/seo-monitor/<YYYY-MM-DD>.md` (create the folder if needed) AND summarize the top 3 actions in chat. Structure:

```
# Enso Labs SEO & Brand Monitor — <date>
## Voice lint: <N violations / N reviews>  (list violations + rewrites)
## Entity drift: <N profiles need updating>  (paste-ready corrections from scout)
## Content gaps: <N gaps>  (each: query · who ranks · proposed fix)
## Top 3 actions this week
```

Keep it tight. The drafts do the talking — don't pad with process narration.
