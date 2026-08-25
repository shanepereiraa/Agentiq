import os
import glob
import re

BLOG_DIR = "/Users/shanepereira/Projects/agentiq/blog"

# Author assignment map
AUTHORS = {
    "shane": {
        "name": "Shane Pereira",
        "title": "Founder & AI Automation Lead at AgentIQ",
        "short_title": "Founder, AgentIQ",
        "initials": "SP",
        "avatar_grad": "from-[#FF8A5B] to-[#C74AFF]",
        "linkedin": "https://www.linkedin.com/in/shanepereiraa/",
        "bio": "Building production AI chatbots and voice agents for Indian SMBs across Mumbai, Delhi, and Bangalore. Connect on <a href=\"https://www.linkedin.com/in/shanepereiraa/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-cyan underline\">LinkedIn</a>."
    },
    "prachi": {
        "name": "Prachi Borikar",
        "title": "Co-Founder & Client Solutions Lead at AgentIQ",
        "short_title": "Co-Founder, AgentIQ",
        "initials": "PB",
        "avatar_grad": "from-[#C74AFF] to-[#22D3EE]",
        "linkedin": "https://agentiq.co.in/",
        "bio": "Specializing in customer journey automation, appointment workflows, and no-show reduction for Indian clinics, salons, and D2C brands."
    }
}

# Assign author per article
ARTICLE_AUTHORS = {
    "ai-chatbot-pricing-india-2026-guide.html": "shane",
    "ai-voice-agent-cost-india-pricing-guide.html": "shane",
    "world-class-ai-chatbot-not-generic-india-revenue.html": "shane",
    "whatsapp-service-window-pricing-change-d2c-2026.html": "shane",
    "whatsapp-business-api-vs-chatbot-restaurants.html": "shane",
    "will-ai-chatbot-replace-your-staff-india-guide.html": "shane",
    
    "ai-chatbot-vs-hiring-staff-cost-comparison.html": "prachi",
    "ai-voice-agents-reduce-missed-calls-no-shows.html": "prachi",
    "d2c-whatsapp-order-support-automation.html": "prachi",
    "instagram-dm-automation-salons-guide.html": "prachi",
    "mumbai-clinics-whatsapp-phone-appointment-automation.html": "prachi",
    "whatsapp-cod-confirmation-rto-reduction-d2c-india.html": "prachi"
}

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
    
    author_key = ARTICLE_AUTHORS.get(filename, "shane")
    author = AUTHORS[author_key]

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update Schema Author
    new_author_json = (
        f'"author":{{"@type":"Person","name":"{author["name"]}","jobTitle":"{author["title"]}","url":"https://agentiq.co.in/","sameAs":"{author["linkedin"]}"}}'
    )
    content = re.sub(
        r'"author":\s*\{[^}]+\}',
        new_author_json,
        content
    )

    # 2. Update Header Byline Block
    byline_block = (
        f'<div class="flex items-center gap-3 text-slate-400 text-sm mb-10 pb-6 border-b border-white/10 flex-wrap">'
        f'<div class="w-8 h-8 rounded-full bg-gradient-to-tr {author["avatar_grad"]} flex items-center justify-center font-bold text-white text-xs">{author["initials"]}</div>'
        f'<div>'
        f'<span class="text-white font-medium">{author["name"]}</span> · <span class="text-slate-400 text-xs">{author["short_title"]}</span>'
        f'<div class="text-xs text-slate-400 mt-0.5">'
    )
    
    # Replace existing byline block
    old_byline_block_pat = re.compile(r'<div class="flex items-center gap-3 text-slate-400 text-sm mb-10 pb-6 border-b border-white/10 flex-wrap">.*?<div class="text-xs text-slate-400 mt-0\.5">', re.DOTALL)
    if old_byline_block_pat.search(content):
        content = old_byline_block_pat.sub(byline_block, content)

    # 3. Update Author Bio Box
    related_links = get_cluster_links(filename)
    links_html = "".join([f'<li><a href="{href}" class="hover:text-white text-orange-400 transition-colors underline underline-offset-2">{title} →</a></li>' for href, title in related_links])

    new_author_box = (
        f'<!-- AUTHOR E-E-A-T BIO & TOPICAL CLUSTER LINKS -->\n'
        f'        <div class="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm not-prose">\n'
        f'          <div class="p-5 rounded-xl bg-white/[0.03] border border-white/10">\n'
        f'            <div class="flex items-center gap-3 mb-2">\n'
        f'              <div class="w-10 h-10 rounded-full bg-gradient-to-tr {author["avatar_grad"]} flex items-center justify-center font-bold text-white text-sm">{author["initials"]}</div>\n'
        f'              <div>\n'
        f'                <p class="font-semibold text-white">Written by {author["name"]}</p>\n'
        f'                <p class="text-xs text-slate-400">{author["title"]}</p>\n'
        f'              </div>\n'
        f'            </div>\n'
        f'            <p class="text-xs text-slate-300 leading-relaxed">{author["bio"]}</p>\n'
        f'          </div>\n'
        f'          <div class="p-5 rounded-xl bg-white/[0.03] border border-white/10">\n'
        f'            <p class="font-semibold text-white mb-2.5">Related Guides & Resources</p>\n'
        f'            <ul class="space-y-2 text-xs text-slate-300">\n'
        f'              {links_html}\n'
        f'            </ul>\n'
        f'          </div>\n'
        f'        </div>'
    )

    old_author_box_pat = re.compile(r'<!-- AUTHOR E-E-A-T BIO & TOPICAL CLUSTER LINKS -->.*?</ul>\s*</div>\s*</div>', re.DOTALL)
    if old_author_box_pat.search(content):
        content = old_author_box_pat.sub(new_author_box, content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Updated {filename} -> Author: {author['name']}")

for f in sorted(glob.glob(os.path.join(BLOG_DIR, "*.html"))):
    process_file(f)
