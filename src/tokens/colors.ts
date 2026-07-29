/**
 * Storeez Design System — M3 Token Generator
 * Takes a seed colour → full tonal palette + CSS custom properties
 */

export interface M3Palette {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  tertiary: string;
  surface: string;
  surfaceVariant: string;
  outline: string;
  outlineVariant: string;
  error: string;
  onError: string;
  errorContainer: string;
}

export interface DSTheme {
  name: string;
  seed: string;
  palette: M3Palette;
  displayFont: string;
  brandPsychology: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function blendWithWhite(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const blend = (c: number) => c + (255 - c) * amount;
  return rgbToHex(blend(r), blend(g), blend(b));
}

function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const l = (c: number) => Math.min(255, c + amount * 255);
  return rgbToHex(l(r), l(g), l(b));
}

function darken(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  const d = (c: number) => Math.max(0, c - amount * 255);
  return rgbToHex(d(r), d(g), d(b));
}

export function generatePalette(seed: string): M3Palette {
  return {
    primary: seed,
    onPrimary: '#F0EDE8',
    primaryContainer: `${seed}26`, // 15% opacity as hex
    onPrimaryContainer: '#F0EDE8',
    secondary: lighten(seed, 0.3),
    onSecondary: '#F0EDE8',
    secondaryContainer: `${lighten(seed, 0.4)}26`,
    tertiary: lighten(seed, 0.5),
    surface: '#131313',
    surfaceVariant: '#1A1A1A',
    outline: '#2A2A2A',
    outlineVariant: '#242424',
    error: '#D93A3A',
    onError: '#F0EDE8',
    errorContainer: '#D93A3A26',
  };
}

export function paletteToCSS(palette: M3Palette, prefix = 'md-sys'): string {
  return `
--${prefix}-color-primary: ${palette.primary};
--${prefix}-color-on-primary: ${palette.onPrimary};
--${prefix}-color-primary-container: ${palette.primaryContainer};
--${prefix}-color-on-primary-container: ${palette.onPrimaryContainer};
--${prefix}-color-secondary: ${palette.secondary};
--${prefix}-color-on-secondary: ${palette.onSecondary};
--${prefix}-color-secondary-container: ${palette.secondaryContainer};
--${prefix}-color-tertiary: ${palette.tertiary};
--${prefix}-color-surface: ${palette.surface};
--${prefix}-color-surface-variant: ${palette.surfaceVariant};
--${prefix}-color-outline: ${palette.outline};
--${prefix}-color-outline-variant: ${palette.outlineVariant};
--${prefix}-color-error: ${palette.error};
--${prefix}-color-on-error: ${palette.onError};
--${prefix}-color-error-container: ${palette.errorContainer};
`;
}

export const storeezBaseTheme: DSTheme = {
  name: 'storeez',
  seed: '#7B2FBE',
  palette: generatePalette('#7B2FBE'),
  displayFont: "'Space Grotesk', sans-serif",
  brandPsychology: 'Intelligence, creativity, future',
};

export const kumiteTheme: DSTheme = {
  name: 'kumite',
  seed: '#CD2D26',
  palette: generatePalette('#CD2D26'),
  displayFont: "'Bebas Neue', sans-serif",
  brandPsychology: 'Power, aggression, martial arts heritage',
};
