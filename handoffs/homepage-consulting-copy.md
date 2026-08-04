# Handoff — Homepage copy v3 (consulting structure)

**Slug:** `homepage-consulting-copy`
**File touched:** `app/page.tsx` only. No CSS, no schema, no new components.
**Preview of intent:** `copy-review/Homepage v3 Preview.html` (in the design project)
**Date:** 2026-08-04

## Why
"Strategy → Ship" reads as an internal slogan, and the homepage was built around it (hero, methodology name, work section, signals banner). Replaced with a plain consulting structure: three named services a client can buy (**Advisory / Build / Operate**), stated entry points, and process phases that match the services. The publication brand at `/insights` is untouched — only homepage usages of the phrase are removed.

## Escaping convention
Strings below are verbatim source. In JSX text the ampersand appears as `&amp;`; in TS string literals it appears as `&`. Copy exactly as written.

---

### 1 — metadata.title
FIND
```
  title: 'Enso Labs — AI Transformation Consulting & Agentic Systems Studio NYC',
  description:
    'Enso Labs is a principal-led AI managed-services studio in NYC. We encode your industry expertise into managed agents, then build and operate them.',
```
REPLACE
```
  title: 'Enso Labs — AI Consulting for Enterprises & Agencies | NYC',
  description:
    'Principal-led AI consultancy in New York. We advise on where AI belongs, build the systems, and operate them in production — for enterprises and agencies across healthcare, finance, manufacturing, media and B2B tech.',
```

### 2 — openGraph
FIND
```
    title: 'Enso Labs — AI Transformation Consulting & Agentic Systems Studio NYC',
    description:
      'Principal-led AI managed-services studio in NYC. We encode your industry expertise into managed agents — then build and operate them in production. Agentic Managed Services across Healthcare, Finance, Manufacturing, Media, B2B Tech, and Growth.',
```
REPLACE
```
    title: 'Enso Labs — AI Consulting for Enterprises & Agencies | NYC',
    description:
      'Principal-led AI consultancy in New York. Advisory, custom AI systems, and managed AI operations — for enterprises and agencies across Healthcare, Finance, Manufacturing, Media, and B2B Tech.',
```

### 3 — twitter
FIND
```
    title: 'Enso Labs — AI Consulting & Agentic Systems Studio NYC',
    description:
      'Principal-led AI managed-services studio in NYC. Encode your expertise into managed agents — we build and operate them in production. Agentic Managed Services: Healthcare, Finance, Manufacturing, Media, B2B Tech, Growth.',
```
REPLACE
```
    title: 'Enso Labs — AI Consulting for Enterprises & Agencies | NYC',
    description:
      'Principal-led AI consultancy in New York. We advise, build, and operate AI systems in production — Healthcare, Finance, Manufacturing, Agencies, Media, B2B Tech.',
```

### 4 — FAQ 01 answer
FIND
```
      'Enso Labs is a principal-led AI managed-services studio based in New York City, founded by Sav Banerjee. We encode your domain expertise into managed agents, then build and operate them in production — Agentic Managed Services, strategy through production. The work spans AI transformation, agentic systems, and financial AI, for companies across Healthcare, Finance, Manufacturing, Media, B2B Tech, and Growth. Every engagement is led by a senior advisor who also builds.',
```
REPLACE
```
      'Enso Labs is an AI consultancy in New York City, founded by Sav Banerjee. We advise on where AI belongs in your business, build the systems, and operate them in production — for enterprises and agencies across Healthcare, Finance, Manufacturing, Media, and B2B Tech. Every engagement is led by a senior advisor who also builds.',
```

### 5 — hero H1
FIND
```
            <span className="w w1">Strategy</span><br />
            <span className="w w2"><em>to</em></span> <span className="w w3 accent">Ship.</span>
```
REPLACE
```
            <span className="w w1">Advise.</span><br />
            <span className="w w2">Build.</span> <span className="w w3 accent">Operate.</span>
```

### 6 — hero lede
FIND
```
              Enso Labs is a principal-led AI managed-services studio. We encode your industry expertise into
              managed agents — then build and operate them in production. From stakeholder research to a shipped,
              running system — across healthcare, finance, manufacturing, media, and B2B tech.
```
REPLACE
```
              Enso Labs is an AI consultancy in New York. We help enterprises and agencies decide where AI
              belongs, build the systems that do the work, and operate them in production. One senior advisor
              runs the engagement and does the building.
```

