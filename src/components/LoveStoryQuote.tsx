import { motion } from 'framer-motion';

const filmImages = [
  'https://images.unsplash.com/photo-1529636798458-92182e662485?w=300&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&q=80',
  'https://images.unsplash.com/photo-1537633552982-df8429e8048b?w=300&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=300&q=80',
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&q=80',
  'https://images.unsplash.com/photo-1509630778269-351f7a3e5280?w=300&q=80',
  'https://images.unsplash.com/photo-1520854226256-7950050f23ed?w=300&q=80',
  'https://images.unsplash.com/photo-1507504031003-b4d8e8aee4e8?w=300&q=80',
];

export function LoveStoryQuote() {
  return (
    <section className="bg-khaki py-28 md:py-40 px-[5vw] overflow-hidden relative">
      <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4"
        >
          {[...filmImages, ...filmImages].map((src, i) => (
            <div
              key={i}
              className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 opacity-[0.08] overflow-hidden"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
          className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-espresso leading-[1.3] md:leading-[1.25] tracking-tight"
        >
          &ldquo;They captured the quiet sighs, the loud laughs, and everything in between.&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 md:mt-14"
        >
          <span className="text-[9px] tracking-[0.35em] text-terracotta uppercase font-sans font-semibold">
            — Anoushka &amp; Rohan, Villa Riviera
          </span>
        </motion.div>
      </div>
    </section>
  );
}
