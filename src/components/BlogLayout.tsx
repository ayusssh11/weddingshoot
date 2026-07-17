import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Share2, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';

interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  image: string;
  content: React.ReactNode;
}

const articles: Article[] = [
  {
    slug: "top-prewedding-locations-delhi-ncr",
    title: "Top 5 Pre-Wedding Shoot Locations in Delhi NCR",
    category: "Guides & Locations",
    date: "July 12, 2026",
    readTime: "5 min read",
    author: "Aman Studio Team",
    summary: "From historic forts to serene lakes, discover the most photogenic locations in Delhi NCR for your pre-wedding shoot.",
    image: "https://weddingshoot.in/wp-content/uploads/2021/06/IMG_2484-1024x683.jpg",
    content: (
      <>
        <p className="text-lg text-charcoal font-light leading-relaxed mb-6 font-serif italic">
          Your pre-wedding shoot is more than just a set of photos—it’s a celebration of your love story before the grand wedding day. Selecting the perfect backdrop is the first step to creating images that you’ll cherish forever.
        </p>
        <p className="text-base text-charcoal font-light leading-relaxed mb-8">
          In Delhi NCR, we are blessed with a diverse blend of heritage architecture, modern structures, and pockets of tranquil nature. Based on our years of documenting couples, we’ve put together our top 5 pre-wedding shoot locations that offer the best light, variety, and aesthetic value.
        </p>
        
        <h3 className="font-serif text-2xl text-obsidian mt-8 mb-4">1. Lodhi Gardens, New Delhi</h3>
        <p className="text-base text-charcoal font-light leading-relaxed mb-6">
          A timeless classic for a reason. The 15th-century monuments (Tomb of Sikandar Lodi, Bara Gumbad) paired with massive, spreading banyan trees offer a majestic historical vibe. The morning golden hour here is legendary—soft sunlight filters through the arches, creating high-contrast shadows that are perfect for editorial and fine-art portraits.
        </p>
        
        <h3 className="font-serif text-2xl text-obsidian mt-8 mb-4">2. Humayun’s Tomb, New Delhi</h3>
        <p className="text-base text-charcoal font-light leading-relaxed mb-6">
          If you want grand, symmetrical Mughal architecture, this is the ultimate venue. The red sandstone and white marble trim provide an elegant, premium color palette that naturally complements traditional outfits (anarkalis, sherwanis, or flowing sarees). *Note: Shoots here require prior permission and a fee, but the visual outcome is absolutely worth it.*
        </p>

        <blockquote className="border-l-2 border-orchid pl-6 my-8 font-serif italic text-xl text-charcoal/80">
          "The best locations are those that allow you to feel at ease, where the background complements rather than distracts from your chemistry."
        </blockquote>

        <h3 className="font-serif text-2xl text-obsidian mt-8 mb-4">3. Aravali Biodiversity Park, Gurgaon</h3>
        <p className="text-base text-charcoal font-light leading-relaxed mb-6">
          For couples seeking a minimalist, rustic, and natural aesthetic, the rugged landscapes and pathways of Aravali Biodiversity Park are unmatched. Early mornings present a foggy, ethereal light that works beautifully for candid, modern, and casual pre-wedding shoots.
        </p>

        <h3 className="font-serif text-2xl text-obsidian mt-8 mb-4">4. CyberHub and Horizon Plaza, Gurgaon</h3>
        <p className="text-base text-charcoal font-light leading-relaxed mb-6">
          If your style is contemporary, chic, and urban, shooting amidst the steel-and-glass skyscrapers of Gurgaon provides a stunning architectural backdrop. Evening shoots work best here, capturing the vibrant city lights and long reflections for a modern, high-fashion aesthetic.
        </p>

        <h3 className="font-serif text-2xl text-obsidian mt-8 mb-4">5. Premium Paid Photo Studios</h3>
        <p className="text-base text-charcoal font-light leading-relaxed mb-6">
          If you want multiple themes (such as Greek streets, vintage cafes, and floral gardens) without traveling to different cities, paid sets like *The Picture Villa* or *Flycam Studios* in NCR are highly efficient. They provide private changing rooms and controlled lighting environments, making the shoot smooth and hassle-free.
        </p>
      </>
    )
  },
  {
    slug: "understanding-wedding-photography-costs",
    title: "Understanding Wedding Photography Costs & Estimations",
    category: "Investment",
    date: "June 28, 2026",
    readTime: "7 min read",
    author: "Aman Studio Team",
    summary: "Demystifying wedding photography budgets. Learn what goes into pricing and how to choose the right package for your legacy celebrations.",
    image: "https://weddingshoot.in/wp-content/uploads/7Q8A1251-2.webp",
    content: (
      <>
        <p className="text-lg text-charcoal font-light leading-relaxed mb-6 font-serif italic">
          When budgeting for your wedding, photography is one of the few investments that grows in value over time. Yet, understanding quotes and packages can often feel confusing. Here is a transparent breakdown of how wedding photography is priced.
        </p>
        <p className="text-base text-charcoal font-light leading-relaxed mb-8">
          Many couples wonder why quotes vary so widely. The truth is, you aren't just paying for the hours spent shooting on the day; you are investing in specialized equipment, hours of meticulous post-processing, creative direction, and the security of knowing your once-in-a-lifetime moments are in expert hands.
        </p>

        <h3 className="font-serif text-2xl text-obsidian mt-8 mb-4">What Goes Into Your Quote?</h3>
        <p className="text-base text-charcoal font-light leading-relaxed mb-6">
          A professional wedding photography quote typically covers:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-base text-charcoal font-light leading-relaxed mb-8">
          <li><strong>Talent & Experience:</strong> Lead photographers and cinematographers who can manage low-light, tight timelines, and direct crowds with ease.</li>
          <li><strong>Post-Production:</strong> Behind every hour of shooting is 3-4 hours of culling, color grading, and video editing to achieve a cohesive, cinematic aesthetic.</li>
          <li><strong>High-End Gear:</strong> Professional-grade cameras, prime lenses, stabilizing gimbals, lighting, and crucial backup equipment.</li>
          <li><strong>Physical Deliverables:</strong> Premium, hand-bound leather albums and high-capacity digital delivery portals.</li>
        </ul>

        <blockquote className="border-l-2 border-orchid pl-6 my-8 font-serif italic text-xl text-charcoal/80">
          "A cheap photographer might save your budget today, but a professional photographer saves your memories forever."
        </blockquote>

        <h3 className="font-serif text-2xl text-obsidian mt-8 mb-4">How to Estimate Your Budget</h3>
        <p className="text-base text-charcoal font-light leading-relaxed mb-6">
          Generally, we recommend allocating 10% to 15% of your overall wedding budget to photography and cinematography. It's the only tangible legacy of your wedding day that remains after the flowers fade and the food is served.
        </p>
        <p className="text-base text-charcoal font-light leading-relaxed mb-6">
          To help with transparency, we created our **Pricing Estimator** on the homepage. You can input your specific events, duration, and album preferences to get an instant, fair estimate of the investment required.
        </p>
      </>
    )
  },
  {
    slug: "guide-to-candid-wedding-photography",
    title: "The Ultimate Guide to Candid Wedding Photography",
    category: "Style & Aesthetics",
    date: "May 15, 2026",
    readTime: "4 min read",
    author: "Aman Studio Team",
    summary: "Discover the art of capturing unscripted moments—the raw tears, the shared laughs, and the silent glances that tell the real story.",
    image: "https://weddingshoot.in/wp-content/uploads/2022/02/0E1A9633-1024x683.webp",
    content: (
      <>
        <p className="text-lg text-charcoal font-light leading-relaxed mb-6 font-serif italic">
          Candid photography is the art of capturing life as it happens—without posing, scripting, or artificial stage direction. It is the raw, unpolished truth of your celebration.
        </p>
        <p className="text-base text-charcoal font-light leading-relaxed mb-8">
          While traditional portraits have their place, it is the candid shots that carry the emotional weight of your day. The tear that escapes your father's eye during the Vidaai, the shared inside joke between the bride and groom under the mandap, and the uninhibited laughter on the dance floor—these are the real highlights.
        </p>

        <h3 className="font-serif text-2xl text-obsidian mt-8 mb-4">How We Capture Candid Moments</h3>
        <p className="text-base text-charcoal font-light leading-relaxed mb-6">
          True candid photography requires a blend of anticipation, technical skill, and discretion. Our team acts as silent observers. We use long focal length lenses to shoot from a distance, allowing guests to relax and behave naturally without the self-consciousness that comes with a camera lens in their face.
        </p>

        <blockquote className="border-l-2 border-orchid pl-6 my-8 font-serif italic text-xl text-charcoal/80">
          "Candid photography isn't about looking for a smile; it's about looking for the story behind the smile."
        </blockquote>

        <h3 className="font-serif text-2xl text-obsidian mt-8 mb-4">Tips for Couples</h3>
        <p className="text-base text-charcoal font-light leading-relaxed mb-6">
          To get the best candid shots:
        </p>
        <ul className="list-disc pl-6 space-y-3 text-base text-charcoal font-light leading-relaxed mb-8">
          <li><strong>Forget the Camera:</strong> Actively ignore the photography team and focus entirely on your partner and guests.</li>
          <li><strong>Let the Light In:</strong> Ensure your venue has good ambient lighting. Natural light during daytime events makes for stunning candids.</li>
          <li><strong>Build a Comfortable Timeline:</strong> Rushed schedules breed stress, which shows on camera. Build buffers into your day to stay relaxed and present.</li>
        </ul>
      </>
    )
  }
];

