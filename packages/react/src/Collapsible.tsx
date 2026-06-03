'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  /** Trigger element — usually a label or button row. */
  trigger: ReactNode;
  /** Default open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Fires when open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Transition duration in ms. Default: `220`. */
  duration?: number;
  /** Children = collapsed content. */
  children: ReactNode;
  /** Override the trigger button's class. */
  triggerClassName?: string;
}

export const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(function Collapsible(
  {
    trigger,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    duration = 220,
    children,
    className,
    style,
    triggerClassName,
    ...rest
  },
  ref,
) {
  const id = useId();
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? !!controlledOpen : uncontrolledOpen;

  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(open ? undefined : 0);

  const toggle = useCallback(() => {
    const next = !open;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }, [open, isControlled, onOpenChange]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (open) {
      setMaxHeight(el.scrollHeight);
      const t = window.setTimeout(() => setMaxHeight(undefined), duration);
      return () => window.clearTimeout(t);
    } else {
      setMaxHeight(el.scrollHeight);
      requestAnimationFrame(() => setMaxHeight(0));
    }
  }, [open, duration]);

  return (
    <div ref={ref} className={cn('bwo-collapsible', className)} style={style} {...rest}>
      <button
        type="button"
        className={cn('bwo-collapsible-trigger', triggerClassName)}
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '10px 0',
          background: 'transparent',
          border: 0,
          cursor: 'pointer',
          fontFamily: 'inherit',
          color: 'inherit',
          textAlign: 'left',
        }}
      >
        {trigger}
        <CollapsibleChevron open={open} />
      </button>
      <div
        id={id}
        ref={contentRef}
        className="bwo-collapsible-content"
        style={{
          maxHeight: maxHeight === undefined ? 'none' : `${maxHeight}px`,
          overflow: 'hidden',
          transition: `max-height ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        <div style={{ paddingBottom: 10 }}>{children}</div>
      </div>
    </div>
  );
});

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function CollapsibleChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{
        transition: 'transform 0.2s ease',
        transform: open ? 'rotate(180deg)' : 'none',
        color: 'var(--bwo-text-body)',
        flex: '0 0 14px',
      }}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
