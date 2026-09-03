const fs = require('fs');
const path = require('path');
const os = require('os');
const { chromium } = require('playwright');

const baseDir = '/Users/shanepereira/Projects/agentiq';
const restaurantsDir = path.join(baseDir, 'pitchdeck-v2/restaurants');
const d2cDir = path.join(baseDir, 'pitchdeck-v2/d2c');
const downloadsDir = path.join(os.homedir(), 'Downloads');

fs.mkdirSync(restaurantsDir, { recursive: true });
fs.mkdirSync(d2cDir, { recursive: true });
fs.mkdirSync(downloadsDir, { recursive: true });
fs.mkdirSync('/tmp/deck-inspection', { recursive: true });

function getDeckStyles() {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

  :root {
    --navy: #0A1830;
    --navy2: #132A48;
    --ink: #101828;
    --paper: #F4F2EE;
    --muted: #5B6472;
    --accent: #E8944A;
    --accent2: #C97A34;
    --line-dark: #28405F;
    --line-light: #DBD8D1;
    --white: #FFFFFF;
    --panel-bg: #132A48;
    --bubble-bot: #1B3557;
    --bubble-user: #0F7D5C;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: var(--navy);
    font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  h1, h2, h3, h4, .font-heading {
    font-family: 'Sora', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .slide {
    width: 1920px;
    height: 1080px;
    min-width: 1920px;
    min-height: 1080px;
    max-width: 1920px;
    max-height: 1080px;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    break-after: page;
    page-break-inside: avoid;
    break-inside: avoid;
    box-sizing: border-box;
  }

  .slide.dark {
    background: var(--navy);
    color: var(--white);
  }

  .slide.light {
    background: var(--paper);
    color: var(--ink);
  }

  @media screen {
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #050b14;
      gap: 40px;
      padding: 40px 0;
    }
    .slide {
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
      border-radius: 4px;
    }
  }

  @media print {
    @page {
      size: 1920px 1080px;
      margin: 0;
    }
    body {
      display: block;
      padding: 0;
      margin: 0;
      background: transparent;
    }
    .slide {
      box-shadow: none;
      border-radius: 0;
      width: 1920px !important;
      height: 1080px !important;
    }
  }

  /* Universal Slide Layout Elements */
  .eyebrow-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 64px 104px 0 104px;
  }
  .dot {
    width: 12px;
    height: 12px;
    background: var(--accent);
    flex: none;
    border-radius: 2px;
  }
  .eyebrow {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent2);
  }
  .slide.dark .eyebrow {
    color: var(--accent);
  }
  .slide.light .eyebrow {
    color: var(--accent2);
    padding: 64px 104px 0 104px;
  }

  .hr-dark {
    height: 1px;
    background: var(--line-dark);
    margin: 24px 104px 0 104px;
  }

  .hero-title {
    font-size: 96px;
    line-height: 1.05;
    font-weight: 800;
    padding: 0 104px;
    margin-top: 60px;
    letter-spacing: -0.02em;
  }
  .hero-title .accent {
    color: var(--accent);
  }

  .hero-subhead {
    font-size: 30px;
    line-height: 1.45;
    color: #C7CEDA;
    max-width: 1240px;
    padding: 0 104px;
    margin-top: 32px;
    font-weight: 400;
  }

  .hero-stat-row {
    display: flex;
    align-items: flex-start;
    padding: 0 104px;
    margin-top: 76px;
  }
  .hero-stat {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-right: 48px;
  }
  .hero-stat-num {
    font-family: 'Sora', sans-serif;
    font-size: 52px;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .hero-stat-label {
    font-size: 20px;
    color: #AEB7C4;
    font-weight: 500;
    line-height: 1.4;
  }
  .hero-divider-v {
    width: 1px;
    height: 90px;
    background: var(--line-dark);
    margin: 4px 48px 4px 0;
  }

  .slide-title {
    font-size: 52px;
    font-weight: 800;
    padding: 0 104px;
    margin-top: 16px;
    max-width: 1480px;
    line-height: 1.15;
    letter-spacing: -0.015em;
  }
  .slide-subhead {
    font-size: 22px;
    color: var(--muted);
    padding: 0 104px;
    margin-top: 18px;
    max-width: 1440px;
    line-height: 1.55;
  }

  .footer {
    position: absolute;
    bottom: 44px;
    left: 104px;
    right: 104px;
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    font-weight: 500;
    color: #9AA1AC;
  }
  .slide.dark .footer {
    color: #8B95A6;
  }

  .grid-3col {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    padding: 0 104px;
    margin-top: 56px;
  }
  .grid-3col .cell {
    padding-right: 48px;
    border-right: 1px solid var(--line-light);
  }
  .grid-3col .cell:last-child {
    border-right: none;
    padding-right: 0;
  }
  .grid-3col .num {
    font-family: 'Sora', sans-serif;
    font-size: 60px;
    font-weight: 800;
    color: var(--ink);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  .grid-3col .label {
    font-size: 20px;
    font-weight: 700;
    color: var(--accent2);
    margin-top: 16px;
    line-height: 1.35;
  }
  .grid-3col .body {
    font-size: 17px;
    color: var(--muted);
    line-height: 1.6;
    margin-top: 12px;
  }

  .callout-box-dark {
    margin: 36px 104px 0 104px;
    background: var(--navy);
    color: #ffffff;
    padding: 22px 32px;
    font-size: 18px;
    line-height: 1.55;
    border-radius: 4px;
  }
  .callout-box-dark b {
    color: var(--accent);
    font-weight: 700;
  }

  .callout-box-light {
    margin: 32px 104px 0 104px;
    background: #ffffff;
    border: 1px solid #E3E0D9;
    padding: 22px 32px;
    font-size: 18px;
    line-height: 1.55;
    color: var(--ink);
    border-radius: 4px;
  }
  .callout-box-light b {
    color: var(--accent2);
    font-weight: 700;
  }

  .sources-note {
    position: absolute;
    bottom: 92px;
    left: 104px;
    right: 104px;
    font-size: 14px;
    color: #9AA1AC;
    line-height: 1.5;
  }

  /* Refined 2x2 Outcome Grid */
  .grid-2x2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 36px 80px;
    padding: 0 104px;
    margin-top: 48px;
  }
  .outcome-item {
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .outcome-item .num {
    font-family: 'Sora', sans-serif;
    font-size: 46px;
    font-weight: 800;
    color: var(--ink);
    line-height: 1;
    letter-spacing: -0.02em;
    white-space: nowrap;
    flex: 0 0 260px;
  }
  .outcome-item .num.accent {
    color: var(--accent2);
  }
  .outcome-item .desc {
    font-size: 18px;
    color: var(--muted);
    line-height: 1.5;
    flex: 1;
  }

  .panels-2col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    padding: 0 104px;
    margin-top: 36px;
  }
  .panel-dark {
    background: var(--panel-bg);
    color: #ffffff;
    padding: 36px 40px;
    border-radius: 4px;
  }
  .panel-dark .ch-label {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .panel-dark .ch-title {
    font-family: 'Sora', sans-serif;
    font-size: 28px;
    font-weight: 700;
    margin-top: 10px;
  }
  .panel-dark .ch-sub {
    font-size: 16px;
    color: #AEB7C4;
    font-weight: 400;
  }
  .panel-dark .ch-list {
    margin-top: 24px;
    list-style: none;
    padding: 0;
    font-size: 18px;
    line-height: 1.8;
  }
  .panel-dark .ch-list li {
    border-top: 1px solid #274766;
    padding-top: 12px;
    margin-top: 12px;
  }
  .panel-dark .ch-list li:first-child {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
  }

  .chapter-container {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 60px;
    padding: 0 104px;
    margin-top: 32px;
    align-items: start;
  }
  .chapter-left {
    width: 100%;
  }
  .chapter-left .how-title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9AA1AC;
  }
  .chapter-left .steps-list {
    list-style: none;
    padding: 0;
    margin-top: 16px;
  }
  .chapter-left .steps-list li {
    display: flex;
    gap: 18px;
    padding: 14px 0;
    border-top: 1px solid var(--line-light);
  }
  .chapter-left .steps-list li:first-child {
    border-top: none;
    padding-top: 0;
  }
  .chapter-left .steps-list b {
    color: var(--accent2);
    font-family: 'Sora', sans-serif;
    font-size: 20px;
    font-weight: 800;
    flex: none;
    width: 24px;
  }
  .chapter-left .steps-list span {
    font-size: 17.5px;
    line-height: 1.5;
    color: var(--ink);
  }
  .smart-layer-box {
    background: #FBF3E4;
    border-left: 4px solid var(--accent);
    padding: 16px 22px;
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.5;
    border-radius: 0 4px 4px 0;
  }
  .smart-layer-box b {
    color: var(--accent2);
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 0.06em;
    display: block;
    margin-bottom: 4px;
  }
  .handoff-note {
    font-size: 15px;
    color: var(--muted);
    margin-top: 16px;
    line-height: 1.4;
  }
  .handoff-note b {
    color: var(--ink);
  }

  .phone-mockup {
    width: 100%;
    background: var(--navy);
    color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 16px 36px rgba(0,0,0,0.12);
  }
  .phone-mockup .head {
    background: var(--panel-bg);
    padding: 18px 24px;
    font-weight: 700;
    font-size: 17px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .phone-mockup .head .sub {
    font-size: 14px;
    color: #AEB7C4;
    font-weight: 400;
  }
  .phone-mockup .body {
    padding: 22px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-size: 15.5px;
    min-height: 340px;
    justify-content: center;
  }
  .chat-bubble {
    background: var(--bubble-bot);
    padding: 13px 18px;
    border-radius: 6px;
    max-width: 84%;
    line-height: 1.45;
  }
  .chat-bubble.me {
    background: var(--bubble-user);
    align-self: flex-end;
    max-width: 78%;
  }

  .funnel-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    padding: 0 104px;
    margin-top: 48px;
  }
  .funnel-card {
    background: #ffffff;
    border: 1px solid var(--line-light);
    border-radius: 4px;
    padding: 28px 24px;
    display: flex;
    flex-direction: column;
    min-height: 480px;
  }
  .funnel-stage {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent2);
  }
  .funnel-name {
    font-family: 'Sora', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin-top: 10px;
    color: var(--ink);
  }
  .funnel-items {
    list-style: none;
    padding: 0;
    margin-top: 24px;
    font-size: 16px;
    line-height: 1.6;
    color: var(--muted);
  }
  .funnel-items li {
    padding: 12px 0;
    border-top: 1px solid var(--line-light);
  }
  .funnel-items li:first-child {
    border-top: none;
    padding-top: 0;
  }
  .pill-highlight {
    display: inline-block;
    background: #FBF3E4;
    color: var(--accent2);
    font-weight: 700;
    font-size: 14px;
    padding: 4px 10px;
    border-radius: 4px;
    border: 1px solid #F0D4AA;
    margin-bottom: 4px;
  }

  .why-cols {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    padding: 0 104px;
    margin-top: 44px;
  }
  .checklist-h {
    font-size: 17px;
    font-weight: 700;
    color: var(--accent2);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .checklist-items {
    list-style: none;
    padding: 0;
    margin-top: 20px;
  }
  .checklist-items li {
    display: flex;
    gap: 16px;
    padding: 15px 0;
    border-top: 1px solid var(--line-light);
    font-size: 17px;
    line-height: 1.5;
    color: var(--ink);
  }
  .checklist-items li:first-child {
    border-top: none;
  }
  .checklist-items svg {
    flex: none;
    margin-top: 2px;
  }
  .side-card {
    background: var(--navy);
    color: #ffffff;
    padding: 36px 40px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .side-card .h {
    font-size: 16px;
    font-weight: 700;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .side-card p {
    font-size: 17px;
    line-height: 1.65;
    color: #C7CEDA;
    margin-top: 16px;
  }
  .side-card .quote {
    font-size: 18px;
    line-height: 1.6;
    color: #ffffff;
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid #274766;
  }
  .side-card .quote b {
    color: var(--accent);
  }

  .bundle-banner {
    margin: 20px 104px 0 104px;
    background: var(--navy);
    color: #ffffff;
    padding: 16px 28px;
    font-size: 17px;
    line-height: 1.5;
    border-radius: 4px;
    border-left: 4px solid var(--accent);
  }
  .bundle-banner b {
    color: var(--accent);
  }
  .pricing-tables {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 36px;
    padding: 0 104px;
    margin-top: 24px;
  }
  .table-h {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent2);
    margin-bottom: 12px;
  }
  .tiers-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }
  .tier-card {
    background: #ffffff;
    border: 1px solid #DCD8CF;
    border-radius: 4px;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    min-height: 340px;
  }
  .tier-card.pop {
    background: var(--navy);
    color: #ffffff;
    border-color: var(--navy);
    box-shadow: 0 10px 24px rgba(10,24,48,0.2);
  }
  .tier-card .name {
    font-size: 15px;
    font-weight: 700;
    color: var(--accent2);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .tier-card.pop .name {
    color: var(--accent);
  }
  .tier-price-box {
    margin-top: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid #EBE7DF;
  }
  .tier-card.pop .tier-price-box {
    border-bottom: 1px solid #274766;
  }
  .fee-line {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.45;
  }
  .tier-card.pop .fee-line {
    color: #AEB7C4;
  }
  .fee-line b {
    font-family: 'Sora', sans-serif;
    font-size: 17px;
    color: var(--ink);
    font-weight: 800;
  }
  .tier-card.pop .fee-line b {
    color: #ffffff;
  }
  .fee-line .tag {
    font-size: 11px;
    color: var(--accent2);
    font-weight: 600;
  }
  .tier-card.pop .fee-line .tag {
    color: var(--accent);
  }
  .tier-features {
    font-size: 13px;
    margin-top: 12px;
    line-height: 1.5;
    color: var(--ink);
    flex: 1;
  }
  .tier-card.pop .tier-features {
    color: #DDE3EC;
  }
  .pricing-note {
    position: absolute;
    bottom: 80px;
    left: 104px;
    right: 104px;
    font-size: 13.5px;
    color: #8B95A6;
    line-height: 1.5;
  }

  .next-steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    padding: 0 104px;
    margin-top: 60px;
  }
  .next-step-card {
    background: var(--panel-bg);
    padding: 32px 28px;
    border-radius: 4px;
    border-top: 4px solid var(--accent);
  }
  .next-step-num {
    font-family: 'Sora', sans-serif;
    font-size: 16px;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: 0.08em;
  }
  .next-step-title {
    font-family: 'Sora', sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin-top: 12px;
    color: #ffffff;
  }
  .next-step-desc {
    font-size: 16px;
    color: #AEB7C4;
    line-height: 1.55;
    margin-top: 12px;
  }
  .contact-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    padding: 32px 104px;
    margin: 48px 104px 0 104px;
    background: #061122;
    border-radius: 4px;
    border: 1px solid var(--line-dark);
  }
  .contact-item .label {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .contact-item .val {
    font-size: 18px;
    color: #ffffff;
    margin-top: 8px;
    font-weight: 600;
  }
  `;
}

function generateRestaurantsDeck() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1920, initial-scale=1">
<title>AgentIQ for Restaurants & Cafes Pitch Deck v2</title>
<style>
${getDeckStyles()}
</style>
</head>
<body>

<!-- Slide 1: Main -->
<section class="slide dark" id="slide-1">
  <div class="eyebrow-row">
    <div class="dot"></div>
    <div class="eyebrow">Newly Launched · Now Onboarding Restaurants Across India</div>
  </div>
  <div class="hr-dark"></div>
  <h1 class="hero-title">AgentIQ <span class="accent">for Restaurants</span></h1>
  <p class="hero-subhead">More tables booked. Faster orders. Guests who come back. Works alongside your POS and booking tools — not instead of them.</p>
  <div class="hero-stat-row">
    <div class="hero-stat">
      <div class="hero-stat-num">10–30%</div>
      <div class="hero-stat-label">higher order value</div>
    </div>
    <div class="hero-divider-v"></div>
    <div class="hero-stat">
      <div class="hero-stat-num">up to 30%</div>
      <div class="hero-stat-label">of lost call revenue recovered</div>
    </div>
    <div class="hero-divider-v"></div>
    <div class="hero-stat">
      <div class="hero-stat-num">single digits</div>
      <div class="hero-stat-label">no-show rate, down from ~20%</div>
    </div>
  </div>
  <div class="footer">
    <span>One AI team member, chat + voice, one contract · WhatsApp, Instagram & Website · Made in India</span>
    <span>01</span>
  </div>
</section>

<!-- Slide 2: Problem -->
<section class="slide light" id="slide-2">
  <div class="eyebrow">The Cost of Doing Nothing</div>
  <h1 class="slide-title">What a Busy Friday Night Is Actually Costing You</h1>
  <p class="slide-subhead">A dinner rush runs on split-second timing. Here's where the revenue actually leaks — and the math scales whether you run 40 covers or 400.</p>
  <div class="grid-3col">
    <div class="cell">
      <div class="num">20–35%</div>
      <div class="label">of walk-ins leave when the wait isn't managed</div>
      <div class="body">India's walk-in dining culture means a meaningful share of would-be diners leave rather than wait. One study of an Indian restaurant found removing that wait lifted total revenue by ~15%.</div>
    </div>
    <div class="cell">
      <div class="num">60–80%</div>
      <div class="label">of daily revenue happens in the peak window alone</div>
      <div class="body">Lunch and dinner rushes generate most of a restaurant's daily revenue — exactly when overloaded staff have the least time to answer a call or suggest the extra starter or round of drinks.</div>
    </div>
    <div class="cell">
      <div class="num">5–20%</div>
      <div class="label">no-show rate on reservations, industry-wide</div>
      <div class="body">Every no-show is an empty table during your peak window. It turns away paying walk-ins and permanently loses that night's revenue.</div>
    </div>
  </div>
  <div class="callout-box-dark">
    The math scales with you: on an average <b>₹700–₹900 check</b>, a single unanswered call or unmanaged no-show during peak hours is a real <b>₹2,000–₹4,000+</b> walking out the door — whether that happens once a week or five times.
  </div>
  <p class="sources-note">Sources: industry waiting-time and walkout research on Indian restaurants; commonly cited no-show benchmarks from Indian restaurant-tech platforms. Figures are directional industry ranges, not AgentIQ measurements — ask us for the underlying reports.</p>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>02</span>
  </div>
</section>

<!-- Slide 3: Outcome -->
<section class="slide light" id="slide-3">
  <div class="eyebrow">What Mei Is Designed To Deliver</div>
  <h1 class="slide-title">Engineered for Outcomes, Not Just Conversations</h1>
  <p class="slide-subhead">We're a newly launched product, so these are the outcomes Mei is engineered and benchmarked to hit, grounded in independent research on where restaurant revenue leaks — not a customer average. That's why the next step is a live mockup on your own menu, not a slide of someone else's.</p>
  <div class="grid-2x2">
    <div class="outcome-item">
      <div class="num accent">92%</div>
      <div class="desc">of guest queries resolved automatically, without staff involvement.</div>
    </div>
    <div class="outcome-item">
      <div class="num">10–30%</div>
      <div class="desc">higher average order value from AI-prompted upselling.</div>
    </div>
    <div class="outcome-item">
      <div class="num">~30%</div>
      <div class="desc">of previously lost phone revenue recovered with AI call answering.</div>
    </div>
    <div class="outcome-item">
      <div class="num accent">Single digits</div>
      <div class="desc">no-show rate, down from ~20%, with automated reminder confirmations.</div>
    </div>
  </div>
  <div class="callout-box-dark">
    Bridging the math: if the peak-window leak from the last slide runs <b>₹2,000–₹4,000 per missed table or call</b>, recovering just a handful a week is real monthly revenue — on top of the AOV lift above. We'll size it against your actual covers and average check on the call.
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>03</span>
  </div>
</section>

<!-- Slide 4: Meet Mei -->
<section class="slide light" id="slide-4">
  <div class="eyebrow">Meet Mei</div>
  <h1 class="slide-title">One AI Team Member. Every Channel. Knows Her Limits.</h1>
  <p class="slide-subhead">Mei lives on your WhatsApp, Instagram, and phone line. She books tables, takes orders, and follows up after every visit — instantly, 24/7. Whenever something falls outside her playbook, she hands it straight to your team.</p>
  <div class="callout-box-light">
    She sits on top of your POS and booking system—not instead of it. Mei answers the guests, while your existing tools still run the kitchen and the books. No rip-and-replace, no data migration.
  </div>
  <div class="panels-2col">
    <div class="panel-dark">
      <div class="ch-label">Channel 01</div>
      <div class="ch-title">Mei on Chat <span class="ch-sub">WhatsApp, Instagram, Web</span></div>
      <ul class="ch-list">
        <li>Books tables and answers menu questions</li>
        <li>Takes dine-in and takeaway orders directly</li>
        <li>Sends payment links via UPI / Razorpay</li>
      </ul>
    </div>
    <div class="panel-dark">
      <div class="ch-label">Channel 02</div>
      <div class="ch-title">Mei on the Phone <span class="ch-sub">Voice agent</span></div>
      <ul class="ch-list">
        <li>Answers every call, no busy tone, ever</li>
        <li>Confirms reservations the evening before</li>
        <li>Follows up after the visit for feedback</li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>04</span>
  </div>
</section>

<!-- Slide 5: Getting Started -->
<section class="slide light" id="slide-5">
  <div class="eyebrow">Getting Started</div>
  <h1 class="slide-title">We Don't Just Build Mei — We Launch Her For You</h1>
  <p class="slide-subhead">Before Mei can answer a single message, guests need to actually find her. That's part of the setup we handle — not an extra you figure out later.</p>
  <div class="grid-3col">
    <div class="cell">
      <div class="num" style="color: var(--accent2);">01</div>
      <div class="label" style="color: var(--ink);">Table QR Codes</div>
      <div class="body">Every table gets a scan-to-chat code straight to your WhatsApp — the first touch for dine-in guests, no app download.</div>
    </div>
    <div class="cell">
      <div class="num" style="color: var(--accent2);">02</div>
      <div class="label" style="color: var(--ink);">Marketed Where Guests Search</div>
      <div class="body">The same number goes on your Google Business Profile, Instagram, and Facebook — so reservation enquiries land straight in Mei's chat.</div>
    </div>
    <div class="cell">
      <div class="num" style="color: var(--accent2);">03</div>
      <div class="label" style="color: var(--ink);">Your Menu, Fully Loaded</div>
      <div class="body">We digitize and load your complete menu — prices, categories, spice levels, dietary tags — into her before you ever go live.</div>
    </div>
  </div>
  <div class="callout-box-dark" style="margin-top: 48px;">
    You focus on the kitchen and the floor. <b>We handle the QR code design and printing, the menu upload, and getting your number listed everywhere guests already look</b> — typically live within 7 days.
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>05</span>
  </div>
</section>

<!-- Slide 6: Chapter 1 -->
<section class="slide light" id="slide-6">
  <div class="eyebrow">Chapter 1 of 3 · Reservations</div>
  <h1 class="slide-title" style="max-width: 900px;">Every Guest Gets a Table — Even During Friday Rush</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>Guest messages your WhatsApp number any time, even after close.</span></li>
        <li><b>2</b><span>Mei asks for date, time, and party size, one question at a time.</span></li>
        <li><b>3</b><span>She checks live availability and confirms the booking instantly.</span></li>
        <li><b>4</b><span>A reminder goes out automatically the evening before.</span></li>
      </ul>
      <div class="smart-layer-box">
        <b>Smart layer</b>
        From a guest's 2nd visit, Mei recognizes them by name and skips straight to booking — no re-typing details, no small talk needed.
      </div>
      <div class="handoff-note">
        Hands off to your team when: <b>parties of 8+, private events, or dates outside normal booking hours.</b>
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Spice Garden</span>
        <span class="sub">WhatsApp</span>
      </div>
      <div class="body">
        <div class="chat-bubble me">Table for 4 tonight around 8?</div>
        <div class="chat-bubble">8:00 PM is open for 4 tonight. Shall I hold it under your name?</div>
        <div class="chat-bubble me">Yes — Aarav</div>
        <div class="chat-bubble">Confirmed — table for 4, tonight 8:00 PM, under Aarav. See you soon!</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>06</span>
  </div>
</section>

<!-- Slide 7: Chapter 2 -->
<section class="slide light" id="slide-7">
  <div class="eyebrow">Chapter 2 of 3 · Order Placement</div>
  <h1 class="slide-title" style="max-width: 900px;">Orders Reach the Kitchen in Seconds — and Grow Along the Way</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>Guest scans the table QR code, or messages directly for takeaway.</span></li>
        <li><b>2</b><span>Mei shows the live menu — prices, spice level, veg/non-veg tags — guest picks items directly, no server wait.</span></li>
        <li><b>3</b><span>Order fires straight to the kitchen/POS, payment link follows.</span></li>
      </ul>
      <div class="smart-layer-box" style="margin-top: 28px;">
        <b>Smart upselling</b>
        Ordered a curry but no rice, no drinks yet? Mei suggests adding instantly in the same chat — built to lift average order value 10–30%.
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Spice Garden</span>
        <span class="sub">Table 7 · scanned</span>
      </div>
      <div class="body">
        <div class="chat-bubble me">Paneer Tikka + Dal Makhani ×2</div>
        <div class="chat-bubble">Added. Breads or rice with that? Most tables add Butter Naan ₹90.</div>
        <div class="chat-bubble me">2 butter naan</div>
        <div class="chat-bubble">Sent to the kitchen. Total ₹1,240 — pay here: pay.spicegarden.in/t7</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>07</span>
  </div>
</section>

<!-- Slide 8: Chapter 3 -->
<section class="slide light" id="slide-8">
  <div class="eyebrow">Chapter 3 of 3 · Loyalty & Feedback</div>
  <h1 class="slide-title" style="max-width: 900px;">Turns a One-Time Visit Into a Repeat Guest</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>After the visit, Mei sends a short thank-you message the same day.</span></li>
        <li><b>2</b><span>She asks for quick feedback — one tap: Great, Okay, or Not great.</span></li>
        <li><b>3</b><span>A Google review link is included automatically, no separate ask.</span></li>
        <li><b>4</b><span>Any "Not great" response is flagged to your manager, same day.</span></li>
      </ul>
      <div class="smart-layer-box">
        <b>Smart layer</b>
        Once Mei has a guest's order history, she can nudge regulars who haven't visited in a while with an offer built around what they actually order.
      </div>
      <div class="handoff-note">
        Hands off to your team when: <b>negative feedback — always escalates to a real person, same day, no exceptions.</b>
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Spice Garden</span>
        <span class="sub">Feedback & Reviews</span>
      </div>
      <div class="body">
        <div class="chat-bubble">Thanks for dining with us tonight, Aarav 🙏 How was everything?</div>
        <div class="chat-bubble me">Great</div>
        <div class="chat-bubble">Wonderful. If you have 20 seconds, a Google review helps us a lot: g.page/spicegarden/review</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>08</span>
  </div>
</section>

<!-- Slide 9: Why AgentIQ -->
<section class="slide light" id="slide-9">
  <div class="eyebrow">Why AgentIQ</div>
  <h1 class="slide-title">Complements Petpooja and Your Booking Tools — Doesn't Replace Them</h1>
  <div class="why-cols">
    <div>
      <div class="checklist-h">Ask any vendor these five questions</div>
      <ul class="checklist-items">
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Does it replace my POS, or sit on top and talk to guests while my POS still runs the kitchen?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Does it train and optimize itself for my menu, or do I configure it myself?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Is there a real Hindi/Hinglish conversation layer, or just English menu-tree buttons?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Does chat and phone run as one system, or two separate tools?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Can they show you live on your actual menu before you sign anything?</span>
        </li>
      </ul>
    </div>
    <div class="side-card">
      <div>
        <div class="h">Done-For-You, Not Self-Serve</div>
        <p>Live in 7 days: kickoff call, we build and train Mei on your menu and policies, you approve, we launch — no code on your end. Anything outside her playbook escalates to your team instantly. Your data stays encrypted, India-compliant, never sold or reused to train anyone else's bot.</p>
      </div>
      <div class="quote">
        You already pay for a POS and maybe a booking app to run the back of house. <b>AgentIQ is the layer that talks to guests</b> — before, during, and after the table — and hands what it captures straight into the systems you already use.
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>09</span>
  </div>
</section>

<!-- Slide 10: Pricing -->
<section class="slide light" id="slide-10">
  <div class="eyebrow">Pricing</div>
  <h1 class="slide-title">One Team Member, Two Channels, One Bundle</h1>
  <div class="bundle-banner">
    Bundle Chat + Voice: <b>Save 15%</b> on your combined monthly retainer. One onboarding call, unified training pass, complete funnel coverage.
  </div>
  <div class="pricing-tables">
    <div>
      <div class="table-h">Chatbot — WhatsApp, Instagram, Web</div>
      <div class="tiers-grid">
        <div class="tier-card">
          <div class="name">Starter</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹24,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹7,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 1,000 Chats)</div>
          </div>
          <div class="tier-features">WhatsApp API, menu & catalog mgmt, Hindi/Hinglish/English, standard support</div>
        </div>
        <div class="tier-card pop">
          <div class="name">Growth</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹39,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹14,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: #AEB7C4;">(Includes 2,000 Chats)</div>
          </div>
          <div class="tier-features">+ WhatsApp Pay, follow-ups & win-back, chat widget, 24/7 priority support</div>
        </div>
        <div class="tier-card">
          <div class="name">Pro</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹79,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹24,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 5,000 Chats)</div>
          </div>
          <div class="tier-features">+ Multi-location routing, guest profiling, CRM integration, dedicated AM</div>
        </div>
      </div>
    </div>
    <div>
      <div class="table-h">Voice Agent — Phone Line</div>
      <div class="tiers-grid">
        <div class="tier-card pop">
          <div class="name">Starter</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹29,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹14,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: #AEB7C4;">(Includes 250 Mins)</div>
          </div>
          <div class="tier-features">1 inbound voice agent, handles interruptions, Hindi & English, call logging</div>
        </div>
        <div class="tier-card">
          <div class="name">Growth</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹49,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹24,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 500 Mins)</div>
          </div>
          <div class="tier-features">+ Outbound calling, real-time table booking, live human transfer</div>
        </div>
        <div class="tier-card">
          <div class="name">Pro</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹99,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹34,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 800 Mins)</div>
          </div>
          <div class="tier-features">+ Unlimited concurrency, voice cloning, custom integrations</div>
        </div>
      </div>
    </div>
  </div>
  <p class="pricing-note">
    30-day money-back guarantee on both. Overage on voice billed at ₹45/min. Meta conversation fees billed separately. GST extra.<br>
    <b>Seasonal?</b> Ask about a shorter initial term on Starter if your footfall swings hard by season — we'd rather flex the plan than lose the relationship over one slow month.
  </p>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>10</span>
  </div>
</section>

<!-- Slide 11: Next Steps -->
<section class="slide dark" id="slide-11">
  <div class="eyebrow-row">
    <div class="dot"></div>
    <div class="eyebrow">Next Step</div>
  </div>
  <div class="hr-dark"></div>
  <h1 class="hero-title" style="font-size: 80px; margin-top: 40px;">Let's Put Mei on Your <span class="accent">WhatsApp.</span></h1>
  <p class="hero-subhead" style="margin-top: 20px;">Book your free 20-minute demo. We'll show a live mockup built for your menu and booking policy, no obligation — here's what happens after.</p>
  <div class="next-steps-grid">
    <div class="next-step-card">
      <div class="next-step-num">01</div>
      <div class="next-step-title">20-min demo</div>
      <div class="next-step-desc">Live mockup on your menu, this week.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">02</div>
      <div class="next-step-title">Custom quote</div>
      <div class="next-step-desc">Priced against your covers and seasonality, not a generic tier.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">03</div>
      <div class="next-step-title">7-day build</div>
      <div class="next-step-desc">Trained on your menu and policies, you approve before launch.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">04</div>
      <div class="next-step-title">Live, with support</div>
      <div class="next-step-desc">30-day money-back guarantee while you see real results.</div>
    </div>
  </div>
  <div class="contact-bar">
    <div class="contact-item">
      <div class="label">Call</div>
      <div class="val">+91 91596 65277</div>
    </div>
    <div class="contact-item">
      <div class="label">WhatsApp</div>
      <div class="val">wa.me/919159665277</div>
    </div>
    <div class="contact-item">
      <div class="label">Email</div>
      <div class="val">shane@agentiq.co.in</div>
    </div>
    <div class="contact-item">
      <div class="label">Based In</div>
      <div class="val">Mumbai, India · nationwide</div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>11</span>
  </div>
</section>

</body>
</html>
`;
}

