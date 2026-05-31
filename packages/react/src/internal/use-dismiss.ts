import { useEffect, type RefObject } from 'react';

export interface UseDismissOptions {
  /** When false, no listeners are attached. */
  enabled: boolean;
  /** Refs whose subtrees should NOT count as outside. */
  refs: Array<RefObject<Element | null> | null | undefined>;
  /** Called when an outside pointerdown or Escape press fires. */
  onDismiss: () => void;
  /** Set to false to skip the Escape key listener. */
  escapeKey?: boolean;
  /** Set to false to skip the outside-pointer listener. */
  outsidePointer?: boolean;
}

/**
 * Closes an overlay on outside pointerdown or Escape. Pure side-effect — does
 * not portal, focus-trap, or scroll-lock; compose those separately.
 */
export function useDismiss({
  enabled,
  refs,
  onDismiss,
  escapeKey = true,
  outsidePointer = true,
}: UseDismissOptions): void {
  useEffect(() => {
    if (!enabled) return;
    const handlePointer = (event: PointerEvent) => {
      if (!outsidePointer) return;
      const target = event.target as Node | null;
      if (!target) return;
      for (const ref of refs) {
        if (ref?.current && ref.current.contains(target)) return;
      }
      onDismiss();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (!escapeKey) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        onDismiss();
      }
    };
    if (outsidePointer) document.addEventListener('pointerdown', handlePointer, true);
    if (escapeKey) document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointer, true);
      document.removeEventListener('keydown', handleKey);
    };
  }, [enabled, refs, onDismiss, escapeKey, outsidePointer]);
}
