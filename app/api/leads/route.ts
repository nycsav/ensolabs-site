import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Enso Labs — native inbound lead endpoint (canonical path: /api/leads).
//
// The old /api/lead now re-exports this handler (back-compat). This version:
//   - accepts the simplified 2-field form (message + email); name is OPTIONAL.
//   - writes a DURABLE KV log FIRST (never-lose-a-lead), when KV is configured.
//   - writes the Notion "Enso Inbound Leads" row (Status='Not started', no score
//     — the enrichment cron at /api/leads/new picks it up).
//   - fires Slack + email alerts, fail-soft (a missing env var just skips it).
//
// Env (all pre-existing; unchanged names):
//   NOTION_TOKEN, NOTION_LEADS_DB_ID   Notion integration + leads DB/data-source
//   LEADS_READ_KEY                     shared secret for /api/leads/new
// Optional:
//   SLACK_WEBHOOK_URL                  incoming webhook for #leads alerts
//   RESEND_API_KEY                     Resend key for email alerts
//   LEAD_ALERT_TO   (default sav@ensopartners.co)
//   LEAD_ALERT_FROM (default "Enso Leads <leads@ensolabs.ai>")
//   KV_REST_API_URL / KV_REST_API_TOKEN  Vercel KV — enables the durable log,
//     dead-letter queue, and per-IP rate limit. Absent → those steps no-op.
// ---------------------------------------------------------------------------

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_ID = process.env.NOTION_LEADS_DB_ID;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ALERT_TO = process.env.LEAD_ALERT_TO || 'sav@ensopartners.co';
const ALERT_FROM = process.env.LEAD_ALERT_FROM || 'Enso Leads <leads@ensolabs.ai>';

// Maps the (now optional) service value to Notion "Intent" options.
const INTENT_MAP: Record<string, string> = {
  consult: 'Consulting',
  build: 'Build',
  ship: 'Ship',
  workshop: 'Workshop',
  contract: 'Contract Role',
  other: 'Other',
};

type LeadInput = {
  name?: string; // optional now — comes back in the reply
  email: string;
  company?: string;
  service?: string;
  message: string;
  source?: string;
  linkedin?: string;
  attribution?: string; // "linkedin / social / pilot-gap-post"
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing?: string;
  website?: string; // honeypot
};

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function clip(v: string, max = 1800): string {
  return v.length > max ? v.slice(0, max - 1) + '…' : v;
}

// A display name for the Notion title / alerts. Name is optional, so fall back
// to the email local-part, then the full email.
function displayName(lead: LeadInput): string {
  if (lead.name && lead.name.trim()) return lead.name.trim();
  const local = lead.email.split('@')[0];
  return local || lead.email;
}

// --- Vercel KV (optional; guarded so the route runs fine without it) ---------
async function kvClient() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  try {
    const { kv } = await import('@vercel/kv');
    return kv;
  } catch {
    return null;
  }
}

async function kvPush(list: string, obj: unknown): Promise<void> {
  const kv = await kvClient();
  if (!kv) return;
  try {
    await kv.lpush(list, JSON.stringify(obj));
  } catch (e) {
    console.error(`KV lpush ${list} failed`, e);
  }
}

// crude per-IP throttle: 5 attempts / 10 min. No-op when KV isn't configured.
async function rateLimited(ip: string): Promise<boolean> {
  const kv = await kvClient();
  if (!kv) return false;
  try {
    const k = `rl:lead:${ip}`;
    const n = await kv.incr(k);
    if (n === 1) await kv.expire(k, 600);
    return n > 5;
  } catch (e) {
    console.error('rate-limit check failed', e);
    return false;
  }
}

async function parseBody(req: Request): Promise<Partial<LeadInput>> {
  const ct = req.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return (await req.json().catch(() => ({}))) as Partial<LeadInput>;
  }
  const fd = await req.formData().catch(() => null);
  if (!fd) return {};
  const obj: Record<string, string> = {};
  fd.forEach((val, key) => {
    obj[key] = String(val);
  });
  return obj as Partial<LeadInput>;
}

