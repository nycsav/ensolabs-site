"""Curate tool for Signal Lens.

Scores one signal 1-10 on four axes and returns the average plus a short
rationale. This is the Enso "strategic lens" — the same rubric behind the
Fortune 500 manufacturer deployment. Axis weights are tuned per client; the
defaults here are equal-weight.
"""

import re

from ibm_watsonx_orchestrate.agent_builder.tools import tool

# Transparent, domain-AGNOSTIC heuristics so the same lens works for any market
# (battery storage, agentic AI, financial services...). Relevance is derived
# from the caller's lens rather than a hardcoded vocabulary — an earlier version
# hardcoded battery-storage terms and scored every AI signal a flat 4.0.
# In production these axes become model- and data-driven.
_STOPWORDS = {
    "the", "a", "an", "and", "or", "of", "for", "in", "on", "to", "with",
    "is", "are", "at", "by", "from", "new", "its",
}

# Scale/impact markers — signals that something is materially big.
_MATERIALITY_TERMS = [
    "%", "billion", "million", "gw", "gwh", "acquisition", "merger", "launch",
    "partnership", "agreement", "standard", "regulation", "funding", "raise",
    "contract", "deployment", "rollout", "expand", "record",
]
# Action markers — something changed, not just commentary.
_URGENCY_TERMS = [
    "announced", "launches", "signs", "finalized", "unveils", "releases",
    "acquires", "expands", "begins", "rolls out", "approves", "bans", "recalls",
]
# Named, editorially-accountable outlets and research houses.
_HIGH_CONFIDENCE_SOURCES = [
    "reuters", "bloomberg", "financial times", "wall street journal", "the economist",
    "associated press", "cnbc", "wood mackenzie", "ul solutions", "benchmark minerals",
    "s&p", "iea", "gartner", "forrester", "idc", "techcrunch", "the information",
]
# Aggregators/blogs — real but weaker provenance.
_MED_CONFIDENCE_SOURCES = ["venturebeat", "zdnet", "the verge", "axios", "business wire", "pr newswire"]


def _lens_terms(lens: str) -> list:
    """Content words from the caller's lens, used to judge relevance."""
    words = re.findall(r"[a-z0-9]+", lens.lower())
    return [w for w in words if w not in _STOPWORDS and len(w) > 2]


def _axis_score(text: str, terms: list) -> int:
    hits = sum(1 for t in terms if t in text)
    return max(1, min(10, 3 + hits * 2))


def _relevance_score(text: str, lens: str) -> int:
    """How much of the lens actually appears in the signal. Domain-agnostic."""
    terms = _lens_terms(lens)
    if not terms:
        return 5
    hits = sum(1 for t in terms if t in text)
    coverage = hits / len(terms)
    if lens.lower() in text:  # exact phrase — strongest possible match
        return 10
    return max(1, min(10, round(2 + coverage * 8)))


def _confidence_score(source: str) -> int:
    s = source.lower()
    if any(x in s for x in _HIGH_CONFIDENCE_SOURCES):
        return 9
    if any(x in s for x in _MED_CONFIDENCE_SOURCES):
        return 6
    return 4  # unknown/aggregator provenance — verify before acting


@tool
def score_signal(signal: dict, lens: str = "grid-scale battery storage") -> dict:
    """Score a single signal against the client's strategic lens.

    Rates the signal 1-10 on relevance, materiality, urgency, and confidence,
    then averages them. Signals scoring 7 or higher should be surfaced; below 7
    should be dropped.

    Args:
        signal: A signal dict from fetch_signals (needs title, summary, source).
        lens: The client's strategic focus, used to judge relevance.

    Returns:
        A dict with the four axis scores, the averaged "score" (rounded to one
        decimal), a boolean "surface", and a one-line "rationale".
    """
    title = str(signal.get("title", ""))
    summary = str(signal.get("summary", ""))
    source = str(signal.get("source", "")).lower()
    text = (title + " " + summary + " " + lens).lower()

    relevance = _relevance_score(text, lens)
    materiality = _axis_score(text, _MATERIALITY_TERMS)
    if re.search(r"\d[\d,\.]*\s*(%|billion|million|thousand|gw|gwh|k\b)", text):
        materiality = min(10, materiality + 2)  # a hard number beats an adjective
    urgency = _axis_score(text, _URGENCY_TERMS)
    confidence = _confidence_score(source)

    score = round((relevance + materiality + urgency + confidence) / 4, 1)
    surface = score >= 7.0

    rationale = (
        f"Relevance {relevance}, materiality {materiality}, urgency {urgency}, "
        f"confidence {confidence} ({signal.get('source', 'unknown source')}). "
        + ("Surface." if surface else "Below the 7.0 threshold — drop.")
    )

    return {
        "id": signal.get("id"),
        "title": title,
        "source": signal.get("source"),
        "url": signal.get("url"),
        "published": signal.get("published"),
        "relevance": relevance,
        "materiality": materiality,
        "urgency": urgency,
        "confidence": confidence,
        "score": score,
        "surface": surface,
        "rationale": rationale,
    }
