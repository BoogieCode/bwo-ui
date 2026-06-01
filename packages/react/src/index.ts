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
export { Blur, type BlurDirection, type BlurIntensity, type BlurProps } from './Blur';
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
export {
  AppShell,
  BrandMark,
  type AppShellProps,
  type AppShellAlign,
  type BrandMarkProps,
} from './AppShell';
export { Spin, Pulse, type SpinProps, type PulseProps } from './Motion';
export {
  Avatar,
  AvatarGroup,
  type AvatarGroupProps,
  type AvatarProps,
  type AvatarShape,
  type AvatarSize,
} from './Avatar';
export {
  Skeleton,
  type SkeletonAnimation,
  type SkeletonProps,
  type SkeletonVariant,
} from './Skeleton';
export {
  Progress,
  type ProgressProps,
  type ProgressShape,
  type ProgressSize,
  type ProgressVariant,
} from './Progress';
export {
  Separator,
  type SeparatorLabelAlign,
  type SeparatorOrientation,
  type SeparatorProps,
  type SeparatorSize,
  type SeparatorSpacing,
  type SeparatorTone,
  type SeparatorVariant,
} from './Separator';
export {
  Alert,
  type AlertAppearance,
  type AlertProps,
  type AlertVariant,
} from './Alert';
export {
  Stat,
  StatGroup,
  type StatAlign,
  type StatGoodWhen,
  type StatGroupProps,
  type StatProps,
  type StatSize,
  type StatTone,
} from './Stat';

// Overlays
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  type DialogPosition,
  type DialogSize,
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
export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  type BreadcrumbProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
  type BreadcrumbSeparatorProps,
} from './Breadcrumb';
export { Pagination, type PaginationProps } from './Pagination';

// Multi-step forms
export {
  Stepper,
  Step,
  StepConnector,
  type StepperProps,
  type StepProps,
  type StepConnectorProps,
  type StepperOrientation,
  type StepStatus,
} from './Stepper';

// Overlays — Sheet (drawer)
export {
  Sheet,
  SheetRoot,
  SheetTrigger,
  SheetClose,
  SheetOverlay,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  type SheetContentProps,
  type SheetSide,
} from './Sheet';

// Menus
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  type DropdownMenuProps,
  type DropdownMenuTriggerProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
} from './DropdownMenu';
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  type ContextMenuProps,
  type ContextMenuTriggerProps,
  type ContextMenuContentProps,
  type ContextMenuItemProps,
} from './ContextMenu';

// Search / autocomplete
export { Combobox, type ComboboxProps, type ComboboxOption } from './Combobox';
export {
  Command,
  CommandDialog,
  type CommandProps,
  type CommandItemEntry,
  type CommandDialogProps,
} from './Command';

// Date / calendar
export {
  Calendar,
  type CalendarProps,
  type CalendarMode,
  type DateRange,
} from './Calendar';
export { DatePicker, type DatePickerProps } from './DatePicker';

// Data display
export {
  DataTable,
  type DataTableProps,
  type DataTableColumn,
  type SortDirection,
  type SortState,
} from './DataTable';

// Timeline
export {
  Timeline,
  TimelineItem,
  type TimelineAlign,
  type TimelineConnectorStyle,
  type TimelineItemProps,
  type TimelineItemStatus,
  type TimelineOrientation,
  type TimelineProps,
  type TimelineSize,
} from './Timeline';

// Layout — Grid primitives
export {
  SimpleGrid,
  Grid,
  GridItem,
  type SimpleGridProps,
  type GridProps,
  type GridItemProps,
} from './Grid';

// Floating action button
export {
  FloatingActionButton,
  FAB,
  type FloatingActionButtonProps,
  type FabSize,
  type FabVariant,
  type FabPosition,
} from './FloatingActionButton';

// Bottom navigation
export {
  BottomNavigation,
  BottomNavigationItem,
  type BottomNavigationProps,
  type BottomNavigationItemProps,
  type BottomNavigationVariant,
} from './BottomNavigation';

// Carousel
export {
  Carousel,
  CarouselItem,
  type CarouselProps,
  type CarouselItemProps,
  type CarouselHandle,
} from './Carousel';

// Numeric input
export { NumberInput, type NumberInputProps } from './NumberInput';

// Rating
export {
  Rate,
  type RateProps,
  type RateSymbol,
  type RateSize,
} from './Rate';

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
