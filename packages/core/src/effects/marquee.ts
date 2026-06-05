import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export type MarqueeDirection = 'left' | 'right' | 'up' | 'down';

export interface MarqueeOptions {
  /** Pixels per second. Default: `80`. */
  speed?: number;
  /** Scroll direction. Default: `'left'`. */
  direction?: MarqueeDirection;
  /** Allow user to drag/throw. Default: `true`. */
  draggable?: boolean;
  /** Pause when the cursor is over the strip. Default: `true`. */
  pauseOnHover?: boolean;
  /**
   * Fade the marquee edges with a gradient mask. `true` uses a sensible
   * default width (48px); a number sets the fade width in pixels. The mask
   * axis follows the marquee direction (horizontal vs. vertical).
   * Default: `false`.
   */
  fade?: boolean | number;
  /** Selector for items inside the container. Default: `':scope > *'`. */
  itemSelector?: string;
}

const DEFAULTS = {
  speed: 80,
  direction: 'left' as MarqueeDirection,
  draggable: true,
  pauseOnHover: true,
  fade: false as boolean | number,
  itemSelector: ':scope > *',
};

const DEFAULT_FADE_PX = 48;

/**
 * Builds a seamless looping marquee.
 *
 * Requirements:
 * - `target` (container) must have `overflow: hidden`.
 * - Direct children are the items being scrolled.
 *
 * The factory clones items until the strip fills the container twice so the
 * loop is seamless regardless of how many items the user provides.
 */
export function createMarquee(target: Target, options: MarqueeOptions = {}): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const container = resolveTarget(target);
  if (!container || !(container instanceof HTMLElement)) return { destroy: () => {} };

  const opts = mergeOptions(DEFAULTS, options);
  const horizontal = opts.direction === 'left' || opts.direction === 'right';
  const sign = opts.direction === 'left' || opts.direction === 'up' ? -1 : 1;

  // We work in a track element so cloning + dragging doesn't fight the user's layout.
  const track = document.createElement('div');
  track.dataset.bwoMarqueeTrack = '';
  Object.assign(track.style, {
    display: horizontal ? 'flex' : 'block',
    flexDirection: horizontal ? 'row' : 'column',
    willChange: 'transform',
  });

  const items = Array.from(container.querySelectorAll<HTMLElement>(opts.itemSelector));
  items.forEach((item) => track.appendChild(item));
  container.appendChild(track);

  // Clone until track is at least 2x container size in scroll axis.
  const fill = () => {
    const containerSize = horizontal ? container.clientWidth : container.clientHeight;
    let trackSize = horizontal ? track.scrollWidth : track.scrollHeight;
    let guard = 0;
    while (trackSize < containerSize * 2 && guard < 50) {
      items.forEach((item) => track.appendChild(item.cloneNode(true)));
      trackSize = horizontal ? track.scrollWidth : track.scrollHeight;
      guard += 1;
    }
    return trackSize;
  };

  let totalSize = fill();
  const loopSize = totalSize / 2;
  const axis = horizontal ? 'x' : 'y';
  const duration = loopSize / opts.speed;

  const tween = gsap.to(track, {
    [axis]: sign * loopSize,
    duration,
    ease: 'none',
    repeat: -1,
    modifiers: {
      [axis]: gsap.utils.unitize((value: number) => {
        return ((value % (sign * loopSize)) + sign * loopSize) % (sign * loopSize);
      }, 'px'),
    },
  });

  let draggable: ReturnType<typeof Draggable.create>[0] | undefined;
  if (opts.draggable) {
    draggable = Draggable.create(track, {
      type: axis,
      inertia: true,
      onPressInit() {
        tween.pause();
      },
      onDragEnd() {
        tween.resume();
      },
      onThrowComplete() {
        tween.resume();
      },
    })[0];
  }

  const onEnter = () => tween.pause();
  const onLeave = () => tween.resume();
  if (opts.pauseOnHover) {
    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointerleave', onLeave);
  }

  // Edge-fade gradient mask. Axis follows the marquee direction.
  let prevMask: string | undefined;
  let prevWebkitMask: string | undefined;
  if (opts.fade) {
    const fadeWidth = typeof opts.fade === 'number' ? `${opts.fade}px` : `${DEFAULT_FADE_PX}px`;
    const gradientDir = horizontal ? 'to right' : 'to bottom';
    const maskImage = `linear-gradient(${gradientDir}, transparent, #000 ${fadeWidth}, #000 calc(100% - ${fadeWidth}), transparent)`;
    prevMask = container.style.maskImage;
    prevWebkitMask = container.style.webkitMaskImage;
    container.style.maskImage = maskImage;
    container.style.webkitMaskImage = maskImage;
  }

  // Touch InertiaPlugin so tree-shakers don't drop it when only this effect is used.
  void InertiaPlugin;

  return {
    destroy() {
      tween.kill();
      draggable?.kill();
      if (opts.pauseOnHover) {
        container.removeEventListener('pointerenter', onEnter);
        container.removeEventListener('pointerleave', onLeave);
      }
      if (opts.fade) {
        container.style.maskImage = prevMask ?? '';
        container.style.webkitMaskImage = prevWebkitMask ?? '';
      }
      // Move original items back out so the user's DOM is restored.
      while (track.firstChild) container.appendChild(track.firstChild);
      track.remove();
    },
    refresh() {
      tween.kill();
      // Rebuild on layout change.
      while (track.firstChild) container.appendChild(track.firstChild);
      track.remove();
    },
  };
}
