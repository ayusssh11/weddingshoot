import { motion } from 'framer-motion';

export function ExperienceTimeline() {
  const steps = [
    {
      number: "01",
      title: "CREATIVE ALIGNMENT",
      desc: "Before the shutter clicks, we design your unique visual roadmap—aligning on lighting structures, destination coordination, and mood profiles tailored to your personality.",
      marginTop: "mt-0"
    },
    {
      number: "02",
      title: "THE CELEBRATION FLOW",
      desc: "On-site, we operate with high emotional intelligence and silent precision. Catching micro-expressions, unprompted laughter, and raw joy without disrupting your natural rhythm.",
      marginTop: "md:mt-24"
    },
    {
      number: "03",
      title: "ARTISAN POST-PRODUCTION",
      desc: "Every raw file undergoes hand-selected color balancing and film-grade cinematic grading, delivering custom heirlooms that stand the test of time.",
      marginTop: "md:mt-48"
    }
  ];

  return (
    <section className="bg-ivory py-12 md:py-20 relative border-t border-warm-gray/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-obsidian mb-20"
        >
          The Studio Experience
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          {/* Subtle background connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-warm-gray to-transparent z-0"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative z-10 flex flex-col ${step.marginTop}`}
            >
              <div className="relative flex flex-col border-l border-orchid/20 pl-8 py-6 group hover:border-orchid transition-colors duration-500 overflow-visible min-h-[200px]">
                {/* Background Number */}
                <div className="absolute -top-10 left-0 text-[140px] md:text-[180px] font-serif font-light tracking-widest text-obsidian opacity-5 group-hover:opacity-10 transition-opacity duration-700 select-none z-0 leading-none">
                  {step.number}
                </div>
                
                {/* Content */}
                <div className="relative z-10 pt-12 md:pt-16">
                  <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-charcoal font-semibold mb-4">
                    {step.title}
                  </h4>
                  <p className="font-light text-charcoal/70 text-sm leading-relaxed md:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
