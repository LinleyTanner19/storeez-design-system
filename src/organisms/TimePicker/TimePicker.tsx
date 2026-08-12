import React, { useState } from 'react';
import { Button } from '../../primitives/Button';
import styles from './TimePicker.module.css';

export interface TimePickerProps {
  value?: string;            // "HH:MM" 24h
  onChange?: (time: string) => void;
  minuteStep?: 1 | 5 | 15 | 30;
  use24h?: boolean;
  label?: string;
  className?: string;
}

/**
 * MD3 time picker — clock dial + input, 12h/24h toggle.
 * STATES: happy (selection), empty (no value), loading (disabled), offline.
 */
export function TimePicker({ value, onChange, minuteStep = 5, use24h = true, label, className }: TimePickerProps) {
  const [mode, setMode] = useState<'hours' | 'minutes'>('hours');
  const [hours12, setHours12] = useState(12);
  const [mins, setMins] = useState(0);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  const is24 = use24h;
  const displayHours = value ? parseInt(value.split(':')[0], 10) : (is24 ? hours12 : (hours12 % 12) + (period === 'PM' ? 12 : 0));

  const commit = (h: number, m: number) => {
    onChange?.(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
  };

  const dialValues = mode === 'hours'
    ? (is24 ? Array.from({ length: 24 }, (_, i) => i) : Array.from({ length: 12 }, (_, i) => i + 1))
    : Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep);

  const current = mode === 'hours' ? (is24 ? displayHours : ((displayHours % 12) || 12)) : mins;

  const selectDial = (v: number) => {
    if (mode === 'hours') {
      if (is24) {
        setHours12(v);
        commit(v, mins);
      } else {
        const h24 = (v % 12) + (period === 'PM' ? 12 : 0);
        setHours12(v);
        commit(h24, mins);
      }
      setMode('minutes');
    } else {
      setMins(v);
      commit(is24 ? displayHours : ((displayHours % 12) + (period === 'PM' ? 12 : 0)), v);
    }
  };

  const hoursInput = is24 ? displayHours : ((displayHours % 12) || 12);
  const minsInput = value ? parseInt(value.split(':')[1], 10) : mins;

  return (
    <div className={[styles.picker, className].filter(Boolean).join(' ')}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <button
            type="button"
            className={[styles.timeInput, mode === 'hours' ? styles.inputActive : ''].join(' ')}
            onClick={() => setMode('hours')}
            aria-pressed={mode === 'hours'}
          >
            {String(hoursInput).padStart(2, '0')}
          </button>
          <span className={styles.colon}>:</span>
          <button
            type="button"
            className={[styles.timeInput, mode === 'minutes' ? styles.inputActive : ''].join(' ')}
            onClick={() => setMode('minutes')}
            aria-pressed={mode === 'minutes'}
          >
            {String(minsInput).padStart(2, '0')}
          </button>
          {!is24 && (
            <div className={styles.periodGroup}>
              <button
                type="button"
                className={[styles.period, period === 'AM' ? styles.periodActive : ''].join(' ')}
                onClick={() => { setPeriod('AM'); commit((displayHours % 12), mins); }}
              >
                AM
              </button>
              <button
                type="button"
                className={[styles.period, period === 'PM' ? styles.periodActive : ''].join(' ')}
                onClick={() => { setPeriod('PM'); commit(((displayHours % 12) || 12) + 12, mins); }}
              >
                PM
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.dial} role="group" aria-label={mode}>
        {dialValues.map((v) => (
          <button
            key={v}
            type="button"
            className={[styles.dialValue, v === current ? styles.dialActive : ''].join(' ')}
            onClick={() => selectDial(v)}
            style={{
              left: `${50 + 38 * Math.cos((v / dialValues.length) * Math.PI * 2 - Math.PI / 2)}%`,
              top: `${50 + 38 * Math.sin((v / dialValues.length) * Math.PI * 2 - Math.PI / 2)}%`,
            }}
            aria-pressed={v === current}
          >
            {v}
          </button>
        ))}
        <div className={styles.dialCenter} />
      </div>
      <div className={styles.actions}>
        <Button variant="text" size="sm" onClick={() => onChange?.(value || '')}>Cancel</Button>
        <Button variant="tonal" size="sm" onClick={() => commit(is24 ? displayHours : ((displayHours % 12) + (period === 'PM' ? 12 : 0)), mins)}>OK</Button>
      </div>
    </div>
  );
}

export default TimePicker;
