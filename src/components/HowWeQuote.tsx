import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

interface HowWeQuoteProps {
  onOpenEstimator: () => void;
}

export function HowWeQuote({ onOpenEstimator }: HowWeQuoteProps) {
  const steps = [
    {
      number: "1",
      title: "Tell us your dates & event details",
      desc: "Share your schedule and celebration style so we can check availability."
    },
    {
      number: "2",
      title: "We check availability and send an itemised quote",
      desc: "No flat packages. We calculate exactly what resources are needed."
    },
    {
      number: "3",
      title: "You see exactly what's included — nothing hidden",
      desc: "Transparent breakdowns of camera crew, days, and deliverables."
    },
    {
      number: "4",
      title: "What you sign is what you pay",
      desc: "We commit to the quoted budget with zero post-event surprise fees."
    }
  ];

  return (
    <section className="bg-ivory py-12 md:py-16 px-6 md:px-12" id="how-we-quote">
      <div className="container mx-auto max-w-5xl">
        {/* Header Stack */}
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <motion.span {...fadeUp(0)} className="text-[10px] tracking-[0.35em] text-orchid uppercase font-semibold block mb-3 font-sans">
            Our Process
          </motion.span>
          <motion.h2 {...fadeUp(0.1)} className="font-serif text-4xl md:text-5xl text-obsidian tracking-tight leading-tight">
            How We Quote
          </motion.h2>
          <p className="text-charcoal/70 text-sm md:text-base mt-4 font-sans font-light">
            Every wedding is unique, so we don't offer fixed packages. You tell us your event details & requirements. We send a written, itemised quote.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              {...fadeUp(index * 0.15)}
              className="bg-white/50 border border-warm-gray/30 p-8 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Number indicator */}
              <div className="font-serif text-4xl text-orchid/80 font-bold mb-4">
                {step.number}
              </div>
              <h3 className="font-sans text-sm font-bold text-obsidian leading-snug mb-2">
                {step.title}
              </h3>
              <p className="text-charcoal/60 text-xs font-sans font-light leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div {...fadeUp(0.3)} className="text-center mt-16 md:mt-20">
          <button
            onClick={onOpenEstimator}
            className="w-full sm:w-auto bg-obsidian text-alabaster px-10 py-5 rounded-full text-xs tracking-[0.25em] uppercase font-bold hover:bg-plum transition-all duration-500 hover:shadow-xl cursor-pointer"
          >
            Check Availability for Your Date
          </button>
        </motion.div>
      </div>
    </section>
  );
}
