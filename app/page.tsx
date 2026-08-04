// app/page.tsx — Homepage copy v3 (consulting structure), 2026-08-04
// Drop-in replacement for app/page.tsx on master. Copy edits only:
// no new imports, no CSS changes, no schema changes, no new components.

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
  title: 'Enso Labs — AI Consulting for Enterprises & Agencies | NYC',
  description:
    'Principal-led AI consultancy in New York. We advise on where AI belongs, build the systems, and operate them in production — for enterprises and agencies across healthcare, finance, manufacturing, media and B2B tech.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Enso Labs — AI Consulting for Enterprises & Agencies | NYC',
    description:
      'Principal-led AI consultancy in New York. Advisory, custom AI systems, and managed AI operations — for enterprises and agencies across Healthcare, Finance, Manufacturing, Media, and B2B Tech.',
    url: SITE.origin,
    images: [{ url: 'https://ensolabs.ai/og-home-palace.png?v=1', width: 1200, height: 630, alt: 'Enso Labs — Palace of Fine Arts, San Francisco' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enso Labs — AI Consulting for Enterprises & Agencies | NYC',
    description:
      'Principal-led AI consultancy in New York. We advise, build, and operate AI systems in production — Healthcare, Finance, Manufacturing, Agencies, Media, B2B Tech.',
    images: ['https://ensolabs.ai/og-home-palace.png?v=1'],
  },
};

