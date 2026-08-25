# Handoff — Homepage motion: A (hero mosaic) + E (Running now)

**slug:** `homepage-motion-a-e`
**design source:** `motion/Homepage A+E Combined.html` (Claude Design project "Enso Labs Website")
**target:** `nycsav/ensolabs-site` @ `master`
**risk:** routine content/CSS — auto-merge on green
**date:** 2026-08-25

## Goal
Make the homepage dynamic without changing any approved v3 copy. Two additions:

1. **A — hero drift mosaic.** Four work tiles in the hero's right-hand air: fade+rise in after the headline resolves, drift continuously, counter-scroll on parallax. Below 1100px the mosaic is replaced by a horizontal swipe strip under the sectors line (it must never simply disappear).
2. **E — "Running now" section**, inserted directly after the hero (before the existing ticker). Terminal types itself out once on entry; four work tiles run a loop on hover.

Plus **block micro-motion** on the existing Services pillars and Proof grid: staggered rise on entry, count-up on the proof figures, hover lift, slow breathe on the colored cells, pulsing dot on each pillar tag.

**No copy changes.** Every string already on the page stays exactly as it is.

## Files

### 1. NEW — `components/HomeMotion.tsx` (client component, effects only, renders nothing)
Copy the `<script>` block from the design file verbatim into a `useEffect`. It must keep these guarantees, which were the subject of two verification rounds:

- Blocks are **visible by default in CSS**. `.bm-in` (the hidden offset) is only added by JS, only on `innerWidth > 768 && matchMedia('(hover:hover)') && !prefers-reduced-motion`, and only to elements genuinely below the fold.
- **No IntersectionObserver.** Reveal runs off `getBoundingClientRect()` on scroll plus a `setInterval(bmCheck, 600)` that never expires.
- 1400ms after a block enters view, `.bm-in` is **removed outright** so visibility never depends on a transition completing.
- **Count-up never renders 0 synchronously.** The authored figure stays in the DOM until the first real rAF frame; a 1200ms guard writes the true value if no frame fires. Skipped entirely when `document.hidden` or reduced-motion.
- Terminal typing has a 9s guard and a 12s hard fallback that write the full text.
- Cleanup: clear all timers/intervals and remove listeners in the effect's return.

Mount it once in `app/page.tsx`: `<HomeMotion />` just inside the fragment.

### 2. `app/globals.css` — append
Append the marked blocks from the design file, in this order, at the end of the file:

- `.tile` + `.tile.amber/.blue/.coral` + `.tile img` + `.tile .ph`
- `.mosaic`, `.m1`–`.m4`, `@keyframes tileIn`, `@keyframes float`
- `.mosaic-strip` block inside `@media (max-width:1100px)` — this media query also sets `.mosaic{display:none}`. **Do not lower this breakpoint**; at 900px the tiles collided with the wrapped `.hero-meta` line on iPad landscape.
- `.run`, `.term*`, `.cur`, `.plays`, `.play*`, `@keyframes sweep`, `@media(hover:none)` badge suppression
- `.bm`, `.bm-in`, `.bm-on`
- `.pdot` + `@keyframes pdot`, `.pc.fc/.fb/.fa` breathe + `@keyframes breathe`
- `.pillar:hover` lift + `.pillar:hover li` nudge — **do not add any two-column `.pillars` breakpoint.** The repo goes 3-col → 1-col at 900px; an intermediate `1fr 1fr` step leaves the third pillar alone with an empty bordered cell beside it on iPad landscape.
- `@media(prefers-reduced-motion:reduce)` overrides — must force `.bm`/`.bm-in` to `opacity:1;transform:none`

`.hero` already has `overflow:hidden` and the `> *:not(.hero-glow)` z-index rule — extend that selector to also exclude `.mosaic`:
`.hero > *:not(.hero-glow):not(.mosaic) { position: relative; z-index: 2 }`

Existing `.btn` gets the affordance upgrade from the design file: `cursor:pointer`, border `var(--fg-3)` (was `--line-2`), `.ar` arrow slide, 2px hover lift + shadow, `:focus-visible` teal ring, and the `ctaPulse` halo on `.btn-primary`.

### 3. `app/page.tsx`
- **Hero:** add the `.mosaic` div (4 `<Link>` tiles → `/work/ai-market-intelligence`, `/work/heller`, `/work/trading-terminal`, `/work/enterprise-ai`) as a sibling after `.hero-glow`, and the `.mosaic-strip` block after `.hero-sectors`. Both `aria-hidden` is wrong for the strip — give the strip `aria-label="Selected work"` and keep the mosaic `aria-hidden="true"` (it duplicates Selected Work below).
- **New section** `data-screen-label="02 Running now"` immediately after `</section>` of the hero and **before** the `s2s-feature` block. Markup as in the design file. Eyebrow numbering: this becomes `§ 01`, so **renumber the existing sections downstream** (`What we do` → § 02, `Services` → § 03, `Proof` → § 04, `Selected work` → § 05, `How we work` → § 06, `Selected clients` → § 07). `data-screen-label` values shift accordingly.
- **Services pillars:** add `bm` to each `.pillar` className, and wrap each tag in `<span className="pdot" />` + label.
- **Proof cells:** add `bm` to each `.proof-cell`, and `data-count="75|3|83|731|..."` on the four numeric cells that should count up (leave `$150M+`, `15+`, `20+`, `100%` static — mixed units read badly mid-count).

### 4. Assets — placeholder today, real tomorrow
Tiles currently render CSS gradients. Drop-in path: put a still or a short muted `mp4` in `public/work/` and add `<img>` / `<video muted loop playsInline>` as the first child of `.tile` (CSS already absolutely positions and covers it). Existing `/og/og-*.png` will work as stills in the interim.

### 5. Terminal figures
Static, taken from the April 2026 go/no-go milestone (731 / 111 / 16 / RWW ≥ 0.78) — same numbers already published in Proof and Selected Work, so nothing new is being claimed. The `.run-note` dateline currently renders a client-side relative time; **replace with a build-time constant** (e.g. `LAST_RUN` in `lib/site.ts`) so it can't drift into implausibility. Do not present the block as live until a metrics endpoint exists.

## Verify before merge
- **1440px** — mosaic tiles clear of the headline, lede and CTA row; parallax counter-scrolls; hero words rise in ~1.5s; Running now terminal types once on scroll-in; pillars stagger; proof figures land on 75/3/83/731 (never 0).
- **1024px (iPad landscape)** — mosaic hidden, swipe strip present, no tile behind `.hero-meta`.
- **390px** — strip scrolls horizontally without page-level x-overflow; `.plays` single column; hover badges hidden; no block stuck invisible; CTAs full-width-friendly.
- **Reduced motion** — everything visible and static, terminal shows full text immediately.
- **Throttled / background tab** — proof figures show real values, no zeros.
- `npm run build` clean.
