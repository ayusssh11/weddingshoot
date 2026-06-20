import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, ArrowRight, ArrowLeft, Check, Download,
  Mail, Phone, User, CheckCircle2, AlertCircle, Lock
} from 'lucide-react';

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
  const [submitted, setSubmitted] = useState(false);
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

  // Recommended Crew Calculation
  const getCrewComposition = () => {
    const crew: string[] = [];
    // Base Photographers
    let photographers = 1;
    let cinematographers = 0;
    let assistants = 0;

    if (formData.eventType === 'wedding') {
      photographers = 2; // standard wedding base crew size
    } else if (formData.eventType === 'prewedding') {
      photographers = 1;
    }

    // Services Additions
    if (formData.services.cinematicVideo) {
      cinematographers += 2; // Standard cinematography team size
      assistants += 1;
    }
    if (formData.services.traditionalPhoto) {
      photographers += 1; // 1 traditional photographer
    }
    if (formData.services.droneAerial) {
      crew.push('1 Licensed Drone Pilot');
    }
    if (formData.services.sameDayEdit) {
      crew.push('1 On-site Video Editor');
    }

    // Guest Scale additions
    if (formData.scale === 'medium') {
      photographers += 1;
      if (formData.services.cinematicVideo) cinematographers += 1;
    } else if (formData.scale === 'grand') {
      photographers += 2;
      if (formData.services.cinematicVideo) cinematographers += 2;
      assistants += 1;
    }

    if (photographers > 0) {
      crew.unshift(`${photographers} Professional Photographer${photographers > 1 ? 's' : ''}`);
    }
    if (cinematographers > 0) {
      crew.unshift(`${cinematographers} Professional Cinematographer${cinematographers > 1 ? 's' : ''}`);
    }
    if (assistants > 0) {
      crew.push(`${assistants} Production Assistant${assistants > 1 ? 's' : ''}`);
    }

    return crew;
  };

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
      setSubmitted(true);
    }, 1500);
  };

  // Trigger PDF print of the custom invoice
  const triggerPdfDownload = () => {
    window.print();
  };

  return (
    <section className="bg-ivory py-12 sm:py-16 md:py-24 relative overflow-hidden" id="estimator">

      {/* Stylesheet specifically for printing a clean branded invoice */}
      <style>{`
        @media print {
          #root {
            display: none !important;
          }
          #print-invoice-sheet, #print-invoice-sheet * {
            visibility: visible !important;
          }
          #print-invoice-sheet {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            padding: 40px !important;
            box-sizing: border-box !important;
            background-color: white !important;
            color: #120D16 !important;
          }
        }
      `}</style>

      {/* Hidden Invoice sheet - rendered in absolute but transparent/hidden until print */}
      {isMounted && createPortal(
        <div id="print-invoice-sheet" className="hidden print:block bg-white p-12 text-[#120D16] max-w-4xl mx-auto font-sans leading-relaxed border border-warm-gray">

          {/* Header */}
          <div className="flex justify-between items-start border-b border-warm-gray pb-8 mb-8">
            <div>
              <img
                src="https://weddingshoot.in/wp-content/uploads/Wedding-Shoot-Logo-01.png"
                alt="Wedding Shoot Logo"
                className="h-16 w-auto object-contain mb-4"
              />
              <p className="font-serif italic text-lg text-charcoal">Fine Art Wedding Storytellers</p>
              <p className="text-xs text-charcoal/60 mt-1">Gurgaon, Haryana, India | amanstudio78@gmail.com | +91 8700609950</p>
            </div>
            <div className="text-right">
              <h1 className="font-serif text-2xl tracking-widest uppercase text-charcoal">Investment Estimate</h1>
              <p className="text-sm font-semibold mt-2">Estimate ID: <span className="font-mono text-orchid font-bold">{quoteId}</span></p>
              <p className="text-xs text-charcoal/60">Date: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>

          {/* Client & Event Info */}
          <div className="grid grid-cols-2 gap-8 mb-8 bg-ivory p-6 rounded-md border border-warm-gray/30">
            <div>
              <h3 className="text-xs uppercase tracking-wider text-charcoal/50 font-bold mb-2">COMMISSIONED FOR</h3>
              <p className="text-sm font-bold">{formData.fullName || 'Valued Client'}</p>
              <p className="text-xs text-charcoal/60 mt-1">Email: {formData.email || 'N/A'}</p>
              <p className="text-xs text-charcoal/60">Phone: {formData.phone || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-wider text-charcoal/50 font-bold mb-2">CELEBRATION DETAILS</h3>
              <p className="text-sm font-bold">Event Format: <span className="font-serif italic">{PRICING.events[formData.eventType].name}</span></p>
              <p className="text-xs text-charcoal/60 mt-1">Target Date: {formData.eventDate ? new Date(formData.eventDate).toLocaleDateString('en-IN', { dateStyle: 'long' }) : 'To Be Decided'}</p>
              <p className="text-xs text-charcoal/60">Coverage: {formData.eventType === 'prewedding' ? 'Flat Rate' : `${formData.duration} Day(s)`}</p>
              <p className="text-xs text-charcoal/60">Destination Logistics: {PRICING.locations[formData.location].name}</p>
            </div>
          </div>

          {/* Invoice Items Table */}
          <table className="w-full text-left border-collapse mb-8">
            <thead>
              <tr className="border-b-2 border-charcoal/10 text-xs uppercase tracking-wider text-charcoal/60">
                <th className="py-3 font-semibold">Service Description</th>
                <th className="py-3 font-semibold text-center">Duration / Qty</th>
                <th className="py-3 font-semibold text-right">Estimate Cost</th>
              </tr>
            </thead>
            <tbody className="text-sm">

              {/* Base Event Price */}
              <tr className="border-b border-warm-gray/30">
                <td className="py-4 font-medium">
                  {PRICING.events[formData.eventType].name}
                  <span className="block text-xs font-light text-charcoal/60 mt-0.5">{PRICING.events[formData.eventType].desc}</span>
                </td>
                <td className="py-4 text-center text-charcoal/70">
                  {PRICING.events[formData.eventType].isFlat ? '1 Flat' : `${formData.duration} Day(s)`}
                </td>
                <td className="py-4 text-right font-semibold">
                  {formatCurrency(pricingSummary.basePriceTotal)}
                </td>
              </tr>

              {/* Cinematic Video Add-on */}
              {formData.services.cinematicVideo && (
                <tr className="border-b border-warm-gray/30">
                  <td className="py-4 font-medium">
                    {PRICING.services.cinematicVideo.name}
                    <span className="block text-xs font-light text-charcoal/60 mt-0.5">{PRICING.services.cinematicVideo.desc}</span>
                  </td>
                  <td className="py-4 text-center text-charcoal/70">
                    {PRICING.events[formData.eventType].isFlat ? '1 Flat' : `${formData.duration} Day(s)`}
                  </td>
                  <td className="py-4 text-right font-semibold">
                    {formatCurrency(PRICING.services.cinematicVideo.pricePerDay * (PRICING.events[formData.eventType].isFlat ? 1 : formData.duration))}
                  </td>
                </tr>
              )}

              {/* Traditional Photo Add-on */}
              {formData.services.traditionalPhoto && (
                <tr className="border-b border-warm-gray/30">
                  <td className="py-4 font-medium">
                    {PRICING.services.traditionalPhoto.name}
                    <span className="block text-xs font-light text-charcoal/60 mt-0.5">{PRICING.services.traditionalPhoto.desc}</span>
                  </td>
                  <td className="py-4 text-center text-charcoal/70">
                    {formData.duration} Day(s)
                  </td>
                  <td className="py-4 text-right font-semibold">
                    {formatCurrency(PRICING.services.traditionalPhoto.pricePerDay * formData.duration)}
                  </td>
                </tr>
              )}

              {/* Drone Add-on */}
              {formData.services.droneAerial && (
                <tr className="border-b border-warm-gray/30">
                  <td className="py-4 font-medium">
                    {PRICING.services.droneAerial.name}
                    <span className="block text-xs font-light text-charcoal/60 mt-0.5">{PRICING.services.droneAerial.desc}</span>
                  </td>
                  <td className="py-4 text-center text-charcoal/70">
                    {formData.duration} Day(s)
                  </td>
                  <td className="py-4 text-right font-semibold">
                    {formatCurrency(PRICING.services.droneAerial.pricePerDay * formData.duration)}
                  </td>
                </tr>
              )}

              {/* Same Day Edit Add-on */}
              {formData.services.sameDayEdit && (
                <tr className="border-b border-warm-gray/30">
                  <td className="py-4 font-medium">
                    {PRICING.services.sameDayEdit.name}
                    <span className="block text-xs font-light text-charcoal/60 mt-0.5">{PRICING.services.sameDayEdit.desc}</span>
                  </td>
                  <td className="py-4 text-center text-charcoal/70">
                    1 Flat
                  </td>
                  <td className="py-4 text-right font-semibold">
                    {formatCurrency(PRICING.services.sameDayEdit.flatPrice)}
                  </td>
                </tr>
              )}

              {/* Art books */}
              {formData.albumCount > 0 && (
                <tr className="border-b border-warm-gray/30">
                  <td className="py-4 font-medium">
                    {PRICING.albums.name}
                    <span className="block text-xs font-light text-charcoal/60 mt-0.5">High-definition archival prints in dynamic binding configurations.</span>
                  </td>
                  <td className="py-4 text-center text-charcoal/70">
                    {formData.albumCount} Book(s)
                  </td>
                  <td className="py-4 text-right font-semibold">
                    {formatCurrency(pricingSummary.albumsTotal)}
                  </td>
                </tr>
              )}

              {/* Scale adjustments */}
              {formData.scale !== 'intimate' && (
                <tr className="border-b border-warm-gray/30">
                  <td className="py-4 font-medium">
                    Event Scale: {PRICING.scale[formData.scale].name}
                    <span className="block text-xs font-light text-charcoal/60 mt-0.5">Requires senior team staffing additions ({PRICING.scale[formData.scale].crewBonus}).</span>
                  </td>
                  <td className="py-4 text-center text-charcoal/70">
                    1 Flat
                  </td>
                  <td className="py-4 text-right font-semibold">
                    {formatCurrency(pricingSummary.scalePrice)}
                  </td>
                </tr>
              )}

              {/* Logistics */}
              {formData.location !== 'local' && (
                <tr className="border-b border-warm-gray/30">
                  <td className="py-4 font-medium">
                    Travel & Logistics: {PRICING.locations[formData.location].name}
                    <span className="block text-xs font-light text-charcoal/60 mt-0.5">Calculated based on equipment freight and crew transport requirements.</span>
                  </td>
                  <td className="py-4 text-center text-charcoal/70">
                    1 Flat
                  </td>
                  <td className="py-4 text-right font-semibold">
                    {formatCurrency(pricingSummary.logisticsPrice)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Invoice Summary */}
          <div className="flex justify-between items-start">
            <div className="w-1/2">
              <h3 className="text-xs uppercase tracking-wider text-charcoal/50 font-bold mb-2">Crew Recommended</h3>
              <ul className="text-xs text-charcoal/80 space-y-1">
                {getCrewComposition().map((c, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-orchid"></span>
                    {c}
                  </li>
                ))}
              </ul>
              {formData.notes && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-charcoal/50 uppercase tracking-wider">CREATIVE NOTES</h4>
                  <p className="text-xs italic text-charcoal/70 mt-1 font-serif">"{formData.notes}"</p>
                </div>
              )}
            </div>
            <div className="w-5/12 text-right">
              <div className="flex justify-between py-1 text-sm text-charcoal/70">
                <span>Subtotal:</span>
                <span>{formatCurrency(pricingSummary.subtotal)}</span>
              </div>
              {formData.location !== 'local' && (
                <div className="flex justify-between py-1 text-sm text-charcoal/70">
                  <span>Logistics:</span>
                  <span>{formatCurrency(pricingSummary.logisticsPrice)}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-t-2 border-charcoal/10 mt-3 text-lg font-bold text-charcoal">
                <span>Estimated Total:</span>
                <span className="text-orchid">{formatCurrency(pricingSummary.grandTotal)}*</span>
              </div>
              <p className="text-[10px] text-charcoal/50 italic mt-2">*Taxes and local accommodation rules may apply as per final contract terms.</p>
            </div>
          </div>

          {/* Print Terms & Footer */}
          <div className="border-t border-warm-gray pt-8 mt-12 text-[10px] text-charcoal/50 space-y-3 leading-normal">
            <p className="font-semibold text-charcoal/70 uppercase tracking-wider text-center">Important Terms & Agreements</p>
            <div className="grid grid-cols-2 gap-6 text-left">
              <div>
                <p><strong>1. Retainer:</strong> A 50% non-refundable retainer along with a signed contract is required to secure our calendar. Dates are not held without a formal retainer booking.</p>
                <p className="mt-1"><strong>2. Deliverables:</strong> Curated cinematic teasers will be delivered within 72 hours. Complete galleries and physical legacy art albums require 4-6 weeks.</p>
              </div>
              <div>
                <p><strong>3. Crew Accommodation:</strong> For domestic and international destination shoots, client is requested to provide board and lodging for the crew size listed above.</p>
                <p className="mt-1"><strong>4. Quote Validity:</strong> This digital quote generates an estimate of standard services valid for 30 days from invoice date.</p>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-warm-gray/30 flex justify-between items-center text-xs">
              <p>Thank you for considering WeddingShoot Studio. Let's design legacy visual narratives.</p>
              <div className="w-48 border-b border-charcoal/50 pb-1 text-center italic font-serif text-charcoal/40">Authorized Signatory</div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Interactive Estimator Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10 no-print">

        {/* Glow Effects */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-orchid/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-plum/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 px-2">
          <span className="text-[10px] tracking-[0.35em] text-plum uppercase font-sans font-bold inline-block mb-3">
            Legacy Commissions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-obsidian leading-tight">
            Tailor Your Investment
          </h2>
          <p className="text-charcoal/60 text-sm md:text-base font-light mt-4">
            Build your personalized creative package. Select parameters below to calculate dynamic pricing estimates and design your custom coverage.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Multi-Step Interactive Form */}
          <div className="lg:col-span-7 bg-white rounded-[2rem] p-6 sm:p-8 md:p-12 border border-warm-gray/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
            
            {/* Form Progress Header */}
            <div className="flex justify-between items-start sm:items-center mb-8 sm:mb-12 pb-8 border-b border-warm-gray/30 gap-2 sm:gap-0 overflow-x-auto hide-scrollbar" aria-label="Progress">
              {steps.map((s, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center flex-1 text-center relative ${index < steps.length - 1 ? "after:content-[''] after:h-[1px] after:bg-warm-gray/50 after:w-full after:absolute after:top-4 after:left-1/2 after:-z-10" : ""
                    }`}
                  aria-current={currentStep === index ? "step" : undefined}
                >
                  <button
                    onClick={() => {
                      if (index === 0) {
                        setCurrentStep(0);
                      } else {
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
                          setCurrentStep(0);
                        } else {
                          setCurrentStep(index);
                        }
                      }
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 z-10 relative ${
                      currentStep === index 
                        ? 'bg-gradient-to-br from-plum to-orchid text-white shadow-[0_8px_20px_rgba(218,112,214,0.3)] ring-4 ring-orchid/10 scale-110' 
                        : currentStep > index 
                          ? 'bg-obsidian text-white shadow-md' 
                          : 'border-2 border-warm-gray/50 bg-white text-charcoal/40 hover:border-charcoal/30 hover:text-charcoal/60'
                    }`}
                  >
                    {currentStep > index ? <Check size={14} /> : index + 1}
                  </button>
                  <span className={`text-[10px] tracking-wider uppercase font-semibold mt-2 hidden sm:block ${currentStep === index ? 'text-plum' : 'text-charcoal/60'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Success Overlay Panel */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6 border border-emerald-100"
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  <h3 className="font-serif text-3xl text-obsidian mb-3">
                    Commission Request Received
                  </h3>
                  <p className="text-charcoal/60 text-sm max-w-sm mb-6 font-sans font-light">
                    Thank you, {formData.fullName}. Your custom investment proposal has been queued under quote ID <span className="font-mono font-bold text-plum">{quoteId}</span>. Our lead director will get in touch with you within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button
                      onClick={triggerPdfDownload}
                      className="inline-flex items-center justify-center bg-ivory border border-warm-gray text-charcoal px-6 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-warm-gray/40"
                    >
                      <Download size={14} className="mr-2" />
                      Save Branded PDF
                    </button>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setCurrentStep(0);
                        setFormData({
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
                      }}
                      className="bg-obsidian text-white px-6 py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-plum"
                    >
                      Configure Another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* STEP 1: CONTACT DETAILS (UNLOCK ESTIMATOR) */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-serif text-charcoal mb-2">Visual Legacy Inquiry Details</h3>
                    <p className="text-xs text-charcoal/50 mb-6 font-light">
                      Please enter your details below to unlock the dynamic pricing calculator and crew recommendation planner.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col relative">
                      <label htmlFor="fullName" className="text-xs uppercase tracking-widest text-charcoal/60 mb-2 font-medium">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 w-4.5 h-4.5 text-charcoal/30" />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          required
                          autoComplete="name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Your full name"
                          aria-describedby={errors.fullName ? "fullName-error" : undefined}
                          className={`w-full bg-ivory/50 border rounded-lg py-3 pl-10 pr-4 text-sm text-charcoal focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum/30 transition-colors ${errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-warm-gray/60'
                            }`}
                        />
                      </div>
                      {errors.fullName && touched.fullName && (
                        <span id="fullName-error" className="text-[10px] text-red-500 font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col relative">
                      <label htmlFor="email" className="text-xs uppercase tracking-widest text-charcoal/60 mb-2 font-medium">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-4.5 h-4.5 text-charcoal/30" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="your.email@domain.com"
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={`w-full bg-ivory/50 border rounded-lg py-3 pl-10 pr-4 text-sm text-charcoal focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum/30 transition-colors ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-warm-gray/60'
                            }`}
                        />
                      </div>
                      {errors.email && touched.email && (
                        <span id="email-error" className="text-[10px] text-red-500 font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col relative">
                      <label htmlFor="phone" className="text-xs uppercase tracking-widest text-charcoal/60 mb-2 font-medium">Contact Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 w-4.5 h-4.5 text-charcoal/30" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          autoComplete="tel"
                          inputMode="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="+91 XXXXX XXXXX"
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          className={`w-full bg-ivory/50 border rounded-lg py-3 pl-10 pr-4 text-sm text-charcoal focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum/30 transition-colors ${errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-warm-gray/60'
                            }`}
                        />
                      </div>
                      {errors.phone && touched.phone && (
                        <span id="phone-error" className="text-[10px] text-red-500 font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.phone}
                        </span>
                      )}
                    </div>

                    {/* Target Date */}
                    <div className="flex flex-col relative">
                      <label htmlFor="eventDate" className="text-xs uppercase tracking-widest text-charcoal/60 mb-2 font-medium">Celebration Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 w-4.5 h-4.5 text-charcoal/30" />
                        <input
                          type="date"
                          id="eventDate"
                          name="eventDate"
                          required
                          value={formData.eventDate}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          aria-describedby={errors.eventDate ? "eventDate-error" : undefined}
                          className={`w-full bg-ivory/50 border rounded-lg py-3 pl-10 pr-4 text-sm text-charcoal focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum/30 transition-colors ${errors.eventDate ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-warm-gray/60'
                            }`}
                        />
                      </div>
                      {errors.eventDate && touched.eventDate && (
                        <span id="eventDate-error" className="text-[10px] text-red-500 font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle size={10} /> {errors.eventDate}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: EVENT DETAILS */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-lg font-serif text-charcoal mb-4">Choose Celebration Format</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(Object.keys(PRICING.events) as EventType[]).map((type) => {
                        const evt = PRICING.events[type];
                        const isSelected = formData.eventType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, eventType: type }))}
                            className={`flex flex-col p-6 rounded-2xl border-2 text-left transition-all duration-300 relative group cursor-pointer ${
                              isSelected 
                                ? 'border-plum bg-plum/[0.02] shadow-[0_8px_30px_rgba(139,51,127,0.12)] -translate-y-1' 
                                : 'border-warm-gray/30 bg-white hover:border-plum/30 hover:shadow-md hover:-translate-y-1'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute right-4 top-4 w-5 h-5 rounded-full bg-plum text-white flex items-center justify-center shadow-md">
                                <Check size={12} />
                              </div>
                            )}
                            <span className={`text-xs font-semibold uppercase tracking-wider mb-2 transition-colors duration-300 ${isSelected ? 'text-plum' : 'text-charcoal/50'}`}>
                              {type === 'wedding' ? '01 / WEDDING' : type === 'prewedding' ? '02 / PRE-WEDDING' : type === 'engagement' ? '03 / ROKA' : '04 / MILESTONE'}
                            </span>
                            <span className="font-serif text-base font-bold text-obsidian mb-2">
                              {evt.name}
                            </span>
                            <span className="text-xs text-charcoal/60 leading-relaxed font-light">
                              {evt.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Shoot Duration Slider */}
                  {!PRICING.events[formData.eventType].isFlat && (
                    <div className="space-y-4 pt-4 border-t border-warm-gray/30">
                      <div className="flex justify-between items-center">
                        <label htmlFor="duration-slider" className="text-sm font-semibold tracking-wider text-charcoal/70 uppercase">
                          Shoot Duration
                        </label>
                        <span className="font-serif italic font-semibold text-lg text-plum">
                          {formData.duration} Day{formData.duration > 1 ? 's' : ''} Coverage
                        </span>
                      </div>
                      <div className="relative pt-2">
                        <input
                          id="duration-slider"
                          type="range"
                          min="1"
                          max="5"
                          value={formData.duration}
                          onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                          className="w-full h-1.5 bg-warm-gray rounded-lg appearance-none cursor-pointer accent-plum"
                        />
                        <div className="flex justify-between text-xs text-charcoal/40 font-mono mt-2 px-1">
                          <span>1 Day</span>
                          <span>2 Days</span>
                          <span>3 Days</span>
                          <span>4 Days</span>
                          <span>5+ Days</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 3: CREW COVERAGE SERVICES */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-serif text-charcoal mb-2">Select Creative Services</h3>
                    <p className="text-xs text-charcoal/50 mb-6 font-light">
                      Customize crew additions to craft the perfect frame composition. Base Candid Photography is included.
                    </p>

                    <div className="space-y-4">
                      {Object.entries(PRICING.services).map(([key, service]) => {
                        const serviceKey = key as keyof typeof formData.services;
                        const isChecked = formData.services[serviceKey];
                        const isFlat = 'flatPrice' in service;
                        const priceText = isFlat
                          ? `${formatCurrency((service as any).flatPrice)} flat`
                          : `${formatCurrency((service as any).pricePerDay)} / day`;

                        return (
                          <div
                            key={key}
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              services: {
                                ...prev.services,
                                [serviceKey]: !prev.services[serviceKey]
                              }
                            }))}
                            className={`flex items-start gap-5 p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                              isChecked 
                                ? 'border-plum bg-plum/[0.02] shadow-[0_8px_30px_rgba(139,51,127,0.12)] -translate-y-1' 
                                : 'border-warm-gray/30 bg-white hover:border-plum/30 hover:shadow-md hover:-translate-y-1'
                            }`}
                          >
                            <div className="pt-0.5">
                              <input
                                type="checkbox"
                                id={`service-${key}`}
                                checked={isChecked}
                                onChange={() => { }} // handled by div click
                                className="w-4 h-4 rounded text-plum border-neutral-300 focus:ring-plum accent-plum cursor-pointer"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start gap-2">
                                <label htmlFor={`service-${key}`} className="font-serif text-base font-bold text-obsidian cursor-pointer">
                                  {service.name}
                                </label>
                                <span className="text-xs font-semibold text-plum font-mono whitespace-nowrap">
                                  +{priceText}
                                </span>
                              </div>
                              <p className="text-xs text-charcoal/60 leading-relaxed font-light mt-1">
                                {service.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Art Books Counter */}
                  <div className="pt-6 border-t border-warm-gray/30 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <h4 className="font-serif text-base font-bold text-obsidian flex items-center gap-2">
                        {PRICING.albums.name}
                      </h4>
                      <p className="text-xs text-charcoal/50 font-light mt-0.5">
                        High-quality physical legacy art books (+{formatCurrency(PRICING.albums.unitPrice)} each)
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, albumCount: Math.max(0, prev.albumCount - 1) }))}
                        className="w-10 h-10 rounded-full border border-warm-gray flex items-center justify-center text-charcoal hover:border-plum hover:text-plum font-semibold transition-colors duration-300 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono text-base font-bold w-6 text-center text-obsidian">
                        {formData.albumCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, albumCount: prev.albumCount + 1 }))}
                        className="w-10 h-10 rounded-full border border-warm-gray flex items-center justify-center text-charcoal hover:border-plum hover:text-plum font-semibold transition-colors duration-300 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: LOGISTICS & SCALE & NOTES */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  {/* Guest scale */}
                  <div>
                    <h3 className="text-lg font-serif text-charcoal mb-2">Guest Scale & Crew Staffing</h3>
                    <p className="text-xs text-charcoal/50 mb-6 font-light">
                      Event size dictates coverage depth. Larger weddings require additional creative professionals for comprehensive coverage.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(Object.keys(PRICING.scale) as ScaleType[]).map((scKey) => {
                        const sc = PRICING.scale[scKey];
                        const isSelected = formData.scale === scKey;
                        return (
                          <button
                            key={scKey}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, scale: scKey }))}
                            className={`flex flex-col p-5 rounded-xl border text-left transition-all duration-300 relative cursor-pointer ${isSelected
                                ? 'border-plum bg-plum/[0.03] shadow-[0_4px_20px_rgba(139,51,127,0.08)] ring-1 ring-plum/20'
                                : 'border-warm-gray hover:border-plum/40 hover:bg-ivory/30 hover:shadow-md hover:-translate-y-0.5'
                              }`}
                          >
                            <span className="text-[10px] tracking-wider uppercase font-semibold text-charcoal/40 mb-1">
                              {scKey === 'intimate' ? '01 / Intimate' : scKey === 'medium' ? '02 / Medium' : '03 / Grand'}
                            </span>
                            <span className="font-serif text-sm font-bold text-obsidian mb-2">
                              {sc.name}
                            </span>
                            <span className="text-[10px] bg-warm-gray/40 text-charcoal/70 px-2 py-0.5 rounded font-mono inline-block w-fit mt-1">
                              {sc.crewBonus}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Destination Location */}
                  <div className="pt-6 border-t border-warm-gray/30">
                    <h3 className="text-lg font-serif text-charcoal mb-2">Celebration Destination</h3>
                    <p className="text-xs text-charcoal/50 mb-6 font-light">
                      Travel logistics, crew freight, and standard allowances mapped to your venue distance.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {(Object.keys(PRICING.locations) as LocationType[]).map((locKey) => {
                        const loc = PRICING.locations[locKey];
                        const isSelected = formData.location === locKey;
                        return (
                          <button
                            key={locKey}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, location: locKey }))}
                            className={`flex flex-col p-5 rounded-xl border text-left transition-all duration-300 relative cursor-pointer ${isSelected
                                ? 'border-plum bg-plum/[0.03] shadow-[0_4px_20px_rgba(139,51,127,0.08)] ring-1 ring-plum/20'
                                : 'border-warm-gray hover:border-plum/40 hover:bg-ivory/30 hover:shadow-md hover:-translate-y-0.5'
                              }`}
                          >
                            <span className="text-[10px] font-semibold text-plum font-mono mb-1">
                              {loc.price === 0 ? 'Inc.' : `+${formatCurrency(loc.price)}`}
                            </span>
                            <span className="font-serif text-sm font-bold text-obsidian">
                              {loc.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="pt-6 border-t border-warm-gray/30 flex flex-col relative">
                    <label htmlFor="notes" className="text-xs uppercase tracking-widest text-charcoal/60 mb-2 font-medium">Creative Vision / Special Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Tell us about the dream locations, theme, or custom scheduling setups..."
                      className="w-full bg-ivory/50 border border-warm-gray/60 rounded-lg p-4 text-sm text-charcoal focus:outline-none focus:border-plum focus:ring-1 focus:ring-plum/30 transition-colors resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Navigation Action Panel */}
              <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-0 pt-8 border-t border-warm-gray/30">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className={`inline-flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal/70 hover:text-plum py-3 sm:py-0 transition-colors cursor-pointer ${currentStep === 0 ? 'hidden sm:invisible sm:flex sm:pointer-events-none' : 'flex'
                    }`}
                >
                  <ArrowLeft size={14} /> Back
                </button>

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex justify-center items-center gap-3 bg-obsidian hover:bg-plum text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(139,51,127,0.3)] hover:-translate-y-1 cursor-pointer w-full sm:w-auto"
                  >
                    {currentStep > 0 && <span className="mr-3 border-r border-white/20 pr-4">{formatCurrency(pricingSummary.grandTotal)}</span>}
                    Next Step <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-plum to-orchid text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-500 shadow-lg hover:shadow-plum/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Submitting...' : 'Initiate Inquiry'}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Live Estimate Summary Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 mt-8 lg:mt-0">
            <div className="bg-obsidian text-white rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
              {/* Lock Overlay when on Step 1 (currentStep === 0) */}
              <AnimatePresence>
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-obsidian/90 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-8 select-none"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-orchid mb-6 border border-white/10 shadow-[0_0_20px_rgba(218,112,214,0.15)]">
                      <Lock size={24} className="text-orchid animate-pulse" />
                    </div>
                    <h4 className="font-serif text-xl text-white tracking-wide mb-3">
                      Calculator Locked
                    </h4>
                    <p className="text-xs text-white/50 max-w-[260px] leading-relaxed font-light font-sans">
                      Please enter your contact and event details in the inquiry form to unlock the investment estimator and custom package builder.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Artistic top border glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-plum via-orchid to-transparent"></div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-lg md:text-xl tracking-wide text-white/90">
                  Investment Summary
                </h3>
                <span className="font-mono text-[10px] tracking-widest bg-white/10 text-white/60 px-2 py-0.5 rounded">
                  {quoteId}
                </span>
              </div>

              {/* Package Details Itemized list */}
              <div className="space-y-4 mb-6 border-b border-white/10 pb-6 text-xs text-white/70">

                {/* Event Base item */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="font-semibold block text-white">
                      {PRICING.events[formData.eventType].name}
                    </span>
                    <span className="text-white/40 block mt-0.5">
                      {PRICING.events[formData.eventType].isFlat ? 'Flat rate' : `${formData.duration} Day(s) coverage`}
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-white">
                    {formatCurrency(pricingSummary.basePriceTotal)}
                  </span>
                </div>

                {/* Selected services list */}
                {Object.entries(formData.services).some(([_, val]) => val) && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-white/30 block font-bold">Crew Additions</span>
                    {formData.services.cinematicVideo && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Cinematic Film & Teaser</span>
                        <span className="font-mono text-white/80">
                          +{formatCurrency(PRICING.services.cinematicVideo.pricePerDay * (PRICING.events[formData.eventType].isFlat ? 1 : formData.duration))}
                        </span>
                      </div>
                    )}
                    {formData.services.traditionalPhoto && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Traditional Coverage</span>
                        <span className="font-mono text-white/80">
                          +{formatCurrency(PRICING.services.traditionalPhoto.pricePerDay * formData.duration)}
                        </span>
                      </div>
                    )}
                    {formData.services.droneAerial && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Drone Aerial Video</span>
                        <span className="font-mono text-white/80">
                          +{formatCurrency(PRICING.services.droneAerial.pricePerDay * formData.duration)}
                        </span>
                      </div>
                    )}
                    {formData.services.sameDayEdit && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/60">Same-Day Edit Video</span>
                        <span className="font-mono text-white/80">
                          +{formatCurrency(PRICING.services.sameDayEdit.flatPrice)}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Legacy Albums item */}
                {formData.albumCount > 0 && (
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-white/60">{formData.albumCount} x Premium Legacy Album(s)</span>
                    <span className="font-mono text-white/80">
                      +{formatCurrency(pricingSummary.albumsTotal)}
                    </span>
                  </div>
                )}

                {/* Guest Scale item */}
                {formData.scale !== 'intimate' && (
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-white/60">Scale: {PRICING.scale[formData.scale].name}</span>
                    <span className="font-mono text-white/80">
                      +{formatCurrency(pricingSummary.scalePrice)}
                    </span>
                  </div>
                )}

                {/* Location logistics item */}
                {formData.location !== 'local' && (
                  <div className="flex justify-between items-center pt-2 border-t border-white/5">
                    <span className="text-white/60">Logistics: {PRICING.locations[formData.location].name}</span>
                    <span className="font-mono text-white/80">
                      +{formatCurrency(pricingSummary.logisticsPrice)}
                    </span>
                  </div>
                )}
              </div>

              {/* Crew Recommendations Widget */}
              <div className="bg-white/5 rounded-xl p-4 mb-8 text-xs text-white/80 space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-white/40 block font-bold">Recommended Production Crew</span>
                <ul className="space-y-1.5 font-sans font-light">
                  {getCrewComposition().map((member, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orchid"></span>
                      {member}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grand Total Counter */}
              <div className="space-y-2 mb-8">
                <span className="text-[10px] uppercase tracking-widest text-white/40 block font-semibold">Estimated Total</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-serif font-bold text-orchid tracking-tight">
                    {formatCurrency(pricingSummary.grandTotal)}
                  </span>
                  <span className="text-white/50 text-[10px] uppercase font-mono">INR</span>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed italic">
                  *This estimate excludes travel/lodging expenses for destination shoots which are billed at actuals.
                </p>
              </div>

              {/* Branded PDF Actions */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={triggerPdfDownload}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 border border-white/10 cursor-pointer"
                >
                  <Download size={14} /> PDF
                </button>
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex-[2] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-plum to-orchid text-white py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-orchid/20 shadow-lg cursor-pointer"
                  >
                    Lock Estimate
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-[2] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-plum to-orchid text-white py-4 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:shadow-orchid/20 shadow-lg cursor-pointer"
                  >
                    {isSubmitting ? 'Securing...' : 'Secure Date'}
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
