# Strategy to Ship — Publishing Consistency (brand/color/font across every channel)

How to guarantee that **every** Strategy to Ship output — blog posts on `ensolabs.ai/insights`, OG/social
cards, LinkedIn carousels, X cards, newsletter — renders with the **same** locked brand (Ship Coral, Lora,
Inter Tight, JetBrains Mono, the stamp motif). The principle: **one token source, imported everywhere — no
hardcoded hexes or font names in any template.**

---

## 0. Lock the logo FIRST (blocks final assets)
Pick one wordmark — **recommended: Lora + coral arrow `→`** (the repo's locked v1), monogram `S→S`. Until
this is chosen, don't generate final OG/social masters. Everything below assumes it's locked.

## 1. Single source of truth — the token files
Create/confirm these as the ONLY place brand values live:

**`brand/strategy-to-ship/tokens.css`** (for anything rendered as CSS — the site, HTML email):
```css
:root, .theme-sts {
  --sts-paper:#F7F1E6; --sts-paper-2:#EEE5D3; --sts-ink:#1E1813; --sts-ink-deep:#16110B;
  --sts-coral:#F0512E; --sts-coral-light:#FF7A4D; --sts-amber:#E0A23C; --sts-slate:#79705F;
  --sts-line:#DDD2BC; --sts-enso-teal:#5CE0D2;
  --sts-serif:'Lora',Georgia,serif; --sts-sans:'Inter Tight',system-ui,sans-serif;
  --sts-mono:'JetBrains Mono',ui-monospace,monospace;
}
```

**`brand/strategy-to-ship/tokens.ts`** (for anything generated in JS/TS — OG images, social templates):
```ts
export const STS = {
  color: { paper:'#F7F1E6', paper2:'#EEE5D3', ink:'#1E1813', inkDeep:'#16110B',
           coral:'#F0512E', coralLight:'#FF7A4D', amber:'#E0A23C', slate:'#79705F',
           line:'#DDD2BC', ensoTeal:'#5CE0D2' },
  font: { serif:'Lora', sans:'Inter Tight', mono:'JetBrains Mono' },
  rules: { coralMaxCoverage:0.10 }, // coral is a signal, never a fill
} as const;
```
**Rule:** any PR that introduces a raw `#F0512E`/`Lora`/etc. outside these files fails review.

## 2. Fonts — load once, embed for images
- **Site:** load Lora + Inter Tight + JetBrains Mono via `next/font` in `app/layout.tsx`; the `/insights`
  + article surfaces use `.theme-sts` (or the existing `.theme-light`) so headlines = Lora, body = Inter
  Tight, meta = JetBrains Mono, links/accents = `--sts-coral`.
- **OG / social image generation** (Satori/`opengraph-image.tsx` and the Puppeteer `scripts/`): the renderer
  has **no browser fonts** — you must pass the actual font files (Lora/Inter Tight/JetBrains Mono `.ttf`/`.woff`)
  to the image generator, and pull colors from `tokens.ts`. If fonts aren't embedded, OG cards silently fall
  back to a system serif — the #1 cause of off-brand cards.

## 3. Wire each surface to the tokens
| Surface | Where | Pulls from |
|---|---|---|
| Blog posts (`/insights/[slug]`) | `app/insights/[slug]/page.tsx` + `.theme-sts` | `tokens.css` |
| Insights index + cards | `app/insights/page.tsx` | `tokens.css` |
| Per-article OG image | `app/insights/[slug]/opengraph-image.tsx` | `tokens.ts` + embedded fonts |
| Default/section OG | `app/**/opengraph-image.tsx`, `scripts/` (Puppeteer) | `tokens.ts` + fonts |
| LinkedIn carousel / square / X card / story | engine templates (see §4) | `tokens.ts` + fonts |
| Newsletter / Substack header | engine email templates | `tokens.css` (inline-safe) + fonts |

Every template references the **stamp motif** (`SHIPPED`/`v5` coral rubber stamp), the **arrow device**, and
the **release-ledger** mono list from the same brand kit — don't re-draw them per template.

## 4. Cross-repo sync (site ⇄ engine are two repos)
The engine (`strategy-to-ship-engine`) must use the *same* tokens as the site. Pick one mechanism:
- **(A, simplest) Synced file:** keep `tokens.ts`/`tokens.css` canonical in `ensolabs-site/brand/strategy-to-ship/`,
  and add a tiny sync script (or CI step) that copies them into the engine on each brand change. One owner, one source.
- **(B, cleanest long-term) Shared package:** publish `@enso/strategy-to-ship-tokens` (private npm/GitHub
  Packages); both repos `import { STS }`. A version bump propagates the brand everywhere.
- **(C) Runtime fetch:** serve `tokens.json` from `ensolabs.ai/brand/strategy-to-ship/tokens.json`; the engine
  fetches at build time. Good if the engine generates server-side.
Recommend **A now, migrate to B** once cadence picks up.

## 5. Pre-publish checklist (bake into the engine's human-in-the-loop gate)
Before any post/card ships to the site or a channel, confirm:
- [ ] Ground = Paper (light) or Ink Deep (dark); **coral ≤ 10%** of the composition (signal, not fill)
- [ ] Headline = **Lora**; body = Inter Tight; meta/dateline = JetBrains Mono (no system-font fallback)
- [ ] Wordmark = the locked lockup; arrow/monogram coral; `from Enso Labs` endorsement present
- [ ] Enso Teal appears **only** in the endorsement, never as a headline accent
- [ ] Correct aspect ratio per channel (1200×630 OG, 1080×1350 carousel, 1600×900 X, 1200×400 newsletter)
- [ ] Canonical/link points to `ensolabs.ai/insights/<slug>` (not signals.ensolabs.ai)

## 6. Governance
- Keep `brand/strategy-to-ship/style-guide.html` as the living visual reference; review new templates against it.
- Add a CI guard: grep templates for raw brand hex/font literals outside the token files → fail.
- Optional: snapshot-test one rendered OG card per format so an off-brand change is caught in PR.

---

### TL;DR
1) Lock the logo. 2) Put all color/font values in `tokens.css` + `tokens.ts` (one source). 3) Theme
`/insights` with `.theme-sts`; embed the 3 fonts into OG image generation. 4) Sync those tokens into the
engine repo (file-sync now, shared package later). 5) Gate every publish on the §5 checklist. Result: the
blog, OG cards, LinkedIn/X, and newsletter all render the identical Strategy to Ship brand, automatically.
