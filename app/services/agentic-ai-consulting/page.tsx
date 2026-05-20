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
  title: 'Agentic AI Consulting & AI Agent Development | Enso Labs NYC',
  description:
    'Agentic AI consulting and AI agent development for enterprises. Enso Labs builds production multi-agent systems, MCP servers, and autonomous AI workflows using Claude, LangGraph, and CrewAI. NYC-based, principal-led.',
  alternates: { canonical: 'https://ensolabs.ai/services/agentic-ai-consulting' },
  openGraph: {
    title: 'Agentic AI Consulting — Enso Labs | AI Agent Development & MCP Server Consulting',
    description:
      'Production agentic AI systems for enterprises. Multi-agent architectures, MCP servers, RAG systems, and autonomous workflows — built by a principal-led studio with shipped systems.',
    url: 'https://ensolabs.ai/services/agentic-ai-consulting',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Agentic AI Consulting — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agentic AI Consulting — Enso Labs | AI Agent Development & MCP Servers',
    description:
      'Production agentic AI for enterprises. Multi-agent systems, MCP servers, RAG — principal-led studio with shipped systems.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const FAQS = [
  {
    question: 'What is agentic AI consulting?',
    answer:
      'Agentic AI consulting is a specialized form of enterprise AI consulting focused on designing, building, and deploying autonomous AI agent systems. Unlike traditional AI implementations that respond to single prompts, agentic systems can plan multi-step workflows, use tools, retrieve knowledge, and take actions autonomously. Enso Labs provides agentic AI consulting that covers architecture design, agent development, eval harness construction, and production deployment.',
  },
  {
    question: 'What is an AI agent and how does it differ from a chatbot?',
    answer:
      'An AI agent is an autonomous system that can perceive its environment, reason about goals, use tools, and take actions without continuous human direction. Unlike chatbots that respond to one message at a time, AI agents can break complex tasks into sub-tasks, call APIs, query databases, generate documents, and coordinate with other agents. Enso Labs builds production AI agents using Claude API, LangGraph, and the Model Context Protocol (MCP).',
  },
  {
    question: 'What is MCP server consulting?',
    answer:
      'MCP (Model Context Protocol) server consulting involves designing and building custom MCP servers that connect AI agents to your internal tools, APIs, databases, and SaaS platforms. MCP servers create typed tool surfaces that Claude and other LLMs can invoke natively — turning any internal system into an AI-accessible capability. Enso Labs has built production MCP servers for brokerage APIs, market data providers, compliance systems, and enterprise SaaS.',
  },
  {
    question: 'What frameworks does Enso Labs use for agentic AI?',
    answer:
      'We build with LangGraph for complex multi-agent orchestration, Claude API for reasoning and tool use, CrewAI for role-based agent teams, Model Context Protocol (MCP) for tool integration, and N8N for workflow automation. The choice depends on the use case — LangGraph for stateful multi-step workflows, Claude API for single-agent tool use, MCP for enterprise system integration.',
  },
  {
    question: 'How long does it take to build an AI agent system?',
    answer:
      'A working prototype with a 2-week AI Audit. A production multi-agent system takes 8-14 weeks through our Pilot-to-Production engagement, including architecture design, eval harness, observability, guardrails, and team enablement. MCP server development is typically 2-6 weeks depending on API complexity.',
  },
  {
    question: 'Can you build AI agents for regulated industries?',
    answer:
      'Yes. We build compliance-ready agentic systems for financial services (SEC, FINRA), healthcare (FDA, MLR), and manufacturing. Every agent deployment includes audit trails, human-in-the-loop checkpoints, encryption, access controls, and responsible AI documentation aligned with the NIST AI Risk Management Framework.',
  },
];