### 7 — hero sub-line
FIND
```
                ↳ managed agents, built and operated
```
REPLACE
```
                ↳ scoped, built and operated by the same team
```

### 8 — sectors strip
FIND
```
            <span className="list">HEALTHCARE · FINANCE · MANUFACTURING · MEDIA · B2B TECH · GROWTH</span>
```
REPLACE
```
            <span className="list">HEALTHCARE · FINANCE · MANUFACTURING · AGENCIES · MEDIA · B2B TECH</span>
```

### 9 — §01 eyebrow + H2
FIND
```
              <span className="eyebrow"><span className="num">§ 01</span>&nbsp;Positioning</span>
```
REPLACE
```
              <span className="eyebrow"><span className="num">§ 01</span>&nbsp;What we do</span>
```

FIND
```
                Most AI consultancies stop at the slide deck.<br />
                <em style={{ color: 'var(--fg-2)', fontStyle: 'italic', fontWeight: 400 }}>
                  We ship the system.
                </em>
```
REPLACE
```
                Most AI consultants hand over a roadmap.<br />
                <em style={{ color: 'var(--fg-2)', fontStyle: 'italic', fontWeight: 400 }}>
                  We stay until it runs.
                </em>
```

### 10 — §01 body paragraphs + remove tech tag row
Replace the whole inner block. FIND
```
                Enso Labs is a principal-led studio founded by <b style={{ color: 'var(--fg)' }}>Sav Banerjee</b> — a 15-year enterprise strategist turned agentic-systems builder.
```
REPLACE
```
                Enso Labs is led by <b style={{ color: 'var(--fg)' }}>Sav Banerjee</b> — fifteen years advising enterprise clients on strategy, now building the systems himself.
```

FIND
```
                Every engagement is led by a senior advisor who also builds. Our specialist network scales with the work — no bloated teams, no hand-offs.
```
REPLACE
```
                You work with one senior advisor from the first conversation to production. A vetted specialist network scales with the scope. No hand-offs to a junior bench.
```

FIND
```
                We run the same infrastructure we build for clients: the <b style={{ color: 'var(--fg)' }}>Enso Trading Terminal</b>
                {' '}runs autonomous signal intelligence, multi-agent research, and brokerage execution in production —
                twenty-four hours a day.
```
REPLACE
```
                We work the way a good agency partner works: inside your team, on your deadlines, accountable for the output — not just the recommendation.
```

FIND (fourth paragraph + tag row — delete both, replace with the terminal paragraph)
```
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                The same encode &rarr; build &rarr; operate we bring to regulated operations, we bring to growth &mdash; segmentation, campaigns, and brand, run as agents.
              </p>
              <div className="tag-row" style={{ marginTop: 8 }}>
                <span className="tag teal">LangGraph</span>
                <span className="tag teal">Claude API</span>
                <span className="tag teal">MCP</span>
                <span className="tag">N8N</span>
                <span className="tag">RAG</span>
                <span className="tag">CrewAI</span>
                <span className="tag">Python</span>
                <span className="tag">React</span>
              </div>
```
REPLACE
```
              <p style={{ fontSize: 18, color: 'var(--fg-2)', lineHeight: 1.6 }}>
                And we run what we sell. The <b style={{ color: 'var(--fg)' }}>Enso Trading Terminal</b> runs autonomous research, signal intelligence and brokerage execution in production, twenty-four hours a day.
              </p>
```
(The tech stack tags already appear on `/services` — do not add them elsewhere.)

### 11 — §02 eyebrow + H2
FIND
```
              <span className="eyebrow"><span className="num">§ 02</span>&nbsp;Three pillars</span>
```
REPLACE
```
              <span className="eyebrow"><span className="num">§ 02</span>&nbsp;Services</span>
```

FIND
```
              <h2 className="h2">One studio. Three integrated tracks — principal-led, every engagement.</h2>
```
REPLACE
```
              <h2 className="h2">Three services. Buy one, or all three in sequence.</h2>
```

