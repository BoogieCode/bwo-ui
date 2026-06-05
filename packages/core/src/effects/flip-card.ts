import { gsap } from 'gsap';
import { registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, mergeOptions, resolveTarget } from '../types';

export interface FlipCardOptions {
  /** What triggers the flip. Default: `'hover'`. */
  trigger?: 'hover' | 'click';
  /** Rotation axis. `'y'` flips horizontally, `'x'` flips vertically. Default: `'y'`. */
  axis?: 'x' | 'y';
  /** Flip duration in seconds. Default: `0.6`. */
  duration?: number;
  /** GSAP ease. Default: `'power2.inOut'`. */
  ease?: string;
  /** Perspective in px for the 3D scene. Default: `1000`. */
  perspective?: number;
}

const DEFAULTS = {
  trigger: 'hover' as 'hover' | 'click',
  axis: 'y' as 'x' | 'y',
  duration: 0.6,
  ease: 'power2.inOut',
  perspective: 1000,
};

/**
 * 3D flip card — a container with two direct children (front face, back face)
 * that flips to reveal the back. The container becomes the 3D scene, an inner
 * wrapper holds the rotation (`preserve-3d`), and both faces are stacked and
 * `backface-hidden` so only one is visible at a time. The back face is
 * pre-rotated 180deg so it reads correctly once flipped.
 *
 * Markup expected:
 *
 *   <div> (target)
 *     <div class="bwo-flipcard-face">…front…</div>
 *     <div class="bwo-flipcard-face">…back…</div>
 *   </div>
 *
 * Required CSS (auto-injected once when first instance mounts):
 *
 *   [data-bwo-flipcard] { position: relative; }
 *   [data-bwo-flipcard] > .bwo-flipcard-inner {
 *     position: relative; width: 100%; height: 100%;
 *     transform-style: preserve-3d;
 *   }
 *   .bwo-flipcard-face {
 *     position: absolute; inset: 0;
 *     backface-visibility: hidden;
 *   }
 */
const STYLE_ID = 'bwo-flipcard-style';

function ensureStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
[data-bwo-flipcard] { position: relative; }
[data-bwo-flipcard] > .bwo-flipcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.bwo-flipcard-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
  `.trim();
  document.head.appendChild(style);
}

export function createFlipCard(
  target: Target,
  options: FlipCardOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  // Need two direct children to act as faces.
  const front = el.children[0];
  const back = el.children[1];
  if (
    !(front instanceof HTMLElement) ||
    !(back instanceof HTMLElement)
  ) {
    return { destroy: () => {} };
  }

  ensureStyle();
  const opts = mergeOptions(DEFAULTS, options);
  const prop = opts.axis === 'x' ? 'rotationX' : 'rotationY';

  // Wrap the two faces in an inner preserve-3d wrapper so the container itself
  // stays the static 3D scene.
  const inner = document.createElement('div');
  inner.className = 'bwo-flipcard-inner';
  // Move existing children into the wrapper.
  inner.appendChild(front);
  inner.appendChild(back);
  el.appendChild(inner);

  front.classList.add('bwo-flipcard-face');
  back.classList.add('bwo-flipcard-face');

  // Preserve any inline styles we touch so destroy() can restore them.
  const previousPerspective = el.style.perspective;
  el.dataset.bwoFlipcard = '';
  el.style.perspective = `${opts.perspective}px`;

  // Pre-rotate the back face so it faces away initially and reads correctly
  // once the inner wrapper rotates 180deg.
  gsap.set(back, { [prop]: 180 });

  let flipped = false;

  const setFlip = (state: boolean) => {
    if (state === flipped) return;
    flipped = state;
    gsap.to(inner, {
      [prop]: state ? 180 : 0,
      duration: opts.duration,
      ease: opts.ease,
      overwrite: 'auto',
    });
  };

  const onEnter = () => setFlip(true);
  const onLeave = () => setFlip(false);
  const onClick = () => setFlip(!flipped);

  if (opts.trigger === 'click') {
    el.addEventListener('click', onClick);
  } else {
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
  }

  return {
    destroy() {
      if (opts.trigger === 'click') {
        el.removeEventListener('click', onClick);
      } else {
        el.removeEventListener('pointerenter', onEnter);
        el.removeEventListener('pointerleave', onLeave);
      }
      gsap.set([inner, front, back], {
        clearProps: 'rotationX,rotationY,transform',
      });
      front.classList.remove('bwo-flipcard-face');
      back.classList.remove('bwo-flipcard-face');
      // Unwrap: move faces back out and drop the inner wrapper.
      el.appendChild(front);
      el.appendChild(back);
      if (inner.parentNode === el) el.removeChild(inner);
      delete el.dataset.bwoFlipcard;
      el.style.perspective = previousPerspective;
    },
  };
}
