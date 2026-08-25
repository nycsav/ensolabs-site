# Handoff — Homepage motion: A (hero mosaic) + E (Running now)

**slug:** `homepage-motion-a-e`
**design source:** `motion/Homepage A+E Combined.html` (Claude Design project "Enso Labs Website")
**target:** `nycsav/ensolabs-site` @ `master`
**risk:** routine content/CSS — auto-merge on green
**date:** 2026-08-25

## Goal
Make the homepage dynamic without changing any approved v3 copy. Additions:

0. **Positioning kicker + capability keywords.** A mono teal kicker above the H1 — *Forward-deployed AI transformation* — and a `CAPABILITIES` line under the existing `SECTORS` strip: `AGENTIC SYSTEMS · MULTI-AGENT ORCHESTRATION · MCP SERVERS · CONTEXT ENGINEERING · EVALS & OBSERVABILITY · AGENT GOVERNANCE · HUMAN-IN-THE-LOOP`. Real indexable text, matched to how buyers are searching agentic AI right now; the existing headline and lede are untouched.

1. **A — hero drift mosaic.** Four work tiles in the hero's right-hand air: fade+rise in after the headline resolves, drift continuously, counter-scroll on parallax. Below 1100px the mosaic is replaced by a horizontal swipe strip under the sectors line (it must never simply disappear).
2. **E — "Running now" section**, inserted directly after the hero (before the existing ticker). Terminal types itself out once on entry; four work tiles run a loop on hover.

Plus **block micro-motion** on the existing Services pillars and Proof grid: staggered rise on entry, count-up on the proof figures, hover lift, slow breathe on the colored cells, pulsing dot on each pillar tag.

**No copy changes** to the existing headline/lede/services/proof strings — the kicker and capabilities line in item 0 are the one deliberate addition.

## Files

### 1. `components/HomeMotion.tsx` (client component, effects only, renders nothing)
Copy of the design file's `<script>` block in a `useEffect`. Guarantees (subject of two verification rounds):

- Blocks are **visible by default in CSS**. `.bm-in` (the hidden offset) is only added by JS, only on `innerWidth > 768 && matchMedia('(hover:hover)') && !prefers-reduced-motion`, and only to elements genuinely below the fold.
- **No IntersectionObserver.** Reveal runs off `getBoundingClientRect()` on scroll plus a `setInterval(bmCheck, 600)` that never expires.
- 1400ms after a block enters view, `.bm-in` is **removed outright** so visibility never depends on a transition completing.
- **Count-up never renders 0 synchronously.** The authored figure stays in the DOM until the first real rAF frame; a 1200ms guard writes the true value if no frame fires. Skipped entirely when `document.hidden` or reduced-motion.
- Terminal typing has a 9s guard and a 12s hard fallback that write the full text.
- Cleanup: clear all timers/intervals and remove listeners in the effect's return.

Mounted once in `app/page.tsx`: `<HomeMotion />` just inside the fragment.

### 2. `app/globals.css`
- `.tile` + `.tile.amber/.blue/.coral` + `.tile img` + `.tile .ph`
- `.hero-kicker`, `.hero-caps`, and the `@media(min-width:1101px)` hero text-column cap — **this is the fix for the hero-mosaic/CTA overlap found on the live build**: at full width the meta line, the CTA row and the microcopy all ran underneath the mosaic tiles when `.hero-foot` kept its two-column 1.4fr/1fr layout. Capping `.hero-meta`, `.hero-sectors`, `.hero-caps` and `.hero-foot` to `max-width:60%` (and collapsing `.hero-foot` to one column: lede, then CTA row beneath it) at `>=1101px` keeps the entire text column clear of the mosaic band architecturally, rather than by hand-tuning individual tile offsets. Below 1101px nothing changes (mosaic is already replaced by the strip there).
- `.mosaic`, `.m1`–`.m4` (top-based percentages, tuned against the 60%-column layout above so all four tiles clear the headline/lede/CTA/sectors/capabilities with margin), `@keyframes tileIn`, `@keyframes float`
- `.hero > *:not(.hero-glow):not(.mosaic) { z-index: 2 }` (was 1) so hero text always paints above the mosaic band
- `.mosaic-strip` block inside `@media (max-width:1100px)` — this media query also sets `.mosaic{display:none}`. **Do not lower this breakpoint**; at 900px the tiles collided with the wrapped `.hero-meta` line on iPad landscape.
- `.run`, `.term*`, `.cur`, `.plays`, `.play*`, `@keyframes sweep`, `@media(hover:none)` badge suppression
- `.bm`, `.bm-in`, `.bm-on`
- `.pdot` + `@keyframes pdot`, `.pc.fc/.fb/.fa` breathe + `@keyframes breathe`
- `.pillar:hover` lift + `.pillar:hover li` nudge — **no two-column `.pillars` breakpoint.** The repo goes 3-col → 1-col at 900px; an intermediate `1fr 1fr` step leaves the third pillar alone with an empty bordered cell beside it on iPad landscape.
- `@media(prefers-reduced-motion:reduce)` overrides — force `.bm`/`.bm-in` to `opacity:1;transform:none`
- `.btn` affordance upgrade: `cursor:pointer`, border `var(--fg-3)` (was `--line-2`), `.ar`/`.arrow` slide, 2px hover lift + shadow, `:focus-visible` teal ring, `ctaPulse` halo on `.btn-primary`.

