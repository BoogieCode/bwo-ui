'use client';

import { useEffect, useState } from 'react';

type PM = 'npm' | 'pnpm' | 'yarn' | 'bun';

const PMS: PM[] = ['npm', 'pnpm', 'yarn', 'bun'];
const STORAGE_KEY = 'bwo-pm';

function addCommand(pm: PM, pkg: string): string {
  switch (pm) {
    case 'npm':
      return `npm i ${pkg}`;
    case 'pnpm':
      return `pnpm add ${pkg}`;
    case 'yarn':
      return `yarn add ${pkg}`;
    case 'bun':
      return `bun add ${pkg}`;
  }
}

function execCommand(pm: PM, cmd: string): string {
  switch (pm) {
    case 'npm':
      return `npx ${cmd}`;
    case 'pnpm':
      return `pnpm dlx ${cmd}`;
    case 'yarn':
      return `yarn dlx ${cmd}`;
    case 'bun':
      return `bunx ${cmd}`;
  }
}

export interface InstallTabsProps {
  /** Bare package list for `add` commands, e.g. `'@bwo-ui/react gsap'`. */
  package?: string;
  /** Or a one-time runner command, e.g. `'@bwo-ui/cli init'`. */
  exec?: string;
}

const CopyIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M5 15V6a2 2 0 012-2h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CheckIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 12l5 5L20 7"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function InstallTabs({ package: pkg, exec }: InstallTabsProps) {
  const [pm, setPm] = useState<PM>('npm');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && (PMS as string[]).includes(stored)) setPm(stored as PM);
    } catch {
      // localStorage unavailable — ignore
    }
  }, []);

  const onSelect = (next: PM) => {
    setPm(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  const cmd = pkg ? addCommand(pm, pkg) : exec ? execCommand(pm, exec) : '';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
    } catch {
      // ignore — older browsers
    }
  };

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <div className="install-tabs">
      <div className="install-tabs-head" role="tablist" aria-label="Package manager">
        {PMS.map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={p === pm}
            className={`install-tabs-trigger${p === pm ? ' is-active' : ''}`}
            onClick={() => onSelect(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="install-tabs-body">
        <code className="install-tabs-cmd">{cmd}</code>
        <button
          type="button"
          className={`install-tabs-copy${copied ? ' is-copied' : ''}`}
          onClick={copy}
          aria-label="Copy command"
        >
          {copied ? CheckIcon : CopyIcon}
        </button>
      </div>
    </div>
  );
}
