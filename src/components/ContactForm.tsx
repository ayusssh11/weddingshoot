import { motion } from 'framer-motion';

export function ContactForm() {
  return (
    <section id="contact" className="bg-ivory py-12 md:py-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          {/* Left Column: Assurances */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 flex flex-col justify-center"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-obsidian mb-8 leading-tight">
              Let's begin your<br /> story.
            </h2>
            
            <div className="flex flex-col space-y-8 mt-4">
              <div className="border-b border-warm-gray/60 pb-6">
                <h4 className="font-serif text-xl text-charcoal mb-2">Transparent Investment Structures</h4>
                <p className="text-charcoal/60 text-sm font-light">Clear, upfront pricing with no hidden clauses. Every package is tailored to the exact coverage you need.</p>
              </div>
              
              <div className="border-b border-warm-gray/60 pb-6">
                <h4 className="font-serif text-xl text-charcoal mb-2">Rapid Delivery Timelines</h4>
                <p className="text-charcoal/60 text-sm font-light">Receive your cinematic teaser within 72 hours, and your complete curated gallery in just 4 weeks.</p>
              </div>
              
              <div className="border-b border-warm-gray/60 pb-6">
                <h4 className="font-serif text-xl text-charcoal mb-2">Dedicated Creative Director</h4>
                <p className="text-charcoal/60 text-sm font-light">From initial consultation to final delivery, work with a single dedicated lead who understands your vision.</p>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-7/12 relative rounded-2xl bg-gradient-to-br from-orchid/40 via-white/10 to-plum/40 p-[1px] shadow-[0_0_50px_rgba(230,104,179,0.15)] group/card"
          >
            <div className="bg-white/80 backdrop-blur-xl p-8 md:p-16 rounded-2xl w-full h-full relative overflow-hidden">
              {/* Subtle animated background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orchid/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col relative group">
                  <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2 font-medium">Full Name</label>
                  <input type="text" className="peer bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-orchid text-charcoal transition-colors rounded-none w-full" placeholder="Jane Doe" />
                  {/* Glowing dot indicator */}
                  <div className="absolute right-0 bottom-3 w-1.5 h-1.5 rounded-full bg-orchid opacity-0 peer-focus:opacity-100 shadow-[0_0_8px_rgba(230,104,179,0.8)] transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col relative group">
                  <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2 font-medium">Contact Number</label>
                  <input type="tel" className="peer bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-orchid text-charcoal transition-colors rounded-none w-full" placeholder="+91 XXXXX XXXXX" />
                  <div className="absolute right-0 bottom-3 w-1.5 h-1.5 rounded-full bg-orchid opacity-0 peer-focus:opacity-100 shadow-[0_0_8px_rgba(230,104,179,0.8)] transition-opacity duration-300"></div>
                </div>
              </div>
              
              <div className="flex flex-col relative group">
                <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2 font-medium">Email Address</label>
                <input type="email" className="peer bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-orchid text-charcoal transition-colors rounded-none w-full" placeholder="jane@example.com" />
                <div className="absolute right-0 bottom-3 w-1.5 h-1.5 rounded-full bg-orchid opacity-0 peer-focus:opacity-100 shadow-[0_0_8px_rgba(230,104,179,0.8)] transition-opacity duration-300"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col relative group">
                  <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2 font-medium">Event Nature</label>
                  <select className="peer bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-orchid text-charcoal transition-colors appearance-none rounded-none cursor-pointer w-full">
                    <option value="" disabled selected>Choose an option</option>
                    <option value="wedding">Wedding Celebration</option>
                    <option value="prewedding">Pre-Wedding Narrative</option>
                    <option value="milestone">Milestone Birthday</option>
                    <option value="corporate">Corporate Media Portfolio</option>
                  </select>
                  <div className="absolute right-6 bottom-3 w-1.5 h-1.5 rounded-full bg-orchid opacity-0 peer-focus:opacity-100 shadow-[0_0_8px_rgba(230,104,179,0.8)] transition-opacity duration-300 pointer-events-none"></div>
                  {/* Custom dropdown arrow to replace native */}
                  <div className="absolute right-0 bottom-4 pointer-events-none text-charcoal/30 peer-focus:text-orchid transition-colors">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <div className="flex flex-col relative group">
                  <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2 font-medium">Target Date</label>
                  <input type="date" className="peer bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-orchid text-charcoal/70 transition-colors rounded-none w-full" />
                  <div className="absolute right-8 bottom-3 w-1.5 h-1.5 rounded-full bg-orchid opacity-0 peer-focus:opacity-100 shadow-[0_0_8px_rgba(230,104,179,0.8)] transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              
              <div className="flex flex-col relative group">
                <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2 font-medium">Venue & Destination</label>
                <input type="text" className="peer bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-orchid text-charcoal transition-colors rounded-none w-full" placeholder="E.g., The Leela Palace, Udaipur" />
                <div className="absolute right-0 bottom-3 w-1.5 h-1.5 rounded-full bg-orchid opacity-0 peer-focus:opacity-100 shadow-[0_0_8px_rgba(230,104,179,0.8)] transition-opacity duration-300"></div>
              </div>
              
              <div className="flex flex-col relative group">
                <label className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-2 font-medium">Your Creative Vision</label>
                <textarea rows={4} className="peer bg-transparent border-b border-neutral-300 py-3 focus:outline-none focus:border-orchid text-charcoal transition-colors resize-none rounded-none w-full" placeholder="Share the details of your dream celebration..."></textarea>
                <div className="absolute right-0 bottom-4 w-1.5 h-1.5 rounded-full bg-orchid opacity-0 peer-focus:opacity-100 shadow-[0_0_8px_rgba(230,104,179,0.8)] transition-opacity duration-300"></div>
              </div>
              
              <div className="pt-6">
                <button type="submit" className="w-full bg-gradient-to-r from-plum to-orchid text-white py-6 rounded-sm tracking-[0.3em] uppercase text-sm font-medium shadow-md hover:shadow-[0_0_25px_rgba(230,104,179,0.4)] hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center">
                    Secure My Date <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">➔</span>
                  </span>
                  <div className="absolute inset-0 bg-white/10 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                </button>
              </div>
            </form>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
