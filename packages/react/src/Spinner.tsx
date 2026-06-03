'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from './utils';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual size preset. Default: `'md'`. */
  size?: SpinnerSize;
  /** Override the spinner colour. Defaults to `currentColor`. */
  color?: string;
  /** Stroke thickness in pixels. Default: `2`. */
  strokeWidth?: number;
  /** Optional accessible label. Default: `'Loading'`. */
  label?: string;
}

const sizeMap: Record<SpinnerSize, number> = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 28,
  xl: 40,
};

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', color, strokeWidth = 2, label = 'Loading', className, style, ...rest },
  ref,
) {
  const px = sizeMap[size];
  const stroke = color ?? 'currentColor';

  return (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn('bwo-spinner', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: px,
        height: px,
        color: stroke,
        ...style,
      }}
      {...rest}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        style={{ animation: 'bwo-spinner-rotate 0.9s linear infinite' }}
      >
        <circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          opacity="0.18"
        />
        <path
          d="M21.5 12a9.5 9.5 0 0 1-9.5 9.5"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <style>{`
        @keyframes bwo-spinner-rotate {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </span>
  );
});
