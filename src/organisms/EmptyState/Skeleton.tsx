import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** STATES: loading (canonical). Composed inside every other component's loading state. */
export function Skeleton({ width = '100%', height = 12, radius = 3, delay = 0, className, style }: SkeletonProps) {
  return (
    <span
      className={[styles.skeleton, className].filter(Boolean).join(' ')}
      style={{ width, height, borderRadius: radius, animationDelay: `${delay}s`, ...style }}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
