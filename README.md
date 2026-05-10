<p align="center">
  <img src="https://ensolabs.ai/images/logo-white.svg" alt="Enso Labs" width="200" />
</p>

<h3 align="center">ensolabs.ai</h3>

<p align="center">
  AI transformation consultancy, agentic systems studio, and financial AI product lab.<br/>
  <strong>Strategy to Ship.</strong>
</p>

<p align="center">
  <a href="https://ensolabs.ai"><img src="https://img.shields.io/badge/Live-ensolabs.ai-5ce0d2?style=flat-square" alt="Live Site" /></a>
  <a href="https://github.com/nycsav/ensolabs-site/deployments"><img src="https://img.shields.io/badge/Vercel-Deployed-000?style=flat-square&logo=vercel" alt="Vercel" /></a>
  <img src="https://img.shields.io/badge/Next.js-14-000?style=flat-square&logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/JSON--LD-71_schemas-5ce0d2?style=flat-square" alt="JSON-LD" />
  <img src="https://img.shields.io/badge/Claude-Built-cc785c?style=flat-square&logo=anthropic&logoColor=white" alt="Built with Claude" />
</p>

---

## Overview

The production website for [Enso Labs](https://ensolabs.ai) — a principal-led AI transformation studio founded by Sav Banerjee in NYC. The site was built entirely with AI tools (Claude Chat, Claude Design, Claude Code) and shipped to production in 24 hours.

This isn't a landing page. It's a complete studio presence with production-grade SEO infrastructure, dynamic content generation, and AI-agent discoverability.

## Architecture

```
ensolabs-site/
├── app/                    # Next.js 14 App Router pages
│   ├── page.tsx            # Home — hero, pillars, proof metrics, methodology
│   ├── services/           # Three service tracks + Claude Managed Services
│   ├── work/[slug]/        # Dynamic case study pages (4 engagements)
│   ├── insights/[slug]/    # Dynamic insight articles (11+ essays)
│   ├── industries/         # Financial services vertical page
│   ├── about/              # Studio story + founder bio
│   └── contact/            # Formspree-connected contact form
├── components/             # Nav, Footer, ContactForm, ShareButtons, Analytics
├── lib/                    # Schema builders, site constants, insights data
├── public/                 # Static assets, OG images, favicons
└── scripts/                # OG image generation (Puppeteer)
```

## What Ships With This Site

| Feature | Details |
|---------|---------|
| **71 JSON-LD schemas** | Organization, Person, ProfessionalService, Product, FAQ, LocalBusiness, Article, Breadcrumb, WebSite, ContactPoint |
| **MCP endpoint** | `/.well-known/mcp.json` — discoverable by AI agents and Claude integrations |
| **Dynamic OG images** | Edge-runtime generated social previews for every case study and article |
| **GA4 event tracking** | Form submissions, share clicks, signal2noise feed interactions |
| **AEO-optimized** | Definition-lead sentences on every page for AI answer engine extraction |
| **RSS + sitemap** | Auto-generated from content data layer (25 URLs) |
| **signal2noise** | Live intelligence feed embedded from [signals.ensolabs.ai](https://signals.ensolabs.ai) |
| **Mobile responsive** | Full-screen nav overlay, fluid typography, card reflow across breakpoints |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14, App Router, TypeScript |
| Styling | Custom CSS, OKLCH color system, Inter Tight + JetBrains Mono |
| Deployment | Vercel (auto-deploy from GitHub, < 60s) |
| SEO | 71 JSON-LD schemas, canonical URLs, dynamic OG images |
| AEO/GEO | Definition-lead sentences, MCP endpoint, LLM bot access in robots.txt |
| Analytics | GA4 (G-5N15QMQ962), custom event tracking |
| Forms | Formspree |

## Built With AI

This site is proof that AI-native delivery is production-ready. A single senior practitioner with the right AI toolchain shipped production infrastructure that would take a traditional agency team weeks.

| Phase | Tool | What It Did |
|-------|------|-------------|
| Strategy & Research | Claude Chat (Opus 4) | Competitive analysis, positioning, JSON-LD schema planning, SEO strategy |
| Visual Prototyping | Claude Design | Layout exploration, color system, typography, responsive breakpoints |
| Production Code | Claude Code | Every line of Next.js, TypeScript, and CSS — pair-programmed |
| Content Intelligence | signal2noise | Daily signals powering the Insights page |
| Browser Automation | Claude in Chrome | Vercel configuration, GSC verification, DNS management |
| Deployment | Vercel | Auto-deploy from GitHub push |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, 3 pillars, proof metrics, signal2noise feed, methodology, clients |
| `/services` | Three service tracks + 6 FAQs with structured data |
| `/services/claude-managed-services` | Claude Managed Services offering |
| `/work` | Case studies overview (4 engagements) |
| `/work/gore` | Gore M2 Intelligence Hub — 731 docs, 16 signals, AES-256-GCM |
| `/work/heller` | AI Center of Excellence — 83% faster launches, FDA/MLR compliant |
| `/work/trading-terminal` | Enso Trading Terminal — live autonomous trading |
| `/work/enterprise-ai` | Enterprise AI Enablement — 75% pilot-to-production |
| `/insights` | Intelligence feed + 11 essays from shipping production AI |
| `/industries/financial-services` | Financial services vertical page |
| `/about` | Studio story + Sav Banerjee bio |
| `/contact` | Contact form + address + social links |
| `/built-with-ai` | Case study: how this site was built in 24 hours |

## Deploy

```bash
git push origin master
# Vercel auto-deploys. Site is live in < 60 seconds.
```

## License

Proprietary. All rights reserved by Enso Labs.

---

<p align="center">
  <strong>Designed with Claude Design · Built with Claude Code · Intelligence by signal2noise</strong><br/>
  <sub>Human-in-the-loop: <a href="https://linkedin.com/in/savbanerjee">Sav Banerjee</a></sub>
</p>
