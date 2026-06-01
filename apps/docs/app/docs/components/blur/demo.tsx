'use client';

import { Blur, Card, type BlurIntensity } from '@bwo-ui/react';

/* ─── 1. Hero ──────────────────────────────────────────────────────────── */

export function BlurDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 16, alignItems: 'stretch' }}>
      <Blur intensity="strong" fade>
        <div
          style={{
            padding: 28,
            borderRadius: 12,
            background: 'var(--bwo-black)',
            color: 'var(--bwo-white)',
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Sharpens into focus on enter.
        </div>
      </Blur>
      <Blur intensity="medium" fade={false} duration={1.4}>
        <div
          style={{
            padding: 28,
            borderRadius: 12,
            background: 'var(--bwo-grey-4)',
            color: 'var(--bwo-black)',
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          No fade, just blur.
        </div>
      </Blur>
    </div>
  );
}

/* ─── 2. Intensity scale ───────────────────────────────────────────────── */

const INTENSITIES: BlurIntensity[] = ['subtle', 'medium', 'strong'];

export function BlurIntensityDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 14, alignItems: 'stretch' }}>
      {INTENSITIES.map((i) => (
        <Blur key={i} intensity={i}>
          <div
            style={{
              padding: '18px 22px',
              borderRadius: 10,
              background: 'var(--bwo-grey-4)',
              color: 'var(--bwo-black)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600 }}>intensity = {i}</span>
            <code style={{ fontSize: 11, color: 'var(--bwo-text-body)' }}>
              from {i === 'subtle' ? 8 : i === 'medium' ? 16 : 28}px
            </code>
          </div>
        </Blur>
      ))}
    </div>
  );
}

/* ─── 3. With and without fade ─────────────────────────────────────────── */

export function BlurFadeDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        padding: 16,
      }}
    >
      <Blur intensity="medium" fade>
        <div
          style={{
            padding: 24,
            borderRadius: 10,
            background: 'var(--bwo-black)',
            color: 'var(--bwo-white)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            fade
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 6 }}>true</div>
        </div>
      </Blur>
      <Blur intensity="medium" fade={false}>
        <div
          style={{
            padding: 24,
            borderRadius: 10,
            background: 'var(--bwo-grey-4)',
            color: 'var(--bwo-black)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            fade
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 6 }}>false</div>
        </div>
      </Blur>
    </div>
  );
}

/* ─── 4. Direction (in vs out) ─────────────────────────────────────────── */

export function BlurDirectionDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 14, alignItems: 'stretch' }}>
      <Blur direction="in" intensity="strong">
        <div
          style={{
            padding: 22,
            borderRadius: 10,
            background: 'var(--bwo-black)',
            color: 'var(--bwo-white)',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          direction=&quot;in&quot; — blurred → sharp as I enter.
        </div>
      </Blur>
      <Blur direction="out" intensity="strong" scrub end="top 30%">
        <div
          style={{
            padding: 22,
            borderRadius: 10,
            background: 'var(--bwo-yellow)',
            color: 'var(--bwo-black)',
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          direction=&quot;out&quot; — sharp → blurred as I scroll past.
        </div>
      </Blur>
    </div>
  );
}

/* ─── 5. Scrub (tied to scroll position) ───────────────────────────────── */

export function BlurScrubDemo() {
  return (
    <div className="demo" style={{ padding: 12 }}>
      <Blur intensity="strong" scrub start="top 90%" end="top 40%">
        <div
          style={{
            padding: 36,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #ff481f, #ffc446)',
            color: 'var(--bwo-black)',
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            textAlign: 'center',
          }}
        >
          Scrub me — blur tracks scroll
        </div>
      </Blur>
    </div>
  );
}

/* ─── 6. Stagger (sequence with delays) ────────────────────────────────── */

const STAGGER_ITEMS = [
  { label: 'One', color: '#ff481f' },
  { label: 'Two', color: '#7463ff' },
  { label: 'Three', color: '#16a34a' },
  { label: 'Four', color: '#ffc446' },
];

export function BlurStaggerDemo() {
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10,
        padding: 16,
      }}
    >
      {STAGGER_ITEMS.map((item, i) => (
        <Blur key={item.label} intensity="medium" delay={i * 0.12}>
          <div
            style={{
              padding: 22,
              borderRadius: 10,
              background: item.color,
              color: '#fff',
              fontWeight: 600,
              textAlign: 'center',
              fontSize: 15,
            }}
          >
            {item.label}
          </div>
        </Blur>
      ))}
    </div>
  );
}

/* ─── 7. Image recipe — photo reveal ──────────────────────────────────── */

export function BlurImageDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 16,
      }}
    >
      <Blur intensity="strong" duration={1.2} style={{ width: '100%' }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 14,
            aspectRatio: '16 / 9',
            width: '100%',
            background: 'linear-gradient(135deg, #1a1b1e 0%, #ff481f 70%, #ffc446 100%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              padding: 22,
              color: '#fff',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  opacity: 0.75,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                BOOGIE.RO · 0042
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginTop: 4,
                }}
              >
                Motion that reads as craft
              </div>
            </div>
          </div>
        </div>
      </Blur>
    </div>
  );
}

/* ─── 8. Card grid recipe ──────────────────────────────────────────────── */

export function BlurCardGridDemo() {
  const items = [
    { title: 'Performance', body: 'GSAP-tuned animations under 16 ms.' },
    { title: 'Accessibility', body: 'Reduced-motion respected at the factory layer.' },
    { title: 'Composable', body: 'Drop a <Blur> around any node. No magic.' },
  ];
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        padding: 16,
        alignItems: 'stretch',
      }}
    >
      {items.map((item, i) => (
        <Blur key={item.title} intensity="medium" delay={i * 0.15}>
          <Card>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 700,
                margin: 0,
                marginBottom: 6,
                color: 'var(--bwo-text)',
              }}
            >
              {item.title}
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--bwo-text-body)' }}>{item.body}</p>
          </Card>
        </Blur>
      ))}
    </div>
  );
}
