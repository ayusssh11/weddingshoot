import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

interface FaqItem {
  question: string;
  answer: string;
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "Do you travel for destination weddings, and how does that work?",
      answer: "Yes — destination work is a core part of what we do. We've shot across Jaipur, Rishikesh, Nainital and Jim Corbett, and we travel wherever you're getting married. We arrange our own travel and stay, and the shoot is planned with you before we leave."
    },
    {
      question: "When do we get our photos and films?",
      answer: "Your completion timeline is shared with you right after your event, and we deliver on time. Your edited work lands in a private app you can access anytime — view, select, share, download. Not a link that expires."
    },
    {
      question: "How far in advance should we book?",
      answer: "For peak season (Nov–Feb) and destination dates, 4–6 months is comfortable — the best dates go earlier. If your date is close, still ask. We'll tell you honestly whether we're free rather than stretch the team thin."
    }
  ];

  // FAQPage JSON-LD Schema
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-12 md:py-16 px-6 md:px-12" id="faq">
      {/* Insert JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="container mx-auto max-w-4xl">
        {/* Header Stack */}
        <div className="text-center mb-10 md:mb-14">
          <motion.span {...fadeUp(0)} className="text-[10px] tracking-[0.35em] text-orchid uppercase font-semibold block mb-3 font-sans">
            Inquiries
          </motion.span>
          <motion.h2 {...fadeUp(0.1)} className="font-serif text-4xl md:text-5xl text-obsidian tracking-tight leading-tight">
            Questions Couples Ask Us
          </motion.h2>
        </div>

        {/* FAQ List */}
        <div className="divide-y divide-warm-gray/30 border-t border-b border-warm-gray/30">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                {...fadeUp(index * 0.05)}
                className="py-6 md:py-8"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-6 text-left focus:outline-none group cursor-pointer"
                >
                  <span className="font-serif text-lg md:text-xl text-obsidian font-medium group-hover:text-plum transition-colors">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 text-orchid transition-colors duration-300">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="text-charcoal/80 text-sm md:text-base font-sans font-light leading-relaxed pt-4 pr-12">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
