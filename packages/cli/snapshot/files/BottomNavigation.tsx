'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type BottomNavigationVariant = 'labeled' | 'icons-only' | 'selected-label';

interface BottomNavigationContextValue {
  value: string | null;
  onValueChange?: (value: string) => void;
  variant: BottomNavigationVariant;
}

const BottomNavigationContext = createContext<BottomNavigationContextValue | null>(null);

export interface BottomNavigationProps extends HTMLAttributes<HTMLElement> {
  /** Active item value. */
  value?: string | null;
  /** Called when an item is clicked. */
  onValueChange?: (value: string) => void;
  /**
   * Label rendering:
   *  - `'labeled'` — always show labels (default)
   *  - `'icons-only'` — never show labels
   *  - `'selected-label'` — show label only on the active item
   */
  variant?: BottomNavigationVariant;
  /** Renders fixed to the bottom edge of the viewport. */
  fixed?: boolean;
  /** Accessible label for the nav element. */
  label?: string;
}

export const BottomNavigation = forwardRef<HTMLElement, BottomNavigationProps>(
  function BottomNavigation(
    {
      value = null,
      onValueChange,
      variant = 'labeled',
      fixed,
      label = 'Bottom navigation',
      className,
      children,
      ...props
    },
    ref,
  ) {
    const ctx = useMemo<BottomNavigationContextValue>(
      () => ({ value, onValueChange, variant }),
      [value, onValueChange, variant],
    );
    return (
      <BottomNavigationContext.Provider value={ctx}>
        <nav
          ref={ref}
          aria-label={label}
          data-variant={variant}
          className={cn(
            'bwo-bottomnav',
            `bwo-bottomnav--${variant}`,
            fixed && 'bwo-bottomnav--fixed',
            className,
          )}
          {...props}
        >
          {children}
        </nav>
      </BottomNavigationContext.Provider>
    );
  },
);

export interface BottomNavigationItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /** Unique identifier — matches the parent's `value` prop. */
  value: string;
  /** Icon element rendered above the label. */
  icon: ReactNode;
  /** Label text. */
  label?: ReactNode;
  /** Optional notification badge content (number or short string). */
  badge?: ReactNode;
}

export const BottomNavigationItem = forwardRef<HTMLButtonElement, BottomNavigationItemProps>(
  function BottomNavigationItem(
    { value, icon, label, badge, className, onClick, ...props },
    ref,
  ) {
    const ctx = useContext(BottomNavigationContext);
    if (!ctx) {
      throw new Error('BottomNavigationItem must be rendered inside <BottomNavigation>.');
    }
    const active = ctx.value === value;
    const showLabel =
      ctx.variant === 'labeled' ||
      (ctx.variant === 'selected-label' && active);
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={active}
        data-active={active || undefined}
        className={cn('bwo-bottomnav-item', active && 'bwo-bottomnav-item--active', className)}
        onClick={(e) => {
          onClick?.(e);
          ctx.onValueChange?.(value);
        }}
        {...props}
      >
        <span className="bwo-bottomnav-item-icon">
          {icon}
          {badge !== undefined && badge !== null && badge !== false && (
            <span className="bwo-bottomnav-item-badge">{badge}</span>
          )}
        </span>
        {showLabel && label && <span className="bwo-bottomnav-item-label">{label}</span>}
      </button>
    );
  },
);
