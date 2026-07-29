import React from 'react';
import type { SnackbarProps } from '../../primitives/types';
import styles from './Snackbar.module.css';

export const Snackbar: React.FC<SnackbarProps> = ({
  variant = 'single-line',
  message,
  actionLabel,
  onAction,
  open = true,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  if (!open) return null;

  const showAction = variant === 'with-action' && actionLabel;

  return (
    <div
      className={[styles.snackbar, styles[variant], className].filter(Boolean).join(' ')}
      style={style}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <span className={styles.message}>{message}</span>
      {showAction && (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default Snackbar;
