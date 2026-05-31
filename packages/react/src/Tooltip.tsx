'use client';

import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
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
  type Side,
} from './internal/floating';
import { Portal } from './internal/portal';
import { Presence } from './internal/presence';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

interface TooltipProviderContextValue {
  delayDuration: number;
}

const TooltipProviderContext = createContext<TooltipProviderContextValue>({
  delayDuration: 200,
});

export interface TooltipProviderProps {
  /** Delay before the tooltip opens (ms). Default: 200. */
  delayDuration?: number;
  children: ReactNode;
}

export function TooltipProvider({ delayDuration = 200, children }: TooltipProviderProps) {
  const value = useMemo(() => ({ delayDuration }), [delayDuration]);
  return (
    <TooltipProviderContext.Provider value={value}>{children}</TooltipProviderContext.Provider>
  );
}

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: MutableRefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement>;
  triggerId: string;
  contentId: string;
  show: () => void;
  hide: () => void;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

function useTooltipContext(name: string): TooltipContextValue {
  const ctx = useContext(TooltipContext);
  if (!ctx) throw new Error(`${name} must be rendered inside <TooltipRoot>.`);
  return ctx;
}

export interface TooltipRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  children: ReactNode;
}

export function TooltipRoot({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration,
  children,
}: TooltipRootProps) {
  const provider = useContext(TooltipProviderContext);
  const delay = delayDuration ?? provider.delayDuration;
  const [open = false, setOpen] = useControllable<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const contentId = useId();
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const show = useCallback(() => {
    clearTimer();
    timerRef.current = window.setTimeout(() => setOpen(true), delay);
  }, [clearTimer, delay, setOpen]);

  const hide = useCallback(() => {
    clearTimer();
    setOpen(false);
  }, [clearTimer, setOpen]);

  useEffect(() => clearTimer, [clearTimer]);

  const value = useMemo<TooltipContextValue>(
    () => ({ open, setOpen, triggerRef, contentRef, triggerId, contentId, show, hide }),
    [open, setOpen, triggerId, contentId, show, hide],
  );

  return <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>;
}

export interface TooltipTriggerProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(function TooltipTrigger(
  {
    asChild,
    children,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onPointerDown,
    ...rest
  },
  ref,
) {
  const { triggerRef, show, hide, open, contentId, triggerId } =
    useTooltipContext('TooltipTrigger');
  const setRef = (el: HTMLElement | null) => {
    triggerRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as MutableRefObject<HTMLElement | null>).current = el;
  };
  const shared = {
    id: triggerId,
    'aria-describedby': open ? contentId : undefined,
    onMouseEnter: (event: React.MouseEvent) => {
      onMouseEnter?.(event as React.MouseEvent<HTMLElement>);
      show();
    },
    onMouseLeave: (event: React.MouseEvent) => {
      onMouseLeave?.(event as React.MouseEvent<HTMLElement>);
      hide();
    },
    onFocus: (event: React.FocusEvent) => {
      onFocus?.(event as React.FocusEvent<HTMLElement>);
      show();
    },
    onBlur: (event: React.FocusEvent) => {
      onBlur?.(event as React.FocusEvent<HTMLElement>);
      hide();
    },
    onPointerDown: (event: React.PointerEvent) => {
      onPointerDown?.(event as React.PointerEvent<HTMLElement>);
      hide();
    },
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

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: Side;
  sideOffset?: number;
}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent({ className, children, side = 'top', sideOffset = 6, ...props }, ref) {
    const { open, triggerRef, contentRef, contentId, triggerId } =
      useTooltipContext('TooltipContent');
    const rect = useAnchorRect(triggerRef, open);
    const size = useFloatingSize(contentRef, open);
    const [pos, setPos] = useState<{ top: number; left: number; side: Side } | null>(null);

    useEffect(() => {
      if (!open || !rect || size.width === 0) return;
      const p = computeFloating(rect, size, { side, align: 'center', sideOffset });
      setPos({ top: p.top, left: p.left, side: p.side });
    }, [open, rect, size, side, sideOffset]);

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
              role="tooltip"
              id={contentId}
              aria-labelledby={triggerId}
              data-state={state}
              data-side={pos?.side ?? side}
              style={{
                position: 'fixed',
                top: pos?.top ?? -9999,
                left: pos?.left ?? -9999,
                visibility: pos ? 'visible' : 'hidden',
              }}
              className={cn('bwo-tooltip', className)}
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

/**
 * Shorthand — wrap an element to give it a tooltip.
 *
 * ```tsx
 * <Tooltip content="Save to clipboard">
 *   <IconButton aria-label="Copy"><CopyIcon /></IconButton>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  content,
  children,
  delayDuration = 200,
  side,
}: {
  content: ReactNode;
  children: ReactNode;
  delayDuration?: number;
  side?: Side;
}) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}
