'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
} from 'react';
import { cn } from './utils';
import {
  addDays,
  addMonths,
  clamp,
  endOfMonth,
  getMonthGrid,
  getMonthName,
  getWeekdayHeaders,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfMonth,
  toDate,
  type DateLike,
} from './internal/date';

export type CalendarMode = 'single' | 'range';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface CalendarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  mode?: CalendarMode;
  /** Selected date (single mode) or range (range mode). */
  value?: Date | null | DateRange;
  defaultValue?: Date | null | DateRange;
  onValueChange?: (value: Date | null | DateRange) => void;
  /** Month displayed initially. Defaults to today. */
  defaultMonth?: DateLike;
  month?: DateLike;
  onMonthChange?: (month: Date) => void;
  /** Disable dates before this. */
  minDate?: DateLike;
  /** Disable dates after this. */
  maxDate?: DateLike;
  /** Predicate: return true to disable a date. */
  isDateDisabled?: (date: Date) => boolean;
  /** First day of the week (0 = Sun, 1 = Mon). Default: 0. */
  weekStartsOn?: 0 | 1;
  /** Hide the weekday header row. */
  hideWeekdays?: boolean;
}

const today = (): Date => new Date();

function isRange(v: unknown): v is DateRange {
  return !!v && typeof v === 'object' && 'from' in (v as Record<string, unknown>);
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    mode = 'single',
    value: controlledValue,
    defaultValue,
    onValueChange,
    defaultMonth,
    month: controlledMonth,
    onMonthChange,
    minDate,
    maxDate,
    isDateDisabled,
    weekStartsOn = 0,
    hideWeekdays,
    className,
    ...props
  },
  ref,
) {
  const min = minDate ? toDate(minDate) : null;
  const max = maxDate ? toDate(maxDate) : null;

  const [internalValue, setInternalValue] = useState<Date | null | DateRange>(
    defaultValue ?? (mode === 'range' ? { from: null, to: null } : null),
  );
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const [internalMonth, setInternalMonth] = useState<Date>(
    startOfMonth(defaultMonth ? toDate(defaultMonth) : today()),
  );
  const month = controlledMonth ? startOfMonth(toDate(controlledMonth)) : internalMonth;
  const setMonth = useCallback(
    (next: Date) => {
      const m = startOfMonth(next);
      if (controlledMonth === undefined) setInternalMonth(m);
      onMonthChange?.(m);
    },
    [controlledMonth, onMonthChange],
  );

  const grid = useMemo(() => getMonthGrid(month, weekStartsOn), [month, weekStartsOn]);
  const weekdays = useMemo(() => getWeekdayHeaders(weekStartsOn), [weekStartsOn]);

  const checkDisabled = useCallback(
    (d: Date) => {
      if (min && isBefore(d, min)) return true;
      if (max && isAfter(d, max)) return true;
      return isDateDisabled?.(d) ?? false;
    },
    [min, max, isDateDisabled],
  );

  const selectedSingle = mode === 'single' && !isRange(value) ? (value as Date | null) : null;
  const selectedRange =
    mode === 'range' && isRange(value) ? value : { from: null, to: null };

  const isSelected = (d: Date): boolean => {
    if (mode === 'single') return isSameDay(d, selectedSingle);
    if (selectedRange.from && isSameDay(d, selectedRange.from)) return true;
    if (selectedRange.to && isSameDay(d, selectedRange.to)) return true;
    return false;
  };

  const isInRange = (d: Date): boolean => {
    if (mode !== 'range') return false;
    const { from, to } = selectedRange;
    if (!from || !to) return false;
    return d >= from && d <= to;
  };

  const handleSelect = (d: Date) => {
    if (checkDisabled(d)) return;
    let next: Date | null | DateRange;
    if (mode === 'single') {
      next = isSameDay(d, selectedSingle) ? null : d;
    } else {
      const { from, to } = selectedRange;
      if (!from || (from && to)) {
        next = { from: d, to: null };
      } else if (isBefore(d, from)) {
        next = { from: d, to: from };
      } else {
        next = { from, to: d };
      }
    }
    if (controlledValue === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  const focusedRef = useState<Date>(() =>
    clamp(selectedSingle ?? selectedRange.from ?? today(), min, max),
  );
  const [focusedDate, setFocusedDate] = focusedRef;

  useEffect(() => {
    if (!isSameMonth(focusedDate, month)) setFocusedDate(startOfMonth(month));
  }, [month, focusedDate, setFocusedDate]);

  const moveFocus = (delta: number, unit: 'day' | 'week' | 'month') => {
    let next: Date;
    if (unit === 'day') next = addDays(focusedDate, delta);
    else if (unit === 'week') next = addDays(focusedDate, delta * 7);
    else next = addMonths(focusedDate, delta);
    next = clamp(next, min, max);
    setFocusedDate(next);
    if (!isSameMonth(next, month)) setMonth(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveFocus(-1, 'day');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveFocus(1, 'day');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveFocus(-1, 'week');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveFocus(1, 'week');
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      moveFocus(-1, 'month');
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      moveFocus(1, 'month');
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocusedDate(startOfMonth(focusedDate));
    } else if (e.key === 'End') {
      e.preventDefault();
      setFocusedDate(endOfMonth(focusedDate));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(focusedDate);
    }
  };

  return (
    <div
      ref={ref}
      role="application"
      aria-label={`${getMonthName(month)} ${month.getFullYear()}`}
      className={cn('bwo-calendar', className)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className="bwo-calendar-header">
        <button
          type="button"
          className="bwo-calendar-nav"
          aria-label="Previous month"
          onClick={() => setMonth(addMonths(month, -1))}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="bwo-calendar-title" aria-live="polite">
          {getMonthName(month)} {month.getFullYear()}
        </div>
        <button
          type="button"
          className="bwo-calendar-nav"
          aria-label="Next month"
          onClick={() => setMonth(addMonths(month, 1))}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {!hideWeekdays && (
        <div className="bwo-calendar-weekdays" aria-hidden>
          {weekdays.map((w) => (
            <div key={w} className="bwo-calendar-weekday">
              {w}
            </div>
          ))}
        </div>
      )}
      <div className="bwo-calendar-grid" role="grid">
        {grid.map((d) => {
          const outside = !isSameMonth(d, month);
          const disabled = checkDisabled(d);
          const selected = isSelected(d);
          const inRange = isInRange(d);
          const isFocused = isSameDay(d, focusedDate);
          const isToday = isSameDay(d, today());
          return (
            <button
              key={d.toISOString()}
              type="button"
              role="gridcell"
              tabIndex={isFocused ? 0 : -1}
              aria-selected={selected}
              aria-disabled={disabled || undefined}
              data-outside={outside || undefined}
              data-today={isToday || undefined}
              data-in-range={inRange || undefined}
              data-selected={selected || undefined}
              disabled={disabled}
              className="bwo-calendar-cell"
              onClick={() => handleSelect(d)}
              onFocus={() => setFocusedDate(d)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
});
