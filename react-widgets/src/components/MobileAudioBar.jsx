import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BAR_COUNT = 4;

function Visualizer({ playing }) {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full"
          style={{ background: '#22D3EE' }}
          animate={playing ? { height: ['30%', '100%', '45%', '80%', '30%'] } : { height: '30%' }}
          transition={playing ? { duration: 1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 } : { duration: 0.2 }}
        />
      ))}
    </div>
  );
}

export default function MobileAudioBar() {
  const [track, setTrack] = useState(null); // { label, playing, audio }
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function handleAudioState(e) {
      setDismissed(false);
      setTrack(e.detail);
    }
    window.addEventListener('agentiq:audio-state', handleAudioState);
    return () => window.removeEventListener('agentiq:audio-state', handleAudioState);
  }, []);

  const visible = track && track.playing && !dismissed;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          className="fixed top-4 left-4 right-4 z-50 md:hidden flex items-center gap-3 pl-3 pr-2 py-2.5 rounded-full"
          style={{
            background: 'rgba(10,14,28,0.9)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 12px 30px -8px rgba(34,211,238,.35)',
          }}
        >
          <Visualizer playing={track.playing} />
          <span className="flex-1 min-w-0 text-white text-xs font-medium truncate">{track.label}</span>
          <button
            onClick={() => (track.audio.paused ? track.audio.play() : track.audio.pause())}
            aria-label={track.playing ? 'Pause' : 'Play'}
            className="grid place-items-center w-8 h-8 rounded-full text-white shrink-0"
            style={{ background: 'rgba(255,255,255,0.10)' }}
          >
            {track.playing ? (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
            ) : (
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
          <button
            onClick={() => {
              track.audio.pause();
              setDismissed(true);
            }}
            aria-label="Close audio bar"
            className="grid place-items-center w-8 h-8 rounded-full text-slate-400 shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
