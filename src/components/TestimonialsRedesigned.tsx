import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function TestimonialsRedesigned() {
  const testimonials = [
    {
      quote: "I had my 2 days pre wedding shoot done in Nainital and couldn't have been better. Their team is super creative and the owner gets involved with the client to discuss the feedback after each delivery.",
      author: "Vishesh Bansal",
      context: "destination + owner involvement"
    },
    {
      quote: "We just received our wedding album, and the quality is absolutely superb — the print, the layout, the finish are top-notch. A special mention to the design of the pen drive — every family member noticed and loved it!",
      author: "Pinku Shaw",
      context: "premium deliverables"
    },
    {
      quote: "Our pre-wedding experience with Wedding Shoot was amazing. The edited photographs and video teaser were absolutely stunning.",
      author: "Karan Malik",
      context: "pre-wedding craft"
    }
  ];

  return (
    <section className="bg-ivory py-12 md:py-16 px-6 md:px-12" id="testimonials">
      <div className="container mx-auto max-w-5xl">
        {/* Header Stack */}
        <div className="text-center mb-10 md:mb-14">
          <motion.span {...fadeUp(0)} className="text-[10px] tracking-[0.35em] text-orchid uppercase font-semibold block mb-3 font-sans">
            Testimonials
          </motion.span>
          <motion.h2 {...fadeUp(0.1)} className="font-serif text-4xl md:text-5xl text-obsidian tracking-tight leading-tight">
            What Our Couples Say
          </motion.h2>
        </div>

        {/* Testimonials Grid (Stacked on Mobile, 3 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              {...fadeUp(index * 0.15)}
              className="bg-white/60 backdrop-blur-md border border-warm-gray/30 p-8 rounded-2xl flex flex-col justify-between shadow-sm"
            >
              {/* Quote text */}
              <p className="font-serif italic text-base md:text-lg text-obsidian leading-relaxed mb-6">
                "{t.quote}"
              </p>

              {/* Author details */}
              <div className="border-t border-warm-gray/35 pt-4 mt-auto">
                <h4 className="font-sans text-sm font-bold text-obsidian">
                  {t.author}
                </h4>
                <span className="text-[9px] tracking-widest text-charcoal/40 uppercase font-semibold block mt-1 font-sans">
                  Verified Couple
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
