'use client';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@bwo-ui/react';
import { useState } from 'react';

const FRUITS = [
  ['apple', 'Apple'],
  ['banana', 'Banana'],
  ['cherry', 'Cherry'],
  ['durian', 'Durian'],
  ['elderberry', 'Elderberry'],
] as const;

const FRAMEWORKS = [
  ['next', 'Next.js'],
  ['remix', 'Remix'],
  ['vite', 'Vite'],
  ['astro', 'Astro'],
  ['nuxt', 'Nuxt'],
  ['svelte-kit', 'SvelteKit'],
  ['gatsby', 'Gatsby'],
  ['solid-start', 'SolidStart'],
  ['expo', 'Expo'],
] as const;

const ROLES = [
  ['design', 'Design'],
  ['frontend', 'Frontend'],
  ['backend', 'Backend'],
  ['infra', 'Infra'],
  ['product', 'Product'],
  ['qa', 'QA'],
] as const;

export function SelectDemo() {
  const [picked, setPicked] = useState<string[]>(['design', 'frontend']);
  return (
    <div
      className="demo"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(220px, 1fr))',
        gap: 24,
        padding: 32,
        alignItems: 'start',
      }}
    >
      {/* Single */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label className="bwo-label">Single</label>
        <SelectRoot defaultValue="apple">
          <SelectTrigger>
            <SelectValue placeholder="Pick a fruit…" />
          </SelectTrigger>
          <SelectContent>
            {FRUITS.map(([v, label]) => (
              <SelectItem key={v} value={v}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>

      {/* Searchable */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label className="bwo-label">Searchable</label>
        <SelectRoot searchable searchPlaceholder="Filter frameworks…">
          <SelectTrigger>
            <SelectValue placeholder="Pick a stack…" />
          </SelectTrigger>
          <SelectContent>
            {FRAMEWORKS.map(([v, label]) => (
              <SelectItem key={v} value={v}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>

      {/* Multiple */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label className="bwo-label">Multiple</label>
        <SelectRoot multiple value={picked} onValueChange={setPicked}>
          <SelectTrigger>
            <SelectValue
              placeholder="Pick roles…"
              formatMultiple={(_, vs) =>
                vs.length <= 2
                  ? vs
                      .map((v) => ROLES.find((r) => r[0] === v)?.[1] ?? v)
                      .join(', ')
                  : `${vs.length} selected`
              }
            />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map(([v, label]) => (
              <SelectItem key={v} value={v}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>
    </div>
  );
}
