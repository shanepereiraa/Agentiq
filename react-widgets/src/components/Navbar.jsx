import React, { useState } from 'react';

export default function Navbar() {
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
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-gray-300 font-medium">
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
              <a href="/restaurants" className="text-slate-300">🍽️ Restaurants &amp; Cafes</a>
              <a href="/d2c-ecommerce" className="text-slate-300">📦 D2C &amp; E-Commerce</a>
              <a href="/clinics" className="text-slate-300">🏥 Clinics &amp; Healthcare</a>
              <a href="/salons" className="text-slate-300">💇 Salons &amp; Spas</a>
              <div className="border-t border-white/10 my-1"></div>
              <a href="/#how">Chatbots</a>
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
