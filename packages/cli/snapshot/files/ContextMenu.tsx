'use client';

import {
  cloneElement,
  isValidElement,
  useCallback,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRoot,
  MenuSeparator,
  type MenuContentProps,
  type MenuItemProps,
} from './internal/menu';
import type { AnchorRect } from './internal/floating';

export interface ContextMenuProps {
  children: ReactNode;
}

export function ContextMenu({ children }: ContextMenuProps) {
  return <>{children}</>;
}

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /** When true, clones the single child instead of rendering a wrapper div. */
  asChild?: boolean;
  /** Content to render inside the menu when open. */
  menu: ReactNode;
}

export function ContextMenuTrigger({
  asChild,
  menu,
  children,
  onContextMenu,
  ...rest
}: ContextMenuTriggerProps) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<AnchorRect | null>(null);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      onContextMenu?.(e as React.MouseEvent<HTMLDivElement>);
      e.preventDefault();
      setRect({ top: e.clientY, left: e.clientX, width: 1, height: 1 });
      setOpen(true);
    },
    [onContextMenu],
  );

  const triggerProps = {
    onContextMenu: handleContextMenu,
    ...rest,
  };

  return (
    <>
      {asChild && isValidElement(children) ? (
        cloneElement(children as ReactElement<Record<string, unknown>>, triggerProps)
      ) : (
        <div {...triggerProps}>{children}</div>
      )}
      <MenuRoot open={open} onOpenChange={setOpen} manualRect={rect}>
        {menu}
      </MenuRoot>
    </>
  );
}

export type ContextMenuContentProps = MenuContentProps;

export function ContextMenuContent(props: ContextMenuContentProps) {
  return <MenuContent side="bottom" align="start" sideOffset={0} {...props} />;
}

export type ContextMenuItemProps = MenuItemProps;

export function ContextMenuItem(props: ContextMenuItemProps) {
  return <MenuItem {...props} />;
}

export const ContextMenuSeparator = MenuSeparator;
export const ContextMenuLabel = MenuLabel;
