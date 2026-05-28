import { gsap, registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface SpotlightOptions {
  /** Radius of the spotlight in px. Default: `320`. */
  size?: number;
  /** Spotlight CSS color (any value the `radial-gradient` accepts). Default: `'rgba(255,255,255,0.12)'`. */
  color?: string;
  /** Tween duration following the pointer. Default: `0.4`. */
  duration?: number;
  /** Ease. Default: `'power3.out'`. */
  ease?: string;
  /** When false, the spotlight stays visible even when the cursor is outside. Default: `true`. */
  hideOnLeave?: boolean;
}

const DEFAULTS = {
  size: 320,
  color: 'rgba(255,255,255,0.12)',
  duration: 0.4,
  ease: 'power3.out',
  hideOnLeave: true,
};

/**
 * Renders a soft radial light that follows the cursor inside the target.
 * Works by writing CSS custom properties (`--bwo-spotlight-x/y/size/color`)
 * and toggling a pseudo-element via a `data-bwo-spotlight` attribute.
 *
 * The element must be positioned (relative/absolute/fixed) and have
 * `overflow: hidden` if you want the glow clipped.
 *
 * Required CSS (auto-injected once when first instance mounts):
 *
 *   [data-bwo-spotlight]::before {
 *     content: "";
 *     position: absolute; inset: 0;
 *     pointer-events: none;
 *     opacity: 0; transition: opacity 0.2s;
 *     background: radial-gradient(
 *       var(--bwo-spotlight-size, 300px) circle at
 *       var(--bwo-spotlight-x, 50%) var(--bwo-spotlight-y, 50%),
 *       var(--bwo-spotlight-color, rgba(255,255,255,0.12)),
 *       transparent 70%
 *     );
 *   }
 *   [data-bwo-spotlight="active"]::before { opacity: 1; }
 */
const STYLE_ID = 'bwo-spotlight-style';

function ensureStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
[data-bwo-spotlight] { position: relative; }
[data-bwo-spotlight]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  background: radial-gradient(
    var(--bwo-spotlight-size, 300px) circle at
    var(--bwo-spotlight-x, 50%) var(--bwo-spotlight-y, 50%),
    var(--bwo-spotlight-color, rgba(255,255,255,0.12)),
    transparent 70%
  );
}
[data-bwo-spotlight="active"]::before { opacity: 1; }
  `.trim();
  document.head.appendChild(style);
}

export function createSpotlight(
  target: Target,
  options: SpotlightOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  ensureStyle();
  const opts = { ...DEFAULTS, ...options };
  el.dataset.bwoSpotlight = '';
  el.style.setProperty('--bwo-spotlight-size', `${opts.size}px`);
  el.style.setProperty('--bwo-spotlight-color', opts.color);

  const quickX = gsap.quickTo(el, '--bwo-spotlight-x' as never, {
    duration: opts.duration,
    ease: opts.ease,
  });
  const quickY = gsap.quickTo(el, '--bwo-spotlight-y' as never, {
    duration: opts.duration,
    ease: opts.ease,
  });

  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect();
    quickX(e.clientX - rect.left);
    quickY(e.clientY - rect.top);
  };
  const onEnter = () => {
    el.dataset.bwoSpotlight = 'active';
  };
  const onLeave = () => {
    if (opts.hideOnLeave) el.dataset.bwoSpotlight = '';
  };

  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('pointerleave', onLeave);

  return {
    destroy() {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      delete el.dataset.bwoSpotlight;
      el.style.removeProperty('--bwo-spotlight-x');
      el.style.removeProperty('--bwo-spotlight-y');
      el.style.removeProperty('--bwo-spotlight-size');
      el.style.removeProperty('--bwo-spotlight-color');
    },
  };
}
