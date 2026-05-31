'use client';

import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import {
  computeFloating,
  useAnchorRect,
  useFloatingSize,
  type Align,
  type Side,
} from './internal/floating';
import { Portal } from './internal/portal';
import { Presence } from './internal/presence';
import { useControllable } from './internal/use-controllable';
import { useDismiss } from './internal/use-dismiss';
import { cn } from './utils';

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: MutableRefObject<HTMLElement | null>;
  anchorRef: MutableRefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement>;
  triggerId: string;
  contentId: string;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(name: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error(`${name} must be rendered inside <PopoverRoot>.`);
  return ctx;
}

export interface PopoverRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function PopoverRoot({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverRootProps) {
  const [open = false, setOpen] = useControllable<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = useRef<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const contentId = useId();

  const value = useMemo<PopoverContextValue>(
    () => ({ open, setOpen, triggerRef, anchorRef, contentRef, triggerId, contentId }),
    [open, setOpen, triggerId, contentId],
  );

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
}

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger({ asChild, children, onClick, ...rest }, ref) {
    const { open, setOpen, triggerRef, anchorRef, triggerId, contentId } =
      usePopoverContext('PopoverTrigger');
    const setRef = (el: HTMLElement | null) => {
      triggerRef.current = el;
      if (!anchorRef.current) anchorRef.current = el;
      if (typeof ref === 'function') ref(el as HTMLButtonElement);
      else if (ref)
        (ref as MutableRefObject<HTMLButtonElement | null>).current = el as HTMLButtonElement;
    };
    const handleClick = (event: React.MouseEvent) => {
      onClick?.(event as React.MouseEvent<HTMLButtonElement>);
      if (!event.defaultPrevented) setOpen(!open);
    };
    const shared = {
      id: triggerId,
      'aria-haspopup': 'dialog' as const,
      'aria-expanded': open,
      'aria-controls': open ? contentId : undefined,
      'data-state': open ? 'open' : ('closed' as 'open' | 'closed'),
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
  },
);

export interface PopoverAnchorProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>(function PopoverAnchor(
  { asChild, children, ...rest },
  ref,
) {
  const { anchorRef } = usePopoverContext('PopoverAnchor');
  const setRef = (el: HTMLDivElement | null) => {
    anchorRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = el;
  };
  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<Record<string, unknown>>, { ref: setRef });
  }
  return (
    <div ref={setRef} {...rest}>
      {children}
    </div>
  );
});

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    { className, children, side = 'bottom', align = 'center', sideOffset = 6, alignOffset = 0, ...props },
    ref,
  ) {
    const { open, setOpen, anchorRef, contentRef, triggerRef, triggerId, contentId } =
      usePopoverContext('PopoverContent');
    const rect = useAnchorRect(anchorRef, open);
    const size = useFloatingSize(contentRef, open);
    const [pos, setPos] = useState<{ top: number; left: number; side: Side } | null>(null);

    useEffect(() => {
      if (!open || !rect || size.width === 0) return;
      const p = computeFloating(rect, size, { side, align, sideOffset, alignOffset });
      setPos({ top: p.top, left: p.left, side: p.side });
    }, [open, rect, size, side, align, sideOffset, alignOffset]);

    useDismiss({
      enabled: open,
      refs: [contentRef, triggerRef],
      onDismiss: () => setOpen(false),
    });

    const setRef = (el: HTMLDivElement | null) => {
      (contentRef as MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = el;
    };

    return (
      <Presence present={open}>
        {(state) => (
          <Portal>
            <div
              ref={setRef}
              role="dialog"
              id={contentId}
              aria-labelledby={triggerId}
              tabIndex={-1}
              data-state={state}
              data-side={pos?.side ?? side}
              style={{
                position: 'fixed',
                top: pos?.top ?? -9999,
                left: pos?.left ?? -9999,
                visibility: pos ? 'visible' : 'hidden',
              }}
              className={cn('bwo-popover', className)}
              {...props}
            >
              {children}
            </div>
          </Portal>
        )}
      </Presence>
    );
  },
);

export interface PopoverCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(function PopoverClose(
  { asChild, children, onClick, ...rest },
  ref,
) {
  const { setOpen } = usePopoverContext('PopoverClose');
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

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Anchor: PopoverAnchor,
  Content: PopoverContent,
  Close: PopoverClose,
};
