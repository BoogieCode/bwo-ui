import { CodeBlock } from '../../../../components/code-block';
import { AvatarDemo } from './demo';

export const metadata = { title: 'Avatar — bwo-ui' };

export default function Page() {
  return (
    <>
      <h1>Avatar</h1>
      <p className="lead">
        User avatar with image and an automatic initials fallback when the image fails or hasn&apos;t
        loaded yet.
      </p>

      <AvatarDemo />

      <h2>Usage</h2>
      <CodeBlock lang="tsx">{`import { Avatar } from '@bwo-ui/react';

<Avatar src="/me.jpg" alt="Cristian" fallback="CC" />
<Avatar fallback="JS" size="lg" />`}</CodeBlock>
    </>
  );
}
