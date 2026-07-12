#!/usr/bin/env node
/**
 * One-shot provisioner for the lead pipe — collapses the Resend + Vercel
 * dashboard steps into a single idempotent run.
 *
 * DRY-RUN BY DEFAULT: prints exactly what it would do and changes nothing.
 * Pass --commit to actually write to Resend + Vercel (mutates production DNS
 * and env vars — review the dry-run first).
 *
 * What it does (each step idempotent + best-effort, reported line by line):
 *   1. Resend: add domain (skips if it already exists), read its DNS records.
 *   2. Vercel DNS: write each Resend record (DKIM/SPF/MX) + your DMARC on
 *      _dmarc. Skips records already present; merges a root SPF instead of
 *      duplicating it.
 *   3. Resend: trigger verification, poll until status=verified (~2 min cap).
 *   4. Resend: mint a dedicated SENDING key → this is the app's RESEND_API_KEY.
 *   5. Vercel env (production + preview): set RESEND_API_KEY, SLACK_WEBHOOK_URL,
 *      NEXT_PUBLIC_BOOKING_URL. Skips keys already set (won't clobber).
 *   6. Confirm NOTION_TOKEN / NOTION_LEADS_DB_ID / LEADS_READ_KEY exist; warn
 *      if any is missing. Prints the pre-filled Slack "create app" URL.
 *
 * Env in:
 *   VERCEL_TOKEN       (needed for Vercel steps)   https://vercel.com/account/tokens
 *   RESEND_API_KEY     full-access key (needed for Resend steps). The sending
 *                      key it mints is printed separately — set THAT in Vercel.
 *   SLACK_WEBHOOK_URL  optional — set into Vercel env if provided
 *   CAL_URL            optional — NEXT_PUBLIC_BOOKING_URL (your real Cal slug)
 *   VERCEL_TEAM_ID     default: team_cQAckBl0KIJ29snWAm2dxFdP
 *   VERCEL_PROJECT_ID  default: prj_5qY5loJNtPspkGKel6Eah7ziI5ET
 *   DOMAIN             default: ensolabs.ai
 *   DMARC_RUA          default: mailto:sav@ensopartners.co
 *
 * Usage:
 *   node scripts/provision-lead-pipe.mjs            # dry run
 *   node scripts/provision-lead-pipe.mjs --commit   # execute
 */

const COMMIT = process.argv.includes('--commit');
const DOMAIN = process.env.DOMAIN || 'ensolabs.ai';
const TEAM = process.env.VERCEL_TEAM_ID || 'team_cQAckBl0KIJ29snWAm2dxFdP';
const PROJECT = process.env.VERCEL_PROJECT_ID || 'prj_5qY5loJNtPspkGKel6Eah7ziI5ET';
const DMARC_RUA = process.env.DMARC_RUA || 'mailto:sav@ensopartners.co';
const VT = process.env.VERCEL_TOKEN;
const RK = process.env.RESEND_API_KEY;
const SLACK = process.env.SLACK_WEBHOOK_URL;
const CAL = process.env.CAL_URL;

const log = (...a) => console.log(...a);
const plan = (m) => log(`${COMMIT ? '·' : '[dry-run] would'} ${m}`);
const ok = (m) => log(`  ✓ ${m}`);
const warn = (m) => log(`  ! ${m}`);
const fail = (m) => { console.error(`✗ ${m}`); process.exitCode = 1; };

