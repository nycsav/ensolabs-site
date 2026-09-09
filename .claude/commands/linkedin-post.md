---
description: Full LinkedIn post publish checklist — UTM generation, OG pre-warm, calendar holds, performance log entry. Run after carousel is rendered and ready to post.
argument-hint: "[content slug, e.g. s2s-36pt-gap] (default: most recent folder in content/linkedin/)"
model: sonnet
---

You are running the **Enso Labs LinkedIn Publish Checklist**. This automates every post-publish step that was previously done manually (or skipped). Run after the carousel assets are in `content/linkedin/<slug>/UPLOAD-TO-LINKEDIN/` and before or immediately after posting to LinkedIn.

Slug = `$ARGUMENTS` (if empty, pick the most recently modified folder under `content/linkedin/`, excluding any folder named `.DS_Store` or `LINKEDIN-API-APPLICATION.md`).

Work autonomously. All steps below run in sequence. Never skip a step — the value of this command is that the full checklist runs every time, not just when remembered.

---

## STEP 1 — Resolve the slug and read the post file

```bash
# If no argument, find the newest slug
ls -td content/linkedin/*/  | grep -v DS_Store | head -1
```

Read `content/linkedin/<slug>/LINKEDIN-POST.md`. Extract:
- `ARTICLE_URL`: the canonical ensolabs.ai URL for this piece (look for `ensolabs.ai/insights/...` in the file)
- `CAMPAIGN_NAME`: derive from slug (e.g. `s2s-36pt-gap` → campaign `s2s-36pt-gap`)
- `POST_DATE`: today's date in YYYY-MM-DD

If the post file already has UTM links, confirm they match the schema below. If not, generate them.

---

## STEP 2 — Generate and write UTM links

Generate two tracked URLs and write them back into `content/linkedin/<slug>/LINKEDIN-POST.md` under a `## Tracked links` section (replace if it already exists):

```
Organic post:
https://<ARTICLE_URL>?utm_source=linkedin&utm_medium=organic&utm_campaign=<CAMPAIGN_NAME>&utm_content=carousel

Boosted post:
https://<ARTICLE_URL>?utm_source=linkedin&utm_medium=paid-social&utm_campaign=<CAMPAIGN_NAME>-boost&utm_content=carousel
```

Run the Node.js helper to do this and update the performance log:
```bash
node scripts/linkedin-checklist.js <slug> "<ARTICLE_URL>" "<POST_DATE>"
```

---

## STEP 3 — LinkedIn Post Inspector (OG pre-warm)

**This must run BEFORE the post goes live if the article is new, or before the first LinkedIn share if it's been updated.**

Use Claude in Chrome to navigate to:
```
https://www.linkedin.com/post-inspector/inspect/https%3A%2F%2Fensolabs.ai%2Finsights%2F<slug>
```

Wait for the inspector to load and confirm:
- The OG image shown is the per-article image (NOT `og-default.png`)
- The title and description match the article
- No "image could not be fetched" error

If the OG image is wrong, stop and tell Sav before proceeding — the post will share with the wrong image.

Log result to the performance log entry for this slug.

---

## STEP 4 — Google Calendar holds (via enso-google)

Create two timed calendar events on the `sav@ensopartners.co` calendar using the enso-google MCP:

**Event 1: 24-hour check**
- Title: `📊 LinkedIn check (24h): <slug>`
- Date: Tomorrow at 9:00 AM ET
- Duration: 15 minutes
- Description: `Check creator analytics: impressions, engagement rate, profile views. UTM traffic in GA4: utm_campaign=<CAMPAIGN_NAME>. Post: linkedin.com/in/savbanerjee (Recent Activity)`
- Color: banana (colorId 5)

**Event 2: 7-day boost review**
- Title: `🚀 LinkedIn boost review (7d): <slug>`
- Date: 7 days from today at 9:00 AM ET
- Duration: 15 minutes
- Description: `Boost decision window: pull 7d impressions, profile views, followers. If >500 impressions + >5 profile views: boost with corrected targeting (Director+, 201+ employees, exclude Advertising Services, $50-75 budget). Campaign Manager: linkedin.com/campaignmanager/accounts — ID 510047438. UTM for boost: utm_medium=paid-social&utm_campaign=<CAMPAIGN_NAME>-boost`
- Color: banana (colorId 5)

Dedupe first — search calendar for existing events with the same title before creating.

---

## STEP 5 — Boost audience spec (staged for Campaign Manager)

Append to `content/PERFORMANCE-LOG.md` a boost audience spec block for this post:

```
**Audience spec (paste into Campaign Manager when boosting):**
- Seniority: Director, VP, C-Suite, Partner, Owner
- Company size: 201–5,000 employees
- Industries: Financial Services, Pharmaceuticals, Manufacturing, Retail, Consumer Goods, Technology
- Exclude industries: Advertising Services, Marketing & Advertising (1–50 employees)
- Geography: United States
- Budget: $50–75 / 7 days
- Objective: Engagement (not Brand Awareness)
- URL: [boosted UTM link from Step 2]
```

---

## STEP 6 — Output checklist confirmation

Print a clean summary:

```
✅ LINKEDIN PUBLISH CHECKLIST — <slug> — <POST_DATE>

[✓] UTM links written to LINKEDIN-POST.md
[✓] Post Inspector: OG image confirmed / ISSUE: [describe if any]
[✓] Calendar: 24h check created for <date> 9am ET
[✓] Calendar: 7d boost review created for <date> 9am ET
[✓] Performance log updated: content/PERFORMANCE-LOG.md
[✓] Boost audience spec staged

NEXT: Post the carousel to LinkedIn (Claude Code — file upload required).
      Paste ORGANIC tracked link in post body (not comments).
      On boost day: open Campaign Manager → paste audience spec above.
```

---

## Hard stops (never do these)
- Never submit or launch a Campaign Manager boost — audience setup only
- Never post to LinkedIn directly — file upload requires Sav's action
- Never skip the Post Inspector step if the article is new or recently updated
