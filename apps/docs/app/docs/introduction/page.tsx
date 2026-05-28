import Link from 'next/link';

export const metadata = {
  title: 'Introduction — bwo-ui',
  description:
    'bwo-ui is a GSAP-powered motion + UI library for React, Vue, and Svelte. One core, three frameworks, beautifully designed accessible components.',
};

export default function IntroductionPage() {
  return (
    <>
      <h1>Introduction</h1>
      <p className="lead">
        bwo-ui is a GSAP-powered motion and UI library for React, Vue, and Svelte. One core,
        three framework wrappers, beautifully designed accessible components — themed with a
        few CSS variables and shipped as a real npm install.
      </p>

      <p>
        <strong>This is not just an animation library. It is also a real UI kit.</strong>
      </p>

      <p>
        Most motion libraries leave you to glue together your own buttons, inputs, and cards.
        Most UI libraries treat motion as an afterthought — a fade here, a hover there. The
        result is a frontend made of mismatched parts, where the animation system and the
        component system never quite agree on tokens, ergonomics, or accessibility.
      </p>

      <p>
        bwo-ui is built so that the motion primitives (<code>SplitReveal</code>,{' '}
        <code>Magnetic</code>, <code>Tilt</code>, <code>Marquee</code>…) and the UI primitives
        (<code>Button</code>, <code>Input</code>, <code>Select</code>, <code>Dialog</code>…)
        come from the same design language — same theme tokens, same radius scale, same
        framework wrappers. It is built around the following principles:
      </p>

      <ul>
        <li>
          <strong>One Core, Three Frameworks:</strong> every animation lives once as a vanilla
          TS factory in <code>@bwo-ui/core</code>, with thin React, Vue, and Svelte wrappers.
        </li>
        <li>
          <strong>Motion as Primitives:</strong> scroll reveals, magnetic buttons, tilts, and
          marquees are first-class components — not hooks you have to wire up yourself.
        </li>
        <li>
          <strong>Themable by CSS Variables:</strong> override <code>--bwo-accent</code>,{' '}
          <code>--bwo-radius-current</code>, and friends. No Tailwind plugin or theming
          context required.
        </li>
        <li>
          <strong>Light by Default:</strong> ~7 KB gzipped for the entire library.{' '}
          <code>sideEffects: false</code> means you only ship what you import. GSAP is a peer
          dependency, so you do not double-bundle it.
        </li>
        <li>
          <strong>Composable &amp; Predictable:</strong> headless Radix UI bases the
          interactive primitives, so accessibility, focus management, and keyboard handling
          are handled for you.
        </li>
      </ul>

      <h2>One Core, Three Frameworks</h2>
      <p>
        Every effect — <code>SplitReveal</code>, <code>Magnetic</code>, <code>Tilt</code>,{' '}
        <code>Marquee</code>, <code>FlipList</code> — is implemented exactly once, as a
        framework-agnostic GSAP factory in <code>@bwo-ui/core</code>. The React, Vue, and
        Svelte packages are thin wrappers that mount the factory against a ref, action, or
        template ref. This means:
      </p>
      <ul>
        <li>
          <strong>No framework drift:</strong> the React tilt and the Svelte tilt are the
          exact same animation; the wrapper is the only thing that changes.
        </li>
        <li>
          <strong>One bug fix, three frameworks:</strong> a change in the GSAP factory ships
          to every package on the next build.
        </li>
        <li>
          <strong>SSR-safe:</strong> every factory short-circuits when{' '}
          <code>window</code> is undefined.
        </li>
      </ul>

      <h2>Motion as Primitives</h2>
      <p>
        Animation is not bolted on. The motion components are part of the same import surface
        as <code>Button</code> and <code>Input</code>:
      </p>
      <pre>
        <code>{`import { SplitReveal, Magnetic, Button } from '@bwo-ui/react';

<SplitReveal as="h1" type="words" stagger={0.04}>
  Motion that reads as craft.
</SplitReveal>

<Magnetic strength={0.4}>
  <Button>Get started</Button>
</Magnetic>`}</code>
      </pre>
      <p>
        Effects share the same options shape (durations, easings, scroll triggers) so the
        cognitive surface across the library stays small.
      </p>

      <h2>Themable by CSS Variables</h2>
      <p>
        Every visual decision is exposed as a CSS variable on <code>:root</code> — colors,
        radii, shadows, fonts, transitions. Override them in your own stylesheet to rebrand
        the whole library:
      </p>
      <pre>
        <code>{`:root {
  --bwo-accent: #6c5ce7;       /* swap the accent color  */
  --bwo-radius-current: 12px;  /* round everything more  */
  --bwo-font-sans: 'JetBrains Mono', monospace;
}`}</code>
      </pre>
      <p>
        Per-instance overrides also exist where they matter most. For example, the{' '}
        <code>radius</code> prop on <code>Button</code>, <code>Input</code>, <code>Card</code>,
        and friends switches between <code>none / sm / md / lg / pill</code> on the fly.
      </p>

      <h2>Light by Default</h2>
      <p>
        The whole library — every motion effect plus every UI primitive — is about 7 KB
        gzipped at the published level. Because <code>sideEffects: false</code> is set on the
        packages, a bundler ships only the components you actually import. A page that uses
        one <code>SplitReveal</code> pays for one <code>SplitReveal</code>, not for the rest
        of the catalog.
      </p>
      <p>
        GSAP itself stays a <strong>peer dependency</strong>. Projects that already use GSAP
        do not double-bundle it; projects that do not use GSAP still install it once and stay
        in control of the version.
      </p>

      <h2>Composable &amp; Predictable</h2>
      <p>
        The React UI primitives sit on top of Radix UI; the Vue side uses Reka UI. That gives
        you accessibility (focus traps, escape handlers, ARIA wiring, keyboard navigation,
        SR-friendly markup) for free — but the visual layer is entirely ours, themed with{' '}
        <code>--bwo-*</code> variables. Same applies to the form primitives:{' '}
        <code>Select</code>, <code>Dialog</code>, <code>Tooltip</code>, <code>Popover</code>,
        and <code>Toast</code> behave consistently across the three framework wrappers.
      </p>

      <h2>Ready to install?</h2>
      <p>
        Head over to <Link href="/docs/installation">Installation</Link> to add bwo-ui to
        your project, or jump straight to <Link href="/docs/components/button">Button</Link>{' '}
        and <Link href="/docs/components/split-reveal">SplitReveal</Link> to see the
        components in action.
      </p>
    </>
  );
}
