'use client';

import { useState } from 'react';
import { Combobox } from '@bwo-ui/react';

const options = [
  { value: 'next', label: 'Next.js', description: 'React framework' },
  { value: 'remix', label: 'Remix' },
  { value: 'vite', label: 'Vite' },
  { value: 'astro', label: 'Astro' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'svelte', label: 'SvelteKit' },
  { value: 'gatsby', label: 'Gatsby', disabled: true },
];

export function ComboboxDemo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch', maxWidth: 360, marginInline: 'auto' }}>
      <Combobox options={options} value={value} onValueChange={setValue} placeholder="Pick a framework…" />
    </div>
  );
}
