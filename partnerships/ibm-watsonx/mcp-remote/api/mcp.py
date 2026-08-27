"""Partner Plus Navigator — remote MCP endpoint (Vercel serverless).

Exposes the same tools as the local stdio server over Streamable HTTP, so any
remote MCP client can reach them at a public URL — including watsonx Orchestrate
via `orchestrate toolkits add --url ...`, with no code change when that arrives.

Protocol: JSON-RPC 2.0 over HTTP POST (MCP Streamable HTTP transport).
Implemented directly rather than via the SDK because Vercel's Python runtime is
request/response, not a long-lived process — the SDK's session machinery assumes
the latter.

Security: bearer-token gated. Set MCP_AUTH_TOKEN in Vercel env; clients send
Authorization: Bearer <token>. Read-only tools only — nothing here sends,
posts, purchases, or accepts terms.
"""

import json
import os
import ssl
import urllib.request
from http.server import BaseHTTPRequestHandler

# Vercel's Linux runtime has a working CA bundle; some local Python installs
# (notably python.org builds on macOS) do not, and fail with
# CERTIFICATE_VERIFY_FAILED. Prefer certifi's bundle when it's available so the
# same code runs identically in both places. Never disables verification.
try:
    import certifi
    _SSL_CTX = ssl.create_default_context(cafile=certifi.where())
except Exception:
    _SSL_CTX = ssl.create_default_context()

PROTOCOL_VERSION = "2025-06-18"
SERVER_INFO = {"name": "partner-plus-navigator", "version": "1.0.0"}

PERPLEXITY_URL = "https://api.perplexity.ai/chat/completions"
AGENT_URL = "https://api.perplexity.ai/v1/agent"

# Frontier models reachable on the Perplexity key alone (verified 2026-07-30).
AGENT_MODELS = {
    "gpt": "openai/gpt-5.4",
    "gpt-max": "openai/gpt-5.5",
    "claude": "anthropic/claude-sonnet-4-6",
    "haiku": "anthropic/claude-haiku-4-5",
    "gemini": "google/gemini-3.1-pro-preview",
    "flash": "google/gemini-3-flash-preview",
    "grok": "xai/grok-4.3",
}

TIERS = ["Registered", "Silver", "Gold", "Platinum"]

BENEFITS = {
    "IBM Technology Zone": {
        "tier": "Registered", "cost": "free",
        "what": "On-demand environments to learn, build, demo and share IBM solutions.",
        "why_it_matters": "Fastest no-cost route to a working watsonx environment. Most partners miss it and wait on Cloud Credits instead.",
        "url": "https://techzone.ibm.com"},
    "Software Access Catalog (new Business Partners)": {
        "tier": "Registered", "cost": "free",
        "what": "20+ strategic IBM software products for non-production use.",
        "why_it_matters": "Covers prototypes and demos with no credit grant.",
        "url": "https://www.ibm.com/partnerplus"},
    "IBM Learning hub": {
        "tier": "Registered", "cost": "free",
        "what": "Proficiency and Practitioner Advanced badges.",
        "why_it_matters": "Badges are how you climb to Silver, which unlocks Cloud Credits.",
        "url": "https://www.ibm.com/training"},
    "Seismic": {
        "tier": "Registered", "cost": "free",
        "what": "The sales-content library IBM sellers use.",
        "why_it_matters": "Co-sell collateral without asking anyone.",
        "url": "https://www.ibm.com/partnerplus"},
    "Cloud Credits": {
        "tier": "Silver", "cost": "free at tier",
        "what": "Credits across 200+ IBM Cloud products for PoCs.",
        "why_it_matters": "THE benefit most partners chase. Locked at Registered — the most common source of confusion.",
        "url": "https://www.ibm.com/partnerplus"},
    "Software Access Catalog (full)": {
        "tier": "Silver", "cost": "free at tier",
        "what": "Key IBM software including watsonx for non-production use.",
        "why_it_matters": "Broader than the Registered-tier catalog.",
        "url": "https://www.ibm.com/partnerplus"},
    "IBM Partner Plus Directory listing": {
        "tier": "Silver", "cost": "free at tier",
        "what": "Public listing with tier, location and company overview.",
        "why_it_matters": "Inbound discovery by prospective customers.",
        "url": "https://www.ibm.com/partnerplus/directory/companies"},
    "Technical Assistance for Build Solutions": {
        "tier": "Silver", "cost": "free at tier",
        "what": "IBM technical resources to co-create your embedded solution.",
        "why_it_matters": "Real engineering help, not just docs.",
        "url": "https://www.ibm.com/partnerplus"},
    "Proof of Concept co-creation": {
        "tier": "Gold", "cost": "free at tier",
        "what": "Build a PoC, MVP or custom demo with IBM technical teams.",
        "why_it_matters": "IBM engineers on your build.",
        "url": "https://www.ibm.com/partnerplus"},
    "Innovation Studio access": {
        "tier": "Gold", "cost": "free at tier",
        "what": "Priority access to IBM innovation studios.",
        "why_it_matters": "A venue to bring your own clients.",
        "url": "https://www.ibm.com/partnerplus"},
}

