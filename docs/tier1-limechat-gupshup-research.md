# Tier-1 Competitor Research Brief: AgentIQ vs LimeChat & AgentIQ vs Gupshup

**Purpose:** Grounded research input for two new competitor-comparison landing pages on agentiq.co.in.
**Prepared:** 2026-08-31. **For:** downstream landing-page writer agent.
**Method:** Public sources only — competitor websites, pricing/Shopify listings, well-known coverage, third-party company trackers. Every claim is tagged with its basis. Anything not verifiable is marked **"unverified — do not state as fact on the page."**

---

## Ground rules for the writer (read first)

1. **Match the existing pattern.** These pages must mirror `agentiq-vs-wati.html`, `agentiq-vs-aisensy.html`, `agentiq-vs-yellow-ai.html`:
   - Breadcrumb → H1 "AgentIQ vs [X]: [managed vs platform framing]?" → 1-paragraph intro → a "facts verified against [source], checked [date]" disclaimer line.
   - "Side by side" comparison table: 3 columns — blank / **AgentIQ** / **[Competitor]** — with `<th scope="row">` row labels. Existing pages use ~7 rows (Model, Setup, Starting price, Channels, Languages, Time to launch, Best for). Brief proposes 10–14; writer can trim.
   - Two short sections: **"When [Competitor] might be the better fit"** and **"When AgentIQ is the better fit."**
   - FAQ block: `<details>/<summary>` accordions, each answer opens with "Direct Answer:" (wati/aisensy style) — 5–6 Q&As.
   - Closing CTA ("Ready to automate without [platform complexity / the DIY build]?") + book-demo form.
2. **AgentIQ claims are restricted to what appears in `llms-full.txt` / `llms.txt` / existing comparison pages.** See "AgentIQ grounded claim list" below. Do NOT introduce "AWS Mumbai", "DPDP", or "source-code ownership at Pro" — none of those appear in `llms-full.txt` (see Gaps).
3. **620ms is a VOICE latency figure only** (Vapi + Claude Haiku 4.5 voice pipeline, internal benchmark Aug 2026). Never attach it to chatbot/text response time. Chat response time claim is "under 5 seconds."
4. **No fabricated competitor pricing, customer counts, funding, or features.** "Not publicly stated" / "contact sales" is the correct answer where that is the case, and both competitors are largely in that bucket.
5. Do not copy competitor marketing copy verbatim — paraphrase.

### AgentIQ grounded claim list (safe to use; all from `llms-full.txt` / `llms.txt`)

| Claim | Exact grounding |
|---|---|
| 100% managed, done-for-you; client never configures a dashboard or writes code | "clients need no technical knowledge"; "without writing a single line of code or logging into any dashboard" |
| Full lifecycle handled by AgentIQ team | "discovery call, assistant design, content training, QA testing, launch, and ongoing optimisation" |
| Go-live SLA | "Typical timeline: 7 business days from kickoff call to go-live" |
| 30-day money-back guarantee | "30-day money-back guarantee on all plans" |
| Languages | "English, Hindi, Hinglish (all plans). Regional languages available on request." Pro plan: "All 8+ languages" |
| Omnichannel from one backend | "A single trained assistant operates across all three channels from one backend" — WhatsApp Business API (official Meta Cloud API), Instagram DMs, website chat widget |
| Content-update turnaround | "Menu updates are handled by the AgentIQ team within 24 hours of the client requesting a change" (restaurant FAQ) |
| Transparent fixed INR pricing / entry point | "₹7,999/month (+ ₹24,999 one-time setup) transparent retainer (no hidden platform fees)" |
| Chatbot plan ladder | Starter ₹7,999/mo + ₹24,999 setup (≤1,000 convos/mo, 1 channel); Growth ₹14,999/mo + ₹39,999 setup (≤2,000/mo, adds website + WhatsApp Pay/checkout + Sheets sync + abandoned-cart); Pro ₹24,999/mo + ₹79,999 setup (≤5,000/mo, multi-location routing, live POS sync, CRM integration, webhooks); Enterprise custom |
| Voice product (separate line) | Hindi & English inbound/outbound AI voice agents; Starter ₹14,999/mo + ₹29,999 setup / 250 min; Growth ₹24,999/mo + ₹49,999 setup / 500 min; Pro ₹34,999/mo + ₹99,999 setup / 800 min; overage ₹45/min |
| Voice latency | "620ms median response latency for Hinglish & Hindi voice AI agents (internal benchmark, Vapi + Claude Haiku 4.5 voice pipeline, tested August 2026)" |
| Chat response time | "Average bot response time: under 5 seconds, 24 hours a day" |
| Integrations | "Google Sheets, CRMs, Razorpay, UPI payment links, Shopify, booking calendars"; `llms.txt` also lists "Zoho CRM, HubSpot, Petpooja POS, Practo" and "20+ native integrations" |
| Data ownership | "All conversation data belongs to the client"; "encrypted, India-compliant infrastructure"; "Clients can export or delete their data at any time" |
| Human handoff | "graceful human handoff" with "instant team notification via WhatsApp and email" |
| Verticals | restaurants & cloud kitchens, salons & spas, clinics & healthcare, D2C e-commerce |
| Scale claim | `llms.txt`: "Active deployments: 100+ Indian businesses" |
| LLM basis | "Built on state-of-the-art LLM architecture (ChatGPT / Claude class)" |
| Model positioning vs platforms | "AgentIQ clients pay for a working, maintained AI assistant — not access to a platform they must operate themselves." |

