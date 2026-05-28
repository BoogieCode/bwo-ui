'use client';

import { Alert } from '@bwo-ui/react';

export function AlertDemo() {
  return (
    <div className="demo" style={{ flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
      <Alert variant="info" title="Heads up">
        This is an informational message.
      </Alert>
      <Alert variant="success" title="Saved" onDismiss={() => {}}>
        Your changes have been published.
      </Alert>
      <Alert variant="warning" title="Heads up">
        This action cannot be undone.
      </Alert>
      <Alert variant="error" title="Something went wrong">
        Please try again in a moment.
      </Alert>
    </div>
  );
}
