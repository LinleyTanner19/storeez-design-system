import React from 'react';
import styles from './List.module.css';

export interface ListProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Container for ListItem/DataRow. States: happy (items), empty (EmptyState child), loading (Skeleton rows). */
export function List({ children, className, style }: ListProps) {
  return (
    <div className={[styles.list, className].filter(Boolean).join(' ')} style={style}>
      {children}
    </div>
  );
}

export default List;