---
---

# SECTION 1 — LimeChat

**Suggested page disclaimer line:** *"LimeChat facts verified against limechat.ai, limechat.ai/pricing and the LimeChat Shopify app listing, checked August 2026. LimeChat's direct/enterprise pricing is not public and is quoted by their sales team."*

## 1. What they are

- **Product category:** Conversational-commerce / conversational-AI SaaS platform — WhatsApp-first chat + voice AI agents for e-commerce marketing, sales and support. Self-describes around "Level-3" (L3) conversational AI and, more recently, chat + voice AI agents. *(Basis: limechat.ai, limechat.ai/pricing.)*
- **Founded:** Circa 2020. Co-founders **Aniket Bajpai** and **Nikhil Gupta** (IIT Delhi); they wound down a prior venture (Konscience) in late 2019 and started LimeChat after. Some trackers list 2019. *(Basis: Forbes India, YourStory, eChai, Tracxn/Crunchbase-type profiles — third-party. Treat exact year as "2019–2020" on the page or omit.)*
- **HQ / India presence:** **Bengaluru, India.** India-headquartered and India-focused; customer roster is overwhelmingly Indian brands. *(Basis: multiple third-party company profiles; company site lists Indian brands.)*
- **Funding:** Third-party trackers report roughly **US $6M total** across seed rounds (≈$0.75M in 2021, ≈$4.2M in 2022; investors named include Stellaris Venture Partners and Pi Ventures). **Not company-confirmed on the site** — if used, attribute to "startup-funding trackers" or leave out. **unverified as an official figure — do not state as fact on the page.**
- **Scale claims (company marketing):** "300+ brands" / "200+ D2C brands"; names cited include Mahindra, HUL/Unilever brands, Mamaearth, Kapiva, Wow Skin Science, Bewakoof, Snitch, The Indus Valley, Aza Fashions, Piramal, ICICI Prudential, Axis Max Life, Eureka Forbes, Taj. **Present as "LimeChat says…"** — customer counts and logos are their claims, not independently audited.

## 2. Target customer

- **Mid-market to enterprise D2C / e-commerce**, plus a self-serve small-business path via the Shopify app.
  - **Direct/enterprise:** larger D2C brands and enterprises; onboarding is "enterprise-grade," with CSM, QBRs and SLAs — a procurement-style motion. *(Basis: limechat.ai/pricing.)*
  - **Shopify app tier:** smaller Shopify stores buying self-serve from $199/mo. *(Basis: Shopify App Store listing.)*
- **Vertical focus:** **D2C / e-commerce is the core and origin vertical — confirmed.** Beauty & personal care, health & wellness, fashion & apparel, F&B. The site now also markets into BFSI, insurance, healthcare, automotive and real estate, but e-commerce is the clear centre of gravity. *(Basis: limechat.ai.)*
- **Contrast for the page:** LimeChat is built for a brand with an in-house growth/CX team that will own and run the tool day to day. AgentIQ's ICP is an owner-operator SMB (restaurant, salon, clinic, small D2C) with no such team.

## 3. Delivery model  ← core AgentIQ contrast axis

- **Self-serve SaaS platform + managed onboarding — NOT a done-for-you agency.**
  - LimeChat explicitly frames the tool as **"Owned by your business team, no engineering queue"** — i.e., the customer's marketing/CX team builds journeys, runs campaigns and operates the inbox. *(Basis: limechat.ai.)*
  - Enterprise customers get a **dedicated onboarding specialist, a Customer Success Manager, Quarterly Business Reviews, and 24/7 priority support with SLAs.** That is high-touch onboarding and account management — it is not "we run the bot for you." *(Basis: limechat.ai/pricing.)*
  - Shopify-app tiers include a "dedicated onboarding manager" (Growth) up to a "dedicated growth consultant" (Advanced). *(Basis: Shopify listing.)*
- **Time to value:** LimeChat markets **"live in 2 weeks"** for chat + voice agents, and the pricing page cites a typical **1–3 week** implementation. *(Basis: limechat.ai, limechat.ai/pricing.)*
- **Bottom line for the table:** LimeChat = platform your team operates, with strong onboarding support. AgentIQ = AgentIQ's team designs, trains, deploys and maintains; client never logs into a builder.

## 4. Pricing

**Two distinct routes, and the important one for enterprise buyers is not public.**

**A. Direct / enterprise (the main motion):**
- **Not publicly listed.** Quoted by sales. Pricing is a function of: which **suite** (WhatsApp Marketing & AI Growth Suite vs AI Support Suite), **conversation volume**, and **AI automation tier** (referred to as Tier 2 / 3 / 4). Add-ons priced separately: Omnichannel CRM, Instagram Suite, AI Conversation Audit, Email/SMS Marketing. *(Basis: limechat.ai/pricing.)*
- **Setup fee:** not disclosed. **unverified — do not state a setup-fee number on the page.**
- **Conversation caps per tier:** not disclosed. **unverified.**

**B. Self-serve "LimeChat: WhatsApp Support+AI" Shopify app (USD, billed every 30 days, 14-day free trial):**
| Plan | Price | Agent logins | Notable inclusions | Extra-ticket cost |
|---|---|---|---|---|
| Growth | **$199/mo** | 3 | Verified/official WhatsApp, broadcasts + journey automation, support inbox, dedicated onboarding manager | $0.02/ticket |
| Pro | **$399/mo** | 5 | + segmentation & cross-sell journeys, **click-based** support & commerce chatbot, multi-channel helpdesk (WhatsApp, Email, Instagram, Facebook) | $0.03/ticket |
| Advanced | **$699/mo** | 8 | + two-way WhatsApp journeys/broadcasts, **Gen-AI** support & commerce chatbot, custom workflows & integrations, dedicated growth consultant | $0.05/ticket |
*(Basis: Shopify App Store listing, checked Aug 2026. Note: the generative-AI chatbot sits only on the top $699 tier; lower tiers are click/rule-based.)*

