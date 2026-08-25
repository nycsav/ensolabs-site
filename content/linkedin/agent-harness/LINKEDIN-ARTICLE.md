# LinkedIn Article — abridged native version

**Headline:** Build an Agent Harness: The 4 Inputs That Get AI Agents Into Production

**Cover image:** `carousel-slides/01.png` (coral cover) — LinkedIn articles crop to 16:9, so upload `og-agent-harness-inputs-outputs-v3.png` if you prefer the bridge.

**Publish as:** LinkedIn Article (not a post). Link to the full piece at the end, not the top — LinkedIn suppresses early outbound links.

---

Nine in ten AI agents never leave the pilot.

Deloitte's Tech Trends 2026 puts 38% of organizations piloting agents and just 11% running one in production. Gartner still expects more than 40% of agentic projects to be cancelled outright by 2027.

The interesting part isn't the failure rate. It's what leaders blame when you ask them.

Not model quality. They name evaluation gaps, governance friction, and reliability — in that order. Every one of those is a harness problem. And every harness problem traces back to an input nobody wrote down before the build started.

## What a harness actually is

An agent harness is everything in an agent that is not the model: prompt construction, tools, memory, permission boundaries, validators, and the loop that decides whether any of it worked.

It's also where every deliverable a strategist has ever produced goes to become executable.

In Part 1 of this series I argued the scarce half of forward deployment isn't the engineering — it's the *forward*. Reading a business, defining what a system is for, and getting an organization to adopt it. This is the follow-through: what that seat actually hands over.

## The four inputs

Brand, digital, CX and data strategy produce the same four artefacts on repeat. In an agentic system, none of them are background documents. Each is a component with a slot.

**The brief** becomes the system prompt and the permission boundary. What this agent is for, and what it may never say or do.

**The journey map** becomes the tool allowlist and the escalation gate. Where the agent acts unattended, and where a human takes the wheel.

**The measurement plan** becomes the eval harness and its golden-set CI gates. If it can't be measured on a golden set, it isn't a metric — it's a hope.

**The segmentation** becomes the retrieval strategy and the recall target.

Journey mapping was always a measurement discipline wearing a design costume. You weren't documenting where customers went. You were documenting where value was created, where it leaked, and which decision at which moment would have changed the outcome.

Those are precisely the decisions an agent has to encode.

## The part that should end the model debate

Microsoft published a paper in May that I keep coming back to.

They held the model constant. They changed only how the system was allowed to look for evidence — giving it search, open and summarize tools instead of one-shot retrieval.

BRIGHT recall@1 went from a 27.8% embedding baseline to 49.6%. On FinanceBench, 92% answer correctness — within two points of being handed the correct evidence outright.

Same model. Different harness.

Read that as a strategy result, not an engineering one. The gain came from a retrieval-strategy decision made upstream, by whoever defined what "relevant" means for that business. The corpus is the variable you actually control.

## In regulated builds, this stops being optional

Every tier picks up an obligation. Audit trails and encryption on the runtime. NIST AI RMF, or FDA and MLR review, governing the tool list and the retrievable corpus. Human approval before anything irreversible.

The escalation rule stops being a design preference. It becomes the control an auditor asks to see.

We build this way because we've had to. For a Fortune 500 manufacturer, we encoded a lead scientist's relevance rules — what counts as a real commercial signal, what's noise — before a single pipeline stage was written. For a pharma AI Center of Excellence, the claims and governance layer came first and the agents were built inside it.

Same sequence both times. It's the only part worth copying: specify the inputs, then build the system to satisfy them.

Reverse the order and you join the 89%.

## Three things to do this week

**Write the escalation rule before the architecture.** If nobody can say where the agent stops and a human starts, it isn't scoped — it's a demo with a roadmap.

**Name the one number that would prove it worked**, and put it in the eval harness on day one.

**Audit your corpus before you shop for models.** Retrieval strategy moved that benchmark more than model choice did.

---

This is Part 2 of The Forward Deployed Strategist. Next: the economics — who staffs this seat, what it costs, and why the pricing model that built the agency business doesn't survive contact with agentic delivery.

Full version, with the animated data blocks and the complete source list:
https://ensolabs.ai/insights/agent-harness-inputs-outputs?utm_source=linkedin&utm_medium=social&utm_campaign=fds-part2&utm_content=article

*Powered by Enso Labs*
