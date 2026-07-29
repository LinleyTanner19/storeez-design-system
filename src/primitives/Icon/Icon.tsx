import React from 'react';
import type { IconProps } from '../../primitives/types';
import styles from './Icon.module.css';

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  return (
    <span
      className={[styles.icon, styles[size], className].filter(Boolean).join(' ')}
      style={style}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {name}
    </span>
  );
};

export default Icon;
