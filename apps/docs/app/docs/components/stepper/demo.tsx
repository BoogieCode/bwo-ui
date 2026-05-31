'use client';

import { useState } from 'react';
import { Button, Step, StepConnector, Stepper } from '@bwo-ui/react';

export function StepperDemo() {
  const [step, setStep] = useState(1);
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 24, alignItems: 'stretch' }}>
      <Stepper activeStep={step}>
        <Step index={0} label="Account" description="Sign up" />
        <StepConnector />
        <Step index={1} label="Plan" description="Pick a tier" />
        <StepConnector />
        <Step index={2} label="Payment" description="Add billing" />
        <StepConnector />
        <Step index={3} label="Done" description="You're all set" />
      </Stepper>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </Button>
        <Button onClick={() => setStep((s) => Math.min(3, s + 1))} disabled={step === 3}>
          Next
        </Button>
      </div>
    </div>
  );
}
