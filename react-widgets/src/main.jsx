import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar';
import LanguageToggle from './components/LanguageToggle';
import VoiceOrbWidget from './components/VoiceOrbWidget';
import InboxComparisonSlider from './components/InboxComparisonSlider';
import StoriesDemo from './components/StoriesDemo';
import WhatsAppBottomSheet from './components/WhatsAppBottomSheet';
import MobileSwipeTabs from './components/MobileSwipeTabs';
import MobileAudioBar from './components/MobileAudioBar';
import SolutionsBento from './components/SolutionsBento';
import KnowledgeHubGraphic from './components/KnowledgeHubGraphic';
import AnalyticsPreview from './components/AnalyticsPreview';
import IndustryPills from './components/IndustryPills';
import FAQSection from './components/FAQSection';
import './index.css';

const MOUNTS = [
  ['navbar-root', Navbar],
  ['language-toggle-root', LanguageToggle],
  ['voice-orb-root', VoiceOrbWidget],
  ['inbox-slider-root', InboxComparisonSlider],
  ['stories-demo-root', StoriesDemo],
  ['whatsapp-bottom-sheet-root', WhatsAppBottomSheet],
  ['mobile-swipe-tabs-root', MobileSwipeTabs],
  ['mobile-audio-bar-root', MobileAudioBar],
  ['solutions-bento-root', SolutionsBento],
  ['knowledge-hub-root', KnowledgeHubGraphic],
  ['analytics-preview-root', AnalyticsPreview],
  ['industry-pills-root', IndustryPills],
  ['faq-section-root', FAQSection],
];

for (const [id, Component] of MOUNTS) {
  const el = document.getElementById(id);
  if (el) createRoot(el).render(<Component />);
}
