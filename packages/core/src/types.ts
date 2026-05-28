export interface MotionInstance {
  destroy: () => void;
  refresh?: () => void;
}

export type Target = Element | string;

export function resolveTarget(target: Target): Element | null {
  if (typeof target === 'string') return document.querySelector(target);
  return target;
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
