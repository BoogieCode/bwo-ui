import { gsap, registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface MagneticOptions {
  /** How strongly the element follows the cursor (0 = none, 1 = full). Default: `0.35`. */
  strength?: number;
  /** Radius in px where the magnetic field is active. Default: `120`. */
  radius?: number;
  /** GSAP ease. Default: `'power3.out'`. */
  ease?: string;
  /** Tween duration. Default: `0.5`. */
  duration?: number;
  /** Optional child selector to apply the transform to (defaults to the target). */
  child?: string;
}

const DEFAULTS = {
  strength: 0.35,
  radius: 120,
  ease: 'power3.out',
  duration: 0.5,
};

export function createMagnetic(target: Target, options: MagneticOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options };
  const mover = (opts.child ? el.querySelector<HTMLElement>(opts.child) : el) ?? el;

  const quickX = gsap.quickTo(mover, 'x', { duration: opts.duration, ease: opts.ease });
  const quickY = gsap.quickTo(mover, 'y', { duration: opts.duration, ease: opts.ease });

  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);

    if (dist > opts.radius) {
      quickX(0);
      quickY(0);
      return;
    }

    quickX(dx * opts.strength);
    quickY(dy * opts.strength);
  };

  const onLeave = () => {
    quickX(0);
    quickY(0);
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  el.addEventListener('pointerleave', onLeave);

  return {
    destroy() {
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(mover, { x: 0, y: 0, clearProps: 'transform' });
    },
  };
}
