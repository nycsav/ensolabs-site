import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbSchema,
  faqSchema,
  orgSchema,
  professionalServiceSchema,
} from '@/lib/schema';

// ISR: self-heal edge-cached HTML within ~5 min of a content change (matches home).
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'AI Growth & Commercial Systems — Agentic Go-to-Market NYC | Enso Labs',
  description:
    'Agentic growth marketing built on 15 years of Madison Avenue craft. Enso Labs encodes segmentation, insight, campaign planning, and brand into managed AI agents — then operates them. Growth marketing, marketing engineering, and GTM engineering, run as agents. Principal-led, NYC.',
  alternates: { canonical: 'https://ensolabs.ai/services/ai-growth-marketing' },
  openGraph: {
    title: 'AI Growth & Commercial Systems — Enso Labs',
    description:
      'Growth marketing, marketing engineering, and GTM engineering are new names for a 15-year Madison Avenue craft. We build it as agents — segmentation, campaigns, and brand, run and optimized 24/7.',
    url: 'https://ensolabs.ai/services/ai-growth-marketing',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'AI Growth & Commercial Systems — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Growth & Commercial Systems — Enso Labs',
    description:
      'Agentic go-to-market built on 15 years of brand and demand craft. Segmentation, campaigns, and brand governance — run as agents.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
  other: { 'article:modified_time': '2026-07-10' },
};

const FAQS = [
  {
    question: 'What are AI growth and commercial systems?',
    answer:
      'AI growth and commercial systems are managed AI agents that run go-to-market work — audience segmentation, customer insight, campaign planning and optimization, brand governance, and demand generation. Enso Labs encodes the marketing craft into the agents, builds them against your real data and channels, and operates them as a managed service.',
  },
  {
    question: 'Is this growth marketing, marketing engineering, or GTM engineering?',
    answer:
      'All three — they are the same discipline at different funnel scopes. Marketing engineering owns the top of the funnel, growth marketing owns the full funnel, and GTM engineering is the RevOps and tooling slice. Enso Labs delivers the strategy and the build: the judgment to decide what good looks like, and the agents to run it.',
  },
  {
    question: 'How is this different from a marketing agency or a growth-hacking shop?',
    answer:
      'Most growth shops can wire up tools but have never run a segmentation study that moved a P&L or sat in a brand review. Enso Labs brings 15 years of Madison Avenue craft — segmentation, insight, campaign planning, brand — and builds the agents in-house. Senior judgment plus production engineering, principal-led, no hand-offs.',
  },
  {
    question: 'What results can agentic marketing deliver?',
    answer:
      'Industry deployments report 10–30% revenue uplift from always-on personalization (McKinsey), 3–5x email click-through, 20–30% better cost-per-pipeline, and 60%+ faster content cycles — when the agents are pointed at the right segments and governed against a real brand rubric.',
  },
];

