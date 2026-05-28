'use client';

import { useState } from 'react';
import { BoogieRoRebuild } from './rebuild';

type Status = 'todo' | 'building' | 'done';

interface InventoryItem {
  /** bwo-ui component or effect name as imported from @bwo-ui/react. */
  component: string;
  /** Why it's needed in this section. */
  note: string;
  /** Whether this primitive exists today, needs a new prop, or needs to be created. */
  state: 'exists' | 'needs-prop' | 'missing';
}

interface Section {
  /** DOM id on the rebuild side — clicking scrolls the preview to this section. */
  id: string;
  label: string;
  status: Status;
  items: InventoryItem[];
}

const SECTIONS: Section[] = [
  {
    id: 'shell',
    label: '00 · Shell — header + scroll + footer + glow',
    status: 'done',
    items: [
      { component: 'AppShell', note: 'Vertical frame matching boogie-next container-shell.', state: 'exists' },
      { component: 'Glow', note: 'Tri-color radial backdrop matching boogie.ro\'s body bg (blue / yellow / red).', state: 'exists' },
      { component: 'BrandMark', note: 'BOOGIE wordmark with .RO tld suffix.', state: 'exists' },
      { component: 'BootScreen + Skeleton', note: 'Boot overlay with shimmer skeletons; auto-dismisses after 900ms.', state: 'exists' },
      { component: 'Button (size="sm", variant="ghost" / "outline")', note: 'Ghid, Login, and menu trigger.', state: 'exists' },
    ],
  },
  {
    id: 'hero-typewriter',
    label: '01 · Hero — typewriter title + CTAs',
    status: 'building',
    items: [
      { component: 'SplitReveal', note: 'Char-by-char reveal for each of the three "· site …" lines.', state: 'exists' },
      { component: 'Button variant="cta" iconBadge', note: 'Black pill CTA with circular icon badge + blue hover — matches boogie.ro\'s ai-story-btn.', state: 'exists' },
      { component: 'Typewriter', note: 'Strike-through-after-reveal primitive. Not yet in bwo-ui — the rebuild uses a scoped CSS keyframe; promote to a real primitive in the next pass.', state: 'missing' },
    ],
  },
  {
    id: 'project-showcase',
    label: '02 · Project showcase grid (2 cols)',
    status: 'done',
    items: [
      { component: 'Stagger', note: 'Stagger-in the cards on scroll.', state: 'exists' },
      { component: 'Lean angle={...}', note: 'Per-tile resting tilt (-1.2°, 1.5°, 0.8°, -1.8°, 1°), snaps to 0 on hover with translateY.', state: 'exists' },
      { component: 'MediaZoom', note: 'Image scales 1 → 1.06 when the card is hovered.', state: 'exists' },
      { component: 'Card pad="none"', note: 'Edge-to-edge media + tab layout.', state: 'exists' },
      { component: 'CardMedia / CardTab / CardEyebrow / CardName / CardCaption', note: 'Composition pieces matching the boogie.ro tile pattern.', state: 'exists' },
      { component: 'Badge + Pulse', note: '"În curând" pill with the breathing dot.', state: 'exists' },
      { component: 'Spin', note: 'Sparkle rotation on the 30+ promo tile.', state: 'exists' },
    ],
  },
  {
    id: 'services',
    label: '03 · Services / what we do',
    status: 'building',
    items: [
      { component: 'Stagger + Card', note: 'Service cards entering with stagger.', state: 'exists' },
      { component: 'Badge', note: 'Tag chip inside each card.', state: 'exists' },
      { component: 'Spotlight', note: 'Cursor-following light on cards — to be added in a later pass.', state: 'exists' },
    ],
  },
  {
    id: 'logos-marquee',
    label: '04 · Client logos marquee',
    status: 'todo',
    items: [
      { component: 'Marquee', note: 'Infinite seamless strip of partner logos.', state: 'exists' },
      { component: 'Logos data', note: 'Placeholder names today; swap to real client list when available.', state: 'needs-prop' },
    ],
  },
  {
    id: 'cta-band',
    label: '05 · Final CTA band',
    status: 'building',
    items: [
      { component: 'SplitReveal', note: 'Reveal closing headline word-by-word.', state: 'exists' },
      { component: 'GradientText', note: 'Optional accent on the closing phrase.', state: 'exists' },
      { component: 'Magnetic + Button', note: '"Începe acum" primary CTA.', state: 'exists' },
    ],
  },
];

