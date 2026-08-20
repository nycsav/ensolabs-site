# Handoff: Forward Deployed Strategist Part 1 — LinkedIn media assets — fds-part1-linkedin-assets

> Executed in Claude Code. Asset-generation handoff (no page/copy changes to the live site).
> One spec = one PR.

## Summary
Build the LinkedIn promotion kit for the already-published Part 1 article — a document carousel, a boost video, a square pull-quote, and the post copy. The article, its data visuals, and its animation already exist and ship as-is; this handoff only produces social-native derivatives sized for the LinkedIn feed.

## Source of truth
- **Article:** `lib/insights.ts` → slug `forward-deployed-strategist-agency-lineage`
- **Live URL:** https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage
- **Title:** "The best Forward Deployed Engineers have been forward deployed all along"
- **Published:** 2026-08-18 · Part 1 of a four-part series · pillar Consult, lens Brand
- Read the full `body` array before writing any slide copy. Do not invent stats.

## Target
- Branch: `design/fds-part1-linkedin-assets`
- Files to touch: `scripts/` (new/updated generators), `public/social/fds-part1/` (new output dir)
- **Do NOT touch:** `lib/insights.ts`, `app/`, `components/`, `globals.css`, `next.config`, `package.json` (except adding a devDependency only if genuinely required), any existing `public/images/insights/forward-deployed-strategist-*` asset

## What already exists — reuse, do not rebuild
| Asset | Path |
|---|---|
| Animated dataviz (NY 35% count-up) | `public/images/insights/forward-deployed-strategist-dataviz-anim.gif` + `.mp4` |
| Static dataviz | `public/images/insights/forward-deployed-strategist-dataviz.png` |
| Two-seats diagram | `public/images/insights/forward-deployed-strategist-part1.png` |
| Method map (two eras) | `public/images/insights/forward-deployed-strategist-method.png` |
| OpenAI Builder Lounge photo | `public/images/insights/forward-deployed-strategist-hero-photo.png` |
| Berkeley Campanile hero | `public/images/insights/berkeley-campanile-hero.png` |

Existing generators to read first and follow as the style reference:
`scripts/render-carousel.js` · `scripts/generate-fds-social.js` · `scripts/generate-fds-boost-video.js` · `scripts/generate-fds-dataviz-anim.js` · `scripts/_fds-logo.js`

`render-carousel.js` already defines the carousel JSON contract — conform to it exactly, do not redesign it:
```
{ slug, kicker, sourceCredit,
  cover:{ headline, stamp },
  slides:[{ n, heading, body }],
  sources:[{ claim, source }],
  cta:{ headline, subhead } }
```

## Deliverables

### 1. LinkedIn document carousel — PRIMARY
- Author `public/social/fds-part1/carousel.json`, render with `node scripts/render-carousel.js public/social/fds-part1/carousel.json`
- Output: `carousel.pdf` (1080×1350, 9–11 pages) + `carousel-cover.png`
- Kicker: `PART 1 · THE FORWARD DEPLOYED STRATEGIST`
- Cover headline: **Forward deployment always sent two.**
- Slide arc (one idea per slide, ≤ 220 characters of body each):
  1. The Forward Deployed Engineer is the fastest-growing role in AI — postings up ~10x in 18 months, comp $300K–$600K+.
  2. New York overtook San Francisco: ~35% of U.S. forward-deployed postings vs SF's 11%, concentrated in fintech and regulated industries.
  3. Palantir never sent one person. It sent two — the engineer who writes the code, and the deployment strategist who defines the outcome.
  4. The hiring frenzy only staffs one seat. The scarce half is the *forward*, not the engineering.
  5. Both strategist industries are contracting at once: McKinsey growth ~2% with headcount down ~10%; WPP revenue −6.6% in Q1 2026 while worldwide ad spend grew 8.6%.
  6. The method never changed, only the medium: the creative brief becomes the system prompt, the campaign rollout becomes the agent in production, the measurement plan becomes the eval harness.
  7. Gartner expects 40%+ of agentic AI projects cancelled by 2027 — on unclear business value and inadequate controls. A demand-side failure, not a modeling failure.
  8. What changed: with Claude, MCP, and modern agent frameworks, the person who understands the business problem can now build and operate the solution.
