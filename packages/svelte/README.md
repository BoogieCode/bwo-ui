# @bwo-ui/svelte

Svelte 4 / Svelte 5 adapter for the bwo-ui kit — **15 GSAP-backed motion actions** you compose with `use:`, plus the **class-based UI library** you apply directly to your own Svelte markup.

> **Heads up**: native Svelte stateful components (Dialog, Popover, Select, Combobox, etc.) are on the roadmap. Today, anything stateful needs to be assembled from Svelte's primitives + the bwo-ui class names. The motion actions and the class kit are production-ready.

**Live demos**: [https://ui.boogie.ro](https://ui.boogie.ro)

## Install

```bash
npm  i   @bwo-ui/svelte gsap
# or: pnpm add @bwo-ui/svelte gsap
# or: yarn add @bwo-ui/svelte gsap
# or: bun  add @bwo-ui/svelte gsap
```

`gsap` is a peer dependency.

```ts
import '@bwo-ui/svelte/styles.css';
```

## Two ways to use it

### 1. Motion actions

Idiomatic Svelte — attach behaviour to elements with `use:` directives, no wrapper DOM.

```svelte
<script lang="ts">
  import { splitReveal, magnetic, marquee, flipList, tilt, ripple } from '@bwo-ui/svelte';
  import '@bwo-ui/svelte/styles.css';

  let items = $state([1, 2, 3, 4]);
  const shuffle = () => (items = [...items].sort(() => Math.random() - 0.5));
</script>

<h1 use:splitReveal={{ type: 'words,chars', stagger: 0.02 }}>
  Your shortcut to a beautiful UI.
</h1>

<button use:magnetic={{ strength: 0.4 }} use:ripple class="bwo-btn">
  Get started
</button>

<div use:marquee={{ speed: 120 }}>
  <span class="bwo-badge">One</span>
  <span class="bwo-badge">Two</span>
  <span class="bwo-badge">Three</span>
</div>

<button on:click={shuffle} class="bwo-btn bwo-btn--ghost">Shuffle</button>
<div use:flipList={{ flipKey: items.join(',') }} class="flip-grid">
  {#each items as n (n)}
    <div use:tilt={{ max: 8 }} class="flip-tile">{n}</div>
  {/each}
</div>
```

#### Action exports

`splitReveal` · `magnetic` · `marquee` · `flipList` · `parallax` · `scrambleText` · `magneticCursor` · `tilt` · `spotlight` · `scrollProgress` · `stagger` · `gradientText` · `ripple` · `blur` · `pin`

Each accepts the same option shape as its `@bwo-ui/core` factory.

### 2. UI styles via classes

For stateless UI (buttons, inputs, badges, cards, etc.), apply the bwo-ui class names directly to your own Svelte markup. There's no Svelte component wrapper needed — Svelte's templates already give you full control.

```svelte
<script lang="ts">
  import '@bwo-ui/svelte/styles.css';
</script>

<button class="bwo-btn">Primary</button>
<button class="bwo-btn bwo-btn--green">Green</button>
<button class="bwo-btn bwo-btn--ghost">Ghost</button>
<button class="bwo-btn bwo-btn--outline">Outline</button>

<input class="bwo-input" placeholder="Type something…" />
<textarea class="bwo-textarea" rows="3" />

<span class="bwo-badge bwo-badge--solid">New</span>
<span class="bwo-badge bwo-badge--soft">Beta</span>
<span class="bwo-badge bwo-badge--green">Live</span>

<div class="bwo-card">
  <h3 class="bwo-card-title">Title</h3>
  <p class="bwo-card-description">Description</p>
</div>
```

The full class catalogue lives at [ui.boogie.ro](https://ui.boogie.ro) — every component page documents the matching class names.

## Roadmap

Native Svelte 5 stateful components (Dialog, Popover, Tooltip, Select, Combobox, Tabs, Accordion, Toast) are planned for the next minor. For now, assemble them from Svelte's primitives + the bwo-ui CSS classes.

Track progress on [GitHub](https://github.com/BoogieCode/bwo-ui).

## License

MIT © [BOOGIE WOOGIE S.R.L.](https://boogie.ro)
