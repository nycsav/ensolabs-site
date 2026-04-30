import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import {
  breadcrumbSchema,
  orgSchema,
  personSchema,
} from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sav Banerjee is an AI transformation consultant and agentic systems builder with 15+ years of experience at Google, McCann, Publicis, RAPP, and Young & Rubicam, certified by Anthropic, Google, and OpenAI.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Enso Labs | Founded by Sav Banerjee',
    description:
      'A principal-led AI transformation studio. 15+ years at Google, McCann, Publicis. Certified by Anthropic, Google, OpenAI.',
    url: '/about',
  },
  twitter: {
    title: 'About Enso Labs | Founded by Sav Banerjee',
    description:
      'A principal-led AI transformation studio. 15+ years at Google, McCann, Publicis. Certified by Anthropic, Google, OpenAI.',
  },
};

const TIMELINE = [
  { yr: '2020 → present', role: 'Enso Partners + Labs', sub: 'Founder & Principal AI Transformation Advisor', det: 'Enterprise AI advisory + agentic build practice. Clients: Gore, Citi, JPMorgan, AmEx, Google, Microsoft, T-Mobile.', tag: 'CURRENT' },
  { yr: '2022 → present', role: 'Heller Agency', sub: 'AI Solutions & Deployment Consultant', det: 'AI Center of Excellence for full-service pharma. 5 brand KBs · 8 automations · 6 concurrent campaigns.', tag: 'ACTIVE' },
  { yr: 'Freelance', role: 'McCann New York', sub: 'VP, Data & Experience Strategy', det: 'Healthcare CX including XDEMVY ophthalmology campaign.', tag: 'VP' },
  { yr: '—', role: 'RAPP', sub: 'Director, Experience Strategy', det: 'CRM, SEO, SEM across retail, e-commerce, finance, healthcare.', tag: 'DIR' },
  { yr: '—', role: 'Young & Rubicam Group', sub: 'Director of Strategy', det: 'Brand & CX strategy across Y&R network accounts.', tag: 'DIR' },
  { yr: '—', role: 'Organic / Omnicom', sub: 'Director of Strategy', det: 'Digital strategy across Omnicom-network accounts.', tag: 'DIR' },
  { yr: '—', role: 'Rokkan / Publicis', sub: 'Executive Director, Digital Strategy', det: 'American Express (50% social growth), Google+ launch strategy. Ad Age Top 10 Agency 2012.', tag: 'EXEC DIR' },
  { yr: '—', role: 'BBDO Worldwide', sub: 'Strategist', det: 'AT&T “It Can Wait” — 5MM+ pledges.', tag: 'STRAT' },
  { yr: 'Freelance', role: 'Google', sub: 'Strategy Director', det: 'Strategy direction on Google network programs.', tag: 'DIR' },
];

