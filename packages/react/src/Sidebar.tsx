'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cn } from './utils';

/* ─── Context ──────────────────────────────────────────────────────────────
   SidebarLayout owns two pieces of state: `collapsed` (desktop icon-rail) and
   `mobileOpen` (off-canvas drawer under the responsive breakpoint). Children
   (Sidebar, SidebarTrigger, SidebarNavItem) read it via useSidebar(). A no-op
   default lets the pieces render standalone (e.g. in a component showcase)
   without a surrounding SidebarLayout. */

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const noop = () => {};
const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: noop,
  toggleCollapsed: noop,
  mobileOpen: false,
  setMobileOpen: noop,
});

export function useSidebar(): SidebarContextValue {
  return useContext(SidebarContext);
}

/* ─── Layout ───────────────────────────────────────────────────────────────
   Two-column frame: a fixed sidebar column + a scrollable main column. Sibling
   to AppShell (which is a vertical header/content/footer frame). Under
   ~960px the sidebar becomes an off-canvas drawer toggled by SidebarTrigger. */

export interface SidebarLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** The sidebar content — typically a <Sidebar>…</Sidebar>. */
  sidebar: ReactNode;
  /** Controlled collapsed state (desktop icon-rail). */
  collapsed?: boolean;
  /** Initial collapsed state when uncontrolled. Default `false`. */
  defaultCollapsed?: boolean;
  /** Fires whenever the collapsed state changes. */
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const SidebarLayout = forwardRef<HTMLDivElement, SidebarLayoutProps>(function SidebarLayout(
  { sidebar, collapsed: controlled, defaultCollapsed = false, onCollapsedChange, className, children, ...props },
  ref,
) {
  const [internal, setInternal] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const collapsed = controlled ?? internal;

  const setCollapsed = (v: boolean) => {
    if (controlled === undefined) setInternal(v);
    onCollapsedChange?.(v);
  };

  const ctx: SidebarContextValue = {
    collapsed,
    setCollapsed,
    toggleCollapsed: () => setCollapsed(!collapsed),
    mobileOpen,
    setMobileOpen,
  };

  return (
    <SidebarContext.Provider value={ctx}>
      <div
        ref={ref}
        className={cn('bwo-sidebar-layout', className)}
        data-collapsed={collapsed ? '' : undefined}
        data-mobile-open={mobileOpen ? '' : undefined}
        {...props}
      >
        <aside className="bwo-sidebar-aside">{sidebar}</aside>
        <button
          type="button"
          className="bwo-sidebar-scrim"
          aria-hidden
          tabIndex={-1}
          onClick={() => setMobileOpen(false)}
        />
        <div className="bwo-sidebar-main">{children}</div>
      </div>
    </SidebarContext.Provider>
  );
});

/* ─── Sidebar shell + slots ───────────────────────────────────────────────── */

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(function Sidebar(
  { className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('bwo-sidebar', className)} {...props}>
      {children}
    </div>
  );
});

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(function SidebarHeader(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn('bwo-sidebar-header', className)} {...props} />;
});

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {}
export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(function SidebarFooter(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn('bwo-sidebar-footer', className)} {...props} />;
});

export interface SidebarNavProps extends HTMLAttributes<HTMLElement> {}
export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(function SidebarNav(
  { className, children, ...props },
  ref,
) {
  return (
    <nav ref={ref} className={cn('bwo-sidebar-nav', className)} {...props}>
      {children}
    </nav>
  );
});

export interface SidebarNavSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Uppercase group label (e.g. "Workspace"). Hidden when the rail collapses. */
  label?: ReactNode;
}
export const SidebarNavSection = forwardRef<HTMLDivElement, SidebarNavSectionProps>(
  function SidebarNavSection({ className, label, children, ...props }, ref) {
    return (
      <div ref={ref} className={cn('bwo-sidebar-section', className)} {...props}>
        {label != null && <div className="bwo-sidebar-section-label">{label}</div>}
        {children}
      </div>
    );
  },
);

