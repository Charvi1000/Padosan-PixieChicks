import { Hero } from '@/components/Hero';
import { ProblemSection } from '@/components/ProblemSection';
import { TrustSafety } from '@/components/TrustSafety';
import { ContinuousLearning } from '@/components/ContinuousLearning';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProblemSection />
      <TrustSafety />
      <ContinuousLearning />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;