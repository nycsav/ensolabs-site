"""Scout tool for Signal Lens — LIVE retrieval via Perplexity Sonar.

Drop-in replacement for fetch_signals.py. Same signature, same return shape, but
pulls real signals from the live web instead of the bundled sample set.

Swap by importing this one instead:
    orchestrate tools import -k python -f tools/fetch_signals_live.py

Requires PERPLEXITY_API_KEY in the environment. If the key is missing or the
call fails, it returns an empty list rather than raising — so the agent degrades
to "nothing crossed the threshold" instead of crashing mid-demo.
"""

import json
import os
import re
import sys
from datetime import datetime, timedelta

import httpx
from ibm_watsonx_orchestrate.agent_builder.tools import tool

PERPLEXITY_URL = "https://api.perplexity.ai/chat/completions"

_EXTRACTION_PROMPT = """Find the most significant, concrete news signals about: {topic}
from the last {days} days.

Return ONLY a JSON array (no prose, no markdown fence). Each element:
{{"id":"s1","title":"<specific headline with the key number if any>",
  "source":"<publication>","url":"<source url>",
  "published":"<YYYY-MM-DD>","summary":"<one sentence>"}}

Rules: max 8 items. Prefer items with hard numbers, named parties, or regulatory
/ standards changes. Omit opinion pieces and undated items. If you find nothing
material, return []."""


def _parse_signals(text: str) -> list:
    """Pull a JSON array out of the model's reply, tolerating stray prose."""
    if not text:
        return []
    text = re.sub(r"^```(?:json)?|```$", "", text.strip(), flags=re.MULTILINE).strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    match = re.search(r"\[.*\]", text, re.DOTALL)  # first [...] block
    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            return []
    return []


@tool
def fetch_signals(topic: str, lookback_days: int = 7) -> list:
    """Fetch live market signals for a topic using Perplexity Sonar web search.

    Use this first, before scoring. Returns raw, unscored signals — each a dict
    with id, title, source, url, published (YYYY-MM-DD), and summary. Returns an
    empty list if retrieval fails, so the caller should handle the empty case.

    Args:
        topic: The market or theme to scan, e.g. "grid-scale battery storage".
        lookback_days: How many days back to search. Defaults to 7.

    Returns:
        A list of candidate signal dicts, newest-relevant first.
    """
    key = os.environ.get("PERPLEXITY_API_KEY")
    if not key:
        return []

    recency = "day" if lookback_days <= 1 else "week" if lookback_days <= 7 else "month"

    try:
        with httpx.Client(timeout=180.0) as client:
            resp = client.post(
                PERPLEXITY_URL,
                headers={"Authorization": f"Bearer {key}"},
                json={
                    "model": "sonar-pro",
                    "search_recency_filter": recency,
                    "messages": [
                        {
                            "role": "system",
                            "content": "You return only valid JSON. Never invent a source or a date.",
                        },
                        {
                            "role": "user",
                            "content": _EXTRACTION_PROMPT.format(
                                topic=topic, days=lookback_days
                            ),
                        },
                    ],
                },
            )
            resp.raise_for_status()
            content = resp.json()["choices"][0]["message"]["content"]
    except Exception as e:
        # Degrade to "no signals" rather than crashing the agent mid-run, but
        # leave a trace — a silent [] is indistinguishable from "quiet news day"
        # and cost us real debugging time once.
        print(f"[fetch_signals] retrieval failed: {type(e).__name__}: {e}", file=sys.stderr)
        return []

    signals = _parse_signals(content)
    if not isinstance(signals, list):
        return []

    # Normalize + drop anything outside the window or missing a citable source.
    cutoff = datetime.utcnow() - timedelta(days=lookback_days + 1)
    cleaned = []
    for i, s in enumerate(signals):
        if not isinstance(s, dict) or not s.get("title") or not s.get("source"):
            continue
        pub = str(s.get("published", ""))
        try:
            if datetime.strptime(pub, "%Y-%m-%d") < cutoff:
                continue
        except ValueError:
            continue  # undated -> not citable -> drop
        cleaned.append(
            {
                "id": s.get("id") or f"s{i+1}",
                "title": str(s["title"]),
                "source": str(s["source"]),
                "url": str(s.get("url", "")),
                "published": pub,
                "summary": str(s.get("summary", "")),
                "topics": [topic],
            }
        )

    return cleaned
