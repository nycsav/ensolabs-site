import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, orgSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'Enso Labs editorial policy: how we source, verify, and publish AI intelligence. Human-in-the-loop review on every piece of content powered by signal2noise.',
  alternates: { canonical: '/editorial-policy' },
  openGraph: {
    title: 'Editorial Policy | Enso Labs',
    description:
      'How Enso Labs sources, synthesizes, and publishes AI intelligence with human oversight.',
    url: '/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Editorial Policy', href: '/editorial-policy' },
          ]),
        ]}
      />

      <section className="hero">
        <p className="label">Standards</p>
        <h1>Editorial Policy</h1>
        <p className="sub-head">
          How we source, verify, and publish intelligence across Enso Labs and
          signal2noise.
        </p>
      </section>

      <section className="section">
        <div className="prose">
          <h2>Sources</h2>
          <p>
            All intelligence published by Enso Labs and signal2noise is sourced
            from a curated research index of 30+ publications ranked by tier:
          </p>
          <ul>
            <li>
              <strong>Tier 1 — Premier Research:</strong> McKinsey, Gartner,
              Forrester, BCG, Bain, Deloitte
            </li>
            <li>
              <strong>Tier 2 — Platform Research:</strong> Google, OpenAI,
              Anthropic, Meta, Microsoft, Amazon, Perplexity
            </li>
            <li>
              <strong>Tier 3 — Trade Publications:</strong> Ad Age, AdWeek,
              Digiday, Marketing Week, The Verge
            </li>
            <li>
              <strong>Tier 4 — Data Providers:</strong> eMarketer, WARC, Kantar,
              Nielsen
            </li>
            <li>
              <strong>Tier 5 — Emerging Signals:</strong> VentureBeat,
              TechCrunch, LinkedIn, whitepapers, PDF reports
            </li>
          </ul>

          <h2>AI-Assisted, Human-Reviewed</h2>
          <p>
            Content is synthesized using AI models (Claude, Perplexity) and
            reviewed by a senior human editor before publication. AI handles
            volume and velocity; the human handles context, accuracy, and
            editorial judgment.
          </p>

          <h2>Editorial Voice</h2>
          <p>We follow five principles in every piece of published content:</p>
          <ul>
            <li>
              <strong>Analytical:</strong> Lead with data, not opinion.
            </li>
            <li>
              <strong>Pragmatic:</strong> Every insight leads to &ldquo;what to
              do Monday.&rdquo;
            </li>
            <li>
              <strong>Concise:</strong> 2&ndash;3 sentences per section maximum.
            </li>
            <li>
              <strong>Direct:</strong> Name winners and losers. Call out
              tradeoffs.
            </li>
            <li>
              <strong>Credible:</strong> Cite recognizable sources.
            </li>
          </ul>

          <h2>What We Do Not Publish</h2>
          <ul>
            <li>Unverified claims or single-source assertions</li>
            <li>
              Hype language (&ldquo;revolutionary,&rdquo;
              &ldquo;game-changing,&rdquo; &ldquo;paradigm shift&rdquo;)
            </li>
            <li>Vague recommendations (&ldquo;consider evaluating&rdquo;)</li>
            <li>Confidential client information without explicit approval</li>
          </ul>

          <h2>Corrections</h2>
          <p>
            If we publish something incorrect, we correct it promptly and
            transparently. Reach out to{' '}
            <a href="mailto:sav@ensopartners.co">sav@ensopartners.co</a> with
            any concerns.
          </p>
        </div>
      </section>

      <section className="section cta-section">
        <h2>Read Our Intelligence</h2>
        <p>
          See these standards in action across our insights and signal2noise
          briefings.
        </p>
        <Link href="/insights" className="cta">
          View Insights <Arrow />
        </Link>
      </section>
    </>
  );
}
