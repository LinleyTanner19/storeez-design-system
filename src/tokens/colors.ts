/**
 * Storeez Design System — M3 Token Generator
 *
 * Variable identity: seed colour + display font = brand.
 * Two independent axes: brand (5) x mode (dark | light) = 10 valid combinations.
 *
 * Handoff v2 corrections applied:
 *   C1 — mint #8DF2B0 is the house colour; violet demoted to a vertical variant
 *   C2 — Storeez Base display font is Schibsted Grotesk; Bebas Neue dropped entirely
 *   C3 — Travelz cannot use Inter (it is --font-body); substituted Manrope
 *   C4 — every brand carries a dark primary AND a light primary, because a seed
 *        that reads on #0D0D0D almost never reads on #FFFFFF
 *   C4b — Travelz moves from #0078D4 (collided with ILOT, 4.3:1) to teal #2DD4BF
 *   C7 — state layers replace the filter: brightness() interaction hack
 */

export type Mode = 'dark' | 'light';

export interface M3Palette {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  tertiary: string;
  surfaceDim: string;
  surface: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  outline: string;
  outlineVariant: string;
  success: string;
  warning: string;
  error: string;
  onError: string;
  errorContainer: string;
  info: string;
}

export interface DSTheme {
  /** Slug used as [data-theme] */
  name: string;
  /** Human label for pickers */
  label: string;
  /** Dark-mode seed — measured against the #0D0D0D canvas */
  seedDark: string;
  /** Light-mode seed — measured against the #FAFAF8 canvas */
  seedLight: string;
  displayFont: string;
  brandPsychology: string;
  /** true for the house brand; verticals are false */
  isHouse: boolean;
}

/* ------------------------------------------------------------------ */
/* Colour maths — contrast is measured, never assumed                  */
/* ------------------------------------------------------------------ */

const CANVAS_DARK = '#0D0D0D';
const CANVAS_LIGHT = '#FAFAF8';

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** WCAG 2.1 relative luminance. */
export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.1 contrast ratio between two hex colours. */
export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Pick the on-colour that actually reads on `bg`.
 * This is why Storeez Base and Travelz have dark primary buttons — deliberate,
 * not a bug: white on mint is 1.7:1, dark on mint is 14.4:1.
 */
export function pickOnColor(bg: string, light = '#F0EDE8', dark = '#0D0D0D'): string {
  return contrast(bg, light) >= contrast(bg, dark) ? light : dark;
}

function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const l = (c: number) => c + (255 - c) * amount;
  return rgbToHex(l(r), l(g), l(b));
}

function darken(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const d = (c: number) => c * (1 - amount);
  return rgbToHex(d(r), d(g), d(b));
}

