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

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'AI Research & Intelligence — Frontier AI for Strategy, Insights & Discovery | Enso Labs',
  description:
    'Enso Labs builds agentic research systems that go broad and deep — competitive intelligence, consumer insights, category analysis, and discovery sprints. Frontier AI for the research work agencies bill $200K for. Delivered in days.',
  alternates: { canonical: 'https://ensolabs.ai/services/ai-research-intelligence' },
  openGraph: {
    title: 'AI Research & Intelligence — Enso Labs',
    description:
      'Agentic harnesses that run the research and strategy work ad agencies and consulting firms bill $200K for — in days. Broad: market monitoring, category intel, competitive tracking. Deep: discovery sprints, consumer insights, expert synthesis.',
    url: 'https://ensolabs.ai/services/ai-research-intelligence',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'AI Research & Intelligence — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Research & Intelligence — Enso Labs',
    description:
      'Agentic research systems. Broad and deep. Competitive intelligence, consumer insights, category analysis, and discovery sprints — frontier AI in production.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
};

const FAQS = [
  {
    question: 'Can AI agents actually do research, or just summarize?',
    answer:
      'Production research agents go far beyond summarization. An agentic research harness runs structured queries across primary and secondary sources, applies domain-specific retrieval logic, reconciles conflicting signals, evaluates evidence quality, and outputs decision-ready synthesis with citations — the same cognitive steps a senior researcher follows. The difference is throughput: an agent runs 40 concurrent research threads where a human runs one.',
  },
  {
    question: 'What is an agentic research harness?',
    answer:
      'An agentic research harness is the architecture around the model — the brief, the journey map, the measurement plan, and the segmentation — that determines what the agent looks for, where it looks, how it evaluates what it finds, and what a good answer looks like. Without the harness, a frontier model is a fast reader. With it, it is a research system. Enso Labs builds and operates the harness as a managed service.',
  },
  {
    question: 'How is this different from a market research firm or a Gartner subscription?',
    answer:
      'Research firms produce syndicated reports on a fixed schedule for a general audience. An Enso Labs agentic research system is tuned to your specific domain, brand, competitors, and decision context — and it runs continuously. Instead of a quarterly Magic Quadrant, you get a daily competitive intelligence feed scoped to your exact category. Instead of a consumer study every 18 months, you get always-on voice-of-customer synthesis.',
  },
  {
    question: 'What types of research can agentic systems produce?',
    answer:
      'Competitive intelligence (competitor positioning, pricing, product moves, ad spend signals), consumer and market insights (VOC synthesis, review mining, cultural signal tracking), category intelligence (market sizing, white space mapping, trend detection), brand tracking (share-of-voice, sentiment, positioning drift), and strategic discovery (pre-brief research that compresses a 6-week agency discovery into 6 days).',
  },
  {
    question: 'Which frontier AI models power the research?',
    answer:
      'Enso Labs routes research workloads to the right model by task: Perplexity Computer for real-time, grounded, citable intelligence (we are a Perplexity Implementation Partner); Claude Opus for synthesis, domain reasoning, and long-context analysis; and Gemini for multi-modal and document-heavy research tasks. The harness, not the model, is the architecture decision.',
  },
];

const BROAD_CAPABILITIES = [
  {
    id: 'competitive',
    icon: '◈',
    title: 'Competitive Intelligence',
    body: 'Always-on monitoring of competitor positioning, messaging, pricing moves, product launches, and ad spend signals. The agent reads what analysts read — and flags the delta that matters to your category.',
    tag: 'Continuous',
  },
  {
    id: 'consumer',
    icon: '◎',
    title: 'Consumer & Market Insights',
    body: 'Voice-of-customer at machine scale. Reviews, interviews, forum threads, and social signal mined, clustered, and synthesized into decision-ready insight — not a 90-page deck nobody reads.',
    tag: 'Always-on VOC',
  },
  {
    id: 'category',
    icon: '◆',
    title: 'Category Intelligence',
    body: 'Market sizing, white space mapping, adjacent category signals, and trend detection — the research layer that precedes every good brief. Updated continuously, not once a year.',
    tag: 'Market sizing',
  },
  {
    id: 'brand-tracking',
    icon: '◇',
    title: 'Brand & Share-of-Voice Tracking',
    body: 'Automated brand health monitoring: sentiment, mention velocity, SOV against named competitors, positioning drift over time. Brand tracking that compounds, not a quarterly slide.',
    tag: 'Ongoing',
  },
  {
    id: 'signal',
    icon: '⬡',
    title: 'Market Signal Intelligence',
    body: 'The research engine powering Strategy → Ship. Frontier AI reads the signal — earnings calls, regulatory filings, conference proceedings, industry media — and surfaces the 5% that changes decisions.',
    tag: 'Frontier AI',
  },
];

