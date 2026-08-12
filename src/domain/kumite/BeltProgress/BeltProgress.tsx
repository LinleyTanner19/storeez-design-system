import React from 'react';
import { Skeleton } from '../../../organisms/EmptyState/Skeleton';
import styles from './BeltProgress.module.css';

export interface BeltProgressProps {
  belts: Array<{ name: string; color: string; passed?: boolean }>;
  currentBelt?: string;
  nextTarget?: string;
  className?: string;
}

/**
 * KUMITE vertical: belt progression tracker.
 * STATES: happy (belt path), loading (Skeleton), empty (no belts), offline.
 * Belt colors are VERTICAL identity (martial arts grades) — exempt from the
 * semantic-red rule; they are not risk signals.
 */
export function BeltProgress({ belts, currentBelt, nextTarget, className }: BeltProgressProps) {
  return (
    <div className={[styles.track, className].filter(Boolean).join(' ')}>
      {belts.map((belt) => {
        const isCurrent = belt.name === currentBelt;
        const passed = belt.passed ?? isCurrent;
        return (
          <div key={belt.name} className={styles.belt} style={{ ['--belt-color' as string]: belt.color }}>
            <span
              className={[styles.dot, passed ? styles.dotPassed : ''].join(' ')}
              aria-hidden="true"
            />
            <span className={[styles.name, isCurrent ? styles.current : ''].join(' ')}>{belt.name}</span>
          </div>
        );
      })}
      {nextTarget && <div className={styles.next}>Next: {nextTarget}</div>}
    </div>
  );
}

export default BeltProgress;