**C. Meta/WhatsApp conversation charges** are billed separately by Meta on top, as with every WhatsApp BSP. *(Standard industry fact; LimeChat's own page does not itemise this — state generically.)*

**Pricing framing for the page:** LimeChat's real (enterprise) price is "contact sales / custom," volume- and tier-based; its published self-serve price starts at **US $199/month** (USD-billed, before Meta fees). AgentIQ counters with fixed INR pricing from **₹7,999/mo + ₹24,999 one-time setup**, GST extra, Meta fees extra, all delivery included.

## 5. Core features

- **Channels:** WhatsApp (core, official/verified sender), Instagram, Facebook Messenger, Email, Live Chat / website chat, and **Calling / Voice AI agents** (chat + voice agents is a current headline). *(Basis: limechat.ai, Shopify listing.)*
- **AI:** "Hybrid LLM + Brand SOP" approach; historically "L3 conversational AI"; Shopify listing describes **GPT-based chatbots automating up to ~80% of conversations.** Automation tiers Tier 2/3/4. On the self-serve app, only the **Advanced** tier gets the Gen-AI bot; Growth/Pro use a **click/rule-based** bot builder + journey builder. *(Basis: limechat.ai/pricing, Shopify listing.)*
- **Commerce features:** in-chat / in-chat checkout, abandoned-checkout recovery, reorder and COD-verification journeys, product catalog, cross-sell/segmentation journeys, click-to-WhatsApp ads. *(Basis: limechat.ai/pricing.)*
- **Support features:** omnichannel helpdesk/inbox, live-agent handoff, image recognition, order-tracking / returns / refund / complaint journeys, CSAT + conversational analytics, revenue-attribution analytics, AI Copilot for agents. *(Basis: limechat.ai/pricing.)*
- **Integrations:** Shopify, WooCommerce, Razorpay, Shiprocket, Meta WhatsApp; plus CDPs, CRMs, logistics and returns partners (categories, not an exhaustive named list). *(Basis: search results + limechat.ai/pricing.)*
- **Languages:** pricing page cites **"20+ languages"**; the Shopify app listing lists its own UI language as **English only.** **Hindi / Hinglish conversational capability is not explicitly documented — unverified; do not claim LimeChat lacks Hindi, and do not claim it has Hinglish — state "not explicitly documented."**
- **Security/compliance:** **SOC 2** compliant, "enterprise-grade security." *(Basis: limechat.ai/pricing.)*

## 6. Where a buyer would legitimately prefer LimeChat over AgentIQ

Be honest — put these in the "When LimeChat might be the better fit" section:
- **You are a scaling D2C brand with an in-house growth/CX team** that wants to own campaign strategy, build its own journeys, and iterate daily on a platform.
- **You need deep e-commerce commerce tooling** — in-chat checkout, sophisticated cross-sell/segmentation journeys, revenue-attribution dashboards, click-to-WhatsApp ad flows — as a productised platform.
- **You want a self-serve entry via Shopify** you can switch on yourself with a free trial ($199/mo).
- **You run a large or regulated enterprise** (BFSI/insurance) that needs SOC 2, formal SLAs, QBRs and a named CSM, and has procurement for a custom contract.
- **You need many named agent seats** and a mature multi-channel helpdesk (WhatsApp + Email + Instagram + FB + live chat) in one console.
- **You want to keep marketing (broadcast/campaign) and support on one platform** rather than a bot-only engagement.

## 7. Where AgentIQ differentiates (map to grounded claims only)

- **Fully done-for-you vs "owned by your team."** AgentIQ designs, trains, deploys and optimises; the client never logs into a builder. LimeChat, even with strong onboarding, is a platform the client's team operates.
- **7-business-day managed go-live** vs LimeChat's ~2-week (1–3 week) implementation the client participates in.
- **Fixed, transparent INR pricing** from ₹7,999/mo + ₹24,999 setup, "no hidden platform fees," GST extra — vs LimeChat's custom/quote enterprise pricing and USD-billed self-serve tiers.
- **English + Hindi + Hinglish on every plan** (Pro: 8+ languages), regional on request — vs LimeChat's Hindi/Hinglish conversational support being undocumented.
- **24-hour content-update turnaround by the AgentIQ team** (e.g., menu changes) — vs a platform where the client edits their own content.
- **One trained assistant across WhatsApp + Instagram DM + website chat from one backend**, included in the plan ladder (website chat from Growth) — vs LimeChat gating channels/AI by tier and priced add-ons (Instagram Suite).
- **Vertical-purpose training for restaurants, salons, clinics, D2C** — LimeChat's depth is e-commerce; restaurants/salons/clinics are not its core.
- **30-day money-back guarantee** on all plans — LimeChat offers a 14-day free trial on the self-serve app only; no comparable money-back guarantee is published for enterprise.
- **Real integrations incl. payments** — Razorpay, UPI payment links, Shopify, Google Sheets, booking calendars, Zoho/HubSpot (Growth/Pro), Petpooja POS, Practo.
- **Separate AI voice-agent product** — Hindi & English inbound/outbound calling, appointment booking, 620ms median voice latency (voice metric only). LimeChat also markets voice agents, but AgentIQ's is a managed, India-phone-call-focused offering.
- **Client owns all conversation data; export/delete anytime; encrypted, India-compliant infrastructure.**

## 8. Proposed comparison-table rows (AgentIQ | LimeChat)

Use ~10–12 of these; keep the existing 3-column format.

| Dimension | AgentIQ | LimeChat |
|---|---|---|
| Model | Done-for-you managed AI chatbot + voice agency for Indian SMBs | Conversational-commerce SaaS platform (self-serve + enterprise), e-commerce-first |
| Who operates it | AgentIQ's team builds, trains, deploys and maintains it | Your growth/CX team, "owned by your business team, no engineering queue" |
| Setup / onboarding | Fully managed: discovery, design, content training, QA, launch, ongoing optimisation | Dedicated onboarding specialist + CSM + QBRs (enterprise); onboarding manager (self-serve app) |
| Starting price | ₹7,999/mo + ₹24,999 one-time setup (fixed, INR, GST extra) | Enterprise: custom / contact sales (suite + volume + AI tier). Self-serve Shopify app: from US $199/mo, 14-day trial |
| Pricing transparency | Full plan ladder published in INR | Enterprise pricing not public; self-serve tiers published in USD |
| Time to launch | ~7 business days, fully managed | ~2 weeks marketed; 1–3 week implementation with your team |
| Core AI | State-of-the-art LLM (ChatGPT/Claude class), trained on your content, managed prompt optimisation | Hybrid LLM + Brand SOP; Gen-AI bot on top self-serve tier only, click/rule-based below |
| Channels | WhatsApp + Instagram DM + website chat from one backend; voice agents as separate product | WhatsApp, Instagram, Facebook, Email, Live Chat, Calling/voice agents; Instagram Suite is a paid add-on |
| Languages | English, Hindi, Hinglish on all plans (8+ on Pro); regional on request | "20+ languages" cited; Hindi/Hinglish conversational support not explicitly documented |
| Content updates | AgentIQ team applies changes within 24 hours of request | You edit your own content/journeys in the platform |
| E-commerce depth | Shopify order tracking, returns, COD confirmation, abandoned-cart, UPI/Razorpay payment links | Deep: in-chat checkout, cross-sell/segmentation journeys, revenue-attribution analytics, click-to-WA ads |
| Guarantee | 30-day money-back guarantee on all plans | 14-day free trial (self-serve app); no published enterprise money-back guarantee |
| Compliance / data | Encrypted, India-compliant infrastructure; client owns all data, export/delete anytime | SOC 2 compliant, enterprise-grade security |
| Best for | Owner-run Indian SMBs (restaurants, salons, clinics, small D2C) wanting a working assistant with no learning curve | Scaling/enterprise D2C brands with an in-house team that wants to own a commerce + support platform |

## 9. FAQ Q&As (5–6) — draft answers, "Direct Answer:" style

1. **What is the difference between LimeChat and AgentIQ?**
   Direct Answer: LimeChat is a conversational-commerce software platform, built e-commerce-first, that your growth or CX team operates day to day (LimeChat describes it as "owned by your business team"). AgentIQ is a 100% managed AI chatbot and voice-agent agency in Mumbai that designs, trains, deploys and updates your assistant for you across WhatsApp, Instagram and website chat, with a 7-business-day go-live. With AgentIQ you never log into a builder.

2. **Is AgentIQ a good LimeChat alternative?**
   Direct Answer: For an owner-run Indian SMB — a restaurant, salon, clinic or small D2C brand without a dedicated marketing/CX team — yes. LimeChat is optimised for scaling and enterprise D2C brands that want to run a platform themselves, with custom enterprise pricing. AgentIQ delivers a done-for-you assistant on fixed INR pricing from ₹7,999/month plus ₹24,999 setup, with content updates handled by the AgentIQ team within 24 hours and a 30-day money-back guarantee.

3. **LimeChat vs AgentIQ pricing — how do they compare?**
   Direct Answer: LimeChat's main (enterprise) pricing is not published; it is quoted by their sales team based on the suite you pick, your conversation volume and your AI automation tier, with add-ons priced separately. LimeChat's self-serve Shopify app starts at US $199/month (billed in USD, 14-day free trial). AgentIQ publishes its full plan ladder in rupees: Starter ₹7,999/month + ₹24,999 setup, Growth ₹14,999 + ₹39,999, Pro ₹24,999 + ₹79,999 — GST and Meta's WhatsApp fees extra, everything else (design, training, launch, optimisation) included.

4. **Does LimeChat support Hindi and Hinglish?**
   Direct Answer: LimeChat's pricing page cites support for 20+ languages, but its Hindi and Hinglish conversational capability is not explicitly documented publicly. AgentIQ includes English, Hindi and Hinglish on every plan (and 8+ languages on Pro), with regional languages on request, and its voice agents are benchmarked specifically on Hindi and Hinglish calls.

5. **Do I have to build and run the bot myself with LimeChat?**
   Direct Answer: Largely yes — LimeChat provides onboarding support, a Customer Success Manager and QBRs on enterprise plans, but the platform is designed for your team to build journeys, run campaigns and manage the inbox. AgentIQ is the opposite model: the AgentIQ team builds the assistant, trains it on your menu or services, deploys it, and keeps optimising it.

6. **Which is better for a D2C brand on Shopify?**
   Direct Answer: If you have an in-house growth team and want deep commerce tooling — in-chat checkout, segmentation journeys, revenue-attribution analytics — LimeChat is purpose-built for that. If you are a small D2C brand that wants order tracking, returns, COD confirmation, abandoned-cart recovery and UPI/Razorpay payment links running on WhatsApp without hiring anyone to manage it, AgentIQ integrates with Shopify and runs it for you from ₹7,999/month.

## 10. Target keywords for the LimeChat page

- Primary: `agentiq vs limechat`, `limechat alternative`
- Secondary: `limechat vs agentiq pricing`, `limechat alternative for restaurants` (or "for SMBs"), `managed alternative to limechat`, `limechat competitor India`, `done-for-you whatsapp chatbot vs limechat`

---
---

# SECTION 2 — Gupshup

**Suggested page disclaimer line:** *"Gupshup facts verified against gupshup.ai / gupshup.io, checked August 2026. Gupshup does not publish a standard pricing page; plan pricing is quoted by their sales team, and per-message platform fees vary by volume and contract. Third-party pricing figures are cited as such."*

## 1. What they are

- **Product category:** Conversational-messaging / conversational-AI platform with **CPaaS heritage** (started in bulk SMS, now omnichannel business messaging). Markets a **"Conversation Cloud"** plus AI agents. Also a **Meta-approved WhatsApp Business Solution Provider (BSP)**. *(Basis: gupshup.ai, gupshup.io, Wikipedia, industry coverage.)*
- **Founded:** **2004.** Co-founders **Beerud Sheth** (CEO), **Rakesh Mathur**, **Milind Agarwal**. *(Basis: Wikipedia, StartupTalky, IIT Bombay profile.)*
- **HQ / India presence:** Registered/again-headquartered in **San Francisco, California**, with very large operations in **India** (Bengaluru / Mumbai) and across APAC, LATAM, Africa, Middle East, Europe. **India is a core market** — one of the largest WhatsApp BSPs in India, historically strong in SMS/telecom carrier relationships. On the page, describe as "US-registered, India-heavy operations," not "an Indian company." *(Basis: Wikipedia, CBInsights, company site.)*
- **Employees:** ~**769** per a third-party tracker (Tracxn, Aug 2025). **unverified as an official number — attribute to trackers or omit.**
- **Acquisitions (well-known):** Gupshup has been acquisitive — publicly reported deals include **Knowlarity** (voice / cloud telephony), **Active.Ai** (banking conversational AI), **OneDirect** (CX), **Dotgo** (RCS), and **AskSid**; a 2024 acquisition of **Verloop.io** (support automation) has also been reported. Present only as "reported acquisitions include…"; **do not assert deal values or dates — unverified.**
- **Scale claims (company marketing):** "50,000+ customers," "130+ countries," "120 billion+ messages a year." Customers cited: Netflix, HSBC, Tata, Flipkart, Disney, plus Indian banks/telcos. **Present as "Gupshup says…"** — not independently audited.
- **Unicorn / funding:** widely reported as a unicorn after a 2021 raise (Tiger Global and others). If mentioned, attribute to press coverage; **do not cite specific amounts as fact — unverified for page purposes.**

## 2. Target customer

- **Mid-market to large enterprise, and high message volume.** Third-party audits are blunt that Gupshup's economics "make sense at 100,000+ messages/month" and that below that a small business "overpays." Strength areas: **BFSI, telecom, large retail/e-commerce, media & entertainment, government.** *(Basis: gupshup.io industry pages; third-party pricing audits — codingclave, zoko, setsmart.)*
- **Developer / IT-oriented buyer** on the self-serve side (API keys, low-code Conversation Builder), and a **procurement/enterprise buyer** on the committed-volume side.
- **Contrast for the page:** Gupshup is infrastructure + tooling for organisations with volume and technical resources. AgentIQ's ICP is a single-location or small-chain SMB with no developer and modest volume (plans cap at 1,000–5,000 conversations/month).

## 3. Delivery model  ← core AgentIQ contrast axis

- **Self-serve platform + BSP + enterprise managed/professional services — NOT an agency.**
  - **Self-serve:** sign up, get WhatsApp API access, build bots yourself in Gupshup's **low-code Conversation Builder / AI Chatbot Studio** (drag-and-drop flows, test, deploy). Even the free tier allows building unlimited chatbot flows. *(Basis: gupshup.io self-serve WhatsApp page, conversation-builder page.)*
  - **Enterprise:** custom onboarding, solution engineering, professional services, volume-committed contracts. Still fundamentally "Gupshup gives you the platform and support; you or an implementation partner build and run the solution."
  - Gupshup does **not** position as "we design, train and operate your bot for you as a service." That done-for-you managed model is AgentIQ's category.
- **Time to value:** not a published SLA. Self-serve can be same-day for a simple flow; enterprise deployments are project-timeline (weeks to months). **Any specific timeline is unverified — do not state one for Gupshup.**

## 4. Pricing

**No standard public pricing page (the /pricing URL returns 404 as of Aug 2026). Everything below is either "contact sales" or third-party-reported.**

- **Structure:** every message costs **(a) Meta's per-message rate** — varies by conversation/message category (marketing, utility, authentication, service) and destination country, now billed per-message post Meta's 2025 model change — **plus (b) Gupshup's platform/BSP fee** on top of each message. *(Basis: gupshup.ai WhatsApp pricing blog; third-party audits.)*
- **Self-serve tier:** third-party audits (2026) report **no monthly subscription** on Gupshup's self-serve tier, with a **platform markup around $0.001 (≈₹0.085) per message** added to Meta's rate. **Attribute to third-party audits (codingclave, zoko) — not confirmed on a Gupshup pricing page. unverified as an official figure.**
- **Enterprise tier:** **custom-quoted, with minimum/volume commitments.** Not public. *(Basis: third-party audits; consistent with enterprise CPaaS norms.)*
- **Illustrative total (third-party):** an Indian D2C brand sending ~10,000 marketing + 5,000 utility messages/month is estimated at **≈₹10,500–₹13,000/month** all-in. **Label clearly as a third-party estimate, not a Gupshup quote.**
- **Setup fee:** not publicly stated. **unverified.**
- **Free tier:** Gupshup markets a free tier for building/testing bots and low-volume use; exact limits not clearly published. **State generically; do not quote a specific free-message allowance.**

**Pricing framing for the page:** Gupshup is **usage-priced per message** (Meta rate + Gupshup fee), tuned for high volume, with enterprise plans quoted privately. There is no "all-in" published number and no bundled build/training. AgentIQ is a **fixed monthly retainer** (₹7,999–₹24,999/mo + one-time setup) that includes design, training, deployment and optimisation; Meta's WhatsApp conversation fees are still passed through separately, exactly as with Gupshup.

## 5. Core features

- **Channels:** WhatsApp (BSP), Instagram, **SMS**, **RCS** (Gupshup is a major RCS player and Google partner), web chat, and **voice / cloud telephony** (via the Knowlarity acquisition). Historically also Google Business Messages and other channels — Gupshup markets "30+ channels." *(Basis: gupshup.io channel pages.)*
- **AI:** **ACE LLM** — Gupshup's proprietary fine-tuned model for conversational responses; **AI Agents** (industry-trained, autonomous); **AI Co-Pilot / Agent Assist** (suggested replies, summarisation); real-time intent detection. Plus a **low-code Conversation Builder** for rule/flow bots. *(Basis: gupshup.ai homepage, conversation-builder page.)*
- **Tooling:** campaign/broadcast manager, bot/template library, shared agent inbox with built-in translation, analytics dashboards, developer APIs/SDKs. *(Basis: gupshup.io.)*
- **Languages:** markets **"100+ languages"** across voice, text, voice notes and images via AI Agents; strong **Indian vernacular** capability (vernacular AI journeys, voice). Hindi is clearly supported; **explicit "Hinglish" (code-mixed) handling is not specifically documented — treat Hinglish as "not specifically documented" rather than asserting parity.**
- **Compliance / security:** enterprise/"bank-grade" security posture, audit-grade message logs, regulated-vertical experience (BFSI, government). *(Basis: gupshup.io industry pages; third-party commentary.)*
- **Integrations:** CRM, e-commerce, custom APIs; developer-centric integration model rather than a fixed catalogue of one-click SMB connectors.

## 6. Where a buyer would legitimately prefer Gupshup over AgentIQ

Put these in "When Gupshup might be the better fit":
- **You send very high message volume** (tens of thousands to millions/month) and want per-message economics with volume discounts.
- **You need channels beyond WhatsApp/Instagram/web** — especially **SMS and RCS** at scale, or cloud telephony / IVR — from one vendor.
- **You are an enterprise in a regulated vertical** (banking, insurance, telecom, government) needing bank-grade security, audit-grade logs, carrier relationships and a global footprint.
- **You have developers or an implementation partner** and want direct API access plus a low-code builder to build exactly what you want.
- **You operate in many countries / many languages** and need one platform spanning 130+ countries and 100+ languages.
- **You want to own the build** and treat messaging as infrastructure rather than a managed service.

## 7. Where AgentIQ differentiates (map to grounded claims only)

- **Done-for-you vs build-it-yourself.** AgentIQ designs, trains, deploys and optimises the assistant; Gupshup gives you a platform (and, at enterprise, services) to build on. Client never touches a builder.
- **Fixed, all-inclusive INR retainer** (₹7,999–₹24,999/mo + one-time setup, GST extra) with design/training/launch/optimisation included — vs Gupshup's per-message usage pricing plus platform fee, and privately quoted enterprise plans with volume commitments. (Meta's WhatsApp fees are pass-through in both cases.)
- **Right-sized for SMBs.** AgentIQ plans are scoped for 1,000–5,000 conversations/month; third-party audits say Gupshup only makes economic sense above ~100,000 messages/month.
- **7-business-day managed go-live** vs an open-ended, resource-dependent build on Gupshup.
- **English + Hindi + Hinglish on every plan**, regional on request; voice agents benchmarked on Hindi/Hinglish. Gupshup supports Hindi and many languages, but explicit Hinglish handling isn't documented.
- **24-hour content-update turnaround by AgentIQ's team** — vs editing your own flows/templates in Gupshup.
- **One trained assistant across WhatsApp + Instagram DM + website chat from one backend**, plus vertical-specific training for restaurants, salons, clinics and D2C — Gupshup is horizontal infrastructure, not vertical-tuned for Indian SMB use cases.
- **SMB-friendly integrations incl. payments** — Razorpay, UPI payment links, Shopify, Google Sheets, booking calendars, Zoho/HubSpot, Petpooja POS, Practo — as managed, pre-wired connectors rather than developer integrations.
- **30-day money-back guarantee** on all plans — no comparable guarantee from Gupshup.
- **Single point of accountability** — one team owns design, deployment and support — vs a platform relationship where the build is your responsibility.
- **Managed AI voice-agent product** for Indian phone calls (Hindi/English, inbound + outbound, appointment booking, 620ms median voice latency — voice metric only).
- **Client owns all conversation data; export/delete anytime; encrypted, India-compliant infrastructure.**