### 12 — Pillar 01
FIND
```
                <span>P / 01</span><span className="tag">CONSULT</span>
              </div>
              <h3>AI Transformation Consulting</h3>
              <p>It starts with research — stakeholder interviews, data and workflow audits, AI-readiness assessment — to frame the decision the system must make and the roadmap to get there, across healthcare, finance, manufacturing, media, and B2B tech.</p>
              <ul>
                <li>Strategy &amp; roadmapping</li>
                <li>AI readiness &amp; maturity audits</li>
                <li>Executive workshops · 8–15 cohorts</li>
                <li>Business case &amp; ROI modeling</li>
                <li>Responsible-AI governance · NIST RMF</li>
              </ul>
```
REPLACE
```
                <span>P / 01</span><span className="tag">ADVISORY</span>
              </div>
              <h3>AI Strategy &amp; Readiness</h3>
              <p>Interviews, data and workflow audits, and a readiness assessment — so you know which decisions AI should touch first, what it will cost, and what will pass review.</p>
              <ul>
                <li>AI readiness &amp; maturity audit</li>
                <li>Opportunity backlog &amp; ROI model</li>
                <li>Executive workshops · 8–15 people</li>
                <li>Governance &amp; risk frame · NIST RMF</li>
                <li>Roadmap with named owners</li>
              </ul>
```

### 13 — Pillar 02
FIND
```
              <h3>Agentic Systems &amp; Products</h3>
              <p>Then we build the custom AI product — agent architecture, RAG, MCP integrations, and workflow automation — engineered against your real data and shipped end-to-end by a principal-led team.</p>
              <ul>
                <li>Agent architecture · LangGraph / CrewAI</li>
                <li>Workflow automation · N8N / Claude API</li>
                <li>RAG knowledge systems</li>
                <li>MCP server development</li>
                <li>AI Center of Excellence design</li>
              </ul>
```
REPLACE
```
              <h3>Custom AI Systems</h3>
              <p>We build against your real data — agents, retrieval, and integrations into the tools your team already uses — and ship into production, not into a demo.</p>
              <ul>
                <li>Agent architecture · LangGraph / CrewAI</li>
                <li>RAG knowledge systems</li>
                <li>MCP server development</li>
                <li>Workflow automation · N8N · Claude API</li>
                <li>Production deployment &amp; evaluation</li>
              </ul>
```

### 14 — Pillar 03 (was Financial AI — becomes OPERATE)
FIND
```
                <span>P / 03</span><span className="tag">SHIP</span>
              </div>
              <h3>Financial AI &amp; Trading Intelligence</h3>
              <p>The shipped intelligence system, running in production — financial AI agents, autonomous trading, and real-time signal intelligence, built on the same Claude infrastructure that Goldman Sachs, Citi, and JPMorgan now adopt. Brokerage API integration and MCP-connected agents. Anthropic Certified.</p>
              <ul>
                <li>Enso Trading Terminal</li>
                <li>News-driven trading algorithms</li>
                <li>Options flow analysis</li>
                <li>Crypto / DeFi strategy engines</li>
                <li>Brokerage API integration · Alpaca · Public</li>
              </ul>
```
REPLACE
```
                <span>P / 03</span><span className="tag">OPERATE</span>
              </div>
              <h3>Managed AI Operations</h3>
              <p>Then we run it, and it gets better every month. Monitoring, evaluation and tuning, reporting to your leadership, and enablement for the people using it — until your team is ready to take it in-house.</p>
              <ul>
                <li>Monitoring, evaluation &amp; tuning</li>
                <li>Enablement cohorts · Center of Excellence</li>
                <li>Monthly reporting to leadership</li>
                <li>Model &amp; vendor upgrades</li>
                <li>Documented handover on request</li>
              </ul>
```
Financial AI / trading is not lost: it stays as the live terminal in §01 and as case study CS / 03.

### 15 — NEW entry-points row above the service-catalog button
FIND
```
        <div className="shell" style={{ marginTop: 48 }}>
          <Link className="btn btn-ghost reveal" href="/services">
```
REPLACE
```
        <div className="shell" style={{ marginTop: 48 }}>
          <div className="reveal mono-sm" style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'baseline', marginBottom: 32 }}>
            <span style={{ letterSpacing: '0.06em' }}>HOW ENGAGEMENTS START</span>
            <span style={{ color: 'var(--fg-2)' }}>2-week AI Audit · fixed fee</span>
            <span style={{ color: 'var(--fg-2)' }}>8–12 week build</span>
            <span style={{ color: 'var(--fg-2)' }}>monthly managed operations</span>
          </div>
          <Link className="btn btn-ghost reveal" href="/services">
```

### 16 — Proof lede
FIND
```
                Pulled from live enterprise engagements and the Enso Trading Terminal. No vanity metrics.
```
REPLACE
```
                Pulled from live client engagements and the systems we operate. No vanity metrics.
```

