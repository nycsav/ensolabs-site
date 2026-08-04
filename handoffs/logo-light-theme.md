# Handoff — Logo on light theme (`/insights`)

**Slug:** `logo-light-theme`
**Files:** `public/images/logo-ink.svg` (new), `app/globals.css`, `components/Nav.tsx`, `components/Footer.tsx`
**Reviewed & approved by Sav:** 2026-08-04 — `copy-review/Logo + Nav Review.html` §02
**Merge:** open PR, post the Vercel preview, merge on green. Touches `globals.css` (protected path) but the diff is pre-approved.

## Why
There is no dark variant of the logo. The light theme inverts the white one:

```css
.theme-light .nav-logo,
.theme-light .foot-mark img { filter: invert(1) brightness(0.4); }
```

Inverting `#5CE0D2` produces a maroon-brown, so on every `/insights` page the glyph renders in a colour that is not in the palette. Fix is one asset plus one rule. **The mark itself does not change.**

---

### 1 — Create the ink variant
Copy the existing asset and change only the root fill. Do NOT hand-redraw or re-export it — the per-path teal fills must survive untouched.

```bash
cp public/images/logo-white.svg public/images/logo-ink.svg
# then in logo-ink.svg, on the root <svg> element only:
#   fill="#ffffff"   ->   fill="#1E1813"
```

Verify before committing:
- `grep -c '#5ce0d2' public/images/logo-ink.svg` → **3** (the glyph paths, unchanged)
- `grep -c '#ffffff' public/images/logo-ink.svg` → **0** on the root `<svg>` fill (the `pagecolor="#ffffff"` inside `<sodipodi:namedview>` may remain; it has no render effect)

`#1E1813` is the Ink token from the Strategy to Ship kit, which is what `/insights` is themed with.

### 2 — Swap the filter for the asset
`app/globals.css` — around line 518.

FIND
```
  .theme-light .nav-logo,
  .theme-light .foot-mark img {
    filter: invert(1) brightness(0.4);
  }
```
REPLACE
```
  /* Light theme (/insights) uses the real ink logo — never an inverted white one,
     which turns the #5CE0D2 glyph maroon. Both variants ship in public/images. */
  .theme-light .nav-logo,
  .theme-light .foot-mark img { display: none; }
  .nav-logo-ink,
  .foot-mark img.foot-logo-ink { display: none; }
  .theme-light .nav-logo-ink { display: block; }
  .theme-light .foot-mark img.foot-logo-ink { display: block; }
```

### 3 — Render both variants in the nav
`components/Nav.tsx` — the desktop/primary brand link. There are TWO `<img className="nav-logo" …>` instances (nav bar + mobile menu top). Apply to **both**.

FIND (occurs twice — apply the same change to each)
```
            <img src="/images/logo-white.svg" alt="Enso Labs" className="nav-logo" />
```
REPLACE
```
            <img src="/images/logo-white.svg" alt="Enso Labs" className="nav-logo" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-ink.svg" alt="" aria-hidden="true" className="nav-logo nav-logo-ink" />
```

### 4 — Render both variants in the footer
`components/Footer.tsx`

FIND
```
          <img src="/images/logo-white.svg" alt="Enso Labs" />
```
REPLACE
```
          <img src="/images/logo-white.svg" alt="Enso Labs" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-ink.svg" alt="" aria-hidden="true" className="foot-logo-ink" />
```

---

## Check before merge
- `/` and `/work` (dark): logo unchanged — white wordmark, teal glyph, same size and position.
- `/insights` (light): wordmark near-black `#1E1813`, glyph still teal `#5CE0D2`, **no maroon**.
- Only one logo visible per theme — no doubled or stacked marks at any breakpoint.
- Mobile menu open on `/insights`: correct variant.
- `npx tsc --noEmit` and `npm run build` clean.

## Not touched
The logo artwork, its proportions, `nav-logo` sizing rules, the Strategy to Ship wordmark (`brand/strategy-to-ship/wordmark.svg`), all copy.

## Follow-up, not in this PR
`logo-white.svg` is a raw Inkscape export — 8.5KB of `sodipodi:`/`inkscape:` editor metadata, a `viewBox="35 195 430 110"` offset and `transform="scale(2.5 2.5)"` on every path. Worth a clean re-export (both variants together) when someone is next in the file. Cosmetic only; it renders correctly today.
