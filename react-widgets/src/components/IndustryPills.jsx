import React, { useState } from 'react';

export default function IndustryPills() {
  const industries = [
    { name: 'Restaurants & Cafes', icon: '🍽️', url: '/restaurants', tag: 'Table Bookings & Menus' },
    { name: 'D2C & E-Commerce', icon: '📦', url: '/d2c-ecommerce', tag: 'COD & Abandoned Carts' },
    { name: 'Healthcare & Clinics', icon: '🏥', url: '/clinics', tag: 'Doctor Appointments' },
    { name: 'Salons, Spas & Beauty', icon: '💇', url: '/salons', tag: 'Instagram DM Bookings' },
    { name: 'Real Estate & Builders', icon: '🏢', url: '/#book', tag: 'Site Visits & Brochures' },
    { name: 'Cloud Kitchens', icon: '🛋️', url: '/restaurants', tag: 'Direct WhatsApp Orders' },
    { name: 'EdTech & Coaching', icon: '🎓', url: '/#book', tag: 'Admissions & Fee Inquiries' },
    { name: 'Automotive & Dealerships', icon: '🚗', url: '/#book', tag: 'Test Drives & Service' },
    { name: 'Jewelry & Luxury', icon: '💍', url: '/#book', tag: 'VIP Clienteling' },
    { name: 'Hotels & Resorts', icon: '🏨', url: '/#book', tag: 'Direct Booking & FAQs' },
    { name: 'Retail & Multi-Outlet', icon: '🛍️', url: '/#book', tag: 'Inventory & Store Locator' },
    { name: 'B2B & Professional Services', icon: '💼', url: '/#book', tag: 'Lead Qualification' },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-5 overflow-hidden" id="explore-industries">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            🏢 Tailored By Vertical
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Explore Solutions For <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Your Exact Industry</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Every vertical has unique booking logic, compliance rules, and customer behavior. Explore purpose-built architectures for your sector.
          </p>
        </div>

        {/* Industry Pill Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <a
              key={i}
              href={ind.url}
              className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-400/50 hover:bg-slate-900/90 transition-all duration-200 group flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">{ind.icon}</span>
                <h3 className="text-white font-bold text-base group-hover:text-cyan-300 transition-colors">
                  {ind.name}
                </h3>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs text-slate-400">
                <span className="text-[11px] text-cyan-400 font-medium">{ind.tag}</span>
                <span className="group-hover:translate-x-1 transition-transform text-slate-300">→</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
