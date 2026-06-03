# Cowork Command Bible Audit — Enso Labs
**Date:** June 2, 2026 | **Auditor:** Claude (Opus 4.6) | **Source:** Ronnie Parsons' "The Claude Cowork Command Bible"

---

## TL;DR for Sav

**You're at Month 2+ on the Bible's progression ladder — ahead of 95% of Cowork users.** Your scheduled-task game is elite (13 active automations), your memory system is rich (20+ entries), and your connector stack is deep. But you skipped two foundational steps that compound everything else: **session rituals** and **the L5–L6 context stack**. Fixing those two gaps will make every session and every scheduled task meaningfully better.

---

## What the Bible Recommends (Full Extraction)

### 1. The Two Power Symbols
- `/` (Slash) — triggers commands, skills, and workflows
- `@` (At) — pulls files, folders, and paths into context
- The `+` button is the visual version of `/`

### 2. Slash Commands
| Command | Purpose |
|---------|---------|
| `/` | Opens full command menu — type to filter |
| `/schedule` | Creates a scheduled or on-demand task |
| `/skill-creator` | Guided conversation to build a new skill |
| `/[skill-name]` | Manually invokes any installed skill |
| `/[plugin:cmd]` | Runs a command from an installed plugin |

### 3. @ File References
| Syntax | Purpose |
|--------|---------|
| `@filename` | Pulls file contents into context instantly |
| `@path/to/file` | References nested files by relative path |
| `@folder/` | Shows directory listing (not all contents) |
| `@a @b @c` | Multiple files in one prompt for full context |
- Tab-complete after typing `@` to navigate files. Drag + drop also works.

### 4. Interface Anatomy
| Element | Purpose |
|---------|---------|
| Chat \| Cowork \| Code | Three tabs — the mode sets capabilities |
| + New Task | Fresh task within the current Project |
| Work in a Folder | Checkbox grants Claude read/write access |
| Projects | Persistent workspaces with memory |
| Scheduled | Task library — view, edit, pause, run |
| Customize | Manage plugins, skills, connectors |
| Dispatch | Phone ↔ desktop — assign tasks remotely |

### 5. The 6-Layer Context Stack
*"Each has a different scope and job — this is what separates generic output from output that sounds like you."*

| Layer | Where | Scope | What Goes Here |
|-------|-------|-------|----------------|
| L1 | Settings → Profile | Everywhere | Name, communication style, expertise |
| L2 | Settings → Cowork | All Cowork | Execution rules, output standards, rails |
| L3 | Inside a Project | This Project | Role, format prefs, tool locations |
| L4 | Your folder | Auto-loads | Business model, audience, workflows |
| L5 | Your folder | Read-only | Brand voice, templates, examples, SOPs |
| L6 | Your folder | On demand | Agent registry, skill library, docs |

### 6. Sub-Agent Triggers
Natural-language phrases that spawn parallel workers:
- "Spawn N agents in parallel to..."
- "Assign one agent per [competitor / file]."
- "Give each agent a different angle or source."
- "Have every agent report in the same format."
- "Add a QA agent to check the others' work."
- "Compare the agents' outputs and flag issues."
- "After all agents complete, synthesize."

### 7. Built-In Agent Types
- **Research Agent** — Web research, synthesis, multi-step exploration. Can spawn its own sub-agents.
- **Plan Agent** — Requirements analysis, dependencies, execution sequences, roadmaps.
- **Skills Agent** — Polished deliverables (PPTX, DOCX, XLSX, PDF) using installed skills.
- **4-PHASE workflow:** 1. Research → 2. Plan → 3. Execute → 4. QA

### 8. Scheduled Tasks
- `/schedule` or Sidebar → Scheduled → + New Task
- Cadence: hourly, daily, weekly, weekdays, or manually (saved prompt you fire on demand)
- Inside a Project, tasks stay scoped to that folder
- Computer must be awake + app open. Missed runs auto-execute when you return.

### 9. Session Rituals
- **START EVERY SESSION:** "Read the README.md in \_os/ and onboard yourself on my workspace, agents, and skills."
- **END EVERY SESSION:** "Document all agents and skills we used. Update \_os/agents/agents.md and \_os/README.md."
- **SELF-IMPROVING SKILLS:** After approval: 1) update the skill 2) save output to improved-examples/ 3) summarize changes

