# Enso Labs Website — Project Guide

## Quick Reference
- **Framework:** Next.js 14, App Router, TypeScript
- **Styling:** Custom CSS (globals.css), OKLCH color system
- **Deploy:** Push to master → Vercel auto-deploys
- **Domain:** ensolabs.ai
- **GitHub:** nycsav/ensolabs-site

## Deploy
git add -A && git commit -m "description" && git push origin master

## Key Files
- app/page.tsx — Home
- app/services/page.tsx — Services
- app/work/page.tsx — Work overview
- app/work/[slug]/page.tsx — Individual case studies
- app/insights/page.tsx — Insights + signal2noise embed
- app/about/page.tsx — About
- app/contact/page.tsx — Contact
- components/Nav.tsx — Navigation (client component)
- components/Footer.tsx — Footer
- app/globals.css — All styles
- lib/schema.ts — JSON-LD schemas
- lib/insights.ts — Insight articles data
- lib/site.ts — Site constants and metadata

## Content Rules
- Studio language: always "we", never "I"
- Sav Banerjee in third person on About page
- "Get in Touch" CTA (not "Book a Discovery Call")
- Three pillars: AI Transformation | Agentic Systems | Financial AI
- No client names without approval (Gore is confidential)

## SEO
- 71 JSON-LD schemas across all pages
- Per-page unique OG tags
- Dynamic OG images for case studies and insights
- AEO definition-lead sentences on every page
- robots.ts allows GPTBot, ClaudeBot, PerplexityBot

## Weekly Tasks
- Update insight articles with signal2noise content
- Check mobile responsiveness
- Verify all pages load (6 main + 4 case studies + 8 insights)
- Review GA4 for traffic patterns
