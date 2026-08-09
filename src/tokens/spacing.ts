/**
 * Storeez Design System — Shape, space, elevation, motion, density
 * Handoff v2. Every radius step owns a component class, so radius stops
 * being taste. Motion separates emphasised from standard easing.
 */

export const spacing = {
  '3xs': 2,
  '2xs': 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
} as const;

export type SpacingKey = keyof typeof spacing;

/* ------------------------------------------------------------------ */
/* Shape — each step owns a component class                            */
/* ------------------------------------------------------------------ */

export const radii = {
  none: 0,   // full-bleed, edge panels
  xs: 4,     // chips, checkbox, tags
  sm: 8,     // inputs, cards, menus
  md: 12,    // FAB, tiles, small sheets
  lg: 16,    // dialogs, sheets, sections
  full: 9999, // buttons, avatars, badges
  /** @deprecated alias for `lg` — kept so v1 components keep compiling */
  xl: 16,
} as const;

export type RadiusKey = keyof typeof radii;

export const radiusOwners: Record<Exclude<RadiusKey, 'xl'>, string> = {
  none: 'full-bleed, edge panels',
  xs: 'chips, checkbox, tags',
  sm: 'inputs, cards, menus',
  md: 'FAB, tiles, small sheets',
  lg: 'dialogs, sheets, sections',
  full: 'buttons, avatars, badges',
};

/* ------------------------------------------------------------------ */
/* Elevation — 6 levels. On dark, tone carries it; shadow confirms it. */
/* ------------------------------------------------------------------ */

export const elevation = {
  0: 'none',                              // canvas
  1: '0 1px 2px rgba(0,0,0,0.30)',        // resting card
  2: '0 4px 12px rgba(0,0,0,0.40)',       // raised / menu
  3: '0 8px 24px rgba(0,0,0,0.50)',       // sheet / drawer
  4: '0 12px 32px rgba(0,0,0,0.60)',      // modal
  brand: 'var(--elevation-brand)',        // seed glow — FAB, AI, primary CTA
} as const;

export type ElevationKey = keyof typeof elevation;

/** @deprecated use `elevation` — kept so v1 components keep compiling */
export const shadows = {
  sm: elevation[1],
  md: elevation[2],
  lg: elevation[3],
  xl: elevation[4],
} as const;

export type ShadowKey = keyof typeof shadows;

/* ------------------------------------------------------------------ */
/* Motion — MD3 separates emphasised from standard easing              */
/* ------------------------------------------------------------------ */

export const duration = {
  instant: 50,     // press feedback
  fast: 150,       // hover, state layer
  normal: 250,     // toggle, dropdown
  slow: 400,       // sheet, page, chart
  deliberate: 600, // brand reveal only
} as const;

export type DurationKey = keyof typeof duration;

export const easing = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasised: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  accelerate: 'cubic-bezier(0.3, 0, 1, 1)',
  /** toggles/switches only — never text or layout */
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export type EasingKey = keyof typeof easing;

export const motion = {
  instant: `${duration.instant}ms ${easing.standard}`,
  fast: `${duration.fast}ms ${easing.standard}`,
  normal: `${duration.normal}ms ${easing.standard}`,
  slow: `${duration.slow}ms ${easing.emphasised}`,
  exit: `${duration.fast}ms ${easing.accelerate}`,
  deliberate: `${duration.deliberate}ms ${easing.emphasised}`,
} as const;

export type MotionKey = keyof typeof motion;

/** Looping motion is reserved for SYSTEM STATE, never decoration. */
export const loops = {
  spinner: 700,
  indeterminate: 1400,
  aiThinking: 1200,
  aiThinkingStagger: 200,
  skeleton: 1600,
} as const;

/* ------------------------------------------------------------------ */
/* Density — two, and the touch target never shrinks                   */
/* ------------------------------------------------------------------ */

export type Density = 'comfortable' | 'compact';

export const density = {
  comfortable: {
    cardPadding: spacing.md,   // 16
    sectionGap: spacing.xl,    // 32
    rowHeight: 56,
    motionCap: duration.slow,
    use: 'consumer digital',
  },
  compact: {
    cardPadding: spacing.sm,   // 12
    sectionGap: 20,
    rowHeight: 40,
    motionCap: duration.fast,  // Systems density caps motion at 150ms
    use: 'Systems / back-office',
  },
} as const;

/** Touch target stays 44px on any touch input, in BOTH densities. */
export const TOUCH_TARGET = 44;
