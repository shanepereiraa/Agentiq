import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INDUSTRIES = [
  {
    id: 'restaurants',
    label: 'Restaurants',
    accent: '#FF6B5C',
    title: 'Restaurants & Cafés',
    desc: 'WhatsApp food ordering, table reservations, menu sharing and payment links — no missed orders at peak hours.',
    tags: ['Food ordering', 'Reservations', 'Payments'],
    href: '/restaurants',
  },
  {
    id: 'retail',
    label: 'Retail & D2C',
    accent: '#3B82F6',
    title: 'Retail & D2C',
    desc: 'Product discovery, order tracking and cart recovery across WhatsApp & Instagram.',
    tags: ['Product discovery', 'Order tracking', 'Cart recovery'],
    href: '#book',
  },
  {
    id: 'salons',
    label: 'Salons',
    accent: '#FF9F45',
    title: 'Salons & Spas',
    desc: 'Appointment booking from Instagram & WhatsApp, stylist selection, reminders and rebooking nudges that cut no-shows.',
    tags: ['Bookings', 'Reminders', 'Rebooking'],
    href: '/salons',
  },
  {
    id: 'clinics',
    label: 'Clinics',
    accent: '#22D3EE',
    title: 'Clinics & Hospitals',
    desc: 'Appointment scheduling by department, doctor availability, pre-visit forms and report follow-ups — on web & WhatsApp.',
    tags: ['Appointments', 'Triage', 'Forms'],
    href: '/clinics',
  },
  {
    id: 'coaching',
    label: 'Coaching',
    accent: '#A78BFA',
    title: 'Coaching & Education',
    desc: 'Answer course queries, capture admission leads and schedule counselling calls.',
    tags: ['Course FAQs', 'Admissions', 'Counselling calls'],
    href: '#book',
  },
  {
    id: 'hotels',
    label: 'Hotels & Travel',
    accent: '#34D399',
    title: 'Hotels, Resorts & Travel',
    desc: 'Handle room bookings, answer guest FAQs, collect advance payments, and automate check-in details over WhatsApp & voice calls.',
    tags: ['Direct bookings', 'Guest FAQs', 'Check-in'],
    href: '#book',
  },
];

export default function MobileSwipeTabs() {
  const [activeId, setActiveId] = useState(INDUSTRIES[0].id);
  const tabRefs = useRef({});
  const active = INDUSTRIES.find((i) => i.id === activeId);

  const selectTab = (id) => {
    setActiveId(id);
    tabRefs.current[id]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <div className="block md:hidden w-full">
      <div
        className="sticky top-16 z-10 flex gap-2 overflow-x-auto px-4 py-3 -mx-4"
        style={{
          scrollbarWidth: 'none',
          scrollSnapType: 'x mandatory',
          background: 'rgba(6,15,40,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {INDUSTRIES.map((industry) => {
          const isActive = industry.id === activeId;
          return (
            <button
              key={industry.id}
              ref={(el) => (tabRefs.current[industry.id] = el)}
              onClick={() => selectTab(industry.id)}
              className="shrink-0 px-4 py-2.5 min-h-[44px] flex items-center rounded-full text-sm font-semibold whitespace-nowrap"
              style={{
                scrollSnapAlign: 'center',
                background: isActive ? industry.accent : 'rgba(255,255,255,0.06)',
                color: isActive ? '#0a0e1c' : '#94A3B8',
                border: `1px solid ${isActive ? industry.accent : 'rgba(255,255,255,0.10)'}`,
              }}
            >
              {industry.label}
            </button>
          );
        })}
      </div>

      <div className="px-4 pt-5">
        <AnimatePresence mode="wait">
          <motion.article
            key={active.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22 }}
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)' }}
          >
            <h3 className="font-display font-bold text-white text-xl mb-2">{active.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{active.desc}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {active.tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
            <a href={active.href} className="text-sm font-semibold" style={{ color: active.accent }}>
              See {active.label.toLowerCase()} solution →
            </a>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
