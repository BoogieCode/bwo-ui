'use client';

import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useId,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import { Portal } from './internal/portal';
import { Presence } from './internal/presence';
import { useControllable } from './internal/use-controllable';
import { useDismiss } from './internal/use-dismiss';
import { useFocusTrap } from './internal/use-focus-trap';
import { useScrollLock } from './internal/scroll-lock';
import { cn } from './utils';

export type SheetSide = 'top' | 'right' | 'bottom' | 'left';

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: MutableRefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement>;
  titleId: string;
  descriptionId: string;
}

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext(name: string): SheetContextValue {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error(`${name} must be rendered inside <SheetRoot>.`);
  return ctx;
}

export interface SheetRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function SheetRoot({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: SheetRootProps) {
  const [open = false, setOpen] = useControllable<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const value = useMemo<SheetContextValue>(
    () => ({ open, setOpen, triggerRef, contentRef, titleId, descriptionId }),
    [open, setOpen, titleId, descriptionId],
  );
  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
}

export interface SheetTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const SheetTrigger = forwardRef<HTMLButtonElement, SheetTriggerProps>(function SheetTrigger(
  { asChild, children, onClick, ...rest },
  ref,
) {
  const { open, setOpen, triggerRef } = useSheetContext('SheetTrigger');
  const setRef = (el: HTMLElement | null) => {
    triggerRef.current = el;
    if (typeof ref === 'function') ref(el as HTMLButtonElement);
    else if (ref)
      (ref as MutableRefObject<HTMLButtonElement | null>).current = el as HTMLButtonElement;
  };
  const handleClick = (event: React.MouseEvent) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setOpen(!open);
  };
  const shared = {
    'data-state': open ? ('open' as const) : ('closed' as const),
    onClick: handleClick,
    ref: setRef,
  };
  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<Record<string, unknown>>, shared);
  }
  return (
    <button type="button" {...rest} {...shared}>
      {children}
    </button>
  );
});

export interface SheetCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(function SheetClose(
  { asChild, children, onClick, ...rest },
  ref,
) {
  const { setOpen } = useSheetContext('SheetClose');
  const handleClick = (event: React.MouseEvent) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setOpen(false);
  };
  const shared = { onClick: handleClick, ref };
  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<Record<string, unknown>>, shared);
  }
  return (
    <button type="button" {...rest} {...shared}>
      {children}
    </button>
  );
});

export const SheetOverlay = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SheetOverlay({ className, ...props }, ref) {
    const { open } = useSheetContext('SheetOverlay');
    return (
      <div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        aria-hidden
        className={cn('bwo-sheet-overlay', className)}
        {...props}
      />
    );
  },
);

export interface SheetContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: SheetSide;
  showClose?: boolean;
}

export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(function SheetContent(
  { side = 'right', showClose = true, className, children, ...props },
  ref,
) {
  const { open, setOpen, contentRef, triggerRef, titleId, descriptionId } =
    useSheetContext('SheetContent');

  useDismiss({
    enabled: open,
    refs: [contentRef],
    onDismiss: () => setOpen(false),
  });
  useFocusTrap({
    enabled: open,
    containerRef: contentRef,
    returnFocusTo: triggerRef.current,
  });
  useScrollLock(open);

  const setRef = (el: HTMLDivElement | null) => {
    (contentRef as MutableRefObject<HTMLDivElement | null>).current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <Presence present={open}>
      {(state) => (
        <Portal>
          <div data-state={state} aria-hidden className="bwo-sheet-overlay" />
          <div
            ref={setRef}
            role="dialog"
            aria-modal
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            data-state={state}
            data-side={side}
            className={cn('bwo-sheet', `bwo-sheet--${side}`, className)}
            {...props}
          >
            {children}
            {showClose && (
              <SheetClose className="bwo-sheet-close" aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </SheetClose>
            )}
          </div>
        </Portal>
      )}
    </Presence>
  );
});

export const SheetTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function SheetTitle({ className, id, ...props }, ref) {
    const { titleId } = useSheetContext('SheetTitle');
    return (
      <h2
        ref={ref}
        id={id ?? titleId}
        className={cn('bwo-sheet-title', className)}
        {...props}
      />
    );
  },
);

export const SheetDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function SheetDescription({ className, id, ...props }, ref) {
  const { descriptionId } = useSheetContext('SheetDescription');
  return (
    <p ref={ref} id={id ?? descriptionId} className={cn('bwo-sheet-desc', className)} {...props} />
  );
});

export const SheetHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SheetHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn('bwo-sheet-header', className)} {...props} />;
  },
);

export const SheetFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function SheetFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn('bwo-sheet-footer', className)} {...props} />;
  },
);

export const Sheet = {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Close: SheetClose,
  Overlay: SheetOverlay,
  Content: SheetContent,
  Title: SheetTitle,
  Description: SheetDescription,
  Header: SheetHeader,
  Footer: SheetFooter,
};
