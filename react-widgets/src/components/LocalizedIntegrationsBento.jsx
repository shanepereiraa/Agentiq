import { motion } from 'framer-motion';

const CARD_TRANSITION = { type: 'spring', stiffness: 300, damping: 22 };

function WhatsAppIcon() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2zm0 18.2a8.17 8.17 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1 1 12 20.2zm4.52-6.14c-.25-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.45-1.37-1.7-.14-.24-.02-.37.11-.5.11-.11.25-.29.37-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

function RupeeIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h12M6 8h12M6 3c4 0 7 2 7 5s-3 5-7 5h9M6 13l8 8" />
    </svg>
  );
}

function CrmIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a8 8 0 0 1 16 0v1" />
    </svg>
  );
}

function StorefrontIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9 5 3h14l2 6M3 9v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9h18M9 20v-6h6v6" />
    </svg>
  );
}

function SheetsIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  );
}

const CARDS = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business API',
    desc: 'Every customer conversation — bookings, orders, support — in the app they already use.',
    icon: WhatsAppIcon,
    brand: '#25D366',
    span: 'md:col-span-2',
    large: true,
  },
  {
    id: 'razorpay',
    name: 'Razorpay / UPI',
    desc: 'Payment links and collection, straight from chat.',
    icon: RupeeIcon,
    brand: '#3B82F6',
  },
  {
    id: 'zoho',
    name: 'Zoho CRM',
    desc: 'Every qualified lead synced automatically.',
    icon: CrmIcon,
    brand: '#FF6B5C',
  },
  {
    id: 'indiamart',
    name: 'IndiaMart',
    desc: 'B2B leads captured and routed the moment they land.',
    icon: StorefrontIcon,
    brand: '#FF9F45',
  },
  {
    id: 'sheets',
    name: 'Google Sheets',
    desc: 'Every conversation logged automatically — no manual entry.',
    icon: SheetsIcon,
    brand: '#22D3EE',
  },
];

function IntegrationCard({ card }) {
  const Icon = card.icon;
  return (
    <motion.article
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: `0 20px 45px -12px ${card.brand}59`,
      }}
      transition={CARD_TRANSITION}
      className={`relative rounded-2xl p-6 flex flex-col ${card.span || ''} ${card.large ? 'justify-between' : ''}`}
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', backdropFilter: 'blur(16px)' }}
    >
      <div
        className="grid place-items-center rounded-xl mb-4 shrink-0"
        style={{
          width: card.large ? '3.5rem' : '2.75rem',
          height: card.large ? '3.5rem' : '2.75rem',
          background: `${card.brand}26`,
          color: card.brand,
          boxShadow: `0 0 24px ${card.brand}40`,
        }}
      >
        <Icon />
      </div>
      <h3 className={`font-semibold text-white ${card.large ? 'text-xl' : 'text-base'} mb-2`}>{card.name}</h3>
      <p className={`text-slate-400 leading-relaxed ${card.large ? 'text-sm max-w-md' : 'text-sm'}`}>{card.desc}</p>
    </motion.article>
  );
}

export default function LocalizedIntegrationsBento() {
  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:auto-rows-[minmax(0,1fr)]">
      {CARDS.map((card) => (
        <IntegrationCard key={card.id} card={card} />
      ))}
    </div>
  );
}
