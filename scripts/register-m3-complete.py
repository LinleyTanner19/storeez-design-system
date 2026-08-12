#!/usr/bin/env python3
"""Register the 9 new MD3 components (molecules + organisms) into the registry."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REG = os.path.join(ROOT, "registry", "registry.json")

NEW = [
    {"id": "ButtonGroup", "path": "src/molecules/ButtonGroup/index.ts", "description": "MD3: 2-4 equal-width segmented actions, single-select. Never stacks two filled buttons.", "category": "actions", "variants": ["single-select"], "states": ["loading", "empty", "happy", "error"], "aiPrompt": "Group of mutually-exclusive actions (segmented). Selected = filled, others = text. Use when 2-4 equal options in a row.", "mediums": ["pwa", "web", "native"], "tokens": ["--md-sys-color-primary", "--md-sys-color-primary-text"], "a11y": {"contrast": "AA", "touchTarget": 44}},
    {"id": "FormField", "path": "src/molecules/FormField/index.ts", "description": "MD3: label + input + helper + error wrapper. Error never semantic-red for risk.", "category": "inputs", "variants": ["default", "error"], "states": ["loading", "empty", "happy", "error", "offline"], "aiPrompt": "Wraps a TextField/control with label, helper, and error messaging. Required marker. Error copy states the problem + fix.", "mediums": ["pwa", "web", "native"], "tokens": ["--text-secondary", "--text-muted", "--error"], "a11y": {"contrast": "AA", "touchTarget": 44}},
    {"id": "NavigationDrawer", "path": "src/organisms/NavigationDrawer/index.ts", "description": "MD3 modal navigation drawer — slide-left + scrim, esc/backdrop close.", "category": "navigation", "variants": ["modal"], "states": ["loading", "empty", "happy", "offline"], "aiPrompt": "App-level navigation. Drawer opens over content with scrim; close on backdrop/esc. Items = NavTab rows.", "mediums": ["pwa", "web", "native"], "tokens": ["--surface", "--scrim", "--shadow-xl"], "a11y": {"contrast": "AA", "touchTarget": 44}},
    {"id": "NavigationRail", "path": "src/organisms/NavigationRail/index.ts", "description": "MD3 desktop rail — 72px fixed sidebar, icon-primary, top/bottom slots.", "category": "navigation", "variants": ["default"], "states": ["loading", "empty", "happy", "offline"], "aiPrompt": "Desktop/tablet persistent navigation. Icons + labels in 72px rail; top slot for FAB, bottom for avatar.", "mediums": ["web"], "tokens": ["--surface", "--border"], "a11y": {"contrast": "AA", "touchTarget": 44}},
    {"id": "BottomAppBar", "path": "src/organisms/BottomAppBar/index.ts", "description": "MD3 bottom app bar — FAB centred + 4 icon actions, 80px, safe-area aware.", "category": "navigation", "variants": ["default"], "states": ["loading", "empty", "happy", "offline"], "aiPrompt": "Mobile primary actions: FAB centre + up to 4 icon actions. Never overflow; badges in mono.", "mediums": ["pwa", "native"], "tokens": ["--surface", "--border"], "a11y": {"contrast": "AA", "touchTarget": 44}},
    {"id": "Menu", "path": "src/organisms/Menu/index.ts", "description": "MD3 anchored menu — keyboard (arrows/enter/esc), backdrop dismiss, destructive items.", "category": "overlays", "variants": ["default"], "states": ["loading", "empty", "happy", "offline"], "aiPrompt": "Context menu anchored to trigger. Keyboard-first: arrows navigate, esc closes. Destructive items error-red, never for risk status.", "mediums": ["pwa", "web", "native"], "tokens": ["--surface-elevated", "--shadow-xl", "--error"], "a11y": {"contrast": "AA", "touchTarget": 44}},
    {"id": "SearchView", "path": "src/organisms/SearchView/index.ts", "description": "MD3 full-screen search overlay — search bar + recents + filter chips. AI-empty echoes query.", "category": "navigation", "variants": ["fullscreen"], "states": ["loading", "empty", "happy", "ai-empty"], "aiPrompt": "Full-screen search. Recents before query; results after. AI-empty: echo query + 3 alternatives, never dead-end.", "mediums": ["pwa", "web", "native"], "tokens": ["--bg", "--md-sys-color-primary-text"], "a11y": {"contrast": "AA", "touchTarget": 44}},
    {"id": "DatePicker", "path": "src/organisms/DatePicker/index.ts", "description": "MD3 date picker — calendar grid, month nav, range mode, today highlight.", "category": "inputs", "variants": ["single", "range"], "states": ["loading", "empty", "happy", "error", "offline"], "aiPrompt": "Calendar selection. Range mode picks start+end. Today outlined, selected = primary fill. Data in mono.", "mediums": ["pwa", "web", "native"], "tokens": ["--md-sys-color-primary", "--md-sys-color-primary-container", "--font-mono"], "a11y": {"contrast": "AA", "touchTarget": 44}},
    {"id": "TimePicker", "path": "src/organisms/TimePicker/index.ts", "description": "MD3 time picker — clock dial + input, 12h/24h, minute steps.", "category": "inputs", "variants": ["12h", "24h"], "states": ["loading", "empty", "happy", "error", "offline"], "aiPrompt": "Time selection via clock dial. Hours then minutes; AM/PM when 12h. Values in mono.", "mediums": ["pwa", "web", "native"], "tokens": ["--md-sys-color-primary", "--md-sys-color-primary-container", "--font-mono"], "a11y": {"contrast": "AA", "touchTarget": 44}},
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
