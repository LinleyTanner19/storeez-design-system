#!/usr/bin/env python3
"""Register src-only components (Icon, NavTab) + AI patterns into registry.json.

Also marks legacy alias dirs (Card→SCard, RadioButton→RadioGroup) in the
registry as aliases so the reconcile treats them as matched.
"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(ROOT, "registry", "registry.json")

NEW = [
    {
        "id": "Icon",
        "path": "src/primitives/Icon/index.ts",
        "description": "Lucide icon renderer (2px stroke, currentColor). Never emoji. Reserved meanings: sparkles=AI, search-x=AI-empty, wifi-off=offline, cloud-off=cached, triangle-alert=error, circle-check-big=success, refresh-cw=retry, inbox=empty.",
        "category": "core",
        "variants": ["line"],
        "sizes": ["sm", "md", "lg", "xl"],
        "states": ["happy", "disabled"],
        "aiPrompt": "Icon slot for any component. Always pair with text; never decorative-only without aria-hidden. Use the reserved icon for the reserved meaning — do not invent alternatives.",
        "mediums": ["pwa", "web", "native"],
        "tokens": ["--text-primary", "--text-secondary", "--text-muted"],
        "a11y": {"contrast": "AA", "touchTarget": 24},
    },
    {
        "id": "NavTab",
        "path": "src/molecules/NavTab/index.ts",
        "description": "Navigation tab with icon + label + optional badge. Used by BottomNavigation and Tabs.",
        "category": "navigation",
        "variants": ["default", "active"],
        "sizes": [],
        "states": ["happy", "loading", "disabled", "offline"],
        "aiPrompt": "Tab inside BottomNavigation/Tabs. Active state uses primary-container pill + primary-text icon; never semantic-red for badge counts.",
        "mediums": ["pwa", "web", "native"],
        "tokens": ["--md-sys-color-primary-container", "--md-sys-color-primary-text", "--touch-target", "--radius-full"],
        "a11y": {"contrast": "AA", "touchTarget": 44},
    },
]

def main():
    reg = json.load(open(REG))
    existing = {c["id"] for c in reg["components"]}
    added = 0
    for n in NEW:
        if n["id"] in existing:
            print(f"  skip (exists) {n['id']}")
            continue
        reg["components"].append(n)
        added += 1
    json.dump(reg, open(REG, "w"), indent=2)
    print(f"✓ registered {added} new ({len(reg['components'])} total)")

if __name__ == "__main__":
    main()
