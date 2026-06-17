import { motion } from 'framer-motion';

export function Philosophy() {
  return (
    <section className="bg-ivory py-12 md:py-20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Left Side: Cinematic Portrait */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl relative">
              <img 
                src="https://weddingshoot.in/wp-content/uploads/2023/08/IMG_9506-682x1024.webp" 
                alt="Editorial Portrait" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-obsidian/10"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-plum/30 rounded-full z-[-1]"></div>
          </motion.div>
          
          {/* Right Side: Text Stack */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            <span className="text-champagne uppercase tracking-[0.2em] text-xs font-semibold mb-4">
              The Philosophy
            </span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-obsidian mb-8 leading-[1.1]">
              Unobtrusive.<br /> Unscripted.<br /> Unforgettable.
            </h2>
            
            <p className="text-charcoal/80 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg">
              We believe the most beautiful parts of your wedding aren't the ones that are rehearsed. It's the split-second glances, the unprompted laughter, the micro-expressions of raw joy, and the quiet comfort shared away from the crowd.
            </p>
            
            <p className="text-charcoal/80 text-lg md:text-xl font-light leading-relaxed max-w-lg">
              Our approach purposefully blends editorial fine-art imagery with honest, raw photojournalism. We work quietly alongside your planners to document the authentic flow of your day, ensuring your family legacy is preserved exactly as it felt—without forced poses or false setups.
            </p>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
