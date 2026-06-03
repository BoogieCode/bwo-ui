'use client';

import { forwardRef, useEffect, useState, type HTMLAttributes } from 'react';
import { cn } from './utils';

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  /** Inline = `<code>`. Block = `<pre><code>` with copy button. Default: `'inline'`. */
  display?: 'inline' | 'block';
  /** When `display="block"`, show a copy-to-clipboard button. Default: `true`. */
  copy?: boolean;
  /** Optional language label rendered above block code. */
  lang?: string;
}

export const Code = forwardRef<HTMLElement, CodeProps>(function Code(
  { display = 'inline', copy = true, lang, className, style, children, ...rest },
  ref,
) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(id);
  }, [copied]);

  if (display === 'inline') {
    return (
      <code
        ref={ref as React.Ref<HTMLElement>}
        className={cn('bwo-code', className)}
        style={{
          fontFamily: 'var(--bwo-font-mono, ui-monospace, monospace)',
          fontSize: '0.92em',
          padding: '1.5px 6px',
          borderRadius: 5,
          background: 'var(--bwo-grey-4)',
          color: 'var(--bwo-text)',
          border: '1px solid var(--bwo-border)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          ...style,
        }}
        {...rest}
      >
        {children}
      </code>
    );
  }

  const handleCopy = async () => {
    const text =
      typeof children === 'string' ? children : String(children ?? '').trim();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={cn('bwo-code-block', className)}
      style={{
        position: 'relative',
        background: 'var(--bwo-grey-4)',
        border: '1px solid var(--bwo-border)',
        borderRadius: 'var(--bwo-radius-md)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {lang && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 14px',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--bwo-text-body)',
            borderBottom: '1px solid var(--bwo-border)',
          }}
        >
          <span>{lang}</span>
        </div>
      )}
      <pre
        style={{
          margin: 0,
          padding: '14px 16px',
          overflowX: 'auto',
          fontSize: 13,
          lineHeight: 1.55,
          fontFamily: 'var(--bwo-font-mono, ui-monospace, monospace)',
        }}
      >
        <code ref={ref} {...rest}>
          {children}
        </code>
      </pre>
      {copy && (
        <button
          type="button"
          aria-label={copied ? 'Copied' : 'Copy code'}
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: 6,
            border: '1px solid var(--bwo-border)',
            background: 'var(--bwo-surface)',
            color: copied ? 'var(--bwo-green, #16a34a)' : 'var(--bwo-text-body)',
            cursor: 'pointer',
            padding: 0,
            transition: 'color 0.15s ease',
          }}
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12l5 5L20 7"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
              <path
                d="M5 15V6a2 2 0 012-2h9"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
});
