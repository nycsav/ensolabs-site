# Signal Lens — watsonx Orchestrate ADK project

A runnable **native agent** for IBM watsonx Orchestrate that scans a market, scores signals against a strategic lens, and publishes a decision-ready brief. This is Enso Labs' reference build for the IBM Partner Plus (Build) partnership and the UC Berkeley RDI Agentic AI Summit demo.

```
adk-scaffold/
├── agents/
│   └── signal_lens.yaml         # native agent definition
├── tools/
│   ├── fetch_signals.py         # Scout  — pulls candidate signals (bundled sample set)
│   ├── score_signal.py          # Curate — scores 1–10 on 4 axes (the Enso lens)
│   └── publish_brief.py         # Publish — formats a dated, cited brief
├── requirements.txt
├── .env.example                 # copy to .env and fill in
└── import.sh                    # one-shot: import tools + agent, start chat
```

> **Version note:** exact CLI flags, model IDs, and env vars can shift between ADK releases. This scaffold follows the documented patterns; confirm specifics against the live docs linked at the bottom before your first run.

---

## Prerequisites

- **Python 3.11–3.13**
- **Docker / a container runtime** (the ADK **Developer Edition** runs a local server)
- A **watsonx Orchestrate** entitlement — either the **30-day SaaS trial** (`cloud.ibm.com/catalog/services/watsonx-orchestrate`) or watsonx.ai credentials for the Developer Edition
- Enso is entitled via **IBM Partner Plus** (Enso Partners LLC, Build track)

## 1. Install the ADK

```bash
python -m venv .venv && source .venv/bin/activate
pip install --upgrade ibm-watsonx-orchestrate
orchestrate --version
```

## 2. Configure credentials

```bash
cp .env.example .env
# then edit .env with your entitlement key / watsonx.ai creds
```

## 3. Start the local Developer Edition server

```bash
orchestrate server start -e .env
orchestrate env activate local
```

## 4. Import the tools + agent and chat

```bash
bash import.sh
# or run the steps individually:
orchestrate tools import -k python -f tools/fetch_signals.py
orchestrate tools import -k python -f tools/score_signal.py
orchestrate tools import -k python -f tools/publish_brief.py
orchestrate agents import -f agents/signal_lens.yaml
orchestrate chat start
```

Then in the chat UI, prompt:

> `Give me today's signal brief on grid-scale battery storage.`

Signal Lens will call **fetch → score → publish** and return a dated, cited brief containing only signals that scored 7+.

---

## Demo notes (Berkeley)

- `fetch_signals` ships with a **bundled sample signal set** so the walkthrough is deterministic and needs no live API keys. Swap in a live retrieval source once the loop is stable (see the TODO in `tools/fetch_signals.py`).
- The scoring rubric in `tools/score_signal.py` is the same 4-axis lens (relevance · materiality · urgency · confidence) behind Enso's Fortune 500 manufacturer deployment — tune the axis weights per client.
- Keep confidential client names out of any live output ("Fortune 500 manufacturer").

## Docs

- ADK home: https://developer.watson-orchestrate.ibm.com/
- Install the ADK: https://developer.watson-orchestrate.ibm.com/getting_started/installing
- Authoring Python tools: https://developer.watson-orchestrate.ibm.com/tools/create_tool
- Authoring native agents: https://developer.watson-orchestrate.ibm.com/agents/build_agent
- Try on IBM Cloud: https://cloud.ibm.com/catalog/services/watsonx-orchestrate
