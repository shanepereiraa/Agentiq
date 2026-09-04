import { createRoot } from 'react-dom/client';
import LanguageToggle from './components/LanguageToggle';
import InboxComparisonSlider from './components/InboxComparisonSlider';
import StoriesDemo from './components/StoriesDemo';
import MobileSwipeTabs from './components/MobileSwipeTabs';
import MobileAudioBar from './components/MobileAudioBar';

const MOUNTS = [
  ['language-toggle-root', LanguageToggle],
  ['inbox-slider-root', InboxComparisonSlider],
  ['stories-demo-root', StoriesDemo],
  ['mobile-swipe-tabs-root', MobileSwipeTabs],
  ['mobile-audio-bar-root', MobileAudioBar],
];

for (const [id, Component] of MOUNTS) {
  const el = document.getElementById(id);
  if (el) createRoot(el).render(<Component />);
}

