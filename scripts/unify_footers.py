import os
import re

CLEAN_FOOTER = '''  <!-- FOOTER -->
  <footer class="px-5 pt-16 pb-10 border-t border-white/8">
    <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
        <!-- Brand -->
        <div class="col-span-2 md:col-span-1">
          <a href="/" class="flex items-center gap-2.5 mb-4" aria-label="AgentIQ home">
            <span class="font-display font-700 text-lg text-white tracking-tight inline-flex items-baseline gap-0.5">Agent<span class="logo-grad-text">IQ</span><svg class="w-2.5 h-2.5 shrink-0" viewBox="0 0 16 14" fill="none" aria-hidden="true" focusable="false"><defs><linearGradient id="iq-wave-ftr-clean" x1="0" y1="14" x2="16" y2="0"><stop offset="0" stop-color="#FF8A5B"/><stop offset="0.5" stop-color="#FF5C8A"/><stop offset="1" stop-color="#C74AFF"/></linearGradient></defs><rect x="0" y="9" width="3" height="5" rx="1.2" fill="url(#iq-wave-ftr-clean)"/><rect x="4.5" y="6" width="3" height="8" rx="1.2" fill="url(#iq-wave-ftr-clean)"/><rect x="9" y="3" width="3" height="11" rx="1.2" fill="url(#iq-wave-ftr-clean)"/><rect x="13" y="0" width="3" height="14" rx="1.2" fill="url(#iq-wave-ftr-clean)"/></svg></span>
          </a>
          <p class="text-slate-400 text-sm leading-relaxed max-w-[200px]">AI chatbots for Indian businesses — WhatsApp, Instagram &amp; Web.</p>
          <div class="flex items-center gap-3 mt-5">
            <a href="https://wa.me/919159665277" target="_blank" rel="noopener noreferrer" aria-label="AgentIQ on WhatsApp" class="grid place-items-center w-9 h-9 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/8 text-slate-400 hover:text-emerald-400 transition-colors duration-200">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
            </a>
            <a href="https://instagram.com/agentiqco" target="_blank" rel="noopener noreferrer" aria-label="AgentIQ on Instagram" class="grid place-items-center w-9 h-9 rounded-xl bg-white/5 hover:bg-fuchsia-500/20 border border-white/8 text-slate-400 hover:text-fuchsia-400 transition-colors duration-200">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881"/></svg>
            </a>
            <a href="https://www.facebook.com/people/Agentiq/61590432627451" target="_blank" rel="noopener noreferrer" aria-label="AgentIQ on Facebook" class="grid place-items-center w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-500/20 border border-white/8 text-slate-400 hover:text-blue-400 transition-colors duration-200">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/shanepereiraa/" target="_blank" rel="noopener noreferrer" aria-label="Shane Pereira on LinkedIn" class="grid place-items-center w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-500/20 border border-white/8 text-slate-400 hover:text-blue-400 transition-colors duration-200">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:shane@agentiq.co.in" aria-label="Email AgentIQ" class="grid place-items-center w-9 h-9 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/8 text-slate-400 hover:text-cyan-400 transition-colors duration-200">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
        <!-- Services -->
        <div>
          <p class="text-white font-600 text-sm mb-4">Services</p>
          <ul class="space-y-3 text-sm text-slate-400">
            <li><a href="/ai-chatbot-india" class="hover:text-white transition-colors">AI Chatbots</a></li>
            <li><a href="/ai-voice-agents-india" class="hover:text-white transition-colors">Voice Agents</a></li>
            <li><a href="/restaurants" class="hover:text-white transition-colors">Restaurants &amp; Cafés</a></li>
            <li><a href="/salons" class="hover:text-white transition-colors">Salons &amp; Spas</a></li>
            <li><a href="/clinics" class="hover:text-white transition-colors">Clinics &amp; Healthcare</a></li>
            <li><a href="/d2c-ecommerce" class="hover:text-white transition-colors">D2C &amp; E-Commerce</a></li>
          </ul>
        </div>
        <!-- Company -->
        <div>
          <p class="text-white font-600 text-sm mb-4">Company</p>
          <ul class="space-y-3 text-sm text-slate-400">
            <li><a href="/#results" class="hover:text-white transition-colors">Results</a></li>
            <li><a href="/#pricing" class="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="/#faq" class="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="/blog" class="hover:text-white transition-colors">Blog</a></li>
            <li><a href="/privacy-security" class="hover:text-white transition-colors">Security &amp; Privacy</a></li>
          </ul>
        </div>
        <!-- Solutions in India -->
        <div>
          <p class="text-white font-600 text-sm mb-4">Solutions in India</p>
          <ul class="space-y-3 text-sm text-slate-400">
            <li><a href="/ai-chatbot-india" class="hover:text-white transition-colors">AI Chatbot India</a></li>
            <li><a href="/ai-voice-agents-india" class="hover:text-white transition-colors">AI Voice Agents India</a></li>
            <li><a href="/agentiq-vs-wati" class="hover:text-white transition-colors">AgentIQ vs WATI</a></li>
            <li><a href="/agentiq-vs-yellow-ai" class="hover:text-white transition-colors">AgentIQ vs Yellow.ai</a></li>
          </ul>
        </div>
        <!-- Contact -->
        <div>
          <p class="text-white font-600 text-sm mb-4">Contact</p>
          <ul class="space-y-3 text-sm text-slate-400">
            <li><a href="tel:+919159665277" class="hover:text-white transition-colors">+91 91596 65277</a></li>
            <li><a href="https://wa.me/919159665277" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">WhatsApp us</a></li>
            <li><a href="/#book" class="hover:text-white transition-colors">Book a demo</a></li>
            <li class="text-slate-400">Mumbai, India 🇮🇳</li>
          </ul>
        </div>
      </div>
      <!-- Bottom bar -->
      <div class="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <p>© <span id="year">2026</span> AgentIQ. All rights reserved.</p>
        <a href="/privacy-security" class="hover:text-white transition-colors">Privacy &amp; Security</a>
      </div>
    </div>
  </footer>'''

def update_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r'<footer[\s\S]*?</footer>'
    if not re.search(pattern, content):
        print(f"Skipped (no footer found): {file_path}")
        return False

    new_content = re.sub(pattern, CLEAN_FOOTER.strip(), content)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Restored clean footer in: {file_path}")
    return True

def main():
    base_dir = '/Users/shanepereira/Projects/agentiq'
    count = 0
    for root, _, files in os.walk(base_dir):
        if 'node_modules' in root or '.git' in root or 'react-widgets' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                if update_file(file_path):
                    count += 1
    print(f"Total HTML files updated: {count}")

if __name__ == '__main__':
    main()
