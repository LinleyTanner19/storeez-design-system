import React from 'react';
import styles from './ListItem.module.css';

export interface ListItemProps {
  leading?: React.ReactNode;
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export function ListItem({ leading, title, subtitle, trailing, onClick, className }: ListItemProps) {
  return (
    <div
      className={`${styles.item} ${onClick ? styles.clickable : ''} ${className || ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {leading && <div className={styles.leading}>{leading}</div>}
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      {trailing && <div className={styles.trailing}>{trailing}</div>}
    </div>
  );
}
