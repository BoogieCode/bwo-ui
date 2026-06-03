'use client';

import { StepIndicator } from '@bwo-ui/react';
import { useState } from 'react';

const STEPS = [
  { label: 'Account', description: 'Email & password' },
  { label: 'Workspace', description: 'Name your team' },
  { label: 'Invite', description: 'Add 3 teammates' },
  { label: 'Done', description: 'Ship the boogie' },
];

export function StepIndicatorDemo() {
  const [step, setStep] = useState(1);
  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 20, padding: 24, alignItems: 'stretch' }}
    >
      <StepIndicator steps={STEPS} current={step} onStepSelect={setStep} />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="bwo-button"
          style={{ background: 'var(--bwo-grey-4)' }}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
          className="bwo-button"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
