import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { blogSchema, breadcrumbSchema } from '@/lib/schema';
import { INSIGHTS } from '@/lib/insights';

export const metadata: Metadata = {
  title: 'AI Transformation Insights | Essays from Production Engagements',
  description:
    'Technical and strategic essays from Sav Banerjee on AI transformation, agentic systems, and financial AI — pulled from production engagements at Fortune 500 manufacturers, pharma agencies, and the Enso Trading Terminal.',
  alternates: { canonical: 'https://ensolabs.ai/insights' },
  openGraph: {
    title: 'Insights — Enso Labs | Notes from Shipping Production AI',
    description:
      'Essays from inside live engagements — what survives production, what fails, and the Strategy-to-Ship Framework.',
    url: 'https://ensolabs.ai/insights',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Enso Labs Insights — Notes from Shipping Production AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights — Enso Labs | Notes from Shipping Production AI',
    description:
      'Essays from inside live engagements — what survives production, what fails, and the Strategy-to-Ship Framework.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export default function InsightsIndex() {
  const [featured, ...rest] = INSIGHTS;

  return (
    <>
      <JsonLd
        schemas={[
          blogSchema(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Insights', href: '/insights' },
          ]),
        ]}
      />

      <section className="insights-hero">
        <div className="shell">
          <div style={{ marginBottom: 28 }}>
            <span className="eyebrow"><span className="num">PAGE / 05</span>&nbsp;Insights</span>
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
            Notes from <em>shipping</em><br />
            <span className="accent">production AI.</span>
          </h1>
          <p className="lede" style={{ marginTop: 32, maxWidth: '64ch' }}>
            <strong>Enso Labs Insights</strong> is the studio&rsquo;s editorial archive — essays from inside live engagements about what survives contact with production, what fails on the way there, and the operating principles behind the Strategy-to-Ship Framework.
          </p>

          <div className="insights-filter" aria-label="Filter by pillar">
            <span className="pill is-active">All</span>
            <span className="pill">Consult</span>
            <span className="pill">Build</span>
            <span className="pill">Ship</span>
            <span style={{ marginLeft: 'auto', alignSelf: 'center', color: 'var(--fg-3)' }}>
              <Link href="/feed.xml" style={{ color: 'inherit' }}>RSS →</Link>
            </span>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0, paddingBottom: 'clamp(80px, 10vw, 140px)', borderTop: 'none' }}>
        <div className="shell">
          <section className="s2n-embed" style={{ marginBottom: '64px', padding: '32px', border: '1px solid var(--line)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--display)', fontSize: '24px', fontWeight: 500, marginBottom: '4px' }}>Live Intelligence</h2>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Powered by Enso Labs · Updated daily</p>
              </div>
              <Link href="/feed.xml" style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--teal)', textDecoration: 'none' }}>Subscribe via RSS →</Link>
            </div>
            <div className="s2n-grid">
              {[
                { kind: 'AI SIGNAL', date: 'MAY 23', source: 'Anthropic', headline: 'Claude 4 Opus ships with extended thinking and 200K context — enterprise teams report 40% reduction in multi-step agent failures versus prior generation.' },
                { kind: 'COMPETITIVE SIGNAL', date: 'MAY 22', source: 'Gartner', headline: 'Enterprise AI buying committees are consolidating around three vendors per portfolio — non-finalists lose 70% of pipeline within 90 days of decision.' },
                { kind: 'MARKET SIGNAL', date: 'MAY 21', source: 'BCG', headline: 'Agentic workflows are replacing RPA in 41% of Fortune 500 ops budgets — first measurable line-item shift since 2019, with healthcare and finance leading adoption.' },
                { kind: 'MEDIA SIGNAL', date: 'MAY 20', source: 'The Trade Desk', headline: 'AI-search referral traffic now exceeds organic Google for 12% of B2B sites tracked. AEO-optimized brands see 3.4× lift in AI assistant citations.' },
              ].map((s) => (
                <div key={s.headline} className="s2n-card">
                  <div className="s2n-meta">
                    <span className="kind">{s.kind}</span>
                    <span>{s.date}</span>
                    <span>{s.source}</span>
                  </div>
                  <p className="s2n-headline">{s.headline}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Link href="/feed.xml" style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--fg-3)', textDecoration: 'none' }}>
                Subscribe to the daily feed →
              </Link>
            </div>
          </section>

          <div className="insights-grid">
            <Link href={`/insights/${featured.slug}`} className="insight-card featured">
              <div>
                <img
                  src={`/og/og-${featured.slug}.png`}
                  alt={featured.title}
                  className="insight-card-og"
                  loading="eager"
                />
                <div className="meta" style={{ marginTop: 20 }}>
                  <span className="pillar">{featured.pillar}</span>
                  <span>{formatDate(featured.date)}</span>
                  <span>{featured.readingMinutes} min read</span>
                </div>
                <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-3)' }}>FEATURED · 01</div>
              </div>
              <div>
                <div className="ti">{featured.title}</div>
                <p className="dek" style={{ marginTop: 16 }}>{featured.dek}</p>
                {featured.tags.length > 0 && (
                  <div className="insight-tags" style={{ marginTop: 12 }}>
                    {featured.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="article-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="foot" style={{ marginTop: 28 }}>
                  <span>SAV BANERJEE</span>
                  <span className="read">Read essay →</span>
                </div>
              </div>
            </Link>

            {rest.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="insight-card">
                <img
                  src={`/og/og-${post.slug}.png`}
                  alt={post.title}
                  className="insight-card-og"
                  loading="lazy"
                />
                <div className="meta">
                  <span className="pillar">{post.pillar}</span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="ti">{post.title}</div>
                <p className="dek">{post.dek}</p>
                {post.tags.length > 0 && (
                  <div className="insight-tags">
                    {post.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="article-tag">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="foot">
                  <span>{post.readingMinutes} min read</span>
                  <span className="read">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="shell">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
              Want these <em>in your</em> <span className="accent">inbox?</span>
            </h2>
            <div style={{ display: 'grid', gap: 16 }}>
              <p className="lede">
                One essay every two weeks. No newsletter blast, no growth-hacked subject lines — just notes from the work.
              </p>
              <div className="hero-cta-row">
                <a className="btn btn-primary" href="mailto:sav@ensopartners.co?subject=Subscribe%20to%20Insights">
                  Subscribe via email
                </a>
                <Link className="btn" href="/feed.xml">RSS feed</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
