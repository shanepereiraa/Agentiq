#!/usr/bin/env python3
"""
Standardizes floating widgets across all HTML pages on agentiq.co.in:
1. Floating WhatsApp button (#wa-float) - bottom right above orange chat toggle
2. AI Chatbot Widget (#aiq-float) - bottom right
3. Voice AI Assistant Widget (#vaq-float) - bottom left
"""

import glob
import os
import re

WIDGET_CSS = """
    /* ── Floating WhatsApp (above orange web chat widget) ─ */
    #wa-float {
      position: fixed;
      bottom: 88px;
      right: 20px;
      z-index: 9998;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #10B981;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      box-shadow: 0 4px 22px rgba(16,185,129,.45);
      transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease;
    }
    #wa-float:hover {
      background: #059669;
      transform: scale(1.08);
      box-shadow: 0 6px 28px rgba(16,185,129,.65);
    }
    #wa-float:focus-visible {
      outline: 3px solid #22D3EE;
      outline-offset: 3px;
    }
    @media (max-width: 767px) {
      #wa-float {
        bottom: 148px;
        right: 16px;
      }
    }
    /* ── AI Chat Widget ─────────────────────────────── */
    #aiq-float { position: fixed; bottom: 24px; right: 20px; z-index: 9999; }
    @media (max-width: 767px) { #aiq-float { bottom: 84px; right: 16px; } }
    #aiq-toggle {
      width: 52px; height: 52px; border-radius: 50%;
      background: linear-gradient(135deg, #FF9F45, #FF6B5C);
      border: none; cursor: pointer;
      box-shadow: 0 4px 22px rgba(255,107,92,.5);
      display: flex; align-items: center; justify-content: center;
      transition: transform .2s ease, box-shadow .2s ease;
      position: relative;
    }
    #aiq-toggle:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(255,107,92,.6); }
    #aiq-toggle:focus-visible { outline: 3px solid #22D3EE; outline-offset: 3px; }
    #aiq-toggle svg { width: 24px; height: 24px; }
    #aiq-notif {
      position: absolute; top: -3px; right: -3px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #22D3EE; color: #07173a;
      font-size: 10px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      border: 2px solid #07173a;
    }
    #aiq-notif.aiq-gone { display: none; }
    #aiq-panel {
      position: absolute; bottom: 60px; right: 0;
      width: 340px;
      background: rgba(7,23,58,.96);
      backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 20px;
      box-shadow: 0 16px 60px rgba(0,0,0,.55);
      display: flex; flex-direction: column; overflow: hidden;
      transition: opacity .2s ease, transform .2s ease;
    }
    #aiq-panel.aiq-shut {
      opacity: 0; transform: translateY(10px) scale(.97);
      pointer-events: none;
    }
    #aiq-hdr {
      padding: 13px 15px;
      background: linear-gradient(135deg, rgba(255,159,69,.18), rgba(255,107,92,.14));
      border-bottom: 1px solid rgba(255,255,255,.09);
      display: flex; align-items: center; gap: 10px;
    }
    #aiq-hdr .av {
      width: 34px; height: 34px; border-radius: 50%;
      background: linear-gradient(135deg, #FF9F45, #FF6B5C);
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    #aiq-hdr .av svg { width: 17px; height: 17px; stroke: white; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    #aiq-hdr .info p.name { font-size: 13px; font-weight: 600; color: #fff; line-height: 1.2; }
    #aiq-hdr .info .st {
      font-size: 11px; color: #34d399;
      display: flex; align-items: center; gap: 4px;
    }
    #aiq-hdr .info .st::before {
      content: ''; display: inline-block;
      width: 6px; height: 6px; border-radius: 50%; background: #34d399;
    }
    #aiq-x {
      margin-left: auto; background: none; border: none;
      color: rgba(255,255,255,.7); cursor: pointer;
      font-size: 17px; line-height: 1;
      width: 32px; height: 32px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      transition: color .15s, background .15s;
    }
    #aiq-x:hover { color: #fff; background: rgba(255,255,255,.08); }
    #aiq-x:focus-visible { outline: 2px solid #22D3EE; outline-offset: 2px; }
    #aiq-lead-form {
      padding: 18px 16px;
      display: flex; flex-direction: column; gap: 10px;
    }
    #aiq-lead-form p { font-size: 12px; color: #cbd5e1; line-height: 1.4; }
    #aiq-lead-form input {
      width: 100%; padding: 9px 12px;
      border-radius: 10px; font-size: 13px;
      background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.14);
      color: #fff; outline: none; transition: border-color .15s;
    }
    #aiq-lead-form input:focus { border-color: #22D3EE; }
    #aiq-lead-form input::placeholder { color: rgba(255,255,255,.35); }
    #aiq-lead-start {
      margin-top: 4px; padding: 10px;
      border-radius: 10px; font-size: 13px; font-weight: 600;
      background: linear-gradient(135deg, #FF9F45, #FF6B5C);
      color: #fff; border: none; cursor: pointer;
      box-shadow: 0 4px 14px rgba(255,107,92,.4);
      transition: transform .15s, box-shadow .15s;
    }
    #aiq-lead-start:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(255,107,92,.55); }
    #aiq-log {
      flex: 1; overflow-y: auto; padding: 12px 11px;
      display: flex; flex-direction: column; gap: 9px;
      max-height: 300px;
    }
    #aiq-log::-webkit-scrollbar { width: 3px; }
    #aiq-log::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 3px; }
    .ab {
      max-width: 85%; padding: 9px 13px;
      border-radius: 15px; font-size: 13px; line-height: 1.55;
      word-wrap: break-word;
    }
    .ab.bot { background: rgba(255,255,255,.08); color: #e2e8f0; align-self: flex-start; border-bottom-left-radius: 4px; }
    .ab.me  { background: linear-gradient(135deg,#FF9F45,#FF6B5C); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
    .ab.tdot { align-self: flex-start; padding: 11px 14px; background: rgba(255,255,255,.08); border-bottom-left-radius: 4px; }
    .aiq-dots { display: flex; gap: 4px; }
    .aiq-dots span {
      width: 6px; height: 6px; border-radius: 50%;
      background: rgba(255,255,255,.4);
      animation: aiqB 1.2s infinite;
    }
    .aiq-dots span:nth-child(2) { animation-delay: .2s; }
    .aiq-dots span:nth-child(3) { animation-delay: .4s; }
    @keyframes aiqB { 0%,80%,100%{transform:scale(0);opacity:.3} 40%{transform:scale(1);opacity:1} }
    #aiq-bar {
      padding: 9px 11px;
      background: rgba(4,13,33,.85);
      border-top: 1px solid rgba(255,255,255,.08);
      display: flex; gap: 7px; align-items: center;
    }
    #aiq-in {
      flex: 1; background: rgba(255,255,255,.07);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 10px; padding: 8px 11px;
      font-size: 13px; color: #fff; outline: none;
      transition: border-color .15s;
    }
    #aiq-in:focus { border-color: #22D3EE; }
    #aiq-in::placeholder { color: rgba(255,255,255,.35); }
    #aiq-go {
      width: 34px; height: 34px; border-radius: 10px;
      background: linear-gradient(135deg, #FF9F45, #FF6B5C);
      border: none; cursor: pointer; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      transition: transform .15s;
    }
    #aiq-go:hover { transform: scale(1.06); }
    #aiq-go:focus-visible { outline: 2px solid #22D3EE; outline-offset: 2px; }
    #aiq-go svg { width: 14px; height: 14px; fill: white; }

    /* ── Voice Assistant Widget ──────────────────────────────────────────────── */
    #vaq-float {
      position: fixed; bottom: 24px; left: 20px; z-index: 9999;
    }
    @media (max-width: 767px) { #vaq-float { bottom: 80px; } }
    #vaq-status {
      position: absolute; bottom: calc(100% + 8px); left: 0;
      background: rgba(10,14,28,.92);
      border: 1px solid rgba(34,211,238,.35);
      color: #A5E9FA;
      font-size: 11px; font-weight: 600; letter-spacing: .4px;
      padding: 4px 10px; border-radius: 20px;
      white-space: nowrap; opacity: 0;
      transition: opacity .2s ease;
      pointer-events: none; font-family: inherit;
    }
    #vaq-btn {
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, #22D3EE, #3B82F6);
      border: none; cursor: pointer;
      box-shadow: 0 4px 22px rgba(34,211,238,.5);
      display: flex; align-items: center; justify-content: center;
      transition: transform .2s, box-shadow .2s;
      position: relative; overflow: visible;
    }
    #vaq-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(34,211,238,.7); }
    #vaq-btn:focus-visible { outline: 3px solid #22D3EE; outline-offset: 3px; }
    #vaq-btn svg { width: 22px; height: 22px; position: relative; z-index: 1; pointer-events: none; }
    #vaq-glow {
      position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
      background: rgba(34,211,238,.45);
      animation: vaq-breathe 2.2s ease-in-out infinite;
    }
    #vaq-btn[data-state]:not([data-state="idle"]) #vaq-glow { display: none; }
    #vaq-ring {
      position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
    }
    #vaq-btn[data-state="listening"] #vaq-ring {
      animation: vaq-pulse 1.1s ease-out infinite;
      background: rgba(34,211,238,.45);
    }
    #vaq-btn[data-state="speaking"] {
      background: linear-gradient(135deg, #06B6D4, #2563EB);
      box-shadow: 0 4px 22px rgba(6,182,212,.55);
    }
    #vaq-btn[data-state="thinking"]::after,
    #vaq-btn[data-state="connecting"]::after {
      content: ''; position: absolute; inset: 5px; border-radius: 50%;
      border: 2px solid transparent; border-top-color: rgba(255,255,255,.85);
      animation: vaq-spin .75s linear infinite; z-index: 2;
    }
    .vaq-waveform {
      display: none; align-items: flex-end; gap: 3px; height: 18px;
      position: relative; z-index: 1; pointer-events: none;
    }
    .vaq-waveform span {
      width: 3px; border-radius: 2px; background: white; height: 30%;
      animation: vaq-wave 1s ease-in-out infinite;
    }
    .vaq-waveform span:nth-child(1) { animation-delay: 0s; }
    .vaq-waveform span:nth-child(2) { animation-delay: .12s; }
    .vaq-waveform span:nth-child(3) { animation-delay: .24s; }
    .vaq-waveform span:nth-child(4) { animation-delay: .36s; }
    #vaq-btn[data-state="listening"] .vaq-icon-mic,
    #vaq-btn[data-state="speaking"] .vaq-icon-mic { display: none; }
    #vaq-btn[data-state="listening"] .vaq-waveform,
    #vaq-btn[data-state="speaking"] .vaq-waveform { display: flex; }
    @keyframes vaq-breathe {
      0%, 100% { transform: scale(1);    opacity: .5; }
      50%      { transform: scale(1.2); opacity: 0;  }
    }
    @keyframes vaq-pulse {
      0%   { transform: scale(1);   opacity: .8; }
      100% { transform: scale(1.4); opacity: 0;  }
    }
    @keyframes vaq-spin {
      to { transform: rotate(360deg); }
    }
    @keyframes vaq-wave {
      0%, 100% { height: 25%; }
      50%      { height: 95%; }
    }
"""

