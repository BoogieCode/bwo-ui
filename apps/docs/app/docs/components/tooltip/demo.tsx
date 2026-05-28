'use client';

import { Button, IconButton, Tooltip } from '@bwo-ui/react';

function Heart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.7A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TooltipDemo() {
  return (
    <div className="demo" style={{ gap: 16 }}>
      <Tooltip content="This is a tooltip" side="top">
        <Button variant="ghost">Hover me (top)</Button>
      </Tooltip>
      <Tooltip content="On the right" side="right">
        <Button variant="ghost">Right</Button>
      </Tooltip>
      <Tooltip content="Add to favourites">
        <IconButton aria-label="Favourite">
          <Heart />
        </IconButton>
      </Tooltip>
    </div>
  );
}
