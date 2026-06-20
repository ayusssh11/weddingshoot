import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-espresso text-alabaster/60 border-t border-white/5 pt-20 pb-12 px-6 md:px-12">
      <div className="container mx-auto">
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Logo & Description */}
          <div className="md:col-span-5 flex flex-col items-start">
            <a href="/" className="mb-6 block h-14">
              <img 
                src="https://weddingshoot.in/wp-content/uploads/Wedding-Shoot-Logo-01.png" 
                alt="Wedding Shoot Logo" 
                className="h-full w-auto object-contain brightness-0 invert opacity-95"
              />
            </a>
            <p className="font-serif italic text-lg text-alabaster/90 mb-4 max-w-sm">
              Fine Art Wedding Storytellers
            </p>
            <p className="text-sm font-light leading-relaxed text-alabaster/50 max-w-sm">
              Capturing legacy celebrations, intimate unions, and raw human emotions with an editorial approach. Meticulously documented and artfully graded to stand the test of time.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] tracking-[0.25em] uppercase font-bold text-alabaster/90 mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-4 text-xs font-light text-alabaster/60 uppercase tracking-widest">
              <li>
                <a href="#portfolio" className="hover:text-orchid transition-colors duration-300">
                  The Portfolios
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:text-orchid transition-colors duration-300">
                  Featured Stories
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-orchid transition-colors duration-300">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-orchid transition-colors duration-300">
                  Pricing Estimator
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orchid transition-colors duration-300">
                  Availability
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Studio Info */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] tracking-[0.25em] uppercase font-bold text-alabaster/90 mb-6">
              The Atelier
            </h4>
            <ul className="flex flex-col gap-4 text-xs font-light text-alabaster/60 uppercase tracking-widest">
              <li>
                <span className="block text-[9px] text-orchid tracking-widest font-bold mb-1">EMAIL</span>
                <a href="mailto:amanstudio78@gmail.com" className="hover:text-alabaster transition-colors duration-300">
                  amanstudio78@gmail.com
                </a>
              </li>
              <li>
                <span className="block text-[9px] text-orchid tracking-widest font-bold mb-1">CALL</span>
                <a href="tel:8700609950" className="hover:text-alabaster transition-colors duration-300">
                  +91 8700609950
                </a>
              </li>
              <li>
                <span className="block text-[9px] text-orchid tracking-widest font-bold mb-1">STUDIO</span>
                <span className="text-alabaster/80">
                  Gurgaon, Haryana, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-[10px] tracking-[0.25em] uppercase font-bold text-alabaster/50">
            <a href="http://bit.ly/amandigitalphotography" target="_blank" rel="noopener noreferrer" className="hover:text-orchid transition-colors duration-300">
              Facebook
            </a>
            <a href="http://bit.ly/weddingshoot1" target="_blank" rel="noopener noreferrer" className="hover:text-orchid transition-colors duration-300">
              Instagram
            </a>
            <a href="https://www.youtube.com/channel/UC9IWnICeJGHk0gvQgQ4PXWQ" target="_blank" rel="noopener noreferrer" className="hover:text-orchid transition-colors duration-300">
              Youtube
            </a>
          </div>

          <p className="text-[10px] tracking-[0.1em] text-alabaster/30 text-center md:text-left">
            &copy; {new Date().getFullYear()} WeddingShoot Studio. Handcrafted for legacy celebrations.
          </p>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-bold text-alabaster/50 hover:text-orchid transition-colors duration-300 cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} className="transform group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