function generateD2CDeck() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1920, initial-scale=1">
<title>AgentIQ for D2C Brands Pitch Deck v2</title>
<style>
${getDeckStyles()}
</style>
</head>
<body>

<!-- Slide 1: Main -->
<section class="slide dark" id="slide-1">
  <div class="eyebrow-row">
    <div class="dot"></div>
    <div class="eyebrow">Newly Launched · Now Onboarding D2C Brands Across India</div>
  </div>
  <div class="hr-dark"></div>
  <h1 class="hero-title">AgentIQ <span class="accent">for D2C Brands</span></h1>
  <p class="hero-subhead">From the first DM to the last delivery — one AI team member covers the entire funnel. Built to replace the cost of a hire, not another chatbot subscription.</p>
  <div class="hero-stat-row">
    <div class="hero-stat">
      <div class="hero-stat-num">10–30%</div>
      <div class="hero-stat-label">higher order value</div>
    </div>
    <div class="hero-divider-v"></div>
    <div class="hero-stat">
      <div class="hero-stat-num">8–14%</div>
      <div class="hero-stat-label">of COD orders switched to prepaid</div>
    </div>
    <div class="hero-divider-v"></div>
    <div class="hero-stat">
      <div class="hero-stat-num">3.4×</div>
      <div class="hero-stat-label">margins at 25%+ repeat rate</div>
    </div>
  </div>
  <div class="footer">
    <span>One AI team member, chat + voice, one contract · WhatsApp, Instagram & Website · Made in India</span>
    <span>01</span>
  </div>
