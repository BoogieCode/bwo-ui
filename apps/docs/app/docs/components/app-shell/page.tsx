import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { AppShellDemo } from './demo';

export const metadata = { title: 'AppShell — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>AppShell</h1>
      <p className="lead">
        Three-row vertical frame — header (fixed), scrollable content, optional footer
        (fixed). Mirrors the framed page pattern (think app chrome) and pairs with{' '}
        <code>BrandMark</code> for a wordmark in the header.
      </p>

      <AppShellDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { AppShell, BrandMark, Button } from '@bwo-ui/react';

<AppShell
  maxWidth={420}
  align="center"
  header={
    <>
      <BrandMark brand="BOOGIE" tld=".RO" href="/" />
      <div style={{ display: 'inline-flex', gap: 8 }}>
        <Button size="sm" variant="ghost">Ghid</Button>
        <Button size="sm" variant="outline">Login</Button>
      </div>
    </>
  }
  footer={<span>#crafted-in-ro</span>}
>
  {/* your page content */}
</AppShell>`}</CodeBlock>

      <h2>Alignment</h2>
      <p>
        The <code>align</code> prop controls where the shell sits horizontally inside its
        parent — handy when the shell is narrower than its container (a constrained{' '}
        <code>maxWidth</code> inside a full-bleed page, for example).
      </p>
      <ul>
        <li>
          <code>&apos;center&apos;</code> <em>(default)</em> — equivalent to{' '}
          <code>margin: 0 auto</code>. The shell sits in the middle of the parent.
        </li>
        <li>
          <code>&apos;left&apos;</code> — shell hugs the parent&apos;s left edge.
        </li>
        <li>
          <code>&apos;right&apos;</code> — shell hugs the parent&apos;s right edge.
        </li>
      </ul>
      <p>
        Alignment only matters when the shell&apos;s <code>maxWidth</code> is smaller than
        the parent. A full-width shell looks the same in all three modes. The prop also
        emits a <code>data-align</code> attribute and a{' '}
        <code>bwo-app-shell--&#123;align&#125;</code> modifier class so you can hook into
        either from custom CSS.
      </p>
      <CodeBlock lang="tsx">{`<AppShell align="left"  maxWidth={420}>{/* hugs left  */}</AppShell>
<AppShell align="center" maxWidth={420}>{/* default      */}</AppShell>
<AppShell align="right" maxWidth={420}>{/* hugs right */}</AppShell>`}</CodeBlock>

      <h2>AppShell props</h2>
      <PropsTable
        rows={[
          {
            name: 'header',
            type: 'ReactNode',
            description: 'Top row — typically brand on the left, actions on the right.',
          },
          { name: 'footer', type: 'ReactNode', description: 'Bottom row. Optional.' },
          {
            name: 'maxWidth',
            type: 'number | string',
            description:
              'Constrains the shell width. Numbers are treated as px. Defaults to the CSS variable `--bwo-app-shell-max` (900px).',
          },
          {
            name: 'align',
            type: "'left' | 'center' | 'right'",
            defaultValue: "'center'",
            description:
              'Where the shell sits horizontally inside its parent. Only visible when `maxWidth` < parent width.',
          },
          {
            name: 'contentId',
            type: 'string',
            description:
              'Id on the scrollable content div — useful for `scrollIntoView` from elsewhere.',
          },
        ]}
      />

      <h2>BrandMark props</h2>
      <PropsTable
        rows={[
          { name: 'brand', type: 'ReactNode', description: 'Main wordmark, e.g. "BOOGIE".' },
          { name: 'accent', type: 'ReactNode', description: 'Optional fragment rendered in `--bwo-accent`.' },
          { name: 'tld', type: 'ReactNode', description: 'Trailing TLD-style suffix, smaller and muted.' },
        ]}
      />
    </>
  );
}
