#!/usr/bin/env python3
"""
Propagates the chat-widget 7-second AbortController timeout and
pre-filled WhatsApp deep-link fallback banner to all secondary pages.
Preserves page-specific greeting messages.
"""

import glob
import re
import os

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    files = sorted(
        glob.glob(os.path.join(root, '*.html')) +
        glob.glob(os.path.join(root, 'blog', '*.html')) +
        glob.glob(os.path.join(root, 'tools', '*.html'))
    )

    pattern = r"(leadStartBtn\.addEventListener\(\x27click\x27,\s*function\s*\(\)\s*\{[\s\S]*?inp\.focus\(\);\s*\}\);)"
    updated_count = 0

    for filepath in files:
        if filepath == os.path.join(root, "index.html"):
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        m = re.search(pattern, content)
        if not m:
            continue

        old_block = m.group(1)

        # Extract original greeting
        gm = re.search(r"(var greeting\s*=\s*[^;]+;)", old_block)
        greeting_stmt = gm.group(1) if gm else "var greeting = 'Hi ' + name + '! 👋 Ask me anything about our AI chatbots, voice agents, pricing, or how we can automate your business.';"

        new_block = (
            "function proceedToChat(name, phone, business) {\n"
            "        leadCaptured = true;\n"
            "        leadForm.style.display = 'none';\n"
            "        log.style.display = 'flex';\n"
            "        aiqBar.style.display = 'flex';\n\n"
            f"        {greeting_stmt}\n"
            "        msgs.push({ role: 'user', content: '[Lead form completed — Name: ' + name + '. Phone: ' + phone + '. Business: ' + business + ']' });\n"
            "        msgs.push({ role: 'assistant', content: greeting });\n"
            "        addBubble(greeting, 'bot');\n"
            "        inp.focus();\n"
            "      }\n\n"
            "      leadStartBtn.addEventListener('click', function () {\n"
            "        var name = leadNameInput.value.trim();\n"
            "        var phone = leadPhoneInput.value.trim();\n"
            "        if (!name || phone.replace(/\\D/g, '').length < 8) {\n"
            "          leadNameInput.style.borderColor = !name ? '#ef4444' : '';\n"
            "          leadPhoneInput.style.borderColor = phone.replace(/\\D/g, '').length < 8 ? '#ef4444' : '';\n"
            "          return;\n"
            "        }\n"
            "        leadStartBtn.disabled = true;\n"
            "        leadStartBtn.textContent = 'Connecting…';\n"
            "        var business = leadBizInput.value.trim();\n\n"
            "        var existingErr = document.getElementById('aiq-lead-err');\n"
            "        if (existingErr) existingErr.remove();\n\n"
            "        var ctrl = new AbortController();\n"
            "        var timer = setTimeout(function () { ctrl.abort(); }, 7000);\n\n"
            "        var targetUrl = '/api/capture-lead';\n"
            "        fetch(targetUrl, {\n"
            "          method: 'POST',\n"
            "          headers: { 'Content-Type': 'application/json' },\n"
            "          body: JSON.stringify({ name: name, phone: phone.replace(/[\\s\\-\\(\\)]/g, ''), business: business, source: 'chat_widget' }),\n"
            "          signal: ctrl.signal,\n"
            "        }).then(function (r) {\n"
            "          clearTimeout(timer);\n"
            "          if (!r.ok) throw new Error('Server returned ' + r.status);\n"
            "          if (typeof gtag === 'function') {\n"
            "            gtag('event', 'generate_lead', { currency: 'INR', value: 0, method: 'chat_widget' });\n"
            "          }\n"
            "          proceedToChat(name, phone, business);\n"
            "        }).catch(function (err) {\n"
            "          clearTimeout(timer);\n"
            "          console.error('[AgentIQ] Widget lead submission error:', err);\n"
            "          leadStartBtn.disabled = false;\n"
            "          leadStartBtn.textContent = 'Start Chat →';\n\n"
            "          var errDiv = document.createElement('div');\n"
            "          errDiv.id = 'aiq-lead-err';\n"
            "          errDiv.className = 'mt-3 p-2.5 rounded-xl text-center border text-xs';\n"
            "          errDiv.style.background = 'rgba(239, 68, 68, 0.12)';\n"
            "          errDiv.style.borderColor = 'rgba(239, 68, 68, 0.35)';\n"
            "          errDiv.style.color = '#fca5a5';\n\n"
            '          var waMsg = "Hi AgentIQ, I\'d like to chat.\\nName: " + name + "\\nWhatsApp: " + phone + (business ? "\\nBusiness: " + business : "");\n'
            '          var waLink = "https://wa.me/919159665277?text=" + encodeURIComponent(waMsg);\n\n'
            '          errDiv.innerHTML = \'<span style="font-weight:600;">⚠️ Network delay saving details.</span><br>\' +\n'
            '            \'<a href="\' + waLink + \'" target="_blank" rel="noopener noreferrer" style="color:#34d399;font-weight:600;text-decoration:underline;display:inline-block;margin-top:4px;">Chat directly on WhatsApp →</a> \' +\n'
            '            \'<span style="color:#94a3b8;margin:0 4px;">or</span> \' +\n'
            '            \'<button type="button" id="aiq-skip-lead" style="color:#94a3b8;text-decoration:underline;cursor:pointer;background:none;border:none;padding:0;font-size:12px;">continue to web chat</button>\';\n\n'
            "          leadForm.appendChild(errDiv);\n\n"
            "          var skipBtn = document.getElementById('aiq-skip-lead');\n"
            "          if (skipBtn) {\n"
            "            skipBtn.addEventListener('click', function () {\n"
            "              proceedToChat(name, phone, business);\n"
            "            });\n"
            "          }\n"
            "        });\n"
            "      });"
        )

        updated_content = content.replace(old_block, new_block, 1)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        updated_count += 1
        print(f"Updated {os.path.relpath(filepath, root)}")

    print(f"\nDone. Updated {updated_count} files.")

if __name__ == '__main__':
    main()
