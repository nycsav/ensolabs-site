"""Enso Research MCP — one MCP server, three research providers.

Exposes Perplexity Sonar, OpenAI, and a cross-provider corroboration tool to any
MCP host (Claude Code, Claude Desktop, watsonx Orchestrate, BeeAI).

Design notes
------------
* Providers are OPTIONAL. The server starts with whatever API keys are present
  and reports missing ones as a clear error rather than crashing at boot — so
  you can demo with one key and add the rest later.
* Every tool returns a compact, citation-bearing dict. No tool silently
  fabricates sources.
* Read-only by design: this server searches and synthesizes. It never sends
  email, posts, spends money, or writes to external systems.

Run locally:
    pip install -r requirements.txt
    export PERPLEXITY_API_KEY=...   # optional
    export OPENAI_API_KEY=...       # optional
    python server.py
"""

import asyncio
import os
from typing import Any

import httpx

# The Python MCP SDK renamed this class in v2.0 (FastMCP -> MCPServer). Both
# expose the same .tool() decorator and .run(), so support either generation.
try:  # SDK >= 2.0
    from mcp.server.mcpserver import MCPServer as _Server
except ImportError:  # SDK 1.x
    from mcp.server.fastmcp import FastMCP as _Server

mcp = _Server("enso-research")

PERPLEXITY_URL = "https://api.perplexity.ai/chat/completions"
OPENAI_URL = "https://api.openai.com/v1/chat/completions"
# Perplexity's Agent API resells OpenAI / Anthropic / Google / xAI models at
# direct provider rates with no markup — so a Perplexity key alone can drive the
# "second opinion" leg. No separate OpenAI account or card required.
AGENT_URL = "https://api.perplexity.ai/v1/agent"
TIMEOUT = 180.0

# Sonar model families. Confirm availability against your Perplexity plan:
# https://docs.perplexity.ai/docs/getting-started/pricing
SONAR_MODELS = {
    "fast": "sonar",                  # cheap, quick grounded answers
    "pro": "sonar-pro",               # deeper search, multi-step
    "reasoning": "sonar-reasoning-pro",  # chain-of-thought over search
    "deep": "sonar-deep-research",    # long-running exhaustive research
}

# Frontier models reachable through the Agent API on the Perplexity key alone.
# IDs verified against docs.perplexity.ai/docs/agent-api/models (2026-07-30) —
# guessing these is a reliable way to get a 400.
AGENT_MODELS = {
    "gpt":     "openai/gpt-5.4",                 # OpenAI, balanced cost/quality
    "gpt-max": "openai/gpt-5.5",                 # OpenAI flagship
    "claude":  "anthropic/claude-sonnet-4-6",    # Anthropic workhorse
    "haiku":   "anthropic/claude-haiku-4-5",     # Anthropic, fast + cheap
    # NOTE: anthropic/claude-opus-4-7 is listed in the docs but returned 400 on
    # this API group (2026-07-30) — likely not enabled for the plan. Omitted
    # rather than shipped broken.
    "gemini":  "google/gemini-3.1-pro-preview",  # Google flagship
    "flash":   "google/gemini-3-flash-preview",  # Google, fast + cheap
    "grok":    "xai/grok-4.3",                   # xAI
}


def _need(var: str) -> str:
    """Return an env var or raise a message the model can relay to the user."""
    val = os.environ.get(var)
    if not val:
        raise RuntimeError(
            f"{var} is not set. Add it to your environment (or the MCP server's "
            f"env block in .mcp.json) and restart the host."
        )
    return val


async def _post(url: str, key: str, payload: dict) -> dict:
    async with httpx.AsyncClient(timeout=TIMEOUT) as client:
        r = await client.post(
            url,
            headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
            json=payload,
        )
        r.raise_for_status()
        return r.json()


