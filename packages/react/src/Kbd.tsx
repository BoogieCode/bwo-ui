import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from './utils';

export type KbdSize = 'sm' | 'md' | 'lg';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  size?: KbdSize;
}

const sizeStyles: Record<KbdSize, React.CSSProperties> = {
  sm: { fontSize: 10, padding: '1px 5px', borderRadius: 4 },
  md: { fontSize: 11.5, padding: '2px 7px', borderRadius: 5 },
  lg: { fontSize: 13, padding: '3px 9px', borderRadius: 6 },
};

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { size = 'md', className, style, children, ...rest },
  ref,
) {
  return (
    <kbd
      ref={ref}
      className={cn('bwo-kbd', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 3,
        fontFamily: 'var(--bwo-font-mono, ui-monospace, monospace)',
        fontWeight: 600,
        lineHeight: 1,
        color: 'var(--bwo-text)',
        background: 'var(--bwo-grey-4)',
        border: '1px solid var(--bwo-border)',
        borderBottomWidth: 2,
        textTransform: 'none',
        whiteSpace: 'nowrap',
        ...sizeStyles[size],
        ...style,
      }}
      {...rest}
    >
      {children}
    </kbd>
  );
});
