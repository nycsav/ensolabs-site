import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Enso Labs — native inbound lead endpoint
// Receives contact-form submissions, writes them to the Notion "Enso Inbound
// Leads" database, and fires Slack + email alerts. All integrations are
// optional and fail soft: a missing env var just skips that channel so a
// form submission is never lost.
//
// Required env (set in Vercel project settings):
//   NOTION_TOKEN              Notion internal integration secret (ntn_...)
//   NOTION_LEADS_DB_ID        Data source / database ID for Enso Inbound Leads
// Optional env:
//   SLACK_WEBHOOK_URL         Incoming webhook for #leads alerts
//   RESEND_API_KEY            Resend API key for email alerts
//   LEAD_ALERT_TO             Email recipient (default sav@ensopartners.co)
//   LEAD_ALERT_FROM           Verified Resend sender (default leads@ensolabs.ai)
// ---------------------------------------------------------------------------

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_ID = process.env.NOTION_LEADS_DB_ID;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ALERT_TO = process.env.LEAD_ALERT_TO || 'sav@ensopartners.co';
const ALERT_FROM = process.env.LEAD_ALERT_FROM || 'Enso Leads <leads@ensolabs.ai>';

// Maps the form's <select> service values to Notion "Intent" options.
const INTENT_MAP: Record<string, string> = {
  consult: 'Consulting',
  build: 'Build',
  ship: 'Ship',
  workshop: 'Workshop',
  contract: 'Contract Role',
  other: 'Other',
};

type LeadInput = {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  source?: string;
  linkedin?: string;
  // honeypot — bots fill this, humans never see it
  website?: string;
};

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function clip(v: string, max = 1800): string {
  return v.length > max ? v.slice(0, max - 1) + '…' : v;
}

async function parseBody(req: Request): Promise<Partial<LeadInput>> {
  const ct = req.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return (await req.json().catch(() => ({}))) as Partial<LeadInput>;
  }
  // FormData / urlencoded fallback
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
  const source = lead.source && /linkedin/i.test(lead.source) ? 'LinkedIn' : 'Website';

  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: clip(lead.name, 200) } }] },
    Email: { email: lead.email },
    Intent: { select: { name: intent } },
    Source: { select: { name: source } },
    Status: { status: { name: 'Not started' } },
    Message: { rich_text: [{ text: { content: clip(lead.message) } }] },
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

  // Try the classic shape first (parent.database_id on 2022-06-28). If the ID
  // is actually a data-source/collection ID, retry against the newer API which
  // accepts parent.data_source_id.
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
    `*New inbound lead* — ${lead.name}`,
    `*Email:* ${lead.email}`,
    lead.company ? `*Company:* ${lead.company}` : '',
    `*Intent:* ${intent}`,
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
    <h2 style="margin:0 0 12px">New inbound lead — ${escapeHtml(lead.name)}</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6">
      <tr><td style="padding-right:12px"><b>Email</b></td><td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
      ${lead.company ? `<tr><td><b>Company</b></td><td>${escapeHtml(lead.company)}</td></tr>` : ''}
      <tr><td><b>Intent</b></td><td>${escapeHtml(intent)}</td></tr>
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
      subject: `New lead: ${lead.name}${lead.company ? ` (${lead.company})` : ''} — ${intent}`,
      html,
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

    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'Name, email, and message are required.' },
        { status: 400 },
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const lead: LeadInput = {
      name,
      email,
      company: String(body.company || '').trim() || undefined,
      service: String(body.service || '').trim() || undefined,
      message,
      source: String(body.source || '').trim() || undefined,
      linkedin: String(body.linkedin || '').trim() || undefined,
    };

    // Notion is the system of record — if it fails, surface the error so the
    // submission can be retried / emailed manually.
    let notionUrl: string | null = null;
    let notionError: string | null = null;
    try {
      notionUrl = await writeToNotion(lead);
    } catch (e) {
      notionError = e instanceof Error ? e.message : String(e);
    }

    // Alerts are best-effort and never block the response.
    await Promise.allSettled([alertSlack(lead, notionUrl), alertEmail(lead, notionUrl)]);

    if (notionError && !SLACK_WEBHOOK_URL && !RESEND_API_KEY) {
      // Nothing captured the lead at all — report failure.
      // `debug` is only surfaced when LEAD_DEBUG=1 (set during QA, then unset).
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
