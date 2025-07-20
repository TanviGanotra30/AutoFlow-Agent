import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import StudyToolsSection from './StudyToolsSection';
import StatsSection from './StatsSection';
import TechStackSection from './TechStackSection';
import CTASection from './CTASection';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StudyToolsSection />
      <StatsSection />
      <TechStackSection />
      <CTASection />
    </div>
  );
};

export default AppLayout;