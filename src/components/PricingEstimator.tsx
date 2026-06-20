import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

// Pricing Constants
const PRICING = {
  events: {
    wedding: { name: 'Bespoke Wedding Commission', basePrice: 150000, isFlat: false, desc: 'Full-day creative coverage, high-end artistic grading, and standard legacy output.' },
    prewedding: { name: 'Editorial Pre-Wedding Narrative', basePrice: 80000, isFlat: true, desc: 'Concept scouting, wardrobe support, and editorial teaser output.' },
    engagement: { name: 'Intimate Engagement / Roka', basePrice: 60000, isFlat: false, desc: 'Detailed candid coverage of intimate ring ceremonies and family rituals.' },
    milestone: { name: 'Custom Milestone Ceremony', basePrice: 50000, isFlat: false, desc: 'Premium coverage for anniversaries, birthdays, or family celebrations.' }
  },
  services: {
    cinematicVideo: { name: 'Cinematic Film & Teaser', pricePerDay: 100000, desc: '4K cinema gear, dedicated directors, 3-5min teaser + 20-30min highlight film.' },
    traditionalPhoto: { name: 'Traditional Family Coverage', pricePerDay: 30000, desc: 'Clean, structured lighting setup for family group pictures and stage arrivals.' },
    droneAerial: { name: 'Drone Aerial Cinematography', pricePerDay: 25000, desc: 'DGCA licensed pilots capturing breathtaking views of your venues and entries.' },
    sameDayEdit: { name: 'Same-Day Edit Video Teaser', flatPrice: 40000, desc: 'High-speed edit crew delivering a cinematic teaser shown live at your reception.' },
  },
  albums: {
    unitPrice: 20000,
    name: 'Legacy Art Book / Premium Album'
  },
  locations: {
    local: { name: 'Local NCR (Gurgaon/Delhi)', price: 0 },
    domestic: { name: 'Domestic Destination (Jaipur, Udaipur, Goa, etc.)', price: 60000 },
    international: { name: 'International Destination', price: 200000 }
  },
  scale: {
    intimate: { name: 'Intimate (< 150 guests)', price: 0, crewBonus: 'Base Crew' },
    medium: { name: 'Medium (150 - 500 guests)', price: 40000, crewBonus: '+1 Photographer & +1 Cinematographer' },
    grand: { name: 'Grand (500+ guests)', price: 80000, crewBonus: '+2 Photographers, +1 Cinematographer & Assist' }
  }
};

type EventType = keyof typeof PRICING.events;
type LocationType = keyof typeof PRICING.locations;
type ScaleType = keyof typeof PRICING.scale;
type ServiceType = keyof typeof PRICING.services;

interface FormState {
  eventType: EventType;
  duration: number; // days
  services: {
    cinematicVideo: boolean;
    traditionalPhoto: boolean;
    droneAerial: boolean;
    sameDayEdit: boolean;
  };
  albumCount: number;
  location: LocationType;
  scale: ScaleType;
  // Contact
  fullName: string;
  email: string;
  phone: string;
  eventDate: string;
  notes: string;
}

