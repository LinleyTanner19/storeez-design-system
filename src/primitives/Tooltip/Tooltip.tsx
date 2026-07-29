import React from 'react';
import type { TooltipProps } from '../../primitives/types';
import styles from './Tooltip.module.css';

export const Tooltip: React.FC<TooltipProps> = ({
  position = 'top',
  label,
  children,
  className,
  style,
}) => {
  return (
    <span
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
      <span
        className={[styles.tooltip, styles[position]].join(' ')}
        role="tooltip"
      >
        {label}
      </span>
    </span>
  );
};

export default Tooltip;
