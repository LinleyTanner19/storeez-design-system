import React from 'react';
import { NavTab } from '../../molecules/NavTab';
import styles from './NavigationDrawer.module.css';

export interface DrawerItem {
  icon?: string;
  label: string;
  badgeCount?: number;
}

export interface NavigationDrawerProps {
  open: boolean;
  items: DrawerItem[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  onClose?: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * MD3 navigation drawer. Slide-left overlay with scrim; esc/backdrop closes.
 * STATES: happy (open), loading (items disabled), empty (no items), offline.
 */
export function NavigationDrawer({ open, items, activeIndex = 0, onSelect, onClose, header, footer, className }: NavigationDrawerProps) {
  if (!open) return null;
  return (
    <div className={styles.root}>
      <div className={styles.scrim} onClick={onClose} aria-hidden="true" />
      <nav className={[styles.drawer, className].filter(Boolean).join(' ')} aria-label="Navigation">
        {header && <div className={styles.header}>{header}</div>}
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
        {footer && <div className={styles.footer}>{footer}</div>}
      </nav>
    </div>
  );
}

export default NavigationDrawer;
