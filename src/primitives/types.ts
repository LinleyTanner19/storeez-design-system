import React from 'react';

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  'aria-label'?: string;
}

export type ButtonVariant = 'filled' | 'tonal' | 'elevated' | 'outlined' | 'text';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export type TextFieldVariant = 'filled' | 'outlined';
export type TextFieldType = 'text' | 'password' | 'search' | 'email' | 'number';

export interface TextFieldProps extends BaseProps {
  variant?: TextFieldVariant;
  type?: TextFieldType;
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  readOnly?: boolean;
  multiline?: boolean;
  maxLength?: number;
}

export type BadgeVariant = 'dot' | 'number' | 'icon';
export type BadgeColor = 'primary' | 'error' | 'success' | 'warning';

export interface BadgeProps extends BaseProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  count?: number;
  maxCount?: number;
  icon?: string;
  children?: React.ReactNode;
}

export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';
export type ChipSize = 'sm' | 'md';

export interface ChipProps extends BaseProps {
  variant?: ChipVariant;
  size?: ChipSize;
  selected?: boolean;
  dismissible?: boolean;
  icon?: string;
  onClick?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarVariant = 'image' | 'initials' | 'placeholder';

export interface AvatarProps extends BaseProps {
  size?: AvatarSize;
  variant?: AvatarVariant;
  src?: string;
  name?: string;
  alt?: string;
}

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps extends BaseProps {
  name: string;
  size?: IconSize;
}

export type DividerOrientation = 'horizontal' | 'vertical' | 'inset';

export interface DividerProps {
  orientation?: DividerOrientation;
  label?: string;
  className?: string;
}

export type ProgressVariant = 'linear' | 'circular';

export interface ProgressProps extends BaseProps {
  variant?: ProgressVariant;
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export type FABVariant = 'regular' | 'small' | 'large' | 'extended';

export interface FABProps extends BaseProps {
  variant?: FABVariant;
  icon?: string;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export interface IconButtonProps extends BaseProps {
  variant?: 'standard' | 'filled' | 'filled-tonal' | 'outlined';
  icon?: string;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export interface SegmentedButtonProps extends BaseProps {
  multiSelect?: boolean;
  segments: { value: string; label: string; icon?: string }[];
  selectedValues?: string[];
  onChange?: (values: string[]) => void;
}

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}

export interface DropdownProps extends BaseProps {
  variant?: 'filled' | 'outlined';
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export type TooltipPosition = 'top' | 'bottom' | 'start' | 'end';

export interface TooltipProps {
  position?: TooltipPosition;
  label: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export type SnackbarVariant = 'single-line' | 'multi-line' | 'with-action';

export interface SnackbarProps extends BaseProps {
  variant?: SnackbarVariant;
  message: string;
  actionLabel?: string;
  onAction?: (e: React.MouseEvent) => void;
  open?: boolean;
}

/* == Selection controls == */

export interface CheckboxProps extends BaseProps {
  checked?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  label?: React.ReactNode;
  name?: string;
  value?: string;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioButtonProps extends BaseProps {
  checked?: boolean;
  label?: React.ReactNode;
  name?: string;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends BaseProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export interface SwitchProps extends BaseProps {
  checked?: boolean;
  label?: React.ReactNode;
  name?: string;
  value?: string;
  onChange?: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type SliderVariant = 'continuous' | 'discrete';

export interface SliderProps extends BaseProps {
  variant?: SliderVariant;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  /** When provided, renders a range slider with two thumbs. Overrides `value`. */
  range?: [number, number];
  showTicks?: boolean;
  showValue?: boolean;
  onChange?: (value: number) => void;
  onRangeChange?: (value: [number, number]) => void;
}
