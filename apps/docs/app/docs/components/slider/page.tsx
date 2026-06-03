import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  SliderDemo,
  SliderDisabledDemo,
  SliderMarksDemo,
  SliderSizesDemo,
  SliderStepDemo,
  SliderTooltipDemo,
  SliderVariantsDemo,
  SliderVerticalDemo,
  SliderVolumeRecipeDemo,
} from './demo';

export const metadata = { title: 'Slider — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Slider</h1>
      <p className="lead">
        Range slider from scratch. Single-thumb by default, two-thumb range with a second value,
        full keyboard + pointer support, three sizes, four colour variants, optional tick
        marks, and a value tooltip that can stay pinned or appear only while dragging. Vertical
        orientation supported.
      </p>

      <SliderDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Slider } from '@bwo-ui/react';

// Single thumb (controlled)
const [vol, setVol] = useState([40]);
<Slider value={vol} onValueChange={setVol} min={0} max={100} step={1} />

// Range (two thumbs)
const [range, setRange] = useState([20, 80]);
<Slider value={range} onValueChange={setRange} />

// Uncontrolled
<Slider defaultValue={[40]} onValueCommit={(v) => save(v)} />`}</CodeBlock>
      <p>
        The slider operates on <code>number[]</code> — pass a single-element array for one
        thumb, a two-element array for a range. <code>onValueChange</code> fires continuously
        while dragging; <code>onValueCommit</code> fires once on release (use it for save /
        analytics so you&apos;re not spamming requests).
      </p>

      <h2>Sizes</h2>
      <p>
        <code>sm</code> (3 px track / 14 px thumb) for dense settings rows, <code>md</code>{' '}
        (5 / 20 px, default) for general use, <code>lg</code> (7 / 26 px) for hero positions
        where the slider is the primary interaction.
      </p>
      <SliderSizesDemo />
      <CodeBlock lang="tsx">{`<Slider size="sm" value={[30]} onValueChange={…} />
<Slider          value={[55]} onValueChange={…} />  {/* md */}
<Slider size="lg" value={[80]} onValueChange={…} />`}</CodeBlock>

      <h2>Variants</h2>
      <p>
        Four colour variants — <code>primary</code> (black), <code>green</code>,{' '}
        <code>yellow</code>, <code>red</code>. The variant colour drives the range fill and the
        thumb&apos;s focus ring, so the slider stays legible in either mode.
      </p>
      <SliderVariantsDemo />
      <CodeBlock lang="tsx">{`<Slider variant="primary" value={[40]} onValueChange={…} />
<Slider variant="green"   value={[65]} onValueChange={…} />
<Slider variant="yellow"  value={[78]} onValueChange={…} />
<Slider variant="red"     value={[92]} onValueChange={…} />`}</CodeBlock>

      <h2>Marks</h2>
      <p>
        Pass an array of numbers for unlabelled ticks, or an array of{' '}
        <code>&#123; value, label &#125;</code> objects to render labels under each tick. Marks
        within the active range highlight in the variant colour.
      </p>
      <SliderMarksDemo />
      <CodeBlock lang="tsx">{`{/* Unlabelled ticks */}
<Slider min={1} max={5} step={1} marks={[1, 2, 3, 4, 5]} value={[3]} onValueChange={…} />

{/* Labelled ticks */}
<Slider
  min={14}
  max={30}
  value={[22]}
  onValueChange={…}
  marks={[
    { value: 16, label: 'Cool' },
    { value: 20, label: '20°' },
    { value: 24, label: '24°' },
    { value: 28, label: 'Warm' },
  ]}
