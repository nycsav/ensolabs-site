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
  title: 'AI Agents for Financial Services',
  description:
    'Production financial AI agents for banks, asset managers, and fintech. Claude + MCP + brokerage API integration. Enso Labs builds autonomous trading systems and market intelligence platforms.',
  alternates: { canonical: '/industries/financial-services' },
  openGraph: {
    title: 'AI Agents for Financial Services — Enso Labs',
    description:
      'Production financial AI agents for banks, asset managers, and fintech. Claude + MCP + brokerage API integration.',
    url: '/industries/financial-services',
  },
};

const FAQS = [
  {
    question: 'What is a financial AI agent?',
    answer:
      'A financial AI agent is an autonomous software system that can perceive market conditions, reason about financial data, and take actions — such as executing trades, generating research reports, or monitoring compliance — without continuous human intervention. Unlike traditional algorithmic trading, AI agents use large language models to interpret unstructured data (earnings calls, news, filings) alongside structured market data.',
  },
  {
    question: 'How does Claude integrate with brokerage APIs?',
    answer:
      'Claude connects to brokerage platforms through the Model Context Protocol (MCP). MCP servers wrap brokerage REST APIs (Alpaca, Interactive Brokers, Schwab) into tool definitions that Claude can invoke natively. This means Claude can check positions, submit orders, retrieve account data, and monitor fills as part of its reasoning loop — with full audit trails.',
  },
  {
    question: 'Is AI-driven trading compliant with SEC regulations?',
    answer:
      'AI-driven trading systems must comply with the same regulations as any automated trading system: SEC Rule 15c3-5 (market access risk controls), Regulation SHO (short selling), and best execution requirements. Enso Labs builds compliance layers into every agent — including pre-trade risk checks, position limits, audit logging, and kill switches. The human-in-the-loop remains accountable for all trading decisions.',
  },
  {
    question: 'What is the Enso Trading Terminal?',
    answer:
      'The Enso Trading Terminal is a production autonomous trading platform built by Enso Labs. It includes news-driven trading algorithms, multi-agent research automation, crypto and DeFi strategy engines, options flow analysis, and brokerage API integration. Security is production-grade: AES-256-GCM encryption for credentials, scoped API permissions, and real-time monitoring.',
  },
  {
    question: 'How much does it cost to build a financial AI agent?',
    answer:
      'A production financial AI agent engagement with Enso Labs starts with a 2-week AI Audit ($15K–$25K) to map opportunities and build a working prototype. A full 12-week Pilot-to-Production engagement ($75K–$150K) delivers a production system with governance, compliance layers, and team enablement. Ongoing embedded support is available as a quarterly retainer.',
  },
];

