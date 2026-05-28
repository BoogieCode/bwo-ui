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
} from '@bwo-ui/react';

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
          Unlimited sites, custom domain, AI rewrites, stock photos, no watermark.
        </p>
        <CardFooter>
          <Button variant="solid">Subscribe</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function CardTileDemo() {
  const tiles = [
    { code: 'BOOGIE 0001', name: 'Agency',  cat: 'Studio · Light', accent: '#1a1b1e' },
    { code: 'BOOGIE 0002', name: 'Basalt',  cat: 'Construction',   accent: '#d4e4f7' },
    { code: 'BOOGIE 0003', name: 'Silica',  cat: 'Tech · Light',   accent: '#d4f0e8' },
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
