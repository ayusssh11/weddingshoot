import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['Weddings', 'Pre-Weddings', 'Milestones', 'Corporate', 'Music Selectives'];

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
            ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-warm-gray/20'
            : 'bg-transparent py-6 border-b border-white/10'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="group flex items-center h-12 md:h-16 relative z-50">
            <img 
              src="https://weddingshoot.in/wp-content/uploads/Wedding-Shoot-Logo-01.png" 
              alt="Wedding Shoot Logo" 
              className={`h-full w-auto object-contain transition-all duration-500 group-hover:scale-105 ${!(isScrolled || isMobileMenuOpen) && 'brightness-0 invert'}`}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 hover:text-orchid ${
                  isScrolled ? 'text-charcoal/80' : 'text-alabaster/90'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className={`px-6 py-3 rounded-full text-sm tracking-widest uppercase transition-all duration-500 border ${
                isScrolled
                  ? 'border-charcoal/20 text-charcoal hover:border-plum hover:text-plum'
                  : 'border-alabaster/40 text-alabaster hover:bg-alabaster/10 hover:border-alabaster'
              }`}
            >
              Check Availability
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className={`lg:hidden p-2 transition-colors duration-300 relative z-50 ${isScrolled || isMobileMenuOpen ? 'text-charcoal' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20 h-screen w-full"
          >
            <nav className="flex flex-col items-center space-y-8 mb-12">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  className="text-2xl md:text-3xl font-serif text-charcoal tracking-widest uppercase hover:text-orchid transition-colors duration-300"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 + 0.1 }}
              className="px-8 py-4 bg-charcoal text-white rounded-full text-sm tracking-widest uppercase transition-all duration-500 hover:bg-orchid"
            >
              Check Availability
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
