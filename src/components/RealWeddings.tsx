import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function RealWeddings() {
  const weddings = [
    {
      id: 1,
      names: "Shama & Sourya",
      category: "Casual Wedding",
      location: "Location: Avani Koh Samui Resort, Thailand",
      desc: "Surrounded by close loved ones, Shama and Sourya's intimate wedding in Koh Samui unfolded on a pristine beach, with turquoise waters and golden sands creating an enchanting backdrop to their special day.",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/0E1A9633-1024x683.webp",
      aspect: "aspect-[4/3]"
    },
    {
      id: 2,
      names: "Pooja & Viral",
      category: "Casual Wedding",
      location: "Location: The Leela Palace, Bengaluru",
      desc: "Pooja and Viral's wedding radiates pure magic, truly they redefine what it means to be a picture-perfect couple.",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/7Q8A1025.webp",
      aspect: "aspect-[4/3]"
    },
    {
      id: 3,
      names: "Parish & Adnan",
      category: "Casual Wedding",
      location: "Location: Mussoorie",
      desc: "Parish and Adnan's wedding in the majestic mountains was a breathtaking blend of nature's beauty and love.",
      image: "https://weddingshoot.in/wp-content/uploads/7Q8A9888-2.webp",
      aspect: "aspect-[4/3]"
    },
    {
      id: 4,
      names: "Shivangi & Jiten",
      category: "Classic Wedding",
      location: "Location: Fateh Vilas, Udaipur",
      desc: "Jiten Shivangi's royal palace wedding in Udaipur Fateh Vilas was a fairytale come to life, blending grandeur with romance.",
      image: "https://weddingshoot.in/wp-content/uploads/2021/06/IMG_2484-1024x683.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      id: 5,
      names: "Deepika & Mohit",
      category: "Casual Wedding",
      location: "Location: Hyderabad",
      desc: "Rituals, lots of giggles, and pure love – Deepika and Mohit's South Indian wedding was a perfect blend of tradition and joy.",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/IMG_5122-1024x683.webp",
      aspect: "aspect-[3/4]"
    },
    {
      id: 6,
      names: "Eva & Ojasvi",
      category: "Nature Wedding",
      location: "Location: The Taj Convention, Agra",
      desc: "Eva Ojasvi's wedding at The Taj, Agra was a fairytale come true, with the majestic monument standing as the perfect backdrop.",
      image: "https://weddingshoot.in/wp-content/uploads/7Q8A1251-2.webp",
      aspect: "aspect-[4/3]"
    },
    {
      id: 7,
      names: "Pooja & Hardik",
      category: "Casual Wedding",
      location: "Location: The Lalit Mangar, Faridabad",
      desc: "Hardik and Pooja's wedding was a magical affair, radiating love and romance at every moment.",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/0E1A9633-1024x683.webp",
      aspect: "aspect-[3/4]"
    },
    {
      id: 8,
      names: "Prerit & Lavisha",
      category: "Pre-wedding",
      location: "Location: Delhi",
      desc: "Prerit & Lavisha prewedding was a combination of soft hues & romantic atmosphere.",
      image: "https://weddingshoot.in/wp-content/uploads/IMG_1046-1.webp",
      aspect: "aspect-[4/3]"
    }
  ];

  const handleExploreMore = () => {
    const element = document.getElementById('estimator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-10 md:py-28 px-6 md:px-12 overflow-hidden" id="real-weddings">
      <div className="max-w-7xl mx-auto">
        {/* Header Stack */}
        <div className="relative text-center overflow-hidden mb-10 pb-6 md:mb-16 md:pb-10 border-b border-warm-gray/20">
          {/* Floating background cursive text overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none w-full">
            <span className="font-script text-7xl sm:text-9xl md:text-[11rem] text-charcoal tracking-wide whitespace-nowrap block">
              Portfolios
            </span>
          </div>
          
          {/* Foreground Content Stack */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-[10px] tracking-[0.35em] text-plum uppercase font-semibold block mb-3 font-sans">
              Our Portfolios
            </span>
            <div className="overflow-hidden py-1">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-obsidian tracking-tight leading-tight"
              >
                Real Weddings
              </motion.h2>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-charcoal/70 text-sm md:text-base mt-3 font-sans font-light"
            >
              Every couple gets their own story — never a template.
            </motion.p>
          </div>
        </div>

        {/* 8 Images Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 items-start">
          {weddings.map((w, index) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: (index % 4) * 0.12 }}
              className="group flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className={`relative w-full ${w.aspect} overflow-hidden rounded-xs shadow-sm group-hover:shadow-xl transition-all duration-700 bg-warm-gray/10`}>
                <img
                  src={w.image}
                  alt={w.names}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Text Details Stack */}
              <div className="relative text-center pt-6 pb-4 px-2 flex flex-col items-center">
                {/* Background Cursive Script Overlay */}
                <span className="font-script text-3xl sm:text-4xl md:text-5xl text-charcoal/10 absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap">
                  {w.category}
                </span>

                {/* Couple Names */}
                <h3 className="font-serif text-xl md:text-2xl text-obsidian leading-snug relative z-10 mb-1.5 group-hover:text-plum transition-colors">
                  {w.names}
                </h3>

                {/* Location Tag */}
                <p className="text-[11px] text-charcoal/70 font-sans tracking-wide mb-2 font-medium">
                  {w.location}
                </p>

                {/* Short Narrative */}
                <p className="text-xs text-charcoal/65 font-sans font-light leading-relaxed mb-4 max-w-xs">
                  {w.desc}
                </p>

                {/* View Details Link */}
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-bold text-obsidian group-hover:text-plum transition-colors mt-auto"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Button: Explore More */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20 flex justify-center"
        >
          <button
            onClick={handleExploreMore}
            className="px-10 py-4 bg-obsidian text-white text-xs tracking-[0.25em] uppercase font-sans font-bold rounded-full hover:bg-plum transition-all duration-500 shadow-xl hover:shadow-2xl cursor-pointer flex items-center gap-3 group"
          >
            <span>Explore More</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
