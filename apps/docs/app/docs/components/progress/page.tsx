import { CodeBlock } from '../../../../components/code-block';
import { ProgressDemo } from './demo';

export const metadata = { title: 'Progress — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Progress</h1>
      <p className="lead">Determinate progress bar (0–100).</p>

      <ProgressDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Progress } from '@bwo-ui/react';

<Progress value={66} />`}</CodeBlock>
    </>
  );
}
