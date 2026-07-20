import { motion } from 'framer-motion';
import { Calendar, FileText, Camera, CreditCard, Sparkles, ChevronRight } from 'lucide-react';

interface HowWeQuoteProps {
  onOpenEstimator: () => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function HowWeQuote({ onOpenEstimator }: HowWeQuoteProps) {
  const steps = [
    {
      number: "01",
      icon: Calendar,
      title: "Tell us your dates & event details",
      desc: "Share your schedule and celebration style so we can check availability."
    },
    {
      number: "02",
      icon: FileText,
      title: "We check availability & send an itemised quote",
      desc: "No flat packages. We calculate exactly what resources are needed."
    },
    {
      number: "03",
      icon: Camera,
      title: "You see exactly what's included — nothing hidden",
      desc: "Transparent breakdowns of camera crew, days, and deliverables."
    },
    {
      number: "04",
      icon: CreditCard,
      title: "What you sign is what you pay",
      desc: "We commit to the quoted budget with zero post-event surprise fees."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#FAF6F0] via-[#FFFDF9] to-[#FAF6F0] py-10 md:py-24 px-6 md:px-12 relative overflow-hidden select-none" id="how-we-quote">

      {/* Background Pink Bougainvillea Leaves Image (Top Left) */}
      <img
        src="/images/pink-leaf.png"
        alt="Pink Leaves"
        className="absolute -top-12 -left-12 w-48 sm:w-64 md:w-80 opacity-90 pointer-events-none select-none z-0 rotate-12 drop-shadow-sm"
      />

      {/* Background Pink Bougainvillea Leaves Image (Top Right) */}
      <img
        src="/images/pink-leaf.png"
        alt="Pink Leaves"
        className="absolute -top-12 -right-12 w-48 sm:w-64 md:w-80 opacity-90 pointer-events-none select-none z-0 transform scale-x-[-1] -rotate-12 drop-shadow-sm"
      />

      {/* Subtle Sparkles (Top Corners) */}
      <div className="absolute top-12 left-16 text-pink-300 opacity-40 hidden md:block">
        <Sparkles size={18} />
      </div>
      <div className="absolute top-12 right-16 text-pink-300 opacity-40 hidden md:block">
        <Sparkles size={18} />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">

        {/* Header Stack */}
        <div className="text-center mb-14 md:mb-16 max-w-2xl mx-auto">
          <motion.span
            {...fadeUp(0)}
            className="text-[10px] tracking-[0.4em] text-pink-400 font-sans uppercase font-bold block mb-2"
          >
            OUR PROCESS
          </motion.span>

          <motion.h2
            {...fadeUp(0.1)}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-obsidian tracking-tight leading-tight font-normal"
          >
            How We Quote
          </motion.h2>

          {/* Decorative Filament Icon */}
          <motion.div {...fadeUp(0.15)} className="flex items-center justify-center my-3 opacity-60">
            <div className="w-8 h-px bg-pink-300" />
            <span className="px-2 text-xs text-pink-400">❖</span>
            <div className="w-8 h-px bg-pink-300" />
          </motion.div>

          <motion.p {...fadeUp(0.2)} className="text-charcoal/75 text-xs md:text-sm max-w-xl mx-auto font-sans font-light leading-relaxed">
            Every wedding is unique, so we don't offer fixed packages. <br className="hidden sm:block" />
            You tell us your event details & requirements. We send a written, itemised quote.
          </motion.p>
        </div>

        {/* 4-CARD LUXURY GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComp = step.icon;

            return (
              <motion.div
                key={step.number}
                {...fadeUp(index * 0.12)}
                className="bg-white rounded-[28px] p-6 md:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(139,51,127,0.14)] transition-all duration-500 border border-warm-gray/25 hover:border-plum/40 flex flex-col justify-between group cursor-pointer relative overflow-hidden min-h-[290px]"
              >
                {/* Background Watermark Step Number */}
                <span className="text-7xl xl:text-8xl font-serif text-charcoal/[0.04] font-bold absolute -bottom-2 -right-2 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                  {step.number}
                </span>

                <div>
                  {/* Card Header Row: Icon Badge & Step Number Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-amber-900/10 flex items-center justify-center text-plum shadow-xs group-hover:bg-plum group-hover:text-white transition-colors duration-300">
                      <IconComp size={22} strokeWidth={1.5} />
                    </div>

                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-semibold text-pink-500 bg-pink-50/80 px-2.5 py-1 rounded-full border border-pink-200/50">
                      STEP {step.number}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="font-serif text-xl text-obsidian font-normal leading-snug mb-3 transition-colors group-hover:text-plum">
                    {step.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-charcoal/70 text-xs font-sans font-light leading-relaxed mb-6 relative z-10">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Right Arrow Button */}
                <div className="flex justify-end pt-2 relative z-10">
                  <div className="w-9 h-9 rounded-full border border-amber-900/15 bg-[#FAF6F0] shadow-xs flex items-center justify-center text-charcoal/60 group-hover:bg-plum group-hover:text-white group-hover:border-plum transition-all duration-300">
                    <ChevronRight size={16} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CTA BUTTON */}
        <motion.div {...fadeUp(0.3)} className="text-center mt-14 md:mt-16">
          <button
            onClick={onOpenEstimator}
            className="px-8 py-4 rounded-full bg-[#181316] text-white text-xs tracking-[0.2em] font-sans uppercase font-bold hover:bg-plum transition-all duration-500 shadow-[0_10px_25px_rgba(212,127,166,0.25)] hover:shadow-[0_15px_35px_rgba(212,127,166,0.4)] inline-flex items-center gap-2 cursor-pointer"
          >
            <span>CHECK AVAILABILITY FOR YOUR DATE</span>
            <Sparkles size={14} className="text-amber-300" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
