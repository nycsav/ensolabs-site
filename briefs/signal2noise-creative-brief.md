# Creative Brief: signal2noise Visual Identity System
## For Claude Design Session

**Prepared by:** Claude (CCO / Editorial Director, Enso Labs)
**Date:** May 14, 2026
**Client:** Enso Labs / signal2noise
**Objective:** Create signal2noise's visual identity as a sibling brand to Enso Labs — its own personality, unmistakably part of the family.

---

## 1. What We're Building

A **complete visual identity system** for signal2noise — Enso Labs' intelligence and editorial engine. This is not a logo project or a color palette exercise. It's a design system that will drive automated content creation across every surface: OG images, LinkedIn posts, Substack newsletters, video thumbnails, interactive web artifacts, and formats we haven't invented yet.

The output must be **code-backed** — React components, CSS tokens, SVG templates, and Python generators that any future content automatically inherits. No one-off files. No manual design work per piece. The system produces the content.

---

## 2. The Brand Relationship

### The Pattern We're Following

The best AI companies maintain distinct sibling identities under a parent brand:

**Anthropic → Claude**
- Anthropic.com: warm, editorial, research-oriented. Muted palette, Styrene + Tiempos typography, modular layouts. The company voice.
- Claude: its own product identity — different energy, different color accent (orange vs Anthropic's neutral), different personality. But the typographic precision, the whitespace philosophy, the "simple thing that works" ethos carry through.
- Designed by Geist agency over 2.5 years. The identity captures "human-centered mission + technical craft" simultaneously.

**Perplexity → Perplexity Hub/Research**
- Product: clean, functional, "Scandinavian subway system" — invisible design that doesn't call attention to itself. FK Grotesk, calming blues + vibrant greens.
- Hub/Blog: editorial voice, more expressive, aspirational. "Non-dystopian future" energy. Inspiration from vintage Apple ads — grit and texture.
- Created by Smith & Diction. The brand actively rejects "cold, hyper-minimalist" AI tropes.

**Google → Gemini → AI Studio → Vertex**
- Google: parent brand DNA (the four colors, the geometric simplicity)
- Gemini: its own identity (four-color gradient, particle system with ambient/active states, the "spark" mark). Designed by Strohl Inc + Antinomy + DeepMind teams.
- AI Studio / Vertex: functional variants that share Gemini's visual language but serve different audiences (developers vs enterprise). Recently consolidated under "Gemini Enterprise Agent Platform."
- Key insight: the Gemini spark "fits naturally into Google's existing AI visual language" while being distinctly its own thing.

### What This Means for Us

**Enso Labs** is the parent: dark navy (#0D1321), electric teal (#5CE0D2), Inter Tight + JetBrains Mono. Structural, authoritative, production-grade. "We ship systems."

**signal2noise** is the sibling: it needs to feel like the **morning briefing that makes sense of the overnight data**. Warm, forward-leaning, analytical, alive. It should feel like opening a window after being in a command center. Same family, different personality.

The existing site already has this baked in — the `theme-light` CSS class flips the entire variable system on `/insights` pages. Claude Design built this dual-register architecture. We're extending it into a full identity.

---

## 3. What signal2noise IS

**Not a blog.** It's the intelligence engine and distribution layer for Enso Labs.

- **Brain:** Generates daily intelligence signals about AI, agentic systems, financial AI — the topics Enso Labs consults on
- **Distribution:** Content flows to ensolabs.ai/insights, LinkedIn (Mon/Wed/Fri), Substack, and future channels
- **Storytelling:** Every piece of content demonstrates thought leadership and ties back to Enso Labs services
- **Automated:** Content creation is programmatic — the design system must support generation, not manual creation

### Content Types

1. **Essays** — 6-10 min reads, deep analysis (current Insights articles)
2. **Signal Cards** — Daily intelligence hits, 1-2 paragraph signals
3. **LinkedIn Posts** — Text + visual card, thought leadership
4. **Newsletter Headers** — Substack distribution
5. **Video Thumbnails** — Short and long form (future)
6. **Interactive Artifacts** — Data visualizations, explorers (future)
7. **Social Cards** — Open Graph images for link sharing

### Editorial Voice

- "Here's what we're seeing" (not "here's what you should do")
- Analytical but warm — like a brilliant colleague sharing their morning read
- Confident without being prescriptive
- Always ties back to Enso Labs' areas of practice: AI transformation, agentic systems, financial AI

---

## 4. Design Requirements

### Must Have

- **Sibling, not child:** signal2noise should have its own visual personality — not a recolor of Enso Labs
- **Code-backed:** Every design element must be reproducible programmatically (SVG, React, CSS tokens)
- **Multi-surface:** Templates must work at OG image size (1200×630), LinkedIn card, mobile thumbnail, newsletter header, video thumbnail
- **Automated:** A Python/Node script should be able to generate any content asset from structured input (title, type, pillar, date)
- **Consistent:** Every piece of content produced by the system should be immediately recognizable as signal2noise without reading the text

### Design Constraints (from existing Enso Labs system)

- **Typography:** Inter Tight (display) + JetBrains Mono (mono/labels) — shared DNA, non-negotiable
- **Spatial system:** Same grid, padding, and spatial hierarchy as ensolabs.ai
- **Quality bar:** Every output must look "meticulously crafted, labored over with care by someone at the absolute top of their field — never generated, never templated, always designed" (from our design philosophy)
- **No literal iconography:** Abstract topological forms, not clipart. Meaning encoded through pattern, not illustration.

### Creative Freedom

- **Color palette:** signal2noise needs its own palette. The current site uses warm cream (#FAF6F0) ground + amber (#D4944C) accent on insights pages — this is a starting point, not a constraint. Claude Design should explore what feels right.
- **Visual forms:** The "Systematic Resonance" philosophy calls for concentric interference patterns, flowing contour lines, node-edge diagrams. But signal2noise might need its own visual vocabulary that's warmer, more organic, more "alive" than the structural forms on the main site.
- **Layout archetypes:** The main site has 5 archetypes (Topological Field, Split Tension, Signal Card, Data Rhythm, Contour Study). signal2noise may need its own set — or a warm-register adaptation of these.
- **Energy:** The main site feels like mission control at midnight. signal2noise should feel like the morning briefing. Explore what that means visually.

---

## 5. Existing Foundation

### What Claude Design Already Built (do not break this)

```css
/* The theme-light system — already live on /insights */
.theme-light {
  --bg:        #f8f6f0;        /* warm cream */
  --bg-2:      #f1ede2;        /* card */
  --bg-3:      #e8e2d2;        /* hover */
  --line:      oklch(0.86 0.012 80);
  --fg:        oklch(0.22 0.020 80);  /* deep charcoal */
  --fg-2:      oklch(0.40 0.014 80);
  --fg-3:      oklch(0.55 0.012 80);
  --teal:      oklch(0.50 0.13 195);  /* darker teal for cream contrast */
  --amber:     oklch(0.62 0.14 60);
}
```

### Component DNA Already Established
- `.s2n-card` — signal2noise cards on home + insights
- `.s2n-banner` — the signal2noise CTA banner
- `.s2n-meta` — signal card metadata (kind, date, source)
- `.insight-card` — article cards with OG image, pillar badge, meta
- `.insight-card-og` — 1200/630 aspect ratio image thumbnails

### Brand Assets
- Enso Labs logo: `/public/images/logo-white.svg` (teal chevron + white wordmark)
- signal2noise needs its own mark/lockup that works alongside this

---

## 6. Deliverables Expected from Claude Design

1. **signal2noise Visual Identity**
   - Color palette (primary, secondary, accent, semantic colors)
   - Relationship to Enso Labs palette (where they share, where they diverge)
   - Typography rules (how the shared fonts are used differently)
   - signal2noise mark/wordmark/lockup

2. **Template System (code-backed)**
   - OG Image template (1200×630) — with variants per content type
   - LinkedIn card template
   - Newsletter header template
   - Signal card template (for daily intelligence)
   - Article hero template
   - Video thumbnail template

3. **Component Library**
   - CSS token definitions (extending the existing globals.css)
   - React/SVG components for programmatic generation
   - Layout grid and spacing rules

4. **Visual Language**
   - Abstract form vocabulary for signal2noise (what replaces the structural topology of the main site?)
   - Pillar visual treatments (Consult, Build, Ship — how do these map in the warm register?)
   - Grain, texture, and atmospheric effects (the "labored over" quality)

5. **Generation Pipeline Spec**
   - How a Python/Node script consumes (title, type, pillar, date) and produces finished assets
   - Template selection logic per content type + distribution channel
   - Quality checks and constraints the generator must enforce

---

## 7. Inspiration References

### Direct Competitors / Comparables
- **Anthropic News** (anthropic.com/news) — editorial warmth, muted palette, modular layouts
- **Perplexity Hub** (perplexity.ai/hub) — "non-dystopian future," grit and texture, vintage Apple energy
- **Google Gemini** — particle system, four-color gradient, ambient/active states

### Mood
- Morning light, not midnight command center
- A well-edited magazine, not a dashboard
- The feeling of a perfectly organized desk with one surprising object on it
- Warm amber, not cool blue — but never kitschy or rustic
- Precision with personality

### What to Avoid
- "AI company blue" — generic tech palette
- Dark/clinical/terminal aesthetic (that's Enso Labs' register, not signal2noise's)
- Literal illustrations (no robot heads, no circuit boards, no clipart neural networks)
- Flat template energy — every piece should feel crafted even when generated
- Looking like a recolor of the parent brand

---

## 8. Success Criteria

The design system is successful when:

1. A new article added to `lib/insights.ts` automatically gets a complete set of distribution assets (OG image, LinkedIn card, newsletter header) without any manual design intervention
2. Every asset produced is immediately recognizable as signal2noise without reading the text
3. signal2noise assets placed next to Enso Labs assets feel like siblings — related but distinct
4. The system scales to new content types and distribution channels without redesign
5. A designer looking at the output would believe it was hand-crafted by a senior visual designer, not generated by a script
