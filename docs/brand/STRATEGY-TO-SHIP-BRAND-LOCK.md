# STRATEGY → SHIP — LOCKED BRAND DECISIONS (single source of truth)

**Status: CANONICAL. Recovered from `design_handoff_strategy_to_ship/designs/Brand System.dc.html`
(the comprehensive 7-section locked system) + `Card Colorways.dc.html` + `App Icon.dc.html`.**
If any other file, the live site, or a past chat disagrees with this document, **this document wins** —
fix the other thing. Do not re-derive these from memory or chat history ever again.

> ⚠️ Known drift to correct (these do NOT match the lock and must be fixed):
> - The live site OG generator (`components/OgFrame.tsx` in ensolabs-site) uses **Lora** + a ring circle. WRONG → should be Space Mono + swept ribbon.
> - The `Content Engine.dc.html` (this project) used Lora + a "S→S" coral circle. WRONG → rebuild on the lock.

---

## 1. LOGOTYPE / WORDMARK
- **Face:** **Space Mono, 700**, `letter-spacing: -.035em`.
- **Lockup:** the word **"Strategy"**, then the **coral swept ribbon** (replacing "to"), then **"Ship"**.
- **The ribbon IS the verb** — it is the brand's core device, the "to" between strategy and ship.
- **Small-format fallback:** when the ribbon is too fine to read, use the glyph **▸** (U+25B8):
  `Strategy▸Ship` in Space Mono 700.
- **NOT** Lora. **NOT** a "→" arrow character. **NOT** an "S→S" monogram circle.

### The ribbon SVG (the mark — use verbatim)
```html
<!-- viewBox 0 0 50 32 — fill coral on light, white on coral -->
<svg viewBox="0 0 50 32"><path d="M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z" fill="#F0512E"></path></svg>
```
Wordmark inline example:
```html
<span style="font-family:'Space Mono',monospace;font-weight:700;letter-spacing:-.035em;display:inline-flex;align-items:center;gap:.28em">Strategy<svg viewBox="0 0 50 32" style="height:.6em"><path d="M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z" fill="#F0512E"></path></svg>Ship</span>
```

## 2. APP ICON & FAVICON (the finalist that was locked = the SWEPT RIBBON, "Row A")
- **App icon:** solid **Ship Coral `#F0512E` rounded-square**, corner radius ≈ **23%** (e.g. 29px on a
  124px tile / 15px on 60px), with the **white swept ribbon** centered at ~50% width.
- **Favicon sizes:** 48 / 28 / 16 px — same coral rounded-square + white ribbon; at 16px the ribbon
  simplifies to its silhouette.
- The "dimensional fold / paper-plane" (Row B) was **NOT** chosen.
```html
<!-- app icon / favicon tile -->
<div style="width:124px;height:124px;border-radius:29px;background:#F0512E;display:flex;align-items:center;justify-content:center">
  <svg viewBox="0 0 60 60" style="width:62px"><path d="M15 39 C 26 37 35 32 45 21 C 41 30 41 38 45 45 C 36 41 26 39 15 39 Z" fill="#fff"></path></svg>
</div>
```

## 3. ENDORSEMENT LOCKUP (relationship to the lab)
- Strategy▸Ship **never floats free** of the parent. Pair the wordmark with **FROM ENSO LABS**:
  JetBrains Mono, ~10px, `letter-spacing:.16em`, slate `#79705F`, after a short hairline `#DDD2BC`.
- On the studio (Enso) side the relationship reads "/ STRATEGY-TO-SHIP".

## 4. COLOR (exact hex)
| Token | Hex | Role |
|---|---|---|
| Paper | `#F7F1E6` | primary reading ground |
| Paper-2 | `#EEE5D3` | cards / insets |
| Ink | `#1E1813` | body text |
| Ink-deep | `#16110B` | dark ground / OG cards |
| **Ship Coral** | `#F0512E` | the ONE signal — ribbon, stamps, ≤10% of any composition |
| Ledger Amber | `#E0A23C` | Brand-lens tint |
| Slate | `#79705F` | Financial-lens tint, muted meta |
| Line | `#DDD2BC` | hairlines |
| Enso Teal | `#5CE0D2` | **endorsement only** — never a headline accent |

## 5. TYPOGRAPHY
- **Display / masthead / headlines:** **Space Mono** 700 (`-.03em`). *"A mono voice on a clean frame."*
- **Body / UI:** Inter Tight 400–600.
- **Meta / kickers / dateline:** JetBrains Mono, UPPERCASE, `.12–.16em` tracking.

## 6. THE THREE LENSES (section identities — color + SHAPE token, so they read without spending coral)
| Lens | Tint | Shape token | Use |
|---|---|---|---|
| **Brand** | Ledger Amber `#E0A23C` | ■ square | attribution, creative effectiveness, CMO craft |
| **Financial** | Slate `#79705F` | ● circle | markets, fintech, the Financial-AI pillar |
| **Client** | Ink-deep `#16110B` ground | ◆ diamond | field notes, names withheld ("a Fortune 500 manufacturer") |

## 7. MOTIFS & MOTION (from Media System.dc.html)
- **The ribbon** = the transition device (strategy → ship; draft → live). Coral, own-axis only,
  cubic-bezier(.2,.7,.2,1), 250–400ms, scale 1→1.12→1. No spin/bounce/morph.
- **The stamp** = coral rubber stamp (`SHIPPED`/`LIVE`/`v5`), −4°, ~180ms down-stamp, no glow/neon.
- **The release ledger** = dated mono list of versions.
- **The strategy→ship lane** = dotted track, slate start node → coral ship node.
- All motion resolves to its final frame under `prefers-reduced-motion`.

## 8. VOICE
Practitioner-editorial, advertising-sharp, AI-honest. First-person studio "we." Show the receipt (a
number/system/shipped artifact). Name the human-in-the-loop. Close with **Powered by Enso Labs**.

## 9. ART DIRECTION
Warm grade, deep contrast, paper-toned highlights; real practitioners in real rooms; decisive off-center
crops; type-over-image welcome. **Never:** stock "AI", glowing brains, robots, neural-net clipart, fake
futuristic gradients.

---

## Where this must live (so it never gets lost again)
1. **This file** stays in the project root.
2. Copy into the **Strategy to Ship Design System** project as `readme.md` foundations + the SKILL.md.
3. Commit into **`ensolabs-site/docs/brand/`** so it's in GitHub with the code.
4. Fix the drift: rebuild `Content Engine.dc.html` on this lock; update live `OgFrame.tsx` to
   Space Mono + swept ribbon.

## The ONE thing to confirm (live-site implication)
The locked Brand System says **Space Mono** for headlines, but the **live website currently renders the
publication in Lora**. Two readings: (a) Space Mono is canonical and the site drifted — fix the site; or
(b) Lora was a deliberate later choice for on-site reading. **Confirm which**, and I'll align everything
to one answer. Everything else above is unambiguous and locked.
