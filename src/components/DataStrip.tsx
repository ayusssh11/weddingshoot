import { motion } from 'framer-motion';

export function DataStrip() {
  const metrics = [
    { title: "200+", subtext: "Couples Happily Married" },
    { title: "15+ Years", subtext: "Of Creative Excellence" },
    { title: "100%", subtext: "Price Transparency" },
    { title: "Pan-India", subtext: "Available Wherever Love Takes Us" }
  ];

  return (
    <section className="bg-ivory py-10 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Micro-Glassmorphism Border Wrapper */}
        <div className="p-[1px] rounded-sm bg-gradient-to-r from-[#8B337F]/20 to-[#E668B3]/10 shadow-sm">
          <div className="bg-white/60 backdrop-blur-sm py-12 rounded-sm border border-white/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
              {metrics.map((metric, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col items-center text-center ${
                    index !== metrics.length - 1 ? 'md:border-r md:border-plum/10' : ''
                  } px-4`}
                >
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-2 font-medium">
                    {metric.title}
                  </h3>
                  <p className="text-charcoal/60 text-xs md:text-sm tracking-wider uppercase font-sans max-w-[180px]">
                    {metric.subtext}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
