import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = ['Gallery', 'Journal', 'About', 'Contact'];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-alabaster/90 backdrop-blur-xl py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="px-[5vw] flex items-center justify-between">
        <a href="/" className="relative z-50">
          <span className={`font-serif text-2xl tracking-wider transition-colors duration-500 ${
            scrolled || open ? 'text-espresso' : 'text-alabaster'
          }`}>
            TIMELISS
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 hover:text-terracotta ${
                scrolled ? 'text-espresso/70' : 'text-alabaster/80'
              }`}
            >
              {link}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden relative z-50 p-2 transition-colors ${
            scrolled || open ? 'text-espresso' : 'text-alabaster'
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-alabaster flex flex-col items-center justify-center gap-12"
          >
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setOpen(false)}
                className="text-4xl md:text-5xl font-serif text-espresso hover:text-terracotta transition-colors"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
