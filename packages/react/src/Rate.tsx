'use client';

import {
  forwardRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

export type RateSymbol = 'star' | 'heart' | 'thumb' | 'bolt';
export type RateSize = 'sm' | 'md' | 'lg';

const ICONS: Record<RateSymbol, ReactNode> = {
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.6l2.94 6.18 6.81.6-5.16 4.5 1.55 6.66L12 16.9l-6.14 3.64 1.55-6.66L2.25 9.38l6.81-.6z" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21s-7-4.35-9.5-9C.4 8.5 3.4 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 3.6 0 6.6 4.5 4.5 8-2.5 4.65-9.5 9-9.5 9z" />
    </svg>
  ),
  thumb: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M2 10h4v11H2zM22 11a2 2 0 00-2-2h-5.5l.94-4.41A1.5 1.5 0 0014 3l-6 7v11h10.5a2 2 0 001.96-1.6l1.5-7.4A2 2 0 0022 11z" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </svg>
  ),
};

export interface RateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** Controlled current value (0..count, with halves if allowHalf). */
  value?: number;
  /** Default value for uncontrolled mode. */
  defaultValue?: number;
  /** Called when the rating changes. */
  onValueChange?: (value: number) => void;
  /** Number of icons. Default: 5. */
  count?: number;
  /** Allow half-step values. Default: false. */
  allowHalf?: boolean;
  /** Disable interaction; renders read-only. */
  readOnly?: boolean;
  /** Disable + dim. */
  disabled?: boolean;
  /** Clicking the current value clears it back to 0. Default: false. */
  clearable?: boolean;
  /** Built-in symbol or a custom node. Default: `'star'`. */
  icon?: RateSymbol | ReactNode;
  /** Override the empty (background) icon. Defaults to the same `icon` faded out. */
  emptyIcon?: ReactNode;
  /** Size preset. Default: `'md'`. */
  size?: RateSize;
  /** Override the fill color (any valid CSS color). */
  color?: string;
  /** Form name — emits a hidden input carrying the current value. */
  name?: string;
  /** Accessible label. Default: `'Rating'`. */
  label?: string;
  /** Render a per-character label (or numeric) next to the icons. */
  showValue?: boolean;
}

function isSymbol(icon: RateSymbol | ReactNode): icon is RateSymbol {
  return typeof icon === 'string' && icon in ICONS;
}

export const Rate = forwardRef<HTMLDivElement, RateProps>(function Rate(
  {
    value: controlledValue,
    defaultValue = 0,
    onValueChange,
    count = 5,
    allowHalf = false,
    readOnly,
    disabled,
    clearable = false,
    icon = 'star',
    emptyIcon,
    size = 'md',
    color,
    name,
    label = 'Rating',
    showValue = false,
    className,
    style,
    ...props
  },
  ref,
) {
  const [value = 0, setValue] = useControllable<number>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  });
  const [hover, setHover] = useState<number | null>(null);

  const display = hover ?? value;
  const symbolNode = isSymbol(icon) ? ICONS[icon] : icon;
  const interactive = !readOnly && !disabled;

  const commit = (next: number) => {
    if (!interactive) return;
    const final = clearable && next === value ? 0 : next;
    setValue(final);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!interactive) return;
    const step = allowHalf ? 0.5 : 1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      commit(Math.min(count, value + step));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      commit(Math.max(0, value - step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      commit(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      commit(count);
    }
  };

  const inlineStyle: CSSProperties = {
    ...(color ? ({ ['--bwo-rate-color' as string]: color } as CSSProperties) : {}),
    ...style,
  };

  return (
    <div
      ref={ref}
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={value}
      aria-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      tabIndex={interactive ? 0 : -1}
      data-readonly={readOnly || undefined}
      data-disabled={disabled || undefined}
      data-size={size}
      className={cn('bwo-rate', `bwo-rate--${size}`, className)}
      style={inlineStyle}
      onKeyDown={onKeyDown}
      onMouseLeave={() => setHover(null)}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => {
        const fillPct = Math.max(0, Math.min(1, display - i)) * 100;
        return (
          <span key={i} className="bwo-rate-slot">
            <span className="bwo-rate-empty">{emptyIcon ?? symbolNode}</span>
            <span
              className="bwo-rate-full"
              style={{ clipPath: `inset(0 ${100 - fillPct}% 0 0)` }}
            >
              {symbolNode}
            </span>
            {interactive && allowHalf && (
              <button
                type="button"
                tabIndex={-1}
                aria-label={`${i + 0.5} of ${count}`}
                className="bwo-rate-hit bwo-rate-hit--left"
                onMouseEnter={() => setHover(i + 0.5)}
                onClick={() => commit(i + 0.5)}
              />
            )}
            {interactive && (
              <button
                type="button"
                tabIndex={-1}
                aria-label={`${i + 1} of ${count}`}
                className={cn(
                  'bwo-rate-hit',
                  allowHalf ? 'bwo-rate-hit--right' : 'bwo-rate-hit--full',
                )}
                onMouseEnter={() => setHover(i + 1)}
                onClick={() => commit(i + 1)}
              />
            )}
          </span>
        );
      })}
      {showValue && <span className="bwo-rate-value">{display.toFixed(allowHalf ? 1 : 0)}</span>}
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  );
});
