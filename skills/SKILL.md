---
name: storeez-design
description: Use this skill to generate well-branded interfaces and assets for Storeez Studio and its verticals (KUMITE, ÎLOT, Travelz), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
Agent metadata layer: read AGENTS.md first (binding rules + trust levels), resolve components via registry.json (never rebuild them), validate contracts against storeez-component.schema.json, trace tokens through tokens.json (DTCG). Every component's .prompt.md carries parseable front-matter (uses / avoids / a11y / offline). The visual spec is component-lab.dc.html; the metadata layer is rendered in agentic-layer.html.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key rules that are easy to miss:
- Brand = data-theme (storeez|kumite|ilot|travelz|violet) × data-mode (dark|light) on the root element. Dark is default.
- Text/icons use --md-sys-color-primary-text, never the raw primary fill.
- Never transition a colour property bound to an --md-sys-color-* token.
- Lucide icons only, currentColor, no emoji. 11px minimum type. 44px minimum touch targets.
- Honest AI: every AI output shows what/why/confidence.
- Production code targets ReactJS (web) / React Native (mobile) — always. Design inspiration is Material Design 3; defer to MD3 conventions when the system is silent.
