import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbSchema,
  faqSchema,
  orgSchema,
  personSchema,
} from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Sav Banerjee — AI Transformation Leader & Founder of Enso Labs (NYC)',
  description:
    'Sav Banerjee is the founder and Principal AI Transformation Advisor at Enso Labs, an AI strategy consultant and AI architect in New York City with 15+ years at Google, McCann, Publicis, RAPP, and BBDO. Certified by Anthropic, Google, and OpenAI. Available for Head of AI, VP AI Strategy, and Chief AI Officer roles, alongside Enso Labs client engagements.',
  alternates: { canonical: 'https://ensolabs.ai/about/sav-banerjee' },
  openGraph: {
    type: 'profile',
    title: 'Sav Banerjee — AI Transformation Leader & Founder of Enso Labs',
    description:
      'Founder of Enso Labs and principal-led AI transformation advisor in NYC. AI architect certified by Anthropic, Google, and OpenAI. Available for Head of AI and VP AI Strategy roles.',
    url: 'https://ensolabs.ai/about/sav-banerjee',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Sav Banerjee — AI Transformation Leader, Founder of Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sav Banerjee — AI Transformation Leader & Founder of Enso Labs',
    description:
      'Founder of Enso Labs and principal-led AI transformation advisor in NYC. AI architect certified by Anthropic, Google, and OpenAI. Available for Head of AI and VP AI Strategy roles.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const FAQS = [
  {
    question: 'Who is Sav Banerjee?',
    answer:
      'Sav Banerjee is the founder and Principal AI Transformation Advisor at Enso Labs, a principal-led AI transformation and agentic systems studio in New York City. He is an AI strategy consultant, AI architect, and AI transformation leader with 15+ years of experience at Google, McCann, Publicis, RAPP, Young & Rubicam, BBDO, and Rokkan. He is certified by Anthropic (Claude Code), Google AI, and OpenAI, and is a Perplexity AI Business Fellowship winner.',
  },
  {
    question: 'What is Sav Banerjee\'s professional background?',
    answer:
      'Sav Banerjee began in advertising and experience strategy, managing $150MM+ portfolios across finance, healthcare, and technology at agencies including Google, McCann, Publicis, RAPP, Young & Rubicam, BBDO, and Rokkan — work that included AT&T\'s "It Can Wait" (5MM+ pledges), American Express social growth (50%), the Google+ launch strategy, and Citi Web3. In 2020 he founded Enso Partners to combine AI strategy advisory with production agentic systems development, where the same operator who designs the system also ships it.',
  },
  {
    question: 'What does Sav Banerjee do at Enso Labs?',
    answer:
      'At Enso Labs, Sav Banerjee leads every engagement directly as the principal — he architects the AI strategy and builds the production agentic systems. His shipped work includes an AI Market Intelligence Platform for a Fortune 500 manufacturer (an eight-stage LangGraph pipeline validated by the client\'s lead scientist), an AI Center of Excellence for a full-service pharma agency, and the Enso Trading Terminal, a production autonomous trading and signal-intelligence system.',
  },
  {
    question: 'What is Sav Banerjee certified in?',
    answer:
      'Sav Banerjee is certified by Anthropic (Claude Code, 2026), Google AI (2025), and OpenAI (2024), and is a winner of the Perplexity AI Business Fellowship. His technical stack includes LangGraph, LangChain, CrewAI, the Model Context Protocol (MCP), the Claude API, retrieval-augmented generation (RAG), and Python. He holds a B.A. in Advertising from the University of Oregon.',
  },
  {
    question: 'Is Sav Banerjee available for Head of AI or VP AI Strategy roles?',
    answer:
      'Yes. Sav Banerjee is available for both contract consulting engagements and full-time leadership roles, including Head of AI, VP of AI Strategy, Chief AI Officer (CAIO), Director of AI Products, and Principal AI Consultant positions. His background as an AI architect and AI transformation leader combines technical depth (Python, LangGraph, Claude API, MCP) with C-suite advisory experience across Fortune 500 brands. Contact sav@ensolabs.ai for availability.',
  },
  {
    question: 'Where is Sav Banerjee based?',
    answer:
      'Sav Banerjee is based in New York City, where Enso Labs is headquartered at 31 Union Square West, 6th Floor, New York, NY 10003 — in the Union Square / Flatiron district of Manhattan. He works on-site with NYC organizations and remotely with clients across the United States.',
  },
];