const ADVANTAGES = [
  { ix: '01', ti: 'Direct senior access', de: 'Every engagement is led by a senior advisor who also builds — no junior analysts running point. The person scoping your roadmap is in the codebase the next week.' },
  { ix: '02', ti: 'Builder credibility', de: 'The advisor and the build team work as one unit. Architecture decisions don’t get lost in translation between strategy and engineering.' },
  { ix: '03', ti: 'Dogfooding proof', de: 'Enso Labs runs its own agentic infrastructure: the Trading Terminal, automated lead gen, scheduled research, N8N workflows. We use what we sell.' },
  { ix: '04', ti: 'Agency-trained', de: '15+ years inside Google, McCann, Publicis, RAPP, Y&R, BBDO. The studio has sat across the room from your CFO, CMO, and General Counsel.' },
  { ix: '05', ti: 'Speed', de: 'No bloated team, no approval chain. A scope decided on Monday is in a sprint on Tuesday. The 3-month time-to-first-value is structural.' },
  { ix: '06', ti: 'Selective', de: 'A fixed pipeline of deep engagements per year. If we say yes, we mean it — and if we say no, you’ve saved $200k.' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schemas={[
          personSchema(),
          orgSchema(),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'About', href: '/about' },
          ]),
        ]}
      />

      <style>{`
        .bio-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; }
        @media (max-width: 900px) { .bio-grid { grid-template-columns: 1fr; gap: 32px; } }
        .portrait {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--line);
          background: var(--bg-2);
          max-width: 320px;
          width: 100%;
        }
        .portrait img {
          display: block;
          width: 100%;
          height: auto;
          filter: grayscale(20%);
        }
        .portrait .corner {
          position: absolute; top: 16px; right: 16px;
          font-family: var(--mono); font-size: 11px; color: var(--teal);
          background: color-mix(in oklab, var(--bg) 70%, transparent);
          padding: 4px 8px; border-radius: 4px;
          backdrop-filter: blur(6px);
        }
        .bio p { font-size: 17px; line-height: 1.65; color: var(--fg-2); margin-bottom: 18px; }
        .bio p strong { color: var(--fg); font-weight: 500; }
        .timeline { display: grid; gap: 0; }
        .tl-row { display: grid; grid-template-columns: 160px 1fr 1fr 100px; gap: 32px; padding: 24px 0; border-bottom: 1px solid var(--line); align-items: baseline; }
        .tl-row .yr { font-family: var(--mono); font-size: 12px; color: var(--fg-3); }
        .tl-row .role { font-size: 17px; font-weight: 500; letter-spacing: -0.01em; }
        .tl-row .role em { font-style: italic; color: var(--fg-2); font-weight: 400; display: block; font-size: 14px; margin-top: 2px; }
        .tl-row .det { color: var(--fg-2); font-size: 14.5px; line-height: 1.5; }
        .tl-row .ttag { font-family: var(--mono); font-size: 11px; color: var(--fg-3); text-align: right; }
        @media (max-width: 800px) { .tl-row { grid-template-columns: 1fr; gap: 8px; } .tl-row .ttag { text-align: left; } }
        .advantage { display:grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border:1px solid var(--line); }
        @media (max-width: 800px){ .advantage{ grid-template-columns:1fr; } }
        .adv { background: var(--bg); padding: 32px 28px; display: grid; gap: 12px; min-height: 200px; }
        .adv .ix { font-family: var(--mono); font-size: 11px; color: var(--teal); }
        .adv .ti { font-size: 22px; font-weight: 500; letter-spacing: -0.015em; }
        .adv .de { color: var(--fg-2); font-size: 15px; line-height: 1.55; }
        .cred-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
        @media (max-width: 900px) { .cred-grid { grid-template-columns: 1fr; gap: 32px; } }
        .cred h4 { font-family: var(--mono); font-size: 11px; color: var(--fg-3); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px; font-weight: 500; }
        .cred ul { list-style:none; display:grid; gap: 8px; }
        .cred ul li { font-size: 14.5px; color: var(--fg-2); padding: 6px 0; border-bottom: 1px dashed var(--line); display:flex; justify-content: space-between; gap: 12px; }
        .cred ul li b { color: var(--fg); font-weight: 500; }
        .cred ul li .yr { font-family: var(--mono); font-size: 11px; color: var(--fg-3); }
      `}</style>

      <section className="hero" data-screen-label="01 About hero" style={{ paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow"><span className="num">PAGE / 04</span>&nbsp;About</span>
          </div>
          <h1 className="display reveal" data-delay="1" style={{ fontSize: 'clamp(44px, 7.5vw, 104px)' }}>
            The advisor<br />
            <em>is the</em> <span className="accent">builder.</span>
          </h1>
          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              <b style={{ color: 'var(--fg)' }}>Sav Banerjee</b> is an AI transformation consultant and agentic systems builder with 15+ years
              of experience at Google, McCann, Publicis, RAPP, and Young &amp; Rubicam — certified by Anthropic, Google, and OpenAI.
            </p>
            <div className="reveal" data-delay="3">
              <div className="mono-sm" style={{ display: 'grid', gap: 8 }}>
                <div>↳ Founder &amp; Principal · Enso Labs</div>
                <div>↳ Manhattan, NYC</div>
                <div>↳ Perplexity AI Business Fellowship Winner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="02 Bio">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 01</span>&nbsp;Bio</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">15 years across the room from C-suite buyers — now writing the code.</h2></div>
          </div>

          <div className="bio-grid">
            <div className="reveal portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/sav-banerjee.jpg" alt="Sav Banerjee — Founder, Enso Labs" />
              <span className="corner">SB · NYC</span>
            </div>
            <div className="reveal bio" data-delay="1">
              <p>
                Sav started in agency strategy. Fifteen years at <strong>Google, McCann, Publicis, RAPP, Young &amp; Rubicam, BBDO, and Rokkan</strong> — managing $150MM+ portfolios across finance, healthcare, and technology. AT&amp;T&rsquo;s &ldquo;It Can Wait&rdquo; — 5MM+ pledges. American Express social — 50% growth. Google+ launch strategy. The Citi Web3 work.
              </p>
              <p>
                In 2020 he founded <strong>Enso Partners</strong> to do AI transformation advisory. The deck-only consulting model didn&rsquo;t survive contact with production. So the practice learned to ship: LangGraph, Claude API, MCP, RAG, Python. The first full Strategy-to-Ship engagement was the <strong>Gore M2 Intelligence Hub</strong> — eight LangGraph stages, encrypted dashboard, expert-knowledge framework, validated by their lead scientist.
              </p>
              <p>
                Today, Enso Labs is three things in one studio: <strong>consult, build, and ship</strong>. The Trading Terminal proves the model — the studio runs autonomous signal intelligence, news-driven algos, and brokerage execution as a production product, not a demo.
              </p>
              <p>The advisor and the build team work as one unit. That&rsquo;s the whole bet.</p>
              <div className="hero-cta-row" style={{ marginTop: 24 }}>
                <a className="btn" href="https://linkedin.com/in/savbanerjee" target="_blank" rel="noopener">LinkedIn</a>
                <a className="btn" href="https://github.com/nycsav" target="_blank" rel="noopener">GitHub</a>
                <Link className="btn btn-primary" href="/contact">Get in Touch <Arrow /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="03 Studio advantage">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 02</span>&nbsp;The studio advantage</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Why a principal-led studio outperforms a 50-person consultancy.</h2></div>
          </div>

          <div className="advantage reveal">
            {ADVANTAGES.map((a) => (
              <div key={a.ix} className="adv">
                <span className="ix">{a.ix}</span>
                <div className="ti">{a.ti}</div>
                <p className="de">{a.de}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="04 Career">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 03</span>&nbsp;Career</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Strategist · Director · VP · Founder.</h2></div>
          </div>

          <div className="timeline reveal">
            {TIMELINE.map((row, i) => (
              <div key={i} className="tl-row" style={i === 0 ? { borderTop: '1px solid var(--line)' } : undefined}>
                <span className="yr">{row.yr}</span>
                <div className="role">
                  {row.role}<em>{row.sub}</em>
                </div>
                <div className="det">{row.det}</div>
                <span className="ttag">{row.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="05 Credentials">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 04</span>&nbsp;Credentials</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Certified, fellowed, and shipped.</h2></div>
          </div>

          <div className="cred-grid reveal">
            <div className="cred">
              <h4>Certifications</h4>
              <ul>
                <li><b>Anthropic · Claude Code</b><span className="yr">2026</span></li>
                <li><b>Google AI</b><span className="yr">2025</span></li>
                <li><b>OpenAI</b><span className="yr">2024</span></li>
              </ul>
            </div>
            <div className="cred">
              <h4>Recognition</h4>
              <ul>
                <li><b>Perplexity AI Business Fellowship</b><span className="yr">winner</span></li>
                <li><b>Member, Perplexity Business</b><span className="yr">2025</span></li>
                <li><b>Ad Age Top 10 Agency</b><span className="yr">Rokkan ’12</span></li>
              </ul>
            </div>
            <div className="cred">
              <h4>Education</h4>
              <ul>
                <li><b>University of Oregon</b><span className="yr">B.A.</span></li>
                <li>Advertising · Mgmt + Creative<span className="yr"></span></li>
              </ul>
            </div>
          </div>

          <div className="reveal" style={{ marginTop: 64 }}>
            <div className="divider-label"><span>STACK</span></div>
            <div className="tag-row">
              {['LangGraph','LangChain','CrewAI','MCP','Claude API'].map((t) => <span key={t} className="tag teal">{t}</span>)}
              {['Python','React','N8N','BigQuery','GA4','Looker','Gemini','GPT-4','Alpaca MCP','Coupler.io','Perplexity Computer','Hyperliquid','altFINS'].map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="06 CTA">
        <div className="shell">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
              Want to talk?<br /><em>Let&rsquo;s</em> <span className="accent">scope it.</span>
            </h2>
            <div style={{ display: 'grid', gap: 24 }}>
              <p className="lede">Email goes straight to Sav. Calls land on the studio calendar. No screening, no pre-qualification.</p>
              <div className="hero-cta-row">
                <Link className="btn btn-primary" href="/contact">Get in Touch <Arrow /></Link>
                <a className="btn" href="mailto:sav@ensopartners.co">sav@ensopartners.co</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
