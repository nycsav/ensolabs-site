import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { ShareButtons } from '@/components/ShareButtons';
import {
  articleSchema,
  breadcrumbSchema,
  webPageSchema,
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
      publishedTime: post.date,
      authors: ['Sav Banerjee'],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

// Simple inline markdown — only supports **bold**.
const renderParagraph = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

export default function InsightArticle({ params }: { params: Params }) {
  const post = getInsight(params.slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        schemas={[
          webPageSchema(post),
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
          {post.body.map((para, i) => (
            <p key={i}>{renderParagraph(para)}</p>
          ))}
        </div>

        <p
          className="reviewed-by"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 12,
            color: 'var(--fg-3)',
            margin: '32px 0 24px',
            paddingTop: 16,
            borderTop: '1px solid var(--line)',
          }}
        >
          Written and reviewed by <Link href="/about" style={{ color: 'var(--fg-2)', textDecoration: 'underline' }}>Sav Banerjee</Link>
          , Founder &amp; Principal, Enso Labs · Last reviewed {formatDate(post.date)}
        </p>

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
