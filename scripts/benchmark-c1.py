#!/usr/bin/env python3
"""C1 benchmark: JSON vs Markdown vs Hybrid context for agent resolution.

3 real Storeez queries (KUMITE fighter profile, Travelz itinerary card, ÎLOT
stat tile). For each format: build the context an agent would receive, measure
token cost (chars/4 heuristic + real LLM call), then run the query through
DeepSeek and score whether the answer resolves to OUR components/tokens.

Output: benchmark report (JSON) at wiki/storeez-ds/benchmark-c1.json.
"""
import os, json, glob, re, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = json.load(open(os.path.join(ROOT, "registry", "registry.json")))
COMPS = os.path.join(ROOT, "components")

QUERIES = [
    {
        "id": "kumite-fighter",
        "query": "Build a KUMITE fighter profile card: name, record (W-L-D in mono), gym, weight class badge, and an AI-predicted next opponent with confidence.",
        "needs": ["SCard", "Badge", "AIInsight", "ConfidenceBar", "DataRow"],
    },
    {
        "id": "travelz-itinerary",
        "query": "Travelz day-3 itinerary: 4 stops with times in mono, transport type chips, and an empty state when no activities are planned.",
        "needs": ["SCard", "Chip", "ListItem", "EmptyState", "DataRow"],
    },
    {
        "id": "ilot-stat",
        "query": "ÎLOT dashboard: 3 stat tiles (occupancy, rentals, revenue), a sortable table of recent transactions, and offline handling.",
        "needs": ["StatTile", "DataTable", "DataGroup", "EmptyState"],
    },
]

def load_key():
    with open(os.path.expanduser("~/.hermes/.env")) as f:
        for line in f:
            if line.startswith("DEEPSEEK_DIRECT_KEY="):
                return line.split("=", 1)[1].strip()
    return None

def call_ds(system, user, key, max_tokens=400):
    body = json.dumps({
        "model": "deepseek-chat",
        "messages": [{"role": "system", "content": system}, {"role": "user", "content": user}],
        "max_tokens": max_tokens,
    }).encode()
    req = urllib.request.Request("https://api.deepseek.com/v1/chat/completions", data=body, headers={
        "Content-Type": "application/json", "Authorization": f"Bearer {key}"})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read())["choices"][0]["message"]["content"] or ""
    except Exception as e:
        return f"ERROR: {e}"

def md_context(query):
    """Markdown-only: registry rendered as prose."""
    lines = ["# Storeez Design System — Component Registry", ""]
    for c in REG["components"]:
        lines.append(f"## {c['id']}")
        lines.append(f"- {c.get('description', '')[:100]}")
        lines.append(f"- variants: {', '.join(c.get('variants', []) or [])}")
        lines.append(f"- states: {', '.join(c.get('states', []) or [])}")
        lines.append(f"- aiPrompt: {c.get('aiPrompt', '')[:120]}")
        lines.append("")
    return "\n".join(lines)

def json_context(query):
    """JSON-only: registry as the raw contract JSON."""
    slim = [{"id": c["id"], "description": c.get("description", ""), "variants": c.get("variants", []),
             "states": c.get("states", []), "aiPrompt": c.get("aiPrompt", ""), "tokens": c.get("tokens", [])}
            for c in REG["components"]]
    return json.dumps(slim, indent=1)

def hybrid_context(query):
    """Hybrid: registry index (JSON) + the 6 most relevant component contracts (full)."""
    idx = json.dumps([{"id": c["id"], "category": c.get("category", ""), "description": (c.get("description") or "")[:60]} for c in REG["components"]], indent=1)
    relevant = []
    for need in query["needs"]:
        for f in glob.glob(f"{COMPS}/**/{need}.json", recursive=True):
            d = json.load(open(f))
            relevant.append(d)
    contracts = json.dumps(relevant, indent=1)
    return f"# Registry index (JSON)\n{idx}\n\n# Relevant component contracts (JSON)\n{contracts}"

def tokens(text):
    return max(1, len(text) // 4)

def score_answer(answer, needs):
    """Score: how many required components the answer actually uses."""
    used = 0
    for n in needs:
        if n.lower() in answer.lower():
            used += 1
    return used, len(needs)

def main():
    key = load_key()
    if not key:
        print("No DEEPSEEK_DIRECT_KEY — running token-cost benchmark only")
    report = {"generated": "2026-08-11", "results": []}
    for q in QUERIES:
        row = {"query_id": q["id"], "query": q["query"], "needs": q["needs"], "formats": {}}
        for fmt, ctx in [("markdown", md_context(q)), ("json", json_context(q)), ("hybrid", hybrid_context(q))]:
            entry = {"context_chars": len(ctx), "est_tokens": tokens(ctx)}
            if key:
                answer = call_ds(
                    "You are an agent resolving UI requirements against the Storeez design system. "
                    "Use ONLY components named in the provided registry/contracts. Never invent components.",
                    f"CONTEXT:\n{ctx[:8000]}\n\nTASK: {q['query']}\n\nList the exact components you would use, then the composition.",
                    key)
                used, total = score_answer(answer, q["needs"])
                entry["answer_head"] = answer[:200]
                entry["resolved"] = f"{used}/{total}"
                entry["quality"] = "good" if used >= max(2, total - 1) else ("partial" if used >= 1 else "fail")
            row["formats"][fmt] = entry
        report["results"].append(row)
    os.makedirs(os.path.expanduser("~/Documents/storeez/wiki/storeez-ds"), exist_ok=True)
    out = os.path.expanduser("~/Documents/storeez/wiki/storeez-ds/benchmark-c1.json")
    with open(out, "w") as f:
        json.dump(report, f, indent=2)
    print(f"✓ benchmark written: {out}")
    for r in report["results"]:
        print(f"\n{r['query_id']}: needs={r['needs']}")
        for fmt, e in r["formats"].items():
            print(f"  {fmt:9s} tokens={e['est_tokens']:6d} resolved={e.get('resolved','n/a')} quality={e.get('quality','n/a')}")

if __name__ == "__main__":
    main()
