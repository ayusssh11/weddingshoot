import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Services() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [revolutionAngle, setRevolutionAngle] = useState(0);
  const [radius, setRadius] = useState(300);
  const angleRef = useRef(0);
  angleRef.current = revolutionAngle;
  const isScrolling = useRef(false);

  const services = [
    {
      id: 1,
      title: "Wedding Photography",
      tagline: "Timeless wedding storytelling",
      desc: "Meticulously documented legacy celebrations with editorial fine art framing.",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/IMG_5122-1024x683.webp",
      link: "#contact"
    },
    {
      id: 2,
      title: "Pre-Wedding Shoots",
      tagline: "Romantic pre-wedding narratives",
      desc: "Unscripted intimate moments captured in scenic destination locations.",
      image: "https://weddingshoot.in/wp-content/uploads/7Q8A1251-2.webp",
      link: "#contact"
    },
    {
      id: 3,
      title: "Cinematic Films",
      tagline: "Masterpiece wedding films & trailers",
      desc: "4K motion pictures graded to feel like a timeless Hollywood film.",
      image: "https://weddingshoot.in/wp-content/uploads/0E1A6298.webp",
      link: "#contact"
    },
    {
      id: 4,
      title: "Candid Photography",
      tagline: "Unscripted genuine human emotions",
      desc: "Split-second glances, unprompted laughter, and raw joy caught in real time.",
      image: "https://weddingshoot.in/wp-content/uploads/7Q8A9888-2.webp",
      link: "#contact"
    }
  ];

  // Dynamically update orbital radius based on window size & height
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // On shorter laptop screens (e.g. height <= 800px or width < 1440px)
      if (h <= 800 || w < 1366) {
        setRadius(270);
      } else if (w < 1536) {
        setRadius(330);
      } else {
        setRadius(380);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Smooth 90-degree step snapping on scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = targetRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isCentered = rect.top <= 140 && rect.bottom >= window.innerHeight - 140;

      if (!isCentered) return;

      const current = angleRef.current;

      // Scroll Down -> Snap to next 90-degree step (0 -> 90 -> 180 -> 270)
      if (e.deltaY > 0 && current < 270) {
        e.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;
        const next = Math.min(270, (Math.floor(current / 90) + 1) * 90);
        setRevolutionAngle(next);
        setTimeout(() => { isScrolling.current = false; }, 900);
        return;
      }

      // Scroll Up -> Snap to previous 90-degree step (270 -> 180 -> 90 -> 0)
      if (e.deltaY < 0 && current > 0 && rect.top >= -50) {
        e.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;
        const next = Math.max(0, (Math.ceil(current / 90) - 1) * 90);
        setRevolutionAngle(next);
        setTimeout(() => { isScrolling.current = false; }, 900);
        return;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const section = targetRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isCentered = rect.top <= 140 && rect.bottom >= window.innerHeight - 140;
      if (!isCentered) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      const current = angleRef.current;

      if (deltaY > 30 && current < 270) {
        e.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;
        const next = Math.min(270, (Math.floor(current / 90) + 1) * 90);
        setRevolutionAngle(next);
        touchStartY = currentY;
        setTimeout(() => { isScrolling.current = false; }, 900);
        return;
      }

      if (deltaY < -30 && current > 0 && rect.top >= -50) {
        e.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;
        const next = Math.max(0, (Math.ceil(current / 90) - 1) * 90);
        setRevolutionAngle(next);
        touchStartY = currentY;
        setTimeout(() => { isScrolling.current = false; }, 900);
        return;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Compute active index from current revolution angle
  const stepSize = 360 / services.length; // 90deg per service
  const normalizedAngle = ((revolutionAngle % 360) + 360) % 360;
  const rawIndex = Math.round(normalizedAngle / stepSize) % services.length;
  const activeIndex = (services.length - rawIndex) % services.length;
  const activeService = services[activeIndex];

  return (
    <section 
      ref={targetRef}
      className="relative bg-[#FAF8F4] min-h-screen lg:h-screen overflow-hidden select-none" 
      id="services"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orchid/12 via-transparent to-transparent pointer-events-none" />

      {/* Background Cursive Script Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-8 pointer-events-none select-none w-full text-center">
        <span className="font-script text-7xl sm:text-9xl md:text-[13rem] text-charcoal tracking-wide whitespace-nowrap block">
          What We Shoot
        </span>
      </div>

      {/* DESKTOP ORBITAL SHOWCASE STAGE (Responsively proportioned for laptops) */}
      <div className="hidden lg:flex h-screen w-full flex-col items-center justify-between pt-20 pb-6 px-6 max-w-[1400px] mx-auto z-10 relative">
        
        {/* Header Stack */}
        <div className="text-center z-20">
          <span className="text-[10px] tracking-[0.35em] text-plum uppercase font-semibold block mb-1 font-sans">
            Our Offerings
          </span>
          <h2 className="font-serif text-3xl xl:text-4xl text-obsidian tracking-tight leading-tight">
            What We Shoot
          </h2>
        </div>

        {/* Orbital Showcase Stage */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          
          {/* Orbital Circle Path Line (Responsive diameter) */}
          <div 
            style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
            className="absolute rounded-full border border-charcoal/10 pointer-events-none flex items-center justify-center transition-all duration-300"
          >
            <div className="absolute top-0 w-2.5 h-2.5 rounded-full bg-plum/50 -translate-y-1/2 shadow-xs" />
            <div className="absolute right-0 w-2.5 h-2.5 rounded-full bg-plum/50 translate-x-1/2 shadow-xs" />
            <div className="absolute bottom-0 w-2.5 h-2.5 rounded-full bg-plum/50 translate-y-1/2 shadow-xs" />
            <div className="absolute left-0 w-2.5 h-2.5 rounded-full bg-plum/50 -translate-x-1/2 shadow-xs" />
          </div>

          {/* CENTER FEATURED IMAGE (Fixed position, non-rotating) */}
          <div className="relative z-20 w-[360px] h-[240px] xl:w-[440px] xl:h-[290px] 2xl:w-[480px] 2xl:h-[320px] rounded-[24px] xl:rounded-[28px] overflow-hidden shadow-2xl border border-white/70 bg-obsidian group transition-all duration-300">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-cover object-center"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                
                {/* Active Service Label on Image */}
                <div className="absolute bottom-4 left-5 right-5 xl:bottom-5 xl:left-6 xl:right-6 flex items-end justify-between text-white z-10">
                  <div>
                    <span className="text-[9px] tracking-[0.25em] text-orchid uppercase font-semibold block mb-0.5 font-sans">
                      Active Feature
                    </span>
                    <h3 className="font-serif text-lg xl:text-xl 2xl:text-2xl text-white">
                      {activeService.title}
                    </h3>
                  </div>
                  <span className="text-xs font-sans text-white/80 font-light italic">
                    0{activeIndex + 1} / 0{services.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ROTATING ORBIT CONTAINER */}
          <motion.div 
            animate={{ rotate: revolutionAngle }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
            className="absolute z-30 pointer-events-none transition-all duration-300"
          >
            {services.map((srv, index) => {
              const baseAngle = (index * 90) - 90; 
              const rad = (baseAngle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              const isActive = index === activeIndex;

              return (
                <div
                  key={srv.id}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="pointer-events-auto"
                >
                  {/* COUNTER-ROTATE CARD TO KEEP TYPOGRAPHY PERFECTLY HORIZONTAL */}
                  <motion.div
                    animate={{ 
                      rotate: -revolutionAngle,
                      scale: isActive ? 1.04 : 0.85,
                      opacity: isActive ? 1 : 0.55
                    }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setRevolutionAngle((4 - index) % 4 * 90)}
                    className={`w-[210px] xl:w-[240px] 2xl:w-[260px] p-3.5 xl:p-4 rounded-[18px] xl:rounded-[22px] transition-all duration-500 cursor-pointer backdrop-blur-xl ${
                      isActive 
                        ? 'bg-white/95 border-2 border-plum/40 shadow-[0_20px_45px_rgba(139,51,127,0.2)]' 
                        : 'bg-white/75 border border-white/60 shadow-md hover:bg-white/90 hover:opacity-90'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[9px] font-sans font-bold tracking-[0.2em] uppercase ${isActive ? 'text-plum' : 'text-charcoal/40'}`}>
                        {isActive ? '● Active Offering' : `Service 0${index + 1}`}
                      </span>
                      {isActive && <Sparkles size={13} className="text-orchid" />}
                    </div>

                    <h3 className={`font-serif text-sm xl:text-base 2xl:text-lg leading-snug mb-1 transition-colors ${isActive ? 'text-obsidian font-semibold' : 'text-charcoal/80'}`}>
                      {srv.title}
                    </h3>

                    <p className="text-[10px] text-charcoal/65 font-sans font-light leading-relaxed mb-2 line-clamp-2">
                      {srv.tagline}
                    </p>

                    <a
                      href={srv.link}
                      className={`inline-flex items-center gap-1 text-[9px] tracking-[0.18em] font-sans uppercase font-bold transition-colors ${
                        isActive ? 'text-plum' : 'text-charcoal/60 hover:text-obsidian'
                      }`}
                    >
                      <span>View Work</span>
                      <ArrowRight size={11} className={`transform transition-transform duration-300 ${isActive ? 'translate-x-1' : ''}`} />
                    </a>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Orbit Step Indicator Bar */}
        <div className="flex items-center gap-2 mb-2 z-20">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setRevolutionAngle((4 - idx) % 4 * 90)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex ? 'w-8 bg-plum' : 'w-2 bg-charcoal/20 hover:bg-charcoal/40'
              }`}
              aria-label={`Go to service ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* MOBILE & TABLET FALLBACK (< lg) */}
      <div className="lg:hidden py-8 px-6 max-w-xl mx-auto z-10 relative">
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.35em] text-plum uppercase font-semibold block mb-2 font-sans">
            Our Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-obsidian tracking-tight leading-tight">
            What We Shoot
          </h2>
        </div>

        {/* Service Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {services.map((srv, index) => (
            <button
              key={srv.id}
              onClick={() => {
                setRevolutionAngle((4 - index) % 4 * 90);
              }}
              className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-sans font-bold whitespace-nowrap transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-obsidian text-white shadow-md'
                  : 'bg-white/80 text-charcoal/70 border border-warm-gray/30'
              }`}
            >
              {srv.title}
            </button>
          ))}
        </div>

        {/* Featured Image Card */}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl mb-6 bg-obsidian">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeService.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={activeService.image}
              alt={activeService.title}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="text-[9px] tracking-[0.25em] text-orchid uppercase font-semibold font-sans block mb-1">
              {activeService.tagline}
            </span>
            <h3 className="font-serif text-2xl text-white">
              {activeService.title}
            </h3>
          </div>
        </div>

        {/* Active Card Info */}
        <div className="bg-white p-6 rounded-2xl border border-warm-gray/20 shadow-md">
          <p className="text-xs text-charcoal/70 font-sans font-light leading-relaxed mb-4">
            {activeService.desc}
          </p>
          <a
            href={activeService.link}
            className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase font-bold text-plum hover:text-obsidian transition-colors"
          >
            <span>Explore {activeService.title}</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
