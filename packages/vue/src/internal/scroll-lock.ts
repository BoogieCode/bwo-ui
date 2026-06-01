import { onScopeDispose, watch, type Ref } from 'vue';

let lockCount = 0;
let savedOverflow = '';
let savedPaddingRight = '';

function lock(): void {
  if (typeof document === 'undefined') return;
  if (lockCount === 0) {
    savedOverflow = document.body.style.overflow;
    savedPaddingRight = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
  }
  lockCount++;
}

function unlock(): void {
  if (typeof document === 'undefined') return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow;
    document.body.style.paddingRight = savedPaddingRight;
  }
}

export function useScrollLock(enabled: Ref<boolean>): void {
  let active = false;
  watch(
    enabled,
    (value) => {
      if (value && !active) {
        lock();
        active = true;
      } else if (!value && active) {
        unlock();
        active = false;
      }
    },
    { immediate: true },
  );
  onScopeDispose(() => {
    if (active) {
      unlock();
      active = false;
    }
  });
}