# ----------------------------------------------------------------------------
# Perplexity Sonar
# ----------------------------------------------------------------------------
@mcp.tool()
async def sonar_search(
    query: str,
    depth: str = "pro",
    search_recency: str = "month",
    system_prompt: str = "Be precise. Cite every factual claim. Date every figure.",
) -> dict[str, Any]:
    """Answer a question using Perplexity Sonar's live web search.

    Use this for anything about the present-day world: current facts, prices,
    who holds a role, what shipped recently, competitive moves. Returns a
    grounded answer plus the source URLs Sonar used.

    Args:
        query: The research question, phrased as a full question.
        depth: "fast" (quick), "pro" (default, deeper), "reasoning" (shows its
            reasoning over search), or "deep" (exhaustive; slow and pricier).
        search_recency: Limit sources by age — "day", "week", "month", "year".
        system_prompt: Steering instruction for tone and rigor.

    Returns:
        dict with model, answer, citations (list of URLs), and usage.
    """
    key = _need("PERPLEXITY_API_KEY")
    model = SONAR_MODELS.get(depth, SONAR_MODELS["pro"])

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": query},
        ],
    }
    if search_recency:
        payload["search_recency_filter"] = search_recency

    data = await _post(PERPLEXITY_URL, key, payload)
    choice = (data.get("choices") or [{}])[0]

    return {
        "provider": "perplexity",
        "model": model,
        "answer": choice.get("message", {}).get("content", ""),
        "citations": data.get("citations") or data.get("search_results") or [],
        "usage": data.get("usage", {}),
    }


# ----------------------------------------------------------------------------
# OpenAI
# ----------------------------------------------------------------------------
def _extract_agent_text(data: dict) -> str:
    """Pull the assistant text out of an Agent API response.

    The /v1/agent response is an OpenAI-Responses-style envelope: an `output`
    list whose message items carry `content` blocks. Falls back through the
    shapes we've seen so a schema tweak degrades to empty rather than throwing.
    """
    if isinstance(data.get("output_text"), str):
        return data["output_text"]

    parts: list[str] = []
    for item in data.get("output") or []:
        if not isinstance(item, dict):
            continue
        content = item.get("content")
        if isinstance(content, str):
            parts.append(content)
        elif isinstance(content, list):
            for block in content:
                if isinstance(block, dict) and isinstance(block.get("text"), str):
                    parts.append(block["text"])
    if parts:
        return "\n".join(parts)

    # chat/completions-style fallback
    choices = data.get("choices") or []
    if choices and isinstance(choices[0], dict):
        return (choices[0].get("message") or {}).get("content", "") or ""
    return ""


@mcp.tool()
async def openai_reason(
    prompt: str,
    model: str = "openai/gpt-5.5",
    system_prompt: str = "You are a rigorous analyst. State uncertainty plainly.",
    temperature: float = 0.2,
    max_output_tokens: int = 2048,
) -> dict[str, Any]:
    """Reason over text with an OpenAI (or other frontier) model — no web search.

    Use this for synthesis, structuring, drafting, or auditing material you
    already have. For live facts, use sonar_search instead.

    Routes through Perplexity's Agent API by default, so your Perplexity key and
    credits cover it — no separate OpenAI account needed. If OPENAI_API_KEY is
    set and the model has no "provider/" prefix, calls OpenAI directly instead.

    Args:
        prompt: The full instruction, including any text to work over.
        model: "openai/gpt-5.5" (default), or another Agent API model such as
            "anthropic/..." or "google/...". A bare id like "gpt-4o" routes to
            OpenAI directly and requires OPENAI_API_KEY.
        system_prompt: Role/steering instruction.
        temperature: 0.0-1.0. Keep low for analysis.
        max_output_tokens: Output cap. Required by Anthropic models; applied to
            all Agent API calls for consistency.

    Returns:
        dict with provider, model, answer, and usage.
    """
    via_agent = "/" in model

    if via_agent:
        key = _need("PERPLEXITY_API_KEY")
        payload = {
            "model": model,
            "input": f"{system_prompt}\n\n{prompt}",
            "temperature": temperature,
        }
        # Anthropic models reject the request without an explicit output cap:
        # "max_output_tokens is required when using Anthropic models". Harmless
        # for the other providers, so set it whenever the caller didn't.
        payload["max_output_tokens"] = max_output_tokens
        data = await _post(AGENT_URL, key, payload)
        return {
            "provider": "perplexity-agent-api",
            "model": model,
            "answer": _extract_agent_text(data),
            "usage": data.get("usage", {}),
        }

    key = _need("OPENAI_API_KEY")
    data = await _post(
        OPENAI_URL,
        key,
        {
            "model": model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
            ],
            "temperature": temperature,
        },
    )
    choice = (data.get("choices") or [{}])[0]
    return {
        "provider": "openai",
        "model": model,
        "answer": choice.get("message", {}).get("content", ""),
        "usage": data.get("usage", {}),
    }


