'use client';

import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from 'react';
import { Portal } from './internal/portal';
import { Presence } from './internal/presence';
import { useControllable } from './internal/use-controllable';
import { useDismiss } from './internal/use-dismiss';
import { useFocusTrap } from './internal/use-focus-trap';
import { useScrollLock } from './internal/scroll-lock';
import { cn } from './utils';

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: MutableRefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLDivElement>;
  triggerId: string;
  contentId: string;
  titleId: string;
  descriptionId: string;
  modal: boolean;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(name: string): DialogContextValue {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error(`${name} must be rendered inside <DialogRoot>.`);
  return ctx;
}

export interface DialogRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** When false, omit scroll lock + focus trap (used for non-modal popovers). Default: true. */
  modal?: boolean;
  children: ReactNode;
}

export function DialogRoot({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  modal = true,
  children,
}: DialogRootProps) {
  const [open = false, setOpen] = useControllable<boolean>({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const contentId = useId();
  const titleId = useId();
  const descriptionId = useId();

  const value = useMemo<DialogContextValue>(
    () => ({
      open,
      setOpen,
      triggerRef,
      contentRef,
      triggerId,
      contentId,
      titleId,
      descriptionId,
      modal,
    }),
    [open, setOpen, triggerId, contentId, titleId, descriptionId, modal],
  );

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the trigger by cloning the single child element. */
  asChild?: boolean;
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger({ asChild, children, onClick, ...rest }, ref) {
    const { open, setOpen, triggerRef, triggerId, contentId } = useDialogContext('DialogTrigger');
    const setRef = (el: HTMLElement | null) => {
      triggerRef.current = el;
      if (typeof ref === 'function') ref(el as HTMLButtonElement);
      else if (ref)
        (ref as MutableRefObject<HTMLButtonElement | null>).current = el as HTMLButtonElement;
    };
    const handleClick = (event: React.MouseEvent) => {
      onClick?.(event as React.MouseEvent<HTMLButtonElement>);
      if (!event.defaultPrevented) setOpen(!open);
    };
    const shared = {
      id: triggerId,
      'aria-haspopup': 'dialog' as const,
      'aria-expanded': open,
      'aria-controls': open ? contentId : undefined,
      'data-state': open ? 'open' : ('closed' as 'open' | 'closed'),
      onClick: handleClick,
      ref: setRef,
    };
    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<Record<string, unknown>>, shared);
    }
    return (
      <button type="button" {...rest} {...shared}>
        {children}
      </button>
    );
  },
);

export interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {}

export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(function DialogOverlay(
  { className, ...props },
  ref,
) {
  const { open } = useDialogContext('DialogOverlay');
  return (
    <div
      ref={ref}
      data-state={open ? 'open' : 'closed'}
      aria-hidden
      className={cn('bwo-dialog-overlay', className)}
      {...props}
    />
  );
});

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Skip rendering the built-in DialogOverlay (use for fully custom backdrops). */
  hideOverlay?: boolean;
  /** Skip the built-in close button. */
  hideClose?: boolean;
  /** Forward an `aria-label` when there is no DialogTitle in the tree. */
  'aria-label'?: string;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { className, children, hideOverlay, hideClose, ...props },
  ref,
) {
  const ctx = useDialogContext('DialogContent');
  const { open, setOpen, contentRef, triggerRef, contentId, titleId, descriptionId, modal } = ctx;

  useDismiss({
    enabled: open,
    refs: [contentRef],
    onDismiss: () => setOpen(false),
    escapeKey: true,
    outsidePointer: true,
  });
  useFocusTrap({
    enabled: open && modal,
    containerRef: contentRef,
    returnFocusTo: triggerRef.current,
  });
  useScrollLock(open && modal);

  const setRef = (el: HTMLDivElement | null) => {
    (contentRef as MutableRefObject<HTMLDivElement | null>).current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as MutableRefObject<HTMLDivElement | null>).current = el;
  };

  return (
    <Presence present={open}>
      {(state) => (
        <Portal>
          {!hideOverlay && (
            <div
              data-state={state}
              aria-hidden
              className="bwo-dialog-overlay"
            />
          )}
          <div
            ref={setRef}
            role="dialog"
            aria-modal={modal ? true : undefined}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            id={contentId}
            data-state={state}
            tabIndex={-1}
            className={cn('bwo-dialog-content', className)}
            {...props}
          >
            {children}
            {!hideClose && (
              <DialogClose
                className="bwo-dialog-close"
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </DialogClose>
            )}
          </div>
        </Portal>
      )}
    </Presence>
  );
});

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  { className, id, ...props },
  ref,
) {
  const { titleId } = useDialogContext('DialogTitle');
  return (
    <h2 ref={ref} id={id ?? titleId} className={cn('bwo-dialog-title', className)} {...props} />
  );
});

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  function DialogDescription({ className, id, ...props }, ref) {
    const { descriptionId } = useDialogContext('DialogDescription');
    return (
      <p
        ref={ref}
        id={id ?? descriptionId}
        className={cn('bwo-dialog-description', className)}
        {...props}
      />
    );
  },
);

export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { asChild, children, onClick, ...rest },
  ref,
) {
  const { setOpen } = useDialogContext('DialogClose');
  const handleClick = (event: React.MouseEvent) => {
    onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setOpen(false);
  };
  const shared = { onClick: handleClick, ref };
  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<Record<string, unknown>>, shared);
  }
  return (
    <button type="button" {...rest} {...shared}>
      {children}
    </button>
  );
});

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
};
