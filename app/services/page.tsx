import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbSchema,
  faqSchema,
  professionalServiceSchema,
} from '@/lib/schema';

const SERVICES_FAQ = [
  {
    question: 'What is AI transformation consulting?',
    answer:
      'AI transformation consulting helps enterprises convert AI ambition into commercial outcomes. The work spans strategy and roadmapping, AI readiness and maturity assessments, executive workshops, business case and ROI modeling, change management, and responsible-AI governance — anchored on the Strategy-to-Ship Framework.',
  },
  {
    question: 'What are agentic systems?',
    answer:
      'Agentic systems are production AI workflows where autonomous agents — built on LangGraph, CrewAI, the Claude API, and the Model Context Protocol — orchestrate tools, retrieve from RAG knowledge bases, and ship work end-to-end. Enso Labs builds them with eval harnesses, observability, and rollback baked in from day one.',
  },
  {
    question: 'How long does a typical engagement take?',
    answer:
      '12–24 weeks for full Strategy-to-Ship engagements, with 2-week diagnostics available as a fixed-fee starting point.',
  },
  {
    question: 'What industries do you work with?',
    answer:
      'Healthcare and Pharma, Financial Services, B2B Technology, and Advanced Manufacturing.',
  },
  {
    question: 'What certifications does Enso Labs hold?',
    answer:
      'Anthropic (Claude Code), Google AI, OpenAI. Sav Banerjee is also a Perplexity AI Business Fellowship winner and member of Perplexity Business.',
  },
];

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Enso Labs offers three integrated service tracks: AI Transformation Consulting, Agentic Systems & Products, and Financial AI & Trading Intelligence.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services — Enso Labs | AI Consulting, Agentic Systems, Financial AI',
    description:
      'Three integrated tracks: AI Transformation Consulting, Agentic Systems & Products, and Financial AI & Trading Intelligence.',
    url: '/services',
  },
  twitter: {
    title: 'Services — Enso Labs | AI Consulting, Agentic Systems, Financial AI',
    description:
      'Three integrated tracks: AI Transformation Consulting, Agentic Systems & Products, and Financial AI & Trading Intelligence.',
  },
};

type Track = {
  id: string;
  num: string;
  pill: string;
  pillTeal?: boolean;
  title: string;
  lede: React.ReactNode;
  tags: { label: string; teal?: boolean }[];
  deliverables: { ix: string; ti: string; de: string; ta: string }[];
};