const HOME_FAQS = [
  {
    question: 'What is Enso Labs?',
    answer:
      'Enso Labs is an AI consultancy in New York City, founded by Sav Banerjee. We advise on where AI belongs in your business, build the systems, and operate them in production — for enterprises and agencies across Healthcare, Finance, Manufacturing, Media, and B2B Tech. Every engagement is led by a senior advisor who also builds.',
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
            <span className="w w1">Advise.</span><br />
            <span className="w w2">Build.</span> <span className="w w3 accent">Operate.</span>
          </h1>

          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              Enso Labs is an AI consultancy in New York. We help enterprises and agencies decide where AI
              belongs, build the systems that do the work, and operate them in production. One senior advisor
              runs the engagement and does the building.
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
                ↳ scoped, built and operated by the same team
              </p>
            </div>
          </div>

          {/* sectors strip */}
          <div className="hero-sectors reveal" data-delay="3">
            <span className="lbl">SECTORS</span>&nbsp;&nbsp;
            <span className="list">HEALTHCARE · FINANCE · MANUFACTURING · AGENCIES · MEDIA · B2B TECH</span>
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

      {/* WHAT WE DO */}
      <section data-screen-label="02 What we do">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 01</span>&nbsp;What we do</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">
                Most AI consultants hand over a roadmap.<br />
                <em style={{ color: 'var(--fg-2)', fontStyle: 'italic', fontWeight: 400 }}>
                  We stay until it runs.
                </em>
              </h2>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div className="reveal" data-delay="2" style={{ display: 'grid', gap: 28, maxWidth: '60ch' }}>
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                Enso Labs is led by <b style={{ color: 'var(--fg)' }}>Sav Banerjee</b> — fifteen years advising enterprise clients on strategy, now building the systems himself.
              </p>
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                You work with one senior advisor from the first conversation to production. A vetted specialist network scales with the scope. No hand-offs to a junior bench.
              </p>
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                We work the way a good agency partner works: inside your team, on your deadlines, accountable for the output — not just the recommendation.
              </p>
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                And we run what we sell. The <b style={{ color: 'var(--fg)' }}>Enso Trading Terminal</b> runs autonomous research, signal intelligence and brokerage execution in production, twenty-four hours a day.
              </p>
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

      {/* SERVICES */}
      <section data-screen-label="03 Services">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 02</span>&nbsp;Services</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">Three services. Buy one, or all three in sequence.</h2>
            </div>
          </div>
        </div>

        <div className="shell" style={{ paddingLeft: 0, paddingRight: 0, maxWidth: 'none' }}>
          <div className="pillars">
            <div className="pillar reveal lens-amber">
              <div className="pillar-num">
                <span>P / 01</span><span className="tag">ADVISORY</span>
              </div>
              <h3>AI Strategy &amp; Readiness</h3>
              <p>Interviews, data and workflow audits, and a readiness assessment — so you know which decisions AI should touch first, what it will cost, and what will pass review.</p>
              <ul>
                <li>AI readiness &amp; maturity audit</li>
                <li>Opportunity backlog &amp; ROI model</li>
                <li>Executive workshops · 8–15 people</li>
                <li>Governance &amp; risk frame · NIST RMF</li>
                <li>Roadmap with named owners</li>
              </ul>
            </div>

            <div className="pillar reveal lens-blue" data-delay="1">
              <div className="pillar-num">
                <span>P / 02</span><span className="tag teal">BUILD</span>
              </div>
              <h3>Custom AI Systems</h3>
              <p>We build against your real data — agents, retrieval, and integrations into the tools your team already uses — and ship into production, not into a demo.</p>
              <ul>
                <li>Agent architecture · LangGraph / CrewAI</li>
                <li>RAG knowledge systems</li>
                <li>MCP server development</li>
                <li>Workflow automation · N8N · Claude API</li>
                <li>Production deployment &amp; evaluation</li>
              </ul>
            </div>

            <div className="pillar reveal lens-coral" data-delay="2">
              <div className="pillar-num">
                <span>P / 03</span><span className="tag">OPERATE</span>
              </div>
              <h3>Managed AI Operations</h3>
              <p>Then we run it, and it gets better every month. Monitoring, evaluation and tuning, reporting to your leadership, and enablement for the people using it — until your team is ready to take it in-house.</p>
              <ul>
                <li>Monitoring, evaluation &amp; tuning</li>
                <li>Enablement cohorts · Center of Excellence</li>
                <li>Monthly reporting to leadership</li>
                <li>Model &amp; vendor upgrades</li>
                <li>Documented handover on request</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="shell" style={{ marginTop: 48 }}>
          <div className="reveal mono-sm" style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'baseline', marginBottom: 32 }}>
            <span style={{ letterSpacing: '0.06em' }}>HOW ENGAGEMENTS START</span>
            <span style={{ color: 'var(--fg-2)' }}>2-week AI Audit · fixed fee</span>
            <span style={{ color: 'var(--fg-2)' }}>8–12 week build</span>
            <span style={{ color: 'var(--fg-2)' }}>monthly managed operations</span>
          </div>
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
                Pulled from live client engagements and the systems we operate. No vanity metrics.
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
              <div className="label">Average time-to-first-value, first workshop to deployed system</div>
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

      {/* LIVE INTELLIGENCE — slim banner */}
      <section data-screen-label="04.5 Live intelligence" style={{ paddingTop: 0 }}>
        <div className="shell">
          <Link className="s2n-banner reveal" href="/insights">
            <div>
              <div className="label">Live Intelligence · Powered by Enso Labs</div>
              <div className="title">Daily AI signals for people who have to decide.</div>
              <div className="sub">Competitive, AI and financial signals for marketing and strategy teams — updated every weekday, ET.</div>
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
              <h2 className="h2">Four engagements, from first workshop to running system.</h2>
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

      {/* HOW WE WORK */}
      <section data-screen-label="06 How we work">
        <div className="shell">
          <div className="section-head">
            <div className="reveal">
              <span className="eyebrow"><span className="num">§ 05</span>&nbsp;How we work</span>
            </div>
            <div className="reveal" data-delay="1">
              <h2 className="h2">Four phases. One team.</h2>
              <p className="lede" style={{ marginTop: 24 }}>
                Principal-led delivery, designed so a pilot doesn&rsquo;t die in the lab.
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
              { num: '01', wks: 'WK 1–2', title: 'Diagnose', body: 'AI maturity assessment, technical discovery, stakeholder mapping. We measure where you actually are.', out: '→ Readiness scorecard & gap map' },
              { num: '02', wks: 'WK 3–6', title: 'Design', body: 'Roadmap, business case, governance frame, and the production architecture. Designed for what has to run.', out: '→ Roadmap · ROI model · architecture' },
              { num: '03', wks: 'WK 7–12', title: 'Build', body: 'Agent architecture, RAG, MCP, integrations. The advisor and the build team are one unit, so nothing gets lost in translation.', out: '→ Working system in production' },
              { num: '04', wks: 'WK 13+', title: 'Operate', body: 'We run the system, report on it monthly, and train your people on it. When you want it in-house, we document it and hand it over.', out: '→ Managed operations · enablement · handover' },
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
            <p className="lede" style={{ margin: 0 }}>Have something that has to work in production? Let&apos;s talk.</p>
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
