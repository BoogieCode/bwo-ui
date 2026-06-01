'use client';

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  Separator,
  type SeparatorSize,
  type SeparatorTone,
  type SeparatorVariant,
} from '@bwo-ui/react';

/* ─── 1. Hero (mix of horizontal + vertical + labelled) ────────────────── */

export function SeparatorDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 16, alignItems: 'stretch' }}>
      <div>Section A</div>
      <Separator />
      <div>Section B</div>
      <Separator label="Or" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center' }}>
        <span>Item 1</span>
        <Separator orientation="vertical" style={{ height: 18 }} />
        <span>Item 2</span>
        <Separator orientation="vertical" style={{ height: 18 }} />
        <span>Item 3</span>
      </div>
    </div>
  );
}

/* ─── 2. Variants ──────────────────────────────────────────────────────── */

const VARIANTS: SeparatorVariant[] = ['solid', 'dashed', 'dotted'];

export function SeparatorVariantsDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 22, alignItems: 'stretch' }}>
      {VARIANTS.map((v) => (
        <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>variant={v}</code>
          <Separator variant={v} />
        </div>
      ))}
    </div>
  );
}

/* ─── 3. Sizes ─────────────────────────────────────────────────────────── */

const SIZES: SeparatorSize[] = ['sm', 'md', 'lg'];

export function SeparatorSizesDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 22, alignItems: 'stretch' }}>
      {SIZES.map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>size={s}</code>
          <Separator size={s} />
        </div>
      ))}
    </div>
  );
}

/* ─── 4. Tones ─────────────────────────────────────────────────────────── */

const TONES: SeparatorTone[] = ['default', 'muted', 'strong'];

export function SeparatorTonesDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 22, alignItems: 'stretch' }}>
      {TONES.map((t) => (
        <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>tone={t}</code>
          <Separator tone={t} size="md" />
        </div>
      ))}
    </div>
  );
}

/* ─── 5. Labelled ──────────────────────────────────────────────────────── */

export function SeparatorLabelDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 22, alignItems: 'stretch' }}>
      <Separator label="Or continue with" />
      <Separator label="Today" labelAlign="start" />
      <Separator label="2026" labelAlign="end" tone="muted" />
      <Separator label="Dashed group" variant="dashed" size="md" />
    </div>
  );
}

/* ─── 6. Spacing ───────────────────────────────────────────────────────── */

export function SeparatorSpacingDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <p style={{ margin: 0, color: 'var(--bwo-text-body)', fontSize: 13 }}>
        Block above the separator.
      </p>
      <Separator spacing="lg" />
      <p style={{ margin: 0, color: 'var(--bwo-text-body)', fontSize: 13 }}>
        Block below the separator. With <code>spacing=&quot;lg&quot;</code> the gap is 24 px on
        each side, no wrapper margins required.
      </p>
    </div>
  );
}

/* ─── 7. Auth recipe — sign-in methods divider ─────────────────────────── */

export function SeparatorAuthDemo() {
  return (
    <div className="demo" style={{ padding: 24 }}>
      <div style={{ maxWidth: 320, width: '100%' }}>
        <Card>
          <CardHeader>
            <CardTitle>Sign in to Boogie</CardTitle>
          </CardHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
            <Button variant="outline">Continue with GitHub</Button>
            <Button variant="outline">Continue with Google</Button>
          </div>
          <Separator label="Or" spacing="md" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input
              placeholder="you@boogie.ro"
              className="bwo-input"
              aria-label="Email"
              style={{ width: '100%' }}
            />
            <Button variant="primary">Send magic link</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ─── 8. Toolbar recipe — vertical separators between groups ───────────── */

export function SeparatorToolbarDemo() {
  return (
    <div className="demo" style={{ padding: 20 }}>
      <div
        role="toolbar"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          background: 'var(--bwo-grey-4)',
          borderRadius: 10,
        }}
      >
        <Button size="sm" variant="ghost">
          Bold
        </Button>
        <Button size="sm" variant="ghost">
          Italic
        </Button>
        <Separator orientation="vertical" style={{ height: 22 }} spacing="sm" />
        <Button size="sm" variant="ghost">
          Link
        </Button>
        <Button size="sm" variant="ghost">
          Code
        </Button>
        <Separator orientation="vertical" style={{ height: 22 }} spacing="sm" />
        <Button size="sm" variant="ghost">
          Image
        </Button>
        <Button size="sm" variant="ghost">
          Embed
        </Button>
      </div>
    </div>
  );
}

/* ─── 9. Section divider recipe — inline meta row ──────────────────────── */

export function SeparatorMetaDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 20,
        gap: 6,
      }}
    >
      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
        How we ship motion on the web
      </h3>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 13,
          color: 'var(--bwo-text-body)',
        }}
      >
        <Avatar fallback="AR" size="xs" style={{ background: '#ff481f', color: '#fff' }} />
        <span>Ana Radu</span>
        <Separator orientation="vertical" style={{ height: 14 }} />
        <span>8 min read</span>
        <Separator orientation="vertical" style={{ height: 14 }} />
        <Badge size="sm" variant="green">
          New
        </Badge>
      </div>
    </div>
  );
}
