import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema, orgSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Editorial Policy — Enso Labs Content Standards',
  description:
    'Editorial standards for ensolabs.ai. All content is written and reviewed by Sav Banerjee, Founder & Principal of Enso Labs. Sources include Anthropic, Google, and OpenAI documentation, peer-reviewed research, and regulatory filings.',
  alternates: { canonical: 'https://ensolabs.ai/editorial-policy' },
  other: { 'article:modified_time': '2026-07-01' },
  openGraph: {
    title: 'Editorial Policy — Enso Labs Content Standards',
    description:
      'How Enso Labs sources, reviews, and publishes content across ensolabs.ai and Strategy to Ship.',
    url: 'https://ensolabs.ai/editorial-policy',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Editorial Policy — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editorial Policy — Enso Labs',
    description:
      'How Enso Labs sources, reviews, and publishes content across ensolabs.ai and Strategy to Ship.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const FAQS = [
  {
    question: 'Who writes the content on ensolabs.ai?',
    answer:
      'All content on ensolabs.ai — including case studies, insight articles, and service pages — is written and reviewed by Sav Banerjee, Founder & Principal of Enso Labs. Sav holds certifications from Anthropic, Google, and OpenAI, and is a Perplexity AI Business Fellowship winner with 15+ years of enterprise experience.',
  },
  {
    question: 'What sources does Enso Labs use?',
    answer:
      'Primary sources include official documentation from Anthropic, Google, and OpenAI, peer-reviewed academic research, regulatory filings (SEC, FDA/MLR), patent databases, and first-party data from Enso Labs production systems including the Enso Trading Terminal and the Strategy to Ship intelligence engine.',
  },
  {
    question: 'How often is content reviewed and updated?',
    answer:
      'All content is reviewed quarterly for accuracy and updated when the underlying technology, regulatory landscape, or market conditions change. Case studies are updated when new outcomes data becomes available. Strategy to Ship publishes daily intelligence signals every weekday morning.',
  },
];

export default function EditorialPolicyPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          faqSchema(FAQS),
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
            Strategy to Ship. Every article, case study, and insight published by
            the studio is written and reviewed by Sav Banerjee, Founder &amp;
            Principal of Enso Labs — an Anthropic-certified, Google AI-certified,
            and OpenAI-certified practitioner with 15+ years of enterprise
            experience across Google, McCann, Publicis, and Fortune 500 accounts.
          </p>
          <p>
            Primary sources include Anthropic, Google, and OpenAI documentation,
            peer-reviewed research, regulatory filings, and first-party data
            from our own production systems — including the Enso Trading Terminal
            and the Strategy to Ship daily intelligence engine. Content is reviewed
            quarterly for accuracy and updated when the underlying technology or
            regulatory landscape shifts.
          </p>
          <p>
            Case studies reference real production outcomes from enterprise
            engagements. Metrics such as &ldquo;83% faster campaign launches&rdquo;
            and &ldquo;75% pilot-to-production&rdquo; are sourced from client
            project data. We do not fabricate or extrapolate outcome figures.
          </p>
          <p>
            Financial content on this site — including references to the Enso
            Trading Terminal and Strategy to Ship market signals — is not investment
            advice.
          </p>
          <p>
            Read our <Link href="/insights">latest insights</Link>,
            explore our <Link href="/work">case studies</Link>,
            review our <Link href="/services">service tracks</Link>, or
            learn more <Link href="/about">about the studio</Link>.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
