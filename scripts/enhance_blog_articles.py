import os
import glob
import re

BLOG_DIR = "/Users/shanepereira/Projects/agentiq/blog"

TOPIC_CLUSTERS = {
    "pricing": [
        ("/blog/ai-chatbot-pricing-india-2026-guide", "AI Chatbot Pricing India (2026 Guide)"),
        ("/blog/ai-chatbot-vs-hiring-staff-cost-comparison", "AI Chatbot vs. Hiring Staff Cost Comparison"),
        ("/blog/ai-voice-agent-cost-india-pricing-guide", "AI Voice Agent Cost in India Guide"),
        ("/ai-chatbot-india", "Done-for-You AI Chatbot Agency India")
    ],
    "voice": [
        ("/blog/ai-voice-agent-cost-india-pricing-guide", "AI Voice Agent Pricing Guide"),
        ("/blog/ai-voice-agents-reduce-missed-calls-no-shows", "5 Ways AI Voice Agents Cut No-Shows"),
        ("/blog/mumbai-clinics-whatsapp-phone-appointment-automation", "Mumbai Clinics Phone & WhatsApp Automation"),
        ("/ai-voice-agents-india", "AI Voice Agents India (Naina)")
    ],
    "d2c": [
        ("/blog/d2c-whatsapp-order-support-automation", "D2C WhatsApp Order Support Automation"),
        ("/blog/whatsapp-cod-confirmation-rto-reduction-d2c-india", "Cutting COD Returns & RTO with WhatsApp"),
        ("/blog/whatsapp-service-window-pricing-change-d2c-2026", "Meta WhatsApp Service Window Pricing Changes"),
        ("/d2c-ecommerce", "AgentIQ for D2C & E-Commerce Brands")
    ],
    "services": [
        ("/blog/whatsapp-business-api-vs-chatbot-restaurants", "WhatsApp API vs Chatbot for Restaurants"),
        ("/blog/instagram-dm-automation-salons-guide", "Instagram DM Automation for Salons"),
        ("/blog/will-ai-chatbot-replace-your-staff-india-guide", "Will an AI Chatbot Replace Your Staff?"),
        ("/blog/world-class-ai-chatbot-not-generic-india-revenue", "World-Class AI Chatbot vs Generic Bot")
    ]
}

def get_cluster_links(filename):
    if "pricing" in filename or "cost-comparison" in filename:
        cluster = TOPIC_CLUSTERS["pricing"] + TOPIC_CLUSTERS["voice"][:1]
    elif "voice" in filename or "calls" in filename or "clinics" in filename:
        cluster = TOPIC_CLUSTERS["voice"] + TOPIC_CLUSTERS["pricing"][:1]
    elif "d2c" in filename or "rto" in filename or "service-window" in filename:
        cluster = TOPIC_CLUSTERS["d2c"] + TOPIC_CLUSTERS["services"][:1]
    else:
        cluster = TOPIC_CLUSTERS["services"] + TOPIC_CLUSTERS["pricing"][:1]
    
    current_stem = "/blog/" + filename.replace(".html", "")
    filtered = [item for item in cluster if item[0] != current_stem][:3]
    return filtered

