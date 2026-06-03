'use client';

import { Collapsible } from '@bwo-ui/react';

export function CollapsibleDemo() {
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, padding: 24, alignItems: 'stretch' }}
    >
      <Collapsible
        trigger={<span style={{ fontWeight: 600, fontSize: 14.5 }}>What does owned end-to-end mean?</span>}
        defaultOpen
      >
        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--bwo-text-body)', lineHeight: 1.55 }}>
          Every primitive — Dialog, Popover, Combobox, DataTable, Toast — is implemented in
          this repo. No headless library to upgrade alongside React, no version mismatch when
          you bump.
        </p>
      </Collapsible>

      <Collapsible
        trigger={<span style={{ fontWeight: 600, fontSize: 14.5 }}>Can I use it with Tailwind?</span>}
      >
        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--bwo-text-body)', lineHeight: 1.55 }}>
          Compatible by design. Tokens are plain CSS custom properties, every primitive accepts
          <code> className</code> and forwards refs.
        </p>
      </Collapsible>

      <Collapsible
        trigger={<span style={{ fontWeight: 600, fontSize: 14.5 }}>Does motion ship by default?</span>}
      >
        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--bwo-text-body)', lineHeight: 1.55 }}>
          GSAP is a peer dependency — you only pay the bundle cost when you import a motion
          primitive (Tilt, Ripple, ScrollReveal, etc.).
        </p>
      </Collapsible>
    </div>
  );
}
