import { gsap, registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface TiltOptions {
  /** Maximum rotation in degrees on each axis. Default: `14`. */
  max?: number;
  /** Perspective in px for the 3D scene. Default: `800`. */
  perspective?: number;
  /** Scale applied while the pointer is over the element. Default: `1.04`. */
  scale?: number;
  /** Tween duration following the pointer. Default: `0.4`. */
  duration?: number;
  /** GSAP ease. Default: `'power3.out'`. */
  ease?: string;
  /** Reverse the tilt direction (positive Y pushes top away). Default: `false`. */
  reverse?: boolean;
  /** Optional inner selector that receives a counter-tilt to feel "afloat". */
  glareSelector?: string;
}

const DEFAULTS = {
  max: 14,
  perspective: 800,
  scale: 1.04,
  duration: 0.4,
  ease: 'power3.out',
  reverse: false,
};

/**
 * 3D mouse-tilt — tracks pointer position within the element and rotates the
 * element on X/Y axes accordingly. Resets smoothly on pointerleave.
 */
export function createTilt(target: Target, options: TiltOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  // Skip on touch-primary devices — feels weird with a finger.
  if (window.matchMedia('(pointer: coarse)').matches) {
    return { destroy: () => {} };
  }

  const opts = { ...DEFAULTS, ...options };
  const dir = opts.reverse ? -1 : 1;

  const previousPerspective = el.style.perspective;
  const previousTransformStyle = el.style.transformStyle;
  el.style.perspective = `${opts.perspective}px`;
  el.style.transformStyle = 'preserve-3d';

  const glareEl = opts.glareSelector
    ? el.querySelector<HTMLElement>(opts.glareSelector)
    : null;

  const quickRX = gsap.quickTo(el, 'rotationX', { duration: opts.duration, ease: opts.ease });
  const quickRY = gsap.quickTo(el, 'rotationY', { duration: opts.duration, ease: opts.ease });
  const quickScale = gsap.quickTo(el, 'scale', { duration: opts.duration, ease: opts.ease });

  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotY = (x - 0.5) * 2 * opts.max * dir;
    const rotX = -(y - 0.5) * 2 * opts.max * dir;
    quickRY(rotY);
    quickRX(rotX);

    if (glareEl) {
      gsap.to(glareEl, {
        backgroundPosition: `${x * 100}% ${y * 100}%`,
        duration: opts.duration,
        ease: opts.ease,
        overwrite: 'auto',
      });
    }
  };

  const onEnter = () => quickScale(opts.scale);
  const onLeave = () => {
    quickRX(0);
    quickRY(0);
    quickScale(1);
  };

  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerleave', onLeave);

  return {
    destroy() {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { clearProps: 'rotationX,rotationY,scale,transform' });
      el.style.perspective = previousPerspective;
      el.style.transformStyle = previousTransformStyle;
    },
  };
}
