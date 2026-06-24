# Strategy to Ship — Brand & Design Documentation

*The publishing brand of Enso Labs. Warm, editorial, human — endorsed by, but visually distinct from,
the Enso Labs studio brand. This consolidates the design schemes created across the design sessions and
reconciles them with the v1 brief already in the repo (`strategy-to-ship-design-system.md`).*

---

## 1. Brand architecture (how it relates to Enso Labs)

| | Enso Labs (studio) | Strategy to Ship (publication) |
|---|---|---|
| Role | AI transformation studio | Media / publishing engine |
| Feeling | Cool, structural, mission-control | Warm, editorial, human |
| Ground | Deep navy/charcoal | Warm paper / ink |
| Type | Inter Tight + JetBrains Mono | Editorial serif + Inter Tight + JetBrains Mono |
| Shared thread | **Ship Coral `#F0512E`** | **Ship Coral `#F0512E`** |
| Link cue | — | `from Enso Labs` endorsement + Enso Teal, used sparingly |

**Rule:** Ship Coral is the one element that crosses both brands. Teal belongs to Enso; warm paper +
serif belong to the publication. Never mix the Enso chevron and the Strategy to Ship mark in one lockup.

---

## 2. Color

### Strategy to Ship — the publication (warm world)
| Token | Hex | Role |
|---|---|---|
| Paper | `#F7F1E6` | Primary reading ground (warm newsprint) |
| Paper 2 | `#EEE5D3` | Cards, insets, table fills |
| Ink | `#1E1813` | Body text; dark card/OG ground |
| Ink Deep | `#16110B` | Deepest ground for social / OG cards |
| **Ship Coral** | `#F0512E` | **Signature signal** — arrow/ribbon, stamps, pull-quotes, CTAs, "today". ~5–10% max |
| Coral Light | `#FF7A4D` | Coral on dark grounds (optical lift) |
| Ledger Amber | `#E0A23C` | Secondary warm accent |
| Slate | `#79705F` | Muted metadata, secondary text |
| Line | `#DDD2BC` | Hairlines, dividers |
| Enso Teal | `#5CE0D2` | Parent-brand link ONLY (`from Enso Labs`) |

### Enso Labs — the studio (cool world; for cross-reference, from `app/globals.css`)
| Token | Value | Role |
|---|---|---|
| `--bg` | `oklch(0.18 0.015 250)` | Navy-charcoal ground |
| `--fg` | `oklch(0.96 0.005 80)` | Warm off-white text |
| `--teal` | `oklch(0.82 0.13 195)` | Electric teal (primary accent) |
| `--amber` | `oklch(0.82 0.13 70)` | Warm amber |
| **Ship Coral** | `#F0512E` | The shared signal (hero "Ship.", CTAs, stamps) |
| **Steel blue** | `oklch(0.52 0.09 250)` | The design-pass punctuation (CTA band, one proof block) |

### The "red + blue" accent system added to the Enso site this pass
- **Coral `#F0512E`** — hero "Ship." / "ship?", one featured card per page, SHIPPED stamps, one proof block.
- **Steel blue `oklch(0.52 0.09 250)`** — the closing CTA band, one proof block, the principal/anchor block.
- **Amber `oklch(0.72 0.15 65)`** — third lens, one pillar + one proof block.
- Discipline: navy stays the ground; **color is punctuation — roughly one color zone per section.**

### Lens grounds (saturated card backgrounds — the "R/GA" treatment)
| Ground | Value | Lens |
|---|---|---|
| Coral | `#F0512E` / `oklch(0.64 0.19 33)` | Client / Ship |
| Steel blue | `oklch(0.52 0.09 250)` | Financial / Signal |
| Amber | `oklch(0.72 0.15 65)` | Brand |
| Clay rose | `#C16A5B` | Brand (alt) |
On any bold ground: **white type** (ink-on-amber), hairlines at `rgba(255,255,255,.25)`.

---

## 3. Typography

| Role | Strategy to Ship | Enso Labs |
|---|---|---|
| Display / headlines | **Editorial serif** (see divergence below) | Inter Tight 500 |
| Body / UI | Inter Tight 400–500 | Inter Tight 400–500 |
| Metadata / signal | JetBrains Mono, UPPERCASE, ~.12em tracking | JetBrains Mono |

**The signature contrast:** tiny mono kicker → large serif/display headline → Inter Tight body. The
jump from machine annotation to human headline is the brand's tension.

---

## 4. Logotype — ⚠ resolve this divergence first

Two directions exist. **Pick one before generating final assets.**

**A. Repo v1 (recommended — already in production):**
`Strategy → Ship` set in **Lora** (serif, 500–700), the word *to* replaced by a **coral arrow `→`**.
The arrow is the only colored element. Monogram `S→S`. Endorsement: wordmark · hairline · `FROM ENSO LABS`.

**B. This project's earlier handoff:**
`Strategy ▸ Ship` set in **Space Mono** 700, the *to* replaced by a **coral swept-ribbon glyph**
(SVG path, viewBox `0 0 50 32`): `M6 23 C 18 21 28 14 38 4 C 35 15 36 23 39 28 C 29 24 17 23 6 23 Z`.

**Recommendation:** go with **A (Lora + arrow)** — it's the locked v1 in the repo and matches the
warm-editorial feel better than a mono wordmark. Keep B's ribbon only if you want a more graphic mark;
don't ship both.

---

## 5. Motifs & devices
- **The arrow / vector** — `strategy → ship` is the brand's hinge; the recurring device between states
  (draft → live, signal → story).
- **The stamp** — a slightly-rotated coral rubber stamp: `SHIPPED`, `IN PRODUCTION`, `v5`. The most
  ownable advertising device (human craft meeting machine output). Implemented on the Enso site this
  pass as `.shipped-stamp` (coral outline + coral dot).
- **The release ledger** — a dated, mono list (engine made visible).
- **The three lenses** — Brand (amber) · Financial (slate-blue) · Client (ink) — each piece files under one.

## 6. Voice
Practitioner editorial, advertising-sharp, AI-honest. Plain over clever. Earn the headline. Show the
receipt (no claim without a number/system/shipped artifact). First-person studio "we." Always name the
human-in-the-loop and close with **Powered by Enso Labs**.

---

## 7. Positioning copy (approved — "Version A")
> Enso Labs is an applied-AI studio for **advertising, marketing, and media**. We turn strategy into
> production systems — services delivered as AI products — for companies and agencies across
> **healthcare, finance, B2B tech, and consumer**.

Two axes: **disciplines** (advertising · marketing · media) × **sectors** (healthcare · finance ·
B2B tech · consumer). Mono tag: `↳ strategic services, shipped as AI products`.

---

## 8. Source-of-truth files in the repo
- `strategy-to-ship-design-system.md` — the v1 brief (canonical).
- `brand/strategy-to-ship/tokens.css` — tokens in code.
- `brand/strategy-to-ship/style-guide.html` — living visual guide.
- `brand/strategy-to-ship/wordmark.svg` — the logotype.
- `app/globals.css` `.theme-light` — the warm theme the publication renders in on-site.
