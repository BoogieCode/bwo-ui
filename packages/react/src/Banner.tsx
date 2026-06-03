'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export type BannerTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface BannerProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Visual tone. Default: `'info'`. */
  tone?: BannerTone;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional title rendered before the body. */
  title?: ReactNode;
  /** Trailing action — usually a button or link. */
  action?: ReactNode;
  /** Renders a close (×) button on the right. Fires `onDismiss` when clicked. */
  onDismiss?: () => void;
  /** Pin the banner to the top of its parent. Default: `false`. */
  sticky?: boolean;
}

const toneStyles: Record<
  BannerTone,
  { bg: string; border: string; color: string; icon: string }
> = {
  info: {
    bg: 'rgba(14, 165, 233, 0.10)',
    border: 'rgba(14, 165, 233, 0.32)',
    color: '#0c4a6e',
    icon: '#0ea5e9',
  },
  success: {
    bg: 'rgba(22, 163, 74, 0.10)',
    border: 'rgba(22, 163, 74, 0.32)',
    color: '#14532d',
    icon: '#16a34a',
  },
  warning: {
    bg: 'rgba(255, 196, 70, 0.18)',
    border: 'rgba(255, 196, 70, 0.42)',
    color: '#7c4a00',
    icon: '#d97706',
  },
  danger: {
    bg: 'rgba(255, 72, 31, 0.10)',
    border: 'rgba(255, 72, 31, 0.34)',
    color: '#7f1d1d',
    icon: '#ff481f',
  },
  neutral: {
    bg: 'var(--bwo-grey-4)',
    border: 'var(--bwo-border)',
    color: 'var(--bwo-text)',
    icon: 'var(--bwo-text-body)',
  },
};

export const Banner = forwardRef<HTMLElement, BannerProps>(function Banner(
  {
    tone = 'info',
    icon,
    title,
    action,
    onDismiss,
    sticky = false,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const s = toneStyles[tone];
  return (
    <aside
      ref={ref as React.Ref<HTMLElement>}
      role="status"
      className={cn('bwo-banner', className)}
      style={{
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : undefined,
        zIndex: sticky ? 10 : undefined,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        borderRadius: 'var(--bwo-radius-md)',
        fontSize: 14,
        lineHeight: 1.45,
        ...style,
      }}
      {...rest}
    >
      {icon && (
        <span
          aria-hidden
          style={{
            display: 'inline-flex',
            color: s.icon,
            flex: '0 0 auto',
          }}
        >
          {icon}
        </span>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <span style={{ fontWeight: 600, marginRight: 8 }}>{title}</span>
        )}
        {children}
      </div>
      {action && <div style={{ flex: '0 0 auto' }}>{action}</div>}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            border: 0,
            background: 'transparent',
            color: 'inherit',
            opacity: 0.7,
            cursor: 'pointer',
            borderRadius: 6,
            padding: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = '0.7';
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </aside>
  );
});
