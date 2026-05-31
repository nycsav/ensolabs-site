# Signal Lens — Interactive Demo

A standalone demo of the **Signal Lens**: expert-knowledge encoding as toggleable
relevance rules. Toggle the rules and the signal ranking, RWW (Real / Win / Worth)
scores, and the "Lens on vs. off" relevance lift all recompute in real time.

Generalized from the studio's market-intelligence work — **all sample data is
fictional** and contains no client information.

Powered by Enso Labs.

## Run it

```bash
npm install
npm run dev      # http://localhost:3100
```

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build on :3100
npm run lint        # next lint
npm run type-check  # tsc --noEmit
```

## How it works

- `lib/rules.ts` — the 9 lens rules, grouped into the three RWW dimensions, each
  with a weight. Rules cycle through `on → off → review` (review = half weight).
- `lib/data.ts` — 14 fictional advanced-materials signals. Each carries per-rule
  attribute scores plus an expert-validated `groundTruth` relevance used only to
  measure ranking quality.
- `lib/scoring.ts` — the pure scoring engine. Each RWW dimension is a weighted
  mean over its active rules; the composite relevance is the mean of the three.
  `computeLift` compares the lens ranking against a naive recency baseline using
  the ground-truth relevance, producing the headline lift metric.

The scoring logic is pure and side-effect free, so it can be unit tested
independently of the UI.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript. Self-contained — its own
`package.json` and `node_modules`, runs on port 3100 so it never collides with
the main site on 3000.

## Live mode (Perplexity + Claude)

Out of the box the demo runs on local sample data. Type a topic and hit **Fetch
live signals** to run the real pipeline:

1. **Perplexity** (`lib/pipeline.ts` → `sourceSignals`) sources recent,
   web-grounded developments on the topic as structured JSON.
2. **Claude** (`scoreSignals`) scores each sourced signal against all 9 lens
   rules — using forced tool-use for schema-valid structured output — and
   assigns each an expert `groundTruth` relevance. Defaults to `claude-opus-4-8`
   (override with `SIGNAL_LENS_MODEL`).
3. The scored signals flow into the exact same `Signal` shape as the sample data,
   so the existing ranking, RWW scoring, and lift logic work unchanged.

The work happens in the server-side API route `app/api/signals/route.ts`; keys
never reach the browser.

### Enable it

```bash
cp .env.example .env.local
# paste your real PERPLEXITY_API_KEY and ANTHROPIC_API_KEY into .env.local
npm run dev   # restart if it was already running
```

Without keys, the "Fetch live signals" button returns a clear message telling you
to add them — nothing crashes. Optional overrides (`SIGNAL_LENS_MODEL`,
`PERPLEXITY_MODEL`) are documented in `.env.example`.
