# Strategy to Ship — Media & Creative Brand Kickoff

> **What this is.** A paste-in kickoff for a *dedicated* Claude Design session that builds **Strategy to Ship** into a full **media & creative powerhouse** — its own publication identity, motion language, editorial art direction, and a paid/owned/earned template library — extending (never replacing) the locked "Warm Signal" kit.
>
> **How this differs from `STRATEGY_TO_SHIP_DESIGN_KICKOFF.md`.** That kickoff is the *day-to-day asset loader* (one OG, one carousel, one header on demand). **This one is the system build**: it briefs Claude Design to design the *whole media brand* — masthead, section identities, motion, art direction, and a complete channel template kit — as a coherent deliverable set, then hand it back as reusable components and tokens.
>
> **Run it in its own session.** See "How to run this" at the end.

---

## Source files — read / attach these

All locked source-of-truth files live in the **public** repo (`github.com/nycsav/ensolabs-site`, branch `master`), so you can attach them in Claude Design **or** hand it these links to read directly. Call and refer back to any of them by name:

| # | File | What it is | Links |
|---|------|-----------|-------|
| 1 | `strategy-to-ship-design-system.md` | "Warm Signal" brief + principles | [view](https://github.com/nycsav/ensolabs-site/blob/master/strategy-to-ship-design-system.md) · [raw](https://raw.githubusercontent.com/nycsav/ensolabs-site/master/strategy-to-ship-design-system.md) |
| 2 | `brand/strategy-to-ship/tokens.css` | Color / type / spacing tokens (`.theme-sts` / `.theme-sts-dark`) | [view](https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/tokens.css) · [raw](https://raw.githubusercontent.com/nycsav/ensolabs-site/master/brand/strategy-to-ship/tokens.css) |
| 3 | `brand/strategy-to-ship/style-guide.html` | Living visual guideline (§08 formats, §09 per-platform) | [view](https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/style-guide.html) · [raw](https://raw.githubusercontent.com/nycsav/ensolabs-site/master/brand/strategy-to-ship/style-guide.html) |
| 4 | `brand/strategy-to-ship/wordmark.svg` | Wordmark — the coral → logotype | [view](https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/wordmark.svg) · [raw](https://raw.githubusercontent.com/nycsav/ensolabs-site/master/brand/strategy-to-ship/wordmark.svg) |
| 5 | `brand/strategy-to-ship/og-dark.png` | OG reference — dark | [view](https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/og-dark.png) |
| 6 | `brand/strategy-to-ship/og-light.png` | OG reference — light | [view](https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/og-light.png) |

Companion prompt (optional): [`STRATEGY_TO_SHIP_DESIGN_KICKOFF.md`](https://github.com/nycsav/ensolabs-site/blob/master/STRATEGY_TO_SHIP_DESIGN_KICKOFF.md) — the day-to-day asset loader.

> **Note:** links resolve only while the repo stays public and the files stay on `master`. If you move the repo private, attach the files instead.

---

## The paste-in prompt

Everything inside the fenced block below is the prompt. Open a fresh Claude Design session, attach the four locked brand files (listed under "Brand inputs"), paste the block, and go.

```
# CONTEXT

You are designing the full MEDIA & CREATIVE brand system for STRATEGY TO SHIP — the
news-intelligence and publishing powerhouse of Enso Labs. It publishes natively at
ensolabs.ai/insights (the "Live Intelligence" section + long-form essays). It is the
product rebranded June 2026; the old name and the standalone domain
signals.ensolabs.ai are DEPRECATED and RETIRED — never reference, link, or redeploy them.
The brand was renamed and locked in June 2026 (the "Warm Signal" system). Your job is to
EXTEND that locked kit into a complete media-brand system, not to reinvent it.

Strategy to Ship is a SEPARATE-BUT-RELATED brand from Enso Labs the studio:
  • Enso Labs (studio) = cool, structural, mission-control. Navy #0D1321 + electric
    teal #5CE0D2, Inter Tight. Design philosophy: "Systematic Resonance."
  • Strategy to Ship (publication) = warm, editorial, human. Paper + ink + one coral
    signal, Lora serif. Design philosophy: "Warm Signal — the morning the work ships."
They are family; they are NOT the same brand. Enso endorses; Strategy to Ship publishes.

Positioning: "Where strategy becomes production — the field notes of a studio that ships."
A practitioner media brand at the intersection of MEDIA × ADVERTISING × AI. Modern,
but human: the page is human (warm paper, editorial serif, a byline, a real photograph);
the engine is modern (mono metadata, a crisp coral signal, a sourced confidence note).
The AI shows up as SIGNAL, never spectacle — never a glowing brain, never a robot.

# OBJECTIVE

Design a complete, reusable MEDIA & CREATIVE brand system that lets Strategy to Ship
operate as a real publication across PAID, OWNED, and EARNED channels — with one DNA at
every aspect ratio, from a 1080 feed square to a full-bleed cover. Deliver it as a system
(masthead + section identities + motion + art direction + a channel template library +
a social profile kit + a component/token handoff), not as one-off assets.

# BRAND INPUTS (READ FIRST — these are LOCKED; do not redesign the core)

These source files are the truth — READ ALL before designing. They are attached to this
session; if any is missing, FETCH it from the raw link (public repo
github.com/nycsav/ensolabs-site, branch master):
  1. strategy-to-ship-design-system.md — the "Warm Signal" brief + principles
     https://raw.githubusercontent.com/nycsav/ensolabs-site/master/strategy-to-ship-design-system.md
  2. brand/strategy-to-ship/tokens.css — color, type, spacing tokens (.theme-sts / .theme-sts-dark)
     https://raw.githubusercontent.com/nycsav/ensolabs-site/master/brand/strategy-to-ship/tokens.css
  3. brand/strategy-to-ship/style-guide.html — living visual guideline (§08 formats, §09 per-platform)
     https://raw.githubusercontent.com/nycsav/ensolabs-site/master/brand/strategy-to-ship/style-guide.html
  4. brand/strategy-to-ship/wordmark.svg (+ og-dark.png, og-light.png) — reference assets
     https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/wordmark.svg
     https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/og-dark.png
     https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/og-light.png

LOCKED BRAND FACTS (carry these in exactly — do NOT contradict):
  • Palette: Paper #F7F1E6 · Paper-2 #EEE5D3 · Ink #1E1813 · Ink-Deep #16110B (dark
    cards/OG) · Ship Coral #F0512E · Ledger Amber #E0A23C · Slate #79705F · Line #DDD2BC.
    Enso Teal #5CE0D2 ONLY for the "from Enso Labs" endorsement link — never a headline accent.
  • Ship Coral is THE signal, not a fill: ~5–10% of any composition MAX (the arrow, a
    stamp, one highlighted word, a CTA). Never tint a large field coral.
  • Type: Lora (serif headlines — human/editorial, 500–700, leading 1.05–1.15) ·
    Inter Tight (body/UI, 400–500) · JetBrains Mono (kickers, datelines, version tags,
    confidence notes — the machine signal; 11–14px, uppercase, letter-spaced ~0.08em).
  • The glyph is the arrow → ("strategy TO ship"). The arrow is ALWAYS Ship Coral and is
    NEVER recolored, glowed, or animated into anything but an arrow. It is the logotype's
    hinge and the recurring device between states (strategy → ship, draft → live, signal → story).
  • Wordmark "Strategy → Ship" (Lora). Monogram "S→S". Lowercase handle "strategy → ship"
    allowed for social handles/URLs only.
  • Endorsement: "Powered by Enso Labs" appears on ALL Strategy to Ship content. The
    endorsement lockup is wordmark + hairline + mono "FROM ENSO LABS".
  • Voice: practitioner-editorial, advertising-sharp, AI-honest. Studio "we", never "I".
    Plain-English ("AI model", not "frontier model"). NO emojis. NO hype words
    (revolutionary, game-changing, paradigm shift, transformative). Name the human-in-the-loop.
  • Signature device: the inked coral rubber-STAMP (SHIPPED · IN PRODUCTION · LIVE · v5),
    rotated ~−4°, slightly distressed — human craft meeting machine output. Most ownable mark.
  • Layout signature: mono kicker (tiny) → Lora headline (large, the art) → Inter Tight
    body. The jump from tiny mono to large serif is the brand's contrast signature.
  • Editorial, NOT an ad: lead with the headline/idea, not a logo lockup or a value-prop tagline.

# DELIVERABLES

Produce each as on-brand visual mockups (canvas/HTML→PNG or Claude Design frames), grouped
into the six workstreams below. Show real example content (use plausible Strategy to Ship
headlines and stats), not lorem ipsum. Label every artifact with its name + exact pixel size.

## A. PUBLICATION IDENTITY (the masthead system)
  A1. Masthead lockups — primary horizontal masthead, stacked/compact masthead, and a
      one-line "ear" masthead for narrow headers. Each with the endorsement lockup variant.
  A2. Monogram set — S→S as avatar, favicon (16/32/180px), and stamp. Prove legibility at
      32px and as a 1px-edge favicon.
  A3. SECTION IDENTITIES for the three lenses (the publication's standing sections). Each
      lens gets: a section name treatment, a section kicker (mono), and a single muted
      accent tint drawn ONLY from the locked palette (coral stays reserved as the signal):
        • BRAND lens     — brand equity, attribution, creative effectiveness, CMO craft.
        • FINANCIAL lens — markets, fintech, financial AI, the studio's Financial AI pillar.
        • CLIENT lens    — field notes from real engagements (confidential clients stay
          unnamed; e.g., "a Fortune 500 manufacturer", never the actual company).
      Show how a section identity reads on a cover, an OG card, and an article header — so a
      reader can tell the lens at a glance WITHOUT breaking the one-coral-signal rule.
  A4. Issue/version system — masthead + issue number treatment ("THE SHIP LOG · № 12",
      "v—", datelines) in JetBrains Mono, for newsletters and recurring formats.

## B. MOTION & ANIMATION GUIDANCE (how the → behaves)
  Deliver as annotated frame-by-frame storyboards + plain-English timing notes (Claude
  Design can't export video; specify it so an animator/After Effects/Lottie/CSS dev can build it):
  B1. The signature arrow transition — the → as the connective motion between two states
      (strategy → ship, draft → LIVE, signal → story). Define: ease, duration (keep it
      crisp, ~250–400ms), and the rule that the arrow only ever travels along its own axis
      and stays coral. No bounce, no spin, no morph into other shapes.
  B2. The stamp "ink" — how SHIPPED / LIVE / v5 stamps land (a quick down-stamp with a
      slight settle and a touch of ink texture, ~−4° rotation). Specify the "do-not": no
      glow, no pulse, no neon.
  B3. Logo reveal — a restrained wordmark build where "Strategy" and "Ship" settle and the
      coral → draws/snaps in last as the payoff. For video intros/outros and Shorts.
  B4. Kinetic-type rules for short-form video — how Lora headlines and mono kickers enter
      (cut or quick rise, never typewriter cliché), max on-screen density, and safe areas.
  B5. A reduced-motion / accessibility variant for each (respect prefers-reduced-motion;
      provide a static-but-equivalent fallback).

## C. EDITORIAL ART DIRECTION
  C1. Photography direction — warm-graded documentary photography of real people in real
      rooms (the OpenAI Builder Lounge shots are the reference). Define the grade (warm,
      deep contrast, paper-toned), crop philosophy (decisive, type-over-image allowed),
      and a hard NEVER list (stock "AI", glowing brains, robots, neural-net clipart, fake
      "futuristic" gradients). Provide 3–4 treated example crops or detailed art-direction
      cards Sav can hand to a photographer/retoucher.
  C2. Illustration & graphic language — the "strategy → ship lane" (a dotted route from a
      strategy node to a ship node), the release ledger (a dated mono list), and the stamp
      motif as the three ownable graphic systems. Show each as a reusable building block.
  C3. Data-viz style — a chart kit on Paper and on Ink-Deep grounds: line, bar, and a
      single-stat "big number" treatment. Coral reserved for the ONE series/number that
      matters; everything else in Slate/Amber/Line. Mono axis labels, Lora chart titles.
      Include accessible non-coral encodings (pattern/label) so meaning never relies on color alone.
  C4. The COVER SYSTEM — a flexible cover grid that works for an article hero, a carousel
      cover, and an OG card from the same layout DNA: mono kicker → big Lora headline →
      optional photo or stamp → masthead/endorsement footer. Show 3 cover variants (photo-led,
      type-led, data-led) so the publication has range without losing identity.

## D. CHANNEL TEMPLATE LIBRARY — PAID · OWNED · EARNED
  Build a labeled grid of templates. Tag each one PAID / OWNED / EARNED. Every template
  respects the coral-arrow rule and carries "Powered by Enso Labs". Give exact sizes.

  OWNED:
    • LinkedIn carousel (1080×1350) — cover + atomic-idea slides + CTA slide. The LEAD
      surface; native doc post, NEVER a link post. (Highest engagement.)
    • LinkedIn single image (1200×627).
    • X / Twitter thread cards (1600×900 in-thread + 1200×675 OG card) — claim-first, one
      chart/stamp per thread, link last.
    • Substack header (1200×400) and Medium header (1500×750) — light editorial register;
      cross-posts set rel=canonical → ensolabs.ai/insights to protect SEO.
    • Newsletter masthead (1200×400) — masthead + issue № + dateline ("THE SHIP LOG").
    • Instagram carousel (1080×1350) + IG single (1080×1080) — same atomic-idea system,
      tuned for a colder/visual audience.
    • YouTube thumbnail (1280×720) + Shorts thumbnail (1080×1920) — big Lora hook, one
      stamp, face-or-stat-led, legible at thumbnail scale.
    • OG / social card (1200×630) — dark default + light editorial; the on-site share unit.
    • Signal card (1200×630) — the engine's atomic unit: one ranked signal + a mono
      confidence note + source. The "Live Intelligence" surface on /insights.
  EARNED:
    • Quote/press card (1200×630) — a pull-quote or stat formatted for reshare and press pickup.
    • Speaker / "as seen at" card — event or podcast appearance, co-branded but
      Strategy-to-Ship-led.
  PAID:
    • LinkedIn ad creative — single image (1200×627) + carousel (1080×1080) + document ad.
    • Meta (Instagram/Facebook) ad — feed (1080×1080) + story/reels (1080×1920).
    • Google Display — leaderboard 728×90, medium rectangle 300×250, half-page 300×600,
      large rectangle 336×280, mobile banner 320×50.
    • Paid rules block: paid creative may carry a clearer CTA and a value line, but STILL
      leads editorial-first, keeps coral ≤10%, never recolors the arrow, and always shows
      "Powered by Enso Labs". Define the one allowed CTA style (coral button or coral-ruled
      text link) and a do/don't for paid specifically (no stock AI imagery in ads either).

## E. SOCIAL PROFILE KIT
  E1. Avatars — S→S monogram avatar (square + circle-safe) for LinkedIn, X, Instagram,
      YouTube, Substack.
  E2. Banners/headers at each platform's exact size — LinkedIn personal (1584×396),
      LinkedIn company page (1128×191), X header (1500×500), YouTube channel art
      (2560×1440 with title-safe 1546×423), Substack publication header. Each carries the
      masthead + endorsement, sized so nothing critical sits in a crop-unsafe zone.
  E3. A profile-bio kit — on-brand one-line bios + link-in-bio treatment, all pointing to
      ensolabs.ai/insights, with the lowercase "strategy → ship" handle convention.

## F. HANDOFF — COMPONENTS & TOKENS (make it reusable)
  F1. A component sheet — every primitive named and shown: masthead lockups, monogram,
      section-identity headers, kicker, headline, body, stamp, arrow-device, signal card,
      cover grid, chart kit, CTA. (Build on the existing .theme-sts / .theme-sts-dark and
      the .sts-kicker / .sts-headline / .sts-arrow / .sts-stamp primitives in tokens.css —
      EXTEND that file's naming, don't fork it.)
  F2. A tokens delta — any NEW tokens this media system introduces (e.g., section-tint
      vars, motion-timing vars, additional sizes) proposed as additions to tokens.css, in
      the same --sts-* naming convention, so the repo stays single-source-of-truth.
  F3. A one-page "system map" — a single board showing the masthead → sections → cover
      system → channel templates relationship, so anyone can see how the pieces fit.
  F4. A downloadable bundle plan — list exactly what assets/files ship out of this session
      (SVGs, PNGs, the component sheet, the tokens delta) and where they belong in
      brand/strategy-to-ship/.

# CONSTRAINTS (non-negotiable)
  • Do not redesign the locked core (palette, type, wordmark, the coral arrow, the stamp,
    "Warm Signal"). EXTEND only. If something in the locked kit truly blocks a media use
    case, FLAG it as a proposal — do not silently change it.
  • The arrow → is always Ship Coral, never recolored or glowed, in static AND motion.
  • Coral ≤ ~10% of any surface. Section identities use muted palette tints, never more coral.
  • Enso Teal appears ONLY in the "from Enso Labs" endorsement, never as a headline/section accent.
  • "Powered by Enso Labs" on every artifact, paid and organic.
  • Editorial-first on every surface (headline/idea leads; logo/tagline does not).
  • No emojis, no hype words, plain-English. Name the human-in-the-loop where a byline fits.
  • Never name a confidential client (e.g., the Fortune 500 manufacturer case study).
  • Never reference Strategy to Ship or signals.ensolabs.ai as live; treat them as retired.
  • Accessibility is a requirement, not a nice-to-have (see Output format → accessibility).

# OUTPUT FORMAT
  1. Open with ONE sentence confirming you've loaded the locked Strategy to Ship "Warm
     Signal" system from the four attached files.
  2. Deliver the six workstreams (A–F) IN ORDER, each as labeled visual mockups with
     names + exact pixel sizes and brief annotation. Use real example headlines/stats.
  3. ACCESSIBILITY & CONTRAST notes — for every color pairing used, state the role and
     confirm it meets WCAG AA (Ink on Paper, Paper-on-dark on Ink-Deep, coral usage as
     accent-not-text-on-light, etc.). Confirm no meaning relies on color alone (charts,
     section IDs, stamps all carry a label/shape too). Note minimum legible sizes
     (wordmark ≥18px, monogram survives 32px) and motion's reduced-motion fallbacks.
  4. A DO / DON'T section — at least 10 paired rules covering: the arrow, coral budget,
     section tints, photography (real rooms vs. stock AI), the endorsement, editorial-first
     vs. ad-first, motion restraint, and paid-creative discipline.
  5. The HANDOFF bundle plan (F4) — the explicit list of files to export and their target
     paths under brand/strategy-to-ship/.
  6. Close by listing the human-gated next steps (review → place → publish/launch). NEVER
     auto-publish, auto-deploy, or auto-launch a paid campaign.

Acknowledge the load in one sentence, then begin with Workstream A.
```

---

## How to run this

1. **Open a dedicated Claude Design session** (a fresh one, separate from the website-build and day-to-day asset sessions) so the full system build has its own clean context.
2. **Attach the locked brand files** before pasting — or hand Claude Design the links from the **"Source files — read / attach these"** table at the top of this doc:
   - [`strategy-to-ship-design-system.md`](https://github.com/nycsav/ensolabs-site/blob/master/strategy-to-ship-design-system.md)
   - [`brand/strategy-to-ship/tokens.css`](https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/tokens.css)
   - [`brand/strategy-to-ship/style-guide.html`](https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/style-guide.html)
   - [`brand/strategy-to-ship/wordmark.svg`](https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/wordmark.svg) (plus [`og-dark.png`](https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/og-dark.png), [`og-light.png`](https://github.com/nycsav/ensolabs-site/blob/master/brand/strategy-to-ship/og-light.png) for reference)
3. **Paste the fenced prompt block above** and let it run the six workstreams (A–F) in order.
4. **Review at the gate.** Nothing ships, deploys, or launches automatically — approve the system, then place assets and export the handoff bundle into `brand/strategy-to-ship/`.

*Companion files: `STRATEGY_TO_SHIP_DESIGN_KICKOFF.md` (the day-to-day asset loader) and `STRATEGY TO SHIP_PIPELINE_2_0_KICKOFF.md` (the writing pipeline). This file is the **media-brand system build**.*
