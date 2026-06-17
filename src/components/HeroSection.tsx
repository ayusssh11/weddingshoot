import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-alabaster overflow-hidden">
      <div className="p-[5vw] min-h-screen flex flex-col items-start relative">

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="text-[22vw] md:text-[16vw] lg:text-[14vw] font-serif text-espresso/[0.04] leading-none tracking-tighter">
            TIMELISS
          </span>
        </div>

        <div className="relative z-10 flex-1 w-full flex flex-col md:flex-row md:items-start mt-24 md:mt-0">

          <div className="relative w-full md:w-[58%] md:ml-auto md:mt-[12vh] order-2 md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="aspect-[3/4] w-full overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=85"
                alt="Fine art wedding editorial"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            {...fadeUp(0.5)}
            className="relative -mt-16 md:absolute md:left-0 md:top-[20vh] md:w-[46%] lg:w-[40%] bg-alabaster/95 p-8 md:p-10 lg:p-12 shadow-xl order-1 md:order-1 z-20"
          >
            <span className="text-[10px] tracking-[0.35em] text-terracotta uppercase font-sans font-semibold block mb-4">
              The Art of Capturing Emotion
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-espresso leading-tight">
              Real Moments.
              <br />
              Artfully Cherished.
            </h1>
            <button className="group mt-8 pb-1 border-b border-terracotta text-terracotta tracking-[0.25em] text-xs uppercase font-sans font-medium transition-all duration-500 hover:border-espresso hover:text-espresso flex items-center gap-2">
              Enter Studio
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </button>
          </motion.div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-espresso/30">
          <span className="text-[9px] tracking-[0.3em] uppercase font-sans">Scroll</span>
          <div className="w-px h-8 bg-espresso/20" />
        </div>
      </motion.div>
    </section>
  );
}
