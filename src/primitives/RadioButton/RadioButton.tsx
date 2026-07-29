import React, { useId } from 'react';
import type { RadioButtonProps, RadioGroupProps } from '../../primitives/types';
import styles from './RadioButton.module.css';

export const RadioButton: React.FC<RadioButtonProps> = ({
  checked = false,
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

  const circleClasses = [
    styles.circle,
    checked && styles.active,
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
          id={id}
          type="radio"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          name={name}
          value={value}
          aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
          onChange={(e) => onChange?.(value ?? '', e)}
        />
        <span className={circleClasses} aria-hidden="true">
          <span className={styles.dot} />
        </span>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
}) => (
  <div
    role="radiogroup"
    aria-label={ariaLabel}
    className={[styles.group, className].filter(Boolean).join(' ')}
    style={style}
  >
    {options.map((opt) => (
      <RadioButton
        key={opt.value}
        name={name}
        value={opt.value}
        label={opt.label}
        checked={value === opt.value}
        disabled={disabled || opt.disabled}
        onChange={(v) => onChange?.(v)}
      />
    ))}
  </div>
);

export default RadioButton;
