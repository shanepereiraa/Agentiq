import os
import re
import glob

CLEAN_FOOTER = '''  <!-- FOOTER -->
  <footer class="w-full bg-[#05070B] border-t border-white/10 pt-16 pb-12 text-gray-400 text-sm">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      
      <!-- 5-COLUMN MAIN GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
        
        <!-- Column 1: Brand & Socials -->
        <div class="space-y-4">
          <a class="inline-block" href="/">
            <span class="text-xl font-bold text-white tracking-tight inline-flex items-baseline gap-0.5">
              Agent<span class="logo-grad-text">IQ</span><svg class="w-2.5 h-2.5 shrink-0" viewBox="0 0 16 14" fill="none" aria-hidden="true" focusable="false"><defs><linearGradient id="iq-wave-pri-ftr" x1="0" y1="14" x2="16" y2="0"><stop offset="0" stop-color="#FF8A5B"/><stop offset="0.5" stop-color="#FF5C8A"/><stop offset="1" stop-color="#C74AFF"/></linearGradient></defs><rect x="0" y="9" width="3" height="5" rx="1.2" fill="url(#iq-wave-pri-ftr)"/><rect x="4.5" y="6" width="3" height="8" rx="1.2" fill="url(#iq-wave-pri-ftr)"/><rect x="9" y="3" width="3" height="11" rx="1.2" fill="url(#iq-wave-pri-ftr)"/><rect x="13" y="0" width="3" height="14" rx="1.2" fill="url(#iq-wave-pri-ftr)"/></svg>
            </span>
          </a>
          <p class="text-sm text-gray-400 leading-relaxed pr-4">
            AI chatbots for Indian businesses — WhatsApp, Instagram &amp; Web.
          </p>
          <div class="flex items-center gap-3 pt-2">
            <a href="https://wa.me/919159665277" target="_blank" rel="noopener noreferrer" aria-label="AgentIQ on WhatsApp" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
            </a>
            <a href="https://instagram.com/agentiqco" target="_blank" rel="noopener noreferrer" aria-label="AgentIQ on Instagram" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/shanepereiraa/" target="_blank" rel="noopener noreferrer" aria-label="Shane Pereira on LinkedIn" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://www.facebook.com/people/Agentiq/61590432627451" target="_blank" rel="noopener noreferrer" aria-label="AgentIQ on Facebook" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="mailto:shane@agentiq.co.in" aria-label="Email AgentIQ" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
              <svg class="w-4 h-4 fill-none stroke-current" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>

        <!-- Column 2: Services -->
        <div>
          <h4 class="text-white font-semibold text-sm tracking-wide mb-4">Services</h4>
          <ul class="space-y-2.5">
            <li><a class="hover:text-white transition-colors" href="/ai-chatbot-india">AI Chatbots</a></li>
            <li><a class="hover:text-white transition-colors" href="/ai-voice-agents-india">Voice Agents</a></li>
            <li><a class="hover:text-white transition-colors" href="/d2c-ecommerce">D2C &amp; E-Commerce</a></li>
            <li><a class="hover:text-white transition-colors" href="/restaurants">Restaurants &amp; Cafés</a></li>
            <li><a class="hover:text-white transition-colors" href="/salons">Salons &amp; Spas</a></li>
            <li><a class="hover:text-white transition-colors" href="/clinics">Clinics &amp; Healthcare</a></li>
          </ul>
        </div>

        <!-- Column 3: Company -->
        <div>
          <h4 class="text-white font-semibold text-sm tracking-wide mb-4">Company</h4>
          <ul class="space-y-2.5">
            <li><a class="hover:text-white transition-colors" href="/results">Results</a></li>
            <li><a class="hover:text-white transition-colors" href="/pricing">Pricing</a></li>
            <li><a class="hover:text-white transition-colors" href="/faq">FAQ</a></li>
            <li><a class="hover:text-white transition-colors" href="/blog">Blog</a></li>
            <li><a class="hover:text-white transition-colors" href="/privacy-security">Security &amp; Privacy</a></li>
          </ul>
        </div>

        <!-- Column 4: Compare & Platforms -->
        <div>
          <h4 class="text-white font-semibold text-sm tracking-wide mb-4">Compare &amp; Platforms</h4>
          <ul class="space-y-2.5">
            <li><a class="hover:text-white transition-colors" href="/ai-chatbot-india">AI Chatbot India</a></li>
            <li><a class="hover:text-white transition-colors" href="/ai-voice-agents-india">AI Voice Agents India</a></li>
            <li><a class="hover:text-white transition-colors" href="/agentiq-vs-wati">AgentIQ vs WATI</a></li>
            <li><a class="hover:text-white transition-colors" href="/agentiq-vs-yellow-ai">AgentIQ vs Yellow.ai</a></li>
          </ul>
        </div>

        <!-- Column 5: Contact -->
        <div>
          <h4 class="text-white font-semibold text-sm tracking-wide mb-4">Contact</h4>
          <ul class="space-y-2.5">
            <li class="text-gray-300 font-medium">+91 91596 65277</li>
            <li>
              <a href="https://wa.me/919159665277" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
                WhatsApp us
              </a>
            </li>
            <li><a class="hover:text-white transition-colors" href="/#book">Book Free Demo</a></li>
            <li class="text-gray-400">Mumbai, India 🇮🇳</li>
          </ul>
        </div>

      </div>

      <!-- BOTTOM DIVIDER & COPYRIGHT -->
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-gray-500">
          © <span id="year">2026</span> AgentIQ. All rights reserved.
        </p>
        <div class="flex items-center gap-6 text-xs text-gray-500">
          <a class="hover:text-gray-400 transition-colors" href="/privacy">Privacy Policy</a>
          <a class="hover:text-gray-400 transition-colors" href="/terms">Terms of Service</a>
        </div>
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
    print(f"Restored clean 5-column footer in: {file_path}")
    return True

def main():
    base_dir = '/Users/shanepereira/Projects/agentiq'
    all_files = sorted(
        glob.glob(os.path.join(base_dir, '*.html')) +
        glob.glob(os.path.join(base_dir, 'blog', '*.html')) +
        glob.glob(os.path.join(base_dir, 'tools', '*.html'))
    )
    count = 0
    for f in all_files:
        if update_file(f):
            count += 1
    print(f"Successfully updated {count} files with the standard 5-column footer.")

if __name__ == '__main__':
    main()