### 3. `app/page.tsx`
- **Hero kicker**: `<p className="hero-kicker">Forward-deployed AI transformation</p>` before the `<h1>`.
- **Hero capabilities line**: new `.hero-caps` block after `.hero-sectors`, matching the design's CAPABILITIES copy verbatim.
- **Hero text column.** At `min-width:1101px`, `.hero-meta`, `.hero-foot`, `.hero-sectors` and `.hero-caps` are capped at `max-width:60%` and `.hero-foot` collapses to a single column.
- **Hero:** `.mosaic` div (4 `<Link>` tiles → `/work/ai-market-intelligence`, `/work/heller`, `/work/trading-terminal`, `/work/enterprise-ai`) as a sibling after `.hero-glow`, and `.mosaic-strip` after `.hero-sectors`/`.hero-caps`. Strip gets `aria-label="Selected work"`; mosaic keeps `aria-hidden="true"` (duplicates Selected Work below).
- **"Running now"** section, `data-screen-label="02 Running now"`, immediately after the hero and before the `s2s-feature` block. Eyebrow numbering: `§ 01`; downstream sections renumbered (`What we do` → § 02, `Services` → § 03, `Proof` → § 04, `Selected work` → § 05, `How we work` → § 06, `Selected clients` → § 07).
- **Services pillars:** `bm` on each `.pillar`, tag wrapped in `<span className="pdot" />` + label.
- **Proof cells:** `bm` on each `.proof-cell`, `data-count="75|3|83|731"` on the four numeric cells that count up (`$150M+`, `15+`, `20+`, `100%` stay static).

### 4. Assets — placeholder today, real tomorrow
Tiles currently render CSS gradients. Drop-in path: put a still or a short muted `mp4` in `public/work/` and add `<img>` / `<video muted loop playsInline>` as the first child of `.tile`. Existing `/og/og-*.png` will work as stills in the interim.

### 5. Terminal figures
Static, taken from the April 2026 go/no-go milestone (731 / 111 / 16 / RWW ≥ 0.78). `.run-note` dateline is a build-time constant — `SITE.lastRun` in `lib/site.ts` — not a live read. Do not present the block as live until a metrics endpoint exists.

### 6. Header — no changes
`components/Nav.tsx` is already correct on master (real `/images/logo-white.svg` + `logo-ink.svg` swap, the `/ AI CONSULTING · NYC` lockup, Services flyout). The design file renders it only for hero context. **Do not touch Nav.tsx.**

## Verify before merge
- **1440px** — mosaic tiles clear of the headline, kicker, lede, CTA row, sectors and capabilities lines; parallax counter-scrolls; hero words rise in ~1.5s; Running now terminal types once on scroll-in; pillars stagger; proof figures land on 75/3/83/731 (never 0).
- **1024px (iPad landscape)** — mosaic hidden, swipe strip present, no tile behind `.hero-meta`; hero-foot stays two-column here (900–1100px keeps the original 1.4fr/1fr layout since the mosaic is already hidden).
- **390px** — strip scrolls horizontally without page-level x-overflow; `.plays` single column; hover badges hidden; no block stuck invisible; CTAs full-width-friendly.
- **Reduced motion** — everything visible and static, terminal shows full text immediately.
- **Throttled / background tab** — proof figures show real values, no zeros.
- `npm run build` clean.

## Change log
- 2026-08-25 (first pass): shipped in PR #59 (`243d895`). Hero mosaic + Running now + block micro-motion, no kicker/capabilities line yet. Overlap between `.mosaic .m3` and the CTA row was patched by hand-shifting that one tile's `top` offset (`bottom:13%` → `top:20%`), since the hero text column wasn't yet width-capped.
- 2026-08-25 (this pass): added the positioning kicker + capabilities line (item 0), and replaced the hand-tuned tile-offset patch with the architectural fix — capping the hero text column to 60% width at `>=1101px` — plus retuned `.m1`–`.m4` against that new layout and bumped hero-content `z-index` to 2.
