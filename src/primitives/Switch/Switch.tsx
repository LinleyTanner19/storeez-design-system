import React, { useId } from 'react';
import type { SwitchProps } from '../../primitives/types';
import styles from './Switch.module.css';

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  label,
  name,
  value,
  onChange,
  loading = false,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const id = useId();
  const isDisabled = disabled || loading;

  const trackClasses = [
    styles.track,
    checked && styles.on,
    loading && styles.loading,
    isDisabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label
      className={[styles.root, isDisabled && styles.rootDisabled, className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      htmlFor={id}
    >
      <span className={styles.control}>
        <input
          id={id}
          type="checkbox"
          role="switch"
          className={styles.input}
          checked={checked}
          disabled={isDisabled}
          name={name}
          value={value}
          aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
          aria-busy={loading || undefined}
          onChange={(e) => onChange?.(e.target.checked, e)}
        />
        <span className={trackClasses} aria-hidden="true">
          <span className={styles.thumb}>
            {loading && <span className={styles.spinner} />}
          </span>
        </span>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Switch;
