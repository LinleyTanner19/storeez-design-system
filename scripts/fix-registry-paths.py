#!/usr/bin/env python3
"""Fix registry.json paths to resolve against real src/ locations.

The v4 registry from Claude Design points at export-style paths
(components/core/Button.jsx). For the agentic system, the registry is the
ONLY path to components — agents resolve here. Paths must point at the real
src/<category>/<Name>/<Name>.tsx + index.ts.
"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REGISTRY = os.path.join(ROOT, "registry", "registry.json")
SRC = os.path.join(ROOT, "src")

# src category dirs
SRC_CATS = ["primitives", "molecules", "organisms", "ai-patterns"]

def norm(name):
    return re.sub(r'[^a-z0-9]', '', name.lower())

def resolve(cid):
    """Find real src dir for a component id."""
    n = norm(cid)
    for cat in SRC_CATS:
        base = os.path.join(SRC, cat)
        if not os.path.isdir(base):
            continue
        for d in os.listdir(base):
            if norm(d) == n:
                p = os.path.join(base, d)
                if os.path.exists(os.path.join(p, "index.ts")):
                    return f"src/{cat}/{d}/index.ts", cat
    return None, None

def main():
    reg = json.load(open(REGISTRY))
    fixed, missing = 0, []
    for c in reg["components"]:
        cid = c["id"]
        # special cases: slots sharing files
        slot_map = {
            "List": "src/molecules/ListItem/index.ts",
            "DataGroup": "src/molecules/DataRow/index.ts",
            "Skeleton": "src/organisms/EmptyState/index.ts",
            "ConfidenceBar": "src/ai-patterns/AIInsight/index.ts",
            "RadioGroup": "src/inputs/RadioGroup/index.ts",
        }
        if cid in slot_map:
            p = slot_map[cid]
            if os.path.exists(os.path.join(ROOT, p)):
                c["path"] = p
                fixed += 1
                continue
        p, cat = resolve(cid)
        if p:
            c["path"] = p
            fixed += 1
        else:
            missing.append(cid)
    json.dump(reg, open(REGISTRY, "w"), indent=2)
    print(f"✓ registry paths resolved: {fixed}/{len(reg['components'])}")
    print(f"  unresolved: {missing if missing else 'none'}")

if __name__ == "__main__":
    main()
