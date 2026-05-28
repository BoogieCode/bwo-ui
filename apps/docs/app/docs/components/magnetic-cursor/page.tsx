import { CodeBlock } from '../../../../components/code-block';
import { MagneticCursorDemo } from './demo';

export const metadata = { title: 'MagneticCursor — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>MagneticCursor</h1>
      <p className="lead">
        Custom cursor that follows the pointer and grows on interactive elements. Auto-disables
        on touch devices.
      </p>

      <MagneticCursorDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`// Mount once at the root of your app.
import { MagneticCursor } from '@bwo-ui/react';

export default function Layout({ children }) {
  return (
    <>
      <MagneticCursor color="#ff481f" hoverSize={48} />
      {children}
    </>
  );
}`}</CodeBlock>

      <p>
        Props: <code>size</code>, <code>hoverSize</code>, <code>color</code>,{' '}
        <code>hoverColor</code>, <code>duration</code>, <code>hoverSelector</code>,{' '}
        <code>hideNativeCursor</code>.
      </p>
      <p>
        By default, the cursor grows on <code>a, button, [role=&quot;button&quot;]</code>, and any
        element with the <code>data-magnetic-cursor</code> attribute.
      </p>
    </>
  );
}
