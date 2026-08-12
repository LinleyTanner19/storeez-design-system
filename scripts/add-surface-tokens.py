#!/usr/bin/env python3
"""Add data-surface + data-cohort semantic tiers AND the kumite vertical
identity tokens to tokens.json (DTCG). Surface spec exists in
design-system/surface-behaviour.md — this makes it machine-readable."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOKENS = os.path.join(ROOT, "tokens.json")

def main():
    t = json.load(open(TOKENS))

    # 1. surface + cohort tiers (semantic — the token-tier model, §4a of surface-behaviour)
    t["semantic"]["surface"] = {
        "$description": "data-surface token tier. Components read these; they never branch on who is looking. mobile|tablet|desktop on the root element.",
        "density": {
            "mobile": {"$value": "comfortable", "$type": "dimension"},
            "tablet": {"$value": "medium", "$type": "dimension"},
            "desktop": {"$value": "compact", "$type": "dimension"},
        },
        "touch": {
            "mobile": {"$value": "44px", "$type": "dimension"},
            "tablet": {"$value": "44px", "$type": "dimension"},
            "desktop": {"$value": "40px", "$type": "dimension"},
        },
        "textScale": {
            "mobile": {"$value": "16px", "$type": "dimension"},
            "tablet": {"$value": "16px", "$type": "dimension"},
            "desktop": {"$value": "14px", "$type": "dimension"},
        },
    }
    t["semantic"]["cohort"] = {
        "$description": "data-cohort token tier. native 18-35 | mid 36-55 | senior 56-75. Senior = 18px+ floor, high contrast, larger touch.",
        "textFloor": {
            "native": {"$value": "14px", "$type": "dimension"},
            "mid": {"$value": "14px", "$type": "dimension"},
            "senior": {"$value": "18px", "$type": "dimension"},
        },
        "contrast": {
            "native": {"$value": "AA", "$type": "string"},
            "mid": {"$value": "AA", "$type": "string"},
            "senior": {"$value": "AAA", "$type": "string"},
        },
    }

    # 2. kumite vertical identity tokens (DTCG global.color — NOT raw hex in CSS)
    t["global"]["color"]["vertical"] = {
        "$description": "Vertical identity colors — declared here, never raw in CSS. KUMITE: belt grades are identity, not risk (exempt from semantic-red).",
        "kumite": {
            "gold": {"$value": "#C9A84C", "$type": "color"},
            "belt-white": {"$value": "#E8E4DF", "$type": "color"},
            "belt-blue": {"$value": "#2563EB", "$type": "color"},
            "belt-purple": {"$value": "#7C3AED", "$type": "color"},
            "belt-brown": {"$value": "#78350F", "$type": "color"},
            "belt-black": {"$value": "#0D0D0D", "$type": "color"},
            "belt-redblack": {"$value": "#991B1B", "$type": "color"},
            "belt-red": {"$value": "#7F1D1D", "$type": "color"},
        },
    }

    json.dump(t, open(TOKENS, "w"), indent=2)
    print("✓ tokens.json: data-surface + data-cohort tiers + kumite vertical identity added")

if __name__ == "__main__":
    main()
