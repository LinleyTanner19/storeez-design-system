import React from 'react';
import type { AvatarProps } from '../../primitives/types';
import styles from './Avatar.module.css';

function getInitials(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  size = 'md',
  variant = 'placeholder',
  src,
  name,
  alt,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const classes = [styles.avatar, styles[size], className].filter(Boolean).join(' ');

  if (variant === 'image' && src) {
    return (
      <span className={classes} style={style}>
        <img className={styles.image} src={src} alt={alt ?? name ?? ''} />
      </span>
    );
  }

  if (variant === 'initials') {
    const initials = getInitials(name);
    return (
      <span
        className={classes}
        style={style}
        role="img"
        aria-label={ariaLabel ?? name ?? 'avatar'}
      >
        <span className={styles.initials}>{initials}</span>
      </span>
    );
  }

  // placeholder — default user icon
  return (
    <span
      className={classes}
      style={style}
      role="img"
      aria-label={ariaLabel ?? 'avatar placeholder'}
    >
      <span className={styles.placeholder} aria-hidden="true">
        {'\u{1F464}'}
      </span>
    </span>
  );
};

export default Avatar;
