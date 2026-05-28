'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { CountUp } from './CountUp';
import { cn } from './utils';

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  /** Numeric value — animated up from 0 if provided. Or pass `value` for a static value. */
  count?: number;
  /** Decimals for the CountUp display. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Use this instead of `count` for non-numeric stats (e.g. "v2.0"). */
  value?: ReactNode;
  hint?: ReactNode;
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat(
  { label, count, decimals = 0, prefix, suffix, value, hint, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('bwo-stat', className)} {...props}>
      <div className="bwo-stat-value">
        {count !== undefined ? (
          <CountUp to={count} decimals={decimals} prefix={prefix} suffix={suffix} />
        ) : (
          value
        )}
      </div>
      <div className="bwo-stat-label">{label}</div>
      {hint && <div className="bwo-stat-hint">{hint}</div>}
    </div>
  );
});