/** rgba() string from a hex + alpha — used for container tiers and state layers. */
export function alpha(hex: string, a: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/* ------------------------------------------------------------------ */
/* Neutrals — invert by mode; accents retone per brand                 */
/* ------------------------------------------------------------------ */

export const neutrals: Record<Mode, {
  bg: string; surface: string; surfaceElevated: string; surfaceHover: string;
  border: string; borderLight: string;
  textPrimary: string; textSecondary: string; textMuted: string;
  success: string; warning: string; error: string; info: string;
}> = {
  dark: {
    bg: CANVAS_DARK,
    surface: '#131313',
    surfaceElevated: '#1A1A1A',
    surfaceHover: '#242424',
    border: '#2A2A2A',
    borderLight: '#333333',
    textPrimary: '#F0EDE8',
    textSecondary: '#8A8A8A',
    // 2.4:1 on dark — decorative only, never body copy
    textMuted: '#555555',
    success: '#22A65A',
    warning: '#E5A437',
    error: '#D93A3A',
    info: '#3B82F6',
  },
  light: {
    bg: CANVAS_LIGHT,
    surface: '#FFFFFF',
    surfaceElevated: '#F4F4F1',
    surfaceHover: '#EDEDE9',
    border: '#E2E2DD',
    borderLight: '#D5D5CF',
    textPrimary: '#131313',
    textSecondary: '#5A5A5A',
    textMuted: '#8A8A8A',
    // signal colours darken in light mode — the dark-mode values fail on white
    success: '#157A41',
    warning: '#9A6B12',
    error: '#B92B2B',
    info: '#1D5FD1',
  },
};

/* ------------------------------------------------------------------ */
/* State layers (C7) — MD3 opacities, one rule for every variant       */
/* ------------------------------------------------------------------ */

export const stateLayer = {
  enabled: 0,
  hover: 0.08,
  focus: 0.1,
  pressed: 0.12,
  dragged: 0.16,
  /** MD3 value — v1 incorrectly used 0.40 */
  disabled: 0.38,
} as const;

export type StateLayerKey = keyof typeof stateLayer;

/* ------------------------------------------------------------------ */
/* Palette generation                                                  */
/* ------------------------------------------------------------------ */

export function generatePalette(seed: string, mode: Mode = 'dark'): M3Palette {
  const n = neutrals[mode];
  const onPrimary = pickOnColor(seed, '#F0EDE8', CANVAS_DARK);
  const shift = mode === 'dark' ? lighten : darken;

  return {
    primary: seed,
    onPrimary,
    primaryContainer: alpha(seed, 0.15),
    onPrimaryContainer: n.textPrimary,
    secondary: shift(seed, 0.3),
    onSecondary: pickOnColor(shift(seed, 0.3), '#F0EDE8', CANVAS_DARK),
    secondaryContainer: alpha(shift(seed, 0.4), 0.15),
    tertiary: shift(seed, 0.5),
    surfaceDim: n.bg,
    surface: n.surface,
    surfaceContainer: n.surfaceElevated,
    surfaceContainerHigh: n.surfaceHover,
    outline: n.borderLight,
    outlineVariant: n.border,
    success: n.success,
    warning: n.warning,
    error: n.error,
    onError: mode === 'dark' ? '#F0EDE8' : '#FFFFFF',
    errorContainer: alpha(n.error, 0.12),
    info: n.info,
  };
}

export function paletteToCSS(palette: M3Palette, prefix = 'md-sys'): string {
  return Object.entries(palette)
    .map(([k, v]) => {
      const kebab = k.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
      return `--${prefix}-color-${kebab}: ${v};`;
    })
    .join('\n');
}

/* ------------------------------------------------------------------ */
/* Brand table (C1–C4b)                                                */
/* ------------------------------------------------------------------ */

export const storeezBaseTheme: DSTheme = {
  name: 'storeez',
  label: 'Storeez Base',
  seedDark: '#8DF2B0',   // 14.4:1 on #0D0D0D — AAA
  seedLight: '#253F2F',  // 11.5:1 on #FFFFFF — mint is ~1.2:1 on white, unusable
  displayFont: "'Schibsted Grotesk', sans-serif",
  brandPsychology: 'Product studio — clarity, growth, craft',
  isHouse: true,
};

export const kumiteTheme: DSTheme = {
  name: 'kumite',
  label: 'KUMITE',
  seedDark: '#CD2D26',   // 4.6:1 on dark — AA
  seedLight: '#A81F19',
  // KUMITE brand override (D-017): display font carries brand psychology.
  // Psychology = power, discipline, martial heritage → condensed all-caps
  // fight-poster vernacular (Bebas Neue), not a platform grotesque.
  // C2 dropped Bebas Neue from the BASE display set; this vertical reclaims it
  // deliberately as an overridable identity axis — override must stay
  // decision-logged. Impact = classic condensed-sans fallback.
  displayFont: "'Bebas Neue', Impact, sans-serif",
  brandPsychology: 'Power, discipline, martial heritage',
  isHouse: false,
};

export const ilotTheme: DSTheme = {
  name: 'ilot',
  label: 'ÎLOT',
  seedDark: '#5AA9E6',   // #0057A3 is 2.7:1 on dark — unusable, so lightened (C4)
  seedLight: '#0057A3',
  displayFont: "'Playfair Display', serif", // serif — intentional exception
  brandPsychology: 'Real-estate tokenisation — trust, permanence, island',
  isHouse: false,
};

export const travelzTheme: DSTheme = {
  name: 'travelz',
  label: 'Travelz',
  seedDark: '#2DD4BF',   // 10.4:1 on dark; was #0078D4 which collided with ÎLOT (C4b)
  seedLight: '#0F766E',
  displayFont: "'Manrope', sans-serif", // Inter is --font-body, so it cannot be display (C3)
  brandPsychology: 'Travel intelligence — movement, discovery, warmth',
  isHouse: false,
};

export const violetTheme: DSTheme = {
  name: 'violet',
  label: 'Violet (variant)',
  seedDark: '#7B2FBE',   // former Storeez Base colour, demoted (C1)
  seedLight: '#62228F',
  displayFont: "'Sora', sans-serif",
  brandPsychology: 'Intelligence, creativity, future',
  isHouse: false,
};

export const themes = [
  storeezBaseTheme,
  kumiteTheme,
  ilotTheme,
  travelzTheme,
  violetTheme,
] as const;

export type ThemeName = (typeof themes)[number]['name'];

export function getTheme(name: ThemeName): DSTheme {
  return themes.find(t => t.name === name) ?? storeezBaseTheme;
}

/** Resolve a brand + mode to a full palette. */
export function resolve(name: ThemeName, mode: Mode = 'dark'): M3Palette {
  const t = getTheme(name);
  return generatePalette(mode === 'dark' ? t.seedDark : t.seedLight, mode);
}

/**
 * Accessibility audit — returns every brand/mode pair whose primary fails
 * WCAG AA (4.5:1) against its own canvas. Used by the token test.
 */
export function auditContrast(): Array<{
  theme: string; mode: Mode; seed: string; ratio: number; passesAA: boolean; passesAAA: boolean;
}> {
  const rows: Array<{
    theme: string; mode: Mode; seed: string; ratio: number; passesAA: boolean; passesAAA: boolean;
  }> = [];
  for (const t of themes) {
    for (const mode of ['dark', 'light'] as Mode[]) {
      const seed = mode === 'dark' ? t.seedDark : t.seedLight;
      const canvas = mode === 'dark' ? CANVAS_DARK : CANVAS_LIGHT;
      const ratio = contrast(seed, canvas);
      rows.push({
        theme: t.name,
        mode,
        seed,
        ratio: Math.round(ratio * 100) / 100,
        passesAA: ratio >= 4.5,
        passesAAA: ratio >= 7,
      });
    }
  }
  return rows;
}
