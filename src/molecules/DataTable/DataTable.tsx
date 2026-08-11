import React from 'react';
import styles from './DataTable.module.css';

export interface DataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  numeric?: boolean;
  mono?: boolean;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: Record<string, string | number>[];
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  dense?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * STATES: happy (data), loading (Skeleton rows), empty (row count 0 → EmptyState),
 * error (failed fetch → retry), offline (cached rows + synced-x-ago notice).
 */
export function DataTable({ columns, rows, sortBy, sortDir = 'desc', onSort, dense = false, className, style }: DataTableProps) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')} style={style}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headRow}>
            {columns.map((c) => {
              const active = sortBy === c.key;
              const arrow = active ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '';
              return (
                <th
                  key={c.key}
                  className={[styles.th, dense ? styles.dense : '', c.numeric ? styles.right : ''].filter(Boolean).join(' ')}
                  style={c.sortable ? { cursor: 'pointer' } : undefined}
                  onClick={c.sortable && onSort ? () => onSort(c.key) : undefined}
                  aria-sort={active ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                  scope="col"
                >
                  {c.label}
                  {arrow}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.key || i} className={styles.bodyRow}>
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={[c.numeric || c.mono ? styles.mono : styles.body, c.numeric ? styles.right : '', dense ? styles.dense : '']
                    .filter(Boolean)
                    .join(' ')}
                >
                  {r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
