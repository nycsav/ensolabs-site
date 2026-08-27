# When the portal has no door
### Building an MCP harness for IBM Partner Plus — a field report

**Enso Labs · IBM Partner Plus (Build) · July 2026**

---

## Summary

IBM Partner Plus has no connector and no public API. Its onboarding is a series of
human-only gates that AI agents cannot cross and new partners routinely fail. We
onboarded Enso Partners LLC, instrumented every point of friction, and built
**Partner Plus Navigator** — an MCP harness that turns the portal's hidden
knowledge into tools any frontier model can call.

Nine tools. Seven frontier models. One API key. Built and verified in two days.

The friction was not incidental. **It was the requirements document.**

---

## 1. The problem nobody had written down

We set out to build a watsonx Orchestrate demo for the UC Berkeley RDI Agentic AI
Summit. We assumed the hard part would be the agent. It wasn't — the agent took
an afternoon. Getting *access* took two days and never fully completed.

Every failure below is real, timestamped, and cost hours.

| # | What happened | What we assumed | What was actually true |
|---|---|---|---|
| 1 | `401 Invalid API key` while the account showed **$20.85** in credits | Billing problem | **Stale key.** Six keys existed; the installed one was revoked. Credits were never involved. |
| 2 | Signup demanded a credit card | The trial costs money | The **partner path** was one unlabelled link away: *"Register with a code"* |
| 3 | Cloud Credits showed **Locked** | Our account was misconfigured | Credits require **Silver**. We were Registered. Nothing was broken. |
| 4 | Sponsor submitted a ticket; nothing arrived | The email was lost | **IBM-internal tickets never copy the partner.** There was nothing to find. |
| 5 | MCP server installed but invisible to the project | Install failed | `claude mcp add` defaults to **local scope** — tied to the folder it ran in |
| 6 | Benefits appeared unavailable | We needed credits to build | **IBM Technology Zone is free at Registered tier.** We nearly waited weeks for something we already had. |

Item 6 is the one that matters. **The most valuable benefit at our tier was
invisible until we read the benefits index line by line.** A partner who doesn't
do that waits on a credit ticket for a capability they already own.

---

## 2. Why an agent can't fix this today

Three structural barriers, none of which are skill problems:

**No API.** `partnerportal.ibm.com/s/` is Salesforce Experience Cloud — a portal
built for human clicks. No endpoints for tier, benefits, entitlements or credits.
Two independent searches of IBM's developer documentation found nothing.

**IBM's own MCP work points elsewhere.** IBM ships MCP servers for watsonx.data,
document retrieval and the governed agentic catalog, plus an MCP integration for
IBM Bob. All of it targets IBM's *data* products. Nothing addresses the partner
program itself — the layer every partner touches first.

**The gates are deliberately human.** Accepting terms, entering payment details,
applying a one-shot feature code — these should stay human. Automation should
remove the *confusion* around them, not the consent.

So the target isn't "automate the portal." It's **make the portal legible.**

---

## 3. What we built

**Partner Plus Navigator** — an MCP server exposing nine tools.

### The IBM half

| Tool | Question it answers | Grounding |
|---|---|---|
| `partner_plus_benefits` | What's unlocked at my tier — and what isn't? | Read first-hand from a live Registered account |
| `partner_plus_build_route` | Where do I build without credits? | Four routes ranked by time-to-start |
| `partner_plus_troubleshoot` | Why is this broken? | Five failures we hit, with the *real* cause |
| `partner_plus_ask` | Anything else | Live search over IBM's own domains, cited |

### The research half

| Tool | What it does |
|---|---|
| `sonar_search` | Grounded web search, four depths, always cited |
| `openai_reason` | Synthesis on any frontier model |
| `corroborate` | Searches, then has a *second* model audit the answer for unsupported claims and undated figures |
| `panel` | OpenAI, Anthropic and Google answer the same question — divergence is the signal |
| `provider_status` | What's configured, for debugging |

### Verified, not asserted

All on a single Perplexity key, 2026-07-30:

- **7/7 frontier models live** — OpenAI (gpt-5.4, 5.5), Anthropic (sonnet-4-6, haiku-4-5), Google (gemini-3.1-pro, 3-flash), xAI (grok-4.3)
- **5/5 regression passing** against live APIs
- **9 tools registered**

---

## 4. Four bugs worth publishing

Engineering notes, because each cost real time and none were in any doc.

**MCP SDK 2.0 renamed the server class.** `FastMCP` became `MCPServer`. Every
tutorial online still shows the old import. Our shim supports both.

**Anthropic models 400 without `max_output_tokens`.** The status code says
nothing; the response *body* says exactly what's wrong. Read the body.

**A silent `except` cost an hour.** Our retrieval returned `[]` on failure —
indistinguishable from "quiet news day." A 90-second timeout was firing
invisibly. Graceful degradation must still leave a trace.

**A domain-specific scorer isn't a scorer.** Our signal-scoring lens hardcoded
battery-storage keywords, so every AI-topic signal scored a flat 4.0. It looked
like it worked because the demo topic matched the hardcoding. Relevance now
derives from the caller's own lens.

---

## 5. What this proves

**The friction is the product.** Every hour lost to a misleading 401 or an
invisible benefit is an hour every IBM partner loses. Encoding that knowledge
once turns a two-day onboarding into a two-minute question.

**MCP is the right shape for it.** One server, any host — Claude Code today,
watsonx Orchestrate on registration, Cursor or Claude Desktop for the next
person. IBM's own framing calls MCP "the USB-C port for AI." This is that port,
fitted to the partner program.

**Multi-model matters for governance.** IBM's ROI guide reports that **56% of
CEOs are delaying generative-AI investment pending governance clarity**, and that
**68% of the highest-ROI organizations have mature governance frameworks versus
32% of others**. `corroborate` and `panel` are governance primitives: a second
model auditing the first, and three models disagreeing in the open.

**Only 25% of AI initiatives deliver expected ROI; 16% scale enterprise-wide.**
The gap isn't model quality. It's the unglamorous connective work — access,
grounding, verification — that this harness does.

---

## 6. Honest limitations

- **No live portal read.** Without an API, tier and entitlement data cannot be
  fetched programmatically. The tier map is verified but hand-maintained, and
  will drift when IBM changes the program.
- **Not yet running inside watsonx Orchestrate.** The registration script is
  written and syntax-checked; it needs an environment we don't yet have.
- **`claude-opus-4-7` is documented but 400s** on our API group. Omitted rather
  than shipped broken.
- **The human gates remain human**, by design. Terms, payment and one-shot codes
  should never be automated.

---

## 7. What we'd build next

1. **Session-bridge portal reader.** With a partner-initiated authenticated
   browser session, read the live benefits index and reconcile it against the
   static map — turning a hand-maintained tier map into a self-updating one.
2. **Register as an Orchestrate remote toolkit**, making "one server, two hosts"
   literal via IBM's documented `orchestrate toolkits add` path.
3. **Add watsonx.ai Granite** as an eighth model, so the panel includes IBM's own.
4. **Open-source the Navigator** as a contribution to the Partner Plus community —
   the missing connector, offered back.

---

**Strategy → Ship**
Enso Labs · IBM Partner Plus (Build) · Perplexity Implementation Partner
Built and verified 2026-07-30 · ensolabs.ai

_The confidential client referenced in related work appears as "a Fortune 500 manufacturer."_
