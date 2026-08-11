import React from 'react';
import styles from './StatTile.module.css';

export type StatTone = 'success' | 'warning' | 'error' | 'brand';

export interface StatTileProps {
  value: string | number;
  label: string;
  tone?: StatTone;
  className?: string;
  style?: React.CSSProperties;
}

/** STATES: happy (value), loading (Skeleton value), error (— / N/A), offline (cached value). */
export function StatTile({ value, label, tone, className, style }: StatTileProps) {
  const colors: Record<StatTone, string> = {
    success: 'var(--success)',
    warning: 'var(--warning)',
    error: 'var(--error)',
    brand: 'var(--md-sys-color-primary-text)',
  };
  return (
    <div className={[styles.tile, className].filter(Boolean).join(' ')} style={style}>
      <div className={styles.value} style={tone ? { color: colors[tone] } : undefined}>
        {value}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default StatTile;
