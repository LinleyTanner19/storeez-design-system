import React, { useEffect, useRef, useState } from 'react';
import type { DropdownProps } from '../../primitives/types';
import styles from './Dropdown.module.css';

export const Dropdown: React.FC<DropdownProps> = ({
  variant = 'filled',
  options,
  value,
  placeholder = 'Select…',
  onChange,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={[styles.dropdown, className].filter(Boolean).join(' ')}
      style={style}
    >
      <button
        type="button"
        className={[styles.trigger, styles[variant], open && styles.open]
          .filter(Boolean)
          .join(' ')}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => !disabled && setOpen((o) => !o)}
      >
        {selected?.icon && (
          <span className={styles.leadingIcon} aria-hidden="true">
            {selected.icon}
          </span>
        )}
        <span className={selected ? styles.value : styles.placeholder}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={[styles.arrow, open && styles.arrowOpen].filter(Boolean).join(' ')} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul className={styles.menu} role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={[styles.option, isSelected && styles.optionSelected]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.icon && (
                    <span className={styles.optionIcon} aria-hidden="true">
                      {option.icon}
                    </span>
                  )}
                  <span className={styles.optionLabel}>{option.label}</span>
                  {isSelected && (
                    <span className={styles.optionCheck} aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
