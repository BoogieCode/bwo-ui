// Motion components
export { SplitReveal } from './SplitReveal';
export { Magnetic } from './Magnetic';
export { Marquee } from './Marquee';
export { FlipList } from './FlipList';
export { Parallax } from './Parallax';
export { Reveal } from './Reveal';
export { CountUp } from './CountUp';
export { ScrambleText } from './ScrambleText';
export { TextGlitch } from './TextGlitch';
export { MagneticCursor } from './MagneticCursor';
export { Tilt } from './Tilt';
export { Spotlight } from './Spotlight';
export { ScrollProgress } from './ScrollProgress';
export { Stagger } from './Stagger';
export { GradientText } from './GradientText';
export { Ripple } from './Ripple';
export { Blur } from './Blur';
export { Pin } from './Pin';
export { Spin, Pulse } from './Motion';
export { Glow } from './Glow';
export { Lean } from './Lean';
export { MediaZoom } from './MediaZoom';
export { useMotion } from './use-motion';
export { type Radius } from './utils';

// UI primitives
export { Button, type ButtonVariant, type ButtonSize } from './Button';
export { IconButton, type IconButtonVariant, type IconButtonSize } from './IconButton';
export { Input } from './Input';
export { Textarea } from './Textarea';
export { NumberInput } from './NumberInput';
export { Rate, type RateSymbol, type RateSize } from './Rate';
export {
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from './Select';
export { Checkbox, type CheckedState } from './Checkbox';
export { Switch } from './Switch';
export { Slider, type SliderOrientation } from './Slider';
export { RadioGroupRoot, RadioGroupItem } from './RadioGroup';
export { Badge, type BadgeVariant } from './Badge';
export { Card, CardHeader, CardTitle, CardDescription, CardFooter } from './Card';
export { Avatar, type AvatarSize } from './Avatar';
export { Skeleton } from './Skeleton';
export { Progress } from './Progress';
export { Alert, type AlertVariant } from './Alert';
export { Stat } from './Stat';
export { Separator } from './Separator';
export { FormField } from './FormField';
export { AppShell, BrandMark, type AppShellAlign } from './AppShell';

// Layout & navigation
export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from './Breadcrumb';
export { Pagination } from './Pagination';
export {
  Stepper,
  Step,
  StepConnector,
  type StepperOrientation,
  type StepStatus,
} from './Stepper';
export { Timeline, TimelineItem, type TimelineOrientation, type TimelineItemStatus } from './Timeline';
export { SimpleGrid, Grid, GridItem } from './Grid';
export {
  FloatingActionButton,
  FAB,
  type FabSize,
  type FabVariant,
  type FabPosition,
} from './FloatingActionButton';
export {
  BottomNavigation,
  BottomNavigationItem,
  type BottomNavigationVariant,
} from './BottomNavigation';
export { Carousel } from './Carousel';

// Overlays
export {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './Dialog';
export {
  PopoverRoot,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverClose,
} from './Popover';
export {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from './Tooltip';
export {
  SheetRoot,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  type SheetSide,
} from './Sheet';

// Navigation overlays
export { TabsRoot, TabsList, TabsTrigger, TabsContent } from './Tabs';
export {
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
