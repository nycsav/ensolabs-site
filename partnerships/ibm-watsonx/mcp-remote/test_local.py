"""Exercise the remote MCP handler locally — no Vercel, no network for the
offline tools. Proves the JSON-RPC surface before deploying.

    python3 test_local.py
"""

import importlib.util
import json
import os
import pathlib

spec = importlib.util.spec_from_file_location("mcpapi", pathlib.Path(__file__).parent / "api" / "mcp.py")
api = importlib.util.module_from_spec(spec)
spec.loader.exec_module(api)

PASS = FAIL = 0


def check(label, cond, detail=""):
    global PASS, FAIL
    if cond:
        PASS += 1
        print(f"  ✓ {label}")
    else:
        FAIL += 1
        print(f"  ✗ {label} {detail}")


def rpc(method, params=None, rpc_id=1):
    return api.handle_rpc({"jsonrpc": "2.0", "id": rpc_id, "method": method,
                           "params": params or {}})


print("\n=== Partner Plus Navigator — remote MCP handler ===\n")

print("Protocol:")
r = rpc("initialize")
check("initialize returns protocolVersion", r["result"]["protocolVersion"] == api.PROTOCOL_VERSION)
check("initialize advertises tools capability", "tools" in r["result"]["capabilities"])
check("notifications/initialized is a notification", rpc("notifications/initialized") is None)
check("ping responds", "result" in rpc("ping"))
check("unknown method -> -32601", rpc("nope")["error"]["code"] == -32601)

print("\nTools:")
tools = rpc("tools/list")["result"]["tools"]
check(f"{len(tools)} tools listed", len(tools) == 6, f"got {len(tools)}")
for t in tools:
    ok = t.get("name") and t.get("description") and t.get("inputSchema")
    check(f"  {t['name']} well-formed", bool(ok))

print("\nOffline tools (no network):")
r = rpc("tools/call", {"name": "partner_plus_benefits", "arguments": {"tier": "Registered"}})
payload = json.loads(r["result"]["content"][0]["text"])
check("benefits(Registered) unlocks Technology Zone",
      "IBM Technology Zone" in payload["unlocked_now"])
check("benefits(Registered) locks Cloud Credits", "Cloud Credits" in payload["locked"])

r = rpc("tools/call", {"name": "partner_plus_benefits", "arguments": {"tier": "Silver"}})
payload = json.loads(r["result"]["content"][0]["text"])
check("benefits(Silver) unlocks Cloud Credits", "Cloud Credits" in payload["unlocked_now"])

r = rpc("tools/call", {"name": "partner_plus_benefits", "arguments": {"tier": "Bogus"}})
check("bad tier handled gracefully", "error" in json.loads(r["result"]["content"][0]["text"]))

r = rpc("tools/call", {"name": "partner_plus_build_route", "arguments": {}})
payload = json.loads(r["result"]["content"][0]["text"])
check("build_route recommends Technology Zone", payload["recommendation"] == "IBM Technology Zone")

r = rpc("tools/call", {"name": "partner_plus_build_route",
                       "arguments": {"has_sponsor_code": True}})
payload = json.loads(r["result"]["content"][0]["text"])
check("sponsor code flips the trial to AVAILABLE",
      any("AVAILABLE" in x["verdict"] for x in payload["routes"]))

r = rpc("tools/call", {"name": "partner_plus_troubleshoot",
                       "arguments": {"symptom": "401 invalid key but I have credits"}})
payload = json.loads(r["result"]["content"][0]["text"])
check("troubleshoot matches the 401 case", payload["matched"])
check("  and names the real cause", "Stale" in payload["matches"][0]["likely_cause"])

print("\nError handling:")
r = rpc("tools/call", {"name": "does_not_exist", "arguments": {}})
check("unknown tool -> -32602", r["error"]["code"] == -32602)
r = rpc("tools/call", {"name": "partner_plus_benefits", "arguments": {"bogus_arg": 1}})
check("bad arguments -> -32602", r.get("error", {}).get("code") == -32602)

if os.environ.get("PERPLEXITY_API_KEY"):
    print("\nLive tools (key present):")
    r = rpc("tools/call", {"name": "sonar_search",
                           "arguments": {"query": "What is IBM watsonx Orchestrate?",
                                         "depth": "fast"}})
    payload = json.loads(r["result"]["content"][0]["text"])
    check("sonar_search returns an answer", bool(payload.get("answer")))
    check("sonar_search returns citations", bool(payload.get("citations")))

    r = rpc("tools/call", {"name": "frontier_reason",
                           "arguments": {"prompt": "Reply with exactly: REMOTE OK",
                                         "model": "gpt"}})
    payload = json.loads(r["result"]["content"][0]["text"])
    check("frontier_reason answers", bool(payload.get("answer")))
    print(f"     → {payload.get('answer','')[:60]}")
else:
    print("\nLive tools: SKIPPED (no PERPLEXITY_API_KEY)")

print(f"\n=== {PASS} passed, {FAIL} failed ===\n")
raise SystemExit(1 if FAIL else 0)
