import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { BootScreenDemo } from './demo';

export const metadata = { title: 'BootScreen — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>BootScreen</h1>
      <p className="lead">
        Full-viewport overlay that fades out after a timeout (or on an external{' '}
        <code>dismissed</code> flag). Compose with <code>Skeleton</code> to render a
        boot scaffold for chrome that takes time to fully mount.
      </p>

      <BootScreenDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { BootScreen, Skeleton } from '@bwo-ui/react';

<BootScreen timeout={900} maxWidth={900}>
  <div style={{ padding: 32 }}>
    <Skeleton height={56} style={{ width: 430, marginBottom: 8 }} />
    <Skeleton height={56} style={{ width: 520, marginBottom: 8 }} />
    <Skeleton height={56} style={{ width: 450 }} />
  </div>
</BootScreen>`}</CodeBlock>

      <p>
        <strong>Prefer per-component skeletons.</strong> For most layouts a{' '}
        <code>Preanimate</code>-driven swap is cleaner — see{' '}
        <a href="/docs/components/preanimate">Preanimate</a>. Use <code>BootScreen</code>{' '}
        only when you need the entire chrome (page header, sidebars, nav) covered
        during boot.
      </p>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'timeout', type: 'number', description: 'Auto-dismiss after this many ms. Omit to never auto-dismiss.' },
          { name: 'dismissed', type: 'boolean', defaultValue: 'false', description: 'External force-dismiss flag.' },
          { name: 'onDismiss', type: '() => void', description: 'Fires after the fade-out finishes (~420ms after dismissed flips).' },
          { name: 'maxWidth', type: 'number | string', description: 'Width of the inner shell. Numbers treated as px.' },
        ]}
      />
    </>
  );
}
