import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DataStrip } from './components/DataStrip';
import { FeaturedStories } from './components/FeaturedStories';
import { CinematicReel } from './components/CinematicReel';
import { PortfolioGrid } from './components/PortfolioGrid';
import { Philosophy } from './components/Philosophy';
import { LoveStoryQuote } from './components/LoveStoryQuote';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { AssociatePartners } from './components/AssociatePartners';
import { Testimonials } from './components/Testimonials';
import { InvestmentAccordion } from './components/InvestmentAccordion';
import { PricingEstimator } from './components/PricingEstimator';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
function App() {
  return (
    <div className="bg-alabaster text-espresso antialiased">
      <main>
        <Header />
        <Hero />
        <DataStrip />
        <CinematicReel />
        <PortfolioGrid />
        <FeaturedStories />
        <Philosophy />
        <LoveStoryQuote />
        <ExperienceTimeline />
        <AssociatePartners />
        <Testimonials />
        <InvestmentAccordion />
        <PricingEstimator />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
export default App;