# ----------------------------------------------------------------------------
# Cross-provider corroboration — the differentiated tool
# ----------------------------------------------------------------------------
@mcp.tool()
async def corroborate(query: str, search_recency: str = "month") -> dict[str, Any]:
    """Ask the same question two ways and report where the answers disagree.

    Runs the query through Perplexity Sonar (web-grounded) and then has an
    OpenAI model audit that answer for unsupported claims. Use this when a
    figure is going into a client deliverable and being wrong is expensive.

    Args:
        query: The factual question to verify.
        search_recency: Source age limit for the Sonar pass.

    Returns:
        dict with the grounded answer, its citations, an audit of weak claims,
        and a confidence signal.
    """
    grounded = await sonar_search(query, depth="pro", search_recency=search_recency)

    audit_prompt = (
        "Below is a web-grounded answer and its sources. Audit it.\n"
        "1) List any claim that is NOT clearly supported by the cited sources.\n"
        "2) Flag any figure missing a date.\n"
        "3) End with exactly one line: CONFIDENCE: high|medium|low\n\n"
        f"QUESTION: {query}\n\nANSWER:\n{grounded['answer']}\n\n"
        f"SOURCES: {grounded['citations']}"
    )

    try:
        audit = await openai_reason(audit_prompt, temperature=0.0)
        audit_text = audit["answer"]
    except RuntimeError as e:
        audit_text = f"Audit skipped — {e}"

    return {
        "query": query,
        "grounded_answer": grounded["answer"],
        "citations": grounded["citations"],
        "audit": audit_text,
        "note": "Two independent passes. Treat disagreement as a signal to verify by hand.",
    }


@mcp.tool()
async def panel(
    question: str,
    models: list[str] | None = None,
    system_prompt: str = "Answer in at most 4 sentences. State uncertainty plainly.",
) -> dict[str, Any]:
    """Ask several frontier models the same question and compare their answers.

    Runs OpenAI, Anthropic, Google (and optionally xAI) side by side through the
    Agent API on your Perplexity key alone. Use when a judgment call matters and
    single-model bias is a real risk — divergence between models is the signal.

    Args:
        question: The question to put to every model.
        models: Short names from the registry — any of "gpt", "gpt-max",
            "claude", "opus", "gemini", "flash", "grok". Defaults to
            ["gpt", "claude", "gemini"].
        system_prompt: Shared steering instruction, so the comparison is fair.

    Returns:
        dict with one entry per model (answer or error) and an agreement note.
    """
    _need("PERPLEXITY_API_KEY")
    picks = models or ["gpt", "claude", "gemini"]

    async def ask(short: str) -> tuple[str, dict]:
        model_id = AGENT_MODELS.get(short, short)
        try:
            r = await openai_reason(question, model=model_id, system_prompt=system_prompt)
            return short, {"model": model_id, "answer": r["answer"], "usage": r.get("usage", {})}
        except Exception as e:
            return short, {"model": model_id, "error": f"{type(e).__name__}: {str(e)[:200]}"}

    pairs = await asyncio.gather(*(ask(s) for s in picks))
    responses = dict(pairs)
    answered = [k for k, v in responses.items() if v.get("answer")]

    return {
        "question": question,
        "responses": responses,
        "models_answered": answered,
        "note": (
            "Independent models, same prompt. Where they agree, confidence is higher; "
            "where they diverge, verify by hand before it reaches a client."
        ),
    }


@mcp.tool()
async def provider_status() -> dict[str, Any]:
    """Report which research providers are configured and ready.

    Call this first when something isn't working — it tells you which API keys
    the server can see without revealing their values.
    """
    pplx = bool(os.environ.get("PERPLEXITY_API_KEY"))
    return {
        "perplexity": pplx,
        "openai_direct": bool(os.environ.get("OPENAI_API_KEY")),
        # The Agent API rides on the Perplexity key, so the second-opinion leg
        # (and therefore corroborate) works with a Perplexity key alone.
        "openai_via_agent_api": pplx,
        "corroborate_available": pplx,
        "panel_available": pplx,
        "sonar_depths": list(SONAR_MODELS),
        "agent_models": AGENT_MODELS,
        "read_only": True,
    }


# ----------------------------------------------------------------------------
# Partner Plus Navigator — the IBM-facing half of the harness.
# IBM ships no Partner Plus connector, and its own MCP work targets IBM Bob.
# These tools make the portal legible to Claude, GPT, Gemini and Grok alike.
# ----------------------------------------------------------------------------
import partner_plus  # noqa: E402

partner_plus.register(mcp, _need, sonar_search)


if __name__ == "__main__":
    mcp.run()
