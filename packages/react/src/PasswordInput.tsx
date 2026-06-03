'use client';

import {
  forwardRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from 'react';
import { cn } from './utils';

export interface PasswordStrength {
  /** 0-4 score. 0 = empty, 1 = weak, 4 = strong. */
  score: 0 | 1 | 2 | 3 | 4;
  /** Short label shown next to the bar. */
  label: string;
}

export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Show / hide reveal eye button. Default: `true`. */
  toggleable?: boolean;
  /** Show strength meter underneath. Default: `true`. */
  meter?: boolean;
  /** Override the strength function. */
  strength?: (value: string) => PasswordStrength;
  /** Error message rendered under the field. */
  error?: string;
}

function defaultStrength(value: string): PasswordStrength {
  if (!value) return { score: 0, label: '' };
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/\d/.test(value)) score++;
  if (/[^\w]/.test(value)) score++;
  if (value.length >= 14 && score >= 3) score = 4;
  const label =
    score === 0
      ? ''
      : score === 1
        ? 'Weak'
        : score === 2
          ? 'Fair'
          : score === 3
            ? 'Good'
            : 'Strong';
  return { score: score as PasswordStrength['score'], label };
}

const scoreColors = ['transparent', '#ff481f', '#f59e0b', '#84cc16', '#16a34a'];

const Eye = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const EyeOff = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 3l18 18"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M10.6 6.2A11 11 0 0112 6c6.5 0 10 6 10 6a14.6 14.6 0 01-3 3.9M6 7.6A14.6 14.6 0 002 12s3.5 7 10 7c1.6 0 3.1-.4 4.5-1"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M9.5 9.6a3 3 0 004.2 4.2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      toggleable = true,
      meter = true,
      strength = defaultStrength,
      error,
      onChange,
      className,
      style,
      defaultValue,
      value,
      ...rest
    },
    ref,
  ) {
    const [visible, setVisible] = useState(false);
    const [internal, setInternal] = useState<string>(String(defaultValue ?? ''));
    const current = String(value ?? internal ?? '');
    const result = strength(current);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInternal(e.target.value);
      onChange?.(e);
    };

    return (
      <div className={cn('bwo-password', className)} style={style}>
        <div style={{ position: 'relative' }}>
          <input
            ref={ref}
            type={visible ? 'text' : 'password'}
            value={value}
            defaultValue={value === undefined ? defaultValue : undefined}
            onChange={handleChange}
            className="bwo-input"
            style={{
              paddingRight: toggleable ? 40 : undefined,
              borderColor: error ? '#ff481f' : undefined,
            }}
            {...rest}
          />
          {toggleable && (
            <button
              type="button"
              aria-label={visible ? 'Hide password' : 'Show password'}
              aria-pressed={visible}
              onClick={() => setVisible((v) => !v)}
              style={{
                position: 'absolute',
                right: 6,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 28,
                height: 28,
                border: 0,
                background: 'transparent',
                color: 'var(--bwo-text-body)',
                cursor: 'pointer',
                padding: 0,
                borderRadius: 6,
              }}
            >
              {visible ? EyeOff : Eye}
            </button>
          )}
        </div>
        {meter && (
          <div style={{ marginTop: 8 }}>
            <div
              aria-hidden
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 4,
                height: 4,
              }}
            >
              {[1, 2, 3, 4].map((bar) => (
                <span
                  key={bar}
                  style={{
                    height: '100%',
                    borderRadius: 2,
                    background:
                      bar <= result.score ? scoreColors[result.score] : 'var(--bwo-grey-4)',
                    transition: 'background-color 0.18s ease',
                  }}
                />
              ))}
            </div>
            {result.label && (
              <div
                style={{
                  marginTop: 4,
                  fontSize: 11.5,
                  color: scoreColors[result.score],
                  fontWeight: 500,
                }}
                aria-live="polite"
              >
                {result.label}
              </div>
            )}
          </div>
        )}
        {error && (
          <div
            role="alert"
            style={{ marginTop: 6, fontSize: 12, color: '#ff481f' }}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);
