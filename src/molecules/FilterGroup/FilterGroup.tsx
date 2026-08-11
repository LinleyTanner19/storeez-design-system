import React from 'react';
import styles from './FilterGroup.module.css';

export interface FilterOption {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export interface FilterGroupProps {
  filters: FilterOption[];
  className?: string;
  style?: React.CSSProperties;
}

/** STATES: happy (options), loading (disabled), empty (no filters — hide), error (retry). */
export function FilterGroup({ filters, className, style }: FilterGroupProps) {
  return (
    <div className={[styles.group, className].filter(Boolean).join(' ')} style={style}>
      {filters.map((f) => (
        <button
          key={f.label}
          type="button"
          className={[styles.filter, f.selected ? styles.selected : ''].filter(Boolean).join(' ')}
          onClick={f.onClick}
          aria-pressed={f.selected}
        >
          {f.selected && <span aria-hidden="true">✓ </span>}
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default FilterGroup;
