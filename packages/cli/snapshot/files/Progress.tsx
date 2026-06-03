'use client';

import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { cn, type Radius } from './utils';

export type ProgressVariant = 'primary' | 'green' | 'yellow' | 'red';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressShape = 'linear' | 'circular';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value (0 – `max`). When undefined, the bar renders an indeterminate state. */
  value?: number;
  /** Maximum value. Default: 100. */
  max?: number;
  /** Visual fill colour. Default: `'primary'` (black). */
  variant?: ProgressVariant;
  /** Bar height (linear) or diameter (circular). Default: `'md'`. */
  size?: ProgressSize;
  /** `'linear'` (default) — horizontal bar. `'circular'` — SVG ring with centred children. */
  shape?: ProgressShape;
  /** Animated diagonal-stripe overlay. Linear-only. */
  striped?: boolean;
  /** Corner radius override. Linear-only. Default inherits the global pill radius. */
  radius?: Radius;
}

const CIRCULAR_DIM: Record<ProgressSize, { size: number; stroke: number }> = {
  sm: { size: 40, stroke: 4 },
  md: { size: 64, stroke: 6 },
  lg: { size: 96, stroke: 8 },
};

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value,
    max = 100,
    variant = 'primary',
    size = 'md',
    shape = 'linear',
    striped,
    radius,
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const isIndeterminate = value === undefined;
  const clamped = isIndeterminate ? 0 : Math.max(0, Math.min(max, value));
  const percentage = isIndeterminate ? 0 : (clamped / max) * 100;
  const stateAttr = isIndeterminate ? 'indeterminate' : 'loading';

  if (shape === 'circular') {
    const { size: dim, stroke } = CIRCULAR_DIM[size];
    const r = (dim - stroke) / 2;
    const circumference = 2 * Math.PI * r;
    const offset = isIndeterminate ? circumference * 0.7 : circumference * (1 - percentage / 100);
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : clamped}
        data-state={stateAttr}
        data-variant={variant !== 'primary' ? variant : undefined}
        className={cn(
          'bwo-progress-circle',
          variant !== 'primary' && `bwo-progress-circle--${variant}`,
          size !== 'md' && `bwo-progress-circle--${size}`,
          className,
        )}
        style={{ width: dim, height: dim, ...style }}
        {...props}
      >
        <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} aria-hidden focusable="false">
          <circle
            className="bwo-progress-circle-track"
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
          />
          <circle
            className="bwo-progress-circle-indicator"
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${dim / 2} ${dim / 2})`}
          />
        </svg>
        {children !== undefined ? (
          <span className="bwo-progress-circle-label">{children}</span>
        ) : null}
      </div>
    );
  }

  const linearStyle: CSSProperties = { ...style };
  const linearClass = cn(
    'bwo-progress',
    variant !== 'primary' && `bwo-progress--${variant}`,
    size !== 'md' && `bwo-progress--${size}`,
    striped && 'bwo-progress--striped',
    className,
  );
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={isIndeterminate ? undefined : clamped}
      data-state={stateAttr}
      data-value={isIndeterminate ? undefined : clamped}
      data-max={max}
      data-radius={radius}
      className={linearClass}
      style={linearStyle}
      {...props}
    >
      <div
        className="bwo-progress-indicator"
        data-state={stateAttr}
        style={isIndeterminate ? undefined : { transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
});
