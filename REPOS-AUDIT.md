# nycsav GitHub Portfolio Audit

**Last audited:** 2026-07-16 · **Scope:** all 31 repositories in the `nycsav` account (complete — enumeration returned `has_more: false`) · **Auditor:** Claude Code (remote session)

**TL;DR:** 31 repos audited. The site + Strategy to Ship engine are confirmed current (Vercel production READY today on master HEAD; engine commits Jul 10–14). No secrets are tracked anywhere — every secret-shaped string is a placeholder. One P0: the public **profile README (`nycsav/nycsav`) still links the retired `signals.ensolabs.ai` domain and calls signal2noise "Live."** One P1 breakage: **`enso-trading-terminal` CI has been red since Jun 29.** Three repos are archive/delete candidates, ten are missing GitHub descriptions, and 8 open PRs across 3 repos need triage.

---

## 1. Snapshot — every repo, status at a glance

Status key: 🟢 active/healthy · 🟡 needs attention · 🔵 dormant by design (hackathon/case-study/portfolio artifact — fine as-is) · ⚪ archived (correct end state) · 🗑️ cleanup candidate

| # | Repo | Vis | Purpose | Last push | Status | Action |
|---|------|-----|---------|-----------|--------|--------|
| 1 | **ensolabs-site** | pub | Production website for Enso Labs — Next.js 14, 71 JSON-LD schemas, MCP endpoint; daily SEO engine pushes to master | Jul 14 (+ prod redeploy Jul 16) | 🟢 | Triage 3 open PRs (#22, #19, #3) |
| 2 | **strategy-to-ship-content-ops** | priv | Strategy → Ship media & publishing engine — internal tooling (brand skill, prompts, channel configs, schedule) | Jul 14 | 🟢 | Merge `eval-gate` → `master` (or make it default); master still shows Jun 22 initial import |
| 3 | **MaisonOS** | priv | Maison H — AI catalog operations via H Company computer-use agent (audit storefront → human approves → fix via real admin GUI) | Jul 12 | 🟢 | Add GitHub description |
| 4 | **dreamrack-mcp** | priv | DreamRack Music Context Protocol — "second brain for music" MCP server + React dashboard; MVP milestone 6/8 done | Jul 11 | 🟢 | CI green; 2 open MVP issues on track; add description |
| 5 | **enso-adaudit-agent** | priv | AdAudit Agent — computer-use QA of live ad campaigns (Meta/Google Ads via H Company Holo CUA); early scaffold (6 files) | Jul 11 | 🟢 | Add description |
| 6 | **compintel-scout** | pub | Model-agnostic competitive-intelligence agent scaffold (lead-gen schema, wiki conventions) | Jul 8 | 🟢 | Add description (public repo, currently blank) |
| 7 | **enso-mcp-trading-june** | priv | MCP trading terminal — Alpaca WebSocket, live P&L; deployed as Render cron service | Jul 6 | 🟢 | Runtime on Render not verifiable from this session — spot-check the cron service |
| 8 | **job-application-agent** | pub | 3-agent job pipeline on Claude Code — scan → score → tailor, human-gated submit | Jul 4 | 🟡 | Blocked on Lane A (human-gated) vs daemon decision; then land PRs #2 → #3, close/merge #1 |
| 9 | **enso-trading-terminal** | priv | Autonomous signal intelligence + options trading platform (Python + React) | Jun 29 | 🟡 | **CI red since Jun 29 (3 consecutive failures on main)**; PRs #3/#4 stale since Apr/May — fix CI, then rebase or close |
| 10 | strategy-to-ship-engine | priv | Retired signal2noise/PlannerAPI-era engine — superseded by ensolabs.ai/insights | Jun 22 | ⚪ | None — correctly archived with correct description |
| 11 | enso-trading-hub | priv | Index + learnings hub linking every Enso trading/market-intelligence repo | Jun 16 | 🔵 | Update index rows for repos archived since Jun 16 |
| 12 | enso-crypto-terminal | priv | Spot-only algorithmic crypto terminal (Coinbase + Alpaca, fail-closed) | Jun 16 | ⚪ | None — correctly archived |
| 13 | **notion-geo-audit** | pub | Free GEO audit — CLI + MCP connector + Notion scoreboard; live at geo.ensolabs.ai, v1.0.0 | Jun 12 | 🟢 | 6 open issues are the intentional public roadmap — no action |
| 14 | enso-news-intelligence-engine | priv | ADK/Gemini 5-stage news-intelligence pipeline (AI Agents Challenge submission); CI green | Jun 12 | 🔵 | None |
| 15 | aeo-copilot | priv | AEO Copilot — MCP server + agentic loop closing the answer-engine-optimization loop (last commit "wip") | Jun 12 | 🔵 | Add description; decide continue vs park |
| 16 | IBM-WatsonX-AI-Agent-Workshop | pub | TradeCrew — multi-agent trading platform, watsonx.data lakehouse (IBM TechXchange NYC, Jun 2026) | Jun 10 | 🔵 | None — polished workshop showcase |
| 17 | monad-blitz-nyc | pub (fork) | MonadSwarm — parallel AI trading agents on Monad (hackathon, Jun 2026) | Jun 9 | 🔵 | None |
| 18 | allocation-mesh | priv | Generative Allocation Mesh — brand-side agent for AI answer-surface spend/ROI | Jun 6 | 🔵 | Add description |
| 19 | calm-layer | priv | Device-recovery layer prototype for elders/overwhelmed users; CI green | Jun 5 | 🔵 | None |
| 20 | calm-layer-device-helper | priv | Companion one-tap device-recovery helper prototype | Jun 5 | 🔵 | Add description |
| 21 | enso-labs-agent-challenge | priv | "signal2noise 2.0" — Google I/O 2026 build (Gemini via Vertex) | Jun 4 | 🔵 | Time-capsule with pre-rename branding (17 files) — archive to freeze it, or leave as historical record |
| 22 | notion-career-agent | pub | AI career agent on Notion Workers + Claude (Notion Developer Platform Hackathon) — almost certainly the renamed `signal2noise-notion-hackathon` (created same day, same event) | May 26 | 🔵 | None — mystery of the "missing" hackathon repo resolved |
| 23 | **nycsav** (profile) | pub | GitHub profile README — the public face of the account | May 19 | 🟡 | **P0 — see §2.1: retired domain linked 4×, "Live" claim on retired product, old repo link, pre-rename positioning** |
| 24 | ai-market-sensing-poc | priv | AI market sensing / custom LLM architecture — case-study reference scaffold (README + OG image) | May 12 | 🔵 | None |
| 25 | enso-market-intelligence-engine | priv | README-only shell ("Initial commit", 1 file) since May 11 | May 11 | 🗑️ | Build it out, or archive/fold into enso-trading-hub — profile README claims it's "In Development" |
| 26 | signalforge-lite | priv | Backtest-first crypto system (altFINS, deterministic rules, no LLM) | May 7 | ⚪ | None — correctly archived |
| 27 | signal-forge-v2 | pub | Multi-agent AI crypto paper-trading system (DeepSeek R1 via Ollama + Alpaca) | May 7 | 🔵 | None — legit public portfolio piece ("Signal Forge" is a distinct product line, not the retired signal2noise brand) |
| 28 | enso-trading-dashboard | priv | Dash + Plotly trading dashboard on Public.com SDK; CI green | May 3 | 🔵 | Superseded by later terminals per the hub — archive candidate if truly retired |
| 29 | advanced-gmail-mcp | pub (fork) | Fork: multi-account Gmail management MCP server (groundwork for the enso-google connector) | Apr 30 | 🔵 | None |
| 30 | PlannerAPI-Editorial-Homepage | priv | Magic Patterns export — Bloomberg-style editorial planner UI (PlannerAPI era, deprecated brand) | Feb 14 | 🗑️ | Archive — brand deprecated, generic template README, untouched 5 months |
| 31 | claude-practice | priv | Practice repo — single `hello.py` from Dec 2025, no README | Jan 13 | 🗑️ | Delete or archive |

---

## 2. Findings by priority

### 2.1 · P0 — Public profile README violates the retired-domain rule (`nycsav/nycsav`)

The account's most visible page (last updated **May 19**, pre-dating the June rename and the July positioning shift) currently contains:

1. **Badge linking `https://signals.ensolabs.ai`** labeled "signal2noise — Live" (line 10).
2. **"Live Products" table** listing signal2noise → signals.ensolabs.ai as "✅ Live" (line 34) — the domain and product are retired (May 2026).
3. **"Currently Building"** bullet promoting signal2noise expansion (line 58).
4. **Featured-repos link to `nycsav/signal2noise-engine`** (line 80) — that repo is now `strategy-to-ship-engine` (archived); the link only works via GitHub's rename redirect.
5. **Company LinkedIn URL** `linkedin.com/company/enso-partners` — canonical per CLAUDE.md is `linkedin.com/company/ensopartners-labs`. Verify which is right and align.
6. **Positioning** still "AI Transformation Consultant" era — should reflect Agentic Managed Services / managed agents (evolved 2026-07-10) and Strategy → Ship at ensolabs.ai/insights.

**Fix (ready to execute on approval):** replace items 1–4 with Strategy → Ship framing pointing to `ensolabs.ai/insights`, refresh the Live Products table (ensolabs.ai ✅ Live; Strategy → Ship ✅ Live at /insights; geo.ensolabs.ai ✅ Live is a strong addition), update positioning line, and resolve the LinkedIn URL. This session's push access is scoped to ensolabs-site only, so this is documented rather than pushed — say the word and a branch + PR lands on `nycsav/nycsav`.

### 2.2 · P1 — Broken / blocked

- **enso-trading-terminal: CI failing on `main` since Jun 29** — 3 consecutive red runs ("Phase 0 data pipeline / RL Phase 0" commits). The repo's own CLAUDE.md-era PRs #3 (Apr 29, CoinGecko agent — note: written for Signal Forge V2 but opened on this repo) and #4 (May 6, greeks/fib) pre-date main by two months. Order of operations: fix CI → then rebase-or-close both PRs.
- **job-application-agent: strategically forked, waiting on one decision.** PR #3 is explicitly HELD ("Lane A human-gated vs `mac-mini-handoff` auto-submit daemon"). Until Lane A/B is called, PRs #1/#2/#3 and the `mac-mini-handoff` branch all idle. One decision unblocks the whole repo.
- **strategy-to-ship-content-ops: active work isn't on the default branch.** All engine activity since Jun 22 lives on `eval-gate` (latest: Jul 14, "SF summits LinkedIn native article published"); `master` is frozen at the initial import. Merge `eval-gate` into `master` or make it the default so the repo's front page reflects reality.
- **ensolabs-site: 3 open PRs to triage** — #22 (CLAUDE.md event-inbox rule; protected-path, correctly held for Sav — review & merge), #19 (Vercel bot: adds `@vercel/analytics` package; decide merge vs close — CLAUDE.md currently says "enable in dashboard"), #3 (Jun 20 draft recording a local permission setting; merge or close as housekeeping).

### 2.3 · P2 — Hygiene & polish

- **10 repos have no GitHub description** (blank on the repo page): strategy-to-ship-content-ops, MaisonOS, dreamrack-mcp, enso-adaudit-agent, compintel-scout, aeo-copilot, allocation-mesh, calm-layer-device-helper, enso-labs-agent-challenge, claude-practice. Ready-to-paste one-liners in §4.
- **Cleanup candidates (3):** claude-practice (delete/archive), enso-market-intelligence-engine (empty shell — build or archive; profile README oversells it as "In Development"), PlannerAPI-Editorial-Homepage (archive — deprecated brand).
- **enso-trading-hub** index predates the June archivals — refresh its rows so the hub stays trustworthy as "start here."
- **enso-labs-agent-challenge** carries pre-rename "signal2noise 2.0" branding in 17 files. It's a private hackathon time capsule, so acceptable — archiving would freeze it honestly.

### 2.4 · ✅ Clean bills of health

- **No secrets tracked anywhere.** Zero tracked `.env`/credential files across all 31 repos; every secret-shaped match (`sk-ant-…` in strategy-to-ship-engine, `BEGIN EC PRIVATE KEY` in the crypto/trading repos) verified as placeholder/documentation text with no key material.
- **The three archived repos are the right three**, and `strategy-to-ship-engine`'s description ("Retired — superseded by ensolabs.ai/insights") is exactly right.
- **Deprecated-domain references** outside the profile README exist only as (a) content inside the archived engine repo — inert, and (b) *guard rules* in strategy-to-ship-content-ops that explicitly forbid using the retired domain — which is correct behavior, not drift.
- **CLAUDE.md's "signal2noise-notion-hackathon" mystery resolved:** the repo no longer exists under that name; `notion-career-agent` (created the same day, built for the same Notion hackathon) is almost certainly its rename. Notion-side links were already cleaned per ensolabs-site PR #3.
- **CI green** wherever it runs, except enso-trading-terminal: dreamrack-mcp ✅ (Jul 11), calm-layer ✅, enso-news-intelligence-engine ✅, enso-trading-dashboard ✅.

---

## 3. Site + engine verification (the two "already up to date" claims)

Confirmed, within this environment's limits:

- **Vercel production: READY** — latest production deployment (Jul 16) builds exactly `master` HEAD `b58dc4a` ("insights ItemList + FAQPage schema…"). Branch previews and PR deploys all READY back through Jul 11.
- **Daily engine cadence on master:** commits Jul 10, 11, 12, 13 (×2), 14 (×4). No commit landed Jul 15 (single quiet day after a 4-commit Jul 14); Jul 16 saw a production redeploy. Nothing suggests breakage — noting for awareness only.
- **Publishing engine (content-ops):** actively producing on `eval-gate` as of Jul 14.
- **Limit:** this sandbox's network policy blocks direct fetches of ensolabs.ai, so the CLAUDE.md "external fetch is clean" test could not be run from here; Vercel deploy state + master parity is the strongest available proxy. The daily engine's own checks cover the external-fetch test.

## 4. Ready-to-paste GitHub descriptions (for the 10 blanks)

| Repo | Suggested description |
|------|----------------------|
| strategy-to-ship-content-ops | Strategy → Ship content-ops engine — internal publishing tooling for ensolabs.ai/insights (brand skill, prompts, channel configs). By Enso Labs. |
| MaisonOS | Maison H — AI catalog operations powered by H Company: audit a storefront, human approves, agent fixes it through the real admin GUI. |
| dreamrack-mcp | DreamRack Music Context Protocol — a second brain for music, exposed through MCP servers + dashboard. MVP private preview. |
| enso-adaudit-agent | AdAudit Agent — computer-use QA audits of live ad campaigns across Meta/Google Ads via H Company Holo CUA. By Enso Labs. |
| compintel-scout | Model-agnostic competitive-intelligence agent scaffold — lead-gen schema, wiki conventions, agent-ready docs. By Enso Labs. |
| aeo-copilot | AEO Copilot — MCP server + agentic loop that closes the answer-engine-optimization loop. |
| allocation-mesh | Generative Allocation Mesh — the brand-side agent that earns, buys, and proves ROI on the AI answer surface. |
| calm-layer-device-helper | One-tap device recovery helper for elders and overwhelmed users — companion to calm-layer. |
| enso-labs-agent-challenge | Google I/O 2026 build — production-grade AI content intelligence (historical; brand since renamed Strategy → Ship). |
| claude-practice | Scratch/practice repo. (Or skip — recommended action is delete/archive.) |

## 5. Method & coverage

- **Enumeration:** `list_repos` via the Claude GitHub app — 31/31 repos, `has_more: false`; cross-checked against GitHub search (which omits the 2 forks by design).
- **Per repo:** shallow clone + inspection (README, manifests, workflows, CLAUDE.md), GitHub metadata (description, visibility, archived, last push), account-wide open-PR/issue sweep, latest CI run per repo with workflows, and a hygiene grep (retired domain, retired GA4 ID, tracked env/credential files, secret-shaped strings — matched paths inspected with values masked).
- **Not covered (out of session reach):** runtime health of externally hosted services (Render cron for enso-mcp-trading-june, Notion Workers deployments, geo.ensolabs.ai runtime) — repo state only; builds were not executed for dormant/hackathon repos (static checks only).
