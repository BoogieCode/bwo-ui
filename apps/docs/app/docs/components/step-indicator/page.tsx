import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { StepIndicatorDemo } from './demo';

export const metadata = { title: 'StepIndicator — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>StepIndicator</h1>
      <p className="lead">
        Multi-step progress bar — onboarding flows, checkout wizards, multi-page forms.
        Numbered or dot variant, horizontal or vertical, click-back to a completed step when
        you wire <code>onStepSelect</code>.
      </p>

      <StepIndicatorDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { StepIndicator } from '@bwo-ui/react';

const STEPS = [
  { label: 'Account' },
  { label: 'Workspace' },
  { label: 'Invite' },
  { label: 'Done' },
];

<StepIndicator
  steps={STEPS}
  current={2}
  onStepSelect={(i) => setStep(i)}
/>

// Dots variant, vertical
<StepIndicator
  steps={STEPS}
  current={1}
  variant="dots"
  orientation="vertical"
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'steps', type: 'StepIndicatorItem[]', description: 'Array of { label, description?, icon?, disabled? }.' },
          { name: 'current', type: 'number', description: 'Zero-indexed current step.' },
          { name: 'orientation', type: "'horizontal' | 'vertical'", defaultValue: "'horizontal'", description: 'Layout direction.' },
          { name: 'variant', type: "'numbered' | 'dots'", defaultValue: "'numbered'", description: 'Numeric badges vs small dots.' },
          { name: 'onStepSelect', type: '(index: number) => void', description: 'When set, completed steps become clickable.' },
        ]}
      />
    </>
  );
}
