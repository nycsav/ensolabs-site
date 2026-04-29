import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbSchema,
  orgSchema,
  productSchema,
} from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Enso Labs has delivered AI transformation projects for Fortune 500 organizations including production intelligence platforms, AI Centers of Excellence, and autonomous trading systems.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd
        schemas={[
          orgSchema(),
          productSchema(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Work', href: '/work' },
          ]),
        ]}
      />

      <style>{`
        .case { padding: clamp(80px, 10vw, 140px) 0; border-top: 1px solid var(--line); scroll-margin-top: 100px; }
        .case-head { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; margin-bottom: 56px; align-items: end; }
        @media (max-width: 900px) { .case-head { grid-template-columns: 1fr; gap:24px; } }
        .case-meta { display: grid; gap: 16px; }
        .case-meta .row { display:flex; justify-content:space-between; gap:16px; padding:10px 0; border-bottom: 1px solid var(--line); font-family: var(--mono); font-size:12px; color:var(--fg-2); }
        .case-meta .row span:first-child { color: var(--fg-3); }
        .case-title { font-family: var(--display); font-weight:500; letter-spacing:-0.02em; line-height: 0.98; font-size: clamp(40px, 5.5vw, 76px); }
        .case-vis { background: var(--bg-2); border: 1px solid var(--line); border-radius: 12px; padding: 32px; min-height: 380px; margin-bottom: 56px; position: relative; overflow: hidden; }
        .case-body { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; align-items: start; }
        @media (max-width: 900px) { .case-body { grid-template-columns: 1fr; gap: 32px; } }
        .case-body h3 { font-family: var(--mono); font-size: 11px; color: var(--fg-3); text-transform: uppercase; letter-spacing: 0.06em; font-weight: 500; margin-bottom: 16px; }
        .case-body p { color: var(--fg-2); font-size: 16px; line-height: 1.6; margin-bottom: 16px; }
        .case-body p strong { color: var(--fg); font-weight: 500; }
        .case-body ul { list-style:none; display:grid; gap: 10px; margin-bottom: 24px; }
        .case-body ul li { display:flex; gap: 12px; color: var(--fg-2); font-size: 15px; line-height: 1.55; }
        .case-body ul li::before { content:"›"; color: var(--teal); font-family: var(--mono); flex-shrink:0; }
        .outcome-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border:1px solid var(--line); margin-top: 24px; }
        @media (max-width: 700px){ .outcome-grid { grid-template-columns: 1fr 1fr; } }
        .outcome { background: var(--bg); padding: 22px; }
        .outcome .num { font-family: var(--display); font-size: clamp(32px, 3.5vw, 44px); font-weight: 400; letter-spacing:-0.02em; line-height: 1; }
        .outcome .num em { font-style:normal; color:var(--teal); font-size: 0.55em; vertical-align: super; margin-left: 2px; }
        .outcome .lbl { margin-top: 8px; font-family: var(--mono); font-size: 11px; color: var(--fg-3); text-transform: uppercase; letter-spacing: 0.04em; }
        .dash { display: grid; grid-template-columns: 200px 1fr 240px; gap: 1px; background: var(--line); height: 380px; border:1px solid var(--line); border-radius: 10px; overflow: hidden; }
        .dash-col { background: var(--bg); padding: 18px; }
        .dash-col h5 { font-family: var(--mono); font-size: 11px; color:var(--fg-3); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:12px; font-weight:500; }
        .dash-row { font-family: var(--mono); font-size: 12px; color: var(--fg-2); display:flex; justify-content:space-between; padding: 6px 0; border-bottom:1px dashed color-mix(in oklab, var(--line) 80%, transparent); }
        .dash-row .v { color: var(--teal); }
        .dash-row.amber .v { color: var(--amber); }
        .signal-card { border:1px solid var(--line); border-radius:8px; padding: 14px; margin-bottom: 10px; }
        .signal-card .tt { font-size: 14px; color: var(--fg); font-weight:500; }
        .signal-card .me { font-family: var(--mono); font-size: 11px; color: var(--fg-3); display:flex; gap:12px; margin-top:6px; }
        .signal-card .sc { color: var(--teal); }
        .terminal-mini { height: 100%; padding: 14px; font-family: var(--mono); font-size: 11.5px; background: var(--bg); color: var(--fg-2); line-height: 1.7; overflow: hidden; }
        .terminal-mini .tl { display:flex; justify-content:space-between; }
        .terminal-mini .tl .v { color: var(--teal); }
        .terminal-mini .tl .a { color: var(--amber); }
        .terminal-mini .sep { height:1px; background: var(--line); margin: 6px 0; }
      `}</style>

      <section className="hero" data-screen-label="01 Work hero" style={{ paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow"><span className="num">PAGE / 03</span>&nbsp;Work</span>
          </div>
          <h1 className="display reveal" data-delay="1" style={{ fontSize: 'clamp(44px, 7.5vw, 104px)' }}>
            Strategy <em>shipped</em>.<br />
            <span className="accent">Production-grade.</span>
          </h1>
          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              Enso Labs has delivered AI transformation for Fortune 500 organizations — production intelligence platforms,
              AI Centers of Excellence, and autonomous trading systems. Four representative engagements.
            </p>
            <div className="reveal" data-delay="3">
              <div className="mono-sm" style={{ display: 'grid', gap: 6 }}>
                <a href="#gore">↳ CS / 01 &nbsp; Gore M2 Intelligence Hub</a>
                <a href="#heller">↳ CS / 02 &nbsp; Heller AI Center of Excellence</a>
                <a href="#terminal">↳ CS / 03 &nbsp; Enso Trading Terminal</a>
                <a href="#enablement">↳ CS / 04 &nbsp; Enterprise AI Enablement</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE 01 — GORE */}
      <div className="shell" id="gore">
        <div className="case" data-screen-label="02 Gore">
          <div className="case-head reveal">
            <div className="case-meta">
              <span className="eyebrow no-line"><span className="num">CASE / 01</span></span>
              <div className="row"><span>Client</span><span>W. L. Gore × Board of Innovation</span></div>
              <div className="row"><span>Sector</span><span>Advanced Materials</span></div>
              <div className="row"><span>Engagement</span><span>Strategy → Build → Ship</span></div>
              <div className="row"><span>Stack</span><span>LangGraph · Python · Claude · MCP</span></div>
              <div className="row"><span>Delivered</span><span>April 2026</span></div>
            </div>
            <div>
              <h2 className="case-title">
                Gore M2 Intelligence Hub.<br />
                <em style={{ fontStyle: 'italic', color: 'var(--fg-2)', fontWeight: 400 }}>A market-radar that scientists trust.</em>
              </h2>
            </div>
          </div>

          <div className="case-vis reveal">
            <div className="dash">
              <div className="dash-col">
                <h5>Gore Lens · 9 rules</h5>
                <div className="dash-row"><span>Temp floor</span><span className="v">ON</span></div>
                <div className="dash-row"><span>Material class</span><span className="v">ON</span></div>
                <div className="dash-row"><span>Chemistry scope</span><span className="v">ON</span></div>
                <div className="dash-row amber"><span>PFAS sensitivity</span><span className="v">REVIEW</span></div>
                <div className="dash-row"><span>Market size</span><span className="v">ON</span></div>
                <div className="dash-row"><span>Liability</span><span className="v">ON</span></div>
                <div className="dash-row"><span>Recency</span><span className="v">ON</span></div>
                <div className="dash-row"><span>Novelty</span><span className="v">ON</span></div>
                <div className="dash-row"><span>200°C gap</span><span className="v">ON</span></div>
              </div>
              <div className="dash-col">
                <h5>Surfaced signals · 16</h5>
                <div className="signal-card">
                  <div className="tt">High-temp PTFE alternative · pilot data</div>
                  <div className="me"><span>RWW <span className="sc">0.91</span></span><span>recency 4d</span><span>peer-reviewed</span></div>
                </div>
                <div className="signal-card">
                  <div className="tt">Aerospace insulation · novel chemistry</div>
                  <div className="me"><span>RWW <span className="sc">0.84</span></span><span>recency 12d</span><span>commercial</span></div>
                </div>
                <div className="signal-card">
                  <div className="tt">Battery separator · 200°C threshold beat</div>
                  <div className="me"><span>RWW <span className="sc">0.78</span></span><span>recency 9d</span><span>patent</span></div>
                </div>
              </div>
              <div className="dash-col">
                <h5>Pipeline · live</h5>
                <div className="terminal-mini" style={{ padding: 0 }}>
                  <div className="tl"><span>fetch · arxiv</span><span className="v">OK</span></div>
                  <div className="tl"><span>fetch · uspto</span><span className="v">OK</span></div>
                  <div className="tl"><span>fetch · tradepubs</span><span className="v">OK</span></div>
                  <div className="tl"><span>fetch · web</span><span className="a">214</span></div>
                  <div className="sep" />
                  <div className="tl"><span>react · screen</span><span className="v">731</span></div>
                  <div className="tl"><span>react · cluster</span><span className="v">111</span></div>
                  <div className="tl"><span>react · score</span><span className="v">16</span></div>
                  <div className="sep" />
                  <div className="tl"><span>encrypt · AES-256-GCM</span><span className="v">●</span></div>
                  <div className="tl"><span>publish · CEEX</span><span className="v">●</span></div>
                  <div className="tl"><span>review · lead-sci</span><span className="a">QUEUE</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="case-body reveal">
            <div>
              <h3>The brief</h3>
              <p>Gore needed a defensible go/no-go signal on emerging high-temperature materials markets — fast, but auditable enough that lead scientists would actually trust the output.</p>
            </div>
            <div>
              <h3>What we built</h3>
              <p><strong>Gore M2 Intelligence Hub</strong> — a production-grade, AES-256-GCM encrypted research dashboard powered by an 8-stage LangGraph pipeline with 4 parallel fetchers and ReAct agents.</p>
              <ul>
                <li>Proprietary <strong>Gore Lens</strong> — expert-knowledge encoding framework with toggleable, MCP-compatible relevance rules</li>
                <li>Signal-card architecture with RWW (Real / Win / Worth) scoring and full evidence trails</li>
                <li>9 configurable Gore Lens rules — temperature floor, material class, chemistry scope, PFAS sensitivity, market size, liability, recency, novelty, 200°C gap</li>
                <li>CEEX integration with token mapping into Gore&rsquo;s internal scoring tools</li>
              </ul>
              <h3 style={{ marginTop: 32 }}>Outcome</h3>
              <div className="outcome-grid">
                <div className="outcome"><div className="num">731</div><div className="lbl">Documents processed in pipeline run</div></div>
                <div className="outcome"><div className="num">111</div><div className="lbl">Sources curated &amp; clustered</div></div>
                <div className="outcome"><div className="num">16</div><div className="lbl">Market developments surfaced</div></div>
              </div>
              <p style={{ marginTop: 24 }}>
                <em style={{ color: 'var(--fg-3)', fontStyle: 'italic' }}>
                  Novel signals validated by lead scientist. Measurably higher relevance with Gore Lens ON vs OFF. Go/no-go commercialization milestone delivered April 2026.
                </em>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CASE 02 — HELLER */}
      <div className="shell" id="heller">
        <div className="case" data-screen-label="03 Heller">
          <div className="case-head reveal">
            <div className="case-meta">
              <span className="eyebrow no-line"><span className="num">CASE / 02</span></span>
              <div className="row"><span>Client</span><span>Heller Agency</span></div>
              <div className="row"><span>Sector</span><span>Healthcare / Pharma</span></div>
              <div className="row"><span>Engagement</span><span>AI Center of Excellence</span></div>
              <div className="row"><span>Stack</span><span>MindStudio · RAG · N8N · GA4</span></div>
              <div className="row"><span>Compliance</span><span>NIST RMF · FDA · MLR · PRC</span></div>
            </div>
            <div>
              <h2 className="case-title">
                An AI Center of Excellence<br />
                <em style={{ fontStyle: 'italic', color: 'var(--fg-2)', fontWeight: 400 }}>that ships pharma campaigns in 2 weeks.</em>
              </h2>
            </div>
          </div>

          <div className="case-vis reveal" style={{ padding: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: 380, gap: 1, background: 'var(--line)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: 'var(--bg)', padding: 24 }}>
                <h5 style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 18 }}>Brand knowledge bases · 5</h5>
                <div style={{ display: 'grid', gap: 10, fontFamily: 'var(--mono)', fontSize: 13 }}>
                  {['Tolmar / Eligard', 'Tolmar / Rubraca', 'Eton / DESMODA', 'Eton / INCRLEX', 'SpyGlass'].map((kb) => (
                    <div key={kb} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', border: '1px solid var(--line)', borderRadius: 6 }}>
                      <span>{kb}</span><span style={{ color: 'var(--teal)' }}>●  ACTIVE</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'var(--bg)', padding: 24 }}>
                <h5 style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 18 }}>Active automations · 8</h5>
                <div style={{ display: 'grid', gap: 6, fontFamily: 'var(--mono)', fontSize: 11.5, lineHeight: 1.6, color: 'var(--fg-2)' }}>
                  {[
                    ['Daily optimizer · Google Ads', '06:00 ET'],
                    ['MLR pre-flight scan', 'on-commit'],
                    ['Competitor mention rate', 'hourly'],
                    ['HCP search-intent rollup', 'daily'],
                    ['Brand voice eval (RAG)', 'on-draft'],
                    ['AI Search visibility', 'weekly'],
                    ['Campaign brief gen', 'on-demand'],
                    ['Looker → Slack digest', '07:00 ET'],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{k}</span><span style={{ color: 'var(--teal)' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', color: 'var(--fg-3)', fontSize: 11 }}>
                    <span>Concurrent campaigns</span><span style={{ color: 'var(--amber)' }}>6 RUNNING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="case-body reveal">
            <div>
              <h3>The brief</h3>
              <p>Heller — a full-service pharma agency — needed an AI Center of Excellence that respected MLR/PRC review, FDA compliance, and brand voice across multiple client portfolios.</p>
            </div>
            <div>
              <h3>What we built</h3>
              <ul>
                <li>End-to-end <strong>AI Center of Excellence</strong> with NIST AI RMF and FDA / MLR / PRC compliance baked in</li>
                <li>2 AI-powered applications on MindStudio with RAG retrieval grounded in 5 brand knowledge bases</li>
                <li>AI Search Strategy for pharma — competitive intelligence on AI mention rates across LLMs</li>
                <li>Google Ads management across 6 concurrent pharma campaigns + 8 active automations</li>
              </ul>
              <h3 style={{ marginTop: 32 }}>Outcome</h3>
              <div className="outcome-grid">
                <div className="outcome"><div className="num">75<em>%</em></div><div className="lbl">Pilot-to-production</div></div>
                <div className="outcome"><div className="num">83<em>%</em></div><div className="lbl">Faster campaign launches · 3mo → 2wk</div></div>
                <div className="outcome"><div className="num">35<em>%</em></div><div className="lbl">Time savings on weekly reporting</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CASE 03 — TRADING TERMINAL */}
      <div className="shell" id="terminal">
        <div className="case" data-screen-label="04 Trading Terminal">
          <div className="case-head reveal">
            <div className="case-meta">
              <span className="eyebrow no-line"><span className="num">CASE / 03</span></span>
              <div className="row"><span>Client</span><span>Internal · Enso Labs</span></div>
              <div className="row"><span>Sector</span><span>Financial Services / FinTech</span></div>
              <div className="row"><span>Engagement</span><span>Product build &amp; operate</span></div>
              <div className="row"><span>Stack</span><span>Python · LangGraph · Alpaca · Hyperliquid</span></div>
              <div className="row"><span>Status</span><span style={{ color: 'var(--teal)' }}>● Live in production</span></div>
            </div>
            <div>
              <h2 className="case-title">
                Enso Trading Terminal.<br />
                <em style={{ fontStyle: 'italic', color: 'var(--fg-2)', fontWeight: 400 }}>We build what we sell.</em>
              </h2>
            </div>
          </div>

          <div className="case-vis reveal" style={{ padding: 0 }}>
            <div style={{ height: 380, display: 'grid', gridTemplateRows: 'auto 1fr auto', background: 'var(--bg)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 24, padding: '14px 20px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--fg-3)' }}>
                <span><span style={{ color: 'var(--teal)' }}>●</span> &nbsp;LIVE</span>
                <span>EQUITIES</span><span>OPTIONS</span><span>CRYPTO</span><span>DEFI</span>
                <span style={{ marginLeft: 'auto' }}>P/L 24h <span style={{ color: 'var(--teal)' }}>+ 2.41%</span></span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1, background: 'var(--line)' }}>
                <div style={{ background: 'var(--bg)', padding: 18 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>News intelligence</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, lineHeight: 1.7 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>NVDA · earnings beat</span><span style={{ color: 'var(--teal)' }}>+0.92</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>SOFI · downgrade</span><span style={{ color: 'oklch(0.7 0.16 25)' }}>-0.61</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>BTC · ETF inflow</span><span style={{ color: 'var(--teal)' }}>+0.74</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>SPY · CPI print</span><span style={{ color: 'var(--amber)' }}>+0.18</span></div>
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--line)', color: 'var(--fg-3)' }}>scanned 2,134 articles · 14m</div>
                  </div>
                </div>
                <div style={{ background: 'var(--bg)', padding: 18 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Options flow</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, lineHeight: 1.7 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>NVDA 1100C · 5/2</span><span style={{ color: 'var(--teal)' }}>UNUSUAL</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>TSLA 280P · 5/9</span><span style={{ color: 'var(--amber)' }}>SWEEP</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>SPY 545C · 5/16</span><span style={{ color: 'var(--teal)' }}>BLOCK</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>AAPL 220C · 5/30</span><span style={{ color: 'var(--amber)' }}>SWEEP</span></div>
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--line)', color: 'var(--fg-3)' }}>tracked 18,402 contracts</div>
                  </div>
                </div>
                <div style={{ background: 'var(--bg)', padding: 18 }}>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Crypto · DeFi</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, lineHeight: 1.7 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>HL · ETH long</span><span style={{ color: 'var(--teal)' }}>+1.84%</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>HL · SOL long</span><span style={{ color: 'var(--teal)' }}>+0.42%</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>altFINS scan · 24h</span><span style={{ color: 'var(--amber)' }}>37 setups</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>signal-forge · v2</span><span style={{ color: 'var(--teal)' }}>●</span></div>
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed var(--line)', color: 'var(--fg-3)' }}>funding-rate guard ON</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '12px 20px', borderTop: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)', display: 'flex', justifyContent: 'space-between' }}>
                <span>signal-forge-v2 · build #1842 · all checks passed</span>
                <span>kill-switch ARMED · risk caps OK</span>
              </div>
            </div>
          </div>

          <div className="case-body reveal">
            <div>
              <h3>The brief</h3>
              <p>Internal product. The hypothesis: a single operator can run a multi-agent trading desk if the architecture is right. The proof point: revenue while we sleep.</p>
            </div>
            <div>
              <h3>What we built</h3>
              <ul>
                <li><strong>News Intelligence Trading Platform</strong> — news-driven trading algorithms across equities &amp; crypto</li>
                <li><strong>Public.com Trading Dashboard</strong> — Python web app (app.py · sr_engine.py · research.py)</li>
                <li><strong>Public Trading Central Command</strong> — multi-agent trading command center</li>
                <li>Automated Crypto Trading Program with altFINS integration · signal-forge architecture</li>
                <li>Hyperliquid DeFi investment strategy engine</li>
                <li>Options Lab with strategy testing guide · brokerage API integration (Alpaca, Public)</li>
                <li>GitHub version control · <span className="mono" style={{ color: 'var(--teal)' }}>nycsav/signal-forge-v2</span></li>
              </ul>
              <h3 style={{ marginTop: 32 }}>Outcome</h3>
              <p style={{ fontSize: 18, color: 'var(--fg)' }}>
                <em style={{ fontStyle: 'italic' }}>Production trading infrastructure spanning equities, options, and crypto / DeFi.</em>
                {' '}Demonstrates full-stack builder capability — strategy to deployed system, principal-led end to end.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CASE 04 — ENABLEMENT */}
      <div className="shell" id="enablement">
        <div className="case" data-screen-label="05 Enablement">
          <div className="case-head reveal">
            <div className="case-meta">
              <span className="eyebrow no-line"><span className="num">CASE / 04</span></span>
              <div className="row"><span>Clients</span><span>Citi · JPMorgan · Amex · Google · Microsoft · T-Mobile</span></div>
              <div className="row"><span>Sector</span><span>Cross-industry · Enterprise</span></div>
              <div className="row"><span>Engagement</span><span>Cohort enablement</span></div>
              <div className="row"><span>Cohort size</span><span>8–15 leaders</span></div>
            </div>
            <div>
              <h2 className="case-title">Enterprise AI Enablement Programs.</h2>
            </div>
          </div>

          <div className="case-body reveal">
            <div>
              <h3>The brief</h3>
              <p>Senior leaders need to make AI decisions, not slide-deck AI decisions. We run hands-on cohorts that end with a working artifact.</p>
            </div>
            <div>
              <h3>Outcome</h3>
              <div className="outcome-grid">
                <div className="outcome"><div className="num">3<em>mo</em></div><div className="lbl">Time-to-first-value</div></div>
                <div className="outcome"><div className="num">75<em>%</em></div><div className="lbl">Pilot-to-production</div></div>
                <div className="outcome"><div className="num">8–15</div><div className="lbl">Person cohorts</div></div>
              </div>
              <p style={{ marginTop: 24 }}>
                Legacy engagements include <strong>Citi</strong> (Web3/fintech strategy), <strong>AT&amp;T / BBDO</strong> (&ldquo;It Can Wait&rdquo; — 5MM+ pledges), <strong>American Express / Rokkan</strong> (50% social following increase), <strong>Google</strong> (Google+ launch strategy), and <strong>Jublia</strong> (omnichannel HCP/patient program).
              </p>
            </div>
          </div>
        </div>
      </div>

      <section data-screen-label="06 CTA">
        <div className="shell">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Ready for case<br />study <em>number</em> <span className="accent">five?</span>
            </h2>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="lede">Two-week diagnostic, fixed-fee. Roadmap + working agentic prototype delivered.</p>
              <div className="hero-cta-row">
                <Link className="btn btn-primary" href="/contact">Start a project <Arrow /></Link>
                <Link className="btn" href="/services">See services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
