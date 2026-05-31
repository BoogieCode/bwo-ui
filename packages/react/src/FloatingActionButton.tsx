'use client';

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type FabSize = 'sm' | 'md' | 'lg';
export type FabVariant = 'primary' | 'accent' | 'surface';
export type FabPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left'
  | 'bottom-center'
  | 'static';

export interface FloatingActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon node rendered inside the button. Required for icon-only FABs. */
  icon?: ReactNode;
  /** Visible label. When present the FAB renders in extended pill mode. */
  label?: ReactNode;
  size?: FabSize;
  variant?: FabVariant;
  /** Fixed positioning preset. Default: `'bottom-right'`. Use `'static'` to opt out. */
  position?: FabPosition;
  /** Inset (in px) from the edge of the viewport. Default: 24. */
  offset?: number;
}

export const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  function FloatingActionButton(
    {
      icon,
      label,
      size = 'md',
      variant = 'primary',
      position = 'bottom-right',
      offset = 24,
      className,
      children,
      style,
      ...props
    },
    ref,
  ) {
    const extended = Boolean(label || children);
    return (
      <button
        ref={ref}
        type="button"
        data-position={position}
        data-extended={extended || undefined}
        className={cn(
          'bwo-fab',
          `bwo-fab--${size}`,
          `bwo-fab--${variant}`,
          extended && 'bwo-fab--extended',
          position !== 'static' && `bwo-fab--${position}`,
          className,
        )}
        style={{ ...{ '--bwo-fab-offset': `${offset}px` } as React.CSSProperties, ...style }}
        aria-label={!extended && typeof label === 'string' ? label : props['aria-label']}
        {...props}
      >
        {icon && <span className="bwo-fab-icon">{icon}</span>}
        {extended && <span className="bwo-fab-label">{label ?? children}</span>}
      </button>
    );
  },
);

/** Convenience alias matching the common shorthand. */
export const FAB = FloatingActionButton;
