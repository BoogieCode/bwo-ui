'use client';

import { useState } from 'react';

const groups: { title: string; tokens: { name: string; cssVar: string; type: 'color' | 'radius' | 'shadow' | 'font' }[] }[] = [
  {
    title: 'Neutrals',
    tokens: [
      { name: 'Black', cssVar: '--bwo-black', type: 'color' },
      { name: 'Black 2', cssVar: '--bwo-black-2', type: 'color' },
      { name: 'White', cssVar: '--bwo-white', type: 'color' },
      { name: 'Cream', cssVar: '--bwo-cream', type: 'color' },
      { name: 'Grey 4 (surface)', cssVar: '--bwo-grey-4', type: 'color' },
      { name: 'Border', cssVar: '--bwo-border-1', type: 'color' },
      { name: 'Text body', cssVar: '--bwo-text-body', type: 'color' },
    ],
  },
  {
    title: 'Accents',
    tokens: [
      { name: 'Red (accent)', cssVar: '--bwo-red', type: 'color' },
      { name: 'Red bright', cssVar: '--bwo-red-bright', type: 'color' },
      { name: 'Green', cssVar: '--bwo-green', type: 'color' },
      { name: 'Green light', cssVar: '--bwo-green-light', type: 'color' },
      { name: 'Yellow', cssVar: '--bwo-yellow', type: 'color' },
      { name: 'Pink', cssVar: '--bwo-pink', type: 'color' },
      { name: 'Blue', cssVar: '--bwo-blue', type: 'color' },
    ],
  },
  {
    title: 'Radii',
    tokens: [
      { name: 'Pill', cssVar: '--bwo-radius-pill', type: 'radius' },
      { name: 'Small (inputs)', cssVar: '--bwo-radius-sm', type: 'radius' },
      { name: 'Medium (cards)', cssVar: '--bwo-radius-md', type: 'radius' },
      { name: 'Large (badges)', cssVar: '--bwo-radius-lg', type: 'radius' },
      { name: 'XL (solid buttons)', cssVar: '--bwo-radius-xl', type: 'radius' },
    ],
  },
  {
    title: 'Shadows',
    tokens: [
      { name: 'Shadow sm', cssVar: '--bwo-shadow-sm', type: 'shadow' },
      { name: 'Shadow md', cssVar: '--bwo-shadow-md', type: 'shadow' },
      { name: 'Shadow lg', cssVar: '--bwo-shadow-lg', type: 'shadow' },
      { name: 'Shadow cta', cssVar: '--bwo-shadow-cta', type: 'shadow' },
    ],
  },
  {
    title: 'Fonts',
    tokens: [
      { name: 'Sans', cssVar: '--bwo-font-sans', type: 'font' },
    ],
  },
];

export function TokenSwatches() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (token: string) => {
    try {
      await navigator.clipboard.writeText(`var(${token})`);
      setCopied(token);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* noop */
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {groups.map((group) => (
        <div key={group.title}>
          <h3 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, color: 'var(--bwo-text-body)' }}>
            {group.title}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 10,
            }}
          >
            {group.tokens.map((t) => (
              <button
                key={t.cssVar}
                type="button"
                onClick={() => copy(t.cssVar)}
                title={`Click to copy var(${t.cssVar})`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 8,
                  padding: 12,
                  background: 'var(--bwo-surface)',
                  border: '1px solid var(--bwo-border)',
                  borderRadius: 'var(--bwo-radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  color: 'var(--bwo-text)',
                  transition: 'var(--bwo-transition)',
                }}
              >
                <TokenPreview token={t} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</span>
                <code style={{ fontSize: 11, opacity: 0.7, background: 'transparent', border: 'none', padding: 0 }}>
                  {copied === t.cssVar ? 'Copied!' : t.cssVar}
                </code>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TokenPreview({ token }: { token: { cssVar: string; type: 'color' | 'radius' | 'shadow' | 'font' } }) {
  const value = `var(${token.cssVar})`;
  if (token.type === 'color') {
    return (
      <div
        style={{
          width: '100%',
          height: 48,
          borderRadius: 6,
          background: value,
          border: '1px solid var(--bwo-border)',
        }}
      />
    );
  }
  if (token.type === 'radius') {
    return (
      <div
        style={{
          width: '100%',
          height: 48,
          background: 'var(--bwo-black)',
          borderRadius: value,
        }}
      />
    );
  }
  if (token.type === 'shadow') {
    return (
      <div
        style={{
          width: '100%',
          height: 48,
          background: 'var(--bwo-white)',
          borderRadius: 8,
          boxShadow: value,
        }}
      />
    );
  }
  return (
    <div style={{ width: '100%', height: 48, display: 'flex', alignItems: 'center', fontFamily: value, fontSize: 22, fontWeight: 600 }}>
      Aa
    </div>
  );
}
