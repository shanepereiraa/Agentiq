import os, glob, re

blog_files = glob.glob("blog/*.html") + ["blog/index.html"]

for f in sorted(list(set(blog_files))):
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    
    if "ai-summary" in content and "ai-content" in content:
        print(f"Skipping {f}, already has tags.")
        continue

    # Extract title or description if present
    desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\']([^"\']+)["\']', content, re.I)
    desc = desc_match.group(1) if desc_match else "AI Chatbots and Voice Agents for Indian SMBs."
    
    ai_summary_tag = (
        f'  <meta name="ai-summary" content="AgentIQ Guide: {desc} Managed AI chatbot & voice agent agency in Mumbai, India. 620ms voice latency, 24/7 automated booking, live in 7 days. Pricing: Rs. 24,999 setup + Rs. 7,999/mo. Contact: +91 91596 65277." />\n'
        '  <link rel="ai-content" href="/llms-full.txt" />\n'
    )

    # Insert right before </head> or after canonical/meta description
    if "</head>" in content:
        new_content = content.replace("</head>", f"{ai_summary_tag}</head>", 1)
        with open(f, "w", encoding="utf-8") as file:
            file.write(new_content)
        print(f"Updated AI tags in {f}")

