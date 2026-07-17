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
            ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-warm-gray/20'
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
                key={item.name}
                href={item.href}
                className={`text-[11px] tracking-widest uppercase font-bold transition-colors duration-300 hover:text-orchid ${
                  isScrolled ? 'text-charcoal/80' : 'text-alabaster/90'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={onOpenEstimator}
              className={`px-6 py-3 rounded-full text-xs tracking-widest uppercase font-bold transition-all duration-500 border cursor-pointer ${
                isScrolled
                  ? 'border-charcoal/20 text-charcoal hover:border-plum hover:text-plum'
                  : 'border-alabaster/40 text-alabaster hover:bg-alabaster/10 hover:border-alabaster'
              }`}
            >
              Check Availability
            </button>
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
            <nav className="flex flex-col items-center space-y-6 mb-10">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.05 }}
                  className="text-xl font-serif text-charcoal tracking-widest uppercase hover:text-orchid transition-colors duration-300"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
            <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEstimator();
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 + 0.05 }}
              className="px-8 py-4 bg-charcoal text-white rounded-full text-xs tracking-widest uppercase font-bold transition-all duration-500 hover:bg-orchid cursor-pointer"
            >
              Check Availability
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
