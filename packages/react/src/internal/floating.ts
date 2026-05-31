import { useEffect, useLayoutEffect, useState, type RefObject } from 'react';

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Align = 'start' | 'center' | 'end';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export interface AnchorRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface FloatingOptions {
  side?: Side;
  align?: Align;
  /** Distance between the anchor and the floating element. */
  sideOffset?: number;
  /** Shift along the alignment axis. */
  alignOffset?: number;
  /** Margin from the viewport edge before flipping. */
  collisionPadding?: number;
}

export interface FloatingPosition {
  top: number;
  left: number;
  side: Side;
}

/**
 * Compute floating element coordinates next to an anchor rect.
 * Pure math — no DOM reads — so callers can pass either an element rect or a
 * synthetic rect (e.g. cursor position for context menus).
 */
export function computeFloating(
  anchor: AnchorRect,
  floatingSize: { width: number; height: number },
  options: FloatingOptions = {},
): FloatingPosition {
  const {
    side: preferredSide = 'bottom',
    align = 'start',
    sideOffset = 6,
    alignOffset = 0,
    collisionPadding = 8,
  } = options;
  const viewportW = typeof window === 'undefined' ? 1024 : window.innerWidth;
  const viewportH = typeof window === 'undefined' ? 768 : window.innerHeight;

  const trySide = (side: Side): FloatingPosition => {
    let top = 0;
    let left = 0;
    if (side === 'bottom') {
      top = anchor.top + anchor.height + sideOffset;
    } else if (side === 'top') {
      top = anchor.top - floatingSize.height - sideOffset;
    } else if (side === 'right') {
      left = anchor.left + anchor.width + sideOffset;
    } else if (side === 'left') {
      left = anchor.left - floatingSize.width - sideOffset;
    }
    if (side === 'top' || side === 'bottom') {
      if (align === 'start') left = anchor.left + alignOffset;
      else if (align === 'end') left = anchor.left + anchor.width - floatingSize.width - alignOffset;
      else left = anchor.left + anchor.width / 2 - floatingSize.width / 2 + alignOffset;
    } else {
      if (align === 'start') top = anchor.top + alignOffset;
      else if (align === 'end') top = anchor.top + anchor.height - floatingSize.height - alignOffset;
      else top = anchor.top + anchor.height / 2 - floatingSize.height / 2 + alignOffset;
    }
    return { top, left, side };
  };

  const fits = (p: FloatingPosition) =>
    p.top >= collisionPadding &&
    p.left >= collisionPadding &&
    p.top + floatingSize.height <= viewportH - collisionPadding &&
    p.left + floatingSize.width <= viewportW - collisionPadding;

  const opposite: Record<Side, Side> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
  };

  const primary = trySide(preferredSide);
  const result = fits(primary) ? primary : trySide(opposite[preferredSide]);

  result.left = Math.min(
    Math.max(result.left, collisionPadding),
    Math.max(collisionPadding, viewportW - floatingSize.width - collisionPadding),
  );
  result.top = Math.min(
    Math.max(result.top, collisionPadding),
    Math.max(collisionPadding, viewportH - floatingSize.height - collisionPadding),
  );
  return result;
}

/**
 * Track the bounding rect of an anchor element across scroll/resize.
 * Pass a synthetic rect via `manualRect` to bypass the element measurement
 * (e.g. for context menus anchored to cursor position).
 */
export function useAnchorRect(
  anchorRef: RefObject<Element | null>,
  open: boolean,
  manualRect?: AnchorRect | null,
): AnchorRect | null {
  const [rect, setRect] = useState<AnchorRect | null>(null);

  useIsoLayoutEffect(() => {
    if (!open) return;
    if (manualRect) {
      setRect(manualRect);
      return;
    }
    const el = anchorRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    measure();
    window.addEventListener('scroll', measure, true);
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', measure, true);
      window.removeEventListener('resize', measure);
    };
  }, [open, anchorRef, manualRect]);

  return rect;
}

/**
 * Track an element's natural rendered size.
 */
export function useFloatingSize(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
): { width: number; height: number } {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useIsoLayoutEffect(() => {
    if (!open || !ref.current) return;
    const el = ref.current;
    const measure = () => {
      setSize({ width: el.offsetWidth, height: el.offsetHeight });
    };
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    return () => ro?.disconnect();
  }, [open, ref]);
  return size;
}