</section>

<!-- Slide 2: Problem -->
<section class="slide light" id="slide-2">
  <div class="eyebrow">The Cost of Doing Nothing</div>
  <h1 class="slide-title">What Cart Abandonment and RTO Are Actually Costing You</h1>
  <p class="slide-subhead">Indian D2C brands lose revenue at three points in the journey — before checkout, at the door, and after the sale. The math scales with your volume, whether you're shipping 200 orders a month or 20,000.</p>
  <div class="grid-3col">
    <div class="cell">
      <div class="num">~70%</div>
      <div class="label">of online carts are abandoned</div>
      <div class="body">Globally, 7 in 10 shoppers leave without completing checkout — Indian D2C storefronts are widely reported to run higher still. Without a fast, personal nudge, that revenue typically doesn't come back on its own.</div>
    </div>
    <div class="cell">
      <div class="num">20–30%</div>
      <div class="label">RTO rate for Indian D2C brands</div>
      <div class="body">India's Return-to-Origin rate runs 20–30% industry-wide, spiking well past that during festive-season COD volume — driven largely by orders that were never confirmed before dispatch.</div>
    </div>
    <div class="cell">
      <div class="num">20–40%</div>
      <div class="label">of support tickets are "Where is my order?"</div>
      <div class="body">WISMO queries are widely reported to make up a fifth to two-fifths of support volume, climbing further in sale season — tying up a team that could be doing higher-value work.</div>
    </div>
  </div>
  <p class="sources-note">Sources: Baymard Institute cart abandonment research; industry RTO benchmarks reported across Indian D2C logistics and returns-management platforms; commonly cited WISMO/support-ticket industry estimates. Figures are directional industry ranges, not AgentIQ measurements — ask us for the underlying reports.</p>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>02</span>
  </div>
