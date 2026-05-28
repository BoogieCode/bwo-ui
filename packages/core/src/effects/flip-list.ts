import { Flip, gsap, registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface FlipListOptions {
  /** Selector for the items inside the container. Default: `':scope > *'`. */
  itemSelector?: string;
  /** Tween duration. Default: `0.5`. */
  duration?: number;
  /** GSAP ease. Default: `'power2.inOut'`. */
  ease?: string;
  /** Stagger between items. Default: `0.03`. */
  stagger?: number;
  /** Use absolute positioning during flip — better for grids that resize. Default: `false`. */
  absolute?: boolean;
}

export interface FlipListInstance extends MotionInstance {
  /**
   * Capture current state, then call your DOM mutation, then call commit().
   * Or: pass a mutate fn and we'll capture → run → animate atomically.
   */
  capture: () => void;
  commit: () => void;
  flip: (mutate: () => void) => void;
}

const DEFAULTS = {
  itemSelector: ':scope > *',
  duration: 0.5,
  ease: 'power2.inOut',
  stagger: 0.03,
  absolute: false,
};

export function createFlipList(target: Target, options: FlipListOptions = {}): FlipListInstance {
  const noop: FlipListInstance = {
    destroy: () => {},
    capture: () => {},
    commit: () => {},
    flip: (mutate) => mutate(),
  };
  if (!isBrowser()) return noop;
  registerPlugins();

  const container = resolveTarget(target);
  if (!container || !(container instanceof HTMLElement)) return noop;

  const opts = { ...DEFAULTS, ...options };
  let state: ReturnType<typeof Flip.getState> | null = null;
  let activeTween: gsap.core.Tween | gsap.core.Timeline | null = null;

  const items = () => container.querySelectorAll<HTMLElement>(opts.itemSelector);

  const capture = () => {
    state = Flip.getState(items(), { props: 'opacity,backgroundColor,color' });
  };

  const commit = () => {
    if (!state) return;
    activeTween?.kill();
    activeTween = Flip.from(state, {
      duration: opts.duration,
      ease: opts.ease,
      stagger: opts.stagger,
      absolute: opts.absolute,
    }) as gsap.core.Timeline;
    state = null;
  };

  const flip = (mutate: () => void) => {
    capture();
    mutate();
    commit();
  };

  return {
    capture,
    commit,
    flip,
    destroy() {
      activeTween?.kill();
      activeTween = null;
      state = null;
    },
  };
}
