/**
 * Storeez Design System — Type tokens
 *
 * Three roles, one invariant title font (handoff v2, C5/C6):
 *   --font-display  per project  — wordmark, Display + Headline, section numerals
 *   --font-title    Archivo      — Title + Label roles, ALL headings
 *   --font-body     Inter        — all reading text
 *   --font-mono     JetBrains    — records, scores, IDs, hex, timers
 *
 * C6 corrections vs v1: MD3 letter-spacing was missing entirely; headline-small
 * ran at weight 600 (now 400); Title roles ran on the body font (now the title
 * font). Weights and tracking below are the MD3 values.
 */

export type FontRole = 'display' | 'title' | 'body' | 'mono';

export interface TypeRole {
  size: number;
  line: number;
  weight: number;
  /** letter-spacing in px */
  tracking: number;
  font: FontRole;
}

const FONT_VAR: Record<FontRole, string> = {
  display: 'var(--font-display)',
  title: 'var(--font-title)',
  body: 'var(--font-body)',
  mono: 'var(--font-mono)',
};

export const typeRoles = {
  displayLarge:   { size: 57, line: 64, weight: 400, tracking: -0.25, font: 'display' },
  displayMedium:  { size: 45, line: 52, weight: 400, tracking: 0,     font: 'display' },
  displaySmall:   { size: 36, line: 44, weight: 400, tracking: 0,     font: 'display' },
  headlineLarge:  { size: 32, line: 40, weight: 400, tracking: 0,     font: 'display' },
  headlineMedium: { size: 28, line: 36, weight: 400, tracking: 0,     font: 'display' },
  headlineSmall:  { size: 24, line: 32, weight: 400, tracking: 0,     font: 'display' },
  titleLarge:     { size: 22, line: 28, weight: 400, tracking: 0,     font: 'title' },
  titleMedium:    { size: 16, line: 24, weight: 500, tracking: 0.15,  font: 'title' },
  titleSmall:     { size: 14, line: 20, weight: 500, tracking: 0.1,   font: 'title' },
  bodyLarge:      { size: 16, line: 24, weight: 400, tracking: 0.5,   font: 'body' },
  bodyMedium:     { size: 14, line: 20, weight: 400, tracking: 0.25,  font: 'body' },
  bodySmall:      { size: 12, line: 16, weight: 400, tracking: 0.4,   font: 'body' },
  labelLarge:     { size: 14, line: 20, weight: 500, tracking: 0.1,   font: 'title' },
  labelMedium:    { size: 12, line: 16, weight: 500, tracking: 0.5,   font: 'title' },
  labelSmall:     { size: 11, line: 16, weight: 500, tracking: 0.5,   font: 'title' },
  /** Storeez addition — records, scores, IDs, hex, timers */
  mono:           { size: 14, line: 20, weight: 400, tracking: 0,     font: 'mono' },
} as const satisfies Record<string, TypeRole>;

export type TypeScaleKey = keyof typeof typeRoles;

/**
 * PROPORTION FLOOR — label-small at 11px is the smallest legal size.
 * Nothing, including annotation and metadata, may be set below this.
 * If nothing in the scale fits, fix the scale — never the instance.
 */
export const MIN_FONT_SIZE = 11;

function shorthand(r: TypeRole): string {
  return `${r.weight} ${r.size}px/${r.line}px ${FONT_VAR[r.font]}`;
}

/** CSS `font` shorthand per role (letter-spacing is a separate property). */
export const scale = Object.fromEntries(
  Object.entries(typeRoles).map(([k, r]) => [k, shorthand(r)])
) as Record<TypeScaleKey, string>;

/** Full style object per role — use this when you need tracking too. */
export const typeStyle = Object.fromEntries(
  Object.entries(typeRoles).map(([k, r]) => [
    k,
    { font: shorthand(r), letterSpacing: `${r.tracking}px` },
  ])
) as Record<TypeScaleKey, { font: string; letterSpacing: string }>;

export const typography = {
  display: { family: 'var(--font-display)', weights: [400, 500, 600] as const },
  title:   { family: 'var(--font-title)',   weights: [400, 500, 600] as const },
  body:    { family: 'var(--font-body)',    weights: [400, 500, 600] as const },
  mono:    { family: 'var(--font-mono)',    weights: [400, 500] as const },
  roles: typeRoles,
  scale,
  style: typeStyle,
  minSize: MIN_FONT_SIZE,
} as const;
