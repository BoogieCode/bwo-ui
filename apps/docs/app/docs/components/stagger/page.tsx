import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { StaggerDemo } from './demo';

export const metadata = { title: 'Stagger — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Stagger</h1>
      <p className="lead">
        Stagger-in a container's direct children when it enters the viewport. Useful for
        cards, lists, grid items.
      </p>

      <StaggerDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Stagger } from '@bwo-ui/react';

<Stagger stagger={0.08} from={{ y: 32, opacity: 0 }}>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</Stagger>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'itemSelector', type: 'string', defaultValue: "':scope > *'", description: 'Direct children selector.' },
          { name: 'from', type: '{ y?, x?, opacity?, scale?, rotate? }', description: 'Initial state for each child.' },
          { name: 'duration', type: 'number', defaultValue: '0.8', description: 'Per-item duration.' },
          { name: 'stagger', type: 'number', defaultValue: '0.08', description: 'Stagger between items.' },
          { name: 'ease', type: 'string', defaultValue: "'power3.out'", description: 'GSAP ease.' },
          { name: 'start', type: 'string', defaultValue: "'top 85%'", description: 'ScrollTrigger start.' },
          { name: 'once', type: 'boolean', defaultValue: 'true', description: 'Play only once.' },
        ]}
      />
    </>
  );
}
