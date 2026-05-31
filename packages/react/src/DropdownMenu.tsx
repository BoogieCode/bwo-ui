'use client';

import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRoot,
  MenuSeparator,
  useMenuContext,
  type MenuContentProps,
  type MenuItemProps,
} from './internal/menu';

export interface DropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function DropdownMenu({ open, defaultOpen, onOpenChange, children }: DropdownMenuProps) {
  return (
    <MenuRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
    </MenuRoot>
  );
}

export interface DropdownMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * When true, clones the single child element so that callers can use their
   * own button-styled component as the trigger.
   */
  asChild?: boolean;
}

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  function DropdownMenuTrigger({ asChild, children, onClick, onKeyDown, ...rest }, ref) {
    const { open, setOpen, anchorRef, triggerId, contentId } = useMenuContext();
    const sharedProps = {
      'aria-haspopup': 'menu' as const,
      'aria-expanded': open,
      'aria-controls': open ? contentId : undefined,
      'data-state': open ? 'open' : 'closed',
      id: triggerId,
      ref: (el: HTMLElement | null) => {
        anchorRef.current = el;
        if (typeof ref === 'function') ref(el as HTMLButtonElement);
        else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el as HTMLButtonElement;
      },
      onClick: (e: React.MouseEvent) => {
        onClick?.(e as React.MouseEvent<HTMLButtonElement>);
        setOpen(!open);
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        onKeyDown?.(e as React.KeyboardEvent<HTMLButtonElement>);
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen(true);
        }
      },
    };
    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<Record<string, unknown>>, sharedProps);
    }
    return (
      <button type="button" {...rest} {...sharedProps}>
        {children}
      </button>
    );
  },
);

export type DropdownMenuContentProps = MenuContentProps;

export function DropdownMenuContent(props: DropdownMenuContentProps) {
  return <MenuContent {...props} />;
}

export type DropdownMenuItemProps = MenuItemProps;

export function DropdownMenuItem(props: DropdownMenuItemProps) {
  return <MenuItem {...props} />;
}

export const DropdownMenuSeparator = MenuSeparator;
export const DropdownMenuLabel = MenuLabel;
