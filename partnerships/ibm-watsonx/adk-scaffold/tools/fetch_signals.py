"""Scout tool for Signal Lens.

Pulls candidate market signals for a topic. Ships with a bundled sample set so
the Berkeley demo is deterministic and needs no live API keys. To go live,
replace SAMPLE_SIGNALS with a real retrieval call (news/search/filings/internal
systems) — see the TODO below.
"""

from datetime import datetime, timedelta
from ibm_watsonx_orchestrate.agent_builder.tools import tool

# --- Bundled sample signals for a deterministic demo ---------------------------
SAMPLE_SIGNALS = [
    {
        "id": "s1",
        "title": "Grid-scale battery storage deployments up 34% QoQ in North America",
        "source": "Wood Mackenzie Energy Storage Monitor",
        "url": "https://example.com/woodmac-ess-q2",
        "published": "2026-07-27",
        "summary": "Utility-scale storage additions accelerated on falling cell prices and new capacity-market rules.",
        "topics": ["grid-scale battery storage", "energy storage", "BESS"],
    },
    {
        "id": "s2",
        "title": "New UL safety standard finalized for battery thermal-runaway containment",
        "source": "UL Solutions",
        "url": "https://example.com/ul-9540a-update",
        "published": "2026-07-25",
        "summary": "Updated test method tightens requirements on insulation and gas venting for large packs.",
        "topics": ["grid-scale battery storage", "battery insulation", "safety", "BESS"],
    },
    {
        "id": "s3",
        "title": "Major utility signs 2 GWh multi-year storage supply agreement",
        "source": "Reuters",
        "url": "https://example.com/reuters-utility-2gwh",
        "published": "2026-07-24",
        "summary": "Long-duration procurement signals durable demand through 2029.",
        "topics": ["grid-scale battery storage", "procurement", "BESS"],
    },
    {
        "id": "s4",
        "title": "Analyst note: cathode raw-material prices tick up 3%",
        "source": "Benchmark Minerals",
        "url": "https://example.com/benchmark-cathode",
        "published": "2026-07-22",
        "summary": "Modest input-cost pressure; limited near-term margin impact.",
        "topics": ["battery materials", "supply chain"],
    },
    {
        "id": "s5",
        "title": "Conference recap: agentic AI in industrial operations",
        "source": "Industry blog",
        "url": "https://example.com/agentic-industrial-recap",
        "published": "2026-07-10",
        "summary": "General overview, no new data.",
        "topics": ["ai", "manufacturing"],
    },
]


@tool
def fetch_signals(topic: str, lookback_days: int = 7) -> list:
    """Fetch candidate market signals for a topic within a lookback window.

    Use this first, before scoring. Returns raw, unscored signals — each a dict
    with id, title, source, url, published (YYYY-MM-DD), and summary.

    Args:
        topic: The market or theme to scan, e.g. "grid-scale battery storage".
        lookback_days: How many days back to include. Defaults to 7.

    Returns:
        A list of candidate signal dicts matching the topic and window.
    """
    topic_l = topic.lower()
    cutoff = datetime.utcnow() - timedelta(days=lookback_days)

    # TODO(live): replace this filter with a real retrieval call, e.g. a news/
    # search API, EDGAR filings, or an internal knowledge base connector.
    results = []
    for sig in SAMPLE_SIGNALS:
        try:
            pub = datetime.strptime(sig["published"], "%Y-%m-%d")
        except ValueError:
            continue
        if pub < cutoff:
            continue
        hay = (sig["title"] + " " + " ".join(sig["topics"])).lower()
        if topic_l in hay or any(topic_l in t for t in sig["topics"]):
            results.append(sig)

    return results
