import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function RealWeddings() {
  const weddings = [
    {
      id: 1,
      names: "Aditi & Rahul",
      location: "Gurgaon",
      image: "https://weddingshoot.in/wp-content/uploads/2021/06/IMG_2484-1024x683.jpg",
      link: "/real-weddings/aditi-rahul"
    },
    {
      id: 2,
      names: "Sanya & Rohan",
      location: "Jaipur — destination",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/0E1A9633-1024x683.webp",
      link: "/real-weddings/sanya-rohan"
    },
    {
      id: 3,
      names: "Priya & Amit",
      location: "Delhi",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/7Q8A1025.webp",
      link: "/real-weddings/priya-amit"
    }
  ];

  return (
    <section className="bg-white py-12 md:py-16 px-6 md:px-12 overflow-hidden" id="real-weddings">
      <div className="container mx-auto">
        {/* Header Stack */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.35em] text-orchid uppercase font-semibold block mb-3 font-sans">
              Our Portfolios
            </span>
            {/* Elegant Heading Reveal */}
            <div className="overflow-hidden py-1">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-obsidian tracking-tight leading-tight"
              >
                Real Weddings
              </motion.h2>
            </div>
            <motion.p {...fadeUp(0.2)} className="text-charcoal/70 text-sm md:text-base mt-4 font-sans font-light">
              Every couple gets their own story — never a template.
            </motion.p>
          </div>

          <motion.div {...fadeUp(0.3)}>
            <a
              href="/real-weddings/"
              onClick={(e) => e.preventDefault()} // Browse intent link for demo
              className="group inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-bold text-obsidian hover:text-plum transition-colors"
            >
              See All Real Weddings
              <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>

        {/* Swipe Carousel for Mobile, Grid for Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-6 md:pb-0 scrollbar-none">
          {weddings.map((w, index) => (
            <motion.div
              key={w.id}
              {...fadeUp(index * 0.15)}
              className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-align-start group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-xl bg-ivory shadow-lg cursor-pointer"
            >
              {/* Background Image with Slow Zoom on Hover */}
              <img
                src={w.image}
                alt={w.names}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-103"
                loading="lazy"
              />
              
              {/* Dark Scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>

              {/* Luxury Inset Border Frame (Draws itself / fades in on hover) */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 rounded-lg pointer-events-none transition-all duration-700 ease-out scale-98 group-hover:scale-100 opacity-0 group-hover:opacity-100"></div>

              {/* Text content absolute at bottom */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end text-white relative z-10">
                <span className="text-[10px] tracking-widest uppercase font-bold text-orchid/90 mb-1.5 font-sans">
                  {w.location}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-alabaster leading-tight mb-4">
                  {w.names}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-semibold text-white/70 group-hover:text-white transition-colors">
                  View story 
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
