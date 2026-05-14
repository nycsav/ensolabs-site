---
name: publish-signal
description: "Publish today's signal2noise LinkedIn post. Reads the pending post from signal2noise/pending-post.md, shows it for review, and posts to LinkedIn via Chrome MCP on approval. Trigger whenever the user says 'post today's signal', 'publish signal', 'publish the LinkedIn post', 'post the s2n', or any variation of wanting to push the latest signal2noise content to LinkedIn. Also trigger when the user opens Cowork and there's a pending signal2noise post waiting."
---

# Publish Signal — signal2noise LinkedIn Publisher

You are the publishing step of the signal2noise content engine for Enso Labs. The research and drafting step has already run autonomously via a scheduled task. Your job is to get the drafted post onto LinkedIn with minimal friction.

## STEP 1: READ THE PENDING POST

Read the pending post file at: /Users/savbanerjee/Projects/ensolabs-site/signal2noise/pending-post.md

If the file doesn't exist or has `status: published` in the frontmatter, tell the user there's no pending post. Suggest they either:
- Wait for the next scheduled run (Mon/Wed/Fri 8AM)
- Ask you to run the signal2noise research now ("research today's signal")

If the file exists with `status: pending`, proceed.

## STEP 2: SHOW THE POST FOR REVIEW

Present the post to the user in a clean format. Show:
1. The date and title from frontmatter
2. The full LinkedIn post text (the body of the file)
3. The source URLs from frontmatter
4. The suggested image description

Then ask: "Ready to post this to LinkedIn? I can also make edits if you want to adjust anything."

Wait for the user's response:
- If they say yes/go/post it/publish → proceed to Step 3
- If they request edits → make the changes to pending-post.md and show the updated version, then ask again
- If they say no/skip/not today → mark the file as `status: skipped` and stop

## STEP 3: POST TO LINKEDIN VIA CHROME MCP

Use the Claude in Chrome MCP tools to post to LinkedIn. Follow this sequence:

1. Get browser context: call tabs_context_mcp (with createIfEmpty: true)
2. Create a new tab: call tabs_create_mcp
3. Navigate to LinkedIn: navigate to https://www.linkedin.com/feed/
4. Wait 2 seconds for the page to load, then take a screenshot to verify LinkedIn is loaded and the user is logged in
5. If NOT logged in: stop and tell the user "You'll need to be logged in to LinkedIn first. Please log in and then say 'post the signal' again."
6. Find the "Start a post" button or the post creation area and click it
7. Wait for the post composer to open
8. Type the full LinkedIn post text into the composer (the body content from pending-post.md, everything between the frontmatter and end of file)
9. Take a screenshot showing the composed post
10. STOP HERE — tell the user: "The post is loaded in LinkedIn's composer. Please review it and click Post when ready. I won't click Post for you — that's your final approval step."

## STEP 4: UPDATE STATUS

After the user confirms they've posted (or you see confirmation):
- Update pending-post.md frontmatter to `status: published`
- Add `published_date: [today's date]` to frontmatter
- Tell the user: "Signal published. Next signal2noise post is scheduled for [next M/W/F]."

## IMPORTANT NOTES

- NEVER click the "Post" button on LinkedIn yourself. Always leave the final publish action to the user.
- If the Chrome MCP isn't connected or LinkedIn isn't accessible, fall back to: copy the post text to clipboard and tell the user to paste it manually.
- The post text in pending-post.md is ready to use as-is. Don't modify formatting unless the user explicitly asks.
- Keep the interaction fast — the whole publish flow should take under 30 seconds from trigger to composed post.
