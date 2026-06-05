'use client';

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { cn } from './utils';

export type DockDirection = 'horizontal' | 'vertical';

interface DockContextValue {
  /** Current pointer position along the dock's main axis, in dock-local px. `null` when the pointer is away. */
  pointer: number | null;
  /** Max icon size (px) at the cursor's center. */
  magnification: number;
  /** Influence radius (px). */
  distance: number;
  /** Base icon size (px). */
  iconSize: number;
  direction: DockDirection;
  /** When true, magnification is disabled (prefers-reduced-motion). */
  reduced: boolean;
}

const DockContext = createContext<DockContextValue | null>(null);

/**
 * Reads `prefers-reduced-motion`. SSR-safe: returns `false` on the server and on
 * the first client render, then updates after mount so the markup stays stable.
 */
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    // Safari < 14 only supports addListener/removeListener.
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return reduced;
}

export interface DockProps extends HTMLAttributes<HTMLDivElement> {
  /** Max icon size in px at the cursor's center. Default `60`. */
  magnification?: number;
  /** Influence radius in px — how far the cursor reaches. Default `140`. */
  distance?: number;
  /** Layout axis. Default `'horizontal'`. */
  direction?: DockDirection;
  /** Base (resting) icon size in px. Default `40`. */
  iconSize?: number;
}

/**
 * A macOS-style dock: a rounded bar whose `DockIcon` children magnify based on
 * cursor proximity. The dock tracks the pointer along its main axis and exposes
 * that position via context; each `DockIcon` derives its own size from the
 * distance between its center and the cursor.
 *
 * Pointer tracking is throttled to one update per animation frame, and the
 * actual scaling is interpolated by CSS transitions for smoothness. Honors
 * `prefers-reduced-motion` (icons stay at their base size). SSR-safe.
 */
export const Dock = forwardRef<HTMLDivElement, DockProps>(function Dock(
  {
    magnification = 60,
    distance = 140,
    direction = 'horizontal',
    iconSize = 40,
    className,
    style,
    children,
    onPointerMove,
    onPointerLeave,
    ...props
  },
  ref,
) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState<number | null>(null);
  const reduced = usePrefersReducedMotion();

  // Throttle pointer updates to one per frame to avoid re-rendering on every
  // pointermove event.
  const frameRef = useRef<number | null>(null);
  const nextRef = useRef<number | null>(null);

  // Merge the forwarded ref with our internal ref.
  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const flush = useCallback(() => {
    frameRef.current = null;
    setPointer(nextRef.current);
  }, []);

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      onPointerMove?.(event);
      if (reduced) return;
      const node = innerRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      nextRef.current =
        direction === 'horizontal' ? event.clientX - rect.left : event.clientY - rect.top;
      if (frameRef.current == null && typeof requestAnimationFrame === 'function') {
        frameRef.current = requestAnimationFrame(flush);
      } else if (typeof requestAnimationFrame !== 'function') {
        setPointer(nextRef.current);
      }
    },
    [direction, flush, onPointerMove, reduced],
  );

  const handlePointerLeave = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      onPointerLeave?.(event);
      nextRef.current = null;
      if (frameRef.current != null && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      setPointer(null);
    },
    [onPointerLeave],
  );

  // Cancel any pending frame on unmount.
  useEffect(() => {
    return () => {
      if (frameRef.current != null && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const ctx = useMemo<DockContextValue>(
    () => ({ pointer, magnification, distance, iconSize, direction, reduced }),
    [pointer, magnification, distance, iconSize, direction, reduced],
  );

  const dockStyle = {
    '--bwo-dock-icon-size': `${iconSize}px`,
    '--bwo-dock-magnification': `${magnification}px`,
    ...style,
  } as CSSProperties;

  return (
    <DockContext.Provider value={ctx}>
      <div
        ref={setRef}
        role="toolbar"
        data-direction={direction}
        className={cn('bwo-dock', `bwo-dock--${direction}`, className)}
        style={dockStyle}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        {...props}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
});

export interface DockIconProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * A single dock slot. Measures its own center and computes a magnified size from
 * the cursor's distance, falling linearly back to the base `iconSize` outside
 * the influence radius. Wrap an icon, button or link inside it.
 */
export const DockIcon = forwardRef<HTMLDivElement, DockIconProps>(function DockIcon(
  { className, style, children, ...props },
  ref,
) {
  const ctx = useContext(DockContext);
  if (!ctx) {
    throw new Error('DockIcon must be rendered inside <Dock>.');
  }

  const innerRef = useRef<HTMLDivElement | null>(null);

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const { pointer, magnification, distance, iconSize, direction, reduced } = ctx;

  // Compute the target size. When the pointer is away or motion is reduced, fall
  // back to the base size. Otherwise scale linearly from `magnification` (at the
  // icon's center) down to `iconSize` (at/beyond the influence radius).
  let size = iconSize;
  if (!reduced && pointer != null) {
    const node = innerRef.current;
    const parent = node?.parentElement ?? null;
    if (node && parent) {
      // Measure the icon's center along the main axis, relative to the dock.
      const nodeRect = node.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const center =
        direction === 'horizontal'
          ? nodeRect.left - parentRect.left + nodeRect.width / 2
          : nodeRect.top - parentRect.top + nodeRect.height / 2;
      const delta = Math.abs(pointer - center);
      if (delta < distance) {
        const t = 1 - delta / distance; // 1 at center → 0 at the radius edge
        size = iconSize + (magnification - iconSize) * t;
      }
    }
  }

  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`,
    ...style,
  } as CSSProperties;

  return (
    <div
      ref={setRef}
      className={cn('bwo-dock-icon', className)}
      style={iconStyle}
      {...props}
    >
      {children}
    </div>
  );
});
