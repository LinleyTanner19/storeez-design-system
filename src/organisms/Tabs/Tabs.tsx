import React from 'react';
import styles from './Tabs.module.css';

export interface TabDef {
  value: string;
  label: string;
  badge?: number;
}

export interface TabsProps {
  tabs: Array<string | TabDef>;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/** STATES: happy (tabs), loading (disabled, badge pending), empty (no tabs — hide), error (retry). */
export function Tabs({ tabs, value, onChange, className, style }: TabsProps) {
  return (
    <div role="tablist" className={[styles.tabs, className].filter(Boolean).join(' ')} style={style}>
      {tabs.map((t) => {
        const tab: TabDef = typeof t === 'string' ? { value: t, label: t } : t;
        const on = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={on}
            className={[styles.tab, on ? styles.active : ''].filter(Boolean).join(' ')}
            onClick={() => onChange && onChange(tab.value)}
          >
            {tab.label}
            {tab.badge != null && (
              <span className={[styles.badge, on ? styles.badgeActive : ''].filter(Boolean).join(' ')}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
