import React from 'react';

export default function AnalyticsPreview() {
  const weeklyData = [
    { day: 'Mon', total: 640, deflected: 490 },
    { day: 'Tue', total: 710, deflected: 560 },
    { day: 'Wed', total: 820, deflected: 640 },
    { day: 'Thu', total: 790, deflected: 610 },
    { day: 'Fri', total: 980, deflected: 780 },
    { day: 'Sat', total: 1150, deflected: 920 },
    { day: 'Sun', total: 1040, deflected: 850 },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-5 overflow-hidden" id="analytics-preview">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            📊 Operational Visibility
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Real-Time Analytics &amp; <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Revenue Tracking</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Track automated conversations, response velocity, deflection rates, and recovered order revenue from an intuitive executive dashboard.
          </p>
        </div>

        {/* Dashboard Frame Mockup */}
        <div className="glass rounded-3xl p-6 sm:p-9 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top KPI Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-emerald-500/20">
              <p className="text-slate-400 text-xs font-semibold uppercase">AI Resolution Rate</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display font-bold text-white text-2xl sm:text-3xl">74.2%</span>
                <span className="text-emerald-400 text-xs font-semibold">↑ 12% vs last mo</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-1">Resolved without staff</p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-cyan-500/20">
              <p className="text-slate-400 text-xs font-semibold uppercase">Avg Response Time</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display font-bold text-white text-2xl sm:text-3xl">1.2s</span>
                <span className="text-cyan-400 text-xs font-semibold">⚡ Real-time</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-1">Day, night &amp; weekends</p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-purple-500/20">
              <p className="text-slate-400 text-xs font-semibold uppercase">Total Conversations</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display font-bold text-white text-2xl sm:text-3xl">4,850</span>
                <span className="text-purple-300 text-xs font-semibold">This Month</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-1">WhatsApp, Web &amp; Voice</p>
            </div>

            <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-coral/30">
              <p className="text-slate-400 text-xs font-semibold uppercase">Recovered Revenue</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-display font-bold text-coral text-2xl sm:text-3xl">₹1,84,000</span>
              </div>
              <p className="text-slate-400 text-[11px] mt-1">Direct bookings &amp; carts</p>
            </div>
          </div>

          {/* Weekly Traffic vs AI Resolution Visual Bar Chart */}
          <div className="bg-slate-950/60 rounded-2xl p-5 sm:p-7 border border-white/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
              <div>
                <h4 className="text-white font-bold text-base sm:text-lg">Inbound Volume vs. Autonomous AI Deflection</h4>
                <p className="text-slate-400 text-xs mt-0.5">Green indicates queries successfully handled with 0 human intervention</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-slate-700"></span> Total Volume
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> AI Handled
                </span>
              </div>
            </div>

            {/* Custom Bar Visualizer */}
            <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 sm:h-52 pt-4 pb-2 border-b border-white/10">
              {weeklyData.map((d, idx) => {
                const heightPct = Math.round((d.total / 1200) * 100);
                const deflectedPct = Math.round((d.deflected / d.total) * 100);
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="w-full max-w-[36px] bg-slate-800 rounded-t-lg relative overflow-hidden flex flex-col justify-end transition-all group-hover:scale-105" style={{ height: `${heightPct}%` }}>
                      <div className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg" style={{ height: `${deflectedPct}%` }}></div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-semibold">{d.day}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-xs text-slate-400 mt-4">
              <span>Weekly Average: <strong>875 chats/day</strong></span>
              <span className="text-emerald-400 font-semibold">99.98% System Uptime SLA</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
