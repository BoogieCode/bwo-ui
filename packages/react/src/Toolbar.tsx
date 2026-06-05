'use client';

import { forwardRef, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

/**
 * Horizontal control strip for list/table screens: search, filters and actions.
 * A flex container that wraps on small screens. Compose with Input / Select /
 * SegmentedControl / Button, and use ToolbarSpacer to push trailing actions
 * right. ToolbarSelection renders the contextual bulk-action bar.
 */
export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} role="toolbar" className={cn('bwo-toolbar', className)} {...props}>
      {children}
    </div>
  );
});

export interface ToolbarGroupProps extends HTMLAttributes<HTMLDivElement> {}
export const ToolbarGroup = forwardRef<HTMLDivElement, ToolbarGroupProps>(function ToolbarGroup(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn('bwo-toolbar-group', className)} {...props} />;
});

/** Flexible gap that pushes everything after it to the trailing edge. */
export interface ToolbarSpacerProps extends HTMLAttributes<HTMLDivElement> {}
export const ToolbarSpacer = forwardRef<HTMLDivElement, ToolbarSpacerProps>(function ToolbarSpacer(
  { className, ...props },
  ref,
) {
  return <div ref={ref} aria-hidden className={cn('bwo-toolbar-spacer', className)} {...props} />;
});

export interface ToolbarSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Override the leading icon. */
  icon?: ReactNode;
}

export const ToolbarSearch = forwardRef<HTMLInputElement, ToolbarSearchProps>(function ToolbarSearch(
  { className, icon, type = 'search', placeholder = 'Search…', ...props },
  ref,
) {
  return (
    <div className={cn('bwo-toolbar-search', className)}>
      <span className="bwo-toolbar-search-icon" aria-hidden>
        {icon ?? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className="bwo-input bwo-toolbar-search-input"
        {...props}
      />
    </div>
  );
});

export interface ToolbarSelectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of selected rows. When 0, nothing renders. */
  count: number;
  /** Bulk action buttons. */
  actions?: ReactNode;
  /** Override the "{n} selected" label. */
  label?: ReactNode;
}

/**
 * Contextual bulk-action bar. Render it inside (or just below) a Toolbar; it
 * appears only while `count > 0`.
 */
export const ToolbarSelection = forwardRef<HTMLDivElement, ToolbarSelectionProps>(
  function ToolbarSelection({ count, actions, label, className, children, ...props }, ref) {
    if (count <= 0) return null;
    return (
      <div ref={ref} className={cn('bwo-toolbar-selection', className)} {...props}>
        <span className="bwo-toolbar-selection-count">{label ?? `${count} selected`}</span>
        {actions}
        {children}
      </div>
    );
  },
);