const TRACKS: Track[] = [
  {
    id: 'consult',
    num: 'TRACK / 01',
    pill: 'CONSULT',
    title: 'AI Transformation Consulting.',
    lede: <>Strategy, roadmaps, and governance for executive teams turning AI ambition into commercial growth. Built around the <b style={{ color: 'var(--fg)' }}>Strategy-to-Ship Framework</b>.</>,
    tags: [
      { label: 'Strategy' }, { label: 'Roadmapping' }, { label: 'Workshops' }, { label: 'ROI modeling' }, { label: 'Governance' },
    ],
    deliverables: [
      { ix: '01', ti: 'AI Strategy & Roadmapping', de: '12-month commercial AI roadmap rooted in business case, sized by ROI, and sequenced for pilot-to-production conversion.', ta: '6–10 wk' },
      { ix: '02', ti: 'AI Readiness & Maturity Assessment', de: 'Technical discovery, data audit, organizational scorecard. Where you are vs. where the deck says you are.', ta: '2–4 wk' },
      { ix: '03', ti: 'Executive Workshops & Cohorts', de: '8–15 person cohorts. Hands-on with Claude, Gemini, GPT-4, MCP, and N8N. Decision-makers leave with a working artifact.', ta: '1–2 days' },
      { ix: '04', ti: 'Business Case & ROI Modeling', de: 'Defensible business case with sensitivity analysis. The version your CFO will actually sign.', ta: '3–5 wk' },
      { ix: '05', ti: 'Responsible-AI Governance', de: 'NIST AI RMF · FDA / MLR / PRC compliance · model evaluation framework · policy & documentation.', ta: '4–8 wk' },
      { ix: '06', ti: 'Change Management & Adoption', de: 'Org design, comms, enablement curriculum. Measured by adoption and value realized — not seats sold.', ta: '8–16 wk' },
    ],
  },
  {
    id: 'build',
    num: 'TRACK / 02',
    pill: 'BUILD',
    pillTeal: true,
    title: 'Agentic Systems & Products.',
    lede: <>We architect, build, and ship the production systems your strategy depends on. Same operator, no hand-off from advisor to engineer.</>,
    tags: [
      { label: 'LangGraph', teal: true }, { label: 'Claude API', teal: true }, { label: 'MCP', teal: true },
      { label: 'CrewAI' }, { label: 'N8N' }, { label: 'RAG' }, { label: 'Python' },
    ],
    deliverables: [
      { ix: '07', ti: 'Multi-Agent Architecture', de: 'LangGraph / CrewAI orchestration. ReAct agents, parallel fetchers, evaluator loops. Built for observability and rollback.', ta: '8–14 wk' },
      { ix: '08', ti: 'RAG Knowledge Systems', de: 'Domain-encoded retrieval. Eval harnesses, hallucination guardrails, evidence-trail UX. Tuned for expert review.', ta: '6–10 wk' },
      { ix: '09', ti: 'Workflow Automation', de: 'N8N + Claude API + scheduled tasks. Lead gen, research pipelines, ops automation. Quietly running 24/7.', ta: '3–6 wk' },
      { ix: '10', ti: 'MCP Server Development', de: 'Model Context Protocol servers, tool integrations, custom connectors for Claude & Perplexity Computer.', ta: '2–6 wk' },
      { ix: '11', ti: 'AI Center of Excellence', de: 'CoE design, knowledge bases, brand-safe templates, governance, enablement curriculum. Heller-grade.', ta: '12–24 wk' },
      { ix: '12', ti: 'Custom AI Products', de: 'End-to-end product builds: front-end, agent backbone, eval loop, deploy & ops. From v0 to production.', ta: '12–20 wk' },
    ],
  },
  {
    id: 'ship',
    num: 'TRACK / 03',
    pill: 'SHIP',
    title: 'Financial AI & Trading Intelligence.',
    lede: <>Production-grade trading infrastructure powered by the <b style={{ color: 'var(--fg)' }}>Enso Trading Terminal</b>. We run our own — and we&rsquo;ll build yours.</>,
    tags: [
      { label: 'Alpaca' }, { label: 'Public.com' }, { label: 'Hyperliquid' }, { label: 'altFINS' }, { label: 'AES-256-GCM' },
    ],
    deliverables: [
      { ix: '13', ti: 'Signal Intelligence Platforms', de: 'News-driven signal pipelines, RWW (Real / Win / Worth) scoring, evidence-trail UX. Production-tested at Gore.', ta: '10–16 wk' },
      { ix: '14', ti: 'Autonomous Trading Systems', de: 'Strategy engines, execution layer, risk caps, kill switches. Equities · options · crypto / DeFi.', ta: '12–20 wk' },
      { ix: '15', ti: 'News-Driven Algorithms', de: 'Event detection, sentiment classification, signal-to-trade pipelines. Latency-aware where it matters.', ta: '6–10 wk' },
      { ix: '16', ti: 'Options Flow & Strategy Lab', de: 'Options Lab with strategy testing, IV surfaces, flow analytics. Decision support, not black box.', ta: '6–12 wk' },
      { ix: '17', ti: 'Crypto / DeFi Strategy Engine', de: 'Hyperliquid + altFINS integrated. Automated screening, position sizing, on-chain execution.', ta: '8–14 wk' },
      { ix: '18', ti: 'Brokerage API Integration', de: 'Alpaca, Public.com, Hyperliquid — paper to live, with full compliance & audit trails.', ta: '3–6 wk' },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schemas={[
          professionalServiceSchema(),
          faqSchema(SERVICES_FAQ),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services' },
          ]),
        ]}
      />

      <style>{`
        .track { display: grid; grid-template-columns: 1fr 1.4fr; gap: 64px; padding: clamp(64px, 8vw, 112px) 0; border-top: 1px solid var(--line); align-items: start; }
        @media (max-width: 900px) { .track { grid-template-columns: 1fr; gap:32px; } }
        .track-side { position: sticky; top: 100px; display:grid; gap:24px; }
        .track-num { font-family: var(--mono); font-size: 12px; color: var(--fg-3); display:flex; gap:12px; align-items:center; }
        .track-num .pill { color: var(--teal); border:1px solid color-mix(in oklab, var(--teal) 50%, var(--line-2)); padding:4px 10px; border-radius:999px; }
        .track h2 { font-size: clamp(36px, 4.5vw, 60px); font-weight: 500; letter-spacing: -0.02em; line-height: 1.02; }
        .track-lede { color: var(--fg-2); font-size: 17px; line-height: 1.55; max-width: 50ch; }
        .deliverables { display: grid; gap: 1px; background: var(--line); border:1px solid var(--line); }
        .deliverable { background: var(--bg); padding: 22px 24px; display: grid; grid-template-columns: 28px 1fr auto; gap:18px; align-items: baseline; transition: background .2s; }
        .deliverable:hover { background: var(--bg-2); }
        .deliverable .ix { font-family: var(--mono); font-size: 11px; color: var(--fg-3); }
        .deliverable .ti { font-size: 17px; font-weight: 500; letter-spacing: -0.01em; }
        .deliverable .de { color: var(--fg-2); font-size: 14.5px; line-height: 1.5; grid-column: 2 / 3; margin-top:4px; }
        .deliverable .ta { font-family: var(--mono); font-size: 11px; color: var(--fg-3); }
        .pkg-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:1px; background:var(--line); border:1px solid var(--line); }
        @media (max-width:900px){ .pkg-grid{ grid-template-columns:1fr; } }
        .pkg { background: var(--bg); padding: 32px 28px; display:flex; flex-direction:column; gap:18px; min-height:380px; }
        .pkg .price { font-family: var(--display); font-size: 32px; font-weight:500; letter-spacing:-0.02em; }
        .pkg ul { list-style:none; display:grid; gap:8px; font-size:14px; color:var(--fg-2); }
        .pkg ul li { display:flex; gap:10px; align-items:baseline; }
        .pkg ul li::before { content:""; width:5px; height:5px; background:var(--teal); flex-shrink:0; transform:translateY(-2px); }
        .pkg-cta { margin-top:auto; padding-top:16px; }
      `}</style>

      <section className="hero" data-screen-label="01 Services hero" style={{ paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow"><span className="num">PAGE / 02</span>&nbsp;Services</span>
          </div>
          <h1 className="display reveal" data-delay="1" style={{ fontSize: 'clamp(44px, 7.5vw, 104px)' }}>
            Three tracks.<br /><em>Principal-led.</em>
          </h1>
          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              Enso Labs offers three integrated service tracks: <b style={{ color: 'var(--fg)' }}>AI Transformation Consulting</b>,
              {' '}<b style={{ color: 'var(--fg)' }}>Agentic Systems &amp; Products</b>, and <b style={{ color: 'var(--fg)' }}>Financial AI &amp; Trading Intelligence</b>.
              Pick one, or run them as a single program.
            </p>
            <div className="reveal" data-delay="3">
              <div className="mono-sm" style={{ display: 'grid', gap: 8, color: 'var(--fg-2)' }}>
                <div>↳ <span style={{ color: 'var(--fg-3)' }}>Avg. engagement</span>&nbsp; 12–24 weeks</div>
                <div>↳ <span style={{ color: 'var(--fg-3)' }}>Cohort size</span>&nbsp; 8–15 leaders</div>
                <div>↳ <span style={{ color: 'var(--fg-3)' }}>Sectors</span>&nbsp; Healthcare · Finance · B2B Tech · Mfg</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {TRACKS.map((t) => (
        <div className="shell" id={t.id} key={t.id}>
          <div className="track">
            <div className="track-side reveal">
              <div className="track-num">
                <span>{t.num}</span>
                <span
                  className="pill"
                  style={t.pillTeal ? { color: 'var(--teal)', borderColor: 'color-mix(in oklab, var(--teal) 60%, var(--line-2))' } : undefined}
                >
                  {t.pill}
                </span>
              </div>
              <h2>{t.title}</h2>
              <p className="track-lede">{t.lede}</p>
              <div className="tag-row">
                {t.tags.map((tag) => (
                  <span key={tag.label} className={`tag${tag.teal ? ' teal' : ''}`}>{tag.label}</span>
                ))}
              </div>
            </div>
            <div className="reveal" data-delay="1">
              <div className="deliverables">
                {t.deliverables.map((d) => (
                  <div key={d.ix} className="deliverable">
                    <span className="ix">{d.ix}</span>
                    <div>
                      <div className="ti">{d.ti}</div>
                      <p className="de">{d.de}</p>
                    </div>
                    <span className="ta">{d.ta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      <section data-screen-label="05 Engagement models">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 04</span>&nbsp;Engagement models</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">Three ways to start. All fixed-fee.</h2>
            </div>
          </div>

          <div className="pkg-grid reveal">
            <div className="pkg">
              <div className="mono-sm" style={{ color: 'var(--teal)' }}>DIAGNOSTIC</div>
              <h3 className="h3" style={{ fontWeight: 500 }}>2-Week AI Audit</h3>
              <div className="price">Fixed fee</div>
              <p style={{ color: 'var(--fg-2)', fontSize: 14.5 }}>
                Maturity assessment, opportunity map, prioritized backlog. End with a written roadmap and a working agentic prototype.
              </p>
              <ul>
                <li>Stakeholder interviews · 6–8 leaders</li>
                <li>Technical &amp; data audit</li>
                <li>Opportunity scorecard</li>
                <li>Working agentic prototype</li>
              </ul>
              <div className="pkg-cta"><Link className="btn" href="/contact">Start audit <Arrow /></Link></div>
            </div>
            <div className="pkg" style={{ background: 'var(--bg-2)' }}>
              <div className="mono-sm" style={{ color: 'var(--teal)' }}>★ MOST COMMON</div>
              <h3 className="h3" style={{ fontWeight: 500 }}>12-Week Pilot-to-Production</h3>
              <div className="price">Strategy &nbsp;<span style={{ color: 'var(--fg-3)' }}>→</span>&nbsp; ship</div>
              <p style={{ color: 'var(--fg-2)', fontSize: 14.5 }}>
                Diagnose · Design · Build · Hand-off. The full Strategy-to-Ship Framework, scoped to one high-leverage use case.
              </p>
              <ul>
                <li>Roadmap, business case, governance</li>
                <li>Production agentic system</li>
                <li>Eval harness &amp; ops runbook</li>
                <li>8–15 person enablement cohort</li>
              </ul>
              <div className="pkg-cta"><Link className="btn btn-primary" href="/contact">Scope program <Arrow /></Link></div>
            </div>
            <div className="pkg">
              <div className="mono-sm" style={{ color: 'var(--teal)' }}>RETAINER</div>
              <h3 className="h3" style={{ fontWeight: 500 }}>Embedded AI Operator</h3>
              <div className="price">Quarterly</div>
              <p style={{ color: 'var(--fg-2)', fontSize: 14.5 }}>
                Senior advisor + builder embedded with your team. Continuous shipping, governance, and CoE stewardship.
              </p>
              <ul>
                <li>Weekly working sessions</li>
                <li>Direct access · Slack / Signal</li>
                <li>Architecture &amp; eval reviews</li>
                <li>Quarterly strategy refresh</li>
              </ul>
              <div className="pkg-cta"><Link className="btn" href="/contact">Discuss terms <Arrow /></Link></div>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="05.5 FAQ">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 05</span>&nbsp;Common questions</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Five answers, asked often.</h2></div>
          </div>

          <div className="reveal" style={{ display: 'grid', gap: 0, borderTop: '1px solid var(--line)' }}>
            {SERVICES_FAQ.map((qa, i) => (
              <details
                key={qa.question}
                style={{
                  borderBottom: i === SERVICES_FAQ.length - 1 ? 'none' : '1px solid var(--line)',
                  padding: '28px 0',
                }}
              >
                <summary style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24, listStyle: 'none' }}>
                  <span style={{ fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 500, letterSpacing: '-0.015em' }}>{qa.question}</span>
                  <span className="mono-sm" style={{ color: 'var(--teal)' }}>+ open</span>
                </summary>
                <p style={{ marginTop: 18, color: 'var(--fg-2)', fontSize: 16, lineHeight: 1.65, maxWidth: '80ch' }}>
                  {qa.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="06 CTA">
        <div className="shell">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Pick a track.<br /><em>Or run all three.</em>
            </h2>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="lede">Most engagements span two tracks. The Trading Terminal proves a principal-led studio can run consult, build, and ship simultaneously.</p>
              <div className="hero-cta-row">
                <Link className="btn btn-primary" href="/contact">Get in Touch <Arrow /></Link>
                <Link className="btn" href="/work">See engagements</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
