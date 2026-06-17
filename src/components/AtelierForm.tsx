import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function InlineInput({ placeholder }: { placeholder: string }) {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onInput={(e) => setText(e.currentTarget.textContent || '')}
      className={`inline-block min-w-[100px] border-b-[1.5px] px-1 outline-none transition-all duration-500 text-obsidian font-sans ${
        focused
          ? 'border-orchid shadow-[0_1px_0_0_#E668B3]'
          : text
            ? 'border-obsidian/40'
            : 'border-charcoal/30 hover:border-charcoal/50'
      }`}
      data-placeholder={placeholder}
      role="textbox"
      aria-label={placeholder}
      style={
        !text && !focused
          ? { '--placeholder': `"${placeholder}"` } as React.CSSProperties
          : undefined
      }
    />
  );
}

const seasons = [
  { label: 'WINTER 2026', status: 'SECURED', available: false },
  { label: 'SPRING 2027', status: 'INQUIRE', available: true },
  { label: 'SUMMER 2027', status: 'INQUIRE', available: true },
  { label: 'AUTUMN 2027', status: 'OPEN', available: true },
];

export function AtelierForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="bg-alabaster py-28 md:py-36 px-[5vw]" id="contact">
      <div className="max-w-[90vw] mx-auto flex flex-col md:flex-row gap-16 md:gap-12 lg:gap-20">

        <motion.div
          {...fadeUp(0)}
          className="md:w-1/2"
        >
          <span className="text-[9px] tracking-[0.35em] text-terracotta uppercase font-sans font-semibold">
            The Atelier
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-espresso mt-4 leading-tight">
            Reserve Your
            <br />
            Commission
          </h2>

          <div className="mt-10 md:mt-14">
            <p className="text-espresso/70 text-sm md:text-base leading-relaxed max-w-md font-sans">
              We accept a strictly limited number of commissions globally each year to ensure uncompromising artistic dedication to every frame we create.
            </p>
          </div>

          <div className="mt-12 md:mt-16 space-y-4">
            {seasons.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between py-3 border-b border-espresso/10"
              >
                <span className="font-serif text-lg md:text-xl text-espresso tracking-wide">
                  {s.label}
                </span>
                <span
                  className={`text-[10px] tracking-[0.3em] uppercase font-sans font-semibold ${
                    s.available ? 'text-terracotta' : 'text-espresso/30'
                  }`}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.15)}
          className="md:w-1/2 flex flex-col justify-center relative"
        >
          {/* Subtle gradient glow behind form */}
          <div className="absolute inset-0 bg-gradient-to-br from-plum/5 to-orchid/5 blur-3xl -z-10 rounded-full transform scale-110"></div>
          
          <div className="backdrop-blur-xl bg-white/90 p-8 md:p-12 rounded-2xl shadow-2xl relative border-[0.5px] border-white/50 bg-clip-padding before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-br before:from-plum/30 before:to-orchid/30 before:-z-10 before:rounded-2xl before:content-['']">
            <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
              <div className="text-obsidian/90 text-base md:text-lg leading-[2.2] font-sans">
                <p>
                  Dear Studio, my name is{' '}
                  <InlineInput placeholder="your name" />{' '}
                  and our celebration unfolds on{' '}
                  <InlineInput placeholder="date" />{' '}
                  inside the beautiful venues of{' '}
                  <InlineInput placeholder="venue / city" />.
                  Reach me at{' '}
                  <InlineInput placeholder="email or phone" />{' '}
                  to begin our visual legacy.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-obsidian text-alabaster py-5 px-8 text-xs tracking-[0.35em] uppercase font-sans font-semibold transition-all duration-500 hover:bg-plum hover:shadow-2xl"
              >
                Initiate Conversation
              </motion.button>

              <p className="text-[10px] text-obsidian/40 tracking-wide font-sans text-center uppercase">
                We typically respond within 24&ndash;48 hours
              </p>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
