import React from 'react';
import styles from './SCard.module.css';

export type SCardVariant = 'surface' | 'elevated' | 'brand' | 'filled' | 'outlined';

/** Legacy Card aliases: filled→surface, outlined→surface (border style kept). */
const VARIANT_MAP: Record<string, SCardVariant> = {
  surface: 'surface',
  elevated: 'elevated',
  brand: 'brand',
  filled: 'surface',
  outlined: 'surface',
};

export interface SCardProps {
  variant?: SCardVariant;
  clickable?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * STATES:
 * - happy: default render
 * - loading: children may include Skeleton
 * - error: children may include error copy; clickable cards stay usable
 * - offline: children may include cached-data notice; card renders regardless
 */
export function SCard({ variant = 'surface', clickable = false, className, onClick, children, style }: SCardProps) {
  const resolved = VARIANT_MAP[variant] ?? 'surface';
  return (
    <div
      className={[styles.card, styles[resolved], clickable ? styles.clickable : '', className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {children}
    </div>
  );
}

export default SCard;
