'use client';

import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { Calendar, type CalendarProps, type DateRange } from './Calendar';
import { PopoverContent, PopoverRoot, PopoverTrigger } from './Popover';
import { cn } from './utils';
import { formatISODate, toDate, type DateLike } from './internal/date';

export interface DatePickerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange' | 'defaultValue'> {
  value?: Date | null;
  defaultValue?: DateLike | null;
  onValueChange?: (value: Date | null) => void;
  placeholder?: string;
  formatLabel?: (date: Date) => string;
  calendarProps?: Omit<CalendarProps, 'mode' | 'value' | 'onValueChange'>;
  leftIcon?: ReactNode;
}

const defaultFormat = (d: Date) => d.toLocaleDateString();

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  {
    value: controlledValue,
    defaultValue,
    onValueChange,
    placeholder = 'Pick a date',
    formatLabel = defaultFormat,
    calendarProps,
    leftIcon,
    className,
    ...rest
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState<Date | null>(
    defaultValue ? toDate(defaultValue) : null,
  );
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const [open, setOpen] = useState(false);

  const handleSelect = (next: Date | null | DateRange) => {
    const date = next instanceof Date || next === null ? next : next.from;
    if (controlledValue === undefined) setInternalValue(date);
    onValueChange?.(date);
    if (date) setOpen(false);
  };

  return (
    <PopoverRoot open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={ref}
          type="button"
          className={cn('bwo-input', 'bwo-datepicker-trigger', className)}
          data-empty={!value || undefined}
          {...rest}
        >
          {leftIcon ?? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
              <path
                d="M3 9h18M8 3v4M16 3v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
          <span>{value ? formatLabel(value) : placeholder}</span>
          <input type="hidden" value={value ? formatISODate(value) : ''} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="bwo-datepicker-popover" align="start" sideOffset={6}>
        <Calendar
          mode="single"
          value={value}
          onValueChange={handleSelect}
          {...calendarProps}
        />
      </PopoverContent>
    </PopoverRoot>
  );
});