/* ─── Nav item ─────────────────────────────────────────────────────────────
   Router-agnostic: defaults to a plain <a href>. To use a framework link
   (e.g. next/link) pass `render`, which receives the resolved className +
   data attributes + the inner content as children:

     <SidebarNavItem
       label="Users" icon={…} active={pathname === '/a/users'}
       render={(p) => <Link href="/a/users" {...p} />}
     /> */

export interface SidebarNavItemRenderProps {
  className: string;
  children: ReactNode;
  'data-active'?: string;
  'aria-current'?: 'page';
  title?: string;
  onClick?: (e: MouseEvent) => void;
}

export interface SidebarNavItemProps {
  icon?: ReactNode;
  label: ReactNode;
  /** Secondary line under the label. Hidden when the rail collapses. */
  description?: ReactNode;
  /** Caller-supplied active state (compute from your router). */
  active?: boolean;
  /** Trailing badge, e.g. an unread count. */
  badge?: ReactNode;
  disabled?: boolean;
  /** Default anchor target when `render` is not supplied. */
  href?: string;
  /** Render the item as a custom element (framework link). */
  render?: (props: SidebarNavItemRenderProps) => ReactNode;
  onClick?: (e: MouseEvent) => void;
  /** Hover tooltip text (falls back to `label` when it is a string). */
  title?: string;
  className?: string;
}

export function SidebarNavItem({
  icon,
  label,
  description,
  active,
  badge,
  disabled,
  href,
  render,
  onClick,
  title,
  className,
}: SidebarNavItemProps) {
  const { setMobileOpen } = useSidebar();

  const content = (
    <>
      {icon != null && (
        <span className="bwo-sidebar-item-icon" aria-hidden>
          {icon}
        </span>
      )}
      <span className="bwo-sidebar-item-meta">
        <span className="bwo-sidebar-item-label">{label}</span>
        {description != null && <span className="bwo-sidebar-item-desc">{description}</span>}
      </span>
      {badge != null && <span className="bwo-sidebar-item-badge">{badge}</span>}
    </>
  );

  const handleClick = (e: MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    // Close the mobile drawer when a destination is chosen.
    setMobileOpen(false);
    onClick?.(e);
  };

  const resolvedTitle = title ?? (typeof label === 'string' ? label : undefined);
  const cls = cn('bwo-sidebar-item', className);

  if (disabled) {
    return (
      <span className={cls} data-active={active ? '' : undefined} data-disabled="" title={resolvedTitle}>
        {content}
      </span>
    );
  }

  if (render) {
    return render({
      className: cls,
      children: content,
      'data-active': active ? '' : undefined,
      'aria-current': active ? 'page' : undefined,
      title: resolvedTitle,
      onClick: handleClick,
    });
  }

  return (
    <a
      href={href}
      className={cls}
      data-active={active ? '' : undefined}
      aria-current={active ? 'page' : undefined}
      title={resolvedTitle}
      onClick={handleClick}
    >
      {content}
    </a>
  );
}

/* ─── Triggers ─────────────────────────────────────────────────────────────
   SidebarTrigger toggles the mobile drawer (place it in the main column /
   page header). SidebarCollapseToggle toggles the desktop icon-rail. */

export interface SidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const SidebarTrigger = forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  function SidebarTrigger({ className, onClick, children, ...props }, ref) {
    const { mobileOpen, setMobileOpen } = useSidebar();
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={mobileOpen}
        className={cn('bwo-sidebar-trigger', className)}
        onClick={(e) => {
          setMobileOpen(!mobileOpen);
          onClick?.(e);
        }}
        {...props}
      >
        {children ?? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>
    );
  },
);

export interface SidebarCollapseToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const SidebarCollapseToggle = forwardRef<HTMLButtonElement, SidebarCollapseToggleProps>(
  function SidebarCollapseToggle({ className, onClick, children, ...props }, ref) {
    const { collapsed, toggleCollapsed } = useSidebar();
    return (
      <button
        ref={ref}
        type="button"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn('bwo-sidebar-collapse', className)}
        onClick={(e) => {
          toggleCollapsed();
          onClick?.(e);
        }}
        {...props}
      >
        {children ?? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    );
  },
);
