'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export interface ColorPickerProps {
  /** Controlled value (hex). */
  value?: string;
  /** Uncontrolled default. */
  defaultValue?: string;
  /** Fires when the colour changes. */
  onValueChange?: (color: string) => void;
  /** Preset swatches shown in the row above the picker. */
  swatches?: string[];
  /** Show the native colour picker. Default: `true`. */
  showNative?: boolean;
  /** Show the hex input. Default: `true`. */
  showHex?: boolean;
  /** Disable interaction. */
  disabled?: boolean;
  /** Inline label rendered above the field. */
  label?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_SWATCHES = [
  '#ff481f',
  '#f59e0b',
  '#84cc16',
  '#16a34a',
  '#0ea5e9',
  '#7463ff',
  '#ec4899',
  '#0a0a0a',
  '#ffffff',
];

function normalise(hex: string): string {
  if (!hex.startsWith('#')) hex = '#' + hex;
  if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
    const r = hex[1]!;
    const g = hex[2]!;
    const b = hex[3]!;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) return hex.toLowerCase();
  return hex;
}

function isValidHex(hex: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(hex) || /^#[0-9a-fA-F]{3}$/.test(hex);
}

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(function ColorPicker(
  {
    value,
    defaultValue = '#ff481f',
    onValueChange,
    swatches = DEFAULT_SWATCHES,
    showNative = true,
    showHex = true,
    disabled,
    label,
    className,
    style,
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string>(normalise(defaultValue));
  const current = normalise(isControlled ? (value as string) : internal);
  const [hexDraft, setHexDraft] = useState<string>(current);

  useEffect(() => {
    setHexDraft(current);
  }, [current]);

  const setColor = useCallback(
    (next: string) => {
      const norm = normalise(next);
      if (!isControlled) setInternal(norm);
      onValueChange?.(norm);
    },
    [isControlled, onValueChange],
  );

  const onNativeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const onHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (!v.startsWith('#')) v = '#' + v;
    setHexDraft(v);
    if (isValidHex(v)) setColor(v);
  };

  return (
    <div ref={ref} className={cn('bwo-color-picker', className)} style={style}>
      {label && (
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            marginBottom: 8,
            color: 'var(--bwo-text)',
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <label
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 12,
            border: '1px solid var(--bwo-border)',
            background: current,
            cursor: disabled ? 'not-allowed' : 'pointer',
            overflow: 'hidden',
            flex: '0 0 40px',
            boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.18)',
          }}
        >
          {showNative && (
            <input
              type="color"
              value={current}
              disabled={disabled}
              onChange={onNativeChange}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: disabled ? 'not-allowed' : 'pointer',
                border: 0,
                padding: 0,
                background: 'transparent',
              }}
              aria-label="Pick a colour"
            />
          )}
        </label>
        {showHex && (
          <input
            type="text"
            value={hexDraft}
            onChange={onHexChange}
            disabled={disabled}
            className="bwo-input"
            spellCheck={false}
            style={{
              flex: 1,
              fontFamily: 'var(--bwo-font-mono, ui-monospace, monospace)',
              fontSize: 14,
              maxWidth: 140,
            }}
            aria-label="Hex value"
          />
        )}
      </div>
      {swatches.length > 0 && (
        <div
          role="listbox"
          aria-label="Preset colours"
          style={{
            marginTop: 10,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(28px, 1fr))',
            gap: 6,
          }}
        >
          {swatches.map((s) => {
            const norm = normalise(s);
            const isActive = norm === current;
            return (
              <button
                key={s}
                type="button"
                role="option"
                aria-selected={isActive}
                aria-label={s}
                disabled={disabled}
                onClick={() => setColor(s)}
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  borderRadius: 8,
                  border: isActive
                    ? '2px solid var(--bwo-text)'
                    : '1px solid var(--bwo-border)',
                  background: norm,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  padding: 0,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
});
