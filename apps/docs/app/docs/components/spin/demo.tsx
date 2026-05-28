'use client';

import { Spin } from '@bwo-ui/react';

function Sparkle({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1l1.1 4.9L14 8l-4.9 1.1L8 15l-1.1-4.9L2 8l4.9-1.1L8 1Z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SpinDemo() {
  return (
    <div className="demo" style={{ gap: 36 }}>
      <div style={{ textAlign: 'center' }}>
        <Spin duration={2} style={{ color: 'var(--bwo-red)' }}>
          <Sparkle size={32} />
        </Spin>
        <p style={{ marginTop: 8, fontSize: 12 }}>2s</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spin duration={6} style={{ color: 'var(--bwo-black)' }}>
          <Sparkle size={32} />
        </Spin>
        <p style={{ marginTop: 8, fontSize: 12 }}>6s (default)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spin duration={14} style={{ color: 'var(--bwo-blue)' }}>
          <Sparkle size={32} />
        </Spin>
        <p style={{ marginTop: 8, fontSize: 12 }}>14s</p>
      </div>
    </div>
  );
}
