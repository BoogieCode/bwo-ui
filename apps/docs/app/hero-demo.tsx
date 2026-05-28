'use client';

import { Badge, Button, Magnetic, Marquee, SplitReveal } from '@bwo-ui/react';

const PILLS = [
  'Button',
  'Input',
  'Select',
  'Slider',
  'Switch',
  'Checkbox',
  'Card',
  'Badge',
  'SplitReveal',
  'Magnetic',
  'Marquee',
  'FlipList',
];

export function HeroDemo() {
  return (
    <>
      <SplitReveal
        as="h1"
        type="words,chars"
        stagger={0.012}
        duration={0.7}
        from={{ y: 40, opacity: 0 }}
      >
        Motion that reads as <span className="accent">craft</span>.
      </SplitReveal>

      <div
        style={{
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          marginTop: 28,
          flexWrap: 'wrap',
        }}
      >
        <Magnetic strength={0.35} radius={140}>
          <Button variant="solid">Get started</Button>
        </Magnetic>
        <Magnetic strength={0.25} radius={120}>
          <Button variant="ghost">Read the docs</Button>
        </Magnetic>
      </div>

      <div
        style={{
          marginTop: 36,
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Badge variant="green">v0.2.0</Badge>
        <Badge>React · Vue · Svelte</Badge>
        <Badge variant="soft">MIT</Badge>
      </div>

      <div style={{ marginTop: 56, marginInline: 'calc(50% - 50vw)' }}>
        <Marquee speed={70} draggable={false}>
          {PILLS.map((p) => (
            <span key={p} className="marquee-pill">
              {p}
            </span>
          ))}
        </Marquee>
      </div>
    </>
  );
}
