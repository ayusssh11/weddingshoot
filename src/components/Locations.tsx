import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Locations() {
  const locations = [
    {
      id: 1,
      city: "Delhi NCR",
      tagline: "City light, close to home",
      image: "https://weddingshoot.in/wp-content/uploads/2021/06/IMG_2484-1024x683.jpg",
      link: "/pre-wedding/delhi-ncr"
    },
    {
      id: 2,
      city: "Nainital",
      tagline: "Lakes and pine, in soft light",
      image: "https://weddingshoot.in/wp-content/uploads/2023/08/IMG_9506-682x1024.webp",
      link: "/pre-wedding/nainital"
    },
    {
      id: 3,
      city: "Rishikesh",
      tagline: "River, and light in the hills",
      image: "https://weddingshoot.in/wp-content/uploads/0E1A6298.webp",
      link: "/pre-wedding/rishikesh"
    },
    {
      id: 4,
      city: "Jaipur",
      tagline: "Palaces, courtyards, old walls",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/0E1A9633-1024x683.webp",
      link: "/pre-wedding/jaipur"
    },
    {
      id: 5,
      city: "Jim Corbett",
      tagline: "Forest light and open sky",
      image: "https://weddingshoot.in/wp-content/uploads/7Q8A1251-2.webp",
      link: "/pre-wedding/jim-corbett"
    }
  ];

  return (
    <section className="bg-ivory py-12 md:py-16 px-6 md:px-12" id="locations">
      <div className="container mx-auto">
        {/* Header Stack */}
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <span className="text-[10px] tracking-[0.35em] text-orchid uppercase font-semibold block mb-3 font-sans">
            Locations
          </span>
          {/* Elegant Heading Reveal */}
          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl text-obsidian tracking-tight leading-tight"
            >
              Pre-Weddings, Beyond the City
            </motion.h2>
          </div>
          <motion.p {...fadeUp(0.2)} className="text-charcoal/70 text-sm md:text-base mt-4 font-sans font-light">
            Where you shoot changes the story you tell.
          </motion.p>
        </div>

        {/* 5-Card Layout: Desktop 5 Columns / Mobile Swipe Carousel */}
        <div className="flex md:grid md:grid-cols-5 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory pb-6 md:pb-0 scrollbar-none">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.id}
              {...fadeUp(index * 0.1)}
              className="min-w-[70vw] sm:min-w-[45vw] md:min-w-0 snap-align-start group relative aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg cursor-pointer"
            >
              {/* Background Image with slow zoom */}
              <img
                src={loc.image}
                alt={loc.city}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-103"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/55 to-transparent transition-opacity duration-500 group-hover:opacity-90"></div>

              {/* Luxury Inset Border Frame (Draws itself / fades in on hover) */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 rounded-lg pointer-events-none transition-all duration-700 ease-out scale-98 group-hover:scale-100 opacity-0 group-hover:opacity-100"></div>

              {/* Location Text */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end text-white z-10">
                <h3 className="font-serif text-xl text-alabaster leading-tight mb-1">
                  {loc.city}
                </h3>
                <p className="text-[11px] text-ivory/80 font-sans font-light leading-relaxed mb-4">
                  {loc.tagline}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.25em] uppercase font-semibold text-white/70 group-hover:text-white transition-colors">
                  See work
                  <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
