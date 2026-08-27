"""Scout tool for Signal Lens — watsonx.data lakehouse edition.

Drop-in replacement for the sample-based `fetch_signals`. Instead of a bundled
list, it queries Gore's governed lakehouse in **IBM watsonx.data** over the
Presto/Trino SQL engine, in-tenant. Same function name, same return shape — so
the Signal Lens agent picks it up with no other change.

If the watsonx.data credentials aren't configured (or the connection fails), it
falls back to a tiny bundled set so the agent and the demo never break. That
fallback is clearly logged — it never silently pretends to be live.

Expected lakehouse table (create once in watsonx.data):

    CREATE TABLE iceberg_data.market.market_signals (
        id        VARCHAR,
        title     VARCHAR,
        source    VARCHAR,
        url       VARCHAR,
        published DATE,
        summary   VARCHAR,
        topics    VARCHAR   -- comma-separated, e.g. 'grid-scale battery storage,BESS'
    );

Config (environment variables — see .env.watsonxdata.example):
    WXD_HOST           Presto engine host from the watsonx.data console
    WXD_PORT           usually 443
    WXD_USER           'ibmlhapikey' (recommended) or your IBMid email
    WXD_API_KEY        your IBM Cloud API key (the password for Presto)
    WXD_CATALOG        e.g. 'iceberg_data'
    WXD_SCHEMA         e.g. 'market'
    WXD_SIGNALS_TABLE  e.g. 'market_signals'
"""

import logging
import os
from datetime import date, timedelta

from ibm_watsonx_orchestrate.agent_builder.tools import tool

log = logging.getLogger("signal_lens.scout")

# --- tiny fallback so the agent never hard-fails in a demo ---------------------
_FALLBACK = [
    {
        "id": "fb1",
        "title": "Grid-scale battery storage deployments up 34% QoQ in North America",
        "source": "Wood Mackenzie Energy Storage Monitor",
        "url": "https://example.com/woodmac-ess-q2",
        "published": "2026-07-27",
        "summary": "Utility-scale storage additions accelerated on falling cell prices.",
        "topics": ["grid-scale battery storage", "BESS"],
    },
    {
        "id": "fb2",
        "title": "New UL safety standard finalized for battery thermal-runaway containment",
        "source": "UL Solutions",
        "url": "https://example.com/ul-9540a-update",
        "published": "2026-07-25",
        "summary": "Updated test tightens insulation and gas-venting requirements.",
        "topics": ["grid-scale battery storage", "battery insulation", "BESS"],
    },
]

_REQUIRED = ("WXD_HOST", "WXD_API_KEY", "WXD_CATALOG", "WXD_SCHEMA")


def _configured() -> bool:
    return all(os.getenv(k) for k in _REQUIRED)


def _safe_ident(value: str, default: str) -> str:
    """Only allow identifier-safe catalog/schema/table names (no injection)."""
    v = (value or default).strip()
    return v if v.replace("_", "").replace(".", "").isalnum() else default


def _query_lakehouse(topic: str, lookback_days: int) -> list:
    import trino  # imported lazily so the tool loads even if trino isn't present

    host = os.environ["WXD_HOST"]
    port = int(os.getenv("WXD_PORT", "443"))
    user = os.getenv("WXD_USER", "ibmlhapikey")
    api_key = os.environ["WXD_API_KEY"]
    catalog = _safe_ident(os.getenv("WXD_CATALOG"), "iceberg_data")
    schema = _safe_ident(os.getenv("WXD_SCHEMA"), "market")
    table = _safe_ident(os.getenv("WXD_SIGNALS_TABLE"), "market_signals")

    conn = trino.dbapi.connect(
        host=host,
        port=port,
        user=user,
        auth=trino.auth.BasicAuthentication(user, api_key),
        http_scheme="https",
        catalog=catalog,
        schema=schema,
    )
    cutoff = (date.today() - timedelta(days=lookback_days)).isoformat()
    like = f"%{topic.lower()}%"
    fqtn = f"{catalog}.{schema}.{table}"

    sql = f"""
        SELECT id, title, source, url, CAST(published AS VARCHAR) AS published,
               summary, CAST(topics AS VARCHAR) AS topics
        FROM {fqtn}
        WHERE published >= DATE ?
          AND (lower(title)   LIKE ?
            OR lower(summary) LIKE ?
            OR lower(CAST(topics AS VARCHAR)) LIKE ?)
        ORDER BY published DESC
        LIMIT 50
    """

    cur = conn.cursor()
    cur.execute(sql, [cutoff, like, like, like])
    rows = cur.fetchall()
    cols = [d[0] for d in cur.description]

    out = []
    for row in rows:
        rec = dict(zip(cols, row))
        raw_topics = (rec.get("topics") or "").strip("[]{}")
        rec["topics"] = [t.strip().strip("'\"") for t in raw_topics.split(",") if t.strip()]
        out.append(rec)
    return out


@tool
def fetch_signals(topic: str, lookback_days: int = 7) -> list:
    """Fetch candidate market signals for a topic from the watsonx.data lakehouse.

    Use this first, before scoring. Queries Gore's governed lakehouse over Presto
    for signals published within the lookback window that match the topic. Returns
    raw, unscored signals — each a dict with id, title, source, url, published
    (YYYY-MM-DD), summary, and topics.

    Args:
        topic: The market or theme to scan, e.g. "grid-scale battery storage".
        lookback_days: How many days back to include. Defaults to 7.

    Returns:
        A list of candidate signal dicts matching the topic and window.
    """
    if not _configured():
        log.warning("watsonx.data not configured (WXD_* env vars missing) — using fallback sample set.")
        return _fallback(topic, lookback_days)

    try:
        results = _query_lakehouse(topic, lookback_days)
        log.info("watsonx.data returned %d candidate signals for %r", len(results), topic)
        return results
    except Exception as exc:  # noqa: BLE001 — never crash the agent on a data-layer hiccup
        log.warning("watsonx.data query failed (%s) — using fallback sample set.", exc)
        return _fallback(topic, lookback_days)


def _fallback(topic: str, lookback_days: int) -> list:
    tl = topic.lower()
    cutoff = date.today() - timedelta(days=lookback_days)
    out = []
    for sig in _FALLBACK:
        try:
            pub = date.fromisoformat(sig["published"])
        except ValueError:
            continue
        if pub < cutoff:
            continue
        hay = (sig["title"] + " " + " ".join(sig["topics"])).lower()
        if tl in hay or any(tl in t.lower() for t in sig["topics"]):
            out.append(sig)
    return out