export function PricingEstimator() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [formData, setFormData] = useState<FormState>({
    eventType: 'wedding',
    duration: 2,
    services: {
      cinematicVideo: true,
      traditionalPhoto: false,
      droneAerial: false,
      sameDayEdit: false,
    },
    albumCount: 1,
    location: 'local',
    scale: 'medium',
    fullName: '',
    email: '',
    phone: '',
    eventDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  // Generate a random Quote ID on mount
  useEffect(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().getFullYear();
    setQuoteId(`WS-${dateStr}-${randomNum}`);
  }, []);

  // Update duration based on event type constraints
  useEffect(() => {
    if (formData.eventType === 'prewedding') {
      setFormData(prev => ({ ...prev, duration: 1 }));
    }
  }, [formData.eventType]);

  // Form validation logic
  const validateField = (name: string, value: any) => {
    let error = '';
    if (name === 'fullName') {
      if (!value.trim()) error = 'Name is required.';
      else if (value.trim().length < 3) error = 'Name must be at least 3 characters.';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) error = 'Email is required.';
      else if (!emailRegex.test(value)) error = 'Please enter a valid email address.';
    } else if (name === 'phone') {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/; // general international format E.164
      const cleanPhone = value.replace(/[\s\-()]/g, '');
      if (!value) error = 'Contact number is required.';
      else if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10 || cleanPhone.length > 15) {
        error = 'Please enter a valid contact number (10-15 digits).';
      }
    } else if (name === 'eventDate') {
      if (!value) error = 'Event date is required.';
      else {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) error = 'Event date cannot be in the past.';
      }
    }
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error dynamically as user types
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Pricing calculations
  const calculateTotal = () => {
    const eventConfig = PRICING.events[formData.eventType];
    const durationMultiplier = eventConfig.isFlat ? 1 : formData.duration;

    // 1. Base Price
    const basePriceTotal = eventConfig.basePrice * durationMultiplier;

    // 2. Services Add-ons
    let servicesTotal = 0;
    if (formData.services.cinematicVideo) {
      servicesTotal += PRICING.services.cinematicVideo.pricePerDay * durationMultiplier;
    }
    if (formData.services.traditionalPhoto) {
      servicesTotal += PRICING.services.traditionalPhoto.pricePerDay * durationMultiplier;
    }
    if (formData.services.droneAerial) {
      servicesTotal += PRICING.services.droneAerial.pricePerDay * durationMultiplier;
    }
    if (formData.services.sameDayEdit) {
      servicesTotal += PRICING.services.sameDayEdit.flatPrice;
    }

    // 3. Album Add-ons
    const albumsTotal = formData.albumCount * PRICING.albums.unitPrice;

    // 4. Logistics
    const logisticsPrice = PRICING.locations[formData.location].price;

    // 5. Guest Scale Add-on
    const scalePrice = PRICING.scale[formData.scale].price;

    const subtotal = basePriceTotal + servicesTotal + albumsTotal + scalePrice;
    const grandTotal = subtotal + logisticsPrice;

    return {
      basePriceTotal,
      servicesTotal,
      albumsTotal,
      logisticsPrice,
      scalePrice,
      subtotal,
      grandTotal
    };
  };

  const pricingSummary = calculateTotal();


  const steps = [
    { title: "Details", subtitle: "Unlock pricing calculator" },
    { title: "Event Type", subtitle: "Select your celebration format" },
    { title: "Services", subtitle: "Customize crew coverage" },
    { title: "Logistics", subtitle: "Scale and destination" }
  ];

  const handleNextStep = () => {
    if (currentStep === 0) {
      // Validate Contact Details on Step 1
      const nameErr = validateField('fullName', formData.fullName);
      const emailErr = validateField('email', formData.email);
      const phoneErr = validateField('phone', formData.phone);
      const dateErr = validateField('eventDate', formData.eventDate);

      if (nameErr || emailErr || phoneErr || dateErr) {
        setErrors({
          fullName: nameErr,
          email: emailErr,
          phone: phoneErr,
          eventDate: dateErr
        });
        setTouched({
          fullName: true,
          email: true,
          phone: true,
          eventDate: true
        });
        return; // Block transitioning to step 2
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate contact fields just in case
    const nameErr = validateField('fullName', formData.fullName);
    const emailErr = validateField('email', formData.email);
    const phoneErr = validateField('phone', formData.phone);
    const dateErr = validateField('eventDate', formData.eventDate);

    if (nameErr || emailErr || phoneErr || dateErr) {
      setErrors({
        fullName: nameErr,
        email: emailErr,
        phone: phoneErr,
        eventDate: dateErr
      });
      setTouched({
        fullName: true,
        email: true,
        phone: true,
        eventDate: true
      });
      // Snap back to first step to fix errors
      setCurrentStep(0);
      return;
    }

    setIsSubmitting(true);
    // Simulate API request to agency CRM
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Your quote has been secured!');
    }, 1500);
  };

  // Trigger PDF print of the custom invoice
  const triggerPdfDownload = () => {
    window.print();
  };

  return (
    <section className="bg-ivory pb-20 pt-24 sm:pt-28 md:pt-32 relative min-h-screen" id="estimator">
      {/* Background Image at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[800px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/60 to-transparent z-10" />
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=3000&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 mix-blend-multiply" alt="" />
      </div>

      {/* Stylesheet specifically for printing a clean branded invoice */}
      <style>{`
        @media print {
          @page { margin: 1cm; size: auto; }
          body { background: white !important; margin: 0; padding: 0; overflow: auto; height: auto; }
          #root { display: none !important; }
          .print-only { display: block !important; position: static !important; }
          .print-brand { display: flex !important; }
          .print-header { border-bottom: 2px solid #8B337F; margin-bottom: 30px; padding-bottom: 20px; }
          .print-item { border-bottom: 1px solid #eee; margin-bottom: 15px; padding-bottom: 15px; }
          .print-total { border-top: 2px solid #120D16; padding-top: 20px; font-weight: bold; font-size: 1.5em; }
          /* Ensure text is dark and visible */
          .print-only p, .print-only span, .print-only h1, .print-only h3, .print-only div {
            color: #120D16 !important;
            opacity: 1 !important;
          }
          .print-header h1, .print-total p { color: #8B337F !important; }
        }
      `}</style>

      {/* Hidden PDF Printable Area */}
      {typeof document !== 'undefined' && createPortal(
        <div className="hidden print-only print-brand p-12 bg-white text-obsidian w-full z-50">
          <div className="w-full max-w-4xl mx-auto">
          <div className="print-header flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-serif text-plum mb-2">Wedding Shoot</h1>
              <p className="text-charcoal/90 uppercase tracking-widest text-sm">Bespoke Investment Summary</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm text-charcoal/80">REF: {quoteId}</p>
              <p className="font-mono text-sm text-charcoal/80">DATE: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal/70 mb-4">Client Details</h3>
            <p className="text-xl font-serif">{formData.fullName || 'Valued Client'}</p>
            <p className="text-charcoal/80">{formData.email}</p>
            <p className="text-charcoal/80">{formData.phone}</p>
            <p className="text-charcoal/80 mt-2">Target Date: {formData.eventDate}</p>
          </div>

          <div className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal/70 mb-6">Package Configuration</h3>
            
            <div className="print-item flex justify-between">
              <div>
                <p className="font-bold text-lg">{PRICING.events[formData.eventType].name}</p>
                <p className="text-charcoal/90">{PRICING.events[formData.eventType].isFlat ? 'Flat rate package' : `${formData.duration} Day(s) of coverage`}</p>
              </div>
              <p className="font-mono">{formatCurrency(pricingSummary.basePriceTotal)}</p>
            </div>

            {Object.entries(formData.services).some(([_, val]) => val) && (
              <div className="print-item">
                <p className="font-bold mb-3">Crew Additions & Services</p>
                {formData.services.cinematicVideo && (
                  <div className="flex justify-between text-charcoal/80 mb-2 pl-4">
                    <span>Cinematic Film & Teaser</span>
                    <span className="font-mono">+{formatCurrency(PRICING.services.cinematicVideo.pricePerDay * (PRICING.events[formData.eventType].isFlat ? 1 : formData.duration))}</span>
                  </div>
                )}
                {formData.services.traditionalPhoto && (
                  <div className="flex justify-between text-charcoal/80 mb-2 pl-4">
                    <span>Traditional Coverage</span>
                    <span className="font-mono">+{formatCurrency(PRICING.services.traditionalPhoto.pricePerDay * formData.duration)}</span>
                  </div>
                )}
                {formData.services.droneAerial && (
                  <div className="flex justify-between text-charcoal/80 mb-2 pl-4">
                    <span>Drone Aerial Video</span>
                    <span className="font-mono">+{formatCurrency(PRICING.services.droneAerial.pricePerDay * formData.duration)}</span>
                  </div>
                )}
                {formData.services.sameDayEdit && (
                  <div className="flex justify-between text-charcoal/80 mb-2 pl-4">
                    <span>Same-Day Edit Video</span>
                    <span className="font-mono">+{formatCurrency(PRICING.services.sameDayEdit.flatPrice)}</span>
                  </div>
                )}
              </div>
            )}

            {formData.albumCount > 0 && (
              <div className="print-item flex justify-between">
                <div>
                  <p className="font-bold">Premium Legacy Albums</p>
                  <p className="text-charcoal/90">Quantity: {formData.albumCount}</p>
                </div>
                <p className="font-mono">+{formatCurrency(pricingSummary.albumsTotal)}</p>
              </div>
            )}

            {formData.scale !== 'intimate' && (
              <div className="print-item flex justify-between">
                <div>
                  <p className="font-bold">Event Scale: {PRICING.scale[formData.scale].name}</p>
                  <p className="text-charcoal/90">Crew scaling factor applied</p>
                </div>
                <p className="font-mono">+{formatCurrency(pricingSummary.scalePrice)}</p>
              </div>
            )}

            {formData.location !== 'local' && (
              <div className="print-item flex justify-between">
                <div>
                  <p className="font-bold">Destination Logistics</p>
                  <p className="text-charcoal/90">{PRICING.locations[formData.location].name} zone mapping</p>
                </div>
                <p className="font-mono">+{formatCurrency(pricingSummary.logisticsPrice)}</p>
              </div>
            )}
          </div>

          <div className="print-total flex justify-between items-center text-plum">
            <p className="uppercase tracking-widest text-sm">Estimated Total</p>
            <p className="text-3xl">{formatCurrency(pricingSummary.grandTotal)}</p>
          </div>
          
          <div className="mt-20 pt-10 border-t border-charcoal/10 text-center text-charcoal/70 text-xs italic">
            <p>This document is an estimate and not a binding contract. Travel & accommodation for destination events are billed at actuals.</p>
            <p className="mt-2">Valid for 14 days from generation date.</p>
          </div>
        </div>
      </div>,
      document.body
    )}

      <div className="max-w-[85rem] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">

          {/* Right Column: Investment Summary */}
          <div className="lg:col-span-4 order-2 lg:order-2 lg:sticky lg:top-32 w-full">
            <AnimatePresence mode="popLayout">
              {currentStep > 0 ? (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gradient-to-b from-[#ece7e1] to-[#e6dfd8] rounded-[2rem] p-6 shadow-xl border border-white/50 backdrop-blur-md flex flex-col gap-6 no-print relative overflow-hidden"
                >
                  {/* Decorative faint pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                  {/* Top: Breakdown */}
                  <div className="relative z-10">
                    <h4 className="text-[9px] uppercase tracking-[0.25em] font-bold text-obsidian mb-6">Investment Summary</h4>
                    
                    <div className="space-y-4 text-xs font-serif italic text-obsidian">
                      {/* Base Event */}
                      <div className="flex justify-between items-center pb-3 border-b border-obsidian/5">
                        <span>{PRICING.events[formData.eventType].name} ({formData.duration} Days)</span>
                        <span className="font-mono not-italic font-bold text-[13px]">{formatCurrency(pricingSummary.basePriceTotal)}</span>
                      </div>
                      
                      {/* Addons summary (condensed) */}
                      {formData.services.cinematicVideo && (
                        <div className="flex justify-between items-center pb-3 border-b border-obsidian/5 text-obsidian/80">
                          <span>Cinematic Film & Teaser</span>
                          <span className="font-mono not-italic text-xs">+{formatCurrency(PRICING.services.cinematicVideo.pricePerDay * (PRICING.events[formData.eventType].isFlat ? 1 : formData.duration))}</span>
                        </div>
                      )}

                      {formData.albumCount > 0 && (
                        <div className="flex justify-between items-center pb-3 border-b border-obsidian/5 text-obsidian/80">
                          <span>Legacy Album(s)</span>
                          <span className="font-mono not-italic text-xs">+{formatCurrency(pricingSummary.albumsTotal)}</span>
                        </div>
                      )}

                      {formData.scale !== 'intimate' && (
                        <div className="flex justify-between items-center pb-3 border-b border-obsidian/5 text-obsidian/80">
                          <span>{PRICING.scale[formData.scale].name} Scale Premium</span>
                          <span className="font-mono not-italic text-xs">+{formatCurrency(pricingSummary.scalePrice)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Total Block */}
                  <div className="bg-[#0f0a14] text-white rounded-2xl p-6 flex flex-col justify-center shadow-2xl relative z-10 mt-2">
                    <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-white/80 mb-2 block">Total Estimate</span>
                    <span className="text-3xl font-serif font-bold text-white mb-2 tracking-tight">
                      {formatCurrency(pricingSummary.grandTotal)}
                    </span>
                    <p className="text-[8px] text-white/60 italic leading-relaxed mb-6">
                      *excludes travel/lodging for destination shoots.
                    </p>
                    
                    {currentStep < steps.length - 1 ? (
                      <button 
                        type="button" 
                        onClick={() => setCurrentStep(3)}
                        className="w-full bg-white text-obsidian py-3.5 rounded text-[10px] uppercase tracking-widest font-bold hover:bg-ivory transition-colors cursor-pointer"
                      >
                        Lock Estimate
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-white text-obsidian py-3.5 rounded text-[10px] uppercase tracking-widest font-bold hover:bg-ivory transition-colors cursor-pointer"
                      >
                        {isSubmitting ? 'Securing...' : 'Secure Booking'}
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="hidden lg:flex h-full flex-col justify-center items-center opacity-40 text-center px-8 border-2 border-dashed border-warm-gray/50 rounded-[2rem]">
                  <p className="font-serif italic text-lg text-obsidian">Your bespoke summary will appear here once you begin.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Left Column: Form */}
          <div className="lg:col-span-8 flex flex-col gap-6 relative order-1 lg:order-1 w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              {/* STEPPER UI */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white">
                <div className="flex justify-between items-center relative z-0">
                  {/* Background Track line */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-warm-gray/40 -z-10 -translate-y-1/2"></div>
                  
                  {/* Active Track line */}
                  <div 
                    className="absolute top-1/2 left-0 h-px bg-obsidian -z-10 -translate-y-1/2 transition-all duration-700 ease-out"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                  ></div>

                  {steps.map((s, index) => {
                    const isCompleted = currentStep > index;
                    const isActive = currentStep === index;
                    
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          if (index === 0) setCurrentStep(0);
                          else if (index <= currentStep) setCurrentStep(index);
                          else {
                            if (currentStep === 0) {
                              const nameErr = validateField('fullName', formData.fullName);
                              const emailErr = validateField('email', formData.email);
                              if (!nameErr && !emailErr) setCurrentStep(index);
                            }
                          }
                        }}
                        className="flex flex-col items-center gap-3 relative cursor-pointer group"
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm
                          ${isCompleted ? 'bg-obsidian text-white border-2 border-obsidian' : 
                            isActive ? 'bg-white text-obsidian border-2 border-warm-gray ring-4 ring-ivory' : 
                            'bg-white text-charcoal/90 border border-warm-gray/50 hover:border-warm-gray'}
                        `}>
                          {isCompleted ? <Check size={16} strokeWidth={2.5} /> : <span className="text-xs font-semibold font-mono tracking-tighter">0{index + 1}</span>}
                        </div>
                        <span className={`text-[8px] sm:text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.15em] font-bold absolute -bottom-6 sm:-bottom-6 whitespace-nowrap transition-colors duration-300
                          ${isActive || isCompleted ? 'text-obsidian' : 'text-charcoal/90'}
                        `}>
                          {isActive ? s.title : <span className="hidden sm:inline">0{index + 1} {s.title}</span>}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* STEP 1: CONTACT */}
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white"
                  >
                    <div className="mb-8">
                      <h3 className="text-xl md:text-2xl font-serif italic text-obsidian mb-2">Begin Your Story</h3>
                      <p className="text-xs text-charcoal/80 uppercase tracking-widest font-semibold">Share your details</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="flex flex-col">
                        <label htmlFor="fullName" className="text-[10px] uppercase tracking-[0.15em] text-charcoal/80 mb-2 font-semibold">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Priya Sharma"
                          className={`bg-transparent border-b ${errors.fullName ? 'border-red-400' : 'border-warm-gray focus:border-obsidian'} py-3 text-sm text-obsidian placeholder:text-charcoal/80 focus:outline-none transition-colors rounded-none`}
                        />
                        {errors.fullName && touched.fullName && <span className="text-[10px] text-red-500 mt-1">{errors.fullName}</span>}
                      </div>

                      {/* Email */}
                      <div className="flex flex-col">
                        <label htmlFor="email" className="text-[10px] uppercase tracking-[0.15em] text-charcoal/80 mb-2 font-semibold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="priya@example.com"
                          className={`bg-transparent border-b ${errors.email ? 'border-red-400' : 'border-warm-gray focus:border-obsidian'} py-3 text-sm text-obsidian placeholder:text-charcoal/80 focus:outline-none transition-colors rounded-none`}
                        />
                        {errors.email && touched.email && <span className="text-[10px] text-red-500 mt-1">{errors.email}</span>}
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col">
                        <label htmlFor="phone" className="text-[10px] uppercase tracking-[0.15em] text-charcoal/80 mb-2 font-semibold">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="+91 98765 43210"
                          className={`bg-transparent border-b ${errors.phone ? 'border-red-400' : 'border-warm-gray focus:border-obsidian'} py-3 text-sm text-obsidian placeholder:text-charcoal/80 focus:outline-none transition-colors rounded-none`}
                        />
                        {errors.phone && touched.phone && <span className="text-[10px] text-red-500 mt-1">{errors.phone}</span>}
                      </div>

                      {/* Date */}
                      <div className="flex flex-col">
                        <label htmlFor="eventDate" className="text-[10px] uppercase tracking-[0.15em] text-charcoal/80 mb-2 font-semibold">
                          Celebration Date *
                        </label>
                        <input
                          type="date"
                          id="eventDate"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`bg-transparent border-b ${errors.eventDate ? 'border-red-400' : 'border-warm-gray focus:border-obsidian'} py-3 text-sm text-obsidian focus:outline-none transition-colors rounded-none`}
                        />
                        {errors.eventDate && touched.eventDate && <span className="text-[10px] text-red-500 mt-1">{errors.eventDate}</span>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: FORMAT */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white">
                      <h3 className="text-xl md:text-2xl font-serif italic text-obsidian mb-8">
                        <span className="font-sans not-italic text-sm text-charcoal/80 uppercase tracking-[0.2em] font-semibold block mb-2">Choose</span>
                        Format
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(Object.keys(PRICING.events) as EventType[]).map((type) => {
                          const evt = PRICING.events[type];
                          const isSelected = formData.eventType === type;
                          const numStr = type === 'wedding' ? 'ONE' : type === 'prewedding' ? 'TWO' : type === 'engagement' ? 'THREE' : 'FOUR';
                          
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, eventType: type }))}
                              className={`flex flex-col p-6 rounded-xl border-2 text-left transition-all duration-300 relative group cursor-pointer h-full ${
                                isSelected 
                                  ? 'border-obsidian bg-white shadow-md' 
                                  : 'border-transparent bg-ivory/50 hover:bg-ivory hover:border-warm-gray/40'
                              }`}
                            >
                              <div className="flex justify-between items-center w-full mb-3">
                                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-charcoal/70">
                                  COLLECTION {numStr}
                                </span>
                                {isSelected && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-obsidian"></div>
                                )}
                              </div>
                              <span className="font-serif text-base font-bold text-obsidian mb-3">
                                {evt.name}
                              </span>
                              <span className="text-[11px] text-charcoal/80 leading-relaxed font-light mb-4 flex-grow">
                                {evt.desc}
                              </span>
                              
                              {isSelected && (
                                <div className="mt-auto text-[8px] font-bold uppercase tracking-widest flex items-center gap-2">
                                  SELECTED <ArrowRight size={10} />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline Slider */}
                    {!PRICING.events[formData.eventType].isFlat && (
                      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white">
                        <div className="flex justify-between items-end mb-8">
                          <h3 className="text-xl md:text-2xl font-serif italic text-obsidian">
                            <span className="font-sans not-italic text-[10px] text-charcoal/80 uppercase tracking-[0.2em] font-bold block mb-2">Duration</span>
                            Coverage <span className="font-bold font-serif not-italic">Timeline</span>
                          </h3>
                          <div className="bg-ivory px-4 py-2 rounded-full border border-warm-gray/50 flex items-center gap-2">
                            <span className="font-serif italic font-bold text-obsidian">{formData.duration}</span>
                            <span className="text-[9px] uppercase tracking-widest font-bold text-charcoal/90">Days</span>
                          </div>
                        </div>

                        <div className="px-2 pt-4 pb-8">
                          <div className="relative h-1 bg-warm-gray rounded-full">
                            <div 
                              className="absolute top-0 left-0 h-full bg-obsidian rounded-full transition-all duration-300"
                              style={{ width: `${((formData.duration - 1) / 4) * 100}%` }}
                            ></div>
                            <input
                              type="range"
                              id="duration-slider"
                              min="1"
                              max="5"
                              step="1"
                              value={formData.duration}
                              onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {/* Thumb indicator visual */}
                            <div 
                              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-obsidian rounded-full shadow-md transition-all duration-300 pointer-events-none"
                              style={{ left: `calc(${((formData.duration - 1) / 4) * 100}% - 8px)` }}
                            ></div>
                            
                            {/* Ticks */}
                            <div className="absolute top-6 left-0 right-0 flex justify-between px-1">
                              {[1, 2, 3, 4, 5].map(val => (
                                <span key={val} className="text-[8px] uppercase tracking-widest text-charcoal/70 font-semibold cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, duration: val }))}>
                                  {val === 1 ? 'SINGLE DAY' : val === 5 ? 'FIVE+ DAYS' : `${val === 2 ? 'TWO' : val === 3 ? 'THREE' : 'FOUR'} DAYS`}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {currentStep > 1 && (
                  <motion.div
                    key={`step${currentStep}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white"
                  >
                    <div className="mb-8">
                      <h3 className="text-xl md:text-2xl font-serif italic text-obsidian mb-2">{steps[currentStep].title}</h3>
                      <p className="text-xs text-charcoal/80 uppercase tracking-widest font-semibold">{steps[currentStep].subtitle}</p>
                    </div>

                    {currentStep === 2 ? (
                      // STEP 3: SERVICES
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(Object.keys(PRICING.services) as ServiceType[]).map((srvKey) => {
                          const srv = PRICING.services[srvKey];
                          const isSelected = formData.services[srvKey];
                          return (
                            <button
                              key={srvKey}
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                services: { ...prev.services, [srvKey]: !prev.services[srvKey] }
                              }))}
                              className={`flex justify-between items-center p-5 rounded-xl border text-left transition-all duration-300 ${isSelected ? 'border-obsidian bg-white shadow-md' : 'border-warm-gray/40 bg-ivory/50 hover:bg-ivory'}`}
                            >
                              <div>
                                <span className="block font-serif text-sm font-bold text-obsidian mb-1">{srv.name}</span>
                                <span className="block text-[10px] text-charcoal/80 font-light">{srv.desc}</span>
                              </div>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${isSelected ? 'bg-obsidian border-obsidian text-white' : 'border-warm-gray/80 text-transparent'}`}>
                                <Check size={12} strokeWidth={3} />
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    ) : (
                      // STEP 4: LOGISTICS
                      <div className="space-y-8">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-4 text-charcoal/90">Location Logistics</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {(Object.keys(PRICING.locations) as LocationType[]).map((locKey) => {
                              const loc = PRICING.locations[locKey];
                              const isSelected = formData.location === locKey;
                              return (
                                <button
                                  key={locKey}
                                  type="button"
                                  onClick={() => setFormData(prev => ({ ...prev, location: locKey }))}
                                  className={`p-4 rounded-xl border text-center transition-all duration-300 ${isSelected ? 'border-obsidian bg-white shadow-md' : 'border-warm-gray/40 bg-ivory/50 hover:bg-ivory'}`}
                                >
                                  <span className="block font-serif text-sm font-bold mb-1 text-obsidian">{loc.name}</span>
                                </button>
                              )
                            })}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="notes" className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-3 block text-charcoal/90">Creative Vision Notes</label>
                          <textarea
                            id="notes"
                            name="notes"
                            rows={3}
                            value={formData.notes}
                            onChange={handleInputChange}
                            placeholder="Tell us your dreams..."
                            className="w-full bg-transparent border-b border-warm-gray focus:border-obsidian py-3 text-sm text-obsidian focus:outline-none transition-colors resize-none"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* NAVIGATION BUTTONS */}
              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-charcoal/90 hover:text-obsidian transition-colors ${currentStep === 0 ? 'invisible' : 'visible'}`}
                >
                  <ArrowLeft size={14} /> Back
                </button>

                <div className="flex gap-3 sm:gap-4">
                  {currentStep === steps.length - 1 && (
                     <button
                       type="button"
                       onClick={triggerPdfDownload}
                       className="px-4 sm:px-6 py-3 rounded-full border border-warm-gray bg-white/50 hover:bg-white text-[10px] uppercase tracking-widest font-bold text-obsidian transition-colors shadow-sm"
                     >
                       <span className="hidden sm:inline">Download</span> PDF
                     </button>
                  )}

                  {currentStep < steps.length - 1 && (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 sm:px-8 py-3 rounded-full bg-obsidian text-white text-[10px] uppercase tracking-widest font-bold hover:bg-charcoal transition-colors flex items-center gap-2 shadow-lg"
                    >
                      Next Step <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
