'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn, type Radius } from './utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export type AlertAppearance = 'soft' | 'solid' | 'outline';

const URGENT_VARIANTS: ReadonlySet<AlertVariant> = new Set(['warning', 'error']);

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  appearance?: AlertAppearance;
  title?: ReactNode;
  icon?: ReactNode;
  /** Render as an `<button>`-bearing alert with a dismiss control. */
  onDismiss?: () => void;
  /** Action buttons rendered below the body, before the dismiss button. */
  actions?: ReactNode;
  /** Corner radius preset. Omit to inherit the global default (6px). */
  radius?: Radius;
  /**
   * Force the ARIA semantic. Defaults to `true` for `warning` / `error` (announces as
   * `role="alert"` + `aria-live="assertive"`) and `false` for `info` / `success`
   * (`role="status"` + `aria-live="polite"`).
   */
  urgent?: boolean;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = 'info',
    appearance = 'soft',
    title,
    icon,
    onDismiss,
    actions,
    radius,
    urgent,
    className,
    children,
    ...props
  },
  ref,
) {
  const isUrgent = urgent ?? URGENT_VARIANTS.has(variant);
  return (
    <div
      ref={ref}
      role={isUrgent ? 'alert' : 'status'}
      aria-live={isUrgent ? 'assertive' : 'polite'}
      data-radius={radius}
      data-appearance={appearance}
      className={cn(
        'bwo-alert',
        `bwo-alert--${variant}`,
        appearance !== 'soft' && `bwo-alert--${appearance}`,
        className,
      )}
      {...props}
    >
      {icon !== undefined ? (
        <span className="bwo-alert-icon" aria-hidden>
          {icon}
        </span>
      ) : (
        <DefaultIcon variant={variant} />
      )}
      <div className="bwo-alert-body">
        {title && <div className="bwo-alert-title">{title}</div>}
        {children && <div className="bwo-alert-description">{children}</div>}
        {actions && <div className="bwo-alert-actions">{actions}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          className="bwo-alert-close"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
});

function DefaultIcon({ variant }: { variant: AlertVariant }) {
  if (variant === 'success') {
    return (
      <span className="bwo-alert-icon" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.18" />
          <path
            d="M8 12.5l2.5 2.5L16 9.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (variant === 'warning' || variant === 'error') {
    return (
      <span className="bwo-alert-icon" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.18" />
          <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
      </span>
    );
  }
  return (
    <span className="bwo-alert-icon" aria-hidden>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.18" />
        <path d="M12 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="8" r="1" fill="currentColor" />
      </svg>
    </span>
  );
}