</section>

<!-- Slide 3: Outcome -->
<section class="slide light" id="slide-3">
  <div class="eyebrow">What Mia Is Designed To Deliver</div>
  <h1 class="slide-title">Engineered for Outcomes, Not Just Conversations</h1>
  <p class="slide-subhead">We're a newly launched product, so these are the outcomes Mia is engineered and benchmarked to hit, grounded in independent research on where D2C revenue leaks — not a customer average. That's why the next step is a live mockup on your own numbers, not a slide of someone else's.</p>
  <div class="grid-2x2">
    <div class="outcome-item">
      <div class="num accent">100%</div>
      <div class="desc">of COD orders get a verification call within 60 seconds — built to cut RTO losses by 20–30%.</div>
    </div>
    <div class="outcome-item">
      <div class="num">10–30%</div>
      <div class="desc">higher average order value from AI-prompted upselling at checkout and on the confirmation call.</div>
    </div>
    <div class="outcome-item">
      <div class="num">20–40%</div>
      <div class="desc">of tickets are WISMO queries — largely removable with automated, proactive tracking.</div>
    </div>
    <div class="outcome-item">
      <div class="num accent">3.4×</div>
      <div class="desc">the profit margin for brands running 25%+ repeat purchase rate vs. under 15% — retention math Mia is built to move.</div>
    </div>
  </div>
  <div class="callout-box-dark">
    Quick math for your brand: <b>your monthly order volume × average order value × 10–30% recovery rate</b> is a rough floor on the monthly upside — before counting the RTO and support-time savings above. We'll run this on your actual numbers on the call.
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>03</span>
  </div>
</section>

<!-- Slide 4: Meet Mia -->
<section class="slide light" id="slide-4">
  <div class="eyebrow">Meet Mia</div>
  <h1 class="slide-title">One AI Team Member. Every Channel. Knows Her Limits.</h1>
  <p class="slide-subhead">Mia lives on your WhatsApp, Instagram, and phone line. She guides browsing, recovers carts, places orders, confirms COD, and handles exchanges & returns — instantly, 24/7. Whenever something falls outside her playbook, she hands it straight to your team.</p>
  <div class="callout-box-light">
    A dedicated support and retention hire in Mumbai costs <b>₹25,000–₹40,000/month</b>. Mia’s Growth plan costs a fraction of that, works 24/7, and never takes a sick day.
  </div>
  <div class="panels-2col">
    <div class="panel-dark">
      <div class="ch-label">Channel 01</div>
      <div class="ch-title">Mia on Chat <span class="ch-sub">WhatsApp, Instagram, Web</span></div>
      <ul class="ch-list">
        <li>Guides catalog browsing & product Q&A</li>
        <li>Recovers abandoned carts in real time</li>
        <li>Places orders and handles exchanges/returns</li>
      </ul>
    </div>
    <div class="panel-dark">
      <div class="ch-label">Channel 02</div>
      <div class="ch-title">Mia on the Phone <span class="ch-sub">Voice agent</span></div>
      <ul class="ch-list">
        <li>Confirms every COD order before dispatch</li>
        <li>Flags high-risk / repeat-refuser numbers</li>
        <li>Runs win-back calls for lapsed customers</li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>04</span>
  </div>
</section>

<!-- Slide 5: Funnel -->
<section class="slide light" id="slide-5">
  <div class="eyebrow">One AI Team Member, Every Stage</div>
  <h1 class="slide-title">Pre-Purchase to Post-Purchase — One Bot, End to End</h1>
  <p class="slide-subhead">Mia isn't bolted onto one part of the journey. From the first Instagram comment to the fifth repeat order, she has a role at every stage — the next three chapters go deep on the highlighted ones.</p>
  <div class="funnel-grid">
    <div class="funnel-card">
      <div class="funnel-stage">Discovery</div>
      <div class="funnel-name">Guided Shopping</div>
      <ul class="funnel-items">
        <li>Ad comment → instant DM reply</li>
        <li>Menu-driven catalog browsing</li>
        <li>FAQs: sizing, shipping, ingredients</li>
      </ul>
    </div>
    <div class="funnel-card">
      <div class="funnel-stage">Conversion</div>
      <div class="funnel-name">Cart & Checkout</div>
      <ul class="funnel-items">
        <li>Abandoned cart recovery, direct resume link</li>
        <li><span class="pill-highlight">COD confirmation call</span></li>
        <li>Restock alerts on wait-listed sizes</li>
      </ul>
    </div>
    <div class="funnel-card">
      <div class="funnel-stage">Fulfillment</div>
      <div class="funnel-name">Tracking</div>
      <ul class="funnel-items">
        <li><span class="pill-highlight">No WISMO tickets</span></li>
        <li>Live status via WhatsApp</li>
        <li>Repeat-refuser flagging</li>
      </ul>
    </div>
    <div class="funnel-card">
      <div class="funnel-stage">Retention</div>
      <div class="funnel-name">Returns & Win-Back</div>
      <ul class="funnel-items">
        <li>No-portal exchanges & refunds</li>
        <li><span class="pill-highlight">Exchange before refund</span></li>
        <li>Win-back calls for lapsed buyers</li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>05</span>
  </div>
</section>

<!-- Slide 6: Getting Started -->
<section class="slide light" id="slide-6">
  <div class="eyebrow">Getting Started</div>
  <h1 class="slide-title">We Don't Just Build Mia — We Launch Her For You</h1>
  <p class="slide-subhead">Before Mia can recover a single cart, customers need to actually find her. That's part of the setup we handle — not an extra you figure out later.</p>
  <div class="grid-3col">
    <div class="cell">
      <div class="num" style="color: var(--accent2);">01</div>
      <div class="label" style="color: var(--ink);">Click-to-Chat, Everywhere</div>
      <div class="body">A WhatsApp button on your website, Instagram bio, and checkout page — the first touch the moment a customer has a question or abandons a cart.</div>
    </div>
    <div class="cell">
      <div class="num" style="color: var(--accent2);">02</div>
      <div class="label" style="color: var(--ink);">On Every Order Touchpoint</div>
      <div class="body">The same number gets added to order-confirmation SMS, shipping emails, and your Meta/Google ad campaigns — so customers already know where to reach her.</div>
    </div>
    <div class="cell">
      <div class="num" style="color: var(--accent2);">03</div>
      <div class="label" style="color: var(--ink);">Your Catalog & Policies, Loaded</div>
      <div class="body">We load your full product catalog, sizing charts, and return/exchange policy into her before you ever go live.</div>
    </div>
  </div>
  <div class="callout-box-dark" style="margin-top: 48px;">
    You focus on the product and the brand. <b>We handle the integration, the catalog upload, and getting your number in front of customers at every touchpoint</b> — typically live within 7 days.
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>06</span>
  </div>
</section>

<!-- Slide 7: Chapter 1 -->
<section class="slide light" id="slide-7">
  <div class="eyebrow">Chapter 1 of 3 · Discovery, Guided Shopping & Cart Recovery</div>
  <h1 class="slide-title" style="max-width: 900px;">Guides Browsing With a Menu, Wins Back the Sale With a Link</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>Customer messages, or taps through from an ad comment — Mia greets with a simple menu.</span></li>
        <li><b>2</b><span>She asks broadly what they're looking for, narrows by category, sends a direct link to browse and check out.</span></li>
        <li><b>3</b><span>If they stall before paying, an abandonment nudge fires within minutes with a direct link back to their saved cart.</span></li>
        <li><b>4</b><span>COD orders placed this way are automatically flagged for a confirmation call before dispatch.</span></li>
      </ul>
      <div class="smart-layer-box">
        <b>Smart layer</b>
        Mia ranks categories using browse/purchase history, and offers a small prepaid discount on the confirmation call — built to convert 8–14% of COD customers on the spot.
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Thread Story</span>
        <span class="sub">Catalog & Cart Recovery</span>
      </div>
      <div class="body">
        <div class="chat-bubble">Hi there! Choose an option: Shop Latest Styles, Track Order, Order Help.</div>
        <div class="chat-bubble me">Shop Latest Styles</div>
        <div class="chat-bubble">Hey! Noticed you left the Linen Midi (M) in your cart — tap to resume: threadstory.com/cart/8841</div>
        <div class="chat-bubble me">Just paid ✓</div>
        <div class="chat-bubble">Got it — we'll call to confirm before it ships.</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>07</span>
  </div>
</section>

<!-- Slide 8: Chapter 2 -->
<section class="slide light" id="slide-8">
  <div class="eyebrow">Chapter 2 of 3 · Tracking, Restock & COD Confirmation</div>
  <h1 class="slide-title" style="max-width: 900px;">Replaces "Where Is My Order?" With an Answer Before They Ask</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>Every COD order gets a verification call within 60 seconds of placement, before it's dispatched.</span></li>
        <li><b>2</b><span>"Track Order" pulls live status instantly; automatic WhatsApp updates follow at dispatch, out-for-delivery, and delivered.</span></li>
        <li><b>3</b><span>The moment a wait-listed size is restocked, an email + WhatsApp ping goes out automatically.</span></li>
        <li><b>4</b><span>A short satisfaction check-in is sent once the order is marked delivered.</span></li>
      </ul>
      <div class="smart-layer-box">
        <b>Smart layer</b>
        Once a number has refused delivery before, it's flagged automatically — so you can require prepaid or verify twice before shipping to it again.
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Thread Story</span>
        <span class="sub">Live Tracking & COD</span>
      </div>
      <div class="body">
        <div class="chat-bubble me">Track Order</div>
        <div class="chat-bubble">Sure — what's your order ID?</div>
        <div class="chat-bubble me">TS-88412</div>
        <div class="chat-bubble">Out for delivery today, arriving by 7 PM. Also — the Linen Midi in S is back in stock. Want the link?</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>08</span>
  </div>
</section>

<!-- Slide 9: Chapter 3 -->
<section class="slide light" id="slide-9">
  <div class="eyebrow">Chapter 3 of 3 · Exchange, Returns & Win-Back</div>
  <h1 class="slide-title" style="max-width: 900px;">Turns a Return Into a Repeat Customer</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>"Order Help?" routes straight into a return/exchange flow — no portal, no login.</span></li>
        <li><b>2</b><span>Mia checks eligibility against your policy instantly and asks the reason.</span></li>
        <li><b>3</b><span>For a wrong size or color, she offers an exchange before defaulting to a refund.</span></li>
        <li><b>4</b><span>Pickup is scheduled and the refund/exchange status is tracked in the same chat.</span></li>
      </ul>
      <div class="smart-layer-box">
        <b>Smart layer</b>
        For customers with purchase history, she proactively suggests an alternate size or similar item—recovering revenue that a standard refund would have lost outright.
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Thread Story</span>
        <span class="sub">Returns & Exchanges</span>
      </div>
      <div class="body">
        <div class="chat-bubble me">Order Help?</div>
        <div class="chat-bubble">Order TS-88412 is within the 7-day window. What's the issue?</div>
        <div class="chat-bubble me">Size too big</div>
        <div class="chat-bubble">S is in stock — I can exchange instead of refunding, no extra charge. Swap it?</div>
        <div class="chat-bubble me">Yes please</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>09</span>
  </div>
