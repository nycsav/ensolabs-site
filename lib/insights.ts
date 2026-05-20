export type Pillar = 'Consult' | 'Build' | 'Ship';

export type Insight = {
  slug: string;
  title: string;
  dek: string;
  pillar: Pillar;
  date: string; // ISO
  readingMinutes: number;
  body: string[]; // paragraphs (Markdown-ish, kept simple for placeholders)
};

export const INSIGHTS: Insight[] = [
  {
    slug: 'notion-hackathon-agent-distribution-problem',
    title: 'We Built a Career Agent at Notion HQ in 24 Hours. Here\'s the Architecture.',
    dek: 'Five Notion Worker tools, a two-model AI pipeline, and a source-tier scoring system — shipped at the Notion Developer Platform Hackathon during SF AI Week.',
    pillar: 'Build',
    date: '2026-05-19',
    readingMinutes: 6,
    body: [
      'Last weekend we were at Notion HQ on Annie Street in San Francisco for their first Developer Platform Hackathon — two days of building on Notion Workers with some of the sharpest agentic AI builders in the Bay Area. We shipped a production-grade career intelligence agent: five tools, 487 lines of TypeScript, a full pipeline from job parsing to AI-tailored resume generation. The project is live on GitHub at github.com/nycsav/notion-career-agent.',
      '## The Problem We Solved',
      'Job seekers submit an average of 16 applications per week but spend less than 30 minutes customizing each one. Tailored resumes are 61% more likely to land interviews, but deep customization does not scale with manual effort. The existing tools are either spam cannons or glorified spreadsheets. We built a system that does the intelligence work — scanning, scoring, tailoring — while keeping the human in the loop for every decision that matters.',
      '## Five Tools, One Pipeline',
      'The career agent runs entirely inside a Notion workspace using Workers — sandboxed TypeScript functions that Notion executes on their infrastructure. No servers to manage, no deployment pipelines to maintain. We built five tools that chain together into an end-to-end career pipeline:',
      '**scanJobs** parses job listings from LinkedIn email notifications, extracts structured data (title, company, location, salary, requirements), and scores each role against the user\'s career profile using Claude Haiku. Every job gets a match score from 0 to 100 with a written explanation of why it does or does not fit. Jobs scoring 75+ get flagged for action.',
      '**tailorResume** is the heavy lifter. Give it a job listing and a base resume, and it generates an ATS-optimized resume and cover letter using Claude Sonnet — the stronger model, because resume quality directly affects conversion. It extracts and maps ATS keywords from the listing, reframes existing experience to match the role, and returns everything as structured data ready to save as linked Notion pages.',
      '**getCareerInsight** turns the agent into a strategic career advisor. Salary negotiation data, interview prep, company research — direct and actionable, no filler. We used Haiku here because speed matters more than depth for quick Q&A.',
      '**configureAgent** lets the user set automation preferences: copilot (suggestions only), autopilot (acts with confirmation), or autonomous (full auto). You configure scan cadence, match threshold, active job boards, notification channels, target roles, locations, and salary minimum. The agent adapts its behavior to your risk tolerance.',
      '**getAgentStatus** provides pipeline analytics — how many jobs scanned, scored, applied to, interviewing, offered, rejected — filtered by time range. It is the control panel for understanding whether your job search machine is actually working.',
      '## The Two-Model Architecture',
      'We deliberately split the AI work across two Claude models. Haiku handles the high-volume, speed-sensitive operations: job scoring, career Q&A, and classification. Sonnet handles the high-stakes generation work: resume tailoring and cover letters. This is not about cost optimization — it is about matching model capability to task criticality. A wrong match score wastes a click. A weak resume wastes an interview opportunity.',
      '## Source Tiers: Not All Applications Are Equal',
      'We borrowed the source-tier ranking system from signal2noise, our market intelligence platform. The career agent classifies every job by how you found it: Tier 1 (direct referral, ~50% interview rate) through Tier 5 (cold apply, ~2%). This changes the agent\'s behavior — a Tier 1 referral with a 60 match score still gets priority over a Tier 5 cold apply with an 85. The system encodes what experienced job seekers already know intuitively: **who referred you matters more than how perfectly your resume matches.**',
      '## Speed, Systems, Platform Fluency',
      'Three things we proved at this hackathon. First, speed to production: we went from zero to five deployed Worker tools in under 24 hours, using Claude Code as the primary development environment. Second, systems thinking: the agent is not five independent tools — it is a pipeline with data flowing between stages, configurable automation levels, and status tracking. That is the architecture pattern we apply to every enterprise engagement. Third, platform portability: we have been running signal2noise on Firebase and Cloud Functions for months. Porting its intelligence patterns to Notion Workers took hours, not weeks. The design patterns transfer across any runtime.',
      '## Why This Matters Beyond Hackathons',
      'The career agent is a compressed case study of what we do at Enso Labs across every client engagement. We take a workflow that currently runs on human effort and spreadsheets, decompose it into discrete automation stages, insert AI at the points where it creates the most leverage, and keep humans in the loop where judgment matters. The 24-hour constraint just forced us to be ruthless about scope. Every enterprise AI deployment should be this focused.',
    ],
  },
  {
    slug: 'why-deck-only-ai-consulting-fails-production',
    title: 'Why deck-only AI consulting dies on contact with production.',
    dek: 'The gap between a beautiful slide and a running system is where most enterprise AI initiatives quietly die. Here\'s the autopsy from fifteen years inside the room.',
    pillar: 'Consult',
    date: '2026-04-22',
    readingMinutes: 7,
    body: [
      'Most AI consultancies have a wildly successful first ninety days. The deck lands. The roadmap is celebrated. The exec sponsor commits. Then the engagement ends — and the system never ships.',
      'The reason is structural, not motivational. A deck-only consultancy hands off the architecture to an internal team that never participated in the design, then walks away from the production realities — eval harnesses, governance, latency budgets, hallucination guardrails — that determine whether the thing actually runs.',
      'The fix is not better decks. The fix is **the same operator who designs the system also ships it.** That collapses the translation layer. Architecture decisions get made by the person who has to debug them at 2am.',
      'This is why the Strategy-to-Ship Framework is sequenced the way it is: Diagnose, Design, Build, Scale — with the same builder across every phase. The roadmap and the runtime are the same artifact.',
    ],
  },
  {
    slug: 'gore-lens-expert-knowledge-encoding',
    title: 'The Gore Lens: encoding expert knowledge as toggleable rules.',
    dek: 'A scientist will never trust a black-box relevance score. Here\'s how we built a 9-rule expert lens that scientists could reason about — and turn off — one rule at a time.',
    pillar: 'Build',
    date: '2026-04-15',
    readingMinutes: 9,
    body: [
      'The Gore M2 Intelligence Hub had one non-negotiable acceptance criterion: the lead scientist had to trust the relevance ranking. That meant no opaque embeddings-as-relevance, no LLM-as-judge with hidden criteria, no statistical magic.',
      'What worked: encoding the scientist\'s actual decision criteria as nine explicit, MCP-compatible rules. Temperature floor. Material class. Chemistry scope. PFAS sensitivity. Market size. Liability exposure. Recency. Novelty. The 200°C gap.',
      'Each rule is independently toggleable. The dashboard shows the score with the rule on and off. The scientist can A/B their own expertise against the system. That\'s where trust comes from — not from the score, but from the ability to interrogate it.',
      'The pattern generalizes: **wherever you need expert trust, encode the expert\'s heuristics explicitly, and make every one of them inspectable.**',
    ],
  },
  {
    slug: 'mcp-servers-new-saas-integration',
    title: 'MCP servers are the new SaaS integration layer.',
    dek: 'Every legacy SaaS connector — Salesforce, Slack, Notion, Looker — gets a second life as an MCP server. The companies that ship MCP first will own the agent-native enterprise.',
    pillar: 'Build',
    date: '2026-04-08',
    readingMinutes: 6,
    body: [
      'For two decades, enterprise software lived inside a tab. The unit of work was the screen. Integration meant Zapier, REST, or a poorly-maintained iPaaS connector.',
      'The Model Context Protocol changes the unit. The unit is now the tool call. An MCP server publishes a typed surface that any agent — Claude, Perplexity Computer, Gemini — can invoke autonomously, with structured input and structured output.',
      'The implication for B2B SaaS: every connector you have today should be reframed as an MCP server. The buyer will ask for it within twelve months. The companies that ship first own the agent-native distribution layer for the next decade.',
      'We build these. They are usually two- to six-week engagements, depending on auth complexity and surface area.',
    ],
  },
  {
    slug: 'rag-eval-harness-not-vector-store',
    title: 'Your RAG problem is an eval problem, not a vector-store problem.',
    dek: 'Teams burn months optimizing chunk sizes, hybrid retrieval, and reranker stacks. Then they ship — and discover they never had a reliable way to know if the answer was right.',
    pillar: 'Build',
    date: '2026-04-01',
    readingMinutes: 8,
    body: [
      'Most RAG systems we are asked to rescue have a sophisticated retrieval pipeline and a non-existent eval harness. The team can describe their reranker but cannot tell you the F1 on a held-out set of expert-graded answers.',
      'This is backwards. The eval harness is the spec. Without it, every change is a vibes-based experiment — chunk size up, chunk size down, embedding model swap, hybrid weight knob — with no way to know if you are getting better or worse.',
      'Build the eval first. Hand-grade fifty representative queries with expert ground truth. Score every change against that set. The retrieval architecture you end up with will be different — and shippable.',
    ],
  },
  {
    slug: 'autonomous-trading-risk-as-architecture',
    title: 'In autonomous trading, the kill-switch is the architecture.',
    dek: 'The Trading Terminal runs unattended. That is only possible because the risk caps, position sizing, and shut-off logic were designed before the alpha logic — not after.',
    pillar: 'Ship',
    date: '2026-03-25',
    readingMinutes: 10,
    body: [
      'Most trading systems begin with the strategy: a signal, an indicator, an alpha. The risk layer arrives later, bolted on, and is the first thing to fail under stress.',
      'The Enso Trading Terminal was built backwards on purpose. The kill-switch came first. Risk caps were schemas, not config. Position sizing was a typed function with property tests, not a magic number in a YAML file.',
      'The result is a system that can run unattended without anyone losing sleep. Strategy code can be wrong. Risk code cannot.',
      'For client engagements building autonomous trading, the rule is the same: the risk surface is the architecture. Strategy is a plug-in.',
    ],
  },
  {
    slug: 'ai-coe-pharma-mlr-compliance',
    title: 'An AI Center of Excellence that ships MLR-compliant work.',
    dek: 'Pharma agencies cannot move fast and break things. Medical, Legal, and Regulatory review is non-negotiable. Here\'s how we built a CoE that compresses launches from three months to two weeks anyway.',
    pillar: 'Consult',
    date: '2026-03-18',
    readingMinutes: 7,
    body: [
      'The standard objection to AI in pharma marketing is compliance. MLR/PRC review, FDA fair balance, brand voice tolerance — every shortcut breaks one of them.',
      'The Heller Center of Excellence was designed around the constraint, not despite it. RAG retrieval is grounded in five brand knowledge bases that already encode MLR-approved language. Pre-flight scans run on every draft. The compliance burden is automated, not bypassed.',
      'The metric that matters: campaign launches dropped from three months to two weeks. Compliance review time barely moved — what compressed was everything before it.',
      'The lesson: regulated industries are not where AI fails. They are where it has the largest leverage, **if you treat compliance as the spec rather than the obstacle.**',
    ],
  },
  {
    slug: 'options-flow-decision-support-not-black-box',
    title: 'Options flow analytics: decision support, not black box.',
    dek: 'Unusual flow is a hypothesis, not a trade. The Options Lab is built to surface hypotheses, force the human to vet them, and only then route to execution.',
    pillar: 'Ship',
    date: '2026-03-11',
    readingMinutes: 5,
    body: [
      'The marketing of "AI-powered options flow" usually implies an oracle — feed it tickers, get trades. That is exactly the model that loses money.',
      'The Options Lab is a decision-support tool. It surfaces unusual flow, sweeps, and blocks; cross-references against the news intelligence feed and the implied volatility surface; and presents the operator with a vetting checklist before any execution route is enabled.',
      'The human is in the loop on purpose. The system is good at finding hypotheses. It is the operator\'s job to kill the bad ones — and the operator should have to actively click "send" on every one that survives.',
    ],
  },
  {
    slug: 'principal-led-vs-50-person-consultancy',
    title: 'A principal-led studio outperforms a 50-person consultancy on shipped systems.',
    dek: 'Counterintuitive — and structural, not heroic. Six things change when the advisor and the build team work as one unit.',
    pillar: 'Consult',
    date: '2026-03-04',
    readingMinutes: 6,
    body: [
      'The pitch from a 50-person consultancy is depth of bench. The reality is hand-offs. Strategy decided in week 3 reaches engineering in week 9, refracted through three layers of partial context.',
      'A principal-led studio has structural advantages a large bench cannot replicate. Direct senior access — no account managers. Builder credibility — the advisor is also in the codebase. Dogfooding — the studio runs its own infrastructure. Speed — no approval chain. Selectivity — a fixed pipeline forces a yes to mean yes.',
      'The constraint is also real: bandwidth. A principal-led studio runs a small handful of deep engagements at a time. That is the whole point — depth, not portfolio. When the studio is at capacity, prospects hear so directly and get a future date.',
    ],
  },
  {
    slug: 'anthropic-financial-services-what-it-means',
    title: 'Anthropic Just Launched 10 Financial AI Agents. We Built Ours Last Year.',
    dek: 'Today Anthropic announced pre-built AI agents for banking and trading — pitchbook builders, credit memo drafters, statement auditors. Enso Labs has been shipping production financial agents since 2025. Here is what this means for the industry and why early movers have a structural advantage.',
    pillar: 'Ship',
    date: '2026-05-05',
    readingMinutes: 6,
    body: [
      'On May 5, 2026, Anthropic announced ten pre-built AI agents for financial services — pitchbook builders, credit memo drafters, portfolio summarizers, statement auditors. The announcement validates what we have been building at Enso Labs since 2025: production financial AI agents are not a research project. They are an operational layer.',
      'The Enso Trading Terminal has been running autonomously in production for over a year — news-driven trading algorithms, multi-agent research automation, options flow analysis, brokerage API integration via MCP. When Anthropic says Claude can now draft credit memos and audit financial statements, we hear confirmation of a thesis we have already shipped against: **the same reasoning engine that writes prose can manage risk, parse filings, and route orders.**',
      'What makes the Anthropic launch significant is not the agents themselves — it is the infrastructure underneath. Claude\'s financial services stack now includes MCP-connected brokerage APIs, compliance-aware reasoning, and audit-trail generation built into the model layer. This collapses the integration burden. A year ago, building a compliant trading agent meant wiring together four vendors. Now it means configuring one.',
      'The implication for enterprises: the window to build proprietary financial AI agents — and own the operational advantage — is compressing. The pre-built agents will commoditize the basics (memo drafting, statement reconciliation, portfolio summarization). The moat is in what you build on top: custom signal intelligence, firm-specific risk models, compliance layers tuned to your regulatory surface.',
      'Early movers have a structural advantage. The firms that shipped financial agents in 2025 — including our own terminal — have twelve months of production data, eval harnesses, and operational muscle that a cold start in 2026 cannot replicate. The question is no longer whether to build financial AI agents. It is whether you want to be the firm that built early or the firm that bought late.',
      'We build these systems. If you are a bank, asset manager, or fintech evaluating Claude\'s financial services stack, we can show you what a production deployment looks like — because we have been running one.',
    ],
  },
  {
    slug: 'mcp-brokerage-trading-model-context-protocol',
    title: 'MCP for Brokerage: How Model Context Protocol Is Connecting AI to Trading.',
    dek: 'Every brokerage API — Alpaca, Interactive Brokers, Schwab, TradeStation — is becoming an MCP server. This is the integration pattern that makes autonomous financial AI agents practical.',
    pillar: 'Build',
    date: '2026-05-08',
    readingMinutes: 8,
    body: [
      'The Model Context Protocol is the most consequential piece of AI infrastructure that almost no one in financial services is talking about. MCP is a standardized way for AI agents — Claude, Gemini, GPT — to invoke external tools with typed inputs and structured outputs. For trading, that means a single agent can check positions, submit orders, retrieve account data, and monitor fills as part of its reasoning loop.',
      'Before MCP, connecting an AI agent to a brokerage meant building a bespoke integration for every API. Alpaca REST endpoints, Interactive Brokers TWS, Schwab\'s OAuth2 flow, TradeStation\'s streaming WebSocket — each required custom auth, custom error handling, and custom response parsing. The result was fragile plumbing that broke every time a vendor updated their API.',
      'MCP collapses this. An MCP server wraps a brokerage API into a typed tool surface — function name, input schema, output schema — that any MCP-compatible agent can invoke natively. The agent does not need to know whether it is talking to Alpaca or Interactive Brokers. It calls `submit_order` with a typed payload and gets a typed response. The integration complexity lives in the server, not the agent.',
      'The architecture looks like this: the AI agent runs a reasoning loop — read breaking news, analyze the options chain, check the restricted list, calculate position sizing. When it decides to act, it calls an MCP tool. The MCP server validates the request against pre-trade risk controls (position limits, notional limits, order rate limits), then forwards it to the brokerage API. Every tool call is logged with inputs, outputs, timestamps, and the full reasoning context. That is the audit trail.',
      'We have been running this pattern in production since 2025. The Enso Trading Terminal connects to Alpaca, Public.com, and crypto exchanges via MCP servers that we built and maintain. The agent reads a news article about an FDA approval, checks the options chain for the relevant ticker, verifies risk limits, calculates sizing, and submits — all in one agentic loop. The entire flow is logged and reviewable.',
      'The practical implication for financial institutions: **MCP is the new SaaS integration layer for finance.** Every brokerage, market data provider, and compliance system should be evaluating how to publish an MCP surface. The firms that ship MCP servers first will own the distribution layer for the next generation of AI-native trading infrastructure. We build these servers. They are usually two- to six-week engagements.',
    ],
  },
  {
    slug: 'claude-partner-network-boutique-implementation',
    title: 'Why Boutique Firms Are the Right Claude Implementation Partner.',
    dek: 'Anthropic launched a $100M Claude Partner Network. Accenture, Deloitte, and PwC are in. But for production agentic systems, the structural advantages belong to boutique operators who build what they advise.',
    pillar: 'Consult',
    date: '2026-05-07',
    readingMinutes: 7,
    body: [
      'Anthropic\'s Claude Partner Network — backed by $100 million in funding — is designed to accelerate enterprise Claude deployments through certified implementation partners. The launch partners include the usual suspects: Accenture, Deloitte, PwC, McKinsey, BCG. The pitch is depth of bench and global reach.',
      'The reality is different. Enterprise Claude deployments are not ERP migrations. They are not lift-and-shift projects that benefit from armies of consultants following a playbook. Agentic AI systems require the person who designed the architecture to also debug the eval harness at 2am. They require the advisor to be in the codebase. The hand-off model that works for SAP does not work for Claude.',
      'Boutique firms have structural advantages in this market. **First: direct senior access.** No account managers, no project coordinators, no layers between the client and the person who understands the system. The principal who scopes the engagement is the same person who writes the MCP server and tunes the eval suite. **Second: builder credibility.** The studio runs its own production AI infrastructure — the Enso Trading Terminal, signal2noise, MCP servers in live environments. When we advise on architecture, we are describing systems we operate.',
      '**Third: speed.** A 50-person consultancy needs three weeks to staff a project. A boutique deploys a working prototype in the same three weeks. **Fourth: dogfooding.** We use Claude to build our own products, run our own analytics, and manage our own operations. Every recommendation we make has been tested on ourselves first.',
      'The Claude Partner Network is good for the ecosystem. It validates enterprise demand and creates a certification layer that helps buyers evaluate partners. But certification is a floor, not a ceiling. The partners who will win production deployments are the ones who can point to shipped systems — not the ones with the largest partner tier.',
      'Enso Labs is a principal-led AI transformation studio. We are Claude-certified, Anthropic-credentialed, and running Claude-powered production systems across financial services, healthcare, and B2B technology. If you are evaluating Claude implementation partners, ask one question: **show me the system you shipped.** That is the only credential that matters.',
    ],
  },
];

export const insightsByPillar = (pillar?: Pillar) =>
  pillar ? INSIGHTS.filter((i) => i.pillar === pillar) : INSIGHTS;

export const getInsight = (slug: string) =>
  INSIGHTS.find((i) => i.slug === slug);
