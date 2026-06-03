'use client';

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Portal } from './Portal';
import { cn } from './utils';

export type HoverCardSide = 'top' | 'bottom' | 'left' | 'right';

export interface HoverCardProps extends HTMLAttributes<HTMLDivElement> {
  /** The trigger element. */
  trigger: ReactElement;
  /** Card content. */
  children: ReactNode;
  /** Side to anchor the card on. Default: `'bottom'`. */
  side?: HoverCardSide;
  /** Distance from the trigger in pixels. Default: `10`. */
  offset?: number;
  /** Hover-in delay in ms. Default: `200`. */
  openDelay?: number;
  /** Hover-out delay in ms. Default: `150`. */
  closeDelay?: number;
  /** Hard width in pixels. Default: `280`. */
  width?: number;
}

export function HoverCard({
  trigger,
  children,
  side = 'bottom',
  offset = 10,
  openDelay = 200,
  closeDelay = 150,
  width = 280,
  className,
  style,
  ...rest
}: HoverCardProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<CSSProperties>({});
  const triggerRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const computePosition = useCallback(() => {
    const t = triggerRef.current;
    if (!t) return;
    const r = t.getBoundingClientRect();
    const top = window.scrollY;
    const left = window.scrollX;
    let s: CSSProperties = { position: 'absolute', width };
    switch (side) {
      case 'top':
        s = { ...s, top: top + r.top - offset, left: left + r.left + r.width / 2, transform: 'translate(-50%, -100%)' };
        break;
      case 'bottom':
        s = { ...s, top: top + r.bottom + offset, left: left + r.left + r.width / 2, transform: 'translate(-50%, 0)' };
        break;
      case 'left':
        s = { ...s, top: top + r.top + r.height / 2, left: left + r.left - offset, transform: 'translate(-100%, -50%)' };
        break;
      case 'right':
        s = { ...s, top: top + r.top + r.height / 2, left: left + r.right + offset, transform: 'translate(0, -50%)' };
        break;
    }
    setPos(s);
  }, [side, offset, width]);

  const scheduleOpen = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    openTimerRef.current = window.setTimeout(() => {
      computePosition();
      setOpen(true);
    }, openDelay);
  }, [computePosition, openDelay]);

  const scheduleClose = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    closeTimerRef.current = window.setTimeout(() => setOpen(false), closeDelay);
  }, [closeDelay]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => computePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [open, computePosition]);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const triggerProps = {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      const childRef = (trigger as ReactElement & { ref?: unknown }).ref;
      if (typeof childRef === 'function') (childRef as (n: HTMLElement | null) => void)(node);
    },
    onMouseEnter: scheduleOpen,
    onMouseLeave: scheduleClose,
    onFocus: scheduleOpen,
    onBlur: scheduleClose,
    'aria-describedby': open ? id : undefined,
  } as Record<string, unknown>;

  const triggerNode = isValidElement(trigger)
    ? cloneElement(trigger, triggerProps)
    : trigger;

  return (
    <>
      {triggerNode}
      {open && (
        <Portal>
          <div
            ref={cardRef}
            id={id}
            role="tooltip"
            onMouseEnter={() => {
              if (closeTimerRef.current) {
                window.clearTimeout(closeTimerRef.current);
                closeTimerRef.current = null;
              }
            }}
            onMouseLeave={scheduleClose}
            className={cn('bwo-hover-card', className)}
            style={{
              ...pos,
              zIndex: 60,
              background: 'var(--bwo-surface)',
              border: '1px solid var(--bwo-border)',
              borderRadius: 'var(--bwo-radius-md)',
              boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
              padding: 16,
              fontSize: 13.5,
              color: 'var(--bwo-text)',
              animation: 'bwo-hovercard-in 0.16s ease',
              ...style,
            }}
            {...rest}
          >
            {children}
            <style>{`
              @keyframes bwo-hovercard-in {
                from { opacity: 0; transform: translate(var(--bwo-x, 0), var(--bwo-y, 4px)); }
              }
            `}</style>
          </div>
        </Portal>
      )}
    </>
  );
}
