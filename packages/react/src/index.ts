'use client';

// Motion components
export { SplitReveal, type SplitRevealProps } from './SplitReveal';
export { Magnetic, type MagneticProps } from './Magnetic';
export { Marquee, type MarqueeProps } from './Marquee';
export { FlipList, type FlipListProps, type FlipListHandle } from './FlipList';
export { Parallax, type ParallaxProps } from './Parallax';
export { Reveal, type RevealProps } from './Reveal';
export { CountUp, type CountUpProps } from './CountUp';
export { ScrambleText, type ScrambleTextProps } from './ScrambleText';
export { TextGlitch, type TextGlitchProps } from './TextGlitch';
export { MagneticCursor, type MagneticCursorProps } from './MagneticCursor';
export { Tilt, type TiltProps } from './Tilt';
export { Spotlight, type SpotlightProps } from './Spotlight';
export { ScrollProgress, type ScrollProgressProps } from './ScrollProgress';
export { Stagger, type StaggerProps } from './Stagger';
export { GradientText, type GradientTextProps } from './GradientText';
export { Ripple, type RippleProps } from './Ripple';
export { Blur, type BlurProps } from './Blur';
export { Pin, type PinProps } from './Pin';
export { useMotion } from './use-motion';
export { type Radius } from './utils';
export { Glow, type GlowProps } from './Glow';
export { Lean, type LeanProps } from './Lean';
export { MediaZoom, type MediaZoomProps } from './MediaZoom';
export { BootScreen, type BootScreenProps } from './BootScreen';
export {
  PreanimateProvider,
  Preanimate,
  usePreanimate,
  type PreanimateProviderProps,
  type PreanimateProps,
} from './Preanimate';
export { Typewriter, type TypewriterProps, type TypewriterLine } from './Typewriter';

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
  type SelectTriggerProps,
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
  CardMedia,
  CardTab,
  CardEyebrow,
  CardName,
  CardCaption,
  type CardProps,
  type CardMediaProps,
} from './Card';
export { AppShell, BrandMark, type AppShellProps, type BrandMarkProps } from './AppShell';
export { Spin, Pulse, type SpinProps, type PulseProps } from './Motion';
export { Avatar, type AvatarProps, type AvatarSize } from './Avatar';
export { Skeleton, type SkeletonProps } from './Skeleton';
export { Progress, type ProgressProps } from './Progress';
export { Separator, type SeparatorProps } from './Separator';
export { Alert, type AlertProps, type AlertVariant } from './Alert';
export { Stat, type StatProps } from './Stat';

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
  RevealOptions,
  RevealDirection,
  CountUpOptions,
  ScrambleTextOptions,
  TextGlitchOptions,
  MagneticCursorOptions,
  TiltOptions,
  SpotlightOptions,
  ScrollProgressOptions,
  StaggerOptions,
  GradientTextOptions,
  RippleOptions,
  BlurOptions,
  PinOptions,
} from '@bwo-ui/core';
