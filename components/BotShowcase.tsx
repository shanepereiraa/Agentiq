'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Zap, Phone, BarChart2 } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  statPill: string;
  ctaHref: string;
  ctaLabel: string;
  headerTitle: string;
  headerStatus: string;
  type: 'chat' | 'voice' | 'lead';
  chatMessages?: Array<{ from: 'user' | 'bot'; text: string }>;
  voiceData?: {
    caller: string;
    duration: string;
    transcript: string;
    waveformActive: boolean;
  };
  leadData?: {
    name: string;
    phone: string;
    interest: string;
    status: string;
  };
}

const products: Product[] = [
  {
    id: 'whatsapp',
    badge: 'WHATSAPP COMMERCE & SUPPORT',
    badgeColor: 'emerald',
    title: 'Direct WhatsApp Ordering & FAQ Resolution',
    description: 'Handles menus, table bookings, and customer FAQs in natural Hinglish with direct UPI checkout and POS integration.',
    statPill: '⚡ < 2s Response Time · Hindi + English',
    ctaHref: '/restaurants',
    ctaLabel: 'View WhatsApp Demo',
    headerTitle: 'Spice Garden · Official WhatsApp',
    headerStatus: 'AI Active · Instant replies',
    type: 'chat',
    chatMessages: [
      { from: 'user', text: 'Hi, table for 4 tonight at 8 PM? 🍽️' },
      { from: 'bot', text: 'Namaste! Table for 4 is reserved for 8:00 PM tonight at Spice Garden ✅ Would you like to pre-order starters?' },
      { from: 'user', text: 'Yes please — 2 Butter Naan and 1 Paneer Tikka.' },
      { from: 'bot', text: 'Added 1x Paneer Tikka + 2x Butter Naan (₹540). Click here to pay via UPI or pay at table: upi://pay?pa=spicegarden@icici' },
    ],
  },
  {
    id: 'voice',
    badge: 'AUTONOMOUS VOICE CALLING',
    badgeColor: 'violet',
    title: 'Human-like Inbound Support & Outbound COD Calls',
    description: 'Ultra-low latency AI voice agents answering 24/7 phone calls in Hindi & English, scheduling appointments, and confirming COD orders.',
    statPill: '📞 620ms Median Latency · Bespoke Cloned Voice',
    ctaHref: '/ai-voice-agents-india',
    ctaLabel: 'Listen to Voice AI',
    headerTitle: 'AgentIQ Voice AI · Live Call',
    headerStatus: 'Call in progress (00:42)',
    type: 'voice',
    voiceData: {
      caller: '+91 98201 XXXXX (Mumbai)',
      duration: '00:42',
      transcript: '"Namaste Aarav! I\'m calling from Urban Trends to confirm your Cash-on-Delivery order #9421 for ₹2,499. Is your shipping address in Andheri West correct?"',
      waveformActive: true,
    },
  },
  {
    id: 'omnichannel',
    badge: 'OMNICHANNEL LEAD CAPTURE',
    badgeColor: 'cyan',
    title: 'Website Live Chat & Instagram DM Qualifier',
    description: 'Turn website visitors and Instagram DM inquiries into qualified leads synced directly to Google Sheets and your CRM in real-time.',
    statPill: '📊 Auto-sync to CRM · 24/7 Zero Wait Time',
    ctaHref: '/try-your-bot',
    ctaLabel: 'Try Live Web Bot',
    headerTitle: 'Website Lead Qualification',
    headerStatus: 'Synced to Google Sheets',
    type: 'lead',
    leadData: {
      name: 'Rohan Sharma',
      phone: '+91 91596 65277',
      interest: 'AI Chatbot + Voice Agent',
      status: 'Qualified (Budget: ₹50k+)',
    },
  },
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const current = products[currentIndex];

  return (
    <section id="how" className="relative w-full py-20 bg-[#060f28] overflow-hidden">
      {/* Background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan/10 blur-3xl"></div>
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold text-cyan tracking-widest uppercase mb-3">
            THREE PRODUCTS, ONE BRAIN
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            See our bots in action
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            A single AI assistant, deployed wherever your customers already are. Here's a real sample of each — trained for your industry.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto min-h-[460px] flex items-center">
          
          {/* Prev Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute -left-4 md:-left-7 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-lg backdrop-blur-md cursor-pointer hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Active Product Card */}
          <div className="w-full grid md:grid-cols-2 gap-8 items-center rounded-3xl p-8 md:p-12 bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl transition-all duration-300">
            
            {/* Left Column: Details */}
            <div className="space-y-4">
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${
                current.badgeColor === 'emerald' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                current.badgeColor === 'violet' ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30' :
                'bg-cyan/15 text-cyan border border-cyan/30'
              }`}>
                {current.badge}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {current.title}
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {current.description}
              </p>

              {/* Quick stats pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-medium">
                {current.statPill}
              </div>

              <div className="pt-2">
                <Link
                  href={current.ctaHref}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-coral-deep to-orange-deep hover:brightness-110 transition shadow-lg"
                >
                  {current.ctaLabel} →
                </Link>
              </div>
            </div>

            {/* Right Column: Live Mockup Simulator */}
            <div className="rounded-2xl overflow-hidden bg-white/[0.04] border border-white/10 backdrop-blur-md">
              {/* Header */}
              <div className="px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{current.headerTitle}</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {current.headerStatus}
                  </p>
                </div>
              </div>

              {/* Body depending on type */}
              <div className="p-5 min-h-[240px] flex flex-col justify-center">
                {current.type === 'chat' && current.chatMessages && (
                  <div className="space-y-3 text-xs md:text-sm">
                    {current.chatMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-2xl max-w-[85%] ${
                          msg.from === 'bot'
                            ? 'ml-auto bg-gradient-to-br from-coral-deep to-orange-deep text-white rounded-tr-none'
                            : 'bg-white/10 text-slate-200 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                )}

                {current.type === 'voice' && current.voiceData && (
                  <div className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 h-12">
                      {[40, 70, 95, 60, 80, 100, 75, 45, 90, 65, 85, 50].map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-cyan rounded-full animate-pulse"
                          style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
                        />
                      ))}
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs md:text-sm text-slate-200 italic">
                      {current.voiceData.transcript}
                    </div>
                  </div>
                )}

                {current.type === 'lead' && current.leadData && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs md:text-sm">
                      <span className="text-slate-400">Prospect Name:</span>
                      <span className="text-white font-semibold">{current.leadData.name}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs md:text-sm">
                      <span className="text-slate-400">WhatsApp:</span>
                      <span className="text-emerald-400 font-semibold">{current.leadData.phone}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs md:text-sm">
                      <span className="text-slate-400">Interest:</span>
                      <span className="text-cyan font-semibold">{current.leadData.interest}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center text-xs text-emerald-300 font-semibold">
                      ✓ {current.leadData.status}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute -right-4 md:-right-7 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-lg backdrop-blur-md cursor-pointer hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                i === currentIndex ? 'w-8 bg-cyan' : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
