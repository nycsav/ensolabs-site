import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbSchema,
  orgSchema,
  professionalServiceSchema,
} from '@/lib/schema';

// ISR: self-heal edge-cached HTML within ~5 min of a content change.
export const revalidate = 300;

const CTA_LABEL = 'Book a 20-minute Agency AI Operating Review';

export const metadata: Metadata = {
  title: 'AI for Agencies — Agency AI CoE & Agentic Workflows',
  description:
    'Enso Labs helps independent and midsize agencies turn AI experiments into a working delivery capability: governance, data, agentic workflows, and enablement.',
  alternates: { canonical: 'https://ensolabs.ai/ai-for-agencies' },
  openGraph: {
    title: 'AI for Agencies — Build the AI Capability Your Agency Needs to Compete | Enso Labs',
    description:
      'A 10-day Agency AI CoE & Agentic Workflow Diagnostic for independent and midsize agencies: governance, data foundations, agentic workflows, team enablement, and measurable client outcomes.',
    url: 'https://ensolabs.ai/ai-for-agencies',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'AI for Agencies — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for Agencies — Enso Labs',
    description:
      'Turn agency AI experiments into a working delivery capability. Start with a 10-day Agency AI CoE & Agentic Workflow Diagnostic.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
  other: { 'article:modified_time': '2026-09-24' },
};

const PROBLEMS = [
  {
    ix: '01',
    title: 'A practical governance model',
    body: 'Clear rules for what AI may touch, who approves it, and how client data is handled — usable by delivery teams, not just legal.',
  },
  {
    ix: '02',
    title: 'Prioritized workflows',
    body: 'A short list of AI workflows tied directly to margin or client value, instead of scattered tool experiments.',
  },
  {
    ix: '03',
    title: 'Safe ways to use AI',
    body: 'Guardrails for AI in research, reporting, campaign operations, and regulated work — where mistakes cost clients.',
  },
  {
    ix: '04',
    title: 'A service clients can buy',
    body: 'A repeatable, packaged AI capability the agency can sell and deliver consistently across accounts.',
  },
  {
    ix: '05',
    title: 'A path from pilot to production',
    body: 'A way to move promising pilots into production delivery, with owners, KPIs, and an operating model behind them.',
  },
];

const STEPS = [
  { ix: 'Step 1', title: 'Find the value', body: 'Identify the three highest-value AI workflows in your agency.' },
  { ix: 'Step 2', title: 'Map the requirements', body: 'Map the data, approval, security, and client-service requirements for each.' },
  { ix: 'Step 3', title: 'Score the portfolio', body: 'Score use cases by value, feasibility, and risk.' },
  { ix: 'Step 4', title: 'Design the blueprint', body: 'Design the first agentic workflow blueprint.' },
  { ix: 'Step 5', title: 'Plan the next 90 days', body: 'Deliver a 90-day implementation roadmap and business case.' },
];

const DELIVERABLES = [
  'Workflow assessment',
  'Prioritized use-case portfolio',
  'Governance and operating-model recommendation',
  'First agentic workflow blueprint',
  '90-day roadmap with owners and KPIs',
  'Executive readout',
];

const NEXT = [
  {
    ix: '01',
    title: '90-day AI CoE launch',
    body: 'Stand up the agency’s AI Center of Excellence: governance, operating model, enablement, and the first production workflows.',
  },
  {
    ix: '02',
    title: 'Agentic workflow pilot',
    body: 'Build and run the first agentic workflow from the blueprint, measured against the KPIs set in the diagnostic.',
  },
  {
    ix: '03',
    title: 'Fractional Head of AI',
    body: 'Ongoing senior AI leadership — a fractional Head of AI or AI transformation office that keeps the roadmap moving.',
  },
];

export default function AIForAgenciesPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          professionalServiceSchema(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Services', href: '/services' },
            { name: 'AI for Agencies', href: '/ai-for-agencies' },
          ]),
        ]}
      />

      <style>{`
        .afa-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); margin-top:40px; }
        .afa-grid.five { grid-template-columns:repeat(5,1fr); }
        .afa-card { background:var(--bg); padding:32px 28px; display:flex; flex-direction:column; gap:14px; }
        .afa-card .ix { font-family:var(--mono); font-size:11px; color:var(--teal); letter-spacing:0.06em; text-transform:uppercase; }
        .afa-card h3 { font-size:20px; font-weight:500; letter-spacing:-0.015em; line-height:1.15; }
        .afa-card p { color:var(--fg-2); font-size:15px; line-height:1.55; }
        .afa-deliv { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); margin-top:24px; list-style:none; padding:0; }
        .afa-deliv li { background:var(--bg); padding:20px 24px; font-size:15px; color:var(--fg); line-height:1.4; display:flex; gap:12px; align-items:baseline; }
        .afa-deliv .dot { color:var(--teal); font-size:10px; }
        .afa-sub { font-family:var(--mono); font-size:12px; color:var(--fg-3); letter-spacing:0.05em; text-transform:uppercase; margin-top:48px; }
        .afa-spot { display:grid; grid-template-columns:1fr 1.4fr; gap:64px; align-items:start; }
        .afa-stat { border:1px solid var(--line); padding:32px 28px; }
        .afa-stat .n { font-family:var(--display); font-size:64px; font-weight:500; letter-spacing:-0.02em; color:var(--teal); line-height:1; }
        .afa-stat .l { font-size:15px; color:var(--fg); margin-top:12px; font-weight:500; }
        .afa-stat .s { font-family:var(--mono); font-size:11px; color:var(--fg-3); margin-top:6px; letter-spacing:0.03em; }
        /* page-local fix: globals .cta-blue .btn (#fff) overrides .cta-blue .btn-primary text color */
        .cta-blue .afa-cta .btn-primary { color:oklch(0.30 0.09 250); }
        .afa-cta { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:end; }
        @media (max-width:1100px){ .afa-grid.five { grid-template-columns:repeat(3,1fr); } }
        @media (max-width:900px){ .afa-grid, .afa-grid.five, .afa-deliv { grid-template-columns:1fr 1fr; } .afa-spot, .afa-cta { grid-template-columns:1fr; gap:32px; } }
        @media (max-width:560px){ .afa-grid, .afa-grid.five, .afa-deliv { grid-template-columns:1fr; } }
      `}</style>

      {/* ── Hero ── */}
      <section className="hero" data-screen-label="01 AI for Agencies hero" style={{ paddingBottom: 'clamp(60px,8vw,100px)' }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow"><span className="num">SERVICES</span>&nbsp;AI for Agencies</span>
          </div>
          <h1 className="display reveal" data-delay="1" style={{ fontSize: 'clamp(40px, 6.2vw, 88px)' }}>
            Build the AI capability your agency <em>needs to compete.</em>
          </h1>
          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              Enso Labs helps independent and midsize agencies turn AI experiments into a working delivery capability: <b style={{ color: 'var(--fg)' }}>governance, data foundations, agentic workflows, team enablement, and measurable client outcomes.</b>
            </p>
            <div className="reveal" data-delay="3">
              <div className="hero-cta-row">
                <Link className="btn btn-primary" href="/contact">{CTA_LABEL} <Arrow /></Link>
                <Link className="btn" href="#diagnostic">See the 10-day diagnostic →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The agency problem ── */}
      <section data-screen-label="02 The agency problem">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 01</span>&nbsp;The agency problem</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Your teams have AI tools. Most agencies still lack the capability.</h2></div>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede" style={{ maxWidth: '72ch' }}>
              Licenses and experiments are not a delivery capability. What most agencies are missing:
            </p>
          </div>
          <div className="afa-grid five reveal" data-delay="2">
            {PROBLEMS.map((p) => (
              <div key={p.ix} className="afa-card">
                <span className="ix">{p.ix}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The 10-day diagnostic ── */}
      <section id="diagnostic" data-screen-label="03 Diagnostic">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 02</span>&nbsp;Where to start</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">The 10-day Agency AI CoE &amp; Agentic Workflow Diagnostic.</h2></div>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede" style={{ maxWidth: '72ch' }}>
              Ten working days to go from scattered AI experiments to a prioritized, governed plan — and a first agentic workflow ready to build.
            </p>
          </div>
          <div className="afa-grid five reveal" data-delay="2">
            {STEPS.map((s) => (
              <div key={s.ix} className="afa-card">
                <span className="ix">{s.ix}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <p className="afa-sub reveal">Deliverables</p>
          <ul className="afa-deliv reveal" data-delay="1">
            {DELIVERABLES.map((d) => (
              <li key={d}><span className="dot" aria-hidden="true">■</span>{d}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── What comes next ── */}
      <section data-screen-label="04 What comes next">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 03</span>&nbsp;What comes next</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">From diagnostic to operating capability.</h2></div>
          </div>
          <div className="afa-grid reveal" data-delay="1">
            {NEXT.map((n) => (
              <div key={n.ix} className="afa-card">
                <span className="ix">{n.ix}</span>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case example (anonymized) ── */}
      <section data-screen-label="05 Case example">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 04</span>&nbsp;Case example</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">A regulated-marketing agency, from pilots to production.</h2></div>
          </div>
          <div className="afa-spot reveal" data-delay="1">
            <p className="lede" style={{ fontSize: 17 }}>
              A full-service regulated-marketing agency needed to introduce AI without adding compliance, evidence, or client-delivery risk. Enso designed governance and deployment playbooks, built analytics and data foundations, trained cross-functional teams, and created reusable workflows for research, reporting, and campaign operations. The operating model produced a documented 75% pilot-to-production conversion rate.
            </p>
            <div className="afa-stat">
              <div className="n">75%</div>
              <div className="l">Pilot-to-production conversion rate</div>
              <div className="s">Documented · agency AI operating model</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Built by an agency operator ── */}
      <section data-screen-label="06 Operator">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 05</span>&nbsp;Who you work with</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Built by an agency operator who ships.</h2></div>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede" style={{ maxWidth: '72ch' }}>
              Sav Banerjee spent 15+ years in VP and Director strategy roles across major holding-company agency networks, and now builds agentic AI and data systems for agency and enterprise teams.
            </p>
            <div className="hero-cta-row" style={{ marginTop: 28 }}>
              <Link className="btn" href="/about/sav-banerjee">About Sav Banerjee →</Link>
              <Link className="btn" href="/services">All services →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-blue" data-screen-label="07 CTA">
        <div className="shell">
          <div className="afa-cta reveal">
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5.5vw, 72px)' }}>
              Turn AI experiments into<br /><em>an agency capability.</em>
            </h2>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="lede">Twenty minutes to review where AI sits in your agency today, and whether the 10-day diagnostic is the right next step.</p>
              <div className="hero-cta-row">
                <Link className="btn btn-primary" href="/contact">{CTA_LABEL} <Arrow /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
