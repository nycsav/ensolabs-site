# Run + publish — Claude Code handoff

Everything below runs locally. No Cowork dependency.

## Re-render the carousel (visual version)

```bash
cd ~/Projects/ensolabs-site
node scripts/render-geo-carousel.js
```

Outputs to `out/carousels/agent-harness/`:
- `carousel.pdf` — 10 pages, 1080×1350 → **LinkedIn document post**
- `carousel-slides/01..10.png` — → **LinkedIn native image carousel**
- `carousel-cover.png` — cover frame

Edit copy or slides directly in `scripts/render-geo-carousel.js` (slide builders `s01`–`s10`), then re-run. Roughly 20 seconds.

## Re-render the article figures

```bash
node scripts/generate-p2-geo-figures.js   # crossing / spec / benchmark (GIF + MP4)
node scripts/generate-geo-bridge.js       # Golden Gate line icon
node scripts/generate-geo-bridge-og.js    # OG card + 1080² animated social asset
```

## Deploy

```bash
git add -A && git commit -m "..." && git push origin master
```

Vercel auto-deploys. Verify externally, never from a preview:

```bash
curl -s https://ensolabs.ai/insights/agent-harness-inputs-outputs | grep -o '<title>[^<]*'
```

## Publish checklist

1. **Post the carousel** — upload `carousel.pdf` as a document post, or the 10 PNGs as a native image carousel.
2. **Copy** — `LINKEDIN-POST.md` (two cuts) or `LINKEDIN-ARTICLE.md` (native long-form).
3. **Use the UTM link.** Last boost drove +66% users but 109 of 130 sessions landed as `(direct)/(none)` — untagged, so unattributable.
   ```
   https://ensolabs.ai/insights/agent-harness-inputs-outputs?utm_source=linkedin&utm_medium=paid-social&utm_campaign=fds-part2-boost&utm_content=carousel
   ```
4. **Animated bridge** — `public/images/insights/geo-bridge-social.gif`, upload via the **photo** button (not video) so it animates.
5. **Boost** in Campaign Manager.

## Targeting data for the boost

From the Aug 24 GA4 digest (week of the last boost):

| Metric | Value |
|---|---|
| Active users | 168 (↑66.3% WoW) |
| Sessions | 130 (↑64.6%) |
| Pageviews | 166 (↑90.8%) |
| Part 1 engaged reads | 8 |
| Form funnel | 2 starts → 2 submits (both spam) |
| Booking intent | **0 clicks** |
| `perplexity_partner` | **0 sessions** |

Two standing issues: the booking-intent event fires 0 against 11 `generate_lead` events (looks broken, not unpopular), and the `perplexity_partner` UTM has never recorded a session.

LinkedIn-side numbers aren't in GA4 — pull impressions, ICP follower mix and best-post from LinkedIn analytics and log them in the Notion weekly metrics table before setting targeting.
