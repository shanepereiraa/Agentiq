import React, { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How does the AI handle Hindi and Hinglish queries?',
      a: 'Our models are natively fine-tuned on real Indian conversational nuance. When a customer texts "table book karna hai for 4 people aaj raat 8 baje" or speaks casually, AgentIQ understands the intent, verifies availability, and replies in natural, polite Hinglish or clear English without missing details.'
    },
    {
      q: 'How is AgentIQ different from tools like Wati or Interakt?',
      a: 'Wati, Interakt, and Aisensy are broadcast marketing & basic rule-based button builder tools where you must manually script every branching menu tree. AgentIQ is an autonomous AI agency service: we build full LLM + voice assistants with live CRM/database tools, custom logic, zero-maintenance, and continuous weekly tuning.'
    },
    {
      q: 'What are the Meta WhatsApp conversation costs?',
      a: 'We connect directly to your official Meta Cloud API account. Meta charges ~₹0.70 to ₹0.85 per 24-hour service conversation in India with zero markup from AgentIQ. There are no hidden per-message penalties, and all customer-initiated service windows within 24 hours are covered under standard Meta rates.'
    },
    {
      q: 'Can the Voice Agent transfer angry customers to human staff?',
      a: 'Yes. Naina Voice AI continuously analyzes caller sentiment and intent. If a caller requests a human, exhibits high frustration, or requires VIP exception handling, the AI executes a warm live SIP transfer or alerts on-duty staff via WhatsApp with the live call transcript in under 2 seconds.'
    },
    {
      q: 'How long does full onboarding and setup take?',
      a: 'Standard production deployments are live within 7 business days. We ingest your menus, price sheets, and policies on Day 1-2, test conversational edge-cases on Day 3-4, integrate with your CRM/POS on Day 5-6, and launch with live staff shadow testing on Day 7.'
    },
    {
      q: 'Can I connect my existing POS (Petpooja) or Shopify store?',
      a: 'Yes! We natively connect with Petpooja, Clinicea, Practo, Shopify, WooCommerce, Zoho CRM, HubSpot, Google Sheets, Google Calendar, and custom REST API endpoints for real-time inventory and booking push/pull.'
    }
  ];

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative py-16 sm:py-24 px-5 overflow-hidden" id="faq-section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            ❓ Common Questions
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Frequently Asked <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Everything you need to know about implementing autonomous AI for your business.
          </p>
        </div>

        {/* 2-Column Responsive Accordion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'bg-slate-900/90 border-cyan-500/40 shadow-xl' : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white focus:outline-none"
                >
                  <span>{item.q}</span>
                  <span className={`text-cyan-400 text-lg transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm">
            Have a custom workflow question?{' '}
            <a
              href="https://wa.me/919159665277?text=Hi%20AgentIQ%2C%20I%20have%20a%20question%20about%20your%20solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-cyan-400 font-medium underline-offset-4 hover:underline"
            >
              Chat directly with our solutions team on WhatsApp →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
