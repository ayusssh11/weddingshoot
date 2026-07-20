import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenEstimator: () => void;
}

export function Header({ onOpenEstimator }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Real Weddings', href: '#real-weddings' },
    { name: 'Differentiator', href: '#differentiator' },
    { name: 'Services', href: '#services' },
    { name: 'Locations', href: '#locations' },
    { name: 'How We Quote', href: '#how-we-quote' },
    { name: 'Team', href: '#team' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Blog', href: '#blog' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled || isMobileMenuOpen
            ? 'bg-white/95 backdrop-blur-md py-3 sm:py-4 shadow-sm border-b border-warm-gray/20'
            : 'bg-transparent py-4 sm:py-6 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 xl:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="group flex items-center h-10 sm:h-12 md:h-14 relative z-50 flex-shrink-0">
            <img 
              src="https://weddingshoot.in/wp-content/uploads/Wedding-Shoot-Logo-01.png" 
              alt="Wedding Shoot Logo" 
              className={`h-full w-auto object-contain transition-all duration-500 group-hover:scale-105 ${!(isScrolled || isMobileMenuOpen) && 'brightness-0 invert'}`}
            />
          </a>

          {/* Desktop Nav (Only shown on xl screens 1280px+ to prevent crowding/overlap) */}
          <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-7 flex-shrink">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-[10px] 2xl:text-[11px] tracking-wider uppercase font-bold whitespace-nowrap transition-colors duration-300 hover:text-orchid ${
                  isScrolled ? 'text-charcoal/80' : 'text-alabaster/90'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Action Stack: Desktop CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3 sm:gap-4 relative z-50">
            {/* CTA Button */}
            <button
              onClick={onOpenEstimator}
              className={`hidden sm:inline-block px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-[10px] sm:text-xs tracking-widest uppercase font-bold whitespace-nowrap transition-all duration-500 border cursor-pointer ${
                isScrolled || isMobileMenuOpen
                  ? 'border-charcoal/20 text-charcoal hover:border-plum hover:text-plum'
                  : 'border-alabaster/40 text-alabaster hover:bg-alabaster/10 hover:border-alabaster'
              }`}
            >
              Check Availability
            </button>
            
            {/* Hamburger menu button (Shown below xl breakpoint) */}
            <button 
              className={`xl:hidden p-2 transition-colors duration-300 relative z-50 cursor-pointer ${isScrolled || isMobileMenuOpen ? 'text-charcoal' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile/Tablet Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col items-center justify-between pt-24 pb-10 px-6 h-screen w-full overflow-y-auto"
          >
            <nav className="flex flex-col items-center space-y-4 sm:space-y-6 my-auto">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 + 0.05 }}
                  className="text-lg sm:text-2xl font-serif text-charcoal tracking-widest uppercase hover:text-plum transition-colors duration-300"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.04 + 0.05 }}
              className="flex flex-col items-center gap-6 w-full max-w-xs"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEstimator();
                }}
                className="w-full py-3.5 bg-obsidian text-white rounded-full text-xs tracking-widest uppercase font-bold transition-all duration-500 hover:bg-plum cursor-pointer shadow-lg"
              >
                Check Availability
              </button>

              <div className="flex items-center justify-center gap-6 text-[10px] tracking-widest uppercase font-bold text-charcoal/50">
                <a href="http://bit.ly/amandigitalphotography" target="_blank" rel="noopener noreferrer" className="hover:text-plum">Facebook</a>
                <a href="http://bit.ly/weddingshoot1" target="_blank" rel="noopener noreferrer" className="hover:text-plum">Instagram</a>
                <a href="https://www.youtube.com/channel/UC9IWnICeJGHk0gvQgQ4PXWQ" target="_blank" rel="noopener noreferrer" className="hover:text-plum">YouTube</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
