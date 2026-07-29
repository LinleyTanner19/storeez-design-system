import React from 'react';
import styles from './sections.module.css';

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function LabSection({ title, description, children }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description && <p className={styles.sectionDesc}>{description}</p>}
      <div className={styles.sectionContent}>
        {children}
      </div>
    </section>
  );
}

export function VariantRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.variantRow}>
      <span className={styles.variantLabel}>{label}</span>
      <div className={styles.variantContent}>{children}</div>
    </div>
  );
}

export function GroupLabel({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.groupLabel}>{children}</h3>;
}
