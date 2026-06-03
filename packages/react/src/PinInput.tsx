'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react';
import { cn } from './utils';

export interface PinInputProps {
  /** Number of slots. Default: `6`. */
  length?: number;
  /** Controlled value. */
  value?: string;
  /** Default value (uncontrolled). */
  defaultValue?: string;
  /** Fires every time the value changes. */
  onValueChange?: (value: string) => void;
  /** Fires when the full PIN has been entered. */
  onComplete?: (value: string) => void;
  /** Limits accepted characters. Default: `'numeric'`. */
  type?: 'numeric' | 'alphanumeric';
  /** Mask the entered characters (password style). Default: `false`. */
  mask?: boolean;
  /** Show an error border + announcement. */
  error?: boolean;
  /** Disable interaction. */
  disabled?: boolean;
  /** Visual size. Default: `'md'`. */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible group label. */
  'aria-label'?: string;
  className?: string;
  style?: React.CSSProperties;
  /** Auto-focus the first slot on mount. Default: `false`. */
  autoFocus?: boolean;
}

const slotSizeStyles = {
  sm: { width: 32, height: 38, fontSize: 16 },
  md: { width: 40, height: 48, fontSize: 20 },
  lg: { width: 48, height: 56, fontSize: 24 },
};

function sanitise(raw: string, type: 'numeric' | 'alphanumeric'): string {
  return type === 'numeric'
    ? raw.replace(/[^0-9]/g, '')
    : raw.replace(/[^0-9a-zA-Z]/g, '');
}

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(function PinInput(
  {
    length = 6,
    value,
    defaultValue = '',
    onValueChange,
    onComplete,
    type = 'numeric',
    mask = false,
    error = false,
    disabled,
    size = 'md',
    autoFocus,
    className,
    style,
    ...rest
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue.slice(0, length));
  const current = (isControlled ? value : internal).slice(0, length);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setValue = useCallback(
    (next: string) => {
      const clean = sanitise(next, type).slice(0, length);
      if (!isControlled) setInternal(clean);
      onValueChange?.(clean);
      if (clean.length === length) onComplete?.(clean);
    },
    [type, length, isControlled, onValueChange, onComplete],
  );

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const setSlot = (index: number, raw: string) => {
    const ch = sanitise(raw, type).slice(-1);
    if (!ch) return;
    const next = current.split('');
    next[index] = ch;
    while (next.length < index) next.push('');
    const joined = next.join('').slice(0, length);
    setValue(joined);
    if (index < length - 1) refs.current[index + 1]?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const chars = current.split('');
      if (chars[index]) {
        chars[index] = '';
        setValue(chars.join(''));
      } else if (index > 0) {
        chars[index - 1] = '';
        setValue(chars.join(''));
        refs.current[index - 1]?.focus();
      }
      return;
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      refs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      refs.current[index + 1]?.focus();
    }
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData('text');
    if (!text) return;
    e.preventDefault();
    setValue(text);
    const last = Math.min(text.length, length - 1);
    refs.current[last]?.focus();
  };

  const ss = slotSizeStyles[size];
  const slots = Array.from({ length });

  return (
    <div
      ref={ref}
      role="group"
      className={cn('bwo-pin-input', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style,
      }}
      {...rest}
    >
      {slots.map((_, i) => {
        const slotValue = current[i] ?? '';
        const isFilled = !!slotValue;
        return (
          <input
            key={i}
            ref={(node) => {
              refs.current[i] = node;
            }}
            type={mask ? 'password' : type === 'numeric' ? 'tel' : 'text'}
            inputMode={type === 'numeric' ? 'numeric' : 'text'}
            autoComplete="one-time-code"
            aria-label={`PIN digit ${i + 1}`}
            value={slotValue}
            disabled={disabled}
            maxLength={1}
            onChange={(e) => setSlot(i, e.target.value)}
            onKeyDown={(e) => onKey(e, i)}
            onPaste={onPaste}
            onFocus={(e) => e.currentTarget.select()}
            style={{
              width: ss.width,
              height: ss.height,
              fontSize: ss.fontSize,
              fontWeight: 600,
              textAlign: 'center',
              fontVariantNumeric: 'tabular-nums',
              border: `1px solid ${error ? '#ff481f' : isFilled ? 'var(--bwo-text)' : 'var(--bwo-border)'}`,
              borderRadius: 'var(--bwo-radius-md)',
              background: disabled ? 'var(--bwo-grey-4)' : 'var(--bwo-surface)',
              color: 'var(--bwo-text)',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
              padding: 0,
            }}
            onFocusCapture={(e) => {
              if (!error)
                e.currentTarget.style.boxShadow =
                  '0 0 0 3px rgba(255, 72, 31, 0.18)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        );
      })}
    </div>
  );
});
