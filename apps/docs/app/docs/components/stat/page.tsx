import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { StatDemo } from './demo';

export const metadata = { title: 'Stat — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Stat</h1>
      <p className="lead">
        Big number + label. Wraps <code>CountUp</code> when given a numeric <code>count</code>.
      </p>

      <StatDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Stat } from '@bwo-ui/react';

<Stat label="Sites shipped" count={420} />
<Stat label="Uptime" count={99.9} decimals={1} suffix="%" />
<Stat label="Version" value="v2.0" />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'label', type: 'ReactNode', description: 'Caption beneath the value.' },
          { name: 'count', type: 'number', description: 'Numeric value, animated from 0.' },
          { name: 'decimals', type: 'number', defaultValue: '0', description: 'Decimal places for count.' },
          { name: 'prefix', type: 'string', description: 'Prepended to the number (e.g. "$").' },
          { name: 'suffix', type: 'string', description: 'Appended to the number (e.g. "%").' },
          { name: 'value', type: 'ReactNode', description: 'Static value when not numeric.' },
          { name: 'hint', type: 'ReactNode', description: 'Optional sub-line under the label.' },
        ]}
      />
    </>
  );
}
