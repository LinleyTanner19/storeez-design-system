import React from 'react';
import styles from './AIInsight.module.css';

export interface ConfidenceBarProps {
  value: number;
  className?: string;
}

/** Confidence 0-100. ≥70 success / 50-69 warning / <50 error tone. Honest AI contract. */
export function ConfidenceBar({ value, className }: ConfidenceBarProps) {
  const tone = value >= 70 ? 'var(--success)' : value >= 50 ? 'var(--warning)' : 'var(--error)';
  return (
    <span className={[styles.confBar, className].filter(Boolean).join(' ')} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <span className={styles.track}>
        <span className={styles.fill} style={{ width: `${value}%`, background: tone }} />
      </span>
      <span className={styles.value} style={{ color: tone }}>
        {value}%
      </span>
    </span>
  );
}

export interface AIInsightProps {
  label?: string;
  confidence?: number | null;
  brand?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Honest AI: WHAT (label) + confidence bar + fallibility disclaimer.
 * STATES: ai-thinking (loading), ai-empty (no answer → EmptyState), happy (this),
 * error (failed → retry). NEVER shows AI output without confidence + disclaimer.
 */
export function AIInsight({ label = 'AI insight', confidence = null, brand = 'Storeez', children, className, style }: AIInsightProps) {
  return (
    <div className={[styles.insight, className].filter(Boolean).join(' ')} style={style}>
      <span className={styles.header}>
        <span className={styles.spark} aria-hidden="true">✦</span>
        <span className={styles.label}>{label}</span>
      </span>
      <span className={styles.body}>{children}</span>
      {confidence != null && <ConfidenceBar value={confidence} />}
      <span className={styles.footer}>{brand} AI can be wrong — verify before acting</span>
    </div>
  );
}

export default AIInsight;
