"""Smoke test — proves the MCP server works against the live APIs.

Run after setup-keys.sh. Reads keys from the environment; prints nothing secret.

    python3 smoke_test.py
"""

import asyncio
import importlib.util
import os
import pathlib

HERE = pathlib.Path(__file__).parent
spec = importlib.util.spec_from_file_location("srv", HERE / "server.py")
srv = importlib.util.module_from_spec(spec)
spec.loader.exec_module(srv)


def _ok(label: str, passed: bool, detail: str = "") -> bool:
    print(f"  {'✓' if passed else '✗'} {label}{(' — ' + detail) if detail else ''}")
    return passed


async def main() -> None:
    print("\n=== Enso Research MCP — smoke test ===\n")

    status = await srv.provider_status()
    print("Providers configured:")
    _ok("Perplexity key present", status["perplexity"])
    _ok("OpenAI via Agent API (uses Perplexity key)", status["openai_via_agent_api"])
    _ok("OpenAI direct key (optional)", status["openai_direct"])
    print()
    has_reason = status["openai_via_agent_api"] or status["openai_direct"]

    results = []

    if status["perplexity"]:
        print("1) sonar_search — live web research")
        try:
            r = await srv.sonar_search(
                "What is IBM watsonx Orchestrate in one sentence?", depth="fast"
            )
            answer = (r.get("answer") or "").strip()
            results.append(_ok("returned an answer", bool(answer), f"{len(answer)} chars"))
            results.append(_ok("returned citations", bool(r.get("citations"))))
            print(f"     → {answer[:160]}...")
        except Exception as e:
            results.append(_ok("sonar_search", False, str(e)[:120]))
        print()
    else:
        print("1) sonar_search — SKIPPED (no Perplexity key)\n")

    if has_reason:
        print("2) openai_reason — synthesis, no web")
        try:
            r = await srv.openai_reason("Reply with exactly: HARNESS OK")
            answer = (r.get("answer") or "").strip()
            results.append(_ok("returned an answer", bool(answer)))
            print(f"     → {answer[:80]}")
        except Exception as e:
            results.append(_ok("openai_reason", False, str(e)[:120]))
        print()
    else:
        print("2) openai_reason — SKIPPED (no key)\n")

    if status["corroborate_available"]:
        print("3) corroborate — cross-provider fact-check")
        try:
            r = await srv.corroborate("How many pages does IBM's agentic AI ROI guide have?")
            results.append(_ok("grounded answer", bool(r.get("grounded_answer"))))
            results.append(_ok("audit ran", "CONFIDENCE" in (r.get("audit") or "").upper()))
            print(f"     → audit: {(r.get('audit') or '')[:180]}...")
        except Exception as e:
            results.append(_ok("corroborate", False, str(e)[:120]))
        print()
    else:
        print("3) corroborate — SKIPPED (needs a Perplexity key)\n")

    passed = sum(1 for r in results if r)
    print(f"=== {passed}/{len(results)} checks passed ===")
    if results and passed == len(results):
        print("Harness is LIVE. Open Claude Code and run /mcp.\n")
    elif not results:
        print("No keys configured yet — run: bash setup-keys.sh\n")
    else:
        print("Some checks failed. Check the key values and your API plan/quota.\n")


if __name__ == "__main__":
    asyncio.run(main())