FIND
```
              <div className="label">Average time-to-first-value, strategy through deployed system</div>
```
REPLACE
```
              <div className="label">Average time-to-first-value, first workshop to deployed system</div>
```

### 17 — Live Intelligence banner (removes the coral arrow usage)
FIND
```
              <div className="title">
                Daily AI signals, live from Strategy <span style={{ color: '#F0512E' }}>→</span> Ship.
              </div>
              <div className="sub">Competitive, AI &amp; financial signals for marketing strategists — updated every weekday, ET.</div>
```
REPLACE
```
              <div className="title">Daily AI signals for people who have to decide.</div>
              <div className="sub">Competitive, AI and financial signals for marketing and strategy teams — updated every weekday, ET.</div>
```

### 18 — Selected work H2
FIND
```
              <h2 className="h2">Four engagements. Strategy &nbsp;<span style={{ color: 'var(--fg-3)' }}>→</span>&nbsp; ship.</h2>
```
REPLACE
```
              <h2 className="h2">Four engagements, from first workshop to running system.</h2>
```

### 19 — Methodology → How we work
FIND
```
              <span className="eyebrow"><span className="num">§ 05</span>&nbsp;Methodology</span>
```
REPLACE
```
              <span className="eyebrow"><span className="num">§ 05</span>&nbsp;How we work</span>
```

FIND
```
              <h2 className="h2">The Strategy-to-Ship Framework.</h2>
              <p className="lede" style={{ marginTop: 24 }}>
                Four phases. Principal-led delivery. Designed so a Fortune 500 pilot doesn&rsquo;t die in the lab.
              </p>
```
REPLACE
```
              <h2 className="h2">Four phases. One team.</h2>
              <p className="lede" style={{ marginTop: 24 }}>
                Principal-led delivery, designed so a pilot doesn&rsquo;t die in the lab.
              </p>
```

### 20 — phase array (Scale → Operate)
FIND
```
              { num: '01', wks: 'WK 1–2', title: 'Diagnose', body: 'AI maturity assessment, technical discovery, stakeholder mapping. We measure where you actually are — not where the deck says you are.', out: '→ Readiness scorecard & gap map' },
              { num: '02', wks: 'WK 3–6', title: 'Design', body: 'Roadmap, business case, governance frame, and the production architecture. We design for shipping — not for the deck.', out: '→ Roadmap · ROI model · architecture' },
              { num: '03', wks: 'WK 7–12', title: 'Build', body: 'Agent architecture, RAG, MCP, integrations. The advisor and the build team work as one unit — so nothing gets lost in translation.', out: '→ Working system in production' },
              { num: '04', wks: 'WK 13+', title: 'Scale', body: 'Center of Excellence, enablement cohorts, governance handoff. We engineer ourselves out of the org — by design.', out: '→ CoE · cohorts · sustained adoption' },
```
REPLACE
```
              { num: '01', wks: 'WK 1–2', title: 'Diagnose', body: 'AI maturity assessment, technical discovery, stakeholder mapping. We measure where you actually are.', out: '→ Readiness scorecard & gap map' },
              { num: '02', wks: 'WK 3–6', title: 'Design', body: 'Roadmap, business case, governance frame, and the production architecture. Designed for what has to run.', out: '→ Roadmap · ROI model · architecture' },
              { num: '03', wks: 'WK 7–12', title: 'Build', body: 'Agent architecture, RAG, MCP, integrations. The advisor and the build team are one unit, so nothing gets lost in translation.', out: '→ Working system in production' },
              { num: '04', wks: 'WK 13+', title: 'Operate', body: 'We run the system, report on it monthly, and train your people on it. When you want it in-house, we document it and hand it over.', out: '→ Managed operations · enablement · handover' },
```

### 21 — closing CTA
FIND
```
            <p className="lede" style={{ margin: 0 }}>Have a system that needs to ship? Let&apos;s talk.</p>
```
REPLACE
```
            <p className="lede" style={{ margin: 0 }}>Have something that has to work in production? Let&apos;s talk.</p>
```

---

## Not touched
`/insights` and the Strategy to Ship publication brand, the ticker, the client grid, all proof numbers, all case-study copy and links, schema helpers, `globals.css`.

## Check before merge
- `npm run build` clean; no remaining "Strategy → Ship" / "Strategy to Ship" string on `/` (`grep -n "Strategy" app/page.tsx` should return nothing).
- Hero display type: "Advise. / Build. Operate." must not wrap to three lines at 1440px.
- Services section: three cards still equal height with the shorter Pillar 03 list.