### 10. Computer Use & Browser
Priority chain for external actions:
1. **Connectors** — API-level access — fastest, most reliable
2. **Chrome ext.** — Browser automation for web apps behind logins
3. **Screen control** — Direct desktop — clicks, types, scrolls your apps

Enable: Settings → General. Runs outside the VM sandbox — start with low-stakes apps.

### 11. Diagnostic Prompts
| Prompt | Tests |
|--------|-------|
| "Tell me what you know about how I work here." | Context layers loading correctly |
| "Can you confirm what sub-agents are available?" | What's running and what's available |
| "Why did you choose sequential not parallel?" | Orchestration logic |
| "Which context files did you actually read?" | Context stack layers 4–6 loaded |

### 12. Settings Map
| Setting | Path |
|---------|------|
| Personal Preferences | Settings → Profile |
| Global Instructions | Settings → Cowork → Edit |
| Project Instructions | Click Project → Instructions |
| Connectors | Settings → Connectors |
| Computer Use | Settings → General |
| Skills | Customize → Skills |
| Memory Import | claude.com/import-memory |

### 13. The Progression
| Stage | Milestone |
|-------|-----------|
| Week 1 | Learn `/` and `@` — trigger commands and reference files |
| Week 2 | Set up your 6-layer context stack so every task starts smarter |
| Week 3 | Spawn sub-agents — parallel execution changes everything |
| Week 4 | Build session rituals — start prompt, end prompt, persist |
| Month 2 | Create scheduled tasks — work happens before you open your laptop |
| Month 3 | Self-improving skills — each run makes the next one better |
| Always | Work in Projects — memory compounds. Without one, every session starts from scratch |
| Never skip | "Show a brief plan and wait for approval" prevents 90% of mistakes |

---

## Enso Labs Current State

### Scheduled Tasks: 13 Active / 22 Disabled
**Active:**
| Task | Cadence | Domain |
|------|---------|--------|
| daily-email-scan | 3x daily M–F + Sat | Ops |
| mcp-infrastructure-health-check | Daily M–F 7:09 AM | Infra |
| job-scan-morning | M–F 8:02 AM | Job Search |
| ensolabs-seo-audit | M–F 9:10 AM | SEO |
| signal2noise-intelligence | Mon/Wed/Fri 8 AM | Content |
| heller-daily-google-ads-optimizer | Mon/Wed/Fri 8:30 AM | Client (Heller) |
| eligard-weekly-performance-digest | Monday 8:03 AM | Client (Heller) |
| heller-deliverable-feedback-monitor | M–F 7 PM | Client (Heller) |
| heller-friday-billing-prep | Friday 4:08 PM | Client (Heller) |
| heller-monthly-report-reminder | 25th of month 9 AM | Client (Heller) |
| agentic-ai-summit-reply-check | Daily 10 AM + 4 PM | Events |
| nytw-event-scanner | Every 4 hours | Events (NYTW) |
| watch-notion-ticket-5319042 | M–F 9:06 AM | Admin |

**Disabled:** 22 tasks — mix of retired one-time fires, superseded tasks, and paused automations.

### Memory System: 20+ Entries
- User profile, 5 project memories, 7 feedback memories, 7 reference memories
- Well-organized MEMORY.md index with links and one-line descriptions
- Cross-linked memories with context

### CLAUDE.md: Comprehensive
- Global instructions: "Keep explanations brief, TLDR and to the point"
- Project instructions: 200+ lines covering pages, components, SEO, content rules, deploy workflow, analytics, brand assets

### Skills Installed: 40+
Core document skills (docx, pptx, xlsx, pdf), plus domain-specific: resume-tailor, job-scan-morning, heller-log-hours, gore-storytelling, executive-storytelling, google-slides-deck-builder, canvas-design, skill-creator, mcp-builder, web-artifacts-builder, schedule, aventiv-seo-skill, brand-guidelines, setup-cowork. Plugin skills: data (9 skills), design (7 skills), marketing (8 skills), productivity (5 skills), sp-global (4 skills), client-email-automator, cowork-plugin-management.

### Connectors: 15+
Gmail, Google Calendar, Slack, Notion, Google Drive, Vercel, Figma, Google Ads (Heller), Google Search Console, QuickBooks, Smartsheet, Wix, Indeed, S&P Capital IQ, Desktop Commander, Filesystem.

---

## Gap Analysis: Bible vs. Enso Labs

