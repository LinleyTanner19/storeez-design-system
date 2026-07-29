import React from 'react';
import styles from './DataRow.module.css';

export interface DataRowProps {
  label: string;
  value: string;
  mono?: boolean;
  className?: string;
}

export function DataRow({ label, value, mono, className }: DataRowProps) {
  return (
    <div className={`${styles.row} ${className || ''}`}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.value} ${mono ? styles.mono : ''}`}>{value}</span>
    </div>
  );
}
