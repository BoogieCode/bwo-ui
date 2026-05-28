'use client';

import { Avatar } from '@bwo-ui/react';

export function AvatarDemo() {
  return (
    <div className="demo" style={{ gap: 14 }}>
      <Avatar
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80"
        alt="Avatar"
        fallback="CC"
        size="sm"
      />
      <Avatar fallback="JS" />
      <Avatar fallback="AB" size="lg" />
      <Avatar fallback="🎵" size="lg" />
    </div>
  );
}
