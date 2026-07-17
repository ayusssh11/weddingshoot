import { useState, useEffect } from 'react';
import { PhoneCall } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RealWeddings } from './components/RealWeddings';
import { Differentiator } from './components/Differentiator';
import { Services } from './components/Services';
import { Locations } from './components/Locations';
import { Destination } from './components/Destination';
import { HowWeQuote } from './components/HowWeQuote';
import { Team } from './components/Team';
import { TestimonialsRedesigned } from './components/TestimonialsRedesigned';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { PricingEstimator } from './components/PricingEstimator';
import { BlogLayout } from './components/BlogLayout';

function App() {
  const whatsappUrl = "https://wa.me/918700609950?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20a%20wedding%20shoot%21";
  
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleScrollToEstimator = () => {
    const element = document.getElementById('estimator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isBlogView = currentHash === '#blog' || currentHash.startsWith('#blog/');

  return (
    <div className="bg-alabaster text-espresso antialiased min-h-screen relative font-sans">
      <Header onOpenEstimator={handleScrollToEstimator} />
      
      <main>
        {isBlogView ? (
          <BlogLayout currentHash={currentHash} />
        ) : (
          <>
            {/* 1. HERO */}
            <Hero onOpenEstimator={handleScrollToEstimator} />
            
            {/* 2. REAL WEDDINGS */}
            <RealWeddings />
            
            {/* 3. THE DIFFERENTIATOR */}
            <Differentiator onOpenEstimator={handleScrollToEstimator} />
            
            {/* 4. SERVICES */}
            <Services />
            
            {/* 5. PRE-WEDDING LOCATIONS */}
            <Locations />
            
            {/* 6. DESTINATION WEDDINGS */}
            <Destination />
            
            {/* 7. HOW WE QUOTE */}
            <HowWeQuote onOpenEstimator={handleScrollToEstimator} />
            
            {/* 8. TEAM */}
            <Team />
            
            {/* 9. TESTIMONIALS */}
            <TestimonialsRedesigned />
            
            {/* 10. FAQ */}
            <Faq />
            
            {/* RETAINED SECTION: PRICING ESTIMATOR */}
            <PricingEstimator />
            
            {/* 11. FINAL CTA */}
            <FinalCta onOpenEstimator={handleScrollToEstimator} />
          </>
        )}
        
        {/* FOOTER */}
        <Footer />
      </main>

      {/* Sticky WhatsApp Float Button (Bottom-Right) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center border border-white/20 group hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <PhoneCall size={20} className="transform rotate-90" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-all duration-300 group-hover:max-w-xs group-hover:ml-2">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

export default App;
