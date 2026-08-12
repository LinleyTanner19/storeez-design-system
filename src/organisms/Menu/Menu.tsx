import React, { useRef, useEffect, useState } from 'react';
import styles from './Menu.module.css';

export interface MenuItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  divider?: boolean;
}

export interface MenuProps {
  open: boolean;
  items: MenuItem[];
  onSelect?: (value: string) => void;
  onClose?: () => void;
  anchorEl?: HTMLElement | null;
  className?: string;
}

/**
 * MD3 menu — anchored dropdown, keyboard (arrows/enter/esc), backdrop dismiss.
 * STATES: happy (open), loading (items disabled), empty (no items), offline.
 */
export function Menu({ open, items, onSelect, onClose, anchorEl, className }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!open || !anchorEl) {
      setPos(null);
      return;
    }
    const r = anchorEl.getBoundingClientRect();
    setPos({ top: r.bottom + 4, left: r.left });
  }, [open, anchorEl]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const buttons = ref.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)');
        buttons?.[0]?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} onContextMenu={(e) => e.preventDefault()}>
      <div
        ref={ref}
        role="menu"
        className={[styles.menu, className].filter(Boolean).join(' ')}
        style={pos ? { top: pos.top, left: pos.left } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((item) =>
          item.divider ? (
            <div key={item.value} className={styles.divider} role="separator" />
          ) : (
            <button
              key={item.value}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                onSelect?.(item.value);
                onClose?.();
              }}
              className={[styles.item, item.destructive ? styles.destructive : ''].filter(Boolean).join(' ')}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span className={styles.label}>{item.label}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Menu;
