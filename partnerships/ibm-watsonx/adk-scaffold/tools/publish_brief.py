"""Publish tool for Signal Lens.

Takes scored signals and assembles a dated, cited brief. Only signals marked
surface=True (score >= 7) are included; each line carries its source and date.
"""

from datetime import datetime
from ibm_watsonx_orchestrate.agent_builder.tools import tool


@tool
def publish_brief(ranked_signals: list, topic: str = "market", channel: str = "inline") -> str:
    """Assemble a decision-ready brief from scored signals.

    Includes only signals that scored 7 or higher (surface=True), sorted by
    score. Leads with a one-line "what changed and why it matters" and cites the
    source and date of every item. If nothing qualifies, says so plainly.

    Args:
        ranked_signals: List of scored signal dicts (from score_signal), each
            carrying score, surface, title, and ideally source/url/published.
        topic: The topic the brief covers, used in the header.
        channel: Where the brief is routed ("inline", "email", "slack"). For the
            demo, "inline" simply returns the formatted text.

    Returns:
        A formatted markdown brief as a string.
    """
    today = datetime.utcnow().strftime("%Y-%m-%d")
    surfaced = [s for s in ranked_signals if s.get("surface")]
    surfaced.sort(key=lambda s: s.get("score", 0), reverse=True)

    header = f"# Signal Lens brief — {topic}\n_{today} · Powered by Enso Labs_\n"

    if not surfaced:
        return (
            header
            + "\n**Nothing crossed the 7.0 threshold today.** No material signals to report — "
            "the noise was filtered out rather than padded into a brief.\n"
        )

    top = surfaced[0]
    lead = f"\n**What changed:** {top.get('title', '')} (score {top.get('score')}).\n"

    lines = ["\n## Ranked signals\n"]
    for s in surfaced:
        src = s.get("source", "source unknown")
        pub = s.get("published", "")
        url = s.get("url", "")
        cite = f"{src}, {pub}".strip(", ")
        link = f" — {url}" if url else ""
        lines.append(f"- **[{s.get('score')}]** {s.get('title','')}  \n  _{cite}_{link}")

    footer = f"\n\n_{len(surfaced)} of {len(ranked_signals)} candidate signals surfaced (7.0+ threshold)._"

    return header + lead + "\n".join(lines) + footer
