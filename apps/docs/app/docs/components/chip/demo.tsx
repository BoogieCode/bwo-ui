'use client';

import { Chip } from '@bwo-ui/react';
import { useState } from 'react';

export function ChipDemo() {
  const [tags, setTags] = useState(['design', 'motion', 'react', 'svelte']);
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 16, padding: 24, alignItems: 'stretch' }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Chip tone="red">red</Chip>
        <Chip tone="green">green</Chip>
        <Chip tone="yellow">yellow</Chip>
        <Chip tone="blue">blue</Chip>
        <Chip tone="purple">purple</Chip>
        <Chip tone="default">default</Chip>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Chip variant="solid" tone="red">solid</Chip>
        <Chip variant="soft" tone="red">soft</Chip>
        <Chip variant="outline" tone="red">outline</Chip>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        {tags.map((t) => (
          <Chip
            key={t}
            tone="purple"
            variant="soft"
            onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}
          >
            {t}
          </Chip>
        ))}
        {tags.length === 0 && (
          <span style={{ fontSize: 12.5, color: 'var(--bwo-text-body)' }}>
            All removed — refresh the demo to reset.
          </span>
        )}
      </div>
    </div>
  );
}
