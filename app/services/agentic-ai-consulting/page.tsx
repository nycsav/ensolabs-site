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
  title: 'Agentic AI Consulting NYC | Agentic Systems Strategy & Development',
  description:
    'NYC-based agentic AI consulting studio. We design, build, and ship production agentic systems — multi-agent architectures, MCP integrations, and autonomous workflows for enterprises. Principal-led, shipped systems.',
  alternates: { canonical: 'https://ensolabs.ai/services/agentic-ai-consulting' },
  openGraph: {
    title: 'Agentic AI Consulting — Enso Labs | NYC Agentic Systems Studio',
    description:
      'Production agentic systems for enterprises. Multi-agent architectures, MCP servers, autonomous workflows — designed and shipped by a principal-led NYC studio.',
    url: 'https://ensolabs.ai/services/agentic-ai-consulting',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Agentic AI Consulting — Enso Labs NYC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic AI Consulting — Enso Labs | NYC Agentic Systems Studio',
    description:
      'Production agentic systems for enterprises. Multi-agent architectures, MCP servers, autonomous workflows — principal-led, NYC-based.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const FAQS = [
  {
    question: 'What is agentic AI consulting?',
    answer:
      'Agentic AI consulting is the practice of designing, building, and deploying autonomous AI systems — called agents — that can plan, reason, use tools, and execute multi-step workflows without constant human supervision. Unlike traditional AI consulting that delivers models or dashboards, agentic AI consulting delivers production systems that act: researching, deciding, and executing tasks end-to-end. Enso Labs is an agentic AI consulting studio based in New York City.',
  },
  {
    question: 'What is an agentic system?',
    answer:
      'An agentic system is a software architecture where one or more AI agents coordinate to complete complex tasks autonomously. Each agent can reason about its goals, select and invoke tools (APIs, databases, MCP servers), handle errors, and pass results to downstream agents. Agentic systems differ from simple chatbots or prompt chains because they maintain state, make decisions, and can operate with minimal human intervention in production environments.',
  },
  {
    question: 'How is Enso Labs different from other agentic AI consultants in NYC?',
    answer:
      'Enso Labs is principal-led — the founder and senior advisor who scopes the engagement is the same person who writes the code, tunes the eval suite, and ships to production. We also run our own agentic systems in production: the Enso Trading Terminal processes live market data 24/7, and signal2noise generates daily intelligence using multi-agent pipelines. When we consult on agentic architecture, we are describing systems we operate ourselves, not theoretical frameworks.',
  },
  {
    question: 'What agentic AI frameworks does Enso Labs use?',
    answer:
      'We build with LangGraph, CrewAI, Claude API with tool use, and Model Context Protocol (MCP) — selecting the framework that fits the use case. LangGraph for complex stateful workflows with branching logic. MCP for enterprise tool integration. Claude tool-use for single-agent tasks that need reliability. We also build custom orchestration layers when off-the-shelf frameworks add unnecessary complexity.',
  },
  {
    question: 'How long does an agentic AI engagement take?',
    answer:
      'A 2-week AI Audit delivers an opportunity map, architecture recommendation, and a working agentic prototype against your real data. A 12-week Pilot-to-Production engagement delivers a production agentic system with governance, eval harnesses, observability, and team enablement. MCP server development is typically 2–6 weeks. Quarterly embedded retainers provide continuous agentic system development and operations.',
  },
  {
    question: 'What industries does Enso Labs build agentic systems for?',
    answer:
      'Financial services (autonomous trading, market intelligence, compliance automation), healthcare and pharma (MLR-compliant AI workflows, regulatory document processing), B2B technology (sales automation, customer research agents), and advanced manufacturing (supply chain intelligence, market radar systems). All engagements are principal-led and production-focused.',
  },
  {
    question: 'What is Model Context Protocol and why does it matter for agentic AI?',
    answer:
      'Model Context Protocol (MCP) is an open standard created by Anthropic that lets AI agents connect to external tools, APIs, and data sources through a typed interface. MCP is critical for enterprise agentic AI because it provides structured tool invocation, schema validation, auth handling, and logging — making AI tool-use auditable and production-safe. Enso Labs builds custom MCP servers as a core deliverable in agentic consulting engagements.',
  },
];

