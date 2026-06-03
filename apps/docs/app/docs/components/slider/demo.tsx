'use client';

import { Slider, type SliderMark, type SliderSize, type SliderVariant } from '@bwo-ui/react';
import { useState } from 'react';

/* ─── 1. Hero — single + range ─────────────────────────────────────────── */

export function SliderDemo() {
  const [single, setSingle] = useState([40]);
  const [range, setRange] = useState([20, 80]);

  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 28,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span>Volume</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{single[0]}</span>
        </div>
        <Slider value={single} onValueChange={setSingle} min={0} max={100} aria-label="Volume" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span>Price range</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>
            €{range[0]} – €{range[1]}
          </span>
        </div>
        <Slider value={range} onValueChange={setRange} min={0} max={100} aria-label="Price range" />
      </div>
    </div>
  );
}

/* ─── 2. Sizes ─────────────────────────────────────────────────────────── */

const SIZES: { value: SliderSize; label: string }[] = [
  { value: 'sm', label: 'Small (3 / 14 px)' },
  { value: 'md', label: 'Medium (5 / 20 px) — default' },
  { value: 'lg', label: 'Large (7 / 26 px)' },
];

export function SliderSizesDemo() {
  const [values, setValues] = useState<Record<SliderSize, number[]>>({
    sm: [30],
    md: [55],
    lg: [80],
  });
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 26,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      {SIZES.map((s) => (
        <div key={s.value} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>{s.label}</span>
          <Slider
            size={s.value}
            value={values[s.value]}
            onValueChange={(next) => setValues((prev) => ({ ...prev, [s.value]: next }))}
            aria-label={`Size ${s.value}`}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── 3. Variants (colour) ─────────────────────────────────────────────── */

const VARIANTS: SliderVariant[] = ['primary', 'green', 'yellow', 'red'];

export function SliderVariantsDemo() {
  const [values, setValues] = useState<Record<SliderVariant, number[]>>({
    primary: [40],
    green: [65],
    yellow: [78],
    red: [92],
  });
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 22,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      {VARIANTS.map((v) => (
        <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <code style={{ fontSize: 11, color: 'var(--bwo-text-body)', width: 60 }}>{v}</code>
          <Slider
            variant={v}
            value={values[v]}
            onValueChange={(next) => setValues((prev) => ({ ...prev, [v]: next }))}
            style={{ flex: 1 }}
            aria-label={`Variant ${v}`}
          />
          <span
            style={{ fontSize: 12, color: 'var(--bwo-text)', width: 40, textAlign: 'right' }}
          >
            {values[v][0]}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── 4. Marks ─────────────────────────────────────────────────────────── */

const TEMP_MARKS: SliderMark[] = [
  { value: 16, label: 'Cool' },
  { value: 20, label: '20°' },
  { value: 24, label: '24°' },
  { value: 28, label: 'Warm' },
];

export function SliderMarksDemo() {
  const [temp, setTemp] = useState([22]);
  const [stepValue, setStepValue] = useState([3]);
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 44,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span>Temperature</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{temp[0]}°C</span>
        </div>
        <Slider
          value={temp}
          onValueChange={setTemp}
          min={14}
          max={30}
          marks={TEMP_MARKS}
          aria-label="Temperature"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span>Discrete steps (1-5)</span>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>Step {stepValue[0]}</span>
        </div>
        <Slider
          value={stepValue}
          onValueChange={setStepValue}
          min={1}
          max={5}
          step={1}
          marks={[1, 2, 3, 4, 5]}
          aria-label="Step picker"
        />
      </div>
    </div>
  );
}

/* ─── 5. Tooltip ───────────────────────────────────────────────────────── */

export function SliderTooltipDemo() {
  const [drag, setDrag] = useState([62]);
  const [always, setAlways] = useState([42]);
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 44,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>
          tooltip=&quot;drag&quot; — appears while dragging or focused
        </span>
        <Slider
          tooltip="drag"
          value={drag}
          onValueChange={setDrag}
          formatValue={(v) => `${v}%`}
          aria-label="With drag tooltip"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--bwo-text-body)' }}>
          tooltip=&quot;always&quot; — pinned, useful for dashboard surfaces
        </span>
        <Slider
          tooltip="always"
          variant="green"
          value={always}
          onValueChange={setAlways}
          formatValue={(v) => `€${v.toFixed(0)}`}
          aria-label="With pinned tooltip"
        />
      </div>
    </div>
  );
}

/* ─── 6. Step + largeStep (keyboard) ───────────────────────────────────── */

export function SliderStepDemo() {
  const [value, setValue] = useState([50]);
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 12,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
        <span>Step 5, Shift+Arrow = step 20</span>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value[0]}</span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={5}
        largeStep={20}
        marks={[0, 25, 50, 75, 100]}
        tooltip="drag"
        aria-label="Step demo"
      />
      <p style={{ margin: '14px 0 0', fontSize: 12, color: 'var(--bwo-text-body)' }}>
        Tab to focus the thumb. Arrow keys step by <code>step</code>. Shift+Arrow or PageUp /
        PageDown step by <code>largeStep</code>. Home / End jump to the bounds.
      </p>
    </div>
  );
}

/* ─── 7. Vertical orientation ──────────────────────────────────────────── */

export function SliderVerticalDemo() {
  const [a, setA] = useState([40]);
  const [b, setB] = useState([70]);
  const [c, setC] = useState([55]);
  return (
    <div
      className="demo"
      style={{
        gap: 40,
        padding: '32px 24px',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      {[
        { label: 'Low', value: a, set: setA, variant: 'primary' as SliderVariant },
        { label: 'Mid', value: b, set: setB, variant: 'green' as SliderVariant },
        { label: 'High', value: c, set: setC, variant: 'yellow' as SliderVariant },
      ].map((s) => (
        <div
          key={s.label}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}
        >
          <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 13, fontWeight: 500 }}>
            {s.value[0]}
          </span>
          <Slider
            orientation="vertical"
            variant={s.variant}
            tooltip="drag"
            value={s.value}
            onValueChange={s.set}
            aria-label={s.label}
          />
          <span style={{ fontSize: 11, color: 'var(--bwo-text-body)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── 8. Disabled ──────────────────────────────────────────────────────── */

export function SliderDisabledDemo() {
  return (
    <div
      className="demo"
      style={{
        flexDirection: 'column',
        gap: 22,
        alignItems: 'stretch',
        maxWidth: 420,
        marginInline: 'auto',
      }}
    >
      <Slider value={[40]} disabled aria-label="Disabled single" />
      <Slider value={[20, 70]} variant="green" disabled aria-label="Disabled range" />
    </div>
  );
}

/* ─── 9. Recipe — Volume with mute toggle ──────────────────────────────── */

export function SliderVolumeRecipeDemo() {
  const [volume, setVolume] = useState([72]);
  const [muted, setMuted] = useState(false);
  const effective = muted ? 0 : volume[0];
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'inherit',
            font: 'inherit',
            padding: 0,
          }}
        >
          <span
            aria-hidden
            style={{ display: 'inline-flex', width: 18 }}
          >
            {muted || effective === 0 ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 5L6 9H3v6h3l5 4V5zM23 9l-6 6m0-6l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : effective < 50 ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 5L6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 010 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 5L6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 010 7M19 5a10 10 0 010 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          {muted ? 'Muted' : 'Volume'}
        </button>
        <span style={{ fontVariantNumeric: 'tabular-nums', color: muted ? 'var(--bwo-text-body)' : 'inherit' }}>
          {effective}%
        </span>
      </div>
      <Slider
        value={muted ? [0] : volume}
        onValueChange={(v) => {
          setVolume(v);
          if (muted && v[0]! > 0) setMuted(false);
        }}
        disabled={muted}
        variant="primary"
        aria-label="Volume"
      />
    </div>
  );
}
