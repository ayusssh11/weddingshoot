import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Services() {
  const services = [
    {
      id: 1,
      title: "Wedding Photography",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/IMG_5122-1024x683.webp",
      link: "#"
    },
    {
      id: 2,
      title: "Pre-Wedding Shoots",
      image: "https://weddingshoot.in/wp-content/uploads/7Q8A1251-2.webp",
      link: "#"
    },
    {
      id: 3,
      title: "Cinematic Films",
      image: "https://weddingshoot.in/wp-content/uploads/0E1A6298.webp",
      link: "#"
    },
    {
      id: 4,
      title: "Candid Photography",
      image: "https://weddingshoot.in/wp-content/uploads/7Q8A9888-2.webp",
      link: "#"
    }
  ];

  return (
    <section className="bg-white py-12 md:py-16 px-6 md:px-12" id="services">
      <div className="container mx-auto">
        {/* Header Stack */}
        <div className="text-center mb-10 md:mb-14">
          <span className="text-[10px] tracking-[0.35em] text-orchid uppercase font-semibold block mb-3 font-sans">
            Our Offerings
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
              What We Shoot
            </motion.h2>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, index) => (
            <motion.div
              key={srv.id}
              {...fadeUp(index * 0.15)}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ivory shadow-lg cursor-pointer"
            >
              {/* Image with slow zoom on hover */}
              <img
                src={srv.image}
                alt={srv.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-103"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/95 via-obsidian/50 to-transparent transition-opacity duration-500 group-hover:opacity-95"></div>

              {/* Luxury Inset Border Frame (Draws itself / fades in on hover) */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 rounded-lg pointer-events-none transition-all duration-700 ease-out scale-98 group-hover:scale-100 opacity-0 group-hover:opacity-100"></div>

              {/* Title & CTA */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end text-white z-10">
                <h3 className="font-serif text-2xl text-alabaster leading-tight mb-4">
                  {srv.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-semibold text-white/70 group-hover:text-white transition-colors">
                  View work 
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