/>`}</CodeBlock>

      <h2>Tooltip</h2>
      <p>
        Show a small bubble above the thumb with the current value. Three modes:{' '}
        <code>never</code> (default — no tooltip), <code>drag</code> (appears while dragging or
        focused — keyboard-friendly), <code>always</code> (pinned — for dashboards where the
        value should always be visible).
      </p>
      <p>
        Use the <code>formatValue</code> prop to control the display string. The same formatter
        feeds <code>aria-valuetext</code> on each thumb so screen readers announce the
        formatted value, not the raw number.
      </p>
      <SliderTooltipDemo />
      <CodeBlock lang="tsx">{`<Slider tooltip="drag" formatValue={(v) => \`\${v}%\`} value={vol} onValueChange={…} />

<Slider
  tooltip="always"
  variant="green"
  formatValue={(v) => \`€\${v.toFixed(0)}\`}
  value={price}
  onValueChange={…}
/>`}</CodeBlock>

      <h2>Step + largeStep</h2>
      <p>
        <code>step</code> sets the increment. <code>largeStep</code> sets the larger jump used
        by Shift+Arrow / PageUp / PageDown. Home / End jump to the min / max bounds.
      </p>
      <SliderStepDemo />
      <CodeBlock lang="tsx">{`<Slider
  value={[50]}
  onValueChange={…}
  min={0}
  max={100}
  step={5}
  largeStep={20}
  marks={[0, 25, 50, 75, 100]}
  tooltip="drag"
/>`}</CodeBlock>

      <h2>Vertical orientation</h2>
      <p>
        Pass <code>orientation=&quot;vertical&quot;</code> for a column-axis slider. The
        track measures 160 px tall by default — wrap in a parent with the height you need if
        that doesn&apos;t suit. The keyboard mapping mirrors horizontal: Up = increase, Down =
        decrease.
      </p>
      <SliderVerticalDemo />
      <CodeBlock lang="tsx">{`<Slider
  orientation="vertical"
  variant="green"
  tooltip="drag"
  value={mid}
  onValueChange={setMid}
/>`}</CodeBlock>

      <h2>Disabled</h2>
      <p>
        <code>disabled</code> removes pointer events and reduces opacity. The thumb is{' '}
        <code>tabIndex={-1}</code> so it&apos;s skipped by keyboard navigation.
      </p>
      <SliderDisabledDemo />
      <CodeBlock lang="tsx">{`<Slider value={[40]} disabled />
<Slider value={[20, 70]} variant="green" disabled />`}</CodeBlock>

      <h2>Recipe — volume with mute</h2>
      <p>
        Classic mute-button pattern. The button toggles a <code>muted</code> flag; the slider
        renders <code>[0]</code> while muted and is disabled. Dragging the slider while muted
        un-mutes (so the user can recover with a single gesture).
      </p>
      <SliderVolumeRecipeDemo />
      <CodeBlock lang="tsx">{`function VolumeWithMute() {
  const [volume, setVolume] = useState([72]);
  const [muted, setMuted] = useState(false);
  return (
    <>
      <button onClick={() => setMuted((m) => !m)}>
        {muted ? 'Unmute' : 'Mute'}
      </button>
      <Slider
        value={muted ? [0] : volume}
        onValueChange={(v) => {
          setVolume(v);
          if (muted && v[0]! > 0) setMuted(false);
        }}
        disabled={muted}
      />
    </>
  );
}`}</CodeBlock>

      <h2>Form integration</h2>
      <p>
        Pass <code>name</code> to render a hidden <code>{'<input>'}</code> with each thumb&apos;s
        value — Slider submits cleanly inside a native form. For a range slider, the inputs are
        emitted as <code>name=&quot;range[0]&quot;</code> / <code>name=&quot;range[1]&quot;</code>{' '}
        so PHP / Rails-style array decoders pick them up.
      </p>
      <CodeBlock lang="tsx">{`<form action="/save" method="post">
  <Slider name="volume" defaultValue={[40]} />
  {/* Single thumb → <input type="hidden" name="volume" value="40" /> */}

  <Slider name="range" defaultValue={[20, 80]} />
  {/* Range → name="range[0]" and name="range[1]" */}

  <button type="submit">Save</button>
</form>`}</CodeBlock>

      <h2>Accessibility</h2>
      <ul>
        <li>
          Each thumb is a <code>role=&quot;slider&quot;</code> with{' '}
          <code>aria-valuemin</code> / <code>aria-valuemax</code> /{' '}
          <code>aria-valuenow</code> wired automatically.
        </li>
        <li>
          Pass <code>aria-label</code> on the Slider so the thumbs inherit a descriptive name
          (&quot;Volume&quot;, &quot;Price range&quot;) instead of the default &quot;Value 1&quot;.
        </li>
        <li>
          <code>formatValue</code> also populates <code>aria-valuetext</code> on each thumb —
          screen readers announce &quot;€42&quot; instead of just &quot;42&quot; when you provide a
          formatter.
        </li>
        <li>
          Keyboard support: <code>←</code> / <code>→</code> (or <code>↓</code> / <code>↑</code>)
          step by <code>step</code>; <code>Shift</code> + arrow or <code>PageUp</code> /{' '}
          <code>PageDown</code> step by <code>largeStep</code>; <code>Home</code> /{' '}
          <code>End</code> jump to min / max.
        </li>
        <li>
          On a range slider, each thumb is bounded by the others — moving the lower thumb above
          the upper&apos;s value is prevented automatically.
        </li>
        <li>
          Tooltip in <code>drag</code> mode also shows on keyboard focus so users navigating
          with Tab see the value just like mouse users.
        </li>
      </ul>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'value',
            type: 'number[]',
            description:
              'Controlled value. Pass a 1-element array for a single thumb, 2-element for a range.',
          },
          {
            name: 'defaultValue',
            type: 'number[]',
            defaultValue: '[50]',
            description: 'Uncontrolled initial value.',
          },
          {
            name: 'onValueChange',
            type: '(value: number[]) => void',
            description:
              'Fires on every change while dragging or stepping. Use this for live UI updates.',
          },
          {
            name: 'onValueCommit',
            type: '(value: number[]) => void',
            description:
              'Fires once when the user releases the thumb or hits a key bound (Enter, Home, End). Use for save / analytics.',
          },
          { name: 'min', type: 'number', defaultValue: '0', description: 'Minimum value.' },
          { name: 'max', type: 'number', defaultValue: '100', description: 'Maximum value.' },
          { name: 'step', type: 'number', defaultValue: '1', description: 'Step granularity.' },
          {
            name: 'largeStep',
            type: 'number',
            description: 'Larger step for Shift+Arrow / Page keys. Defaults to `step × 10`.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description: '3 / 14, 5 / 20, 7 / 26 px (track / thumb).',
          },
          {
            name: 'variant',
            type: "'primary' | 'green' | 'yellow' | 'red'",
            defaultValue: "'primary'",
            description: 'Range fill + thumb ring colour.',
          },
          {
            name: 'marks',
            type: 'SliderMark[]',
            description:
              'Tick marks. Pass numbers (`[1, 2, 3]`) for unlabelled ticks, or `{ value, label }` objects to render labels under each tick.',
          },
          {
            name: 'tooltip',
            type: "'never' | 'drag' | 'always'",
            defaultValue: "'never'",
            description:
              '`drag` shows the tooltip while dragging or focused; `always` keeps it pinned.',
          },
          {
            name: 'formatValue',
            type: '(value: number) => ReactNode',
            description:
              'Formatter for the tooltip and `aria-valuetext`. Default: `String(value)`.',
          },
          {
            name: 'orientation',
            type: "'horizontal' | 'vertical'",
            defaultValue: "'horizontal'",
            description:
              'Vertical sliders default to 160 px tall — set a parent height to override.',
          },
          {
            name: 'inverted',
            type: 'boolean',
            description: 'Reverse the value direction (right-to-left horizontal, top-to-bottom vertical).',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Removes pointer events, reduces opacity, sets `tabIndex={-1}` on thumbs.',
          },
          {
            name: 'name',
            type: 'string',
            description:
              'When set, renders hidden inputs alongside each thumb so the slider submits with native forms.',
          },
          {
            name: 'aria-label',
            type: 'string',
            description:
              'Passed to each thumb. Without it, thumbs get "Value 1" / "Value 2" as a fallback.',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLSpanElement>',
            description:
              'All native span attributes are forwarded — `style`, `className`, `aria-*`.',
          },
        ]}
      />
    </>
  );
}
