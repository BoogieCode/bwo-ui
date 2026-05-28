'use client';

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type ButtonVariant = 'primary' | 'green' | 'yellow' | 'ghost' | 'outline' | 'solid';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { attached, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="group"
      className={cn('bwo-btn-group', attached && 'bwo-btn-group--attached', className)}
      {...props}
    />
  );
});
