import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ChipDemo } from './demo';

export const metadata = { title: 'Chip — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Chip</h1>
      <p className="lead">
        Pill-shaped tag with optional close button. Three variants (solid / soft / outline)
        × six tones × three sizes. Use it for filters, selected values, taxonomies.
      </p>

      <ChipDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Chip } from '@bwo-ui/react';

// Removable tag
<Chip tone="purple" onRemove={() => removeTag(t)}>{t}</Chip>

// Clickable filter
<Chip variant={active ? 'solid' : 'outline'} onClick={toggle}>All</Chip>

// With a leading dot
<Chip leading={<Dot color="#16a34a" />} tone="green" variant="soft">
  Live
</Chip>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'variant', type: "'solid' | 'soft' | 'outline'", defaultValue: "'soft'", description: 'Visual variant.' },
          { name: 'tone', type: "'default' | 'red' | 'green' | 'yellow' | 'blue' | 'purple'", defaultValue: "'default'", description: 'Colour palette.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", description: 'Pill size.' },
          { name: 'leading', type: 'ReactNode', description: 'Optional icon / dot / avatar before the label.' },
          { name: 'trailing', type: 'ReactNode', description: 'Optional element before the close button.' },
          { name: 'onRemove', type: '() => void', description: 'When provided, renders the × close button.' },
          { name: 'onClick', type: '() => void', description: 'When provided, the chip acts as a button.' },
          { name: 'disabled', type: 'boolean', description: 'Suppress interactions.' },
        ]}
      />
    </>
  );
}
