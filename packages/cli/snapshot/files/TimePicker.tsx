'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from 'react';
import { cn } from './utils';

export interface TimePickerValue {
  hours: number;
  minutes: number;
  /** Only present when `format="12h"`. */
  meridiem?: 'AM' | 'PM';
}

export interface TimePickerProps {
  /** Controlled value (24-hour `HH:MM` string). */
  value?: string;
  /** Default (uncontrolled). */
  defaultValue?: string;
  /** Fires with the new 24-hour `HH:MM` string. */
  onValueChange?: (value: string) => void;
  /** Show seconds in addition to hours+minutes. Default: `false`. */
  withSeconds?: boolean;
  /** Display format. Default: `'24h'`. */
  format?: '24h' | '12h';
  /** Granularity in minutes used by ↑/↓ on the minute field. Default: `1`. */
  step?: number;
  /** Disable interaction. */
  disabled?: boolean;
  /** Accessible group label. */
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function parse(raw: string): { h: number; m: number; s: number } | null {
  const match = /^(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/.exec(raw.trim());
  if (!match) return null;
  const h = Math.min(23, parseInt(match[1]!, 10));
  const m = Math.min(59, parseInt(match[2]!, 10));
  const s = match[3] ? Math.min(59, parseInt(match[3]!, 10)) : 0;
  return { h, m, s };
}

export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(function TimePicker(
  {
    value,
    defaultValue = '12:00',
    onValueChange,
    withSeconds = false,
    format = '24h',
    step = 1,
    disabled,
    className,
    style,
    ...rest
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? (value as string) : internal;
  const parsed = parse(current) ?? { h: 12, m: 0, s: 0 };

  const [hourDraft, setHourDraft] = useState<string>(() =>
    format === '24h' ? pad(parsed.h) : pad(((parsed.h + 11) % 12) + 1),
  );
  const [minDraft, setMinDraft] = useState<string>(pad(parsed.m));
  const [secDraft, setSecDraft] = useState<string>(pad(parsed.s));
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>(parsed.h >= 12 ? 'PM' : 'AM');

  useEffect(() => {
    const p = parse(current);
    if (!p) return;
    setMinDraft(pad(p.m));
    setSecDraft(pad(p.s));
    if (format === '24h') setHourDraft(pad(p.h));
    else {
      setHourDraft(pad(((p.h + 11) % 12) + 1));
      setMeridiem(p.h >= 12 ? 'PM' : 'AM');
    }
  }, [current, format]);

  const commit = useCallback(
    (h: number, m: number, s: number, mer?: 'AM' | 'PM') => {
      let hour24 = h;
      if (format === '12h' && mer) {
        hour24 = (h % 12) + (mer === 'PM' ? 12 : 0);
      }
      const formatted =
        pad(hour24) +
        ':' +
        pad(m) +
        (withSeconds ? ':' + pad(s) : '');
      if (!isControlled) setInternal(formatted);
      onValueChange?.(formatted);
    },
    [format, withSeconds, isControlled, onValueChange],
  );

  const blurHour = (e: FocusEvent<HTMLInputElement>) => {
    const max = format === '24h' ? 23 : 12;
    const min = format === '24h' ? 0 : 1;
    let h = Math.max(min, Math.min(max, parseInt(e.target.value || '0', 10) || min));
    const display = pad(h);
    setHourDraft(display);
    commit(h, parsed.m, parsed.s, meridiem);
  };
  const blurMin = (e: FocusEvent<HTMLInputElement>) => {
    let m = Math.max(0, Math.min(59, parseInt(e.target.value || '0', 10) || 0));
    setMinDraft(pad(m));
    commit(parsed.h, m, parsed.s, meridiem);
  };
  const blurSec = (e: FocusEvent<HTMLInputElement>) => {
    let s = Math.max(0, Math.min(59, parseInt(e.target.value || '0', 10) || 0));
    setSecDraft(pad(s));
    commit(parsed.h, parsed.m, s, meridiem);
  };

  const onMeridiem = (v: 'AM' | 'PM') => {
    setMeridiem(v);
    const h = parseInt(hourDraft || '12', 10);
    commit(h, parsed.m, parsed.s, v);
  };

  const slotStyle: React.CSSProperties = {
    width: 46,
    height: 38,
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
    fontVariantNumeric: 'tabular-nums',
    border: '1px solid var(--bwo-border)',
    borderRadius: 'var(--bwo-radius-md)',
    background: disabled ? 'var(--bwo-grey-4)' : 'var(--bwo-surface)',
    color: 'var(--bwo-text)',
    fontFamily: 'inherit',
    outline: 'none',
    padding: 0,
  };

  return (
    <div
      ref={ref}
      role="group"
      className={cn('bwo-time-picker', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        ...style,
      }}
      {...rest}
    >
      <input
        type="text"
        inputMode="numeric"
        aria-label="Hours"
        value={hourDraft}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setHourDraft(e.target.value.replace(/[^0-9]/g, '').slice(0, 2))
        }
        onBlur={blurHour}
        disabled={disabled}
        style={slotStyle}
      />
      <span style={{ fontSize: 18, color: 'var(--bwo-text-body)' }}>:</span>
      <input
        type="text"
        inputMode="numeric"
        aria-label="Minutes"
        value={minDraft}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMinDraft(e.target.value.replace(/[^0-9]/g, '').slice(0, 2))
        }
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            const delta = e.key === 'ArrowUp' ? step : -step;
            const next = (((parsed.m + delta) % 60) + 60) % 60;
            setMinDraft(pad(next));
            commit(parsed.h, next, parsed.s, meridiem);
          }
        }}
        onBlur={blurMin}
        disabled={disabled}
        style={slotStyle}
      />
      {withSeconds && (
        <>
          <span style={{ fontSize: 18, color: 'var(--bwo-text-body)' }}>:</span>
          <input
            type="text"
            inputMode="numeric"
            aria-label="Seconds"
            value={secDraft}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSecDraft(e.target.value.replace(/[^0-9]/g, '').slice(0, 2))
            }
            onBlur={blurSec}
            disabled={disabled}
            style={slotStyle}
          />
        </>
      )}
      {format === '12h' && (
        <div
          role="radiogroup"
          aria-label="Meridiem"
          style={{
            display: 'inline-flex',
            border: '1px solid var(--bwo-border)',
            borderRadius: 'var(--bwo-radius-md)',
            overflow: 'hidden',
            marginLeft: 6,
            height: 38,
          }}
        >
          {(['AM', 'PM'] as const).map((m) => {
            const isActive = meridiem === m;
            return (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => !disabled && onMeridiem(m)}
                disabled={disabled}
                style={{
                  padding: '0 10px',
                  height: '100%',
                  border: 0,
                  background: isActive ? 'var(--bwo-text)' : 'transparent',
                  color: isActive ? 'var(--bwo-surface)' : 'var(--bwo-text)',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.15s ease',
                }}
              >
                {m}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});
