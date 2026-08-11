import React from 'react';
import styles from './EmptyState.module.css';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  dashed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * STATES: empty (canonical), error (reuse with error icon + retry action),
 * ai-empty (echo query + 3 alternatives in action), offline (cached-nothing notice).
 */
export function EmptyState({ icon, title, description, action, dashed = true, className, style }: EmptyStateProps) {
  return (
    <div
      className={[styles.emptyState, dashed ? styles.dashed : styles.solid, className].filter(Boolean).join(' ')}
      style={style}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.description}>{description}</div>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}

export default EmptyState;
