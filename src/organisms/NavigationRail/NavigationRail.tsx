import React from 'react';
import { NavTab } from '../../molecules/NavTab';
import styles from './NavigationRail.module.css';

export interface RailItem {
  icon?: string;
  label: string;
  badgeCount?: number;
}

export interface NavigationRailProps {
  items: RailItem[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  className?: string;
}

/**
 * MD3 desktop rail — 72px fixed sidebar, icon-primary with label.
 * STATES: happy, loading (items disabled), empty, offline.
 */
export function NavigationRail({ items, activeIndex = 0, onSelect, top, bottom, className }: NavigationRailProps) {
  return (
    <nav className={[styles.rail, className].filter(Boolean).join(' ')} aria-label="Rail navigation">
      {top && <div className={styles.top}>{top}</div>}
      <div className={styles.items}>
        {items.map((item, i) => (
          <NavTab
            key={i}
            icon={item.icon}
            label={item.label}
            active={i === activeIndex}
            badgeCount={item.badgeCount}
            onClick={() => onSelect?.(i)}
          />
        ))}
      </div>
      {bottom && <div className={styles.bottom}>{bottom}</div>}
    </nav>
  );
}

export default NavigationRail;
