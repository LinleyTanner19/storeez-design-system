# CLAUDE.md — Storeez Design System

You are generating UI for the Storeez Design System. Read `AGENTS.md` for the full hard-rule list — it is binding. The short version:

- Tokens only (`var(--*)`), never raw hex. Coloured text uses `--md-sys-color-primary-text`, never the raw fill.
- ≥4 of the 8 universal states per component (Loading, Empty, Happy, Error, Offline, Success, AI Thinking, AI Empty).
- Lucide only, no emoji. 44px targets. 11px type floor. WCAG AA.
- Honest AI on every AI output: what / why / confidence bar / override / "AI can be wrong" disclaimer. Mono ref codes on errors.
- Resolve components from `registry.json`; compose, don't reinvent. Copy the canonical example in each component's `aiPrompt`.
- Brand switching is `data-theme` × `data-mode` on the root — structure never changes, only seed colour + display font.
- React / React Native. MD3 conventions resolve any ambiguity.

Read order: `readme.md` → `AGENTS.md` → `registry.json` → `tokens.json` → the component's `.prompt.md`.
