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

## Live data (optional, not wired yet)

This demo runs entirely on local sample data and needs **no API keys**. If you
later want to enrich or replace the sample signals with live ones (e.g. a
Perplexity + Claude pipeline like askSignal2Noise), that would be an added
server-side layer reading keys from `.env.local`. See `.env.example`.
