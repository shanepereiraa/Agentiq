import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BAR_COUNT = 5;

function Waveform() {
  return (
    <div className="flex items-center gap-1 h-6">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full"
          style={{ background: 'linear-gradient(180deg,#22D3EE,#3B82F6)' }}
          animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}

export default function VoiceOrbWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="panel"
            layoutId="voice-orb"
            className="relative flex items-center gap-3 pl-4 pr-3 py-3 rounded-2xl shadow-2xl"
            style={{
              background: 'rgba(10,14,28,0.85)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 50px -12px rgba(34,211,238,.35)',
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <Waveform />
            <span className="text-sm font-medium text-white whitespace-nowrap">Talk to Agent IQ...</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close voice widget"
              className="grid place-items-center w-7 h-7 rounded-full text-slate-400 hover:text-white transition-colors shrink-0"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="orb"
            layoutId="voice-orb"
            onClick={() => setOpen(true)}
            aria-label="Talk to Agent IQ"
            className="relative grid place-items-center w-16 h-16 rounded-full shadow-2xl"
            style={{ background: 'linear-gradient(135deg,#22D3EE,#3B82F6)' }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(34,211,238,0.45)' }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <svg className="relative z-10 w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
