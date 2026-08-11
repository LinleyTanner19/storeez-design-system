import React from 'react';
import styles from './BottomSheet.module.css';

export interface BottomSheetProps {
  open?: boolean;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * STATES: happy (open), loading (content skeleton), offline (cached content),
 * error (dismiss + retry). Mobile-primary surface; never gesture-only.
 */
export function BottomSheet({ open = true, title, subtitle, icon = null, children, onClose, className, style }: BottomSheetProps) {
  if (!open) return null;
  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={title || 'Sheet'} className={[styles.panel, className].filter(Boolean).join(' ')} style={style}>
        <div className={styles.handleRow}>
          <span className={styles.handle} aria-hidden="true" />
        </div>
        <div className={styles.content}>
          {(title || icon) && (
            <div className={styles.header}>
              {icon}
              <div className={styles.headerText}>
                {title && <div className={styles.title}>{title}</div>}
                {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default BottomSheet;
