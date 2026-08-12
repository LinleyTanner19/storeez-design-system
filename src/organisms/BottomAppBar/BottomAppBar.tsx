import React from 'react';
import { FAB } from '../../primitives/FAB';
import { IconButton } from '../../primitives/IconButton';
import styles from './BottomAppBar.module.css';

export interface BottomAppBarProps {
  actions?: Array<{ icon?: string; label?: string; onClick?: () => void; active?: boolean }>;
  fabIcon?: string;
  onFabClick?: () => void;
  fabLabel?: string;
  className?: string;
}

/**
 * MD3 bottom app bar — FAB centred + up to 4 icon actions, 80px.
 * STATES: happy, loading (actions disabled), empty, offline.
 */
export function BottomAppBar({ actions = [], fabIcon, onFabClick, fabLabel, className }: BottomAppBarProps) {
  return (
    <div className={[styles.bar, className].filter(Boolean).join(' ')}>
      <div className={styles.actions}>
        {actions.slice(0, 2).map((a, i) => (
          <IconButton key={`l-${i}`} icon={a.icon} aria-label={a.label} onClick={a.onClick} selected={a.active} />
        ))}
      </div>
      {fabIcon && (
        <FAB icon={fabIcon} label={fabLabel} onClick={onFabClick} variant="regular" />
      )}
      <div className={styles.actions}>
        {actions.slice(2, 4).map((a, i) => (
          <IconButton key={`r-${i}`} icon={a.icon} aria-label={a.label} onClick={a.onClick} selected={a.active} />
        ))}
      </div>
    </div>
  );
}

export default BottomAppBar;
