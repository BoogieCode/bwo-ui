import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  BlurCardGridDemo,
  BlurDemo,
  BlurDirectionDemo,
  BlurFadeDemo,
  BlurImageDemo,
  BlurIntensityDemo,
  BlurScrubDemo,
  BlurStaggerDemo,
} from './demo';

export const metadata = { title: 'Blur — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Blur</h1>
      <p className="lead">
        Scroll-driven blur reveal — wrap any node and it&apos;ll resolve into focus as it
        enters the viewport. Three intensity presets, optional opacity fade, in / out
        directions, scrub mode for parallax-style tracking, and automatic respect for{' '}
        <code>prefers-reduced-motion</code>. GSAP under the hood via{' '}
        <code>@bwo-ui/core</code>&apos;s <code>createBlur</code> factory.
      </p>

      <BlurDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Blur } from '@bwo-ui/react';

{/* Preset intensity — most common */}
<Blur intensity="strong">
  <img src="/hero.jpg" alt="" />
</Blur>

{/* Explicit pixel control */}
<Blur from={24} to={0} duration={1.2}>
  <h1>Headline</h1>
</Blur>

{/* No fade, just blur */}
<Blur intensity="medium" fade={false}>
  <p>Quiet reveal — sharpens without changing opacity.</p>
</Blur>`}</CodeBlock>

      <h2>Intensity</h2>
      <p>
        Three presets cover the common cases — <code>subtle</code> (8 px),{' '}
        <code>medium</code> (16 px, the default), <code>strong</code> (28 px). Use{' '}
        <code>subtle</code> for ambient reveals on long content (paragraph headings inside a
        scrolling article), <code>medium</code> as the safe general-purpose choice,{' '}
        <code>strong</code> for hero positions where the focus-into-place effect should feel
        cinematic.
      </p>
      <BlurIntensityDemo />
      <CodeBlock lang="tsx">{`<Blur intensity="subtle">…</Blur>
<Blur intensity="medium">…</Blur>  {/* default */}
<Blur intensity="strong">…</Blur>`}</CodeBlock>
      <p>
        For pixel-perfect control, set <code>from</code> directly — <code>from</code> takes
        precedence over <code>intensity</code>.
      </p>
      <CodeBlock lang="tsx">{`<Blur from={20} duration={1.2}>…</Blur>`}</CodeBlock>

      <h2>Fade</h2>
      <p>
        By default the blur is paired with an opacity fade (0 → 1 on enter). Set{' '}
        <code>fade=&#123;false&#125;</code> for a quieter reveal where the element stays
        visible but goes from blurred to sharp — useful when the element underneath already
        has a strong colour treatment you don&apos;t want to mute.
      </p>
      <BlurFadeDemo />
      <CodeBlock lang="tsx">{`<Blur intensity="medium" fade>…</Blur>          {/* default */}
<Blur intensity="medium" fade={false}>…</Blur>  {/* blur only */}`}</CodeBlock>

      <h2>Direction</h2>
      <p>
        <code>direction=&quot;in&quot;</code> (default) animates from blurred to sharp as the
        element enters the viewport.{' '}
        <code>direction=&quot;out&quot;</code> inverts the timing — the element starts sharp,
        then blurs as it leaves the viewport. Combine with <code>scrub</code> for a parallax
        section that softens as the user scrolls past.
      </p>
      <BlurDirectionDemo />
      <CodeBlock lang="tsx">{`{/* Sharpen on enter */}
<Blur direction="in" intensity="strong">…</Blur>

{/* Blur on exit — pairs naturally with scrub */}
<Blur direction="out" intensity="strong" scrub end="top 30%">…</Blur>`}</CodeBlock>

      <h2>Scrub</h2>
      <p>
        With <code>scrub</code>, the blur amount is tied directly to scroll progress between{' '}
        <code>start</code> and <code>end</code> — scroll up and the blur grows back. Use it for
        cinematic hero sections that resolve as the user reaches a comfortable reading
        position, or paired with <code>direction=&quot;out&quot;</code> for a section that
        softens as you scroll past it.
      </p>
      <BlurScrubDemo />
      <CodeBlock lang="tsx">{`<Blur intensity="strong" scrub start="top 90%" end="top 40%">
  <HeroSection />
