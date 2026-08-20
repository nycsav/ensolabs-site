# UTM Registry — Enso Labs

**Single source of truth for campaign tagging. Read this before creating any link that leaves ensolabs.ai and comes back.**

Created 2026-08-20. Owner: Sav. Update this file when a new campaign starts — do not invent tags ad hoc.

---

## Why this file exists

The tracking plumbing has been built and working for months:

| Piece | Where | What it does |
|---|---|---|
| Landing capture | `lib/attribution.ts` | Reads `utm_*` on first touch, persists across the session |
| Builder UI | `components/UtmBuilder.tsx` | Generates tagged links |
| Form capture | `components/ContactForm.tsx` → `app/api/leads/route.ts` | Writes `utm_source/medium/campaign` onto every lead record |
| Behavior events | `components/Behavior.tsx`, `app/api/track/route.ts` | Server-side GA4 forwarding — survives ad-blockers |

**The gap was never the code. It was that no tagged link had ever been published.** The GA4 digest for week of Aug 17 reported: *"No UTM campaign traffic recorded yet (only default campaign buckets returned)"* and `perplexity_partner: 0 sessions`. Every share to date has landed in `(direct)/(none)`, which is why 69 of 83 sessions are unattributable.

---

## The convention

```
utm_source    = the platform            linkedin · x · email · newsletter · perplexity · github
utm_medium    = how it was distributed  social · paid · dm · signature · referral · profile
utm_campaign  = THE ARTICLE or push     fde_part1 · fde_part2 · perplexity_partner
utm_content   = THE PLACEMENT           carousel · boost_video · post_organic · abm_<company>
```

**The one rule that makes this useful:** `utm_campaign` is the *article*, `utm_content` is the *placement*.

That lets you answer both questions that decide where a shoestring budget goes:
- *Which article earns the next $100?* → compare `utm_campaign` values
- *Which asset did the work?* → compare `utm_content` within one campaign

Lowercase, underscores, no spaces. Never tag an internal link — it resets attribution and erases the original source.

---

## Live campaign: FDE Part 1

Base URL: `https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage`

### Organic

**Personal post (main link):**
```
https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage?utm_source=linkedin&utm_medium=social&utm_campaign=fde_part1&utm_content=post_organic
```

**First comment (where the link should actually live — LinkedIn suppresses in-post outbound links):**
```
https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage?utm_source=linkedin&utm_medium=social&utm_campaign=fde_part1&utm_content=first_comment
```

**Carousel PDF post:**
```
https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage?utm_source=linkedin&utm_medium=social&utm_campaign=fde_part1&utm_content=carousel
```

**Enso Labs company page repost:**
```
https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage?utm_source=linkedin&utm_medium=social&utm_campaign=fde_part1&utm_content=company_page
```

### Paid — the $100 ABM test

**Thought Leader Ad (company page boosting the personal post):**
```
https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage?utm_source=linkedin&utm_medium=paid&utm_campaign=fde_part1&utm_content=abm_thoughtleader
```

**Boost video creative:**
```
https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage?utm_source=linkedin&utm_medium=paid&utm_campaign=fde_part1&utm_content=abm_video
```

### Per-account links — Tier A only

For the five accounts with a live dated signal, tag the DM/connection-note link per company. This is the whole point of ABM: you find out *which named account* actually read it, not just that "someone in fintech" did.

```
…?utm_source=linkedin&utm_medium=dm&utm_campaign=fde_part1&utm_content=abm_credit_acceptance
…?utm_source=linkedin&utm_medium=dm&utm_campaign=fde_part1&utm_content=abm_janus_henderson
…?utm_source=linkedin&utm_medium=dm&utm_campaign=fde_part1&utm_content=abm_betanxt
…?utm_source=linkedin&utm_medium=dm&utm_campaign=fde_part1&utm_content=abm_synchrony
…?utm_source=linkedin&utm_medium=dm&utm_campaign=fde_part1&utm_content=abm_associated_bank
```

### Always-on

**Email signature** (`EMAIL_SIGNATURE.md` — the ensolabs.ai anchor):
```
https://ensolabs.ai/?utm_source=email&utm_medium=signature&utm_campaign=always_on&utm_content=sig
```

**LinkedIn profile Featured section:**
```
https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage?utm_source=linkedin&utm_medium=profile&utm_campaign=fde_part1&utm_content=featured
```

---

## Backlog fix: the Perplexity partnership

`perplexity_partner` has reported **0 sessions, 0 form_submit, 0 booking_intent** in every digest since it was created — because the campaign exists in the reporting layer but no tagged link was ever published pointing at it.

Put this in the profile Featured section and the signature to make the partnership visible to attribution:
```
https://ensolabs.ai/insights/enso-labs-perplexity-implementation-partner?utm_source=linkedin&utm_medium=profile&utm_campaign=perplexity_partner&utm_content=featured
```

---

## Reading the results

GA4 → Reports → Acquisition → Traffic acquisition, then set the primary dimension to **Session campaign** and add **Session manual ad content** as secondary.

Judge the $100 test on these, in order:

| Signal | Where | Why it ranks here |
|---|---|---|
| A Tier A account appears in LinkedIn profile viewers | LinkedIn → Who viewed your profile | The only outcome that matters on an ABM test of this size |
| `booking_intent` or `production_gap_review_click` events | GA4 events, filtered to `fde_part1` | Real intent, already instrumented |
| Sessions by `utm_content` | GA4 | Tells you whether carousel or video earns the next budget |
| Raw impressions / CPM | LinkedIn Campaign Manager | Vanity at this spend level — read last, decide nothing on it |

At $100, a "successful" test is single-digit clicks from the right five companies. Do not judge it on volume.

---

## Rules for Parts 2–4

1. New article = new `utm_campaign` (`fde_part2`, `fde_part3`, `fde_part4`). Keep `utm_content` values identical across parts so placement performance is comparable.
2. Add the campaign to this file **before** the first share.
3. Pre-warm the OG through LinkedIn Post Inspector before the first share — the tagged URL and the clean URL cache separately, so inspect the **clean** canonical URL.
4. Never spend on a part until the previous part's `utm_content` numbers have been read. On a shoestring, sequence beats spread.
