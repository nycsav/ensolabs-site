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
  title: 'Claude Managed Services & Implementation Partner',
  description:
    'Production Claude implementation and managed services for enterprises. Certified Anthropic partner with deployed Claude agents in financial services, healthcare, and B2B tech. NYC-based, principal-led.',
  alternates: { canonical: 'https://ensolabs.ai/services/claude-managed-services' },
  openGraph: {
    title: 'Claude Managed Services — Enso Labs | Certified Anthropic Implementation Partner',
    description:
      'Production Claude implementation for enterprises. MCP servers, agentic systems, eval harnesses, and compliance layers — deployed by a principal-led studio with shipped systems.',
    url: 'https://ensolabs.ai/services/claude-managed-services',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Claude Managed Services — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Managed Services — Enso Labs | Certified Anthropic Implementation Partner',
    description:
      'Production Claude implementation for enterprises. MCP servers, agentic systems, eval harnesses — deployed by a studio with shipped systems.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const FAQS = [
  {
    question: 'What are Claude managed services?',
    answer:
      'Claude managed services are end-to-end implementation, deployment, and operational support engagements for enterprises adopting Anthropic\'s Claude. This includes architecture design, MCP server development, eval harness construction, compliance layer integration, team enablement, and ongoing operational support — delivered by a certified Claude implementation partner.',
  },
  {
    question: 'How is Enso Labs different from Big 4 Claude partners?',
    answer:
      'Enso Labs is principal-led. The same senior advisor who scopes the engagement writes the MCP server and tunes the eval suite. There are no hand-offs, no account managers, and no layers between the client and the builder. We also run Claude-powered production systems ourselves — the Enso Trading Terminal, signal2noise, and MCP integrations — so every recommendation has been tested in our own infrastructure first.',
  },
  {
    question: 'What Claude certifications does Enso Labs hold?',
    answer:
      'Enso Labs holds Anthropic Claude Code certification and is credentialed in Claude API, MCP server development, and agentic systems architecture. Sav Banerjee is also a Perplexity AI Business Fellowship winner and Google AI certified.',
  },
  {
    question: 'What industries do you deploy Claude in?',
    answer:
      'Financial services (autonomous trading, market intelligence, compliance), healthcare and pharma (MLR-compliant AI centers of excellence), B2B technology (workflow automation, RAG systems), and advanced manufacturing (market intelligence platforms).',
  },
  {
    question: 'How long does a Claude implementation take?',
    answer:
      'A 2-week AI Audit delivers an opportunity map and working prototype. A full 12-week Pilot-to-Production engagement delivers a production system with governance, compliance, eval harnesses, and team enablement. MCP server development is typically 2–6 weeks depending on auth complexity and API surface area.',
  },
  {
    question: 'Can you build custom MCP servers for our internal tools?',
    answer:
      'Yes. MCP server development is a core deliverable. We build MCP servers that wrap your internal APIs, SaaS platforms, databases, and compliance systems into typed tool surfaces that Claude can invoke natively. This is the integration layer that makes agentic AI practical for enterprise workflows.',
  },
];

