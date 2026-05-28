import { gsap, registerPlugins } from '../register';
import type { MotionInstance } from '../types';
import { isBrowser } from '../types';

export interface MagneticCursorOptions {
  /** Pixel size of the custom cursor dot. Default: `12`. */
  size?: number;
  /** Pixel size when hovering an interactive element. Default: `40`. */
  hoverSize?: number;
  /** CSS background color. Default: `'#141414'`. */
  color?: string;
  /** Hover-color override. Default: `color` with 30% opacity. */
  hoverColor?: string;
  /** Tween duration following the cursor. Default: `0.25`. */
  duration?: number;
  /** Selector for elements that grow the cursor on hover. Default: `'a, button, [role="button"], [data-magnetic-cursor]'`. */
  hoverSelector?: string;
  /** When true, hide the native cursor. Default: `true`. */
  hideNativeCursor?: boolean;
}

const DEFAULTS = {
  size: 12,
  hoverSize: 40,
  color: '#141414',
  duration: 0.25,
  hoverSelector: 'a, button, [role="button"], [data-magnetic-cursor]',
  hideNativeCursor: true,
};

/**
 * Custom cursor — adds a small dot to the body that follows the pointer with
 * lag, and grows + becomes translucent when hovering interactive elements.
 *
 * Touch devices are detected and the cursor stays disabled.
 */
export function createMagneticCursor(options: MagneticCursorOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };

  // Skip on touch-primary devices.
  if (window.matchMedia('(pointer: coarse)').matches) {
    return { destroy: () => {} };
  }

  registerPlugins();
  const opts = { ...DEFAULTS, ...options };
  const hoverColor = opts.hoverColor ?? `${opts.color}33`;

  const dot = document.createElement('div');
  dot.dataset.bwoMagneticCursor = '';
  Object.assign(dot.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: `${opts.size}px`,
    height: `${opts.size}px`,
    borderRadius: '9999px',
    background: opts.color,
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999',
    mixBlendMode: 'difference',
    willChange: 'transform, width, height, background',
  } satisfies Partial<CSSStyleDeclaration>);
  document.body.appendChild(dot);

  const previousBodyCursor = document.body.style.cursor;
  if (opts.hideNativeCursor) {
    document.body.style.cursor = 'none';
  }

  const quickX = gsap.quickTo(dot, 'x', { duration: opts.duration, ease: 'power3.out' });
  const quickY = gsap.quickTo(dot, 'y', { duration: opts.duration, ease: 'power3.out' });

  const onMove = (e: PointerEvent) => {
    quickX(e.clientX);
    quickY(e.clientY);
  };

  const setHover = (active: boolean) => {
    gsap.to(dot, {
      width: active ? opts.hoverSize : opts.size,
      height: active ? opts.hoverSize : opts.size,
      background: active ? hoverColor : opts.color,
      duration: 0.25,
      ease: 'power3.out',
    });
  };

  const onEnter = (e: Event) => {
    if ((e.target as Element)?.matches?.(opts.hoverSelector)) setHover(true);
  };
  const onLeave = (e: Event) => {
    if ((e.target as Element)?.matches?.(opts.hoverSelector)) setHover(false);
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('mouseover', onEnter);
  document.addEventListener('mouseout', onLeave);

  return {
    destroy() {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      dot.remove();
      if (opts.hideNativeCursor) {
        document.body.style.cursor = previousBodyCursor;
      }
    },
  };
}