## 8. Proposed comparison-table rows (AgentIQ | Gupshup)

Use ~10–12; keep the 3-column format.

| Dimension | AgentIQ | Gupshup |
|---|---|---|
| Model | Done-for-you managed AI chatbot + voice agency for Indian SMBs | Conversational-messaging platform + WhatsApp BSP with CPaaS heritage; self-serve + enterprise |
| Who builds & runs it | AgentIQ's team — client does nothing technical | You (self-serve, low-code builder + APIs) or an implementation partner |
| Setup / onboarding | Fully managed: discovery, design, content training, QA, launch, ongoing optimisation | Self-serve signup, or enterprise solution engineering / professional services |
| Starting price | ₹7,999/mo + ₹24,999 one-time setup, fixed INR, GST extra | No published plan pricing; per-message (Meta rate + Gupshup platform fee); enterprise custom-quoted with volume commitments |
| Pricing transparency | Full plan ladder published in INR | No public pricing page; quoted by sales |
| Best-fit volume | 1,000–5,000 conversations/month per plan tier | High volume — third-party audits say it fits best above ~100,000 messages/month |
| Time to launch | ~7 business days, fully managed | Not a published SLA; self-serve can be quick, enterprise is a project timeline |
| Core AI | State-of-the-art LLM (ChatGPT/Claude class), trained on your content, managed prompt optimisation | ACE LLM (proprietary), industry-trained AI Agents, AI Co-Pilot, low-code Conversation Builder |
| Channels | WhatsApp + Instagram DM + website chat from one backend; voice agents as separate product | WhatsApp, Instagram, SMS, RCS, web chat, voice/cloud telephony — "30+ channels" |
| Languages | English, Hindi, Hinglish on all plans (8+ on Pro); regional on request | 100+ languages, strong Indian vernacular; explicit Hinglish handling not documented |
| Content updates | AgentIQ team applies changes within 24 hours of request | You edit your own flows and message templates |
| Integrations | Pre-wired SMB connectors incl. Razorpay/UPI, Shopify, Sheets, Zoho/HubSpot, Petpooja, Practo | Developer integrations via APIs/SDKs; CRM and commerce connectors |
| Guarantee | 30-day money-back guarantee on all plans | None published |
| Best for | Owner-run Indian SMBs wanting a working assistant with no build and no learning curve | Enterprises / high-volume senders needing multi-channel messaging infrastructure (incl. SMS + RCS) and API control |

