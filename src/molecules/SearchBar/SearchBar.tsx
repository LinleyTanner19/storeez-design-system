import React, { useState } from 'react';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...', onClear, className }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value || '');

  const val = value !== undefined ? value : localValue;

  const handleChange = (v: string) => {
    setLocalValue(v);
    onChange?.(v);
  };

  return (
    <div className={`${styles.wrap} ${focused ? styles.focused : ''} ${className || ''}`}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.input}
        type="text"
        value={val}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
      />
      {val && (
        <button className={styles.clear} onClick={() => { handleChange(''); onClear?.(); }}>
          ✕
        </button>
      )}
    </div>
  );
}
