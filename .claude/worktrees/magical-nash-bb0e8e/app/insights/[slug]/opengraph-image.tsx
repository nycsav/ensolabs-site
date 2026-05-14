import { renderOg, OG_SIZE } from '@/components/OgFrame';
import { getInsight } from '@/lib/insights';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Enso Labs Insights';

export default function Image({ params }: { params: { slug: string } }) {
  const post = getInsight(params.slug);
  if (!post) {
    return renderOg({
      eyebrow: 'Insights',
      title: 'Notes from shipping production AI.',
      strap: 'ensolabs.ai/insights',
    });
  }
  return renderOg({
    eyebrow: `Insights · ${post.pillar}`,
    title: post.title,
    subtitle: post.dek.length > 110 ? `${post.dek.slice(0, 107)}…` : post.dek,
    strap: `ensolabs.ai · ${post.readingMinutes} min read`,
  });
}
