import React from 'react';
import type { DividerProps } from '../../primitives/types';
import styles from './Divider.module.css';

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  className,
}) => {
  // with-label — horizontal rule with centered text
  if (label && orientation !== 'vertical') {
    return (
      <div
        className={[styles.divider, styles.withLabel, className].filter(Boolean).join(' ')}
        role="separator"
        aria-orientation="horizontal"
      >
        <span className={styles.line} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
        <span className={styles.line} aria-hidden="true" />
      </div>
    );
  }

  return (
    <hr
      className={[styles.divider, styles[orientation], className].filter(Boolean).join(' ')}
      role="separator"
      aria-orientation={orientation === 'vertical' ? 'vertical' : 'horizontal'}
    />
  );
};

export default Divider;
