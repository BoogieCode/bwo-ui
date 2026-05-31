'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from './utils';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value (0–`max`). When undefined the bar shows an indeterminate state. */
  value?: number;
  /** Maximum value. Default: 100. */
  max?: number;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value, max = 100, className, ...props },
  ref,
) {
  const isIndeterminate = value === undefined;
  const clamped = isIndeterminate ? 0 : Math.max(0, Math.min(max, value));
  const percentage = isIndeterminate ? 0 : (clamped / max) * 100;
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={isIndeterminate ? undefined : clamped}
      data-state={isIndeterminate ? 'indeterminate' : 'loading'}
      data-value={isIndeterminate ? undefined : clamped}
      data-max={max}
      className={cn('bwo-progress', className)}
      {...props}
    >
      <div
        className="bwo-progress-indicator"
        data-state={isIndeterminate ? 'indeterminate' : 'loading'}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
});
