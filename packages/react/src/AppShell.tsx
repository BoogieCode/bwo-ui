'use client';

import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Slot rendered at the top of the shell. Typically a brand row + actions. */
  header?: ReactNode;
  /** Slot rendered at the bottom. Optional. */
  footer?: ReactNode;
  /** Constrain the shell width. Defaults to the CSS variable `--bwo-app-shell-max` (900px). */
  maxWidth?: number | string;
  /** Adds an id to the scrollable content container (handy for `scrollIntoView`). */
  contentId?: string;
}

/**
 * Three-row vertical frame: header (fixed) + scrollable content + footer
 * (fixed). Mirrors the boogie-next `container-shell` pattern but ships as a
 * reusable bwo-ui primitive.
 */
export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(function AppShell(
  { header, footer, maxWidth, contentId, className, children, style, ...props },
  ref,
) {
  const maxWidthCss = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  return (
    <div
      ref={ref}
      className={cn('bwo-app-shell', className)}
      style={
        maxWidthCss
          ? { ['--bwo-app-shell-max' as never]: maxWidthCss, ...style }
          : style
      }
      {...props}
    >
      {header && <header className="bwo-app-shell-header">{header}</header>}
      <div className="bwo-app-shell-content" id={contentId}>
        {children}
      </div>
      {footer && <footer className="bwo-app-shell-footer">{footer}</footer>}
    </div>
  );
});

export interface BrandMarkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Main wordmark, e.g. "BOOGIE". */
  brand: ReactNode;
  /** Optional accent slot inside the wordmark (rendered in `--bwo-accent`). */
  accent?: ReactNode;
  /** Trailing TLD-style suffix, e.g. ".RO". Rendered smaller and muted. */
  tld?: ReactNode;
}

/**
 * Logo wordmark for use inside `<AppShell header>`. Composes a primary
 * wordmark, an optional accent fragment, and an optional ".tld" suffix.
 */
export const BrandMark = forwardRef<HTMLAnchorElement, BrandMarkProps>(function BrandMark(
  { brand, accent, tld, className, ...props },
  ref,
) {
  return (
    <a ref={ref} className={cn('bwo-brandmark', className)} {...props}>
      <span>{brand}</span>
      {accent && <span className="bwo-brandmark-accent">{accent}</span>}
      {tld && <span className="bwo-brandmark-tld">{tld}</span>}
    </a>
  );
});
