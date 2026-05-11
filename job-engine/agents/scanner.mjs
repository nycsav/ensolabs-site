#!/usr/bin/env node
/**
 * Scanner Agent — Daily Job Discovery
 *
 * WHAT IT DOES:
 * 1. Searches target company career pages for new roles
 * 2. Scans LinkedIn/Indeed job alert emails via Gmail MCP
 * 3. Scores each role against candidate profile (0-10)
 * 4. Filters: only score 5+ goes to Google Sheet (reduces noise)
 * 5. Score 7+ → High Profile tab. Score 8+ → auto-generate materials
 * 6. Speed matters: high-score roles should reach "ready to submit" ASAP
 *
 * DESIGNED FOR: Claude Code Routine (runs every 4 hours weekdays)
 *
 * In Claude Code, this runs as a natural-language routine.
 * The code below is the LOGIC SPECIFICATION that Claude Code executes.
 * It's not a traditional Node.js script — it's a structured prompt
 * that Claude Code interprets and runs with its built-in tools.
 */

import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ─── Score Thresholds ────────────────────────────────────────────
// These control what gets tracked vs. ignored.
// Speed-to-apply is the competitive advantage — high-score roles
// must reach "materials ready" within minutes of detection.

const MINIMUM_SHEET_SCORE = 5;     // Below this → silent skip, don't add to sheet
const HIGH_PROFILE_SCORE = 7;      // 7+ → High Profile tab, active monitoring
const AUTO_MATERIALS_SCORE = 8;    // 8+ → auto-generate resume + cover letter
const EXCLUDE_COMPANIES = ['Perplexity'];  // Never scan or apply

// ─── LinkedIn/Indeed Email Source ─────────────────────────────────
// Scans Gmail for LinkedIn and Indeed job alert emails.
// This catches roles from companies NOT in TARGET_COMPANIES —
// the long tail that LinkedIn's algorithm surfaces.

const LINKEDIN_EMAIL_SOURCE = {
  enabled: true,
  gmail_queries: [
    // LinkedIn job alerts
    'from:linkedin.com newer_than:8h -label:JobAgent/Processed subject:(job OR opportunity OR alert OR hiring OR role OR apply OR recommended)',
    // Indeed alerts
    'from:indeed.com newer_than:8h -label:JobAgent/Processed',
    // Recruiter outreach
    'from:(recruiter OR talent OR hiring) subject:(AI OR artificial intelligence OR opportunity) newer_than:8h -label:JobAgent/Processed',
    // Direct subject-line matches
    'subject:(AI transformation OR AI strategy OR Head of AI OR VP of AI OR AI consulting OR Principal AI OR AI architect) newer_than:8h -label:JobAgent/Processed',
  ],
  // After processing, label emails so they aren't re-scanned
  processed_label: 'JobAgent/Processed',

  // Fields to extract from each alert email
  extract_fields: ['title', 'company', 'location', 'apply_url', 'description_snippet'],

  // How to extract: Claude reads the email body and pulls structured data.
  // LinkedIn alert emails contain multiple job listings in a single email.
  // Each listing has: title, company, location, and a "View job" link.
  extraction_prompt: `
    Extract all job listings from this email. For each job, return:
    - title: The job title exactly as shown
    - company: Company name
    - location: City/State and work mode (Remote/Hybrid/On-site)
    - apply_url: The "View job" or "Apply" URL (LinkedIn or Indeed link)
    - description_snippet: Any brief description shown in the email

    Return as a JSON array. If the email isn't a job alert, return [].
  `
};

// ─── Target Companies (Career Page Scraping) ─────────────────────

