'use client';

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn, type Radius } from './utils';

export type ButtonVariant = 'primary' | 'green' | 'yellow' | 'ghost' | 'outline' | 'solid';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Corner radius preset. Omit to inherit the global default (6px). */
  radius?: Radius;
  /** Show a spinner and disable the button. */
  loading?: boolean;
  /** Icon (or any node) placed before the label. */
  leftIcon?: ReactNode;
  /** Icon (or any node) placed after the label. */
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    radius,
    loading,
    leftIcon,
    rightIcon,
    disabled,
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      data-loading={loading || undefined}
      data-radius={radius}
      disabled={disabled || loading}
      className={cn(
        'bwo-btn',
        variant !== 'primary' && `bwo-btn--${variant}`,
        size !== 'md' && `bwo-btn--${size}`,
        className,
      )}
      {...props}
    >
      {leftIcon && <span className="bwo-btn-icon">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="bwo-btn-icon">{rightIcon}</span>}
    </button>
  );
});

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** When true, buttons share edges (no gap) for a seamless pill. */
  attached?: boolean;
  /** Sets the radius for every child Button via CSS variable cascade. */
  radius?: Radius;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { attached, radius, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="group"
      data-radius={radius}
      className={cn('bwo-btn-group', attached && 'bwo-btn-group--attached', className)}
      {...props}
    />
  );
});
