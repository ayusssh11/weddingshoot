export function AssociatePartners() {
  const partners = [
    { name: "WedMeGood", color: "hover:text-[#E84C68]" },
    { name: "WeddingWire", color: "hover:text-[#18A19A]" },
    { name: "Shaadidukaan.com", color: "hover:text-[#D1302A]" },
    { name: "Justdial", color: "hover:text-[#FF7C00]" },
  ];

  return (
    <section className="bg-white py-10 md:py-16 border-t border-warm-gray/20">
      <div className="container mx-auto px-6 md:px-12">
        <h3 className="text-center font-sans text-orchid text-3xl font-light mb-16 tracking-wide">
          Associate Partners
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {partners.map((partner, index) => (
             <div 
               key={index} 
               className={`text-2xl md:text-3xl font-bold text-charcoal/40 ${partner.color} transition-colors duration-500 cursor-pointer select-none`}
             >
               {partner.name}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
