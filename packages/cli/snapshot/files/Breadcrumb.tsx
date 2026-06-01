'use client';

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Custom separator node between items. Default: a chevron. */
  separator?: ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { className, children, separator, ...props },
  ref,
) {
  return (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={cn('bwo-breadcrumb', className)}
      data-separator={separator ? 'custom' : undefined}
      {...props}
    >
      {separator !== undefined && (
        <span hidden aria-hidden data-bwo-breadcrumb-separator>
          {separator}
        </span>
      )}
      <ol className="bwo-breadcrumb-list">{children}</ol>
    </nav>
  );
});

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Marks this item as the current page (renders without link styling). */
  current?: boolean;
}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  function BreadcrumbItem({ className, current, children, ...props }, ref) {
    return (
      <li
        ref={ref}
        className={cn('bwo-breadcrumb-item', className)}
        aria-current={current ? 'page' : undefined}
        {...props}
      >
        {children}
      </li>
    );
  },
);

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  function BreadcrumbLink({ className, ...props }, ref) {
    return <a ref={ref} className={cn('bwo-breadcrumb-link', className)} {...props} />;
  },
);

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLLIElement> {}

export const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
  function BreadcrumbSeparator({ className, children, ...props }, ref) {
    return (
      <li
        ref={ref}
        role="presentation"
        aria-hidden
        className={cn('bwo-breadcrumb-sep', className)}
        {...props}
      >
        {children ?? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </li>
    );
  },
);
