# Enso Lead-Gen Outreach Agent — Claude Code Task
**Cadence:** Daily, 9 AM ET, weekdays  
**Authority:** Requires explicit CLAUDE.md update before first auto-send run (see SETUP)  
**Hard cap:** 5 LinkedIn connection requests per run. No exceptions.  
**Last updated:** 2026-08-30

---

## BEFORE YOU RUN: REQUIRED CLAUDE.MD UPDATE

This agent will NOT auto-send LinkedIn connections until Sav updates the Lead Gen section of CLAUDE.md to lift the standing "Claude never sends" hard stop for this specific agent. Until that line is updated, run this in REPORT-ONLY mode (JOBs 0–4 only, skip JOB 5 LinkedIn sends, still do hygiene and logging).

Once CLAUDE.md is updated, full auto-send is live.

---

## STANDING RULES — read before every run

### Copy Safety Gate (MANDATORY — run on ALL copy before it leaves the account)
The Perplexity Computer engine writes notes that are **never safe to send as-is**.

| Defect | Examples | Action |
|---|---|---|
| Banned metrics | "75% pilot-to-production", "3-month time-to-first-value", any unverified % or time claim | Strip entirely |
| Confidential client | "Gore", "Gore's pipeline", "8-stage LangGraph", "the intelligence platform we built for…" | Replace with "a Fortune 500 manufacturer" or cut |

**Safe replacement framing (use only these):**
- "We build and operate managed AI systems for [vertical] clients."
- "We're a NYC studio that builds and operates managed agent systems."
- "We've shipped AI into production across [fintech / media / enterprise / healthcare] clients."

**Never send raw engine copy.** Every note must pass this gate. Log every rewrite.

### Auto-send thresholds
| Score | Action |
|---|---|
| ≥ 88 | Auto-send (when CLAUDE.md updated) |
| 80–87 | Surface to Sav with LinkedIn URL + note, do NOT auto-send |
| < 80 | Nurture/skip |

### Signal age rules
| Age | Action |
|---|---|
| ≤ 10 days | Send |
| 11–14 days | Send, add `[AGING]` flag in log |
| > 14 days | HOLD — re-verify signal is live, surface to Sav |

### Daily cap
**Max 5 LinkedIn connection requests per run.** Sort by score (highest first), send top 5, defer the rest.

### Never-send conditions (absolute — no override)
- Person already in `lead-gen-state.json` `sent[]` array
- Person already connected or invitation pending (verified on their profile)
- Company has live job application in either inbox → flag + skip
- Person in `Leads → Contacted` label
- Score < 88
- Signal > 14 days (unverified)
- Note still contains banned metric or client name after rewrite
- LinkedIn shows payment prompt, CAPTCHA, weekly limit warning, or identity verification

---

## ENVIRONMENT

| Resource | Value |
|---|---|
| Gmail connector | `enso-google` MCP (non-expiring) |
| LinkedIn browser | Chrome Profile 10 / `sav@ensopartners.co` |
| Browser device ID | `4bde578f-c14b-442a-b028-c7cee39e3fbc` |
| State file | `/Users/savbanerjee/Projects/ensolabs-site/.claude/lead-gen-state.json` |
| Log file | `/Users/savbanerjee/Projects/Professional: Jobs & Resumes/LEAD-GEN-LOG.md` |
| Send queue artifact | `enso-send-queue` (Cowork) |

---

## JOB 0 — COPY SAFETY GATE (run first, internalize banned list)

Before reading any emails, commit the banned list to working memory. Apply this gate to every note. Log every rewrite in the run report under "Copy fixes."

---

## JOB 1 — READ LEAD EMAILS

### A. New outbound leads from Perplexity engine
```
from:computer@mail.perplexity.ai newer_than:2d subject:"signal leads"
```
Open and read the BODY of every result. Hot names, scores, LinkedIn URLs, and copy are in the body only.

### B. Backlog (existing Hot labels not yet sent)
```
label:"Leads → Hot"
```
Filter out any already in `lead-gen-state.json` `sent[]`.

### C. Genuine inbound humans
```
newer_than:2d (ensolabs.ai OR "your website" OR "saw your" OR consulting OR "AI transformation") -from:linkedin.com -from:computer@mail.perplexity.ai -label:jobs-applied
```
Real person = prepare a Gmail DRAFT reply (with canonical signature from `EMAIL_SIGNATURE.md`) and surface to Sav. Do NOT auto-connect — inbound deserves a warmer response. Never auto-send to inbound leads.

---

