import { gsap, registerPlugins } from '../register';
import type { MotionInstance, Target } from '../types';
import { isBrowser, resolveTarget } from '../types';

export interface GradientTextOptions {
  /** CSS gradient (no `background-image:` prefix). Default: a vivid 3-stop sweep. */
  gradient?: string;
  /** Duration of one full cycle in seconds. Default: `6`. */
  duration?: number;
  /** Angle of the linear gradient in degrees. Default: `90`. */
  angle?: number;
  /** Size of the background as a percentage (>100% to enable scrolling fill). Default: `300`. */
  size?: number;
  /** Direction the gradient flows. Default: `'right'`. */
  direction?: 'left' | 'right';
  /** When false, the gradient holds its initial position (no animation). Default: `true`. */
  animate?: boolean;
}

const DEFAULTS = {
  gradient: 'linear-gradient(90deg, #ff481f, #ff9d00, #ff481f)',
  duration: 6,
  angle: 90,
  size: 300,
  direction: 'right' as const,
  animate: true,
};

/**
 * Animated gradient text fill. Sets background-clip: text + applies a wide
 * gradient that scrolls horizontally on a loop.
 *
 * Caller is responsible for sizing/typography. Color is forced to transparent
 * so the gradient shows through.
 */
export function createGradientText(
  target: Target,
  options: GradientTextOptions = {},
): MotionInstance {
  if (!isBrowser()) return { destroy: () => {} };
  registerPlugins();

  const el = resolveTarget(target);
  if (!el || !(el instanceof HTMLElement)) return { destroy: () => {} };

  const opts = { ...DEFAULTS, ...options };
  // Replace angle inside the user gradient only if they passed a custom angle
  // AND used the default gradient. Otherwise honor the gradient string as-is.
  const gradient =
    options.gradient || options.angle === undefined
      ? opts.gradient
      : opts.gradient.replace(/(\d+)deg/, `${opts.angle}deg`);

  const previous = {
    backgroundImage: el.style.backgroundImage,
    backgroundSize: el.style.backgroundSize,
    backgroundClip: el.style.backgroundClip,
    webkitBackgroundClip: el.style.webkitBackgroundClip,
    color: el.style.color,
    webkitTextFillColor: el.style.webkitTextFillColor,
    backgroundPosition: el.style.backgroundPosition,
  };

  el.style.backgroundImage = gradient;
  el.style.backgroundSize = `${opts.size}% 100%`;
  el.style.backgroundClip = 'text';
  el.style.webkitBackgroundClip = 'text';
  el.style.color = 'transparent';
  el.style.webkitTextFillColor = 'transparent';
  el.style.backgroundPosition = opts.direction === 'right' ? '0% 50%' : '100% 50%';

  const tween = opts.animate
    ? gsap.to(el, {
        backgroundPosition: opts.direction === 'right' ? '200% 50%' : '-100% 50%',
        duration: opts.duration,
        ease: 'none',
        repeat: -1,
      })
    : null;

  return {
    destroy() {
      tween?.kill();
      el.style.backgroundImage = previous.backgroundImage;
      el.style.backgroundSize = previous.backgroundSize;
      el.style.backgroundClip = previous.backgroundClip;
      el.style.webkitBackgroundClip = previous.webkitBackgroundClip;
      el.style.color = previous.color;
      el.style.webkitTextFillColor = previous.webkitTextFillColor;
      el.style.backgroundPosition = previous.backgroundPosition;
    },
  };
}
