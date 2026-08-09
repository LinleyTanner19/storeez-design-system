# AGENTS.md — Storeez Design System

> The **design gate** for ALL Storeez projects. This repo is the canonical source of the Storeez design language — tokens, components, AI patterns, 8-state architecture, variable identity. Every Storeez product (KUMITE, BRAINZ, Travelz, ÎLOT, Swan, Diamate, …) consumes this repo as its design gate. No project invents its own design system.

## Identity

M3-derived design system. **Variable identity:** `data-theme` (storeez | kumite | ilot | travelz | violet) × `data-mode` (dark | light) on the root element. Dark default. Brand = seed colour + display font.

**Storeez base = mint `#8DF2B0` (dark) / forest `#253F2F` (light) + Schibsted Grotesk.** Violet is an unassigned vertical, NOT Storeez.

## Always-on rules (NEVER violate — foundations)

- **Tokens ONLY** via CSS custom properties / DTCG references. Raw hex outside `src/tokens/` = hard failure.
- Text/icons use `--md-sys-color-primary-text`, NEVER the raw primary fill.
- **No emoji anywhere.** Lucide icons only. Reserved: `sparkles`=AI · `search-x`=AI empty · `wifi-off`=offline · `cloud-off`=cached · `triangle-alert`=error · `circle-check-big`=success · `refresh-cw`=retry · `inbox`=empty.
- Every component implements **≥4 of 8 states**: loading, empty, happy, error, offline, success, ai-thinking, ai-empty.
- Type hierarchy: display font (identity moments only) · Archivo titles · Inter body · **JetBrains Mono for ALL data/numbers/IDs** · floor 11px.
- Touch targets ≥44px · WCAG AA contrast (4.5:1) · never transition `--md-sys-color-*` tokens (instant palette swap).
- **Honest AI:** never show AI output without what / why / confidence (numeric + colour bar) / override / fallibility disclaimer.
- Sentence case; UPPERCASE only for 11px overlines + brand names (KUMITE, ÎLOT, TRAVELZ).

## Claude Design delivery contract

1. Briefs live in the vault: `~/Documents/storeez/wiki/storeez-ds/claude-design-brief-*.md` (v2 → v3 → v4 → enhancement v2, paste in that order).
2. Claude Design output is downloaded to **`~/Downloads/export/storeez-design-system/`** — the ONLY accepted delivery location.
3. Hermes (or the operator) copies it to `~/Documents/storeez/wiki/storeez-ds/artefacts/claude-design-export/` — the approved visual spec.
4. Approved components are extracted into this repo under `src/` (components), `tokens/` (DTCG graph), `skills/` (agent skills).
5. The lab (`component-lab.html`) is the visual contract. **The lab is the spec** — production React matches it pixel-for-pixel.

## Component access (on-demand)

- Resolve components ONLY via `registry.json` / `component.json` metadata. Never rebuild a component that exists — extend via variants or `src/domain/{project}/`.
- Read the component's `aiPrompt` before using it — it encodes when/why (the reasoning layer).
- New brand variant = new theme (seed + display font + ~20 token overrides) — never a fork of the repo.

## Where things live

```
src/primitives/      18 primitives      src/molecules/    10 molecules
src/organisms/       13 organisms       src/ai-patterns/  4 AI patterns
src/domain/{project}/  vertical components  src/theme/     ThemeProvider + 5 themes × 2 modes
src/tokens/          DTCG token graph + CSS   src/lab/     Component Lab viewer
skills/              agent skills (storeez-design, storeez-tokens, storeez-components, …)
tokens/tokens.json   DTCG global → semantic → component (source of truth)
```

## Orchestration connection

- **Hermes** is the runtime: gateway `localhost:8642`, cron scheduler, skills, Figma bridge.
- Skills that operate on this repo: `storeez-ds-build` (build sequence), `storeez-to-figma` (code↔Figma bridge, COMPONENT_SET naming `STOREZ/Level/Name/Variant`), `storeez-react` (codegen), `storeez-artefact-standards` (quality gates).
- Design gate workflow: Claude Design → approval → tokens/theme → React build → Figma Variables (5 brands × 2 modes) → enforcement gates (token lint, axe per state, visual regression) → agents (issues-only).

## Trust levels (agents working on this repo)

- **L1 suggest** — create issues only. Default for everything new.
- **L2 mechanical** — draft PRs for token renames, doc regeneration, front-matter sync.
- **L3 auto-merge** — low-risk, high-confidence, fully-gated changes only; after L2 track record.
- **NEVER:** push to main, auto-merge judgment calls, silently rewrite user content.

## Related

- Vault: `~/Documents/storeez/wiki/storeez-ds/` — philosophy, build plan, briefs v2–v4, agentic blueprint, research.
- Mirror: `github.com/LinleyTanner19/storeez-design-system`.
