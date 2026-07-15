import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

interface DifferentiatorProps {
  onOpenEstimator: () => void;
}

export function Differentiator({ onOpenEstimator }: DifferentiatorProps) {
  const comparisons = [
    {
      regular: "You send an enquiry. They send a price list.",
      us: "You get a discovery call. We understand your events, your family, your day — before we quote anything."
    },
    {
      regular: "No planning. They arrive on the day and figure it out.",
      us: "Planning calls before every shoot. Locations, timeline, key moments, key people — agreed before we arrive."
    },
    {
      regular: "Photos dumped on a Drive link that expires. You chase them on WhatsApp.",
      us: "Your edited work in a private app — view, select, share, download. Anytime."
    },
    {
      regular: "\"A few months.\" Delivery slips. You keep following up.",
      us: "On-time delivery. Completion timeline shared with you right after your event."
    },
    {
      regular: "One camera, one style. Everything looks the same.",
      us: "Specialist teams — candid, traditional, cinematic — working the same day."
    }
  ];

  return (
    <section className="bg-ivory py-12 md:py-16 px-6 md:px-12" id="differentiator">
      <div className="container mx-auto max-w-5xl">
        {/* Header Stack */}
        <div className="text-center mb-10 md:mb-14">
          <motion.span {...fadeUp(0)} className="text-[10px] tracking-[0.35em] text-orchid uppercase font-semibold block mb-3 font-sans">
            The Difference
          </motion.span>
          <motion.h2 {...fadeUp(0.1)} className="font-serif text-3xl md:text-5xl text-obsidian tracking-tight leading-tight max-w-3xl mx-auto">
            What separates us from a regular photographer
          </motion.h2>
        </div>

        {/* Desktop Comparison Table (Hidden on Mobile) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 border-b border-warm-gray/40 pb-4 mb-4 text-[11px] tracking-[0.25em] uppercase font-bold text-charcoal/60">
            <div>Regular Photographers</div>
            <div className="text-plum">Wedding Shoot</div>
          </div>

          <div className="divide-y divide-warm-gray/20">
            {comparisons.map((row, index) => (
              <motion.div
                key={index}
                {...fadeUp(index * 0.1)}
                className="grid grid-cols-2 py-5 gap-6 items-center"
              >
                <div className="text-charcoal/70 text-sm font-sans font-light leading-relaxed pr-8">
                  {row.regular}
                </div>
                <div className="text-obsidian text-base font-sans font-medium leading-relaxed border-l-2 border-orchid/30 pl-8">
                  {row.us}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Layout: Stacked Cards (Hidden on Desktop) */}
        <div className="md:hidden space-y-6">
          {comparisons.map((row, index) => (
            <motion.div
              key={index}
              {...fadeUp(index * 0.05)}
              className="bg-white/40 border border-warm-gray/30 rounded-2xl p-6 space-y-4 shadow-sm"
            >
              {/* Regular Photographer (Muted Gray Line Above) */}
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider font-bold text-charcoal/40 block">
                  Regular Photographer
                </span>
                <p className="text-charcoal/60 text-xs font-sans font-light leading-relaxed">
                  {row.regular}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-warm-gray/50 my-2"></div>

              {/* Wedding Shoot (Bold, Orchid Accent Below) */}
              <div className="space-y-1">
                <span className="text-[9px] uppercase tracking-wider font-bold text-orchid block">
                  Wedding Shoot
                </span>
                <p className="text-obsidian text-sm font-sans font-medium leading-relaxed">
                  {row.us}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div {...fadeUp(0.3)} className="text-center mt-16">
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
