'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export type ChipVariant = 'solid' | 'soft' | 'outline';
export type ChipTone = 'default' | 'red' | 'green' | 'yellow' | 'blue' | 'purple';
export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  variant?: ChipVariant;
  tone?: ChipTone;
  size?: ChipSize;
  /** Optional leading icon, avatar, dot. */
  leading?: ReactNode;
  /** Trailing element rendered before the close button. */
  trailing?: ReactNode;
  /** When provided, renders a clickable close (×) button. */
  onRemove?: () => void;
  /** When provided, the chip acts as a button. */
  onClick?: () => void;
  /** Disables interactive states. */
  disabled?: boolean;
}

const toneColors: Record<ChipTone, { solid: string; soft: string; text: string }> = {
  default: {
    solid: 'var(--bwo-text)',
    soft: 'var(--bwo-grey-4)',
    text: 'var(--bwo-text)',
  },
  red: { solid: '#ff481f', soft: 'rgba(255, 72, 31, 0.16)', text: '#a01100' },
  green: { solid: '#16a34a', soft: 'rgba(22, 163, 74, 0.16)', text: '#14532d' },
  yellow: { solid: '#f59e0b', soft: 'rgba(255, 196, 70, 0.22)', text: '#7c4a00' },
  blue: { solid: '#0ea5e9', soft: 'rgba(14, 165, 233, 0.16)', text: '#0c4a6e' },
  purple: { solid: '#7463ff', soft: 'rgba(116, 99, 255, 0.16)', text: '#3b2c99' },
};

const sizeStyles: Record<ChipSize, { fontSize: number; padX: number; padY: number; gap: number; close: number }> = {
  sm: { fontSize: 11.5, padX: 8, padY: 2, gap: 4, close: 12 },
  md: { fontSize: 13, padX: 10, padY: 3, gap: 6, close: 14 },
  lg: { fontSize: 14.5, padX: 12, padY: 4, gap: 7, close: 16 },
};

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(function Chip(
  {
    variant = 'soft',
    tone = 'default',
    size = 'md',
    leading,
    trailing,
    onRemove,
    onClick,
    disabled,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const colors = toneColors[tone];
  const ss = sizeStyles[size];

  const styles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: ss.gap,
    fontSize: ss.fontSize,
    fontWeight: 500,
    lineHeight: 1.2,
    padding: `${ss.padY}px ${ss.padX}px`,
    borderRadius: 9999,
    fontFamily: 'inherit',
    border: '1px solid transparent',
    cursor: onClick ? 'pointer' : 'default',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color 0.15s ease, border-color 0.15s ease',
    ...(variant === 'solid'
      ? {
          background: colors.solid,
          color: tone === 'default' ? 'var(--bwo-surface)' : '#fff',
        }
      : variant === 'soft'
        ? { background: colors.soft, color: colors.text }
        : {
            background: 'transparent',
            color: colors.text,
            borderColor: 'currentColor',
          }),
    ...style,
  };

  return (
    <span
      ref={ref}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      className={cn('bwo-chip', `bwo-chip--${variant}`, `bwo-chip--${tone}`, className)}
      style={styles}
      onClick={onClick && !disabled ? onClick : undefined}
      onKeyDown={
        onClick && !disabled
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      {...rest}
    >
      {leading && <span style={{ display: 'inline-flex', flex: '0 0 auto' }}>{leading}</span>}
      <span>{children}</span>
      {trailing && <span style={{ display: 'inline-flex', flex: '0 0 auto' }}>{trailing}</span>}
      {onRemove && !disabled && (
        <button
          type="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: ss.close + 4,
            height: ss.close + 4,
            border: 0,
            background: 'transparent',
            color: 'currentColor',
            opacity: 0.7,
            cursor: 'pointer',
            borderRadius: '50%',
            padding: 0,
            margin: `0 -${ss.padY}px 0 0`,
          }}
        >
          <svg width={ss.close} height={ss.close} viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
});
