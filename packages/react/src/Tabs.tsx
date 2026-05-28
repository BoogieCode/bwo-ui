'use client';

import * as RadixTabs from '@radix-ui/react-tabs';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from './utils';

export const TabsRoot = forwardRef<
  ElementRef<typeof RadixTabs.Root>,
  ComponentPropsWithoutRef<typeof RadixTabs.Root>
>(function TabsRoot({ className, ...props }, ref) {
  return <RadixTabs.Root ref={ref} className={cn('bwo-tabs', className)} {...props} />;
});

export const TabsList = forwardRef<
  ElementRef<typeof RadixTabs.List>,
  ComponentPropsWithoutRef<typeof RadixTabs.List>
>(function TabsList({ className, ...props }, ref) {
  return <RadixTabs.List ref={ref} className={cn('bwo-tabs-list', className)} {...props} />;
});

export const TabsTrigger = forwardRef<
  ElementRef<typeof RadixTabs.Trigger>,
  ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <RadixTabs.Trigger ref={ref} className={cn('bwo-tabs-trigger', className)} {...props} />
  );
});

export const TabsContent = forwardRef<
  ElementRef<typeof RadixTabs.Content>,
  ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <RadixTabs.Content ref={ref} className={cn('bwo-tabs-content', className)} {...props} />
  );
});

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
};
