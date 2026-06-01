'use client';

import { Glow } from '@bwo-ui/react';

export function GlowDemo() {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: 360,
        margin: '20px 0',
        borderRadius: 'var(--bwo-radius-md)',
        border: '1px solid var(--bwo-border)',
        boxShadow: 'var(--bwo-shadow-sm)',
      }}
    >
      <Glow
        x="20%"
        y="30%"
        base="#0c0c12"
        colors={[
          'rgba(255, 72, 31, 0.55)',
          'rgba(116, 99, 255, 0.45)',
          'rgba(160, 255, 39, 0.15)',
        ]}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          width: '100%',
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          padding: 40,
          color: 'var(--bwo-white)',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: 9999,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--bwo-white)',
              marginBottom: 16,
            }}
          >
            Hero backdrop
          </span>
          <h3
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: '0 0 12px',
              color: 'var(--bwo-white)',
            }}
          >
            Tri-color radial blobs.
          </h3>
          <p
            style={{
              maxWidth: '42ch',
              margin: '0 auto',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 15,
            }}
          >
            Drop a{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', color: 'inherit', border: 'none' }}>
              &lt;Glow&gt;
            </code>{' '}
            as the first child of any positioned container and layer the real content on top.
            Tune{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', color: 'inherit', border: 'none' }}>x</code>,{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', color: 'inherit', border: 'none' }}>y</code>,{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', color: 'inherit', border: 'none' }}>colors</code>,
            and{' '}
            <code style={{ background: 'rgba(255,255,255,0.08)', color: 'inherit', border: 'none' }}>base</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