const TARGET_COMPANIES = [
  {
    name: 'Anthropic',
    careers_url: 'https://boards.greenhouse.io/anthropic',
    platform: 'greenhouse',
    keywords: ['solutions architect', 'applied ai', 'enterprise', 'partnerships', 'strategy', 'product', 'field engineer', 'customer success'],
    min_score: 7
  },
  {
    name: 'OpenAI',
    careers_url: 'https://openai.com/careers/search',
    platform: 'ashby',
    keywords: ['partnerships', 'solutions', 'applied ai', 'enterprise', 'strategy', 'product', 'customer'],
    min_score: 7
  },
  {
    name: 'Google DeepMind',
    careers_url: 'https://www.google.com/about/careers/applications/jobs/results?q=deepmind',
    platform: 'google_careers',
    keywords: ['product manager', 'strategy', 'agentic', 'partnerships', 'enterprise', 'applied'],
    min_score: 7
  },
  {
    name: 'Cuesta Partners',
    careers_url: 'https://www.cuestapartners.com/careers',
    platform: 'lever',
    keywords: ['ai', 'transformation', 'consulting', 'strategy', 'digital'],
    min_score: 6
  },
  {
    name: 'McKinsey',
    careers_url: 'https://www.mckinsey.com/careers/search-jobs',
    platform: 'custom',
    keywords: ['ai', 'digital', 'analytics', 'transformation'],
    min_score: 7
  },
  {
    name: 'BCG',
    careers_url: 'https://careers.bcg.com/search-jobs',
    platform: 'custom',
    keywords: ['ai', 'digital', 'data science', 'transformation'],
    min_score: 7
  },
  {
    name: 'Bain',
    careers_url: 'https://www.bain.com/careers/',
    platform: 'custom',
    keywords: ['ai', 'advanced analytics', 'digital', 'technology'],
    min_score: 7
  },
  {
    name: 'Goldman Sachs',
    careers_url: 'https://higher.gs.com/roles',
    platform: 'custom',
    keywords: ['ai', 'machine learning', 'strategy', 'digital', 'transformation'],
    min_score: 7
  }
];

// ─── Scoring Rubric ──────────────────────────────────────────────

const SCORING_CRITERIA = {
  title_match: {
    weight: 3,
    description: 'How well does the title match candidate seniority and function?',
    signals: {
      strong: ['Director', 'VP', 'Head of', 'Principal', 'Senior Director', 'Partner'],
      moderate: ['Senior Manager', 'Manager', 'Lead', 'Staff'],
      weak: ['Associate', 'Junior', 'Intern', 'Entry']
    }
  },
  skill_overlap: {
    weight: 3,
    description: 'How many required skills match candidate profile?',
    candidate_skills: [
      'AI strategy', 'agentic systems', 'Claude', 'MCP', 'LLM',
      'enterprise consulting', 'Fortune 500', 'pilot to production',
      'RAG', 'multi-agent', 'financial AI', 'healthcare AI',
      'stakeholder management', 'C-suite', 'team leadership',
      'product management', 'solutions architecture', 'partnerships'
    ]
  },
  industry_fit: {
    weight: 2,
    description: 'Does the industry match candidate experience?',
    strong_industries: ['AI/ML', 'technology', 'consulting', 'financial services', 'healthcare/pharma'],
    moderate_industries: ['media', 'advertising', 'martech', 'enterprise SaaS']
  },
  location_match: {
    weight: 1,
    description: 'NYC, remote, or hybrid-friendly?',
    preferred: ['New York', 'Remote', 'Hybrid']
  },
  compensation_signal: {
    weight: 1,
    description: 'Seniority level suggests appropriate compensation?'
  }
};

/**
 * Score a role object against the candidate profile
 * Returns 0-10 with breakdown
 */
export function scoreRole(role) {
  let total = 0;
  let maxPossible = 0;
  const breakdown = {};

  // Title match (0-3)
  const titleUpper = (role.title || '').toUpperCase();
  if (SCORING_CRITERIA.title_match.signals.strong.some(s => titleUpper.includes(s.toUpperCase()))) {
    breakdown.title = 3;
  } else if (SCORING_CRITERIA.title_match.signals.moderate.some(s => titleUpper.includes(s.toUpperCase()))) {
    breakdown.title = 2;
  } else {
    breakdown.title = 1;
  }
  total += breakdown.title;
  maxPossible += 3;

  // Skill overlap (0-3)
  const descLower = ((role.description || '') + ' ' + (role.requirements || '')).toLowerCase();
  const matchedSkills = SCORING_CRITERIA.skill_overlap.candidate_skills.filter(
    skill => descLower.includes(skill.toLowerCase())
  );
  const skillRatio = matchedSkills.length / SCORING_CRITERIA.skill_overlap.candidate_skills.length;
  breakdown.skills = Math.round(skillRatio * 3);
  breakdown.matched_skills = matchedSkills;
  total += breakdown.skills;
  maxPossible += 3;

  // Industry fit (0-2)
  const companyLower = (role.company || '').toLowerCase();
  if (SCORING_CRITERIA.industry_fit.strong_industries.some(i => descLower.includes(i.toLowerCase()) || companyLower.includes(i.toLowerCase()))) {
    breakdown.industry = 2;
  } else if (SCORING_CRITERIA.industry_fit.moderate_industries.some(i => descLower.includes(i.toLowerCase()))) {
    breakdown.industry = 1;
  } else {
    breakdown.industry = 0;
  }
  total += breakdown.industry;
  maxPossible += 2;

  // Location (0-1)
  const locLower = (role.location || '').toLowerCase();
  breakdown.location = SCORING_CRITERIA.location_match.preferred.some(l => locLower.includes(l.toLowerCase())) ? 1 : 0;
  total += breakdown.location;
  maxPossible += 1;

  // Compensation signal (0-1)
  breakdown.compensation = breakdown.title >= 2 ? 1 : 0;
  total += breakdown.compensation;
  maxPossible += 1;

  // Normalize to 0-10
  const score = Math.round((total / maxPossible) * 10);

  return { score, breakdown, matchedSkills };
}

