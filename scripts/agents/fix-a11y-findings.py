#!/usr/bin/env python3
"""Fix a11y reviewer findings: Skeleton contrast exemption + TextField happy state."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
REG = os.path.join(ROOT, "registry", "registry.json")

def main():
    reg = json.load(open(REG))
    for c in reg["components"]:
        if c["id"] == "Skeleton":
            a11y = c.get("a11y") or {}
            a11y["contrast"] = "exempt-decorative"
            a11y["note"] = "Skeleton is decorative (aria-hidden). Contrast N/A by design."
            c["a11y"] = a11y
        if c["id"] == "TextField":
            states = c.get("states") or []
            if "happy" not in states:
                states = list(dict.fromkeys(["happy"] + states))
                c["states"] = states
    json.dump(reg, open(REG, "w"), indent=2)
    print("✓ fixed Skeleton a11y exemption + TextField happy state")

if __name__ == "__main__":
    main()
