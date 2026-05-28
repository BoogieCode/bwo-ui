import { CodeBlock } from '../../../components/code-block';

export const metadata = { title: 'Typography — bwo-ui' };

const weightRow = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 16,
  padding: '14px 0',
  borderBottom: '1px solid var(--bwo-border)',
};
const weightLabel = {
  fontFamily: 'var(--bwo-font-sans)',
  fontSize: 12,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'var(--bwo-text-body)',
  minWidth: 96,
};

export default function TypographyPage() {
  return (
    <>
      <h1>Typography</h1>
      <p className="lead">
        The default for body and headings is <strong>Inter</strong>.{' '}
        <strong>ClashDisplay</strong> and <strong>MangoGrotesque</strong> ship alongside as
        opt-in display faces. Inter loads via <code>next/font/google</code>; the two display
        families are self-hosted woff2 files.
      </p>

      <h2>Tokens</h2>
      <p>Every text decision flows through these CSS variables on <code>:root</code>:</p>
      <CodeBlock lang="css">{`--bwo-font-sans: 'Inter', ui-sans-serif, system-ui, …;
--bwo-font-display: var(--bwo-font-sans);            /* defaults to Inter */
--bwo-font-clash: 'ClashDisplay', var(--bwo-font-sans);
--bwo-font-mango: 'MangoGrotesque', var(--bwo-font-sans);
--bwo-font-mono: ui-monospace, 'JetBrains Mono', 'SF Mono', Menlo, …;`}</CodeBlock>
      <p>
        Override <code>--bwo-font-display</code> to give every heading a non-Inter face
        without touching component code, or apply <code>--bwo-font-clash</code>{' '}
        / <code>--bwo-font-mango</code> per-element when you only want it in one spot.
      </p>

      <h2>Heading scale</h2>
      <p>
        Headings use <code>--bwo-font-display</code> at weight 600 by default, with tight
        tracking (<code>-0.02em</code>). The <code>.hero h1</code> rule tightens further to{' '}
        <code>-0.035em</code> for poster-size titles.
      </p>
      <div className="demo" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 16 }}>
        <h1 style={{ fontSize: 56, margin: 0 }}>Heading 1 — 56 / 600</h1>
        <h2 style={{ fontSize: 36, margin: 0 }}>Heading 2 — 36 / 600</h2>
        <h3 style={{ fontSize: 24, margin: 0 }}>Heading 3 — 24 / 600</h3>
        <h4 style={{ fontSize: 18, margin: 0 }}>Heading 4 — 18 / 600</h4>
      </div>

      <h2>ClashDisplay</h2>
      <p>
        Display face from <a href="https://www.fontshare.com/fonts/clash-display" target="_blank" rel="noopener noreferrer">Fontshare</a> (free
        for commercial use). Loaded locally from <code>/public/fonts/clash-display/</code>{' '}
        in five weights.
      </p>
      <div
        className="demo"
        style={{ flexDirection: 'column', alignItems: 'stretch', padding: '8px 28px' }}
      >
        {[
          { w: 300, name: 'Light' },
          { w: 400, name: 'Regular' },
          { w: 500, name: 'Medium' },
          { w: 600, name: 'Semibold' },
          { w: 700, name: 'Bold' },
        ].map((row) => (
          <div key={row.w} style={weightRow}>
            <span style={weightLabel}>
              {row.w} · {row.name}
            </span>
            <span
              style={{
                fontFamily: 'var(--bwo-font-clash)',
                fontWeight: row.w,
                fontSize: 30,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              Motion that reads as craft.
            </span>
          </div>
        ))}
      </div>

      <h2>MangoGrotesque</h2>
      <p>
        Alternate display face — taller x-height, more condensed. Useful for badges, tabular
        labels, or a contrasting hero. Apply{' '}
        <code>font-family: var(--bwo-font-mango)</code> on a specific element, or override
        <code>--bwo-font-display</code> globally to switch every heading.
      </p>
      <div
        className="demo"
        style={{ flexDirection: 'column', alignItems: 'stretch', padding: '8px 28px' }}
      >
        {[
          { w: 300, name: 'Light' },
          { w: 400, name: 'Regular' },
          { w: 500, name: 'Medium' },
          { w: 600, name: 'SemiBold' },
          { w: 700, name: 'Bold' },
        ].map((row) => (
          <div key={row.w} style={weightRow}>
            <span style={weightLabel}>
              {row.w} · {row.name}
            </span>
            <span
              style={{
                fontFamily: 'var(--bwo-font-mango)',
                fontWeight: row.w,
                fontSize: 30,
                lineHeight: 1,
                letterSpacing: '-0.01em',
              }}
            >
              Motion that reads as craft.
            </span>
          </div>
        ))}
      </div>

      <h2>Inter</h2>
      <p>
        Body face. Loaded from Google Fonts via <code>next/font/google</code> in{' '}
        <code>app/layout.tsx</code>, which generates a self-hosted subset at build time (zero
        runtime third-party requests).
      </p>
      <div
        className="demo"
        style={{ flexDirection: 'column', alignItems: 'stretch', padding: '8px 28px' }}
      >
        {[400, 500, 600, 700].map((w) => (
          <div key={w} style={weightRow}>
            <span style={weightLabel}>{w}</span>
            <span
              style={{
                fontFamily: 'var(--bwo-font-sans)',
                fontWeight: w,
                fontSize: 18,
                lineHeight: 1.4,
              }}
            >
              The quick brown fox jumps over the lazy dog.
            </span>
          </div>
        ))}
      </div>

      <h2>Custom theming</h2>
      <p>
        To replace a family across the site, point the token at your own font in a global
        stylesheet:
      </p>
      <CodeBlock lang="css">{`:root {
  --bwo-font-sans: 'Geist', sans-serif;
  --bwo-font-display: 'ClashDisplay', sans-serif;
}`}</CodeBlock>
      <p>
        The library itself never hard-codes a family — everything flows through tokens. To
        make every heading use the included ClashDisplay (or MangoGrotesque), alias the
        display variable:
      </p>
      <CodeBlock lang="css">{`:root {
  /* opt every heading in to ClashDisplay */
  --bwo-font-display: var(--bwo-font-clash);

  /* or, for MangoGrotesque */
  --bwo-font-display: var(--bwo-font-mango);
}`}</CodeBlock>
    </>
  );
}