export default function AIGrowthCommercialPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          professionalServiceSchema(),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services' },
            { name: 'AI Growth & Commercial Systems', href: '/services/ai-growth-marketing' },
          ]),
        ]}
      />

      <section className="hero">
        <p className="label">Service</p>
        <h1>AI Growth &amp; Commercial Systems</h1>
        <p className="sub-head">
          Growth marketing, marketing engineering, and GTM engineering are new
          names for a craft we have run for 15 years on Madison Avenue —
          segmentation, insight, campaign planning, and brand. Enso Labs builds
          it as agents: encoded, deployed, and operated in production. The craft
          is the moat; the agents are the scale.
        </p>
      </section>

      {/* ── The old craft, built as agents ── */}
      <section className="section">
        <h2>The Craft You Know, Built as Agents</h2>
        <div className="prose">
          <p>
            The 2026 go-to-market vocabulary is new; the underlying work is not.
            Every one of these &ldquo;new&rdquo; disciplines maps to a craft with
            a long enterprise track record — now expressed as managed agents:
          </p>
          <ul>
            <li>
              <strong>Customer segmentation &rarr;</strong> real-time segmentation
              agents that model audiences on live behavioral and intent data,
              not a quarterly deck.
            </li>
            <li>
              <strong>Research, discovery &amp; stakeholder interviews &rarr;</strong>{' '}
              agentic voice-of-customer that mines and clusters interviews,
              reviews, and market signal into decision-ready insight at scale.
            </li>
            <li>
              <strong>Campaign planning &rarr;</strong> multi-channel planning
              agents that translate strategy into sequenced, measurable programs.
            </li>
            <li>
              <strong>Media &amp; execution optimization &rarr;</strong> always-on
              optimization across Google, LinkedIn, and Meta — budget follows
              performance, 24/7.
            </li>
            <li>
              <strong>Brand building &amp; positioning &rarr;</strong> brand
              governance agents that keep voice, claims, and compliance on-brand
              at machine scale. Your brand book becomes the rubric.
            </li>
            <li>
              <strong>Demand generation &rarr;</strong> a full-funnel agentic
              demand system wired to your CRM and analytics, measured on outcomes
              rather than seats.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Why judgment is the moat ── */}
      <section className="section">
        <h2>Why Judgment Is the Moat</h2>
        <div className="prose">
          <p>
            As AI commoditizes execution, the differentiator becomes judgment. In
            2026, 91% of marketers use AI — but fewer than a third use it for the
            high-value work: brand governance, hyper-personalization, predictive
            optimization. The tools are everywhere; the judgment to point them at
            the right problem is not.
          </p>
          <p>
            Enso Labs did not arrive at agentic marketing from a growth-hacking
            bootcamp. We arrived from 15 years across New York&rsquo;s top
            agencies — and we build the agents ourselves. That combination is the
            point: the senior judgment to define what &ldquo;good&rdquo; looks
            like, and the engineering to make it run in production.
          </p>
        </div>
      </section>

      {/* ── What it delivers ── */}
      <section className="section">
        <h2>What Agentic Growth Delivers</h2>
        <div className="prose">
          <p>
            When the agents are aimed at the right segments and governed against a
            real brand rubric, the results compound:
          </p>
          <ul>
            <li><strong>10–30% revenue uplift</strong> from always-on personalization (McKinsey).</li>
            <li><strong>3–5x email click-through</strong> from individualized outreach.</li>
            <li><strong>20–30% better cost-per-pipeline</strong> from continuous optimization.</li>
            <li><strong>60%+ faster content cycles</strong> from agentic production.</li>
          </ul>
        </div>
      </section>

      {/* ── How we work ── */}
      <section className="section">
        <h2>How We Work: Encode, Build, Operate</h2>
        <div className="prose">
          <p>
            AI Growth &amp; Commercial Systems is delivered the same way as every
            Enso engagement — as managed services, not a one-off project:
          </p>
          <ul>
            <li>
              <strong>Encode:</strong> we turn your segmentation logic, brand
              standards, and demand playbook into the agent&rsquo;s definition of
              &ldquo;good.&rdquo;
            </li>
            <li>
              <strong>Build:</strong> production agents wired into your channels,
              CRM, and analytics stack — forward-deployed against real data.
            </li>
            <li>
              <strong>Operate:</strong> we run and continuously improve the
              system as a managed service, accountable to the outcome.
            </li>
          </ul>
        </div>
        <Link href="/services" className="cta">
          See All Service Tracks <Arrow />
        </Link>
      </section>

      {/* ── FAQ ── */}
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

      {/* ── CTA ── */}
      <section className="section cta-section">
        <h2>Growth, Run as Agents</h2>
        <p>
          If your team is being told it needs a &ldquo;marketing engineer,&rdquo;
          what it may actually need is someone who has done the craft and can
          build the agent. Start with a 2-week AI Audit.
        </p>
        <Link href="/contact" className="cta">
          Get in Touch <Arrow />
        </Link>
      </section>
    </>
  );
}
