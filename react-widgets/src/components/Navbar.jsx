import React, { useState } from 'react';

export default function Navbar() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full px-4 md:px-8 py-3 bg-[#080B11]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* 1. LOGO */}
        <a className="flex items-center gap-2" href="/">
          <span className="text-xl font-bold text-white tracking-tight inline-flex items-baseline gap-0.5">
            Agent<span className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-500 bg-clip-text text-transparent font-extrabold">IQ</span>
          </span>
        </a>

        {/* 2. CENTER NAV LINKS */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300 font-medium">
          
          {/* Solutions Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <a 
              href="/solutions"
              className="flex items-center gap-1 hover:text-white transition-colors py-2"
            >
              Solutions
              <svg 
                className={`w-4 h-4 transition-transform text-gray-400 ${solutionsOpen ? 'rotate-180 text-cyan-400' : ''}`}
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>

            {/* Solutions Mega Menu Dropdown */}
            {solutionsOpen && (
              <div className="absolute top-full left-0 mt-3 w-[620px] bg-[#080B11] border border-white/20 rounded-2xl p-6 shadow-2xl shadow-black z-[100]">
                <div className="grid grid-cols-2 gap-8 divide-x divide-white/10">
                  
                  {/* By Use Case */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 px-1">By Use Case</p>
                    <div className="space-y-1">
                      <a href="/solutions#solutions-bento" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                        <span className="text-lg">🛍️</span>
                        <div>
                          <p className="text-white text-xs font-semibold group-hover:text-cyan-300 transition-colors">Sales &amp; Conversion</p>
                          <p className="text-slate-400 text-[11px] leading-snug">Lead qualification &amp; cart recovery</p>
                        </div>
                      </a>
                      <a href="/solutions#solutions-bento" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                        <span className="text-lg">🎧</span>
                        <div>
                          <p className="text-white text-xs font-semibold group-hover:text-cyan-300 transition-colors">24/7 Customer Support</p>
                          <p className="text-slate-400 text-[11px] leading-snug">FAQ deflection &amp; WISMO order tracking</p>
                        </div>
                      </a>
                      <a href="/solutions#solutions-bento" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                        <span className="text-lg">📅</span>
                        <div>
                          <p className="text-white text-xs font-semibold group-hover:text-cyan-300 transition-colors">Bookings &amp; Lead Gen</p>
                          <p className="text-slate-400 text-[11px] leading-snug">Table reservations &amp; CRM sync</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* By Industry */}
                  <div className="pl-8 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-purple-400 px-1">By Industry</p>
                    <div className="space-y-1">
                      <a href="/restaurants" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                        <span className="text-lg">🍽️</span>
                        <div>
                          <p className="text-white text-xs font-semibold group-hover:text-purple-300 transition-colors">Restaurants &amp; Cafes</p>
                          <p className="text-slate-400 text-[11px] leading-snug">Petpooja POS &amp; reservations</p>
                        </div>
                      </a>
                      <a href="/d2c-ecommerce" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                        <span className="text-lg">📦</span>
                        <div>
                          <p className="text-white text-xs font-semibold group-hover:text-purple-300 transition-colors">D2C &amp; E-Commerce</p>
                          <p className="text-slate-400 text-[11px] leading-snug">Shopify &amp; COD recovery</p>
                        </div>
                      </a>
                      <a href="/clinics" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                        <span className="text-lg">🏥</span>
                        <div>
                          <p className="text-white text-xs font-semibold group-hover:text-purple-300 transition-colors">Clinics &amp; Healthcare</p>
                          <p className="text-slate-400 text-[11px] leading-snug">Doctor appointments &amp; Practo</p>
                        </div>
                      </a>
                      <a href="/salons" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                        <span className="text-lg">💇</span>
                        <div>
                          <p className="text-white text-xs font-semibold group-hover:text-purple-300 transition-colors">Salons &amp; Spas</p>
                          <p className="text-slate-400 text-[11px] leading-snug">Instagram DM automation</p>
                        </div>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          <a className="hover:text-white transition-colors" href="/#how">Chatbots</a>
          <a className="hover:text-white transition-colors" href="/#voice">Voice AI</a>
          <a className="hover:text-white transition-colors" href="/try-your-bot">Try Bot</a>
          <a className="hover:text-white transition-colors" href="/integrations">Integrations</a>
          <a className="hover:text-white transition-colors" href="/#pricing">Pricing</a>
          <a className="hover:text-white transition-colors" href="/blog">Blog</a>
          <a className="hover:text-white transition-colors" href="/#faq">FAQ</a>
        </nav>

        {/* 3. RIGHT ACTION BUTTON & MOBILE HAMBURGER */}
        <div className="flex items-center gap-3">
          <a 
            href="/#book" 
            className="hidden md:inline-flex px-5 py-2.5 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-cyan-400 hover:text-slate-950 transition-all shadow-md"
          >
            Book Free Demo
          </a>

          {/* Mobile Hamburger Trigger */}
          <button 
            className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[80] bg-slate-950/98 backdrop-blur-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="text-xl font-bold text-white tracking-tight">Agent<span className="text-rose-500">IQ</span></span>
              <button 
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-3 py-6 text-base font-semibold text-slate-200">
              <a href="/solutions" className="text-cyan-400">⚡ Solutions Hub</a>
              <a href="/restaurants" className="pl-4 text-sm text-slate-400">🍽️ Restaurants &amp; Cafes</a>
              <a href="/d2c-ecommerce" className="pl-4 text-sm text-slate-400">📦 D2C &amp; E-Commerce</a>
              <a href="/clinics" className="pl-4 text-sm text-slate-400">🏥 Clinics &amp; Healthcare</a>
              <a href="/salons" className="pl-4 text-sm text-slate-400">💇 Salons &amp; Spas</a>
              <a href="/#how" className="mt-2">Chatbots</a>
              <a href="/#voice">Voice AI</a>
              <a href="/try-your-bot">Try Bot</a>
              <a href="/integrations">Integrations</a>
              <a href="/#pricing">Pricing</a>
              <a href="/blog">Blog</a>
              <a href="/#faq">FAQ</a>
            </div>
          </div>
          <a 
            href="/#book"
            onClick={() => setMobileOpen(false)}
            className="w-full py-3.5 rounded-xl bg-cyan-400 text-slate-950 text-center font-bold"
          >
            Book Free Demo
          </a>
        </div>
      )}
    </header>
  );
}
