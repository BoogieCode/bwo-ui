# @bwo-ui/vue

GSAP-powered animation components for Vue 3.

## Install

```bash
pnpm add @bwo-ui/vue gsap
```

## Components

```vue
<script setup lang="ts">
import { SplitReveal, Magnetic, Marquee, FlipList } from '@bwo-ui/vue';
import { ref } from 'vue';

const items = ref([1, 2, 3, 4]);
const shuffle = () => (items.value = [...items.value].sort(() => Math.random() - 0.5));
</script>

<template>
  <SplitReveal type="words,chars" :stagger="0.02">
    <h1>Motion that reads as craft.</h1>
  </SplitReveal>

  <Magnetic :strength="0.4">
    <button>Get started</button>
  </Magnetic>

  <Marquee :speed="120" direction="left">
    <span>One</span><span>Two</span><span>Three</span>
  </Marquee>

  <button @click="shuffle">Shuffle</button>
  <FlipList :flip-key="items.join(',')" :duration="0.6">
    <div v-for="n in items" :key="n">{{ n }}</div>
  </FlipList>
</template>
```

## License

MIT
