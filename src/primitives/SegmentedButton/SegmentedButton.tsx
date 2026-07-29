import React from 'react';
import type { SegmentedButtonProps } from '../../primitives/types';
import styles from './SegmentedButton.module.css';

export const SegmentedButton: React.FC<SegmentedButtonProps> = ({
  multiSelect = false,
  segments,
  selectedValues = [],
  onChange,
  disabled = false,
  className,
  style,
}) => {
  const handleSelect = (value: string) => {
    if (disabled) return;
    let next: string[];
    if (multiSelect) {
      next = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
    } else {
      next = selectedValues.includes(value) ? [] : [value];
    }
    onChange?.(next);
  };

  return (
    <div
      className={[styles.group, className].filter(Boolean).join(' ')}
      style={style}
      role={multiSelect ? 'group' : 'radiogroup'}
    >
      {segments.map((segment) => {
        const isSelected = selectedValues.includes(segment.value);
        return (
          <button
            key={segment.value}
            type="button"
            className={[styles.segment, isSelected && styles.selected]
              .filter(Boolean)
              .join(' ')}
            disabled={disabled}
            role={multiSelect ? 'checkbox' : 'radio'}
            aria-checked={isSelected}
            onClick={() => handleSelect(segment.value)}
          >
            {isSelected && (
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
            )}
            {segment.icon && !isSelected && (
              <span className={styles.icon} aria-hidden="true">
                {segment.icon}
              </span>
            )}
            <span className={styles.label}>{segment.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedButton;
