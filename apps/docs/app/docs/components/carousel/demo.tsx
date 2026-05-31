'use client';

import { Carousel } from '@bwo-ui/react';

const slides = [
  { color: '#ff481f', label: 'Your shortcut to a beautiful UI.' },
  { color: '#7463ff', label: 'Composable primitives.' },
  { color: '#a0ff27', label: 'GSAP, batteries included.' },
  { color: '#ffc446', label: 'Three frameworks, one API.' },
];

export function CarouselDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
      <Carousel aspectRatio="16 / 9" autoplay={4000}>
        {slides.map((s) => (
          <div
            key={s.label}
            style={{
              width: '100%',
              height: '100%',
              background: s.color,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
              padding: 24,
              textAlign: 'center',
            }}
          >
            {s.label}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
