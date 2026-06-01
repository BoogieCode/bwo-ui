'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import {
  computeFloating,
  useAnchorRect,
  useFloatingSize,
  type AnchorRect,
  type Align,
  type Side,
} from './floating';

interface MenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  anchorRef: MutableRefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement>;
  contentEl: HTMLDivElement | null;
  setContentEl: (el: HTMLDivElement | null) => void;
  manualRect: AnchorRect | null;
  triggerId: string;
  contentId: string;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenuContext(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('Menu sub-components must be rendered inside a Menu root.');
  return ctx;
}

const ITEM_SELECTOR = '[role="menuitem"]:not([data-disabled])';

function getItems(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(ITEM_SELECTOR));
}

function focusItemAt(container: HTMLElement | null, index: number): void {
  const items = getItems(container);
  if (items.length === 0) return;
  const i = ((index % items.length) + items.length) % items.length;
  items[i]?.focus();
}

export interface MenuRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  manualRect?: AnchorRect | null;
  children: ReactNode;
}

export function MenuRoot({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  manualRect = null,
  children,
}: MenuRootProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolled;
  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const anchorRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null);
  const triggerId = useId();
  const contentId = useId();

  const value = useMemo<MenuContextValue>(
    () => ({
      open,
      setOpen,
      anchorRef,
      contentRef,
      contentEl,
      setContentEl,
      manualRect,
      triggerId,
      contentId,
    }),
    [open, setOpen, contentEl, manualRect, triggerId, contentId],
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export interface MenuContentProps {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  className?: string;
  /** When true, focuses the first item on open. Default: true. */
  autoFocus?: boolean;
  children: ReactNode;
}

export function MenuContent({
  side = 'bottom',
  align = 'start',
  sideOffset = 6,
  alignOffset = 0,
  className,
  autoFocus = true,
  children,
}: MenuContentProps) {
  const { open, setOpen, anchorRef, contentRef, contentEl, setContentEl, manualRect, triggerId, contentId } =
    useMenuContext();
  const rect = useAnchorRect(anchorRef.current, open, manualRect);
  const size = useFloatingSize(contentEl, open);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!open || !rect || size.width === 0) return;
    const p = computeFloating(rect, size, { side, align, sideOffset, alignOffset });
    setPos({ top: p.top, left: p.left });
  }, [open, rect, size, side, align, sideOffset, alignOffset]);

  useEffect(() => {
    if (!open) return;
    if (autoFocus) {
      const id = requestAnimationFrame(() => focusItemAt(contentRef.current, 0));
      return () => cancelAnimationFrame(id);
    }
  }, [open, autoFocus, contentRef]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (contentRef.current?.contains(target)) return;
      if (anchorRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        anchorRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, setOpen, anchorRef, contentRef]);

  if (!open || typeof document === 'undefined') return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = getItems(contentRef.current);
    if (items.length === 0) return;
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItemAt(contentRef.current, currentIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItemAt(contentRef.current, currentIndex - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusItemAt(contentRef.current, 0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusItemAt(contentRef.current, items.length - 1);
    }
  };

  const setRef = (el: HTMLDivElement | null) => {
    (contentRef as MutableRefObject<HTMLDivElement | null>).current = el;
    setContentEl(el);
  };

  const content = (
    <div
      ref={setRef}
      role="menu"
      id={contentId}
      aria-labelledby={triggerId}
      tabIndex={-1}
      data-state="open"
      data-side={side}
      style={{
        position: 'fixed',
        top: pos?.top ?? -9999,
        left: pos?.left ?? -9999,
        visibility: pos ? 'visible' : 'hidden',
      }}
      className={['bwo-menu', className].filter(Boolean).join(' ')}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
  return createPortal(content, document.body);
}

export interface MenuItemProps {
  disabled?: boolean;
  onSelect?: (event: React.MouseEvent | React.KeyboardEvent) => void;
  className?: string;
  children: ReactNode;
}

export function MenuItem({ disabled, onSelect, className, children }: MenuItemProps) {
  const { setOpen } = useMenuContext();
  const select = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (disabled) return;
    onSelect?.(e);
    setOpen(false);
  };
  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      data-disabled={disabled || undefined}
      className={['bwo-menu-item', className].filter(Boolean).join(' ')}
      onClick={select}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          select(e);
        }
      }}
    >
      {children}
    </div>
  );
}

export interface MenuSeparatorProps {
  className?: string;
}

export function MenuSeparator({ className }: MenuSeparatorProps) {
  return (
    <div
      role="separator"
      className={['bwo-menu-separator', className].filter(Boolean).join(' ')}
    />
  );
}

export interface MenuLabelProps {
  className?: string;
  children: ReactNode;
}

export function MenuLabel({ className, children }: MenuLabelProps) {
  return (
    <div className={['bwo-menu-label', className].filter(Boolean).join(' ')}>{children}</div>
  );
}
