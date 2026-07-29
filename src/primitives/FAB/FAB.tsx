import React from 'react';
import type { FABProps } from '../../primitives/types';
import styles from './FAB.module.css';

export const FAB: React.FC<FABProps> = ({
  variant = 'regular',
  icon,
  label,
  onClick,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const isExtended = variant === 'extended';

  return (
    <button
      type="button"
      className={[styles.fab, styles[variant], className].filter(Boolean).join(' ')}
      style={style}
      disabled={disabled}
      aria-label={ariaLabel ?? label}
      onClick={onClick}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {isExtended && label && <span className={styles.label}>{label}</span>}
    </button>
  );
};

export default FAB;
