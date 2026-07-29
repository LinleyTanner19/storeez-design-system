import React from 'react';
import { NavTab } from '../../molecules/NavTab';
import styles from './BottomNavigation.module.css';

export interface BottomNavTab {
  icon: string;
  label: string;
  badgeCount?: number;
}

export interface BottomNavigationProps {
  tabs: BottomNavTab[];
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
}

export function BottomNavigation({ tabs, activeIndex = 0, onTabChange, className }: BottomNavigationProps) {
  return (
    <nav className={`${styles.nav} ${className || ''}`}>
      {tabs.map((tab, i) => (
        <NavTab
          key={i}
          icon={tab.icon}
          label={tab.label}
          active={i === activeIndex}
          badgeCount={tab.badgeCount}
          onClick={() => onTabChange?.(i)}
        />
      ))}
    </nav>
  );
}
