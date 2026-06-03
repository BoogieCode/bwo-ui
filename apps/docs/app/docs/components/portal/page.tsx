import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { PortalDemo } from './demo';

export const metadata = { title: 'Portal — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Portal</h1>
      <p className="lead">
        SSR-safe wrapper around React&apos;s <code>createPortal</code>. Renders children into
        any DOM node (default <code>document.body</code>) without breaking the React tree —
        perfect for overlays, toasts, and tooltips that need to escape an
        <code> overflow: hidden</code> ancestor.
      </p>

      <PortalDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Portal } from '@bwo-ui/react';

<Portal>
  <Toast />
</Portal>

// Portal into a custom container
<Portal container={() => document.getElementById('overlay-root')}>
  <Modal />
</Portal>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'container',
            type: 'Element | DocumentFragment | (() => Element | DocumentFragment | null) | null',
            description: 'Target DOM node. Function is invoked once after mount. Defaults to document.body.',
          },
          {
            name: 'disableSSR',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Suppress render until the container resolves on the client.',
          },
        ]}
      />
    </>
  );
}
