import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function FeaturedStories() {
  const stories = [
    {
      id: 1,
      title: "Arthur & Linda",
      theme: "Classic Wedding",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      image: "https://weddingshoot.in/wp-content/uploads/2021/06/IMG_2484-1024x683.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      id: 2,
      title: "Robbie & Magie",
      theme: "Casual Wedding",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/0E1A9633-1024x683.webp",
      aspect: "aspect-[3/2]"
    },
    {
      id: 3,
      title: "Michael & Gina",
      theme: "Casual Wedding",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/7Q8A1025.webp",
      aspect: "aspect-[2/3]",
      textTop: true
    },
    {
      id: 4,
      title: "Thomas & Grace",
      theme: "Classic Wedding",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      image: "https://weddingshoot.in/wp-content/uploads/2022/02/IMG_5122-1024x683.webp",
      aspect: "aspect-[2/3]"
    },
    {
      id: 5,
      title: "Freddie & Aida",
      theme: "Nature Wedding",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      image: "https://weddingshoot.in/wp-content/uploads/7Q8A1251-2.webp",
      aspect: "aspect-[3/2]",
      textTop: true
    },
    {
      id: 6,
      title: "John & Esme",
      theme: "Casual Wedding",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
      image: "https://weddingshoot.in/wp-content/uploads/7Q8A9888-2.webp",
      aspect: "aspect-[3/2]",
      textTop: true
    }
  ];

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24 relative">
          
          {/* Left Column: Sticky Text */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 h-fit">
            <div className="absolute -top-12 -left-4 text-7xl md:text-9xl font-cursive text-warm-gray/30 opacity-50 pointer-events-none select-none z-0 whitespace-nowrap">
              About Us
            </div>
            
            <div className="relative z-10 mb-8">
              <span className="block tracking-widest text-xs font-sans text-plum mb-4 uppercase font-semibold">
                THE STUDIO LEGACY
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-obsidian leading-tight tracking-tight">
                Aman Digital Photography<br/>
                <span className="text-3xl md:text-4xl text-orchid tracking-normal">Your Moments, Our Masterpiece</span>
              </h2>
            </div>
            
            <p className="text-charcoal font-sans text-base leading-relaxed mb-6 max-w-lg relative z-10">
              Since 2010, we’ve been at the forefront of <a href="#" className="text-plum relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-plum hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Wedding Photography in India</a>, capturing timeless moments and beautiful memories. Our services aren’t just limited to weddings; we also cover pre-wedding shoots and various events. We are recognized for our ability to capture the true feelings and highlights of your special days. Let us document your moments with skill and dedication, ensuring that each photo tells a story you’ll want to revisit again and again.
            </p>
            <p className="text-charcoal font-sans text-base leading-relaxed mb-10 max-w-lg relative z-10">
              At Wedding Shoot, we prioritize <a href="#" className="text-plum relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-0 after:left-0 after:bg-plum hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">transparency in both our packages</a> and client relations. From the very first interaction, we provide a clear breakdown of costs, ensuring you know exactly what you’re getting for your investment. Our commitment is to build lasting relationships, not just transactions.
            </p>
            
            <div className="flex flex-col gap-8 mb-12">
              <div className="flex-1">
                <h4 className="font-serif text-lg text-charcoal mb-2">Best Wedding Photography</h4>
                <p className="text-charcoal/50 text-sm font-light leading-relaxed">Wedding Shoot is a dedicated team specialized in Wedding Photography, following their passion and skills in a professional way. Our team is capable in capturing the best memories for you, and making it memorable. Making us vastly popular as one of the Best Photographers in Gurgaon. Most of our clients come through reference of our previous clients.</p>
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-lg text-charcoal mb-2">Best Pre-wedding Shoot</h4>
                <p className="text-charcoal/50 text-sm font-light leading-relaxed">Pre Wedding Photography is a developing trend where engaged couples choose the Best Photographers for Pre Wedding Shoot. Pre Wedding Shoot is done in locations as per our clients choice. Moreover, We use Upgraded and New Concepts for Shoot. We provide 100% transparency and we are known as Best Pre Wedding Photographers.</p>
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-lg text-charcoal mb-2">Candid Photography</h4>
                <p className="text-charcoal/50 text-sm font-light leading-relaxed">We are experienced team of Candid Photographers and love to capture beautiful moments. Candid Photography is taken without a pose it’s all about natural movements. We always work hard to fulfill your dreams in your own style. We mainly focus on the quality of the services we deliver and they are surely value for money.</p>
              </div>
            </div>

            {/* Minimal gold link button */}
            <a href="#contact" className="inline-flex items-center text-xs uppercase tracking-[0.2em] text-[#D4AF37] hover:text-charcoal transition-colors duration-300 relative z-10 pb-2 border-b border-[#D4AF37] hover:border-charcoal group">
              Begin Your Story <ArrowRight className="w-4 h-4 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>

          {/* Right Column: Photo Stack */}
          <div className="w-full lg:w-7/12 flex flex-col gap-24 md:gap-40 pt-10 lg:pt-0">
            {stories.map((story, index) => {
              // Alternate vertical and horizontal for editorial look
              const isVertical = index % 2 === 0;
              const wrapperClass = isVertical 
                ? "w-full md:w-[75%] ml-auto aspect-[3/4]" 
                : "w-full md:w-[90%] mr-auto aspect-[16/9]";

              return (
                <motion.div 
                  key={story.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="group relative"
                >
                  <div className={`overflow-hidden relative shadow-sm ${wrapperClass}`}>
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
