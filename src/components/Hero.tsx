import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

interface HeroProps {
  onOpenEstimator: () => void;
}

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const VimeoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.4 7.16c-.09 2.02-1.5 4.8-4.24 8.33-2.83 3.66-5.22 5.48-7.18 5.48-1.21 0-2.23-.44-3.06-1.33C7.1 18.75 6.2 16.7 5.23 13.5c-.66-2.28-1.37-3.42-2.13-3.42-.16 0-.74.34-1.72 1.02L0 9.68c1.1-1.02 2.38-2.18 3.82-3.47 1.96-1.7 3.39-2.6 4.3-2.7 2.14-.24 3.46 1.25 3.96 4.47.54 3.47 1.1 5.61 1.68 6.42.58.8 1.25 1.2 2.01 1.2 1.05 0 2.27-1.12 3.66-3.36 1.4-2.24 2.13-3.9 2.19-4.98.13-1.87-.8-2.8-2.79-2.8-.93 0-1.9.22-2.91.66 1.9-6.24 5.52-9.19 10.86-8.86 3.95.24 5.76 2.38 5.42 6.42z"/>
  </svg>
);

export function Hero({ onOpenEstimator }: HeroProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'http://bit.ly/amandigitalphotography',
      icon: <FacebookIcon />
    },
    {
      name: 'Instagram',
      href: 'http://bit.ly/weddingshoot1',
      icon: <InstagramIcon />
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UC9IWnICeJGHk0gvQgQ4PXWQ',
      icon: <YoutubeIcon />
    },
    {
      name: 'Vimeo',
      href: 'https://vimeo.com',
      icon: <VimeoIcon />
    }
  ];

  const handleViewPortfolio = () => {
    const element = document.getElementById('real-weddings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* HERO BANNER SECTION */}
      <section 
        ref={containerRef}
        className="relative h-screen w-full flex items-center justify-center bg-obsidian select-none z-10"
      >
        {/* Parallax Background Container (clipped) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            style={{ y: bgY, scale: bgScale }}
            className="h-full w-full"
          >
            <img 
              src="/images/Hero-section.webp" 
              alt="Wedding Story Floral Arch" 
              className="w-full h-full object-cover object-[center_35%] md:object-[center_30%] brightness-95 opacity-90"
            />
            {/* Subtle Scrim Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/55" />
          </motion.div>
        </div>

        {/* Center Content Stack */}
        <div className="relative z-20 text-center px-6 md:px-12 max-w-4xl mx-auto flex flex-col items-center justify-center -mt-8 sm:-mt-12">
          
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <h1 className="text-white font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] drop-shadow-lg font-light">
              Make A Wonderful Story
              <span className="block font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-2 sm:mt-4 font-normal text-white/95">
                For Your Wedding
              </span>
            </h1>
          </motion.div>

          {/* VIEW PORTFOLIO Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={handleViewPortfolio}
              className="px-9 py-3.5 border border-white/70 bg-black/10 backdrop-blur-xs text-white text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-medium hover:bg-white hover:text-obsidian hover:border-white transition-all duration-500 shadow-lg cursor-pointer"
            >
              View Portfolio
            </button>
            <button 
              onClick={onOpenEstimator}
              className="px-9 py-3.5 bg-white text-obsidian text-[11px] sm:text-xs tracking-[0.25em] uppercase font-sans font-semibold hover:bg-orchid hover:text-white transition-all duration-500 shadow-lg cursor-pointer hidden md:inline-block"
            >
              Check Availability
            </button>
          </motion.div>
        </div>

        {/* Bottom-Left Social Media Icons */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-8 left-6 md:left-12 z-30 flex items-center gap-3"
        >
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/40 bg-black/25 backdrop-blur-xs text-white flex items-center justify-center hover:bg-white hover:text-obsidian hover:border-white transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span className="transform group-hover:scale-110 transition-transform duration-300">
                {social.icon}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Bottom-Right Overlapping Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setIsVideoModalOpen(true)}
          className="absolute bottom-0 right-6 md:right-12 translate-y-1/2 z-30 flex items-stretch bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)] rounded-lg overflow-hidden border border-black/5 hover:shadow-[0_30px_70px_rgba(0,0,0,0.28)] hover:-translate-y-[calc(-50%+4px)] transition-all duration-300 group max-w-[340px] sm:max-w-md cursor-pointer"
        >
          {/* Thumbnail Image with Play Button */}
          <div className="relative w-32 sm:w-44 h-24 sm:h-28 flex-shrink-0 overflow-hidden bg-obsidian">
            <img 
              src="https://weddingshoot.in/wp-content/uploads/2022/02/7Q8A1025.webp" 
              alt="Shama & Sourya Wedding Film" 
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
            
            {/* Centered Play Icon with pulse ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-2 rounded-full bg-white/30 animate-ping opacity-40 group-hover:opacity-75" />
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-obsidian flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-plum group-hover:text-white transition-all duration-300">
                  <Play size={18} className="fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Card Details */}
          <div className="bg-white p-4 sm:p-5 flex-1 flex flex-col justify-center border-l border-warm-gray/15">
            <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-plum uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orchid animate-pulse" />
              Watch Reel
            </span>
            <h3 className="font-serif text-sm sm:text-base font-semibold text-obsidian leading-snug group-hover:text-plum transition-colors">
              Shama &amp; Sourya getting hitched
            </h3>
            <p className="text-[11px] sm:text-xs text-charcoal/60 mt-1 font-light font-sans tracking-wide">
              @Koh Samui Thailand
            </p>
          </div>
        </motion.div>
      </section>

      {/* ABOUT US / WELCOME SECTION BELOW HERO (Matches Image 2) */}
      <section className="bg-[#FAF8F5] pt-24 sm:pt-32 pb-16 sm:pb-24 px-6 md:px-12 text-center relative overflow-hidden border-b border-warm-gray/20">
        {/* Floating background cursive text overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none w-full">
          <span className="font-script text-7xl sm:text-9xl md:text-[11rem] text-charcoal tracking-wide whitespace-nowrap block">
            About Us
          </span>
        </div>

        {/* Foreground Content Stack */}
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-obsidian tracking-tight mb-6"
          >
            Welcome To WeddingShoot
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-charcoal/75 text-xs sm:text-sm md:text-base font-sans font-light leading-relaxed max-w-2xl mx-auto"
          >
            Building WeddingShoot has been an incredible adventure. Each year filled with passion, creativity, and unwavering dedication. We&apos;re grateful for every milestone, every challenge, and every success along the way. Here&apos;s to continuing our legacy of excellence and innovation, making memories together for many years to come.
          </motion.p>
        </div>
      </section>

      {/* VIDEO FILM REEL MODAL */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                aria-label="Close Video"
              >
                <X size={20} />
              </button>

              {/* Video Player Embed */}
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/9wQ1_kYn2W8?autoplay=1"
                  title="Shama & Sourya Wedding Film"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
