# Handoff: Homepage services-copy clarity pass — homepage-copy-clarity

> Written by Claude (Cowork review). Executed in Claude Code with `/ship-handoff homepage-copy-clarity`.
> One spec = one PR. Copy-only. No CSS, no schema, no new components, no new imports.

## Summary
Make the homepage services copy crystal-clear in plain terms. The three-verb spine
(Advise · Build · Operate) is strong and stays; this pass (1) rewrites the "Custom AI
Systems" card from a stack/acronym list into outcome-first bullets, (2) aligns the three
service labels to the hero verbs, (3) reframes the Enso Trading Terminal as proof rather
than identity, (4) names the concrete output in the hero lede, and (5) makes the hero
primary CTA "Get in Touch" per the standing CTA rule while keeping the booking link as a
secondary option.

## Target
- Branch: `design/homepage-copy-clarity` (auto)
- Pages/files to touch: `app/page.tsx` ONLY
- Do NOT touch: any other page, `globals.css`, `lib/schema.ts`, `lib/site.ts`, metadata/OG
  block, FAQ (`HOME_FAQS`), ticker, proof numbers, clients, case rows.

## Changes (exact)

Apply these as literal find-and-replace edits in `app/page.tsx`. Preserve all surrounding
JSX, inline styles, and indentation exactly — only the text noted changes.

### 1. Hero lede — name the concrete output
**Find:**
> `belongs, build the systems that do the work, and operate them in production. One senior advisor`

**Replace:**
> `belongs, build the agents and automations that do the work, and operate them in production. One senior advisor`

### 2. "What we do" — reframe the Trading Terminal as proof, not identity
**Find (the 4th paragraph in the §01 left column):**
> `And we run what we sell. The <b style={{ color: 'var(--fg)' }}>Enso Trading Terminal</b> runs autonomous research, signal intelligence and brokerage execution in production, twenty-four hours a day.`

**Replace:**
> `Proof we operate, not just advise: the <b style={{ color: 'var(--fg)' }}>Enso Trading Terminal</b> is our own system — autonomous research, signal intelligence and brokerage execution running in production, twenty-four hours a day.`

### 3. Service card 1 — align tag to the hero verb ("Advise")
**Find:**
> `<span>P / 01</span><span className="tag">ADVISORY</span>`

**Replace:**
> `<span>P / 01</span><span className="tag">ADVISE</span>`

### 4. "Custom AI Systems" (Build) card — outcome-first, plain terms
Rewrite the card's `<p>` and `<ul>` so each line leads with what the buyer gets and the
stack is demoted to a trailing tag. The `<h3>Custom AI Systems</h3>` line stays.

**Find:**
```
              <p>We build against your real data — agents, retrieval, and integrations into the tools your team already uses — and ship into production, not into a demo.</p>
              <ul>
                <li>Agent architecture · LangGraph / CrewAI</li>
                <li>RAG knowledge systems</li>
                <li>MCP server development</li>
                <li>Workflow automation · N8N · Claude API</li>
                <li>Production deployment &amp; evaluation</li>
              </ul>
```

**Replace:**
```
              <p>We build against your real data — agents, retrieval, and integrations into the tools your team already uses — and ship into production, not into a demo. You get working software your team uses on day one, not a slide deck.</p>
              <ul>
                <li>AI agents that complete a real task end-to-end · LangGraph / CrewAI</li>
                <li>Answer engines grounded in your own documents · RAG</li>
                <li>Live connections to the tools you already run · MCP</li>
                <li>Automated workflows that remove manual steps · N8N · Claude API</li>
                <li>Production deployment &amp; evaluation</li>
              </ul>
```

### 5. "How we work" lede — one line mapping the 3 verbs to the 4 phases
**Find:**
> `Principal-led delivery, designed so a pilot doesn&rsquo;t die in the lab.`

**Replace:**
> `Principal-led delivery, designed so a pilot doesn&rsquo;t die in the lab. Advise splits into Diagnose and Design; Build and Operate carry straight through.`

### 6. Hero CTA — primary "Get in Touch" per standing rule; keep booking as secondary
The standing content rule is: primary CTA reads "Get in Touch" (not "Book intro call").
Currently the booking link is `btn-primary` and "Start a project" is secondary. Swap the
emphasis: `/contact` becomes the primary "Get in Touch"; the booking link stays as a
secondary `btn` (keep its `data-booking` attribute for analytics). "See the work" is
unchanged.

**Find:**
```
                {SITE.bookingUrl.startsWith('http') ? (
                  <>
                    <a
                      className="btn btn-primary"
                      href={SITE.bookingUrl}
                      target="_blank"
                      rel="noopener"
                      data-booking
                    >
                      Book a 15-min intro
                      <Arrow />
                    </a>
                    <Link className="btn" href="/contact">Start a project</Link>
                  </>
                ) : (
                  <Link className="btn btn-primary" href="/contact">
                    Start a project
                    <Arrow />
                  </Link>
                )}
```

**Replace:**
```
                {SITE.bookingUrl.startsWith('http') ? (
                  <>
                    <Link className="btn btn-primary" href="/contact">
                      Get in Touch
                      <Arrow />
                    </Link>
                    <a
                      className="btn"
                      href={SITE.bookingUrl}
                      target="_blank"
                      rel="noopener"
                      data-booking
                    >
                      Book a 15-min intro
                    </a>
                  </>
                ) : (
                  <Link className="btn btn-primary" href="/contact">
                    Get in Touch
                    <Arrow />
                  </Link>
                )}
```

## Assets
No new assets.

## Brand / content rules to honor
- Studio voice "we", never "I". No hype words.
- Primary CTA is "Get in Touch" (standing rule).
- Gore / case study client stays "Fortune 500 Manufacturer" (confidential) — unchanged here.
- Three-pillar spine stays Advise · Build · Operate; do not revert to "Strategy → Ship" hero.
- Do not touch the Strategy to Ship / Live Intelligence sections.

## Acceptance checklist (Claude Code confirms before PR)
- [ ] `npm run build` passes.
- [ ] All six edits applied with the exact replacement text above; no other copy changed.
- [ ] Hero primary button now reads "Get in Touch" → `/contact`; booking link still present as secondary with `data-booking` intact.
- [ ] Renders correctly at desktop + mobile widths (service cards, hero CTA row).
- [ ] JSON-LD / OG / FAQ schema unaffected (no schema edits in this handoff).
- [ ] No new external links to deprecated `signals.ensolabs.ai` / signal2noise.

## Out of scope
- Any file other than `app/page.tsx`.
- Proof numbers, client list, ticker, case-study rows, sectors strip.
- Metadata, OG image, canonical, revalidate.
- CSS / `globals.css` and any schema builder.
