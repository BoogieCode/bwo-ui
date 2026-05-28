# @bwo-ui/react

GSAP-powered animation components for React 18+.

## Install

```bash
pnpm add @bwo-ui/react gsap
```

`gsap` is a peer dependency; `@bwo-ui/core` is bundled in.

## Components

### SplitReveal

```tsx
import { SplitReveal } from '@bwo-ui/react';

<SplitReveal type="words,chars" stagger={0.02} from={{ y: 40, opacity: 0 }}>
  <h1>Motion that reads as craft.</h1>
</SplitReveal>
```

### Magnetic

```tsx
import { Magnetic } from '@bwo-ui/react';

<Magnetic strength={0.4} radius={140}>
  <button>Get started</button>
</Magnetic>
```

### Marquee

```tsx
import { Marquee } from '@bwo-ui/react';

<Marquee speed={120} direction="left" draggable>
  <span>One</span>
  <span>Two</span>
  <span>Three</span>
</Marquee>
```

### FlipList

```tsx
import { FlipList } from '@bwo-ui/react';
import { useState } from 'react';

const [items, setItems] = useState([1, 2, 3, 4]);
const shuffle = () => setItems((xs) => [...xs].sort(() => Math.random() - 0.5));

<>
  <button onClick={shuffle}>Shuffle</button>
  <FlipList flipKey={items.join(',')} duration={0.6}>
    {items.map((n) => <div key={n}>{n}</div>)}
  </FlipList>
</>
```

## Next.js

Every component is marked `'use client'`. Drop them into a Server Component freely.

## License

MIT