### ✅ Already Strong (Validate)

| Bible Recommendation | Enso Status | Evidence |
|---------------------|-------------|----------|
| Slash commands (/ and @) | ✅ Mastered | Heavy use of /schedule, /skill-creator, skill invocations |
| Scheduled tasks | ✅✅✅ Elite | 13 active automations across 5 domains; cadences from hourly to monthly |
| Work in Projects | ✅ Active | Persistent project with rich memory, CLAUDE.md, mounted folder |
| Computer Use priority chain | ✅ Followed | Connectors → Chrome → Screen control hierarchy documented in memory |
| Connector stack | ✅ Deep | 15+ services connected including Gmail, Calendar, Slack, Notion, Vercel, GSC, Google Ads |
| Skills ecosystem | ✅ Extensive | 40+ skills across document creation, data, design, marketing, client work |
| Memory system | ✅ Rich | 20+ well-organized memories with user/project/feedback/reference taxonomy |
| L2–L3 context (Global + Project instructions) | ✅ Set | Global CLAUDE.md + detailed project CLAUDE.md |
| Plugin architecture | ✅ Deployed | 8+ plugins with multi-skill bundles |
| 4-PHASE workflow | ✅ Partial | Research and Plan phases used; QA step inconsistent |
| "Never skip: plan and wait" | ✅ Feedback memory | "Always audit existing tasks and walk through workflow methodology before creating new ones" |

### ⚠️ Quick Wins (Add This Week)

**1. Session Start Ritual**
- **Bible says:** "Read the README.md in \_os/ and onboard yourself on my workspace, agents, and skills."
- **Enso status:** No formalized start prompt. Each session cold-starts from CLAUDE.md + memory.
- **Fix:** Add a start prompt to CLAUDE.md or create a `_os/README.md` in the ensolabs-site folder that says: *"At session start: read MEMORY.md, check active scheduled tasks, review last session's changes, and confirm context loaded."*
- **Impact:** Every session begins with full situational awareness instead of partial context loading.

**2. Session End Ritual**
- **Bible says:** "Document all agents and skills we used. Update \_os/agents/agents.md and \_os/README.md."
- **Enso status:** Memory updates happen organically but not systematically. No end-of-session documentation step.
- **Fix:** Add to CLAUDE.md: *"At session end: update memory for anything learned, note which skills/agents were used, flag any pending items."*
- **Impact:** Knowledge compounds faster; nothing falls through the cracks between sessions.

**3. Diagnostic Prompts**
- **Bible says:** Use "Tell me what you know about how I work here" to test context loading.
- **Enso status:** No evidence of diagnostic prompting.
- **Fix:** Run "Tell me what you know about how I work here" at the start of any high-stakes session (client work, site deploys, presentations). Takes 10 seconds, catches context failures before they waste 30 minutes.
- **Impact:** Catches silent context-loading failures that cause generic or wrong output.

**4. Clean Up Disabled Tasks**
- **Bible says:** Scheduled task library should be a clean, browsable catalog.
- **Enso status:** 22 disabled tasks cluttering the task library (some retired, some one-time fires from months ago).
- **Fix:** Delete genuinely retired tasks (calendar-conflict-resolver, storytelling-data-advertising, etc.). Keep only tasks that might be reactivated.
- **Impact:** Cleaner task library; faster to find and manage active automations.

### 🎯 Strategic Improvements (Next Sprint)

**5. Build L5–L6 Context Stack**
- **Bible says:** L5 = brand voice, templates, examples, SOPs (read-only). L6 = agent registry, skill library, docs (on-demand).
- **Enso status:** L1–L4 are solid. L5 and L6 are empty — no brand voice doc, no template library, no agent registry in the mounted folder.
- **What to build:**
  - `_os/brand-voice.md` — Enso Labs tone rules, terminology, "we" not "I", pillar language, confidentiality rules (already scattered in CLAUDE.md but not isolated as a reusable voice doc)
  - `_os/templates/` — LinkedIn post template, case study template, insight article template, client email template
  - `_os/examples/` — Best outputs from past sessions (golden examples for skills to reference)
  - `_os/agents/agents.md` — Registry of agent patterns that work well (e.g., "3-agent parallel competitive analysis", "Research→Draft→QA content pipeline")
- **Impact:** Every skill and every session produces output that sounds like Enso Labs, not generic Claude. Templates eliminate the "start from scratch" problem.

