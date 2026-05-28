'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './theme-toggle';

type Submenu = { href: string; label: string }[];
type Item =
  | { kind: 'link'; href: string; label: string }
  | { kind: 'dropdown'; label: string; columns: { title: string; links: Submenu }[] };

const ITEMS: Item[] = [
  {
    kind: 'dropdown',
    label: 'Components',
    columns: [
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
    ],
  },
  {
    kind: 'dropdown',
    label: 'Motion',
    columns: [
      {
        title: 'Reveals',
        links: [
          { href: '/docs/components/split-reveal', label: 'SplitReveal' },
          { href: '/docs/components/reveal', label: 'Reveal' },
          { href: '/docs/components/parallax', label: 'Parallax' },
          { href: '/docs/components/blur', label: 'Blur' },
          { href: '/docs/components/stagger', label: 'Stagger' },
          { href: '/docs/components/scroll-progress', label: 'ScrollProgress' },
          { href: '/docs/components/pin', label: 'Pin' },
          { href: '/docs/components/preanimate', label: 'Preanimate' },
          { href: '/docs/components/boot-screen', label: 'BootScreen' },
        ],
      },
      {
        title: 'Text',
        links: [
          { href: '/docs/components/typewriter', label: 'Typewriter' },
          { href: '/docs/components/scramble-text', label: 'ScrambleText' },
          { href: '/docs/components/text-glitch', label: 'TextGlitch' },
          { href: '/docs/components/gradient-text', label: 'GradientText' },
          { href: '/docs/components/count-up', label: 'CountUp' },
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
          { href: '/docs/components/spin', label: 'Spin' },
          { href: '/docs/components/pulse', label: 'Pulse' },
          { href: '/docs/components/marquee', label: 'Marquee' },
          { href: '/docs/components/flip-list', label: 'FlipList' },
        ],
      },
    ],
  },
  { kind: 'link', href: '/docs/introduction', label: 'Docs' },
  { kind: 'link', href: '/docs/theming', label: 'Theming' },
  { kind: 'link', href: '/docs/typography', label: 'Typography' },
  { kind: 'link', href: '/playground/boogie-ro', label: 'Playground' },
];

export function TopNav() {
  const pathname = usePathname();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    setOpenIdx(null);
  }, [pathname]);

  return (
    <header className="tp-header">
      <div className="shell tp-header-inner">
        <div className="tp-header-logo">
          <Link href="/" className="brand">
            bwo-ui
          </Link>
        </div>

        <div className="tp-header-box text-center">
          <div className="tp-header-menu">
            <nav>
              <ul>
                {ITEMS.map((item, i) => {
                  if (item.kind === 'link') {
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className={pathname === item.href ? 'is-active' : undefined}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  }
                  const isOpen = openIdx === i;
                  return (
                    <li
                      key={item.label}
                      className={`has-dropdown${isOpen ? ' is-open' : ''}`}
                      onMouseEnter={() => setOpenIdx(i)}
                      onMouseLeave={() => setOpenIdx((prev) => (prev === i ? null : prev))}
                    >
                      <button
                        type="button"
                        className="tp-header-trigger"
                        aria-expanded={isOpen}
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                      >
                        {item.label}
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M1 1l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div className="tp-submenu-wrapper">
                        <div className="tp-submenu-grid">
                          {item.columns.map((col) => (
                            <div className="tp-submenu-col" key={col.title}>
                              <h4>{col.title}</h4>
                              <ul>
                                {col.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className={
                                        pathname === link.href ? 'is-active' : undefined
                                      }
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <div className="tp-header-right">
          <a
            href="https://www.npmjs.com/package/@bwo-ui/react"
            target="_blank"
            rel="noopener noreferrer"
            className="tp-header-action"
            aria-label="npm"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M2 7v10h6v-7h3v7h11V7H2zm15 8h-2v-6h-3v6H9V9h8v6z" />
            </svg>
          </a>
          <a
            href="https://github.com/BoogieCode/bwo-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="tp-header-action"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.55v-1.92c-3.2.7-3.87-1.55-3.87-1.55-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.74-1.55-2.55-.3-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.1-.12-.3-.52-1.5.1-3.13 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.88-.4.98 0 1.96.13 2.88.4 2.2-1.5 3.17-1.18 3.17-1.18.63 1.63.23 2.83.12 3.13.74.8 1.2 1.83 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.4.36.78 1.07.78 2.17v3.22c0 .31.21.67.8.55C20.21 21.42 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
