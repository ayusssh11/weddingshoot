import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function BrokenGrid() {
  return (
    <section className="bg-alabaster py-28 md:py-36 px-[5vw]">
      <div className="max-w-[90vw] mx-auto flex flex-col md:flex-row gap-12 md:gap-0">

        <motion.div
          {...fadeUp(0)}
          className="md:w-[38%]"
        >
          <div className="aspect-[2/3] w-full overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=700&q=85"
              alt="Fine art bridal detail"
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-1000"
            />
          </div>
          <div className="mt-8 md:mt-10">
            <span className="text-[9px] tracking-[0.35em] text-terracotta uppercase font-sans font-semibold">
              [ Fine Art Bridal — 001 ]
            </span>
            <p className="mt-2 text-espresso/50 text-sm font-sans leading-relaxed max-w-xs">
              Editorial still life captured on medium format film. Natural light only.
            </p>
          </div>
        </motion.div>

        <div className="md:w-[56%] md:ml-auto flex flex-col items-start">
          <motion.h2
            {...fadeUp(0.15)}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-espresso leading-[1.1] -mt-2 md:-mt-8"
          >
            Unposed.
            <br />
            Raw.
            <br />
            Intimate.
          </motion.h2>

          <motion.div
            {...fadeUp(0.3)}
            className="w-full mt-8 md:mt-12 lg:mt-16"
          >
            <div className="aspect-[16/11] w-full overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1537633552982-df8429e8048b?w=1100&q=85"
                alt="Candid wedding reception"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-1000"
              />
            </div>
            <div className="mt-8 md:mt-10">
              <span className="text-[9px] tracking-[0.35em] text-terracotta uppercase font-sans font-semibold">
                [ Documentary Reception — 002 ]
              </span>
              <p className="mt-2 text-espresso/50 text-sm font-sans leading-relaxed max-w-xs">
                Unscripted emotion during the golden hour celebration.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
