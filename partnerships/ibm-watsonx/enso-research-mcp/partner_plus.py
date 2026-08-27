"""Partner Plus Navigator — tools that make IBM Partner Plus legible.

Why this exists
---------------
The IBM Partner Plus portal has no public API. It is a Salesforce Experience
Cloud site built for humans to click through, and the answers a partner actually
needs — "what can I use today?", "why is my key rejected?", "where do I build
without credits?" — are scattered across the portal, IBM docs, and support.

We answered those questions the expensive way (hours of clicking, dead ends, and
a 401 that turned out to be a stale key rather than missing credits). This module
encodes what we learned so the next partner gets the answer in seconds.

Grounded in first-hand verification against a real Registered-tier account
(Enso Partners LLC) on 2026-07-30, plus live web search for anything current.
"""

from typing import Any

# ---------------------------------------------------------------------------
# Verified tier map. Confirmed by reading the live benefits index in the
# Partner Plus portal on 2026-07-30 with a Registered-tier account.
# ---------------------------------------------------------------------------
TIERS = ["Registered", "Silver", "Gold", "Platinum"]

BENEFITS = {
    "IBM Technology Zone": {
        "tier": "Registered",
        "cost": "free",
        "what": "On-demand environments to learn, build, demo and share IBM solutions.",
        "why_it_matters": "The fastest no-cost route to a working watsonx environment. Most partners miss this and wait on Cloud Credits instead.",
        "url": "https://techzone.ibm.com",
    },
    "Software Access Catalog (new Business Partners)": {
        "tier": "Registered",
        "cost": "free",
        "what": "20+ strategic IBM software products for non-production use — training, prototypes, demos.",
        "why_it_matters": "Covers prototype and demo work without any credit grant.",
        "url": "https://www.ibm.com/partnerplus",
    },
    "IBM Learning hub": {
        "tier": "Registered",
        "cost": "free",
        "what": "Proficiency and Practitioner Advanced badges.",
        "why_it_matters": "Badges are how you climb to Silver, which unlocks Cloud Credits.",
        "url": "https://www.ibm.com/training",
    },
    "Seismic": {
        "tier": "Registered",
        "cost": "free",
        "what": "The sales-content library IBM sellers use.",
        "why_it_matters": "Co-sell collateral without asking anyone.",
        "url": "https://www.ibm.com/partnerplus",
    },
    "Cloud Credits": {
        "tier": "Silver",
        "cost": "free at tier",
        "what": "Credits across 200+ IBM Cloud products for PoCs and solutions.",
        "why_it_matters": "THE benefit most partners chase. Locked at Registered — this is the single most common source of confusion.",
        "url": "https://www.ibm.com/partnerplus",
    },
    "Software Access Catalog (full)": {
        "tier": "Silver",
        "cost": "free at tier",
        "what": "Key IBM software including watsonx for non-production use.",
        "why_it_matters": "Broader than the Registered-tier catalog.",
        "url": "https://www.ibm.com/partnerplus",
    },
    "IBM Partner Plus Directory listing": {
        "tier": "Silver",
        "cost": "free at tier",
        "what": "Public listing with your tier, location and company overview.",
        "why_it_matters": "Inbound discovery by prospective customers.",
        "url": "https://www.ibm.com/partnerplus/directory/companies",
    },
    "Technical Assistance for Build Solutions": {
        "tier": "Silver",
        "cost": "free at tier",
        "what": "IBM technical resources to co-create your embedded solution.",
        "why_it_matters": "Real engineering help, not just docs.",
        "url": "https://www.ibm.com/partnerplus",
    },
    "Proof of Concept co-creation": {
        "tier": "Gold",
        "cost": "free at tier",
        "what": "Build a PoC, MVP or custom demo with IBM technical teams.",
        "why_it_matters": "IBM engineers on your build.",
        "url": "https://www.ibm.com/partnerplus",
    },
    "Innovation Studio access": {
        "tier": "Gold",
        "cost": "free at tier",
        "what": "Priority access to IBM innovation studios for briefings and workshops.",
        "why_it_matters": "A venue to bring your own clients.",
        "url": "https://www.ibm.com/partnerplus",
    },
}

