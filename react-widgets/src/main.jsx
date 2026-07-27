import { createRoot } from 'react-dom/client';
import LanguageToggle from './components/LanguageToggle';
import VoiceOrbWidget from './components/VoiceOrbWidget';
import InboxComparisonSlider from './components/InboxComparisonSlider';
import LocalizedIntegrationsBento from './components/LocalizedIntegrationsBento';
import './index.css';

const MOUNTS = [
  ['language-toggle-root', LanguageToggle],
  ['voice-orb-root', VoiceOrbWidget],
  ['inbox-slider-root', InboxComparisonSlider],
  ['integrations-bento-root', LocalizedIntegrationsBento],
];

for (const [id, Component] of MOUNTS) {
  const el = document.getElementById(id);
  if (el) createRoot(el).render(<Component />);
}
