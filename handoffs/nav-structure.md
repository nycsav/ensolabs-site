# Handoff — Nav structure (desktop + mobile)

**Slug:** `nav-structure`
**Files:** `components/Nav.tsx`, `app/globals.css`
**Reviewed & approved by Sav:** 2026-08-04 — `copy-review/Logo + Nav Review.html` §04 (proposed bar as drawn)
**Merge:** open PR, post the Vercel preview, merge on green. Touches `globals.css` (protected path) but the diff is pre-approved.

## Why
The header carries 10 targets beside the logo: "Home" repeats the logo, "Contact" repeats the CTA, and three social icons duplicate the footer. Separately, five live pages — three `/services/*` children and both `/industries/*` — have no route in from any menu, so a visitor who lands on one from search cannot move sideways into the rest of the offer.

Result: 4 links + 1 CTA on desktop, and every one of those five buried pages gets a route — **on desktop via a flyout, on mobile via a nested list.** Child pages keep their current names (Sav's call).

## Responsive contract
`globals.css` already hides `.nav-links` and the lockup tagline below the mobile breakpoint (lines ~1128–1136), so the flyout is desktop-only by construction. The mobile menu must therefore carry the same six destinations itself — that is edit 5, and it is not optional. **Every link added on desktop must be reachable on mobile.**

---

### 1 — Link arrays
`components/Nav.tsx`

FIND
```
const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;
```
REPLACE
```
// Desktop bar: the logo is the home link and the CTA is the contact link, so
// neither gets a duplicate slot. Socials live in the footer only.
const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/insights', label: 'Insights' },
  { href: '/about', label: 'About' },
] as const;

// Mobile menu has no CTA row competing for the tap, so Contact is a listed item.
const MOBILE_LINKS = [...LINKS, { href: '/contact', label: 'Contact' }] as const;

// Pages that exist, rank, and otherwise have no route in from any menu.
const SERVICE_CHILDREN = [
  { href: '/services', label: 'All services' },
  { href: '/services/agentic-ai-consulting', label: 'Agentic AI Consulting' },
  { href: '/services/claude-managed-services', label: 'Claude Managed Services' },
  { href: '/services/ai-growth-marketing', label: 'AI Growth Marketing' },
] as const;

const INDUSTRY_CHILDREN = [
  { href: '/industries/financial-services', label: 'Financial Services' },
  { href: '/industries/healthcare', label: 'Healthcare' },
] as const;
```

### 2 — Lockup
FIND
```
            <span>/ STRATEGY-TO-SHIP</span>
```
REPLACE
```
            <span>/ AI CONSULTING · NYC</span>
```

### 3 — Desktop links + flyout, socials removed
FIND
```
          <div className="nav-links" role="navigation" aria-label="Primary">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={isActive(l.href) ? 'is-active' : ''}
              >
                {l.label}
              </Link>
            ))}
            <SocialLinks className="nav-social" />
```
REPLACE
```
          <div className="nav-links" role="navigation" aria-label="Primary">
            {LINKS.map((l) =>
              l.href === '/services' ? (
                <span className="nav-item" key={l.href}>
                  <Link href={l.href} className={isActive(l.href) ? 'is-active' : ''}>
                    {l.label}
                  </Link>
                  <span className="nav-flyout">
                    <span className="nav-flyout-card">
                      <span className="nav-flyout-col">
                        <span className="nav-flyout-h">Services</span>
                        {SERVICE_CHILDREN.map((c) => (
                          <Link key={c.href} href={c.href}>{c.label}</Link>
                        ))}
                      </span>
                      <span className="nav-flyout-col">
                        <span className="nav-flyout-h">Industries</span>
                        {INDUSTRY_CHILDREN.map((c) => (
                          <Link key={c.href} href={c.href}>{c.label}</Link>
                        ))}
                      </span>
                    </span>
                  </span>
                </span>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className={isActive(l.href) ? 'is-active' : ''}
                >
                  {l.label}
                </Link>
              )
            )}
```
(`SocialLinks` stays defined and is still used by the mobile menu — do not delete the component.)

### 4 — Flyout CSS
`app/globals.css` — append to the nav block, after the `.nav-links a.is-active::before` rule.

```
  /* Services flyout — desktop only; .nav-links is display:none at the mobile
     breakpoint, so the mobile menu carries these links instead (see Nav.tsx). */
  .nav-item { position: relative; display: inline-flex; align-items: center; }
  .nav-flyout {
    position: absolute; top: 100%; left: -18px;
    padding-top: 16px; /* hover bridge — no gap to fall through */
    opacity: 0; visibility: hidden; transform: translateY(-4px);
    transition: opacity .18s ease, transform .18s ease, visibility .18s;
    z-index: 60;
  }
  .nav-item:hover .nav-flyout,
  .nav-item:focus-within .nav-flyout { opacity: 1; visibility: visible; transform: none; }
  .nav-flyout-card {
    display: grid; grid-template-columns: 1fr 1fr; gap: 28px;
    min-width: 440px; padding: 20px 22px;
    background: var(--bg-2); border: 1px solid var(--line); border-radius: 10px;
    box-shadow: 0 24px 48px -20px rgb(0 0 0 / 55%);
  }
  .nav-flyout-col { display: grid; gap: 9px; align-content: start; }
  .nav-flyout-h {
    font-family: var(--mono); font-size: 10px; letter-spacing: 0.09em;
    text-transform: uppercase; color: var(--fg-3); margin-bottom: 3px;
  }
  .nav-flyout-col a { font-size: 14px; color: var(--fg-2); }
  .nav-flyout-col a:hover { color: var(--fg); }
  .nav-flyout-col a:first-of-type { color: var(--fg); font-weight: 500; }
```

### 5 — Mobile menu: same destinations, plus the children
Not optional — the flyout does not exist below the breakpoint.

FIND
```
          <ul className="mobile-menu-links">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={isActive(l.href) ? 'is-active' : ''}
                  onClick={() => setOpen(false)}
                >
                  <span className="mobile-menu-num">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
```
REPLACE
```
          <ul className="mobile-menu-links">
            {MOBILE_LINKS.map((l, i) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={isActive(l.href) ? 'is-active' : ''}
                  onClick={() => setOpen(false)}
                >
                  <span className="mobile-menu-num">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </Link>
                {l.href === '/services' && (
                  <ul className="mobile-menu-sub">
                    {[...SERVICE_CHILDREN.slice(1), ...INDUSTRY_CHILDREN].map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} onClick={() => setOpen(false)}>{c.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
```

### 6 — Mobile sub-list CSS
`app/globals.css` — append near the existing `.mobile-menu-links` rules.

```
  .mobile-menu-sub {
    list-style: none; display: grid; gap: 2px;
    margin: 6px 0 14px 34px; padding-left: 14px;
    border-left: 1px solid var(--line);
  }
  .mobile-menu-sub a {
    display: block; padding: 9px 0;
    font-family: var(--mono); font-size: 12.5px; letter-spacing: 0.02em;
    color: var(--fg-2);
  }
  .mobile-menu-sub a:hover, .mobile-menu-sub a:active { color: var(--teal); }
```
Tap targets: 9px padding on a 12.5px mono line gives ~40px rows inside a menu that is already scrollable — if the computed row height comes in under 44px, raise the padding to 12px rather than shrinking the type.

---

## Check before merge — desktop AND mobile, every page
Desktop (≥1280px):
- Bar reads: logo · / AI CONSULTING · NYC ‖ Services · Work · Insights · About · [Get in Touch]. No social icons, no Home, no Contact link.
- Hovering Services opens the flyout; moving the cursor from the label into the panel does not close it; all six links navigate.
- Keyboard: Tab to Services reveals the panel (`:focus-within`) and the children are reachable in order.
- Flyout is not clipped by the nav's own `overflow` or `backdrop-filter` at any width, and sits above the hero.

Mobile (390px and 768px):
- Burger opens; list reads Services / Work / Insights / About / Contact, numbered 01–05.
- The six child links appear indented under Services and each one navigates and closes the menu.
- Lockup tagline stays hidden (existing rule) — logo only.
- Nothing overflows horizontally; the menu scrolls if the list exceeds the viewport.

Both:
- `/insights` light theme: flyout card is legible against paper (it inherits `--bg-2`, which is themed) — if it renders dark-on-light, report it rather than patching the token.
- `npx tsc --noEmit` and `npm run build` clean.

## Not touched
All copy on every page, the logo asset, footer structure, `/nytw*` and `/utm` indexing, the three `/services/*` page names and their content, `SocialLinks` in the mobile menu and footer.
