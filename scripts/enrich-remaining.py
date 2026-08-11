#!/usr/bin/env python3
"""Enrich remaining registry entries with full contract fields (description,
category, variants, mediums, a11y) so every entry passes the schema gate."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(ROOT, "registry", "registry.json")

ENRICH = {
    "DataTable": {
        "description": "Dense sortable data grid. Mono for all numeric/data cells. Desktop-primary; on mobile compose as card list (never raw table).",
        "category": "data-display",
        "variants": ["default", "dense"],
        "mediums": ["web", "native"],
        "a11y": {"contrast": "AA", "touchTarget": 40, "sort": "aria-sort"},
    },
    "SearchBar": {
        "description": "Search input with optional filter chips. Enter submits; chips toggle filters. AI-empty echoes the query + 3 alternatives.",
        "category": "navigation",
        "variants": ["default"],
        "mediums": ["pwa", "web", "native"],
        "a11y": {"contrast": "AA", "touchTarget": 44, "label": "aria-label required"},
    },
    "FilterGroup": {
        "description": "Toggleable filter chips with aria-pressed. Selected uses primary-container + on-primary-container. Never semantic-red for active filters.",
        "category": "navigation",
        "variants": ["default"],
        "mediums": ["pwa", "web", "native"],
        "a11y": {"contrast": "AA", "touchTarget": 44},
    },
    "Tabs": {
        "description": "Primary/secondary tab bar with badges. aria-selected + role=tablist. Active underline uses primary fill; badges never semantic-red.",
        "category": "navigation",
        "variants": ["primary", "secondary"],
        "mediums": ["pwa", "web", "native"],
        "a11y": {"contrast": "AA", "touchTarget": 44, "roles": "tablist/tab"},
    },
    "BottomNavigation": {
        "description": "Mobile bottom nav with 3-5 items, active pill + badge. Never overflow; badge counts in mono, never semantic-red.",
        "category": "navigation",
        "variants": ["default", "centered"],
        "mediums": ["pwa", "native"],
        "a11y": {"contrast": "AA", "touchTarget": 56},
    },
    "TopAppBar": {
        "description": "App header: title + subtitle + leading/actions. Sticky on scroll; never animates palette tokens on theme swap.",
        "category": "navigation",
        "variants": ["default", "large", "small"],
        "mediums": ["pwa", "web", "native"],
        "a11y": {"contrast": "AA", "touchTarget": 44},
    },
    "Dialog": {
        "description": "Modal with backdrop scrim, tone support (error/warning/success), icon. Error dialogs state nothing was saved + mono ref code. aria-modal + backdrop-click close.",
        "category": "overlays",
        "variants": ["default", "tone"],
        "mediums": ["pwa", "web", "native"],
        "a11y": {"contrast": "AA", "touchTarget": 44, "modal": "aria-modal"},
    },
    "BottomSheet": {
        "description": "Bottom sheet with drag handle, title/subtitle, scrollable content. Mobile-primary; never gesture-only (close button always available).",
        "category": "overlays",
        "variants": ["default", "full"],
        "mediums": ["pwa", "native"],
        "a11y": {"contrast": "AA", "touchTarget": 44, "modal": "aria-modal"},
    },
    "EmptyState": {
        "description": "Empty/error/AI-empty surface: icon + why + next action. Never a dead end — every empty state has an action. AI-empty echoes query + 3 alternatives.",
        "category": "feedback",
        "variants": ["dashed", "solid"],
        "mediums": ["pwa", "web", "native", "email"],
        "a11y": {"contrast": "AA", "touchTarget": 44},
    },
}

def main():
    reg = json.load(open(REG))
    fixed = 0
    for c in reg["components"]:
        if c["id"] in ENRICH:
            c.update(ENRICH[c["id"]])
            fixed += 1
    json.dump(reg, open(REG, "w"), indent=2)
    print(f"✓ enriched {fixed} entries")

if __name__ == "__main__":
    main()
