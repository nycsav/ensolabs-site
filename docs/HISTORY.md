# Enso Labs — Project History & Session Logs

Archived from CLAUDE.md (2026-07-27, token-lean program): CLAUDE.md loads into every
Claude session and scheduled run, so historical logs live here instead. Append new
session logs to this file — do not add them back to CLAUDE.md.

## Session Log — 2026-08-26 (Wed SEO Audit)
### Completed
- Full-scan all 22 articles in lib/insights.ts: all have `faqs` arrays ✅, all dateModified within threshold
- **⚡ Fixed**: `berkeley-agentic-summit-demand-side-gap` dateModified '2026-07-28' → '2026-08-26' (was hitting 30-day threshold tomorrow)
- **Updated**: `app/work/[slug]/page.tsx` dateModified '2026-08-05' → '2026-08-26' (all 4 case studies)
- **Updated**: `app/services/claude-managed-services/page.tsx` article:modified_time '2026-08-05' → '2026-08-26'
- **Updated**: `app/editorial-policy/page.tsx` article:modified_time '2026-08-05' → '2026-08-26'
- Confirmed llms.txt is current (all 22 articles, Recent Coverage complete) — no changes needed
- Wednesday pages audited: /services/claude-managed-services ✅, /work/gore (ai-market-intelligence) ✅, /work/heller ✅, /editorial-policy ✅
- Vercel production: READY (deployed today)
- Commit: dce247b pushed to master → Vercel auto-deploy triggered
### Search Gap (SERP)
- "principal-led AI consulting" — not ranking; competitor principalai.co appears. Long-term content/authority play.
- "Google I/O after hours strategy" — article not yet surfacing. Freshness/authority issue; dateModified now updated to 2026-08-24 (done prior run).
### Blockers
- Bash sandbox unavailable (RPC useradd error) — used Desktop Commander for git push. Voice lint skipped (node not runnable).

## Session Log — May 7-8, 2026
### Completed
- Google Search Console verified for ensolabs.ai
- Sitemap submitted: https://ensolabs.ai/sitemap.xml (22 URLs)
- Old Wix URL removals requested for www.ensolabs.ai/*
- Home page indexing requested in GSC
- IndexNow submitted (13 URLs, 202 Accepted)
- Old Wix ensolabs.ai site unpublished
- Old Wix ensopartners.co site unpublished
- Vercel redirect configured: ensopartners.co → ensolabs.ai (308)
- All 15 pages live (including built-with-ai, financial-services, editorial-policy, claude-managed-services)
- All 12 SEO files live (llms.txt, security.txt, IndexNow, MCP endpoint, etc.)
- Entity disambiguation schemas (foundingDate 2020, sameAs, knowsAbout)
- OG image branded and working in iMessage/social sharing
- GA4 connected (G-5N15QMQ962)
- GitHub portfolio — 5 public repos with professional READMEs
- Resume updated (Sav_Banerjee_Resume_2026_FINAL.docx in Google Drive)
- Perplexity job tracker master prompt saved to Google Drive
### Pending (immediate)
- Renew ensolabs.ai domain at GoDaddy (expires June 5, 2026)
- LinkedIn profile update (copy ready in Google Drive)
- Strategy to Ship SEO fixes (PlannerAPI repo)
### Pending (backlog — not yet started)
- Create /services/agentic-ai-consulting page
- Create /services/claude-agent-development page
- Create /locations/new-york page
- Create /about/sav-banerjee deep bio page
- Create /comparisons/boutique-vs-big-4 page
- Fix Strategy to Ship canonical URLs, OG image, robots.txt, sitemap

## Session Log — May 16, 2026
### Completed
- Notion Developer Platform Hackathon prep (May 16-17, Notion HQ SF)
- signal2noise-notion-hackathon repo created (github.com/nycsav/signal2noise-notion-hackathon)
- askSignal2Noise agent tool built for Notion Workers (Perplexity + Claude pipeline)
- ensolabs-site .gitignore cleaned — resumes, cover letters, personal files excluded
- Notion workspace updated — Strategy to Ship HQ page polished with architecture, links, status
- CLAUDE.md synced — added missing pages, components, libraries
### Active
- Notion Hackathon build (May 16-17): porting Strategy to Ship to Notion Developer Platform
- Worker deployment: askSignal2Noise tool + database sync pending first successful deploy
