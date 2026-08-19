import os
import re
import glob

# Ensure Floating Chatbot has robust z-index, event handling, and dual-sync endpoint
with open('scripts/standardize_widgets.py', 'r', encoding='utf-8') as f:
    code = f.read()

# Update CSS for #aiq-float and #aiq-toggle
code = code.replace(
    "#aiq-float { position: fixed; bottom: 24px; right: 20px; z-index: 9999; }",
    "#aiq-float { position: fixed; bottom: 24px; right: 20px; z-index: 99999; pointer-events: auto !important; }"
)
code = code.replace(
    "#wa-float {\n      position: fixed;\n      bottom: 88px;\n      right: 20px;\n      z-index: 9998;",
    "#wa-float {\n      position: fixed;\n      bottom: 90px;\n      right: 20px;\n      z-index: 99998;\n      pointer-events: auto !important;"
)

# Add dual fetch to /api/capture-lead as well in the widget script
lead_fetch_pattern = r"fetch\(activeApi \+ '/lead'[\s\S]*?\}\)\.catch\(function \(err\)"
replacement_fetch = """fetch('/api/capture-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, phone: phone, business: business, timestamp: new Date().toISOString() }),
        }).catch(function(e){ console.warn('[AgentIQ] Local lead capture endpoint:', e); });

        fetch(activeApi + '/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, phone: phone, business: business }),
        }).catch(function (err)"""

if re.search(lead_fetch_pattern, code):
    code = re.sub(lead_fetch_pattern, replacement_fetch, code)

with open('scripts/standardize_widgets.py', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated standardize_widgets.py with enhanced z-index and dual Google Sheets sync.")
