import { onScopeDispose, watchEffect, type Ref } from 'vue';

export interface UseDismissOptions {
  enabled: Ref<boolean>;
  refs: Array<Ref<Element | null>>;
  onDismiss: () => void;
  escapeKey?: boolean;
  outsidePointer?: boolean;
}

export function useDismiss({
  enabled,
  refs,
  onDismiss,
  escapeKey = true,
  outsidePointer = true,
}: UseDismissOptions): void {
  let pointerHandler: ((event: PointerEvent) => void) | null = null;
  let keyHandler: ((event: KeyboardEvent) => void) | null = null;

  const detach = () => {
    if (pointerHandler) document.removeEventListener('pointerdown', pointerHandler, true);
    if (keyHandler) document.removeEventListener('keydown', keyHandler);
    pointerHandler = null;
    keyHandler = null;
  };

  watchEffect(() => {
    detach();
    if (!enabled.value || typeof document === 'undefined') return;
    if (outsidePointer) {
      pointerHandler = (event) => {
        const target = event.target as Node | null;
        if (!target) return;
        for (const r of refs) {
          if (r.value && r.value.contains(target)) return;
        }
        onDismiss();
      };
      document.addEventListener('pointerdown', pointerHandler, true);
    }
    if (escapeKey) {
      keyHandler = (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onDismiss();
        }
      };
      document.addEventListener('keydown', keyHandler);
    }
  });

  onScopeDispose(detach);
}
