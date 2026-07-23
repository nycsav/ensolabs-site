import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { ShareButtons } from '@/components/ShareButtons';
import { PostEventUpdate } from '@/components/PostEventUpdate';
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
} from '@/lib/schema';
import { INSIGHTS, getInsight } from '@/lib/insights';
import { SITE } from '@/lib/site';

// ISR: self-heal edge-cached HTML within ~5 min of a content change (matches home).
export const revalidate = 300;

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
  // SEO snippet: Google truncates near 155-160 chars, so prefer the tight
  // metaDescription when present. OG/Twitter below keep the full dek — those
  // surfaces render long copy fine and it reads better in-feed.
  return {
    title: post.title,
    description: post.metaDescription || post.dek,
    keywords: post.tags,
    alternates: { canonical: `${SITE.origin}/insights/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.dek,
      url: `${SITE.origin}/insights/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      authors: ['https://linkedin.com/in/savbanerjee'],
      tags: post.tags,
      images: [{ url: `${SITE.origin}/og/og-${post.slug}.png`, width: 1200, height: 630, alt: `${post.title} — Enso Labs Insights` }],
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

// Inline markdown — supports **bold**, [links](url), and **text with [links](url) inside**.
const parseInlineLinks = (text: string, keyPrefix: string = ''): React.ReactNode[] => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return <a key={`${keyPrefix}${i}`} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">{linkMatch[1]}</a>;
    }
    return <span key={`${keyPrefix}${i}`}>{part}</span>;
  });
};

const renderInline = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  const nodes: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      nodes.push(<strong key={`b${i}`}>{parseInlineLinks(inner, `b${i}-`)}</strong>);
    } else {
      nodes.push(...parseInlineLinks(part, `${i}-`));
    }
  });
  return nodes;
};

// Tint per editorial lens (brand-lock §6; "Build" reads slate per the publish brief).
const LENS_TINT: Record<string, string> = {
  Build: 'var(--sts-slate)',
  Brand: 'var(--sts-amber)',
  Financial: 'var(--sts-slate)',
  Client: 'var(--sts-ink)',
};

// Render a body block — headings, images, editorial components, or paragraphs.
const renderBlock = (block: string, i: number) => {
  if (block.startsWith('## ')) {
    return <h2 key={i}>{block.slice(3)}</h2>;
  }
  // Pull-quote — a line beginning with "> " (coral left-rule, serif).
  if (block.startsWith('> ')) {
    return (
      <blockquote key={i} className="pull-quote">
        {renderInline(block.slice(2))}
      </blockquote>
    );
  }
  // "WHAT TO DO" checklist item — a line beginning with "- [ ] ".
  if (block.startsWith('- [ ] ')) {
    return (
      <div key={i} className="todo-item">
        <span className="todo-check" aria-hidden="true">✓</span>
        <div className="todo-text">{renderInline(block.slice(6))}</div>
      </div>
    );
  }
  // Stat callout — "::stat" then one "figure | label" pair per line.
  if (block.startsWith('::stat')) {
    const items = block
      .split('\n')
      .slice(1)
      .map((line) => line.split('|').map((c) => c.trim()))
      .filter((cells) => cells.length >= 2);
    return (
      <div key={i} className="stat-callout">
        {items.map(([figure, label], j) => (
          <div key={j} className="stat-item">
            <div className="stat-figure">{figure}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    );
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
  // Markdown pipe table: a multi-line block whose first line starts with '|'.
  if (block.startsWith('|') && block.includes('\n')) {
    const isSep = (r: string) => /^\|[\s:|-]+\|$/.test(r);
    const toCells = (r: string) =>
      r.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
    const rows = block.split('\n').map((r) => r.trim()).filter(Boolean).filter((r) => !isSep(r));
    if (rows.length > 1) {
      const [header, ...bodyRows] = rows;
      return (
        <div key={i} className="article-table-wrap">
          <table className="article-table">
            <thead>
              <tr>{toCells(header).map((c, j) => <th key={j}>{renderInline(c)}</th>)}</tr>
            </thead>
            <tbody>
              {bodyRows.map((r, ri) => (
                <tr key={ri}>{toCells(r).map((c, ci) => <td key={ci}>{renderInline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
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
          ...(post.faqs && post.faqs.length > 0 ? [faqSchema(post.faqs)] : []),
        ]}
      />

      <article className="article-shell">
        <Link href="/insights" className="back">← All insights</Link>

        {post.lens && (
          <div className="lens-chip">
            <span className="lens-dot" style={{ background: LENS_TINT[post.lens] }} aria-hidden="true" />
            The {post.lens} Lens
          </div>
        )}

        <div className="meta">
          <span className="pillar">{post.pillar}</span>
          <span>{formatDate(post.date)}</span>
          <span>{post.readingMinutes} min read</span>
          <span>by Sav Banerjee</span>
        </div>

        <h1>{post.title}</h1>
        <p className="dek">{post.dek}</p>

        {post.tags.length > 0 && (
          <div className="article-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="article-tag">{tag}</span>
            ))}
          </div>
        )}

        {post.postEventUpdate && (
          <PostEventUpdate
            label={post.postEventUpdate.label}
            body={post.postEventUpdate.body}
            ctaLabel={post.postEventUpdate.ctaLabel}
            ctaHref={post.postEventUpdate.ctaHref}
            slug={post.slug}
          />
        )}

        <div className="body">
          {post.body.map((block, i) => renderBlock(block, i))}
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {post.faqs.map((faq) => (
                <details key={faq.question} className="faq-item">
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

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
