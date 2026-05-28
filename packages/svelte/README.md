# @bwo-ui/svelte

GSAP-powered motion and boogie-themed UI styles for Svelte 4 / Svelte 5.

## Install

```bash
pnpm add @bwo-ui/svelte gsap
```

## Two ways to use it

### 1. Motion actions

For animation primitives, this package ships **Svelte actions** — the idiomatic way to attach behavior to elements without extra wrapper DOM.

```svelte
<script lang="ts">
  import { splitReveal, magnetic, marquee, flipList } from '@bwo-ui/svelte';
  import '@bwo-ui/svelte/styles.css';

  let items = $state([1, 2, 3, 4]);
  const shuffle = () => (items = [...items].sort(() => Math.random() - 0.5));
</script>

<h1 use:splitReveal={{ type: 'words,chars', stagger: 0.02 }}>
  Motion that reads as craft.
</h1>

<button use:magnetic={{ strength: 0.4 }} class="bwo-btn">Get started</button>

<div use:marquee={{ speed: 120 }}>
  <span class="bwo-badge">One</span>
  <span class="bwo-badge">Two</span>
</div>

<button on:click={shuffle} class="bwo-btn bwo-btn--ghost">Shuffle</button>
<div use:flipList={{ flipKey: items.join(',') }} class="flip-grid">
  {#each items as n (n)}<div class="flip-tile">{n}</div>{/each}
</div>
```

### 2. UI styles via classes

For stateless UI (buttons, inputs, badges, cards, etc.), apply the bwo-ui class names directly to your own Svelte elements. There's no Svelte component wrapper needed — Svelte's templates already give you full control.

```svelte
<script lang="ts">
  import '@bwo-ui/svelte/styles.css';
</script>

<button class="bwo-btn">Primary</button>
<button class="bwo-btn bwo-btn--green">Green</button>
<button class="bwo-btn bwo-btn--ghost">Ghost</button>

<input class="bwo-input" placeholder="Type something…" />

<span class="bwo-badge bwo-badge--solid">New</span>

<div class="bwo-card">
  <h3 class="bwo-card-title">Title</h3>
  <p class="bwo-card-description">Description</p>
</div>
```

The full class catalog is documented at the [bwo-ui docs site](https://bwo-ui.dev/docs/components/button).

### Stateful components (Select, Checkbox, Switch, Slider)

For Radix-style stateful components with full accessibility, install [`bits-ui`](https://bits-ui.com) alongside and apply our class names:

```svelte
<script lang="ts">
  import { Switch } from 'bits-ui';
  import '@bwo-ui/svelte/styles.css';
</script>

<Switch.Root class="bwo-switch">
  <Switch.Thumb class="bwo-switch-thumb" />
</Switch.Root>
```

Native Svelte components with these primitives built in are planned for **v0.3** — track [the roadmap on GitHub](https://github.com/BoogieCode/bwo-ui).

## License

MIT
