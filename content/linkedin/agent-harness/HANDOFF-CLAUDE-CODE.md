# Claude Code handoff — Strategy → Ship distribution engine

Paste the block under **PROMPT** into Claude Code from `~/Projects/strategy-to-ship-content-ops`.

---

## First, the honest state of the engine

I searched every repo. Here is what exists and what does not.

| Channel | Publisher | Status |
|---|---|---|
| X / Twitter | `tools/x_poster.py` | **Real.** Uses `X_API_KEY` / `X_API_SECRET` / `X_ACCESS_TOKEN` / `X_ACCESS_SECRET`. Uploads media. Posts. |
| LinkedIn | — | **Does not exist.** No script, no credentials, no `w_member_social` token anywhere on disk. |
| Website | `ensolabs-site` + Vercel | **Real.** git push → auto-deploy. |

**There is no LinkedIn publishing engine and there never was one.** Two reasons, both real:

1. **By design.** `CLAUDE.md` §1.1 of this engine: *"Steps 1–5 run automatically. Step 6 is gated. Nothing is posted... until the human approves that piece."* Every LinkedIn agent in every repo ends with "Never post — drafts only." The approval queue was the intended terminus.
2. **By constraint.** Programmatic LinkedIn posting requires an approved **Marketing Developer Platform** app with the `w_member_social` scope. That is an application to LinkedIn, not a config change. Without it there is no API path — for Claude Code, Cowork, or any other tool.

So `GO-LIVE.html` is not a workaround. It **is** the publishing surface this engine was built to produce: every asset rendered, every string one click from the clipboard, composer links open in order.

## To actually automate LinkedIn

One prerequisite, then it is a small build:

1. Apply for LinkedIn **Marketing Developer Platform** access (Community Management API, `w_member_social`).
2. On approval, add `LINKEDIN_ACCESS_TOKEN` + `LINKEDIN_MEMBER_URN` to the environment.
3. Build `tools/linkedin_poster.py` mirroring `x_poster.py` — register upload → PUT asset → create `ugcPost`. Document posts (PDF carousels) use the same asset flow with a document media type.

Until step 1 clears, the click is yours.

---

## PROMPT — paste into Claude Code

```
You are operating the Strategy → Ship engine from ~/Projects/strategy-to-ship-content-ops.
Read CLAUDE.md fully first. The approval gate in §1.1 is absolute.

CONTEXT
Part 2 of The Forward Deployed Strategist is live and its distribution pack is
built and committed:

  Article (live, verified):
    https://ensolabs.ai/insights/agent-harness-inputs-outputs
    Title: "Build an Agent Harness: 4 Inputs That Get AI Agents Into Production"

  Pack: out/packs/agent-harness-inputs-outputs/
    GO-LIVE.html            one-click copy surface for every channel
    POST-CHECKLIST.md       status, fact check, brand compliance, open items
    carousel.pdf            10pp 1080x1350 — document post
    carousel-slides/*.png   10 static slides — native image carousel
    carousel-slides/*.gif   7 animated slides
    carousel-animated.mp4   ~30s native video of the full deck
    linkedin-article.md     native article (Pulse)
    linkedin.md             text post copy, two cuts, UTM-tagged
    linkedin-share.png      OG / share card (Golden Gate line icon)
    geo-bridge-social.gif   1080x1080 animated, photo-button upload

  Render scripts live in ~/Projects/ensolabs-site/scripts/:
    render-geo-carousel.js     static deck (PDF + PNGs)
    render-carousel-video.js   animated deck (MP4 + per-slide GIFs)
    generate-p2-geo-figures.js article figures
    generate-geo-bridge*.js    bridge icon + OG card
    _sts-geo.js / _sts-glyphs.js  shared primitives

TASKS
1. Verify the article is still live from OUTSIDE the app:
     curl -s https://ensolabs.ai/insights/agent-harness-inputs-outputs | grep -o '<title>[^<]*'
   Confirm the og:image resolves to og-agent-harness-inputs-outputs-v3.png.

2. Open out/packs/agent-harness-inputs-outputs/GO-LIVE.html and walk me through
   posting in this order: carousel first, native article second, animated bridge
   midweek. Wait for my explicit go on each piece — do not batch-approve.

3. After each piece goes live, append a row to memory/published-log.jsonl.

4. Do NOT post, schedule, or boost anything yourself. Prepare and hand me the click.

STANDING ISSUES TO RAISE, NOT SILENTLY FIX
- llms.txt line 22 and ~14 other locations still carry "75% pilot-to-production"
  and "3-month time-to-first-value". Kept out of Part 2. Sitewide scrub is my call.
- Part 1's body is first-person ("I"), which breaks the studio-voice rule.
- ensolabs-site PR #54 (full-bleed article figures) is still open. Merging it makes
  every figure roughly 2x larger for anyone arriving from the boost.
- Booking-intent GA4 event fired 0 clicks against 11 generate_lead events last week.
  Likely broken instrumentation, not disinterest. Worth a look before the boost.

WANT TO AUTOMATE LINKEDIN PROPERLY
Draft the LinkedIn Marketing Developer Platform application, then build
tools/linkedin_poster.py mirroring tools/x_poster.py (register upload -> PUT asset
-> create ugcPost, with the document media type for PDF carousels).
```

---

## Boost targeting — from the Aug 24 GA4 digest

| Metric | Value |
|---|---|
| Active users | 168 (↑66.3% WoW) |
| Sessions | 130 (↑64.6%) |
| Pageviews | 166 (↑90.8%) |
| Part 1 engaged reads | 8 |
| Form funnel | 2 starts → 2 submits (both VA spam) |
| Booking intent | **0 clicks** |
| `perplexity_partner` | **0 sessions** |

**109 of 130 sessions landed as `(direct)/(none)`** — the last boost was untagged, so its lift is unattributable. Use the paid UTM this time:

```
https://ensolabs.ai/insights/agent-harness-inputs-outputs?utm_source=linkedin&utm_medium=paid-social&utm_campaign=fds-part2-boost&utm_content=carousel
```

LinkedIn-side numbers (impressions, ICP follower mix, best post) are not in GA4 and have no API — pull them from LinkedIn analytics and log them in the Notion weekly metrics table before setting targeting.