</section>

<!-- Slide 10: Why AgentIQ -->
<section class="slide light" id="slide-10">
  <div class="eyebrow">Why AgentIQ</div>
  <h1 class="slide-title">Priced Against a Hire, Not a Messaging Tool</h1>
  <div class="why-cols">
    <div>
      <div class="checklist-h">Ask any vendor these five questions</div>
      <ul class="checklist-items">
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Do they train and optimize the bot for you, or do you configure it yourself?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Is there a real Hindi/Hinglish conversation layer, or just menu-tree buttons in English?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Does chat and voice run as one system, or two separate products you have to stitch together?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Who owns retraining and prompt tuning after go-live — you, or them?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Can they show you live in your catalog before you sign anything?</span>
        </li>
      </ul>
    </div>
    <div class="side-card">
      <div>
        <div class="h">Done-For-You, Not Self-Serve</div>
        <p>Live in 7 days: kickoff call, we build and train Mia on your catalog and policies, you approve, we launch — no code on your end. Natural language in Hindi, Hinglish & English, not rigid button trees. Anything outside her playbook hands to your team instantly.</p>
      </div>
      <div class="quote">
        Tools like WATI, AiSensy, and Interakt hand you a messaging API to configure yourself. <b>AgentIQ hands you an outcome</b> — cart recovery, COD confirmation, and retention — already built and tuned for D2C.
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>10</span>
  </div>
</section>

<!-- Slide 11: Pricing -->
<section class="slide light" id="slide-11">
  <div class="eyebrow">Pricing</div>
  <h1 class="slide-title">One Team Member, Two Channels, One Bundle</h1>
  <div class="bundle-banner">
    Bundle Chat + Voice: <b>Save 15%</b> on your combined monthly retainer. One onboarding call, unified training pass, complete funnel coverage.
  </div>
  <div class="pricing-tables">
    <div>
      <div class="table-h">Chatbot — WhatsApp, Instagram, Web</div>
      <div class="tiers-grid">
        <div class="tier-card">
          <div class="name">Starter</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹24,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹7,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 1,000 Chats)</div>
          </div>
          <div class="tier-features">WhatsApp API, catalog mgmt, cart-recovery nudges included, Hindi/Hinglish/English</div>
        </div>
        <div class="tier-card pop">
          <div class="name">Growth</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹39,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹14,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: #AEB7C4;">(Includes 2,000 Chats)</div>
          </div>
          <div class="tier-features">+ WhatsApp Pay, full cart-recovery automation, chat widget, 24/7 priority support</div>
        </div>
        <div class="tier-card">
          <div class="name">Pro</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹79,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹24,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 5,000 Chats)</div>
          </div>
          <div class="tier-features">+ Multi-location routing, VIP tags, CRM integration, dedicated AM</div>
        </div>
      </div>
    </div>
    <div>
      <div class="table-h">Voice Agent — Phone Line</div>
      <div class="tiers-grid">
        <div class="tier-card pop">
          <div class="name">Starter</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹29,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹14,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: #AEB7C4;">(Includes 250 Mins)</div>
          </div>
          <div class="tier-features">1 inbound voice agent, handles interruptions, Hindi & English, call logging</div>
        </div>
        <div class="tier-card">
          <div class="name">Growth</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹49,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹24,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 500 Mins)</div>
          </div>
          <div class="tier-features">+ Outbound calling, COD verification at scale, live human transfer</div>
        </div>
        <div class="tier-card">
          <div class="name">Pro</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹99,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹34,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 800 Mins)</div>
          </div>
          <div class="tier-features">+ Unlimited concurrency, voice cloning, custom integrations</div>
        </div>
      </div>
    </div>
  </div>
  <p class="pricing-note">
    30-day money-back guarantee on both. Overage on voice billed at ₹45/min. Meta conversation fees billed separately. GST extra. Enterprise 5,000+ chats/mo — contact shane@agentiq.co.in.
  </p>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>11</span>
  </div>
</section>

<!-- Slide 12: Next Steps -->
<section class="slide dark" id="slide-12">
  <div class="eyebrow-row">
    <div class="dot"></div>
    <div class="eyebrow">Next Step</div>
  </div>
  <div class="hr-dark"></div>
  <h1 class="hero-title" style="font-size: 80px; margin-top: 40px;">Let's Put Mia on Your <span class="accent">Storefront.</span></h1>
  <p class="hero-subhead" style="margin-top: 20px;">Book your free 20-minute demo. We'll show a live mockup built for your catalog and return policy, no obligation — here's what happens after.</p>
  <div class="next-steps-grid">
    <div class="next-step-card">
      <div class="next-step-num">01</div>
      <div class="next-step-title">20-min demo</div>
      <div class="next-step-desc">Live mockup on your catalog, this week.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">02</div>
      <div class="next-step-title">Custom quote</div>
      <div class="next-step-desc">Priced against your order volume, not a generic tier.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">03</div>
      <div class="next-step-title">7-day build</div>
      <div class="next-step-desc">Trained on your catalog and policies, you approve before launch.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">04</div>
      <div class="next-step-title">Live, with support</div>
      <div class="next-step-desc">30-day money-back guarantee while you see real results.</div>
    </div>
  </div>
  <div class="contact-bar">
    <div class="contact-item">
      <div class="label">Call</div>
      <div class="val">+91 91596 65277</div>
    </div>
    <div class="contact-item">
      <div class="label">WhatsApp</div>
      <div class="val">wa.me/919159665277</div>
    </div>
    <div class="contact-item">
      <div class="label">Email</div>
      <div class="val">shane@agentiq.co.in</div>
    </div>
    <div class="contact-item">
      <div class="label">Based In</div>
      <div class="val">Mumbai, India · nationwide</div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>12</span>
  </div>
</section>

</body>
</html>
`;
}

function generateDcHtml(fileName, extraStyles, innerSlideHtml) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap">
<style>
${getDeckStyles()}
</style>
</helmet>
${innerSlideHtml}
</x-dc>
<script data-dc-script data-props='{}'>
class Component extends DCLogic { renderVals() { return {}; } }
</script>
</body>
</html>
`;
}