- Sources slide (required — the renderer supports it): Bloomberry / Paraform 2026 for the 35%/11% and 10x figures; Gartner for the 40% cancellation figure; McKinsey and WPP public reporting for the industry figures.
- CTA slide: headline "Agents live, results flat?" · subhead "We run production-gap reviews. ensolabs.ai/contact"

### 2. Boost video — 1080×1350, 4:5
- Run `scripts/generate-fds-boost-video.js`, confirm the MP4 + GIF land in `public/social/fds-part1/`
- If the script errors or ffmpeg is missing, fix the script rather than substituting a still
- Target 12–18s, silent-first (LinkedIn autoplays muted), burned-in captions, single continuous timeline: hook → 35% count-up + bars grow → CTA

### 3. Square pull-quote — 1080×1080
- Via `scripts/generate-fds-social.js`
- Quote, verbatim from the article: *"The industry is racing to teach engineers how to be forward. It might be faster to teach the forward how to engineer — and a lot of us already have."*
- Attribute to Sav Banerjee, Founder, Enso Labs

### 4. Post copy — `public/social/fds-part1/post-copy.md`
Three variants, each ≤ 1,300 characters with the hook in the first 210 (LinkedIn truncates there):
- **A — data hook:** open on New York overtaking SF at 35% vs 11%
- **B — contrarian hook:** open on "Palantir never sent one person. It sent two."
- **C — practitioner hook:** open on the 15 years in the holding companies → shipping production agents
Each ends with the article link and 3–5 tags drawn from the article's own `tags` array. Include a 2-line comment-bait first-comment for each.

## Brand / content rules to honor
- **Warm Signal palette:** Paper `#F7F1E6` · Ink `#1E1813` · Ink Deep `#16110B` · Ship Coral `#F0512E` · Ledger Amber `#E0A23C` · taupe `#79705F`. Enso Teal `#5CE0D2` only for "from Enso Labs" links.
- **Type:** Lora (headlines) · Inter Tight (body/UI) · JetBrains Mono (kickers, datelines, page numbers).
- Ship Coral is the signal — 5–10% of surface area max. The arrow glyph → is **always** `#F0512E`, never recolored.
- Wordmark "Strategy → Ship"; every asset closes "Powered by Enso Labs".
- **Carousel and video copy = studio voice "we", never "I".** The post copy in `post-copy.md` is Sav speaking personally, so first person is correct there — this is the one intentional split.
- **The Fortune 500 manufacturer stays unnamed.** Never write the client's real name into any asset.
- Lead with business outcomes, not the tech stack. No compressed startup jargon.
- Enso proof points, use verbatim: 20+ production AI systems · 75% pilot-to-production · ~3-month average time-to-first-value · 83% faster campaign launch and zero compliance incidents on the pharma AI CoE · 731 documents processed and 16 novel commercial signals validated for the Fortune 500 manufacturer.

## Acceptance checklist (confirm before PR)
- [ ] `npm run build` passes.
- [ ] Every figure in every asset traces to a line in the article `body` — no new or rounded-differently stats.
- [ ] Carousel PDF opens at 1080×1350 with no clipped text at any page; cover PNG exports clean.
- [ ] Boost video plays, is legible muted, and is under LinkedIn's 200MB / 15-min ceiling.
- [ ] No asset names the confidential client.
- [ ] No reference to `signals.ensolabs.ai` or the retired signal2noise domain.
- [ ] Assets committed under `public/social/fds-part1/` at stable paths (not temp dirs).
- [ ] PR opened against master — **never push to master directly.**

## After the PR merges — do not skip
Run the live article URL through **LinkedIn Post Inspector** before the first share, to force LinkedIn to cache the correct per-slug OG:
`https://www.linkedin.com/post-inspector/inspect/https%3A%2F%2Fensolabs.ai%2Finsights%2Fforward-deployed-strategist-agency-lineage`

## Out of scope
Article copy edits · new insight articles · Parts 2–4 of the series · site layout, CSS, or schema changes · publishing to LinkedIn (Sav posts; never auto-post).
