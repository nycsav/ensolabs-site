# LinkedIn Post — Notion Hackathon Career Agent (May 19, 2026)

## Post Copy

This weekend at Notion HQ we built a career intelligence agent in 24 hours — 5 tools, 487 lines of TypeScript, a full pipeline from job scanning to AI-tailored resumes.

The architecture:

→ scanJobs: parses LinkedIn notifications, scores every role 0-100 against your profile using Claude
→ tailorResume: generates ATS-optimized resume + cover letter matched to specific listings
→ configureAgent: copilot, autopilot, or autonomous mode — you set your risk tolerance
→ Source-tier ranking: a Tier 1 referral at 60 match score beats a Tier 5 cold apply at 85

We used two Claude models deliberately. Haiku for speed-sensitive scoring. Sonnet for high-stakes resume generation. Match model capability to task criticality.

The whole thing runs on Notion Workers — no servers, no infra, deployed from a CLI. This is the same pattern we apply to every enterprise AI engagement at Enso Labs: decompose the workflow, insert AI where it creates the most leverage, keep humans in the loop where judgment matters.

GitHub: github.com/nycsav/notion-career-agent
Full writeup: ensolabs.ai/insights/notion-hackathon-agent-distribution-problem

#AI #AgenticAI #NotionAPI #ClaudeAI #CareerTech #EnterpriseAI

## Link to Include
https://ensolabs.ai/insights/notion-hackathon-agent-distribution-problem

## Photos to Attach
- Notion Hackathon photos (from camera roll)
- Building at Notion HQ / team photos
- Architecture diagram (optional — can screenshot from GitHub README)
