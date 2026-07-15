import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Team() {
  const team = [
    {
      name: "Aman",
      role: "Co-founder, Team Lead & Marketing Head",
      // Using high quality stock portraits or profile placeholders that fit the aesthetic
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
      name: "Rohit",
      role: "Creative Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
      name: "Sneha",
      role: "Cinematography Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=800"
    },
    {
      name: "Rajesh",
      role: "Traditional Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600&h=800"
    }
  ];

  return (
    <section className="bg-white py-12 md:py-16 px-6 md:px-12" id="team">
      <div className="container mx-auto max-w-5xl">
        {/* Header Stack */}
        <div className="text-center mb-10 md:mb-14">
          <motion.span {...fadeUp(0)} className="text-[10px] tracking-[0.35em] text-orchid uppercase font-semibold block mb-3 font-sans">
            Our Studio Team
          </motion.span>
          <motion.h2 {...fadeUp(0.1)} className="font-serif text-4xl md:text-5xl text-obsidian tracking-tight leading-tight">
            The People Behind the Camera
          </motion.h2>
        </div>

        {/* Team Grid (2x2 on Mobile, 4 Columns on Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              {...fadeUp(index * 0.1)}
              className="group flex flex-col items-center text-center"
            >
              {/* Photo Frame */}
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-ivory mb-4 shadow-md relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-obsidian/10 transition-opacity duration-300 group-hover:opacity-0"></div>
              </div>

              {/* Title / Name */}
              <h3 className="font-serif text-lg md:text-xl text-obsidian font-bold">
                {member.name}
              </h3>
              <p className="text-[10px] md:text-xs text-charcoal/60 uppercase tracking-widest font-semibold mt-1 font-sans max-w-[150px]">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing Line */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-center text-sm md:text-base font-serif italic text-plum mt-12 border-t border-warm-gray/30 pt-8"
        >
          One in-house team. The people you meet are the people who shoot.
        </motion.p>
      </div>
    </section>
  );
}
