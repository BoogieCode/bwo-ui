'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type InputHTMLAttributes,
} from 'react';
import { cn } from './utils';

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type'> {
  /** Controlled value. `null` means empty. */
  value?: number | null;
  /** Default (uncontrolled). */
  defaultValue?: number | null;
  /** Called with the next numeric value (or null when cleared). */
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  /** Step applied by arrow keys / +/- buttons. Default: 1. */
  step?: number;
  /** Larger step applied by Shift+ArrowUp/ArrowDown. Default: step × 10. */
  largeStep?: number;
  /** Decimal precision (number of digits after the dot). Default: derived from step. */
  precision?: number;
  /** Show the +/- stepper buttons. Default: true. */
  showSteppers?: boolean;
  /** Clamp value into [min, max] on blur. Default: true. */
  clampOnBlur?: boolean;
  /** Prefix text rendered before the input. */
  prefix?: string;
  /** Suffix text rendered after the input. */
  suffix?: string;
  /** Disable mouse-wheel value changes. Default: false. */
  disableWheel?: boolean;
}

function derivePrecision(step: number): number {
  if (!Number.isFinite(step)) return 0;
  const str = String(step);
  const dot = str.indexOf('.');
  if (dot === -1) return 0;
  return str.length - dot - 1;
}

function format(value: number, precision: number): string {
  return precision > 0 ? value.toFixed(precision) : String(value);
}

function clamp(v: number, min: number | undefined, max: number | undefined): number {
  let out = v;
  if (min !== undefined) out = Math.max(min, out);
  if (max !== undefined) out = Math.min(max, out);
  return out;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    value: controlledValue,
    defaultValue = null,
    onValueChange,
    min,
    max,
    step = 1,
    largeStep,
    precision: precisionProp,
    showSteppers = true,
    clampOnBlur = true,
    prefix,
    suffix,
    disableWheel,
    className,
    onBlur,
    onKeyDown,
    onWheel,
    disabled,
    readOnly,
    ...inputProps
  },
  ref,
) {
  const precision = precisionProp ?? derivePrecision(step);
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<number | null>(defaultValue);
  const value = isControlled ? controlledValue : internalValue;

  const [displayValue, setDisplayValue] = useState<string>(
    value === null || value === undefined ? '' : format(value, precision),
  );

  useEffect(() => {
    if (value === null || value === undefined) {
      setDisplayValue('');
    } else {
      setDisplayValue(format(value, precision));
    }
  }, [value, precision]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, []);

  const commit = useCallback(
    (next: number | null) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const adjust = useCallback(
    (delta: number) => {
      if (disabled || readOnly) return;
      const base = value ?? min ?? 0;
      const next = clamp(Number((base + delta).toFixed(10)), min, max);
      commit(next);
    },
    [value, min, max, disabled, readOnly, commit],
  );

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const raw = e.target.value;
    setDisplayValue(raw);
    if (raw === '' || raw === '-') {
      commit(null);
      return;
    }
    const parsed = Number(raw);
    if (Number.isFinite(parsed)) {
      commit(parsed);
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    onBlur?.(e);
    if (displayValue === '' || displayValue === '-') {
      commit(null);
      setDisplayValue('');
      return;
    }
    const parsed = Number(displayValue);
    if (!Number.isFinite(parsed)) {
      setDisplayValue(value === null || value === undefined ? '' : format(value, precision));
      return;
    }
    const next = clampOnBlur ? clamp(parsed, min, max) : parsed;
    commit(next);
    setDisplayValue(format(next, precision));
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    onKeyDown?.(e);
    const big = largeStep ?? step * 10;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      adjust(e.shiftKey ? big : step);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      adjust(e.shiftKey ? -big : -step);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      adjust(big);
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      adjust(-big);
    } else if (e.key === 'Home' && min !== undefined) {
      e.preventDefault();
      commit(min);
    } else if (e.key === 'End' && max !== undefined) {
      e.preventDefault();
      commit(max);
    }
  };

  const handleWheel: React.WheelEventHandler<HTMLInputElement> = (e) => {
    onWheel?.(e);
    if (disableWheel || disabled || readOnly) return;
    if (document.activeElement !== inputRef.current) return;
    e.preventDefault();
    adjust(e.deltaY < 0 ? step : -step);
  };

  const canDecrement = !disabled && !readOnly && (min === undefined || (value ?? min) > min);
  const canIncrement = !disabled && !readOnly && (max === undefined || (value ?? max) < max);

  return (
    <div
      className={cn(
        'bwo-numberinput',
        disabled && 'bwo-numberinput--disabled',
        className,
      )}
      data-disabled={disabled || undefined}
    >
      {prefix && <span className="bwo-numberinput-prefix">{prefix}</span>}
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        role="spinbutton"
        aria-valuenow={value ?? undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        autoComplete="off"
        className="bwo-numberinput-input"
        value={displayValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onWheel={handleWheel}
        {...inputProps}
      />
      {suffix && <span className="bwo-numberinput-suffix">{suffix}</span>}
      {showSteppers && (
        <div className="bwo-numberinput-steppers">
          <button
            type="button"
            tabIndex={-1}
            aria-label="Increment"
            disabled={!canIncrement}
            className="bwo-numberinput-stepper bwo-numberinput-stepper--up"
            onClick={() => adjust(step)}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Decrement"
            disabled={!canDecrement}
            className="bwo-numberinput-stepper bwo-numberinput-stepper--down"
            onClick={() => adjust(-step)}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
});
