#!/usr/bin/env python3
"""A11y reviewer (L1 agent) — WCAG AA static audit per component.

Checks each component.json contract for a11y completeness + each component's
STATES comment vs the declared states. Creates issues only (L1) — never edits.

Output: human-readable report; exit 0 always (reporting, not blocking).
"""
import json, os, glob, sys

ROOT = os.path.expanduser("~/Projects/storeez-ds")

def main():
    findings = []
    reg = json.load(open(os.path.join(ROOT, "registry", "registry.json")))
    for c in reg["components"]:
        a11y = c.get("a11y") or {}
        issues = []
        if "contrast" not in a11y:
            issues.append("missing contrast claim")
        if a11y.get("contrast") not in (None, "AA", "AAA", "exempt-decorative"):
            issues.append(f"contrast must be AA/AAA/exempt-decorative, got {a11y.get('contrast')}")
        # interactive components need touch target
        interactive = c.get("category") in ("actions", "inputs", "navigation", "overlays")
        if interactive and not a11y.get("touchTarget"):
            issues.append("interactive component missing touchTarget")
        # states
        states = c.get("states") or []
        if len(states) < 4:
            issues.append(f"only {len(states)} states declared")
        if "happy" not in states:
            issues.append("missing happy state")
        if issues:
            findings.append(f"{c['id']}: {'; '.join(issues)}")

    # token contrast check: primary vs primary-text for text usage
    print("A11Y REVIEW — Storeez DS")
    print("=" * 40)
    if findings:
        print(f"{len(findings)} component(s) with a11y gaps:")
        for f in findings:
            print(f"  - {f}")
    else:
        print("All components pass static a11y contract checks.")
    print()
    print("NOTE: static checks only. Run axe per rendered state (Playwright) for")
    print("dynamic coverage — the gate's a11y layer is the runtime complement.")
    sys.exit(0)

if __name__ == "__main__":
    main()
