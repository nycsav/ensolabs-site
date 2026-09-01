# Handoff: FDE Part 3 — Visual Refresh
**Slug:** `frontier-labs-fde-platform-theory`
**Branch:** `content/fde-part3-visual-refresh`
**Date:** 2026-09-01
**Author:** Sav Banerjee / Enso Labs
**Status:** Ready to execute — do NOT auto-merge; hold PR for visual review

---

## Objective

Part 3 is live but text-heavy (6 min read, no hero image, no animations). This handoff cuts it to 3 min and replaces ~900 removed words with four visual assets, matching the Part 2 formula (`agent-harness-inputs-outputs`).

---

## Step 0 — Preflight

```bash
cd ~/Projects/ensolabs-site
git status   # stash or commit anything pending
git checkout master && git pull origin master
git checkout -b content/fde-part3-visual-refresh
```

---

## Step 1 — Create four Puppeteer scripts

All scripts follow the exact pattern of `/scripts/generate-fds-part3.js` (already in repo — read it first for font imports, puppeteer config, and file-write pattern). Write these four new files:

---

### Script 1: `scripts/generate-fds-part3-stats.js`
**Output:** `public/images/insights/fds-part3-stats.png` (1200 × 380)

Render a four-stat block. Dark navy background (`#0D1321`). Four columns separated by thin teal (`#5CE0D2`) vertical rules.

| Stat | Label |
|---|---|
| `3` | Labs. Three theories of production. |
| `Aug 24` | Anthropic enterprise managed authorization: GA |
| `MCP` | De facto agent plumbing layer, industry-wide |
| `0` | Of these decisions belong to benchmark season |

Typography: stat value in JetBrains Mono 96px bold, Ship Coral `#F0512E`. Label in Inter Tight 18px, color `#8BAFC7`. Series tag top-left in JetBrains Mono 11px uppercase teal: `THE FORWARD DEPLOYED STRATEGIST · PART 3`.

---

### Script 2: `scripts/generate-fds-part3-theories-anim.js`
**Outputs:**
- `public/images/insights/fds-part3-theories.gif` (1200 × 675, 2 fps, loop)
- `public/images/insights/fds-part3-theories.mp4`

**Animation sequence — 5 frames:**

Frame 1 (1.5s): Empty dark navy canvas. Header: `THE THREE THEORIES OF PRODUCTION` in JetBrains Mono 13px uppercase teal, centered top. Three column labels animate in left to right: `ANTHROPIC` / `OPENAI` / `PERPLEXITY` in Inter Tight 22px bold white.

Frame 2 (1.5s): ANTHROPIC column fills in (teal `#5CE0D2` left border). Sub-items appear one by one:
- `MCP` — tool integration standard
- `Managed Authorization` — per-agent allowlists
- `Operator Layer` — permission boundary
- Tag at bottom: `Governance Lab`

Frame 3 (1.5s): OPENAI column fills in (Ship Coral `#F0512E` left border). Sub-items:
- `GPT-5 / Codex` — reasoning + build speed
- `Operator Model` — full-stack ambition
- `Direct Enterprise Embed` — production layer
- Tag at bottom: `Full-Stack Operator`

Frame 4 (1.5s): PERPLEXITY column fills in (Ledger Amber `#E0A23C` left border). Sub-items:
- `Computer` — research/action interface
- `Grounded Retrieval` — cited, real-time
- `Intelligence Feed` — current as of now
- Tag at bottom: `Research/Action Interface`

Frame 5 (2.5s): All three columns lit simultaneously. Caption appears bottom-center in Lora italic 20px: *"Three labs. Three theories. Route accordingly."*

---

### Script 3: `scripts/generate-fds-part3-routing.js`
**Output:** `public/images/insights/fds-part3-routing.png` (1200 × 440)

A three-row routing table. Dark navy background. Each row: Lab name (left, 260px wide, bold) | Use when (center, flexible) | What you get (right, 320px wide, muted).

| Lab | Use when | What you get |
|---|---|---|
| **Anthropic** | Regulated workflow · governance-first · MCP tooling | Permission boundary · audit log · human approval gate |
| **OpenAI** | Reasoning speed · coding velocity · broad enterprise | GPT-5 synthesis · Codex build depth · ChatGPT Enterprise embed |
| **Perplexity** | Real-time intelligence · grounded retrieval · live data | Current, cited signals · research-to-action · 200+ source coverage |

Teal left accent bar (6px) on Anthropic row. Coral on OpenAI. Amber on Perplexity. Header row in JetBrains Mono 11px uppercase. Footer caption in JetBrains Mono 11px teal: `ENSO LABS · PERPLEXITY IMPLEMENTATION PARTNER · CLAUDE-NATIVE STUDIO`.

---

### Script 4: `scripts/generate-fds-part3-og.js`
**Output:** `public/og/og-frontier-labs-fde-platform-theory.png` (1200 × 630)
**Overwrites** the existing file at that path.

**Design — two-panel layout:**

