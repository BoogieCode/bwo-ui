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
      { href: '/docs/components/container', label: 'Container' },
      { href: '/docs/components/aspect-ratio', label: 'AspectRatio' },
      { href: '/docs/components/glow', label: 'Glow' },
      { href: '/docs/components/simple-grid', label: 'SimpleGrid' },
      { href: '/docs/components/grid', label: 'Grid' },
      { href: '/docs/components/scroll-area', label: 'ScrollArea' },
      { href: '/docs/components/separator', label: 'Separator' },
      { href: '/docs/components/card', label: 'Card' },
      { href: '/docs/components/button', label: 'Button' },
      { href: '/docs/components/icon-button', label: 'IconButton' },
      { href: '/docs/components/floating-action-button', label: 'FloatingActionButton' },
      { href: '/docs/components/badge', label: 'Badge' },
      { href: '/docs/components/chip', label: 'Chip' },
      { href: '/docs/components/avatar', label: 'Avatar' },
      { href: '/docs/components/kbd', label: 'Kbd' },
      { href: '/docs/components/code', label: 'Code' },
      { href: '/docs/components/stat', label: 'Stat' },
      { href: '/docs/components/timeline', label: 'Timeline' },
    ],
  },
  {
    title: 'Form',
    links: [
      { href: '/docs/components/input', label: 'Input' },
      { href: '/docs/components/textarea', label: 'Textarea' },
      { href: '/docs/components/number-input', label: 'NumberInput' },
      { href: '/docs/components/password-input', label: 'PasswordInput' },
      { href: '/docs/components/pin-input', label: 'PinInput' },
      { href: '/docs/components/tag-input', label: 'TagInput' },
      { href: '/docs/components/select', label: 'Select' },
      { href: '/docs/components/combobox', label: 'Combobox' },
      { href: '/docs/components/checkbox', label: 'Checkbox' },
      { href: '/docs/components/radio-group', label: 'RadioGroup' },
      { href: '/docs/components/switch', label: 'Switch' },
      { href: '/docs/components/slider', label: 'Slider' },
      { href: '/docs/components/rate', label: 'Rate' },
      { href: '/docs/components/color-picker', label: 'ColorPicker' },
      { href: '/docs/components/file-upload', label: 'FileUpload' },
      { href: '/docs/components/calendar', label: 'Calendar' },
      { href: '/docs/components/date-picker', label: 'DatePicker' },
      { href: '/docs/components/time-picker', label: 'TimePicker' },
      { href: '/docs/components/stepper', label: 'Stepper' },
    ],
  },
  {
    title: 'Data',
    links: [
      { href: '/docs/components/data-table', label: 'DataTable' },
      { href: '/docs/components/command', label: 'Command' },
    ],
  },
  {
    title: 'Overlay',
    links: [
      { href: '/docs/components/dialog', label: 'Dialog' },
      { href: '/docs/components/sheet', label: 'Sheet' },
      { href: '/docs/components/popover', label: 'Popover' },
      { href: '/docs/components/hover-card', label: 'HoverCard' },
      { href: '/docs/components/tooltip', label: 'Tooltip' },
      { href: '/docs/components/toast', label: 'Toast' },
      { href: '/docs/components/dropdown-menu', label: 'DropdownMenu' },
      { href: '/docs/components/context-menu', label: 'ContextMenu' },
      { href: '/docs/components/portal', label: 'Portal' },
    ],
  },
  {
    title: 'Navigation',
    links: [
      { href: '/docs/components/tabs', label: 'Tabs' },
      { href: '/docs/components/segmented-control', label: 'SegmentedControl' },
      { href: '/docs/components/accordion', label: 'Accordion' },
      { href: '/docs/components/collapsible', label: 'Collapsible' },
      { href: '/docs/components/breadcrumb', label: 'Breadcrumb' },
      { href: '/docs/components/pagination', label: 'Pagination' },
      { href: '/docs/components/bottom-navigation', label: 'BottomNavigation' },
      { href: '/docs/components/carousel', label: 'Carousel' },
      { href: '/docs/components/step-indicator', label: 'StepIndicator' },
    ],
  },
  {
    title: 'Feedback',
    links: [
      { href: '/docs/components/spinner', label: 'Spinner' },
      { href: '/docs/components/dot-loader', label: 'DotLoader' },
      { href: '/docs/components/skeleton', label: 'Skeleton' },
      { href: '/docs/components/progress', label: 'Progress' },
      { href: '/docs/components/alert', label: 'Alert' },
      { href: '/docs/components/banner', label: 'Banner' },
      { href: '/docs/components/empty', label: 'Empty' },
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
      { href: '/docs/components/scroll-reveal', label: 'ScrollReveal' },
      { href: '/docs/components/scroll-mask', label: 'ScrollMask' },
      { href: '/docs/components/scroll-velocity', label: 'ScrollVelocity' },
      { href: '/docs/components/scroll-snap', label: 'ScrollSnap' },
      { href: '/docs/components/circle-reveal', label: 'CircleReveal · PageIris' },
      { href: '/docs/components/pin', label: 'Pin' },
      { href: '/docs/components/typewriter', label: 'Typewriter' },
      { href: '/docs/components/scramble-text', label: 'ScrambleText' },
      { href: '/docs/components/text-decode', label: 'TextDecode' },
      { href: '/docs/components/text-shimmer', label: 'TextShimmer' },
      { href: '/docs/components/text-glitch', label: 'TextGlitch' },
      { href: '/docs/components/gradient-text', label: 'GradientText' },
      { href: '/docs/components/count-up', label: 'CountUp' },
      { href: '/docs/components/spin', label: 'Spin' },
      { href: '/docs/components/pulse', label: 'Pulse' },
      { href: '/docs/components/shake', label: 'Shake' },
      { href: '/docs/components/confetti', label: 'Confetti' },
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
      { href: '/docs/components/squircle', label: 'Squircle' },
      { href: '/docs/components/marquee', label: 'Marquee' },
      { href: '/docs/components/flip-list', label: 'FlipList' },
    ],
  },
  {
    title: 'Utility',
    links: [
      { href: '/docs/components/visually-hidden', label: 'VisuallyHidden' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);

  // Auto-close after route change on mobile.
  useEffect(() => setOpen(false), [pathname]);

  const activeLabel =
    groups
      .flatMap((g) => g.links)
      .find((l) => l.href === pathname)?.label ?? 'Browse components';

  return (
    <aside className={`sidebar${isOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="sidebar-toggle"
        aria-expanded={isOpen}
        aria-controls="sidebar-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sidebar-toggle-label">
          <span className="sidebar-toggle-eyebrow">Navigation</span>
          <span className="sidebar-toggle-active">{activeLabel}</span>
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="sidebar-toggle-icon"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div id="sidebar-nav" className="sidebar-nav-inner">
        {groups.map((group) => (
          <div className="sidebar-group" key={group.title}>
            <div className="sidebar-title">{group.title}</div>
            {group.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`sidebar-link${pathname === link.href ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
