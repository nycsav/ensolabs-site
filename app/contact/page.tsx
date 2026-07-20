import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { ContactForm } from '@/components/ContactForm';
import { ContactHeroMedia } from '@/components/ContactHeroMedia';
import { Arrow } from '@/components/Arrow';
import {
  breadcrumbSchema,
  contactPointSchema,
  faqSchema,
  localBusinessSchema,
  orgSchema,
} from '@/lib/schema';
import { SITE } from '@/lib/site';

// ISR: self-heal edge-cached HTML within ~5 min of a content change (matches home).
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Contact Enso Labs | AI Consulting Studio NYC',
  description:
    'Tell us what you’re shipping. Book a 15-min intro, or leave two lines — Sav replies within 24h.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Enso Labs | Get in Touch',
    description: 'Start a project with Enso Labs. 31 Union Square West, NYC.',
    url: 'https://ensolabs.ai/contact',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Contact Enso Labs — Get in Touch' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Enso Labs | Get in Touch',
    description: 'Start a project with Enso Labs. 31 Union Square West, NYC.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const FAQ = [
  {
    question: 'How is Enso Labs structured?',
    answer:
      'Enso Labs is principal-led. Sav is the senior advisor on every engagement and is hands-on through delivery. A vetted specialist network — design, ops, niche engineering — scales with the work. Strategy and architecture are never subcontracted.',
  },
  {
    question: 'What does a 2-week diagnostic actually deliver?',
    answer:
      'A written roadmap, a prioritized opportunity backlog, an ROI model, a governance gap-map, and a working agentic prototype against your real data. Fixed-fee, scoped before we start.',
  },
  {
    question: 'Do you work with regulated industries?',
    answer:
      'Most engagements are in regulated industries: pharma (FDA / MLR / PRC), financial services, healthcare. Governance is built into every engagement, anchored on NIST AI RMF.',
  },
  {
    question: 'Is build-only engagement an option?',
    answer:
      'Yes. The Trading Terminal proves the build-only model. If you have a clearly-scoped agentic system that needs shipping, send the brief.',
  },
  {
    question: 'Who owns the IP?',
    answer:
      'You do. Client engagements transfer all custom code, prompts, eval suites, and documentation on delivery. Frameworks like the Strategy-to-Ship Framework remain Enso Labs IP.',
  },
  {
    question: 'How many clients do you take at once?',
    answer:
      'A small handful of active deep engagements at a time. That’s the whole point — depth, not portfolio. If the studio is at capacity, you’ll hear so directly with a future date.',
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          localBusinessSchema(),
          contactPointSchema(),
          faqSchema(FAQ),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Contact', href: '/contact' },
          ]),
        ]}
      />

      <style>{`
        /* One centered column — the whole contact "process" on one screen. */
        .compose { max-width: 600px; margin: 0 auto; }
        .compose .head h2 { font-family: var(--display); font-weight: 500; letter-spacing: -0.02em; line-height: 1.04; font-size: clamp(30px, 4.4vw, 46px); }
        .compose .head p { color: var(--fg-2); font-size: clamp(15px, 1.5vw, 17px); margin-top: 12px; max-width: 42ch; }

        /* fast path: one click, zero typing */
        .book-primary { width: 100%; margin-top: 30px; padding: 18px 24px; font-size: 13.5px; }
        .book-sub { text-align: center; font-family: var(--mono); font-size: 11.5px; color: var(--fg-3); margin-top: 12px; letter-spacing: 0.02em; }

        .form-or { display: flex; align-items: center; gap: 14px; margin: 30px 0 22px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-3); }
        .form-or::before, .form-or::after { content: ""; flex: 1; height: 1px; background: var(--line); }

        .compose form { display: grid; gap: 24px; }
        .compose .field { display: grid; gap: 10px; }
        .compose .field label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); text-transform: uppercase; letter-spacing: 0.06em; }
        .compose .field input, .compose .field textarea { background: transparent; border: none; border-bottom: 1px solid var(--line-2); color: var(--fg); font-family: var(--display); font-size: 19px; padding: 12px 0; transition: border-color .2s ease; width: 100%; outline: none; }
        .compose .field textarea { min-height: 32px; resize: none; overflow: hidden; line-height: 1.5; }
        .compose .field input:focus, .compose .field textarea:focus { border-color: var(--teal); }
        .compose .field input.invalid, .compose .field textarea.invalid { border-color: var(--coral); }
        .compose .field input::placeholder, .compose .field textarea::placeholder { color: var(--fg-3); }

        .form-err { display: flex; align-items: flex-start; gap: 10px; padding: 13px 15px; border: 1px solid color-mix(in oklab, var(--coral) 55%, var(--line-2)); border-radius: 10px; background: color-mix(in oklab, var(--coral) 12%, transparent); color: var(--fg); font-size: 14px; line-height: 1.45; }
        .form-err b { color: var(--coral); font-weight: 500; }

        .send-btn { width: 100%; padding: 18px 24px; font-size: 13.5px; margin-top: 2px; }

        .trust { margin-top: 26px; text-align: center; font-family: var(--mono); font-size: 12px; line-height: 1.8; color: var(--fg-3); letter-spacing: 0.01em; }
        .trust a { color: var(--fg-2); }
        .trust a:hover { color: var(--teal); }
        .trust .sep { color: var(--line-2); margin: 0 8px; }

        /* success (replaces the form) */
        .form-success { border: 1px solid color-mix(in oklab, var(--teal) 50%, var(--line)); border-radius: 14px; background: color-mix(in oklab, var(--teal) 8%, var(--bg-2)); padding: 40px 36px; text-align: center; }
        .form-success .tick { width: 44px; height: 44px; border-radius: 50%; background: var(--teal); color: var(--bg); display: flex; align-items: center; justify-content: center; font-size: 23px; margin: 0 auto 22px; }
        .form-success h3 { font-family: var(--display); font-weight: 500; font-size: 26px; letter-spacing: -0.015em; }
        .form-success p { color: var(--fg-2); font-size: 15px; line-height: 1.55; margin: 12px auto 0; max-width: 40ch; }
        .form-success .book-again { margin-top: 26px; }

        details summary { cursor: pointer; display: flex; justify-content: space-between; align-items: baseline; gap: 24px; list-style: none; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>

      {/* 01 — Contact hero as full-bleed NYC media band */}
      <ContactHeroMedia />

      {/* 02 — The whole contact process, one centered column */}
      <section data-screen-label="02 Contact" style={{ paddingTop: 'clamp(48px,6vw,80px)' }}>
        <div className="shell">
          <div className="compose reveal">
            <div className="head">
              <h2>Tell us what you&rsquo;re shipping.</h2>
              <p>
                {SITE.bookingUrl.startsWith('http')
                  ? 'One click to book a call — or leave two lines and Sav replies within 24h.'
                  : 'Leave two lines — Sav replies within 24h.'}
              </p>
            </div>

            {/* FAST PATH: one click, zero typing. Renders only once a real
                booking URL is configured — never a dead link. */}
            {SITE.bookingUrl.startsWith('http') && (
              <>
                <a
                  className="btn btn-primary book-primary"
                  href={SITE.bookingUrl}
                  target="_blank"
                  rel="noopener"
                  data-booking
                >
                  Book a 15-min intro
                  <Arrow />
                </a>
                <div className="book-sub">Pick a time that works &middot; no form to fill</div>

                <div className="form-or">or send two lines</div>
              </>
            )}
            {!SITE.bookingUrl.startsWith('http') && <div style={{ marginTop: 30 }} />}

            <ContactForm source="Website — Contact" />
          </div>
        </div>
      </section>

      {/* 03 — FAQ (unchanged; preserves the page's FAQ JSON-LD + SEO body) */}
      <section data-screen-label="03 FAQ">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 02</span>&nbsp;FAQ</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Six questions, asked often.</h2></div>
          </div>

          <div className="reveal" style={{ display: 'grid', gap: 0, borderTop: '1px solid var(--line)' }}>
            {FAQ.map((qa, i) => (
              <details
                key={i}
                style={{
                  borderBottom: i === FAQ.length - 1 ? 'none' : '1px solid var(--line)',
                  padding: '28px 0',
                }}
              >
                <summary>
                  <span style={{ fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 500, letterSpacing: '-0.015em' }}>{qa.question}</span>
                  <span className="mono-sm" style={{ color: 'var(--teal)' }}>+ open</span>
                </summary>
                <p style={{ marginTop: 18, color: 'var(--fg-2)', fontSize: 16, lineHeight: 1.65, maxWidth: '80ch' }}>
                  {qa.answer}
                </p>
              </details>
            ))}
          </div>

          {/* Answer-lead close + in-body internal links (AEO: definition sentence
              for LLM extraction; SEO: page-body links, not just nav chrome). */}
          <p className="trust" style={{ maxWidth: '68ch', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.85 }}>
            Enso Labs is a principal-led AI managed-services studio in New York City. We encode
            your domain expertise into managed agents, then build and operate them in production.
            <br />
            <Link href="/services">See the engagement tracks</Link>
            <span className="sep">/</span>
            <Link href="/work">Read the case studies</Link>
          </p>
        </div>
      </section>
    </>
  );
}
