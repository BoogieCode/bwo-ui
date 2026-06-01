import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import {
  SkeletonAnimationsDemo,
  SkeletonArticleDemo,
  SkeletonCardDemo,
  SkeletonDemo,
  SkeletonLinesDemo,
  SkeletonListDemo,
  SkeletonSizingDemo,
  SkeletonToggleDemo,
  SkeletonVariantsDemo,
} from './demo';

export const metadata = { title: 'Skeleton — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Skeleton</h1>
      <p className="lead">
        Animated loading placeholder. Mirrors the shape of the content that&apos;s coming —
        rectangles for images and headings, circles for avatars, stacked text lines for
        paragraphs — so the layout doesn&apos;t jump when real data arrives. Built-in shimmer
        animation, alternative pulse mode, and automatic respect for{' '}
        <code>prefers-reduced-motion</code>.
      </p>

      <SkeletonDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Skeleton } from '@bwo-ui/react';

<Skeleton width={200} height={20} />
<Skeleton variant="circle" width={40} height={40} />
<Skeleton variant="text" lines={3} />`}</CodeBlock>

      <h2>Variants</h2>
      <p>
        Three semantic shapes covering the common loading targets:
      </p>
      <ul>
        <li>
          <code>rect</code> — the default. Block placeholder for images, headings, buttons,
          custom shapes.
        </li>
        <li>
          <code>circle</code> — perfectly round (border-radius: 50 %, aspect-ratio: 1). Built
          for avatars, icon badges, status dots.
        </li>
        <li>
          <code>text</code> — text-line placeholder with a slightly shorter height
          (0.9 em). Combine with <code>lines</code> to render a paragraph.
        </li>
      </ul>
      <SkeletonVariantsDemo />
      <CodeBlock lang="tsx">{`<Skeleton width={140} height={56} />              {/* rect (default) */}
<Skeleton variant="circle" width={56} height={56} />
<Skeleton variant="text" lines={3} />`}</CodeBlock>

      <h2>Animation modes</h2>
      <p>
        Three animation modes — <code>shimmer</code> (default — a soft gradient sweeping left to
        right), <code>pulse</code> (opacity fade in / out), and <code>none</code> (static
        placeholder). Use <code>none</code> deliberately if you want a quiet loading state, or
        when an external animation is already carrying the loading feedback.
      </p>
      <SkeletonAnimationsDemo />
      <CodeBlock lang="tsx">{`<Skeleton animation="shimmer" height={14} />  {/* default */}
<Skeleton animation="pulse"   height={14} />
<Skeleton animation="none"    height={14} />`}</CodeBlock>
      <p>
        Skeletons automatically disable their animation when the OS reports{' '}
        <code>prefers-reduced-motion: reduce</code> — you don&apos;t need to set{' '}
        <code>animation=&quot;none&quot;</code> manually for that case.
      </p>

      <h2>Text lines</h2>
      <p>
        Pass <code>lines</code> (with <code>variant=&quot;text&quot;</code>) to render a stacked
        paragraph placeholder. The component wraps the lines in a flex column with an 8 px gap
        and shortens the final line to ~70 % width — the visual cue that mimics how natural
        prose wraps.
      </p>
      <SkeletonLinesDemo />
      <CodeBlock lang="tsx">{`<Skeleton variant="text" />            {/* one line */}
<Skeleton variant="text" lines={3} />  {/* three stacked lines */}
<Skeleton variant="text" lines={5} />  {/* five stacked lines */}`}</CodeBlock>

      <h2>Sizing</h2>
      <p>
        <code>width</code> and <code>height</code> accept numbers (treated as pixels) or any
        CSS string (<code>&quot;100%&quot;</code>, <code>&quot;14ch&quot;</code>,{' '}
        <code>&quot;clamp(…)&quot;</code>). For custom corner shapes, pass <code>radius</code>{' '}
        as a CSS value — useful for matching the radius of the real element that&apos;ll replace
        the skeleton (chip buttons, rounded media, etc.).
      </p>
      <SkeletonSizingDemo />
      <CodeBlock lang="tsx">{`<Skeleton width={160} height={20} />
<Skeleton width="100%" height={20} />
<Skeleton width="80%" height={20} />
<Skeleton width={200} height={80} radius="16px" />
<Skeleton variant="circle" width={64} height={64} />`}</CodeBlock>

      <h2>Recipes</h2>

      <h3 style={{ marginTop: 24 }}>List item</h3>
      <p>
        A typical row in a directory, mention list, or settings panel — avatar + name + sub
        text + an action button. The skeleton shapes mirror those slots one-to-one so the
        layout reads the same with or without data.
      </p>
      <SkeletonListDemo />
      <CodeBlock lang="tsx">{`<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Skeleton variant="circle" width={40} height={40} />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
    <Skeleton height={12} style={{ width: '45%' }} />
    <Skeleton height={10} style={{ width: '65%' }} />
  </div>
  <Skeleton width={64} height={28} radius="14px" />