BUILD_ROUTES = [
    {"route": "IBM Technology Zone", "cost": "Free", "needs": "IBMid login", "tier": "Registered",
     "verdict": "BEST — unlocked at Registered, no credits, no card, no Docker.",
     "url": "https://techzone.ibm.com"},
    {"route": "Software Access Catalog (new Business Partners)", "cost": "Free",
     "needs": "IBMid login", "tier": "Registered",
     "verdict": "Good for non-production prototypes and demos.",
     "url": "https://www.ibm.com/partnerplus"},
    {"route": "watsonx Orchestrate 30-day trial", "cost": "Free trial",
     "needs": "Credit card OR sponsor feature code", "tier": "any",
     "verdict": "Blocked without a card or code. Ask your sponsor — don't pay out of pocket on a partnership build.",
     "url": "https://cloud.ibm.com/catalog/services/watsonx-orchestrate"},
    {"route": "Local ADK Developer Edition", "cost": "Free",
     "needs": "Docker + Python 3.11-3.13 + entitlement key", "tier": "any",
     "verdict": "Full local control, heaviest setup.",
     "url": "https://developer.watson-orchestrate.ibm.com/getting_started/installing"},
]

TROUBLESHOOTING = [
    {"symptom": "API key returns 401 Invalid, but the account shows credits",
     "likely_cause": "Stale or wrong-org key. Portals hold several keys; an old one looks identical.",
     "fix": "Generate a fresh key in the correct organization and re-register.",
     "note": "Cost us a full debugging cycle. Credits were never the problem."},
    {"symptom": "'Verify identity by Card' asks for a credit card",
     "likely_cause": "You're on the self-serve signup path, not the partner path.",
     "fix": "Click 'Register with a code' and enter the sponsor's feature code.",
     "note": "A code binds to ONE account and cannot be moved — confirm the account first."},
    {"symptom": "Cloud Credits show Locked",
     "likely_cause": "Credits require Silver. Registered does not include them.",
     "fix": "Use Technology Zone (free at Registered) meanwhile; earn badges toward Silver.",
     "note": "The most common Partner Plus misunderstanding."},
    {"symptom": "Sponsor submitted a ticket but nothing changed",
     "likely_cause": "IBM-internal tickets don't copy the partner; nothing lands in your inbox.",
     "fix": "Ask the sponsor for the ticket number. Proceed on a no-credit route meanwhile.",
     "note": "Don't block the build on a queue you can't see."},
    {"symptom": "Signed up with a personal email, benefits missing",
     "likely_cause": "Partner benefits attach to the company IBMid, not a personal alias.",
     "fix": "Confirm which identity owns the membership before applying any code.",
     "note": "Mismatched identity silently produces an unentitled account."},
]


# --------------------------------------------------------------------------
# Upstream calls (stdlib only — no third-party deps needed on the serverless runtime)
# --------------------------------------------------------------------------
def _post_json(url: str, token: str, payload: dict, timeout: int = 60) -> dict:
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout, context=_SSL_CTX) as r:
        return json.loads(r.read().decode())


def _pplx_key() -> str:
    key = os.environ.get("PERPLEXITY_API_KEY")
    if not key:
        raise RuntimeError("PERPLEXITY_API_KEY is not set on the server.")
    return key


def _agent_text(data: dict) -> str:
    if isinstance(data.get("output_text"), str):
        return data["output_text"]
    parts = []
    for item in data.get("output") or []:
        c = item.get("content") if isinstance(item, dict) else None
        if isinstance(c, str):
            parts.append(c)
        elif isinstance(c, list):
            parts += [b["text"] for b in c if isinstance(b, dict) and isinstance(b.get("text"), str)]
    return "\n".join(parts)


