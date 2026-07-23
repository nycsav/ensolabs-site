#!/usr/bin/env node
/**
 * Static assertions for the AGI Summit conversion update (no test framework, no
 * network). Verifies the wiring is present and internally consistent so a
 * refactor can't silently drop the CTA, the tracked event, or the attribution.
 *
 * Run: node scripts/assert-conversion-update.mjs   (or: npm run test:conversion)
 * Non-zero exit on any failed invariant.
 */

import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const SLUG = 'enso-labs-sf-agentic-ai-summits-2026';
const EVENT = 'production_gap_review_click';
const CTA_LABEL = 'Book a 20-minute production-gap review';
const CTA_HREF =
  '/contact?utm_source=linkedin&utm_medium=organic_social&utm_campaign=agi_summit_followup_2026&utm_content=post_event_review';

let passed = 0;
const ok = (cond, msg) => {
  assert.ok(cond, msg);
  passed++;
};

// 1) Article carries the post-event update with the exact CTA + URL preserved.
const insights = read('lib/insights.ts');
ok(insights.includes(`slug: '${SLUG}'`), 'AGI Summit article slug is unchanged');
ok(insights.includes(CTA_LABEL), 'CTA label present on the article');
ok(insights.includes(CTA_HREF), 'CTA href with full UTM string present on the article');
ok(
  insights.includes('Post-event update, July 22'),
  'dated post-event update label present',
);
ok(insights.includes("dateModified: '2026-07-22'"), 'dateModified bumped to post-event date');

// 2) The CTA component fires the named GA4 event via the shared track() wrapper.
const cta = read('components/PostEventUpdate.tsx');
ok(cta.includes(`track('${EVENT}'`), `${EVENT} fired from the CTA component`);
ok(/href={ctaHref}/.test(cta), 'CTA links to the provided href (UTM preserved)');

// 3) The first-party collector accepts the new event (client gtag works regardless).
const track = read('app/api/track/route.ts');
ok(track.includes(`'${EVENT}'`), `${EVENT} allow-listed in /api/track`);

// 4) Contact form instrumentation meets the standard: form_start on first focus,
//    generate_lead ONLY after a confirmed ok, and campaign carried on the event.
const form = read('components/ContactForm.tsx');
ok(/onFirstInteract[\s\S]*track\('form_start'/.test(form), 'form_start fires on first interaction');
ok(
  form.indexOf("track('generate_lead'") > form.indexOf('if (!res.ok'),
  'generate_lead fires after the ok-guard, not on click/failed submit',
);
ok(/generate_lead'[\s\S]*utm_campaign:/.test(form), 'generate_lead carries utm_campaign attribution');

// 5) Attribution capture reads UTM from the URL (preserves campaign through /contact).
const attr = read('lib/attribution.ts');
ok(attr.includes("q.get('utm_campaign')"), 'attribution captures utm_campaign from the URL');

console.log(`✓ assert-conversion-update PASSED — ${passed} invariants held`);
