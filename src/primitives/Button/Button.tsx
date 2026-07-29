import React from 'react';
import type { ButtonProps } from '../../primitives/types';
import styles from './Button.module.css';

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'md',
  icon,
  loading = false,
  disabled = false,
  onClick,
  children,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      className={[styles.button, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {children && <span className={styles.label}>{children}</span>}
    </button>
  );
};

export default Button;
