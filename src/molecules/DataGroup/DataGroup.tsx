import React from 'react';
import styles from './DataGroup.module.css';

export interface DataGroupProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Grouped key-value rows (label/value pairs). States: happy (rows), loading (Skeleton rows), empty (EmptyState child). */
export function DataGroup({ children, className, style }: DataGroupProps) {
  return (
    <div className={[styles.group, className].filter(Boolean).join(' ')} style={style}>
      {children}
    </div>
  );
}

export default DataGroup;
