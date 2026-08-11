import React from 'react';
import styles from './Dialog.module.css';

export type DialogTone = 'error' | 'warning' | 'success';

export interface DialogProps {
  open?: boolean;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  tone?: DialogTone;
  icon?: React.ReactNode;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * STATES: happy (open, content), error (tone=error: nothing-saved + mono ref),
 * loading (actions disabled while submitting), offline (retry on close).
 * Honest AI: error dialogs state plainly nothing was saved.
 */
export function Dialog({ open = true, title, children, actions = null, tone, icon = null, onClose, className, style }: DialogProps) {
  if (!open) return null;
  const toneVar = tone === 'error' ? 'var(--error)' : tone === 'warning' ? 'var(--warning)' : tone === 'success' ? 'var(--success)' : 'var(--md-sys-color-primary-text)';
  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={title} className={[styles.panel, className].filter(Boolean).join(' ')} style={style}>
        {icon && (
          <span className={styles.icon} style={{ color: toneVar }}>
            {icon}
          </span>
        )}
        <div className={styles.title}>{title}</div>
        <div className={styles.body}>{children}</div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>
  );
}

export default Dialog;
