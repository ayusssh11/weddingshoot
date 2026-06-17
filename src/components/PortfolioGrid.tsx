import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function PortfolioGrid() {
  const portfolios = [
    {
      id: 1,
      title: "Wedding Photography & Cinematic Films",
      desc: "Following our passion and skills in a professional way. Capturing the best memories for you, making us vastly popular in Gurgaon.",
      image: "https://weddingshoot.in/wp-content/uploads/7Q8A2114-1.webp",
      action: "Explore Weddings",
      className: "md:col-span-2 md:row-span-2 h-[400px] md:h-[600px]" // Double Width/Featured
    },
    {
      id: 2,
      title: "Pre-Wedding Narratives",
      desc: "Done in locations as per our clients choice using upgraded and new concepts for shoot with 100% transparency.",
      image: "https://weddingshoot.in/wp-content/uploads/IMG_1046-1.webp",
      action: "Explore Pre-Weddings",
      className: "md:col-span-1 md:row-span-2 h-[400px] md:h-[600px] md:mt-12" // Vertical Aspect, offset
    },
    {
      id: 3,
      title: "Milestones & Birthday Events",
      desc: "We also cover personal events like Marriage Ceremony, Birthday Celebration, Engagement Ceremony and Maternity Shoot.",
      image: "https://weddingshoot.in/wp-content/uploads/IMG_1992-1.webp",
      action: "Explore Milestones",
      className: "md:col-span-1 h-[300px]" // Standard Landscape
    },
    {
      id: 4,
      title: "Cinematography",
      desc: "Creating Best Cinematic Films capturing moments of art and story from your Event, utilizing the latest gears.",
      image: "https://weddingshoot.in/wp-content/uploads/IMG_2494-2.webp",
      action: "Explore Cinematography",
      className: "md:col-span-2 h-[300px] md:mt-12" // Square/Wide, offset
    }
  ];

  return (
    <section id="portfolio" className="bg-alabaster py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-obsidian mb-4"
          >
            The Master Portfolios
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-charcoal/70 text-lg font-light"
          >
            Explore our distinct visual styles across signature celebrations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
          {portfolios.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-sm cursor-pointer shadow-sm hover:shadow-xl transition-all duration-700 ${item.className}`}
            >
              {/* Image Container with slow scale on hover */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              </div>
              
              {/* Subtle overall dark gradient for text readability always present */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#120D16]/90 via-[#120D16]/20 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-90"></div>

              {/* Content Box */}
              <div className="absolute bottom-0 left-0 w-full z-10 flex flex-col justify-end">
                <div className="relative p-6 md:p-8 backdrop-blur-xl bg-black/30 text-white transform transition-transform duration-700 ease-out translate-y-[25px] group-hover:translate-y-0">
                  <h3 className="font-serif text-2xl md:text-3xl mb-1 drop-shadow-md">
                    {item.title}
                  </h3>
                  
                  <div className="overflow-hidden transition-all duration-700 ease-out max-h-0 group-hover:max-h-48 opacity-0 group-hover:opacity-100">
                    <p className="text-[#D4AF37] text-[10px] md:text-xs font-sans uppercase tracking-[0.3em] mt-1 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 font-medium">
                      {index % 2 === 0 ? 'Destination • Royal' : 'Gurugram • Cinematic'}
                    </p>
                    <p className="text-white/90 text-sm md:text-base font-light mb-6">
                      {item.desc}
                    </p>
                    
                    <div className="flex items-center text-orchid font-semibold tracking-widest uppercase text-xs">
                      <span className="mr-2">{item.action}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 delay-100" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