const STATUS_LABEL: Record<Status, string> = {
  todo: 'todo',
  building: 'building',
  done: 'done',
};

const STATE_DOT: Record<InventoryItem['state'], { color: string; title: string }> = {
  exists: { color: 'var(--bwo-green)', title: 'Primitive already exists in bwo-ui' },
  'needs-prop': { color: 'var(--bwo-yellow)', title: 'Exists but needs an extra prop / variant' },
  missing: { color: 'var(--bwo-red)', title: 'Not yet in bwo-ui — to be added' },
};

export function BoogieRoWorkspace() {
  const [statuses, setStatuses] = useState<Record<string, Status>>(() =>
    Object.fromEntries(SECTIONS.map((s) => [s.id, s.status])),
  );
  const [activeId, setActiveId] = useState<string>(SECTIONS[0]?.id ?? '');

  const cycle = (id: string) => {
    setStatuses((prev) => {
      const next: Status =
        prev[id] === 'todo' ? 'building' : prev[id] === 'building' ? 'done' : 'todo';
      return { ...prev, [id]: next };
    });
  };

  const scrollToSection = (id: string) => {
    setActiveId(id);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const total = SECTIONS.length;
  const done = Object.values(statuses).filter((s) => s === 'done').length;

  return (
    <div className="playground-split">
      <aside className="playground-inventory">
        <header className="playground-inventory-header">
          <p className="playground-eyebrow">Playground · workspace</p>
          <h1>Replicate boogie.ro</h1>
          <p className="playground-lead">
            Live rebuild of the boogie.ro homepage using <code>@bwo-ui/react</code>. The
            right pane is real components — no screenshot. Click a section to scroll the
            preview; click the status pill to cycle <em>todo → building → done</em>.
          </p>
          <div className="playground-progress">
            <div className="playground-progress-bar">
              <span style={{ width: `${(done / total) * 100}%` }} />
            </div>
            <span>
              {done} / {total} sections
            </span>
          </div>
        </header>

        <ol className="playground-section-list">
          {SECTIONS.map((section) => {
            const isActive = activeId === section.id;
            const status = statuses[section.id] ?? 'todo';
            return (
              <li
                key={section.id}
                className={`playground-section${isActive ? ' is-active' : ''}`}
              >
                <button
                  type="button"
                  className="playground-section-head"
                  onClick={() => scrollToSection(section.id)}
                  aria-pressed={isActive}
                >
                  <span className="playground-section-label">{section.label}</span>
                  <span
                    className={`playground-status playground-status--${status}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      cycle(section.id);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        cycle(section.id);
                      }
                    }}
                  >
                    {STATUS_LABEL[status]}
                  </span>
                </button>
                <ul className="playground-item-list">
                  {section.items.map((item) => (
                    <li key={item.component}>
                      <span
                        className="playground-dot"
                        style={{ background: STATE_DOT[item.state].color }}
                        title={STATE_DOT[item.state].title}
                        aria-label={STATE_DOT[item.state].title}
                      />
                      <code>{item.component}</code>
                      <p>{item.note}</p>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <footer className="playground-legend">
          <span>
            <i style={{ background: 'var(--bwo-green)' }} /> Exists
          </span>
          <span>
            <i style={{ background: 'var(--bwo-yellow)' }} /> Needs a prop / variant
          </span>
          <span>
            <i style={{ background: 'var(--bwo-red)' }} /> Missing — to be built
          </span>
        </footer>
      </aside>

      <section className="playground-preview">
        <div className="playground-preview-toolbar">
          <span>
            Live rebuild · <strong>@bwo-ui/react</strong>
          </span>
          <a href="https://boogie.ro" target="_blank" rel="noopener noreferrer">
            compare with boogie.ro ↗
          </a>
        </div>
        <div className="playground-preview-frame">
          <BoogieRoRebuild />
        </div>
      </section>
    </div>
  );
}
