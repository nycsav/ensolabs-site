import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema, faqSchema, orgSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy — Enso Labs',
  description:
    'How Enso Labs collects, uses, and protects information from visitors to ensolabs.ai, contact form submissions, and lead gen forms on advertising platforms.',
  alternates: { canonical: 'https://ensolabs.ai/privacy-policy' },
  other: { 'article:modified_time': '2026-08-31' },
  openGraph: {
    title: 'Privacy Policy — Enso Labs',
    description:
      'How Enso Labs collects, uses, and protects visitor and lead information across ensolabs.ai and connected ad platforms.',
    url: 'https://ensolabs.ai/privacy-policy',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Privacy Policy — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Enso Labs',
    description:
      'How Enso Labs collects, uses, and protects visitor and lead information across ensolabs.ai and connected ad platforms.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const FAQS = [
  {
    question: 'What information does Enso Labs collect?',
    answer:
      'We collect information you voluntarily provide through our contact form or through lead generation forms on advertising platforms (such as LinkedIn) — typically name, email address, job title, and company name. We also collect standard web analytics (pages visited, referral source, approximate location) via Google Analytics.',
  },
  {
    question: 'How is my information used?',
    answer:
      'Information submitted through a form is used solely to respond to your inquiry and, if you engage us, to deliver the work. We do not sell personal information to third parties. Analytics data is used in aggregate to understand site usage and improve content.',
  },
  {
    question: 'Does Enso Labs use cookies or tracking pixels?',
    answer:
      'We use Google Analytics (GA4) to understand aggregate site traffic. Advertising platforms we run campaigns on (such as LinkedIn) may set their own cookies or pixels on your device when you interact with an Enso Labs ad; those platforms’ own privacy policies govern that data.',
  },
  {
    question: 'How do I request my data be deleted?',
    answer:
      'Email sav@ensolabs.ai with the subject line "Data deletion request" and we will remove your information from our systems within 30 days, except where we are required to retain it by law.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Privacy Policy', href: '/privacy-policy' },
          ]),
        ]}
      />

      <section className="hero">
        <p className="label">Standards</p>
        <h1>Privacy Policy</h1>
      </section>

      <section className="section">
        <div className="prose">
          <p>
            This privacy policy explains what information Enso Labs (&ldquo;we,&rdquo;
            &ldquo;us&rdquo;) collects from visitors to ensolabs.ai, contacts who
            submit our site&apos;s contact form, and leads who respond to an Enso
            Labs advertisement on a third-party platform such as LinkedIn, and how
            that information is used. Last updated August 31, 2026.
          </p>

          <h2>Information we collect</h2>
          <p>
            When you submit our contact form, we collect the information you enter
            — typically name, email address, and the details of your message. When
            you respond to an Enso Labs lead generation form on an advertising
            platform, that platform (e.g. LinkedIn) collects and shares with us
            the fields you complete — typically name, work email, job title, and
            company name. We do not ask for or store payment information, and we
            do not knowingly collect information from anyone under 16.
          </p>
          <p>
            We also collect standard web analytics — pages visited, referral
            source, device type, and approximate geographic location — through
            Google Analytics (GA4). This data is aggregated and is not used to
            individually identify you.
          </p>

          <h2>How we use it</h2>
          <p>
            Information submitted through a form is used to respond to your
            inquiry and, if you choose to engage Enso Labs, to scope and deliver
            the work. We use aggregate analytics to understand which content is
            useful and to improve the site. We do not sell, rent, or trade
            personal information to third parties.
          </p>

          <h2>Advertising platforms</h2>
          <p>
            When you submit a lead form on an advertising platform such as
            LinkedIn, that platform is also a data controller of the information
            you provide and governs it under its own privacy policy — for
            example, <a href="https://www.linkedin.com/legal/privacy-policy" rel="noopener" target="_blank">LinkedIn&apos;s Privacy Policy</a>.
            Enso Labs receives the fields you submit and handles them under this
            policy from that point forward.
          </p>

          <h2>Data retention and deletion</h2>
          <p>
            We retain contact and lead information for as long as reasonably
            necessary to respond to your inquiry or maintain a business
            relationship, and delete it when no longer needed. To request
            deletion of your information at any time, email{' '}
            <a href={`mailto:${SITE.founder.email}`}>{SITE.founder.email}</a>{' '}
            with the subject line &ldquo;Data deletion request.&rdquo;
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{' '}
            <a href={`mailto:${SITE.founder.email}`}>{SITE.founder.email}</a>,
            or by mail to {SITE.address.street}, {SITE.address.locality},{' '}
            {SITE.address.region} {SITE.address.postalCode}.
          </p>
          <p>
            See also our <Link href="/editorial-policy">editorial policy</Link>,
            or <Link href="/contact">get in touch</Link>.
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
