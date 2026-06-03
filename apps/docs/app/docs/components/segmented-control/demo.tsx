'use client';

import { SegmentedControl } from '@bwo-ui/react';
import { useState } from 'react';

const VIEWS = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'kanban', label: 'Kanban' },
] as const;

const TONES = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'closed', label: 'Closed' },
  { value: 'archived', label: 'Archived' },
] as const;

export function SegmentedControlDemo() {
  const [view, setView] = useState<string>('list');
  const [tone, setTone] = useState<string>('all');
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 18, padding: 24, alignItems: 'stretch' }}
    >
      <div>
        <div
          style={{
            fontSize: 11.5,
            color: 'var(--bwo-text-body)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Default · md
        </div>
        <SegmentedControl options={[...VIEWS]} value={view} onValueChange={setView} />
      </div>
      <div>
        <div
          style={{
            fontSize: 11.5,
            color: 'var(--bwo-text-body)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          Full-width · sm
        </div>
        <SegmentedControl
          options={[...TONES]}
          value={tone}
          onValueChange={setTone}
          size="sm"
          fullWidth
        />
      </div>
    </div>
  );
}