## JOB 2 — SCORE, DEDUPE, BUILD SEND QUEUE

### For each lead found:
1. **Check state file:** is this person in `sent[]`? → skip
2. **Gmail check:** search `"[name]" OR "[company]"` across both inboxes. Prior thread = surface to Sav as warm contact, do not pitch cold
3. **Job conflict check:** search both inboxes for `[company name] applied OR application OR Ladders OR Apply4Me`. Live application = FLAG + skip auto-send
4. **Label check:** in `label:"Leads → Contacted"`? → skip
5. **Score filter:** ≥ 88 → send queue; 80–87 → surface list; < 80 → drop
6. **Age filter:** apply age rules above
7. **Account grouping:** if 2+ contacts at same company → one account play, rank by seniority, send to highest only
8. **Daily cap:** sort send queue by score, take top 5, defer rest

---

## JOB 3 — INBOX HYGIENE

Run this BEFORE LinkedIn sends (hygiene is independent of send success).

| Email type | Label | Action |
|---|---|---|
| `Enso signal leads` (outbound, has hot names) | `Leads → Hot` (Label_28) + STARRED | Keep in inbox |
| `Enso leads` inbound — score ≤ 5, random names, VA/staffing spam | `Leads → Nurture` (Label_30) | Archive |
| `Enso GA4 digest` / `Enso competitor intel` | `Leads → Intel` (Label_31) | Archive |
| Leads that were just sent this run | `Leads → Contacted` (Label_29) | Archive |

**Use label NAMES in Gmail search, never label IDs.** Never delete received mail.

---

## JOB 4 — FUNNEL HEALTH (if GA4 digest found)

Extract: active users, form submits, booking intent clicks, `perplexity_partner` sessions.  
Flag if: booking intent = 0 (ongoing — track days open), `perplexity_partner` = 0 (ongoing), traffic drops > 25% WoW.  
Report in one line + single biggest leak with days-open count.

---

## JOB 5 — SEND LINKEDIN CONNECTIONS
*(Skip this job in REPORT-ONLY mode until CLAUDE.md is updated)*

### For each contact in the send queue (max 5, in score order):

**Step 1: Select canonical browser**
```python
select_browser(deviceId="4bde578f-c14b-442a-b028-c7cee39e3fbc")
```
If fails: `list_connected_browsers()` → pick entry matching `sav@ensopartners.co`.  
If no match: log "LinkedIn browser unavailable" → skip all sends for this run.

**Step 2: Navigate and verify profile**
```
navigate(url=linkedin_url)
```
Wait for load. Confirm name and company match lead data. If mismatch: skip + log.

**Step 3: Check connection status**
- "Message" button visible → already connected → skip, log `status: already_connected`
- "Pending" badge → skip, log `status: pending`
- "Connect" or "More → Connect" → proceed
- No connect option → skip, log `status: restricted`

**Step 4: Apply safety gate to final note**
1. Take engine's raw note for this person
2. Apply JOB 0 gate (strip banned metrics + client names)
3. Count characters — must be ≤ 300
4. First sentence must reference the dated signal (e.g., "Saw [Company]'s [Month Day] [event]...")
5. Must position Enso as "a NYC studio that builds and operates managed AI systems"
6. If note cannot be cleanly rewritten under 300 chars → skip this person, log reason

**Step 5: Send**
```
click("Connect")
→ click("Add a note")
→ clear any pre-filled text
→ type(final_note)
→ click("Send")
```

**Stop immediately and log if any of these appear:**
- Phone/email verification modal
- CAPTCHA
- "You've reached the weekly invitation limit"
- Payment prompt
- Any modal that wasn't part of the standard flow

**Step 6: Verify and record**
- Wait 2 seconds after Send
- Confirm button changed to "Pending" or "Message"
- If confirmed → immediately write to `lead-gen-state.json`:
  ```json
  {
    "name": "...",
    "company": "...",
    "linkedin_url": "...",
    "sent_date": "YYYY-MM-DD",
    "signal_date": "YYYY-MM-DD",
    "score": 92,
    "note_sent": "first 100 chars of note...",
    "status": "sent"
  }
  ```
- If unconfirmed → log `status: unverified`, do NOT add to sent list

**Wait 90 seconds between each send.**

---

## JOB 6 — WRITE RUN LOG

Append to `/Users/savbanerjee/Projects/Professional: Jobs & Resumes/LEAD-GEN-LOG.md`:

