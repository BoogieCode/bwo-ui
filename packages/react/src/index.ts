'use client';

// Motion components
export { SplitReveal, type SplitRevealProps } from './SplitReveal';
export { Magnetic, type MagneticProps } from './Magnetic';
export { Marquee, type MarqueeProps } from './Marquee';
export { FlipList, type FlipListProps, type FlipListHandle } from './FlipList';
export { useMotion } from './use-motion';

// Layout / helpers
export {
  Button,
  ButtonGroup,
  type ButtonProps,
  type ButtonGroupProps,
  type ButtonVariant,
  type ButtonSize,
} from './Button';
export {
  IconButton,
  type IconButtonProps,
  type IconButtonVariant,
  type IconButtonSize,
} from './IconButton';
export { Input, type InputProps } from './Input';
export { Textarea, type TextareaProps } from './Textarea';
export { FormField, type FormFieldProps } from './FormField';
export {
  Select,
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  type SelectItemProps,
} from './Select';
export { Checkbox, type CheckboxProps } from './Checkbox';
export { Switch, type SwitchProps } from './Switch';
export { Slider, type SliderProps } from './Slider';
export {
  RadioGroup,
  RadioGroupRoot,
  RadioGroupItem,
} from './RadioGroup';
export { Badge, type BadgeProps, type BadgeVariant } from './Badge';
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  type CardProps,
} from './Card';
export { Avatar, type AvatarProps, type AvatarSize } from './Avatar';
export { Skeleton, type SkeletonProps } from './Skeleton';
export { Progress, type ProgressProps } from './Progress';

// Overlays
export {
  Dialog,
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './Dialog';
export {
  Toast,
  Toaster,
  useToast,
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from './Toast';
export {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from './Tooltip';
export {
  Popover,
  PopoverRoot,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverClose,
} from './Popover';

// Navigation
export {
  Tabs,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from './Tabs';
export {
  Accordion,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

// Re-export core types
export type {
  MotionInstance,
  Target,
  SplitRevealOptions,
  SplitRevealType,
  MagneticOptions,
  MarqueeOptions,
  MarqueeDirection,
  FlipListOptions,
  FlipListInstance,
  ParallaxOptions,
  ScrambleTextOptions,
  MagneticCursorOptions,
} from '@bwo-ui/core';

// Re-export new motion components (defined below in motion section)
export { Parallax, type ParallaxProps } from './Parallax';
export { ScrambleText, type ScrambleTextProps } from './ScrambleText';
export { MagneticCursor, type MagneticCursorProps } from './MagneticCursor';
