# Buyer-Translation Pull-Quote — Required for Every Strategy to Ship Article

## The rule
Every Strategy to Ship article published to ensolabs.ai/insights must include a "What this means for a [BUYER PERSONA]" callout box, placed after the opening section and before the body.

## Why
Peer-engaging content ≠ pipeline. Without the buyer-translation step, articles read as founder/engineer commentary (interesting to other founders/engineers, useless to a Fortune 500 transformation leader). The pull-quote is the bridge from "what I saw" → "what this means for your $50M AI roadmap."

## Template — paste into article body, second block

```markdown
> **What this means for a CTO / transformation leader**
>
> [One-sentence buyer-language translation of the headline insight]
>
> If you're [SPECIFIC BUYER CONTEXT], [SPECIFIC IMPLICATION FOR THEIR ROADMAP].
> The decision to revisit: [SPECIFIC ARCHITECTURAL / BUDGETARY / VENDOR CHOICE].
```

## Worked example — for the Part 2 article

```markdown
> **What this means for a CTO / transformation leader**
>
> Antigravity 2.0 and Managed Agents collapse the harness layer that historically separated platform companies from product companies.
>
> If you've budgeted six weeks of platform engineering for an agent harness in Q3, that line item is now a managed-service decision — not a build decision. The choice to revisit: whether your differentiation moves to data assets, distribution, or workflow embedding, because the orchestration moat just got commodified.
```

## Implementation
Until /lib/insights.ts schema supports a structured `buyerCallout` field, paste the markdown blockquote directly into the `body` array as the second item. Long-term: add a `buyerCallout: { persona, oneliner, ifThen, decisionToRevisit }` field and render via a styled `<aside>` component in /app/insights/[slug]/page.tsx.

## Where this goes in the pipeline
Strategy to Ship pick → article draft → **buyer-translation pull-quote (THIS STEP — non-negotiable)** → deploy → curl verify → Post Inspector pre-warm → LinkedIn.

If the buyer translation can't be written in <5 minutes, the signal isn't ready for an article. Park it.
