# @bwo-ui/core

Framework-agnostic GSAP motion factories. Used internally by `@bwo-ui/react`, `@bwo-ui/vue`, and `@bwo-ui/svelte`.

Most users do not depend on this package directly — install the wrapper for your framework instead.

## Install

```bash
pnpm add @bwo-ui/core gsap
```

`gsap` is a peer dependency.

## API

Every effect is a factory that returns an object with `destroy()`:

```ts
import { createSplitReveal } from '@bwo-ui/core';

const reveal = createSplitReveal('#heading', { type: 'words', stagger: 0.04 });
// later, e.g. on unmount:
reveal.destroy();
```

### Exports

- `createSplitReveal(target, options)`
- `createMagnetic(target, options)`
- `createMarquee(target, options)`
- `createFlipList(target, options)` → returns `{ capture, commit, flip, destroy }`
- `registerPlugins()` — lazy plugin registration; safe to call repeatedly

All factories are SSR-safe (no-op on the server).