WIDGET_HTML_AND_SCRIPTS = """
  <!-- AI Chat Widget -->
  <div id="aiq-float">
    <button id="aiq-toggle" type="button" aria-label="Chat with AgentIQ AI" aria-haspopup="dialog" aria-expanded="false" aria-controls="aiq-panel">
      <img src="/assets/icons8-message-96.png" alt="Chat" class="w-8 h-8 object-contain" width="32" height="32" aria-hidden="true" loading="eager" />
      <span id="aiq-notif" class="aiq-gone" aria-hidden="true">1</span>
    </button>
    <div id="aiq-panel" class="aiq-shut" role="dialog" aria-label="AgentIQ chat assistant" inert>
      <div id="aiq-hdr">
        <div class="av">
          <img src="/assets/icons8-message-48.png" alt="" class="w-5 h-5 object-contain" width="20" height="20" aria-hidden="true" />
        </div>
        <div class="info">
          <p class="name">AgentIQ AI</p>
          <span class="st">Typically replies instantly</span>
        </div>
        <button id="aiq-x" type="button" aria-label="Close chat">&#x2715;</button>
      </div>
      <div id="aiq-lead-form">
        <p>👋 Before we chat, tell us a bit about yourself:</p>
        <label for="aiq-lname" class="sr-only">Your name</label>
        <input id="aiq-lname" type="text" placeholder="Your name" maxlength="60" autocomplete="name" />
        <label for="aiq-lphone" class="sr-only">WhatsApp / phone number</label>
        <input id="aiq-lphone" type="tel" placeholder="WhatsApp / phone number" maxlength="15" autocomplete="tel" />
        <label for="aiq-lbiz" class="sr-only">Business type</label>
        <input id="aiq-lbiz" type="text" placeholder="Business type (e.g. Retail, Restaurant)" maxlength="80" />
        <button id="aiq-lead-start" type="button">Start Chat →</button>
      </div>
      <div id="aiq-log" aria-live="polite" style="display:none"></div>
      <div id="aiq-bar" style="display:none">
        <input id="aiq-in" type="text" placeholder="Ask anything…" aria-label="Type your message to AgentIQ" maxlength="400" autocomplete="off" />
        <button id="aiq-go" type="button" aria-label="Send message">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Floating WhatsApp button (positioned above the orange web chatbot widget) -->
  <a id="wa-float" href="https://wa.me/919159665277?text=Hi%20AgentIQ%2C%20I%27d%20like%20to%20book%20a%20demo" target="_blank" rel="noopener noreferrer" aria-label="Chat with AgentIQ on WhatsApp" class="cursor-pointer">
    <svg class="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
  </a>

  <!-- Voice Assistant Widget (Vapi) -->
  <div id="vaq-float">
    <span id="vaq-status" role="status" aria-live="polite"></span>
    <button id="vaq-btn" data-state="idle" aria-label="Talk to AgentIQ voice assistant" title="Voice assistant — click to speak">
      <div id="vaq-glow"></div>
      <div id="vaq-ring"></div>
      <svg class="vaq-icon-mic" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
      <div class="vaq-waveform" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
    </button>
  </div>

  <script>
    window.AgentIQConfig = {
      apiBase: 'https://agentiq-chatbot.onrender.com',
      vapiPublicKey: 'b430edb7-0dc0-4c14-9e56-5445fdba2912'
    };
  </script>

  <!-- Vapi Voice Assistant Script -->
  <script type="module">
    (function () {
      var floatEl  = document.getElementById('vaq-float');
      var btn      = document.getElementById('vaq-btn');
      var statusEl = document.getElementById('vaq-status');
      var VAPI_KEY = (window.AgentIQConfig && window.AgentIQConfig.vapiPublicKey) || '';

      if (!VAPI_KEY || VAPI_KEY === 'YOUR_VAPI_PUBLIC_KEY') {
        if (floatEl) floatEl.style.display = 'none'; return;
      }

      var vapi = null;
      var state = 'idle';
      var connectTimer = null;
      var sdkLoading = false;

      function setState(s) {
        state = s;
        btn.setAttribute('data-state', s);
        var labels = { connecting: 'Connecting…', listening: 'Listening…', speaking: 'Speaking…' };
        statusEl.textContent   = labels[s] || '';
        statusEl.style.opacity = s === 'idle' ? '0' : '1';
        btn.setAttribute('aria-label', s === 'idle'
          ? 'Talk to AgentIQ voice assistant'
          : (labels[s] || '') + ' — click to stop');
      }

      function wireVapi(mod) {
        var Vapi = mod.default;
        vapi = new Vapi(VAPI_KEY, undefined, { avoidEval: true });
        vapi.on('call-start',   function() { clearTimeout(connectTimer); setState('listening'); });
        vapi.on('call-end',     function() { clearTimeout(connectTimer); setState('idle');      });
        vapi.on('speech-start', function() { setState('speaking');  });
        vapi.on('speech-end',   function() { setState('listening'); });
        vapi.on('error', function(e) {
          clearTimeout(connectTimer);
          console.error('[AgentIQ] VAPI error:', e);
          setState('idle');
          statusEl.textContent = 'Call failed — try again';
          statusEl.style.opacity = '1';
          setTimeout(function () { statusEl.style.opacity = '0'; statusEl.textContent = ''; }, 3000);
        });
      }

      function startCall() {
        setState('connecting');
        connectTimer = setTimeout(function() { if (vapi) vapi.stop(); setState('idle'); }, 12000);
        if (typeof gtag === 'function') {
          gtag('event', 'voice_agent_start', { event_category: 'voice_agent' });
        }
        try {
          vapi.start('e699b5d0-7cf8-4809-ab19-ed8687ab830f');
        } catch (err) {
          clearTimeout(connectTimer);
          console.error('[AgentIQ] VAPI start failed:', err);
          setState('idle');
        }
      }

      btn.addEventListener('click', function() {
        if (vapi) {
          if (state !== 'idle') { vapi.stop(); clearTimeout(connectTimer); setState('idle'); return; }
          startCall();
          return;
        }
        if (sdkLoading) return;
        sdkLoading = true;
        setState('connecting');
        import('https://esm.sh/@vapi-ai/web@2.6.1').then(function (mod) {
          wireVapi(mod);
          startCall();
        }).catch(function (err) {
          console.error('[AgentIQ] VAPI SDK failed to load:', err);
          sdkLoading = false;
          setState('idle');
          statusEl.textContent = 'Call failed — try again';
          statusEl.style.opacity = '1';
          setTimeout(function () { statusEl.style.opacity = '0'; statusEl.textContent = ''; }, 3000);
        });
      });
    })();
  </script>

  <!-- AI Chatbot Widget Script -->
  <script>
    (function () {
      var msgs = [];
      var open = false;

      var toggle = document.getElementById('aiq-toggle');
      var panel  = document.getElementById('aiq-panel');
      var xBtn   = document.getElementById('aiq-x');
      var log    = document.getElementById('aiq-log');
      var inp    = document.getElementById('aiq-in');
      var goBtn  = document.getElementById('aiq-go');
      var notif  = document.getElementById('aiq-notif');

      var leadCaptured = false;
      var leadNameInput = document.getElementById('aiq-lname');
      var leadPhoneInput = document.getElementById('aiq-lphone');
      var leadBizInput = document.getElementById('aiq-lbiz');
      var leadStartBtn = document.getElementById('aiq-lead-start');
      var leadForm = document.getElementById('aiq-lead-form');
      var aiqBar = document.getElementById('aiq-bar');

      if (!toggle || !panel) return;

      leadStartBtn.addEventListener('click', function () {
        var name = leadNameInput.value.trim();
        var phone = leadPhoneInput.value.trim();
        if (!name || !phone) {
          if (!name) leadNameInput.focus(); else leadPhoneInput.focus();
          return;
        }
        leadStartBtn.disabled = true;
        leadStartBtn.textContent = 'Starting…';
        var business = leadBizInput.value.trim();

        var activeApi = (window.AgentIQConfig && window.AgentIQConfig.apiBase) || 'https://agentiq-chatbot.onrender.com';
        fetch(activeApi + '/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, phone: phone, business: business }),
        }).catch(function (err) { console.error('[AgentIQ] Widget lead error:', err); });

        leadCaptured = true;
        leadForm.style.display = 'none';
        log.style.display = 'flex';
        aiqBar.style.display = 'flex';

        var greeting = 'Hi ' + name + '! 👋 Ask me anything about our AI chatbots, voice agents, pricing, or how we can automate your business.';
        msgs.push({ role: 'user', content: '[Lead form completed — Name: ' + name + '. Phone: ' + phone + '. Business: ' + business + ']' });
        msgs.push({ role: 'assistant', content: greeting });
        addBubble(greeting, 'bot');
        inp.focus();
      });

      function openChat() {
        open = true;
        panel.removeAttribute('inert');
        panel.classList.remove('aiq-shut');
        toggle.setAttribute('aria-expanded', 'true');
        if (notif) notif.classList.add('aiq-gone');
        if (leadCaptured) inp.focus(); else leadNameInput.focus();
      }
      function closeChat(returnFocus) {
        open = false;
        panel.classList.add('aiq-shut');
        toggle.setAttribute('aria-expanded', 'false');
        if (returnFocus !== false) toggle.focus();
        panel.setAttribute('inert', '');
      }

      toggle.addEventListener('click', function () { open ? closeChat() : openChat(); });
      xBtn.addEventListener('click', function () { closeChat(); });

      function addBubble(text, who) {
        var d = document.createElement('div');
        d.className = 'ab ' + who;
        d.textContent = text;
        log.appendChild(d);
        log.scrollTop = log.scrollHeight;
        return d;
      }

      function addTyping() {
        var d = document.createElement('div');
        d.className = 'ab tdot';
        var dots = document.createElement('div');
        dots.className = 'aiq-dots';
        dots.setAttribute('aria-hidden', 'true');
        for (var i = 0; i < 3; i++) dots.appendChild(document.createElement('span'));
        d.appendChild(dots);
        log.appendChild(d);
        log.scrollTop = log.scrollHeight;
        return d;
      }

      function send() {
        var text = inp.value.trim();
        if (!text) return;
        inp.value = '';
        addBubble(text, 'me');
        msgs.push({ role: 'user', content: text });
        var t = addTyping();
        goBtn.disabled = true;

        var activeApi = (window.AgentIQConfig && window.AgentIQConfig.apiBase) || 'https://agentiq-chatbot.onrender.com';
        var ctrl = new AbortController();
        var fetchTimer = setTimeout(function () { ctrl.abort(); }, 45000);
        fetch(activeApi + '/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: msgs }),
          signal: ctrl.signal,
        }).then(function (r) {
          clearTimeout(fetchTimer);
          return r.json();
        }).then(function (data) {
          t.remove();
          var reply = data.reply || 'Great question! Our AI assistants handle customer queries, bookings and lead qualification 24/7.';
          msgs.push({ role: 'assistant', content: reply });
          addBubble(reply, 'bot');
          goBtn.disabled = false;
        }).catch(function (err) {
          t.remove();
          var fb = 'Our AI voice and chat assistants handle customer support 24/7 — reach us on WhatsApp or book a demo!';
          addBubble(fb, 'bot');
          goBtn.disabled = false;
        });
      }

      goBtn.addEventListener('click', send);
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(); });
    })();
  </script>
"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip files inside node_modules or sections
    if 'node_modules' in filepath or 'sections' in filepath:
        return

    # Check if CSS needs injection
    if '#wa-float {' not in content or '#aiq-float {' not in content:
        if '</style>' in content:
            content = content.replace('</style>', WIDGET_CSS + '\n  </style>', 1)

    # Ensure nav-open rule includes #wa-float
    content = re.sub(
        r'body\.aiq-nav-open\s+\.mqb-bar,\s*body\.aiq-nav-open\s+#aiq-float,\s*body\.aiq-nav-open\s+#vaq-float(?!\s*,\s*body\.aiq-nav-open\s+#wa-float)',
        'body.aiq-nav-open .mqb-bar, body.aiq-nav-open #aiq-float, body.aiq-nav-open #vaq-float, body.aiq-nav-open #wa-float',
        content
    )

    # Check if HTML & Scripts need injection
    if 'id="wa-float"' not in content or 'id="aiq-float"' not in content:
        if '<div id="mobile-quickbar"' in content:
            content = content.replace('<div id="mobile-quickbar"', WIDGET_HTML_AND_SCRIPTS + '\n  <div id="mobile-quickbar"', 1)
        elif '</body>' in content:
            content = content.replace('</body>', WIDGET_HTML_AND_SCRIPTS + '\n</body>', 1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed: {filepath}")

def main():
    root = '/Users/shanepereira/Projects/agentiq'
    files = sorted(
        glob.glob(os.path.join(root, '*.html')) +
        glob.glob(os.path.join(root, 'blog', '*.html')) +
        glob.glob(os.path.join(root, 'tools', '*.html'))
    )
    for filepath in files:
        process_file(filepath)

if __name__ == '__main__':
    main()
