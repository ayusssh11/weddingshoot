export function Footer() {
  return (
    <footer className="bg-espresso text-alabaster/60 px-[5vw] py-16 md:py-20">
      <div className="max-w-[90vw] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="font-serif text-2xl tracking-wider text-alabaster/90">
            TIMELISS
          </span>
          <p className="text-[10px] tracking-[0.2em] uppercase font-sans mt-2 text-alabaster/40">
            Fine Art Wedding Editorial
          </p>
        </div>

        <div className="flex items-center gap-8 text-[10px] tracking-[0.25em] uppercase font-sans">
          <a href="#" className="hover:text-terracotta transition-colors duration-300">
            Instagram
          </a>
          <a href="#" className="hover:text-terracotta transition-colors duration-300">
            Pinterest
          </a>
          <a href="#" className="hover:text-terracotta transition-colors duration-300">
            Journal
          </a>
        </div>

        <p className="text-[10px] tracking-[0.1em] font-sans text-alabaster/30">
          &copy; {new Date().getFullYear()} Timeliss Atelier
        </p>
      </div>
    </footer>
  );
}