</Blur>`}</CodeBlock>

      <h2>Stagger</h2>
      <p>
        Sequence a row of blurs with incremental <code>delay</code> values to get a graceful
        cascade. There&apos;s no built-in stagger primitive — just multiply the delay by the
        index. This pattern is the reason most marketing pages feel alive.
      </p>
      <BlurStaggerDemo />
      <CodeBlock lang="tsx">{`{items.map((item, i) => (
  <Blur key={item.id} intensity="medium" delay={i * 0.12}>
    <Card>{item.label}</Card>
  </Blur>
))}`}</CodeBlock>

      <h2>Recipes</h2>

      <h3 style={{ marginTop: 24 }}>Photo reveal</h3>
      <p>
        Hero photos benefit from a stronger intensity (24 – 32 px) and a slightly longer
        duration (~1.2 s). The blur-into-focus effect mimics a camera pulling sharp, which
        reads as deliberate, considered design.
      </p>
      <BlurImageDemo />
      <CodeBlock lang="tsx">{`<Blur intensity="strong" duration={1.2}>
  <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden' }}>
    <img src="/hero.jpg" alt="" style={{ width: '100%', display: 'block' }} />
    <div style={{ position: 'absolute', inset: 0, padding: 22, color: '#fff' }}>
      <h2>Motion that reads as craft</h2>
    </div>
  </div>
</Blur>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Staggered card grid</h3>
      <p>
        For three-up feature grids on a landing page, stagger the blurs at ~ 150 ms intervals.
        The pattern feels deliberate without overstaying its welcome.
      </p>
      <BlurCardGridDemo />
      <CodeBlock lang="tsx">{`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
  {features.map((item, i) => (
    <Blur key={item.title} intensity="medium" delay={i * 0.15}>
      <Card>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </Card>
    </Blur>
  ))}
</div>`}</CodeBlock>

      <h2>Reduced motion</h2>
      <p>
        The core factory checks{' '}
        <code>window.matchMedia(&apos;(prefers-reduced-motion: reduce)&apos;).matches</code> on
        mount. If the user has reduced motion enabled, the element snaps directly to its final
        state — no blur, no opacity fade, no scroll trigger. No extra code required on your
        side.
      </p>

      <h2>Accessibility</h2>
      <ul>
        <li>
          Blur is a visual effect; it doesn&apos;t change the DOM&apos;s reading order or
          semantics. Whatever you wrap remains fully readable by screen readers.
        </li>
        <li>
          Heavy blur during the initial frames can hurt readability for low-vision users. Stick
          to <code>subtle</code> / <code>medium</code> for text-dense content; reserve{' '}
          <code>strong</code> for hero imagery.
        </li>
        <li>
          <code>prefers-reduced-motion: reduce</code> bypasses the animation entirely — the
          element appears in its final state without any transition.
        </li>
        <li>
          Avoid wrapping interactive elements (buttons, links) in long-running scrub blurs —
          users may try to click them while still blurred, which feels broken.
        </li>
        <li>
          The <code>filter: blur()</code> CSS property creates a new stacking context. If the
          blurred element contains <code>position: fixed</code> children, they will be
          positioned relative to the blur wrapper while the animation runs.
        </li>
      </ul>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'intensity',
            type: "'subtle' | 'medium' | 'strong'",
            description:
              'Preset blur amount — 8 / 16 / 28 px. Shorthand for `from`. Ignored if `from` is set explicitly.',
          },
          {
            name: 'from',
            type: 'number',
            defaultValue: '16',
            description:
              'Starting blur in px (or ending blur with `direction="out"`). Overrides `intensity`.',
          },
          {
            name: 'to',
            type: 'number',
            defaultValue: '0',
            description: 'Final blur in px on the resolved state.',
          },
          {
            name: 'direction',
            type: "'in' | 'out'",
            defaultValue: "'in'",
            description:
              '`in` sharpens on enter (default). `out` blurs on leave — pairs naturally with `scrub`.',
          },
          {
            name: 'fade',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Pair the blur with an opacity fade (0 → 1 on enter, 1 → 0 on leave).',
          },
          { name: 'duration', type: 'number', defaultValue: '1.0', description: 'Tween duration in seconds.' },
          { name: 'ease', type: 'string', defaultValue: "'power3.out'", description: 'GSAP ease.' },
          { name: 'start', type: 'string', defaultValue: "'top 85%'", description: 'ScrollTrigger `start`.' },
          {
            name: 'end',
            type: 'string',
            defaultValue: "'bottom 60%'",
            description: 'ScrollTrigger `end` — only meaningful when `scrub` is set.',
          },
          {
            name: 'scrub',
            type: 'boolean | number',
            defaultValue: 'false',
            description:
              'Tie the blur to scroll progress. `true` for tight tracking, a number for inertia (seconds of lag).',
          },
          {
            name: 'once',
            type: 'boolean',
            defaultValue: 'true',
            description: 'Play the reveal only once. Set `false` to reverse when scrolling back out.',
          },
          { name: 'delay', type: 'number', description: 'Delay before the tween starts (seconds).' },
          {
            name: 'as',
            type: 'ElementType',
            defaultValue: "'div'",
            description: 'Element to render — `"section"`, `"figure"`, etc.',
          },
        ]}
      />
    </>
  );
}
