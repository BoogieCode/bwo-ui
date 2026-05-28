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
  maxWidth={900}
  header={
    <>
      <BrandMark brand="BOOGIE" tld=".RO" href="/" />
      <Button size="sm" variant="outline">Login</Button>
    </>
  }
  footer={<span>#crafted-in-ro</span>}
>
  {/* your page content */}
</AppShell>`}</CodeBlock>

      <h2>AppShell props</h2>
      <PropsTable
        rows={[
          { name: 'header', type: 'ReactNode', description: 'Top row — typically brand on the left, actions on the right.' },
          { name: 'footer', type: 'ReactNode', description: 'Bottom row. Optional.' },
          {
            name: 'maxWidth',
            type: 'number | string',
            description: 'Constrains the shell width. Numbers are treated as px.',
          },
          {
            name: 'contentId',
            type: 'string',
            description: 'Id on the scrollable content div — useful for `scrollIntoView` from elsewhere.',
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
