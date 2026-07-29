import React from 'react';
import styles from './Card.module.css';

export type CardVariant = 'elevated' | 'filled' | 'outlined';

export interface CardProps {
  variant?: CardVariant;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Card({ variant = 'elevated', className, onClick, children, style }: CardProps) {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${onClick ? styles.clickable : ''} ${className || ''}`}
      onClick={onClick}
      style={style}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
