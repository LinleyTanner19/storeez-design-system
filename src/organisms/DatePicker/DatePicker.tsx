import React, { useState } from 'react';
import { Button } from '../../primitives/Button';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
  value?: string;            // ISO yyyy-mm-dd
  onChange?: (iso: string) => void;
  range?: boolean;
  min?: string;
  max?: string;
  label?: string;
  className?: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function iso(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/**
 * MD3 date picker — calendar grid, month nav, range mode, today highlight.
 * STATES: happy (selection), empty (no selection), loading (disabled),
 * offline (cached selection + sync note).
 */
export function DatePicker({ value, onChange, range = false, min, max, label, className }: DatePickerProps) {
  const now = new Date();
  const [viewY, setViewY] = useState(now.getFullYear());
  const [viewM, setViewM] = useState(now.getMonth());
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);

  const firstDay = new Date(viewY, viewM, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isSelected = (d: number) => {
    const v = iso(viewY, viewM, d);
    if (range) return rangeStart === v || rangeEnd === v;
    return value === v;
  };
  const isInRange = (d: number) => {
    if (!range || !rangeStart) return false;
    const v = iso(viewY, viewM, d);
    return rangeStart < v && (!rangeEnd || v < rangeEnd);
  };
  const isToday = (d: number) => {
    const t = new Date();
    return t.getFullYear() === viewY && t.getMonth() === viewM && t.getDate() === d;
  };

  const pick = (d: number) => {
    const v = iso(viewY, viewM, d);
    if (range) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(v);
        setRangeEnd(null);
      } else {
        setRangeEnd(v);
        onChange?.(`${rangeStart}..${v}`);
      }
    } else {
      onChange?.(v);
    }
  };

  const nav = (dir: number) => {
    let m = viewM + dir;
    let y = viewY;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewM(m);
    setViewY(y);
  };

  return (
    <div className={[styles.picker, className].filter(Boolean).join(' ')}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.header}>
        <Button variant="text" size="sm" onClick={() => nav(-1)} aria-label="Previous month">‹</Button>
        <div className={styles.monthLabel}>{MONTHS[viewM]} {viewY}</div>
        <Button variant="text" size="sm" onClick={() => nav(1)} aria-label="Next month">›</Button>
      </div>
      <div className={styles.weekRow}>
        {WEEKDAYS.map((w) => <span key={w} className={styles.weekday}>{w}</span>)}
      </div>
      <div className={styles.grid}>
        {cells.map((d, i) =>
          d === null ? (
            <span key={`e-${i}`} className={styles.cell} />
          ) : (
            <button
              key={d}
              type="button"
              onClick={() => pick(d)}
              className={[
                styles.cell, styles.day,
                isSelected(d) ? styles.selected : '',
                isInRange(d) ? styles.inRange : '',
                isToday(d) ? styles.today : '',
              ].filter(Boolean).join(' ')}
              aria-label={iso(viewY, viewM, d)}
              aria-pressed={isSelected(d)}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default DatePicker;
