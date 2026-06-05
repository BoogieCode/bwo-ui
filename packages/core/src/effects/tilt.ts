import { gsap } from 'gsap';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

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
  /**
   * Auto-inject a glare overlay with zero markup. Default: `false`. When `true`
   * (and no `glareSelector` is given) an absolutely-positioned,
   * `pointer-events:none` div with a soft highlight is appended to the target
   * and driven exactly like the `glareSelector` path. An explicit
   * `glareSelector` always wins over auto-injection.
   *
   * Requires `overflow:hidden` on the target so the highlight is clipped to its
   * bounds — this is set automatically and restored on `destroy()`.
   */
  glare?: boolean;
  /** Highlight color for the auto-injected glare. Default: `'rgba(255,255,255,0.25)'`. */
  glareColor?: string;
  /** Opacity ceiling (0-1) for the auto-injected glare. Default: `0.4`. */
  maxGlare?: number;
}

const DEFAULTS = {
  max: 14,
  perspective: 800,
  scale: 1.04,
  duration: 0.4,
  ease: 'power3.out',
  reverse: false,
  glare: false,
  glareColor: 'rgba(255,255,255,0.25)',
  maxGlare: 0.4,
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

  const opts = mergeOptions(DEFAULTS, options);
  const dir = opts.reverse ? -1 : 1;

  const previousPerspective = el.style.perspective;
  const previousTransformStyle = el.style.transformStyle;
  el.style.perspective = `${opts.perspective}px`;
  el.style.transformStyle = 'preserve-3d';

  // Explicit selector wins; otherwise auto-inject a zero-markup overlay.
  let glareEl = opts.glareSelector
    ? el.querySelector<HTMLElement>(opts.glareSelector)
    : null;

  // Track injected state so destroy() only removes what we created/changed.
  let injectedGlareEl: HTMLElement | null = null;
  let previousOverflow: string | null = null;

  if (!glareEl && opts.glare) {
    previousOverflow = el.style.overflow;
    el.style.overflow = 'hidden';

    injectedGlareEl = document.createElement('div');
    injectedGlareEl.style.position = 'absolute';
    injectedGlareEl.style.inset = '0';
    injectedGlareEl.style.pointerEvents = 'none';
    injectedGlareEl.style.opacity = '0';
    injectedGlareEl.style.backgroundImage = `radial-gradient(circle at 50% 50%, ${opts.glareColor} 0%, transparent 60%)`;
    injectedGlareEl.style.backgroundRepeat = 'no-repeat';
    injectedGlareEl.style.backgroundSize = '200% 200%';
    injectedGlareEl.style.backgroundPosition = '50% 50%';
    el.appendChild(injectedGlareEl);
    glareEl = injectedGlareEl;
  }

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

  const onEnter = () => {
    quickScale(opts.scale);
    if (injectedGlareEl) {
      gsap.to(injectedGlareEl, {
        opacity: opts.maxGlare,
        duration: opts.duration,
        ease: opts.ease,
        overwrite: 'auto',
      });
    }
  };
  const onLeave = () => {
    quickRX(0);
    quickRY(0);
    quickScale(1);
    if (injectedGlareEl) {
      gsap.to(injectedGlareEl, {
        opacity: 0,
        duration: opts.duration,
        ease: opts.ease,
        overwrite: 'auto',
      });
    }
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
      if (injectedGlareEl) {
        gsap.killTweensOf(injectedGlareEl);
        injectedGlareEl.remove();
        injectedGlareEl = null;
        if (previousOverflow !== null) el.style.overflow = previousOverflow;
      } else if (glareEl) {
        // User-provided glare element: stop the dangling backgroundPosition tween
        // we kept firing in onMove so it doesn't keep animating after destroy.
        gsap.killTweensOf(glareEl);
      }
    },
  };
}
