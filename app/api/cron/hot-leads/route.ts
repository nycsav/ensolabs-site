import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Enso Labs — hot-lead notifier.
//
// The daily enrichment cron fills in "Lead Score" on Enso Inbound Leads rows.
// This endpoint finds rows with Lead Score >= HOT_LEAD_THRESHOLD that haven't
// been flagged yet, sends a 🔥 email (Resend) + optional Slack ping, and ticks
// a "Hot Notified" checkbox so a lead is never double-pinged.
//
// Triggering (either):
//   - Vercel cron (vercel.json) — sends `Authorization: Bearer ${CRON_SECRET}`
//     automatically once CRON_SECRET is set in the project env.
//   - Manual / external:  GET /api/cron/hot-leads?key=<LEADS_READ_KEY>
//
// The "Hot Notified" checkbox property is auto-created on the database on
// first run if it doesn't exist yet — no manual Notion setup needed.
//
// Env:
//   NOTION_TOKEN, NOTION_LEADS_DB_ID   (already set — same as /api/leads)
//   RESEND_API_KEY                     email channel (skipped if unset)
//   SLACK_WEBHOOK_URL                  Slack channel (skipped if unset)
//   LEAD_ALERT_TO / LEAD_ALERT_FROM    same defaults as /api/leads
//   CRON_SECRET                        auth for Vercel cron invocations
//   LEADS_READ_KEY                     auth for manual invocations
//   HOT_LEAD_THRESHOLD                 default 8
// ---------------------------------------------------------------------------

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_ID = process.env.NOTION_LEADS_DB_ID;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
const ALERT_TO = process.env.LEAD_ALERT_TO || 'sav@ensopartners.co';
const ALERT_FROM = process.env.LEAD_ALERT_FROM || 'Enso Leads <leads@ensolabs.ai>';
const THRESHOLD = Number(process.env.HOT_LEAD_THRESHOLD || 8);

const NOTIFIED_PROP = 'Hot Notified';

type NotionPage = { id: string; url: string; properties: Record<string, any> };

function plain(prop: any): string {
  if (!prop) return '';
  if (prop.type === 'title') return (prop.title || []).map((t: any) => t.plain_text).join('');
  if (prop.type === 'rich_text') return (prop.rich_text || []).map((t: any) => t.plain_text).join('');
  if (prop.type === 'email') return prop.email || '';
  if (prop.type === 'select') return prop.select?.name || '';
  if (prop.type === 'status') return prop.status?.name || '';
  if (prop.type === 'number') return prop.number != null ? String(prop.number) : '';
  return '';
}

function notionHeaders(version: string) {
  return {
    Authorization: `Bearer ${NOTION_TOKEN}`,
    'Notion-Version': version,
    'Content-Type': 'application/json',
  };
}

// Query hot, un-notified rows. Tries the classic database endpoint first, then
// the data-source endpoint — same dual-shape pattern as /api/leads/new.
async function queryHot(): Promise<Response> {
  const filter = {
    and: [
      { property: 'Lead Score', number: { greater_than_or_equal_to: THRESHOLD } },
      { property: NOTIFIED_PROP, checkbox: { equals: false } },
    ],
  };
  let res = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`, {
    method: 'POST',
    headers: notionHeaders('2022-06-28'),
    body: JSON.stringify({ filter, page_size: 20 }),
  });
  if (!res.ok && (res.status === 400 || res.status === 404)) {
    const retry = await fetch(`https://api.notion.com/v1/data_sources/${NOTION_DB_ID}/query`, {
      method: 'POST',
      headers: notionHeaders('2025-09-03'),
      body: JSON.stringify({ filter, page_size: 20 }),
    });
    if (retry.ok || retry.status !== 404) res = retry;
  }
  return res;
}