def process_file(filepath):
    filename = os.path.basename(filepath)
    if filename == "index.html":
        return
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    new_author_json = '"author":{"@type":"Person","name":"Shane Pereira","jobTitle":"Founder & AI Automation Lead","url":"https://agentiq.co.in/","sameAs":"https://www.linkedin.com/in/shanepereiraa/"},"publisher":{"@type":"Organization","name":"AgentIQ","url":"https://agentiq.co.in/","logo":{"@type":"ImageObject","url":"https://agentiq.co.in/og-image.png"}}'
    
    content = re.sub(
        r'"author":\s*\{\s*"@type":\s*"Organization",\s*"name":\s*"AgentIQ",\s*"url":\s*"https://agentiq\.co\.in/"\s*\},?\s*"publisher":\s*\{\s*"@type":\s*"Organization",\s*"logo":\s*\{\s*"@type":\s*"ImageObject",\s*"url":\s*"https://agentiq\.co\.in/og-image\.png"\s*\}\s*\}',
        new_author_json,
        content
    )

    byline_pat = re.compile(r'<p class="text-slate-400 text-sm mb-10">(Published [^<]+? · [^<]+?)</p>')
    
    def byline_repl(match):
        orig_text = match.group(1)
        return (
            f'<div class="flex items-center gap-3 text-slate-400 text-sm mb-10 pb-6 border-b border-white/10 flex-wrap">'
            f'<div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF8A5B] to-[#C74AFF] flex items-center justify-center font-bold text-white text-xs">SP</div>'
            f'<div>'
            f'<span class="text-white font-medium">Shane Pereira</span> · <span class="text-slate-400 text-xs">Founder, AgentIQ</span>'
            f'<div class="text-xs text-slate-400 mt-0.5">{orig_text}</div>'
            f'</div>'
            f'</div>'
        )
    
    if 'Shane Pereira' not in content[:content.find('<div class="prose">')]:
        content = byline_pat.sub(byline_repl, content, count=1)

    old_compare_footer = re.compile(
        r'<!-- Column 4: Compare & Platforms -->\s*<div>\s*<h4 class="text-white font-semibold text-sm tracking-wide mb-4">Compare &amp; Platforms</h4>\s*<ul class="space-y-2\.5">.*?</ul>\s*</div>',
        re.DOTALL
    )
    new_compare_footer = (
        '<!-- Column 4: Compare & Platforms -->\n'
        '        <div>\n'
        '          <h4 class="text-white font-semibold text-sm tracking-wide mb-4">Compare &amp; Platforms</h4>\n'
        '          <ul class="space-y-2.5">\n'
        '            <li><a class="hover:text-white transition-colors" href="/ai-chatbot-india">AI Chatbot India</a></li>\n'
        '            <li><a class="hover:text-white transition-colors" href="/ai-voice-agents-india">AI Voice Agents India</a></li>\n'
        '            <li><a class="hover:text-white transition-colors" href="/agentiq-vs-wati">AgentIQ vs WATI</a></li>\n'
        '            <li><a class="hover:text-white transition-colors" href="/agentiq-vs-aisensy">AgentIQ vs AiSensy</a></li>\n'
        '            <li><a class="hover:text-white transition-colors" href="/agentiq-vs-interakt">AgentIQ vs Interakt</a></li>\n'
        '            <li><a class="hover:text-white transition-colors" href="/agentiq-vs-yellow-ai">AgentIQ vs Yellow.ai</a></li>\n'
        '          </ul>\n'
        '        </div>'
    )
    content = old_compare_footer.sub(new_compare_footer, content)

    if 'About the Author' not in content and 'Written by Shane Pereira' not in content:
        related_links = get_cluster_links(filename)
        links_html = "".join([f'<li><a href="{href}" class="hover:text-white text-orange-400 transition-colors underline underline-offset-2">{title} →</a></li>' for href, title in related_links])
        
        cluster_block = (
            f'\n        <!-- AUTHOR E-E-A-T BIO & TOPICAL CLUSTER LINKS -->\n'
            f'        <div class="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm not-prose">\n'
            f'          <div class="p-5 rounded-xl bg-white/[0.03] border border-white/10">\n'
            f'            <div class="flex items-center gap-3 mb-2">\n'
            f'              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF8A5B] to-[#C74AFF] flex items-center justify-center font-bold text-white text-sm">SP</div>\n'
            f'              <div>\n'
            f'                <p class="font-semibold text-white">Written by Shane Pereira</p>\n'
            f'                <p class="text-xs text-slate-400">Founder & AI Automation Lead at AgentIQ</p>\n'
            f'              </div>\n'
            f'            </div>\n'
            f'            <p class="text-xs text-slate-300 leading-relaxed">Building production AI chatbots and voice agents for Indian SMBs across Mumbai, Delhi, and Bangalore. Connect on <a href="https://www.linkedin.com/in/shanepereiraa/" target="_blank" rel="noopener noreferrer" class="text-cyan underline">LinkedIn</a>.</p>\n'
            f'          </div>\n'
            f'          <div class="p-5 rounded-xl bg-white/[0.03] border border-white/10">\n'
            f'            <p class="font-semibold text-white mb-2.5">Related Guides & Resources</p>\n'
            f'            <ul class="space-y-2 text-xs text-slate-300">\n'
            f'              {links_html}\n'
            f'            </ul>\n'
            f'          </div>\n'
            f'        </div>\n'
        )
        cta_pat = '<div class="mt-14 rounded-2xl p-8 text-center"'
        if cta_pat in content:
            content = content.replace(cta_pat, cluster_block + "\n        " + cta_pat)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated: {filename}")

for f in sorted(glob.glob(os.path.join(BLOG_DIR, "*.html"))):
    process_file(f)
