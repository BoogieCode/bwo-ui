'use client';

import { Button, IconButton, type IconButtonVariant, type Radius } from '@bwo-ui/react';

/* ─── Inline icons ─────────────────────────────────────────────────────── */

const Arrow = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
const Heart = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6.5 5.5 5.5 0 0 1 21.5 12c-2.5 4.65-9.5 9-9.5 9z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);
const Trash = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 7h14M10 7V4h4v3M6 7l1 13h10l1-13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Share = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─── 1. Variants ──────────────────────────────────────────────────────── */

const VARIANTS: { value: IconButtonVariant; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'ghost', label: 'Ghost' },
  { value: 'outline', label: 'Outline' },
  { value: 'solid', label: 'Solid' },
];

export function IconButtonVariantsDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 12 }}>
      {VARIANTS.map((v) => (
        <IconButton key={v.value} variant={v.value} aria-label={v.label}>
          {Arrow}
        </IconButton>
      ))}
    </div>
  );
}

/* ─── 2. Sizes ─────────────────────────────────────────────────────────── */

export function IconButtonSizesDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <IconButton size="sm" aria-label="Next">
        {Arrow}
      </IconButton>
      <IconButton aria-label="Next">{Arrow}</IconButton>
      <IconButton size="lg" aria-label="Next">
        {Arrow}
      </IconButton>
    </div>
  );
}

/* ─── 3. Corner radius ─────────────────────────────────────────────────── */

const RADII: Radius[] = ['none', 'sm', 'md', 'lg', 'pill'];

export function IconButtonRadiusDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 12 }}>
      {RADII.map((r) => (
        <IconButton key={r} radius={r} aria-label={`radius ${r}`}>
          {Plus}
        </IconButton>
      ))}
    </div>
  );
}

/* ─── 4. Toolbar pattern ───────────────────────────────────────────────── */

export function IconButtonToolbarDemo() {
  return (
    <div className="demo" style={{ flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
      <div
        role="toolbar"
        aria-label="Item actions"
        style={{ display: 'inline-flex', gap: 6 }}
      >
        <IconButton variant="ghost" size="sm" aria-label="Like">
          {Heart}
        </IconButton>
        <IconButton variant="ghost" size="sm" aria-label="Share">
          {Share}
        </IconButton>
        <IconButton variant="ghost" size="sm" aria-label="Delete">
          {Trash}
        </IconButton>
      </div>
    </div>
  );
}

/* ─── 5. Vs Button-with-icon (side-by-side) ────────────────────────────── */

export function IconButtonVsButtonDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>
          <strong style={{ color: 'var(--bwo-text)' }}>IconButton</strong> — square, label-less, for
          toolbars
        </span>
        <div style={{ display: 'inline-flex', gap: 6 }}>
          <IconButton variant="ghost" aria-label="Add">
            {Plus}
          </IconButton>
          <IconButton variant="ghost" aria-label="Delete">
            {Trash}
          </IconButton>
          <IconButton variant="ghost" aria-label="Share">
            {Share}
          </IconButton>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>
          <strong style={{ color: 'var(--bwo-text)' }}>Button leftIcon</strong> — rectangular, with
          a label
        </span>
        <div style={{ display: 'inline-flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="ghost" leftIcon={Plus}>
            Add item
          </Button>
          <Button variant="ghost" leftIcon={Trash}>
            Delete
          </Button>
          <Button variant="ghost" leftIcon={Share}>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
