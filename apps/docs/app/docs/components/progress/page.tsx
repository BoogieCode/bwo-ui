import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  ProgressCircularDemo,
  ProgressCompletionDemo,
  ProgressDemo,
  ProgressIndeterminateDemo,
  ProgressSizesDemo,
  ProgressStripedDemo,
  ProgressToggleDemo,
  ProgressUploadDemo,
  ProgressVariantsDemo,
  ProgressWizardDemo,
} from './demo';

export const metadata = { title: 'Progress — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Progress</h1>
      <p className="lead">
        Linear bar or SVG ring that visualises how far along an operation is. Determinate when
        you know the value, indeterminate when you don&apos;t — same prop surface for both. Ships
        with four colour variants, three sizes, an animated striped overlay for active states,
        a circular shape with an inner label slot, and automatic{' '}
        <code>prefers-reduced-motion</code> handling.
      </p>

      <ProgressDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Progress } from '@bwo-ui/react';

{/* Determinate */}
<Progress value={66} />

{/* Indeterminate (no value) */}
<Progress />

{/* Circular with centred label */}
<Progress shape="circular" value={45}>45%</Progress>`}</CodeBlock>

      <h2>Variants</h2>
      <p>
        Four colour variants drive the fill. <code>primary</code> (black) is the neutral default;
        the semantic colours read like the rest of the kit — <code>green</code> for success or
        complete, <code>yellow</code> for caution / in-flight, <code>red</code> for blocking
        states (e.g. an upload that&apos;s about to fail a size cap).
      </p>
      <ProgressVariantsDemo />
      <CodeBlock lang="tsx">{`<Progress value={62} />               {/* primary */}
<Progress value={62} variant="green" />
<Progress value={62} variant="yellow" />
<Progress value={62} variant="red" />`}</CodeBlock>

      <h2>Sizes</h2>
      <p>
        <code>sm</code> (4 px), <code>md</code> (8 px, default), and <code>lg</code> (12 px) for
        linear bars. Smaller bars read as ambient meta progress (in a list row or a card
        footer); larger bars work for centred hero states (upload page, install wizard). The
        same size scale controls circular diameter: 40 / 64 / 96 px.
      </p>
      <ProgressSizesDemo />
      <CodeBlock lang="tsx">{`<Progress value={48} size="sm" />
<Progress value={48}            />  {/* md */}
<Progress value={48} size="lg" />`}</CodeBlock>

      <h2>Striped</h2>
      <p>
        Pass <code>striped</code> to overlay an animated diagonal pattern on the fill — the
        canonical &quot;something is actively happening&quot; treatment. Combine with{' '}
        <code>green</code> for &quot;processing successfully&quot;,{' '}
        <code>yellow</code> for &quot;pending review&quot;, <code>red</code> for &quot;recovering&quot;.
      </p>
      <ProgressStripedDemo />
      <CodeBlock lang="tsx">{`<Progress value={62} striped size="lg" />
<Progress value={45} striped variant="green" size="lg" />
<Progress value={78} striped variant="yellow" size="lg" />
<Progress value={28} striped variant="red" size="lg" />`}</CodeBlock>

      <h2>Indeterminate</h2>
      <p>
        Omit <code>value</code> and the bar enters indeterminate mode — a 40 %-wide
        indicator slides left to right continuously. Use it when you don&apos;t know how long an
        operation will take. The circular shape uses a fixed 70 % arc that spins instead, which
        reads as more &quot;searching&quot; than &quot;loading.&quot;
      </p>
      <ProgressIndeterminateDemo />
      <CodeBlock lang="tsx">{`<Progress />
<Progress variant="green" size="lg" />
<Progress shape="circular" />`}</CodeBlock>

      <h2>Circular</h2>
      <p>
        Pass <code>shape=&quot;circular&quot;</code> to render an SVG ring instead of a linear
        bar. Diameter follows the same <code>size</code> prop (40 / 64 / 96 px) and stroke width
        scales with it. Anything you pass as children renders centred over the ring — most
        commonly the percentage, but you can drop in any node (icon, badge, microcopy).
      </p>
      <ProgressCircularDemo />
      <CodeBlock lang="tsx">{`<Progress shape="circular" size="sm" value={45}>45%</Progress>
<Progress shape="circular"          value={45}>45%</Progress>
<Progress shape="circular" size="lg" value={45}>45%</Progress>

