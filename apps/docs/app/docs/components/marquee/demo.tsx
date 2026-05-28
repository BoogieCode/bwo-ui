'use client';

import { Marquee } from '@bwo-ui/react';

const TAGS = [
  'GSAP',
  'ScrollTrigger',
  'SplitText',
  'Flip',
  'Observer',
  'Inertia',
  'Draggable',
  'MorphSVG',
  'DrawSVG',
  'MotionPath',
];

export function MarqueeDemo() {
  return (
    <div className="demo" style={{ padding: 0, minHeight: 'auto' }}>
      <Marquee speed={90} direction="left" style={{ padding: '40px 0' }}>
        {TAGS.map((tag) => (
          <span key={tag} className="marquee-pill">
            {tag}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
