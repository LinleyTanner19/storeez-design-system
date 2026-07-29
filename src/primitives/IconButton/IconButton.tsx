import React from 'react';
import type { IconButtonProps } from '../../primitives/types';
import styles from './IconButton.module.css';

export const IconButton: React.FC<IconButtonProps> = ({
  variant = 'standard',
  icon,
  selected = false,
  onClick,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  return (
    <button
      type="button"
      className={[
        styles.iconButton,
        styles[variant.replace('-', '')],
        selected && styles.selected,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={selected}
      onClick={onClick}
    >
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
};

export default IconButton;
