import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_NUMBER = '919159665277';

const STORIES = [
  {
    id: 'restaurant',
    name: 'Restaurant',
    avatar: 'R',
    accent: '#FF6B5C',
    lines: [
      { from: 'customer', text: 'Table for 4 tonight at 8? 🍽️' },
      { from: 'bot', text: 'Booked! ✅ Table for 4 at 8 PM confirmed. Want to pre-order starters?' },
      { from: 'customer', text: 'Yes — 2 Paneer Tikka 🍢' },
      { from: 'bot', text: 'Added 2× Paneer Tikka (₹520). Pay now or at the table?' },
    ],
  },
  {
    id: 'salon',
    name: 'Salon',
    avatar: 'S',
    accent: '#FF9F45',
    lines: [
      { from: 'customer', text: 'Kal 3:30 ka slot free hai kya?' },
      { from: 'bot', text: 'Haan bilkul! Riya available hain 3:30 PM. Confirm karu?' },
      { from: 'customer', text: 'Haan, confirm kar do' },
      { from: 'bot', text: 'Done ✅ Reminder bhej denge ek din pehle.' },
    ],
  },
  {
    id: 'd2c',
    name: 'D2C',
    avatar: 'D',
    accent: '#22D3EE',
    lines: [
      { from: 'customer', text: "I left something in my cart yesterday" },
      { from: 'bot', text: 'Noticed that! Your cart has 1× Serum (₹899). Want 10% off to complete it?' },
      { from: 'customer', text: 'Sure, send the link' },
      { from: 'bot', text: 'Here you go — code SAVE10 applied. Link expires in 1 hour ⏰' },
    ],
  },
  {
    id: 'clinic',
    name: 'Clinic',
    avatar: 'C',
    accent: '#3B82F6',
    lines: [
      { from: 'customer', text: 'I need to see a dermatologist this week' },
      { from: 'bot', text: 'Dr. Mehta has an opening Thursday 5 PM. Shall I book it?' },
      { from: 'customer', text: 'Yes please' },
      { from: 'bot', text: 'Confirmed for Thursday 5 PM. A pre-visit form link is on its way.' },
    ],
  },
];

const LINE_DURATION = 3000;

function StoryModal({ story, onClose }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const rafRef = useRef();
  const lastTsRef = useRef();

  useEffect(() => {
    if (paused) {
      lastTsRef.current = undefined;
      return;
    }
    function tick(ts) {
      if (lastTsRef.current === undefined) lastTsRef.current = ts;
      const delta = ts - lastTsRef.current;
      lastTsRef.current = ts;
      setElapsed((prev) => {
        const next = prev + delta;
        if (next >= LINE_DURATION) {
          setLineIndex((i) => {
            if (i >= story.lines.length - 1) {
              onClose();
              return i;
            }
            return i + 1;
          });
          return 0;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, lineIndex]);

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hi Agent IQ, I just watched the ${story.name} demo — can you show me more?`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] grid place-items-center"
      style={{ background: 'rgba(0,0,0,0.9)' }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative w-full max-w-sm h-full sm:h-[85vh] sm:rounded-3xl overflow-hidden flex flex-col"
        style={{ background: 'linear-gradient(160deg,#0a0e1c,#08101e)' }}
        onClick={() => setPaused((p) => !p)}
      >
        {/* progress segments */}
        <div className="absolute top-3 left-3 right-3 z-10 flex gap-1.5">
          {story.lines.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.25)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  background: '#fff',
                  width: i < lineIndex ? '100%' : i === lineIndex ? `${(elapsed / LINE_DURATION) * 100}%` : '0%',
                  transition: i === lineIndex ? 'none' : 'width .2s',
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="grid place-items-center w-8 h-8 rounded-full text-white text-xs font-bold"
              style={{ background: story.accent }}
            >
              {story.avatar}
            </span>
            <span className="text-white text-sm font-semibold">{story.name}</span>
            {paused && <span className="text-white/60 text-xs">Paused</span>}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close story"
            className="grid place-items-center w-8 h-8 rounded-full text-white"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-3 px-6 pt-16 pb-28">
          {story.lines.slice(0, lineIndex + 1).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                line.from === 'bot' ? 'ml-auto text-white rounded-tr-md' : 'text-slate-100 rounded-tl-md'
              }`}
              style={{
                background: line.from === 'bot' ? `linear-gradient(135deg,${story.accent},#00000030)` : 'rgba(255,255,255,0.08)',
              }}
            >
              {line.text}
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(0deg,rgba(0,0,0,.6),transparent)' }}>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)' }}
          >
            Try This Bot on WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StoriesDemo() {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <div className="w-full">
      <div className="flex justify-center items-center gap-4 sm:gap-6 mx-auto overflow-x-auto px-1 py-1" style={{ scrollbarWidth: 'none' }}>
        {STORIES.map((story) => (
          <button
            key={story.id}
            onClick={() => setActiveStory(story)}
            className="flex flex-col items-center gap-2 shrink-0"
          >
            <span
              className="grid place-items-center w-16 h-16 rounded-full p-[2.5px]"
              style={{ background: 'linear-gradient(135deg,#34D399,#6366F1)' }}
            >
              <span className="grid place-items-center w-full h-full rounded-full text-white text-lg font-bold" style={{ background: '#0a0e1c' }}>
                {story.avatar}
              </span>
            </span>
            <span className="text-xs text-slate-300">{story.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeStory && <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />}
      </AnimatePresence>
    </div>
  );
}