export default function AgenticAiConsultingPage() {
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
            { name: 'Agentic AI Consulting', href: '/services/agentic-ai-consulting' },
          ]),
        ]}
      />

      <section className="hero">
        <p className="label">Service</p>
        <h1>Agentic AI Consulting &amp; Systems Development</h1>
        <p className="sub-head">
          Enso Labs is a New York City agentic AI consulting studio that designs,
          builds, and ships production agentic systems — multi-agent architectures,
          MCP integrations, and autonomous workflows that execute real work.
          Principal-led. Shipped systems, not slide decks.
        </p>
      </section>

      {/* ── What Is Agentic AI ── */}
      <section className="section">
        <h2>What Agentic AI Systems Do</h2>
        <div className="prose">
          <p>
            Agentic AI is the next evolution beyond chatbots and copilots. Where
            traditional AI answers questions, agentic AI completes tasks — planning
            multi-step workflows, invoking tools and APIs, handling exceptions, and
            delivering results without constant human prompting.
          </p>
          <p>
            An agentic system is a production architecture where AI agents coordinate
            autonomously to solve complex business problems. Enso Labs designs these
            systems across four capability layers:
          </p>
          <ul>
            <li>
              <strong>Multi-Agent Orchestration:</strong> Coordinated agent teams
              using LangGraph and CrewAI — with state management, branching logic,
              retry handling, and human-in-the-loop checkpoints.
            </li>
            <li>
              <strong>MCP Server Development:</strong> Custom Model Context Protocol
              servers that connect agents to your internal tools, APIs, databases,
              and SaaS platforms — the typed integration layer that makes agentic AI
              enterprise-ready.
            </li>
            <li>
              <strong>Autonomous Workflows:</strong> End-to-end task execution —
              from research and analysis to document generation and system updates —
              with observability, audit trails, and rollback mechanisms.
            </li>
            <li>
              <strong>Eval &amp; Governance:</strong> Production eval harnesses,
              hallucination guardrails, compliance layers (NIST AI RMF, FDA/MLR,
              SEC), and responsible AI documentation built in from day one.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Why NYC / Why Enso ── */}
      <section className="section">
        <h2>Why Enterprises Choose a Principal-Led Agentic AI Studio</h2>
        <div className="prose">
          <p>
            Most agentic AI consulting is delivered by large firms that separate
            strategy from implementation — the partner who sells the engagement
            never touches the codebase. By the time requirements reach an
            engineering team, context has eroded across three handoffs.
          </p>
          <p>
            A principal-led studio eliminates this failure mode:
          </p>
          <ul>
            <li>
              <strong>Same person, strategy to code:</strong> The senior advisor
              who designs the architecture also builds the agents, writes the MCP
              servers, and deploys to production. Zero context loss.
            </li>
            <li>
              <strong>Production-tested patterns:</strong> We run our own agentic
              systems — the Enso Trading Terminal operates 24/7 on live markets,
              and signal2noise generates daily intelligence via multi-agent
              pipelines. Our consulting recommendations come from systems we operate.
            </li>
            <li>
              <strong>NYC-based, on-site capable:</strong> Based at 31 Union Square
              West in Manhattan. Available for on-site workshops, executive briefings,
              and embedded team engagements across the New York metro area and
              nationwide.
            </li>
            <li>
              <strong>Speed advantage:</strong> A 50-person consultancy needs three
              weeks to staff a project. We deploy a working agentic prototype in
              the same three weeks — against your real data, not synthetic demos.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Proof Points ── */}
      <section className="section">
        <h2>Agentic Systems We&rsquo;ve Shipped</h2>
        <div className="prose">
          <p>
            Enso Labs has been building production agentic systems since 2022.
            Our shipped track record includes:
          </p>
          <ul>
            <li>
              <strong>Enso Trading Terminal:</strong> Autonomous trading platform
              with multi-agent research, news-driven signal analysis, options flow
              analytics, and MCP-connected brokerage APIs. Running in production
              with real capital.{' '}
              <Link href="/work/trading-terminal">Read the case study →</Link>
            </li>
            <li>
              <strong>AI Market Intelligence Platform:</strong> 8-stage LangGraph
              pipeline with 4 parallel fetchers and ReAct agents for a Fortune 500
              manufacturer — 731 documents processed, 16 market signals surfaced,
              AES-256-GCM encrypted.{' '}
              <Link href="/work/gore">Read the case study →</Link>
            </li>
            <li>
              <strong>AI Center of Excellence (Pharma):</strong> 8 active agentic
              automations across 5 brand teams, compressing campaign launches from
              3 months to 2 weeks with FDA/MLR compliance preserved.{' '}
              <Link href="/work/heller">Read the case study →</Link>
            </li>
            <li>
              <strong>signal2noise Intelligence Engine:</strong> Daily multi-agent
              content pipeline that researches, analyzes, and publishes AI industry
              intelligence — live at{' '}
              <a href="https://signals.ensolabs.ai" target="_blank" rel="noopener">
                signals.ensolabs.ai
              </a>.
            </li>
          </ul>
        </div>
      </section>

      {/* ── Engagement Models ── */}
      <section className="section">
        <h2>Agentic AI Engagement Models</h2>
        <div className="prose">
          <p>
            Three ways to start. All fixed-fee, all principal-led:
          </p>
          <ul>
            <li>
              <strong>2-Week AI Audit:</strong> Discovery, opportunity map,
              architecture recommendation, and a working agentic prototype against
              your real data. Fixed fee, scoped before we start.
            </li>
            <li>
              <strong>12-Week Pilot-to-Production:</strong> The full
              Strategy-to-Ship Framework — diagnose, design, build, hand-off.
              Delivers a production agentic system with governance, eval harness,
              observability, and team enablement.
            </li>
            <li>
              <strong>Quarterly Embedded Retainer:</strong> Senior advisor +
              builder embedded with your team. Continuous agentic system
              development, architecture reviews, and operational support.
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
              <Link href="/insights/agentic-ai-enterprise-what-works">
                Agentic AI in the Enterprise: What Actually Works in Production
              </Link>
            </li>
            <li>
              <Link href="/insights/principal-led-vs-50-person-consultancy">
                A Principal-Led Studio Outperforms a 50-Person Consultancy on Shipped Systems
              </Link>
            </li>
            <li>
              <Link href="/insights/mcp-brokerage-trading-model-context-protocol">
                MCP for Brokerage: How Model Context Protocol Is Connecting AI to Trading
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
        <h2>Build Agentic Systems With a Studio That Ships Them</h2>
        <p>
          Whether you need multi-agent orchestration, MCP server development, or
          a full agentic AI program — Enso Labs builds production systems, not
          proof-of-concepts. Start with a 2-week AI Audit.
        </p>
        <Link href="/contact" className="cta">
          Get in Touch <Arrow />
        </Link>
      </section>
    </>
  );
}
