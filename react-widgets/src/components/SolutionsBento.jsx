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

        {/* 3 Core Use-Case Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* USE CASE 1: SALES & CONVERSION */}
          <div 
            id="use-case-sales" 
            className="scroll-mt-28 rounded-3xl p-7 bg-slate-900/60 border border-white/10 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden group shadow-2xl flex flex-col justify-between"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all"></div>
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-2xl mb-6 shadow-inner">
                🛍️
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">Use Case 01</div>
              <h3 className="text-white font-display font-bold text-xl sm:text-2xl mb-3 leading-snug">
                Capture &amp; qualify high-intent leads 24/7
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Turn browsers into confirmed buyers. Automatically collect contact info, qualify budget &amp; intent, and sync records straight into Google Sheets, Zoho, or HubSpot CRM in real-time.
              </p>
            </div>

            {/* Visual CRM Pipeline Mockup */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-white/10 shadow-xl space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                <span>⚡ Real-Time CRM Pipeline</span>
                <span className="text-emerald-400 font-semibold">+ ₹45,000 Deal</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-slate-300">WhatsApp Lead Trigger</span>
                  <span className="text-cyan-400 font-medium">Qualified VIP</span>
                </div>
                <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                  <span className="text-emerald-300 font-medium">Zoho CRM &amp; Sheets</span>
                  <span className="text-emerald-400 font-bold">Auto-Synced ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* USE CASE 2: 24/7 CUSTOMER SUPPORT */}
          <div 
            id="use-case-support" 
            className="scroll-mt-28 rounded-3xl p-7 bg-slate-900/60 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden group shadow-2xl flex flex-col justify-between"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all"></div>
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl mb-6 shadow-inner">
                🎧
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">Use Case 02</div>
              <h3 className="text-white font-display font-bold text-xl sm:text-2xl mb-3 leading-snug">
                Let AI handle repetitive customer inquiries
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Resolve 70%+ of FAQs, returns, sizing questions, and real-time order tracking (WISMO) automatically on WhatsApp. Free your team for high-value client consultations.
              </p>
            </div>

            {/* Live Delivery Status Mockup */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-white/10 shadow-xl space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Delivery Status
                </span>
                <span className="text-cyan-400 font-semibold">Order #9421</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-200">
                  <span>Out for Delivery 🚚</span>
                  <span className="text-cyan-400 font-bold">BlueDart Express</span>
                </div>
                <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* USE CASE 3: BOOKINGS & LEADS */}
          <div 
            id="use-case-bookings" 
            className="scroll-mt-28 rounded-3xl p-7 bg-slate-900/60 border border-white/10 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden group shadow-2xl flex flex-col justify-between"
          >
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
            
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl mb-6 shadow-inner">
                📅
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Use Case 03</div>
              <h3 className="text-white font-display font-bold text-xl sm:text-2xl mb-3 leading-snug">
                Seamless automated table &amp; appointment bookings
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Never lose a booking during peak hours. AI checks live availability, reserves slots, takes pre-orders/deposits, and sends automated reminder alerts.
              </p>
            </div>

            {/* Reservation Confirmation Card Mockup */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-white/10 shadow-xl space-y-3 font-sans">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                <span>🍽️ Booking Engine</span>
                <span className="text-emerald-400 font-semibold">Petpooja POS Locked</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                <div className="flex justify-between text-emerald-300 font-semibold">
                  <span>Table for 4 confirmed 🍽️</span>
                  <span>8:00 PM Tonight</span>
                </div>
                <p className="text-[11px] text-slate-400">Confirmation WhatsApp &amp; calendar invite dispatched.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Feature Trio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Trio 1 */}
          <div className="rounded-3xl p-6 bg-slate-900/50 border border-white/10 hover:border-teal-500/40 transition-all duration-300">
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

          {/* Trio 2 */}
          <div className="rounded-3xl p-6 bg-slate-900/50 border border-white/10 hover:border-cyan-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xl mb-4">
              🔄
            </div>
            <h4 className="text-white font-display font-bold text-lg mb-2">
              Unified Voice &amp; Chat Sync
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              If a customer calls on the phone, their appointment summary is sent straight to their WhatsApp in seconds. Zero data disconnects.
            </p>
          </div>

          {/* Trio 3 */}
          <div className="rounded-3xl p-6 bg-slate-900/50 border border-white/10 hover:border-coral-500/40 transition-all duration-300">
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
