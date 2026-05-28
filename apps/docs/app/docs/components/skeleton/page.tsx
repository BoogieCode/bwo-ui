import { CodeBlock } from '../../../../components/code-block';
import { SkeletonDemo } from './demo';

export const metadata = { title: 'Skeleton — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Skeleton</h1>
      <p className="lead">Animated loading placeholder. Use while data is fetching.</p>

      <SkeletonDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Skeleton } from '@bwo-ui/react';

<Skeleton width={200} height={20} />
<Skeleton circle width={40} height={40} />`}</CodeBlock>
    </>
  );
}
