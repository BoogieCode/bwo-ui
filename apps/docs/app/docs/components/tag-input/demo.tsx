'use client';

import { TagInput } from '@bwo-ui/react';
import { useState } from 'react';

export function TagInputDemo() {
  const [tags, setTags] = useState<string[]>(['design', 'motion', 'tokens']);
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, padding: 24, alignItems: 'stretch' }}
    >
      <TagInput
        value={tags}
        onValueChange={setTags}
        placeholder="Add a tag, press Enter…"
        max={6}
        validate={(t) => (t.length < 2 ? 'Tag must be at least 2 characters' : true)}
      />
      <p style={{ margin: 0, fontSize: 12, color: 'var(--bwo-text-body)' }}>
        Press Enter or comma to commit · Backspace on empty input to peel the last tag · Up to
        6 tags allowed in this demo.
      </p>
    </div>
  );
}
