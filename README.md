# bwo-ui

> GSAP-powered animation components for React, Vue, and Svelte.

`bwo-ui` is a tiny set of motion primitives — scroll reveals, magnetic buttons, marquees, animated layout shifts — built on top of GSAP and shipped once for every framework you might use.

```bash
# react
pnpm add @bwo-ui/react gsap

# vue
pnpm add @bwo-ui/vue gsap

# svelte
pnpm add @bwo-ui/svelte gsap
```

GSAP is a peer dependency — install it once in your app.

## Packages

| Package | Purpose |
| --- | --- |
| [`@bwo-ui/core`](./packages/core) | Framework-agnostic GSAP factories. Every component is implemented here once. |
| [`@bwo-ui/react`](./packages/react) | React 18+ wrappers (`<SplitReveal>`, `<Magnetic>`, `<Marquee>`, `<FlipList>`). |
| [`@bwo-ui/vue`](./packages/vue) | Vue 3 components + composables. |
| [`@bwo-ui/svelte`](./packages/svelte) | Svelte 5 components (runes-based). |

## Components (v0.1.0)

- **SplitReveal** — character/word/line reveals on scroll (SplitText + ScrollTrigger)
- **Magnetic** — pointer-following button or element
- **Marquee** — infinite draggable marquee strip (Observer + Inertia)
- **FlipList** — animated list reorder (Flip)

## Quick start (React)

```tsx
import { SplitReveal, Magnetic } from '@bwo-ui/react';

export function Hero() {
  return (
    <section>
      <SplitReveal type="words" stagger={0.05}>
        <h1>Motion that reads as craft.</h1>
      </SplitReveal>

      <Magnetic strength={0.4}>
        <button>Get started</button>
      </Magnetic>
    </section>
  );
}
```

## Development

```bash
pnpm install
pnpm dev          # runs all packages + docs in watch mode
pnpm build        # builds every package
pnpm test         # runs Vitest across packages
pnpm typecheck    # tsc --noEmit across packages
```

## Repo layout

```
bwo-ui/
├── packages/
│   ├── core/      @bwo-ui/core
│   ├── react/     @bwo-ui/react
│   ├── vue/       @bwo-ui/vue
│   └── svelte/    @bwo-ui/svelte
└── apps/
    └── docs/      docs site (Next.js)
```

## Releasing

We use [Changesets](https://github.com/changesets/changesets).

```bash
pnpm changeset            # describe your change
pnpm version-packages     # bump versions
pnpm release              # build & publish to npm
```

## License

MIT © [BOOGIE WOOGIE S.R.L.](https://boogie.ro)
