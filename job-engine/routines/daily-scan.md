# Job Scanner (Multi-Source)

Scan LinkedIn alerts, Indeed alerts, recruiter emails, AND target company career pages for roles matching Sav Banerjee's profile. Speed-to-apply is the competitive advantage.

## Schedule
Every 4 hours on weekdays: `0 8,12,16,20 * * 1-5`

## Score Thresholds
- **Below 5**: Silent skip — don't add to sheet (noise reduction)
- **5-6**: Jobs tab only (passive tracking)
- **7**: Jobs tab + High Profile tab (active monitoring)
- **8+**: Jobs + High Profile + auto-generate materials + flag for submission

## Steps

1. **Read the configuration:**
   - Read `job-engine/config/candidate.json` for the candidate profile
   - Read `job-engine/config/roles.json` for existing tracked roles
   - Read `job-engine/agents/scanner.mjs` for all config: target companies, scoring rubric, LinkedIn email source, score thresholds, exclusion list

2. **PHASE 1 — LinkedIn/Indeed Email Scanning (do this FIRST, broadest reach):**
   
   Search Gmail using each query in LINKEDIN_EMAIL_SOURCE.gmail_queries:
   - `from:linkedin.com newer_than:8h -label:JobAgent/Processed subject:(job OR opportunity OR alert OR hiring OR role OR apply OR recommended)`
   - `from:indeed.com newer_than:8h -label:JobAgent/Processed`
   - `from:(recruiter OR talent OR hiring) subject:(AI OR artificial intelligence OR opportunity) newer_than:8h -label:JobAgent/Processed`
   - `subject:(AI transformation OR AI strategy OR Head of AI OR VP of AI OR AI consulting OR Principal AI OR AI architect) newer_than:8h -label:JobAgent/Processed`

   For each matching email:
   a. Read the full email body
   b. Extract ALL job listings from the email (LinkedIn alerts often contain multiple jobs per email)
   c. For each extracted role:
      - Skip if company is in EXCLUDE_COMPANIES (Perplexity)
      - Skip if already in Google Sheet (check title + company match)
      - Score using the SCORING_CRITERIA rubric (0-10):
        - Title match (0-3): Director/VP/Head/Principal = 3, Manager/Lead = 2, else 1
        - Skill overlap (0-3): Count matches against candidate skills
        - Industry fit (0-2): AI/ML/consulting/finserv/healthcare = 2
        - Location (0-1): NYC/Remote/Hybrid = 1
        - Compensation signal (0-1): Senior title = 1
      - Apply score threshold filtering (see above)
   d. Label the processed email as `JobAgent/Processed` via Gmail MCP

3. **PHASE 2 — Career Page Scraping (targeted, 8 specific companies):**
   
   For each company in TARGET_COMPANIES:
   - Use `web_fetch` to load the careers URL
   - Extract all job listings matching the keywords
   - Apply same scoring + filtering as Phase 1
   - Deduplicate against Phase 1 results and existing sheet entries

4. **PHASE 3 — Fast-Track Materials for Score 8+:**
   
   For any new score 8+ roles found in Phase 1 or 2:
   - Add entry to `job-engine/config/roles.json` with: id, company, title, score, apply_url, platform, status: 'pending'
   - Generate cover_letter_hooks by analyzing the job description against candidate profile
   - Immediately trigger `job-engine/routines/generate-materials.md` for these roles
   - This should happen in the SAME run, not wait for next scheduled execution

5. **PHASE 4 — Reporting:**
   
   Send email summary to sav@ensopartners.co via Gmail MCP:
   - Subject: "Job Engine — {date} {time} — {count} new roles" 
   - If any score 8+ roles: prepend "⚡ ACTION — " to subject
   - Body:
     - 🔴 URGENT (score 8+): [roles with company, title, score] — materials auto-generating
     - 🟡 HIGH PROFILE (score 7): [roles] — added to High Profile tab
     - 🟢 TRACKED (score 5-6): [roles] — added to Jobs tab
     - ⚪ SKIPPED: {count} roles scored below 5
     - Link to Google Sheet

## Important Rules
- NEVER scan or apply to Perplexity roles (EXCLUDE_COMPANIES)
- Only add genuinely new roles (not already tracked — deduplicate by title + company)
- Score conservatively — better to miss a mediocre role than waste time on a bad fit
- SPEED MATTERS for score 8+ — generate materials immediately, don't wait
- Use exact verified metrics from candidate.json (never fabricate numbers)

## Connected Services
- Google Sheet ID: 1Wd0x_0fEAyScgMKB9neneuMIo3Sgln-CMytWMF8m6eI
- Gmail: sav@ensopartners.co (via Gmail MCP)
- Google Drive folder: 1Gv_reeRVKo32BNOiRUl7Kpl_dBg2dXh4 (for materials upload)
