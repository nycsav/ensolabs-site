# Handoff — Commercial/Growth Core weave + content strategy
For Claude Design · surgical (NOT an overhaul) · 2026-07-10
Pairs with `handoffs/managed-services-repositioning.md` (macro frame). This doc adds ONE door — the Commercial/Growth Core (the "Madison Avenue engine") — plus the content plan.

## Guiding principle
Additive, not a rebuild. Net new: **1 track block + 1 landing page + 1 content pillar.** Everything else is a sentence or a reframe. Keep "we" voice, Strategy → Ship brand, all case-study metrics, Gore = "Fortune 500 manufacturer."

---

## Site audit → surgical changes (page by page)

### Home (`app/page.tsx`)
- Hero/pillars: covered by the macro handoff. **One add:** a single proof line under the positioning section — *"The same encode → build → operate we bring to regulated ops, we bring to growth — campaigns, segmentation, and brand, run as agents."* Ties the agency craft into the model without a redesign.
- Sectors strip already lists MEDIA · CONSUMER — keep (it now pays off).

### Services (`app/services/page.tsx`) — the main add
- Add a **4th track: "AI Growth & Commercial Systems."** Change H1 `Three tracks.` → `Four tracks.` and add it to the intro sentence.
- Track lede: *"Fifteen years of Madison Avenue craft — segmentation, insight, campaign planning, brand — built as agents. Growth marketing, marketing engineering, and GTM engineering are new names for work we've done for enterprises since before the buzzwords."*
- Track detail = the craft→agent mapping (below). Keep the existing "Three ways to start. All fixed-fee." ladder as-is.

### NEW page — `/services/ai-growth-marketing` (the Commercial Core landing)
The one net-new page. Sections:
1. **H1:** `AI Growth & Commercial Systems` · sub: *"Agentic go-to-market, built on 15 years of brand and demand craft."*
2. **The reframe** (the mapping table — answer-lead, AEO gold):

| Your problem, the old way | The 2026 name | We build it as | 
|---|---|---|
| Customer segmentation | ICP modeling / hyper-personalization | segmentation agents on live intent data |
| Research, discovery, stakeholder interviews | voice-of-customer / insight mining | agentic insight extraction at scale |
| Campaign planning | growth marketing / GTM | multi-channel planning agents |
| Media & execution optimization | marketing engineering | 24/7 optimization agents (Google · LinkedIn · Meta) |
| Brand building & positioning | brand governance | brand-guardrail agents (your brand book = the rubric) |
| Demand / full funnel | growth engineering | full-funnel agentic demand system |

3. **Outcomes:** McKinsey 10–30% revenue uplift (always-on personalization); 3–5x email CTR; 20–30% better cost-per-pipeline; 60%+ faster content cycles.
4. **How it works:** encode brand/segmentation rules → build the agents → operate as a managed service (mirror the 3-altitude model).
5. **Proof:** reframe the existing regulated-pharma paid-search + conversion work as "AI-driven demand in a regulated vertical" (no new metrics — reuse what's real).
6. **CTA:** Get in touch. Cross-link `/services` + `/services/claude-managed-services`.
- SEO targets: "AI growth marketing NYC", "agentic marketing agency", "marketing engineering agency", "AI go-to-market consultant", "brand governance AI".

### Work (`app/work`)
- Reframe/add ONE proof card as a growth/commercial outcome (the pharma paid-search/conversion engagement → "AI-driven demand"). Reuse existing metrics; do not fabricate.

### About (`app/about`)
- One line (from macro handoff): *"…who encodes fifteen years of enterprise brand and demand expertise into production AI agents — fluent in the builder's room and the boardroom."*

### llms.txt + SEO
- Add to Services list: `AI Growth & Commercial Systems — agentic go-to-market, segmentation, brand governance, campaign optimization (/services/ai-growth-marketing)`.
- Add the new page to `sitemap.ts` and one line to the machine-readable brief so LLMs know Enso does agentic growth/marketing.

---

## Strategy to Ship — content strategy (going forward)
Add a **content pillar: "The Madison Avenue Engine" (agentic growth/brand).** Use the existing `Brand` lens tag in `lib/insights.ts`.

Cornerstone articles (drop straight into the publishing engine — answer-lead + FAQ schema + links to the Growth page & /contact + "Powered by Enso Labs"):
1. **"Growth marketing, marketing engineering, GTM engineering: three names for one 15-year-old craft."** (the reframe — highest AEO value)
2. **"Your brand book is the rubric: brand governance as an AI agent."**
3. **"We ran 24/7 ad-optimization agents in regulated pharma — here's what actually stuck."** (proof)
4. **"Segmentation didn't die — it went real-time. Agentic audience modeling."**
5. **"The control room: why judgment beats tooling in agentic marketing."**

Cadence: fold into the existing signal2noise/Strategy-to-Ship rhythm (LinkedIn Mon/Wed/Fri + 2–4 insights/mo). Lead every piece with the outcome, not the stack.

---

## LinkedIn (now unblocked — macro is locked)
- **Personal (Sav):** barbell headline (from the profile-corrections doc) + About leads the managed-agents thesis; add one growth line: *"…and the agentic growth systems behind modern go-to-market."*
- **Company page:** tagline → "Agentic Managed Services"; add "AI Growth & Commercial Systems" to the offering list.
- **Content:** Sav posts article #1 (the reframe) as a personal-brand + demand play — it's the single highest-leverage post for the SF-vs-NY barbell.

---

## Sequencing (plug-and-play order)
1. Home one-liner + Services 4th-track block (copy-only, fast).
2. New `/services/ai-growth-marketing` page.
3. llms.txt + sitemap + internal links.
4. Publish cornerstone article #1 via Strategy to Ship.
5. LinkedIn refresh + post #1.

## Guardrails (do NOT)
No studio rename · no overhaul · keep all metrics real · Gore = "Fortune 500 manufacturer" · innovation-consulting partners unnamed · protected paths (globals.css/schema) untouched · ship as a reviewable PR.
