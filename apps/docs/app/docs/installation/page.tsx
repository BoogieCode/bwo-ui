import { CodeBlock } from '../../../components/code-block';

export const metadata = { title: 'Installation — bwo-ui' };

export default function InstallationPage() {
  return (
    <>
      <h1>Installation</h1>
      <p className="lead">Pick the package for your framework. GSAP is a peer dependency.</p>

      <h2>React</h2>
      <CodeBlock lang="bash">{`pnpm add @bwo-ui/react gsap`}</CodeBlock>
      <CodeBlock lang="tsx">{`import { SplitReveal, Magnetic, Marquee, FlipList } from '@bwo-ui/react';

export function Hero() {
  return (
    <SplitReveal type="words" stagger={0.04}>
      <h1>Hello, motion.</h1>
    </SplitReveal>
  );
}`}</CodeBlock>

      <h2>Vue</h2>
      <CodeBlock lang="bash">{`pnpm add @bwo-ui/vue gsap`}</CodeBlock>
      <CodeBlock lang="vue">{`<script setup lang="ts">
import { SplitReveal } from '@bwo-ui/vue';
</script>

<template>
  <SplitReveal type="words" :stagger="0.04">
    <h1>Hello, motion.</h1>
  </SplitReveal>
</template>`}</CodeBlock>

      <h2>Svelte</h2>
      <CodeBlock lang="bash">{`pnpm add @bwo-ui/svelte gsap`}</CodeBlock>
      <CodeBlock lang="svelte">{`<script lang="ts">
  import { splitReveal } from '@bwo-ui/svelte';
</script>

<h1 use:splitReveal={{ type: 'words', stagger: 0.04 }}>Hello, motion.</h1>`}</CodeBlock>

      <h2>Why GSAP as a peer dependency?</h2>
      <p>
        GSAP is a substantial library and is often already installed in projects that need
        animation. Keeping it as a peer dependency means you don&apos;t end up with two copies in
        your bundle, and you stay in control of the GSAP version.
      </p>

      <h2>Server-side rendering</h2>
      <p>
        Every factory is SSR-safe — it no-ops when <code>window</code> is undefined. React
        wrappers are marked <code>&apos;use client&apos;</code>, so drop them straight into
        Next.js Server Components.
      </p>
    </>
  );
}
