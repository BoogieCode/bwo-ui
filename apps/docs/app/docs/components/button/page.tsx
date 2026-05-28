import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ButtonDemo } from './demo';

export const metadata = { title: 'Button — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Button</h1>
      <p className="lead">
        The boogie button. Pill-shaped by default, with green, yellow, ghost, outline, and solid
        (uppercase) variants.
      </p>

      <ButtonDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Button } from '@bwo-ui/react';

<Button>Primary</Button>
<Button variant="green">Green</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="solid">Solid CTA</Button>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'primary' | 'green' | 'yellow' | 'ghost' | 'outline' | 'solid'",
            defaultValue: "'primary'",
            description:
              'Visual variant. `solid` is the uppercase CTA pill at 40px radius from boogie-next.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: 'Padding + font-size preset.',
          },
        ]}
      />
      <p>
        All other props are forwarded to the underlying <code>&lt;button&gt;</code>.
      </p>
    </>
  );
}
