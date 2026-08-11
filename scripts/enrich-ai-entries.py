#!/usr/bin/env python3
"""Enrich Skeleton/AIInsight/ConfidenceBar registry entries with full contract fields."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(ROOT, "registry", "registry.json")

ENRICH = {
    "Skeleton": {
        "description": "Loading primitive mirroring the final layout. Shimmer 1.6s; paired with what's-happening text (8-state: loading). Never used as decoration after load.",
        "category": "display",
        "variants": ["default"],
        "mediums": ["pwa", "web", "native"],
        "a11y": {"contrast": "n/a (decorative)", "touchTarget": 0, "ariaHidden": True},
    },
    "AIInsight": {
        "description": "The AI slot — tinted footer on a card. Enforces Honest AI: what/why/confidence/override/disclaimer. Never silently rewrites content; errors state nothing was saved.",
        "category": "ai",
        "variants": ["default", "tinted"],
        "mediums": ["pwa", "web", "native"],
        "a11y": {"contrast": "AA", "touchTarget": 0},
    },
    "ConfidenceBar": {
        "description": "Always beside AI output, never optional. Numeric % in mono + bar: >=70 success, 50-69 warning, <50 error. Honest AI confidence meter.",
        "category": "ai",
        "variants": ["success", "warning", "error"],
        "mediums": ["pwa", "web", "native"],
        "a11y": {"contrast": "AA", "touchTarget": 0, "role": "progressbar"},
    },
}

def main():
    reg = json.load(open(REG))
    for c in reg["components"]:
        if c["id"] in ENRICH:
            c.update(ENRICH[c["id"]])
    json.dump(reg, open(REG, "w"), indent=2)
    print("✓ enriched 3 entries")

if __name__ == "__main__":
    main()