interface BlogLayoutProps {
  currentHash: string;
}

export function BlogLayout({ currentHash }: BlogLayoutProps) {
  // Parse slug from hash, e.g. "#blog/some-slug" -> "some-slug"
  const currentPostSlug = currentHash.startsWith('#blog/') 
    ? currentHash.substring(6) 
    : null;

  const currentArticle = articles.find(art => art.slug === currentPostSlug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentHash]);

  const shareOnWhatsApp = (title: string, slug: string) => {
    const url = encodeURIComponent(window.location.origin + '/#blog/' + slug);
    const text = encodeURIComponent(`Check out this article: ${title} - `);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
  };

  const shareOnFacebook = (slug: string) => {
    const url = encodeURIComponent(window.location.origin + '/#blog/' + slug);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  if (currentPostSlug && currentArticle) {
    // Single Post View
    const breadcrumbItems = [
      { name: 'Editorial Blog', href: '#blog' },
      { name: currentArticle.title }
    ];

    const relatedArticles = articles.filter(art => art.slug !== currentArticle.slug);

    return (
      <div className="bg-ivory min-h-screen pt-28 pb-20 px-6 md:px-12 font-sans text-charcoal">
        <div className="container mx-auto max-w-4xl">
          
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Back button */}
          <a 
            href="#blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-obsidian hover:text-orchid transition-colors duration-300 mb-8 cursor-pointer group"
          >
            <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Editorial
          </a>

          {/* Article Header */}
          <div className="mb-10">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-orchid uppercase block mb-4">
              {currentArticle.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-obsidian leading-tight tracking-tight mb-6">
              {currentArticle.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-xs text-charcoal/50 border-y border-warmGray/20 py-4 font-light">
              <span className="flex items-center gap-2">
                <Calendar size={14} />
                {currentArticle.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={14} />
                {currentArticle.readTime}
              </span>
              <span className="flex items-center gap-2">
                <User size={14} />
                By {currentArticle.author}
              </span>
            </div>
          </div>

          {/* Cover Image */}
          <div className="w-full aspect-[16/9] overflow-hidden rounded-lg shadow-sm mb-12 bg-obsidian">
            <img 
              src={currentArticle.image} 
              alt={currentArticle.title} 
              className="w-full h-full object-cover opacity-90"
            />
          </div>

          {/* Article Layout (Main text & Sidebar) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Text Content */}
            <div className="lg:col-span-8 text-charcoal/90 leading-relaxed font-sans font-light">
              {currentArticle.content}
            </div>

            {/* Sidebar (Share & CTA) */}
            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-warmGray/20 pt-8 lg:pt-0 lg:pl-8 flex flex-col gap-8">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-obsidian mb-4">Share This Article</h4>
                <div className="flex gap-4">
                  <button 
                    onClick={() => shareOnWhatsApp(currentArticle.title, currentArticle.slug)}
                    className="p-2 border border-warmGray/35 rounded-full hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-colors duration-300 cursor-pointer"
                    aria-label="Share on WhatsApp"
                  >
                    <Share2 size={16} />
                  </button>
                  <button 
                    onClick={() => shareOnFacebook(currentArticle.slug)}
                    className="p-2 border border-warmGray/35 rounded-full hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors duration-300 cursor-pointer"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1h-4c-2.8 0-5 2.2-5 5v2z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 border border-warmGray/20 rounded-lg">
                <h4 className="font-serif text-lg text-obsidian mb-2">Planning a Wedding?</h4>
                <p className="text-xs text-charcoal/60 leading-relaxed mb-4">
                  Check if our creative team is available on your dates and estimate pricing instantly.
                </p>
                <a 
                  href="/#estimator" 
                  className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-orchid hover:text-plum transition-colors duration-300"
                >
                  Estimate Cost <ArrowRight size={12} />
                </a>
              </div>
            </div>

          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="border-t border-warmGray/20 pt-16 mt-16">
              <h3 className="font-serif text-2xl text-obsidian mb-8">Related Editorial Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedArticles.map(art => (
                  <a 
                    key={art.slug}
                    href={`#blog/${art.slug}`}
                    className="group block bg-white border border-warmGray/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img 
                        src={art.image} 
                        alt={art.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-orchid block mb-2">{art.category}</span>
                      <h4 className="font-serif text-lg text-obsidian leading-snug group-hover:text-orchid transition-colors duration-300 line-clamp-2">{art.title}</h4>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // Blog List View
  const breadcrumbItems = [
    { name: 'Editorial Blog' }
  ];

  const featuredPost = articles[0];
  const secondaryPosts = articles.slice(1);

  return (
    <div className="bg-ivory min-h-screen pt-28 pb-20 px-6 md:px-12 font-sans text-charcoal">
      <div className="container mx-auto max-w-5xl">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 mt-4">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-orchid uppercase block mb-4">
            Editorial & Journal
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-obsidian leading-tight tracking-tight mb-4">
            Our Stories & Guides
          </h1>
          <p className="text-xs sm:text-sm font-light text-charcoal/60 leading-relaxed uppercase tracking-wider">
            In-depth advice, local NCR location guides, and wedding planning insights
          </p>
        </div>

        {/* Feature Post (Large Card) */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <a 
              href={`#blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-warmGray/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:h-[400px] overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                />
              </div>
              <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-orchid block mb-3">
                  Featured / {featuredPost.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-obsidian leading-tight mb-4 group-hover:text-orchid transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                <p className="text-xs sm:text-sm font-light text-charcoal/60 leading-relaxed mb-6">
                  {featuredPost.summary}
                </p>
                <div className="flex items-center gap-4 text-xs text-charcoal/40 font-light mb-6">
                  <span className="flex items-center gap-1.5"><Calendar size={12} />{featuredPost.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} />{featuredPost.readTime}</span>
                </div>
                <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-obsidian group-hover:text-orchid transition-colors duration-300">
                  Read Article <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </div>
            </a>
          </motion.div>
        )}

        {/* Secondary Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryPosts.map((art, idx) => (
            <motion.div 
              key={art.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (idx + 1) * 0.1 }}
            >
              <a 
                href={`#blog/${art.slug}`}
                className="group block bg-white border border-warmGray/10 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orchid block mb-2">
                      {art.category}
                    </span>
                    <h3 className="font-serif text-xl text-obsidian leading-snug mb-3 group-hover:text-orchid transition-colors duration-300">
                      {art.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-light text-charcoal/60 leading-relaxed mb-6 line-clamp-3">
                      {art.summary}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 text-[10px] text-charcoal/40 font-light border-t border-warmGray/10 pt-4 mb-4">
                      <span className="flex items-center gap-1.5"><Calendar size={10} />{art.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={10} />{art.readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-obsidian group-hover:text-orchid transition-colors duration-300">
                      Read Article <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
