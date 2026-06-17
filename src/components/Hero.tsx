import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image / Video Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://weddingshoot.in/wp-content/uploads/0E1A6298.webp" 
          alt="Cinematic Wedding" 
          className="w-full h-full object-cover"
        />
        {/* Dark Charcoal Tint Overlay */}
        <div className="absolute inset-0 bg-charcoal/60 mix-blend-multiply"></div>
        {/* Subtle Gradient Overlay for extra mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center mt-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-orchid text-white px-5 py-2 rounded-full uppercase tracking-[0.25em] text-[10px] md:text-xs font-semibold mb-6 inline-block border border-white/10 shadow-lg"
        >
          Crafting Homecoming Memories Since 2010
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-alabaster font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-12 drop-shadow-lg"
        >
          Real Moments. Artfully Captured,<br className="hidden md:block" /> Endlessly Cherished.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-ivory/90 text-base md:text-lg lg:text-xl font-light max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Premium wedding photography and cinematic films for couples who value raw emotion, timeless elegance, and effortless, unscripted storytelling.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary Solid Button with Gradient */}
          <a 
            href="#contact" 
            className="group relative overflow-hidden bg-gradient-to-r from-plum to-orchid text-white px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-500 hover:shadow-[0_0_30px_rgba(230,104,179,0.4)]"
          >
            <span className="relative z-10">Secure Your Date</span>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-charcoal/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
          </a>
          
          {/* Secondary Ghost Button */}
          <a 
            href="#portfolio" 
            className="group border border-orchid/50 text-white px-8 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-500 hover:bg-white/5 hover:border-orchid backdrop-blur-sm"
          >
            View Our Films
          </a>
        </motion.div>
      </div>
    </section>
  );
}