Left panel (700px wide): Dark navy `#0D1321`. Top-left: series tag in JetBrains Mono 12px Ship Coral uppercase: `THE FORWARD DEPLOYED STRATEGIST · PART 3`. Headline in Lora 52px 500 weight, white, line-height 1.1, max 3 lines:
```
The Labs Behind
the Frontier
```
Subhead in Inter Tight 20px, color `#8BAFC7`, max 2 lines:
```
Anthropic. OpenAI. Perplexity.
They are not interchangeable.
```
Bottom-left: `STRATEGY → SHIP` in JetBrains Mono 12px where `→` is Ship Coral.

Right panel (500px wide): Three stacked lab cards, each 190px tall, 1px gap between.
- Card 1 teal left border (6px): `ANTHROPIC` bold white / `Governance Lab` coral tag / `MCP · Managed Auth · Operator Layer` in mono 13px muted
- Card 2 coral left border: `OPENAI` bold white / `Full-Stack Operator` amber tag / `GPT-5 · Codex · Direct Embed`
- Card 3 amber left border: `PERPLEXITY` bold white / `Research/Action` teal tag / `Computer · Grounded · Real-Time`

No photography required — pure typographic editorial. This is the new default OG.

---

## Step 2 — Run all four scripts

```bash
cd ~/Projects/ensolabs-site
node scripts/generate-fds-part3-stats.js
node scripts/generate-fds-part3-theories-anim.js
node scripts/generate-fds-part3-routing.js
node scripts/generate-fds-part3-og.js
```

Verify outputs exist and are non-zero:
```bash
ls -lh public/images/insights/fds-part3-*.{png,gif,mp4} public/og/og-frontier-labs-fde-platform-theory.png
```

---

## Step 3 — Replace Part 3 body in `lib/insights.ts`

Find the entry with `slug: 'frontier-labs-fde-platform-theory'` and replace **only** these two fields:

### `readingMinutes`
Change `6` → `3`

### `ogImage`
Change `/og/og-frontier-labs-fde-platform-theory-v1.png` → `/og/og-frontier-labs-fde-platform-theory.png`

### `body` — full replacement

Replace the entire `body: [...]` array with:

```typescript
body: [
  "## TL;DR",
  "::stat\n3 | Labs. Three theories of production.\nAug 24 | Anthropic enterprise managed authorization: GA\nMCP | De facto agent plumbing layer, industry-wide\n0 | Of these decisions belong to benchmark season",
  "- [ ] **The lab shapes the architecture, not just the output.** Anthropic governs. OpenAI operates full-stack. Perplexity grounds intelligence in real time. Route accordingly.",
  "- [ ] **Anthropic's enterprise managed authorization (GA Aug 24) is the regulated-industry unlock** — per-agent tool allowlists, private MCP sandboxes, human approval gates before irreversible actions.",
  "- [ ] **The four harness inputs from [Part 2](https://ensolabs.ai/insights/agent-harness-inputs-outputs) don't change by lab.** The outputs — tools, permissions, retrieval strategy — are lab-specific architecture decisions.",
  "![Four-stat block: 3 labs, Aug 24 Anthropic GA, MCP as industry plumbing, 0 decisions belong to benchmark season — The Forward Deployed Strategist Part 3](/images/insights/fds-part3-stats.png)",
  "In the last 30 days alone, three frontier labs each shipped something that changes how production deployments work. Anthropic made enterprise-managed authorization generally available for MCP. OpenAI expanded its forward-deployed relationships and the operator model. Perplexity launched Computer and deepened the Implementation Partners program.",
  "A Forward Deployed Strategist who treats all three as 'the AI' will build the wrong system — not a slow one, not an expensive one. The wrong one. Because the lab's theory of production is the architecture decision underneath everything else.",
  "## Three theories of production",
  "![The three theories animated — Anthropic (Governance Lab), OpenAI (Full-Stack Operator), Perplexity (Research/Action Interface) — columns animate in sequence, all three lit at once](/images/insights/fds-part3-theories.gif)",
  "**Anthropic's theory:** Safety-first, governed trust. The operator layer — MCP permissions, managed authorization, human-in-the-loop gates — is where production deployments live. Enterprise managed authorization (GA Aug 24) means per-agent tool allowlists, private MCP server sandboxes, and mandatory human approval before irreversible actions. That is not a safety feature bolted on after the build. It is the answer to the question every enterprise IT team asks before approving a new system.",
  "**OpenAI's theory:** Full-stack ambition. From compute to model to product. At large enterprise accounts, OpenAI often has its own forward-deployed team in the room — going wide across the org. The FDS practitioner goes deep: specific workflow, specific domain, the four harness inputs OpenAI's FDE team doesn't write before the build starts.",
  "**Perplexity's theory:** The research/action interface. Most production agents run blind — no reliable, real-time, grounded view of what's happening right now. Perplexity Computer and the deep web integration fix that. As a [Perplexity Implementation Partner](https://ensolabs.ai/insights/enso-labs-perplexity-implementation-partner), we deploy this layer as infrastructure — a signal-monitoring engine that pulls 200+ sources, scores them for domain relevance, and delivers structured intelligence briefings current as of this morning.",
  "## Route the work correctly",
  "![Routing decision table — Anthropic for governed production, OpenAI for reasoning speed, Perplexity for real-time intelligence — with use cases and what you get](/images/insights/fds-part3-routing.png)",
  "The practitioner who wins is not loyal to a single lab. The routing logic is not complicated once you know each lab's theory:",
  "**Anthropic** for the governed production layer — operator permissions, MCP tooling, enterprise managed auth that makes the system approvable by a compliance team.",
  "**OpenAI** for reasoning and coding speed — GPT-5 for synthesis, Codex for build velocity in components that don't require domain-specific governance.",
  "**Perplexity** for the intelligence feed — real-time, grounded, citable, structured for the domain expert who needs to act on it.",
  "The forward deployment revolution is not 'which model wins.' It is the moment when practitioners understand the labs well enough to route work correctly — and to build systems that survive the first production review.",
  "> **The Forward Deployed Strategist series:** [Part 1 — The Agency Lineage](https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage) · [Part 2 — The Agent Harness](https://ensolabs.ai/insights/agent-harness-inputs-outputs) · Part 3 — The Labs (this piece) · [Part 4 — The Practice](https://ensolabs.ai/insights/frontier-deployment-code-models-case-studies)",
  "---",
  "**Enso Labs** is an AI transformation and agentic systems studio. We are a Perplexity Implementation Partner and a Claude-native studio — we build and operate production AI systems for regulated industries, financial services, and commercial organizations. [Get in touch →](https://ensolabs.ai/contact)",
],
```

