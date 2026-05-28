import { registerPlugins, ScrollTrigger } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface PinOptions {
  /** ScrollTrigger start. Default: `'top top'`. */
  start?: string;
  /**
   * ScrollTrigger end — accepts any ScrollTrigger end value, including
   * `'+=500'`, an absolute position, or a function. Default: `'+=100%'`.
   */
  end?: string;
  /** Pin spacing (creates padding so following content doesn't jump). Default: `true`. */
  pinSpacing?: boolean;
  /** Pin only on screens wider than this CSS query. Default: matches all. */
  enableMedia?: string;
  /** Anticipate pin distance in px (smoother on fast scroll). Default: `0`. */
  anticipatePin?: number;
}

const DEFAULTS = {
  start: 'top top',
  end: '+=100%',
  pinSpacing: true,
  anticipatePin: 0,
};

/**
 * Thin ergonomic wrapper around ScrollTrigger's `pin` option. Pins the target
 * to the viewport between the configured start/end positions.
 *
 * For more complex pin-and-animate flows, build your own ScrollTrigger;
 * this exists for the common case ("keep this section visible while the next
 * scrolls in").
 */
export function createPin(target: Target, options: PinOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  if (options.enableMedia && !window.matchMedia(options.enableMedia).matches) {
    return { destroy: () => {} };
  }

  const opts = { ...DEFAULTS, ...options };

  const trigger = ScrollTrigger.create({
    trigger: el,
    start: opts.start,
    end: opts.end,
    pin: true,
    pinSpacing: opts.pinSpacing,
    anticipatePin: opts.anticipatePin,
  });

  return {
    destroy() {
      trigger.kill();
    },
    refresh() {
      ScrollTrigger.refresh();
    },
  };
}
