'use client';

import { Grid, GridItem } from '@bwo-ui/react';
import type { CSSProperties, ReactNode } from 'react';

interface TileProps {
  area: string;
  label: string;
  caption: string;
  accent: string;
  children?: ReactNode;
  style?: CSSProperties;
}

function Tile({ area, label, caption, accent, children, style }: TileProps) {
  return (
    <GridItem area={area}>
      <div
        style={{
          height: '100%',
          minHeight: 80,
          padding: '18px 20px',
          borderRadius: 'var(--bwo-radius-md)',
          background: `linear-gradient(135deg, ${accent}1f, ${accent}08)`,
          border: `1px solid ${accent}40`,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          color: 'var(--bwo-text)',
          position: 'relative',
          overflow: 'hidden',
          ...style,
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 12,
            right: 14,
            fontFamily: 'var(--bwo-font-mono)',
            fontSize: 10.5,
            letterSpacing: '0.04em',
            color: accent,
            opacity: 0.7,
            textTransform: 'uppercase',
          }}
        >
          {area}
        </span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 12.5, color: 'var(--bwo-text-body)' }}>{caption}</span>
        {children}
      </div>
    </GridItem>
  );
}

export function GridDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch', padding: 24 }}>
      <Grid
        templateAreas={[
          'hero hero side',
          'main main side',
          'foot foot foot',
        ]}
        templateColumns="1fr 1fr 220px"
        templateRows="110px 130px 70px"
        gap={12}
      >
        <Tile
          area="hero"
          label="Hero"
          caption="Spans the first two columns of row 1."
          accent="#ff481f"
        />
        <Tile
          area="side"
          label="Sidebar"
          caption="Single column, spans rows 1 and 2."
          accent="#7463ff"
        />
        <Tile
          area="main"
          label="Main"
          caption="Two columns, row 2."
          accent="#a0ff27"
        />
        <Tile
          area="foot"
          label="Footer"
          caption="Spans all three columns."
          accent="#ffc446"
        />
      </Grid>
    </div>
  );
}
