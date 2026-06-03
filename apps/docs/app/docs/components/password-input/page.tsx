import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { PasswordInputDemo } from './demo';

export const metadata = { title: 'PasswordInput — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>PasswordInput</h1>
      <p className="lead">
        Password field with reveal toggle + 4-bar strength meter. The built-in scorer checks
        length, mixed case, digits, and symbols — override with your own
        <code> strength()</code> for stricter or zxcvbn-style policies.
      </p>

      <PasswordInputDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { PasswordInput } from '@bwo-ui/react';

<PasswordInput
  placeholder="At least 8 characters"
  onChange={(e) => setPassword(e.target.value)}
/>

// Custom scorer — return { score: 0..4, label }
<PasswordInput
  strength={(v) => myZxcvbn(v)}
  error={errors.password}
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'toggleable', type: 'boolean', defaultValue: 'true', description: 'Show the eye reveal button.' },
          { name: 'meter', type: 'boolean', defaultValue: 'true', description: 'Render the 4-bar strength meter.' },
          { name: 'strength', type: '(value: string) => { score: 0..4; label: string }', description: 'Custom strength function.' },
          { name: 'error', type: 'string', description: 'Error message rendered below the field.' },
        ]}
      />
    </>
  );
}
