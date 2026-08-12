import React from 'react';
import { Button } from '../../primitives/Button';
import styles from './ButtonGroup.module.css';

export interface ButtonGroupProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * MD3: 2-4 equal-width segmented actions. Single-select.
 * STATES: happy, loading (disabled), empty (no options → hide), error (retry).
 * Never stacks two filled buttons — use tonal/text variants inside the group.
 */
export function ButtonGroup({ options, value, onChange, className, style }: ButtonGroupProps) {
  return (
    <div role="group" className={[styles.group, className].filter(Boolean).join(' ')} style={style}>
      {options.map((opt) => {
        const on = opt.value === value;
        return (
          <Button
            key={opt.value}
            variant={on ? 'filled' : 'text'}
            onClick={() => onChange?.(opt.value)}
            disabled={opt.disabled}
            className={styles.item}
            aria-pressed={on}
          >
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
