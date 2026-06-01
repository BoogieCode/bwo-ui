'use client';

import { useEffect, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './utils';

export interface BootScreenProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Auto-dismiss after this many ms. Set 0 / omit to never auto-dismiss. */
  timeout?: number;
  /** Force-dismiss externally. Default: false. */
  dismissed?: boolean;
  /** Called once the screen has dismissed (after the fade-out transition). */
  onDismiss?: () => void;
  /** Maximum width of the inner shell (matches AppShell). Default: 900px. */
  maxWidth?: number | string;
}

/**
 * Full-viewport overlay that wraps a skeleton-style "boot" composition
 * (top bar + title lines + card grid placeholders). Fades out after
 * `timeout` ms or when `dismissed` flips to true.
 *
 * Compose with `<Skeleton>` to match your real chrome — see the docs
 * /playground/boogie-ro for a worked example mirroring boogie-next.
 */
export function BootScreen({
  children,
  timeout,
  dismissed: dismissedProp,
  onDismiss,
  maxWidth,
  className,
  style,
  ...rest
}: BootScreenProps) {
  const [internalDismissed, setInternalDismissed] = useState(false);

  useEffect(() => {
    if (!timeout || dismissedProp) return;
    const t = window.setTimeout(() => setInternalDismissed(true), timeout);
    return () => window.clearTimeout(t);
  }, [timeout, dismissedProp]);

  const dismissed = dismissedProp ?? internalDismissed;
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    if (!dismissed) return;
    const t = window.setTimeout(() => {
      setUnmounted(true);
      onDismiss?.();
    }, 420);
    return () => window.clearTimeout(t);
  }, [dismissed, onDismiss]);

  if (unmounted) return null;

  const maxWidthCss = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  return (
    <div
      data-dismissed={dismissed || undefined}
      className={cn('bwo-boot', className)}
      style={
        maxWidthCss
          ? { ['--bwo-boot-max' as never]: maxWidthCss, ...style }
          : style
      }
      aria-hidden
      {...rest}
    >
      <div className="bwo-boot-shell">{children}</div>
    </div>
  );
}
