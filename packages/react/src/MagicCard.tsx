'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export interface MagicCardProps extends HTMLAttributes<HTMLElement> {
  /** Diameter (px) of the cursor-following spotlight glow. Default: `220`. */
  gradientSize?: number;
  /** Color of the inner spotlight glow. Default: `'rgba(120,120,255,0.18)'`. */
  gradientColor?: string;
  /** Start color of the border highlight gradient. Falls back to `gradientColor`. */
  gradientFrom?: string;
  /** End color of the border highlight gradient. Falls back to `transparent`. */
  gradientTo?: string;
  /** Render a gradient border that lights toward the cursor. Default: `true`. */
  borderGlow?: boolean;
  /** Element to render. Default: `'div'`. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const STYLE_ID = 'bwo-magic-card-style';

/**
 * Injects the MagicCard CSS once (on first mount, browser only). Drives the
 * spotlight glow and border highlight from the `--mx` / `--my` pointer vars.
 */
function ensureStyle(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
.bwo-magic-card {
  position: relative;
  border-radius: var(--bwo-radius-current, 12px);
  border: 1px solid var(--bwo-border, rgba(255,255,255,0.1));
  background: var(--bwo-surface, rgba(20,20,28,1));
  padding: var(--bwo-card-pad, 24px);
  overflow: hidden;
  isolation: isolate;
  --mx: 50%;
  --my: 50%;
}
.bwo-magic-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
    var(--bwo-magic-size, 220px) circle at var(--mx) var(--my),
    var(--bwo-magic-color, rgba(120,120,255,0.18)),
    transparent 70%
  );
}
.bwo-magic-card[data-bwo-magic="active"]::before { opacity: 1; }
.bwo-magic-card--border::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: 1px;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: radial-gradient(
    var(--bwo-magic-size, 220px) circle at var(--mx) var(--my),
    var(--bwo-magic-from, var(--bwo-magic-color, rgba(120,120,255,0.18))),
    var(--bwo-magic-to, transparent) 70%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
}
.bwo-magic-card--border[data-bwo-magic="active"]::after { opacity: 1; }
.bwo-magic-card > * { position: relative; z-index: 2; }
  `.trim();
  document.head.appendChild(style);
}

/**
 * An interactive card with a cursor-following spotlight glow and an optional
 * gradient border that highlights toward the pointer. Pointer position is
 * tracked via the `--mx` / `--my` CSS variables, updated on `pointermove`.
 *
 * SSR-safe: the pointer listeners and injected stylesheet only run in the
 * browser, and all listeners are cleaned up on unmount.
 */
export const MagicCard = forwardRef<HTMLElement, MagicCardProps>(function MagicCard(
  {
    gradientSize = 220,
    gradientColor = 'rgba(120,120,255,0.18)',
    gradientFrom,
    gradientTo,
    borderGlow = true,
    as,
    className,
    style,
    children,
    ...props
  },
  forwardedRef,
) {
  const Tag = (as ?? 'div') as ElementType;
  const innerRef = useRef<HTMLElement | null>(null);

  useImperativeHandle(forwardedRef, () => innerRef.current as HTMLElement, []);

  useEffect(() => {
    ensureStyle();
  }, []);

  const setRef = useCallback((node: HTMLElement | null) => {
    innerRef.current = node;
  }, []);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    const onEnter = () => {
      el.dataset.bwoMagic = 'active';
    };
    const onLeave = () => {
      el.dataset.bwoMagic = '';
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  const mergedStyle = useMemo<CSSProperties>(() => {
    const vars: Record<string, string> = {
      '--bwo-magic-size': `${gradientSize}px`,
      '--bwo-magic-color': gradientColor,
    };
    if (gradientFrom) vars['--bwo-magic-from'] = gradientFrom;
    if (gradientTo) vars['--bwo-magic-to'] = gradientTo;
    return { ...(vars as CSSProperties), ...style };
  }, [gradientSize, gradientColor, gradientFrom, gradientTo, style]);

  return (
    <Tag
      ref={setRef}
      className={cn('bwo-magic-card', borderGlow && 'bwo-magic-card--border', className)}
      style={mergedStyle}
      {...props}
    >
      {children}
    </Tag>
  );
});
