# FDE Part 1 — $100 LinkedIn ABM test

Everything below is pre-decided. Open Campaign Manager, copy these values in, and the
only judgment call left is pressing Launch. **Sav places the buy — Claude never spends.**

Budget: **$100 total** · Runs: **7 days** · Daily cap: **$14**

---

## Why this shape

$100 cannot buy reach on LinkedIn — at $80–150 CPM it is roughly 700–1,200 impressions.
It *can* buy frequency against a very small audience. So the entire design is: shrink the
audience until $100 hits the right ~200 people 4–5 times, rather than 1,200 strangers once.

Judge it on whether a target account shows up in your profile viewers. Not on impressions.

---

## Campaign Manager settings

| Field | Value |
|---|---|
| Objective | **Engagement** (not Website Visits — cheaper CPM, and the click is a comment-thread click anyway) |
| Ad format | **Thought Leader Ad** — Enso Labs page boosts Sav's personal post |
| Schedule | 7 days, start Mon, end Sun |
| Budget type | Daily, **$14.00** |
| Bidding | **Maximum delivery** (automated). Do not hand-set bids at this spend — you have no historical data to bid against |
| Frequency | Leave default; the audience is small enough that frequency accrues on its own |
| Audience expansion | **OFF** — this is the single most important toggle. On, LinkedIn spends your $100 on lookalikes and the ABM test is worthless |
| LinkedIn Audience Network | **OFF** |

---

## Audience

**Step 1 — upload the company list.**
`abm-company-list.csv` (this folder). Campaign Manager → Audiences → Create audience →
Company list → upload. Matching takes 24–48h, so upload it **the day before** you launch.

**Step 2 — layer job function + seniority on top.**

| Filter | Value |
|---|---|
| Location | United States (permanent residents + recent visitors OFF) |
| Company | *the uploaded list* |
| Job function | Information Technology · Engineering · Product Management · Marketing |
| Seniority | Director · VP · CXO · Owner |
| Exclude | Current company = Enso Labs; job function = Human Resources |

**On the 300-member minimum:** 20 companies filtered to Director+ may land under LinkedIn's
floor. If it does, widen in this order — **do not** widen by adding junior titles:

1. Add Manager seniority (still budget-holders' direct reports)
2. Add company size 1,001–10,000 + industry Financial Services, US, as a second audience
3. Only then broaden geography beyond the US

---

## Creative

- **Post to boost:** the organic document post carrying `carousel.pdf`
- **Alternative creative** if you'd rather run video: `boost-video-4x5.mp4` (16s, 1080×1350, silent-first)
- **Destination URL — paste exactly:**

```
https://ensolabs.ai/insights/forward-deployed-strategist-agency-lineage?utm_source=linkedin&utm_medium=paid&utm_campaign=fde_part1&utm_content=abm_thoughtleader
```

If you run the video creative instead, swap the last parameter to `utm_content=abm_video`
so the two are separable in GA4.

---

## Reading it

Day 3 checkpoint, then final on day 8. In priority order:

| Signal | Where | Meaning |
|---|---|---|
| A target-account name in profile viewers | LinkedIn → Who viewed your profile | **The result.** One name from the list = the test worked |
| `booking_intent` / `production_gap_review_click` | GA4 events filtered to `fde_part1` | Real intent, already instrumented |
| Sessions by `utm_content` | GA4 → Traffic acquisition | Tells you which asset earns the next $100 |
| CPM / impressions | Campaign Manager | Vanity at this spend. Read last. Decide nothing on it |

**Kill criteria:** if by day 3 spend is pacing but the audience is under 400 members, pause.
That means match rate was poor and you are paying to reach the wrong people.

---

## Hard stops

Claude does not place the buy, enter payment details, submit the campaign, or send any
connection request or InMail to the people on this list. Those are Sav's, every time.
