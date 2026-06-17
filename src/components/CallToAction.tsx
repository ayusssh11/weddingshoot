import { ArrowRight } from 'lucide-react';

export function CallToAction() {
  return (
    <section 
      className="relative py-20 md:py-28 overflow-hidden bg-fixed bg-center bg-cover" 
      style={{ backgroundImage: "url('https://weddingshoot.in/wp-content/uploads/2021/06/IMG_2484-1024x683.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#120D16]/80 via-[#8B337F]/90 to-[#1A1121]"></div>
      
      {/* Decorative background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight tracking-tight drop-shadow-md">
          Say ‘Hello’ to Beautiful Wedding Moments!
        </h2>
        <p className="text-white/90 font-sans font-light text-lg md:text-xl max-w-2xl mx-auto mb-12 drop-shadow-sm">
          Turn your special moments into lasting memories. Click here to get in touch and schedule a call back!
        </p>
        <a 
          href="#contact" 
          className="inline-flex items-center bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full uppercase tracking-widest text-xs font-semibold hover:bg-white hover:text-obsidian hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] border border-white/30 transition-all duration-500 group transform hover:-translate-y-1"
        >
          Get In Touch 
          <ArrowRight className="w-4 h-4 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" />
        </a>
      </div>
    </section>
  );
}