const DEEP_CAPABILITIES = [
  {
    id: 'discovery',
    icon: '▶',
    title: 'Discovery Sprint',
    body: 'Six weeks of agency discovery compressed to six days. Structured research across category, consumer, competitive, and cultural territory — the brief input your campaign needs before a line of creative ships.',
    time: '6 days',
  },
  {
    id: 'primary',
    icon: '▷',
    title: 'Primary Research Acceleration',
    body: 'Qual and quant research design, recruitment, moderation, and synthesis — with AI running the synthesis layer in real time. What a research firm delivers in 10 weeks, scoped and synthesized in 3.',
    time: '3 weeks',
  },
  {
    id: 'expert',
    icon: '▸',
    title: 'Expert Knowledge Encoding',
    body: 'We encode your domain experts — their frameworks, mental models, and institutional knowledge — into a retrieval layer that the research agent queries before it synthesizes. The output carries their judgment, at agent throughput.',
    time: 'Ongoing',
  },
];

export default function AIResearchIntelligencePage() {
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
            { name: 'AI Research & Intelligence', href: '/services/ai-research-intelligence' },
          ]),
        ]}
      />

      <style>{`
        /* ─── page layout ─── */
        .ri-shell { max-width: 1100px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 64px); }

        /* ─── hero ─── */
        .ri-hero { padding: clamp(80px, 10vw, 140px) 0 clamp(60px, 7vw, 100px); border-bottom: 1px solid var(--line); }
        .ri-hero .eyebrow { font-family: var(--mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.12em; text-transform: uppercase; display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
        .ri-hero .eyebrow .teal { color: var(--teal); }
        .ri-hero h1 { font-size: clamp(40px, 6.5vw, 88px); font-weight: 500; line-height: 1.02; letter-spacing: -0.025em; margin: 0 0 28px; max-width: 18ch; }
        .ri-hero h1 em { font-style: normal; color: var(--teal); }
        .ri-hero .sub { font-size: clamp(17px, 2vw, 20px); color: var(--fg-2); line-height: 1.55; max-width: 52ch; margin-bottom: 44px; }
        .ri-stat-row { display: flex; gap: clamp(20px, 4vw, 48px); flex-wrap: wrap; margin-top: 44px; }
        .ri-stat { display: flex; flex-direction: column; gap: 4px; }
        .ri-stat .val { font-family: var(--mono); font-size: clamp(28px, 3.5vw, 42px); font-weight: 500; color: var(--teal); letter-spacing: -0.02em; }
        .ri-stat .label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.08em; text-transform: uppercase; }

        /* ─── argument block ─── */
        .ri-argument { padding: clamp(60px, 8vw, 112px) 0; border-bottom: 1px solid var(--line); display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; align-items: start; }
        @media (max-width: 860px) { .ri-argument { grid-template-columns: 1fr; gap: 36px; } }
        .ri-argument-lhs { position: sticky; top: 100px; }
        .ri-argument-lhs .section-label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }
        .ri-argument-lhs h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; }
        .ri-argument-rhs p { font-size: 16px; color: var(--fg-2); line-height: 1.7; margin-bottom: 20px; }
        .ri-argument-rhs p:last-child { margin-bottom: 0; }
        .ri-argument-rhs strong { color: var(--fg); }

        /* ─── pipeline vis ─── */
        .ri-pipeline { padding: clamp(48px, 6vw, 80px) 0; border-bottom: 1px solid var(--line); }
        .ri-pipeline-label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 24px; }
        .ri-pipeline video, .ri-pipeline img { width: 100%; border-radius: 4px; border: 1px solid var(--line); display: block; }
        .ri-pipeline-caption { font-family: var(--mono); font-size: 12px; color: var(--fg-3); margin-top: 12px; }

        /* ─── broad grid ─── */
        .ri-broad { padding: clamp(60px, 8vw, 112px) 0; border-bottom: 1px solid var(--line); }
        .ri-broad-head { margin-bottom: 48px; }
        .ri-broad-head .section-label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 16px; }
        .ri-broad-head h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; margin-bottom: 16px; }
        .ri-broad-head p { font-size: 16px; color: var(--fg-2); line-height: 1.6; max-width: 56ch; }
        .ri-cap-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        @media (max-width: 860px) { .ri-cap-grid { grid-template-columns: 1fr; } }
        .ri-cap { background: var(--bg); padding: 32px 28px; display: flex; flex-direction: column; gap: 14px; transition: background 0.2s; }
        .ri-cap:hover { background: var(--bg-2); }
        .ri-cap .cap-icon { font-size: 22px; color: var(--teal); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 1px solid color-mix(in oklab, var(--teal) 30%, var(--line)); border-radius: 4px; }
        .ri-cap .cap-title { font-size: 16px; font-weight: 500; letter-spacing: -0.01em; color: var(--fg); }
        .ri-cap .cap-body { font-size: 14px; color: var(--fg-2); line-height: 1.6; }
        .ri-cap .cap-tag { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal); margin-top: auto; padding-top: 8px; }

        /* ─── deep grid ─── */
        .ri-deep { padding: clamp(60px, 8vw, 112px) 0; border-bottom: 1px solid var(--line); }
        .ri-deep-head { margin-bottom: 48px; }
        .ri-deep-head .section-label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 16px; }
        .ri-deep-head h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; margin-bottom: 16px; }
        .ri-deep-head p { font-size: 16px; color: var(--fg-2); line-height: 1.6; max-width: 56ch; }
        .ri-deep-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
        @media (max-width: 860px) { .ri-deep-grid { grid-template-columns: 1fr; } }
        .ri-deep-card { background: var(--bg); padding: 36px 28px; display: flex; flex-direction: column; gap: 14px; transition: background 0.2s; }
        .ri-deep-card:hover { background: var(--bg-2); }
        .ri-deep-card .dc-icon { font-size: 18px; color: var(--teal); font-family: var(--mono); }
        .ri-deep-card .dc-title { font-size: 20px; font-weight: 500; letter-spacing: -0.015em; }
        .ri-deep-card .dc-body { font-size: 14px; color: var(--fg-2); line-height: 1.65; flex: 1; }
        .ri-deep-card .dc-time { font-family: var(--mono); font-size: 12px; color: var(--teal); margin-top: auto; padding-top: 12px; border-top: 1px solid var(--line); }

        /* ─── harness callout ─── */
        .ri-harness { padding: clamp(60px, 8vw, 100px) 0; border-bottom: 1px solid var(--line); background: var(--bg-2); margin: 0 calc(-1 * clamp(20px, 5vw, 64px)); padding-left: clamp(20px, 5vw, 64px); padding-right: clamp(20px, 5vw, 64px); }
        .ri-harness-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        @media (max-width: 860px) { .ri-harness-inner { grid-template-columns: 1fr; } }
        .ri-harness .section-label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }
        .ri-harness h2 { font-size: clamp(24px, 3vw, 36px); font-weight: 500; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 20px; }
        .ri-harness p { font-size: 15px; color: var(--fg-2); line-height: 1.7; margin-bottom: 16px; }
        .ri-harness-inputs { display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); }
        .ri-harness-input { background: var(--bg); padding: 18px 22px; display: grid; grid-template-columns: 28px 1fr; gap: 14px; align-items: baseline; }
        .ri-harness-input .hi-num { font-family: var(--mono); font-size: 10px; color: var(--teal); }
        .ri-harness-input .hi-title { font-size: 14px; font-weight: 500; color: var(--fg); margin-bottom: 4px; }
        .ri-harness-input .hi-body { font-size: 13px; color: var(--fg-2); line-height: 1.5; grid-column: 2 / 3; }

        /* ─── proof section ─── */
        .ri-proof { padding: clamp(60px, 8vw, 100px) 0; border-bottom: 1px solid var(--line); }
        .ri-proof .section-label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }
        .ri-proof h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; margin-bottom: 40px; }
        .ri-proof-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border: 1px solid var(--line); margin-bottom: 40px; }
        @media (max-width: 700px) { .ri-proof-grid { grid-template-columns: 1fr; } }
        .ri-proof-card { background: var(--bg); padding: 32px 28px; }
        .ri-proof-card .pc-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fg-3); margin-bottom: 12px; }
        .ri-proof-card .pc-title { font-size: 17px; font-weight: 500; letter-spacing: -0.01em; margin-bottom: 10px; }
        .ri-proof-card .pc-body { font-size: 14px; color: var(--fg-2); line-height: 1.6; margin-bottom: 16px; }
        .ri-proof-card .pc-stat { font-family: var(--mono); font-size: 28px; font-weight: 500; color: var(--teal); letter-spacing: -0.02em; }
        .ri-proof-card .pc-stat-label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); }

        /* ─── FAQ ─── */
        .ri-faq { padding: clamp(60px, 8vw, 100px) 0; border-bottom: 1px solid var(--line); }
        .ri-faq .section-label { font-family: var(--mono); font-size: 11px; color: var(--fg-3); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }
        .ri-faq h2 { font-size: clamp(28px, 3.5vw, 44px); font-weight: 500; line-height: 1.08; letter-spacing: -0.02em; margin-bottom: 40px; }
        .ri-faq-list { display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); }
        .ri-faq-item summary { padding: 22px 24px; font-size: 16px; font-weight: 500; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
        .ri-faq-item summary::after { content: '+'; font-family: var(--mono); font-size: 18px; color: var(--teal); flex-shrink: 0; }
        .ri-faq-item[open] summary::after { content: '−'; }
        .ri-faq-item { background: var(--bg); }
        .ri-faq-item[open] { background: var(--bg-2); }
        .ri-faq-item p { padding: 0 24px 22px; font-size: 15px; color: var(--fg-2); line-height: 1.7; max-width: 72ch; }

        /* ─── CTA ─── */
        .ri-cta { padding: clamp(72px, 10vw, 120px) 0; text-align: center; }
        .ri-cta h2 { font-size: clamp(32px, 4.5vw, 56px); font-weight: 500; letter-spacing: -0.02em; margin-bottom: 20px; }
        .ri-cta p { font-size: 17px; color: var(--fg-2); line-height: 1.6; max-width: 52ch; margin: 0 auto 36px; }
      `}</style>

      <div className="ri-shell">

        {/* ── HERO ── */}
        <section className="ri-hero reveal">
          <p className="eyebrow">
            <span className="num">SERVICE</span>
            <span className="teal">●</span>
            AI Research &amp; Intelligence
          </p>
          <h1>
            AI doesn&rsquo;t<br />just code.<br /><em>It researches.</em>
          </h1>
          <p className="sub">
            The market consensus is that AI agents write software. The white space
            is research, strategy, and intelligence — the work that precedes every
            brief, campaign, and market entry decision. Agentic harnesses that go
            broad and deep simultaneously: continuous market monitoring plus
            research-grade discovery, at frontier model speed.
          </p>
          <div className="ri-stat-row">
            <div className="ri-stat">
              <span className="val">6 days</span>
              <span className="label">vs. 6-week agency discovery</span>
            </div>
            <div className="ri-stat">
              <span className="val">40×</span>
              <span className="label">concurrent research threads</span>
            </div>
            <div className="ri-stat">
              <span className="val">3</span>
              <span className="label">frontier models routed by task</span>
            </div>
          </div>
        </section>

        {/* ── THE ARGUMENT ── */}
        <section className="ri-argument reveal">
          <div className="ri-argument-lhs">
            <p className="section-label">§ 01 The opportunity</p>
            <h2>Research is where agents compete on the demand side.</h2>
          </div>
          <div className="ri-argument-rhs">
            <p>
              The AI market has poured capital into the supply side — models,
              infrastructure, coding agents. The demand side question — <strong>what
              does the business actually need to know before it acts?</strong> — is
              still answered the way it was in 2010: a six-week agency discovery,
              a quarterly Gartner report, or an 18-month consumer study.
            </p>
            <p>
              The consensus that AI agents are for engineering teams is a positioning
              artifact, not a capability limit. A frontier model reading 400 earnings
              call transcripts is doing research. An agent synthesizing 12,000
              consumer reviews against a brand rubric is producing insights. An
              agentic pipeline monitoring 60 competitor websites daily is running
              competitive intelligence.
            </p>
            <p>
              The constraint was always the harness, not the model. When the harness
              is built — the brief that tells the agent what to look for, the journey
              map that tells it what decision it is informing, the measurement plan
              that tells it what a good answer looks like — the agent produces
              research-grade intelligence. <strong>We build that harness, and we
              operate it in production.</strong>
            </p>
          </div>
        </section>

        {/* ── PIPELINE VISUALIZATION ── */}
        <section className="ri-pipeline reveal">
          <p className="ri-pipeline-label">§ The research harness — four inputs to a research agent</p>
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/insights/agent-harness-inputs-outputs-hero.png"
          >
            <source src="/images/insights/agent-harness-inputs-outputs-pipeline.mp4" type="video/mp4" />
            <img
              src="/images/insights/agent-harness-inputs-outputs-pipeline.gif"
              alt="Agentic research pipeline — four strategy inputs flowing into the agent harness: brief, journey map, measurement plan, segmentation"
            />
          </video>
          <p className="ri-pipeline-caption">
            The same four inputs that ship a production agent — brief, journey map,
            measurement plan, segmentation — are the inputs that define a research
            system. The model reads; the harness decides what reading is worth
            doing.{' '}
            <Link href="/insights/agent-harness-inputs-outputs" style={{ color: 'var(--teal)' }}>
              Read the harness deep-dive →
            </Link>
          </p>
        </section>

        {/* ── BROAD: 5 continuous capabilities ── */}
        <section className="ri-broad reveal">
          <div className="ri-broad-head">
            <p className="section-label">§ 02 Breadth — continuous intelligence</p>
            <h2>Always-on. Broad coverage.<br />Every category you compete in.</h2>
            <p>
              Broad research agents run 24/7 across the signals your strategy depends
              on. They do not produce a quarterly report — they maintain a living
              picture of your market.
            </p>
          </div>
          <div className="ri-cap-grid">
            {BROAD_CAPABILITIES.map((cap) => (
              <div key={cap.id} className="ri-cap">
                <div className="cap-icon">{cap.icon}</div>
                <p className="cap-title">{cap.title}</p>
                <p className="cap-body">{cap.body}</p>
                <p className="cap-tag">{cap.tag}</p>
              </div>
            ))}
            {/* 6th cell: proof pointer */}
            <div className="ri-cap" style={{ justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center' }}>
                Proof: Fortune 500 Market Intelligence Platform
              </p>
              <Link
                href="/work/gore"
                style={{ color: 'var(--teal)', fontSize: 14, marginTop: 10, textAlign: 'center' }}
              >
                See the engagement →
              </Link>
            </div>
          </div>
        </section>

        {/* ── DEEP: 3 deep research capabilities ── */}
        <section className="ri-deep reveal">
          <div className="ri-deep-head">
            <p className="section-label">§ 03 Depth — research-grade intelligence</p>
            <h2>Discovery that used to take weeks.<br /><em>Now takes days.</em></h2>
            <p>
              Deep research agents run structured primary and secondary research with
              domain-specific retrieval, evidence-quality evaluation, and expert-
              knowledge grounding — the steps a senior researcher follows, at 40×
              the throughput.
            </p>
          </div>
          <div className="ri-deep-grid">
            {DEEP_CAPABILITIES.map((cap) => (
              <div key={cap.id} className="ri-deep-card">
                <p className="dc-icon">{cap.icon}</p>
                <p className="dc-title">{cap.title}</p>
                <p className="dc-body">{cap.body}</p>
                <p className="dc-time">{cap.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HARNESS ARCHITECTURE CALLOUT ── */}
        <div className="ri-harness">
          <div className="ri-harness-inner">
            <div>
              <p className="section-label">§ 04 The architecture</p>
              <h2>The harness is the product, not the model.</h2>
              <p>
                Any team can call a frontier model API. The differentiator in
                production research is the harness: the four strategy inputs that
                tell the agent what to look for, how to evaluate what it finds,
                and what a decision-ready output looks like for your domain.
              </p>
              <p>
                Enso Labs encodes your domain expertise — brand standards,
                competitive context, decision frameworks, and success criteria —
                into the harness before the first research thread runs.
                The model reads; the harness judges.
              </p>
              <Link href="/insights/agent-harness-inputs-outputs" style={{ color: 'var(--teal)', fontSize: 14 }}>
                Read: Build an Agent Harness →
              </Link>
            </div>
            <div className="ri-harness-inputs">
              {[
                { num: '01', title: 'The Brief', body: 'What decision does this research inform? Scopes the agent\'s search — without it, every result looks relevant.' },
                { num: '02', title: 'The Journey Map', body: 'Who is the reader and what do they already know? Governs depth, vocabulary, and evidence standard.' },
                { num: '03', title: 'The Measurement Plan', body: 'What does a good answer look like? The eval harness scores outputs before they surface.' },
                { num: '04', title: 'The Segmentation', body: 'Which sources count? Domain-specific retrieval tells the agent where to look — and what to ignore.' },
              ].map((item) => (
                <div key={item.num} className="ri-harness-input">
                  <p className="hi-num">{item.num}</p>
                  <div>
                    <p className="hi-title">{item.title}</p>
                    <p className="hi-body">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PROOF ── */}
        <section className="ri-proof reveal">
          <p className="section-label">§ 05 Production proof</p>
          <h2>Research agents we have shipped.</h2>
          <div className="ri-proof-grid">
            <div className="ri-proof-card">
              <p className="pc-label">Market Intelligence · Fortune 500 Manufacturer</p>
              <p className="pc-title">AI Market Intelligence Platform</p>
              <p className="pc-body">
                Continuous competitive and market intelligence platform for a global materials manufacturer.
                Real-time signal aggregation, RWW scoring, and evidence-trail UX — replacing a
                6-person analyst function with an always-on agentic system.
              </p>
              <p className="pc-stat">Real-time</p>
              <p className="pc-stat-label">vs. quarterly analyst reports</p>
              <Link href="/work/gore" style={{ color: 'var(--teal)', fontSize: 14, display: 'block', marginTop: 16 }}>
                See the engagement →
              </Link>
            </div>
            <div className="ri-proof-card">
              <p className="pc-label">Category Intelligence · Strategy → Ship</p>
              <p className="pc-title">Signal Lens — Market Sensing Engine</p>
              <p className="pc-body">
                The intelligence engine behind Strategy → Ship. Frontier AI monitors industry
                media, earnings calls, conference proceedings, and competitive signals — surfaces
                the 5% that changes decisions. Scout → Curator → Publisher pipeline,
                running in production.
              </p>
              <p className="pc-stat">Daily</p>
              <p className="pc-stat-label">signal synthesis, automated</p>
              <Link href="/insights" style={{ color: 'var(--teal)', fontSize: 14, display: 'block', marginTop: 16 }}>
                See the intelligence feed →
              </Link>
            </div>
          </div>
        </section>

        {/* ── FRONTIER MODEL ROUTING ── */}
        <section className="ri-deep reveal" style={{ borderBottom: '1px solid var(--line)' }}>
          <div className="ri-deep-head">
            <p className="section-label">§ 06 Frontier models, routed by task</p>
            <h2>We don&rsquo;t use &ldquo;AI.&rdquo;<br />We route to the right model.</h2>
            <p>
              Frontier AI is not one tool. The research harness routes each workload
              to the model with the right capability for that task — not the same
              API call for every question.
            </p>
          </div>
          <div className="ri-deep-grid">
            {[
              {
                id: 'perplexity',
                icon: '⊕',
                title: 'Perplexity Computer',
                body: 'Real-time, grounded, citable intelligence. The right model for competitive monitoring, news-driven signal, and any research that requires a live source. Enso Labs is a Perplexity Implementation Partner.',
                time: 'Real-time grounding',
              },
              {
                id: 'claude',
                icon: '⊗',
                title: 'Claude Opus',
                body: 'Long-context synthesis, domain reasoning, and nuanced judgment. The right model for synthesizing primary research, encoding expert knowledge, and producing decision-grade analysis from complex source material.',
                time: 'Deep synthesis',
              },
              {
                id: 'gemini',
                icon: '⊘',
                title: 'Gemini',
                body: 'Multi-modal and document-heavy research. The right model when the source material is a slide deck, a regulatory filing, a whitepaper, or any input that requires reading images alongside text.',
                time: 'Multi-modal research',
              },
            ].map((cap) => (
              <div key={cap.id} className="ri-deep-card">
                <p className="dc-icon">{cap.icon}</p>
                <p className="dc-title">{cap.title}</p>
                <p className="dc-body">{cap.body}</p>
                <p className="dc-time">{cap.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="ri-faq reveal">
          <p className="section-label">§ 07 Common questions</p>
          <h2>Straight answers.</h2>
          <div className="ri-faq-list">
            {FAQS.map((faq) => (
              <details key={faq.question} className="ri-faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="ri-cta reveal">
          <h2>Research that<br /><em>ships decisions.</em></h2>
          <p>
            If your team is still waiting six weeks for a discovery report or
            paying a research firm for a quarterly PDF, we can compress that to
            six days and keep it running. Start with a 2-week diagnostic.
          </p>
          <Link href="/contact" className="cta">
            Get in Touch <Arrow />
          </Link>
          <div style={{ marginTop: 20, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/services" style={{ color: 'var(--fg-2)', fontSize: 14 }}>
              ← All Service Tracks
            </Link>
            <Link href="/insights/agent-harness-inputs-outputs" style={{ color: 'var(--fg-2)', fontSize: 14 }}>
              Read: Build an Agent Harness →
            </Link>
            <Link href="/work/gore" style={{ color: 'var(--fg-2)', fontSize: 14 }}>
              See: Market Intelligence Platform →
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
