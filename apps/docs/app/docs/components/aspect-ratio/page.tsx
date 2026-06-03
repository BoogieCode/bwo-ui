import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { AspectRatioDemo } from './demo';

export const metadata = { title: 'AspectRatio — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>AspectRatio</h1>
      <p className="lead">
        Locks its child to a specific aspect ratio (16/9, 4/3, 1/1, anything you pass). The
        child fills 100% × 100% of the box via absolute positioning.
      </p>

      <AspectRatioDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { AspectRatio } from '@bwo-ui/react';

<AspectRatio ratio={16 / 9}>
  <img src="/hero.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</AspectRatio>

<AspectRatio ratio={1}>
  <Avatar />
</AspectRatio>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'ratio',
            type: 'number',
            defaultValue: '16 / 9',
            description: 'width / height. Pass any number — 16/9, 4/3, 1.85, etc.',
          },
        ]}
      />
    </>
  );
}
