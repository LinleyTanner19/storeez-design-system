#!/usr/bin/env python3
"""Author missing variants for 4 registry entries (RadioGroup, ListItem, DataGroup, StatTile)."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(ROOT, "registry", "registry.json")

VARIANTS = {
    "RadioGroup": ["default", "vertical"],
    "ListItem": ["default", "dense", "selected"],
    "DataGroup": ["default"],
    "StatTile": ["default", "tone"],
}

def main():
    reg = json.load(open(REG))
    for c in reg["components"]:
        if c["id"] in VARIANTS:
            c["variants"] = VARIANTS[c["id"]]
    json.dump(reg, open(REG, "w"), indent=2)
    print("✓ variants authored for 4 entries")

if __name__ == "__main__":
    main()