async function rfetch(path, init = {}) {
  const res = await fetch(`https://api.resend.com${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${RK}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Resend ${path} → ${res.status}: ${JSON.stringify(body).slice(0, 300)}`);
  return body;
}
async function vfetch(path, init = {}) {
  const sep = path.includes('?') ? '&' : '?';
  const res = await fetch(`https://api.vercel.com${path}${sep}teamId=${TEAM}`, {
    ...init,
    headers: { Authorization: `Bearer ${VT}`, 'Content-Type': 'application/json', ...(init.headers || {}) },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Vercel ${path} → ${res.status}: ${JSON.stringify(body).slice(0, 300)}`);
  return body;
}

// host relative to DOMAIN: "send.ensolabs.ai" -> "send"; the apex -> ""
function rel(name) {
  const n = String(name || '').replace(/\.$/, '');
  if (n === DOMAIN || n === '') return '';
  return n.endsWith(`.${DOMAIN}`) ? n.slice(0, -(DOMAIN.length + 1)) : n;
}

async function resendDomain() {
  // idempotent: find existing, else create
  const list = await rfetch('/domains').catch(() => ({ data: [] }));
  let d = (list.data || []).find((x) => x.name === DOMAIN);
  if (d) { ok(`Resend domain exists: ${DOMAIN} (${d.id}, status=${d.status})`); }
  else if (COMMIT) { d = await rfetch('/domains', { method: 'POST', body: JSON.stringify({ name: DOMAIN }) }); ok(`Resend domain added: ${DOMAIN} (${d.id})`); }
  else { plan(`add Resend domain ${DOMAIN}`); return null; }
  // full record set
  const full = await rfetch(`/domains/${d.id}`);
  return full;
}

async function writeDns(records) {
  const existing = (await vfetch(`/v4/domains/${DOMAIN}/records`).catch(() => ({ records: [] }))).records || [];
  const has = (type, name, value) =>
    existing.some((r) => r.type === type && rel(r.name) === rel(name) && (value == null || (r.value || '').includes(value.slice(0, 24))));

  for (const rec of records) {
    const type = rec.type;
    const name = rel(rec.name);
    const value = rec.value;
    const label = `${type} ${name || '@'} = ${String(value).slice(0, 48)}${String(value).length > 48 ? '…' : ''}`;
    if (has(type, rec.name, value)) { ok(`DNS already present: ${label}`); continue; }
    // root SPF: merge rather than duplicate
    if (type === 'TXT' && name === '' && /v=spf1/i.test(value)) {
      const rootTxt = existing.find((r) => r.type === 'TXT' && rel(r.name) === '' && /v=spf1/i.test(r.value || ''));
      if (rootTxt) { warn(`root SPF already exists — merge include manually: ${rootTxt.value}`); continue; }
    }
    if (!COMMIT) { plan(`add DNS ${label}`); continue; }
    const payload = { type, name, value, ttl: rec.ttl || 3600 };
    if (type === 'MX') payload.mxPriority = rec.priority ?? 10;
    await vfetch(`/v2/domains/${DOMAIN}/records`, { method: 'POST', body: JSON.stringify(payload) });
    ok(`DNS added: ${label}`);
  }

  // DMARC (Resend doesn't emit it; we add it)
  const dmarc = `v=DMARC1; p=none; rua=${DMARC_RUA}; adkim=s; aspf=s`;
  if (has('TXT', `_dmarc.${DOMAIN}`, 'v=DMARC1')) ok('DNS already present: _dmarc');
  else if (!COMMIT) plan(`add DNS TXT _dmarc = ${dmarc}`);
  else { await vfetch(`/v2/domains/${DOMAIN}/records`, { method: 'POST', body: JSON.stringify({ type: 'TXT', name: '_dmarc', value: dmarc, ttl: 3600 }) }); ok('DNS added: _dmarc'); }
}

async function verifyDomain(d) {
  if (!COMMIT) { plan(`verify Resend domain ${DOMAIN} and poll to verified`); return; }
  await rfetch(`/domains/${d.id}/verify`, { method: 'POST' }).catch(() => {});
  for (let i = 0; i < 24; i++) {
    const cur = await rfetch(`/domains/${d.id}`);
    if (cur.status === 'verified') { ok('Resend domain verified'); return; }
    log(`  … status=${cur.status} (${i + 1}/24)`);
    await new Promise((r) => setTimeout(r, 5000));
  }
  warn('domain not verified within ~2min — DNS may still be propagating; re-run later');
}

async function mintSendingKey(d) {
  if (!COMMIT) { plan('mint a Resend sending key (scoped to the domain)'); return null; }
  const k = await rfetch('/api-keys', { method: 'POST', body: JSON.stringify({ name: `ensolabs-site sending ${new Date().toISOString().slice(0, 10)}`, permission: 'sending_access', domain_id: d.id }) });
  ok(`Resend sending key minted (set as app RESEND_API_KEY): ${k.token}`);
  return k.token;
}

async function setEnv(key, value) {
  if (!value) return;
  const list = (await vfetch(`/v9/projects/${PROJECT}/env`).catch(() => ({ envs: [] }))).envs || [];
  if (list.some((e) => e.key === key)) { warn(`env ${key} already set — leaving as-is (delete it in Vercel to replace)`); return; }
  if (!COMMIT) { plan(`set env ${key} for production+preview`); return; }
  const type = key.startsWith('NEXT_PUBLIC_') ? 'plain' : 'encrypted';
  await vfetch(`/v10/projects/${PROJECT}/env`, { method: 'POST', body: JSON.stringify({ key, value, type, target: ['production', 'preview'] }) });
  ok(`env set: ${key}`);
}

async function confirmEnv() {
  const list = (await vfetch(`/v9/projects/${PROJECT}/env`).catch(() => ({ envs: [] }))).envs || [];
  for (const key of ['NOTION_TOKEN', 'NOTION_LEADS_DB_ID', 'LEADS_READ_KEY']) {
    const hit = list.find((e) => e.key === key);
    if (hit) ok(`env present: ${key} (targets: ${(hit.target || []).join(',')})`);
    else warn(`env MISSING: ${key} — the pipe/smoke test needs it`);
  }
}

function slackUrl() {
  const manifest = { display_information: { name: 'Enso Leads' }, features: { bot_user: { display_name: 'Enso Leads', always_online: true } }, oauth_config: { scopes: { bot: ['incoming-webhook'] } }, settings: { incoming_webhooks: { enabled: true } } };
  return `https://api.slack.com/apps?new_app=1&manifest_json=${encodeURIComponent(JSON.stringify(manifest))}`;
}

async function main() {
  log(`\n=== lead-pipe provisioner ${COMMIT ? '(COMMIT — writing changes)' : '(dry run — no changes)'} ===`);
  log(`domain=${DOMAIN}  project=${PROJECT}  team=${TEAM}\n`);

  if (RK) {
    log('— Resend —');
    const d = await resendDomain();
    if (d) {
      if (VT) { log('— Vercel DNS —'); await writeDns(d.records || []); }
      else warn('VERCEL_TOKEN not set — skipping DNS writes');
      await verifyDomain(d);
      const sending = await mintSendingKey(d);
      if (sending && VT) await setEnv('RESEND_API_KEY', sending);
    }
  } else warn('RESEND_API_KEY not set — skipping all Resend steps');

  if (VT) {
    log('\n— Vercel env —');
    await setEnv('SLACK_WEBHOOK_URL', SLACK);
    await setEnv('NEXT_PUBLIC_BOOKING_URL', CAL);
    await confirmEnv();
  } else warn('VERCEL_TOKEN not set — skipping all Vercel steps');

  log('\n— Slack (one manual step) —');
  log('  Create the app from your manifest (pre-filled), Install, then copy the');
  log('  Incoming Webhook URL and re-run with SLACK_WEBHOOK_URL set:');
  log(`  ${slackUrl()}\n`);

  log(COMMIT ? '=== done — verify with: npm run smoke:lead ===' : '=== dry run complete — re-run with --commit to apply ===');
}

main().catch((e) => fail(e.message || String(e)));
