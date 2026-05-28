import { CodeBlock } from '../../../../components/code-block';
import { PropsTable } from '../../../../components/props-table';
import { CardDemo } from './demo';

export const metadata = { title: 'Card — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Card</h1>
      <p className="lead">
        Composable surface container. Combines with <code>CardHeader</code>, <code>CardTitle</code>,
        <code>CardDescription</code>, and <code>CardFooter</code>.
      </p>

      <CardDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
} from '@bwo-ui/react';

<Card interactive>
  <CardHeader>
    <CardTitle>Boogie Plan</CardTitle>
    <CardDescription>For teams who ship motion-rich sites.</CardDescription>
  </CardHeader>
  <p>Everything in Free, plus stock photos and AI rewrites.</p>
  <CardFooter>
    <Button variant="solid">Subscribe</Button>
  </CardFooter>
</Card>`}</CodeBlock>

      <h2>Props</h2>
      <PropsTable
        rows={[
          {
            name: 'interactive',
            type: 'boolean',
            defaultValue: 'false',
            description: 'Adds the hover lift effect (cursor + transform + shadow).',
          },
        ]}
      />
    </>
  );
}
