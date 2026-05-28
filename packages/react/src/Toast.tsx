'use client';

import * as RadixToast from '@radix-ui/react-toast';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export const ToastProvider = RadixToast.Provider;

export const ToastViewport = forwardRef<
  ElementRef<typeof RadixToast.Viewport>,
  ComponentPropsWithoutRef<typeof RadixToast.Viewport>
>(function ToastViewport({ className, ...props }, ref) {
  return <RadixToast.Viewport ref={ref} className={cn('bwo-toast-viewport', className)} {...props} />;
});

export const ToastRoot = forwardRef<
  ElementRef<typeof RadixToast.Root>,
  ComponentPropsWithoutRef<typeof RadixToast.Root>
>(function ToastRoot({ className, ...props }, ref) {
  return <RadixToast.Root ref={ref} className={cn('bwo-toast', className)} {...props} />;
});

export const ToastTitle = forwardRef<
  ElementRef<typeof RadixToast.Title>,
  ComponentPropsWithoutRef<typeof RadixToast.Title>
>(function ToastTitle({ className, ...props }, ref) {
  return <RadixToast.Title ref={ref} className={cn('bwo-toast-title', className)} {...props} />;
});

export const ToastDescription = forwardRef<
  ElementRef<typeof RadixToast.Description>,
  ComponentPropsWithoutRef<typeof RadixToast.Description>
>(function ToastDescription({ className, ...props }, ref) {
  return (
    <RadixToast.Description ref={ref} className={cn('bwo-toast-description', className)} {...props} />
  );
});

export const ToastClose = forwardRef<
  ElementRef<typeof RadixToast.Close>,
  ComponentPropsWithoutRef<typeof RadixToast.Close>
>(function ToastClose({ className, children, ...props }, ref) {
  return (
    <RadixToast.Close
      ref={ref}
      className={cn('bwo-toast-close', className)}
      aria-label="Close"
      {...props}
    >
      {children ?? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </RadixToast.Close>
  );
});

/* ─── Convenience hook + components ─────────────────────────────────────── */

interface ToastDescriptor {
  id: string;
  title?: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (t: Omit<ToastDescriptor, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Mount once near the root. Provides a `useToast()` hook anywhere below.
 */
export function Toaster({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastDescriptor[]>([]);

  const toast = useCallback((t: Omit<ToastDescriptor, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((current) => [...current, { ...t, id }]);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      <RadixToast.Provider duration={5000}>
        {children}
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
        <ToastViewport />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx)
    throw new Error('useToast() must be called inside a <Toaster> provider.');
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
