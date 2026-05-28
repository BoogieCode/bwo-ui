import {
  createBlur,
  createFlipList,
  createGradientText,
  createMagnetic,
  createMagneticCursor,
  createMarquee,
  createParallax,
  createPin,
  createRipple,
  createScrambleText,
  createScrollProgress,
  createSpotlight,
  createSplitReveal,
  createStagger,
  createTilt,
  type BlurOptions,
  type FlipListInstance,
  type FlipListOptions,
  type GradientTextOptions,
  type MagneticCursorOptions,
  type MagneticOptions,
  type MarqueeOptions,
  type ParallaxOptions,
  type PinOptions,
  type RippleOptions,
  type ScrambleTextOptions,
  type ScrollProgressOptions,
  type SpotlightOptions,
  type SplitRevealOptions,
  type StaggerOptions,
  type TiltOptions,
} from '@bwo-ui/core';

type Action<P> = (node: HTMLElement, params?: P) => {
  update?: (params?: P) => void;
  destroy?: () => void;
};

/**
 * Svelte action: text reveal on scroll.
 *
 * ```svelte
 * <h1 use:splitReveal={{ type: 'words', stagger: 0.03 }}>Hello</h1>
 * ```
 */
export const splitReveal: Action<SplitRevealOptions> = (node, params) => {
  let instance = createSplitReveal(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createSplitReveal(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Svelte action: pointer-following magnetic element.
 *
 * ```svelte
 * <button use:magnetic={{ strength: 0.4 }}>Click</button>
 * ```
 */
export const magnetic: Action<MagneticOptions> = (node, params) => {
  let instance = createMagnetic(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createMagnetic(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Svelte action: infinite seamless marquee.
 *
 * ```svelte
 * <div use:marquee={{ speed: 120, direction: 'left' }}>
 *   <span>One</span><span>Two</span>
 * </div>
 * ```
 */
export const marquee: Action<MarqueeOptions> = (node, params) => {
  let instance = createMarquee(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createMarquee(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

export interface FlipListActionParams extends FlipListOptions {
  /** Whenever this value changes, FlipList captures-then-commits an animation. */
  flipKey: string | number;
}

/** Svelte action: scroll-linked parallax translate. */
export const parallax: Action<ParallaxOptions> = (node, params) => {
  let instance = createParallax(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createParallax(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/** Svelte action: matrix-style text scramble. */
export const scrambleText: Action<ScrambleTextOptions> = (node, params) => {
  let instance = createScrambleText(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createScrambleText(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Custom cursor — mount once on a root element (e.g. `<body>` via a layout
 * action). Renders nothing visible itself; appends a styled dot to <body>.
 *
 * ```svelte
 * <svelte:body use:magneticCursor={{ color: '#ff481f' }} />
 * ```
 */
export const magneticCursor: Action<MagneticCursorOptions> = (_node, params) => {
  let instance = createMagneticCursor(params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createMagneticCursor(next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

export const flipList: Action<FlipListActionParams> = (node, params) => {
  let instance: FlipListInstance = createFlipList(node, params ?? ({} as FlipListOptions));
  let lastKey = params?.flipKey;

  return {
    update(next) {
      const nextKey = next?.flipKey;
      if (nextKey !== lastKey) {
        instance.capture();
        // Svelte will have just applied the DOM change before `update` runs,
        // so commit on the next microtask to ensure DOM is settled.
        queueMicrotask(() => instance.commit());
        lastKey = nextKey;
      }
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Svelte action: 3D mouse-tilt card.
 *
 * ```svelte
 * <div use:tilt={{ max: 12, scale: 1.03 }}>...</div>
 * ```
 */
export const tilt: Action<TiltOptions> = (node, params) => {
  let instance = createTilt(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createTilt(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Svelte action: cursor-following radial spotlight overlay.
 *
 * ```svelte
 * <div use:spotlight={{ size: 360, color: 'rgba(255,255,255,.18)' }}>...</div>
 * ```
 */
export const spotlight: Action<SpotlightOptions> = (node, params) => {
  let instance = createSpotlight(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createSpotlight(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Svelte action: scroll-progress indicator (scale-x with page scroll).
 *
 * ```svelte
 * <div class="progress-bar" use:scrollProgress />
 * ```
 */
export const scrollProgress: Action<ScrollProgressOptions> = (node, params) => {
  let instance = createScrollProgress(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createScrollProgress(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Svelte action: stagger-in children on scroll.
 *
 * ```svelte
 * <ul use:stagger={{ stagger: 0.08 }}>
 *   {#each items as item} <li>{item}</li> {/each}
 * </ul>
 * ```
 */
export const stagger: Action<StaggerOptions> = (node, params) => {
  let instance = createStagger(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createStagger(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Svelte action: animated gradient text fill.
 *
 * ```svelte
 * <h1 use:gradientText={{ duration: 4 }}>Hello</h1>
 * ```
 */
export const gradientText: Action<GradientTextOptions> = (node, params) => {
  let instance = createGradientText(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createGradientText(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Svelte action: Material-style click ripple.
 *
 * ```svelte
 * <button use:ripple>Tap</button>
 * ```
 */
export const ripple: Action<RippleOptions> = (node, params) => {
  let instance = createRipple(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createRipple(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Svelte action: scroll-driven blur reveal.
 *
 * ```svelte
 * <img src="..." use:blur={{ from: 24, fade: true }} />
 * ```
 */
export const blur: Action<BlurOptions> = (node, params) => {
  let instance = createBlur(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createBlur(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};

/**
 * Svelte action: pin a section between two scroll positions.
 *
 * ```svelte
 * <section use:pin={{ end: '+=200%' }}>...</section>
 * ```
 */
export const pin: Action<PinOptions> = (node, params) => {
  let instance = createPin(node, params ?? {});
  return {
    update(next) {
      instance.destroy();
      instance = createPin(node, next ?? {});
    },
    destroy() {
      instance.destroy();
    },
  };
};
