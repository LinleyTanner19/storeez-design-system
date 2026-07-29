import React from 'react';
import type { ProgressProps } from '../../primitives/types';
import styles from './Progress.module.css';

export const Progress: React.FC<ProgressProps> = ({
  variant = 'linear',
  value,
  max = 100,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const isDeterminate = typeof value === 'number';
  const clamped = isDeterminate ? Math.min(Math.max(value as number, 0), max) : 0;
  const pct = isDeterminate ? (clamped / max) * 100 : 0;

  const aria = {
    role: 'progressbar' as const,
    'aria-label': ariaLabel ?? 'progress',
    'aria-valuemin': 0,
    'aria-valuemax': max,
    'aria-valuenow': isDeterminate ? clamped : undefined,
  };

  if (variant === 'circular') {
    const size = 48;
    const stroke = 4;
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = isDeterminate ? circ - (pct / 100) * circ : circ * 0.25;

    return (
      <span
        className={[
          styles.circularWrap,
          isDeterminate ? styles.determinate : styles.indeterminate,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
        {...aria}
      >
        <svg className={styles.circular} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            className={styles.track}
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            className={styles.indicator}
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
          />
        </svg>
      </span>
    );
  }

  // linear
  return (
    <span
      className={[styles.linear, className].filter(Boolean).join(' ')}
      style={style}
      {...aria}
    >
      {isDeterminate ? (
        <span className={styles.bar} style={{ width: `${pct}%` }} />
      ) : (
        <span className={`${styles.bar} ${styles.stripes}`} />
      )}
    </span>
  );
};

export default Progress;
