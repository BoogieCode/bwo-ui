'use client';

import {
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
} from 'react';
import { Portal } from './internal/portal';
import { useControllable } from './internal/use-controllable';
import { useScrollLock } from './internal/scroll-lock';
import { cn } from './utils';

export interface LightboxImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface LightboxProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Ordered gallery items. */
  images: LightboxImage[];
  /** Controlled open state. Omit for uncontrolled (pair with `defaultOpen`). */
  open?: boolean;
  /** Initial open state when uncontrolled. Default: `false`. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change (close button, backdrop, Esc). */
  onOpenChange?: (open: boolean) => void;
  /** Controlled active image index. Omit for uncontrolled (pair with `defaultIndex`). */
  index?: number;
  /** Initial index when uncontrolled. Default: `0`. */
  defaultIndex?: number;
  /** Called whenever the active index changes (prev/next, arrow keys). */
  onIndexChange?: (index: number) => void;
}

/**
 * Multi-image gallery lightbox. The consumer owns the thumbnails and triggers
 * open + index; this renders only the fullscreen overlay.
 *
 * Controlled or uncontrolled for both `open` and `index` via the shared
 * `useControllable` bridge. SSR-safe (renders through the Portal), locks body
 * scroll while open, and wires up Esc / ArrowLeft / ArrowRight with wrap-around.
 */
export function Lightbox({
  images,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  index: controlledIndex,
  defaultIndex = 0,
  onIndexChange,
  className,
  ...rest
}: LightboxProps) {
  const [open = false, setOpen] = useControllable<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [index = 0, setIndex] = useControllable<number>({
    value: controlledIndex,
    defaultValue: defaultIndex,
    onChange: onIndexChange,
  });

  const dialogRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  // Clamp so an out-of-range external index never indexes past the array.
  const safeIndex = count > 0 ? ((index % count) + count) % count : 0;

  useScrollLock(open);

  const goPrev = useCallback(() => {
    if (count === 0) return;
    setIndex((safeIndex - 1 + count) % count);
  }, [count, safeIndex, setIndex]);

  const goNext = useCallback(() => {
    if (count === 0) return;
    setIndex((safeIndex + 1) % count);
  }, [count, safeIndex, setIndex]);

  const close = useCallback(() => setOpen(false), [setOpen]);

  // Keyboard nav: Esc closes, arrows navigate with wrap-around.
  useEffect(() => {
    if (!open || typeof document === 'undefined') return;
    const handleKey = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          close();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          goPrev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goNext();
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, close, goPrev, goNext]);

  // Move focus to the dialog when it opens for basic focus handling.
  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  const current = images[safeIndex];

  if (!open || count === 0 || !current) return null;

  return (
    <Portal>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={current.caption ?? current.alt ?? `Image ${safeIndex + 1} of ${count}`}
        tabIndex={-1}
        data-state="open"
        className={cn('bwo-lightbox', className)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 'var(--bwo-z-overlay, 1000)' as React.CSSProperties['zIndex'],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.86)',
          outline: 'none',
        }}
        onClick={(event) => {
          // Dismiss only when the backdrop itself is clicked, not the image/controls.
          if (event.target === event.currentTarget) close();
        }}
        {...rest}
      >
        {/* Close */}
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            border: 'none',
            borderRadius: 'var(--bwo-radius-current, 6px)',
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#fff',
            cursor: 'pointer',
            lineHeight: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Counter */}
        {count > 1 && (
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 24,
              left: 24,
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: 14,
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.02em',
            }}
          >
            {safeIndex + 1} / {count}
          </div>
        )}

        {/* Prev */}
        {count > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={goPrev}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              border: 'none',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
              cursor: 'pointer',
              lineHeight: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Next */}
        {count > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={goNext}
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              border: 'none',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#fff',
              cursor: 'pointer',
              lineHeight: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Image + caption */}
        <figure
          style={{
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            maxWidth: '92vw',
            maxHeight: '90vh',
          }}
        >
          <img
            key={current.src}
            src={current.src}
            alt={current.alt ?? ''}
            style={{
              maxWidth: '92vw',
              maxHeight: current.caption ? '80vh' : '90vh',
              objectFit: 'contain',
              borderRadius: 'var(--bwo-radius-current, 6px)',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5)',
            }}
          />
          {current.caption && (
            <figcaption
              style={{
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: 14,
                textAlign: 'center',
                maxWidth: '70ch',
                padding: '0 16px',
              }}
            >
              {current.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </Portal>
  );
}
