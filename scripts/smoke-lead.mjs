#!/usr/bin/env node
/**
 * Deploy smoke test — asserts the lead pipe end-to-end.
 *
 *   1. POST /api/leads a synthetic lead.
 *   2. Poll GET /api/leads/new?key=$LEADS_READ_KEY for ~12s until the row appears.
 *   3. Archive that Notion row so it never reaches a human.
 *
 * Non-zero exit fails the deploy — a broken pipe never merges.
 *
 * Env:
 *   SMOKE_BASE_URL   base URL to hit (Vercel preview URL). Default http://localhost:3000
 *   LEADS_READ_KEY   the key the enrichment cron uses for /api/leads/new
 *   NOTION_TOKEN     used to archive the created Notion row
 *
 * Requires NOTION_TOKEN + NOTION_LEADS_DB_ID + LEADS_READ_KEY wired on the target,
 * so it stays RED until the Notion/KV/alert env is set (that's the point).
 */

const BASE = (process.env.SMOKE_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const READ_KEY = process.env.LEADS_READ_KEY || '';
const ts = Date.now();
const marker = `smoke+${ts}@ensolabs.ai`;

function fail(msg) {
  console.error(`✗ smoke-lead FAILED: ${msg}`);
  process.exit(1);
}

async function main() {
  if (!READ_KEY) fail('LEADS_READ_KEY is not set — cannot read /api/leads/new');

  // 1) synthetic submit
  const submit = await fetch(`${BASE}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: marker, message: `smoke test ${ts}`, source: 'smoke' }),
  });
  if (!submit.ok) fail(`POST /api/leads returned ${submit.status}`);
  const submitData = await submit.json().catch(() => ({}));
  if (submitData?.ok !== true) fail('POST /api/leads did not return { ok: true }');
  console.log(`→ submitted ${marker}`);

  // 2) poll for the row (~12s)
  let row = null;
  for (let i = 0; i < 12; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    const res = await fetch(`${BASE}/api/leads/new?key=${encodeURIComponent(READ_KEY)}`);
    if (!res.ok) continue;
    const data = await res.json().catch(() => ({}));
    row = (data.leads || []).find((r) => r.email === marker);
    if (row) break;
  }
  if (!row) fail('synthetic lead never appeared at GET /api/leads/new within ~12s');
  console.log(`→ row appeared at /api/leads/new (page ${row.page_id})`);

  // 3) clean up — archive the Notion row so it never reaches a human
  if (row.page_id && process.env.NOTION_TOKEN) {
    const del = await fetch(`https://api.notion.com/v1/pages/${row.page_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ archived: true }),
    });
    if (!del.ok) console.warn(`! could not archive smoke row ${row.page_id} (${del.status}) — archive it manually`);
    else console.log('→ smoke row archived');
  } else {
    console.warn('! no NOTION_TOKEN — archive the smoke row manually');
  }

  console.log('✓ smoke-lead PASSED — the lead pipe works end to end');
}

main().catch((e) => fail(e?.message || String(e)));