</div>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Card</h3>
      <p>
        Card placeholders mirror the same anatomy as a real card — media block on top, title
        line, a couple of body lines, and a footer-pinned action. Wrap the skeletons in a real{' '}
        <code>Card</code> so the surface treatment (border, shadow, padding) is identical
        between loading and loaded states.
      </p>
      <SkeletonCardDemo />
      <CodeBlock lang="tsx">{`<Card>
  <Skeleton height={120} radius="8px" style={{ marginBottom: 14 }} />
  <Skeleton height={16} style={{ width: '60%', marginBottom: 8 }} />
  <Skeleton variant="text" lines={2} />
  <CardFooter>
    <Skeleton width={88} height={32} radius="16px" />
  </CardFooter>
</Card>`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Article paragraph</h3>
      <p>
        Long-form content (a blog post, an essay, a doc page) loads cleanest when the heading,
        byline, and paragraph all have skeletons. <code>variant=&quot;text&quot;</code> with a
        high line count handles the body.
      </p>
      <SkeletonArticleDemo />
      <CodeBlock lang="tsx">{`<Skeleton height={28} style={{ width: '70%' }} />  {/* heading */}
<Skeleton height={14} style={{ width: '40%' }} />  {/* byline */}
<Skeleton variant="text" lines={6} />              {/* body */}`}</CodeBlock>

      <h3 style={{ marginTop: 24 }}>Toggle between loading and loaded</h3>
      <p>
        The real production pattern: render skeletons while data is fetching, swap to real
        components once it arrives. Wrap the loading region in{' '}
        <code>aria-busy=&quot;true&quot;</code> so assistive tech can announce the state change.
      </p>
      <SkeletonToggleDemo />
      <CodeBlock lang="tsx">{`function TeamCard({ data, loading }) {
  return (
    <Card>
      <CardHeader>
        {loading
          ? <Skeleton height={20} style={{ width: '45%' }} />
          : <CardTitle>Team</CardTitle>}
      </CardHeader>
      <div aria-busy={loading} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {(loading ? Array.from({ length: 3 }) : data).map((person, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {loading
              ? <>
                  <Skeleton variant="circle" width={40} height={40} />
                  <div style={{ flex: 1 }}>
                    <Skeleton height={12} style={{ width: '45%' }} />
                    <Skeleton height={10} style={{ width: '60%' }} />
                  </div>
                </>
              : <>
                  <Avatar fallback={person.initials} />
                  <div>
                    <p>{person.name}</p>
                    <p>{person.role}</p>
                  </div>
                </>}
          </div>
        ))}
      </div>
    </Card>
  );
}`}</CodeBlock>

      <h2>When to reach for a skeleton vs a spinner</h2>
      <ul>
        <li>
          <strong>Skeleton</strong> — when the page shape is known in advance. The layout
          shouldn&apos;t jump when data arrives, so the loader mirrors the final composition.
        </li>
        <li>
          <strong>Spinner</strong> — when the response is fast (under ~ 300 ms — a skeleton
          would flash) or when the shape of the result isn&apos;t known until the request
          completes.
        </li>
        <li>
          <strong>Neither</strong> — when the operation is instant. A loading state that flashes
          for &lt; 100 ms is noise; render the result directly.
        </li>
      </ul>

      <h2>Accessibility</h2>
      <ul>
        <li>
          Wrap the loading region in an element with <code>aria-busy=&quot;true&quot;</code>{' '}
          while data is being fetched, then remove it on load. Screen readers will announce the
          state change.
        </li>
        <li>
          Skeletons are decorative — they don&apos;t need labels of their own. The container&apos;s{' '}
          <code>aria-busy</code> conveys all the meaning. If the surrounding context is unclear,
          pair the skeleton region with a visually-hidden{' '}
          <code>{'<span role="status">Loading…</span>'}</code>.
        </li>
        <li>
          Animation respects <code>prefers-reduced-motion: reduce</code> at the CSS layer — no
          additional code needed on your side.
        </li>
        <li>
          Don&apos;t leave skeletons on the page indefinitely. If a request fails or stalls,
          surface an error or an empty state — a perpetually-loading skeleton reads as a broken
          page.
        </li>
      </ul>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'variant',
            type: "'rect' | 'circle' | 'text'",
            defaultValue: "'rect'",
            description:
              '`rect` for blocks, `circle` for avatars, `text` for paragraph lines (combine with `lines`).',
          },
          {
            name: 'animation',
            type: "'shimmer' | 'pulse' | 'none'",
            defaultValue: "'shimmer'",
            description:
              '`shimmer` = sweeping gradient (default), `pulse` = opacity fade, `none` = static. All animations are disabled automatically under `prefers-reduced-motion: reduce`.',
          },
          {
            name: 'width',
            type: 'number | string',
            description:
              'Numbers are treated as pixels. Strings pass straight through — `"100%"`, `"14ch"`, `"clamp(...)"`.',
          },
          {
            name: 'height',
            type: 'number | string',
            description: 'Same value semantics as `width`. For `text` variant, defaults to 0.9 em.',
          },
          {
            name: 'lines',
            type: 'number',
            description:
              'For `variant="text"` only — renders a stacked group of N lines. Last line is shortened to ~70 % width to read like the end of a paragraph.',
          },
          {
            name: 'radius',
            type: 'string',
            description:
              'Custom CSS border-radius override (e.g. `"12px"`, `"50%"`). Useful when the skeleton needs to match the radius of a non-standard element behind it.',
          },
          {
            name: 'circle',
            type: 'boolean',
            description:
              'Deprecated alias for `variant="circle"`. Kept for back-compat with 0.4.x.',
          },
          {
            name: '…rest',
            type: 'HTMLAttributes<HTMLSpanElement>',
            description:
              'All native span attributes are forwarded — `style`, `aria-*`, `className`.',
          },
        ]}
      />
    </>
  );
}
