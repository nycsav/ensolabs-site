# Strategy to Ship — Multi-Format Distribution Engine

### Strategy + spec for the "one prompt → all formats" distribution system

*Companion to `strategy-to-ship-design-system.md` (brand kit) and the `signal2noise-blog` skill (article drafting). Drafts only — human gate before anything ships. Studio voice: "we." Gore = "Fortune 500 manufacturer."*

*Drafted June 23, 2026.*

---

## 0. The core principle

**Don't distribute the article — atomize it.**

The canonical `/insights/[slug]` page is the *destination*, not the *post*. Every channel gets a **native asset built for that channel**, designed in the Strategy to Ship brand kit. The article URL is the click we earn, not the thing we paste into a feed.

This is the whole reason the design system exists: one DNA, every surface. The format kit is already specified (§8 of the design system). What's missing is the **engine that fills it from a single source in one pass** — that's this doc.

---

## 1. Why native-first (the 2026 reality)

The platforms changed the rules. Posting a link is now the worst thing you can do.

- **External link in a LinkedIn post body → ~60% less reach.** LinkedIn actively suppresses content that pulls users off-platform.
- **Link-in-comments is now also partially penalized.** The 2026 algorithm detects "bridge behavior" (a post obviously built to funnel to a comment link) and dampens it. Still safer than an in-body link, but no longer a free pass.
- **Document/PDF carousels are the #1 format:** ~6.60% avg engagement (highest of any format), 15–20s+ dwell time vs 8–10s for single-image/text, ~5× reach, ~3× clicks. Native video is second (~5.60%).
- **Saves are a top ranking signal**, and a clear **numbered framework** is the most-saved B2B format.
- **Native surfaces get full distribution:** LinkedIn articles and LinkedIn newsletters are not penalized for links and notify subscribers directly.

**Implication for us:** lead with a standalone, link-free, value-complete native post (carousel-first). Send the link only through surfaces that reward it (LinkedIn article/newsletter, X, our own newsletter), or as a soft "full piece on our site / in comments" once the post has stood on its own.

---

## 2. The channel matrix (recommended default)

One published article → this pack, every time. Tiers reflect where the reach is.

| Channel | Native asset | Format / spec | Link rule | Cadence |
|---|---|---|---|---|
| **Canonical** | `/insights/[slug]` article | `.theme-sts` Paper theme, Lora h1, mono meta, coral links | n/a (this is the destination) | per pillar |
| **LinkedIn — hero** | **Document/PDF carousel** | 1080×1350, 8–12 slides, numbered framework, cover = Lora headline + coral stamp, last = CTA | no link in body; "full piece → our site" on CTA slide | 1×/article |
| **LinkedIn — text** | Standalone native post | 900–1,300 chars, hook → signal → Enso take → one move | **no link in body**; link in first comment only if it adds value | pairs with carousel |
| **LinkedIn — owned** | LinkedIn **newsletter / article** | Native long-form, full brand | link OK (native, full distribution) | per pillar / monthly |
| **X / Twitter** | Thread | 5–9 posts, one atom each (stat, frame, quote), coral-arrow card images | link OK in final post | per article + 3–5 threads/wk |
| **Newsletter (owned)** | Email / Substack mirror | Masthead 1200×400, issue №, short or long form | links OK | per pillar |
| **Visual atoms** | Square post + signal card | 1080×1080 and 1200×630, one stat/idea + arrow device | platform-dependent | reused across feeds |
| **OG / social card** | Dark + light | 1200×630, auto-generated on publish | n/a | automatic |

Tiering rationale: LinkedIn carousel is the single highest-leverage asset, so it's the hero. The standalone text post carries the idea where the link can't go. Owned surfaces (LinkedIn newsletter + our email/Substack) are where we're *allowed* to send the link at full strength.

---

## 3. Cadence (mapped to existing rhythm)

- **LinkedIn:** 3–5×/week. One strong post every 1–2 days beats daily filler. Hero carousel + text post per pillar; fill the rest of the week with atomized stats/quotes and the Friday wins.
- **X/Twitter:** 1–3 posts/day, threads 3–5×/week (build-in-public + signal commentary).
- **Newsletter:** on the pillar cadence (LinkedIn newsletter primary for distribution; mirror to email/Substack for ownership).

