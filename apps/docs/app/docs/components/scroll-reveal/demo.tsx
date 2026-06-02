'use client';

import { ScrollReveal } from '@bwo-ui/react';

const FLAVORS = ['lift', 'glide', 'pop', 'slide', 'mist'] as const;

export function ScrollRevealDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 14,
        padding: 24,
        alignItems: 'stretch',
      }}
    >
      <p style={{ margin: 0, color: 'var(--bwo-text-body)', fontSize: 13 }}>
        Five tiles — each uses a different flavour. Scroll the demo to re-trigger if you set
        <code> once=false</code>.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 10,
        }}
      >
        {FLAVORS.map((flavor, i) => (
          <ScrollReveal key={flavor} flavor={flavor} delay={i * 0.08} duration={0.85}>
            <div
              style={{
                padding: 18,
                borderRadius: 12,
                background: 'var(--bwo-grey-4)',
                border: '1px solid var(--bwo-border)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--bwo-text-body)',
                  marginBottom: 6,
                }}
              >
                flavor
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                }}
              >
                {flavor}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
