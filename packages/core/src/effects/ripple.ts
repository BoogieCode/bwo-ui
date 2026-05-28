import { gsap, registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface RippleOptions {
  /** Ripple color. Default: `'rgba(255,255,255,0.45)'`. */
  color?: string;
  /** Duration of one ripple in seconds. Default: `0.7`. */
  duration?: number;
  /** Final opacity at the end of the tween. Default: `0`. */
  opacity?: number;
  /** Ease. Default: `'power2.out'`. */
  ease?: string;
  /** When true, ignore pointerdown on disabled/aria-disabled elements. Default: `true`. */
  respectDisabled?: boolean;
}

const DEFAULTS = {
  color: 'rgba(255,255,255,0.45)',
  duration: 0.7,
  opacity: 0,
  ease: 'power2.out',
  respectDisabled: true,
};

/**
 * Material-style click ripple. Adds a `<span>` per click that radiates from
 * the click point, fades out, and removes itself. Element must allow
 * `overflow: hidden` and `position: relative` (we set them).
 */
export function createRipple(target: Target, options: RippleOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options };

  const previousPosition = el.style.position;
  const previousOverflow = el.style.overflow;
  if (getComputedStyle(el).position === 'static') {
    el.style.position = 'relative';
  }
  el.style.overflow = 'hidden';

  const onDown = (e: PointerEvent) => {
    if (
      opts.respectDisabled &&
      (el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true')
    ) {
      return;
    }

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.hypot(
      Math.max(x, rect.width - x),
      Math.max(y, rect.height - y),
    ) * 2;

    const ripple = document.createElement('span');
    ripple.dataset.bwoRipple = '';
    Object.assign(ripple.style, {
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '9999px',
      background: opts.color,
      transform: 'translate(-50%, -50%) scale(0)',
      pointerEvents: 'none',
      opacity: '1',
    } satisfies Partial<CSSStyleDeclaration>);
    el.appendChild(ripple);

    gsap.to(ripple, {
      scale: 1,
      opacity: opts.opacity,
      duration: opts.duration,
      ease: opts.ease,
      onComplete: () => ripple.remove(),
    });
  };

  el.addEventListener('pointerdown', onDown);

  return {
    destroy() {
      el.removeEventListener('pointerdown', onDown);
      el.querySelectorAll('[data-bwo-ripple]').forEach((node) => node.remove());
      el.style.position = previousPosition;
      el.style.overflow = previousOverflow;
    },
  };
}
