'use client';

import {
  Badge,
  Button,
  Card,
  CardCaption,
  CardDescription,
  CardEyebrow,
  CardFooter,
  CardHeader,
  CardMedia,
  CardName,
  CardTab,
  CardTitle,
  MediaZoom,
  type Radius,
} from '@bwo-ui/react';

/* ─── 1. Pricing pair (also showcases footer alignment) ────────────────── */

export function CardDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        padding: 24,
        minHeight: 'auto',
        alignItems: 'stretch',
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Free</CardTitle>
          <CardDescription>Get started in a minute.</CardDescription>
        </CardHeader>
        <p style={{ marginBottom: 0 }}>1 site, watermarked, hosted on boogie.ro.</p>
        <CardFooter>
          <Button variant="ghost">Continue free</Button>
        </CardFooter>
      </Card>
      <Card interactive>
        <CardHeader>
          <CardTitle>
            Boogie Pro <Badge variant="green">New</Badge>
          </CardTitle>
          <CardDescription>For teams who ship motion-rich sites.</CardDescription>
        </CardHeader>
        <p style={{ marginBottom: 0 }}>
          Unlimited sites, custom domain, AI rewrites, premium stock library, automatic
          accessibility checks, and round-the-clock motion support — no watermark, ever.
        </p>
        <CardFooter>
          <Button variant="solid">Subscribe</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/* ─── 2. Anatomy ───────────────────────────────────────────────────────── */

export function CardAnatomyDemo() {
  return (
    <div className="demo" style={{ padding: 24 }}>
      <div style={{ position: 'relative', maxWidth: 380, width: '100%' }}>
        <Card style={{ minHeight: 280 }}>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <p style={{ marginBottom: 0, color: 'var(--bwo-text-body)' }}>
            Body content sits between the header and the footer.
          </p>
          <CardFooter>
            <Button size="sm" variant="ghost">
              Action
            </Button>
            <Button size="sm" variant="primary">
              Primary
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

/* ─── 3. Interactive ───────────────────────────────────────────────────── */

export function CardInteractiveDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        padding: 24,
        alignItems: 'stretch',
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Static</CardTitle>
          <CardDescription>No hover effect — display only.</CardDescription>
        </CardHeader>
        <p style={{ marginBottom: 0, color: 'var(--bwo-text-body)' }}>
          Renders as a passive surface.
        </p>
      </Card>
      <Card interactive>
        <CardHeader>
          <CardTitle>Interactive</CardTitle>
          <CardDescription>Hover for the lift effect.</CardDescription>
        </CardHeader>
        <p style={{ marginBottom: 0, color: 'var(--bwo-text-body)' }}>
          Cursor turns into a pointer, shadow deepens, and the card lifts 2 px.
        </p>
      </Card>
    </div>
  );
}

/* ─── 4. Padding modes ─────────────────────────────────────────────────── */

export function CardPadDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        padding: 24,
        alignItems: 'stretch',
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle style={{ fontSize: 15 }}>Default</CardTitle>
        </CardHeader>
        <p style={{ marginBottom: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
          24 px inner padding.
        </p>
      </Card>
      <Card pad="compact">
        <CardHeader style={{ marginBottom: 6 }}>
          <CardTitle style={{ fontSize: 15 }}>Compact</CardTitle>
        </CardHeader>
        <p style={{ marginBottom: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
          12 px inner padding. Use in dense grids.
        </p>
      </Card>
      <Card pad="none">
        <div
          style={{
            aspectRatio: '4 / 3',
            background: 'linear-gradient(135deg, #ff481f, #ffc446)',
          }}
        />
        <div style={{ padding: 14 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>None</p>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--bwo-text-body)' }}>
            Edge-to-edge media.
          </p>
        </div>
      </Card>
    </div>
  );
}

/* ─── 5. Radius ────────────────────────────────────────────────────────── */

const RADII: Radius[] = ['none', 'sm', 'md', 'lg'];

export function CardRadiusDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        padding: 24,
        alignItems: 'stretch',
      }}
    >
      {RADII.map((r) => (
        <Card key={r} radius={r} pad="compact">
          <CardHeader style={{ marginBottom: 4 }}>
            <CardTitle style={{ fontSize: 14 }}>radius=&quot;{r}&quot;</CardTitle>
          </CardHeader>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--bwo-text-body)' }}>
            Tunes the corner curve.
          </p>
        </Card>
      ))}
    </div>
  );
}

/* ─── 6. Footer alignment showcase ─────────────────────────────────────── */

