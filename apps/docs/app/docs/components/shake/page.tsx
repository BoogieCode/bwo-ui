import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ShakeDemo } from './demo';

export const metadata = { title: 'Shake — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Shake</h1>
      <p className="lead">
        Single-shot shake — decaying x/y oscillation that settles back to centre. Trigger via
        ref or by changing the <code>trigger</code> prop. Use it for form validation errors,
        "wrong password" feedback, "card declined" states. GSAP-backed.
      </p>

      <ShakeDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Shake, ShakeHandle } from '@bwo-ui/react';

// Imperative
const ref = useRef<ShakeHandle>(null);

<Shake ref={ref}>
  <Card />
</Shake>

<Button onClick={() => ref.current?.shake()}>Try again</Button>

// Reactive — bump the trigger value to fire
<Shake trigger={errorAttempt} intensity={6} axis="x">
  <PinInput />
</Shake>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'axis', type: "'x' | 'y'", defaultValue: "'x'", description: 'Shake axis.' },
          { name: 'duration', type: 'number', defaultValue: '0.5', description: 'Total shake duration in seconds.' },
          { name: 'cycles', type: 'number', defaultValue: '6', description: 'Number of full oscillations.' },
          { name: 'intensity', type: 'number', defaultValue: '8', description: 'Max displacement in pixels.' },
          { name: 'ease', type: 'string', defaultValue: "'power1.out'", description: 'GSAP ease.' },
          { name: 'trigger', type: 'unknown', description: 'When this value changes, fires the shake.' },
          { name: 'onComplete', type: '() => void', description: 'Fires when the shake settles.' },
          { name: 'as', type: 'ElementType', defaultValue: "'div'", description: 'Tag to render.' },
        ]}
      />
    </>
  );
}
