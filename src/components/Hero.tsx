import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface HeroProps {
  onOpenEstimator: () => void;
}

export function Hero({ onOpenEstimator }: HeroProps) {
  const whatsappUrl = "https://wa.me/918700609950?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20a%20wedding%20shoot%20session%21";
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 origin-center h-full w-full"
      >
        <img 
          src="https://weddingshoot.in/wp-content/uploads/0E1A6298.webp" 
          alt="Cinematic Wedding Shoot" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Scrim/Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/30 mix-blend-multiply"></div>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center mt-16">
        
        {/* Classy Reveal H1 */}
        <div className="overflow-hidden mb-6 py-2">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight max-w-4xl"
          >
            Wedding & Pre-Wedding Photographers based in Gurgaon
          </motion.h1>
        </div>
        
        {/* H2 Subhead */}
        <div className="overflow-hidden mb-12 py-1">
          <motion.p 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-ivory/85 text-sm sm:text-base md:text-lg lg:text-xl font-sans font-light max-w-2xl mx-auto leading-relaxed"
          >
            Covering weddings and destinations across North India since 2016.
          </motion.p>
        </div>
        
        {/* CTA Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
        >
          {/* Primary CTA */}
          <button 
            onClick={onOpenEstimator}
            className="w-full sm:w-auto bg-white text-obsidian px-8 py-4.5 rounded-full text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold hover:bg-orchid hover:text-white transition-all duration-500 hover:shadow-xl cursor-pointer"
          >
            Check Availability for Your Date
          </button>
          
          {/* Secondary CTA */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-white/45 text-white px-8 py-4.5 rounded-full text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold hover:bg-white/10 hover:border-white transition-all duration-500 text-center cursor-pointer"
          >
            Book a Discovery Call
          </a>
        </motion.div>

        {/* Trust Items */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-12 text-white/50 text-[10px] tracking-[0.25em] uppercase font-bold border-t border-white/10 pt-8 w-full justify-center max-w-md"
        >
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-2xl font-serif text-orchid leading-none mb-1">300+</span>
            <span>Weddings</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-2xl font-serif text-orchid leading-none mb-1">10 Years</span>
            <span>Experience</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
