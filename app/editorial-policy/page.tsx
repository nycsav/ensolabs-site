import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, orgSchema, personSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'All content on ensolabs.ai is written and reviewed by Sav Banerjee, Founder & Principal of Enso Labs. Sources, review cadence, financial-content disclaimer.',
  alternates: { canonical: '/editorial-policy' },
  openGraph: {
    title: 'Editorial Policy — Enso Labs',
    description:
      'Authorship, review cadence, sources, and financial-content disclaimer for ensolabs.ai.',
    url: '/editorial-policy',
  },
  twitter: {
    title: 'Editorial Policy — Enso Labs',
    description:
      'Authorship, review cadence, sources, and financial-content disclaimer for ensolabs.ai.',
  },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          personSchema(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Editorial Policy', href: '/editorial-policy' },
          ]),
        ]}
      />

      <style>{`
        .policy { max-width: 760px; }
        .policy p { font-size: 16.5px; line-height: 1.7; color: var(--fg-2); margin-bottom: 18px; }
        .policy p strong { color: var(--fg); font-weight: 500; }
        .policy h3 { font-size: 18px; font-weight: 500; letter-spacing: -0.01em; color: var(--fg); margin: 32px 0 12px; }
        .policy ul { list-style: none; display: grid; gap: 8px; padding: 0; margin-bottom: 18px; }
        .policy ul li { font-size: 15.5px; color: var(--fg-2); line-height: 1.6; padding-left: 20px; position: relative; }
        .policy ul li::before { content: '↳'; position: absolute; left: 0; color: var(--teal); font-family: var(--mono); font-size: 13px; top: 1px; }
      `}</style>

      <section className="hero" data-screen-label="01 Editorial policy hero" style={{ paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow"><span className="num">PAGE / 09</span>&nbsp;Editorial Policy</span>
          </div>
          <h1 className="display reveal" data-delay="1" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
            Who wrote it.<br />
            <em>Who reviewed</em> <span className="accent">it.</span>
          </h1>
          <p className="lede reveal" data-delay="2">
            Transparency on authorship, sources, and review cadence. Trust is a YMYL signal — and a buyer signal.
          </p>
        </div>
      </section>

      <section data-screen-label="02 Policy">
        <div className="shell">
          <div className="reveal policy">
            <h3>Authorship</h3>
            <p>
              All content on ensolabs.ai is written and reviewed by <Link href="/about" style={{ color: 'var(--teal)', textDecoration: 'underline' }}><strong>Sav Banerjee</strong></Link>, Founder &amp; Principal of Enso Labs. AI tools are used in the drafting and revision workflow — Claude Code for production, Claude Chat for research — but every published page is read, edited, and approved by Sav before publication. Articles carry a visible byline and a &ldquo;Last reviewed&rdquo; date stamp.
            </p>

            <h3>Sources</h3>
            <p>We cite primary sources whenever a claim has one. Specifically:</p>
            <ul>
              <li>Anthropic, Google, and OpenAI documentation for model capabilities and product launches.</li>
              <li>Peer-reviewed research and pre-print servers (arXiv, KDD, NeurIPS) for technical claims.</li>
              <li>Regulator filings and rulings (NYDFS, SEC, FINRA, FDA) for compliance content.</li>
              <li>Internal client work, anonymized where required, for engagement-derived metrics.</li>
            </ul>
            <p>
              Where a claim is opinion or strategy, it is labelled as such and attributed to the studio or to Sav personally.
            </p>

            <h3>Review cadence</h3>
            <p>
              Insights are reviewed quarterly for accuracy. Service and case-study pages are reviewed when scope changes or when a referenced fact (regulation, partner platform, brokerage API) is updated. Each page&rsquo;s <code>dateModified</code> reflects the most recent substantive review, not cosmetic edits.
            </p>

            <h3>Corrections</h3>
            <p>
              Material errors are corrected with a visible edit note and an updated <code>dateModified</code>. Trivial typos are fixed silently. To report a correction, email{' '}
              <a href="mailto:sav@ensopartners.co" style={{ color: 'var(--teal)' }}>sav@ensopartners.co</a>.
            </p>

            <h3>Financial content disclaimer</h3>
            <p>
              Content on ensolabs.ai about financial AI agents, trading systems, options flow, and market intelligence is for educational and architectural purposes. <strong>It is not investment advice, a solicitation, or a recommendation to buy, sell, or hold any security or instrument.</strong> Production trading systems we build for clients operate within their own compliance perimeters and risk frameworks; nothing on this site should be construed as guidance for a reader&rsquo;s own capital.
            </p>

            <h3>AI disclosure</h3>
            <p>
              The Enso Labs site itself was designed and built with AI tools — credited in the footer. Content drafted with AI assistance is reviewed and edited by Sav before publication. Where an article quotes an AI system&rsquo;s output verbatim (e.g., a Claude response in an architectural example), the quote is labelled as such.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
