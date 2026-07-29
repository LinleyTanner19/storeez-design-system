import React, { useId } from 'react';
import type { TextFieldProps } from '../../primitives/types';
import styles from './TextField.module.css';

export const TextField: React.FC<TextFieldProps> = ({
  variant = 'outlined',
  type = 'text',
  label,
  placeholder,
  helperText,
  error = false,
  errorMessage,
  value,
  onChange,
  prefix,
  suffix,
  readOnly = false,
  multiline = false,
  maxLength,
  disabled = false,
  className,
  style,
  'aria-label': ariaLabel,
}) => {
  const id = useId();
  const helpId = `${id}-help`;
  const showError = error && Boolean(errorMessage);
  const describedBy = (showError || helperText) ? helpId : undefined;

  const fieldClasses = [
    styles.field,
    styles[variant],
    error && styles.error,
    disabled && styles.disabled,
    readOnly && styles.readOnly,
  ]
    .filter(Boolean)
    .join(' ');

  const sharedProps = {
    id,
    className: styles.input,
    placeholder,
    value,
    readOnly,
    disabled,
    maxLength,
    'aria-label': ariaLabel || (typeof label === 'string' ? label : undefined),
    'aria-invalid': error || undefined,
    'aria-describedby': describedBy,
  };

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      style={style}
    >
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={fieldClasses}>
        {prefix && <span className={styles.affix} aria-hidden="true">{prefix}</span>}
        {multiline ? (
          <textarea
            {...sharedProps}
            rows={3}
            onChange={onChange as unknown as React.ChangeEventHandler<HTMLTextAreaElement>}
          />
        ) : (
          <input
            {...sharedProps}
            type={type}
            onChange={onChange}
          />
        )}
        {suffix && <span className={styles.affix} aria-hidden="true">{suffix}</span>}
      </div>
      {(showError || helperText) && (
        <span
          id={helpId}
          className={[styles.helper, showError && styles.helperError]
            .filter(Boolean)
            .join(' ')}
          role={showError ? 'alert' : undefined}
        >
          {showError ? errorMessage : helperText}
        </span>
      )}
    </div>
  );
};

export default TextField;
