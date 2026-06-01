import { onScopeDispose, watch, type Ref } from 'vue';

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
  enabled: Ref<boolean>;
  containerRef: Ref<HTMLElement | null>;
  autoFocus?: boolean;
  returnFocusTo?: Ref<HTMLElement | null>;
}

export function useFocusTrap({
  enabled,
  containerRef,
  autoFocus = true,
  returnFocusTo,
}: UseFocusTrapOptions): void {
  let attached: HTMLElement | null = null;
  let previouslyFocused: HTMLElement | null = null;
  let keyHandler: ((event: KeyboardEvent) => void) | null = null;

  const detach = () => {
    if (attached && keyHandler) attached.removeEventListener('keydown', keyHandler);
    keyHandler = null;
    const next = returnFocusTo?.value ?? previouslyFocused;
    next?.focus?.({ preventScroll: true });
    attached = null;
    previouslyFocused = null;
  };

  watch(
    [enabled, containerRef],
    ([isEnabled, container]) => {
      if (!isEnabled || !container) {
        detach();
        return;
      }
      previouslyFocused = (document.activeElement as HTMLElement) ?? null;
      attached = container;
      if (autoFocus) {
        const focusables = getFocusable(container);
        (focusables[0] ?? container).focus({ preventScroll: true });
      }
      keyHandler = (event) => {
        if (event.key !== 'Tab' || !attached) return;
        const focusables = getFocusable(attached);
        if (focusables.length === 0) {
          event.preventDefault();
          attached.focus({ preventScroll: true });
          return;
        }
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        const active = document.activeElement as HTMLElement | null;
        if (event.shiftKey) {
          if (active === first || !attached.contains(active)) {
            event.preventDefault();
            last.focus({ preventScroll: true });
          }
        } else if (active === last) {
          event.preventDefault();
          first.focus({ preventScroll: true });
        }
      };
      attached.addEventListener('keydown', keyHandler);
    },
    { flush: 'post', immediate: true },
  );

  onScopeDispose(detach);
}