async function writeToNotion(lead: LeadInput): Promise<string | null> {
  if (!NOTION_TOKEN || !NOTION_DB_ID) return null;

  const intent = INTENT_MAP[(lead.service || '').toLowerCase()] || 'Other';
  const utmSrc = (lead.utm_source || '').toLowerCase();
  let source = 'Website';
  if (/linkedin/i.test(lead.source || '') || /linkedin/.test(utmSrc)) source = 'LinkedIn';
  else if (utmSrc && utmSrc !== 'direct' && utmSrc !== 'google' && utmSrc !== 'bing') {
    if (lead.utm_medium === 'referral' || lead.utm_medium === 'ai_referral') source = 'Referral';
  }

  // Attribution footer appended to the Message so the channel is visible on the
  // lead record without needing new Notion columns.
  const attrBits: string[] = [];
  if (lead.attribution) attrBits.push(`Channel: ${lead.attribution}`);
  if (lead.landing) attrBits.push(`Landed on: ${lead.landing}`);
  const attrFooter = attrBits.length ? `\n\n— attribution —\n${attrBits.join('\n')}` : '';

  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: clip(displayName(lead), 200) } }] },
    Email: { email: lead.email },
    Intent: { select: { name: intent } },
    Source: { select: { name: source } },
    Status: { status: { name: 'Not started' } },
    Message: { rich_text: [{ text: { content: clip(lead.message + attrFooter) } }] },
    // Lead Score intentionally omitted — the enrichment cron fills it.
  };
  if (lead.company) {
    properties.Company = { rich_text: [{ text: { content: clip(lead.company, 200) } }] };
  }
  if (lead.linkedin && /^https?:\/\//.test(lead.linkedin)) {
    properties['LinkedIn / URL'] = { url: lead.linkedin };
  }

  async function createPage(parent: Record<string, string>, version: string) {
    return fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': version,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ parent, properties }),
    });
  }

  // Classic database_id (2022-06-28) first; retry as data_source_id (2025-09-03).
  let res = await createPage({ database_id: NOTION_DB_ID! }, '2022-06-28');
  if (!res.ok && (res.status === 400 || res.status === 404)) {
    const retry = await createPage({ data_source_id: NOTION_DB_ID! }, '2025-09-03');
    if (retry.ok) res = retry;
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Notion write failed (${res.status}): ${detail.slice(0, 300)}`);
  }
  const data = (await res.json()) as { url?: string };
  return data.url || null;
}

async function alertSlack(lead: LeadInput, notionUrl: string | null): Promise<void> {
  if (!SLACK_WEBHOOK_URL) return;
  const intent = INTENT_MAP[(lead.service || '').toLowerCase()] || 'Other';
  const lines = [
    `:envelope_with_arrow: *New inbound lead* — ${displayName(lead)}`,
    `*Email:* ${lead.email}`,
    lead.company ? `*Company:* ${lead.company}` : '',
    `*Intent:* ${intent}`,
    lead.attribution ? `*Attribution:* ${lead.attribution}` : '',
    `*Message:* ${clip(lead.message, 500)}`,
    notionUrl ? `<${notionUrl}|Open in Notion>` : '',
  ].filter(Boolean);

  await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: lines.join('\n') }),
  }).catch(() => {});
}

async function alertEmail(lead: LeadInput, notionUrl: string | null): Promise<void> {
  if (!RESEND_API_KEY) return;
  const intent = INTENT_MAP[(lead.service || '').toLowerCase()] || 'Other';
  const html = `
    <h2 style="margin:0 0 12px">New inbound lead — ${escapeHtml(displayName(lead))}</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6">
      <tr><td style="padding-right:12px"><b>Email</b></td><td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
      ${lead.company ? `<tr><td><b>Company</b></td><td>${escapeHtml(lead.company)}</td></tr>` : ''}
      <tr><td><b>Intent</b></td><td>${escapeHtml(intent)}</td></tr>
      ${lead.attribution ? `<tr><td><b>Channel</b></td><td>${escapeHtml(lead.attribution)}</td></tr>` : ''}
      ${lead.linkedin ? `<tr><td><b>Link</b></td><td><a href="${escapeHtml(lead.linkedin)}">${escapeHtml(lead.linkedin)}</a></td></tr>` : ''}
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:14px;margin-top:16px"><b>Message</b><br>${escapeHtml(lead.message).replace(/\n/g, '<br>')}</p>
    ${notionUrl ? `<p style="font-family:system-ui,sans-serif;font-size:14px"><a href="${escapeHtml(notionUrl)}">Open in Notion →</a></p>` : ''}
  `;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: ALERT_FROM,
      to: [ALERT_TO],
      reply_to: lead.email,
      subject: `New lead: ${displayName(lead)}${lead.company ? ` (${lead.company})` : ''} — ${intent}`,
      html,
    }),
  }).catch(() => {});
}

// Plain-text acknowledgement to the lead. Practitioner voice, no template, no
// marketing. Sends from the verified domain (LEAD_ALERT_FROM); guarded on
// RESEND_API_KEY so it no-ops until Resend is wired + the domain is verified.
async function ackLead(lead: LeadInput): Promise<void> {
  if (!RESEND_API_KEY) return;
  const text = [
    'Thanks — your note reached Sav directly. He replies within 24h.',
    '',
    'What you sent:',
    `"${clip(lead.message, 800)}"`,
    '',
    'No CRM, no auto-responder — reply to this email and it comes straight back to us.',
    '',
    '— Enso Labs',
  ].join('\n');

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: ALERT_FROM,
      to: [lead.email],
      reply_to: ALERT_TO,
      subject: 'Got your note — Enso Labs',
      text,
    }),
  }).catch(() => {});
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(req: Request) {
  try {
    const body = await parseBody(req);

    // Honeypot: silently accept (200) so bots think they succeeded.
    if (body.website && String(body.website).trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();
    const name = String(body.name || '').trim(); // OPTIONAL now

    // Message + email are the only required fields (name dropped from the form).
    if (!message || !email) {
      return NextResponse.json(
        { ok: false, error: 'Add a valid email and a line about what you’re shipping.' },
        { status: 400 },
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (await rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Too many attempts — try again shortly.' },
        { status: 429 },
      );
    }

    const lead: LeadInput = {
      name: name || undefined,
      email,
      company: String(body.company || '').trim() || undefined,
      service: String(body.service || '').trim() || undefined,
      message,
      source: String(body.source || '').trim() || undefined,
      linkedin: String(body.linkedin || '').trim() || undefined,
      attribution: String(body.attribution || '').trim() || undefined,
      utm_source: String(body.utm_source || '').trim() || undefined,
      utm_medium: String(body.utm_medium || '').trim() || undefined,
      utm_campaign: String(body.utm_campaign || '').trim() || undefined,
      landing: String(body.landing || '').trim() || undefined,
    };

    // 1) DURABLE LOG FIRST — the never-lose-a-lead guarantee. If everything after
    //    this throws, the raw submit still exists in KV (when configured).
    await kvPush('leads:log', { ...lead, ip, ts: new Date().toISOString() });

    // 2) Notion is the system of record. On failure, dead-letter for replay.
    let notionUrl: string | null = null;
    let notionError: string | null = null;
    try {
      notionUrl = await writeToNotion(lead);
    } catch (e) {
      notionError = e instanceof Error ? e.message : String(e);
      await kvPush('leads:deadletter', { lead, stage: 'notion', err: notionError });
    }

    // 3) Alerts + lead ack are best-effort and never block the response.
    await Promise.allSettled([
      alertSlack(lead, notionUrl),
      alertEmail(lead, notionUrl),
      ackLead(lead),
    ]);

    // Only report failure if NOTHING captured the lead: Notion failed, no alert
    // channel is configured, AND the KV backstop is off. Otherwise it's a lead.
    const kvOn = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
    if (notionError && !SLACK_WEBHOOK_URL && !RESEND_API_KEY && !kvOn) {
      const payload: Record<string, unknown> = { ok: false, error: 'Could not record submission.' };
      if (process.env.LEAD_DEBUG === '1') payload.debug = notionError;
      return NextResponse.json(payload, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'Unexpected error.' },
      { status: 500 },
    );
  }
}
