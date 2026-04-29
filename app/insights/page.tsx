import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { blogSchema, breadcrumbSchema } from '@/lib/schema';
import { INSIGHTS } from '@/lib/insights';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Technical and strategic essays from Sav Banerjee on AI transformation, agentic systems, and financial AI — pulled from production engagements at Gore, Heller, and the Enso Trading Terminal.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Insights — Enso Labs | Notes from Shipping Production AI',
    description:
      'Essays from inside live engagements — what survives production, what fails, and the Strategy-to-Ship Framework.',
    url: '/insights',
  },
  twitter: {
    title: 'Insights — Enso Labs | Notes from Shipping Production AI',
    description:
      'Essays from inside live engagements — what survives production, what fails, and the Strategy-to-Ship Framework.',
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
            Essays from inside live engagements — what survives contact with production, what fails on the way there, and the operating principles behind the Strategy-to-Ship Framework.
          </p>

          <a
            href="https://signals.ensolabs.ai"
            target="_blank"
            rel="noopener"
            className="s2n-banner"
            aria-label="Visit signal2noise"
          >
            <div>
              <div className="label">▲ signal2noise · live product</div>
              <div className="title">Daily AI intelligence for marketing strategists.</div>
              <div className="sub">Powered by Enso Labs · updated every weekday at 7am ET</div>
            </div>
            <span className="go">signals.ensolabs.ai →</span>
          </a>

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
          <div className="insights-grid">
            <Link href={`/insights/${featured.slug}`} className="insight-card featured">
              <div>
                <div className="meta">
                  <span className="pillar">{featured.pillar}</span>
                  <span>{formatDate(featured.date)}</span>
                  <span>{featured.readingMinutes} min read</span>
                </div>
                <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-3)' }}>FEATURED · 01</div>
              </div>
              <div>
                <div className="ti">{featured.title}</div>
                <p className="dek" style={{ marginTop: 16 }}>{featured.dek}</p>
                <div className="foot" style={{ marginTop: 28 }}>
                  <span>SAV BANERJEE</span>
                  <span className="read">Read essay →</span>
                </div>
              </div>
            </Link>

            {rest.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="insight-card">
                <div className="meta">
                  <span className="pillar">{post.pillar}</span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="ti">{post.title}</div>
                <p className="dek">{post.dek}</p>
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
