# Enso Labs — Unified Project Guide
## For Claude Cowork, Claude Code, and all AI tools

---

## Overview
Enso Labs is an AI transformation and agentic systems studio founded by Sav Banerjee. This project contains the studio website (ensolabs.ai) which connects to signal2noise (signals.ensolabs.ai) as the content intelligence engine.

## Quick Reference
- **Framework:** Next.js 14, App Router, TypeScript
- **Styling:** Custom CSS (globals.css), OKLCH color system
- **Deploy:** Push to master → Vercel auto-deploys
- **Domain:** ensolabs.ai
- **GitHub:** nycsav/ensolabs-site
- **GA4:** G-5N15QMQ962
- **Signal2noise repo:** nycsav/PlannerAPI → signals.ensolabs.ai (Firebase)
- **Signal2noise GA4:** G-CJ18GXXPMX

## Deploy
```bash
git add -A && git commit -m "description" && git push origin master
# Vercel auto-deploys from GitHub. No manual deploy needed.
```

## Pages
- app/page.tsx — Home (hero, 3 pillars, proof metrics, signal2noise feed, methodology, clients, CTA)
- app/services/page.tsx — Services (3 tracks + 6 FAQs with schema)
- app/work/page.tsx — Work overview (4 case study cards)
- app/work/[slug]/page.tsx — Individual case studies with Article schema + ShareButtons
  - /work/gore — AI Market Intelligence Platform (CONFIDENTIAL client name)
  - /work/heller — AI Center of Excellence for Pharma
  - /work/trading-terminal — Enso Trading Terminal
  - /work/enterprise-ai — Enterprise AI Enablement
- app/insights/page.tsx — Insights (LIGHT/WARM theme) + signal2noise embed + articles
- app/insights/[slug]/page.tsx — Individual insight articles
- app/about/page.tsx — Studio story + Sav bio (third person) + headshot
- app/contact/page.tsx — Contact form + address + social links

## Components
- components/Nav.tsx — Navigation with hamburger mobile menu (client component)
- components/Footer.tsx — Footer with AI attribution line
- components/ContactForm.tsx — Formspree-connected form (client component)
- components/ShareButtons.tsx — Copy link, LinkedIn, Twitter/X, Email sharing
- components/Analytics.tsx — GA4 with event tracking (client component)
- components/JsonLd.tsx — JSON-LD schema renderer

## Key Libraries
- lib/schema.ts — All JSON-LD builders (Organization, Person, ProfessionalService, Product, FAQ, LocalBusiness, Article, Breadcrumb, WebSite)
- lib/insights.ts — Insight articles data array (add new articles here)
- lib/site.ts — Site constants, metadata defaults, canonical URLs

## Styles
- app/globals.css — ALL styles including mobile overrides
- CRITICAL: Mobile fixes are INSIDE @media queries only. Never modify base CSS rules.
- Color system: OKLCH with teal accent (#5ce0d2), dark navy background (#0d1321)
- Typography: Inter Tight (display), JetBrains Mono (code/labels)

## Content Rules
- Studio language: always "we", never "I"
- Sav Banerjee in third person on About page
- "Get in Touch" CTA (not "Book a Discovery Call" or "Book intro call")
- Three pillars: AI Transformation | Agentic Systems | Financial AI
- No client names without explicit approval (Gore engagement is CONFIDENTIAL — use "Global Materials Manufacturer" or "Fortune 500 manufacturer")
- signal2noise is always lowercase, no spaces
- "Powered by Enso Labs" on all signal2noise references
- Canonical domains: ensolabs.ai (never www.ensolabs.ai or ensopartners.co)

## SEO / AEO / GEO
- 71 JSON-LD schema blocks across 13 pages (validated, 0 issues)
- Per-page unique OG tags with absolute URLs
- Dynamic OG images for case studies and insights (edge runtime)
- Static OG image at public/og-default.png (1200x630, puppeteer-generated)
- AEO definition-lead sentences on every page
- robots.ts allows: GPTBot, ClaudeBot, PerplexityBot, Applebot, Google-Extended, meta-externalagent
- MCP endpoint at /.well-known/mcp.json
- RSS feed at /feed.xml
- Sitemap at /sitemap.xml (18 URLs)
- FAQ schema on /services and /contact
- LocalBusiness schema on /contact (geo: 40.7362, -73.9903)

## Signal2noise Integration
- Embedded on /insights page via iframe (signals.ensolabs.ai)
- Referenced on Home page in Live Intelligence section
- signal2noise repo: ~/Projects/PlannerAPI
- signal2noise deploy: cd ~/Projects/PlannerAPI && firebase deploy --only hosting
- signal2noise GitHub push does NOT auto-deploy

## Content Distribution Flow

## Brand Assets
- Logo SVG: public/images/logo-white.svg (teal chevron #5ce0d2, white wordmark)
- Headshot: public/images/sav-banerjee.jpg
- OG image: public/og-default.png (puppeteer-generated, 1200x630)
- Favicon: public/favicon.svg, favicon.ico, favicon-16x16.png, favicon-32x32.png
- Apple touch icon: public/apple-touch-icon.png

## Contact Info
- Address: 31 Union Square West, 6th Floor, New York, NY 10003
- Email: sav@ensopartners.co
- LinkedIn (personal): linkedin.com/in/savbanerjee
- LinkedIn (company): linkedin.com/company/enso-partners
- GitHub: github.com/nycsav

## Analytics
- GA4: G-5N15QMQ962 (ensolabs.ai)
- GA4: G-CJ18GXXPMX (signals.ensolabs.ai)
- Vercel Analytics: enable in dashboard
- Event tracking: form_submit, share clicks, signal2noise feed clicks

## Weekly Maintenance Tasks
- [ ] Verify signal2noise is publishing daily at signals.ensolabs.ai
- [ ] Check all pages load (6 main + 4 case studies + insights)
- [ ] Review GA4 traffic for patterns
- [ ] Draft 3 LinkedIn posts (Mon/Wed/Fri)
- [ ] Check mobile responsiveness on phone
- [ ] Update insight articles with new content if needed
- [ ] Check OG image previews when sharing links

## AI Attribution (footer)
"Designed with Claude Design · Built with Claude Code · Intelligence by signal2noise · Human-in-the-loop: Sav Banerjee"

## Built With
- Strategy & Research: Claude Chat (Opus 4.6)
- Visual Prototyping: Claude Design
- Production Code: Claude Code
- Content Intelligence: signal2noise (PlannerAPI)
- Browser Automation: Claude in Chrome
- File Operations: Desktop Commander
- Deployment: Vercel (auto-deploy from GitHub)
- DNS: GoDaddy
- Analytics: GA4
