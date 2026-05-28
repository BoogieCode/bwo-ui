'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import { cn } from './utils';

export const AccordionRoot = forwardRef<
  ElementRef<typeof RadixAccordion.Root>,
  ComponentPropsWithoutRef<typeof RadixAccordion.Root>
>(function AccordionRoot({ className, ...props }, ref) {
  return (
    <RadixAccordion.Root ref={ref} className={cn('bwo-accordion', className)} {...props} />
  );
});

export const AccordionItem = forwardRef<
  ElementRef<typeof RadixAccordion.Item>,
  ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return (
    <RadixAccordion.Item
      ref={ref}
      className={cn('bwo-accordion-item', className)}
      {...props}
    />
  );
});

export const AccordionTrigger = forwardRef<
  ElementRef<typeof RadixAccordion.Trigger>,
  ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <RadixAccordion.Header className="bwo-accordion-header">
      <RadixAccordion.Trigger
        ref={ref}
        className={cn('bwo-accordion-trigger', className)}
        {...props}
      >
        <span>{children}</span>
        <span className="bwo-accordion-icon" aria-hidden />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
});

export const AccordionContent = forwardRef<
  ElementRef<typeof RadixAccordion.Content>,
  ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <RadixAccordion.Content
      ref={ref}
      className={cn('bwo-accordion-content', className)}
      {...props}
    >
      <div className="bwo-accordion-content-inner">{children}</div>
    </RadixAccordion.Content>
  );
});

export const Accordion = {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};
