# ensolabs.ai

Production website for Enso Labs — Strategy to Ship.

Next.js 14 (App Router) · TypeScript · vanilla CSS (ported 1:1 from the Claude Design prototype) · Vercel.

## Quick start

```bash
npm install
cp .env.example .env.local       # then fill in NEXT_PUBLIC_FORMSPREE_ID
npm run dev                      # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Type-check only:

```bash
npm run type-check
```

## Structure

```
app/
├── layout.tsx               root layout — fonts, JSON-LD (Org/Person/WebSite), Nav, Footer
├── globals.css              dark theme + scoped light theme for /insights
├── page.tsx                 Home
├── about/page.tsx
├── services/page.tsx
├── work/page.tsx
├── contact/page.tsx         Formspree-backed brief form, FAQ
├── insights/                light cream theme; editorial feed + article detail
│   ├── layout.tsx           toggles body.theme-light
│   ├── LightThemeMount.tsx
│   ├── page.tsx             feed
│   └── [slug]/page.tsx      article (statically generated)
├── sitemap.ts               Next 14 native sitemap
├── robots.ts                Next 14 native robots — explicitly allows AI crawlers
├── feed.xml/route.ts        RSS 2.0 feed for /insights
└── api/mcp/route.ts         MCP discovery doc (rewritten from /.well-known/mcp.json)

components/                  Nav · Footer · NycClock · Reveal · ContactForm · Arrow · JsonLd
lib/
├── site.ts                  canonical origin + identity constants
├── insights.ts              typed array of insights (Phase 1 — MDX is Phase 2)
└── schema.ts                JSON-LD builders: Organization, Person, WebSite,
                             ProfessionalService, LocalBusiness, ContactPoint,
                             Breadcrumb, FAQ, Product, Blog, Article
```

## SEO / AEO / GEO

| Endpoint | Path |
| --- | --- |
| Sitemap | `/sitemap.xml` |
| Robots | `/robots.txt` |
| RSS feed | `/feed.xml` |
| MCP discovery | `/.well-known/mcp.json` (rewritten from `/api/mcp`) |
| JSON-LD | embedded in every page; see `lib/schema.ts` |

The robots file explicitly welcomes `GPTBot`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`,
`Perplexity-User`, `Google-Extended`, `CCBot`, `Applebot-Extended`, `meta-externalagent`,
and `Bytespider` — opting **in** to AEO/GEO indexing.

## Deploying

See [DEPLOY.md](./DEPLOY.md) for Vercel + GoDaddy DNS instructions.

## Notes

- **CSS is intentionally vanilla.** The Claude Design prototype already had a complete
  OKLCH/`color-mix()` design system; Tailwind was skipped to preserve fidelity.
- **Insights is currently a typed TS array.** Phase 2 is MDX or Notion CMS.
- **Formspree** is the form backend. Set `NEXT_PUBLIC_FORMSPREE_ID` in Vercel env vars.
- **Cal.com** booking is currently a styled mock with an outbound link. Swap in the
  embed when the real Cal.com handle is ready (`components/...` — search for `cal.com/sav`).
- **MCP discovery doc** is written against the still-evolving community pattern; see
  the comment in `app/api/mcp/route.ts` for the fields most likely to change.
