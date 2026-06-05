'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Page title (rendered as an <h1>). */
  title: ReactNode;
  /** Small uppercase label above the title. */
  eyebrow?: ReactNode;
  /** Supporting line below the title. */
  subtitle?: ReactNode;
  /** Breadcrumb row above the title — typically a <Breadcrumb>…</Breadcrumb>. */
  breadcrumb?: ReactNode;
  /** Right-aligned actions (buttons, menus). */
  actions?: ReactNode;
  /** Leading slot before the title block (e.g. a SidebarTrigger or back button). */
  leading?: ReactNode;
}

/**
 * Standard page header for app/admin screens: optional breadcrumb, an eyebrow +
 * title + subtitle block, and a right-aligned actions slot. Composes cleanly
 * with bwo-ui Breadcrumb and Button.
 */
export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { title, eyebrow, subtitle, breadcrumb, actions, leading, className, children, ...props },
  ref,
) {
  return (
    <header ref={ref} className={cn('bwo-page-header', className)} {...props}>
      {breadcrumb != null && <div className="bwo-page-header-crumb">{breadcrumb}</div>}
      <div className="bwo-page-header-row">
        {leading != null && <div className="bwo-page-header-leading">{leading}</div>}
        <div className="bwo-page-header-titles">
          {eyebrow != null && <div className="bwo-page-header-eyebrow">{eyebrow}</div>}
          <h1 className="bwo-page-header-title">{title}</h1>
          {subtitle != null && <p className="bwo-page-header-subtitle">{subtitle}</p>}
        </div>
        {actions != null && <div className="bwo-page-header-actions">{actions}</div>}
      </div>
      {children}
    </header>
  );
});
