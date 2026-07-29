import React from 'react';
import type { ChipProps } from '../../primitives/types';
import styles from './Chip.module.css';

export const Chip: React.FC<ChipProps> = ({
  variant = 'assist',
  size = 'md',
  selected = false,
  dismissible = false,
  icon,
  onClick,
  onDelete,
  children,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  // Leading icon shown on assist / input variants (and any variant given an icon)
  const showLeadingIcon = Boolean(icon) && (variant === 'assist' || variant === 'input');
  const isToggle = variant === 'filter' || variant === 'suggestion';

  const classes = [
    styles.chip,
    styles[variant],
    styles[size],
    selected && styles.selected,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) onDelete?.(e);
  };

  return (
    <div
      className={classes}
      style={style}
      role={isToggle ? 'button' : undefined}
      aria-pressed={isToggle ? selected : undefined}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent);
        }
      }}
    >
      {selected && isToggle && (
        <svg viewBox="0 0 16 16" className={styles.check} aria-hidden="true">
          <polyline points="3.5,8.5 6.5,11.5 12.5,4.5" />
        </svg>
      )}
      {showLeadingIcon && !(selected && isToggle) && (
        <span className={styles.leadingIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
      {dismissible && (
        <button
          type="button"
          className={styles.close}
          onClick={handleDelete}
          disabled={disabled}
          aria-label="Remove"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chip;
