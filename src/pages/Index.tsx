import { Hero } from '@/components/Hero';
import { ProblemSection } from '@/components/ProblemSection';
import { CharacterStories } from '@/components/CharacterStories';
import { PadosanIntro } from '@/components/PadosanIntro';
import { InteractiveDemo } from '@/components/InteractiveDemo';
import { CompatibilitySection } from '@/components/CompatibilitySection';
import { TrustSafety } from '@/components/TrustSafety';
import { LifeAfterMoveIn } from '@/components/LifeAfterMoveIn';
import { ContinuousLearning } from '@/components/ContinuousLearning';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProblemSection />
      <CharacterStories />
      <PadosanIntro />
      <InteractiveDemo />
      <CompatibilitySection />
      <TrustSafety />
      <LifeAfterMoveIn />
      <ContinuousLearning />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;