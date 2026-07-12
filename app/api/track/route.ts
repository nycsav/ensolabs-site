import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Enso Labs — first-party event collector.
//
// The browser sends behavior events here (form_start, scroll_depth, cta_click,
// engaged_read). We forward them to GA4 via the Measurement Protocol from the
// SERVER. Two reasons this matters:
//   1. Ad-blockers and privacy extensions kill the client-side gtag.js beacon.
//      A same-origin POST to /api/track is not blocked, so we keep the signal.
//   2. The data lands in our own GA4 property — first-party, owned by us.
//
// Required env (set in Vercel):
//   NEXT_PUBLIC_GA_ID   GA4 measurement ID (G-XXXXXXX) — already set
//   GA4_API_SECRET      Measurement Protocol API secret (GA4 Admin → Data
//                       Streams → Measurement Protocol API secrets)
//
// If GA4_API_SECRET is missing the endpoint still returns 200 (fail-soft) so
// the client never errors; the event is simply not forwarded.
// ---------------------------------------------------------------------------

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-5N15QMQ962';
const GA_SECRET = process.env.GA4_API_SECRET;

// Only these event names are accepted, so the endpoint can't be abused to
// stuff arbitrary data into the analytics property.
const ALLOWED = new Set([
  'form_start',
  'form_submit',
  'generate_lead',
  'scroll_depth',
  'cta_click',
  'engaged_read',
  'outbound_click',
  'booking_intent',
]);

type Incoming = {
  client_id?: string; // GA client id from the _ga cookie, when available
  name?: string;
  params?: Record<string, unknown>;
};

// Pull the GA client id out of the _ga cookie (format: GA1.1.XXXX.YYYY).
function clientIdFromCookie(cookie: string | null): string | null {
  if (!cookie) return null;
  const m = cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
  return m ? m[1] : null;
}

export async function POST(req: Request) {
  let body: Incoming = {};
  try {
    body = (await req.json()) as Incoming;
  } catch {
    return NextResponse.json({ ok: true }); // ignore malformed beacons
  }

  const name = String(body.name || '');
  if (!ALLOWED.has(name)) {
    return NextResponse.json({ ok: true }); // silently drop unknown events
  }

  // No secret configured → accept but don't forward (fail-soft).
  if (!GA_SECRET) {
    return NextResponse.json({ ok: true, forwarded: false });
  }

  const clientId =
    body.client_id ||
    clientIdFromCookie(req.headers.get('cookie')) ||
    `${Date.now()}.${Math.floor(Math.random() * 1e9)}`;

  // GA4 reserves some param names; keep ours simple and string/number only.
  const safeParams: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(body.params || {})) {
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      safeParams[k] = v;
    }
  }
  safeParams.engagement_time_msec = 1;

  const payload = {
    client_id: clientId,
    events: [{ name, params: safeParams }],
  };

  try {
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_ID}&api_secret=${GA_SECRET}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );
  } catch {
    // Never fail the beacon.
  }

  return NextResponse.json({ ok: true, forwarded: true });
}
