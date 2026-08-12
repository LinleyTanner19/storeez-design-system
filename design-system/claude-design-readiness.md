# Claude Design Readiness — Gate and Missing Work (Storeez DS)

> The check before the v5 visual pass starts. Mirrors the Swan KB readiness gate (verified 2026-08-11) so both programs hand Claude Design the same quality of input: contracts and tokens present, screens and flows specified, nothing invented at the design stage.

---

## Gate status

| Requirement | Status |
|---|---|
| Token values (colour, type, space, radius, motion) | ✅ `tokens.json` DTCG 3-tier + built `src/tokens/*.css` |
| Surface + cohort tiers | ❌ spec exists (`design-system/surface-behaviour.md`) — **tokens not added** (blocking) |
| Brand decisions resolved | ✅ mint `#8DF2B0` / forest `#253F2F` + Schibsted Grotesk; 5-theme matrix in DTCG `global.color.brand` |
| Component contracts with reasoning | ✅ 46, schema-valid, `npm run gate` green |
| Content contract | ❌ **missing** (blocking for copy-rich verticals) |
| 8-state model + Honest AI | ✅ foundations in AGENTS.md + AIInsight/ConfidenceBar |
| Personas + psychology + surface behaviour | ⚠️ storeez-ds has personas in Commons; **psychology/surface layers not yet added** (Swan has both) |
| Vertical tier (dynamic DS) | ⚠️ kumite 3 built (FighterCard, BeltProgress, EventCard), 2 scaffolds empty; **not registered in registry** (blocking) |
| **Flow contracts** | ❌ **missing** (blocking — screens need flows) |
| Screen list | ❌ missing (blocking) |
| `registry.json` vertical tagging | ❌ `vertical`/`composes` fields not added |
| Missing components specified | ⚠️ 11 unvalidated builds + 5 verticals — needs contract-first spec for v5 |

**Verdict: the component sheet is drawable (46 contracts + tokens). The product is not — no flows, no screens, no vertical resolution.** The v5 pass must receive flow contracts + content contract + surface tokens, or it draws components into a void.

---

## What must be closed BEFORE the v5 brief is pasted

In order — each unblocks the next:

1. **Surface + cohort tokens** → `tokens.json` semantic tier (`data-surface`, `data-cohort` groups). The spec is written (`surface-behaviour.md`); the tokens aren't.
2. **Flow contracts** → machine-readable, Swan shape. First two: **KUMITE fight-day** (exercises the vertical tier: event → bracket → fighter → scorecard) and **Travelz itinerary** (proves cross-vertical resolution).
3. **Content contract** → one-decision test + disclosure ladder (Glance → Answer → Working → Source), AI copy included.
4. **Vertical registry tagging** → `vertical: kumite` + `composes[]` on the 5 domain components; MCP `get_registry(vertical)`.
5. **Screen list** → the surfaces each flow renders (mobile/tablet/desktop × cohort), so Claude Design draws screens into flows.

---

## Missing components — contract-first list for the v5 pass

### Unvalidated builds (repo has code, never a Claude Design visual spec)
| # | Component | Why it needs design |
|---|---|---|
| 1 | `DatePicker` | Calendar grid — heaviest visual component |
| 2 | `TimePicker` | Clock dial + 12h/24h |
| 3 | `Menu` | Anchoring, keyboard, destructive states |
| 4 | `SearchView` | Full-screen overlay hierarchy |
| 5 | `NavigationDrawer` | Modal drawer + scrim |
| 6 | `NavigationRail` | 72px rail density |
| 7 | `BottomAppBar` | FAB centering + safe-area |
| 8 | `ButtonGroup` | Segmented layout |
| 9 | `FormField` | Label/helper/error hierarchy |
| 10 | `Icon` | Lucide size/colour rules |
| 11 | `NavTab` | Active pill + badge |

### Vertical domain components (kumite)
| # | Component | Composes | Status |
|---|---|---|---|
| 12 | `FighterCard` | SCard, Badge, AIInsight, ConfidenceBar | built, needs spec |
| 13 | `BeltProgress` | List, Progress | built, needs spec |
| 14 | `EventCard` | SCard, Button, Badge | built, needs spec |
| 15 | `Scorecard` | SCard, DataRow, DataGroup | **empty scaffold** |
| 16 | `BracketTree` | SCard, List, Avatar | **empty scaffold** |

### Flow-derived (from the fight-day + itinerary flows)
| # | Component | Why |
|---|---|---|
| 17 | `stepper` | Every wizard (registration, ticket, claim) has no step component |
| 18 | `toast` | Undo windows, confirmations |
| 19 | `money-input` | MUR/USD formatting distinct from read-only display |
| 20 | `date-field` | Locale DD/MM/YYYY, event dates |
| 21 | `tag` | Fighter/event classification (weight class, format) |

**Sequence:** close the 5 blocking items first, then the v5 brief covers 16 (11 core + 5 vertical) + the flow-derived 5.

---

## Related
- `design-system/dynamic-ds.md` — transversal core × vertical tier
- `design-system/surface-behaviour.md` — surface × cohort spec
- `registry/registry.json` — needs `vertical`/`composes` tagging
- Swan equivalent: `~/Projects/swan/06_KNOWLEDGE_BASE/design-system/claude-design-readiness.md`
