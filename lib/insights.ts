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
    readingMinutes: 4,
    body: [
      'Anthropic just did three things that will reshape financial services AI:',
      'They launched 10 pre-built AI agents for banking — pitchbook builders, credit memo drafters, KYC automators, statement auditors, and compliance reviewers.',
      'They debuted Claude Opus 4.7 — their most capable model for financial work, leading the Vals AI Finance Agent benchmark.',
      'They formed a $1.5B joint venture with Blackstone, Goldman Sachs, and Hellman and Friedman to embed Claude engineers directly inside mid-market companies.',
      'At Enso Labs, we have been running production financial AI agents on this exact architecture — Claude plus MCP plus brokerage APIs — since 2025. Our Enso Trading Terminal connects Claude to live brokerage APIs, processes real-time market signals, and executes autonomous trading strategies around the clock.',
      'The gap between announcing AI agents and shipping them in production is where 93 percent of enterprise AI programs die. That gap is not a technology problem. It is a Strategy-to-Ship problem.',
      'Three implications for enterprise buyers: MCP will become the standard integration layer for financial AI within 18 months. The consulting industry will split into firms that advise on AI and firms that ship AI. And mid-market companies will have access to AI implementation at a scale previously reserved for top-20 banks.',
      'The firms that built production financial agents before this week have a structural advantage. They already know what works, what fails, and what compliance requires.',
    ],
  },
];

export const insightsByPillar = (pillar?: Pillar) =>
  pillar ? INSIGHTS.filter((i) => i.pillar === pillar) : INSIGHTS;

export const getInsight = (slug: string) =>
  INSIGHTS.find((i) => i.slug === slug);
