import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';
import { NO_FLASH_THEME_SCRIPT } from '../components/theme-toggle';
import { TopNav } from '../components/top-nav';
import './globals.css';
import '@bwo-ui/react/styles.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--bwo-font-sans-loaded',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--bwo-font-grotesk-loaded',
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
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
      </head>
      <body>
        <TopNav />
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
