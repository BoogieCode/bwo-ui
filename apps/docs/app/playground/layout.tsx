import type { ReactNode } from 'react';

export default function PlaygroundLayout({ children }: { children: ReactNode }) {
  return <div className="playground-shell">{children}</div>;
}
