import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ContainerDemo } from './demo';

export const metadata = { title: 'Container — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Container</h1>
      <p className="lead">
        Max-width wrapper with a consistent horizontal gutter. Five size presets — sm (640),
        md (780), lg (1080, default), xl (1280), full.
      </p>

      <ContainerDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Container } from '@bwo-ui/react';

<Container size="lg">
  <Hero />
  <FeatureGrid />
</Container>

// Custom gutter
<Container size="md" gutter={32}>
  <Article />
</Container>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", defaultValue: "'lg'", description: 'Max-width preset.' },
          { name: 'gutter', type: 'number | string', defaultValue: '24', description: 'Inline padding. Number → px, string passes through.' },
          { name: 'as', type: 'ElementType', defaultValue: "'div'", description: 'Tag to render — useful as a section or main.' },
        ]}
      />
    </>
  );
}
