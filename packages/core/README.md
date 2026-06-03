# @bwo-ui/core

Framework-agnostic motion engine behind `@bwo-ui/react`, `@bwo-ui/vue`, and `@bwo-ui/svelte`. Ships every GSAP-backed factory as a pure function that takes a DOM element and an options object, returns an instance with `destroy()`.

Most users do not depend on this package directly — install the wrapper for your framework instead. Reach for `@bwo-ui/core` when you want to drive motion from a non-React / non-Vue / non-Svelte runtime (vanilla, Web Components, plain HTML) or when you're building your own framework adapter.

**Live demos & docs**: [https://ui.boogie.ro](https://ui.boogie.ro)

## Install

```bash
npm  i   @bwo-ui/core gsap
# or: pnpm add @bwo-ui/core gsap
# or: yarn add @bwo-ui/core gsap
# or: bun  add @bwo-ui/core gsap
```

`gsap` is a peer dependency.

## Usage

Every effect is a factory that returns an instance with `destroy()` (and optionally `refresh()`):

```ts
import { createSplitReveal, createTilt, createRipple } from '@bwo-ui/core';

const reveal = createSplitReveal('#headline', { type: 'words,chars', stagger: 0.02 });
const tilt = createTilt('#card', { max: 10, scale: 1.03 });
const ripple = createRipple('#cta', { color: 'rgba(255,255,255,0.4)' });

// On teardown
reveal.destroy();
tilt.destroy();
ripple.destroy();
```

All factories are SSR-safe — they no-op on the server.

## Exports

### Reveals
- `createSplitReveal(target, options)` — split text into words / chars and animate each
- `createReveal(target, options)` — clip-path entrance, four directions
- `createScrollReveal(target, options)` — scroll-triggered entrance with five flavours (lift, glide, pop, slide, mist)
- `createBlur(target, options)` — blur-up entrance
- `createStagger(target, options)` — sequence children by index
- `createCircleReveal(target, options)` — iris / circle wipe in either direction

### Scroll
- `createParallax(target, options)` — translate-Y on scroll
- `createPin(target, options)` — pin while scroll progress passes through
- `createScrollProgress(target, options)` — progress bar driven by scroll
- `createScrollMask(target, options)` — clip-path reveal scrubbed by scroll
- `createScrollVelocity(target, options)` — skew + scale driven by ScrollTrigger velocity
- `createScrollSnap(target, options)` — CSS scroll-snap container

### Text
- `createScrambleText(target, options)` — char scramble on hover
- `createTextDecode(target, options)` — per-character decode tween
- `createTextGlitch(target, options)` — glitchy displacement
- `createGradientText(target, options)` — animated gradient sweep
- `createCountUp(target, options)` — number ramp from A → B

### Interaction
- `createMagnetic(target, options)` — pointer-follow translation
- `createMagneticCursor(target, options)` — global cursor that snaps to data-attribute targets
- `createTilt(target, options)` — 3-D parallax based on cursor position
- `createSpotlight(target, options)` — radial-gradient that tracks the cursor
- `createRipple(target, options)` — Material-style click ripple
- `createMarquee(target, options)` — looping ticker
- `createFlipList(target, options)` → `{ capture, commit, flip, destroy }` — FLIP helpers for list reorder
- `createConfetti(target, options)` — DOM-based particle burst
- `createShake(target, options)` — decaying x/y oscillation

### Plugin registration
- `registerPlugins()` — lazy GSAP plugin registration; safe to call repeatedly

### Styles
- `import '@bwo-ui/core/styles.css'` — the design-token layer + base component CSS used by the framework wrappers

## License

MIT © [BOOGIE WOOGIE S.R.L.](https://boogie.ro)
