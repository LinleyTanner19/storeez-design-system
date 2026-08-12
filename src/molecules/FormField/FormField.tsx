import React from 'react';
import { TextField } from '../../primitives/TextField';
import styles from './FormField.module.css';

export interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * MD3: label + input + helper + error. Composes TextField.
 * STATES: happy (helper), error (errorMessage, never semantic-red for risk),
 * loading (children disabled), offline (unsynced hint).
 */
export function FormField({ label, required, error, errorMessage, helperText, children, className }: FormFieldProps) {
  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && errorMessage ? (
        <div className={styles.error} role="alert">{errorMessage}</div>
      ) : helperText ? (
        <div className={styles.helper}>{helperText}</div>
      ) : null}
    </div>
  );
}

export default FormField;
