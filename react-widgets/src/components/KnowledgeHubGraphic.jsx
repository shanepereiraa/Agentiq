import React from 'react';

export default function KnowledgeHubGraphic() {
  const nodes = [
    { title: 'Product Catalog', icon: '🛍️', desc: 'Shopify / WooCommerce / CSV', color: 'from-emerald-400 to-teal-500' },
    { title: 'Menu & Pricing PDF', icon: '📋', desc: 'Restaurant & Spa menus', color: 'from-orange-400 to-amber-500' },
    { title: 'Website & URLs', icon: '🌐', desc: 'Live crawling & documentation', color: 'from-cyan-400 to-blue-500' },
    { title: 'FAQs & Policies', icon: '❓', desc: 'Returns, cancellations & timings', color: 'from-purple-400 to-indigo-500' },
    { title: 'Booking Schedules', icon: '📅', desc: 'Doctor & Stylist calendars', color: 'from-pink-400 to-rose-500' },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-5 overflow-hidden" id="knowledge-hub">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            ⚡ Instant Grounding
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Trained On Your Business Assets in <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Minutes, Not Weeks</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            No complex engineering. Hand over your existing brochures, menu PDFs, or website URL during kickoff, and our agency pipeline ingests, vectorizes, and tests your AI assistant.
          </p>
        </div>

        {/* Central Pulsating Ingestion Hub */}
        <div className="relative glass rounded-3xl p-8 sm:p-12 border border-white/10 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-cyan-500/5 to-transparent pointer-events-none"></div>

          {/* Central AI Engine Core */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center mb-12">
            <div className="relative mb-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 p-1 animate-pulse shadow-lg shadow-cyan-500/30 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center p-2">
                  <span className="text-2xl sm:text-3xl">🧠</span>
                  <span className="text-[10px] sm:text-xs font-bold text-white tracking-wider mt-1">AGENTIQ AI</span>
                </div>
              </div>
              <div className="absolute -inset-4 rounded-full border border-cyan-500/20 animate-ping pointer-events-none"></div>
            </div>
            <p className="text-white font-bold text-lg">Neural RAG &amp; Grounding Engine</p>
            <p className="text-slate-400 text-xs mt-1">Claude 3.5 + Deepgram + India Knowledge Base</p>
          </div>

          {/* Connected Ingestion Nodes */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {nodes.map((node, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-cyan-400/40 transition-all text-center group hover:-translate-y-1 shadow-lg">
                <div className="w-10 h-10 mx-auto rounded-xl bg-white/5 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                  {node.icon}
                </div>
                <h4 className="text-white font-bold text-sm mb-1">{node.title}</h4>
                <p className="text-slate-400 text-[11px] leading-tight">{node.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Security / Fact Note */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Zero Hallucinations: Grounded strictly in your provided business facts.
            </span>
            <span className="text-cyan-400 font-semibold">Updated weekly via live Google Sheets / CMS</span>
          </div>

        </div>
      </div>
    </section>
  );
}
