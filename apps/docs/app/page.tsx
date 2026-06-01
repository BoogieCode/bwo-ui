import { HeroBento } from './hero-bento';
import {
  BigCTA,
  CodeSideBySide,
  FeatureGrid,
  LiveDemoStrip,
  MotionShowcase,
  StatsStrip,
} from './landing-sections';

export default function Home() {
  return (
    <>
      <HeroBento />
      <StatsStrip />
      <FeatureGrid />
      <LiveDemoStrip />
      <CodeSideBySide />
      <MotionShowcase />
      <BigCTA />
    </>
  );
}