# --------------------------------------------------------------------------
# Tool implementations
# --------------------------------------------------------------------------
def t_benefits(tier: str = "Registered") -> dict:
    tier = (tier or "Registered").strip().title()
    if tier not in TIERS:
        return {"error": f"Unknown tier {tier!r}. Expected one of {TIERS}."}
    idx = TIERS.index(tier)
    unlocked = {k: v for k, v in BENEFITS.items() if TIERS.index(v["tier"]) <= idx}
    locked = {k: v for k, v in BENEFITS.items() if TIERS.index(v["tier"]) > idx}
    return {
        "tier": tier, "unlocked_now": unlocked, "locked": locked,
        "next_tier": TIERS[idx + 1] if idx + 1 < len(TIERS) else None,
        "headline": (
            f"At {tier} you already have {len(unlocked)} benefits — including IBM "
            "Technology Zone, a free on-demand environment most partners overlook "
            "while waiting on Cloud Credits."
            if tier == "Registered" else f"{len(unlocked)} benefits unlocked at {tier}."),
    }


def t_build_route(has_sponsor_code: bool = False, has_docker: bool = False) -> dict:
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
        "hard_stop": "Applying a code, accepting terms, and entering payment are human-only steps.",
    }


def t_troubleshoot(symptom: str = "") -> dict:
    if not (symptom or "").strip():
        return {"all_known_issues": TROUBLESHOOTING, "count": len(TROUBLESHOOTING)}
    words = {w for w in symptom.lower().split() if len(w) > 3}
    scored = []
    for item in TROUBLESHOOTING:
        hay = (item["symptom"] + " " + item["likely_cause"]).lower()
        hits = sum(1 for w in words if w in hay)
        if hits:
            scored.append((hits, item))
    scored.sort(key=lambda x: -x[0])
    return {"symptom": symptom, "matches": [i for _, i in scored] or TROUBLESHOOTING,
            "matched": bool(scored)}


def t_sonar(query: str, depth: str = "pro", search_recency: str = "month") -> dict:
    models = {"fast": "sonar", "pro": "sonar-pro",
              "reasoning": "sonar-reasoning-pro", "deep": "sonar-deep-research"}
    model = models.get(depth, "sonar-pro")
    payload = {"model": model, "messages": [
        {"role": "system", "content": "Be precise. Cite every factual claim. Date every figure."},
        {"role": "user", "content": query}]}
    if search_recency:
        payload["search_recency_filter"] = search_recency
    data = _post_json(PERPLEXITY_URL, _pplx_key(), payload, timeout=120)
    ch = (data.get("choices") or [{}])[0]
    return {"model": model, "answer": ch.get("message", {}).get("content", ""),
            "citations": data.get("citations") or data.get("search_results") or []}


def t_ask(question: str) -> dict:
    r = t_sonar(f"IBM Partner Plus program: {question}", depth="pro")
    return {"question": question, "answer": r["answer"], "citations": r["citations"],
            "note": "Live web answer. For tier benefits, partner_plus_benefits is verified first-hand."}


def t_reason(prompt: str, model: str = "openai/gpt-5.4",
             system_prompt: str = "You are a rigorous analyst. State uncertainty plainly.",
             max_output_tokens: int = 2048) -> dict:
    model = AGENT_MODELS.get(model, model)
    # Anthropic models 400 without max_output_tokens; harmless elsewhere.
    data = _post_json(AGENT_URL, _pplx_key(), {
        "model": model, "input": f"{system_prompt}\n\n{prompt}",
        "max_output_tokens": max_output_tokens}, timeout=120)
    return {"model": model, "answer": _agent_text(data), "usage": data.get("usage", {})}


TOOLS = [
    {"name": "partner_plus_benefits",
     "description": "What an IBM Partner Plus tier actually unlocks — and what it doesn't. Verified first-hand against a live Registered-tier account.",
     "inputSchema": {"type": "object", "properties": {
         "tier": {"type": "string", "description": "Registered, Silver, Gold, or Platinum"}}},
     "fn": t_benefits},
    {"name": "partner_plus_build_route",
     "description": "The fastest route to a working IBM build environment, ranked by time-to-start.",
     "inputSchema": {"type": "object", "properties": {
         "has_sponsor_code": {"type": "boolean"}, "has_docker": {"type": "boolean"}}},
     "fn": t_build_route},
    {"name": "partner_plus_troubleshoot",
     "description": "Diagnose a common IBM Partner Plus / IBM Cloud onboarding failure. Real causes, not the misleading ones.",
     "inputSchema": {"type": "object", "properties": {
         "symptom": {"type": "string", "description": "e.g. '401 invalid key' or 'asking for a card'"}}},
     "fn": t_troubleshoot},
    {"name": "partner_plus_ask",
     "description": "Answer any IBM Partner Plus question, grounded in live IBM sources with citations.",
     "inputSchema": {"type": "object", "properties": {"question": {"type": "string"}},
                     "required": ["question"]},
     "fn": t_ask},
    {"name": "sonar_search",
     "description": "Live web research via Perplexity Sonar. Returns a grounded answer plus citations.",
     "inputSchema": {"type": "object", "properties": {
         "query": {"type": "string"},
         "depth": {"type": "string", "description": "fast | pro | reasoning | deep"},
         "search_recency": {"type": "string", "description": "day | week | month | year"}},
         "required": ["query"]},
     "fn": t_sonar},
    {"name": "frontier_reason",
     "description": "Reason with any frontier model (OpenAI, Anthropic, Google, xAI) via the Agent API. No web access.",
     "inputSchema": {"type": "object", "properties": {
         "prompt": {"type": "string"},
         "model": {"type": "string", "description": "gpt | gpt-max | claude | haiku | gemini | flash | grok"},
         "system_prompt": {"type": "string"}},
         "required": ["prompt"]},
     "fn": t_reason},
]

