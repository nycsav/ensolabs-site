# LinkedIn Post — Notion Career Agent (May 2026)

## Post Copy

We built a career intelligence agent at the first Notion Developer Platform Hackathon — 5 Notion Worker tools, 487 lines of TypeScript, shipped in 24 hours at Notion HQ during SF AI Week.

The architecture:

→ scanJobs: parses LinkedIn notifications, scores every role 0-100 against your profile using Claude Haiku
→ tailorResume: generates ATS-optimized resume + cover letter with Claude Sonnet — model matched to task criticality
→ configureAgent: copilot, autopilot, or autonomous mode — you set your risk tolerance
→ Source-tier ranking: a Tier 1 referral at 60 match score beats a Tier 5 cold apply at 85

Three things we proved building on Notion Workers:

1. Speed to deployment — zero to five deployed tools in under 24 hours. The Notion CLI and SDK handle the heavy lifting.
2. Notion MCP changes the integration model — every job, resume, and status update stored as structured Notion pages, instantly accessible to any MCP-compatible agent.
3. Design patterns transfer — we ported intelligence patterns from Strategy to Ship (our market intelligence platform) to Notion Workers in hours, not weeks.

This is the same pattern we apply at Enso Labs across every enterprise engagement: decompose the workflow, insert AI where it creates the most leverage, keep humans in the loop where judgment matters.

Full writeup + architecture deep dive: ensolabs.ai/insights/notion-career-agent-open-source-hackathon
GitHub: github.com/nycsav/notion-career-agent

#NotionAI #NotionDeveloperPlatform #NotionWorkers #AgenticAI #ClaudeAI #MCP #CareerTech #EnterpriseAI #SFAIWeek

## Link to Include
https://ensolabs.ai/insights/notion-career-agent-open-source-hackathon

## Photos to Attach
- notion-hackathon-01.jpg — "Welcome hackers" sign (Anthropic, Vercel, OpenAI sponsors)
- notion-hackathon-02.jpg — Notion Hackathon title screen
- notion-hackathon-05.jpg — Presenters at Notion HQ
- (Optional) notion-hackathon-03.jpg — Wide shot of hackathon space
