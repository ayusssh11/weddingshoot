import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="bg-alabaster py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-12 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full p-[1px] rounded-sm bg-gradient-to-r from-[#8B337F]/20 to-[#E668B3]/10 shadow-sm"
        >
          <div className="w-full bg-white/80 backdrop-blur-sm border border-white/50 p-12 md:p-24 relative rounded-sm">
          {/* Subtle Quote Icon Anchors */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex justify-center items-center">
             <Quote className="w-10 h-10 text-orchid/30 rotate-180" />
          </div>

          <div className="text-center mt-8">
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-obsidian leading-relaxed mb-10 italic font-light">
              "They didn't just take photos; they bottled up the exact energy, rhythm, and emotion of our wedding night. Looking through our heirloom gallery feels like completely reliving the day all over again. They caught the small moments we didn't even realize were happening."
            </h3>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-[1px] bg-plum/30 mb-6"></div>
              <p className="font-sans text-sm tracking-widest uppercase text-charcoal/80 font-medium">
                Aashna & Rohan
              </p>
              <p className="font-serif text-sm text-charcoal/50 mt-1 italic">
                Delhi NCR
              </p>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
