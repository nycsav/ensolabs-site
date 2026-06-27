import { renderOg, OG_SIZE } from '@/components/OgFrame';
import { INSIGHTS, getInsight } from '@/lib/insights';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Enso Labs Insights';

// Prerender one OG card per article at BUILD time (not on-demand). next/og's
// runtime file reads (fonts + assets via `new URL(..., import.meta.url)`) are
// unreliable inside Vercel's *dynamic* functions — the dynamic version 500'd in
// production. Baking the PNG at build, when every file is on disk, is what the
// working `/insights/opengraph-image` card already does. dynamicParams=false ⇒
// only known slugs, matching the article page.
export const dynamicParams = false;
export function generateStaticParams() {
  return INSIGHTS.map((p) => ({ slug: p.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const post = getInsight(params.slug);
  if (!post) {
    return renderOg({
      eyebrow: 'Insights',
      title: 'Notes from shipping production AI.',
      strap: 'ensolabs.ai/insights',
      theme: 'publication',
    });
  }
  return renderOg({
    eyebrow: post.lens ? `The ${post.lens} Lens` : `Insights · ${post.pillar}`,
    title: post.title,
    subtitle: post.dek.length > 110 ? `${post.dek.slice(0, 107)}…` : post.dek,
    strap: `ensolabs.ai · ${post.readingMinutes} min read`,
    theme: 'publication',
    sourceCredit: post.sourceCredit,
  });
}