**6. Self-Improving Skills Loop**
- **Bible says:** After approval: 1) update the skill 2) save output to improved-examples/ 3) summarize changes.
- **Enso status:** Skills exist but don't self-improve. The signal2noise-intelligence task runs the same prompt every time.
- **Fix:** For the 3 highest-value skills (signal2noise-intelligence, job-scan-morning, ensolabs-seo-audit), add a feedback loop: when output is good, save it as an example; when output is bad, update the skill prompt.
- **Impact:** Each run of a scheduled task becomes marginally better than the last. Compounds over months.

**7. Deliberate Sub-Agent Patterns**
- **Bible says:** Use parallel agents for research, competitive analysis, multi-source work.
- **Enso status:** Sub-agents used implicitly by the system but Sav doesn't appear to deliberately trigger parallel execution.
- **Opportunity areas:**
  - Competitive intelligence: "Spawn 5 agents, one per competitor, each researches their AI strategy, all report in the same format, then synthesize"
  - Content creation: "Research Agent finds 3 trending AI topics, Plan Agent picks the best one for Enso's audience, Skills Agent drafts the LinkedIn post, QA Agent checks tone and facts"
  - Client work: "Assign one agent per Heller campaign to audit performance simultaneously"
- **Impact:** 5x faster research, better coverage, built-in QA through agent comparison.

**8. Dispatch (Phone ↔ Desktop)**
- **Bible says:** Assign tasks remotely from phone to desktop.
- **Enso status:** No evidence of Dispatch usage.
- **Opportunity:** During NYTW events this week, use Dispatch from phone to queue research tasks, follow-up emails, or contact logging while at events — they execute when the laptop is open.
- **Impact:** Capture ideas and tasks in the moment without breaking flow at events.

### ❌ Skip / Not Applicable

| Bible Recommendation | Why Skip |
|---------------------|----------|
| `_os/` directory naming convention | Enso already uses CLAUDE.md + memory system which serves the same purpose. Renaming to `_os/` adds friction with no benefit. Use the existing structure. |
| Memory Import (claude.com/import-memory) | Memory system already populated and well-maintained through auto-memory. No migration needed. |
| "Start with low-stakes apps" for Computer Use | Already past this — Computer Use is actively used for Chrome automation, Google Ads, form filling. No need to start conservative. |

---

## Progression Assessment

| Bible Stage | Expected | Enso Status |
|-------------|----------|-------------|
| Week 1: `/` and `@` | Foundations | ✅ Mastered |
| Week 2: 6-layer context stack | Configuration | ⚠️ L1–L4 solid, L5–L6 empty |
| Week 3: Sub-agents | Orchestration | ⚠️ Used implicitly, not deliberately triggered |
| Week 4: Session rituals | Persistence | ❌ Missing — biggest gap |
| Month 2: Scheduled tasks | Automation | ✅✅✅ Elite level |
| Month 3: Self-improving skills | Compounding | ❌ Not implemented |
| Always: Work in Projects | Memory | ✅ Active |
| Never skip: Plan and wait | Safety | ✅ Partial (feedback memory enforces this) |

**Overall grade: Month 2+ with Week 4 and Month 3 gaps.**

You leapfrogged into advanced automation (scheduled tasks, multi-connector orchestration) before building the foundation layers that make those automations compound. The fix is surgical: session rituals + L5/L6 context + skill improvement loops. Three changes, outsized returns.

---

## Priority Action List

| # | Action | Effort | Impact | When |
|---|--------|--------|--------|------|
| 1 | Add session start/end rituals to CLAUDE.md | 10 min | High | Today |
| 2 | Run diagnostic prompt at next session start | 1 min | Medium | Next session |
| 3 | Delete 15+ genuinely retired scheduled tasks | 5 min | Low (hygiene) | This week |
| 4 | Create `_os/brand-voice.md` from existing CLAUDE.md content rules | 30 min | High | This week |
| 5 | Create `_os/templates/` with 3–4 golden templates | 1 hr | High | This sprint |
| 6 | Add self-improving loop to signal2noise-intelligence | 30 min | High | This sprint |
| 7 | Try deliberate parallel agents on next research task | 0 min (just prompt differently) | Medium | Next opportunity |
| 8 | Test Dispatch during NYTW events | 5 min setup | Medium | This week |
