import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { VisuallyHiddenDemo } from './demo';

export const metadata = { title: 'VisuallyHidden — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>VisuallyHidden</h1>
      <p className="lead">
        Hide content visually while keeping it available to assistive technology. Use it for
        icon-only buttons, table cells that need a label only screen readers see, and skip
        links.
      </p>

      <VisuallyHiddenDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { VisuallyHidden } from '@bwo-ui/react';

<IconButton onClick={dismiss}>
  <CloseIcon aria-hidden />
  <VisuallyHidden>Dismiss notification</VisuallyHidden>
</IconButton>

<a href="#main" className="skip-link">
  <VisuallyHidden>Skip to main content</VisuallyHidden>
</a>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'as', type: 'ElementType', defaultValue: "'span'", description: 'Tag to render.' },
        ]}
      />
    </>
  );
}
