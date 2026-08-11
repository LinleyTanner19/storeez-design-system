import React from 'react';
import styles from './RadioGroup.module.css';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Supersedes primitives/RadioButton (single-button API). Group API per M3.
 * STATES: happy, loading (disabled), empty (no options — hide), error (helper text).
 * One option → Switch, multiple → RadioGroup (AGENTS.md rule).
 */
export function RadioGroup({ name, options, value, disabled = false, onChange, className, style }: RadioGroupProps) {
  return (
    <div role="radiogroup" className={[styles.group, className].filter(Boolean).join(' ')} style={style}>
      {options.map((o) => {
        const on = value === o.value;
        const dis = disabled || o.disabled;
        return (
          <label key={o.value} className={[styles.option, dis ? styles.disabled : ''].filter(Boolean).join(' ')}>
            <span className={styles.control}>
              <input
                type="radio"
                name={name}
                checked={on}
                disabled={dis}
                onChange={() => onChange && onChange(o.value)}
                className={styles.input}
              />
              <span className={styles.circle} aria-hidden="true">
                <span className={[styles.dot, on ? styles.dotOn : ''].filter(Boolean).join(' ')} />
              </span>
            </span>
            <span className={styles.label}>{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}

export default RadioGroup;
