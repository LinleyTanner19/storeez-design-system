# Dynamic Design System — Transversal Core × Vertical Specialization

> **The DS is ONE system with TWO tiers.** A transversal core shared by every vertical (all 46 MD3 components, tokens, 8-state, Honest AI, gate) + specialized domain components per vertical that COMPOSE the core — never fork it. Resolution is dynamic: an agent working on Travelz sees core + travelz domain, never kumite's.

## The two tiers

```
TRANSVERSAL CORE (shared, never varies by vertical)
├── 46 MD3 components (primitives → molecules → organisms)
├── tokens.json DTCG graph (global → semantic → component)
├── 8-state model · Honest AI contract · no-emoji/Lucide-only
├── npm run gate (schema · token lint · fill-vs-text · registry · states)
├── storeez-ds-mcp (the only path to components)
└── AI patterns (AIInsight, ConfidenceBar, EmptyState, Skeleton)

VERTICAL TIER (specialized, composes the core)
├── src/domain/<vertical>/… — domain components ONLY
│   e.g. kumite: FighterCard, BeltProgress, EventCard, Scorecard, BracketTree
├── theme override: seed colour + display font (semantic tier only)
├── vertical aiPrompt additions (when/why judgments specific to the domain)
└── registry entries tagged `vertical: <name>` — resolved ONLY for that vertical
```

## The non-negotiable rules

1. **Vertical components COMPOSE the core, never rebuild it.** FighterCard uses SCard + Badge + AIInsight. If a vertical needs a different Button, it configures the core Button — it does not create `KumiteButton`.
2. **Core never imports domain.** `src/primitives|molecules|organisms` have zero knowledge of `src/domain/*`. Dependency direction is one-way: domain → core.
3. **Tokens are tiered, not forked.** A vertical overrides the semantic tier (seed + display font) only. It never adds raw colors outside the DTCG graph. Belt colors in KUMITE are vertical identity (martial-arts grades) — declared as vertical tokens in tokens.json, not raw hex in CSS.
4. **The gate applies to both tiers.** Domain components pass the same `npm run gate` — schema, token lint, fill-vs-text, registry, ≥4-of-8 states. No vertical exemption.
5. **Resolution is dynamic via the MCP.** `get_registry(vertical)` returns core + that vertical's domain components. An agent never sees another vertical's domain inventory.

## Registry tagging

```json
{ "id": "FighterCard", "vertical": "kumite", "category": "domain",
  "composes": ["SCard", "Badge", "AIInsight", "ConfidenceBar"],
  "states": ["loading", "empty", "happy", "offline", "ai-thinking"] }
```

- `vertical` absent = transversal (core). `vertical: kumite` = specialized.
- `composes` declares the core components it builds on — the MCP checks these resolve.

## How a vertical is born (the dynamic flow)

```
1. Theme: add seed + display font to tokens.json semantic tier (5×2 matrix)
2. Domain components: build in src/domain/<vertical>/ composing core primitives
3. Register: registry entries with vertical: <name> + composes[]
4. Vertical aiPrompt: when/why judgments specific to the domain (e.g. KUMITE
   "never semantic-red for belt grades — they are identity, not risk")
5. Lab: vertical section renders core + domain for that vertical
6. Gate + MCP: everything is automatic — same gate, same MCP, vertical-aware
```

## What "dynamic" means operationally

- **Agents** resolve `get_registry(vertical)` → correct inventory, zero cross-vertical noise.
- **Builds** are shared: one gate, one tokens graph, one CI — verticals add, never fork.
- **New vertical = new theme + domain dir + registry entries.** No DS copy, no divergence, no drift risk (drift detector covers domain too).
- **The lab** toggles verticals like it toggles themes — same core, different domain layer.

## Related
- `process/agentic-ds-process.md` — the agentic playbook
- `surface-behaviour.md` — surface × role-tier × age-cohort (applies to both tiers)
- `registry/registry.json` — the tagged inventory
- `src/domain/` — the vertical tier, one dir per vertical