## 9. FAQ Q&As (5–6) — draft answers, "Direct Answer:" style

1. **What is the difference between Gupshup and AgentIQ?**
   Direct Answer: Gupshup is a conversational-messaging platform and WhatsApp Business Solution Provider, built for volume, that you (or an implementation partner) build on using its low-code builder and APIs. AgentIQ is a 100% managed AI chatbot and voice-agent agency in Mumbai that designs, trains, deploys and maintains your assistant across WhatsApp, Instagram and website chat, live in about 7 business days, with no dashboard for you to operate.

2. **Is AgentIQ a good Gupshup alternative?**
   Direct Answer: For a small or mid-size Indian business without a developer or a high message volume, yes. Gupshup's per-message pricing and enterprise contracts are geared to organisations sending well over 100,000 messages a month. AgentIQ gives an owner-run restaurant, salon, clinic or D2C brand a done-for-you assistant on a fixed retainer from ₹7,999/month plus ₹24,999 setup, with content updates handled within 24 hours and a 30-day money-back guarantee.

3. **Gupshup vs AgentIQ pricing — how do they compare?**
   Direct Answer: Gupshup does not publish standard plan pricing; you pay Meta's per-message rate plus a Gupshup platform fee on every message, and enterprise plans are quoted privately with minimum volume commitments. AgentIQ publishes fixed rupee plans — Starter ₹7,999/month + ₹24,999 setup, Growth ₹14,999 + ₹39,999, Pro ₹24,999 + ₹79,999 — that include design, training, launch and ongoing optimisation. In both cases Meta's WhatsApp conversation fees are billed separately.