```markdown
## [YYYY-MM-DD] [HH:MM] ET — [N] sent / [N] queued

### Sent ([N]/5)
| Contact | Company | Score | Age | Status |
|---|---|---|---|---|
| Name | Company | 92 | 7d | ✓ sent |

### Queued tomorrow
| Contact | Company | Score | Reason deferred |
|---|---|---|---|

### Skipped
| Contact | Company | Reason |
|---|---|---|

### Copy fixes
- Name (Company): stripped "..." 

### Filed
Nx Hot · Nx Nurture · Nx Intel

### Waiting on Sav
- [Any items needing manual decision]
```

---

## JOB 7 — UPDATE SEND QUEUE ARTIFACT

Update the `enso-send-queue` Cowork artifact:
- Leads sent this run → mark ✓ with sent date
- Remaining unsent leads → keep as queue cards
- HOLD leads → show with re-verify note
- Remove leads > 20 days old from display

---

## TERMINAL REPORT (printed at end — never emailed)

```
ENSO LEAD-GEN — [DATE] [TIME ET]

SENT ([N]/5) — [REPORT-ONLY MODE if CLAUDE.md not updated]
  ✓ Name — Company (score N, Nd old)

QUEUED TOMORROW
  → Name — Company (score N, Nd old)

HOLD (>14d — needs Sav decision)
  ⚠ Name — Company — [one action needed]

COPY FIXES: N defects stripped this run
  [list each]

FILED: Nx Hot · Nx Nurture · Nx Intel · Nx Contacted
```

---

## SETUP — ONE-TIME STEPS

### 1. Update CLAUDE.md (Sav must do this)
In the "Lead Gen & Client Development — standing rules" section, update the Hard Stops line:

Find:
> Never send a LinkedIn connection request, InMail, or email to a third party.

Add after:
> **Exception:** the `lead-gen-outreach` Claude Code agent (`scripts/lead-gen-outreach.md`) is authorized to send LinkedIn connection requests for score ≥ 88 outbound prospects, subject to all other rules in this document (authorized [DATE]).

### 2. Initialize state file
```bash
cat > /Users/savbanerjee/Projects/ensolabs-site/.claude/lead-gen-state.json << 'EOF'
{
  "sent": [],
  "last_run": null,
  "runs_today": 0
}
EOF
```

### 3. Initialize log file
```bash
touch "/Users/savbanerjee/Projects/Professional: Jobs & Resumes/LEAD-GEN-LOG.md"
echo "# Enso Lead-Gen Run Log" >> "/Users/savbanerjee/Projects/Professional: Jobs & Resumes/LEAD-GEN-LOG.md"
```

### 4. Schedule in Claude Code
In an interactive Claude Code session in `ensolabs-site/`:
```
/schedule "0 9 * * 1-5" --name "lead-gen-daily" --model sonnet "Run scripts/lead-gen-outreach.md"
```
Or register as a Cowork scheduled task (9 AM ET, weekdays, Sonnet model).

### 5. First manual run (before enabling schedule)
Run manually once in report-only mode. Confirm:
- [ ] Gmail reads working (enso-google connector green)
- [ ] Browser selects Profile 10 correctly
- [ ] Safety gate catches test defects
- [ ] State file writes correctly
- [ ] Log appends correctly
Then enable the schedule.

---

## MONITORING

- Review `LEAD-GEN-LOG.md` every Monday — scan the week's sends
- If LinkedIn shows weekly limit warning: pause schedule 3 days, then resume
- If state file grows > 200 entries: archive older entries to `lead-gen-state-archive-[YYYY].json`
- If Chrome binding breaks: open Cowork, call `select_browser` manually to re-bind to Profile 10

---

## DESIGN NOTES

**Why once daily at 9 AM ET:**  
LinkedIn's algorithm flags accounts that send in bursts or at off-hours. A single weekday morning run at 9 AM ET mimics a human who does outreach between the first and second meeting of the day. Two runs/day would halve the signal-to-noise ratio without doubling reach.

**Why 5/day cap:**  
LinkedIn's informal limit is ~20/day and ~100/week. At 5/day × 5 days = 25/week — well under the threshold and indistinguishable from manual outreach. Raise only if LinkedIn confirms higher limits.

**On character limits:**  
LinkedIn notes: 300 chars. Always count before sending. Trim from the middle — keep the dated signal at the start, the CTA at the end.

**On "Connect" button variants:**  
- Standard: blue "Connect" in intro card  
- Premium profile: may show "Follow" as default → look for "More" → "Connect"  
- Already connected: "Message" → skip  
- Restricted: no Connect option → skip, log as restricted
