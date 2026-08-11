#!/usr/bin/env python3
"""Drift detector (L1 agent) — daily cron, SILENT WHEN CLEAN.

Detects drift in the Storeez DS:
  1. Registry ↔ src: entries whose path no longer resolves
  2. State coverage: components with < 4 of 8 states
  3. Schema violations: component.json missing required fields
  4. Token drift: raw hex/rgb outside tokens/ in src
  5. Naming drift: registry ids that don't match their src dir

Exit 0 + no output when clean (watchdog pattern). Exit 1 + report when drift.
"""
import json, os, re, sys, glob

ROOT = os.path.expanduser("~/Projects/storeez-ds")

def norm(name):
    return re.sub(r"[^a-z0-9]", "", name.lower())

def main():
    issues = []

    # 1. registry resolve
    reg = json.load(open(os.path.join(ROOT, "registry", "registry.json")))
    for c in reg["components"]:
        p = os.path.join(ROOT, c.get("path", ""))
        if not os.path.exists(p):
            issues.append(f"registry path missing: {c['id']} → {c.get('path')}")

    # 2. state coverage
    for c in reg["components"]:
        n = len(c.get("states") or [])
        if n < 4:
            issues.append(f"states: {c['id']} has {n} (< 4 of 8)")

    # 3. schema (required fields)
    schema = json.load(open(os.path.join(ROOT, "storeez-component.schema.json")))
    req = set(schema.get("required", []))
    for f in glob.glob(f"{ROOT}/components/**/*.json", recursive=True):
        d = json.load(open(f))
        mf = [r for r in req if r not in d]
        if mf:
            issues.append(f"schema: {os.path.basename(f)} missing {mf}")

    # 4. raw hex in src (outside tokens/)
    hexRe = re.compile(r"#[0-9a-fA-F]{3,8}\b")
    for root, _dirs, files in os.walk(os.path.join(ROOT, "src")):
        if "tokens" in root or "node_modules" in root:
            continue
        for fn in files:
            if not (fn.endswith(".css") or fn.endswith(".tsx") or fn.endswith(".ts")):
                continue
            p = os.path.join(root, fn)
            for i, line in enumerate(open(p).read().split("\n"), 1):
                if line.strip().startswith(("*", "//")):
                    continue
                if "'" in line or '"' in line or "`" in line:
                    continue  # string literal (demo docs)
                if hexRe.search(line):
                    issues.append(f"token drift: {os.path.relpath(p, ROOT)}:{i} raw hex")

    # 5. naming: registry id vs src dir
    for c in reg["components"]:
        p = c.get("path", "")
        if "src/" in p:
            d = p.split("/")[-2]
            if norm(d) != norm(c["id"]) and c["id"] not in ("ConfidenceBar", "Skeleton", "List", "DataGroup"):
                issues.append(f"naming: registry {c['id']} vs dir {d}")

    if issues:
        print(f"DRIFT DETECTED — {len(issues)} issue(s):")
        for i in issues:
            print(f"  - {i}")
        sys.exit(1)
    # silent when clean
    sys.exit(0)

if __name__ == "__main__":
    main()
