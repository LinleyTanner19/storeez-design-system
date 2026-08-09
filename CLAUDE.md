# CLAUDE.md — Storeez Design System

The **design gate** for all Storeez projects. Full rules in AGENTS.md — read it first. Key points:

- **Variable identity:** `data-theme` × `data-mode`. Storeez base = mint `#8DF2B0`/forest `#253F2F` + Schibsted Grotesk. 5 themes × 2 modes.
- **Tokens only** (CSS vars / DTCG). Text uses `--md-sys-color-primary-text`, never raw fill.
- **No emoji.** Lucide only, reserved icons (sparkles=AI, wifi-off=offline, …).
- **≥4 of 8 states** per component. JetBrains Mono for all data. 44px targets. WCAG AA.
- **Honest AI:** what/why/confidence/override/fallibility on every AI output.
- **Claude Design delivery:** briefs in vault `wiki/storeez-ds/claude-design-brief-*.md` (v2→v3→v4→enhancement); output → `~/Downloads/export/storeez-design-system/` → copied to `wiki/storeez-ds/artefacts/claude-design-export/` → components extracted to `src/`. The lab is the spec.
- **Agents:** L1 issues-only, L2 mechanical PRs, L3 auto-merge only low-risk gated. Never push to main.
- **Hermes** runs the pipeline: `storeez-ds-build`, `storeez-to-figma`, `storeez-react`, `storeez-artefact-standards` skills; Figma bridge naming `STOREZ/Level/Name/Variant`.

Vault: `~/Documents/storeez/wiki/storeez-ds/` · Mirror: `github.com/LinleyTanner19/storeez-design-system`.
