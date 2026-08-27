# Handoff — "Managed Services, Managed Agents" repositioning
Status: DRAFT for Sav's review · Nothing shipped · 2026-07-10

## Macro direction (one line)
Enso Labs = **forward-deployed AI managed services**: we encode an industry's hard-won expertise into **managed agents**, then **deploy and operate** them in production. Keep the build credibility; lead with the *operate* (managed-service) layer and the *domain-expertise* moat.

Voice unchanged: studio "we"; Gore = "Fortune 500 manufacturer"; tagline "Strategy → Ship" retained (it now doubles as the operating model).

---

## 3 brand decisions that need your sign-off (everything else is copy)
1. **Three-pillar recast.** `AI Transformation · Agentic Systems · Financial AI` → **`Encode · Deploy · Operate`** (the managed-services loop). *Financial AI demotes from a pillar to a vertical proof.* — biggest call, on your "don't change without approval" list.
2. **Home H1.** Replace the H1 "Strategy to Ship." with **"Managed services. Managed agents."** and keep *Strategy → Ship* as the eyebrow/tagline. (Current H1 is memorable but doesn't say what you do.)
3. **Flagship offering name.** Broaden `/services/claude-managed-services` from "Claude Managed Services" → **"Managed Agents"** (Claude/Anthropic-certified stays as a credential, not the headline).

---

## Page-by-page: current → proposed

### Home — metadata (SEO/AEO)
- **Title now:** `Enso Labs — AI Transformation Consulting & Agentic Systems Studio NYC`
- **Title →:** `Enso Labs — AI Managed Services & Managed Agents for Enterprise | NYC`
- **Description now:** "…we turn strategy and research into shipped AI products — AI transformation, agentic systems, custom decision & signal intelligence, and financial AI…"
- **Description →:** `Enso Labs is a principal-led AI managed-services studio in NYC founded by Sav Banerjee. We encode your industry's expertise into managed agents — then deploy and operate them in production. Forward-deployed and principal-led, across healthcare, finance, manufacturing, and brand.`

### Home — hero
- **H1 now:** `Strategy to Ship.`
- **H1 →:** `Managed services.` / `Managed agents.`  (two lines; "Strategy → Ship" moves to the eyebrow)
- **Lede now:** "Enso Labs builds custom AI products that turn disparate data into decision intelligence. From stakeholder research to shipped system…"
- **Lede →:** `Enso Labs encodes your industry's hard-won expertise into managed AI agents — then deploys and operates them in production. Principal-led, forward-deployed, for enterprises in healthcare, finance, manufacturing, and brand.`
- **Microcopy now:** "↳ decision intelligence, shipped as products"
- **Microcopy →:** `↳ we encode the expertise, build the agents, and run them`
- **Sectors strip:** optionally tighten to the four hero verticals: `HEALTHCARE · FINANCE · MANUFACTURING · BRAND` (keep MEDIA/CONSUMER if you want breadth).

### Home — positioning H2 (§01)
- **Now:** "Most AI consultancies stop at the slide deck. *We ship the system.*"
- **→:** `Most AI consultancies stop at the slide deck. Builders stop at the demo.` / *`We encode your expertise into agents — and operate them in production.`*  (adds the third actor + the operate layer)

### Home — three pillars (the recast)
Replace `AI Transformation | Agentic Systems | Financial AI` with the operating model:
- **Encode** — `Your domain's rules, rubrics, and guardrails become the agent's definition of "good."`
- **Deploy** — `Production agents, forward-deployed against your real data and tools.`
- **Operate** — `We run them as a managed service — monitored, accountable, improving.`
*(Alt if you'd rather keep capability nouns: `Managed Agents · Domain-Encoded AI · Managed Operations`.)*

### /services/claude-managed-services — promote to flagship
- **H1 now:** `Claude Managed Services & Implementation`
- **H1 →:** `Managed Agents — your expertise, running in production.`
- **Sub →:** `We build, deploy, and operate managed AI agents that carry your domain expertise — as an accountable managed service. Anthropic-certified; model-agnostic by design.`
- Link this prominently from the home hero + nav.

### /services — engagement ladder (from the deck)
Reorder the three tracks into the ladder: `AI Audit (2 wks)` → `Pilot to Production (12 wks)` → `Managed Agents (retainer)`. Lead the page with the managed-agents outcome, not the capability list.

### /about — one-line reframe (low priority; pairs with your LinkedIn edit later)
- **Now:** "…a 15-year enterprise strategist turned agentic-systems builder."
- **→:** `…who encodes fifteen years of enterprise domain expertise into production AI agents — fluent in the builder's room and the boardroom.`

### lib/site.ts
- `tagline`: **keep** `Strategy to Ship.`
- `description`: match the new home description above.

### public/llms.txt (GEO — how LLMs describe you)
- Opening brief + About → lead with `AI managed-services studio … encodes domain expertise into managed agents … deploys and operates them in production.` (so ChatGPT/Perplexity/Claude repeat the new positioning).

---

## What stays (don't touch)
Ticker/client social proof · case studies (they become the "operate in production" proof) · Strategy → Ship brand + coral arrow · contact/schema/canonical URLs.

## Execution note
On approval of the 3 decisions, implement as a **branch + PR** (`design/managed-services-repositioning`) — reviewable, not pushed to master. Protected paths (globals.css, schema) untouched; copy-only diffs.
