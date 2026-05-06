import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import { NycClock } from '@/components/NycClock';
import {
  breadcrumbSchema,
  professionalServiceSchema,
} from '@/lib/schema';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Enso Labs — Strategy to Ship',
    description:
      'AI transformation consultancy, agentic systems studio, and financial AI product lab. NYC.',
    url: SITE.origin,
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'Enso Labs — Strategy to Ship' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enso Labs — Strategy to Ship',
    description:
      'AI transformation consultancy and agentic systems studio. NYC.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        schemas={[
          professionalServiceSchema(),
          breadcrumbSchema([{ name: 'Home', href: '/' }]),
        ]}
      />

      {/* HERO */}
      <section className="hero" data-screen-label="01 Hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="hero-meta reveal">
            <span>
              <span className="num" style={{ color: 'var(--teal)' }}>●</span>
              &nbsp;Available · {SITE.availability}
            </span>
            <span>
              <b>NYC</b> &nbsp;<NycClock /> ET
            </span>
            <span>
              Certified · <b>Anthropic</b> · <b>Google</b> · <b>OpenAI</b>
            </span>
            <span>Perplexity Business Fellowship</span>
          </div>

          <h1 className="display reveal" data-delay="1">
            Strategy<br />
            <em>to</em> <span className="accent">Ship.</span>
          </h1>

          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              Enso Labs is an AI transformation consultancy, agentic systems studio, and financial AI product lab.
              We architect AI strategy for Healthcare, Finance, and B2B Tech — then build the production systems
              that deliver it.
            </p>
            <div className="reveal" data-delay="3">
              <div className="hero-cta-row">
                <Link className="btn btn-primary" href="/contact">
                  Start a project
                  <Arrow />
                </Link>
                <Link className="btn" href="/work">See the work</Link>
              </div>
              <p className="mono-sm" style={{ marginTop: 18 }}>
                ↳ 75% pilot-to-production · 3-month time-to-first-value
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>
            W. L. Gore &amp; Associates <span className="dot" />
            Citi <span className="dot" />
            JPMorgan Chase <span className="dot" />
            American Express <span className="dot" />
            Google <span className="dot" />
            Microsoft <span className="dot" />
            T-Mobile <span className="dot" />
            McCann <span className="dot" />
            Publicis <span className="dot" />
            Heller Agency <span className="dot" />
            BBDO <span className="dot" />
            Y&amp;R <span className="dot" />
            Omnicom <span className="dot" />
          </span>
          <span aria-hidden="true">
            W. L. Gore &amp; Associates <span className="dot" />
            Citi <span className="dot" />
            JPMorgan Chase <span className="dot" />
            American Express <span className="dot" />
            Google <span className="dot" />
            Microsoft <span className="dot" />
            T-Mobile <span className="dot" />
            McCann <span className="dot" />
            Publicis <span className="dot" />
            Heller Agency <span className="dot" />
            BBDO <span className="dot" />
            Y&amp;R <span className="dot" />
            Omnicom <span className="dot" />
          </span>
        </div>
      </div>

      {/* POSITIONING */}
      <section data-screen-label="02 Positioning">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 01</span>&nbsp;Positioning</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">
                Most AI consultancies stop at the slide deck.<br />
                <em style={{ color: 'var(--fg-2)', fontStyle: 'italic', fontWeight: 400 }}>
                  We ship the system.
                </em>
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div className="reveal" data-delay="2" style={{ display: 'grid', gap: 28, maxWidth: '60ch' }}>
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                Enso Labs is a principal-led studio founded by <b style={{ color: 'var(--fg)' }}>Sav Banerjee</b> — a 15-year enterprise strategist turned agentic-systems builder.
              </p>
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                Every engagement is led by a senior advisor who also builds. Our specialist network scales with the work — no bloated teams, no hand-offs.
              </p>
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                We run the same infrastructure we build for clients: the <b style={{ color: 'var(--fg)' }}>Enso Trading Terminal</b>
                {' '}runs autonomous signal intelligence, multi-agent research, and brokerage execution in production —
                twenty-four hours a day.
              </p>
              <div className="tag-row" style={{ marginTop: 8 }}>
                <span className="tag teal">LangGraph</span>
                <span className="tag teal">Claude API</span>
                <span className="tag teal">MCP</span>
                <span className="tag">N8N</span>
                <span className="tag">RAG</span>
                <span className="tag">CrewAI</span>
                <span className="tag">Python</span>
                <span className="tag">React</span>
              </div>
            </div>

            <div className="terminal reveal" data-delay="3">
              <div className="terminal-bar">
                <span className="dot t" /><span className="dot" /><span className="dot" />
                <span style={{ marginLeft: 8 }}>enso-labs ~ trading-terminal · live</span>
                <span style={{ marginLeft: 'auto', color: 'var(--teal)' }}>● online</span>
              </div>
              <div className="terminal-body">
                <div><span className="prompt">$</span> <span className="out">enso run --pipeline gore-m2 --rules on</span></div>
                <div className="comment">› init 8-stage LangGraph pipeline …</div>
                <div className="comment">› fetchers: 4 parallel · ReAct agents: 3</div>
                <div>  <span className="out">documents</span>      <span className="amber">731</span></div>
                <div>  <span className="out">sources curated</span> <span className="amber">111</span></div>
                <div>  <span className="out">signals surfaced</span> <span className="amber">16</span></div>
                <div>  <span className="out">RWW score ≥ 0.78</span> &nbsp;<span className="comment">{'// real / win / worth'}</span></div>
                <div><span className="prompt">$</span> <span className="out">enso ship --target prod --review lead-scientist</span></div>
                <div className="comment">› validated · go/no-go milestone delivered</div>
                <div><span className="prompt">$</span> <span style={{ color: 'var(--teal)' }}>_</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section data-screen-label="03 Pillars">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 02</span>&nbsp;Three pillars</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">One studio. Three integrated tracks — principal-led, every engagement.</h2>
            </div>
          </div>
        </div>

        <div className="shell" style={{ paddingLeft: 0, paddingRight: 0, maxWidth: 'none' }}>
          <div className="pillars">
            <div className="pillar reveal">
              <div className="pillar-num">
                <span>P / 01</span><span className="tag">CONSULT</span>
              </div>
              <h3>AI Transformation Consulting</h3>
              <p>Strategy, roadmaps, AI readiness assessments, executive workshops, and responsible-AI governance for healthcare, finance, and B2B tech enterprises.</p>
              <ul>
                <li>Strategy &amp; roadmapping</li>
                <li>AI readiness &amp; maturity audits</li>
                <li>Executive workshops · 8–15 cohorts</li>
                <li>Business case &amp; ROI modeling</li>
                <li>Responsible-AI governance · NIST RMF</li>
              </ul>
            </div>

            <div className="pillar reveal" data-delay="1">
              <div className="pillar-num">
                <span>P / 02</span><span className="tag teal">BUILD</span>
              </div>
              <h3>Agentic Systems &amp; Products</h3>
              <p>Production agent architecture, workflow automation, custom AI products, and AI Centers of Excellence — shipped end-to-end by a principal-led team.</p>
              <ul>
                <li>Agent architecture · LangGraph / CrewAI</li>
                <li>Workflow automation · N8N / Claude API</li>
                <li>RAG knowledge systems</li>
                <li>MCP server development</li>
                <li>AI Center of Excellence design</li>
              </ul>
            </div>

            <div className="pillar reveal" data-delay="2">
              <div className="pillar-num">
                <span>P / 03</span><span className="tag">SHIP</span>
              </div>
              <h3>Financial AI &amp; Trading Intelligence</h3>
              <p>Production financial AI agents and autonomous trading systems. We build with the same Claude infrastructure that Goldman Sachs, Citi, and JPMorgan are now adopting — brokerage API integration, MCP-connected trading agents, and real-time signal intelligence. Anthropic Certified.</p>
              <ul>
                <li>Enso Trading Terminal</li>
                <li>News-driven trading algorithms</li>
                <li>Options flow analysis</li>
                <li>Crypto / DeFi strategy engines</li>
                <li>Brokerage API integration · Alpaca · Public</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="shell" style={{ marginTop: 48 }}>
          <Link className="btn btn-ghost reveal" href="/services">
            Full service catalog
            <Arrow />
          </Link>
        </div>
      </section>

      {/* PROOF */}
      <section data-screen-label="04 Proof">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 03</span>&nbsp;Proof</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">Numbers that survived production.</h2>
              <p className="lede" style={{ marginTop: 24 }}>
                Pulled from live engagements at Gore, Heller, and the Enso Trading Terminal. No vanity metrics.
              </p>
            </div>
          </div>

          <div className="proof reveal">
            <div className="proof-cell">
              <div className="num">75<em>%</em></div>
              <div className="label">Pilot-to-production conversion across enterprise engagements</div>
            </div>
            <div className="proof-cell">
              <div className="num">3<em>mo</em></div>
              <div className="label">Average time-to-first-value, strategy through deployed system</div>
            </div>
            <div className="proof-cell">
              <div className="num">83<em>%</em></div>
              <div className="label">Reduction in pharma campaign launch time · 3mo → 2wk</div>
            </div>
            <div className="proof-cell">
              <div className="num">$150<em>M+</em></div>
              <div className="label">Enterprise portfolios managed across finance, health &amp; tech</div>
            </div>
            <div className="proof-cell">
              <div className="num">731</div>
              <div className="label">Documents processed in a single Gore M2 pipeline run</div>
            </div>
            <div className="proof-cell">
              <div className="num">15<em>+</em></div>
              <div className="label">Years inside Google, McCann, Publicis, RAPP, Y&amp;R, BBDO</div>
            </div>
            <div className="proof-cell">
              <div className="num">20<em>+</em></div>
              <div className="label">AI production systems shipped &amp; running</div>
            </div>
            <div className="proof-cell">
              <div className="num">100<em>%</em></div>
              <div className="label">Principal-led — every engagement, every deliverable</div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE INTELLIGENCE — signal2noise */}
      <section data-screen-label="04.5 Live intelligence">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 04</span>&nbsp;Live intelligence</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">
                Live from <span className="accent">signal2noise</span>.
              </h2>
              <p className="lede" style={{ marginTop: 24 }}>
                Daily AI intelligence for marketing strategists. Powered by Enso Labs.
              </p>
            </div>
          </div>

          <div className="reveal s2n-grid">
            {[
              { kind: 'COMPETITIVE SIGNAL', date: 'APR 28', source: 'Gartner', headline: 'Enterprise AI buying committees consolidate around three vendors per portfolio — non-finalists lose 70% of pipeline.' },
              { kind: 'AI SIGNAL',          date: 'APR 28', source: 'BCG',     headline: 'Agentic workflows replace RPA in 41% of Fortune 500 ops budgets — first measurable line-item shift since 2019.' },
              { kind: 'MEDIA SIGNAL',       date: 'APR 27', source: 'The Trade Desk', headline: 'CTV ad recall up 22% when AI-personalized in flight; control groups flat. Implication: dynamic creative is now table stakes.' },
              { kind: 'COMPETITIVE SIGNAL', date: 'APR 26', source: 'Forrester', headline: 'AI-search referral traffic now exceeds organic Google for 12% of B2B sites tracked. AEO-optimized brands see 3.4× lift.' },
            ].map((s) => (
              <a
                key={s.headline}
                className="s2n-card"
                href="https://signals.ensolabs.ai"
                target="_blank"
                rel="noopener"
              >
                <div className="s2n-meta">
                  <span className="kind">{s.kind}</span>
                  <span>{s.date}</span>
                  <span>{s.source}</span>
                </div>
                <p className="s2n-headline">{s.headline}</p>
                <span className="s2n-arrow">→</span>
              </a>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <p className="mono-sm" style={{ color: 'var(--fg-3)' }}>
              ↳ Updated every weekday morning, ET
            </p>
            <a className="btn btn-primary" href="https://signals.ensolabs.ai" target="_blank" rel="noopener">
              Get daily signals → signals.ensolabs.ai
              <Arrow />
            </a>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section data-screen-label="05 Selected work">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 05</span>&nbsp;Selected work</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">Four engagements. Strategy &nbsp;<span style={{ color: 'var(--fg-3)' }}>→</span>&nbsp; ship.</h2>
            </div>
          </div>

          <div role="list" style={{ borderTop: '1px solid var(--line)' }}>
            <Link className="case-row reveal" href="/work/gore" role="listitem">
              <span className="case-no">CS / 01</span>
              <span className="case-title">Gore M2 Intelligence Hub</span>
              <span className="case-desc">8-stage LangGraph pipeline, AES-256-GCM encrypted dashboard, &ldquo;Gore Lens&rdquo; expert-knowledge framework — go/no-go milestone delivered April 2026.</span>
              <span className="case-tag">W. L. Gore × BoI<br />Materials</span>
              <span className="case-arrow">→</span>
            </Link>
            <Link className="case-row reveal" href="/work/heller" role="listitem">
              <span className="case-no">CS / 02</span>
              <span className="case-title">AI Center of Excellence — Pharma</span>
              <span className="case-desc">5 brand knowledge bases, 8 active automations, NIST + FDA/MLR/PRC compliant. 83% faster campaign launches, 35% time savings.</span>
              <span className="case-tag">Heller Agency<br />Healthcare</span>
              <span className="case-arrow">→</span>
            </Link>
            <Link className="case-row reveal" href="/work/trading-terminal" role="listitem">
              <span className="case-no">CS / 03</span>
              <span className="case-title">Enso Trading Terminal</span>
              <span className="case-desc">Autonomous signal intelligence and options trading platform. News-driven algos, multi-agent research, Alpaca + Public + Hyperliquid integration.</span>
              <span className="case-tag">Enso Labs<br />FinTech</span>
              <span className="case-arrow">→</span>
            </Link>
            <Link className="case-row reveal" href="/work/enterprise-ai" role="listitem">
              <span className="case-no">CS / 04</span>
              <span className="case-title">Enterprise AI Enablement Programs</span>
              <span className="case-desc">Cohort-based enablement across finance, healthcare, and tech. 3-month time-to-first-value, 75% pilot-to-production.</span>
              <span className="case-tag">Cross-industry<br />Enterprise</span>
              <span className="case-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section data-screen-label="06 Methodology">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 06</span>&nbsp;Methodology</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">The Strategy-to-Ship Framework.</h2>
              <p className="lede" style={{ marginTop: 24 }}>
                Four phases. Principal-led delivery. Designed so a Fortune 500 pilot doesn&rsquo;t die in the lab.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 1,
              background: 'var(--line)',
              borderTop: '1px solid var(--line)',
              borderBottom: '1px solid var(--line)',
            }}
          >
            {[
              { num: '01', wks: 'WK 1–2', title: 'Diagnose', body: 'AI maturity assessment, technical discovery, stakeholder mapping. We measure where you actually are — not where the deck says you are.', out: '→ Readiness scorecard & gap map' },
              { num: '02', wks: 'WK 3–6', title: 'Design', body: 'Roadmap, business case, governance frame, and the production architecture. We design for shipping — not for the deck.', out: '→ Roadmap · ROI model · architecture' },
              { num: '03', wks: 'WK 7–12', title: 'Build', body: 'Agent architecture, RAG, MCP, integrations. The advisor and the build team work as one unit — so nothing gets lost in translation.', out: '→ Working system in production' },
              { num: '04', wks: 'WK 13+', title: 'Scale', body: 'Center of Excellence, enablement cohorts, governance handoff. We engineer ourselves out of the org — by design.', out: '→ CoE · cohorts · sustained adoption' },
            ].map((p, i) => (
              <div
                key={p.num}
                className="reveal"
                data-delay={i || undefined}
                style={{ background: 'var(--bg)', padding: '36px 28px', minHeight: 300, display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                <div className="mono-sm" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--teal)' }}>PHASE {p.num}</span>
                  <span>{p.wks}</span>
                </div>
                <h3 className="h3">{p.title}</h3>
                <p style={{ color: 'var(--fg-2)', fontSize: 14.5, lineHeight: 1.55 }}>{p.body}</p>
                <div className="mono-sm" style={{ marginTop: 'auto', color: 'var(--fg-3)' }}>{p.out}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section data-screen-label="07 Clients">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 07</span>&nbsp;Selected clients</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">15 years across the room from C-suite buyers.</h2>
            </div>
          </div>

          <div className="clients reveal">
            {['W. L. Gore', 'Citi', 'JPMorgan', 'Amex', 'Google', 'Microsoft', 'T-Mobile', 'McCann', 'Publicis', 'RAPP', 'Y&R', 'BBDO', 'Heller', 'Rokkan'].map((c) => (
              <div key={c} className="client">{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        data-screen-label="08 CTA"
        style={{ paddingTop: 'clamp(120px, 14vw, 200px)', paddingBottom: 'clamp(120px, 14vw, 200px)' }}
      >
        <div className="shell">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <div>
              <span className="eyebrow" style={{ marginBottom: 32, display: 'inline-flex' }}>
                <span className="num">§ 08</span>&nbsp;Engage
              </span>
              <h2 className="display" style={{ fontSize: 'clamp(44px, 6vw, 88px)', marginTop: 24 }}>
                Have a system<br />that needs <em>to</em> <span className="accent">ship?</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="lede">
                Two-week diagnostic, fixed-fee. You get a written roadmap and a working agentic prototype.
              </p>
              <div className="hero-cta-row">
                <Link className="btn btn-primary" href="/contact">
                  Get in Touch <Arrow />
                </Link>
                <a className="btn" href="mailto:sav@ensopartners.co">sav@ensopartners.co</a>
              </div>
              <div className="mono-sm" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <span>↳ Response within 24h</span>
                <span>↳ NDA on request</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
