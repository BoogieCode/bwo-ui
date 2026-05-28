import { CodeBlock } from '../../../components/code-block';
import { TokenSwatches } from './tokens';

export const metadata = { title: 'Theming — bwo-ui' };

export default function ThemingPage() {
  return (
    <>
      <h1>Theming</h1>
      <p className="lead">
        Every component reads CSS custom properties prefixed <code>--bwo-*</code>. Override them
        anywhere in your stylesheet (on <code>:root</code>, a wrapper, or a specific component) to
        re-skin the entire library.
      </p>

      <h2>Quick override</h2>
      <CodeBlock lang="css">{`/* app/globals.css */
:root {
  --bwo-accent: #7463ff;          /* swap red for purple */
  --bwo-radius-pill: 6px;         /* boxier buttons */
  --bwo-font-sans: 'Geist', sans-serif;
}`}</CodeBlock>

      <h2>Dark mode</h2>
      <p>
        Toggle by adding the class <code>boo-dark</code> on <code>&lt;html&gt;</code>. The CSS
        ships dark-mode overrides for every component. For SSR, set the class before paint via an
        inline script that reads from localStorage (see the{' '}
        <a href="https://github.com/BoogieCode/bwo-ui/blob/master/apps/docs/components/theme-toggle.tsx" target="_blank" rel="noopener noreferrer">
          ThemeToggle source
        </a>{' '}
        for the no-flash snippet).
      </p>
      <CodeBlock lang="ts">{`// In a <script> tag inside <head>:
(function () {
  try {
    var t = localStorage.getItem('bwo-theme');
    if (!t) {
      t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (t === 'dark') document.documentElement.classList.add('boo-dark');
  } catch (e) {}
})();`}</CodeBlock>

      <h2>Tokens</h2>
      <p>
        These are all the values you can override. Click any swatch to copy its name to the
        clipboard.
      </p>

      <TokenSwatches />

      <h2>Per-instance theming</h2>
      <p>
        Because tokens are inherited, you can scope a different theme to any subtree by writing
        the variables on a wrapper element:
      </p>
      <CodeBlock lang="tsx">{`<div style={{ ['--bwo-accent']: '#a0ff27' } as React.CSSProperties}>
  <Button variant="primary">Green-accent button</Button>
</div>`}</CodeBlock>

      <h2>Mapping to your own design system</h2>
      <p>
        If you already have a token system (Geist, Tailwind, etc.), bridge the two with{' '}
        <code>var(--your-token)</code>:
      </p>
      <CodeBlock lang="css">{`:root {
  --bwo-accent: var(--brand-primary);
  --bwo-radius-md: var(--radius-lg);
  --bwo-font-sans: var(--font-body);
}`}</CodeBlock>
    </>
  );
}
