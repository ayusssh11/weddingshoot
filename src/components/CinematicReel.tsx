import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export function CinematicReel() {
  return (
    <section className="bg-alabaster py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center mb-16">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-sans uppercase tracking-[0.3em] text-charcoal/60 font-medium mb-4"
        >
          Exceptional Wedding Teasers & Cinematic Films
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-obsidian"
        >
          Stories in Motion
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-video w-full max-w-6xl mx-auto rounded-2xl overflow-hidden group cursor-pointer shadow-[0_0_40px_rgba(139,51,127,0.1)] hover:shadow-[0_0_60px_rgba(139,51,127,0.3)] transition-shadow duration-700"
        >
          {/* Thumbnail */}
          <img 
            src="https://weddingshoot.in/wp-content/uploads/New-Project.webp" 
            alt="Cinematic Reel Thumbnail" 
            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          />
          
          {/* Overlay Tint */}
          <div className="absolute inset-0 bg-obsidian/30 group-hover:bg-obsidian/20 transition-colors duration-500"></div>
          
          {/* Play Controller */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Multi-layered Frosted Glass Controller */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center group/btn">
              {/* Pulse Ring Loop */}
              <div className="absolute inset-0 rounded-full border border-orchid/50 animate-ping opacity-75"></div>
              <div className="absolute inset-0 rounded-full border border-plum/30 animate-ping opacity-50" style={{ animationDelay: '500ms' }}></div>
              
              {/* Radial Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-plum to-orchid rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
              
              {/* Frosted Glass Button */}
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-2xl flex flex-col items-center justify-center border border-white/20 z-10 transition-transform duration-700 ease-out group-hover:scale-110 shadow-xl">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-2 mb-1 drop-shadow-lg" fill="currentColor" />
                <span className="text-white text-[10px] md:text-xs uppercase tracking-widest font-sans font-semibold mt-1 drop-shadow-md">Play Film</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
