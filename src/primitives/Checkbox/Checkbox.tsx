import React, { useId, useRef, useEffect } from 'react';
import type { CheckboxProps } from '../../primitives/types';
import styles from './Checkbox.module.css';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  error = false,
  label,
  name,
  value,
  onChange,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate && !checked;
    }
  }, [indeterminate, checked]);

  const boxClasses = [
    styles.box,
    (checked || indeterminate) && styles.active,
    error && styles.error,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label
      className={[styles.root, disabled && styles.rootDisabled, className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      htmlFor={id}
    >
      <span className={styles.control}>
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          name={name}
          value={value}
          aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
          aria-invalid={error || undefined}
          onChange={(e) => onChange?.(e.target.checked, e)}
        />
        <span className={boxClasses} aria-hidden="true">
          {indeterminate && !checked ? (
            <svg viewBox="0 0 16 16" className={styles.mark}>
              <line x1="4" y1="8" x2="12" y2="8" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className={styles.mark}>
              <polyline points="3.5,8.5 6.5,11.5 12.5,4.5" />
            </svg>
          )}
        </span>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export default Checkbox;
