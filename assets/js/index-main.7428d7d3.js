    (function () {
      'use strict';
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Resolve the API base once so all callers share a single variable.
      // window.AgentIQConfig is set by the inline config block above this script.
      // Previously `AGENTIQ_API` was referenced without being declared, which
      // threw a ReferenceError in strict mode and silently broke form submission
      // and the chat widget send path.
      var AGENTIQ_API = (window.AgentIQConfig && window.AgentIQConfig.apiBase) || 'https://agentiq-chatbot.onrender.com';
      window.AGENTIQ_API = AGENTIQ_API;
      var yrEl = document.getElementById('year'); if (yrEl) yrEl.textContent = new Date().getFullYear();
      // Magnetic hero CTA — pulls the button 4-6px toward the cursor within ~40px of its edge,
      // resets on mouseleave. Scoped to a single element (.magnetic-cta) per page by design —
      // do not widen this to every CTA on the page.
      function initMagneticCta(el) {
        if (!el || reduce) return;
        var maxPull = 6, radius = 40;
        function onMove(e) {
          var r = el.getBoundingClientRect();
          var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
          var dx = e.clientX - cx, dy = e.clientY - cy;
          var edgeDist = Math.max(Math.abs(dx) - r.width / 2, Math.abs(dy) - r.height / 2, 0);
          if (edgeDist < radius) {
            var pull = maxPull * (1 - edgeDist / radius);
            var dist = Math.sqrt(dx * dx + dy * dy) || 1;
            el.style.transform = 'translate(' + (dx / dist * pull) + 'px,' + (dy / dist * pull) + 'px)';
          } else {
            el.style.transform = 'translate(0,0)';
          }
        }
        document.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', function () { el.style.transform = 'translate(0,0)'; });
      }
      initMagneticCta(document.querySelector('.magnetic-cta'));
      // Form success reveal — swaps the confirmation block to flex display and (re)triggers the
      // scale-in + checkmark draw-in animation via a forced reflow so it replays on repeat submits.
      function showFormSuccess(msgEl) {
        if (!msgEl) return;
        msgEl.classList.remove('hidden', 'form-success-show');
        msgEl.classList.add('flex');
        void msgEl.offsetWidth;
        msgEl.classList.add('form-success-show');
      }
      // FAQ accordion — smooth height animation via the Web Animations API, replacing the native
      // instant snap. Skipped entirely under prefers-reduced-motion (native toggle still works).
      if (!reduce) {
        document.querySelectorAll('.faq-details').forEach(function (details) {
          var summary = details.querySelector('summary');
          var content = details.querySelector('.faq-content');
          if (!summary || !content) return;
          var anim = null, closing = false, expanding = false;
          summary.addEventListener('click', function (e) {
            e.preventDefault();
            details.style.overflow = 'hidden';
            if (closing || !details.open) { openFaq(); }
            else if (expanding || details.open) { shrinkFaq(); }
          });
          function shrinkFaq() {
            closing = true;
            var startH = details.offsetHeight + 'px';
            var endH = summary.offsetHeight + 'px';
            if (anim) anim.cancel();
            anim = details.animate({ height: [startH, endH] }, { duration: 280, easing: 'ease-out' });
            anim.onfinish = function () { onFaqFinish(false); };
            anim.oncancel = function () { closing = false; };
          }
          function openFaq() {
            details.style.height = details.offsetHeight + 'px';
            details.open = true;
            window.requestAnimationFrame(function () { expandFaq(); });
          }
          function expandFaq() {
            expanding = true;
            var startH = details.offsetHeight + 'px';
            var endH = (summary.offsetHeight + content.offsetHeight) + 'px';
            if (anim) anim.cancel();
            anim = details.animate({ height: [startH, endH] }, { duration: 280, easing: 'ease-out' });
            anim.onfinish = function () { onFaqFinish(true); };
            anim.oncancel = function () { expanding = false; };
          }
          function onFaqFinish(isOpen) {
            details.open = isOpen;
            anim = null; closing = false; expanding = false;
            details.style.height = details.style.overflow = '';
          }
        });
      }
      // Mobile nav — full-screen slide-up sheet, closed via the X button,
      // Escape, tapping a link, or resizing past the md breakpoint. There's
      // no meaningful "click outside" surface once the sheet covers the
      // whole viewport, so that listener (present in the old dropdown
      // version) is intentionally gone.
      var navToggle = document.getElementById('aiq-nav-toggle');
      var navClose = document.getElementById('aiq-nav-close');
      var navPanel = document.getElementById('aiq-mobile-nav');
      var navOpen = false;
      function openNav() {
        navOpen = true;
        navPanel.removeAttribute('inert');
        navPanel.classList.remove('aiq-shut');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // lock background scroll while the sheet is open
        if (navClose) navClose.focus();
      }
      function closeNav(returnFocus) {
        navOpen = false;
        navPanel.classList.add('aiq-shut');
        navToggle.setAttribute('aria-expanded', 'false');
        if (returnFocus !== false) navToggle.focus();
        navPanel.setAttribute('inert', '');
        document.body.style.overflow = '';
      }
      navPanel.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;
        var focusables = navPanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });
      navToggle.addEventListener('click', function () { navOpen ? closeNav() : openNav(); });
      if (navClose) navClose.addEventListener('click', function () { closeNav(); });
      navPanel.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { closeNav(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (navOpen && e.key === 'Escape') closeNav();
      });
      window.matchMedia('(min-width: 768px)').addEventListener('change', function (e) {
        if (e.matches && navOpen) closeNav(false);
      });
      // Scroll reveals
      var revs = document.querySelectorAll('.reveal');
      if (reduce || !('IntersectionObserver' in window)) {
        revs.forEach(function (e) { e.classList.add('in'); });
      } else {
        // Track pending targets so we can fully disconnect once every element
        // has fired. Without this, `io` and its callback closure hold a circular
        // reference indefinitely (io → callback → io), preventing GC.
        var remaining = revs.length;
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.style.transitionDelay = (en.target.dataset.delay || 0) + 'ms';
              en.target.classList.add('in');
              io.unobserve(en.target);
              if (--remaining === 0) { io.disconnect(); }
            }
          });
        }, { threshold: 0.12, rootMargin: '200px 0px 200px 0px' });
        // stagger siblings
        document.querySelectorAll('.grid').forEach(function (grid) {
          grid.querySelectorAll(':scope > .reveal').forEach(function (el, i) { el.dataset.delay = i * 90; });
        });
        revs.forEach(function (e) { io.observe(e); });
        // Safety net: a fast/flicked scroll can carry an element past the
        // observer's trigger zone between checks, leaving it stuck at
        // opacity:0 forever. Catch anything already scrolled out of view
        // that never got marked revealed, and reveal it immediately.
        var scrollTicking = false;
        function checkUnrevealed() {
          scrollTicking = false;
          var unrevealed = document.querySelectorAll('.reveal:not(.in)');
          if (unrevealed.length === 0) {
            window.removeEventListener('scroll', onScrollSafetyNet);
            return;
          }
          unrevealed.forEach(function (el) {
            var r = el.getBoundingClientRect();
            if (r.bottom < 0 || r.top < innerHeight + 250) { el.classList.add('in'); }
          });
          if (document.querySelectorAll('.reveal:not(.in)').length === 0) {
            window.removeEventListener('scroll', onScrollSafetyNet);
          }
        }
        function onScrollSafetyNet() {
          if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(checkUnrevealed);
          }
        }
        window.addEventListener('scroll', onScrollSafetyNet, { passive: true });
      }
      // Count-up
      var counted = false;
      function runCount() {
        if (counted) return; counted = true;
        document.querySelectorAll('.count').forEach(function (el) {
          var to = parseInt(el.dataset.to, 10), dur = 1400, t0 = null;
          if (reduce) { el.textContent = to; return; }
          var done = false;
          // Safety net: the element already shows the correct final value
          // (server-rendered) before this runs. If the main thread stalls
          // and requestAnimationFrame stops firing mid-count, this timeout
          // still lands on a real clock and snaps back to the correct
          // value instead of leaving a glitched intermediate number visible.
          setTimeout(function () {
            if (done) return;
            done = true;
            el.textContent = to;
          }, dur + 200);
          function step(ts) {
            if (done) return;
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / dur, 1);
            el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to);
            if (p < 1) {
              requestAnimationFrame(step);
            } else {
              done = true;
            }
          }
          requestAnimationFrame(step);
        });
      }
      var res = document.getElementById('results');
      if (res && 'IntersectionObserver' in window) {
        new IntersectionObserver(function (e, o) { if (e[0].isIntersecting) { runCount(); o.disconnect(); } }, { threshold: 0.3 }).observe(res);
      } else { runCount(); }
      // Integration logos (Simple Icons paths)
      var logos = [
        { n: 'WhatsApp', p: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884' },
        { n: 'Instagram', p: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.69.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881' },
        { n: 'Messenger', p: 'M.001 11.639C.001 4.949 5.241 0 12 0s12 4.95 12 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 0 0-.64.05l-2.39 1.05a.96.96 0 0 1-1.35-.85l-.07-2.14a.97.97 0 0 0-.32-.68A11.39 11.39 0 0 1 .001 11.639m8.32-2.19-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 0 0-2.61.48' },
        { n: 'Shopify', p: 'M15.337 2.738c-.05-.038-.137-.038-.187 0-.025 0-.7.137-.95.2-.262.062-.512.137-.787.225-.262-.825-.737-1.575-1.6-1.575h-.075c-.25-.312-.55-.45-.812-.45-2.025.012-2.987 2.525-3.287 3.812-.788.238-1.35.413-1.413.438-.437.137-.45.15-.5.562-.05.3-1.187 9.113-1.187 9.113L13.4 24l5.05-1.087S15.4 2.8 15.337 2.738M12.6 4.063l-1.262.387c0-.087.012-.187.012-.287 0-.787-.112-1.425-.287-1.937.687.087 1.15.875 1.537 1.837m-2.025-1.7c.2.5.325 1.2.325 2.162v.137l-2.625.812c.512-1.95 1.462-2.9 2.3-3.112zm-.812-.762c.15 0 .3.05.437.15-1.112.525-2.3 1.837-2.8 4.462l-2.075.638C5.825 5.262 6.937 1.6 9.762 1.6' },
        { n: 'Razorpay', p: 'M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902z' },
        { n: 'HubSpot', p: 'M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.978v-.067A2.2 2.2 0 0 0 17.238.845h-.067a2.2 2.2 0 0 0-2.193 2.194v.067a2.196 2.196 0 0 0 1.252 1.973l.013.006v2.852a6.22 6.22 0 0 0-2.969 1.31l.012-.01-7.86-6.12a2.43 2.43 0 0 0 .085-.62V2.39A2.475 2.475 0 1 0 2.99 4.866h.04c.428-.002.83-.116 1.178-.314l-.012.006 7.736 6.022a6.247 6.247 0 0 0 .096 7.13l-.014-.02-2.353 2.353a2.028 2.028 0 0 0-.585-.093 2.047 2.047 0 1 0 2.046 2.047c0-.21-.033-.412-.092-.602l.004.013 2.328-2.328a6.26 6.26 0 1 0 4.673-11.157zm-1.022 9.405a3.21 3.21 0 1 1 .002-6.42 3.21 3.21 0 0 1-.002 6.42' },
        { n: 'Google Sheets', p: 'M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zM17.455 9.273H6.545v7.909h10.91v-7.91z' },
        { n: 'Telegram', p: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0m4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
      ];
      // Defer marquee DOM injection until idle — it's below the fold and not LCP-critical
      // Uses DOM construction (no innerHTML) so logo path data never touches an HTML parser
      function buildLogoEl(l) {
        var outer = document.createElement('span');
        outer.className = 'integ-card';
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'w-6 h-6');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'currentColor');
        svg.setAttribute('aria-hidden', 'true');
        var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathEl.setAttribute('d', l.p);
        svg.appendChild(pathEl);
        var label = document.createElement('span');
        label.className = 'whitespace-nowrap';
        label.textContent = l.n;
        outer.appendChild(svg);
        outer.appendChild(label);
        return outer;
      }
      function injectLogos() {
        // Row 1 gets the list forward, row 2 gets it reversed — keeps both rows
        // visually distinct instead of showing the same order moving oppositely.
        var row1 = logos, row2 = logos.slice().reverse();
        var r1a = document.getElementById('logoset-r1a'), r1b = document.getElementById('logoset-r1b');
        var r2a = document.getElementById('logoset-r2a'), r2b = document.getElementById('logoset-r2b');
        row1.forEach(function (l) {
          if (r1a) r1a.appendChild(buildLogoEl(l));
          if (r1b) r1b.appendChild(buildLogoEl(l));
        });
        row2.forEach(function (l) {
          if (r2a) r2a.appendChild(buildLogoEl(l));
          if (r2b) r2b.appendChild(buildLogoEl(l));
        });
      }
      if ('requestIdleCallback' in window) {
        requestIdleCallback(injectLogos, { timeout: 2000 });
      } else {
        injectLogos();
      }
      // Interactive demo
      var convo = {
        'Book a table for 4 tonight': "Sure! Table for 4 is reserved for tonight at 8:00 PM at Spice Garden ✅ Would you like me to pre-order starters so they're ready when you arrive?",
        'Can I see today\'s special menu?': "Here are today's chef specials: 1. Truffle Butter Naan (₹180) 2. Dum Pukht Biryani (₹480) 3. Smoked Paneer Tikka (₹360). Would you like to add any of these to your order? 📜",
        'Pre-order 2 portions of Paneer Tikka': "Added 2× Smoked Paneer Tikka (₹720) to your reservation. Shall I send a UPI payment link or would you prefer paying at the table? 🍢",
        'Is valet parking available at your outlet?': "Yes! Complimentary valet parking is available right at our main entrance for all dining guests. 🚗",
        'Book a table for tonight': "Sure! How many guests and what time? I can confirm instantly and even take pre-orders so your food's ready when you arrive. 🍽️",
        'Schedule a salon visit': "I'd love to! Which service — haircut, hair spa or grooming? I'll show open slots with your favourite stylist and lock it in. 💇",
        'Book a doctor appointment': "Of course. Tell me the department and I'll show the next available slots, book it, and send your pre-visit form on WhatsApp. 🩺",
        'Can it talk in Hindi?': "Bilkul! 🙌 Main Hindi aur English dono mein baat kar sakta hoon — aur aap chaaho toh Hinglish mein bhi. Aapki language preference kya hai?",
        'What is your pricing?': "Managed WhatsApp AI chatbots start at ₹7,999/mo (+ ₹24,999 setup). Voice AI starts at ₹14,999/mo (+ ₹29,999 setup with 250 mins included). Both include complete done-for-you training and 30-day money-back guarantee! 🚀",
        'Book a demo': "Love it! Drop your name and WhatsApp number in the form below and our team will reach out within a few hours to lock a 20-min slot. 📅",
      };
      var log = document.getElementById('chatlog');
      function bubble(text, who) {
        var d = document.createElement('div');
        d.className = who === 'me'
          ? 'ml-auto max-w-[82%] bg-gradient-to-br from-cyan-deep to-blue-deep text-white rounded-2xl rounded-tr-md px-3.5 py-2.5'
          : 'max-w-[82%] bg-white/10 text-slate-100 rounded-2xl rounded-tl-md px-3.5 py-2.5';
        d.textContent = text;
        log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
      }
      function typing() {
        var d = document.createElement('div');
        d.className = 'inline-flex items-center gap-1.5 bg-white/8 rounded-2xl rounded-tl-md px-4 py-3';
        var sr = document.createElement('span');
        sr.className = 'sr-only';
        sr.textContent = 'AgentIQ is typing…';
        d.appendChild(sr);
        for (var di = 0; di < 3; di++) {
          var dot = document.createElement('span');
          dot.setAttribute('aria-hidden', 'true');
          dot.className = 'dot';
          d.appendChild(dot);
        }
        log.appendChild(d); log.scrollTop = log.scrollHeight; return d;
      }
      function botReply(text) {
        var t = typing();
        var wait = reduce ? 250 : 850;
        setTimeout(function () {
          t.remove();
          if (reduce) { bubble(text, 'bot'); return; }
          var d = bubble('', 'bot'); var i = 0;
          d.setAttribute('aria-hidden', 'true');
          (function stream() {
            if (i <= text.length) { d.textContent = text.slice(0, i); log.scrollTop = log.scrollHeight; i += 2; setTimeout(stream, 14); }
            else { d.removeAttribute('aria-hidden'); d.textContent = text; }
          })();
        }, wait);
      }
      var isTyping = false;
      function ask(q) {
        if (isTyping) return;
        isTyping = true;
        bubble(q, 'me');
        var reply = convo[q] || ("Thanks for asking about \"" + q + "\"! Our AI understands complex context and resolves 80%+ of customer inquiries instantly.");
        botReply(reply);
        setTimeout(function () { isTyping = false; }, 1200);
      }
      function activateChat() {
        document.querySelectorAll('.demo-chip-btn').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var q = btn.getAttribute('data-query') || btn.textContent.trim();
            ask(q);
            if (typeof gtag === 'function') {
              gtag('event', 'select_content', { content_type: 'demo_chip', item_id: q });
            }
          });
        });

        var chatForm = document.getElementById('demo-chat-form');
        var chatInput = document.getElementById('demo-chat-input');
        if (chatForm && chatInput) {
          chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var val = chatInput.value.trim();
            if (!val) return;
            chatInput.value = '';
            ask(val);
          });
        }
      }
      activateChat();
      // ==== BOOKING DEMO (WHATSAPP REDIRECT) ====
      // Lead form
      var form = document.getElementById('leadform');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('name'), phone = document.getElementById('phone');
        var ok = true, firstInvalid = null;
        function setError(field, errId, invalid) {
          var err = document.getElementById(errId);
          if (invalid) {
            field.classList.add('ring-2', 'ring-red-400');
            field.setAttribute('aria-invalid', 'true');
            if (err) err.classList.remove('hidden');
            if (!firstInvalid) firstInvalid = field;
            ok = false;
          } else {
            field.classList.remove('ring-2', 'ring-red-400');
            field.removeAttribute('aria-invalid');
            if (err) err.classList.add('hidden');
          }
        }
        // Phone: require at least 8 digits so "abc" is rejected with a real suggestion (SC 3.3.3)
        setError(name, 'name-err', !name.value.trim());
        setError(phone, 'phone-err', (phone.value.replace(/\D/g, '').length < 8));
        if (!ok) { if (firstInvalid) firstInvalid.focus(); return; }
        // GA4: generate_lead — fire after validation passes, before the network call
        if (typeof gtag === 'function') {
          var channelValueMap = {
            'AI Chatbot (WhatsApp / Instagram / Website)': 24999,
            'Voice Agent': 39999,
            'Both — Chatbot + Voice Agent': 79999,
            'Not sure yet': 0
          };
          var selectedChannel = document.getElementById('channel').value;
          gtag('event', 'generate_lead', {
            currency: 'INR',
            value: channelValueMap[selectedChannel] || 0,
            method: 'lead_form',
            channel_interest: selectedChannel
          });
        }
        var nameVal = name.value.trim();
        var phoneVal = phone.value.trim();
        var bizVal = document.getElementById('business').value.trim();
        var channelVal = document.getElementById('channel').value;
        // Send lead to backend (non-blocking)
        if (AGENTIQ_API) {
          fetch(AGENTIQ_API + '/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: nameVal,
              phone: phoneVal.replace(/[\s\-\(\)]/g, ''),
              business: bizVal,
              channel: channelVal,
            }),
          }).then(function (r) {
            if (!r.ok) console.error('[AgentIQ] Lead POST failed:', r.status, r.statusText);
          }).catch(function (err) {
            console.error('[AgentIQ] Lead POST error:', err);
          });
        }
        var waMessage = "Hi AgentIQ, I'd like to book a demo.\nName: " + nameVal + "\nWhatsApp: " + phoneVal;
        if (bizVal) waMessage += "\nBusiness: " + bizVal;
        if (channelVal) waMessage += "\nInterested in: " + channelVal;
        var waUrl = 'https://wa.me/919159665277?text=' + encodeURIComponent(waMessage);
        var fallbackLink = document.getElementById('wa-fallback-link');
        if (fallbackLink) fallbackLink.href = waUrl;
        var submitBtn = form.querySelector('button[type=submit]');
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-spinner').classList.remove('hidden');
        submitBtn.querySelector('.btn-arrow').classList.add('hidden');
        submitBtn.querySelector('.btn-label').textContent = 'Opening WhatsApp…';
        showFormSuccess(document.getElementById('formmsg'));
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      });
      // ── AI Chat Widget ───────────────────────────────
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
        var leadForm = document.getElementById('aiq-lead-form');
        var leadNameInput = document.getElementById('aiq-lname');
        var leadPhoneInput = document.getElementById('aiq-lphone');
        var leadBizInput = document.getElementById('aiq-lbiz');
        var leadStartBtn = document.getElementById('aiq-lead-start');
        var aiqBar = document.getElementById('aiq-bar');
        var chatSessionId = 'aiq_' + Math.random().toString(36).slice(2, 11) + '_' + Date.now().toString(36);
        function proceedToChat(name, phone, business) {
          leadCaptured = true;
          leadForm.style.display = 'none';
          log.style.display = 'flex';
          aiqBar.style.display = 'flex';
          var greeting = 'Hi ' + name + '! 👋 Ask me anything about our AI chatbots, voice agents, pricing, or how we can automate your business.';
          // Feed the lead-form details into the conversation so Claude already
          // knows them — otherwise it has no way to see this info (it's only
          // otherwise sent to /lead for the Sheet) and will re-ask for name,
          // phone, and business type per its system prompt.
          msgs.push({
            role: 'user',
            content: '[Lead form already completed — do not ask for these again. Name: ' + name + '. Phone: ' + phone + (business ? '. Business type: ' + business + '.' : '.') + ']',
          });
          msgs.push({ role: 'assistant', content: greeting });
          streamBubble(greeting);
          inp.focus();
        }

        leadStartBtn.addEventListener('click', function () {
          var name = leadNameInput.value.trim();
          var phone = leadPhoneInput.value.trim();
          if (!name || phone.replace(/\D/g, '').length < 8) {
            leadNameInput.style.borderColor = !name ? '#ef4444' : '';
            leadPhoneInput.style.borderColor = phone.replace(/\D/g, '').length < 8 ? '#ef4444' : '';
            return;
          }
          leadStartBtn.disabled = true;
          leadStartBtn.textContent = 'Connecting…';
          var business = leadBizInput.value.trim();

          var existingErr = document.getElementById('aiq-lead-err');
          if (existingErr) existingErr.remove();

          var ctrl = new AbortController();
          var timer = setTimeout(function () { ctrl.abort(); }, 7000);

          var targetUrl = '/api/capture-lead';
          fetch(targetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, phone: phone.replace(/[\s\-\(\)]/g, ''), business: business, source: 'chat_widget' }),
            signal: ctrl.signal,
          }).then(function (r) {
            clearTimeout(timer);
            if (!r.ok) throw new Error('Server returned ' + r.status);
            // GA4: generate_lead (chat widget path)
            if (typeof gtag === 'function') {
              gtag('event', 'generate_lead', { currency: 'INR', value: 0, method: 'chat_widget' });
            }
            proceedToChat(name, phone, business);
          }).catch(function (err) {
            clearTimeout(timer);
            console.error('[AgentIQ] Widget lead submission error:', err);
            leadStartBtn.disabled = false;
            leadStartBtn.textContent = 'Start Chat →';

            var errDiv = document.createElement('div');
            errDiv.id = 'aiq-lead-err';
            errDiv.className = 'mt-3 p-2.5 rounded-xl text-center border text-xs';
            errDiv.style.background = 'rgba(239, 68, 68, 0.12)';
            errDiv.style.borderColor = 'rgba(239, 68, 68, 0.35)';
            errDiv.style.color = '#fca5a5';

            var waMsg = "Hi AgentIQ, I'd like to chat.\nName: " + name + "\nWhatsApp: " + phone + (business ? "\nBusiness: " + business : "");
            var waLink = "https://wa.me/919159665277?text=" + encodeURIComponent(waMsg);

            errDiv.innerHTML = '<span style="font-weight:600;">⚠️ Network delay saving details.</span><br>' +
              '<a href="' + waLink + '" target="_blank" rel="noopener noreferrer" style="color:#34d399;font-weight:600;text-decoration:underline;display:inline-block;margin-top:4px;">Chat directly on WhatsApp →</a> ' +
              '<span style="color:#94a3b8;margin:0 4px;">or</span> ' +
              '<button type="button" id="aiq-skip-lead" style="color:#94a3b8;text-decoration:underline;cursor:pointer;background:none;border:none;padding:0;font-size:12px;">continue to web chat</button>';

            leadForm.appendChild(errDiv);

            var skipBtn = document.getElementById('aiq-skip-lead');
            if (skipBtn) {
              skipBtn.addEventListener('click', function () {
                proceedToChat(name, phone, business);
              });
            }
          });
        });
        function openChat() {
          open = true;
          panel.removeAttribute('inert');
          panel.classList.remove('aiq-shut');
          toggle.setAttribute('aria-expanded', 'true');
          notif.classList.add('aiq-gone');
          toggle.setAttribute('aria-label', 'Chat with AgentIQ AI');
          if (leadCaptured) inp.focus(); else leadNameInput.focus();
          var apiUrl = (window.AgentIQConfig && window.AgentIQConfig.apiBase) || window.AGENTIQ_API || 'https://agentiq-chatbot.onrender.com';
          if (apiUrl) fetch(apiUrl + '/health', { mode: 'no-cors' }).catch(function () {});
        }
        function closeChat(returnFocus) {
          open = false;
          panel.classList.add('aiq-shut');
          toggle.setAttribute('aria-expanded', 'false');
          // Return focus before making the panel inert (an inert element can't hold focus)
          if (returnFocus !== false) toggle.focus();
          panel.setAttribute('inert', '');
        }
        toggle.addEventListener('click', function () { open ? closeChat() : openChat(); });
        xBtn.addEventListener('click', function () { closeChat(); });
        // Escape closes the chat and returns focus to the toggle (SC 2.1.2 / 2.4.3)
        // Tab/Shift+Tab is trapped inside the panel while open (SC 2.4.3) so keyboard
        // and screen-reader users can't tab out into the background page.
        var focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        panel.addEventListener('keydown', function (e) {
          if (!open) return;
          if (e.key === 'Escape') { e.preventDefault(); closeChat(); return; }
          if (e.key !== 'Tab') return;
          var focusable = Array.prototype.filter.call(panel.querySelectorAll(focusableSelector), function (el) {
            return el.offsetParent !== null;
          });
          if (!focusable.length) return;
          var first = focusable[0];
          var last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        });
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
          var sr = document.createElement('span');
          sr.className = 'sr-only';
          sr.textContent = 'AgentIQ is typing…';
          d.appendChild(sr);
          var dots = document.createElement('div');
          dots.className = 'aiq-dots';
          dots.setAttribute('aria-hidden', 'true');
          for (var i = 0; i < 3; i++) dots.appendChild(document.createElement('span'));
          d.appendChild(dots);
          log.appendChild(d);
          log.scrollTop = log.scrollHeight;
          return d;
        }
        function streamBubble(text) {
          if (reduce || !text) { addBubble(text, 'bot'); return; }
          var d = addBubble('', 'bot');
          // Reply is already fully generated by the time this runs — this is
          // cosmetic only. Step size scales with length so total animation
          // time stays capped (~200ms) instead of growing with reply length
          // (previously fixed step=2 @ 14ms could add 4-5s to long replies).
          var step = Math.max(3, Math.ceil(text.length / 20));
          var i = 0;
          d.setAttribute('aria-hidden', 'true');
          (function tick() {
            if (i <= text.length) {
              d.textContent = text.slice(0, i);
              log.scrollTop = log.scrollHeight;
              i += step; setTimeout(tick, 10);
            } else { d.removeAttribute('aria-hidden'); d.textContent = text; }
          })();
        }
        function send() {
          var text = inp.value.trim();
          if (!text) return;
          inp.value = '';
          addBubble(text, 'me');
          msgs.push({ role: 'user', content: text });
          var t = addTyping();
          goBtn.disabled = true;
          var activeApi = (window.AgentIQConfig && window.AgentIQConfig.apiBase) || window.AGENTIQ_API || 'https://agentiq-chatbot.onrender.com';
          if (!activeApi) {
            setTimeout(function () {
              t.remove();
              var fb = 'Great question! Our AI assistants handle bookings, orders and FAQs 24/7. — Book a free demo at the bottom of this page to see yours live. 🚀';
              msgs.push({ role: 'assistant', content: fb });
              streamBubble(fb);
              goBtn.disabled = false;
            }, reduce ? 200 : 850);
            return;
          }
          var ctrl = new AbortController();
          var fetchTimer = setTimeout(function () { ctrl.abort(); }, 45000);
          fetch(activeApi + '/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: msgs, sessionId: chatSessionId }),
            signal: ctrl.signal,
          })
            .then(function (r) {
              clearTimeout(fetchTimer);
              if (!r.ok) {
                return r.json().catch(function () { return {}; }).then(function (data) {
                  throw new Error(data.error || ('HTTP ' + r.status));
                });
              }
              var contentType = r.headers.get('Content-Type') || '';
              if (contentType.indexOf('application/json') !== -1) {
                return r.json().then(function (data) {
                  t.remove();
                  var reply = data.reply || 'Great question! Our AI assistants handle bookings, orders and FAQs 24/7. — Book a free demo to see yours live! 🚀';
                  msgs.push({ role: 'assistant', content: reply });
                  streamBubble(reply);
                  goBtn.disabled = false;
                });
              }
              // Real token stream — render chunks as they arrive
              t.remove();
              var d = addBubble('', 'bot');
              d.setAttribute('aria-hidden', 'true');
              var full = '';
              var reader = r.body.getReader();
              var decoder = new TextDecoder();
              return (function pump() {
                return reader.read().then(function (result) {
                  if (result.done) {
                    d.removeAttribute('aria-hidden');
                    msgs.push({ role: 'assistant', content: full });
                    goBtn.disabled = false;
                    return;
                  }
                  full += decoder.decode(result.value, { stream: true });
                  d.textContent = full;
                  log.scrollTop = log.scrollHeight;
                  return pump();
                });
              })();
            })
            .catch(function (err) {
              clearTimeout(fetchTimer);
              t.remove();
              var msg = (err && err.name === 'AbortError')
                ? 'Request timed out — please try again.'
                : 'Network issue — please try again in a moment.';
              console.error('[AgentIQ] Chat fetch error:', err);
              addBubble(msg, 'bot');
              goBtn.disabled = false;
            });
        }
        goBtn.addEventListener('click', send);
        inp.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.preventDefault(); send(); }
        });
        // Greet after 3 s — but wait for browser idle first so this never competes with LCP/FID
        var greetFn = function () {
          setTimeout(function () {
            if (!open) {
              notif.classList.remove('aiq-gone');
              toggle.setAttribute('aria-label', 'Chat with AgentIQ AI — 1 new message');
            }
          }, 3000);
        };
        if ('requestIdleCallback' in window) {
          requestIdleCallback(greetFn, { timeout: 5000 });
        } else {
          greetFn();
        }
      })();
      // ── GA4 Tracking — delegated listeners ───────────────────────────
      // Pricing CTA clicks → begin_checkout
      // Works for all 6 plan cards via the data-plan / data-value attributes
      // added to each <a href="#book"> element in the pricing sections.
      document.addEventListener('click', function (e) {
        var el = e.target.closest('[data-plan]');
        if (!el || typeof gtag !== 'function') return;
        gtag('event', 'begin_checkout', {
          currency: 'INR',
          value: parseInt(el.dataset.value || '0', 10),
          items: [{ item_name: el.dataset.plan, price: parseInt(el.dataset.value || '0', 10) }]
        });
      });
      // WhatsApp CTA clicks (floating button, in-form link, footer links)
      document.querySelectorAll('a[href*="wa.me"]').forEach(function (el) {
        el.addEventListener('click', function () {
          if (typeof gtag !== 'function') return;
          gtag('event', 'click', { event_category: 'whatsapp_cta', event_label: 'WhatsApp' });
        });
      });
      // ── Navbar: lift/intensify glass once scrolled past the top ──────
      var siteNav = document.getElementById('site-nav');
      if (siteNav && !reduce) {
        var onNavScroll = function () {
          siteNav.classList.toggle('is-scrolled', window.scrollY > 20);
        };
        window.addEventListener('scroll', onNavScroll, { passive: true });
        onNavScroll();
      }
      // ── Card tilt-on-hover ─────────────────────────────────────────────
      // Sets --tilt-x/--tilt-y (read by the .tilt-card CSS transform) from
      // pointer position relative to each card's center. Capped at a small
      // angle so it reads as "tangible", not gimmicky.
      if (!reduce) {
        var TILT_MAX_DEG = 6;
        document.querySelectorAll('.tilt-card').forEach(function (card) {
          card.addEventListener('mousemove', function (e) {
            var r = card.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width;  // 0 (left) → 1 (right)
            var py = (e.clientY - r.top) / r.height;  // 0 (top) → 1 (bottom)
            var tiltY = (px - 0.5) * 2 * TILT_MAX_DEG;       // left/right tilt
            var tiltX = (0.5 - py) * 2 * TILT_MAX_DEG;       // up/down tilt
            card.style.setProperty('--tilt-x', tiltX.toFixed(2) + 'deg');
            card.style.setProperty('--tilt-y', tiltY.toFixed(2) + 'deg');
          });
          card.addEventListener('mouseleave', function () {
            card.style.setProperty('--tilt-x', '0deg');
            card.style.setProperty('--tilt-y', '0deg');
          });
        });
      }
      // ── Shipped products feature slider ───────────────────────────────
      var FS_SLIDES = [
        {
          badge: 'WhatsApp · Restaurant ordering', badgeColor: 'emerald',
          title: 'Restaurants that never miss an order',
          desc: "From table bookings to WhatsApp ordering, our AI concierge handles the full guest journey — no app, no hold music.",
          ctaHref: 'restaurants.html', ctaLabel: 'View Live Demo',
          chatName: 'Spice Route · WhatsApp',
          chat: [
            { from: 'them', text: 'Table for 4 tonight at 8? 🍽️' },
            { from: 'me', text: "Booked! ✅ Table for 4 at 8:00 PM. Want to pre-order starters so they're ready?" },
            { from: 'them', text: 'Yes — 2 Paneer Tikka 🍢' },
            { from: 'me', text: 'Added 2× Paneer Tikka (₹520). Pay now via link or at the table?' },
          ],
        },
        {
          badge: 'Instagram · DM booking', badgeColor: 'fuchsia',
          title: 'Salons that book themselves',
          desc: 'Clients pick a slot, pay a deposit, and get reminders — all inside Instagram DMs and WhatsApp, all automatic.',
          ctaHref: 'salons.html', ctaLabel: 'View Live Demo',
          chatName: 'Luxe Salon · Instagram',
          chat: [
            { from: 'them', text: 'Any slot for hair spa this Saturday? 💆‍♀️' },
            { from: 'me', text: 'Yes! Sat 11:30 AM or 4:00 PM with our senior stylist. Which works?' },
            { from: 'them', text: '11:30 please' },
            { from: 'me', text: 'Booked for Sat 11:30 AM 🎉 Reminder + location sent. See you soon!' },
          ],
        },
        {
          badge: 'Website · Appointment widget', badgeColor: 'cyan',
          title: 'Clinics that qualify patients automatically',
          desc: 'Department routing, doctor availability, pre-visit forms and report follow-ups — right from your website chat.',
          ctaHref: 'clinics.html', ctaLabel: 'View Live Demo',
          chatName: 'City Care · Website',
          chat: [
            { from: 'them', text: 'I need a dermatologist appointment.' },
            { from: 'me', text: 'Sure! Dr. Rao has Mon 10:15 AM & Tue 6:00 PM open. Shall I book one?' },
            { from: 'them', text: 'Tuesday 6 PM works.' },
            { from: 'me', text: 'Confirmed for Tue 6:00 PM with Dr. Rao 📋 Pre-visit form sent on WhatsApp.' },
          ],
        },
      ];
      var fsTrack = document.getElementById('fs-track'), fsDots = document.getElementById('fs-dots');
      var fsIndex = 0;
      var totalFsSlides = 3;

      function fsRenderDots() {
        if (!fsDots) return;
        fsDots.setAttribute('role', 'tablist');
        fsDots.setAttribute('aria-label', 'Product slides');
        fsDots.innerHTML = '';
        for (var i = 0; i < totalFsSlides; i++) {
          (function(idx) {
            var dot = document.createElement('button');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-selected', idx === fsIndex ? 'true' : 'false');
            dot.setAttribute('aria-controls', 'fs-track');
            dot.className = 'fs-dot' + (idx === fsIndex ? ' is-active' : '');
            dot.setAttribute('aria-label', 'Product slide ' + (idx + 1));
            dot.addEventListener('click', function () { fsGoTo(idx); });
            fsDots.appendChild(dot);
          })(i);
        }
      }

      function fsGoTo(i) {
        if (!fsTrack) return;
        fsIndex = (i + totalFsSlides) % totalFsSlides;
        fsTrack.style.transform = 'translateX(-' + (fsIndex * 100) + '%)';
        if (fsDots) {
          Array.prototype.forEach.call(fsDots.children, function (d, di) {
            var active = (di === fsIndex);
            d.classList.toggle('is-active', active);
            d.setAttribute('aria-selected', active ? 'true' : 'false');
          });
        }
      }

      if (fsTrack) {
        fsTrack.setAttribute('aria-live', 'polite');
        fsRenderDots();
        fsGoTo(0);
        var fsPrev = document.getElementById('fs-prev'), fsNext = document.getElementById('fs-next');
        if (fsPrev) fsPrev.addEventListener('click', function () { fsGoTo(fsIndex - 1); });
        if (fsNext) fsNext.addEventListener('click', function () { fsGoTo(fsIndex + 1); });
      }
      // ── Case Study & Social Proof Carousel Logic ─────────────────────
      (function() {
        var csTabs = document.querySelectorAll('.cs-tab');
        var csDots = document.querySelectorAll('.cs-dot');
        var csPrev = document.getElementById('cs-prev');
        var csNext = document.getElementById('cs-next');
        
        var csBadge = document.getElementById('cs-badge');
        var csLocation = document.getElementById('cs-location');
        var csTitle = document.getElementById('cs-title');
        var csM1Val = document.getElementById('cs-m1-val');
        var csM1Lbl = document.getElementById('cs-m1-lbl');
        var csM2Val = document.getElementById('cs-m2-val');
        var csM2Lbl = document.getElementById('cs-m2-lbl');
        var csM3Val = document.getElementById('cs-m3-val');
        var csM3Lbl = document.getElementById('cs-m3-lbl');
        var csQuote = document.getElementById('cs-quote');
        var csAvatar = document.getElementById('cs-avatar');
        var csAuthor = document.getElementById('cs-author');
        var csRole = document.getElementById('cs-role');
        var csFlowTag = document.getElementById('cs-flow-tag');
        var csS1Title = document.getElementById('cs-s1-title');
        var csS1Sub = document.getElementById('cs-s1-sub');
        var csS2Title = document.getElementById('cs-s2-title');
        var csS2Sub = document.getElementById('cs-s2-sub');
        var csS3Title = document.getElementById('cs-s3-title');
        var csS3Sub = document.getElementById('cs-s3-sub');
        var csCardContainer = document.getElementById('cs-card-container');

        if (!csTitle) return;

        var csData = [
          {
            badge: 'Verified Meta Cloud API Case Study', location: 'Mumbai · Hospitality',
            title: 'Spice Route Gourmet: +310% Table Pre-orders & Zero Missed Inquiries',
            m1Val: '+310%', m1Lbl: 'Pre-Orders Locked',
            m2Val: '0.2s', m2Lbl: 'WhatsApp Response',
            m3Val: '₹3.8L', m3Lbl: 'Saved Monthly',
            quote: '"Before AgentIQ, our staff missed over 40% of peak-hour weekend call inquiries. Now, our WhatsApp AI concierge books tables, collects pre-orders, and auto-syncs with our POS instantly."',
            avatar: 'VN', author: 'Vikram Narang', role: 'Co-Founder · Spice Route Dining Group, Mumbai',
            flowTag: 'WhatsApp + POS Sync',
            s1Title: 'Customer Inquires via WhatsApp', s1Sub: '"Table for 4 tonight at 8 PM?"',
            s2Title: 'AgentIQ AI Concierge Responds (0.2s)', s2Sub: '"Confirmed! Want to pre-order starters?"',
            s3Title: 'Automated POS & Sheets Sync', s3Sub: 'Reservation logged & kitchen notified.'
          },
          {
            badge: 'Salon Slot Booking Case Study', location: 'Bengaluru · Beauty & Wellness',
            title: 'Luxe Hair & Spa: +240% Slot Locking & ₹1.8L Extra Monthly Revenue',
            m1Val: '+240%', m1Lbl: 'Slot Lockings',
            m2Val: '88%', m2Lbl: 'No-Show Drop',
            m3Val: '₹1.8L', m3Lbl: 'Extra Rev / Mo',
            quote: '"Clients love booking their haircut & spa slots at midnight over WhatsApp. AgentIQ collects advance deposits so zero-show cancellations dropped by 88%!"',
            avatar: 'PS', author: 'Priya Sharma', role: 'Chief Operations Officer · Luxe Spa Chain',
            flowTag: 'WhatsApp + Razorpay',
            s1Title: 'Client Requests Haircut Slot', s1Sub: '"Any opening Saturday at 11 AM?"',
            s2Title: 'AgentIQ Checks Stylist Schedule', s2Sub: '"Senior Stylist Priya open! Lock with ₹300 deposit?"',
            s3Title: 'Instant Payment & Confirmation', s3Sub: 'Slot locked on Google Calendar.'
          },
          {
            badge: 'Clinic Patient Triage Case Study', location: 'Delhi NCR · Healthcare',
            title: 'Apex Dermatology: 88% No-Show Reduction & Instant Patient Intake',
            m1Val: '88%', m1Lbl: 'No-Show Drop',
            m2Val: '100%', m2Lbl: 'Intake Forms Sync',
            m3Val: '15 Hrs', m3Lbl: 'Saved / Week',
            quote: '"Our reception desk was overwhelmed with appointment calls. AgentIQ handles patient intake, qualifies medical queries, and sends pre-visit intake forms automatically."',
            avatar: 'DR', author: 'Dr. Ananya Rao', role: 'Lead Dermatologist · Apex Skin Clinic',
            flowTag: 'WhatsApp + Google Sheets',
            s1Title: 'Patient Queries Consultation', s1Sub: '"Need dermatologist slot for Thursday."',
            s2Title: 'AgentIQ Qualifies & Schedules', s2Sub: '"Dr. Ananya available at 4:30 PM. Form link sent!"',
            s3Title: 'Pre-Visit Intake Logged', s3Sub: 'Patient medical notes synced to Sheets.'
          },
          {
            badge: 'D2C E-commerce Case Study', location: 'Surat · Fashion & Retail',
            title: 'Velvet Apparel: +185% Abandoned Cart Recovery via WhatsApp DM',
            m1Val: '+185%', m1Lbl: 'Cart Recoveries',
            m2Val: '3.2s', m2Lbl: 'Order Track Speed',
            m3Val: '₹5.4L', m3Lbl: 'Recovered Sales',
            quote: '"Integrating AgentIQ with our Shopify store turned abandoned carts into completed orders. Customers get instant WhatsApp tracking without emailing support."',
            avatar: 'VM', author: 'Vikram Mehta', role: 'Head of Growth · Velvet Fashion D2C',
            flowTag: 'Shopify + WhatsApp',
            s1Title: 'Cart Abandoned on Checkout', s1Sub: 'Customer left ₹3,400 cart.',
            s2Title: 'AgentIQ Triggers WhatsApp Offer', s2Sub: '"Hi Vikram! Lock 10% off your cart now 🎉"',
            s3Title: '1-Click Checkout Complete', s3Sub: 'Order confirmed & tracking link generated.'
          },
          {
            badge: 'Real Estate Lead Qualification', location: 'Pune · Property & Construction',
            title: 'Skyline Developers: +420% Qualified Site Visit Bookings',
            m1Val: '+420%', m1Lbl: 'Site Visits',
            m2Val: '< 1 min', m2Lbl: 'Lead Response',
            m3Val: '₹14.5L', m3Lbl: 'Ad Spend ROI',
            quote: '"High-intent buyers want floor plans and site visits immediately. AgentIQ filters tire-kickers and schedules serious buyers directly with our sales team."',
            avatar: 'SD', author: 'Sameer Deshmukh', role: 'VP Sales · Skyline Infra Projects',
            flowTag: 'Meta Ads + WhatsApp',
            s1Title: 'Ad Click to WhatsApp DM', s1Sub: '"Send 2 BHK price & floor plan."',
            s2Title: 'AgentIQ Delivers PDF & Qualifies', s2Sub: '"Brochure sent! Book site visit for Sunday?"',
            s3Title: 'Site Visit Confirmed', s3Sub: 'Lead assigned to sales rep on CRM.'
          }
        ];

        var csCurrentIndex = 0;
        var csAutoTimer = null;

        function renderCaseStudy(idx) {
          csCurrentIndex = (idx + csData.length) % csData.length;
          var item = csData[csCurrentIndex];

          if (csCardContainer) {
            csCardContainer.style.opacity = '0.5';
            csCardContainer.style.transform = 'translateY(4px)';
          }

          setTimeout(function() {
            if (csBadge) csBadge.textContent = item.badge;
            if (csLocation) csLocation.textContent = item.location;
            if (csTitle) csTitle.textContent = item.title;
            if (csM1Val) csM1Val.textContent = item.m1Val;
            if (csM1Lbl) csM1Lbl.textContent = item.m1Lbl;
            if (csM2Val) csM2Val.textContent = item.m2Val;
            if (csM2Lbl) csM2Lbl.textContent = item.m2Lbl;
            if (csM3Val) csM3Val.textContent = item.m3Val;
            if (csM3Lbl) csM3Lbl.textContent = item.m3Lbl;
            if (csQuote) csQuote.textContent = item.quote;
            if (csAvatar) csAvatar.textContent = item.avatar;
            if (csAuthor) csAuthor.textContent = item.author;
            if (csRole) csRole.textContent = item.role;
            if (csFlowTag) csFlowTag.textContent = item.flowTag;
            if (csS1Title) csS1Title.textContent = item.s1Title;
            if (csS1Sub) csS1Sub.textContent = item.s1Sub;
            if (csS2Title) csS2Title.textContent = item.s2Title;
            if (csS2Sub) csS2Sub.textContent = item.s2Sub;
            if (csS3Title) csS3Title.textContent = item.s3Title;
            if (csS3Sub) csS3Sub.textContent = item.s3Sub;

            // Update Tabs styling
            csTabs.forEach(function(tab, i) {
              var isSel = (i === csCurrentIndex);
              tab.setAttribute('aria-selected', isSel ? 'true' : 'false');
              if (isSel) {
                tab.className = 'cs-tab px-5 py-2.5 rounded-xl font-600 text-sm whitespace-nowrap transition-all cursor-pointer bg-gradient-to-r from-coral-deep to-orange-deep text-white shadow-lg shadow-coral/25';
              } else {
                tab.className = 'cs-tab px-5 py-2.5 rounded-xl font-500 text-sm whitespace-nowrap transition-all cursor-pointer text-slate-400 hover:text-white glass border border-white/5';
              }
            });

            // Update Dots styling
            csDots.forEach(function(dot, i) {
              var isSel = (i === csCurrentIndex);
              dot.setAttribute('aria-selected', isSel ? 'true' : 'false');
              if (isSel) {
                dot.className = 'cs-dot w-3.5 h-3.5 rounded-full bg-cyan transition-all cursor-pointer';
              } else {
                dot.className = 'cs-dot w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/40 transition-all cursor-pointer';
              }
            });

            if (csCardContainer) {
              csCardContainer.setAttribute('aria-labelledby', 'cs-tab-' + csCurrentIndex);
              csCardContainer.style.opacity = '1';
              csCardContainer.style.transform = 'translateY(0)';
            }
          }, 150);
        }

        function startAutoRotate() {
          stopAutoRotate();
          csAutoTimer = setInterval(function() {
            renderCaseStudy(csCurrentIndex + 1);
          }, 6000);
        }

        function stopAutoRotate() {
          if (csAutoTimer) clearInterval(csAutoTimer);
        }

        // Add event listeners for tabs, dots, and prev/next buttons
        csTabs.forEach(function(tab) {
          tab.addEventListener('click', function() {
            var idx = parseInt(tab.getAttribute('data-case'), 10);
            renderCaseStudy(idx);
            startAutoRotate();
          });
        });

        csDots.forEach(function(dot) {
          dot.addEventListener('click', function() {
            var idx = parseInt(dot.getAttribute('data-case'), 10);
            renderCaseStudy(idx);
            startAutoRotate();
          });
        });

        if (csPrev) {
          csPrev.addEventListener('click', function() {
            renderCaseStudy(csCurrentIndex - 1);
            startAutoRotate();
          });
        }

        if (csNext) {
          csNext.addEventListener('click', function() {
            renderCaseStudy(csCurrentIndex + 1);
            startAutoRotate();
          });
        }

        // Pause auto-rotation on mouse enter
        if (csCardContainer) {
          csCardContainer.addEventListener('mouseenter', stopAutoRotate);
          csCardContainer.addEventListener('mouseleave', startAutoRotate);
        }

        renderCaseStudy(0);
        startAutoRotate();
      })();
      // ── Universal smooth scroll & hash router ─────────────────────────
      function scrollToHash(hash, e, smooth) {
        if (!hash || hash === '#' || hash === '/') return;
        var cleanId = hash.replace(/^(\/?#|\/?)/, '');
        if (!cleanId) return;
        var target = document.getElementById(cleanId);
        if (!target && cleanId === 'book') {
          target = document.getElementById('book-section');
        }
        if (target) {
          if (e && e.preventDefault) e.preventDefault();
          target.querySelectorAll('.reveal').forEach(function(r){ r.classList.add('in'); });
          target.scrollIntoView({
            behavior: smooth === false ? 'auto' : 'smooth',
            block: 'start'
          });
          if (history.pushState) {
            history.pushState(null, null, '#' + cleanId);
          }
        }
      }

      document.addEventListener('click', function(e) {
        var anchor = e.target.closest('a');
        if (!anchor) return;
        var href = anchor.getAttribute('href');
        if (!href) return;
        if (href.startsWith('#') || (href.startsWith('/#') && (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === ''))) {
          var hash = href.startsWith('/#') ? href.substring(1) : href;
          if (hash.length > 1) {
            var target = document.getElementById(hash.substring(1));
            if (!target && hash === '#book') target = document.getElementById('book-section');
            if (target) {
              e.preventDefault();
              scrollToHash(hash, e, true);
              var navPanel = document.getElementById('aiq-mobile-nav');
              var navToggle = document.getElementById('aiq-nav-toggle');
              if (navPanel && !navPanel.classList.contains('aiq-shut')) {
                navPanel.classList.add('aiq-shut');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
                navPanel.setAttribute('inert', '');
              }
            }
          }
        }
      });

      function handleInitialHash() {
        if (window.location.hash) {
          setTimeout(function() { scrollToHash(window.location.hash, null, false); }, 150);
        }
      }
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleInitialHash);
      } else {
        handleInitialHash();
      }
      window.addEventListener('hashchange', function() {
        if (window.location.hash) scrollToHash(window.location.hash, null, true);
      });
    })();
