import { SITE } from '@/lib/site';
import { INSIGHTS } from '@/lib/insights';

export const dynamic = 'force-static';

const escape = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export function GET() {
  const items = INSIGHTS.map((p) => {
    const link = `${SITE.origin}/insights/${p.slug}`;
    return `
    <item>
      <title>${escape(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${escape(p.pillar)}</category>
      <author>${SITE.founder.email} (${escape(SITE.founder.name)})</author>
      <description>${escape(p.dek)}</description>
      <content:encoded><![CDATA[${p.body.map((para) => `<p>${para}</p>`).join('\n')}]]></content:encoded>
    </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(SITE.name)} — Insights</title>
    <link>${SITE.origin}/insights</link>
    <atom:link href="${SITE.origin}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escape(SITE.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js — ensolabs.ai</generator>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
