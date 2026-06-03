'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { CountUp } from './CountUp';
import { cn } from './utils';

export type StatSize = 'sm' | 'md' | 'lg';
export type StatAlign = 'start' | 'center' | 'end';
export type StatTone = 'default' | 'success' | 'warning' | 'danger';
export type StatGoodWhen = 'up' | 'down';

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  /** Numeric value — animated up from 0. Use `value` for non-numeric stats. */
  count?: number;
  /** Decimals for the CountUp display. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Static value when not numeric (e.g. `"v2.0"`). Mutually exclusive with `count`. */
  value?: ReactNode;
  hint?: ReactNode;
  /** Leading icon shown before the value. */
  icon?: ReactNode;
  /** Visual size — `sm` (24 px), `md` (44 px, default), `lg` (56 px). */
  size?: StatSize;
  /** Cross-axis alignment of the stat&apos;s content. */
  align?: StatAlign;
  /** Colour the value itself — `success` (green), `warning` (yellow), `danger` (red). */
  tone?: StatTone;
  /**
   * Trend indicator. Positive numbers render as `▲ {value}`, negative as `▼ {value}`, zero as
   * `→ 0`. Colour follows `goodWhen` (default: positive = green, negative = red).
   */
  delta?: number;
  deltaPrefix?: string;
  deltaSuffix?: string;
  /** Context text after the delta — e.g. `"vs last month"`. */
  deltaLabel?: ReactNode;
  /**
   * For metrics where lower is better (bounce rate, error rate, load time). Flips the delta
   * colour mapping so negative deltas read as green.
   */
  goodWhen?: StatGoodWhen;
}

function formatDelta(value: number, decimals: number): string {
  const abs = Math.abs(value);
  const formatted =
    abs % 1 === 0 && decimals === 0
      ? abs.toLocaleString()
      : abs.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });
  return formatted;
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat(
  {
    label,
    count,
    decimals = 0,
    prefix,
    suffix,
    value,
    hint,
    icon,
    size = 'md',
    align = 'start',
    tone = 'default',
    delta,
    deltaPrefix,
    deltaSuffix,
    deltaLabel,
    goodWhen = 'up',
    className,
    ...props
  },
  ref,
) {
  const deltaDirection: 'up' | 'down' | 'neutral' =
    delta === undefined || delta === 0
      ? 'neutral'
      : delta > 0
        ? 'up'
        : 'down';
  const positiveIsGood = goodWhen === 'up';
  const deltaTone: 'positive' | 'negative' | 'neutral' =
    deltaDirection === 'neutral'
      ? 'neutral'
      : (deltaDirection === 'up') === positiveIsGood
        ? 'positive'
        : 'negative';
  const deltaArrow =
    deltaDirection === 'up' ? '▲' : deltaDirection === 'down' ? '▼' : '→';

  return (
    <div
      ref={ref}
      className={cn(
        'bwo-stat',
        size !== 'md' && `bwo-stat--${size}`,
        align !== 'start' && `bwo-stat--${align}`,
        tone !== 'default' && `bwo-stat--tone-${tone}`,
        className,
      )}
      {...props}
    >
      <div className="bwo-stat-value-row">
        {icon !== undefined ? (
          <span className="bwo-stat-icon" aria-hidden>
            {icon}
          </span>
        ) : null}
        <div className="bwo-stat-value">
          {count !== undefined ? (
            <CountUp to={count} decimals={decimals} prefix={prefix} suffix={suffix} />
          ) : (
            value
          )}
        </div>
      </div>
      <div className="bwo-stat-label">{label}</div>
      {delta !== undefined ? (
        <div className="bwo-stat-delta" data-tone={deltaTone}>
          <span className="bwo-stat-delta-arrow" aria-hidden>
            {deltaArrow}
          </span>
          <span className="bwo-stat-delta-value">
            {deltaPrefix}
            {formatDelta(delta, decimals)}
            {deltaSuffix}
          </span>
          {deltaLabel ? <span className="bwo-stat-delta-label">{deltaLabel}</span> : null}
        </div>
      ) : null}
      {hint && <div className="bwo-stat-hint">{hint}</div>}
    </div>
  );
});

/* ─── StatGroup ────────────────────────────────────────────────────────── */

export interface StatGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Render a vertical divider between each stat. */
  divided?: boolean;
  /** Cascaded to every child stat that doesn&apos;t set its own size. */
  size?: StatSize;
}

export const StatGroup = forwardRef<HTMLDivElement, StatGroupProps>(function StatGroup(
  { divided, size, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'bwo-stat-group',
        divided && 'bwo-stat-group--divided',
        size && `bwo-stat-group--${size}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
