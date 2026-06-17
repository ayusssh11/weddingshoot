import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function TheaterView() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, 12]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 md:py-28 transition-colors duration-1000 ${
        inView ? 'bg-espresso' : 'bg-alabaster'
      }`}
    >
      <div className="overflow-hidden">
        <motion.div
          style={{ scale, borderRadius }}
          className="mx-auto origin-center cursor-pointer group"
        >
          <div className="aspect-[21/9] w-full relative overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=85"
              alt="Cinematic wedding wide shot"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-espresso/30 flex items-center justify-center transition-opacity duration-500 group-hover:bg-espresso/20">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-alabaster/80 flex items-center justify-center backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-alabaster border-b-[10px] border-b-transparent ml-1" />
              </div>
            </div>

            <div className={`absolute bottom-6 left-6 md:bottom-10 md:left-10 transition-opacity duration-700 ${
              inView ? 'opacity-100' : 'opacity-0'
            }`}>
              <span className="text-alabaster/80 text-[10px] tracking-[0.3em] uppercase font-sans font-medium block">
                Cinematic Film — 2026
              </span>
              <h3 className={`font-serif text-2xl md:text-3xl mt-1 transition-colors duration-1000 ${
                inView ? 'text-alabaster' : 'text-espresso'
              }`}>
                A Love Story in Light
              </h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
