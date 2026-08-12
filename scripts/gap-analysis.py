#!/usr/bin/env python3
"""MD3/Carbon gap analysis for Storeez DS — registry vs full M3 taxonomy + Carbon extras.

Outputs the enrichment roadmap: what exists, what's missing per M3 taxonomy
(primitives/molecules/organisms), plus Carbon-sourced additions the user asked
for (rich as MD3 AND Carbon).
"""
import json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(ROOT, "registry", "registry.json")

# Full MD3 taxonomy (from m3-component-taxonomy.md reference)
M3_PRIMITIVES = ["Button", "FAB", "IconButton", "SegmentedButton", "Dropdown",
                 "TextField", "Checkbox", "RadioButton", "RadioGroup", "Switch", "Slider", "Chip",
                 "Badge", "Avatar", "Icon", "Divider", "Tooltip",
                 "Progress", "Snackbar"]
M3_MOLECULES = ["Card", "List", "ListItem", "FilterGroup", "SearchBar", "NavTab",
                "DataTable", "DataRow", "ButtonGroup", "FormField"]
M3_ORGANISMS = ["TopAppBar", "BottomAppBar", "BottomNavigation", "NavigationDrawer",
                "NavigationRail", "Tabs", "Dialog", "BottomSheet", "Menu",
                "DatePicker", "TimePicker", "SearchView"]

# Carbon-sourced additions (IBM Carbon richness: structured data + governance)
CARBON_EXTRAS = [
    ("DataTable/Pagination", "Pagination controls for DataTable (page size, page nav)", "data-display"),
    ("DataTable/BatchActions", "Batch action bar on selection (Carbon batch action pattern)", "data-display"),
    ("StructuredList", "Simple key-value list without table overhead (Carbon StructuredList)", "data-display"),
    ("Tabs/Overflow", "Overflow tab for too-many-tabs (Carbon)", "navigation"),
    ("Accordion", "Collapsible sections (Carbon Accordion)", "data-display"),
    ("Tile", "Clickable selectable tile (Carbon Tile)", "core"),
    ("InlineNotification", "Inline system notification with action (Carbon)", "feedback"),
    ("ToastNotification", "Dismissible toast with title+subtitle+action (Carbon)", "feedback"),
    ("SkeletonPlaceholder", "Media placeholder skeleton (Carbon)", "feedback"),
    ("ComboBox", "Filterable select (Carbon ComboBox — TextField+Dropdown)", "inputs"),
    ("MultiSelect", "Checkbox multi-select dropdown (Carbon)", "inputs"),
    ("NumberInput", "Stepper number field (Carbon)", "inputs"),
    ("DatePicker/Range", "Date range picker (Carbon)", "inputs"),
    ("ProgressIndicator", "Step indicator (Carbon stepper)", "feedback"),
    ("Tag", "Filterable tag set (Carbon Tag)", "data-display"),
    ("Breadcrumb", "Navigation breadcrumb (Carbon)", "navigation"),
    ("ContentSwitcher", "Toggle between content views (Carbon)", "navigation"),
    ("ContextMenu", "Right-click menu (Carbon)", "overlays"),
]

def norm(name):
    return re.sub(r"[^a-z0-9]", "", name.lower())

def main():
    reg = json.load(open(REG))
    have = {c["id"] for c in reg["components"]}
    # RadioButton counts as RadioGroup (aliased)
    have.add("RadioButton")

    print("=" * 60)
    print("MD3 + CARBON GAP ANALYSIS — Storeez DS")
    print("=" * 60)

    missing_m3 = {"primitives": [], "molecules": [], "organisms": []}
    for name in M3_PRIMITIVES:
        if name not in have:
            missing_m3["primitives"].append(name)
    for name in M3_MOLECULES:
        if name not in have:
            missing_m3["molecules"].append(name)
    for name in M3_ORGANISMS:
        if name not in have:
            missing_m3["organisms"].append(name)

    print(f"\nM3 coverage: {sum(1 for n in M3_PRIMITIVES+M3_MOLECULES+M3_ORGANISMS if n in have)}/{len(M3_PRIMITIVES+M3_MOLECULES+M3_ORGANISMS)}")
    for tier, names in missing_m3.items():
        if names:
            print(f"  MISSING {tier}: {', '.join(names)}")

    print(f"\nCarbon additions proposed: {len(CARBON_EXTRAS)}")
    print("  (extend beyond MD3 — structured data, governance, notification patterns)")
    print("  top value: Pagination, StructuredList, InlineNotification, Breadcrumb,")
    print("             Accordion, Tile, ComboBox, ProgressIndicator, Tag, ContentSwitcher")

    # verticals
    print("\nVertical domains (per-vertical enrichment):")
    verts = [d for d in os.listdir(os.path.join(ROOT, "src", "domain")) if os.path.isdir(os.path.join(ROOT, "src", "domain", d))]
    for v in verts:
        comps = os.listdir(os.path.join(ROOT, "src", "domain", v))
        print(f"  {v}: {len([c for c in comps if os.path.isdir(os.path.join(ROOT, 'src', 'domain', v, c))])} domain dirs")
    print("  (kumite has 5 empty scaffolds: BeltProgress, BracketTree, EventCard, FighterCard, Scorecard)")

if __name__ == "__main__":
    main()
