import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Destination() {
  const whatsappUrl = "https://wa.me/918700609950?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20a%20destination%20wedding%20shoot%21";

  return (
    <section className="bg-white py-12 md:py-16 px-6 md:px-12 relative overflow-hidden" id="destination">
      {/* Background soft gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orchid/5 via-transparent to-plum/5 -z-10 rounded-full blur-3xl transform scale-75"></div>

      <div className="container mx-auto max-w-4xl text-center">
        <motion.span {...fadeUp(0)} className="text-[10px] tracking-[0.35em] text-orchid uppercase font-semibold block mb-3 font-sans">
          Destination Weddings
        </motion.span>
        
        <motion.h2 {...fadeUp(0.1)} className="font-serif text-3xl md:text-5xl text-obsidian tracking-tight leading-tight mb-8 max-w-2xl mx-auto">
          Getting married away from home? We do cover destination
        </motion.h2>

        <motion.p {...fadeUp(0.2)} className="text-charcoal/80 text-base md:text-lg font-sans font-light leading-relaxed max-w-3xl mx-auto mb-6">
          A wedding away from home has enough moving parts. Your photography team shouldn't be one of them. We arrange our own travel and stay, and the whole shoot is planned with you before anyone packs a bag. You focus on your guests. We'll handle our side.
        </motion.p>

        {/* SEO Line Variant */}
        <motion.p {...fadeUp(0.3)} className="text-plum/80 text-xs tracking-wide uppercase font-semibold font-sans mb-12">
          Shot in Jaipur · Rishikesh · Nainital · Jim Corbett — and travelling wherever you're headed.
        </motion.p>

        <motion.div {...fadeUp(0.4)}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-obsidian text-alabaster px-10 py-5 rounded-full text-xs tracking-[0.25em] uppercase font-bold hover:bg-plum transition-all duration-500 hover:shadow-xl cursor-pointer"
          >
            Book a Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
