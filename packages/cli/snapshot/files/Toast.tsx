'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Portal } from './internal/portal';
import { Presence } from './internal/presence';
import { useControllable } from './internal/use-controllable';
import { cn } from './utils';

/* ─── Provider — shared default duration ──────────────────────────────── */

interface ToastProviderContextValue {
  duration: number;
}

const ToastProviderContext = createContext<ToastProviderContextValue>({ duration: 5000 });

export interface ToastProviderProps {
  /** Default auto-dismiss duration (ms). Default: 5000. Use 0 or Infinity for sticky. */
  duration?: number;
  children: ReactNode;
}

export function ToastProvider({ duration = 5000, children }: ToastProviderProps) {
  const value = useMemo(() => ({ duration }), [duration]);
  return (
    <ToastProviderContext.Provider value={value}>{children}</ToastProviderContext.Provider>
  );
}

/* ─── Viewport — portal target ────────────────────────────────────────── */

const ToastViewportContext = createContext<HTMLOListElement | null>(null);

export interface ToastViewportProps extends HTMLAttributes<HTMLOListElement> {
  /** Accessible label. Default: 'Notifications'. */
  label?: string;
}

export const ToastViewport = forwardRef<HTMLOListElement, ToastViewportProps>(
  function ToastViewport({ className, label = 'Notifications', ...props }, ref) {
    const [el, setEl] = useState<HTMLOListElement | null>(null);
    const setRef = (node: HTMLOListElement | null) => {
      setEl(node);
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLOListElement | null>).current = node;
    };
    return (
      <ToastViewportContext.Provider value={el}>
        <ol
          ref={setRef}
          aria-label={label}
          tabIndex={-1}
          data-bwo-floating=""
          className={cn('bwo-toast-viewport', className)}
          {...props}
        />
      </ToastViewportContext.Provider>
    );
  },
);

/* ─── Toast.Root — one toast, controlled or auto-dismiss ──────────────── */

interface ToastContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function useToastContext(name: string): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error(`${name} must be rendered inside <ToastRoot>.`);
  return ctx;
}

export interface ToastRootProps extends HTMLAttributes<HTMLLIElement> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Auto-dismiss after this many ms. Default: from ToastProvider. */
  duration?: number;
}

export const ToastRoot = forwardRef<HTMLLIElement, ToastRootProps>(function ToastRoot(
  {
    open: controlledOpen,
    defaultOpen = true,
    onOpenChange,
    duration,
    className,
    children,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...props
  },
  ref,
) {
  const provider = useContext(ToastProviderContext);
  const effectiveDuration = duration ?? provider.duration;
  const viewport = useContext(ToastViewportContext);
  const [open = false, setOpen] = useControllable<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const titleId = useId();
  const descriptionId = useId();
  const timerRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!open || paused || !effectiveDuration || !Number.isFinite(effectiveDuration)) return;
    timerRef.current = window.setTimeout(() => setOpen(false), effectiveDuration);
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [open, paused, effectiveDuration, setOpen]);

  const ctx = useMemo<ToastContextValue>(
    () => ({ open, setOpen, titleId, descriptionId }),
    [open, setOpen, titleId, descriptionId],
  );

  const target = viewport ?? (typeof document !== 'undefined' ? document.body : null);

  return (
    <ToastContext.Provider value={ctx}>
      <Presence present={open}>
        {(state) => (
          <Portal container={target}>
            <li
              ref={ref}
              role="status"
              aria-live="polite"
              aria-atomic
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              data-state={state}
              className={cn('bwo-toast', className)}
              onMouseEnter={(event) => {
                onMouseEnter?.(event);
                setPaused(true);
              }}
              onMouseLeave={(event) => {
                onMouseLeave?.(event);
                setPaused(false);
              }}
              onFocus={(event) => {
                onFocus?.(event);
                setPaused(true);
              }}
              onBlur={(event) => {
                onBlur?.(event);
                setPaused(false);
              }}
              {...props}
            >
              {children}
            </li>
          </Portal>
        )}
      </Presence>
    </ToastContext.Provider>
  );
});

export interface ToastTitleProps extends HTMLAttributes<HTMLDivElement> {}

export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>(function ToastTitle(
  { className, id, ...props },
  ref,
) {
  const { titleId } = useToastContext('ToastTitle');
  return (
    <div ref={ref} id={id ?? titleId} className={cn('bwo-toast-title', className)} {...props} />
  );
});

export interface ToastDescriptionProps extends HTMLAttributes<HTMLDivElement> {}

export const ToastDescription = forwardRef<HTMLDivElement, ToastDescriptionProps>(
  function ToastDescription({ className, id, ...props }, ref) {
    const { descriptionId } = useToastContext('ToastDescription');
    return (
      <div
        ref={ref}
        id={id ?? descriptionId}
        className={cn('bwo-toast-description', className)}
        {...props}
      />
    );
  },
);

export interface ToastCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(function ToastClose(
  { className, children, onClick, ...rest },
  ref,
) {
  const { setOpen } = useToastContext('ToastClose');
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Close"
      className={cn('bwo-toast-close', className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) setOpen(false);
      }}
      {...rest}
    >
      {children ?? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
});

/* ─── Convenience hook + Toaster wrapper ──────────────────────────────── */

interface ToastDescriptor {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
}

interface ToastQueueContextValue {
  toast: (t: Omit<ToastDescriptor, 'id'>) => void;
}

const ToastQueueContext = createContext<ToastQueueContextValue | null>(null);

let toastSeq = 0;

export function Toaster({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastDescriptor[]>([]);

  const toast = useCallback((t: Omit<ToastDescriptor, 'id'>) => {
    toastSeq += 1;
    const id = `t-${toastSeq}`;
    setToasts((current) => [...current, { ...t, id }]);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastQueueContext.Provider value={value}>
      <ToastProvider duration={5000}>
        {children}
        <ToastViewport />
        {toasts.map((t) => (
          <ToastRoot
            key={t.id}
            duration={t.duration}
            onOpenChange={(open) => {
              if (!open) setToasts((cs) => cs.filter((c) => c.id !== t.id));
            }}
          >
            {t.title && <ToastTitle>{t.title}</ToastTitle>}
            {t.description && <ToastDescription>{t.description}</ToastDescription>}
            <ToastClose />
          </ToastRoot>
        ))}
      </ToastProvider>
    </ToastQueueContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastQueueContext);
  if (!ctx) throw new Error('useToast() must be called inside a <Toaster> provider.');
  return ctx;
}

export const Toast = {
  Provider: ToastProvider,
  Viewport: ToastViewport,
  Root: ToastRoot,
  Title: ToastTitle,
  Description: ToastDescription,
  Close: ToastClose,
};
