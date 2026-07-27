import { useState } from 'react';

function ChevronIcon({ direction }) {
  const d = direction === 'left' ? 'm15 18-6-6 6-6' : 'm9 18 6-6-6-6';
  return (
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function ChaosInbox() {
  return (
    <div className="absolute inset-0 p-5 sm:p-6" style={{ background: 'linear-gradient(160deg,#1a0f0f,#1f1414)' }}>
      <p className="text-xs font-semibold uppercase tracking-wide text-red-400 mb-4">Before Agent IQ</p>
      <div className="space-y-2.5">
        {[
          { name: 'Unknown +91 98xxx', preview: 'Sir order kab aayega???', badge: 3 },
          { name: 'Priya', preview: 'hello hello are you there', badge: 12 },
          { name: 'Missed Call', preview: '+91 90xxx · 4 attempts', badge: null, missed: true },
          { name: 'Rahul K.', preview: 'refund chahiye urgent!!', badge: 7 },
          { name: 'Unknown +91 88xxx', preview: 'booking cancel karna hai', badge: 5 },
        ].map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,90,90,0.15)', transform: i % 2 ? 'rotate(-0.4deg)' : 'rotate(0.4deg)' }}
          >
            <div className="min-w-0">
              <p className="text-sm text-slate-300 truncate">{row.name}</p>
              <p className="text-xs text-slate-500 truncate">{row.preview}</p>
            </div>
            {row.missed ? (
              <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 2 2 16M2 2l14 14" />
              </svg>
            ) : (
              <span className="grid place-items-center w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold shrink-0">
                {row.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderedInbox() {
  return (
    <div className="absolute inset-0 p-5 sm:p-6" style={{ background: 'linear-gradient(160deg,#08101e,#0a1520)' }}>
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400 mb-4">After Agent IQ</p>
      <div className="space-y-2.5">
        {[
          { name: 'Priya Sharma', preview: 'Table for 2, Saturday 7:30 PM', tag: 'Booking Confirmed', tone: 'green' },
          { name: 'Rahul Mehta', preview: 'Refund processed — order #4821', tag: 'Resolved', tone: 'green' },
          { name: 'Ananya Iyer', preview: 'Will call back tomorrow re: pricing', tag: 'Follow-up', tone: 'amber' },
          { name: 'Karthik Reddy', preview: 'Confirmed delivery for Friday', tag: 'Booking Confirmed', tone: 'green' },
          { name: 'Meera K.', preview: 'Asked about bulk order discount', tag: 'Follow-up', tone: 'amber' },
        ].map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="min-w-0">
              <p className="text-sm text-white truncate">{row.name}</p>
              <p className="text-xs text-slate-400 truncate">{row.preview}</p>
            </div>
            <span
              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${
                row.tone === 'green' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-400/15 text-amber-300'
              }`}
            >
              {row.tag}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-4 text-xs text-slate-500">
        <span className="grid place-items-center w-4 h-4 rounded-full bg-slate-600 text-white text-[9px] font-bold">0</span>
        unread — all handled automatically
      </div>
    </div>
  );
}

export default function InboxComparisonSlider() {
  const [value, setValue] = useState(50);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden select-none"
        style={{ border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 30px 80px -20px rgba(0,0,0,.6)' }}
      >
        <OrderedInbox />

        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
          <ChaosInbox />
        </div>

        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: `${value}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-0.5 h-full mx-auto" style={{ background: 'rgba(34,211,238,0.8)', boxShadow: '0 0 16px rgba(34,211,238,0.7)' }} />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full text-white"
            style={{ background: 'linear-gradient(135deg,#22D3EE,#3B82F6)', boxShadow: '0 0 20px rgba(34,211,238,0.6)' }}
          >
            <div className="flex items-center gap-0.5">
              <ChevronIcon direction="left" />
              <ChevronIcon direction="right" />
            </div>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label="Drag to compare before and after inbox"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0"
        />
      </div>
      <p className="text-center text-xs text-slate-500 mt-4">Drag to compare — chaos vs. Agent IQ order</p>
    </div>
  );
}