TOOL_MAP = {t["name"]: t for t in TOOLS}


def handle_rpc(body: dict) -> dict | None:
    """Handle one JSON-RPC request. Returns None for notifications."""
    method = body.get("method")
    rpc_id = body.get("id")
    params = body.get("params") or {}

    def ok(result):
        return {"jsonrpc": "2.0", "id": rpc_id, "result": result}

    def err(code, message):
        return {"jsonrpc": "2.0", "id": rpc_id, "error": {"code": code, "message": message}}

    if method == "initialize":
        return ok({"protocolVersion": PROTOCOL_VERSION,
                   "capabilities": {"tools": {}},
                   "serverInfo": SERVER_INFO})

    if method in ("notifications/initialized", "initialized"):
        return None  # notification — no response

    if method == "ping":
        return ok({})

    if method == "tools/list":
        return ok({"tools": [{k: t[k] for k in ("name", "description", "inputSchema")}
                             for t in TOOLS]})

    if method == "tools/call":
        name = params.get("name")
        args = params.get("arguments") or {}
        tool = TOOL_MAP.get(name)
        if not tool:
            return err(-32602, f"Unknown tool: {name}")
        try:
            result = tool["fn"](**args)
            return ok({"content": [{"type": "text",
                                    "text": json.dumps(result, indent=2, default=str)}]})
        except TypeError as e:
            return err(-32602, f"Bad arguments for {name}: {e}")
        except Exception as e:
            return ok({"content": [{"type": "text",
                                    "text": f"Tool error: {type(e).__name__}: {e}"}],
                       "isError": True})

    return err(-32601, f"Method not found: {method}")


class handler(BaseHTTPRequestHandler):
    def _authorized(self) -> bool:
        expected = os.environ.get("MCP_AUTH_TOKEN")
        if not expected:
            return True  # no token configured — open (set one in production)
        got = self.headers.get("Authorization", "")
        return got.startswith("Bearer ") and got[7:].strip() == expected

    def _send(self, code: int, payload: dict):
        raw = json.dumps(payload).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(raw)

    def do_GET(self):
        # Health check — handy for confirming a deploy without an MCP client.
        self._send(200, {"server": SERVER_INFO, "protocolVersion": PROTOCOL_VERSION,
                         "transport": "streamable-http", "tools": [t["name"] for t in TOOLS],
                         "auth_required": bool(os.environ.get("MCP_AUTH_TOKEN")),
                         "perplexity_configured": bool(os.environ.get("PERPLEXITY_API_KEY"))})

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_POST(self):
        if not self._authorized():
            return self._send(401, {"jsonrpc": "2.0", "id": None,
                                    "error": {"code": -32001, "message": "Unauthorized"}})
        try:
            length = int(self.headers.get("Content-Length") or 0)
            body = json.loads(self.rfile.read(length).decode() or "{}")
        except Exception as e:
            return self._send(400, {"jsonrpc": "2.0", "id": None,
                                    "error": {"code": -32700, "message": f"Parse error: {e}"}})

        if isinstance(body, list):  # batch
            out = [r for r in (handle_rpc(b) for b in body) if r is not None]
            return self._send(200, out) if out else self._send(202, {})

        resp = handle_rpc(body)
        if resp is None:
            self.send_response(202)
            self.send_header("Content-Length", "0")
            self.end_headers()
            return
        self._send(200, resp)

    def log_message(self, *args):
        pass  # keep Vercel logs clean
