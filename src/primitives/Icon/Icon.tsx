import React from 'react';
import { icons as lucideIcons } from 'lucide-react';
import type { IconProps } from '../../primitives/types';
import styles from './Icon.module.css';

/**
 * Storeez DS — Icon (handoff v2, CORRECTION 8)
 *
 * v1 passed EMOJI as icon names (icon="🔍", icon="♥"). Emoji cannot inherit
 * colour, break the stroke rhythm, and render differently on every OS.
 * Replaced with Lucide: 2px stroke, `currentColor` only, four sizes each
 * paired to a type role.
 *
 * Rules enforced here:
 *   - `currentColor` only — the icon never carries its own colour
 *   - stroke width fixed at 2px; never scale outside the four steps
 *   - `aria-label` on every icon-only control; `aria-hidden` when decorative
 *   - one family, always — an unknown name renders nothing, never emoji
 */

/** size token -> px. Each pairs to a type role. */
export const ICON_SIZE = {
  sm: 16, // label-small / body-small
  md: 20, // body-medium / label-large
  lg: 24, // body-large / title
  xl: 32, // headline
} as const;

export const ICON_STROKE = 2;

/**
 * RESERVED GLYPHS — one meaning each, never decorative.
 * Using any of these for anything but its meaning is a defect.
 */
export const RESERVED_ICONS = {
  ai: 'sparkles',            // AI — always, everywhere
  aiEmpty: 'search-x',       // AI returned nothing
  offline: 'wifi-off',
  cached: 'cloud-off',
  error: 'triangle-alert',
  success: 'circle-check-big',
  retry: 'refresh-cw',
  empty: 'inbox',
} as const;

export type ReservedIconKey = keyof typeof RESERVED_ICONS;

/**
 * Icon-only controls are limited to glyphs whose meaning is universal.
 * Everything else must be paired with a visible label.
 */
export const ICON_ONLY_ALLOWED = ['house', 'search', 'x', 'arrow-left'] as const;

/** Per-project domain sets — each project extends the core set. */
export const DOMAIN_ICONS = {
  storeez: ['layers', 'atom', 'palette', 'package', 'book-open', 'git-branch', 'server-cog', 'sparkles'],
  kumite: ['swords', 'medal', 'trophy', 'clipboard-list', 'timer', 'weight', 'network', 'dumbbell'],
  ilot: ['building-2', 'chart-pie', 'trending-up', 'banknote', 'gavel', 'scan-search', 'ruler', 'key-round'],
  travelz: ['plane', 'map', 'route', 'bed-double', 'stamp', 'banknote', 'sun', 'handshake'],
} as const;

export type DomainKey = keyof typeof DOMAIN_ICONS;

/** kebab-case (Lucide's canonical name) -> PascalCase (the React export). */
function toPascal(name: string): string {
  return name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

type GlyphComponent = React.ComponentType<{
  size?: number;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}>;

const registry = lucideIcons as unknown as Record<string, GlyphComponent>;

/** True when `name` resolves to a real Lucide glyph. Used by the token tests. */
export function isValidIconName(name: string): boolean {
  return Boolean(registry[toPascal(name)]);
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const Glyph = registry[toPascal(name)];

  if (!Glyph) {
    if (import.meta.env.DEV) {
      // Never silently fall back to text/emoji — that is the bug this corrects.
      console.warn(
        `[storeez-ds] Icon "${name}" is not a Lucide glyph. Use a kebab-case Lucide name (e.g. "search", "sparkles"). Emoji are not icons.`
      );
    }
    return null;
  }

  const px = ICON_SIZE[size as keyof typeof ICON_SIZE] ?? ICON_SIZE.md;

  return (
    <span
      className={[styles.icon, styles[size], className].filter(Boolean).join(' ')}
      style={style}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <Glyph size={px} strokeWidth={ICON_STROKE} absoluteStrokeWidth />
    </span>
  );
};

export default Icon;
