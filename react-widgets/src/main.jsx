import { createRoot } from 'react-dom/client';
import LanguageToggle from './components/LanguageToggle';
import VoiceOrbWidget from './components/VoiceOrbWidget';
import InboxComparisonSlider from './components/InboxComparisonSlider';
import LocalizedIntegrationsBento from './components/LocalizedIntegrationsBento';
import StoriesDemo from './components/StoriesDemo';
import WhatsAppBottomSheet from './components/WhatsAppBottomSheet';
import MobileSwipeTabs from './components/MobileSwipeTabs';
import MobileAudioBar from './components/MobileAudioBar';
import './index.css';

const MOUNTS = [
  ['language-toggle-root', LanguageToggle],
  ['voice-orb-root', VoiceOrbWidget],
  ['inbox-slider-root', InboxComparisonSlider],
  ['integrations-bento-root', LocalizedIntegrationsBento],
  ['stories-demo-root', StoriesDemo],
  ['whatsapp-bottom-sheet-root', WhatsAppBottomSheet],
  ['mobile-swipe-tabs-root', MobileSwipeTabs],
  ['mobile-audio-bar-root', MobileAudioBar],
];

for (const [id, Component] of MOUNTS) {
  const el = document.getElementById(id);
  if (el) createRoot(el).render(<Component />);
}
