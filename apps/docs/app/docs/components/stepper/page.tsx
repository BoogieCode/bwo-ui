import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { StepperDemo } from './demo';

export const metadata = { title: 'Stepper — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Stepper</h1>
      <p className="lead">
        Multi-step flow indicator with linear or non-linear navigation. Horizontal and vertical
        orientations.
      </p>

      <StepperDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Stepper, Step, StepConnector } from '@bwo-ui/react';

<Stepper activeStep={1}>
  <Step index={0} label="Account" description="Sign up" />
  <StepConnector />
  <Step index={1} label="Plan" description="Pick a tier" />
  <StepConnector />
  <Step index={2} label="Payment" description="Add billing" />
</Stepper>`}</CodeBlock>

      <h2>Props — Stepper</h2>
      <PropsTable
        rows={[
          {
            name: 'activeStep',
            type: 'number',
            description: 'Zero-based index of the active step.',
          },
          {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description: 'Layout direction.',
          },
          {
            name: 'linear',
            type: 'boolean',
            defaultValue: 'true',
            description:
              "When true, future (pending) steps can't be jumped to via a clickable indicator.",
          },
        ]}
      />

      <h2>Props — Step</h2>
      <PropsTable
        rows={[
          { name: 'index', type: 'number', description: 'Zero-based index of this step.' },
          { name: 'label', type: 'ReactNode', description: 'Title shown next to the indicator.' },
          {
            name: 'description',
            type: 'ReactNode',
            description: 'Supporting text under the label.',
          },
          { name: 'icon', type: 'ReactNode', description: 'Custom indicator content.' },
          {
            name: 'status',
            type: "'completed' | 'active' | 'pending' | 'error'",
            description: 'Force a status; otherwise derived from activeStep.',
          },
          {
            name: 'clickable',
            type: 'boolean',
            description: 'Render the indicator as a button. Calls onActivate when pressed.',
          },
          {
            name: 'onActivate',
            type: '(index: number) => void',
            description: 'Called when a clickable indicator is activated.',
          },
        ]}
      />
    </>
  );
}