// ─── Claude Code Routine Specification ───────────────────────────
//
// When run as a Claude Code Routine, Claude interprets the following
// as the task prompt. The routine has access to:
//   - web_fetch (to scrape career pages)
//   - Google Sheets MCP (to update the tracker)
//   - This file's scoreRole() function logic
//
// ROUTINE PROMPT:
// """
// Job Scanner — runs every 4 hours on weekdays (0 8,12,16,20 * * 1-5)
// SPEED IS CRITICAL — high-score roles must reach "ready to submit" fast.
//
// PHASE 1: LINKEDIN/INDEED EMAIL SCANNING (highest priority — broadest reach)
//
//   1. Search Gmail using each query in LINKEDIN_EMAIL_SOURCE.gmail_queries
//   2. For each matching email:
//      a. Read the email body
//      b. Extract job listings using the extraction_prompt
//      c. For each extracted role:
//         - Check EXCLUDE_COMPANIES — skip if matched
//         - Check if already in Google Sheet (match on title + company)
//         - Score using SCORING_CRITERIA rubric (0-10)
//         - If score < MINIMUM_SHEET_SCORE (5): silent skip
//         - If score 5-6: add to "Jobs" tab only
//         - If score 7+: add to "Jobs" tab AND "High Profile" tab
//         - If score 8+: ALSO add to config/roles.json and immediately
//           trigger materials generation (speed matters!)
//      d. Label the email as JobAgent/Processed via Gmail MCP
//
// PHASE 2: CAREER PAGE SCRAPING (targeted — 8 specific companies)
//
//   1. For each company in TARGET_COMPANIES:
//      a. Fetch the careers_url using web_fetch
//      b. Extract job listings matching the keywords
//      c. Apply same scoring + filtering as Phase 1
//
// PHASE 3: REPORTING
//
//   1. Send email summary to sav@ensopartners.co via Gmail MCP:
//      Subject: "Job Engine Scan — {date} {time} — {count} new roles"
//      Body:
//        🔴 URGENT (score 8+): [roles] — materials auto-generating
//        🟡 HIGH PROFILE (score 7): [roles] — added to High Profile tab
//        🟢 TRACKED (score 5-6): [roles] — added to Jobs tab
//        ⚪ SKIPPED (score <5): {count} roles below threshold
//
//   2. If any score 8+ roles found, email subject should include "⚡ ACTION"
//
// SCORE THRESHOLDS:
//   < 5  → Don't add to sheet (noise reduction)
//   5-6  → Jobs tab only (passive tracking)
//   7    → Jobs + High Profile (active monitoring)
//   8+   → Jobs + High Profile + auto-generate materials + flag for submission
//
// EXCLUSIONS: Never scan or apply to companies in EXCLUDE_COMPANIES
//
// Google Sheet ID: 1Wd0x_0fEAyScgMKB9neneuMIo3Sgln-CMytWMF8m6eI
// """

export {
  TARGET_COMPANIES,
  SCORING_CRITERIA,
  LINKEDIN_EMAIL_SOURCE,
  MINIMUM_SHEET_SCORE,
  HIGH_PROFILE_SCORE,
  AUTO_MATERIALS_SCORE,
  EXCLUDE_COMPANIES
};

// ─── Standalone execution (for testing) ──────────────────────────

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('Scanner Agent — Target Companies:');
  TARGET_COMPANIES.forEach(c => {
    console.log(`  ${c.name}: ${c.careers_url}`);
    console.log(`    Keywords: ${c.keywords.join(', ')}`);
    console.log(`    Min score: ${c.min_score}`);
  });

  // Demo scoring
  const demoRole = {
    title: 'Director, Applied AI Solutions',
    company: 'Anthropic',
    description: 'Lead enterprise AI deployment, solutions architecture, Claude platform, partnerships with Fortune 500 customers, pilot to production workflows',
    location: 'New York / Remote',
    requirements: 'Experience with LLM, RAG, multi-agent systems, enterprise consulting, stakeholder management'
  };
  const result = scoreRole(demoRole);
  console.log('\nDemo score:', JSON.stringify(result, null, 2));
}
