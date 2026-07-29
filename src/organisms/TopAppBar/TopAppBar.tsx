import React from 'react';
import styles from './TopAppBar.module.css';

export interface TopAppBarProps {
  title: string;
  onBack?: () => void;
  actions?: { icon: string; onClick: () => void; badge?: boolean }[];
  className?: string;
}

export function TopAppBar({ title, onBack, actions, className }: TopAppBarProps) {
  return (
    <header className={`${styles.bar} ${className || ''}`}>
      {onBack && (
        <button className={styles.actionBtn} onClick={onBack} aria-label="Back">
          ←
        </button>
      )}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        {actions?.map((a, i) => (
          <button key={i} className={styles.actionBtn} onClick={a.onClick} aria-label={`Action ${i + 1}`}>
            {a.badge && <span className={styles.badge} />}
            {a.icon}
          </button>
        ))}
      </div>
    </header>
  );
}
