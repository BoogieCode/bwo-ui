import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(', ');

function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1 && el.offsetParent !== null,
  );
}

export interface UseFocusTrapOptions {
  enabled: boolean;
  /** Container ref — focus stays inside this element while enabled. */
  containerRef: RefObject<HTMLElement | null>;
  /** When true, focus the first focusable on mount. Default: true. */
  autoFocus?: boolean;
  /** Element to return focus to when the trap unmounts. */
  returnFocusTo?: HTMLElement | null;
}

/**
 * Keep keyboard focus cycling inside `containerRef` while enabled. Restores
 * focus to `returnFocusTo` (or whatever held focus on activation) when the
 * trap is released.
 */
export function useFocusTrap({
  enabled,
  containerRef,
  autoFocus = true,
  returnFocusTo,
}: UseFocusTrapOptions): void {
  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;
    const previouslyFocused = (document.activeElement as HTMLElement) ?? null;

    if (autoFocus) {
      const focusables = getFocusable(container);
      const first = focusables[0] ?? container;
      first.focus({ preventScroll: true });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusables = getFocusable(container);
      if (focusables.length === 0) {
        event.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey) {
        if (active === first || !container.contains(active)) {
          event.preventDefault();
          last.focus({ preventScroll: true });
        }
      } else {
        if (active === last) {
          event.preventDefault();
          first.focus({ preventScroll: true });
        }
      }
    };
    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      const next = returnFocusTo ?? previouslyFocused;
      next?.focus?.({ preventScroll: true });
    };
  }, [enabled, containerRef, autoFocus, returnFocusTo]);
}
