import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow } from '@/components/Arrow';
import { JsonLd } from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import {
  breadcrumbSchema,
  faqSchema,
  orgSchema,
  professionalServiceSchema,
} from '@/lib/schema';

// ISR: self-heal edge-cached HTML within ~5 min of a content change.
export const revalidate = 300;

const CTA_LABEL = 'Book an Agency AI Review';
// Same rule as app/contact/page.tsx: only use the booking URL when it is a real link.
const BOOKING_EXTERNAL = SITE.bookingUrl.startsWith('http');
const BOOKING_HREF = BOOKING_EXTERNAL ? SITE.bookingUrl : '/contact';

export const metadata: Metadata = {
  title: 'AI Consulting for Agencies — Agency AI Transformation & CoE',
  description:
    'AI consulting for agencies: a 10-day agency AI audit, then Enso Labs builds and runs your first agentic workflow in production — Salesforce AI integration, HubSpot AI workflows, marketing operations automation and paid media optimization agents.',
  alternates: { canonical: 'https://ensolabs.ai/ai-for-agencies' },
  openGraph: {
    title: 'AI Consulting for Agencies — From AI Tools to an AI Delivery Capability | Enso Labs',
    description:
      'Agency AI transformation that ships: a 10-day diagnostic, a pilot-to-production sprint, and an AI center of excellence for agencies with managed agentic workflows.',
    url: 'https://ensolabs.ai/ai-for-agencies',
    images: [{ url: 'https://ensolabs.ai/og-default.png?v=3', width: 1200, height: 630, alt: 'AI for Agencies — Enso Labs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Consulting for Agencies — Enso Labs',
    description:
      'Your agency has AI tools. Enso Labs builds the AI delivery capability: a 10-day diagnostic, then your first agentic workflow in production.',
    images: ['https://ensolabs.ai/og-default.png?v=3'],
  },
  other: { 'article:modified_time': '2026-09-24' },
};

/* ───────────────────────── Line-art icons (inline SVG, currentColor) ───────────────────────── */

const ICONS: Record<string, ReactNode> = {
  intel: (<><circle cx="14" cy="14" r="8" /><path d="M20 20l7 7" /><path d="M10 14h8M14 10v8" /></>),
  report: (<><path d="M5 27h24" /><path d="M8 23v-6M14 23V11M20 23v-9M26 23V7" /><circle cx="26" cy="7" r="2.5" /></>),
  qa: (<><rect x="6" y="5" width="20" height="24" rx="2" /><path d="M11 12l2 2 4-4M11 20l2 2 4-4M20 13h2M20 21h2" /></>),
  shield: (<><path d="M16 4l10 4v8c0 6-4.5 10-10 12-5.5-2-10-6-10-12V8z" /><path d="M11 16l3.5 3.5L21 13" /></>),
  pitch: (<><path d="M6 26V10l10-5 10 5v16" /><path d="M6 26h20M12 26v-7h8v7" /><path d="M11 13h10" /></>),
  gauge: (<><path d="M5 22a11 11 0 0 1 22 0" /><path d="M16 22l6-7" /><circle cx="16" cy="22" r="2" /><path d="M9 22h-2M25 22h-2" /></>),
  search: (<><path d="M5 9h14M5 15h10M5 21h8" /><circle cx="22" cy="20" r="5" /><path d="M26 24l3 3" /></>),
  intake: (<><path d="M5 8h22l-8 10v8l-6 3V18z" /></>),
  gov: (<><rect x="5" y="13" width="22" height="14" rx="2" /><path d="M10 13V9a6 6 0 0 1 12 0v4" /><circle cx="16" cy="20" r="2" /></>),
  prod: (<><circle cx="16" cy="16" r="10" /><path d="M16 10v6l4 3" /><path d="M26 6l3-3M29 6h-3V3" /></>),
  people: (<><circle cx="11" cy="11" r="4" /><circle cx="22" cy="12" r="3" /><path d="M4 26c0-4 3-7 7-7s7 3 7 7M18 26c0-3 2-6 5-6s5 3 5 6" /></>),
  measure: (<><path d="M5 27V5M5 27h22" /><path d="M9 21l5-6 4 3 7-9" /></>),
  check: (<path d="M6 16l6 6L26 9" />),
  crm: (<><circle cx="16" cy="9" r="4" /><path d="M8 27c0-4.5 3.5-8 8-8s8 3.5 8 8" /><path d="M4 14h4M24 14h4" /><circle cx="4" cy="14" r="1" /><circle cx="28" cy="14" r="1" /></>),
  hub: (<><circle cx="16" cy="16" r="4" /><circle cx="6" cy="7" r="2.5" /><circle cx="26" cy="7" r="2.5" /><circle cx="16" cy="28" r="2.5" /><path d="M8 9l5 4.5M24 9l-5 4.5M16 20v5.5" /></>),
  ops: (<><rect x="4" y="6" width="8" height="6" rx="1" /><rect x="20" y="6" width="8" height="6" rx="1" /><rect x="12" y="21" width="8" height="6" rx="1" /><path d="M12 9h8M8 12v5h8v4M24 12v5h-8" /></>),
  dash: (<><rect x="4" y="5" width="24" height="22" rx="2" /><path d="M4 11h24" /><path d="M9 22v-4M14 22v-7M19 22v-5M24 22v-9" /></>),
  media: (<><path d="M4 22l7-7 5 4 12-12" /><path d="M22 7h6v6" /><path d="M4 27h24" /></>),
};

function Icon({ name, size = 28 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}

function BookCta({ className = 'btn btn-primary' }: { className?: string }) {
  if (BOOKING_EXTERNAL) {
    return (
      <a className={className} href={BOOKING_HREF} target="_blank" rel="noopener" data-booking>
        {CTA_LABEL} <Arrow />
      </a>
    );
  }
  return (
    <Link className={className} href={BOOKING_HREF}>
      {CTA_LABEL} <Arrow />
    </Link>
  );
}

/* ───────────────────────── Content ───────────────────────── */

const KPIS = [
  { n: '75%', l: 'Pilot-to-production conversion', s: 'One regulated-marketing agency case — not an average', hero: true },
  { n: '83%', l: 'Faster campaign launch: 3 months → 2 weeks', s: 'Regulated-marketing agency' },
  { n: '~70%', l: 'Less manual research and analysis', s: 'Agentic research workflows' },
  { n: '731 → 16', l: 'Documents → novel commercial signals, validated by the lead scientist', s: 'Fortune 500 advanced-materials manufacturer' },
  { n: '~3 mo', l: 'Average time to first value', s: 'Enterprise AI enablement programs' },
];

const COSTS = [
  'Pilots that impress in a demo and never reach a client',
  'Shadow tools with no rules for client data',
  'Margin leaking into manual research, reporting and QA',
  'Compliance exposure on regulated work',
];

const HARNESS = [
  { k: 'Context', v: 'Client data, brand rules, SOWs, metric definitions' },
  { k: 'Guardrails', v: 'Approval paths, evidence trails, permissions' },
  { k: 'Evals', v: 'Golden questions with known answers, re-run on every change' },
  { k: 'Operations', v: 'Named owners, KPIs, a corrections memory' },
];

const USE_CASES = [
  {
    icon: 'intel',
    title: 'Client & competitive intelligence briefs',
    body: 'An agent watches the sources you name and drafts a cited weekly brief for each account team.',
    moves: 'Time to insight',
    proof: '~70% less manual research in agentic research workflows',
  },
  {
    icon: 'report',
    title: 'Performance reporting & anomaly alerts',
    body: 'A metric dictionary per client, drafted commentary, and alerts when a number moves outside its normal range.',
    moves: 'Reporting cycle time · errors caught before the client sees them',
  },
  {
    icon: 'qa',
    title: 'Campaign QA & launch checklists',
    body: 'Automated checks on links, tags, naming, specs and approvals before anything goes live.',
    moves: 'Launch cycle time · defects at launch',
    proof: 'See the case: campaign launch 3 months → 2 weeks',
  },
  {
    icon: 'shield',
    title: 'Regulated content pre-flight',
    body: 'Each claim is matched to its approved reference and routed to medical, legal or regulatory review with the evidence attached.',
    moves: 'Review rounds · time to approval',
  },
  {
    icon: 'pitch',
    title: 'Pitch & RFP research',
    body: 'Prospect, category and competitor research assembled into a first-draft point of view for the new-business team.',
    moves: 'Pitch prep time · research depth',
  },
  {
    icon: 'gauge',
    title: 'Measurement & tracking health checks',
    body: 'Scheduled checks that catch broken tags, missing conversions and taxonomy drift across client properties.',
    moves: 'Data gaps found before reporting day',
  },
  {
    icon: 'search',
    title: 'AI search visibility monitoring',
    body: 'Tracks how clients appear in AI-generated answers and which sources get cited, with a gap list to act on.',
    moves: 'Share of AI answers · citation coverage',
  },
  {
    icon: 'intake',
    title: 'Brief intake',
    body: 'Structures incoming requests, flags missing information and routes the brief to the right team with context attached.',
    moves: 'Brief-to-first-draft time · rework',
  },
];

const CAPABILITIES = [
  {
    icon: 'crm',
    title: 'Salesforce AI integration',
    body: 'Lead scoring, routing and nurture flows; campaign-to-opportunity attribution; agent actions that read and write CRM records behind a human approval gate.',
  },
  {
    icon: 'hub',
    title: 'HubSpot AI workflows',
    body: 'The same scoring, routing, nurture and attribution on HubSpot — plus HubSpot-to-Salesforce migration support: signal and attribution requirements, data mapping.',
  },
  {
    icon: 'ops',
    title: 'Marketing operations automation',
    body: 'Lead intelligence from qualification to routing to nurture to pipeline, plus reporting automation, campaign QA and brief intake.',
  },
  {
    icon: 'dash',
    title: 'Dashboards & measurement',
    body: 'GA4 → BigQuery → Looker foundations and tracking health checks — one source of truth across campaign, CRM and web data.',
  },
  {
    icon: 'media',
    title: 'Paid media optimization agents',
    body: 'Daily monitoring and optimization across Google, LinkedIn and Meta. Budget follows performance continuously, not at the monthly review — with anomaly alerts and human approval on every change.',
    link: { href: '/services/ai-growth-marketing', label: 'AI growth marketing →' },
  },
];

const QUESTIONS = [
  { q: 'Does it hurt today?', s: 'The cost of the status quo' },
  { q: 'Do we own the data?', s: 'Feasibility' },
  { q: 'Does it compound into the rest?', s: 'Leverage' },
  { q: 'Can we prove it in 30 days?', s: 'Proof velocity' },
];

const PHASES = [
  {
    days: 'Days 1–3',
    title: 'Discover',
    body: 'Interviews with leadership and delivery leads; map current workflows, tools, data access and client approval paths.',
    outcome: 'A shared map of where AI is used today, and where it is blocked.',
  },
  {
    days: 'Days 4–6',
    title: 'Prioritize',
    body: 'Score candidate workflows on value, feasibility and risk; agree on the governance tier for each.',
    outcome: 'A ranked opportunity matrix and a shortlist of three.',
  },
  {
    days: 'Days 7–9',
    title: 'Design',
    body: 'Blueprint the first agentic workflow: context, guardrails, evals, owners and the KPI it must move.',
    outcome: 'A build-ready workflow blueprint, not a slide of ideas.',
  },
  {
    days: 'Day 10',
    title: 'Readout',
    body: 'Executive readout with the 90-day roadmap, operating model and business case.',
    outcome: 'A go / no-go decision on the pilot-to-production sprint.',
  },
];

const DELIVERABLES = [
  'Workflow assessment',
  'Opportunity matrix (value × feasibility × risk)',
  'Governance tiers and operating-model recommendation',
  'First agentic workflow blueprint',
  '90-day roadmap with owners and KPIs',
  'Executive readout',
];

// Illustrative opportunity matrix. x = feasibility, y = value (0–100).
const MATRIX = [
  { n: 1, name: 'Performance reporting', x: 78, y: 80, start: true },
  { n: 2, name: 'Campaign QA', x: 84, y: 64, start: true },
  { n: 3, name: 'Intelligence briefs', x: 64, y: 72, start: true },
  { n: 4, name: 'Regulated pre-flight', x: 36, y: 86, start: false },
  { n: 5, name: 'Pitch research', x: 70, y: 38, start: false },
  { n: 6, name: 'Brief intake', x: 86, y: 30, start: false },
  { n: 7, name: 'Tracking health checks', x: 44, y: 56, start: false },
  { n: 8, name: 'Custom attribution model', x: 20, y: 34, start: false },
];

const TIERS = [
  {
    tier: 'High-stakes & regulated',
    examples: 'Product claims, healthcare content, client-facing numbers',
    control: 'Human approval before release; every claim linked to its evidence',
    pace: 'Accuracy first',
  },
  {
    tier: 'Client-facing, standard',
    examples: 'Performance commentary, social copy, status reports',
    control: 'Human review with evals on golden questions; sampled audits',
    pace: 'Balanced',
  },
  {
    tier: 'Internal research & ops',
    examples: 'Competitive scans, pitch prep, brief structuring',
    control: 'Logged and spot-checked; the team edits, the agent learns',
    pace: 'Speed first',
  },
];

const EVALUATE = [
  {
    icon: 'gov',
    title: 'Governance',
    body: 'Rules your delivery teams can actually use: what AI may touch, who approves, how client data is kept separate.',
    ask: 'Show me the approval path for a regulated deliverable.',
  },
  {
    icon: 'prod',
    title: 'First workflow in production',
    body: 'A partner should leave something running, not just a roadmap. Ask what is live when the engagement ends.',
    ask: 'Which workflow will be in production, and by when?',
  },
  {
    icon: 'people',
    title: 'Adoption',
    body: 'Tools do not change habits. Look for named owners, enablement tied to real work, and a feedback loop.',
    ask: 'Who owns this after you leave, and how are they trained?',
  },
  {
    icon: 'measure',
    title: 'Measurement',
    body: 'Every workflow ships with a baseline, a KPI and evals, so you can prove value to leadership and clients.',
    ask: 'What is the baseline, and how will we know it improved?',
  },
];

const LADDER = [
  {
    step: '01',
    title: 'Agency AI Diagnostic',
    dur: '10 business days',
    best: 'Agencies with scattered AI use and no agreed first workflow.',
    get: [
      'Workflow assessment and opportunity matrix',
      'Governance tiers for your client work',
      'First agentic workflow blueprint',
      '90-day roadmap and business case',
      'Executive readout',
    ],
  },
  {
    step: '02',
    title: 'Pilot-to-production sprint',
    dur: '4–8 weeks',
    best: 'Teams with a prioritized workflow ready to build.',
    get: [
      'The first agentic workflow built and running on real client work',
      'Context layer, guardrails and eval set',
      'Baseline and KPI dashboard',
      'Runbook and trained workflow owners',
      'Go-live review with leadership',
    ],
  },
  {
    step: '03',
    title: 'AI CoE & managed agents',
    dur: 'Monthly retainer',
    best: 'Agencies scaling AI across accounts and service lines.',
    get: [
      'Managed agents operated and improved in production',
      'New workflows added from the roadmap',
      'Governance and eval reviews',
      'Team enablement and office hours',
      'Quarterly value report for leadership',
    ],
  },
];

const LOOP = [
  { k: 'Assess', ask: '“Where is AI actually saving us time — and where is it adding risk?”' },
  { k: 'Build', ask: '“Get our weekly client reporting drafted and checked before the account lead opens it.”' },
  { k: 'Scale', ask: '“Roll the same workflow out to five more accounts without adding review burden.”' },
];

const FAQ = [
  {
    question: 'How long does the Agency AI Diagnostic take?',
    answer:
      'Ten business days from kickoff to executive readout. If you continue, the pilot-to-production sprint typically runs four to eight weeks, depending on the workflow and data access.',
  },
  {
    question: 'What do you need from our team?',
    answer:
      'An executive sponsor, a named owner for each candidate workflow, access to the relevant tools and sample work, and a weekly review slot. We do the interviews, mapping, scoring and design work.',
  },
  {
    question: 'How do you handle data security and client confidentiality?',
    answer:
      'We work inside your approved tools and accounts, keep each client’s data separate, use enterprise model settings that exclude your data from training where the platform offers it, and log what agents read and produce. Client names and data never appear in our materials.',
  },
  {
    question: 'Can you work on regulated content such as healthcare or pharma?',
    answer:
      'Yes. Regulated work sits in the highest governance tier: every claim is linked to its approved evidence and nothing is released without human approval by your medical, legal or regulatory reviewers. AI speeds up preparation and checking; it does not replace review.',
  },
  {
    question: 'Which AI tools and platforms do you use?',
    answer:
      'We are model- and platform-agnostic and start from the stack you already license. The deliverable is the workflow around the model — context, guardrails, evals and owners — so it keeps working as models change.',
  },
  {
    question: 'What happens after the diagnostic?',
    answer:
      'You get a go / no-go decision on a pilot-to-production sprint for the top workflow. Many agencies then move to an AI center of excellence retainer, where Enso operates managed agents and adds workflows from the roadmap. There is no obligation to continue.',
  },
  {
    question: 'Who is this for, and who is it not for?',
    answer:
      'It is for independent and midsize agencies and in-house marketing teams that already use AI tools informally and want a governed, measurable delivery capability. It is not for teams looking only for prompt training or a tool license, or without a leader willing to own a workflow.',
  },
  {
    question: 'How is this different from AI training or a one-week AI audit?',
    answer:
      'Training changes skills and audits produce recommendations. Enso ends the diagnostic with a build-ready workflow blueprint, then builds and runs that first workflow in production with you, measured against a baseline.',
  },
];

const START = [
  'Name one workflow that eats your team’s week',
  'Pick the sponsor who will own the outcome',
  'Gather two or three recent examples of that work',
  'Book a review — we will tell you if the diagnostic fits',
];

/* ───────────────────────── Page ───────────────────────── */

export default function AIForAgenciesPage() {
  // Matrix geometry (viewBox 480 × 400): plot area x 56–464, y 20–348.
  const px = (x: number) => 56 + (x / 100) * 408;
  const py = (y: number) => 348 - (y / 100) * 328;

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
          faqSchema(FAQ),
        ]}
      />

      <style>{`
        .afa-sr { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
        .afa-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); margin-top:40px; }
        .afa-grid.three { grid-template-columns:repeat(3,1fr); }
        .afa-card { background:var(--bg); padding:28px 26px; display:flex; flex-direction:column; gap:12px; min-width:0; }
        .afa-card .ix { font-family:var(--mono); font-size:11px; color:var(--teal); letter-spacing:0.06em; text-transform:uppercase; }
        .afa-card .ic { color:var(--teal); }
        .afa-card h3 { font-size:19px; font-weight:500; letter-spacing:-0.015em; line-height:1.2; color:var(--fg); }
        .afa-card p { color:var(--fg-2); font-size:15px; line-height:1.55; }
        .afa-moves { margin-top:auto; padding-top:14px; border-top:1px solid var(--line); font-family:var(--mono); font-size:11.5px; letter-spacing:0.02em; color:var(--fg-2); line-height:1.5; }
        .afa-moves b { color:var(--fg-3); font-weight:400; text-transform:uppercase; letter-spacing:0.06em; display:block; margin-bottom:4px; font-size:10.5px; }
        .afa-proof { font-family:var(--mono); font-size:11.5px; color:var(--teal); line-height:1.5; }
        .afa-sub { font-family:var(--mono); font-size:12px; color:var(--fg-3); letter-spacing:0.05em; text-transform:uppercase; margin-top:56px; }

        /* hero workflow strip */
        .afa-flow { margin-top:56px; display:grid; grid-template-columns:repeat(5,1fr); gap:0; border:1px solid var(--line); background:color-mix(in oklab, var(--bg-2) 60%, transparent); list-style:none; padding:0; }
        .afa-flow li { padding:18px 18px 20px; border-right:1px solid var(--line); display:flex; flex-direction:column; gap:10px; min-width:0; }
        .afa-flow li:last-child { border-right:0; }
        .afa-flow .st { font-family:var(--mono); font-size:10.5px; letter-spacing:0.08em; text-transform:uppercase; color:var(--fg-3); }
        .afa-flow .nm { font-size:15px; color:var(--fg); line-height:1.3; }
        .afa-flow .ic { color:var(--teal); }
        .afa-flow-note { font-family:var(--mono); font-size:11.5px; color:var(--fg-3); margin-top:12px; letter-spacing:0.02em; }
        .afa-flow-note span { color:var(--teal); }

        /* KPI band */
        .afa-kpis { display:grid; grid-template-columns:1.4fr repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); }
        .afa-kpi { background:var(--bg); padding:28px 22px; display:flex; flex-direction:column; gap:10px; min-width:0; }
        .afa-kpi .n { font-family:var(--display); font-size:clamp(34px,3.4vw,46px); font-weight:500; letter-spacing:-0.02em; line-height:1; color:var(--fg); white-space:nowrap; }
        .afa-kpi.lead .n { font-size:clamp(52px,5.6vw,76px); color:var(--teal); }
        .afa-kpi .l { font-size:14.5px; color:var(--fg); line-height:1.4; }
        .afa-kpi .s { font-family:var(--mono); font-size:11px; color:var(--fg-3); letter-spacing:0.03em; line-height:1.5; margin-top:auto; }
        .afa-foot { font-family:var(--mono); font-size:11px; color:var(--fg-3); margin-top:14px; letter-spacing:0.02em; line-height:1.6; }

        /* thesis */
        .afa-two { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
        .afa-costs { list-style:none; padding:0; margin-top:24px; display:grid; gap:1px; background:var(--line); border:1px solid var(--line); }
        .afa-costs li { background:var(--bg); padding:16px 20px; font-size:15px; color:var(--fg-2); display:flex; gap:12px; align-items:baseline; }
        .afa-costs .x { color:var(--amber); font-family:var(--mono); font-size:12px; }
        .afa-thesis { border:1px solid var(--line-2); padding:32px 28px; background:var(--bg-2); }
        .afa-thesis .tag { font-family:var(--mono); font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:var(--teal); }
        .afa-thesis h3 { font-size:clamp(24px,2.4vw,32px); font-weight:500; letter-spacing:-0.02em; line-height:1.15; margin-top:14px; color:var(--fg); }
        .afa-thesis p { color:var(--fg-2); font-size:15.5px; line-height:1.6; margin-top:14px; }
        .afa-harness { margin-top:24px; display:grid; gap:6px; }
        .afa-layer { border:1px solid var(--line-2); padding:12px 16px; display:grid; grid-template-columns:120px 1fr; gap:16px; align-items:baseline; background:var(--bg); }
        .afa-layer .k { font-family:var(--mono); font-size:12px; color:var(--teal); letter-spacing:0.04em; text-transform:uppercase; }
        .afa-layer .v { font-size:14px; color:var(--fg-2); line-height:1.45; }
        .afa-layer.core { border-style:solid; border-color:var(--line); text-align:center; grid-template-columns:1fr; font-family:var(--mono); font-size:12px; color:var(--fg-3); letter-spacing:0.06em; text-transform:uppercase; }
        .afa-vs { display:grid; grid-template-columns:1fr 1fr; gap:1px; background:var(--line); border:1px solid var(--line); margin-top:24px; }
        .afa-vs div { background:var(--bg); padding:16px 18px; font-size:14px; color:var(--fg-2); line-height:1.5; }
        .afa-vs div b { display:block; font-family:var(--mono); font-weight:400; font-size:10.5px; letter-spacing:0.08em; text-transform:uppercase; color:var(--fg-3); margin-bottom:6px; }
        .afa-vs div.us b { color:var(--teal); }
        .afa-vs div.us { color:var(--fg); }

        /* capabilities */
        .afa-caps { display:grid; grid-template-columns:repeat(5,1fr); gap:1px; background:var(--line); border:1px solid var(--line); margin-top:40px; }
        .afa-caps .afa-card { padding:28px 22px; }
        .afa-link { margin-top:auto; font-family:var(--mono); font-size:12px; color:var(--teal); letter-spacing:0.02em; padding-top:8px; }
        .afa-link:hover { text-decoration:underline; }
        .afa-qs { margin-top:40px; border:1px solid var(--line); padding:24px; background:var(--bg-2); }
        .afa-qs ol { list-style:none; padding:0; margin-top:16px; display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); }
        .afa-qs li { background:var(--bg); padding:18px 18px; display:flex; flex-direction:column; gap:6px; min-width:0; }
        .afa-qs .n { font-family:var(--mono); font-size:11px; color:var(--teal); letter-spacing:0.06em; }
        .afa-qs .q { font-size:17px; color:var(--fg); font-weight:500; line-height:1.3; letter-spacing:-0.01em; }
        .afa-qs .s { font-family:var(--mono); font-size:11px; color:var(--fg-3); letter-spacing:0.04em; text-transform:uppercase; }

        /* timeline */
        .afa-track { display:grid; grid-template-columns:3fr 3fr 3fr 1.6fr; gap:1px; margin-top:40px; }
        .afa-bar { height:6px; background:var(--line-2); border-radius:3px; }
        .afa-bar.last { background:var(--teal); }
        .afa-phases { display:grid; grid-template-columns:3fr 3fr 3fr 1.6fr; gap:1px; background:var(--line); border:1px solid var(--line); margin-top:14px; }
        .afa-phase { background:var(--bg); padding:24px 22px; display:flex; flex-direction:column; gap:10px; min-width:0; }
        .afa-phase .d { font-family:var(--mono); font-size:11px; color:var(--teal); letter-spacing:0.06em; text-transform:uppercase; }
        .afa-phase h3 { font-size:22px; font-weight:500; letter-spacing:-0.015em; color:var(--fg); }
        .afa-phase p { font-size:14.5px; color:var(--fg-2); line-height:1.55; }
        .afa-phase .o { margin-top:auto; padding-top:12px; border-top:1px solid var(--line); font-size:14px; color:var(--fg); line-height:1.45; }
        .afa-phase .o b { display:block; font-family:var(--mono); font-weight:400; font-size:10.5px; letter-spacing:0.08em; text-transform:uppercase; color:var(--fg-3); margin-bottom:4px; }
        .afa-deliv-wrap { display:grid; grid-template-columns:1fr 1.15fr; gap:48px; align-items:start; margin-top:16px; }
        .afa-deliv { display:grid; gap:1px; background:var(--line); border:1px solid var(--line); margin-top:16px; list-style:none; padding:0; }
        .afa-deliv li { background:var(--bg); padding:16px 20px; font-size:15px; color:var(--fg); line-height:1.4; display:flex; gap:12px; align-items:center; }
        .afa-deliv .ic { color:var(--teal); flex:none; }
        .afa-matrix { border:1px solid var(--line); background:var(--bg-2); padding:20px; margin-top:16px; }
        .afa-matrix svg { width:100%; height:auto; display:block; }
        .afa-mx-head { display:flex; justify-content:space-between; gap:12px; align-items:baseline; flex-wrap:wrap; }
        .afa-mx-head h3 { font-size:17px; font-weight:500; color:var(--fg); }
        .afa-chip { font-family:var(--mono); font-size:10.5px; letter-spacing:0.08em; text-transform:uppercase; color:var(--amber); border:1px solid var(--amber-dim); border-radius:999px; padding:3px 10px; white-space:nowrap; }
        .afa-mx-key { list-style:none; padding:0; margin-top:14px; display:grid; grid-template-columns:1fr 1fr; gap:6px 18px; }
        .afa-mx-key li { font-size:13.5px; color:var(--fg-2); display:flex; gap:10px; align-items:center; }
        .afa-mx-key .dotn { font-family:var(--mono); font-size:11px; width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex:none; border:1.5px solid #646a70; color:var(--fg-2); }
        .afa-mx-key .dotn.on { border-color:#12a7a7; background:#12a7a7; color:var(--bg); }
        .afa-mx-key li.on { color:var(--fg); }

        /* governance table */
        .afa-table { width:100%; border-collapse:collapse; margin-top:40px; border:1px solid var(--line); }
        .afa-table th { text-align:left; font-family:var(--mono); font-weight:400; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:var(--fg-3); padding:14px 18px; border-bottom:1px solid var(--line); background:var(--bg-2); }
        .afa-table td { padding:20px 18px; border-bottom:1px solid var(--line); font-size:15px; color:var(--fg-2); line-height:1.5; vertical-align:top; }
        .afa-table td.t { color:var(--fg); font-weight:500; }
        .afa-pace { font-family:var(--mono); font-size:11px; letter-spacing:0.04em; border:1px solid var(--line-2); border-radius:999px; padding:3px 10px; white-space:nowrap; color:var(--fg-2); }
        .afa-loopnote { margin-top:20px; display:flex; gap:14px; align-items:center; border:1px solid var(--line); padding:16px 20px; color:var(--fg); font-size:15px; }
        .afa-loopnote .ic { color:var(--teal); flex:none; }

        /* ask line */
        .afa-ask { margin-top:auto; padding-top:14px; border-top:1px solid var(--line); font-family:var(--mono); font-size:12px; color:var(--fg-2); line-height:1.55; }
        .afa-ask b { display:block; color:var(--teal); font-weight:400; font-size:10.5px; letter-spacing:0.08em; text-transform:uppercase; margin-bottom:4px; }

        /* ladder */
        .afa-ladder { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:40px; }
        .afa-rung { border:1px solid var(--line); background:var(--bg); padding:28px 26px; display:flex; flex-direction:column; gap:14px; min-width:0; }
        .afa-rung.mid { border-color:var(--line-2); background:var(--bg-2); }
        .afa-rung .top { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; }
        .afa-rung .ix { font-family:var(--mono); font-size:11px; color:var(--teal); letter-spacing:0.06em; }
        .afa-dur { font-family:var(--mono); font-size:11px; color:var(--fg); border:1px solid var(--line-2); border-radius:999px; padding:4px 11px; white-space:nowrap; }
        .afa-rung h3 { font-size:22px; font-weight:500; letter-spacing:-0.015em; line-height:1.2; color:var(--fg); }
        .afa-rung .best { font-size:14px; color:var(--fg-2); line-height:1.5; }
        .afa-rung ul { list-style:none; padding:0; display:grid; gap:10px; border-top:1px solid var(--line); padding-top:16px; }
        .afa-rung li { font-size:14.5px; color:var(--fg); line-height:1.45; display:flex; gap:10px; align-items:flex-start; }
        .afa-rung li .ic { color:var(--teal); flex:none; margin-top:1px; }
        .afa-rung .yg { font-family:var(--mono); font-size:10.5px; letter-spacing:0.08em; text-transform:uppercase; color:var(--fg-3); }

        /* case */
        .afa-chips { display:flex; gap:8px; flex-wrap:wrap; margin-top:8px; }
        .afa-chips span { font-family:var(--mono); font-size:11px; letter-spacing:0.04em; color:var(--fg-2); border:1px solid var(--line-2); border-radius:999px; padding:5px 12px; }
        .afa-story { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line); border:1px solid var(--line); margin-top:32px; }
        .afa-story div { background:var(--bg); padding:24px 22px; min-width:0; }
        .afa-story b { display:block; font-family:var(--mono); font-weight:400; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:var(--teal); margin-bottom:10px; }
        .afa-story p { font-size:15px; color:var(--fg-2); line-height:1.6; }
        .afa-case-res { display:grid; grid-template-columns:1fr 1.6fr; gap:1px; background:var(--line); border:1px solid var(--line); margin-top:20px; }
        .afa-case-res .cell { background:var(--bg); padding:26px 24px; min-width:0; }
        .afa-bignum { font-family:var(--display); font-size:clamp(52px,5.6vw,72px); font-weight:500; letter-spacing:-0.02em; line-height:1; color:var(--teal); }
        .afa-bignum-l { font-size:15px; color:var(--fg); margin-top:12px; }
        .afa-bignum-s { font-family:var(--mono); font-size:11px; color:var(--fg-3); margin-top:6px; letter-spacing:0.03em; line-height:1.5; }
        .afa-chart h3 { font-size:16px; font-weight:500; color:var(--fg); }
        .afa-chart .cap { font-family:var(--mono); font-size:11px; color:var(--fg-3); margin-top:4px; letter-spacing:0.02em; }
        .afa-bars { margin-top:22px; display:grid; gap:16px; }
        .afa-brow { display:grid; grid-template-columns:64px 1fr; gap:14px; align-items:center; }
        .afa-brow .k { font-family:var(--mono); font-size:11.5px; color:var(--fg-2); letter-spacing:0.04em; text-transform:uppercase; }
        .afa-brow .trk { position:relative; height:28px; border-left:1px solid var(--line-2); }
        .afa-brow .fill { height:100%; border-radius:0 4px 4px 0; }
        .afa-brow .fill.before { width:100%; background:#646a70; }
        .afa-brow .fill.after { width:16.7%; min-width:8px; background:#12a7a7; }
        .afa-brow .val { font-size:14px; color:var(--fg); white-space:nowrap; }
        .afa-brow .in { position:absolute; top:0; bottom:0; display:flex; align-items:center; }
        .afa-brow .in.inside { left:12px; }
        .afa-brow .in.outside { left:calc(16.7% + 10px); }
        .afa-delta { margin-top:18px; font-family:var(--mono); font-size:12px; color:var(--teal); letter-spacing:0.02em; }

        /* loop */
        .afa-loop { display:grid; grid-template-columns:1fr 40px 1fr 40px 1fr; align-items:stretch; margin-top:40px; }
        .afa-node { border:1px solid var(--line-2); background:var(--bg-2); padding:24px 22px; display:flex; flex-direction:column; gap:12px; min-width:0; }
        .afa-node .k { font-family:var(--mono); font-size:11px; color:var(--teal); letter-spacing:0.08em; text-transform:uppercase; }
        .afa-node h3 { font-size:24px; font-weight:500; letter-spacing:-0.015em; color:var(--fg); }
        .afa-node p { font-family:var(--mono); font-size:12.5px; color:var(--fg-2); line-height:1.6; }
        .afa-arr { display:flex; align-items:center; justify-content:center; color:var(--fg-3); }
        .afa-return { margin-top:10px; border:1px solid var(--line); border-top:0; height:28px; margin-left:16%; margin-right:16%; position:relative; }
        .afa-return-l { text-align:center; font-family:var(--mono); font-size:11.5px; color:var(--fg-3); margin-top:10px; letter-spacing:0.02em; }

        /* FAQ */
        .afa-faq { border-top:1px solid var(--line); margin-top:40px; }
        .afa-faq details { border-bottom:1px solid var(--line); }
        .afa-faq summary { cursor:pointer; list-style:none; display:flex; justify-content:space-between; gap:24px; align-items:baseline; padding:22px 0; font-size:18px; color:var(--fg); font-weight:500; letter-spacing:-0.01em; }
        .afa-faq summary::-webkit-details-marker { display:none; }
        .afa-faq summary .pm { font-family:var(--mono); color:var(--teal); font-size:16px; flex:none; transition:transform .2s; }
        .afa-faq details[open] summary .pm { transform:rotate(45deg); }
        .afa-faq .a { padding:0 0 24px; max-width:78ch; color:var(--fg-2); font-size:15.5px; line-height:1.65; }

        /* closing band — page-local contrast fixes for .cta-blue */
        .cta-blue .afa-cta .btn-primary { color:oklch(0.30 0.09 250); }
        .cta-blue .afa-cta .btn-primary:hover { background:#fff; border-color:#fff; color:oklch(0.30 0.09 250); }
        .afa-cta { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
        .afa-start { border:1px solid rgba(255,255,255,.4); padding:26px 24px; background:rgba(255,255,255,.06); }
        .afa-start .t { font-family:var(--mono); font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#fff; }
        .afa-start ol { list-style:none; padding:0; margin-top:16px; display:grid; gap:12px; }
        .afa-start li { display:flex; gap:14px; align-items:baseline; color:#fff; font-size:16px; line-height:1.45; }
        .afa-start li span { font-family:var(--mono); font-size:12px; color:rgba(255,255,255,.85); flex:none; }

        @media (max-width:1100px){
          .afa-kpis { grid-template-columns:repeat(2,1fr); }
          .afa-kpi.lead { grid-column:1 / -1; }
          .afa-grid, .afa-caps, .afa-qs ol { grid-template-columns:repeat(2,1fr); }
          .afa-caps .afa-card:last-child { grid-column:1 / -1; }
        }
        @media (max-width:900px){
          .afa-two, .afa-deliv-wrap, .afa-cta, .afa-case-res { grid-template-columns:1fr; gap:32px; }
          .afa-case-res { gap:1px; }
          .afa-flow { grid-template-columns:1fr 1fr; }
          .afa-flow li { border-right:0; border-bottom:1px solid var(--line); }
          .afa-flow li:nth-child(odd) { border-right:1px solid var(--line); }
          .afa-flow li:last-child { border-bottom:0; grid-column:1 / -1; border-right:0; }
          .afa-track { display:none; }
          .afa-phases { grid-template-columns:1fr 1fr; }
          .afa-grid.three, .afa-ladder, .afa-story { grid-template-columns:1fr; }
          .afa-loop { grid-template-columns:1fr; gap:0; }
          .afa-arr { height:36px; transform:rotate(90deg); }
          .afa-return { display:none; }
          .afa-table thead { display:none; }
          .afa-table, .afa-table tbody, .afa-table tr, .afa-table td { display:block; width:100%; }
          .afa-table tr { border-bottom:1px solid var(--line); padding:8px 0; }
          .afa-table td { border-bottom:0; padding:8px 18px; }
          .afa-table td::before { content:attr(data-l); display:block; font-family:var(--mono); font-size:10.5px; letter-spacing:0.08em; text-transform:uppercase; color:var(--fg-3); margin-bottom:4px; }
        }
        @media (max-width:560px){
          .afa-grid, .afa-kpis, .afa-phases, .afa-vs, .afa-caps, .afa-qs ol { grid-template-columns:1fr; }
          .afa-qs { padding:16px; }
          .afa-flow { grid-template-columns:1fr; }
          .afa-flow li, .afa-flow li:nth-child(odd) { border-right:0; }
          .afa-mx-key { grid-template-columns:1fr; }
          .afa-layer { grid-template-columns:1fr; gap:4px; }
          .afa-matrix { padding:14px; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="hero" data-screen-label="01 AI for Agencies hero" style={{ paddingBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell">
          <div className="reveal" style={{ marginBottom: 36 }}>
            <span className="eyebrow"><span className="num">SERVICES</span>&nbsp;AI consulting for agencies</span>
          </div>
          <h1 className="display reveal" data-delay="1" style={{ fontSize: 'clamp(38px, 5.8vw, 84px)' }}>
            Your agency has AI tools. <em>It needs an AI delivery capability.</em>
          </h1>
          <div className="hero-foot">
            <p className="lede reveal" data-delay="2">
              Enso Labs helps independent and midsize agencies turn scattered AI experiments into governed, measurable client delivery. <b style={{ color: 'var(--fg)' }}>We start with a 10-day diagnostic, then build and run your first agentic workflow in production — not just a roadmap.</b>
            </p>
            <div className="reveal" data-delay="3">
              <div className="hero-cta-row">
                <BookCta />
                <Link className="btn" href="#diagnostic">See the 10-day diagnostic →</Link>
              </div>
            </div>
          </div>

          <ol className="afa-flow reveal" data-delay="3" aria-label="An agentic workflow, end to end">
            {[
              { st: '01 · In', nm: 'Brief or request arrives', ic: 'intake' },
              { st: '02 · Context', nm: 'Client data, brand rules, metric definitions', ic: 'intel' },
              { st: '03 · Agent', nm: 'Drafts, checks and cites', ic: 'report' },
              { st: '04 · Review', nm: 'Evals plus human approval by risk tier', ic: 'shield' },
              { st: '05 · Out', nm: 'Client-ready deliverable', ic: 'check' },
            ].map((s) => (
              <li key={s.st}>
                <span className="ic"><Icon name={s.ic} size={24} /></span>
                <span className="st">{s.st}</span>
                <span className="nm">{s.nm}</span>
              </li>
            ))}
          </ol>
          <p className="afa-flow-note reveal">
            <span>↺</span>&nbsp;Every correction feeds back into the context and the eval set — the system improves with use.
          </p>
        </div>
      </section>

      {/* ── KPI band ── */}
      <section data-screen-label="02 Proof" style={{ paddingTop: 0 }}>
        <div className="shell">
          <h2 className="afa-sr">Results from Enso Labs engagements</h2>
          <div className="afa-kpis reveal">
            {KPIS.map((k) => (
              <div key={k.n} className={`afa-kpi${k.hero ? ' lead' : ''}`}>
                <div className="n">{k.n}</div>
                <div className="l">{k.l}</div>
                <div className="s">{k.s}</div>
              </div>
            ))}
          </div>
          <p className="afa-foot reveal">
            Anonymized results from individual engagements. Each figure describes the program named beneath it; your results depend on your workflows and data.
          </p>
        </div>
      </section>

      {/* ── Problem + thesis ── */}
      <section data-screen-label="03 The agency problem">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 01</span>&nbsp;Agency AI transformation</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Agency AI stalls between the pilot and the client.</h2></div>
          </div>
          <div className="afa-two">
            <div className="reveal" data-delay="1">
              <p className="lede" style={{ fontSize: 18 }}>
                Most agencies already pay for AI tools. What they lack is the system around them — the rules, context, checks and owners that let AI touch real client work. Without it, AI stays a side project, and the costs show up anyway:
              </p>
              <ul className="afa-costs">
                {COSTS.map((c) => (
                  <li key={c}><span className="x" aria-hidden="true">×</span>{c}</li>
                ))}
              </ul>
              <div className="afa-vs">
                <div><b>Audit-only engagement</b>One to two weeks of interviews, ending in a recommendations deck. Your team still has to build it.</div>
                <div className="us"><b>Enso Labs</b>A 10-day diagnostic that ends in a build-ready blueprint — then we build and run the first workflow with you.</div>
              </div>
            </div>
            <div className="afa-thesis reveal" data-delay="2">
              <span className="tag">Enso’s thesis</span>
              <h3>The model is a commodity. The harness around it is the deliverable.</h3>
              <p>
                Models change every quarter. The durable asset is the operating system around them: the context your clients’ work depends on, the guardrails that keep it safe, the evals that prove it is right, and the people who own it.
              </p>
              <div className="afa-harness" role="img" aria-label="The agency AI harness: operations, evals, guardrails and context wrapped around the model">
                {[...HARNESS].reverse().map((h) => (
                  <div key={h.k} className="afa-layer">
                    <span className="k">{h.k}</span>
                    <span className="v">{h.v}</span>
                  </div>
                ))}
                <div className="afa-layer core">The model — any vendor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use-case gallery ── */}
      <section data-screen-label="04 Use cases">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 02</span>&nbsp;Use cases</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Agentic workflows for marketing agencies.</h2></div>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede" style={{ maxWidth: '72ch' }}>
              Eight workflows we see pay back first in agency delivery. The diagnostic tells you which one to start with.
            </p>
          </div>
          <div className="afa-grid reveal" data-delay="2">
            {USE_CASES.map((u) => (
              <div key={u.title} className="afa-card">
                <span className="ic"><Icon name={u.icon} /></span>
                <h3>{u.title}</h3>
                <p>{u.body}</p>
                {u.proof && <span className="afa-proof">{u.proof}</span>}
                <div className="afa-moves"><b>Moves</b>{u.moves}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section data-screen-label="05 Capabilities">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 03</span>&nbsp;What we connect and build</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Salesforce, HubSpot, marketing ops and paid media — wired into one system.</h2></div>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede" style={{ maxWidth: '72ch' }}>
              Agentic workflows only pay off when they run on the systems your agency and its clients already use. These are the integrations and builds we deliver.
            </p>
          </div>
          <div className="afa-caps reveal" data-delay="2">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="afa-card">
                <span className="ic"><Icon name={c.icon} size={32} /></span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                {c.link && <Link className="afa-link" href={c.link.href}>{c.link.label}</Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The 10-day diagnostic ── */}
      <section id="diagnostic" data-screen-label="06 Diagnostic">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 04</span>&nbsp;AI audit for agencies</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">The 10-day Agency AI CoE &amp; Agentic Workflow Diagnostic.</h2></div>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede" style={{ maxWidth: '72ch' }}>
              Ten business days from scattered experiments to a prioritized, governed plan — and a first agentic workflow ready to build.
            </p>
          </div>

          <div className="afa-track reveal" aria-hidden="true">
            <span className="afa-bar" /><span className="afa-bar" /><span className="afa-bar" /><span className="afa-bar last" />
          </div>
          <ol className="afa-phases reveal" data-delay="1" style={{ listStyle: 'none', padding: 0 }}>
            {PHASES.map((p) => (
              <li key={p.title} className="afa-phase">
                <span className="d">{p.days}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="o"><b>Outcome</b>{p.outcome}</div>
              </li>
            ))}
          </ol>

          <div className="afa-qs reveal">
            <p className="afa-sub" style={{ marginTop: 0 }}>How we prioritize: four questions, in order</p>
            <ol>
              {QUESTIONS.map((x, i) => (
                <li key={x.q}>
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="q">{x.q}</span>
                  <span className="s">{x.s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="afa-deliv-wrap">
            <div className="reveal">
              <p className="afa-sub">What you walk away with</p>
              <ul className="afa-deliv">
                {DELIVERABLES.map((d) => (
                  <li key={d}><span className="ic"><Icon name="check" size={18} /></span>{d}</li>
                ))}
              </ul>
            </div>
            <div className="reveal" data-delay="1">
              <p className="afa-sub">Sample deliverable</p>
              <figure className="afa-matrix">
                <div className="afa-mx-head">
                  <h3>Opportunity matrix: value × feasibility</h3>
                  <span className="afa-chip">Illustrative</span>
                </div>
                <svg viewBox="0 0 480 400" role="img" aria-labelledby="afa-mx-title afa-mx-desc">
                  <title id="afa-mx-title">Illustrative opportunity matrix</title>
                  <desc id="afa-mx-desc">An illustrative example, not client data. Eight agency workflows plotted by feasibility (horizontal) and value (vertical). The three in the high-value, high-feasibility quadrant are marked as the place to start.</desc>
                  {/* start-here quadrant wash */}
                  <rect x={px(50)} y={py(100)} width={px(100) - px(50)} height={py(50) - py(100)} fill="#12a7a7" opacity="0.08" />
                  {/* grid */}
                  {[25, 50, 75].map((g) => (
                    <g key={g}>
                      <line x1={px(g)} x2={px(g)} y1={py(0)} y2={py(100)} stroke="#2a323b" strokeWidth={g === 50 ? 1.5 : 1} />
                      <line x1={px(0)} x2={px(100)} y1={py(g)} y2={py(g)} stroke="#2a323b" strokeWidth={g === 50 ? 1.5 : 1} />
                    </g>
                  ))}
                  <rect x={px(0)} y={py(100)} width={px(100) - px(0)} height={py(0) - py(100)} fill="none" stroke="#404952" />
                  <text x={px(97)} y={py(100) + 22} textAnchor="end" fontSize="17" fill="#36dede" fontFamily="var(--mono)">START HERE</text>
                  <text x={px(3)} y={py(100) + 22} fontSize="16" fill="#8f8b85" fontFamily="var(--mono)">PLAN FOR</text>
                  <text x={px(97)} y={py(0) - 12} textAnchor="end" fontSize="16" fill="#8f8b85" fontFamily="var(--mono)">QUICK WINS</text>
                  <text x={px(3)} y={py(0) - 12} fontSize="16" fill="#8f8b85" fontFamily="var(--mono)">PARK</text>
                  {/* axes labels */}
                  <text x={(px(0) + px(100)) / 2} y={390} textAnchor="middle" fontSize="15" fill="#bab7b2" fontFamily="var(--mono)">FEASIBILITY →</text>
                  <text x={20} y={(py(0) + py(100)) / 2} textAnchor="middle" fontSize="15" fill="#bab7b2" fontFamily="var(--mono)" transform={`rotate(-90 20 ${(py(0) + py(100)) / 2})`}>VALUE →</text>
                  {/* points */}
                  {MATRIX.map((m) => (
                    <g key={m.n}>
                      <title>{`${m.n}. ${m.name} — ${m.start ? 'start here' : 'later'} (illustrative)`}</title>
                      <circle cx={px(m.x)} cy={py(m.y)} r="15" fill={m.start ? '#12a7a7' : '#141b23'} stroke={m.start ? '#141b23' : '#646a70'} strokeWidth="2" />
                      <text x={px(m.x)} y={py(m.y) + 5} textAnchor="middle" fontSize="14" fontFamily="var(--mono)" fill={m.start ? '#0d1218' : '#bab7b2'}>{m.n}</text>
                    </g>
                  ))}
                </svg>
                <figcaption>
                  <ul className="afa-mx-key">
                    {MATRIX.map((m) => (
                      <li key={m.n} className={m.start ? 'on' : undefined}>
                        <span className={`dotn${m.start ? ' on' : ''}`}>{m.n}</span>
                        {m.name}{m.start ? ' — start here' : ''}
                      </li>
                    ))}
                  </ul>
                  <p className="afa-foot">Illustrative example of the format, not client data. Your matrix also scores risk tier.</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ── Governance by risk tier ── */}
      <section data-screen-label="07 Governance">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 05</span>&nbsp;AI governance for agencies</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Governance by risk tier, not one rule for everything.</h2></div>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede" style={{ maxWidth: '72ch' }}>
              A regulated claim and an internal competitor scan should not share the same approval path. We set controls by what is at stake, so high-risk work stays safe and low-risk work gets fast.
            </p>
          </div>
          <table className="afa-table reveal" data-delay="2">
            <thead>
              <tr><th scope="col">Risk tier</th><th scope="col">Examples</th><th scope="col">Controls</th><th scope="col">Pace</th></tr>
            </thead>
            <tbody>
              {TIERS.map((t) => (
                <tr key={t.tier}>
                  <td className="t" data-l="Risk tier">{t.tier}</td>
                  <td data-l="Examples">{t.examples}</td>
                  <td data-l="Controls">{t.control}</td>
                  <td data-l="Pace"><span className="afa-pace">{t.pace}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="afa-loopnote reveal">
            <span className="ic"><Icon name="measure" size={22} /></span>
            Every error improves the system: corrections are added to the eval set and the context layer, so the same mistake is caught next time.
          </div>
        </div>
      </section>

      {/* ── How to evaluate an AI partner ── */}
      <section data-screen-label="08 Evaluate">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 06</span>&nbsp;Buyer’s guide</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">How to evaluate an AI partner for your agency.</h2></div>
          </div>
          <div className="reveal" data-delay="1">
            <p className="lede" style={{ maxWidth: '72ch' }}>
              A polished demo is not the test. Judge any partner — including us — on these four dimensions.
            </p>
          </div>
          <div className="afa-grid reveal" data-delay="2">
            {EVALUATE.map((e, i) => (
              <div key={e.title} className="afa-card">
                <span className="ic"><Icon name={e.icon} /></span>
                <span className="ix">{String(i + 1).padStart(2, '0')}</span>
                <h3>{e.title}</h3>
                <p>{e.body}</p>
                <div className="afa-ask"><b>Ask them</b>{e.ask}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offer ladder ── */}
      <section data-screen-label="09 Engagements">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 07</span>&nbsp;Engagements</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">From diagnostic to an AI center of excellence.</h2></div>
          </div>
          <div className="afa-ladder reveal" data-delay="1">
            {LADDER.map((r, i) => (
              <div key={r.step} className={`afa-rung${i === 1 ? ' mid' : ''}`}>
                <div className="top">
                  <span className="ix">STEP {r.step}</span>
                  <span className="afa-dur">{r.dur}</span>
                </div>
                <h3>{r.title}</h3>
                <p className="best">Best for: {r.best}</p>
                <span className="yg">You get</span>
                <ul>
                  {r.get.map((g) => (
                    <li key={g}><span className="ic"><Icon name="check" size={16} /></span>{g}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case example ── */}
      <section data-screen-label="10 Case example">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 08</span>&nbsp;Case example</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">From AI pilot to production in a regulated-marketing agency.</h2></div>
          </div>
          <div className="afa-chips reveal" aria-label="Case profile">
            <span>Full-service regulated-marketing agency</span>
            <span>Healthcare / pharma</span>
            <span>Anonymized</span>
          </div>
          <div className="afa-story reveal" data-delay="1">
            <div>
              <b>Challenge</b>
              <p>Introduce AI across research, reporting and campaign operations without adding compliance, evidence or client-delivery risk.</p>
            </div>
            <div>
              <b>Approach</b>
              <p>Governance and deployment playbooks, analytics and data foundations, cross-functional training, and reusable workflows built into the agency’s delivery process.</p>
            </div>
            <div>
              <b>Result</b>
              <p>Pilots moved into production under a documented operating model, and campaign launch time dropped from months to weeks.</p>
            </div>
          </div>
          <div className="afa-case-res reveal" data-delay="2">
            <div className="cell">
              <div className="afa-bignum">75%</div>
              <div className="afa-bignum-l">Pilot-to-production conversion</div>
              <div className="afa-bignum-s">This agency case · documented · not an average across clients</div>
            </div>
            <figure className="afa-chart cell">
              <h3>Campaign launch time</h3>
              <p className="cap">Before vs after the AI operating model · same agency</p>
              <div className="afa-bars" role="img" aria-label="Campaign launch time fell from 3 months before to 2 weeks after, 83% faster">
                <div className="afa-brow">
                  <span className="k">Before</span>
                  <div className="trk" title="Before: 3 months">
                    <div className="fill before" />
                    <span className="in inside"><span className="val">3 months</span></span>
                  </div>
                </div>
                <div className="afa-brow">
                  <span className="k">After</span>
                  <div className="trk" title="After: 2 weeks">
                    <div className="fill after" />
                    <span className="in outside"><span className="val">2 weeks</span></span>
                  </div>
                </div>
              </div>
              <p className="afa-delta">83% faster campaign launch</p>
              <div className="afa-sr"><table>
                <caption>Campaign launch time, regulated-marketing agency case</caption>
                <thead><tr><th scope="col">Period</th><th scope="col">Launch time</th></tr></thead>
                <tbody>
                  <tr><td>Before</td><td>3 months</td></tr>
                  <tr><td>After</td><td>2 weeks</td></tr>
                </tbody>
              </table></div>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Loop ── */}
      <section data-screen-label="11 Operating loop">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 09</span>&nbsp;AI center of excellence for agencies</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Assess, build, scale — then run the loop again.</h2></div>
          </div>
          <div className="afa-loop reveal" data-delay="1">
            {LOOP.map((l, i) => (
              <div key={l.k} style={{ display: 'contents' }}>
                <div className="afa-node">
                  <span className="k">{String(i + 1).padStart(2, '0')} · Example request</span>
                  <h3>{l.k}</h3>
                  <p>{l.ask}</p>
                </div>
                {i < LOOP.length - 1 && (
                  <div className="afa-arr" aria-hidden="true">
                    <svg width="28" height="16" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 8h24M19 2l6 6-6 6" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="afa-return reveal" aria-hidden="true" />
          <p className="afa-return-l reveal">↺ Each cycle adds a workflow to your agency’s AI center of excellence.</p>
        </div>
      </section>

      {/* ── Founder ── */}
      <section data-screen-label="12 Operator">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 10</span>&nbsp;Who you work with</span></div>
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

      {/* ── FAQ ── */}
      <section data-screen-label="13 FAQ">
        <div className="shell">
          <div className="section-head">
            <div className="reveal"><span className="eyebrow"><span className="num">§ 11</span>&nbsp;FAQ</span></div>
            <div className="reveal" data-delay="1"><h2 className="h2">Questions agencies ask before they start.</h2></div>
          </div>
          <div className="afa-faq reveal" data-delay="1">
            {FAQ.map((f) => (
              <details key={f.question}>
                <summary>{f.question}<span className="pm" aria-hidden="true">+</span></summary>
                <p className="a">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="cta-blue" data-screen-label="14 CTA">
        <div className="shell">
          <div className="afa-cta reveal">
            <div style={{ display: 'grid', gap: 24 }}>
              <h2 className="display" style={{ fontSize: 'clamp(34px, 5vw, 68px)' }}>
                Turn AI tools into<br /><em>an agency capability.</em>
              </h2>
              <p className="lede">A short review of where AI sits in your agency today — and whether the 10-day diagnostic is the right next step.</p>
              <div className="hero-cta-row">
                <BookCta />
              </div>
            </div>
            <div className="afa-start">
              <span className="t">Start here</span>
              <ol>
                {START.map((s, i) => (
                  <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
