'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const groups = [
  {
    title: 'Getting started',
    links: [
      { href: '/docs/introduction', label: 'Introduction' },
      { href: '/docs/installation', label: 'Installation' },
      { href: '/docs/theming', label: 'Theming' },
      { href: '/docs/typography', label: 'Typography' },
    ],
  },
  {
    title: 'Layout',
    links: [
      { href: '/docs/components/app-shell', label: 'AppShell' },
      { href: '/docs/components/glow', label: 'Glow' },
      { href: '/docs/components/button', label: 'Button' },
      { href: '/docs/components/icon-button', label: 'IconButton' },
      { href: '/docs/components/card', label: 'Card' },
      { href: '/docs/components/badge', label: 'Badge' },
      { href: '/docs/components/avatar', label: 'Avatar' },
      { href: '/docs/components/skeleton', label: 'Skeleton' },
      { href: '/docs/components/progress', label: 'Progress' },
      { href: '/docs/components/alert', label: 'Alert' },
      { href: '/docs/components/stat', label: 'Stat' },
      { href: '/docs/components/separator', label: 'Separator' },
    ],
  },
  {
    title: 'Form',
    links: [
      { href: '/docs/components/input', label: 'Input' },
      { href: '/docs/components/textarea', label: 'Textarea' },
      { href: '/docs/components/select', label: 'Select' },
      { href: '/docs/components/checkbox', label: 'Checkbox' },
      { href: '/docs/components/radio-group', label: 'RadioGroup' },
      { href: '/docs/components/switch', label: 'Switch' },
      { href: '/docs/components/slider', label: 'Slider' },
    ],
  },
  {
    title: 'Overlay',
    links: [
      { href: '/docs/components/dialog', label: 'Dialog' },
      { href: '/docs/components/popover', label: 'Popover' },
      { href: '/docs/components/tooltip', label: 'Tooltip' },
      { href: '/docs/components/toast', label: 'Toast' },
    ],
  },
  {
    title: 'Navigation',
    links: [
      { href: '/docs/components/tabs', label: 'Tabs' },
      { href: '/docs/components/accordion', label: 'Accordion' },
    ],
  },
  {
    title: 'Motion',
    links: [
      { href: '/docs/components/split-reveal', label: 'SplitReveal' },
      { href: '/docs/components/reveal', label: 'Reveal' },
      { href: '/docs/components/parallax', label: 'Parallax' },
      { href: '/docs/components/blur', label: 'Blur' },
      { href: '/docs/components/stagger', label: 'Stagger' },
      { href: '/docs/components/scroll-progress', label: 'ScrollProgress' },
      { href: '/docs/components/pin', label: 'Pin' },
      { href: '/docs/components/typewriter', label: 'Typewriter' },
      { href: '/docs/components/scramble-text', label: 'ScrambleText' },
      { href: '/docs/components/text-glitch', label: 'TextGlitch' },
      { href: '/docs/components/gradient-text', label: 'GradientText' },
      { href: '/docs/components/count-up', label: 'CountUp' },
      { href: '/docs/components/spin', label: 'Spin' },
      { href: '/docs/components/pulse', label: 'Pulse' },
      { href: '/docs/components/preanimate', label: 'Preanimate' },
      { href: '/docs/components/boot-screen', label: 'BootScreen' },
    ],
  },
  {
    title: 'Interaction',
    links: [
      { href: '/docs/components/magnetic', label: 'Magnetic' },
      { href: '/docs/components/magnetic-cursor', label: 'MagneticCursor' },
      { href: '/docs/components/tilt', label: 'Tilt' },
      { href: '/docs/components/lean', label: 'Lean' },
      { href: '/docs/components/spotlight', label: 'Spotlight' },
      { href: '/docs/components/ripple', label: 'Ripple' },
      { href: '/docs/components/media-zoom', label: 'MediaZoom' },
      { href: '/docs/components/marquee', label: 'Marquee' },
      { href: '/docs/components/flip-list', label: 'FlipList' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  // Auto-close after route change on mobile.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <aside
      className={`sidebar${isOpen ? ' is-open' : ''}`}
      onClick={() => {
        if (window.innerWidth <= 860) setOpen((v) => !v);
      }}
    >
      {groups.map((group) => (
        <div className="sidebar-group" key={group.title}>
          <div className="sidebar-title">{group.title}</div>
          {group.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link${pathname === link.href ? ' active' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </aside>
  );
}
