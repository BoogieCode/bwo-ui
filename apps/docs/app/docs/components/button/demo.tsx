'use client';

import {
  Button,
  ButtonGroup,
  Switch,
  type ButtonSize,
  type ButtonVariant,
  type Radius,
} from '@bwo-ui/react';
import { useEffect, useState } from 'react';

/* ─── Icons (inline SVG, no extra deps) ────────────────────────────────── */

const ArrowRight = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Plus = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
const Trash = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 7h14M10 7V4h4v3M6 7l1 13h10l1-13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Download = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── 1. Variants ──────────────────────────────────────────────────────── */

const VARIANTS: ButtonVariant[] = ['primary', 'green', 'yellow', 'ghost', 'outline', 'solid'];

export function ButtonVariantsDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      {VARIANTS.map((v) => (
        <Button key={v} variant={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
    </div>
  );
}

/* ─── 2. Sizes ─────────────────────────────────────────────────────────── */

const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

export function ButtonSizesDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 14 }}>
      {(['primary', 'outline', 'solid'] as ButtonVariant[]).map((v) => (
        <div
          key={v}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {SIZES.map((s) => (
            <Button key={s} variant={v} size={s}>
              {s.toUpperCase()}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── 3. Icons ─────────────────────────────────────────────────────────── */

export function ButtonIconsDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      <Button leftIcon={Plus}>New item</Button>
      <Button variant="outline" rightIcon={ArrowRight}>
        Continue
      </Button>
      <Button variant="ghost" leftIcon={Download}>
        Download
      </Button>
      <Button variant="solid" leftIcon={ArrowRight} iconBadge>
        Get started
      </Button>
    </div>
  );
}

/* ─── 4. Loading ───────────────────────────────────────────────────────── */

export function ButtonLoadingDemo() {
  const [loading, setLoading] = useState(true);
  const [autoOff, setAutoOff] = useState<number | null>(null);

  // Auto-toggle off after 1.5s when the user clicks to simulate a real request.
  useEffect(() => {
    if (autoOff === null) return;
    const id = window.setTimeout(() => {
      setLoading(false);
      setAutoOff(null);
    }, 1500);
    return () => window.clearTimeout(id);
  }, [autoOff]);

  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 18, alignItems: 'stretch' }}
    >
      <label
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          alignSelf: 'center',
          fontSize: 13,
        }}
      >
        <Switch checked={loading} onCheckedChange={setLoading} /> Loading
      </label>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        <Button variant="primary" loading={loading}>
          Save changes
        </Button>
        <Button variant="solid" loading={loading} leftIcon={ArrowRight} iconBadge>
          Submit
        </Button>
        <Button variant="ghost" loading={loading}>
          Refresh
        </Button>
        <Button
          variant="outline"
          loading={loading && autoOff !== null}
          onClick={() => {
            setLoading(true);
            setAutoOff(Date.now());
          }}
        >
          Click for 1.5 s spin
        </Button>
      </div>
    </div>
  );
}

/* ─── 5. Disabled ──────────────────────────────────────────────────────── */

export function ButtonDisabledDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      <Button disabled>Disabled primary</Button>
      <Button variant="outline" disabled>
        Disabled outline
      </Button>
      <Button variant="solid" disabled>
        Disabled solid
      </Button>
      <Button variant="ghost" disabled leftIcon={Trash}>
        Disabled ghost
      </Button>
    </div>
  );
}

/* ─── 6. Corner radius ─────────────────────────────────────────────────── */

const RADII: Radius[] = ['none', 'sm', 'md', 'lg', 'pill'];

export function ButtonRadiusDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      {RADII.map((r) => (
        <Button key={r} variant="primary" radius={r}>
          radius=&quot;{r}&quot;
        </Button>
      ))}
    </div>
  );
}

/* ─── 7. ButtonGroup ───────────────────────────────────────────────────── */

export function ButtonGroupDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 18, alignItems: 'stretch' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup>
          <Button variant="ghost">Day</Button>
          <Button variant="primary">Week</Button>
          <Button variant="ghost">Month</Button>
        </ButtonGroup>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup attached>
          <Button variant="outline">Bold</Button>
          <Button variant="outline">Italic</Button>
          <Button variant="outline">Underline</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

/* ─── 8. As link (polymorphism by composition) ─────────────────────────── */

export function ButtonAsLinkDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 10 }}>
      <a
        href="https://github.com/BoogieCode/bwo-ui"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Button variant="outline" rightIcon={ArrowRight}>
          GitHub
        </Button>
      </a>
      <a
        href="https://npmjs.com/package/@bwo-ui/react"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Button variant="primary">npm</Button>
      </a>
    </div>
  );
}

/* ─── 9. Click handler ─────────────────────────────────────────────────── */

export function ButtonClickDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 14 }}>
      <Button variant="primary" onClick={() => setCount((c) => c + 1)}>
        Click me
      </Button>
      <span style={{ fontSize: 13, color: 'var(--bwo-text-body)' }}>
        Clicked <strong style={{ color: 'var(--bwo-text)' }}>{count}</strong> time
        {count === 1 ? '' : 's'}
      </span>
    </div>
  );
}
