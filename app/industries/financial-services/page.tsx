import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbSchema,
  orgSchema,
  professionalServiceSchema,
} from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Financial Services AI',
  description:
    'Enso Labs builds AI systems for financial services: autonomous trading terminals, signal intelligence engines, options flow analysis, and compliance-ready agentic architectures.',
  alternates: { canonical: '/industries/financial-services' },
  openGraph: {
    title: 'Financial Services AI | Enso Labs',
    description:
      'Autonomous trading systems, signal intelligence, and compliance-ready AI for financial services firms.',
    url: '/industries/financial-services',
  },
};

const CAPABILITIES = [
  {
    title: 'Autonomous Trading Systems',
    desc: 'News-driven algorithms, multi-agent research pipelines, and options flow analysis with production-grade security (AES-256-GCM encryption, brokerage API integration).',
  },
  {
    title: 'Signal Intelligence',
    desc: 'Real-time synthesis of market signals from Tier 1 research, platform data, and alternative sources into actionable executive briefings.',
  },
  {
    title: 'Compliance-Ready Architecture',
    desc: 'Governance frameworks, audit trails, and explainability layers designed for regulated environments. Every decision is traceable.',
  },
  {
    title: 'Portfolio Analytics',
    desc: 'Multi-strategy backtesting, risk assessment, and performance attribution powered by agentic AI pipelines.',
  },
];

export default function FinancialServicesPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          professionalServiceSchema(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Industries', href: '/industries/financial-services' },
            { name: 'Financial Services', href: '/industries/financial-services' },
          ]),
        ]}
      />

      <section className="hero">
        <p className="label">Industry</p>
        <h1>Financial Services AI</h1>
        <p className="sub-head">
          We build production AI systems for financial services — from
          autonomous trading terminals to compliance-ready intelligence
          platforms. Not proofs of concept. Production infrastructure.
        </p>
      </section>

      <section className="section">
        <h2>Capabilities</h2>
        <div className="grid-2">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="card">
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Case Study: Enso Trading Terminal</h2>
        <div className="prose">
          <p>
            The Enso Trading Terminal is our own production-grade autonomous
            trading platform — news-driven algorithms, multi-agent research
            automation, crypto/DeFi strategy engines, and options flow analysis.
            We built it, we run it, and we use the same architecture for client
            deployments.
          </p>
        </div>
        <Link href="/work/trading-terminal" className="cta">
          Read the Case Study <Arrow />
        </Link>
      </section>

      <section className="section cta-section">
        <h2>Build Your Financial AI Stack</h2>
        <p>
          Whether you need a trading system, intelligence platform, or
          compliance-ready AI architecture — we build what the incumbents
          can&rsquo;t.
        </p>
        <Link href="/contact" className="cta">
          Get in Touch <Arrow />
        </Link>
      </section>
    </>
  );
}
