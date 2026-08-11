#!/usr/bin/env python3
"""Token enforcer (L1→L2 agent) — raw-hex + fill-vs-text audit.

Scans src/**/*.css|tsx for:
  1. raw hex / rgb() outside tokens/ (string literals + box-shadow allowed)
  2. color: var(--md-sys-color-primary) used as TEXT colour (fill-vs-text rule)

L1: report issues only. Exit 1 when violations found (CI hook).
"""
import os, re, sys

ROOT = os.path.expanduser("~/Projects/storeez-ds")
hexRe = re.compile(r"#[0-9a-fA-F]{3,8}\b")
rgbRe = re.compile(r"rgba?\(")
fillTextRe = re.compile(r"^\s*color:\s*var\(--md-sys-color-primary\)\s*;")

def main():
    violations = []
    for root, _dirs, files in os.walk(os.path.join(ROOT, "src")):
        if "tokens" in root or "node_modules" in root:
            continue
        for fn in files:
            if not (fn.endswith(".css") or fn.endswith(".tsx") or fn.endswith(".ts")):
                continue
            p = os.path.join(root, fn)
            rel = os.path.relpath(p, ROOT)
            for i, line in enumerate(open(p).read().split("\n"), 1):
                stripped = line.strip()
                if stripped.startswith(("*", "//", "/*")):
                    continue
                if fillTextRe.match(line):
                    violations.append(f"{rel}:{i} fill-vs-text: color uses --md-sys-color-primary (use -text)")
                if rgbRe.search(line) and "box-shadow" not in line and "background" not in line and "border" not in line:
                    # rgba outside shadow/background/border — suspicious
                    violations.append(f"{rel}:{i} raw rgba: {stripped[:60]}")
                if hexRe.search(line) and "'" not in line and '"' not in line and "`" not in line:
                    violations.append(f"{rel}:{i} raw hex: {stripped[:60]}")

    if violations:
        print(f"TOKEN ENFORCER — {len(violations)} violation(s):")
        for v in violations:
            print(f"  - {v}")
        print("\nRule (AGENTS.md): tokens ONLY via CSS custom properties. Raw hex in")
        print("component code = hard failure. Text/icon colour = primary-text, never fill.")
        sys.exit(1)
    print("TOKEN ENFORCER — clean: no raw colors, no fill-vs-text violations.")
    sys.exit(0)

if __name__ == "__main__":
    main()