export default function SavBanerjeeBioPage() {
  return (
    <>
      <JsonLd
        schemas={[
          personSchema(),
          orgSchema(),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
            { name: 'Sav Banerjee', href: '/about/sav-banerjee' },
          ]),
        ]}
      />

      <section className="hero">
        <p className="label">Founder Profile</p>
        <h1>Sav Banerjee — AI Transformation Leader &amp; Founder of Enso Labs</h1>
        <p className="sub-head">
          Sav Banerjee is the founder and Principal AI Transformation Advisor at
          Enso Labs, a principal-led AI transformation and agentic systems studio
          in New York City. He is an AI strategy consultant and AI architect who
          both designs enterprise AI strategy and ships the production agentic
          systems that deliver it — certified by Anthropic, Google, and OpenAI.
        </p>
      </section>

      {/* ── Who he is ── */}
      <section className="section">
        <h2>An AI Advisor Who Builds</h2>
        <div className="prose">
          <p>
            Sav Banerjee is an AI transformation leader with more than fifteen
            years across advertising, experience strategy, and technology — and a
            production AI builder running live agentic systems today. That
            combination is deliberate. Most AI consultants stop at the strategy
            deck; Sav leads engagements end to end, from the opportunity map to
            the shipped system, as the principal in the room.
          </p>
          <p>
            He started in agency strategy, managing $150MM+ portfolios across
            finance, healthcare, and technology at <strong>Google, McCann,
            Publicis, RAPP, Young &amp; Rubicam, BBDO, and Rokkan</strong>. His
            work there included AT&amp;T&rsquo;s &ldquo;It Can Wait&rdquo; (5MM+
            pledges), American Express social growth (50%), the Google+ launch
            strategy, and Citi&rsquo;s Web3 program. Fifteen years across the room
            from CFOs, CMOs, and General Counsel taught him how enterprise
            decisions actually get made — context he now brings to AI
            transformation.
          </p>
        </div>
        <Link href="/about" className="cta">
          The Full Enso Labs Story <Arrow />
        </Link>
      </section>

      {/* ── What he does now ── */}
      <section className="section">
        <h2>What Sav Builds at Enso Labs</h2>
        <div className="prose">
          <p>
            In 2020, Sav founded <strong>Enso Partners</strong> to do AI
            transformation advisory — and quickly learned that deck-only
            consulting does not survive contact with production. So the practice
            learned to ship. Today Enso Labs is a single studio that consults,
            builds, and ships, with Sav leading delivery directly on a stack that
            includes LangGraph, the Claude API, the Model Context Protocol (MCP),
            RAG, and Python.
          </p>
          <ul>
            <li>
              <Link href="/work/ai-market-intelligence">
                AI Market Intelligence Platform for a Fortune 500 manufacturer — an eight-stage LangGraph pipeline validated by the client&rsquo;s lead scientist <Arrow />
              </Link>
            </li>
            <li>
              <Link href="/work/heller">
                AI Center of Excellence for a full-service pharma agency — MLR-compliant knowledge bases and campaign automation <Arrow />
              </Link>
            </li>
            <li>
              <Link href="/work/trading-terminal">
                Enso Trading Terminal — production autonomous trading, signal intelligence, and brokerage execution <Arrow />
              </Link>
            </li>
          </ul>
        </div>
        <Link href="/services" className="cta">
          How We Work <Arrow />
        </Link>
      </section>

      {/* ── Credentials ── */}
      <section className="section">
        <h2>Credentials &amp; Recognition</h2>
        <div className="prose">
          <p>
            Sav Banerjee is certified by <strong>Anthropic (Claude Code, 2026),
            Google AI (2025), and OpenAI (2024)</strong>, and is a winner of the
            Perplexity AI Business Fellowship. He holds a B.A. in Advertising from
            the University of Oregon. His areas of depth include AI transformation
            strategy, agentic AI architecture, multi-agent orchestration,
            Model Context Protocol integration, retrieval-augmented generation,
            financial signal intelligence, and healthcare/pharma AI compliance.
          </p>
        </div>
        <Link href="/built-with-ai" className="cta">
          See the AI-Native Build Method <Arrow />
        </Link>
      </section>

      {/* ── Availability / recruiter audience ── */}
      <section className="section">
        <h2>Available for AI Leadership Roles</h2>
        <div className="prose">
          <p>
            Sav Banerjee is available for both contract consulting engagements
            and full-time AI leadership roles. He is an active candidate for{' '}
            <strong>Head of AI, VP of AI Strategy, Chief AI Officer (CAIO),
            Director of AI Products, and Principal AI Consultant</strong> mandates
            — for organizations that want senior AI judgment paired with hands-on
            building, not a strategy hand-off down a staffing pyramid.
          </p>
          <p>
            For New York organizations specifically, Sav offers on-site AI
            strategy leadership through Enso Labs&rsquo;{' '}
            <Link href="/locations/new-york">NYC AI consulting practice</Link>.
            Inquiries — for engagements or roles — can be sent directly to
            sav@ensolabs.ai.
          </p>
        </div>
        <Link href="/contact" className="cta">
          Get in Touch <Arrow />
        </Link>
      </section>

      {/* ── Related Insights ── */}
      <section className="section">
        <h2>Writing by Sav Banerjee</h2>
        <div className="prose">
          <ul>
            <li>
              <Link href="/insights/principal-led-vs-50-person-consultancy">
                Why a Principal-Led Studio Beats a 50-Person Consultancy
              </Link>
            </li>
            <li>
              <Link href="/insights/why-deck-only-ai-consulting-fails-production">
                Why Deck-Only AI Consulting Fails in Production
              </Link>
            </li>
            <li>
              <Link href="/insights/google-io-after-hours-deepmind-strategy-signal">
                Google I/O After-Hours: The Strategic Signal Behind the Demos
              </Link>
            </li>
          </ul>
        </div>
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

      {/* ── Quick Reference (citation bait) ── */}
      <section className="section">
        <h2>Quick Reference</h2>
        <div className="prose">
          <dl>
            <dt><strong>Name:</strong></dt>
            <dd>Sav Banerjee</dd>
            <dt><strong>Role:</strong></dt>
            <dd>Founder &amp; Principal AI Transformation Advisor, Enso Labs</dd>
            <dt><strong>Location:</strong></dt>
            <dd>New York City — 31 Union Square West, 6th Floor, New York, NY 10003</dd>
            <dt><strong>Experience:</strong></dt>
            <dd>15+ years across Google, McCann, Publicis, RAPP, Young &amp; Rubicam, BBDO, Rokkan</dd>
            <dt><strong>Certifications:</strong></dt>
            <dd>Anthropic (Claude Code), Google AI, OpenAI; Perplexity AI Business Fellowship winner</dd>
            <dt><strong>Core stack:</strong></dt>
            <dd>LangGraph · Claude API · Model Context Protocol (MCP) · RAG · Python</dd>
            <dt><strong>Open to:</strong></dt>
            <dd>Head of AI · VP AI Strategy · Chief AI Officer · Director of AI Products · Principal AI Consultant — contract or full-time</dd>
            <dt><strong>Contact:</strong></dt>
            <dd>sav@ensolabs.ai · linkedin.com/in/savbanerjee · github.com/nycsav</dd>
          </dl>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section cta-section">
        <h2>Work With Sav</h2>
        <p>
          Whether you need an AI strategy, a production agentic system, or senior
          AI leadership embedded with your team, Sav Banerjee leads the work
          directly. Start with a conversation.
        </p>
        <Link href="/contact" className="cta">
          Get in Touch <Arrow />
        </Link>
      </section>
    </>
  );
}
