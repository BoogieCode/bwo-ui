import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { ColorPickerDemo } from './demo';

export const metadata = { title: 'ColorPicker — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>ColorPicker</h1>
      <p className="lead">
        Compact colour picker — a native swatch chip that opens the OS picker, a hex input
        beside it, and a grid of preset swatches below. Use it for theme settings, brand
        editors, custom badge colours.
      </p>

      <ColorPickerDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { ColorPicker } from '@bwo-ui/react';

const [accent, setAccent] = useState('#ff481f');

<ColorPicker
  label="Accent"
  value={accent}
  onValueChange={setAccent}
  swatches={['#ff481f', '#7463ff', '#16a34a', '#0ea5e9']}
/>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: 'value', type: 'string', description: 'Controlled hex value.' },
          { name: 'defaultValue', type: 'string', defaultValue: "'#ff481f'", description: 'Uncontrolled default.' },
          { name: 'onValueChange', type: '(color: string) => void', description: 'Fires with a normalised hex.' },
          { name: 'swatches', type: 'string[]', description: 'Preset palette rendered as the swatch grid.' },
          { name: 'showNative', type: 'boolean', defaultValue: 'true', description: 'Show the OS colour picker on the chip.' },
          { name: 'showHex', type: 'boolean', defaultValue: 'true', description: 'Show the hex input.' },
          { name: 'label', type: 'ReactNode', description: 'Inline label rendered above the field.' },
        ]}
      />
    </>
  );
}
