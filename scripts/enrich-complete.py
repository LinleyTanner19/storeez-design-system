#!/usr/bin/env python3
"""Complete pass: fill EVERY registry entry's missing contract fields from the
generated component.json files (which carry full data + prompt descriptions).
Any field still missing after this is genuinely absent and must be authored."""
import json, os, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(ROOT, "registry", "registry.json")
COMPS = os.path.join(ROOT, "components")

def load_contracts():
    out = {}
    for f in glob.glob(f"{COMPS}/**/*.json", recursive=True):
        d = json.load(open(f))
        out[d["id"]] = d
    return out

DEFAULTS = {
    "mediums": ["pwa", "web", "native"],
    "a11y": {"contrast": "AA", "touchTarget": 44},
}

def main():
    reg = json.load(open(REG))
    contracts = load_contracts()
    fixed = 0
    still_missing = []
    for c in reg["components"]:
        cid = c["id"]
        contract = contracts.get(cid, {})
        for field in ["description", "category", "variants", "mediums", "a11y"]:
            if field not in c or c.get(field) in (None, [], ""):
                if field in contract and contract.get(field):
                    c[field] = contract[field]
                    fixed += 1
                elif field in DEFAULTS:
                    c[field] = DEFAULTS[field]
                    fixed += 1
                else:
                    still_missing.append(f"{cid}.{field}")
        # also fill sizes + props from contract if absent
        for field in ["sizes", "props", "offline", "usage"]:
            if field not in c and field in contract and contract.get(field):
                c[field] = contract[field]
    json.dump(reg, open(REG, "w"), indent=2)
    print(f"✓ completed pass: {fixed} fields filled")
    if still_missing:
        print("STILL MISSING (must be authored):")
        for s in sorted(set(still_missing)):
            print(f"  {s}")

if __name__ == "__main__":
    main()
