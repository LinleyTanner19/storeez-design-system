import React from 'react';
import { useTheme } from '../theme';
import styles from './LabLayout.module.css';

export function LabLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();

  return (
    <div className={styles.lab}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Storeez DS</h1>
          <span className={styles.badge}>Component Lab</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.themeLabel}>{theme === 'storeez' ? 'Storeez Base' : 'KUMITE'}</span>
          <button className={styles.toggleBtn} onClick={toggle}>
            <span className={`${styles.toggleDot} ${theme === 'kumite' ? styles.right : ''}`} />
          </button>
        </div>
      </header>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
