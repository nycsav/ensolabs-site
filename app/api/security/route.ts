import { SITE } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * /.well-known/security.txt — RFC 9116. Routed through /api/security and
 * exposed via a rewrite in next.config.mjs (Next App Router skips folders
 * starting with a dot).
 *
 * Expires must be a future ISO-8601 date and should be refreshed annually.
 */
export function GET() {
  const expires = new Date(Date.UTC(new Date().getUTCFullYear() + 1, 0, 1)).toISOString();
  const body = [
    `Contact: mailto:${SITE.founder.email}`,
    `Expires: ${expires}`,
    `Preferred-Languages: en`,
    `Canonical: ${SITE.origin}/.well-known/security.txt`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
