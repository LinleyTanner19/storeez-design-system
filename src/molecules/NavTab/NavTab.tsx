import React from 'react';
import styles from './NavTab.module.css';

export interface NavTabProps {
  icon?: string;
  label: string;
  active?: boolean;
  badgeCount?: number;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export function NavTab({ icon, label, active, badgeCount, onClick, className }: NavTabProps) {
  return (
    <button
      className={`${styles.tab} ${active ? styles.active : ''} ${className || ''}`}
      onClick={onClick}
      aria-selected={active}
    >
      {icon && (
        <span className={styles.iconWrap}>
          <span className={styles.icon}>{icon}</span>
          {badgeCount !== undefined && badgeCount > 0 && (
            <span className={styles.badge}>{badgeCount > 99 ? '99+' : badgeCount}</span>
          )}
        </span>
      )}
      <span className={styles.label}>{label}</span>
    </button>
  );
}
