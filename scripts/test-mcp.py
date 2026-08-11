#!/usr/bin/env python3
"""Smoke-test storeez-ds-mcp over stdio (spawn, send JSON-RPC, parse responses)."""
import json, subprocess, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MCP = os.path.join(ROOT, "scripts", "storeez-ds-mcp.mjs")

REQS = [
    {"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}},
    {"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}},
    {"jsonrpc": "2.0", "id": 3, "method": "tools/call", "params": {"name": "get_component", "arguments": {"id": "AIInsight"}}},
    {"jsonrpc": "2.0", "id": 4, "method": "tools/call", "params": {"name": "resolve_pattern", "arguments": {"nl": "fighter profile card with confidence"}}},
    {"jsonrpc": "2.0", "id": 5, "method": "tools/call", "params": {"name": "get_tokens", "arguments": {"tier": "semantic"}}},
    {"jsonrpc": "2.0", "id": 6, "method": "tools/call", "params": {"name": "check_states", "arguments": {"id": "Button"}}},
    {"jsonrpc": "2.0", "id": 7, "method": "tools/call", "params": {"name": "get_theme", "arguments": {"brand": "kumite"}}},
]

payload = "\n".join(json.dumps(r) for r in REQS) + "\n"
proc = subprocess.run(["node", MCP], input=payload, capture_output=True, text=True, timeout=30, cwd=ROOT)
if proc.returncode != 0:
    print("MCP EXIT:", proc.returncode)
    print("STDERR:", proc.stderr[:500])
    sys.exit(1)

responses = {}
for line in proc.stdout.strip().split("\n"):
    if not line.strip():
        continue
    d = json.loads(line)
    responses[d.get("id")] = d

ok = True
def show(i, label, fn):
    global ok
    d = responses.get(i)
    if d is None:
        print(f"✗ {label}: no response"); ok = False; return
    if "error" in d:
        print(f"✗ {label}: error {d['error']}"); ok = False; return
    try:
        fn(d)
    except Exception as e:
        print(f"✗ {label}: parse fail {e}"); ok = False

show(1, "initialize", lambda d: print(f"✓ initialize: {d['result']['serverInfo']['name']} v{d['result']['serverInfo']['version']}"))
show(2, "tools/list", lambda d: print(f"✓ tools/list: {len(d['result']['tools'])} tools"))
show(3, "get_component(AIInsight)", lambda d: print(f"✓ get_component: states={json.loads(d['result']['content'][0]['text'])['states']}"))
show(4, "resolve_pattern", lambda d: print(f"✓ resolve_pattern: {[x['id'] for x in json.loads(d['result']['content'][0]['text'])]}"))
show(5, "get_tokens(semantic)", lambda d: print(f"✓ get_tokens: {str(json.loads(d['result']['content'][0]['text']))[:60]}"))
show(6, "check_states(Button)", lambda d: print(f"✓ check_states: passes={json.loads(d['result']['content'][0]['text'])['passes']}"))
show(7, "get_theme(kumite)", lambda d: print(f"✓ get_theme: {json.loads(d['result']['content'][0]['text'])}"))

print("\nMCP SMOKE TEST:", "PASS" if ok else "FAIL")
sys.exit(0 if ok else 1)
