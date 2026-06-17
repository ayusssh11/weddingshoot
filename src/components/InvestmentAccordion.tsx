import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function InvestmentAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    {
      title: "01 / Bespoke Wedding Commissions",
      content: "Full-day candid coverage, fine-art portraiture setups, dual-cinematographers, and custom physical legacy art books."
    },
    {
      title: "02 / Editorial Pre-Wedding Narratives",
      content: "Conceptual location scouting, wardrobe strategy consulting, and high-contrast cinema teaser editing."
    },
    {
      title: "03 / Multi-Day Destination Celebrations",
      content: "Comprehensive global travel-ready coverage mapped across rituals, sangeet showcases, and formal receptions."
    }
  ];

  return (
    <section className="bg-ivory py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center">
          
          {/* Left Column: Image/Quote */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-square md:aspect-[4/5] relative rounded-sm overflow-hidden shadow-lg p-[1px] bg-gradient-to-br from-plum/20 to-orchid/10">
               <div className="absolute inset-[1px] bg-white rounded-sm overflow-hidden">
                 <img 
                   src="https://weddingshoot.in/wp-content/uploads/N3A0314.webp" 
                   alt="Editorial Investment" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-obsidian/10 mix-blend-overlay"></div>
                 {/* Ivory Vignette blending seamlessly into backdrop */}
                 <div className="absolute inset-0 shadow-[inset_0_0_80px_#FDFBF7,inset_0_0_120px_#FDFBF7,inset_0_0_180px_#FDFBF7] mix-blend-normal"></div>
                 {/* Subtle bottom gradient to ensure quote readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-80"></div>
                 {/* Quote Overlay */}
                 <div className="absolute bottom-10 left-10 right-10">
                   <p className="font-serif text-white text-xl md:text-2xl italic font-light drop-shadow-md">
                     "Investing in your legacy is the only wedding detail that appreciates in value."
                   </p>
                 </div>
               </div>
            </div>
          </motion.div>
          
          {/* Right Column: Accordion */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col justify-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-obsidian mb-12">
              Transparent Investment Insights
            </h2>
            
            <div className="flex flex-col">
              {items.map((item, index) => (
                <div key={index} className={`border-b transition-colors duration-500 ${openIndex === index ? 'border-[#E668B3]' : 'border-warm-gray/30'} last:border-0 overflow-hidden`}>
                  <button 
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className={`font-sans text-sm md:text-base tracking-wide transition-colors duration-300 ${openIndex === index ? 'text-orchid font-medium' : 'text-charcoal/80 group-hover:text-charcoal'}`}>
                      {item.title}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-700 ease-out ${openIndex === index ? 'text-orchid rotate-180' : 'text-charcoal/30 group-hover:text-charcoal/50'}`} />
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="pb-6 pr-8 text-charcoal/60 font-light text-sm leading-relaxed">
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
