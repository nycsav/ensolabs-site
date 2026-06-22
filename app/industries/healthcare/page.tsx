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

export const metadata: Metadata = {
  title: 'AI for Healthcare & Pharma | MLR Compliance AI Consulting — Enso Labs',
  description:
    'Healthcare AI consulting and pharma AI solutions from Enso Labs. We build MLR-compliant AI Centers of Excellence, RAG systems grounded in FDA-approved knowledge bases, and production agentic workflows for pharmaceutical marketing and medical affairs. NYC-based.',
  alternates: { canonical: 'https://ensolabs.ai/industries/healthcare' },
  openGraph: {
    title: 'Healthcare AI Consulting — Enso Labs | Pharma AI & MLR Compliance',
    description:
      'MLR-compliant AI for pharma. AI Centers of Excellence, brand knowledge bases, campaign automation — built by a studio with shipped healthcare AI systems.',
    url: 'https://ensolabs.ai/industries/healthcare',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Healthcare AI Consulting — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Healthcare AI Consulting — Enso Labs | Pharma AI & MLR Compliance',
    description:
      'MLR-compliant AI for pharma. AI Centers of Excellence, RAG systems, campaign automation — principal-led studio.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const FAQS = [
  {
    question: 'What is healthcare AI consulting?',
    answer:
      'Healthcare AI consulting helps pharmaceutical companies, health systems, and biotech firms adopt AI responsibly and effectively. It covers AI strategy, MLR (Medical-Legal-Regulatory) compliance integration, AI Center of Excellence design, RAG system development with FDA-approved knowledge bases, and production deployment of agentic workflows for marketing, medical affairs, and commercial operations.',
  },
  {
    question: 'What is an AI Center of Excellence for pharma?',
    answer:
      'An AI Center of Excellence (AI CoE) for pharma is an organizational capability that provides governance, tools, templates, and training for AI adoption across a pharmaceutical company. Enso Labs designs AI CoEs that include brand-safe knowledge bases, MLR-compliant content generation workflows, eval harnesses for accuracy validation, and enablement curricula that train teams to use AI independently while maintaining regulatory compliance.',
  },
  {
    question: 'How does AI comply with MLR review requirements?',
    answer:
      'AI-generated content in pharma must pass Medical-Legal-Regulatory (MLR) review before publication. Enso Labs builds AI systems with compliance baked in: RAG retrieval is bounded to FDA-approved brand knowledge bases, outputs include evidence trails linking every claim to an approved source, and human-in-the-loop checkpoints ensure MLR reviewers validate all AI-generated materials before they reach market.',
  },
  {
    question: 'Can AI reduce pharma campaign launch timelines?',
    answer:
      'Yes. Our AI Center of Excellence deployment at a full-service pharma agency compressed campaign launches from 3 months to 2 weeks — a 6x improvement. The system used RAG retrieval grounded in brand-specific knowledge bases, automated first-draft generation for compliant marketing materials, and streamlined MLR review workflows.',
  },
  {
    question: 'What healthcare AI systems has Enso Labs shipped?',
    answer:
      'Our flagship healthcare engagement is an AI Center of Excellence for Heller Agency, a full-service pharma advertising agency. The system includes 5 brand knowledge bases, 8 AI-powered automations, 6 concurrent campaign workstreams, and MLR-compliant content generation. Campaign launches went from 3 months to 2 weeks.',
  },
  {
    question: 'Does Enso Labs work with health systems and biotech?',
    answer:
      'Yes. While our deepest healthcare experience is in pharma marketing and medical affairs, our AI transformation consulting practice serves health systems (clinical workflow automation, patient engagement AI) and biotech companies (research intelligence, competitive monitoring, regulatory filing support). All healthcare engagements include HIPAA-aware architecture design and responsible AI governance.',
  },
];

export default function HealthcareAIPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          professionalServiceSchema(),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Industries', href: '/industries/healthcare' },
            { name: 'Healthcare & Pharma AI', href: '/industries/healthcare' },
          ]),
        ]}
      />

      <section className="hero">
        <p className="label">Industry</p>
        <h1>AI for Healthcare &amp; Pharma</h1>
        <p className="sub-head">
          Healthcare AI consulting is the practice of deploying AI systems in
          pharmaceutical, biotech, and health system environments where regulatory
          compliance, clinical accuracy, and patient safety are non-negotiable.
          Enso Labs builds MLR-compliant AI Centers of Excellence, RAG systems
          grounded in FDA-approved knowledge bases, and production agentic
          workflows for pharma marketing and medical affairs.
        </p>
      </section>

      {/* The Healthcare AI Challenge */}
      <section className="section">
        <h2>Why Healthcare AI Is Different</h2>
        <div className="prose">
          <p>
            Healthcare and pharma organizations face a unique AI adoption challenge:
            the potential for AI to transform operations is enormous, but the
            regulatory environment demands compliance at every step. Generic AI
            tools hallucinate. Generic consultancies deliver roadmaps without
            understanding MLR review cycles, FDA labeling requirements, or the
            difference between promotional and non-promotional content.
          </p>
          <p>
            Enso Labs brings both agency experience (McCann Healthcare, pharma
            advertising) and production AI systems engineering. The result is
            healthcare AI that is compliant by architecture — not by afterthought.
          </p>
        </div>
      </section>

      {/* What We Build */}
      <section className="section">
        <h2>Healthcare AI Capabilities</h2>
        <div className="prose">
          <ul>
            <li>
              <strong>AI Center of Excellence (Pharma):</strong> Full CoE design
              including governance framework, brand knowledge bases, MLR-compliant
              templates, enablement curriculum, and adoption metrics. The
              organizational layer that makes AI sustainable.
            </li>
            <li>
              <strong>MLR-Compliant Content Generation:</strong> RAG systems that
              retrieve only from approved brand knowledge bases, generate
              first-draft marketing materials with evidence trails, and route
              to MLR review with source citations attached.
            </li>
            <li>
              <strong>Brand Knowledge Base Development:</strong> Structured,
              retrievable knowledge bases built from FDA-approved labeling,
              clinical data, brand guidelines, and approved claims. The
              foundation for trustworthy AI-generated content.
            </li>
            <li>
              <strong>Campaign Automation:</strong> Agentic workflows that
              compress campaign timelines — from brief intake through content
              generation, MLR routing, and multi-channel deployment.
            </li>
            <li>
              <strong>Medical Affairs AI:</strong> Research intelligence,
              competitive monitoring, KOL analysis, and scientific literature
              synthesis powered by Claude and domain-specific RAG retrieval.
            </li>
            <li>
              <strong>Responsible AI Governance:</strong> NIST AI RMF alignment,
              FDA compliance documentation, audit trail generation, and bias
              monitoring for healthcare-specific AI deployments.
            </li>
          </ul>
        </div>
      </section>

      {/* Case Study */}
      <section className="section">
        <h2>Case Study: AI Center of Excellence for Pharma</h2>
        <div className="prose">
          <p>
            Enso Labs designed and deployed an AI Center of Excellence for a
            full-service pharmaceutical advertising agency managing multiple
            drug brands across oncology, ophthalmology, and rare disease.
          </p>
          <p>
            The system delivered 5 brand-specific knowledge bases, 8 production
            AI automations, support for 6 concurrent campaign workstreams, and
            a measurable compression of campaign launch timelines from 3 months
            to 2 weeks — a 6x improvement in time-to-market while maintaining
            full MLR compliance.
          </p>
          <Link href="/work/heller" className="cta">
            Read the Full Case Study <Arrow />
          </Link>
        </div>
      </section>

      {/* Related */}
      <section className="section">
        <h2>Related Pages</h2>
        <div className="prose">
          <ul>
            <li>
              <Link href="/services">
                All Service Tracks — AI Transformation, Agentic Systems, Financial AI
              </Link>
            </li>
            <li>
              <Link href="/services/agentic-ai-consulting">
                Agentic AI Consulting &amp; AI Agent Development
              </Link>
            </li>
            <li>
              <Link href="/industries/financial-services">
                AI for Financial Services
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Related Insights */}
      <section className="section">
        <h2>Related Insights</h2>
        <div className="prose">
          <ul>
            <li>
              <Link href="/insights/ai-coe-pharma-mlr-compliance">
                Building an AI Center of Excellence for Pharma — MLR Compliance from Day One
              </Link>
            </li>
            <li>
              <Link href="/insights/rag-eval-harness-not-vector-store">
                The RAG System That Matters Isn&rsquo;t the Vector Store — It&rsquo;s the Eval Harness
              </Link>
            </li>
            <li>
              <Link href="/insights/expert-lens-knowledge-encoding">
                The Expert Lens: Expert Knowledge Encoding for AI Market Intelligence
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
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

      {/* Other Industries */}
      <section className="section">
        <h2>Other Industries We Serve</h2>
        <div className="prose">
          <p>
            Enso Labs applies the same production-grade, compliance-first approach across regulated industries. We also build autonomous AI agents for financial services — including trading systems, market intelligence platforms, and MCP-connected brokerage integrations.
          </p>
          <ul>
            <li>
              <Link href="/industries/financial-services">
                Financial Services AI — Autonomous Trading, Market Intelligence, MCP Brokerage <Arrow />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <h2>Deploy Healthcare AI That&rsquo;s Compliant by Architecture</h2>
        <p>
          Whether you need an AI Center of Excellence, MLR-compliant content
          generation, or a full pharma AI transformation program — Enso Labs
          builds production systems for regulated environments. Start with a
          2-week AI Audit.
        </p>
        <Link href="/contact" className="cta">
          Get in Touch <Arrow />
        </Link>
      </section>
    </>
  );
}
