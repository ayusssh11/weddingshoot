import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

interface FinalCtaProps {
  onOpenEstimator: () => void;
}

export function FinalCta({ onOpenEstimator }: FinalCtaProps) {
  const whatsappUrl = "https://wa.me/918700609950?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20my%20wedding%20date%21";

  return (
    <section className="bg-obsidian text-alabaster py-10 md:py-20 px-6 md:px-12 relative overflow-hidden" id="final-cta">
      {/* Editorial backdrop light */}
      <div className="absolute inset-0 bg-gradient-to-t from-plum/10 via-transparent to-transparent opacity-60"></div>
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.span {...fadeUp(0)} className="text-[10px] tracking-[0.35em] text-orchid uppercase font-semibold block mb-4 font-sans">
          Get in Touch
        </motion.span>
        
        <motion.h2 {...fadeUp(0.1)} className="font-serif text-4xl md:text-6xl text-white tracking-tight leading-tight mb-6">
          Let's tell your wedding story.
        </motion.h2>
        
        <motion.p {...fadeUp(0.2)} className="text-ivory/80 text-base md:text-lg font-sans font-light leading-relaxed max-w-xl mx-auto mb-16">
          Tell us your date — we'll tell you if we're free.
        </motion.p>

        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary CTA */}
          <button
            onClick={onOpenEstimator}
            className="w-full sm:w-auto bg-white text-obsidian px-10 py-5 rounded-full text-xs tracking-[0.25em] uppercase font-bold hover:bg-orchid hover:text-white transition-all duration-500 hover:shadow-xl cursor-pointer"
          >
            Check Availability for Your Date
          </button>

          {/* Secondary CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-white/30 text-white px-10 py-5 rounded-full text-xs tracking-[0.25em] uppercase font-bold hover:bg-white/10 hover:border-white transition-all duration-500 text-center cursor-pointer"
          >
            Book a Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
