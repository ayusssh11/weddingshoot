import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';

interface DifferentiatorProps {
  onOpenEstimator: () => void;
}

export function Differentiator({ onOpenEstimator }: DifferentiatorProps) {
  const comparisons = [
    {
      title: "Discovery & Consultations",
      regular: "You send an enquiry. They send a price list without understanding your story.",
      us: "You get a discovery call. We understand your events, your family, your day — before we quote anything."
    },
    {
      title: "Shoot Planning",
      regular: "No planning. They arrive on the day and figure it out as they go.",
      us: "Planning calls before every shoot. Locations, timeline, key moments, key people — agreed before we arrive."
    },
    {
      title: "Photo Access & App",
      regular: "Photos dumped on a Drive link that expires. You chase them on WhatsApp.",
      us: "Your edited work in a private app — view, select, share, download anytime."
    },
    {
      title: "Delivery Timelines",
      regular: "\"A few months.\" Delivery slips. You keep following up endlessly.",
      us: "On-time delivery. Completion timeline shared with you right after your event."
    },
    {
      title: "Team Expertise",
      regular: "One camera, one style. Everything looks the same across every ritual.",
      us: "Specialist teams — candid, traditional, cinematic — working seamlessly together."
    }
  ];

  return (
    <section className="bg-[#FAF8F5] py-20 md:py-28 px-6 md:px-12 relative overflow-hidden" id="differentiator">
      {/* Background script overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none w-full text-center">
        <span className="font-script text-7xl sm:text-9xl md:text-[12rem] text-charcoal tracking-wide whitespace-nowrap block">
          The Difference
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Stack */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-[10px] tracking-[0.35em] text-plum uppercase font-semibold block mb-3 font-sans">
            The Difference
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian tracking-tight leading-tight mb-4"
          >
            What separates us from a regular photographer
          </motion.h2>
          <p className="text-charcoal/70 text-sm md:text-base font-sans font-light">
            We don&apos;t just capture pictures — we architect a seamless, stress-free luxury experience for your wedding day.
          </p>
        </div>

        {/* Comparison Header Labels */}
        <div className="hidden md:grid grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-2 px-4 text-xs tracking-[0.25em] uppercase font-bold text-charcoal/50">
            <span className="w-2 h-2 rounded-full bg-charcoal/30"></span>
            <span>Regular Photographers</span>
          </div>
          <div className="flex items-center gap-2 px-4 text-xs tracking-[0.25em] uppercase font-bold text-plum">
            <Sparkles size={14} className="text-orchid" />
            <span>Wedding Shoot Atelier</span>
          </div>
        </div>

        {/* Comparison Cards Stack */}
        <div className="space-y-5">
          {comparisons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch"
            >
              {/* Regular Photographer Side */}
              <div className="bg-white/60 border border-warm-gray/30 rounded-xl p-5 md:p-6 flex items-start gap-4 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-red-50 text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-red-100">
                  <X size={14} />
                </div>
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase font-semibold text-charcoal/40 mb-1 md:hidden">
                    Regular Photographers
                  </h4>
                  <p className="text-charcoal/70 text-xs sm:text-sm font-sans font-light leading-relaxed">
                    {item.regular}
                  </p>
                </div>
              </div>

              {/* Wedding Shoot Side */}
              <div className="bg-white border border-plum/20 rounded-xl p-5 md:p-6 flex items-start gap-4 shadow-md hover:shadow-xl hover:border-plum/40 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orchid/10 to-transparent rounded-bl-full pointer-events-none" />
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-100 group-hover:scale-110 transition-transform">
                  <Check size={14} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[10px] tracking-widest uppercase font-bold text-plum mb-1 flex items-center gap-1.5 md:hidden">
                    Wedding Shoot Atelier
                  </h4>
                  <p className="text-obsidian text-xs sm:text-sm font-sans font-medium leading-relaxed">
                    {item.us}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <button
            onClick={onOpenEstimator}
            className="w-full sm:w-auto bg-obsidian text-white px-10 py-4.5 rounded-full text-xs tracking-[0.25em] uppercase font-bold hover:bg-plum transition-all duration-500 shadow-xl hover:shadow-2xl cursor-pointer inline-flex items-center justify-center gap-3 group"
          >
            <span>Check Availability for Your Date</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
