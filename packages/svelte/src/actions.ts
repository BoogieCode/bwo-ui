import {
  createFlipList,
  createMagnetic,
  createMagneticCursor,
  createMarquee,
  createParallax,
  createScrambleText,
  createSplitReveal,
  type FlipListInstance,
  type FlipListOptions,
  type MagneticCursorOptions,
  type MagneticOptions,
  type MarqueeOptions,
  type ParallaxOptions,
  type ScrambleTextOptions,
  type SplitRevealOptions,
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

/**
 * Svelte action: animated layout shifts via GSAP Flip.
 *
 * ```svelte
 * <div use:flipList={{ flipKey: items.join(',') }}>
 *   {#each items as item (item)}
 *     <div>{item}</div>
 *   {/each}
 * </div>
 * ```
 */
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
