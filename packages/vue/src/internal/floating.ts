import { onScopeDispose, ref, watch, type Ref } from 'vue';

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Align = 'start' | 'center' | 'end';

export interface AnchorRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface FloatingOptions {
  side?: Side;
  align?: Align;
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
}

export interface FloatingPosition {
  top: number;
  left: number;
  side: Side;
}

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
    if (side === 'bottom') top = anchor.top + anchor.height + sideOffset;
    else if (side === 'top') top = anchor.top - floatingSize.height - sideOffset;
    else if (side === 'right') left = anchor.left + anchor.width + sideOffset;
    else if (side === 'left') left = anchor.left - floatingSize.width - sideOffset;
    if (side === 'top' || side === 'bottom') {
      if (align === 'start') left = anchor.left + alignOffset;
      else if (align === 'end')
        left = anchor.left + anchor.width - floatingSize.width - alignOffset;
      else left = anchor.left + anchor.width / 2 - floatingSize.width / 2 + alignOffset;
    } else {
      if (align === 'start') top = anchor.top + alignOffset;
      else if (align === 'end')
        top = anchor.top + anchor.height - floatingSize.height - alignOffset;
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

export function useAnchorRect(
  anchorRef: Ref<Element | null>,
  open: Ref<boolean>,
  manualRect?: Ref<AnchorRect | null>,
): Ref<AnchorRect | null> {
  const rect = ref<AnchorRect | null>(null);
  let cleanup: (() => void) | null = null;

  watch(
    [open, anchorRef, manualRect ?? ref(null)],
    () => {
      cleanup?.();
      cleanup = null;
      if (!open.value) {
        rect.value = null;
        return;
      }
      if (manualRect?.value) {
        rect.value = manualRect.value;
        return;
      }
      const el = anchorRef.value;
      if (!el) return;
      const measure = () => {
        const r = el.getBoundingClientRect();
        rect.value = { top: r.top, left: r.left, width: r.width, height: r.height };
      };
      measure();
      window.addEventListener('scroll', measure, true);
      window.addEventListener('resize', measure);
      cleanup = () => {
        window.removeEventListener('scroll', measure, true);
        window.removeEventListener('resize', measure);
      };
    },
    { flush: 'post', immediate: true },
  );

  onScopeDispose(() => cleanup?.());
  return rect;
}

export function useFloatingSize(
  elRef: Ref<HTMLElement | null>,
  open: Ref<boolean>,
): Ref<{ width: number; height: number }> {
  const size = ref({ width: 0, height: 0 });
  let observer: ResizeObserver | null = null;

  watch(
    [open, elRef],
    ([isOpen, el]) => {
      observer?.disconnect();
      observer = null;
      if (!isOpen || !el) return;
      const measure = () => {
        size.value = { width: el.offsetWidth, height: el.offsetHeight };
      };
      measure();
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(measure);
        observer.observe(el);
      }
    },
    { flush: 'post', immediate: true },
  );

  onScopeDispose(() => observer?.disconnect());
  return size;
}
