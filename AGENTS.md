# AGENTS.md — Storeez Design System

The entry point agents load first. JSON for MCP (contracts), Markdown for LLM (judgment) — this file is the judgment half. Enforced by CI: token lint, axe per state, visual regression.

## Identity
M3-derived design system. Variable identity: `data-theme` (storeez|kumite|ilot|travelz|violet) × `data-mode` (dark|light) on the root element. Dark default. Brand = seed colour + display font; everything else is shared. Themes override the semantic token tier only.

## Always-on rules (NEVER violate — foundations)
- Tokens ONLY via CSS custom properties / DTCG references. Raw hex in component code = hard failure.
- Text/icons use `--md-sys-color-primary-text`, NEVER the raw primary fill (`--md-sys-color-primary` is FILL only).
- No emoji anywhere. Lucide icons only (2px stroke, currentColor). Reserved: sparkles=AI, search-x=AI-empty, wifi-off=offline, cloud-off=cached, triangle-alert=error, circle-check-big=success, refresh-cw=retry, inbox=empty.
- Every component implements ≥4 of 8 states (loading, empty, happy, error, offline, success, ai-thinking, ai-empty).
- Type hierarchy: display font (identity moments only, varies per brand), Archivo titles/labels, Inter body, JetBrains Mono for ALL data/numbers/IDs/money/refs. Floor 11px.
- Touch targets ≥44px (both densities). WCAG AA contrast 4.5:1. Never transition a colour property reading an `--md-sys-color-*` token — palette swaps repaint instantly.
- Honest AI: never show AI output without WHAT it did + WHY + confidence (numeric % + bar: ≥70 success / 50–69 warning / <50 error) + an override + the fallibility disclaimer. AI never silently rewrites user content. Errors state nothing was saved + a mono ref code.
- No gradients, no glassmorphism, no filler. Cards = surface + 1px border, radius 8–12, hover = border shift.
- Sentence case. UPPERCASE only for 11px overlines + brand names. Voice: direct, expert, dry.
- Frontend: ReactJS (web) / React Native (mobile). CSS custom properties — no Tailwind.

## Component access (on-demand)
- Resolve components ONLY via the registry (`registry.json`) or per-component `component.json` files (schema: `storeez-component.schema.json`).
- Never rebuild a component that exists. Extend via variants or vertical (domain) components.
- Read the component's `aiPrompt` before using it — it encodes when/why and the canonical example to copy.

## Where things live
- `tokens/` + `tokens.json` — DTCG graph (global → semantic → component) and its CSS build output
- `components/{category}/` — jsx + d.ts + prompt.md per component
- `registry.json` — the resolvable inventory · `storeez-component.schema.json` — the component contract schema
- `SKILL.md` — the storeez-design agent skill · `guidelines/` — foundation specimens
- `component-lab.dc.html` — the living visual spec (sections 01–20) · `agentic-layer.html` — this metadata layer, rendered

## Trust levels
- L1 SUGGEST — agent creates issues only. Default for everything new.
- L2 MECHANICAL — agent drafts PRs for mechanical fixes: token renames, doc regeneration, front-matter sync.
- L3 AUTO-MERGE — reserved for low-risk, fully-gated changes; only after L2 has a clean track record.
- NEVER — push to main · auto-merge judgment calls (should this variant exist / does this pattern lie to users) · rewrite user content. Those are human decisions.

## Read first
`readme.md` → `styles.css` → `tokens.json` → `registry.json` → the component's `prompt.md` → `component-lab.dc.html`
