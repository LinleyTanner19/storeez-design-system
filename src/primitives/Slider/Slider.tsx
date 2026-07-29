import React from 'react';
import type { SliderProps } from '../../primitives/types';
import styles from './Slider.module.css';

const pct = (v: number, min: number, max: number) =>
  max === min ? 0 : ((v - min) / (max - min)) * 100;

export const Slider: React.FC<SliderProps> = ({
  variant = 'continuous',
  min = 0,
  max = 100,
  step = 1,
  value = 0,
  range,
  showTicks,
  showValue = false,
  onChange,
  onRangeChange,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const isRange = Array.isArray(range);
  const isDiscrete = variant === 'discrete';
  const ticksOn = showTicks ?? isDiscrete;
  const effStep = isDiscrete ? step : step;

  const rootClasses = [
    styles.root,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Tick marks
  const ticks: number[] = [];
  if (ticksOn && effStep > 0) {
    for (let v = min; v <= max; v += effStep) ticks.push(v);
  }

  if (isRange) {
    const [lo, hi] = range as [number, number];
    const loPct = pct(lo, min, max);
    const hiPct = pct(hi, min, max);

    const setLo = (nv: number) =>
      onRangeChange?.([Math.min(nv, hi), hi]);
    const setHi = (nv: number) =>
      onRangeChange?.([lo, Math.max(nv, lo)]);

    return (
      <div className={rootClasses} style={style}>
        <div className={styles.trackArea}>
          <div className={styles.rail} />
          <div
            className={styles.fill}
            style={{ left: `${loPct}%`, right: `${100 - hiPct}%` }}
          />
          {ticksOn &&
            ticks.map((t) => (
              <span
                key={t}
                className={[
                  styles.tick,
                  t >= lo && t <= hi && styles.tickActive,
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ left: `${pct(t, min, max)}%` }}
              />
            ))}
          <input
            type="range"
            className={[styles.input, styles.inputLow].join(' ')}
            min={min}
            max={max}
            step={effStep}
            value={lo}
            disabled={disabled}
            aria-label={`${ariaLabel || 'Range'} minimum`}
            onChange={(e) => setLo(Number(e.target.value))}
          />
          <input
            type="range"
            className={[styles.input, styles.inputHigh].join(' ')}
            min={min}
            max={max}
            step={effStep}
            value={hi}
            disabled={disabled}
            aria-label={`${ariaLabel || 'Range'} maximum`}
            onChange={(e) => setHi(Number(e.target.value))}
          />
        </div>
        {showValue && (
          <div className={styles.valueLabel}>
            {lo} – {hi}
          </div>
        )}
      </div>
    );
  }

  const valPct = pct(value, min, max);

  return (
    <div className={rootClasses} style={style}>
      <div className={styles.trackArea}>
        <div className={styles.rail} />
        <div className={styles.fill} style={{ left: 0, right: `${100 - valPct}%` }} />
        {ticksOn &&
          ticks.map((t) => (
            <span
              key={t}
              className={[
                styles.tick,
                t <= value && styles.tickActive,
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ left: `${pct(t, min, max)}%` }}
            />
          ))}
        <input
          type="range"
          className={styles.input}
          min={min}
          max={max}
          step={effStep}
          value={value}
          disabled={disabled}
          aria-label={ariaLabel}
          onChange={(e) => onChange?.(Number(e.target.value))}
        />
      </div>
      {showValue && <div className={styles.valueLabel}>{value}</div>}
    </div>
  );
};

export default Slider;