<Progress shape="circular" size="lg" variant="green"  value={75}>75%</Progress>
<Progress shape="circular" size="lg" variant="yellow" value={50}>50%</Progress>
<Progress shape="circular" size="lg" variant="red"    value={20}>20%</Progress>`}</CodeBlock>

      <h2>Recipes</h2>

      <h3 style={{ marginTop: 24 }}>File upload</h3>
      <p>
        Multiple files in flight, each with its own bar. While a file is uploading, use a
        striped primary bar; when it finishes, swap to a flat green bar so the eye can spot
        completed work at a glance. Wrap each row in <code>aria-busy</code> while the upload is
        active.
      </p>
      <ProgressUploadDemo />
      <CodeBlock lang="tsx">{`{files.map((file) => {
  const done = file.progress >= 100;
  return (
    <div key={file.name} aria-busy={!done}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{file.name}</span>
        <span>{file.size} · {done ? 'done' : \`\${file.progress}%\`}</span>
      </div>
      <Progress
        value={file.progress}
        variant={done ? 'green' : 'primary'}
        striped={!done}
        size="sm"
      />
    </div>
  );
})}`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Wizard / multi-step flow</h3>
      <p>
        Show users how far they are through a multi-step flow. Compute the percentage from{' '}
        <code>(currentStep + 1) / totalSteps</code> and pair the bar with a short label
        (&quot;Step 3 of 5&quot;).
      </p>
      <ProgressWizardDemo />
      <CodeBlock lang="tsx">{`const STEPS = ['Account', 'Profile', 'Workspace', 'Invite team', 'Review'];

<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>Step {step + 1} of {STEPS.length}</span>
  <span>{STEPS[step]}</span>
</div>
<Progress value={((step + 1) / STEPS.length) * 100} size="sm" />`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Profile completion</h3>
      <p>
        Encouraging users to finish setup is a classic Progress use case. Use{' '}
        <code>yellow</code> while there&apos;s still work to do; swap to <code>green</code> at
        100 %.
      </p>
      <ProgressCompletionDemo />
      <CodeBlock lang="tsx">{`<Card>
  <CardHeader>
    <CardTitle>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        Profile completion
        <Badge variant="yellow" size="sm">75 %</Badge>
      </span>
    </CardTitle>
  </CardHeader>
  <Progress value={75} variant="yellow" />
  <CardFooter>
    <Button size="sm" variant="primary">Finish setup</Button>
  </CardFooter>
</Card>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Determinate ↔ indeterminate toggle</h3>
      <p>
        A request that becomes determinate once it sends a first byte. Pass{' '}
        <code>value=&#123;undefined&#125;</code> while waiting, then start updating with real
        numbers once they&apos;re available — the component handles both states from the same
        prop.
      </p>
      <ProgressToggleDemo />
      <CodeBlock lang="tsx">{`const [known, setKnown] = useState(false);
const [pct, setPct] = useState(0);

return (
  <Progress
    value={known ? pct : undefined}
    striped
  />
);`}</CodeBlock>

      <h2>Accessibility</h2>
      <ul>
        <li>
          Progress renders with <code>role=&quot;progressbar&quot;</code> and the appropriate{' '}
          <code>aria-valuemin</code> / <code>aria-valuemax</code> / <code>aria-valuenow</code>{' '}
          (the last is omitted when indeterminate, per WAI-ARIA).
        </li>
        <li>
          If the visible percentage is the only label, wrap the bar in an element with{' '}
          <code>aria-label</code> describing what&apos;s loading (&quot;Uploading file&quot;,
          &quot;Profile setup&quot;) — the number alone isn&apos;t enough context.
        </li>
        <li>
          For batch operations (file lists, multi-step uploads), put{' '}
          <code>aria-busy=&quot;true&quot;</code> on the row that&apos;s in flight and remove it
          on completion. Screen readers will announce the change.
        </li>
        <li>
          Don&apos;t rely on colour alone to convey state — pair{' '}
          <code>variant=&quot;red&quot;</code> with a text label that says what&apos;s wrong.
        </li>
        <li>
          All animations (slide, stripe motion, circular spin) are disabled automatically when
          the OS reports <code>prefers-reduced-motion: reduce</code>.
        </li>
      </ul>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'value',
            type: 'number',
            description:
              'Current value (0 – `max`). Omit for indeterminate state — a sliding bar (linear) or spinning arc (circular).',
          },
          {
            name: 'max',
            type: 'number',
            defaultValue: '100',
            description: 'Maximum value for the scale.',
          },
          {
            name: 'variant',
            type: "'primary' | 'green' | 'yellow' | 'red'",
            defaultValue: "'primary'",
            description: 'Fill colour. `primary` is black; the rest follow the semantic palette.',
          },
          {
            name: 'size',
            type: "'sm' | 'md' | 'lg'",
            defaultValue: "'md'",
            description:
              'Linear: 4 / 8 / 12 px height. Circular: 40 / 64 / 96 px diameter (with proportional stroke).',
          },
          {
            name: 'shape',
            type: "'linear' | 'circular'",
            defaultValue: "'linear'",
            description:
              '`linear` for horizontal bars, `circular` for an SVG ring with a centred children slot.',
          },
          {
            name: 'striped',
            type: 'boolean',
            description:
              'Animated diagonal-stripe overlay. Linear-only. Reads as "actively in progress".',
          },
          {
            name: 'radius',
            type: "'none' | 'sm' | 'md' | 'lg' | 'pill'",
            description:
              'Corner radius override. Linear-only. Omit to inherit the default pill radius.',
          },
          {
            name: 'children',
            type: 'ReactNode',
            description:
              'Circular shape only — content rendered centred over the ring. Typically the percentage label, but can be any node.',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLDivElement>',
            description:
              'Native div attributes are forwarded — `style`, `aria-label`, `onClick`, etc.',
          },
        ]}
      />
    </>
  );
}
