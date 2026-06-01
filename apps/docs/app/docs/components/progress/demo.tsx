'use client';

import { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
  Switch,
  type ProgressVariant,
} from '@bwo-ui/react';

/* ─── 1. Hero (animated linear) ────────────────────────────────────────── */

export function ProgressDemo() {
  const [value, setValue] = useState(33);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 5));
    }, 600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 16,
        alignItems: 'stretch',
        maxWidth: 360,
        marginInline: 'auto',
      }}
    >
      <Progress value={value} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
        <span>Uploading…</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}%</span>
      </div>
      <Button onClick={() => setValue(0)} variant="ghost" size="sm">
        Reset
      </Button>
    </div>
  );
}

/* ─── 2. Variants ──────────────────────────────────────────────────────── */

const VARIANTS: ProgressVariant[] = ['primary', 'green', 'yellow', 'red'];

export function ProgressVariantsDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 14,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      {VARIANTS.map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <code style={{ fontSize: 11, color: 'var(--bwo-text-body)', width: 60 }}>{v}</code>
          <Progress value={62} variant={v} style={{ flex: 1 }} />
        </div>
      ))}
    </div>
  );
}

/* ─── 3. Sizes ─────────────────────────────────────────────────────────── */

export function ProgressSizesDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 14,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <code style={{ fontSize: 11, color: 'var(--bwo-text-body)', width: 60 }}>sm</code>
        <Progress value={48} size="sm" style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <code style={{ fontSize: 11, color: 'var(--bwo-text-body)', width: 60 }}>md</code>
        <Progress value={48} style={{ flex: 1 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <code style={{ fontSize: 11, color: 'var(--bwo-text-body)', width: 60 }}>lg</code>
        <Progress value={48} size="lg" style={{ flex: 1 }} />
      </div>
    </div>
  );
}

/* ─── 4. Striped (active state) ────────────────────────────────────────── */

export function ProgressStripedDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 14,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      <Progress value={62} striped size="lg" />
      <Progress value={45} striped variant="green" size="lg" />
      <Progress value={78} striped variant="yellow" size="lg" />
      <Progress value={28} striped variant="red" size="lg" />
    </div>
  );
}

/* ─── 5. Indeterminate ─────────────────────────────────────────────────── */

export function ProgressIndeterminateDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 14,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      <Progress />
      <Progress variant="green" size="lg" />
      <Progress shape="circular" />
    </div>
  );
}

/* ─── 6. Circular ──────────────────────────────────────────────────────── */

export function ProgressCircularDemo() {
  const [value, setValue] = useState(45);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 4));
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="demo"
      style={{ gap: 28, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}
    >
      <Progress shape="circular" size="sm" value={value}>
        {value}%
      </Progress>
      <Progress shape="circular" value={value}>
        {value}%
      </Progress>
      <Progress shape="circular" size="lg" value={value}>
        {value}%
      </Progress>
      <Progress shape="circular" size="lg" variant="green" value={value}>
        {value}%
      </Progress>
      <Progress shape="circular" size="lg" variant="yellow" value={value}>
        {value}%
      </Progress>
      <Progress shape="circular" size="lg" variant="red" value={value}>
        {value}%
      </Progress>
    </div>
  );
}

/* ─── 7. File upload recipe (multiple files in flight) ─────────────────── */

interface UploadFile {
  name: string;
  size: string;
  progress: number;
}

export function ProgressUploadDemo() {
  const [files, setFiles] = useState<UploadFile[]>([
    { name: 'design-spec.pdf', size: '1.4 MB', progress: 0 },
    { name: 'hero.mp4', size: '24.8 MB', progress: 0 },
    { name: 'wordmark.svg', size: '12 KB', progress: 100 },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setFiles((current) =>
        current.map((f, i) =>
          f.progress >= 100
            ? f
            : { ...f, progress: Math.min(100, f.progress + (i === 0 ? 4 : 2)) },
        ),
      );
    }, 250);
    return () => clearInterval(id);
  }, []);

  const restart = () =>
    setFiles((current) => current.map((f) => ({ ...f, progress: 0 })));

  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, alignItems: 'stretch', padding: 20 }}
    >
      {files.map((f) => {
        const done = f.progress >= 100;
        return (
          <div
            key={f.name}
            style={{ display: 'flex', flexDirection: 'column', gap: 6 }}
            aria-busy={!done}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ fontWeight: 500 }}>{f.name}</span>
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--bwo-text-body)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {f.size} · {done ? 'done' : `${f.progress}%`}
              </span>
            </div>
            <Progress
              value={f.progress}
              variant={done ? 'green' : 'primary'}
              striped={!done}
              size="sm"
            />
          </div>
        );
      })}
      <Button variant="ghost" size="sm" onClick={restart}>
        Restart upload
      </Button>
    </div>
  );
}

/* ─── 8. Wizard / multi-step recipe ────────────────────────────────────── */

const STEPS = ['Account', 'Profile', 'Workspace', 'Invite team', 'Review'] as const;

export function ProgressWizardDemo() {
  const [step, setStep] = useState(2);
  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 14, alignItems: 'stretch', padding: 20 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
        <span style={{ color: 'var(--bwo-text-body)' }}>
          Step {step + 1} of {STEPS.length}
        </span>
        <span style={{ fontWeight: 600 }}>{STEPS[step]}</span>
      </div>
      <Progress value={pct} size="sm" variant="primary" />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button
          variant="ghost"
          size="sm"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        <Button
          variant="primary"
          size="sm"
          disabled={step === STEPS.length - 1}
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
        >
          {step === STEPS.length - 1 ? 'Done' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

/* ─── 9. Profile completion recipe ─────────────────────────────────────── */

export function ProgressCompletionDemo() {
  return (
    <div className="demo" style={{ padding: 20 }}>
      <div style={{ maxWidth: 380, width: '100%' }}>
        <Card>
          <CardHeader>
            <CardTitle>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                Profile completion
                <Badge variant="yellow" size="sm">
                  75 %
                </Badge>
              </span>
            </CardTitle>
          </CardHeader>
          <p style={{ margin: '0 0 12px', fontSize: 13, color: 'var(--bwo-text-body)' }}>
            Add a cover photo and verify your email to reach 100 %.
          </p>
          <Progress value={75} variant="yellow" />
          <CardFooter>
            <Button size="sm" variant="ghost">
              Skip
            </Button>
            <Button size="sm" variant="primary">
              Finish setup
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

/* ─── 10. Determinate ↔ indeterminate toggle ──────────────────────────── */

export function ProgressToggleDemo() {
  const [known, setKnown] = useState(true);
  const [value, setValue] = useState(42);

  useEffect(() => {
    if (!known) return;
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 3));
    }, 350);
    return () => clearInterval(id);
  }, [known]);

  return (
    <div
      className="demo"
      style={{ flexDirection: 'column', gap: 18, alignItems: 'stretch', padding: 18 }}
    >
      <label
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          alignSelf: 'center',
          fontSize: 13,
        }}
      >
        <Switch checked={known} onCheckedChange={setKnown} /> Determinate
      </label>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center', justifyContent: 'center' }}>
        <Progress shape="circular" size="lg" value={known ? value : undefined}>
          {known ? `${value}%` : ''}
        </Progress>
        <div style={{ flex: 1, minWidth: 0, maxWidth: 280 }}>
          <Progress value={known ? value : undefined} striped />
        </div>
      </div>
    </div>
  );
}