---

## Step 4 — Verify build

```bash
npm run build
```

Fix any TypeScript errors before proceeding. Build must be green.

---

## Step 5 — Commit, push, open PR

```bash
git add -A
git status   # verify: 4 new scripts, 3-5 new assets, 1 changed insights.ts, 1 changed OG
git commit -m "feat: FDE Part 3 visual refresh — 3 min read, 4 visual assets, new OG"
git push origin content/fde-part3-visual-refresh
gh pr create \
  --title "FDE Part 3 visual refresh — 3 min read + animations" \
  --body "Cuts Part 3 from 6 → 3 min. Adds stat block, three-theories animation, routing card, new OG. Hold for Sav visual review before merge." \
  --base master \
  --draft
```

**Do NOT auto-merge.** Leave as draft PR for Sav to review the visual assets in the Vercel preview.

---

## Step 6 — After Sav approves and merges

1. Confirm live: `curl -s https://ensolabs.ai/insights/frontier-labs-fde-platform-theory | grep "fds-part3-theories"`
2. Run LinkedIn Post Inspector on the article URL to force OG cache refresh:
   `https://www.linkedin.com/post-inspector/inspect/https%3A%2F%2Fensolabs.ai%2Finsights%2Ffrontier-labs-fde-platform-theory`
3. Then (and only then) publish the LinkedIn post.

---

## LinkedIn Post (for Sav to review — do not publish until OG is pre-warmed)

```
Three labs built something in August that changes how production AI works.

Anthropic made enterprise managed authorization GA for MCP — per-agent tool allowlists, private sandboxes, human approval gates before irreversible actions.

OpenAI kept expanding its forward-deployed footprint.

Perplexity launched Computer and deepened the Implementation Partners program.

A Forward Deployed Strategist who treats all three as "the AI" will build the wrong system.

The labs are not interchangeable. Each has a distinct theory of production. Route accordingly.

Part 3 of the FDS series → in comments
```

---

## Cinemagraph / LinkedIn hero image (separate deliverable — Claude Design)

For the launch post image, pass this brief to Claude Design:

**Brief:** A 1080×1080 editorial image for LinkedIn. Dark navy background (`#0D1321`). A city block at night — abstract, not literal — with three vertical light columns rising from street level, each a different color: teal (left), coral (center), amber (right). The columns should feel like data streams or signal towers. Text overlay bottom-left in Lora serif: *"Three labs. Three theories."* Subtext in JetBrains Mono: `STRATEGY → SHIP · ENSO LABS`. The arrow `→` in Ship Coral `#F0512E`. No photography required — pure design illustration.

Alternatively: generate as a `canvas-design` skill output in this session.

---

## Files changed summary

| File | Action |
|---|---|
| `scripts/generate-fds-part3-stats.js` | CREATE |
| `scripts/generate-fds-part3-theories-anim.js` | CREATE |
| `scripts/generate-fds-part3-routing.js` | CREATE |
| `scripts/generate-fds-part3-og.js` | CREATE |
| `public/images/insights/fds-part3-stats.png` | GENERATE |
| `public/images/insights/fds-part3-theories.gif` | GENERATE |
| `public/images/insights/fds-part3-theories.mp4` | GENERATE |
| `public/images/insights/fds-part3-routing.png` | GENERATE |
| `public/og/og-frontier-labs-fde-platform-theory.png` | OVERWRITE |
| `lib/insights.ts` | EDIT (body, readingMinutes, ogImage for Part 3 only) |

---

*Handoff prepared by Enso Labs · Strategy to Ship · Sep 1 2026*