// First-run bootstrap: add the "Hot Notified" checkbox column to the database.
async function ensureNotifiedProp(): Promise<boolean> {
  const res = await fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}`, {
    method: 'PATCH',
    headers: notionHeaders('2022-06-28'),
    body: JSON.stringify({ properties: { [NOTIFIED_PROP]: { checkbox: {} } } }),
  });
  return res.ok;
}

async function markNotified(pageId: string): Promise<void> {
  await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: notionHeaders('2022-06-28'),
    body: JSON.stringify({ properties: { [NOTIFIED_PROP]: { checkbox: true } } }),
  }).catch(() => {});
}

type Hot = {
  pageId: string;
  url: string;
  name: string;
  email: string;
  score: string;
  intent: string;
  source: string;
  message: string;
};

async function sendEmail(h: Hot): Promise<boolean> {
  if (!RESEND_API_KEY) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: ALERT_FROM,
      to: [ALERT_TO],
      reply_to: h.email || undefined,
      subject: `🔥 HOT LEAD (score ${h.score}): ${h.name || h.email}`,
      text:
        `${h.name || '(no name)'} <${h.email}>\n` +
        `Score: ${h.score}  ·  Intent: ${h.intent || '—'}  ·  Source: ${h.source || '—'}\n\n` +
        `${h.message.slice(0, 800)}\n\n` +
        `Reply within the hour — hot leads cool fast.\n` +
        `Notion: ${h.url}`,
    }),
  }).catch(() => null);
  return Boolean(res && res.ok);
}

async function sendSlack(h: Hot): Promise<boolean> {
  if (!SLACK_WEBHOOK_URL) return false;
  const res = await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `:fire: *HOT LEAD (score ${h.score})* — ${h.name || h.email} <${h.email}>\n${h.message.slice(0, 300)}\n<${h.url}|Open in Notion>`,
    }),
  }).catch(() => null);
  return Boolean(res && res.ok);
}

export async function GET(req: Request) {
  // Auth: Vercel cron (Bearer CRON_SECRET) or manual (?key=LEADS_READ_KEY).
  const auth = req.headers.get('authorization') || '';
  const key = new URL(req.url).searchParams.get('key');
  const cronOk = Boolean(process.env.CRON_SECRET) && auth === `Bearer ${process.env.CRON_SECRET}`;
  const keyOk = Boolean(process.env.LEADS_READ_KEY) && key === process.env.LEADS_READ_KEY;
  if (!cronOk && !keyOk) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }
  if (!NOTION_TOKEN || !NOTION_DB_ID) {
    return NextResponse.json({ ok: false, error: 'Notion not configured.' }, { status: 500 });
  }
  if (!RESEND_API_KEY && !SLACK_WEBHOOK_URL) {
    // No channel to notify on — do nothing rather than mark rows as handled.
    return NextResponse.json({ ok: true, checked: 0, notified: 0, skipped: 'no notify channel configured' });
  }

  let res = await queryHot();
  if (res.status === 400) {
    // Most likely the "Hot Notified" property doesn't exist yet — create it and retry.
    const created = await ensureNotifiedProp();
    if (created) res = await queryHot();
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    return NextResponse.json(
      { ok: false, error: `Notion query failed (${res.status})`, detail: detail.slice(0, 300) },
      { status: 502 },
    );
  }

  const data = (await res.json()) as { results: NotionPage[] };
  const hots: Hot[] = (data.results || []).map((p) => ({
    pageId: p.id,
    url: p.url,
    name: plain(p.properties['Name']),
    email: plain(p.properties['Email']),
    score: plain(p.properties['Lead Score']),
    intent: plain(p.properties['Intent']),
    source: plain(p.properties['Source']),
    message: plain(p.properties['Message']),
  }));

  let notified = 0;
  for (const h of hots) {
    const [emailOk, slackOk] = await Promise.all([sendEmail(h), sendSlack(h)]);
    // Only tick the checkbox if at least one channel actually delivered —
    // otherwise the lead stays queued for the next run.
    if (emailOk || slackOk) {
      await markNotified(h.pageId);
      notified++;
    }
  }

  return NextResponse.json({ ok: true, threshold: THRESHOLD, checked: hots.length, notified });
}
