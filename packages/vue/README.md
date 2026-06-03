# @bwo-ui/vue

Vue 3 adapter for the bwo-ui kit — most of the `@bwo-ui/react` surface mirrored as native Vue 3 components and composables. ~70 components covering motion, forms, overlays, layout, and navigation.

> **Heads up**: the React side is the most current of the three adapters. Vue currently lags by a release — 0.6 / 0.7 additions (CircleReveal, ScrollReveal, ScrollMask, ScrollVelocity, ScrollSnap, PageIris, ColorPicker, FileUpload, PinInput, TimePicker, TagInput, HoverCard, SegmentedControl, Confetti, Shake, Squircle, and more) are landing in upcoming minors. Track the roadmap on GitHub.

**Live demos**: [https://ui.boogie.ro](https://ui.boogie.ro)

## Install

```bash
npm  i   @bwo-ui/vue gsap
# or: pnpm add @bwo-ui/vue gsap
# or: yarn add @bwo-ui/vue gsap
# or: bun  add @bwo-ui/vue gsap
```

`gsap` is a peer dependency. `@bwo-ui/core` ships bundled.

```ts
import '@bwo-ui/core/styles.css';
```

## What's in the adapter

### Motion (23)
SplitReveal · Magnetic · Marquee · FlipList · Parallax · Reveal · CountUp · ScrambleText · TextGlitch · MagneticCursor · Tilt · Spotlight · ScrollProgress · Stagger · GradientText · Ripple · Blur · Pin · Spin · Pulse · Glow · Lean · MediaZoom

### Forms
Button · IconButton · Input · Textarea · NumberInput · Rate · Select · Checkbox · Switch · Slider · RadioGroup · FormField

### Display
Badge · Card · Avatar · AvatarGroup · Skeleton · Progress · Alert · Stat · StatGroup · Separator · AppShell · BrandMark

### Layout & navigation
SimpleGrid · Grid · GridItem · Breadcrumb · Pagination · Stepper · Step · Timeline · FloatingActionButton (FAB) · BottomNavigation · Carousel

### Overlays
Dialog · Popover · Tooltip · Sheet · Tabs · Accordion

## Quick example

```vue
<script setup lang="ts">
import { SplitReveal, Tilt, Button, Card, CardHeader, CardTitle } from '@bwo-ui/vue';
import '@bwo-ui/core/styles.css';
</script>

<template>
  <Tilt :max="10" :scale="1.03">
    <Card>
      <CardHeader>
        <CardTitle>
          <SplitReveal type="words,chars" :stagger="0.02">
            Ship the boogie
          </SplitReveal>
        </CardTitle>
      </CardHeader>
      <Button variant="solid">Start free</Button>
    </Card>
  </Tilt>
</template>
```

## What's not here yet

Mirroring the latest React additions. Until those land in Vue, you can:

- Drop in the React component via a thin wrapper if your stack supports both
- Apply the bwo-ui CSS classes (`bwo-btn`, `bwo-input`, etc.) directly to your Vue markup — they work without a wrapper
- Open an issue on GitHub if a specific component is blocking you and we'll prioritise

## License

MIT © [BOOGIE WOOGIE S.R.L.](https://boogie.ro)