export default function AgenticAIConsultingPage() {
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
        <h1>Agentic AI Consulting &amp; AI Agent Development</h1>
        <p className="sub-head">
          Agentic AI consulting is the practice of designing, building, and deploying
          autonomous AI agent systems that can plan, reason, use tools, and execute
          complex workflows. Enso Labs is a principal-led agentic AI consulting firm
          in New York that builds production multi-agent systems, MCP servers, and
          autonomous AI workflows using Claude, LangGraph, and CrewAI.
        </p>
      </section>

      {/* What We Build */}
      <section className="section">
        <h2>What Agentic AI Consulting Delivers</h2>
        <div className="prose">
          <p>
            Agentic AI goes beyond chatbots and copilots. An agentic system can
            decompose a business objective into sub-tasks, invoke tools and APIs,
            retrieve from knowledge bases, coordinate with other agents, and deliver
            completed work — with human oversight at critical decision points. This
            is the architecture that turns AI from a suggestion engine into an
            autonomous operator.
          </p>
          <p>
            Our agentic AI consulting practice delivers six core capabilities:
          </p>
          <ul>
            <li>
              <strong>Multi-Agent Architecture:</strong> LangGraph and CrewAI
              orchestration with ReAct agents, parallel tool callers, evaluator
              loops, and state management. Built for observability and rollback.
            </li>
            <li>
              <strong>MCP Server Development:</strong> Custom Model Context Protocol
              servers that connect AI agents to your internal APIs, databases,
              SaaS platforms, and compliance systems. Typed tool surfaces with
              schema validation and structured logging.
            </li>
            <li>
              <strong>Claude API Integration:</strong> Production Claude
              implementations with tool use, structured outputs, streaming,
              context window optimization, and cost management across Opus,
              Sonnet, and Haiku models.
            </li>
            <li>
              <strong>RAG &amp; Knowledge Systems:</strong> Domain-encoded retrieval
              systems with expert-graded eval suites, evidence-trail UX, and
              compliance-safe retrieval boundaries for regulated industries.
            </li>
            <li>
              <strong>Eval Harnesses &amp; Guardrails:</strong> Automated evaluation
              pipelines that measure agent accuracy, hallucination rates, tool-use
              correctness, and task completion — with regression testing on every deploy.
            </li>
            <li>
              <strong>Workflow Automation:</strong> N8N + Claude API + MCP for
              end-to-end business process automation — lead generation, research
              pipelines, compliance monitoring, and operational workflows running 24/7.
            </li>
          </ul>
        </div>
      </section>

      {/* Proof Points */}
      <section className="section">
        <h2>Production Agentic Systems We&rsquo;ve Shipped</h2>
        <div className="prose">
          <p>
            Every recommendation we make has been tested in our own production
            infrastructure first. Our track record includes:
          </p>
          <ul>
            <li>
              <strong>Enso Trading Terminal:</strong> Autonomous multi-agent
              trading platform with Claude-powered news analysis, MCP-connected
              brokerage APIs, options flow analytics, and crypto/DeFi strategy
              engines. Running in production with real capital.{' '}
              <Link href="/work/trading-terminal">Read the case study →</Link>
            </li>
            <li>
              <strong>AI Market Intelligence Platform:</strong> 9-rule expert
              knowledge encoding system for a Fortune 500 manufacturer with
              8 LangGraph stages, Claude-powered relevance ranking, and
              scientist-in-the-loop trust architecture.{' '}
              <Link href="/work/gore">Read the case study →</Link>
            </li>
            <li>
              <strong>AI Center of Excellence:</strong> MLR-compliant AI CoE
              for pharma with RAG retrieval grounded in FDA-approved brand
              knowledge bases, compressing campaign launches from 3 months to
              2 weeks.{' '}
              <Link href="/work/heller">Read the case study →</Link>
            </li>
            <li>
              <strong>signal2noise:</strong> Autonomous signal intelligence
              engine processing financial, AI, and technology signals daily —
              Claude-powered analysis with Perplexity-sourced research.{' '}
              <Link href="/insights">View on insights →</Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="section">
        <h2>How to Start an Agentic AI Engagement</h2>
        <div className="prose">
          <p>
            Three entry points, all fixed-fee and principal-led:
          </p>
          <ul>
            <li>
              <strong>2-Week AI Audit:</strong> Identify your highest-leverage
              agentic AI opportunity, build a working prototype, and deliver
              an architecture recommendation with cost modeling.
            </li>
            <li>
              <strong>12-Week Pilot-to-Production:</strong> Full agentic system
              build — from architecture design through production deployment
              with eval harness, governance, and team enablement.
            </li>
            <li>
              <strong>MCP Server Sprint (2–6 weeks):</strong> Standalone MCP
              server development for teams that need Claude connected to their
              internal tools and APIs.
            </li>
          </ul>
        </div>
        <Link href="/services" className="cta">
          See All Service Tracks <Arrow />
        </Link>
      </section>

      {/* Related Insights */}
      <section className="section">
        <h2>Related Insights</h2>
        <div className="prose">
          <ul>
            <li>
              <Link href="/insights/mcp-brokerage-trading-model-context-protocol">
                MCP for Brokerage: How Model Context Protocol Is Connecting AI to Trading
              </Link>
            </li>
            <li>
              <Link href="/insights/claude-partner-network-boutique-implementation">
                Why Boutique Firms Are the Right Claude Implementation Partner
              </Link>
            </li>
            <li>
              <Link href="/insights/principal-led-vs-50-person-consultancy">
                A Principal-Led Studio Outperforms a 50-Person Consultancy
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

      {/* CTA */}
      <section className="section cta-section">
        <h2>Build Agentic AI With a Team That Ships</h2>
        <p>
          Whether you need a single MCP server or a full multi-agent architecture,
          Enso Labs builds production agentic systems — not proof-of-concepts.
          Start with a 2-week AI Audit.
        </p>
        <Link href="/contact" className="cta">
          Get in Touch <Arrow />
        </Link>
      </section>
    </>
  );
}
