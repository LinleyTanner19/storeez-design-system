#!/usr/bin/env python3
"""Registry ↔ src reconcile for storeez-ds (agentic conversion, Phase A)."""
import json, os, re, sys

def norm(name):
    return re.sub(r'[^a-z0-9]', '', name.lower())

def main():
    reg = json.load(open('registry/registry.json'))
    reg_ids = [c['id'] for c in reg['components']]

    src_dirs = {}
    for root in ['primitives', 'molecules', 'organisms', 'ai-patterns']:
        base = os.path.join('src', root)
        if not os.path.isdir(base):
            continue
        for d in os.listdir(base):
            p = os.path.join(base, d)
            if os.path.isdir(p) and os.path.exists(os.path.join(p, 'index.ts')):
                src_dirs[norm(d)] = f'src/{root}/{d}'

    reg_norm = {norm(i): i for i in reg_ids}
    registry_only = [reg_norm[k] for k in reg_norm if k not in src_dirs]
    src_only = sorted(f'{v} ({k})' for k, v in src_dirs.items() if k not in reg_norm)

    print(f"registry: {len(reg_ids)} | src dirs with index.ts: {len(src_dirs)}")
    print(f"\nMATCHED: {len(reg_norm) - len(registry_only)}")
    print(f"\nREGISTRY-ONLY (in registry, no src): {len(registry_only)}")
    for x in sorted(registry_only):
        print(f'  {x}')
    print(f"\nSRC-ONLY (in src, not registered): {len(src_only)}")
    for x in src_only:
        print(f'  {x}')

if __name__ == '__main__':
    main()