4. **Do I need a developer to use Gupshup?**
   Direct Answer: For anything beyond a basic flow, effectively yes — Gupshup is API-first with a low-code builder your team uses to design, test and maintain bots. AgentIQ requires no technical resource at all: the AgentIQ team builds and runs everything, and the client provides only their menu, services, FAQs and policies.

5. **Does Gupshup handle Hindi and Hinglish for Indian businesses?**
   Direct Answer: Gupshup supports Hindi and many Indian languages, including vernacular voice journeys, so language coverage is broad. Explicit code-mixed "Hinglish" handling is not specifically documented. AgentIQ includes English, Hindi and Hinglish on every plan and benchmarks its voice agents specifically on Hindi and Hinglish calls (620 ms median voice latency).

6. **Is Gupshup better for a large enterprise than AgentIQ?**
   Direct Answer: Often, yes. If you send very high volumes, need SMS and RCS alongside WhatsApp, operate across many countries, or work in a regulated vertical needing bank-grade security and audit logs, Gupshup's infrastructure is built for that. AgentIQ is built for Indian SMBs that want a single managed assistant handling bookings, FAQs and lead capture without running a messaging platform themselves.

## 10. Target keywords for the Gupshup page

- Primary: `agentiq vs gupshup`, `gupshup alternative`
- Secondary: `gupshup vs agentiq pricing`, `gupshup alternative for small business` (or "for SMBs"), `managed alternative to gupshup`, `gupshup competitor India`, `done-for-you whatsapp chatbot vs gupshup`

