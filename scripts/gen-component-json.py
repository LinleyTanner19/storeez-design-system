#!/usr/bin/env python3
"""A2: Generate component.json per component from registry + export prompt.md.

Reads registry/registry.json (35 components) + Claude Design export prompt.md
files (when present) → writes components/<category>/<id>.json validating against
storeez-component.schema.json. Prose stays in prompt.md; JSON is the contract.
"""
import json, os, glob, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REGISTRY = os.path.join(ROOT, "registry", "registry.json")
SCHEMA = os.path.join(ROOT, "storeez-component.schema.json")
OUT = os.path.join(ROOT, "components")
EXPORT = os.path.expanduser("~/Downloads/Storeez Design System/components")

# registry category -> export subdir
CATMAP = {
    "Button": "core", "FAB": "actions", "IconButton": "actions", "SegmentedButton": "actions",
    "TextField": "core", "Checkbox": "inputs", "RadioGroup": "inputs", "Switch": "core",
    "Slider": "inputs", "Dropdown": "inputs", "Chip": "core", "Badge": "core", "Avatar": "display",
    "Divider": "display", "Tooltip": "display", "Progress": "display", "Snackbar": "display",
    "SCard": "core", "List": "lists", "ListItem": "lists", "DataRow": "lists", "DataGroup": "lists",
    "StatTile": "lists", "DataTable": "lists", "SearchBar": "navigation", "FilterGroup": "navigation",
    "Tabs": "navigation", "BottomNavigation": "navigation", "TopAppBar": "navigation",
    "Dialog": "overlays", "BottomSheet": "overlays", "EmptyState": "overlays", "Skeleton": "overlays",
    "AIInsight": "ai", "ConfidenceBar": "ai",
}

def load_prompt(comp_id):
    cat = CATMAP.get(comp_id, "")
    for pattern in [f"{EXPORT}/{cat}/{comp_id}.prompt.md", f"{EXPORT}/**/{comp_id}.prompt.md"]:
        matches = glob.glob(pattern, recursive=True)
        if matches:
            return open(matches[0]).read()[:600]
    return ""

def main():
    reg = json.load(open(REGISTRY))
    schema = json.load(open(SCHEMA))
    req = set(schema["required"])
    os.makedirs(OUT, exist_ok=True)

    ok, missing = 0, []
    for c in reg["components"]:
        cid = c["id"]
        prompt = load_prompt(cid)
        entry = {
            "id": cid,
            "description": c.get("description") or prompt.split("\n")[0][:120] if prompt else f"{cid} component",
            "category": CATMAP.get(cid, "core"),
            "variants": c.get("variants", []),
            "sizes": c.get("sizes", []),
            "states": c.get("states", ["loading", "empty", "happy", "error", "offline"]),
            "props": c.get("props", []),
            "aiPrompt": c.get("aiPrompt") or prompt,
            "mediums": ["pwa", "web", "native"],
            "tokens": c.get("tokens", []),
            "a11y": c.get("a11y") or {"contrast": "AA", "touchTarget": 44},
            "offline": c.get("offline") or {"behaviour": "cached + synced X ago", "states": ["offline"]},
        }
        missing_fields = [f for f in req if f not in entry]
        if missing_fields:
            missing.append((cid, missing_fields))
            continue
        cat_dir = os.path.join(OUT, entry["category"])
        os.makedirs(cat_dir, exist_ok=True)
        with open(os.path.join(cat_dir, f"{cid}.json"), "w") as f:
            json.dump(entry, f, indent=2)
        ok += 1

    print(f"✓ component.json written: {ok}/{len(reg['components'])}")
    for cid, mf in missing:
        print(f"  ✗ {cid}: missing {mf}")

if __name__ == "__main__":
    main()