export function CardFooterAlignDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        padding: 24,
        alignItems: 'stretch',
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle style={{ fontSize: 16 }}>Starter</CardTitle>
        </CardHeader>
        <p style={{ marginBottom: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
          One line.
        </p>
        <CardFooter>
          <Button size="sm" variant="ghost">
            Pick
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle style={{ fontSize: 16 }}>Growth</CardTitle>
        </CardHeader>
        <p style={{ marginBottom: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
          A few lines of supporting copy that takes a bit more vertical space than the first
          card.
        </p>
        <CardFooter>
          <Button size="sm" variant="ghost">
            Pick
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle style={{ fontSize: 16 }}>Scale</CardTitle>
        </CardHeader>
        <p style={{ marginBottom: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
          A noticeably longer body section that pushes the natural flow further down, with
          enough copy to wrap across multiple lines and demonstrate that the footer still
          anchors to the bottom regardless of how tall the card has to grow.
        </p>
        <CardFooter>
          <Button size="sm" variant="ghost">
            Pick
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/* ─── 7. Tile layout (existing) ────────────────────────────────────────── */

export function CardTileDemo() {
  const tiles = [
    { code: 'BOOGIE 0001', name: 'Agency', cat: 'Studio · Light', accent: '#1a1b1e' },
    { code: 'BOOGIE 0002', name: 'Basalt', cat: 'Construction', accent: '#d4e4f7' },
    { code: 'BOOGIE 0003', name: 'Silica', cat: 'Tech · Light', accent: '#d4f0e8' },
  ];
  return (
    <div className="demo" style={{ gap: 12, padding: 32 }}>
      {tiles.map((t) => (
        <div key={t.code} style={{ width: 160 }}>
          <Card pad="none" radius="sm" interactive>
            <CardMedia aspect="3 / 4" style={{ background: t.accent }}>
              <MediaZoom>
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${t.accent}, color-mix(in srgb, ${t.accent} 60%, #000))`,
                    opacity: 0.9,
                  }}
                />
              </MediaZoom>
            </CardMedia>
            <CardTab>
              <CardEyebrow>{t.code}</CardEyebrow>
              <CardName>{t.name}</CardName>
              <CardCaption>{t.cat}</CardCaption>
            </CardTab>
          </Card>
        </div>
      ))}
    </div>
  );
}

/* ─── 8. Stat recipe ───────────────────────────────────────────────────── */

const STATS = [
  { label: 'Monthly visitors', value: '128.4k', delta: '+12.3%', positive: true },
  { label: 'Active sites', value: '4,910', delta: '+218', positive: true },
  { label: 'Bounce rate', value: '38%', delta: '−2.1%', positive: true },
];

export function CardStatDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        padding: 24,
        alignItems: 'stretch',
      }}
    >
      {STATS.map((s) => (
        <Card key={s.label} pad="compact">
          <p
            style={{
              margin: 0,
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--bwo-text-body)',
            }}
          >
            {s.label}
          </p>
          <p
            style={{
              margin: '6px 0 4px',
              fontFamily: 'var(--bwo-font-display, var(--bwo-font-sans))',
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--bwo-text)',
            }}
          >
            {s.value}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 600,
              color: s.positive ? 'var(--bwo-green, #16a34a)' : 'var(--bwo-red)',
            }}
          >
            {s.delta} vs last month
          </p>
        </Card>
      ))}
    </div>
  );
}

/* ─── 9. Profile recipe ────────────────────────────────────────────────── */

function Avatar({ initials, accent }: { initials: string; accent: string }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        background: accent,
        color: 'var(--bwo-white)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: '0.02em',
        flex: '0 0 auto',
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function CardProfileDemo() {
  return (
    <div className="demo" style={{ padding: 24 }}>
      <div style={{ maxWidth: 360, width: '100%' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar initials="AR" accent="#ff481f" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Ana Radu</p>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>
                Lead motion designer · Boogie
              </p>
            </div>
          </div>
          <CardFooter>
            <Button size="sm" variant="outline">
              Message
            </Button>
            <Button size="sm" variant="primary">
              Follow
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

/* ─── 10. Quote / callout recipe ───────────────────────────────────────── */

export function CardQuoteDemo() {
  return (
    <div className="demo" style={{ padding: 24 }}>
      <div style={{ maxWidth: 420, width: '100%' }}>
        <Card pad="default" radius="md">
          <p
            style={{
              margin: 0,
              fontSize: 18,
              lineHeight: 1.45,
              fontWeight: 500,
              letterSpacing: '-0.005em',
              color: 'var(--bwo-text)',
            }}
          >
            “bwo-ui shipped 60 components in a month. Every primitive is ours — no Radix, no
            cmdk, no day-picker. It just feels like one library.”
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 16,
              paddingTop: 16,
              borderTop: '1px solid var(--bwo-border)',
            }}
          >
            <Avatar initials="MS" accent="#7463ff" />
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Mihai Stoica</p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--bwo-text-body)' }}>
                Frontend lead · boogie.ro
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
