import os
import glob
import re

ROOT_DIR = "/Users/shanepereira/Projects/agentiq"
COMPARE_FILES = [
    "agentiq-vs-wati.html",
    "agentiq-vs-aisensy.html",
    "agentiq-vs-interakt.html",
    "agentiq-vs-yellow-ai.html"
]

ORG_SCHEMA = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "additionalType": "https://schema.org/ProfessionalService",
    "@id": "https://agentiq.co.in/#organization",
    "name": "AgentIQ",
    "legalName": "AgentIQ",
    "description": "AgentIQ builds done-for-you AI chatbots for WhatsApp, Instagram and websites — purpose-built for restaurants, salons, healthcare and more. Capture leads, take bookings and reply in seconds, 24/7.",
    "url": "https://agentiq.co.in/",
    "logo": "https://agentiq.co.in/og-image.png",
    "image": "https://agentiq.co.in/og-image.png",
    "telephone": "+91-91596-65277",
    "email": "shane@agentiq.co.in",
    "priceRange": "₹₹",
    "serviceType": "AI Chatbot and Voice Agent Service",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.1136,
      "longitude": 72.8697
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://instagram.com/agentiqco",
      "https://www.linkedin.com/in/shanepereiraa/",
      "https://www.facebook.com/people/Agentiq/61590432627451"
    ]
  }
  </script>
'''

NEW_COMPARE_FOOTER = '''        <!-- Column 4: Compare & Platforms -->
        <div>
          <h4 class="text-white font-semibold text-sm tracking-wide mb-4">Compare &amp; Platforms</h4>
          <ul class="space-y-2.5">
            <li><a class="hover:text-white transition-colors" href="/ai-chatbot-india">AI Chatbot India</a></li>
            <li><a class="hover:text-white transition-colors" href="/ai-voice-agents-india">AI Voice Agents India</a></li>
            <li><a class="hover:text-white transition-colors" href="/agentiq-vs-wati">AgentIQ vs WATI</a></li>
            <li><a class="hover:text-white transition-colors" href="/agentiq-vs-aisensy">AgentIQ vs AiSensy</a></li>
            <li><a class="hover:text-white transition-colors" href="/agentiq-vs-interakt">AgentIQ vs Interakt</a></li>
            <li><a class="hover:text-white transition-colors" href="/agentiq-vs-yellow-ai">AgentIQ vs Yellow.ai</a></li>
          </ul>
        </div>

        <!-- Column 5: Contact & Tools -->
        <div>
          <h4 class="text-white font-semibold text-sm tracking-wide mb-4">Contact &amp; Tools</h4>
          <ul class="space-y-2.5">
            <li class="text-gray-300 font-medium">+91 91596 65277</li>
            <li>
              <a href="https://wa.me/919159665277" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
                WhatsApp us
              </a>
            </li>
            <li><a class="hover:text-white transition-colors" href="/#book">Book Free Demo</a></li>
            <li><a class="hover:text-white transition-colors" href="/try-your-bot">Interactive Bot Simulator</a></li>
            <li><a class="hover:text-white transition-colors" href="/tools/whatsapp-link-generator">WhatsApp Link Generator</a></li>
            <li><a class="hover:text-white transition-colors" href="/tools/staff-vs-ai-calculator">Staff vs AI Calculator</a></li>
            <li class="text-gray-400">Mumbai, India 🇮🇳</li>
          </ul>
        </div>
'''

for fname in COMPARE_FILES:
    fpath = os.path.join(ROOT_DIR, fname)
    if not os.path.exists(fpath):
        continue
    with open(fpath, "r", encoding="utf-8") as fp:
        c = fp.read()

    # Add Org Schema if not already present
    if '@id": "https://agentiq.co.in/#organization"' not in c or '"@type": "Organization"' not in c:
        # Insert before BreadcrumbList schema
        bc_match = '<script type="application/ld+json">\n  {"@context":"https://schema.org","@type":"BreadcrumbList"'
        if bc_match in c:
            c = c.replace(bc_match, ORG_SCHEMA + '  ' + bc_match)
        else:
            bc_match_alt = '<script type="application/ld+json">\n  {\n    "@context": "https://schema.org",\n    "@type": "BreadcrumbList"'
            if bc_match_alt in c:
                c = c.replace(bc_match_alt, ORG_SCHEMA + '  ' + bc_match_alt)

    # Replace footer compare & contact columns
    old_footer_cols = re.compile(
        r'<!-- Column 4: Compare & Platforms -->\s*<div>.*?<!-- Column 5: Contact -->\s*<div>.*?</ul>\s*</div>',
        re.DOTALL
    )
    if old_footer_cols.search(c):
        c = old_footer_cols.sub(NEW_COMPARE_FOOTER.strip(), c)

    with open(fpath, "w", encoding="utf-8") as fp:
        fp.write(c)
    print(f"Updated: {fname}")
