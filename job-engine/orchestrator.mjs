#!/usr/bin/env node
/**
 * Orchestrator — Chains Scanner → Materials → Submitter
 *
 * This is the main entry point for the full pipeline.
 * In Claude Code, it runs as a Routine that coordinates the three agents.
 *
 * MODES:
 *   --scan     : Run scanner only (daily cron)
 *   --generate : Generate materials for pending roles only
 *   --submit   : Fill applications for ready roles only
 *   --full     : Run the complete pipeline
 *   --status   : Show current pipeline status
 */

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { TARGET_COMPANIES, scoreRole } from './agents/scanner.mjs';
import { generateAllPending, generateMaterialsForRole } from './agents/materials.mjs';
import { createSubmissionPlan, PLATFORM_STRATEGIES } from './agents/submitter.mjs';
import { loadRoles } from './lib/template-engine.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Pipeline Status ─────────────────────────────────────────────

async function showStatus() {
  const { roles } = await loadRoles();

  const counts = {
    total: roles.length,
    materials_ready: roles.filter(r => r.status === 'materials_ready').length,
    applied: roles.filter(r => r.status === 'applied').length,
    pending: roles.filter(r => r.status === 'pending' || !r.status).length,
    paused: roles.filter(r => r.status === 'paused').length
  };

  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║     JOB ENGINE — PIPELINE STATUS         ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║  Total roles tracked:    ${String(counts.total).padStart(3)}             ║`);
  console.log(`║  Materials ready:        ${String(counts.materials_ready).padStart(3)}             ║`);
  console.log(`║  Applied:                ${String(counts.applied).padStart(3)}             ║`);
  console.log(`║  Pending materials:      ${String(counts.pending).padStart(3)}             ║`);
  console.log(`║  Paused:                 ${String(counts.paused).padStart(3)}             ║`);
  console.log('╚══════════════════════════════════════════╝\n');

  // Detail by company
  const byCompany = {};
  for (const role of roles) {
    if (!byCompany[role.company]) byCompany[role.company] = [];
    byCompany[role.company].push(role);
  }

  for (const [company, companyRoles] of Object.entries(byCompany)) {
    console.log(`\n  ${company}:`);
    for (const r of companyRoles) {
      const statusIcon = {
        materials_ready: '📄',
        applied: '✅',
        pending: '⏳',
        paused: '⏸️'
      }[r.status] || '❓';
      console.log(`    ${statusIcon} [${r.score || '?'}] ${r.title} — ${r.status || 'no status'}`);
    }
  }
}

// ─── Full Pipeline ───────────────────────────────────────────────

async function runFull() {
  console.log('\n🚀 Starting full pipeline...\n');

  // Phase 1: Scan
  console.log('═══ PHASE 1: SCANNING ═══');
  console.log('In Claude Code, this phase uses web_fetch to check career pages.');
  console.log(`Target companies: ${TARGET_COMPANIES.map(c => c.name).join(', ')}`);
  console.log('(Run via Claude Code Routine for live scanning)\n');

  // Phase 2: Generate Materials
  console.log('═══ PHASE 2: GENERATING MATERIALS ═══');
  const materials = await generateAllPending();
  if (materials.length > 0) {
    console.log(`Generated materials for ${materials.length} roles:`);
    materials.forEach(m => console.log(`  ✓ ${m.roleId}`));
  } else {
    console.log('All roles already have materials.\n');
  }

  // Phase 3: Submit (plans only — actual submission requires Claude Code + browser)
  console.log('\n═══ PHASE 3: SUBMISSION PLANS ═══');
  const { roles } = await loadRoles();
  const ready = roles.filter(r => r.status === 'materials_ready');

  if (ready.length > 0) {
    console.log(`${ready.length} roles ready for submission:\n`);
    for (const role of ready) {
      try {
        const plan = await createSubmissionPlan(role.id);
        console.log(`  📋 ${plan.company} — ${plan.title}`);
        console.log(`     Platform: ${plan.platform}`);
        console.log(`     URL: ${plan.apply_url}`);
        console.log(`     Steps: ${plan.steps.length}`);
        console.log('');
      } catch (err) {
        console.log(`  ⚠️ ${role.company} — ${role.title}: ${err.message}`);
      }
    }
    console.log('⚠️  Actual submission requires Claude Code with Playwright MCP.');
    console.log('   Run: claude "Submit applications for ready roles" in Claude Code.');
  } else {
    console.log('No roles ready for submission.\n');
  }
}

// ─── CLI ─────────────────────────────────────────────────────────

const mode = process.argv[2] || '--status';

switch (mode) {
  case '--scan':
    console.log('Scanner requires Claude Code Routine with web_fetch.');
    console.log('Run: claude "Run daily job scan" in Claude Code.');
    break;
  case '--generate':
    generateAllPending().then(results => {
      console.log(`Generated ${results.length} material sets.`);
    }).catch(console.error);
    break;
  case '--submit':
    console.log('Submitter requires Claude Code with Playwright MCP.');
    console.log('Run: claude "Submit applications for ready roles" in Claude Code.');
    break;
  case '--full':
    runFull().catch(console.error);
    break;
  case '--status':
    showStatus().catch(console.error);
    break;
  default:
    console.log('Usage: node orchestrator.mjs [--scan|--generate|--submit|--full|--status]');
}
