import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, orgSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Editorial Policy — Enso Labs Content Standards',
  description:
    'Editorial standards for ensolabs.ai. All content is written and reviewed by Sav Banerjee, Founder & Principal of Enso Labs. Sources include Anthropic, Google, and OpenAI documentation, peer-reviewed research, and regulatory filings.',
  alternates: { canonical: 'https://ensolabs.ai/editorial-policy' },
  openGraph: {
    title: 'Editorial Policy — Enso Labs Content Standards',
    description:
      'How Enso Labs sources, reviews, and publishes content across ensolabs.ai and signal2noise.',
    url: 'https://ensolabs.ai/editorial-policy',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Editorial Policy — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editorial Policy — Enso Labs',
    description:
      'How Enso Labs sources, reviews, and publishes content across ensolabs.ai and signal2noise.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
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
        <h1>Editorial Policy &amp; Content Standards</h1>
      </section>

      <section className="section">
        <div className="prose">
          <p>
            The Enso Labs editorial policy is the set of sourcing, review, and
            publication standards that govern all content on ensolabs.ai and
            signal2noise. Every article, case study, and insight published by
            the studio is written and reviewed by Sav Banerjee, Founder &amp;
            Principal of Enso Labs.
          </p>
          <p>
            Primary sources include Anthropic, Google, and OpenAI documentation,
            peer-reviewed research, regulatory filings, and first-party data
            from our own production systems. Content is reviewed quarterly for
            accuracy and updated when the underlying technology or regulatory
            landscape shifts.
          </p>
          <p>
            Financial content on this site is not investment advice.
          </p>
          <p>
            Read our <Link href="/insights">latest insights</Link> or
            learn more <Link href="/about">about the studio</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