This plugs into the current scheduled tasks: `signal2noise-intelligence` (Mon/Wed/Fri 8am LinkedIn drafts) and `wins-to-profiles-distributor` (Fri wins). Both should be re-pointed at this engine's output and the new brand.

---

## 4. The one-prompt distribution engine (the build)

**Goal:** one command turns a published article into the entire native pack, brand-locked, drafts-only.

**Input (any one):**
- a published `/insights/[slug]` URL, or
- the article slug, or
- the draft markdown in `drafts/insights/`.

**Process:**
1. **Read** the canonical article (title, dek, body, sources, the "Enso take").
2. **Atomize** into reusable units: the hook, 3–6 key stats, the framework/numbered list, 2–3 pull-quotes, the "Monday move," the Enso connection.
3. **Reframe per persona** where it matters — executive (outcome), practitioner (how), first-timer (what it means). Same facts, different depth/CTA.
4. **Render per channel** using the format kit + tokens (Lora / Inter Tight / JetBrains Mono; Paper/Ink/Ship Coral; coral arrow; `Powered by Enso Labs`).
5. **Emit one "distribution pack"** — a single artifact with every asset below.

**Output — the distribution pack:**
- LinkedIn **carousel**: slide-by-slide copy + per-slide design spec (and/or a generated PDF via the `pdf` / `canvas-design` skills).
- LinkedIn **text post** (link-free, stands alone) + the optional first-comment text.
- LinkedIn **newsletter/article** version (native long-form).
- **X thread** (numbered posts + card-image specs).
- **Newsletter/Substack** copy (masthead + body).
- **Square post** + **signal card** copy/specs.
- A **posting checklist**: which asset, which surface, when, link rule, suggested time.

**Guardrails:** drafts only — never auto-posts. Honors studio "we," Strategy to Ship brand rules, the coral-arrow-never-recolored rule, Gore = "Fortune 500 manufacturer," no partner-status claims until approved.

**Productize as:** a new skill `strategy-to-ship-distribute` (companion to `signal2noise-blog`: blog drafts the pillar, distribute atomizes it). Runnable manually (`/distribute [slug]`) or wired into the Mon/Wed/Fri schedule.

---

## 5. Measurement (stop counting clicks)

Per-channel KPI, because reach now lives on-platform:
- **LinkedIn:** saves + dwell + comments first; reach second; profile visits third. Clicks are a weak signal now.
- **X:** thread completion, reposts, profile visits.
- **Newsletter:** open rate, replies, forwards.
- **Canonical article:** organic search / AEO citations, returning readers — the long-tail asset.

---

## 6. What's already in place vs. the gap

**Done:** the `.theme-sts` article page (commit `31726c4`), the brand kit + tokens, the format-template list (design system §8), auto-generated OG cards, the `signal2noise-blog` drafting skill.

**Gap to close:**
1. Update the old `signal2noise-editorial-engine.md` — it still uses an in-body link structure and the deprecated `/insights/signals/` slug. Replace with this native-first model + the new brand.
2. Build the `strategy-to-ship-distribute` skill (this spec).
3. Re-point `signal2noise-intelligence` + `wins-to-profiles-distributor` scheduled tasks at the new engine and brand.

---

## Sources (2026 best practices)

- LinkedIn Algorithm 2026 — Dataslayer: https://www.dataslayer.ai/blog/linkedin-algorithm-february-2026-whats-working-now
- LinkedIn Algorithm 2026 engagement guide — Digital Applied: https://www.digitalapplied.com/blog/linkedin-algorithm-2026-engagement-strategy-guide
- LinkedIn carousel best practices for B2B 2026 — Oktopost: https://www.oktopost.com/blog/linkedin-carousel-pdf-best-practices/
- Content repurposing: one piece, ten formats — Digital Applied: https://www.digitalapplied.com/blog/content-repurposing-one-piece-ten-formats-guide
- Create Once, Publish Everywhere (COPE) 2026 — PostQuick: https://www.postquick.ai/blog/content-repurpose-workflow-for-social-media-create-once-post-everywhere
- LinkedIn newsletter strategy 2026 — InfluenceFlow: https://influenceflow.io/resources/linkedin-newsletter-strategy-complete-guide-for-2026/
- X vs LinkedIn for founders 2026 — Monolit: https://monolit.sh/blog/twitter-x-vs-linkedin-founders-2026-pros-cons-which-platform-focus
