'use client';

import {
  Preanimate,
  PreanimateProvider,
  Skeleton,
  SplitReveal,
  Stagger,
  Card,
} from '@bwo-ui/react';
import { useState } from 'react';

export function PreanimateDemo() {
  const [run, setRun] = useState(0);

  return (
    <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 16 }}>
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="bwo-btn bwo-btn--ghost bwo-btn--sm"
        style={{ alignSelf: 'flex-start' }}
      >
        Replay
      </button>

      <PreanimateProvider key={run} duration={900}>
        <Preanimate
          skeleton={
            <>
              <Skeleton height={36} style={{ width: '70%', marginBottom: 8 }} />
              <Skeleton height={36} style={{ width: '55%' }} />
            </>
          }
        >
          <SplitReveal as="h3" type="words" stagger={0.06} duration={0.7}>
            Real headline that animates in
          </SplitReveal>
        </Preanimate>

        <div style={{ marginTop: 12 }}>
          <Preanimate
            skeleton={
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} style={{ aspectRatio: '4 / 3' }} />
                ))}
              </div>
            }
          >
            <Stagger
              stagger={0.08}
              from={{ y: 24, opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}
            >
              {['One', 'Two', 'Three'].map((label, i) => (
                <Card
                  key={label}
                  radius="sm"
                  style={{
                    aspectRatio: '4 / 3',
                    display: 'grid',
                    placeItems: 'center',
                    background: ['#d4e4f7', '#d4f0e8', '#f7e0d4'][i],
                  }}
                >
                  {label}
                </Card>
              ))}
            </Stagger>
          </Preanimate>
        </div>
      </PreanimateProvider>
    </div>
  );
}