export default function ClaudeManagedServicesPage() {
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
            { name: 'Claude Managed Services', href: '/services/claude-managed-services' },
          ]),
        ]}
      />

      <section className="hero">
        <p className="label">Service</p>
        <h1>Claude Managed Services &amp; Implementation</h1>
        <p className="sub-head">
          Enso Labs is a certified Claude implementation partner that designs,
          deploys, and operates production Claude systems for enterprises — from
          MCP server development to multi-agent architectures to compliance-ready
          agentic workflows. Principal-led. Shipped systems, not slide decks.
        </p>
      </section>

      {/* ── What Claude Managed Services Include ── */}
      <section className="section">
        <h2>What Claude Managed Services Include</h2>
        <div className="prose">
          <p>
            Claude managed services is the full lifecycle of enterprise Claude
            adoption: architecture, implementation, deployment, and operational
            support. Unlike traditional consulting engagements that end with a
            roadmap, managed services means the same team that designs the system
            also ships it, monitors it, and iterates on it.
          </p>
          <p>
            The service spans six capabilities:
          </p>
          <ul>
            <li>
              <strong>Claude Architecture &amp; Strategy:</strong> System design
              for Claude-powered workflows — agent orchestration patterns,
              tool-use architecture, context window management, model selection
              (Opus, Sonnet, Haiku), and cost optimization.
            </li>
            <li>
              <strong>MCP Server Development:</strong> Custom Model Context
              Protocol servers that connect Claude to your internal tools,
              APIs, databases, and SaaS platforms. Typed tool surfaces with
              schema validation, auth handling, and structured logging.
            </li>
            <li>
              <strong>Agentic System Implementation:</strong> Multi-agent
              architectures using Claude API, LangGraph, and CrewAI —
              with eval harnesses, observability, hallucination guardrails,
              and rollback mechanisms built in from day one.
            </li>
            <li>
              <strong>RAG &amp; Knowledge Systems:</strong> Domain-encoded
              retrieval systems with expert-graded eval suites, evidence-trail
              UX, and compliance-safe retrieval boundaries.
            </li>
            <li>
              <strong>Compliance &amp; Governance:</strong> NIST AI RMF
              alignment, FDA/MLR compliance for pharma, SEC regulatory
              compliance for financial services, audit trail generation,
              and responsible AI documentation.
            </li>
            <li>
              <strong>Team Enablement &amp; CoE:</strong> Executive workshops,
              developer training cohorts, AI Center of Excellence design,
              and adoption measurement — so your team can operate the
              systems independently.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Why Principal-Led ── */}
      <section className="section">
        <h2>Why Principal-Led Claude Implementation Wins</h2>
        <div className="prose">
          <p>
            The Claude Partner Network includes the Big 4 consultancies and
            global system integrators. Their pitch is depth of bench. The
            reality is hand-offs: strategy decided in week 3 reaches
            engineering in week 9, refracted through three layers of partial
            context.
          </p>
          <p>
            A principal-led studio has structural advantages that a large bench
            cannot replicate:
          </p>
          <ul>
            <li>
              <strong>Direct senior access:</strong> No account managers. The
              principal who scopes the engagement is the same person who writes
              the code, tunes the eval suite, and presents to the board.
            </li>
            <li>
              <strong>Builder credibility:</strong> We run our own production
              Claude infrastructure — the Enso Trading Terminal, signal2noise,
              MCP servers in live environments. When we advise on architecture,
              we are describing systems we operate.
            </li>
            <li>
              <strong>Dogfooding:</strong> We use Claude to build our own
              products, run our own analytics, and manage our own operations.
              Every recommendation has been tested on ourselves first.
            </li>
            <li>
              <strong>Speed:</strong> A 50-person consultancy needs three weeks
              to staff a project. We deploy a working prototype in the same
              three weeks.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Proof Points ── */}
      <section className="section">
        <h2>Production Claude Systems We&rsquo;ve Shipped</h2>
        <div className="prose">
          <p>
            Enso Labs has been deploying production Claude systems since 2025 —
            before the formal Claude Partner Network launched. Our track record
            includes:
          </p>
          <ul>
            <li>
              <strong>Enso Trading Terminal:</strong> Autonomous trading platform
              with Claude-powered news analysis, multi-agent research, options
              flow analytics, and MCP-connected brokerage APIs. Running in
              production with real capital.{' '}
              <Link href="/work/trading-terminal">Read the case study →</Link>
            </li>
            <li>
              <strong>AI Market Intelligence Platform:</strong> 9-rule expert
              knowledge encoding system for a Fortune 500 manufacturer, with
              Claude-powered relevance ranking and scientist-in-the-loop trust
              architecture.{' '}
              <Link href="/work/gore">Read the case study →</Link>
            </li>
            <li>
              <strong>AI Center of Excellence (Pharma):</strong> MLR-compliant
              AI CoE that compressed campaign launches from 3 months to 2 weeks,
              with RAG retrieval grounded in FDA-approved brand knowledge bases.{' '}
              <Link href="/work/heller">Read the case study →</Link>
            </li>
            <li>
              <strong>MCP Server Development:</strong> Custom MCP servers for
              brokerage APIs, market data providers, compliance systems, and
              SaaS platforms — the integration layer that makes agentic AI
              practical.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Engagement Models ── */}
      <section className="section">
        <h2>Engagement Models</h2>
        <div className="prose">
          <p>
            Three ways to start. All fixed-fee, all principal-led:
          </p>
          <ul>
            <li>
              <strong>2-Week AI Audit:</strong> Discovery, opportunity map,
              prioritized backlog, and a working Claude prototype against your
              real data. Fixed fee, scoped before we start.
            </li>
            <li>
              <strong>12-Week Pilot-to-Production:</strong> The full
              Strategy-to-Ship Framework — diagnose, design, build, hand-off.
              Delivers a production system with governance, eval harness, and
              team enablement.
            </li>
            <li>
              <strong>Quarterly Embedded Retainer:</strong> Senior advisor +
              builder embedded with your team. Continuous shipping, architecture
              reviews, and CoE stewardship.
            </li>
          </ul>
        </div>
        <Link href="/services" className="cta">
          See All Service Tracks <Arrow />
        </Link>
      </section>

      {/* ── Related Insights ── */}
      <section className="section">
        <h2>Related Insights</h2>
        <div className="prose">
          <ul>
            <li>
              <Link href="/insights/claude-partner-network-boutique-implementation">
                Why Boutique Firms Are the Right Claude Implementation Partner
              </Link>
            </li>
            <li>
              <Link href="/insights/mcp-brokerage-trading-model-context-protocol">
                MCP for Brokerage: How Model Context Protocol Is Connecting AI to Trading
              </Link>
            </li>
            <li>
              <Link href="/insights/principal-led-vs-50-person-consultancy">
                A Principal-Led Studio Outperforms a 50-Person Consultancy on Shipped Systems
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

      {/* ── CTA ── */}
      <section className="section cta-section">
        <h2>Deploy Claude With a Partner Who&rsquo;s Already Shipped</h2>
        <p>
          Whether you need MCP servers, multi-agent architectures, or a full
          Claude Center of Excellence — Enso Labs builds production systems,
          not proof-of-concepts. Start with a 2-week AI Audit.
        </p>
        <Link href="/contact" className="cta">
          Get in Touch <Arrow />
        </Link>
      </section>
    </>
  );
}