# Build routes, ranked by how fast a partner can actually start.
BUILD_ROUTES = [
    {
        "route": "IBM Technology Zone",
        "cost": "Free",
        "needs": "IBMid login",
        "tier": "Registered",
        "verdict": "BEST — unlocked at Registered, no credits, no card, no Docker.",
        "url": "https://techzone.ibm.com",
    },
    {
        "route": "Software Access Catalog (new Business Partners)",
        "cost": "Free",
        "needs": "IBMid login",
        "tier": "Registered",
        "verdict": "Good for non-production prototypes and demos.",
        "url": "https://www.ibm.com/partnerplus",
    },
    {
        "route": "watsonx Orchestrate 30-day trial",
        "cost": "Free trial",
        "needs": "Credit card OR a sponsor feature code",
        "tier": "any",
        "verdict": "Blocked without a card or code. Ask your sponsor for the code — do not pay out of pocket on a partnership build.",
        "url": "https://cloud.ibm.com/catalog/services/watsonx-orchestrate",
    },
    {
        "route": "Local ADK Developer Edition",
        "cost": "Free",
        "needs": "Docker + Python 3.11-3.13 + entitlement key",
        "tier": "any",
        "verdict": "Full local control, heaviest setup. Needs a container runtime.",
        "url": "https://developer.watson-orchestrate.ibm.com/getting_started/installing",
    },
]

# Failure modes we actually hit, with the diagnosis that resolved each.
TROUBLESHOOTING = [
    {
        "symptom": "API key returns 401 Invalid, but the account shows credits",
        "likely_cause": "Stale or wrong-org key. Portals often hold several keys; an old one looks identical.",
        "fix": "Generate a fresh key in the correct organization and re-register. Check the org selector first.",
        "note": "Cost us a full debugging cycle. Credits were never the problem.",
    },
    {
        "symptom": "'Verify identity by Card' asks for a credit card",
        "likely_cause": "You are on the self-serve signup path, not the partner path.",
        "fix": "Click 'Register with a code' and enter the sponsor's feature code. Never enter a personal card for a partnership build.",
        "note": "A code binds to ONE account and cannot be moved — confirm the right account first.",
    },
    {
        "symptom": "Cloud Credits show Locked",
        "likely_cause": "Credits require Silver. Registered does not include them.",
        "fix": "Use Technology Zone (free at Registered) meanwhile, and earn badges toward Silver.",
        "note": "The most common Partner Plus misunderstanding.",
    },
    {
        "symptom": "Sponsor submitted a ticket but nothing changed",
        "likely_cause": "IBM-internal tickets do not copy the partner; there is nothing in your inbox to find.",
        "fix": "Ask the sponsor directly for the ticket number. Meanwhile proceed on a no-credit route.",
        "note": "Do not block the build on a queue you cannot see.",
    },
    {
        "symptom": "Signed up with a personal email, benefits missing",
        "likely_cause": "Partner benefits attach to the company IBMid, not a personal alias.",
        "fix": "Confirm which identity owns the membership before applying any code or starting a trial.",
        "note": "Mismatched identity silently produces an unentitled account.",
    },
]


