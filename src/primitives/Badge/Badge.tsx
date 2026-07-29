import React from 'react';
import type { BadgeProps } from '../../primitives/types';
import styles from './Badge.module.css';

export const Badge: React.FC<BadgeProps> = ({
  variant = 'dot',
  color = 'primary',
  count = 0,
  maxCount = 99,
  icon,
  children,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const displayCount = count > maxCount ? `${maxCount}+` : `${count}`;

  const badge = (
    <span
      className={[styles.badge, styles[variant], styles[color], className]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-label={ariaLabel ?? (variant === 'number' ? displayCount : undefined)}
    >
      {variant === 'number' && <span className={styles.count}>{displayCount}</span>}
      {variant === 'icon' && icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
    </span>
  );

  // Standalone badge (no anchor children)
  if (!children) {
    return badge;
  }

  // Anchored badge overlaying a target element
  return (
    <span className={styles.anchor} style={style}>
      {children}
      {badge}
    </span>
  );
};

export default Badge;
