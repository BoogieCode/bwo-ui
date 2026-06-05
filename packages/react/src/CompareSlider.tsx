'use client';

import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { cn } from './utils';

export type CompareSliderOrientation = 'horizontal' | 'vertical';

export interface CompareSliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** The base layer — typically an `<img>`. Always fully visible underneath. */
  before: ReactNode;
  /** The reveal layer — typically an `<img>`. Clipped to the divider position. */
  after: ReactNode;
  /** Starting divider position, 0–100. Default `50`. */
  initial?: number;
  /**
   * `'horizontal'` (default) moves the divider left/right and clips the
   * `after` layer horizontally. `'vertical'` moves it up/down.
   */
  orientation?: CompareSliderOrientation;
  /** Custom handle node, rendered centred on the divider. */
  handle?: ReactNode;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/**
 * Before/after image comparison with a draggable divider. The `after` layer is
 * stacked over `before` and clipped via `clip-path: inset(...)` to the current
 * divider position. The handle is pointer-draggable and keyboard-nudgeable
 * (arrow keys), exposing `role="slider"` + `aria-valuenow`.
 *
 * Self-contained inline styles — no global CSS required. The divider/handle use
 * `var(--bwo-accent)` with a fallback so they pick up the theme accent when one
 * is set. SSR-safe: the container rect is only measured inside event handlers.
 */
export const CompareSlider = forwardRef<HTMLDivElement, CompareSliderProps>(
  function CompareSlider(
    {
      before,
      after,
      initial = 50,
      orientation = 'horizontal',
      handle,
      className,
      style,
      ...props
    },
    ref,
  ) {
    const isHorizontal = orientation === 'horizontal';
    const [position, setPosition] = useState(() => clamp(initial, 0, 100));
    const containerRef = useRef<HTMLDivElement | null>(null);
    const dragging = useRef(false);

    // Merge the forwarded ref with our internal one so we can measure the rect.
    const setContainerRef = useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as { current: HTMLDivElement | null }).current = node;
      },
      [ref],
    );

    const computeFromPointer = useCallback(
      (clientX: number, clientY: number): number | null => {
        const node = containerRef.current;
        if (!node) return null;
        const rect = node.getBoundingClientRect();
        const pct = isHorizontal
          ? ((clientX - rect.left) / (rect.width || 1)) * 100
          : ((clientY - rect.top) / (rect.height || 1)) * 100;
        return clamp(pct, 0, 100);
      },
      [isHorizontal],
    );

    const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      (event.currentTarget as Element).setPointerCapture(event.pointerId);
      dragging.current = true;
      const next = computeFromPointer(event.clientX, event.clientY);
      if (next !== null) setPosition(next);
    };

    const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      const next = computeFromPointer(event.clientX, event.clientY);
      if (next !== null) setPosition(next);
    };

    const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      (event.currentTarget as Element).releasePointerCapture(event.pointerId);
      dragging.current = false;
    };

    const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
      const big = 10;
      let delta = 0;
      if (event.key === 'ArrowRight' || event.key === 'ArrowUp')
        delta = event.shiftKey ? big : 1;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown')
        delta = event.shiftKey ? -big : -1;
      else if (event.key === 'PageUp') delta = big;
      else if (event.key === 'PageDown') delta = -big;
      else if (event.key === 'Home') {
        event.preventDefault();
        setPosition(0);
        return;
      } else if (event.key === 'End') {
        event.preventDefault();
        setPosition(100);
        return;
      } else return;
      event.preventDefault();
      setPosition((p) => clamp(p + delta, 0, 100));
    };

    // The `after` layer is clipped so only the portion on the "after" side of
    // the divider shows. For horizontal, we hide everything left of `position`
    // (inset from the left); for vertical, everything above it (inset top).
    const afterClip: string = isHorizontal
      ? `inset(0 0 0 ${position}%)`
      : `inset(${position}% 0 0 0)`;

    const layerStyle: CSSProperties = {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
    };

    const accent = 'var(--bwo-accent, #6366f1)';

    const dividerStyle: CSSProperties = isHorizontal
      ? {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${position}%`,
          width: 2,
          transform: 'translateX(-50%)',
          background: accent,
          pointerEvents: 'none',
        }
      : {
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${position}%`,
          height: 2,
          transform: 'translateY(-50%)',
          background: accent,
          pointerEvents: 'none',
        };

    const handleStyle: CSSProperties = isHorizontal
      ? {
          position: 'absolute',
          top: '50%',
          left: `${position}%`,
          transform: 'translate(-50%, -50%)',
          touchAction: 'none',
          cursor: 'ew-resize',
        }
      : {
          position: 'absolute',
          left: '50%',
          top: `${position}%`,
          transform: 'translate(-50%, -50%)',
          touchAction: 'none',
          cursor: 'ns-resize',
        };

    const defaultHandleStyle: CSSProperties = {
      boxSizing: 'border-box',
      width: 32,
      height: 32,
      borderRadius: '9999px',
      background: '#fff',
      border: `2px solid ${accent}`,
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: accent,
      fontSize: 14,
      lineHeight: 1,
      userSelect: 'none',
    };

    return (
      <div
        ref={setContainerRef}
        data-orientation={orientation}
        className={cn('bwo-compare-slider', className)}
        style={{
          position: 'relative',
          overflow: 'hidden',
          touchAction: 'none',
          userSelect: 'none',
          ...style,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        {...props}
      >
        <div className="bwo-compare-slider-before" style={layerStyle}>
          {before}
        </div>
        <div
          className="bwo-compare-slider-after"
          style={{ ...layerStyle, clipPath: afterClip, WebkitClipPath: afterClip }}
        >
          {after}
        </div>
        <div
          className="bwo-compare-slider-divider"
          style={dividerStyle}
          aria-hidden
        />
        <div
          role="slider"
          tabIndex={0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-orientation={orientation}
          aria-label="Comparison position"
          className="bwo-compare-slider-handle"
          style={handleStyle}
          onKeyDown={onKeyDown}
        >
          {handle ?? (
            <div
              className="bwo-compare-slider-handle-default"
              style={defaultHandleStyle}
            >
              {isHorizontal ? '↔' : '↕'}
            </div>
          )}
        </div>
      </div>
    );
  },
);
