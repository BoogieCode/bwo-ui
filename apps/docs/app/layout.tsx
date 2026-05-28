import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { NO_FLASH_THEME_SCRIPT, ThemeToggle } from '../components/theme-toggle';
import './globals.css';
import '@bwo-ui/react/styles.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--bwo-font-sans-loaded',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--bwo-font-display-loaded',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'bwo-ui — UI + GSAP motion for React, Vue, and Svelte',
  description:
    'A boogie-themed UI kit and motion library: buttons, inputs, sliders, dropdowns, plus scroll reveals, magnetic buttons, marquees, and animated layout shifts. One core, three frameworks.',
  metadataBase: new URL('https://bwo-ui.dev'),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
      </head>
      <body>
        <header className="topnav">
          <div className="shell topnav-inner">
            <Link href="/" className="brand">
              <span className="brand-dot" aria-hidden />
              bwo-ui
            </Link>
            <nav className="topnav-links">
              <Link href="/docs/installation">Docs</Link>
              <Link href="/docs/components/button">UI</Link>
              <Link href="/docs/components/split-reveal">Motion</Link>
              <Link href="/docs/theming">Theming</Link>
              <a
                href="https://github.com/BoogieCode/bwo-ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        {children}
        <footer>
          MIT licensed. Built by{' '}
          <a href="https://boogie.ro" target="_blank" rel="noopener noreferrer">
            BOOGIE WOOGIE S.R.L.
          </a>
        </footer>
      </body>
    </html>
  );
}
