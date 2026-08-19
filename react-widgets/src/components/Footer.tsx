import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaLinkedinIn, FaFacebookF, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-[#05070B] border-t border-white/10 pt-16 pb-12 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* 5-COLUMN MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-4">
            <Link className="inline-block" href="/">
              <span className="text-xl font-bold text-white tracking-tight inline-flex items-baseline gap-0.5">
                Agent<span className="logo-grad-text">IQ</span><svg className="w-2.5 h-2.5 shrink-0" viewBox="0 0 16 14" fill="none" aria-hidden="true" focusable="false"><defs><linearGradient id="iq-wave-pri-ftr-tsx" x1="0" y1="14" x2="16" y2="0"><stop offset="0" stop-color="#FF8A5B"/><stop offset="0.5" stop-color="#FF5C8A"/><stop offset="1" stop-color="#C74AFF"/></linearGradient></defs><rect x="0" y="9" width="3" height="5" rx="1.2" fill="url(#iq-wave-pri-ftr-tsx)"/><rect x="4.5" y="6" width="3" height="8" rx="1.2" fill="url(#iq-wave-pri-ftr-tsx)"/><rect x="9" y="3" width="3" height="11" rx="1.2" fill="url(#iq-wave-pri-ftr-tsx)"/><rect x="13" y="0" width="3" height="14" rx="1.2" fill="url(#iq-wave-pri-ftr-tsx)"/></svg>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed pr-4">
              AI chatbots for Indian businesses — WhatsApp, Instagram & Web.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://wa.me/919159665277" target="_blank" rel="noreferrer" aria-label="AgentIQ on WhatsApp" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                <FaWhatsapp className="w-4 h-4"/>
              </a>
              <a href="https://instagram.com/agentiqco" target="_blank" rel="noreferrer" aria-label="AgentIQ on Instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                <FaInstagram className="w-4 h-4"/>
              </a>
              <a href="https://www.linkedin.com/in/shanepereiraa/" target="_blank" rel="noreferrer" aria-label="Shane Pereira on LinkedIn" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                <FaLinkedinIn className="w-4 h-4"/>
              </a>
              <a href="https://www.facebook.com/people/Agentiq/61590432627451" target="_blank" rel="noreferrer" aria-label="AgentIQ on Facebook" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                <FaFacebookF className="w-4 h-4"/>
              </a>
              <a href="mailto:shane@agentiq.co.in" aria-label="Email AgentIQ" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                <FaEnvelope className="w-4 h-4"/>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Services</h4>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-white transition-colors" href="/ai-chatbot-india">AI Chatbots</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/ai-voice-agents-india">Voice Agents</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/d2c-ecommerce">D2C & E-Commerce</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/restaurants">Restaurants & Cafés</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/salons">Salons & Spas</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/clinics">Clinics & Healthcare</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-white transition-colors" href="/results">Results</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/pricing">Pricing</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/faq">FAQ</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/blog">Blog</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/privacy-security">Security & Privacy</Link></li>
            </ul>
          </div>

          {/* Column 4: Compare & Platforms */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Compare & Platforms</h4>
            <ul className="space-y-2.5">
              <li><Link className="hover:text-white transition-colors" href="/ai-chatbot-india">AI Chatbot India</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/ai-voice-agents-india">AI Voice Agents India</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/agentiq-vs-wati">AgentIQ vs WATI</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/agentiq-vs-yellow-ai">AgentIQ vs Yellow.ai</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="text-gray-300 font-medium">+91 91596 65277</li>
              <li>
                <a href="https://wa.me/919159665277" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  WhatsApp us
                </a>
              </li>
              <li><Link className="hover:text-white transition-colors" href="/#book">Book Free Demo</Link></li>
              <li className="text-gray-400">Mumbai, India 🇮🇳</li>
            </ul>
          </div>

        </div>

        {/* BOTTOM DIVIDER & COPYRIGHT */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AgentIQ. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link className="hover:text-gray-400 transition-colors" href="/privacy">Privacy Policy</Link>
            <Link className="hover:text-gray-400 transition-colors" href="/terms">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
