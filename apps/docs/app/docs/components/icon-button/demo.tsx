'use client';

import { IconButton } from '@bwo-ui/react';

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconButtonDemo() {
  return (
    <div className="demo">
      <IconButton aria-label="Next" size="sm">
        <Arrow />
      </IconButton>
      <IconButton aria-label="Next">
        <Arrow />
      </IconButton>
      <IconButton aria-label="Next" size="lg">
        <Arrow />
      </IconButton>
      <IconButton aria-label="Next" variant="ghost">
        <Arrow />
      </IconButton>
    </div>
  );
}
