# @bwo-ui/react

100+ motion-first React 18 components — every primitive owned end-to-end. Dialog, Popover, Combobox, DataTable, Calendar, Toast, ColorPicker, FileUpload, PinInput, TimePicker, TagInput, HoverCard, SegmentedControl, StepIndicator — all written in-house, no headless library underneath. Pair with the GSAP-backed motion kit (Tilt, Ripple, Pulse, CircleReveal, ScrollReveal, ScrollMask, ScrollVelocity, Parallax, SplitReveal, Marquee, TextDecode, TextShimmer, Confetti, Shake) and theme with 40+ CSS custom properties.

**Live demos**: [https://ui.boogie.ro](https://ui.boogie.ro) — every component below has a playground page with a live demo, usage snippet, and props table.

## Install

```bash
npm  i   @bwo-ui/react gsap
# or: pnpm add @bwo-ui/react gsap
# or: yarn add @bwo-ui/react gsap
# or: bun  add @bwo-ui/react gsap
```

`gsap` is a peer dependency — only loaded when you actually reach for a motion primitive. `@bwo-ui/core` ships bundled.

Then import the stylesheet once at the entry of your app:

```ts
import '@bwo-ui/core/styles.css';
```

## What's in the kit

### Layout & display
AppShell · Container · AspectRatio · Glow · SimpleGrid · Grid · ScrollArea · Separator · Card · Button · IconButton · FloatingActionButton · Badge · Chip · Avatar · Kbd · Code · Stat · Timeline

### Forms
Input · Textarea · NumberInput · PasswordInput · PinInput · TagInput · Select · Combobox · Checkbox · RadioGroup · Switch · Slider · Rate · ColorPicker · FileUpload · Calendar · DatePicker · TimePicker · Stepper

### Data
DataTable · Command

### Overlays
Dialog · Sheet · Popover · HoverCard · Tooltip · Toast · DropdownMenu · ContextMenu · Portal

### Navigation
Tabs · SegmentedControl · Accordion · Collapsible · Breadcrumb · Pagination · BottomNavigation · Carousel · StepIndicator

### Feedback
Spinner · DotLoader · Skeleton · Progress · Alert · Banner · Empty

### Motion
SplitReveal · Reveal · ScrollReveal · Blur · Stagger · ScrollProgress · ScrollMask · ScrollVelocity · ScrollSnap · CircleReveal · PageIris · Parallax · Pin · Typewriter · ScrambleText · TextDecode · TextShimmer · TextGlitch · GradientText · CountUp · Spin · Pulse · Shake · Confetti · Preanimate · BootScreen

### Interaction
Magnetic · MagneticCursor · Tilt · Lean · Spotlight · Ripple · MediaZoom · Squircle · Marquee · FlipList

### Utility
VisuallyHidden · Portal

## Quick example

```tsx
import { Button, Card, CardHeader, CardTitle, ScrollReveal } from '@bwo-ui/react';
import '@bwo-ui/core/styles.css';

export function Hero() {
  return (
    <ScrollReveal flavor="lift" duration={0.9}>
      <Card>
        <CardHeader>
          <CardTitle>Ship the boogie</CardTitle>
        </CardHeader>
        <Button variant="solid">Start free</Button>
      </Card>
    </ScrollReveal>
  );
}
```

## Theming

Override CSS custom properties — every primitive reads from the same token layer:

```css
:root {
  --bwo-text: #0a0a0a;
  --bwo-accent: #ff481f;
  --bwo-radius-md: 12px;
}

:root.boo-dark {
  --bwo-text: #ffffff;
  --bwo-surface: #0a0a0a;
}
```

No `<ThemeProvider>` wrapper required.

## Next.js

Every component is marked `'use client'` where it needs to be. Drop them into Server Components freely — the wrapper handles the boundary.

## License

MIT © [BOOGIE WOOGIE S.R.L.](https://boogie.ro)
