import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { PinInputDemo } from './demo';

export const metadata = { title: 'PinInput — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>PinInput</h1>
      <p className="lead">
        N-slot input for OTPs, PINs, and 2FA codes. Numeric or alphanumeric, optional mask,
        full paste support (paste the whole code anywhere — it spreads across slots), arrow
        keys + Backspace handled, fires <code>onComplete</code> when filled.
      </p>

      <PinInputDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { PinInput } from '@bwo-ui/react';

<PinInput
  length={6}
  onComplete={(code) => verifyOtp(code)}
  autoFocus
/>

// Alphanumeric, masked
<PinInput length={8} type="alphanumeric" mask />`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'length', type: 'number', defaultValue: '6', description: 'Number of slots.' },
          { name: 'value', type: 'string', description: 'Controlled value.' },
          { name: 'defaultValue', type: 'string', description: 'Uncontrolled default.' },
          { name: 'onValueChange', type: '(value: string) => void', description: 'Fires on every change.' },
          { name: 'onComplete', type: '(value: string) => void', description: 'Fires when the full PIN is filled.' },
          { name: 'type', type: "'numeric' | 'alphanumeric'", defaultValue: "'numeric'", description: 'Accepted character set.' },
          { name: 'mask', type: 'boolean', defaultValue: 'false', description: 'Show characters as bullets (password-style).' },
          { name: 'error', type: 'boolean', defaultValue: 'false', description: 'Show error border.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Slot dimensions.' },
          { name: 'autoFocus', type: 'boolean', defaultValue: 'false', description: 'Focus the first slot on mount.' },
        ]}
      />
    </>
  );
}
