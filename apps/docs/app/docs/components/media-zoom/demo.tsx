'use client';

import { Card, CardMedia, CardTab, CardEyebrow, CardName, MediaZoom } from '@bwo-ui/react';

export function MediaZoomDemo() {
  return (
    <div className="demo" style={{ padding: 32, gap: 16 }}>
      {[
        { accent: '#d4e4f7', name: 'Basalt', code: 'BOOGIE 0002' },
        { accent: '#d4f0e8', name: 'Silica', code: 'BOOGIE 0003' },
        { accent: '#f7e0d4', name: 'Vintage', code: 'BOOGIE 0004' },
      ].map((t) => (
        <div key={t.code} style={{ width: 180 }}>
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
            </CardTab>
          </Card>
        </div>
      ))}
    </div>
  );
}
