'use client';

import { useRef, useState, type ReactNode } from 'react';

export function CodeBlock({ children, lang }: { children: ReactNode; lang?: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = ref.current?.innerText ?? '';
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        title="Copy"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          width: 30,
          height: 30,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 6,
          background: 'rgba(255,255,255,0.08)',
          color: '#e8e8e8',
          border: '1px solid rgba(255,255,255,0.12)',
          cursor: 'pointer',
          fontSize: 11,
          fontWeight: 500,
          transition: 'background 0.2s ease, color 0.2s ease',
          zIndex: 2,
        }}
      >
        {copied ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect
              x="8"
              y="8"
              width="12"
              height="12"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
            />
          </svg>
        )}
      </button>
      <pre ref={ref}>
        <code data-lang={lang}>{children}</code>
      </pre>
    </div>
  );
}
