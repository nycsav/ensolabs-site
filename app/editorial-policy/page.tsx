import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, orgSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'Editorial standards for ensolabs.ai. All content is written and reviewed by Sav Banerjee. Sources include Anthropic, Google, and OpenAI documentation, peer-reviewed research, and regulatory filings.',
  alternates: { canonical: '/editorial-policy' },
  openGraph: {
    title: 'Editorial Policy — Enso Labs',
    description:
      'How Enso Labs sources, reviews, and publishes content across ensolabs.ai and signal2noise.',
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
      </section>

      <section className="section">
        <div className="prose">
          <p>
            All content on ensolabs.ai is written and reviewed by Sav Banerjee,
            Founder &amp; Principal of Enso Labs. Sources include Anthropic,
            Google, and OpenAI documentation, peer-reviewed research, and
            regulatory filings. Content is reviewed quarterly for accuracy.
          </p>
          <p>
            Financial content on this site is not investment advice.
          </p>
        </div>
      </section>
    </>
  );
}
