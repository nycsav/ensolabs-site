import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Enso Labs — read endpoint for the enrichment automation.
// Returns leads that still need scoring (Status = "Not started" AND no Lead
// Score). Uses the Notion REST query API, which works on any Notion plan —
// this is the workaround for the MCP query tools being gated behind Notion AI.
//
// Protected by a shared secret. Call with:
//   GET /api/leads/new?key=<LEADS_READ_KEY>
//
// Required env:
//   NOTION_TOKEN, NOTION_LEADS_DB_ID  (already set for /api/lead)
//   LEADS_READ_KEY                    shared secret for this endpoint
// ---------------------------------------------------------------------------

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DB_ID = process.env.NOTION_LEADS_DB_ID;
const READ_KEY = process.env.LEADS_READ_KEY;

type NotionPage = {
  id: string;
  url: string;
  properties: Record<string, any>;
};

function plain(prop: any): string {
  if (!prop) return '';
  if (prop.type === 'title') return (prop.title || []).map((t: any) => t.plain_text).join('');
  if (prop.type === 'rich_text') return (prop.rich_text || []).map((t: any) => t.plain_text).join('');
  if (prop.type === 'email') return prop.email || '';
  if (prop.type === 'url') return prop.url || '';
  if (prop.type === 'select') return prop.select?.name || '';
  if (prop.type === 'status') return prop.status?.name || '';
  if (prop.type === 'number') return prop.number != null ? String(prop.number) : '';
  return '';
}

async function queryNotion(parent: 'database' | 'datasource'): Promise<Response> {
  const filter = {
    and: [
      { property: 'Status', status: { equals: 'Not started' } },
      { property: 'Lead Score', number: { is_empty: true } },
    ],
  };
  if (parent === 'database') {
    return fetch(`https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filter, page_size: 50 }),
    });
  }
  return fetch(`https://api.notion.com/v1/data_sources/${NOTION_DB_ID}/query`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2025-09-03',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filter, page_size: 50 }),
  });
}

export async function GET(req: Request) {
  if (!NOTION_TOKEN || !NOTION_DB_ID) {
    return NextResponse.json({ ok: false, error: 'Notion not configured.' }, { status: 500 });
  }
  const url = new URL(req.url);
  const key = url.searchParams.get('key');
  if (!READ_KEY || key !== READ_KEY) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  let res = await queryNotion('database');
  if (!res.ok && (res.status === 400 || res.status === 404)) {
    const retry = await queryNotion('datasource');
    if (retry.ok) res = retry;
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    return NextResponse.json(
      { ok: false, error: `Notion query failed (${res.status})`, detail: detail.slice(0, 300) },
      { status: 502 },
    );
  }

  const data = (await res.json()) as { results: NotionPage[] };
  const leads = (data.results || []).map((p) => ({
    page_id: p.id,
    url: p.url,
    name: plain(p.properties['Name']),
    email: plain(p.properties['Email']),
    company: plain(p.properties['Company']),
    intent: plain(p.properties['Intent']),
    source: plain(p.properties['Source']),
    message: plain(p.properties['Message']),
    linkedin: plain(p.properties['LinkedIn / URL']),
  }));

  return NextResponse.json({ ok: true, count: leads.length, leads });
}
