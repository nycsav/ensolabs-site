import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import { NycClock } from '@/components/NycClock';
import {
  breadcrumbSchema,
  faqSchema,
  professionalServiceSchema,
} from '@/lib/schema';
import { INSIGHTS } from '@/lib/insights';
import { SITE } from '@/lib/site';

// ISR: revalidate the statically-generated homepage every 5 min so an edge-cached
// copy can't serve stale HTML for hours after a content change.
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Enso Labs — AI Transformation Consulting & Agentic Systems Studio NYC',
  description:
    'Enso Labs is a principal-led AI managed-services studio in NYC. We encode your industry expertise into managed agents, then build and operate them.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Enso Labs — AI Transformation Consulting & Agentic Systems Studio NYC',
    description:
      'Principal-led AI managed-services studio in NYC. We encode your industry expertise into managed agents — then build and operate them in production. Agentic Managed Services across Healthcare, Finance, Manufacturing, Media, B2B Tech, and Growth.',
    url: SITE.origin,
    images: [{ url: 'https://ensolabs.ai/og-home-palace.png?v=1', width: 1200, height: 630, alt: 'Enso Labs — Palace of Fine Arts, San Francisco' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enso Labs — AI Consulting & Agentic Systems Studio NYC',
    description:
      'Principal-led AI managed-services studio in NYC. Encode your expertise into managed agents — we build and operate them in production. Agentic Managed Services: Healthcare, Finance, Manufacturing, Media, B2B Tech, Growth.',
    images: ['https://ensolabs.ai/og-home-palace.png?v=1'],
  },
};

const HOME_FAQS = [
  {
    question: 'What is Enso Labs?',
    answer:
      'Enso Labs is a principal-led AI managed-services studio based in New York City, founded by Sav Banerjee. We encode your domain expertise into managed agents, then build and operate them in production — Agentic Managed Services, strategy through production. The work spans AI transformation, agentic systems, and financial AI, for companies across Healthcare, Finance, Manufacturing, Media, B2B Tech, and Growth. Every engagement is led by a senior advisor who also builds.',
  },
  {
    question: 'Who is Sav Banerjee?',
    answer:
      'Sav Banerjee is the founder and principal AI transformation advisor at Enso Labs. He is a 15-year enterprise strategist turned agentic-systems builder, with experience across Google, McCann, Publicis, BBDO, and Y&R. He holds certifications from Anthropic, Google, and OpenAI, and is a Perplexity Computer Implementation Partner. Sav is available for both consulting engagements and full-time AI leadership roles (Head of AI, VP AI Strategy, Director of AI Products).',
  },
  {
    question: 'What does principal-led AI consulting mean?',
    answer:
      'Principal-led means the senior advisor who sells the engagement is also the person who builds and delivers it. At Enso Labs, there are no hand-offs to junior teams. Sav Banerjee leads every engagement from strategy through production deployment, supported by a vetted specialist network that scales with the work.',
  },
  {
    question: 'Is Enso Labs a Perplexity implementation partner?',
    answer:
      'Yes. Enso Labs is a Perplexity Computer Implementation Partner, part of Perplexity\'s Implementation Partners Program. We help enterprise teams onboard, integrate, and get production value out of Perplexity Computer — choosing which workflows to point it at first, wiring it into the data and tools a team already uses, and measuring whether it is actually changing decisions. Strategy through production, led by the person who also does the build.',
  },
  {
    question: 'How do I start a project with Enso Labs?',
    answer:
      'Start with a 2-week AI Audit — a fixed-fee diagnostic engagement that delivers a written roadmap, prioritized opportunity backlog, ROI model, governance gap-map, and a working agentic prototype against your real data. Send a brief through the contact form or email sav@ensolabs.ai, and we respond personally.',
  },
];

const LATEST = [...INSIGHTS]
  .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  .slice(0, 3);

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