function updateDcFiles() {
  // Update restaurants .dc.html files
  const restSlides = [
    {
      file: 'Main.dc.html',
      html: `<div class="slide dark">
  <div class="eyebrow-row">
    <div class="dot"></div>
    <div class="eyebrow">Newly Launched · Now Onboarding Restaurants Across India</div>
  </div>
  <div class="hr-dark"></div>
  <h1 class="hero-title">AgentIQ <span class="accent">for Restaurants</span></h1>
  <p class="hero-subhead">More tables booked. Faster orders. Guests who come back. Works alongside your POS and booking tools — not instead of them.</p>
  <div class="hero-stat-row">
    <div class="hero-stat">
      <div class="hero-stat-num">10–30%</div>
      <div class="hero-stat-label">higher order value</div>
    </div>
    <div class="hero-divider-v"></div>
    <div class="hero-stat">
      <div class="hero-stat-num">up to 30%</div>
      <div class="hero-stat-label">of lost call revenue recovered</div>
    </div>
    <div class="hero-divider-v"></div>
    <div class="hero-stat">
      <div class="hero-stat-num">single digits</div>
      <div class="hero-stat-label">no-show rate, down from ~20%</div>
    </div>
  </div>
  <div class="footer">
    <span>One AI team member, chat + voice, one contract · WhatsApp, Instagram & Website · Made in India</span>
    <span>01</span>
  </div>
</div>`
    },
    {
      file: 'Problem.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">The Cost of Doing Nothing</div>
  <h1 class="slide-title">What a Busy Friday Night Is Actually Costing You</h1>
  <p class="slide-subhead">A dinner rush runs on split-second timing. Here's where the revenue actually leaks — and the math scales whether you run 40 covers or 400.</p>
  <div class="grid-3col">
    <div class="cell">
      <div class="num">20–35%</div>
      <div class="label">of walk-ins leave when the wait isn't managed</div>
      <div class="body">India's walk-in dining culture means a meaningful share of would-be diners leave rather than wait. One study of an Indian restaurant found removing that wait lifted total revenue by ~15%.</div>
    </div>
    <div class="cell">
      <div class="num">60–80%</div>
      <div class="label">of daily revenue happens in the peak window alone</div>
      <div class="body">Lunch and dinner rushes generate most of a restaurant's daily revenue — exactly when overloaded staff have the least time to answer a call or suggest the extra starter or round of drinks.</div>
    </div>
    <div class="cell">
      <div class="num">5–20%</div>
      <div class="label">no-show rate on reservations, industry-wide</div>
      <div class="body">Every no-show is an empty table during your peak window. It turns away paying walk-ins and permanently loses that night's revenue.</div>
    </div>
  </div>
  <div class="callout-box-dark">
    The math scales with you: on an average <b>₹700–₹900 check</b>, a single unanswered call or unmanaged no-show during peak hours is a real <b>₹2,000–₹4,000+</b> walking out the door — whether that happens once a week or five times.
  </div>
  <p class="sources-note">Sources: industry waiting-time and walkout research on Indian restaurants; commonly cited no-show benchmarks from Indian restaurant-tech platforms. Figures are directional industry ranges, not AgentIQ measurements — ask us for the underlying reports.</p>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>02</span>
  </div>
</div>`
    },
    {
      file: 'Outcome.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">What Mei Is Designed To Deliver</div>
  <h1 class="slide-title">Engineered for Outcomes, Not Just Conversations</h1>
  <p class="slide-subhead">We're a newly launched product, so these are the outcomes Mei is engineered and benchmarked to hit, grounded in independent research on where restaurant revenue leaks — not a customer average. That's why the next step is a live mockup on your own menu, not a slide of someone else's.</p>
  <div class="grid-2x2">
    <div class="outcome-item">
      <div class="num accent">92%</div>
      <div class="desc">of guest queries resolved automatically, without staff involvement.</div>
    </div>
    <div class="outcome-item">
      <div class="num">10–30%</div>
      <div class="desc">higher average order value from AI-prompted upselling.</div>
    </div>
    <div class="outcome-item">
      <div class="num">~30%</div>
      <div class="desc">of previously lost phone revenue recovered with AI call answering.</div>
    </div>
    <div class="outcome-item">
      <div class="num accent">Single digits</div>
      <div class="desc">no-show rate, down from ~20%, with automated reminder confirmations.</div>
    </div>
  </div>
  <div class="callout-box-dark">
    Bridging the math: if the peak-window leak from the last slide runs <b>₹2,000–₹4,000 per missed table or call</b>, recovering just a handful a week is real monthly revenue — on top of the AOV lift above. We'll size it against your actual covers and average check on the call.
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>03</span>
  </div>
</div>`
    },
    {
      file: 'MeetMei.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Meet Mei</div>
  <h1 class="slide-title">One AI Team Member. Every Channel. Knows Her Limits.</h1>
  <p class="slide-subhead">Mei lives on your WhatsApp, Instagram, and phone line. She books tables, takes orders, and follows up after every visit — instantly, 24/7. Whenever something falls outside her playbook, she hands it straight to your team.</p>
  <div class="callout-box-light">
    She sits on top of your POS and booking system—not instead of it. Mei answers the guests, while your existing tools still run the kitchen and the books. No rip-and-replace, no data migration.
  </div>
  <div class="panels-2col">
    <div class="panel-dark">
      <div class="ch-label">Channel 01</div>
      <div class="ch-title">Mei on Chat <span class="ch-sub">WhatsApp, Instagram, Web</span></div>
      <ul class="ch-list">
        <li>Books tables and answers menu questions</li>
        <li>Takes dine-in and takeaway orders directly</li>
        <li>Sends payment links via UPI / Razorpay</li>
      </ul>
    </div>
    <div class="panel-dark">
      <div class="ch-label">Channel 02</div>
      <div class="ch-title">Mei on the Phone <span class="ch-sub">Voice agent</span></div>
      <ul class="ch-list">
        <li>Answers every call, no busy tone, ever</li>
        <li>Confirms reservations the evening before</li>
        <li>Follows up after the visit for feedback</li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>04</span>
  </div>
</div>`
    },
    {
      file: 'GettingStarted.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Getting Started</div>
  <h1 class="slide-title">We Don't Just Build Mei — We Launch Her For You</h1>
  <p class="slide-subhead">Before Mei can answer a single message, guests need to actually find her. That's part of the setup we handle — not an extra you figure out later.</p>
  <div class="grid-3col">
    <div class="cell">
      <div class="num" style="color: var(--accent2);">01</div>
      <div class="label" style="color: var(--ink);">Table QR Codes</div>
      <div class="body">Every table gets a scan-to-chat code straight to your WhatsApp — the first touch for dine-in guests, no app download.</div>
    </div>
    <div class="cell">
      <div class="num" style="color: var(--accent2);">02</div>
      <div class="label" style="color: var(--ink);">Marketed Where Guests Search</div>
      <div class="body">The same number goes on your Google Business Profile, Instagram, and Facebook — so reservation enquiries land straight in Mei's chat.</div>
    </div>
    <div class="cell">
      <div class="num" style="color: var(--accent2);">03</div>
      <div class="label" style="color: var(--ink);">Your Menu, Fully Loaded</div>
      <div class="body">We digitize and load your complete menu — prices, categories, spice levels, dietary tags — into her before you ever go live.</div>
    </div>
  </div>
  <div class="callout-box-dark" style="margin-top: 48px;">
    You focus on the kitchen and the floor. <b>We handle the QR code design and printing, the menu upload, and getting your number listed everywhere guests already look</b> — typically live within 7 days.
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>05</span>
  </div>
</div>`
    },
    {
      file: 'Chapter1.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Chapter 1 of 3 · Reservations</div>
  <h1 class="slide-title" style="max-width: 900px;">Every Guest Gets a Table — Even During Friday Rush</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>Guest messages your WhatsApp number any time, even after close.</span></li>
        <li><b>2</b><span>Mei asks for date, time, and party size, one question at a time.</span></li>
        <li><b>3</b><span>She checks live availability and confirms the booking instantly.</span></li>
        <li><b>4</b><span>A reminder goes out automatically the evening before.</span></li>
      </ul>
      <div class="smart-layer-box">
        <b>Smart layer</b>
        From a guest's 2nd visit, Mei recognizes them by name and skips straight to booking — no re-typing details, no small talk needed.
      </div>
      <div class="handoff-note">
        Hands off to your team when: <b>parties of 8+, private events, or dates outside normal booking hours.</b>
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Spice Garden</span>
        <span class="sub">WhatsApp</span>
      </div>
      <div class="body">
        <div class="chat-bubble me">Table for 4 tonight around 8?</div>
        <div class="chat-bubble">8:00 PM is open for 4 tonight. Shall I hold it under your name?</div>
        <div class="chat-bubble me">Yes — Aarav</div>
        <div class="chat-bubble">Confirmed — table for 4, tonight 8:00 PM, under Aarav. See you soon!</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>06</span>
  </div>
</div>`
    },
    {
      file: 'Chapter2.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Chapter 2 of 3 · Order Placement</div>
  <h1 class="slide-title" style="max-width: 900px;">Orders Reach the Kitchen in Seconds — and Grow Along the Way</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>Guest scans the table QR code, or messages directly for takeaway.</span></li>
        <li><b>2</b><span>Mei shows the live menu — prices, spice level, veg/non-veg tags — guest picks items directly, no server wait.</span></li>
        <li><b>3</b><span>Order fires straight to the kitchen/POS, payment link follows.</span></li>
      </ul>
      <div class="smart-layer-box" style="margin-top: 28px;">
        <b>Smart upselling</b>
        Ordered a curry but no rice, no drinks yet? Mei suggests adding instantly in the same chat — built to lift average order value 10–30%.
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Spice Garden</span>
        <span class="sub">Table 7 · scanned</span>
      </div>
      <div class="body">
        <div class="chat-bubble me">Paneer Tikka + Dal Makhani ×2</div>
        <div class="chat-bubble">Added. Breads or rice with that? Most tables add Butter Naan ₹90.</div>
        <div class="chat-bubble me">2 butter naan</div>
        <div class="chat-bubble">Sent to the kitchen. Total ₹1,240 — pay here: pay.spicegarden.in/t7</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>07</span>
  </div>
</div>`
    },
    {
      file: 'Chapter3.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Chapter 3 of 3 · Loyalty & Feedback</div>
  <h1 class="slide-title" style="max-width: 900px;">Turns a One-Time Visit Into a Repeat Guest</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>After the visit, Mei sends a short thank-you message the same day.</span></li>
        <li><b>2</b><span>She asks for quick feedback — one tap: Great, Okay, or Not great.</span></li>
        <li><b>3</b><span>A Google review link is included automatically, no separate ask.</span></li>
        <li><b>4</b><span>Any "Not great" response is flagged to your manager, same day.</span></li>
      </ul>
      <div class="smart-layer-box">
        <b>Smart layer</b>
        Once Mei has a guest's order history, she can nudge regulars who haven't visited in a while with an offer built around what they actually order.
      </div>
      <div class="handoff-note">
        Hands off to your team when: <b>negative feedback — always escalates to a real person, same day, no exceptions.</b>
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Spice Garden</span>
        <span class="sub">Feedback & Reviews</span>
      </div>
      <div class="body">
        <div class="chat-bubble">Thanks for dining with us tonight, Aarav 🙏 How was everything?</div>
        <div class="chat-bubble me">Great</div>
        <div class="chat-bubble">Wonderful. If you have 20 seconds, a Google review helps us a lot: g.page/spicegarden/review</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>08</span>
  </div>
</div>`
    },
    {
      file: 'WhyAgentIQ.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Why AgentIQ</div>
  <h1 class="slide-title">Complements Petpooja and Your Booking Tools — Doesn't Replace Them</h1>
  <div class="why-cols">
    <div>
      <div class="checklist-h">Ask any vendor these five questions</div>
      <ul class="checklist-items">
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Does it replace my POS, or sit on top and talk to guests while my POS still runs the kitchen?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Does it train and optimize itself for my menu, or do I configure it myself?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Is there a real Hindi/Hinglish conversation layer, or just English menu-tree buttons?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Does chat and phone run as one system, or two separate tools?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Can they show you live on your actual menu before you sign anything?</span>
        </li>
      </ul>
    </div>
    <div class="side-card">
      <div>
        <div class="h">Done-For-You, Not Self-Serve</div>
        <p>Live in 7 days: kickoff call, we build and train Mei on your menu and policies, you approve, we launch — no code on your end. Anything outside her playbook escalates to your team instantly. Your data stays encrypted, India-compliant, never sold or reused to train anyone else's bot.</p>
      </div>
      <div class="quote">
        You already pay for a POS and maybe a booking app to run the back of house. <b>AgentIQ is the layer that talks to guests</b> — before, during, and after the table — and hands what it captures straight into the systems you already use.
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>09</span>
  </div>
</div>`
    },
    {
      file: 'Pricing.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Pricing</div>
  <h1 class="slide-title">One Team Member, Two Channels, One Bundle</h1>
  <div class="bundle-banner">
    Bundle Chat + Voice: <b>Save 15%</b> on your combined monthly retainer. One onboarding call, unified training pass, complete funnel coverage.
  </div>
  <div class="pricing-tables">
    <div>
      <div class="table-h">Chatbot — WhatsApp, Instagram, Web</div>
      <div class="tiers-grid">
        <div class="tier-card">
          <div class="name">Starter</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹24,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹7,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 1,000 Chats)</div>
          </div>
          <div class="tier-features">WhatsApp API, menu & catalog mgmt, Hindi/Hinglish/English, standard support</div>
        </div>
        <div class="tier-card pop">
          <div class="name">Growth</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹39,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹14,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: #AEB7C4;">(Includes 2,000 Chats)</div>
          </div>
          <div class="tier-features">+ WhatsApp Pay, follow-ups & win-back, chat widget, 24/7 priority support</div>
        </div>
        <div class="tier-card">
          <div class="name">Pro</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹79,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹24,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 5,000 Chats)</div>
          </div>
          <div class="tier-features">+ Multi-location routing, guest profiling, CRM integration, dedicated AM</div>
        </div>
      </div>
    </div>
    <div>
      <div class="table-h">Voice Agent — Phone Line</div>
      <div class="tiers-grid">
        <div class="tier-card pop">
          <div class="name">Starter</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹29,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹14,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: #AEB7C4;">(Includes 250 Mins)</div>
          </div>
          <div class="tier-features">1 inbound voice agent, handles interruptions, Hindi & English, call logging</div>
        </div>
        <div class="tier-card">
          <div class="name">Growth</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹49,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹24,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 500 Mins)</div>
          </div>
          <div class="tier-features">+ Outbound calling, real-time table booking, live human transfer</div>
        </div>
        <div class="tier-card">
          <div class="name">Pro</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹99,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹34,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 800 Mins)</div>
          </div>
          <div class="tier-features">+ Unlimited concurrency, voice cloning, custom integrations</div>
        </div>
      </div>
    </div>
  </div>
  <p class="pricing-note">
    30-day money-back guarantee on both. Overage on voice billed at ₹45/min. Meta conversation fees billed separately. GST extra.<br>
    <b>Seasonal?</b> Ask about a shorter initial term on Starter if your footfall swings hard by season — we'd rather flex the plan than lose the relationship over one slow month.
  </p>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>10</span>
  </div>
</div>`
    },
    {
      file: 'NextSteps.dc.html',
      html: `<div class="slide dark">
  <div class="eyebrow-row">
    <div class="dot"></div>
    <div class="eyebrow">Next Step</div>
  </div>
  <div class="hr-dark"></div>
  <h1 class="hero-title" style="font-size: 80px; margin-top: 40px;">Let's Put Mei on Your <span class="accent">WhatsApp.</span></h1>
  <p class="hero-subhead" style="margin-top: 20px;">Book your free 20-minute demo. We'll show a live mockup built for your menu and booking policy, no obligation — here's what happens after.</p>
  <div class="next-steps-grid">
    <div class="next-step-card">
      <div class="next-step-num">01</div>
      <div class="next-step-title">20-min demo</div>
      <div class="next-step-desc">Live mockup on your menu, this week.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">02</div>
      <div class="next-step-title">Custom quote</div>
      <div class="next-step-desc">Priced against your covers and seasonality, not a generic tier.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">03</div>
      <div class="next-step-title">7-day build</div>
      <div class="next-step-desc">Trained on your menu and policies, you approve before launch.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">04</div>
      <div class="next-step-title">Live, with support</div>
      <div class="next-step-desc">30-day money-back guarantee while you see real results.</div>
    </div>
  </div>
  <div class="contact-bar">
    <div class="contact-item">
      <div class="label">Call</div>
      <div class="val">+91 91596 65277</div>
    </div>
    <div class="contact-item">
      <div class="label">WhatsApp</div>
      <div class="val">wa.me/919159665277</div>
    </div>
    <div class="contact-item">
      <div class="label">Email</div>
      <div class="val">shane@agentiq.co.in</div>
    </div>
    <div class="contact-item">
      <div class="label">Based In</div>
      <div class="val">Mumbai, India · nationwide</div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | Restaurants</span>
    <span>11</span>
  </div>
