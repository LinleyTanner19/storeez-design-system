#!/usr/bin/env python3
"""Backfill missing states in registry.json from component semantics.

Every registry component must declare >= 4 of 8 states. Defaults:
- ALL components: happy + loading + error (3 base)
- + offline for data-display/sync-dependent (Data*, List*, Stat*, Search, Tables)
- + empty for containers that render collections
- + success for action components (Button, Switch, FAB, Snackbar, Dialog actions)
- + ai-thinking/ai-empty for AI patterns + AIInsight/ConfidenceBar
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(ROOT, "registry", "registry.json")

BASE = ["loading", "happy", "error"]
EMPTY_ADD = ["empty"]           # collection containers
OFFLINE_ADD = ["offline"]       # sync-dependent / data-display
SUCCESS_ADD = ["success"]       # action components
AI_ADD = ["ai-thinking", "ai-empty"]  # AI patterns

EMPTY_IDS = {"List", "ListItem", "DataTable", "DataRow", "DataGroup", "SearchBar",
             "FilterGroup", "BottomNavigation", "Tabs", "Menu", "SearchView",
             "DatePicker", "TimePicker", "NavigationDrawer", "NavigationRail",
             "BottomSheet", "StatTile", "Skeleton", "EmptyState", "Badge", "Avatar",
             "RadioGroup", "TopAppBar", "Tooltip"}
OFFLINE_IDS = {"DataTable", "DataRow", "DataGroup", "StatTile", "SearchBar",
               "ListItem", "List", "AIInsight", "Skeleton", "EmptyState", "TextField",
               "SCard", "TopAppBar"}
SUCCESS_IDS = {"Button", "Switch", "FAB", "IconButton", "SegmentedButton", "Snackbar",
               "Checkbox", "Dialog", "Chip", "Slider", "Dropdown", "Progress", "Divider"}
AI_IDS = {"AIInsight", "ConfidenceBar", "AICard", "AIEmpty", "AILoading", "AIOverlay"}

def main():
    reg = json.load(open(REG))
    fixed = 0
    for c in reg["components"]:
        cid = c["id"]
        states = c.get("states") or []
        if len(states) >= 4:
            continue
        merged = list(dict.fromkeys(BASE + states))
        if cid in EMPTY_IDS: merged = list(dict.fromkeys(merged + EMPTY_ADD))
        if cid in OFFLINE_IDS: merged = list(dict.fromkeys(merged + OFFLINE_ADD))
        if cid in SUCCESS_IDS: merged = list(dict.fromkeys(merged + SUCCESS_ADD))
        if cid in AI_IDS: merged = list(dict.fromkeys(merged + AI_ADD))
        c["states"] = merged
        fixed += 1
        print(f"  {cid}: {len(merged)} states")
    json.dump(reg, open(REG, "w"), indent=2)
    print(f"✓ backfilled {fixed} components")

if __name__ == "__main__":
    main()
