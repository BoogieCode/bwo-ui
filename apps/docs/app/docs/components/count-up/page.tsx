import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { CountUpDemo } from './demo';

export const metadata = { title: 'CountUp — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>CountUp</h1>
      <p className="lead">
        Animates a number up to a target value when the element enters the viewport.
      </p>

      <CountUpDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { CountUp } from '@bwo-ui/react';

<CountUp to={2_500_000} duration={2} />
<CountUp to={98} suffix="%" duration={1.6} />
<CountUp to={4200} prefix="$" separator="," />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'to', type: 'number', description: 'End value.' },
          { name: 'from', type: 'number', defaultValue: '0', description: 'Start value.' },
          { name: 'duration', type: 'number', defaultValue: '2', description: 'Seconds.' },
          { name: 'decimals', type: 'number', defaultValue: '0', description: 'Decimal places.' },
          { name: 'separator', type: 'string', defaultValue: "','", description: 'Thousands separator.' },
          { name: 'decimal', type: 'string', defaultValue: "'.'", description: 'Decimal separator.' },
          { name: 'prefix', type: 'string', description: 'Prepended (e.g. "$").' },
          { name: 'suffix', type: 'string', description: 'Appended (e.g. "%").' },
          { name: 'start', type: 'string', defaultValue: "'top 85%'", description: 'ScrollTrigger start.' },
          { name: 'once', type: 'boolean', defaultValue: 'true', description: 'Play only once.' },
        ]}
      />
    </>
  );
}
