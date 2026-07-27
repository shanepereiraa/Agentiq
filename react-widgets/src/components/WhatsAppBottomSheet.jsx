import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_NUMBER = '919159665277';
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hey Agent IQ, I'd like to test your AI bot for my business"
)}`;
const TEL_HREF = `tel:+${WA_NUMBER}`;

export default function WhatsAppBottomSheet({ open: openProp, onClose } = {}) {
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? openProp : internalOpen;

  const close = () => (isControlled ? onClose?.() : setInternalOpen(false));

  return (
    <>
      {!isControlled && (
        <button
          onClick={() => setInternalOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full text-white text-sm font-semibold shadow-xl md:hidden"
          style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 10px 30px -8px rgba(37,211,102,.5)' }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
          </svg>
          Try It Now
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 backdrop-blur-sm bg-black/60"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 100) close();
              }}
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl px-5 pt-3 pb-8"
              style={{ background: '#0a0e1c', border: '1px solid rgba(255,255,255,0.10)', borderBottom: 'none' }}
            >
              <div className="w-10 h-1.5 rounded-full mx-auto mb-6" style={{ background: 'rgba(255,255,255,0.25)' }} />

              <h3 className="text-white font-display font-bold text-xl text-center mb-1">Talk to Agent IQ</h3>
              <p className="text-slate-400 text-sm text-center mb-6">Pick whichever's easier — both connect instantly.</p>

              <div className="space-y-3">
                <a
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-semibold text-base"
                  style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                  </svg>
                  Start WhatsApp Demo
                </a>

                <a
                  href={TEL_HREF}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-semibold text-base"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call AI Voice Agent
                </a>
              </div>

              <button onClick={close} className="w-full text-center text-slate-500 text-sm mt-5">
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
