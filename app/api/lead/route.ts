// Back-compat shim. The canonical route is now /api/leads (the contact form and
// the design mock both post there). This re-exports the same handler so any old
// client, bookmark, or cached page that still posts to /api/lead keeps working.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export { POST } from '../leads/route';