def register(mcp, need, sonar_search):
    """Attach the Partner Plus tools to an MCP server.

    Args:
        mcp: the MCPServer/FastMCP instance
        need: the server's env-var accessor
        sonar_search: the server's live web-search tool, for current questions
    """

    @mcp.tool()
    async def partner_plus_benefits(tier: str = "Registered") -> dict[str, Any]:
        """List what an IBM Partner Plus tier actually unlocks, and what it does not.

        Answers "what can I use today?" — the question the portal makes hardest.
        Verified against a live Registered-tier account on 2026-07-30.

        Args:
            tier: "Registered", "Silver", "Gold", or "Platinum".

        Returns:
            dict with unlocked benefits, locked benefits, and the next unlock.
        """
        tier = tier.strip().title()
        if tier not in TIERS:
            return {"error": f"Unknown tier {tier!r}. Expected one of {TIERS}."}

        idx = TIERS.index(tier)
        unlocked, locked = {}, {}
        for name, b in BENEFITS.items():
            (unlocked if TIERS.index(b["tier"]) <= idx else locked)[name] = b

        nxt = TIERS[idx + 1] if idx + 1 < len(TIERS) else None
        return {
            "tier": tier,
            "unlocked_now": unlocked,
            "locked": locked,
            "next_tier": nxt,
            "headline": (
                f"At {tier} you already have {len(unlocked)} benefits — including "
                "IBM Technology Zone, a free on-demand environment most partners "
                "overlook while waiting on Cloud Credits."
                if tier == "Registered"
                else f"{len(unlocked)} benefits unlocked at {tier}."
            ),
        }

    @mcp.tool()
    async def partner_plus_build_route(has_sponsor_code: bool = False,
                                       has_docker: bool = False) -> dict[str, Any]:
        """Recommend the fastest route to a working IBM build environment.

        Answers "where do I actually build?" without waiting on credits.

        Args:
            has_sponsor_code: Whether a sponsor feature/credit code is in hand.
            has_docker: Whether Docker is installed locally.

        Returns:
            dict with a ranked route list and one recommendation.
        """
        routes = []
        for r in BUILD_ROUTES:
            r = dict(r)
            if r["route"].startswith("watsonx Orchestrate") and has_sponsor_code:
                r["verdict"] = "AVAILABLE — you have a sponsor code. Apply it at 'Register with a code'."
            if r["route"].startswith("Local ADK") and not has_docker:
                r["verdict"] = "BLOCKED — Docker is not installed."
            routes.append(r)

        return {
            "recommendation": "IBM Technology Zone",
            "why": "Free, unlocked at Registered tier, needs only an IBMid login — no credits, card, or Docker.",
            "routes": routes,
            "hard_stop": "Applying a code, accepting terms, and entering payment details are human-only steps.",
        }

    @mcp.tool()
    async def partner_plus_troubleshoot(symptom: str = "") -> dict[str, Any]:
        """Diagnose a common IBM Partner Plus / IBM Cloud onboarding failure.

        Each entry is a failure we hit first-hand and resolved, with the actual
        cause rather than the misleading one.

        Args:
            symptom: Free text, e.g. "401 invalid key" or "asking for a card".
                Empty returns the full list.

        Returns:
            dict with matching diagnoses.
        """
        if not symptom.strip():
            return {"all_known_issues": TROUBLESHOOTING, "count": len(TROUBLESHOOTING)}

        words = {w for w in symptom.lower().split() if len(w) > 3}
        scored = []
        for item in TROUBLESHOOTING:
            hay = (item["symptom"] + " " + item["likely_cause"]).lower()
            hits = sum(1 for w in words if w in hay)
            if hits:
                scored.append((hits, item))
        scored.sort(key=lambda x: -x[0])

        return {
            "symptom": symptom,
            "matches": [i for _, i in scored] or TROUBLESHOOTING,
            "matched": bool(scored),
        }

    @mcp.tool()
    async def partner_plus_ask(question: str) -> dict[str, Any]:
        """Answer any IBM Partner Plus question, grounded in live IBM sources.

        Use for anything the built-in tier map doesn't cover — program changes,
        requirements, incentives. Searches IBM's own domains and cites sources.

        Args:
            question: A Partner Plus question in plain English.

        Returns:
            dict with a cited answer.
        """
        r = await sonar_search(
            f"IBM Partner Plus program: {question}",
            depth="pro",
            search_recency="month",
            system_prompt=(
                "You answer questions about the IBM Partner Plus partner program. "
                "Prefer ibm.com and partnerportal.ibm.com sources. Cite every claim. "
                "If tier requirements are involved, state which tier. If you are not "
                "sure, say so rather than guessing."
            ),
        )
        return {
            "question": question,
            "answer": r["answer"],
            "citations": r["citations"],
            "note": "Live web answer. For tier benefits, partner_plus_benefits is verified first-hand.",
        }
