import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OPTIONS = [
  { value: 'en', label: 'English', message: 'How can I help?' },
  { value: 'hi', label: 'Hindi', message: 'Main aapki kaise madad kar sakta hoon?' },
  { value: 'hi-en', label: 'Hinglish', message: 'Main aapki help kaise kar sakta hoon?' },
];

export default function LanguageToggle() {
  const [active, setActive] = useState('en');
  const activeOption = OPTIONS.find((o) => o.value === active);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className="relative flex items-center gap-1 p-1 rounded-full mb-5"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}
        role="tablist"
        aria-label="Chat language"
      >
        {OPTIONS.map((opt) => {
          const isActive = opt.value === active;
          return (
            <button
              key={opt.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(opt.value)}
              className="relative flex-1 px-3 py-2 rounded-full text-sm font-semibold text-center transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="language-toggle-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(135deg,#FF6B5C,#FF9F45)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }}
      >
        <div className="flex items-start gap-3">
          <span
            className="grid place-items-center w-9 h-9 rounded-full text-white text-xs font-bold shrink-0"
            style={{ background: 'linear-gradient(135deg,#FF6B5C,#FF9F45)' }}
          >
            AI
          </span>
          <div
            className="rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-100 min-h-[3rem] flex items-center"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeOption.value}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {activeOption.message}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
