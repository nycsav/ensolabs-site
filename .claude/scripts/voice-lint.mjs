#!/usr/bin/env node
/**
 * voice-lint.mjs — Enso Labs studio-voice linter
 *
 * Studio rule (CLAUDE.md): always "we", never "I" in studio copy.
 * Exception: signal2noise insight articles are intentional first-person
 * founder field notes — those are FLAGGED FOR REVIEW, not treated as errors.
 *
 * Output:
 *   - VIOLATION  -> first-person pronouns in pages/components (studio copy). Fix to "we".
 *   - REVIEW     -> first-person in insight article bodies (intentional voice; human decides).
 *
 * Usage:  node .claude/scripts/voice-lint.mjs
 * Exit:   0 = no violations (reviews allowed), 1 = violations found.
 *
 * Zero dependencies. Heuristic, not a parser — a flagging tool, not an autofixer.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();

// First-person singular as a whole word, plus common contractions.
// "I" as a standalone pronoun, but NOT "I/O" (Google I/O) — plus contractions and possessives.
const FIRST_PERSON = /\b(I'm|I've|I'll|I'd|I(?![/\w])|myself|mine|\bmy\b)\b/;
// Ignore obvious non-prose: imports, JSX props, URLs, code-ish lines.
const IGNORE_LINE = /^(import |export |\s*\/\/|\s*\*|<|\s*(className|href|src|alt|url|id|key)=)/;

const STUDIO_DIRS = ['app', 'components'];
const INSIGHTS_FILE = 'lib/insights.ts';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.') || name === 'signal-lens-demo') continue;
    const full = join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else if (/\.(tsx?|mdx?)$/.test(name)) out.push(full);
  }
  return out;
}

function scan(file, kind) {
  const findings = [];
  const text = readFileSync(file, 'utf8');
  text.split('\n').forEach((line, i) => {
    if (IGNORE_LINE.test(line)) return;
    const m = line.match(FIRST_PERSON);
    if (m) findings.push({ file: relative(ROOT, file), line: i + 1, hit: m[0], text: line.trim().slice(0, 140) });
  });
  return findings.map((f) => ({ ...f, kind }));
}

let violations = [];
let reviews = [];

// Studio copy = violations
for (const d of STUDIO_DIRS) {
  let files = [];
  try { files = walk(join(ROOT, d)); } catch { /* dir may not exist */ }
  for (const f of files) violations.push(...scan(f, 'VIOLATION'));
}

// Insight bodies = review-only (intentional founder voice)
try { reviews.push(...scan(join(ROOT, INSIGHTS_FILE), 'REVIEW')); } catch { /* ignore */ }

const fmt = (rows) =>
  rows.map((r) => `  ${r.kind}  ${r.file}:${r.line}  [${r.hit}]  ${r.text}`).join('\n');

console.log('— Enso Labs voice lint —');
console.log('Studio rule: always "we", never "I" (insight field notes exempt).\n');

if (violations.length) {
  console.log(`x ${violations.length} VIOLATION(S) in studio copy (fix to "we"):`);
  console.log(fmt(violations) + '\n');
} else {
  console.log('OK No first-person violations in pages/components.\n');
}

if (reviews.length) {
  console.log(`i ${reviews.length} first-person line(s) in insight articles (intentional voice — review only):`);
  console.log(fmt(reviews) + '\n');
}

process.exit(violations.length ? 1 : 0);