---
---

# Confidence & gaps

## High confidence (safe to state on the pages, with the given attributions)

- **LimeChat:** Bengaluru-based, India-focused; e-commerce/D2C-first conversational-commerce platform; operated by the customer's team ("owned by your business team"); enterprise pricing is custom/contact-sales driven by suite + volume + AI tier; self-serve Shopify app tiers **$199 / $399 / $699 per month** (USD, 14-day trial, Gen-AI bot only on the $699 tier); channels WhatsApp/Instagram/FB/Email/Live Chat/Calling; SOC 2 compliant; ~2-week (1–3 week) implementation; co-founders Aniket Bajpai & Nikhil Gupta.
- **Gupshup:** founded 2004; US-registered (San Francisco) with major India operations; conversational-messaging platform + WhatsApp BSP with SMS/RCS/voice heritage; **no public standard pricing page** (/pricing 404); usage/per-message pricing = Meta rate + Gupshup platform fee; enterprise = custom, volume-committed; ACE LLM + AI Agents + low-code Conversation Builder; "30+ channels," "100+ languages"; CEO Beerud Sheth.
- **AgentIQ side:** everything in the "AgentIQ grounded claim list" table above.

## Could not verify / flagged "do not state as fact"

1. **LimeChat exact founding year** — sources split between 2019 and 2020. Use "founded around 2020" or omit the year.
2. **LimeChat funding total (~$6M)** — only on third-party trackers, not company-confirmed. Attribute or omit.
3. **LimeChat customer count ("300+ brands") and logo list** — company marketing claims; not audited. Frame as "LimeChat says."
4. **LimeChat setup fees and per-tier conversation caps (enterprise)** — not disclosed anywhere. Do not invent numbers.
5. **LimeChat Hindi / Hinglish conversational capability** — not explicitly documented ("20+ languages" on pricing page; Shopify listing language = English). Do not claim LimeChat has Hinglish; do not claim it lacks Hindi. State "not explicitly documented."
6. **LimeChat USD→INR conversion** — do not convert $199 to a specific rupee figure on the page unless you add "approx. at current rates"; better to leave it in USD as billed.
7. **Gupshup self-serve "no monthly fee" + "~$0.001/message platform fee"** — from third-party pricing audits (codingclave, zoko), NOT a Gupshup pricing page. Always attribute to "third-party pricing analyses."
8. **Gupshup "₹10,500–₹13,000/month" illustrative total** — third-party estimate for a hypothetical volume; label as such, never as a Gupshup quote.
9. **Gupshup employee count (~769), unicorn status, funding amounts, acquisition values/dates** — third-party / press. Mention only with attribution; do not cite figures as fact.
10. **Gupshup free-tier limits** and **any deployment-time SLA** — not clearly published. Keep generic; do not quote allowances or timelines.
11. **Gupshup Hinglish (code-mixed) handling** — Hindi and vernacular are supported; explicit Hinglish parity is not documented. State "not specifically documented."
12. **"Meta WhatsApp fees billed separately" for LimeChat/Gupshup** — universally true for BSPs and stated by AgentIQ for itself; competitor pages don't always itemise it. Safe to state generically ("as with any WhatsApp Business API provider").

