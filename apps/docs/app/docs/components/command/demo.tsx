'use client';

import { useState } from 'react';
import { Button, Command, CommandDialog, type CommandItemEntry } from '@bwo-ui/react';

const items: CommandItemEntry[] = [
  {
    id: 'new',
    label: 'New file',
    group: 'File',
    shortcut: '⌘ N',
    onSelect: () => alert('New'),
  },
  {
    id: 'open',
    label: 'Open file…',
    group: 'File',
    shortcut: '⌘ O',
    onSelect: () => alert('Open'),
  },
  {
    id: 'save',
    label: 'Save',
    group: 'File',
    shortcut: '⌘ S',
    onSelect: () => alert('Save'),
  },
  {
    id: 'theme',
    label: 'Toggle theme',
    group: 'Preferences',
    keywords: ['dark', 'light'],
    onSelect: () => alert('Theme'),
  },
  {
    id: 'settings',
    label: 'Open settings',
    group: 'Preferences',
    onSelect: () => alert('Settings'),
  },
];

export function CommandDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 20, alignItems: 'stretch' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => setOpen(true)}>Open command palette</Button>
      </div>

      <div style={{ border: '1px solid var(--bwo-border)', borderRadius: 'var(--bwo-radius-md)' }}>
        <Command items={items} placeholder="Inline command palette…" />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command
          items={items.map((i) => ({ ...i, onSelect: () => { i.onSelect?.(); setOpen(false); } }))}
        />
      </CommandDialog>
    </div>
  );
}
