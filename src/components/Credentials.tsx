import { motion } from 'framer-motion';

export function Credentials() {
  const logos = [
    { name: "WedMeGood", icon: "Ring" }, // Using text as placeholders for SVG logos
    { name: "WeddingWire", icon: "Heart" },
    { name: "ShaadiDukaan", icon: "Camera" },
    { name: "Justdial Premium", icon: "Star" },
  ];

  return (
    <section className="bg-white py-10 border-y border-warm-gray/30">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.2em] text-charcoal/40 font-semibold mb-10"
        >
          Trusted and Featured Across Elite Wedding Networks
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale">
          {logos.map((logo, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-charcoal/10 flex items-center justify-center">
                {/* Placeholder for actual SVG icons */}
                <div className="w-4 h-4 bg-charcoal/40 rounded-sm"></div>
              </div>
              <span className="font-serif text-xl font-medium text-charcoal">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