</div>`
    }
  ];

  restSlides.forEach(s => {
    fs.writeFileSync(path.join(restaurantsDir, s.file), generateDcHtml(s.file, '', s.html), 'utf8');
  });

  // Update D2C .dc.html files
  const d2cSlides = [
    {
      file: 'Main.dc.html',
      html: `<div class="slide dark">
  <div class="eyebrow-row">
    <div class="dot"></div>
    <div class="eyebrow">Newly Launched · Now Onboarding D2C Brands Across India</div>
  </div>
  <div class="hr-dark"></div>
  <h1 class="hero-title">AgentIQ <span class="accent">for D2C Brands</span></h1>
  <p class="hero-subhead">From the first DM to the last delivery — one AI team member covers the entire funnel. Built to replace the cost of a hire, not another chatbot subscription.</p>
  <div class="hero-stat-row">
    <div class="hero-stat">
      <div class="hero-stat-num">10–30%</div>
      <div class="hero-stat-label">higher order value</div>
    </div>
    <div class="hero-divider-v"></div>
    <div class="hero-stat">
      <div class="hero-stat-num">8–14%</div>
      <div class="hero-stat-label">of COD orders switched to prepaid</div>
    </div>
    <div class="hero-divider-v"></div>
    <div class="hero-stat">
      <div class="hero-stat-num">3.4×</div>
      <div class="hero-stat-label">margins at 25%+ repeat rate</div>
    </div>
  </div>
  <div class="footer">
    <span>One AI team member, chat + voice, one contract · WhatsApp, Instagram & Website · Made in India</span>
    <span>01</span>
  </div>
</div>`
    },
    {
      file: 'Problem.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">The Cost of Doing Nothing</div>
  <h1 class="slide-title">What Cart Abandonment and RTO Are Actually Costing You</h1>
  <p class="slide-subhead">Indian D2C brands lose revenue at three points in the journey — before checkout, at the door, and after the sale. The math scales with your volume, whether you're shipping 200 orders a month or 20,000.</p>
  <div class="grid-3col">
    <div class="cell">
      <div class="num">~70%</div>
      <div class="label">of online carts are abandoned</div>
      <div class="body">Globally, 7 in 10 shoppers leave without completing checkout — Indian D2C storefronts are widely reported to run higher still. Without a fast, personal nudge, that revenue typically doesn't come back on its own.</div>
    </div>
    <div class="cell">
      <div class="num">20–30%</div>
      <div class="label">RTO rate for Indian D2C brands</div>
      <div class="body">India's Return-to-Origin rate runs 20–30% industry-wide, spiking well past that during festive-season COD volume — driven largely by orders that were never confirmed before dispatch.</div>
    </div>
    <div class="cell">
      <div class="num">20–40%</div>
      <div class="label">of support tickets are "Where is my order?"</div>
      <div class="body">WISMO queries are widely reported to make up a fifth to two-fifths of support volume, climbing further in sale season — tying up a team that could be doing higher-value work.</div>
    </div>
  </div>
  <p class="sources-note">Sources: Baymard Institute cart abandonment research; industry RTO benchmarks reported across Indian D2C logistics and returns-management platforms; commonly cited WISMO/support-ticket industry estimates. Figures are directional industry ranges, not AgentIQ measurements — ask us for the underlying reports.</p>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>02</span>
  </div>
</div>`
    },
    {
      file: 'Outcome.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">What Mia Is Designed To Deliver</div>
  <h1 class="slide-title">Engineered for Outcomes, Not Just Conversations</h1>
  <p class="slide-subhead">We're a newly launched product, so these are the outcomes Mia is engineered and benchmarked to hit, grounded in independent research on where D2C revenue leaks — not a customer average. That's why the next step is a live mockup on your own numbers, not a slide of someone else's.</p>
  <div class="grid-2x2">
    <div class="outcome-item">
      <div class="num accent">100%</div>
      <div class="desc">of COD orders get a verification call within 60 seconds — built to cut RTO losses by 20–30%.</div>
    </div>
    <div class="outcome-item">
      <div class="num">10–30%</div>
      <div class="desc">higher average order value from AI-prompted upselling at checkout and on the confirmation call.</div>
    </div>
    <div class="outcome-item">
      <div class="num">20–40%</div>
      <div class="desc">of tickets are WISMO queries — largely removable with automated, proactive tracking.</div>
    </div>
    <div class="outcome-item">
      <div class="num accent">3.4×</div>
      <div class="desc">the profit margin for brands running 25%+ repeat purchase rate vs. under 15% — retention math Mia is built to move.</div>
    </div>
  </div>
  <div class="callout-box-dark">
    Quick math for your brand: <b>your monthly order volume × average order value × 10–30% recovery rate</b> is a rough floor on the monthly upside — before counting the RTO and support-time savings above. We'll run this on your actual numbers on the call.
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>03</span>
  </div>
</div>`
    },
    {
      file: 'MeetMia.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Meet Mia</div>
  <h1 class="slide-title">One AI Team Member. Every Channel. Knows Her Limits.</h1>
  <p class="slide-subhead">Mia lives on your WhatsApp, Instagram, and phone line. She guides browsing, recovers carts, places orders, confirms COD, and handles exchanges & returns — instantly, 24/7. Whenever something falls outside her playbook, she hands it straight to your team.</p>
  <div class="callout-box-light">
    A dedicated support and retention hire in Mumbai costs <b>₹25,000–₹40,000/month</b>. Mia’s Growth plan costs a fraction of that, works 24/7, and never takes a sick day.
  </div>
  <div class="panels-2col">
    <div class="panel-dark">
      <div class="ch-label">Channel 01</div>
      <div class="ch-title">Mia on Chat <span class="ch-sub">WhatsApp, Instagram, Web</span></div>
      <ul class="ch-list">
        <li>Guides catalog browsing & product Q&A</li>
        <li>Recovers abandoned carts in real time</li>
        <li>Places orders and handles exchanges/returns</li>
      </ul>
    </div>
    <div class="panel-dark">
      <div class="ch-label">Channel 02</div>
      <div class="ch-title">Mia on the Phone <span class="ch-sub">Voice agent</span></div>
      <ul class="ch-list">
        <li>Confirms every COD order before dispatch</li>
        <li>Flags high-risk / repeat-refuser numbers</li>
        <li>Runs win-back calls for lapsed customers</li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>04</span>
  </div>
</div>`
    },
    {
      file: 'Funnel.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">One AI Team Member, Every Stage</div>
  <h1 class="slide-title">Pre-Purchase to Post-Purchase — One Bot, End to End</h1>
  <p class="slide-subhead">Mia isn't bolted onto one part of the journey. From the first Instagram comment to the fifth repeat order, she has a role at every stage — the next three chapters go deep on the highlighted ones.</p>
  <div class="funnel-grid">
    <div class="funnel-card">
      <div class="funnel-stage">Discovery</div>
      <div class="funnel-name">Guided Shopping</div>
      <ul class="funnel-items">
        <li>Ad comment → instant DM reply</li>
        <li>Menu-driven catalog browsing</li>
        <li>FAQs: sizing, shipping, ingredients</li>
      </ul>
    </div>
    <div class="funnel-card">
      <div class="funnel-stage">Conversion</div>
      <div class="funnel-name">Cart & Checkout</div>
      <ul class="funnel-items">
        <li>Abandoned cart recovery, direct resume link</li>
        <li><span class="pill-highlight">COD confirmation call</span></li>
        <li>Restock alerts on wait-listed sizes</li>
      </ul>
    </div>
    <div class="funnel-card">
      <div class="funnel-stage">Fulfillment</div>
      <div class="funnel-name">Tracking</div>
      <ul class="funnel-items">
        <li><span class="pill-highlight">No WISMO tickets</span></li>
        <li>Live status via WhatsApp</li>
        <li>Repeat-refuser flagging</li>
      </ul>
    </div>
    <div class="funnel-card">
      <div class="funnel-stage">Retention</div>
      <div class="funnel-name">Returns & Win-Back</div>
      <ul class="funnel-items">
        <li>No-portal exchanges & refunds</li>
        <li><span class="pill-highlight">Exchange before refund</span></li>
        <li>Win-back calls for lapsed buyers</li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>05</span>
  </div>
</div>`
    },
    {
      file: 'GettingStarted.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Getting Started</div>
  <h1 class="slide-title">We Don't Just Build Mia — We Launch Her For You</h1>
  <p class="slide-subhead">Before Mia can recover a single cart, customers need to actually find her. That's part of the setup we handle — not an extra you figure out later.</p>
  <div class="grid-3col">
    <div class="cell">
      <div class="num" style="color: var(--accent2);">01</div>
      <div class="label" style="color: var(--ink);">Click-to-Chat, Everywhere</div>
      <div class="body">A WhatsApp button on your website, Instagram bio, and checkout page — the first touch the moment a customer has a question or abandons a cart.</div>
    </div>
    <div class="cell">
      <div class="num" style="color: var(--accent2);">02</div>
      <div class="label" style="color: var(--ink);">On Every Order Touchpoint</div>
      <div class="body">The same number gets added to order-confirmation SMS, shipping emails, and your Meta/Google ad campaigns — so customers already know where to reach her.</div>
    </div>
    <div class="cell">
      <div class="num" style="color: var(--accent2);">03</div>
      <div class="label" style="color: var(--ink);">Your Catalog & Policies, Loaded</div>
      <div class="body">We load your full product catalog, sizing charts, and return/exchange policy into her before you ever go live.</div>
    </div>
  </div>
  <div class="callout-box-dark" style="margin-top: 48px;">
    You focus on the product and the brand. <b>We handle the integration, the catalog upload, and getting your number in front of customers at every touchpoint</b> — typically live within 7 days.
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>06</span>
  </div>
</div>`
    },
    {
      file: 'Chapter1.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Chapter 1 of 3 · Discovery, Guided Shopping & Cart Recovery</div>
  <h1 class="slide-title" style="max-width: 900px;">Guides Browsing With a Menu, Wins Back the Sale With a Link</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>Customer messages, or taps through from an ad comment — Mia greets with a simple menu.</span></li>
        <li><b>2</b><span>She asks broadly what they're looking for, narrows by category, sends a direct link to browse and check out.</span></li>
        <li><b>3</b><span>If they stall before paying, an abandonment nudge fires within minutes with a direct link back to their saved cart.</span></li>
        <li><b>4</b><span>COD orders placed this way are automatically flagged for a confirmation call before dispatch.</span></li>
      </ul>
      <div class="smart-layer-box">
        <b>Smart layer</b>
        Mia ranks categories using browse/purchase history, and offers a small prepaid discount on the confirmation call — built to convert 8–14% of COD customers on the spot.
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Thread Story</span>
        <span class="sub">Catalog & Cart Recovery</span>
      </div>
      <div class="body">
        <div class="chat-bubble">Hi there! Choose an option: Shop Latest Styles, Track Order, Order Help.</div>
        <div class="chat-bubble me">Shop Latest Styles</div>
        <div class="chat-bubble">Hey! Noticed you left the Linen Midi (M) in your cart — tap to resume: threadstory.com/cart/8841</div>
        <div class="chat-bubble me">Just paid ✓</div>
        <div class="chat-bubble">Got it — we'll call to confirm before it ships.</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>07</span>
  </div>
</div>`
    },
    {
      file: 'Chapter2.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Chapter 2 of 3 · Tracking, Restock & COD Confirmation</div>
  <h1 class="slide-title" style="max-width: 900px;">Replaces "Where Is My Order?" With an Answer Before They Ask</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>Every COD order gets a verification call within 60 seconds of placement, before it's dispatched.</span></li>
        <li><b>2</b><span>"Track Order" pulls live status instantly; automatic WhatsApp updates follow at dispatch, out-for-delivery, and delivered.</span></li>
        <li><b>3</b><span>The moment a wait-listed size is restocked, an email + WhatsApp ping goes out automatically.</span></li>
        <li><b>4</b><span>A short satisfaction check-in is sent once the order is marked delivered.</span></li>
      </ul>
      <div class="smart-layer-box">
        <b>Smart layer</b>
        Once a number has refused delivery before, it's flagged automatically — so you can require prepaid or verify twice before shipping to it again.
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Thread Story</span>
        <span class="sub">Live Tracking & COD</span>
      </div>
      <div class="body">
        <div class="chat-bubble me">Track Order</div>
        <div class="chat-bubble">Sure — what's your order ID?</div>
        <div class="chat-bubble me">TS-88412</div>
        <div class="chat-bubble">Out for delivery today, arriving by 7 PM. Also — the Linen Midi in S is back in stock. Want the link?</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>08</span>
  </div>
</div>`
    },
    {
      file: 'Chapter3.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Chapter 3 of 3 · Exchange, Returns & Win-Back</div>
  <h1 class="slide-title" style="max-width: 900px;">Turns a Return Into a Repeat Customer</h1>
  <div class="chapter-container">
    <div class="chapter-left">
      <div class="how-title">How It Works</div>
      <ul class="steps-list">
        <li><b>1</b><span>"Order Help?" routes straight into a return/exchange flow — no portal, no login.</span></li>
        <li><b>2</b><span>Mia checks eligibility against your policy instantly and asks the reason.</span></li>
        <li><b>3</b><span>For a wrong size or color, she offers an exchange before defaulting to a refund.</span></li>
        <li><b>4</b><span>Pickup is scheduled and the refund/exchange status is tracked in the same chat.</span></li>
      </ul>
      <div class="smart-layer-box">
        <b>Smart layer</b>
        For customers with purchase history, she proactively suggests an alternate size or similar item—recovering revenue that a standard refund would have lost outright.
      </div>
    </div>
    <div class="phone-mockup">
      <div class="head">
        <span>Thread Story</span>
        <span class="sub">Returns & Exchanges</span>
      </div>
      <div class="body">
        <div class="chat-bubble me">Order Help?</div>
        <div class="chat-bubble">Order TS-88412 is within the 7-day window. What's the issue?</div>
        <div class="chat-bubble me">Size too big</div>
        <div class="chat-bubble">S is in stock — I can exchange instead of refunding, no extra charge. Swap it?</div>
        <div class="chat-bubble me">Yes please</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>09</span>
  </div>
</div>`
    },
    {
      file: 'WhyAgentIQ.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Why AgentIQ</div>
  <h1 class="slide-title">Priced Against a Hire, Not a Messaging Tool</h1>
  <div class="why-cols">
    <div>
      <div class="checklist-h">Ask any vendor these five questions</div>
      <ul class="checklist-items">
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Do they train and optimize the bot for you, or do you configure it yourself?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Is there a real Hindi/Hinglish conversation layer, or just menu-tree buttons in English?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Does chat and voice run as one system, or two separate products you have to stitch together?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Who owns retraining and prompt tuning after go-live — you, or them?</span>
        </li>
        <li>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#C97A34" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Can they show you live in your catalog before you sign anything?</span>
        </li>
      </ul>
    </div>
    <div class="side-card">
      <div>
        <div class="h">Done-For-You, Not Self-Serve</div>
        <p>Live in 7 days: kickoff call, we build and train Mia on your catalog and policies, you approve, we launch — no code on your end. Natural language in Hindi, Hinglish & English, not rigid button trees. Anything outside her playbook hands to your team instantly.</p>
      </div>
      <div class="quote">
        Tools like WATI, AiSensy, and Interakt hand you a messaging API to configure yourself. <b>AgentIQ hands you an outcome</b> — cart recovery, COD confirmation, and retention — already built and tuned for D2C.
      </div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>10</span>
  </div>
</div>`
    },
    {
      file: 'Pricing.dc.html',
      html: `<div class="slide light">
  <div class="eyebrow">Pricing</div>
  <h1 class="slide-title">One Team Member, Two Channels, One Bundle</h1>
  <div class="bundle-banner">
    Bundle Chat + Voice: <b>Save 15%</b> on your combined monthly retainer. One onboarding call, unified training pass, complete funnel coverage.
  </div>
  <div class="pricing-tables">
    <div>
      <div class="table-h">Chatbot — WhatsApp, Instagram, Web</div>
      <div class="tiers-grid">
        <div class="tier-card">
          <div class="name">Starter</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹24,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹7,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 1,000 Chats)</div>
          </div>
          <div class="tier-features">WhatsApp API, catalog mgmt, cart-recovery nudges included, Hindi/Hinglish/English</div>
        </div>
        <div class="tier-card pop">
          <div class="name">Growth</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹39,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹14,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: #AEB7C4;">(Includes 2,000 Chats)</div>
          </div>
          <div class="tier-features">+ WhatsApp Pay, full cart-recovery automation, chat widget, 24/7 priority support</div>
        </div>
        <div class="tier-card">
          <div class="name">Pro</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹79,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹24,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 5,000 Chats)</div>
          </div>
          <div class="tier-features">+ Multi-location routing, VIP tags, CRM integration, dedicated AM</div>
        </div>
      </div>
    </div>
    <div>
      <div class="table-h">Voice Agent — Phone Line</div>
      <div class="tiers-grid">
        <div class="tier-card pop">
          <div class="name">Starter</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹29,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹14,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: #AEB7C4;">(Includes 250 Mins)</div>
          </div>
          <div class="tier-features">1 inbound voice agent, handles interruptions, Hindi & English, call logging</div>
        </div>
        <div class="tier-card">
          <div class="name">Growth</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹49,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹24,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 500 Mins)</div>
          </div>
          <div class="tier-features">+ Outbound calling, COD verification at scale, live human transfer</div>
        </div>
        <div class="tier-card">
          <div class="name">Pro</div>
          <div class="tier-price-box">
            <div class="fee-line">Setup Fee: <b>₹99,999</b> <span class="tag">(One-Time)</span></div>
            <div class="fee-line" style="margin-top: 4px;">Platform Fee: <b>₹34,999</b>/mo</div>
            <div class="fee-line" style="font-size: 11px; color: var(--muted);">(Includes 800 Mins)</div>
          </div>
          <div class="tier-features">+ Unlimited concurrency, voice cloning, custom integrations</div>
        </div>
      </div>
    </div>
  </div>
  <p class="pricing-note">
    30-day money-back guarantee on both. Overage on voice billed at ₹45/min. Meta conversation fees billed separately. GST extra. Enterprise 5,000+ chats/mo — contact shane@agentiq.co.in.
  </p>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>11</span>
  </div>
</div>`
    },
    {
      file: 'NextSteps.dc.html',
      html: `<div class="slide dark">
  <div class="eyebrow-row">
    <div class="dot"></div>
    <div class="eyebrow">Next Step</div>
  </div>
  <div class="hr-dark"></div>
  <h1 class="hero-title" style="font-size: 80px; margin-top: 40px;">Let's Put Mia on Your <span class="accent">Storefront.</span></h1>
  <p class="hero-subhead" style="margin-top: 20px;">Book your free 20-minute demo. We'll show a live mockup built for your catalog and return policy, no obligation — here's what happens after.</p>
  <div class="next-steps-grid">
    <div class="next-step-card">
      <div class="next-step-num">01</div>
      <div class="next-step-title">20-min demo</div>
      <div class="next-step-desc">Live mockup on your catalog, this week.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">02</div>
      <div class="next-step-title">Custom quote</div>
      <div class="next-step-desc">Priced against your order volume, not a generic tier.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">03</div>
      <div class="next-step-title">7-day build</div>
      <div class="next-step-desc">Trained on your catalog and policies, you approve before launch.</div>
    </div>
    <div class="next-step-card">
      <div class="next-step-num">04</div>
      <div class="next-step-title">Live, with support</div>
      <div class="next-step-desc">30-day money-back guarantee while you see real results.</div>
    </div>
  </div>
  <div class="contact-bar">
    <div class="contact-item">
      <div class="label">Call</div>
      <div class="val">+91 91596 65277</div>
    </div>
    <div class="contact-item">
      <div class="label">WhatsApp</div>
      <div class="val">wa.me/919159665277</div>
    </div>
    <div class="contact-item">
      <div class="label">Email</div>
      <div class="val">shane@agentiq.co.in</div>
    </div>
    <div class="contact-item">
      <div class="label">Based In</div>
      <div class="val">Mumbai, India · nationwide</div>
    </div>
  </div>
  <div class="footer">
    <span>AgentIQ | D2C Brands</span>
    <span>12</span>
  </div>
</div>`
    }
  ];

  d2cSlides.forEach(s => {
    fs.writeFileSync(path.join(d2cDir, s.file), generateDcHtml(s.file, '', s.html), 'utf8');
  });

  console.log('Individual .dc.html files updated successfully.');
}

