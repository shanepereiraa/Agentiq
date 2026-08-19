import React from 'react';

export default function SolutionsBento() {
  return (
    <section className="relative py-16 sm:py-24 px-5 overflow-hidden" id="solutions-bento">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-4">
            ⚡ CORE CAPABILITIES
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Engineered for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Autonomous Growth
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Purpose-built conversational infrastructure that turns complex inquiries into autonomous, revenue-generating experiences.
          </p>
        </div>

        {/* Top Bento Grid (2 Large Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Card 1: 24/7 Customer Support & WISMO */}
          <div className="rounded-3xl p-7 sm:p-9 bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden group shadow-2xl flex flex-col justify-between">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl mb-6 shadow-inner">
                🎧
              </div>
              <h3 className="text-white font-display font-bold text-2xl sm:text-3xl mb-3 leading-snug">
                Let AI handle repetitive customer inquiries
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Resolve 70%+ of FAQs, returns, sizing questions, and real-time order tracking (WISMO) automatically on WhatsApp. Free your team for high-value client consultations.
              </p>
            </div>

            {/* WhatsApp Interactive Mockup */}
            <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  WhatsApp Live Status
                </span>
                <span>Just now</span>
              </div>
              
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-emerald-600/90 text-white rounded-2xl rounded-tr-sm px-4 py-2 text-xs sm:text-sm max-w-[80%] shadow">
                  Where is my order #9421?
                </div>
              </div>

              {/* Bot Reply with Live Tracker */}
              <div className="flex justify-start">
                <div className="bg-slate-800/90 text-slate-100 rounded-2xl rounded-tl-sm p-3.5 text-xs sm:text-sm max-w-[90%] border border-white/5 space-y-2">
                  <p>Hi Ananya! Your package is <strong>Out for Delivery</strong> 🚚</p>
                  <div className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Carrier: BlueDart Express</span>
                      <span className="text-cyan-400 font-semibold">ETA: Today, 3:45 PM</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[85%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: High-Intent Sales & Lead Qualification */}
          <div className="rounded-3xl p-7 sm:p-9 bg-slate-900/60 border border-white/10 hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden group shadow-2xl flex flex-col justify-between">
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all"></div>
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-2xl mb-6 shadow-inner">
                🛍️
              </div>
              <h3 className="text-white font-display font-bold text-2xl sm:text-3xl mb-3 leading-snug">
                Capture &amp; qualify high-intent leads 24/7
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Turn browsers into confirmed buyers. Automatically collect contact info, qualify budget &amp; intent, and sync records straight into Google Sheets, Zoho, or HubSpot CRM in real-time.
              </p>
            </div>

            {/* Lead Capture Visual Pipeline */}
            <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                <span>⚡ Real-Time CRM Pipeline</span>
                <span className="text-emerald-400 font-semibold">+ ₹45,000 Deal Qualified</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5">
                  <p className="text-slate-400 text-[10px]">1. Lead Trigger</p>
                  <p className="text-white font-semibold mt-0.5">WhatsApp Inquiry</p>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-cyan-500/30">
                  <p className="text-cyan-400 text-[10px]">2. AI Qualification</p>
                  <p className="text-white font-semibold mt-0.5">Budget: ₹50k+ (VIP)</p>
                </div>
                <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/30">
                  <p className="text-emerald-400 text-[10px]">3. Auto-Sync</p>
                  <p className="text-emerald-300 font-semibold mt-0.5">Logged to Sheets &amp; CRM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bento Grid (Trio Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Trio 1: Multilingual Tone & Hinglish */}
          <div className="rounded-3xl p-6 sm:p-7 bg-slate-900/50 border border-white/10 hover:border-teal-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xl mb-4">
              🗣️
            </div>
            <h4 className="text-white font-display font-bold text-lg mb-2">
              Friendly Hindi &amp; Hinglish AI
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Speaks and writes fluent English, natural conversational Hindi, and colloquial Hinglish without sounding like a robotic menu tree.
            </p>
          </div>

          {/* Trio 2: Omni-Channel Voice & WhatsApp Sync */}
          <div className="rounded-3xl p-6 sm:p-7 bg-slate-900/50 border border-white/10 hover:border-cyan-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl mb-4">
              🔄
            </div>
            <h4 className="text-white font-display font-bold text-lg mb-2">
              Unified Voice &amp; Chat Sync
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              If a customer calls Naina on the phone, their appointment summary is sent straight to their WhatsApp in seconds. Zero data disconnects.
            </p>
          </div>

          {/* Trio 3: Human Escalation & Live Transfer */}
          <div className="rounded-3xl p-6 sm:p-7 bg-slate-900/50 border border-coral-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-coral-500/10 border border-coral-500/30 flex items-center justify-center text-coral-400 text-xl mb-4">
              🛡️
            </div>
            <h4 className="text-white font-display font-bold text-lg mb-2">
              Sub-Second Human Escalation
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Complex complaints and emergency inquiries are instantly forwarded to your team with full conversation history via WhatsApp alerts.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
