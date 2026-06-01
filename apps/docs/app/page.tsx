import { HeroBento } from './hero-bento';
import {
  BigCTA,
  CodeSideBySide,
  ComponentGallery,
  FAQ,
  FeatureGrid,
  FrameworkStrip,
  LiveDemoStrip,
  MotionShowcase,
  StatsStrip,
} from './landing-sections';

export default function Home() {
  return (
    <>
      <HeroBento />
      <StatsStrip />
      <ComponentGallery />
      <LiveDemoStrip />
      <FeatureGrid />
      <CodeSideBySide />
      <MotionShowcase />
      <FAQ />
      <FrameworkStrip />
      <BigCTA />
    </>
  );
}