## AgentIQ claims explicitly NOT supported by `llms-full.txt` — DO NOT put these on the pages

- **"AWS Mumbai" hosting** — `llms-full.txt` only says "encrypted, India-compliant infrastructure." No AWS/region claim. Use the generic phrasing only.
- **"DPDP" / DPDP Act compliance by name** — not mentioned in `llms-full.txt`. Use "India-compliant" only.
- **"Source-code ownership at Pro"** — not in `llms-full.txt` or `llms.txt`. Only **conversation-data** ownership is stated ("All conversation data belongs to the client"). Do not claim code/IP handover.
- Any **customer-count or percentage outcome** beyond `llms.txt`'s "100+ Indian businesses" and the qualitative metrics ("most inbound queries resolved automatically," "more leads captured vs manual," "reclaiming 2–3 hours/day," "significant drop in no-shows"). No invented percentages.
- The **620ms figure on anything other than voice latency.**

## Source list

- LimeChat: https://www.limechat.ai/ , https://www.limechat.ai/pricing , https://www.limechat.ai/about , https://apps.shopify.com/limechat-shop ; third-party — Forbes India, YourStory, eChai Ventures, Tracxn, Crunchbase profile pages, Capterra India.
- Gupshup: https://www.gupshup.ai/ , https://www.gupshup.ai/whatsapp-api , https://www.gupshup.io/channels/self-serve/whatsapp , https://www.gupshup.io/en/converse/ai-chatbot-studio , https://www.gupshup.ai/conversation-builder , https://en.wikipedia.org/wiki/Gupshup ; third-party — codingclave.com, zoko.io, setsmart.io, startuptalky.com, CBInsights, Tracxn, Outlook Startup.
- AgentIQ: `llms-full.txt`, `llms.txt`, `agentiq-vs-wati.html`, `agentiq-vs-yellow-ai.html`, `agentiq-vs-aisensy.html` (all in repo root).
