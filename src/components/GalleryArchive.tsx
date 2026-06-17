import { useState } from 'react';
import { motion } from 'framer-motion';

interface GalleryItem {
  src: string;
  alt: string;
  label: string;
  className: string;
  bw?: boolean;
}

const items: GalleryItem[] = [
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85',
    alt: 'Fine art editorial portrait',
    label: 'Fine Art Portraiture — 003',
    className: 'md:col-start-1 md:col-end-3 md:row-start-1 md:row-end-4 aspect-[3/4]',
  },
  {
    src: 'https://images.unsplash.com/photo-1520854226256-7950050f23ed?w=900&q=85',
    alt: 'Candid couple embrace',
    label: 'Editorial Couple — 004',
    className: 'md:col-start-3 md:col-end-6 md:row-start-1 md:row-end-3 aspect-[4/3] md:-mt-12',
  },
  {
    src: 'https://images.unsplash.com/photo-1509630778269-351f7a3e5280?w=600&q=85',
    alt: 'Black and white bridal detail',
    label: 'Fine Art B&W — 005',
    className: 'md:col-start-5 md:col-end-7 md:row-start-2 md:row-end-5 aspect-[2/3] md:mt-16',
    bw: true,
  },
  {
    src: 'https://images.unsplash.com/photo-1507504031003-b4d8e8aee4e8?w=700&q=85',
    alt: 'Wedding venue detail',
    label: 'Venue Atelier — 006',
    className: 'md:col-start-1 md:col-end-3 md:row-start-4 md:row-end-6 aspect-[5/4]',
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=85',
    alt: 'Macro ring detail',
    label: 'Macro Still Life — 007',
    className: 'md:col-start-3 md:col-end-6 md:row-start-3 md:row-end-6 aspect-[4/3] md:mt-8',
  },
];

function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
      className={item.className}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-full overflow-hidden group cursor-pointer">
        <img
          src={item.src}
          alt={item.alt}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04] ${
            item.bw ? 'grayscale contrast-125' : ''
          }`}
        />

        <div
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle 100px at ${mousePos.x}px ${mousePos.y}px, rgba(179,106,75,0.08), transparent)`,
          }}
        />

        <div
          className={`absolute w-6 h-6 border border-terracotta rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
          style={{ left: mousePos.x, top: mousePos.y }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-espresso/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-alabaster/90 text-[9px] tracking-[0.35em] uppercase font-sans font-medium">
            {item.label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function GalleryArchive() {
  return (
    <section className="bg-alabaster py-28 md:py-36 px-[5vw]">
      <div className="max-w-[90vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-16 md:mb-20"
        >
          <span className="text-[9px] tracking-[0.35em] text-terracotta uppercase font-sans font-semibold">
            The Archive
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-espresso mt-3 leading-tight">
            Curated Frames.
            <br />
            Timeless Stories.
          </h2>
        </motion.div>

        <div className="flex flex-col md:hidden gap-6">
          {items.map((item, i) => (
            <div key={i} className="w-full">
              <GalleryCard item={item} index={i} />
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-6 md:auto-rows-[200px] gap-5">
          {items.map((item, i) => (
            <GalleryCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