async function main() {
  console.log('Writing pitch deck files...');

  const restHtml = generateRestaurantsDeck();
  const d2cHtml = generateD2CDeck();

  fs.writeFileSync(path.join(restaurantsDir, 'agentiq-restaurants-pitch-deck-v2.html'), restHtml, 'utf8');
  fs.writeFileSync(path.join(restaurantsDir, 'print-harness.html'), restHtml, 'utf8');
  fs.writeFileSync(path.join(baseDir, 'pitchdeck-v2/agentiq-restaurants-pitch-deck-v2.html'), restHtml, 'utf8');

  fs.writeFileSync(path.join(d2cDir, 'agentiq-d2c-pitch-deck-v2.html'), d2cHtml, 'utf8');
  fs.writeFileSync(path.join(d2cDir, 'print-harness.html'), d2cHtml, 'utf8');
  fs.writeFileSync(path.join(baseDir, 'pitchdeck-v2/agentiq-d2c-pitch-deck-v2.html'), d2cHtml, 'utf8');

  updateDcFiles();

  console.log('Pitch deck HTML files generated successfully.');

  console.log('Launching Playwright Chromium for PDF generation...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const decks = [
    {
      name: 'Restaurants',
      file: path.join(restaurantsDir, 'agentiq-restaurants-pitch-deck-v2.html'),
      pdfName: 'AgentIQ - Restaurants & Cafes v2.pdf',
      slideCount: 11
    },
    {
      name: 'D2C',
      file: path.join(d2cDir, 'agentiq-d2c-pitch-deck-v2.html'),
      pdfName: 'AgentIQ - D2C Brands v2.pdf',
      slideCount: 12
    }
  ];

  for (const deck of decks) {
    console.log(`Processing ${deck.name} deck...`);
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(`file://${deck.file}`, { waitUntil: 'networkidle' });

    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    const slides = await page.$$('.slide');
    console.log(`Found ${slides.length} slides for ${deck.name}`);
    for (let i = 0; i < slides.length; i++) {
      const slidePath = `/tmp/deck-inspection/${deck.name.toLowerCase()}-slide-${i + 1}.png`;
      await slides[i].screenshot({ path: slidePath });
    }

    const outputPath = path.join(downloadsDir, deck.pdfName);
    await page.pdf({
      path: outputPath,
      width: '1920px',
      height: '1080px',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    console.log(`Successfully generated PDF: ${outputPath}`);
    await page.close();
  }

  await browser.close();
  console.log('All pitch decks compiled and exported successfully!');
}

main().catch(err => {
  console.error('Error during build and export:', err);
  process.exit(1);
});