export default function FinancialServicesPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          professionalServiceSchema(),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Industries', href: '/industries/financial-services' },
            { name: 'Financial Services', href: '/industries/financial-services' },
          ]),
        ]}
      />

      <section className="hero">
        <p className="label">Industry</p>
        <h1>AI Agents for Financial Services</h1>
        <p className="sub-head">
          Enso Labs designs and deploys production AI agents for financial
          services — from autonomous trading systems to market intelligence
          platforms — using Claude&rsquo;s financial services infrastructure with
          MCP-connected brokerage APIs.
        </p>
      </section>

      {/* ── What Financial AI Agents Do ── */}
      <section className="section">
        <h2>What Financial AI Agents Do</h2>
        <div className="prose">
          <p>
            Financial AI agents are autonomous systems that perceive market
            conditions, reason about financial data, and take actions — executing
            trades, generating research, monitoring compliance — without
            continuous human intervention. They represent a fundamental shift
            from rules-based automation to reasoning-based autonomy.
          </p>
          <p>
            Traditional algorithmic trading systems execute pre-programmed
            strategies. They follow if/then logic: if the 50-day moving average
            crosses the 200-day, buy. Financial AI agents are different. They
            read earnings call transcripts, interpret breaking news, analyze SEC
            filings, cross-reference options flow with sentiment data, and decide
            whether the setup warrants action — all within a single reasoning
            loop.
          </p>
          <p>
            The practical applications span the financial services value chain:
          </p>
          <ul>
            <li>
              <strong>Autonomous trading:</strong> News-driven entry/exit
              decisions, multi-timeframe analysis, options strategy selection,
              and position sizing — with pre-trade risk checks and kill switches.
            </li>
            <li>
              <strong>Market intelligence:</strong> Real-time synthesis of
              research from McKinsey, Goldman, JPMorgan, and 30+ Tier 1 sources
              into actionable briefings for portfolio managers and analysts.
            </li>
            <li>
              <strong>Compliance monitoring:</strong> Continuous surveillance of
              trading activity, communications, and positions against regulatory
              thresholds — flagging violations before they become enforcement
              actions.
            </li>
            <li>
              <strong>Client reporting:</strong> Automated generation of
              performance attribution, risk decomposition, and portfolio
              commentary — at the quality level of a senior analyst, at the
              speed of software.
            </li>
            <li>
              <strong>Research automation:</strong> Multi-agent pipelines that
              ingest alternative data, run quantitative screens, generate
              investment theses, and present findings in structured formats ready
              for investment committee review.
            </li>
          </ul>
          <p>
            The key distinction: these agents don&rsquo;t just process data.
            They reason about it. They weigh conflicting signals, assess
            confidence levels, and explain their logic — the same cognitive
            workflow a senior analyst performs, but at machine speed and scale.
          </p>
        </div>
      </section>

      {/* ── The Claude + MCP Architecture ── */}
      <section className="section">
        <h2>The Claude + MCP Architecture for Banking</h2>
        <div className="prose">
          <p>
            The Model Context Protocol (MCP) is the integration layer that makes
            financial AI agents practical. Developed by Anthropic, MCP provides a
            standardized way for Claude to connect to external systems — brokerage
            APIs, market data feeds, compliance databases, CRM platforms — through
            typed tool definitions with full schema validation.
          </p>
          <p>
            In a financial services context, this architecture looks like:
          </p>
          <ul>
            <li>
              <strong>MCP servers</strong> wrap brokerage REST APIs (Alpaca,
              Interactive Brokers, Schwab, TD Ameritrade) into tool definitions
              that Claude can invoke natively. Claude can check positions, submit
              orders, retrieve account balances, and monitor fills as part of its
              reasoning loop.
            </li>
            <li>
              <strong>Market data MCP servers</strong> connect to real-time and
              historical data providers (Bloomberg, Polygon, Alpha Vantage,
              Yahoo Finance) — giving Claude access to price data, options
              chains, earnings calendars, and economic indicators.
            </li>
            <li>
              <strong>Compliance MCP servers</strong> integrate with internal
              compliance systems — pre-trade checks, restricted lists, position
              limits, and regulatory reporting feeds.
            </li>
            <li>
              <strong>Research MCP servers</strong> connect to document stores,
              Notion databases, and vector search indexes — enabling Claude to
              retrieve and cite relevant prior research, filings, and internal
              memos during its reasoning process.
            </li>
          </ul>
          <p>
            The result is a single reasoning agent that can read a news article
            about an FDA approval, check the options chain for the relevant
            ticker, verify it&rsquo;s not on the restricted list, calculate
            position sizing against the portfolio risk budget, and submit the
            order — all in one agentic loop with full audit logging.
          </p>
          <p>
            Every MCP tool call is logged with inputs, outputs, timestamps, and
            the reasoning context that triggered it. This creates the audit trail
            that compliance teams need — not just what the agent did, but why it
            decided to do it.
          </p>
        </div>
      </section>

      {/* ── Anthropic Financial Services Launch ── */}
      <section className="section">
        <h2>Anthropic&rsquo;s Financial Services Infrastructure</h2>
        <div className="prose">
          <p>
            In May 2026, Anthropic announced a dedicated financial services
            initiative: 10 purpose-built AI agents for banking, asset management,
            and insurance, backed by a $1.5 billion joint venture with Blackstone
            and Goldman Sachs. This infrastructure represents the largest
            enterprise commitment to agentic AI in financial services to date.
          </p>
          <p>
            The 10 agents span the financial services value chain: trade
            execution, risk analysis, compliance monitoring, client onboarding,
            portfolio construction, research synthesis, regulatory reporting,
            fraud detection, credit underwriting, and wealth advisory. Each agent
            is built on Claude with MCP integrations to the standard platforms
            that banks and asset managers already run.
          </p>
          <p>
            For Enso Labs, this validates the architecture we&rsquo;ve been
            building since 2024. The Enso Trading Terminal — our production
            autonomous trading platform — uses the same Claude + MCP pattern
            that Anthropic is now standardizing for the industry. Our clients
            get the benefit of having run this architecture in production before
            the official financial services launch.
          </p>
          <p>
            What this means practically: financial institutions evaluating AI
            agents now have an enterprise-grade foundation from Anthropic, and a
            proven implementation partner in Enso Labs that has already deployed
            the architecture.
          </p>
        </div>
      </section>

      {/* ── Enso Trading Terminal ── */}
      <section className="section">
        <h2>Proof of Architecture: The Enso Trading Terminal</h2>
        <div className="prose">
          <p>
            The Enso Trading Terminal is not a client project. It&rsquo;s our own
            production trading infrastructure — the system Enso Labs built for
            itself to run autonomous financial AI in live markets. We use the same
            architecture for client deployments because we&rsquo;ve already
            stress-tested it with real capital.
          </p>
          <p>
            The Terminal includes:
          </p>
          <ul>
            <li>
              <strong>News-driven trading algorithms:</strong> Claude reads
              breaking news, earnings releases, and macro events, then evaluates
              whether the information creates a tradeable setup — factoring in
              current positions, risk limits, and market microstructure.
            </li>
            <li>
              <strong>Multi-agent research automation:</strong> A pipeline of
              specialized agents — one for data collection, one for quantitative
              analysis, one for thesis generation, one for risk assessment —
              that collaborate to produce investment research at analyst quality.
            </li>
            <li>
              <strong>Crypto and DeFi strategy engines:</strong> Autonomous
              agents for yield farming, liquidity provision, and cross-chain
              arbitrage with real-time gas optimization and slippage management.
            </li>
            <li>
              <strong>Options flow analysis:</strong> Real-time monitoring of
              unusual options activity, volatility surface modeling, and
              automated strategy selection (spreads, straddles, condors) based
              on the current market regime.
            </li>
            <li>
              <strong>Production-grade security:</strong> AES-256-GCM encryption
              for all credentials, scoped API permissions with least-privilege
              access, real-time monitoring, and automated kill switches.
            </li>
          </ul>
        </div>
        <Link href="/work/trading-terminal" className="cta">
          Read the Full Case Study <Arrow />
        </Link>
      </section>

      {/* ── Compliance ── */}
      <section className="section">
        <h2>Compliance Considerations</h2>
        <div className="prose">
          <p>
            Every financial AI agent Enso Labs deploys includes compliance
            infrastructure as a first-class concern — not a bolt-on after the
            fact. The regulatory landscape for AI in financial services is
            evolving, and the systems we build are designed to exceed current
            requirements.
          </p>
          <ul>
            <li>
              <strong>Pre-trade risk controls:</strong> Position limits, notional
              limits, order rate limits, and restricted list checks — enforced at
              the MCP server layer before any order reaches the brokerage API.
            </li>
            <li>
              <strong>Audit trails:</strong> Every agent action — every tool
              call, every reasoning step, every decision — is logged with
              timestamps, inputs, outputs, and the full context window that
              informed the decision. This creates the explainability that
              regulators require.
            </li>
            <li>
              <strong>Human-in-the-loop:</strong> Configurable approval gates at
              any point in the agent workflow. High-value trades, new strategy
              deployments, and compliance-sensitive actions can require human
              approval before execution.
            </li>
            <li>
              <strong>Kill switches:</strong> Real-time monitoring with automated
              circuit breakers. If an agent exceeds loss limits, position
              concentration limits, or behavioral anomaly thresholds, it halts
              automatically and alerts the human operator.
            </li>
            <li>
              <strong>Regulatory alignment:</strong> Systems are built to comply
              with SEC Rule 15c3-5 (market access controls), Regulation SHO,
              MiFID II (for European operations), and best execution
              requirements. Documentation packages are included for compliance
              team review.
            </li>
          </ul>
          <p>
            The fundamental principle: AI agents amplify human judgment, they do
            not replace human accountability. Every agent has a named human
            operator who is responsible for its behavior.
          </p>
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
        <h2>Build Your Financial AI Infrastructure</h2>
        <p>
          Whether you need an autonomous trading system, a market intelligence
          platform, or a compliance-ready AI architecture — Enso Labs builds
          what the incumbents can&rsquo;t. Start with a 2-week AI Audit.
        </p>
        <Link href="/contact" className="cta">
          Get in Touch <Arrow />
        </Link>
      </section>
    </>
  );
}
