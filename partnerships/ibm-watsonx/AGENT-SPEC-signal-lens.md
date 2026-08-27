# Signal Lens — Agent Design Spec
### watsonx Orchestrate native agent · Enso Labs reference build

_Purpose of this doc: the design you populate once the watsonx Orchestrate trial is open, so the builder isn't a blank canvas. Pairs with the ADK scaffold in `./adk-scaffold/`._

---

## 1. Agent summary

| Field | Value |
|---|---|
| Agent name | `signal_lens` |
| Display name | Signal Lens |
| Type | Native agent (watsonx Orchestrate) |
| Reasoning style | ReAct (tool-calling loop) |
| Suggested model | A Llama-3.x instruct model available in your watsonx Orchestrate instance (confirm exact ID in the builder) |
| Owner | Enso Labs (managed) |

**One-line description:** Continuously scans a defined market, scores each signal against the client's strategic lens, and publishes a dated, cited brief of only what matters.

---

## 2. Orchestration pattern

Single native agent coordinating three tools in a Scout → Curate → Publish loop. (Phase 2 can split these into collaborating sub-agents; start with one agent + three tools for the demo.)

```
User / schedule
      │
      ▼
  signal_lens  ──►  fetch_signals   (Scout:  pull candidate signals)
      │        ──►  score_signal    (Curate: rank vs. strategic lens)
      │        ──►  publish_brief   (Publish: format + route the brief)
      ▼
 Decision-ready brief
```

## 3. Tools

| Tool | Input | Output | Job |
|---|---|---|---|
| `fetch_signals` | `topic`, `lookback_days` | list of raw signals | Pull candidate items from the client's sources |
| `score_signal` | `signal`, `lens` | score 0–10 + rationale | Rank relevance / materiality / urgency / confidence |
| `publish_brief` | `ranked_signals`, `channel` | formatted brief | Assemble the dated, cited brief and route it |

_For the demo, `fetch_signals` can return a curated sample set (no live keys required) so the walkthrough is deterministic; swap in a live source once the trial is stable._

## 4. Agent instructions (starting point)

> You are Signal Lens, a research-intelligence agent for enterprise strategy teams. Given a topic, call `fetch_signals` to gather candidate signals, then `score_signal` on each against the client's strategic lens, keeping only those scoring 7 or higher. Then call `publish_brief` with the ranked set. Always lead the brief with a one-line "what changed and why it matters," date every claim, and cite the source of each signal. Never present an unscored signal. If nothing scores 7+, say so plainly rather than padding the brief.

## 5. Scoring lens (the Enso IP)

Each signal scored 1–10 on four axes, averaged:
- **Relevance** — how directly it touches the client's market/thesis
- **Materiality** — how big the business impact if true
- **Urgency** — how soon it forces a decision
- **Confidence** — how trustworthy the source

8+ = surface immediately; 7–7.9 = include; below 7 = drop. (This is the same rubric behind the Fortune 500 manufacturer deployment; the axis weights are tuned per client in the first working sessions.)

## 6. Guardrails

- No unscored signals in output; no fabricated sources.
- Every claim carries a date and a citation.
- Confidential client names never appear in demo output ("Fortune 500 manufacturer").
- Read-only against client data for the demo; no write-back.

## 7. Berkeley demo script (~4 min)

1. **Frame (30s):** "Enterprise strategy teams drown in signal. Signal Lens is a managed agent that reads the market for you and surfaces only what forces a decision."
2. **Run (2m):** Prompt `signal_lens` with a live topic (e.g., "grid-scale battery storage this week"). Show it call fetch → score → publish, and narrate the ReAct trace.
3. **Payoff (1m):** Show the dated, cited brief; point out the 7+ threshold dropped the noise. "This pattern is in production today for a Fortune 500 manufacturer — this is it rebuilt natively on watsonx Orchestrate."
4. **Ask (30s):** "We'd like to list this in the Agent Catalog and co-sell into enterprise. Who owns that on your side?"

## 8. Success criteria for the demo

- End-to-end run completes in the builder without manual intervention.
- Brief is legible, dated, and cited.
- The Enso managed-agents story lands: IBM runtime + Enso domain logic + Enso operation.

## 9. Build order

1. Open the watsonx Orchestrate trial (SaaS) — see `./adk-scaffold/README.md`.
2. Import the three tools, then the agent (ADK) **or** recreate them in the browser Agent Builder.
3. Wire the sample signal set into `fetch_signals`.
4. Test the full loop; refine instructions.
5. Rehearse the 4-min script.

---

Strategy → Ship · Enso Labs · IBM Partner Plus (Build)
