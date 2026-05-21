import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { ShareButtons } from '@/components/ShareButtons';
import {
  articleSchema,
  breadcrumbSchema,
} from '@/lib/schema';
import { INSIGHTS, getInsight } from '@/lib/insights';

export const dynamicParams = false;

export async function generateStaticParams() {
  return INSIGHTS.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const post = getInsight(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.dek,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.dek,
      url: `/insights/${post.slug}`,
      publishedTime: post.date,
      authors: ['Sav Banerjee'],
      images: [{ url: `https://ensolabs.ai/og/og-${post.slug}.png`, width: 1200, height: 630, alt: `${post.title} — Enso Labs Insights` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.dek,
      images: [`https://ensolabs.ai/og/og-${post.slug}.png`],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

// Simple inline markdown — supports **bold**, [links](url), and **[bold links](url)**.
const renderInline = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      // Check if the bold content contains a link
      const innerLink = inner.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (innerLink) {
        return <strong key={i}><a href={innerLink[2]} target="_blank" rel="noopener noreferrer">{innerLink[1]}</a></strong>;
      }
      return <strong key={i}>{inner}</strong>;
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>;
    }
    return <span key={i}>{part}</span>;
  });
};

// Render a body block — headings, images, or paragraphs.
const renderBlock = (block: string, i: number) => {
  if (block.startsWith('## ')) {
    return <h2 key={i}>{block.slice(3)}</h2>;
  }
  const imgMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
  if (imgMatch) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <figure key={i} className="article-figure">
        <img src={imgMatch[2]} alt={imgMatch[1]} />
        {imgMatch[1] && <figcaption>{imgMatch[1]}</figcaption>}
      </figure>
    );
  }
  return <p key={i}>{renderInline(block)}</p>;
};

export default function InsightArticle({ params }: { params: Params }) {
  const post = getInsight(params.slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        schemas={[
          articleSchema(post),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Insights', href: '/insights' },
            { name: post.title, href: `/insights/${post.slug}` },
          ]),
        ]}
      />

      <article className="article-shell">
        <Link href="/insights" className="back">← All insights</Link>

        <div className="meta">
          <span className="pillar">{post.pillar}</span>
          <span>{formatDate(post.date)}</span>
          <span>{post.readingMinutes} min read</span>
          <span>by Sav Banerjee</span>
        </div>

        <h1>{post.title}</h1>
        <p className="dek">{post.dek}</p>

        <div className="body">
          {post.body.map((block, i) => renderBlock(block, i))}
        </div>

        <ShareButtons path={`/insights/${post.slug}`} title={`${post.title} — Enso Labs Insights`} />

        <hr style={{ margin: '48px 0', border: 'none', borderTop: '1px solid var(--line)' }} />

        <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--fg-3)', marginBottom: 16 }}>
          Want to scope an engagement around this?
        </p>
        <div className="hero-cta-row">
          <Link className="btn btn-primary" href="/contact">
            Send a brief
          </Link>
          <Link className="btn" href="/insights">More insights</Link>
        </div>
      </article>
    </>
  );
}
