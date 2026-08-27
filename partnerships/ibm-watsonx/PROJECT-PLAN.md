# IBM watsonx × Enso Labs — Project Plan
**Owner:** Claude (orchestrating) · **Principal:** Sav Banerjee
**Last updated:** 2026-07-30 · **Milestone:** Berkeley RDI Agentic AI Summit, Aug 1–2

---

## The decision (made 2026-07-30)

**Berkeley demo runs on the MCP harness, which is finished and live. The watsonx Orchestrate leg is post-Berkeley.**

Rationale: the harness works today and needs nothing from IBM. The Orchestrate leg is blocked on a credit code that has not arrived and realistically will not clear before the summit. Ethan is *at* Berkeley — resolving credits face-to-face beats a ticket queue, and a working demo makes that ask easy to say yes to.

---

## Key architectural finding

**IBM Cloud is NOT required to build the MCP server.**

An MCP server is a local process speaking a standard protocol. It already runs on Sav's Mac and connects to Claude Code. IBM Cloud is only needed to *host watsonx Orchestrate* — one consumer of that server, not a prerequisite.

So the build is not blocked. Only the IBM-hosted demonstration is.

## Four routes to a watsonx environment (ranked)

| # | Route | Cost | Blocker | Verdict |
|---|---|---|---|---|
| 1 | **IBM Technology Zone** (techzone.ibm.com) | Free | IBMid login (Sav only) | ✅ **Best** — unlocked at Registered tier, no credits needed |
| 2 | **Software Access Catalog for new Business Partners** | Free | IBMid login | ✅ Unlocked at Registered — 20+ products, non-production |
| 3 | watsonx Orchestrate 30-day trial | Card **or** Ethan's code | Payment/code | ⏸ Blocked |
| 4 | Local ADK Developer Edition | Free | Docker not installed on the Mac | ⏸ Deferred |

**Routes 1 and 2 are already unlocked at the Registered tier** (verified in the Partner Portal benefits index, 2026-07-30). Cloud Credits require Silver and are locked — which is why Ethan's ticket matters, but is *not* the only path.

---

## Status

### Done and verified live
- **Perplexity MCP** (official) registered in Claude Code, user scope
- **Enso Research MCP** — 5 tools, **5/5 smoke checks passing**, **7/7 models verified live**
  - `sonar_search` — live web + citations
  - `openai_reason` — any frontier model via the Agent API (no OpenAI key/card needed)
  - `corroborate` — cross-provider fact-check; caught a weak citation on first live run
  - `panel` — OpenAI + Anthropic + Google answering the same question side by side
  - `provider_status`
- **Multi-model coverage on ONE Perplexity key:** OpenAI (gpt-5.4/5.5), Anthropic
  (sonnet-4-6, haiku-4-5), Google (gemini-3.1-pro, gemini-3-flash), xAI (grok-4.3)

### The "connect everything to Partner Plus" question — answered 2026-07-30
**The IBM Partner Plus portal has NO public API.** `partnerportal.ibm.com/s/` is
Salesforce Experience Cloud — a human web portal. Two searches found no endpoints for
tier, benefits, or credits. Partner Plus is where the *entitlement* lives; it is not a
data source. **The connectable IBM surface is watsonx** (Orchestrate / .ai / .data), which
IBM explicitly documents as an MCP *consumer* via remote toolkits + ContextForge Gateway.
- **Signal Lens** — live retrieval working end-to-end (8 signals → 2 surfaced, cited, dated)
- **Scoring lens** — rewritten domain-agnostic; battery regression still passes

### Bugs found and fixed
| Bug | Fix |
|---|---|
| MCP SDK 2.0 renamed `FastMCP` → `MCPServer` | Import shim supporting both |
| 90s timeout too tight; silent `except` hid it | 180s + logs the real reason |
| Scorer hardcoded battery vocabulary → everything scored 4.0 | Relevance now derived from the caller's lens |
| Citations showed "source unknown" | Scorer passes source/url/date through |
| Guessed Agent API model IDs → 400s | Pulled the real registry from IBM/Perplexity docs |
| Anthropic models 400 without `max_output_tokens` | Always sent; documented in code |

### Blocked (Ethan)
- Credit code → apply at IBM Cloud "Apply code"
- Then `bash register-orchestrate-toolkit.sh` (~1 hr, written and syntax-checked)

---

## Only Sav can do these (hard limits)

Claude cannot enter credentials, accept terms, or make payments. Two items:

1. **Log in to IBM Technology Zone** (techzone.ibm.com) with the ENSO PARTNERS IBMid → then Claude reserves the watsonx environment and completes the build. **This is the unblock — it needs no credits.**
2. **Text Ethan** for the ticket number + code. Per the partner-channel note, he runs on text/phone; the Jul 29 email appears never to have sent (no recipient, no reply).

---

## Next actions, in order

| # | Action | Owner | When |
|---|---|---|---|
| 1 | Rehearse the 4-min Berkeley demo on the live harness | Claude + Sav | Before Aug 1 |
| 2 | Text Ethan for ticket # / code | **Sav** | Today |
| 3 | Log into Technology Zone → Claude builds there | **Sav** → Claude | Anytime |
| 4 | Register MCP as Orchestrate toolkit | Claude | On unblock |
| 5 | Tune source-confidence weights | Claude | Post-Berkeley |

---

## The Berkeley narrative

IBM's own ROI guide names three barriers. Signal Lens answers all three:

| IBM's barrier | Enso's answer |
|---|---|
| Unstructured data | The 4-axis lens is the business-logic layer; MCP standardizes retrieval |
| Poor governance (56% of CEOs delay AI spend awaiting it) | Threshold + every claim dated and cited + `corroborate` audit |
| Task automation over workflow transformation | Scout→Curate→Publish is an end-to-end process |

Stat to lead with: **only 25% of AI initiatives hit expected ROI; 16% scale.** That's the gap Enso fills.

Proof point: *one MCP server, two hosts* — Claude Code today, watsonx Orchestrate on registration. IBM's "USB-C for AI" framing, demonstrated.
