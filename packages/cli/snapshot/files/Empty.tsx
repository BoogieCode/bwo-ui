import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export interface EmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional illustration / icon shown above the title. */
  icon?: ReactNode;
  /** Heading. */
  title?: ReactNode;
  /** Supporting copy under the title. */
  description?: ReactNode;
  /** Action area — usually a CTA button. */
  action?: ReactNode;
  /** Visual size. Default: `'md'`. */
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: { padding: '20px 16px', titleSize: 14, descSize: 12.5, iconSize: 32 },
  md: { padding: '40px 24px', titleSize: 16, descSize: 13.5, iconSize: 48 },
  lg: { padding: '64px 32px', titleSize: 20, descSize: 14.5, iconSize: 64 },
};

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  { icon, title, description, action, size = 'md', className, style, children, ...rest },
  ref,
) {
  const s = sizeStyles[size];
  return (
    <div
      ref={ref}
      className={cn('bwo-empty', className)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: s.padding,
        color: 'var(--bwo-text-body)',
        gap: 10,
        ...style,
      }}
      {...rest}
    >
      {icon && (
        <span
          aria-hidden
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: s.iconSize,
            height: s.iconSize,
            borderRadius: '50%',
            background: 'var(--bwo-grey-4)',
            color: 'var(--bwo-text-body)',
          }}
        >
          {icon}
        </span>
      )}
      {title && (
        <h3
          style={{
            margin: 0,
            fontSize: s.titleSize,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: 'var(--bwo-text)',
          }}
        >
          {title}
        </h3>
      )}
      {description && (
        <p
          style={{
            margin: 0,
            fontSize: s.descSize,
            color: 'var(--bwo-text-body)',
            lineHeight: 1.5,
            maxWidth: '42ch',
          }}
        >
          {description}
        </p>
      )}
      {children}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
});