export default function HomePage() {
  return (
    <>
      <JsonLd
        schemas={[
          professionalServiceSchema(),
          faqSchema(HOME_FAQS),
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
            <span>Perplexity Computer Implementation Partner</span>
          </div>

          <h1 className="display hero-title">
            <span className="w w1">Strategy</span><br />
            <span className="w w2"><em>to</em></span> <span className="w w3 accent">Ship.</span>
          </h1>

          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              Enso Labs is a principal-led AI managed-services studio. We encode your industry expertise into
              managed agents — then build and operate them in production. From stakeholder research to a shipped,
              running system — across healthcare, finance, manufacturing, media, and B2B tech.
            </p>
            <div className="reveal" data-delay="3">
              <div className="hero-cta-row">
                {SITE.bookingUrl.startsWith('http') ? (
                  <>
                    <a
                      className="btn btn-primary"
                      href={SITE.bookingUrl}
                      target="_blank"
                      rel="noopener"
                      data-booking
                    >
                      Book a 15-min intro
                      <Arrow />
                    </a>
                    <Link className="btn" href="/contact">Start a project</Link>
                  </>
                ) : (
                  <Link className="btn btn-primary" href="/contact">
                    Start a project
                    <Arrow />
                  </Link>
                )}
                <Link className="btn" href="/work">See the work</Link>
              </div>
              <p className="mono-sm" style={{ marginTop: 18 }}>
                ↳ managed agents, built and operated
              </p>
            </div>
          </div>

          {/* sectors strip */}
          <div className="hero-sectors reveal" data-delay="3">
            <span className="lbl">SECTORS</span>&nbsp;&nbsp;
            <span className="list">HEALTHCARE · FINANCE · MANUFACTURING · MEDIA · B2B TECH · GROWTH</span>
          </div>
        </div>
      </section>

      {/* LATEST FROM STRATEGY TO SHIP — featured above the fold */}
      <section className="s2s-feature" aria-label="Latest from Strategy to Ship">
        <div className="shell">
          <div className="s2s-feature-head">
            <span className="eyebrow">
              Latest from Strategy&nbsp;<span aria-hidden="true" style={{ color: '#F0512E' }}>→</span>&nbsp;Ship
            </span>
            <Link className="s2s-feature-all" href="/insights">
              All insights&nbsp;<span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="s2s-feature-grid">
            {LATEST.map((p) => (
              <Link key={p.slug} className="s2s-card" href={`/insights/${p.slug}`}>
                <span className="s2s-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/og/og-${p.slug}.png`} alt={p.title} loading="lazy" width={1200} height={630} />
                </span>
                <span className="s2s-card-meta">
                  <span className="kind">{p.pillar}</span>
                  <span>{fmtDate(p.date)}</span>
                  <span>{p.readingMinutes} min</span>
                </span>
                <span className="s2s-card-title">{p.title}</span>
                <span className="s2s-card-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          <span>
            Fortune 500 Manufacturer <span className="dot" />
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
            Fortune 500 Manufacturer <span className="dot" />
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
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                The same encode &rarr; build &rarr; operate we bring to regulated operations, we bring to growth &mdash; segmentation, campaigns, and brand, run as agents.
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
                <div><span className="prompt">$</span> <span className="out">enso run --pipeline market-intel --rules on</span></div>
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
            <div className="pillar reveal lens-amber">
              <div className="pillar-num">
                <span>P / 01</span><span className="tag">CONSULT</span>
              </div>
              <h3>AI Transformation Consulting</h3>
              <p>It starts with research — stakeholder interviews, data and workflow audits, AI-readiness assessment — to frame the decision the system must make and the roadmap to get there, across healthcare, finance, manufacturing, media, and B2B tech.</p>
              <ul>
                <li>Strategy &amp; roadmapping</li>
                <li>AI readiness &amp; maturity audits</li>
                <li>Executive workshops · 8–15 cohorts</li>
                <li>Business case &amp; ROI modeling</li>
                <li>Responsible-AI governance · NIST RMF</li>
              </ul>
            </div>

            <div className="pillar reveal lens-blue" data-delay="1">
              <div className="pillar-num">
                <span>P / 02</span><span className="tag teal">BUILD</span>
              </div>
              <h3>Agentic Systems &amp; Products</h3>
              <p>Then we build the custom AI product — agent architecture, RAG, MCP integrations, and workflow automation — engineered against your real data and shipped end-to-end by a principal-led team.</p>
              <ul>
                <li>Agent architecture · LangGraph / CrewAI</li>
                <li>Workflow automation · N8N / Claude API</li>
                <li>RAG knowledge systems</li>
                <li>MCP server development</li>
                <li>AI Center of Excellence design</li>
              </ul>
            </div>

            <div className="pillar reveal lens-coral" data-delay="2">
              <div className="pillar-num">
                <span>P / 03</span><span className="tag">SHIP</span>
              </div>
              <h3>Financial AI &amp; Trading Intelligence</h3>
              <p>The shipped intelligence system, running in production — financial AI agents, autonomous trading, and real-time signal intelligence, built on the same Claude infrastructure that Goldman Sachs, Citi, and JPMorgan now adopt. Brokerage API integration and MCP-connected agents. Anthropic Certified.</p>
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
                Pulled from live enterprise engagements and the Enso Trading Terminal. No vanity metrics.
              </p>
            </div>
          </div>

          <div className="proof reveal">
            <div className="proof-cell fill-coral">
              <div className="num">75<em>%</em></div>
              <div className="label">Pilot-to-production conversion across enterprise engagements</div>
            </div>
            <div className="proof-cell">
              <div className="num">3<em>mo</em></div>
              <div className="label">Average time-to-first-value, strategy through deployed system</div>
            </div>
            <div className="proof-cell fill-blue">
              <div className="num">83<em>%</em></div>
              <div className="label">Reduction in pharma campaign launch time · 3mo → 2wk</div>
            </div>
            <div className="proof-cell">
              <div className="num">$150<em>M+</em></div>
              <div className="label">Enterprise portfolios managed across finance, health &amp; tech</div>
            </div>
            <div className="proof-cell fill-amber">
              <div className="num">731</div>
              <div className="label">Documents processed in a single intelligence pipeline run</div>
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

      {/* LIVE INTELLIGENCE — slim banner (was a duplicate 4-card Strategy→Ship grid) */}
      <section data-screen-label="04.5 Live intelligence" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Link className="s2n-banner reveal" href="/insights">
            <div>
              <div className="label">Live Intelligence · Powered by Enso Labs</div>
              <div className="title">
                Daily AI signals, live from Strategy <span style={{ color: '#F0512E' }}>→</span> Ship.
              </div>
              <div className="sub">Competitive, AI &amp; financial signals for marketing strategists — updated every weekday, ET.</div>
            </div>
            <span className="go">Read daily signals →</span>
          </Link>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section data-screen-label="05 Selected work">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 04</span>&nbsp;Selected work</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">Four engagements. Strategy &nbsp;<span style={{ color: 'var(--fg-3)' }}>→</span>&nbsp; ship.</h2>
            </div>
          </div>

          <div role="list" style={{ borderTop: '1px solid var(--line)' }}>
            <Link className="case-row reveal" href="/work/ai-market-intelligence" role="listitem">
              <span className="case-no">CS / 01</span>
              <span className="case-title">AI Market Intelligence Platform</span>
              <span className="case-desc">8-stage LangGraph pipeline, AES-256-GCM encrypted dashboard, expert-knowledge encoding framework — go/no-go milestone delivered April 2026.</span>
              <span className="case-tag">Fortune 500 Manufacturer<br />Materials</span>
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
              <span className="eyebrow"><span className="num">§ 05</span>&nbsp;Methodology</span>
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
              <span className="eyebrow"><span className="num">§ 06</span>&nbsp;Selected clients</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">15 years across the room from C-suite buyers.</h2>
            </div>
          </div>

          <div className="clients reveal">
            {['Fortune 500 Manufacturer', 'Citi', 'JPMorgan Chase', 'American Express', 'Google', 'Microsoft', 'T-Mobile', 'McCann', 'Publicis', 'RAPP', 'Y&R', 'BBDO', 'Heller', 'Rokkan'].map((c) => (
              <div key={c} className="client">{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* closing CTA — minimal, normal dark ground */}
      <section style={{ paddingTop: 'clamp(56px, 7vw, 96px)', paddingBottom: 'clamp(56px, 7vw, 96px)' }}>
        <div className="shell">
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'center', justifyContent: 'space-between' }}>
            <p className="lede" style={{ margin: 0 }}>Have a system that needs to ship? Let&apos;s talk.</p>
            <div className="hero-cta-row">
              <Link className="btn btn-primary" href="/contact">
                Get in Touch <Arrow />
              </Link>
              <a className="btn" href="mailto:sav@ensolabs.ai">sav@ensolabs.ai</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
