import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbSchema,
  faqSchema,
  orgSchema,
  productSchema,
} from '@/lib/schema';
import { url } from '@/lib/site';

export const metadata: Metadata = {
  title: 'AI Agents for Financial Services',
  description:
    'Production financial AI agents for banks, asset managers, and fintech. Claude + MCP + brokerage API integration. Built on the same architecture adopted by Goldman Sachs, JPMorgan, Citi, AIG, and Visa.',
  alternates: { canonical: '/industries/financial-services' },
  openGraph: {
    title: 'AI Agents for Financial Services — Enso Labs',
    description:
      'Production financial AI agents for banks, asset managers, and fintech. Claude + MCP + brokerage API. The same architecture in production at Goldman Sachs, JPMorgan, Citi, AIG, and Visa.',
    url: '/industries/financial-services',
  },
  twitter: {
    title: 'AI Agents for Financial Services — Enso Labs',
    description:
      'Production financial AI agents for banks, asset managers, and fintech. Claude + MCP + brokerage API integration.',
  },
};

const FAQ = [
  {
    question: 'What is a financial AI agent?',
    answer:
      'A financial AI agent is a production-grade autonomous system that uses a large language model — typically Claude — orchestrated through the Model Context Protocol (MCP) to read structured financial data, call brokerage and market-data APIs, reason over filings or research, and either surface a recommendation or execute a transaction under risk caps. It is distinct from a chatbot: the agent operates on real data, with audit logs, kill-switches, and a defined scope of authority.',
  },
  {
    question: 'How is this different from the agents Anthropic announced for banking?',
    answer:
      'Anthropic launched 10 pre-built agents for banking and trading — pitchbook builders, credit memo drafters, KYC automators, statement auditors, and compliance reviewers — alongside a $1.5B joint venture with Blackstone, Goldman Sachs, and Hellman and Friedman. Those agents are templates. Production deployment still requires architecture, data plumbing, governance, and integration into existing systems. Enso Labs has been running production financial agents on the same Claude + MCP + brokerage-API architecture since 2025.',
  },
  {
    question: 'What stack do you build on?',
    answer:
      'Claude API for reasoning and tool use. MCP for structured tool calls. Brokerage integrations include Alpaca, Public.com, and Interactive Brokers. Data plumbing in Python with LangGraph for multi-step workflows. AES-256-GCM at rest, TLS in transit, scoped credentials, and audit trails on every tool call. Compliance posture covers SOC 2, NYDFS 23 NYCRR 500, and where applicable SEC and FINRA recordkeeping requirements.',
  },
  {
    question: 'What use cases ship fastest?',
    answer:
      'Market intelligence and signal aggregation, document-heavy research workflows (earnings, filings, analyst notes), KYC/AML triage, options flow analysis as decision support, and brokerage execution under risk caps. Read-only intelligence ships in 4–8 weeks. Execution-bearing agents take 12–20 weeks because the kill-switch architecture is designed before the alpha logic.',
  },
  {
    question: 'How do you handle compliance for execution-bearing agents?',
    answer:
      'Risk caps, position sizing, and shut-off logic are designed before the alpha logic — not after. Every tool call is logged with a structured audit trail. Human-in-the-loop is the default for execution; full autonomy is opt-in, scope-limited, and reviewed weekly. We provide the documentation, model evaluation framework, and policy artifacts your compliance and legal teams will be asked for.',
  },
];

const SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': url('/industries/financial-services#service'),
  name: 'Financial AI Agents — Enso Labs',
  description:
    'Production AI agents for banks, asset managers, insurers, and fintech. Built on Claude with MCP-connected brokerage APIs, real-time signal processing, and audit-ready compliance posture.',
  provider: { '@id': url('/#organization') },
  serviceType: 'Financial AI Consulting',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'United States' },
    { '@type': 'Place', name: 'New York City' },
  ],
  audience: {
    '@type': 'BusinessAudience',
    audienceType: 'Financial Services Firms',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Financial AI Agent Engagements',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Market Intelligence Platform' },
        description: 'Real-time signal aggregation and synthesis with evidence-trail UX.',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Autonomous Trading Agents' },
        description: 'Claude + Alpaca/Public.com/Interactive Brokers. Strategy engines, execution layer, risk caps, kill switches.',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'MCP-Connected Brokerage Integration' },
        description: 'Model Context Protocol for financial APIs. Paper to live, structured tool calls, typed surfaces.',
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Compliance-Ready Agent Deployment' },
        description: 'Audit trails, encryption, access controls. Production-grade security for regulated environments.',
      },
    ],
  },
} as Record<string, unknown>;

export default function FinancialServicesPage() {
  return (
    <>
      <JsonLd
        schemas={[
          SERVICE_JSONLD,
          faqSchema(FAQ),
          orgSchema(),
          productSchema(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Industries', href: '/industries/financial-services' },
            { name: 'Financial Services', href: '/industries/financial-services' },
          ]),
        ]}
      />

      <style>{`
        .capsule { background: var(--bg-2); border: 1px solid var(--line); border-left: 3px solid var(--teal); padding: 24px 28px; border-radius: 6px; }
        .capsule p { font-size: 17px; line-height: 1.6; color: var(--fg); margin: 0; }
        .prose p { font-size: 16.5px; line-height: 1.7; color: var(--fg-2); margin-bottom: 18px; }
        .prose p strong { color: var(--fg); font-weight: 500; }
        .prose ul { list-style: none; display: grid; gap: 10px; padding-left: 0; margin-bottom: 24px; }
        .prose ul li { font-size: 16px; line-height: 1.6; color: var(--fg-2); padding-left: 20px; position: relative; }
        .prose ul li::before { content: '↳'; position: absolute; left: 0; color: var(--teal); font-family: var(--mono); font-size: 13px; top: 2px; }
        .pillar-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        @media (max-width: 800px) { .pillar-grid { grid-template-columns: 1fr; } }
        .pillar-cell { background: var(--bg); padding: 28px 26px; display: grid; gap: 10px; }
        .pillar-cell .ix { font-family: var(--mono); font-size: 11px; color: var(--teal); }
        .pillar-cell .ti { font-size: 21px; font-weight: 500; letter-spacing: -0.015em; }
        .pillar-cell .de { color: var(--fg-2); font-size: 14.5px; line-height: 1.55; }
        .faq-list { display: grid; gap: 0; }
        .faq-row { padding: 24px 0; border-bottom: 1px solid var(--line); }
        .faq-row:first-child { border-top: 1px solid var(--line); }
        .faq-row .q { font-size: 18px; font-weight: 500; letter-spacing: -0.01em; margin-bottom: 10px; color: var(--fg); }
        .faq-row .a { font-size: 15.5px; line-height: 1.65; color: var(--fg-2); }
      `}</style>

      <section className="hero" data-screen-label="01 Financial services hero" style={{ paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow"><span className="num">INDUSTRY / 01</span>&nbsp;Financial Services</span>
          </div>
          <h1 className="display reveal" data-delay="1" style={{ fontSize: 'clamp(40px, 7vw, 96px)' }}>
            AI agents for<br />
            <em>financial</em> <span className="accent">services.</span>
          </h1>
          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              Enso Labs designs and deploys production AI agents for financial services — from autonomous trading systems to market intelligence platforms — using Claude&rsquo;s financial services infrastructure with MCP-connected brokerage APIs. <strong style={{ color: 'var(--fg)' }}>The same architecture now in production at Goldman Sachs, JPMorgan, Citi, AIG, and Visa.</strong>
            </p>
            <div className="reveal" data-delay="3">
              <div className="mono-sm" style={{ display: 'grid', gap: 8 }}>
                <div>↳ Claude API · MCP · Alpaca · Public.com · IBKR</div>
                <div>↳ Trading Terminal in production since 2025</div>
                <div>↳ NYC-based · NYDFS 500 aware · SOC 2 path</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="02 Definition">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 01</span>&nbsp;Definition</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">A definition before the deck.</h2></div>
          </div>
          <div className="reveal capsule" style={{ maxWidth: 820, marginBottom: 32 }}>
            <p>
              A <strong>financial AI agent</strong> is a production-grade autonomous system that uses a large language model — typically Claude — orchestrated through the Model Context Protocol to read structured financial data, call brokerage and market-data APIs, reason over filings or research, and either surface a recommendation or execute a transaction under risk caps. It is not a chatbot. It runs on real data, with audit logs, scoped credentials, and a defined scope of authority.
            </p>
          </div>
          <div className="reveal prose" style={{ maxWidth: 820 }}>
            <p>
              The category covers more than trading. The fastest-shipping use cases in 2026 are <strong>market intelligence platforms</strong> that synthesize signals across earnings calls, filings, and analyst notes; <strong>document-heavy research workflows</strong> for credit memos, pitchbooks, and statement audits; <strong>KYC and AML triage</strong> that compresses analyst review cycles; <strong>options flow analysis</strong> as decision support, not black-box execution; and <strong>brokerage execution</strong> under explicit risk caps for desks running quantitative strategies.
            </p>
            <p>
              The unifying property is <strong>tool use under typed surfaces</strong>. Claude does not call a free-form HTTP endpoint. It calls an MCP tool with a typed schema, the tool does the work against a brokerage or data API, and the result returns as structured data the model can reason over again. That contract is the difference between a demo and a production system.
            </p>
          </div>
        </div>
      </section>

      <section data-screen-label="03 The Anthropic moment">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 02</span>&nbsp;The Anthropic moment</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">May 2026 reset the category.</h2></div>
          </div>
          <div className="reveal prose" style={{ maxWidth: 820 }}>
            <p>
              In May 2026 Anthropic launched <strong>10 pre-built financial AI agents</strong> — pitchbook builders, credit memo drafters, KYC automators, statement auditors, and compliance reviewers. They debuted Claude Opus 4.7 as the most capable model for financial work, leading the Vals AI Finance Agent benchmark. And they formed a <strong>$1.5B joint venture with Blackstone, Goldman Sachs, and Hellman and Friedman</strong> to embed Claude engineers directly inside mid-market companies.
            </p>
            <p>
              That announcement compresses two timelines. First, it ratifies an architecture — Claude plus MCP plus brokerage and data APIs — that smaller shops have been running for over a year. Second, it puts the category on every CIO and CRO planning slide for 2026 and 2027. Mid-market firms now have production-quality financial agents on the same platform powering Goldman Sachs, JPMorgan, Citi, AIG, and Visa.
            </p>
            <p>
              <strong>The gap between announcing AI agents and shipping them in production is where 93 percent of enterprise AI programs die.</strong> That gap is not a technology problem. It is a Strategy-to-Ship problem — sequencing, governance, integration, and the question of who is in the codebase at 2am when the first edge case hits. The firms that built production financial agents before the announcement have a structural advantage: they already know what works, what fails, and what compliance requires. Read the full analysis in our insight on{' '}
              <Link href="/insights/anthropic-financial-services-what-it-means" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>
                what the Anthropic financial services launch means
              </Link>.
            </p>
          </div>
        </div>
      </section>

      <section data-screen-label="04 Architecture">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 03</span>&nbsp;Architecture</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Claude + MCP + brokerage. The contract is the architecture.</h2></div>
          </div>
          <div className="reveal prose" style={{ maxWidth: 820 }}>
            <p>
              Every financial agent we build follows the same shape. <strong>Claude</strong> is the reasoning layer. <strong>MCP</strong> is the typed contract between the model and the outside world. <strong>Brokerage and market-data APIs</strong> — Alpaca, Public.com, Interactive Brokers, plus institutional data feeds — are the tools. <strong>LangGraph</strong> orchestrates multi-step workflows when a single tool call is not enough. <strong>Audit logs</strong> capture every tool call with input, output, latency, cost, and a stable correlation ID.
            </p>
            <p>
              The MCP contract matters more than the model choice. Tools are typed: a <code>place_equity_order</code> call has a schema for symbol, side, quantity, time-in-force, and risk-cap reference. The model cannot pass a free-form string to a brokerage API; it can only fill the typed surface. This is what makes risk caps enforceable rather than aspirational. The cap lives in the tool implementation, outside the model. The model can ask to trade above the cap; the tool will refuse. That asymmetry is the difference between an agent you can put on a desk and one you cannot.
            </p>
            <p>
              Security follows the same pattern. <strong>AES-256-GCM at rest, TLS in transit, scoped credentials per environment.</strong> Production credentials never reach the model context. Tools that touch capital are isolated to a subset of agents that pass an explicit human sign-off in development and an explicit allow-list in production.
            </p>
          </div>

          <div className="pillar-grid reveal" style={{ marginTop: 32 }}>
            <div className="pillar-cell">
              <span className="ix">01</span>
              <div className="ti">Claude (reasoning)</div>
              <p className="de">Opus and Sonnet for production reasoning. Tool-use, structured outputs, long-context analysis of filings and earnings.</p>
            </div>
            <div className="pillar-cell">
              <span className="ix">02</span>
              <div className="ti">MCP (the contract)</div>
              <p className="de">Typed tool surfaces. Risk caps live in the tool, not the prompt. Audit-friendly by construction.</p>
            </div>
            <div className="pillar-cell">
              <span className="ix">03</span>
              <div className="ti">Brokerage APIs</div>
              <p className="de">Alpaca, Public.com, Interactive Brokers. Paper to live with the same contract. Order types, position sizing, kill switches.</p>
            </div>
            <div className="pillar-cell">
              <span className="ix">04</span>
              <div className="ti">LangGraph (orchestration)</div>
              <p className="de">Multi-step workflows: research → synthesize → propose → review → execute. Each node observable and replayable.</p>
            </div>
            <div className="pillar-cell">
              <span className="ix">05</span>
              <div className="ti">Audit & observability</div>
              <p className="de">Every tool call logged with input, output, latency, cost. Stable correlation IDs across multi-agent runs.</p>
            </div>
            <div className="pillar-cell">
              <span className="ix">06</span>
              <div className="ti">Security posture</div>
              <p className="de">AES-256-GCM at rest, TLS in transit, scoped credentials, isolation between research and execution agents.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="05 Capabilities">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 04</span>&nbsp;Capabilities</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">What we ship for financial services firms.</h2></div>
          </div>

          <div className="pillar-grid reveal">
            <div className="pillar-cell">
              <span className="ix">01</span>
              <div className="ti">Market Intelligence Platforms</div>
              <p className="de">Real-time signal aggregation across earnings, filings, analyst notes, and alternative data. RWW scoring, evidence-trail UX so analysts can audit every claim. 10–16 weeks.</p>
            </div>
            <div className="pillar-cell">
              <span className="ix">02</span>
              <div className="ti">Autonomous Trading Agents</div>
              <p className="de">Claude + Alpaca/Public.com/Interactive Brokers. Strategy engines, execution layer, risk caps, kill switches. 12–20 weeks because the kill-switch is the architecture.</p>
            </div>
            <div className="pillar-cell">
              <span className="ix">03</span>
              <div className="ti">MCP-Connected Brokerage Integration</div>
              <p className="de">Typed tool surfaces for trading APIs. Paper to live with the same contract. 3–6 weeks for a single brokerage; longer for multi-broker fail-over.</p>
            </div>
            <div className="pillar-cell">
              <span className="ix">04</span>
              <div className="ti">Options Flow & Strategy Backtesting</div>
              <p className="de">Options Lab with IV surfaces, flow analytics, strategy testing. Decision support — not black box. 6–12 weeks.</p>
            </div>
            <div className="pillar-cell">
              <span className="ix">05</span>
              <div className="ti">Crypto/DeFi Signal Engines</div>
              <p className="de">Multi-exchange, multi-agent. Automated screening, position sizing, on-chain execution where appropriate. 8–14 weeks.</p>
            </div>
            <div className="pillar-cell">
              <span className="ix">06</span>
              <div className="ti">Compliance-Ready Deployment</div>
              <p className="de">Audit trails, encryption, access controls, model-evaluation framework. Built for regulated environments from day one. 4–8 weeks.</p>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="06 Case proof">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 05</span>&nbsp;Case proof</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Enso Trading Terminal — production since 2025.</h2></div>
          </div>
          <div className="reveal prose" style={{ maxWidth: 820 }}>
            <p>
              The Trading Terminal is the studio&rsquo;s own production financial agent. <strong>Autonomous signal intelligence and options trading platform.</strong> News-driven trading algorithms, multi-agent research automation, crypto/DeFi strategy engines, options flow analysis, brokerage API integration. AES-256-GCM encryption. Built before Anthropic&rsquo;s formal financial services launch — and running unattended every market session.
            </p>
            <p>
              The terminal exists for the same reason the engagement model exists: a principal-led studio cannot credibly sell financial AI it has not deployed itself. Every architecture choice in client engagements was first validated against capital we wrote ourselves. Risk caps were tuned against real drawdowns. Kill-switch logic was tested under real volatility regimes. <strong>The advisor and the build team are the same operator.</strong>
            </p>
            <p>
              Read the full case study at{' '}
              <Link href="/work/trading-terminal" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>
                /work/trading-terminal
              </Link>.
            </p>
          </div>
        </div>
      </section>

      <section data-screen-label="07 Compliance">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 06</span>&nbsp;Compliance</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">The kill-switch is the architecture. The audit log is the deliverable.</h2></div>
          </div>
          <div className="reveal prose" style={{ maxWidth: 820 }}>
            <p>
              Financial AI in regulated environments is not a content-moderation problem. It is a <strong>typed-tool problem with audit obligations</strong>. Compliance teams ask three questions: who authorized this action, what evidence supports it, and how do we recreate the state of the system at a point in time. We design for those questions on day one.
            </p>
            <ul>
              <li><strong>NYDFS 23 NYCRR 500</strong> aware — encryption, access controls, third-party risk, incident response artifacts.</li>
              <li><strong>SEC and FINRA</strong> recordkeeping for execution-bearing agents — every tool call captured with timestamps, inputs, outputs, and a stable correlation ID.</li>
              <li><strong>SOC 2</strong> path — controls inventory, logging architecture, vendor management documented from the first sprint.</li>
              <li><strong>Model risk management</strong> — eval harnesses with reference outputs, drift monitoring, regression tests on prompt changes, and rollback procedures.</li>
              <li><strong>Human-in-the-loop by default</strong> for execution. Full autonomy is opt-in, scope-limited, and reviewed weekly with the desk.</li>
            </ul>
            <p>
              Risk caps, position sizing, and shut-off logic are designed <strong>before</strong> the alpha logic, not after. That order matters. Retrofitting risk into a system designed around return is the most reliable way to ship something that cannot pass a control review.
            </p>
          </div>
        </div>
      </section>

      <section data-screen-label="08 FAQ">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 07</span>&nbsp;FAQ</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">What buyers ask before they sign.</h2></div>
          </div>

          <div className="faq-list reveal">
            {FAQ.map((row, i) => (
              <div key={i} className="faq-row">
                <div className="q">{row.question}</div>
                <p className="a">{row.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="09 CTA">
        <div className="shell">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Bring<br /><em>the desk.</em> <span className="accent">We&rsquo;ll ship.</span>
            </h2>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="lede">Read-only intelligence in 4–8 weeks. Execution-bearing agents in 12–20. Pricing aligned to scope, not seats.</p>
              <div className="hero-cta-row">
                <Link className="btn btn-primary" href="/contact">Get in Touch <Arrow /></Link>
                <Link className="btn" href="/work/trading-terminal">Trading Terminal case</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
