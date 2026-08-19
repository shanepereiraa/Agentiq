# Selling AI Chatbots & Voice Agents

**Status:** New — business/sales project
**Owner:** Shane Pereira
**Path:** `~/Projects/selling-ai-chatbots-voice-agents/`

---

## What this is

The sales/outreach side of selling AgentIQ's done-for-you AI chatbot and voice agent product to new clients. The product itself (code, pricing logic, deployed site) lives in `~/Projects/agentiq/` — this project is for pitch material, outreach, proposals, and deal tracking, kept separate from the product codebase.

Product source of truth: `~/Projects/agentiq/index.html` (pricing, ICP copy, JSON-LD offers).

---

## The Product (as sold today)

Done-for-you AI chatbots and voice agents for Indian SMBs — restaurants, salons, clinics, and D2C brands. Channels: WhatsApp, Instagram, website. Live in 7 days.

### Chatbot plans

| Tier | Setup | Monthly | Includes |
|------|-------|---------|----------|
| Starter | ₹24,999 | ₹7,999 | Up to 1,000 chats/mo, official WhatsApp API, human-like AI chatbot, catalog management, standard email support |
| Growth | ₹39,999 | ₹14,999 | Up to 2,000 chats/mo, everything in Starter, website chatbot support, WhatsApp Pay & checkout links, Google Sheets sync, cart recovery |
| Pro | ₹79,999 | ₹24,999 | Up to 5,000 chats/mo, everything in Starter & Growth, multi-location routing, dynamic inventory & live POS sync, CRM direct integration |

### Voice agent plans (Naina / Vapi)

| Tier | Setup | Monthly | Includes |
|------|-------|---------|----------|
| Starter | ₹29,999 | ₹14,999 | 1 dedicated inbound agent, 250 min/mo, Hindi & English, CRM/Sheets logging, monthly call report |
| Growth | ₹49,999 | ₹24,999 | Inbound + outbound agents, 500 min/mo, appointment booking & table reservations, custom voice, multilingual, up to 3 outlets |
| Pro | ₹99,999 | ₹34,999 | Unlimited concurrency, 800 min/mo, voice cloning, custom CRM/POS integrations, multi-location, 24/7 priority support |

All plans: overage ₹45/min on voice, GST extra on everything.

### ICP

Restaurants, salons, clinics, D2C brands (BurgerBae/Souled Store style). Not real estate.

### Contact / booking

- WhatsApp: +91 91596 65277
- Website: agentiq.co.in
- Demo booking: agentiq.co.in/#book

---

## Structure (to build out)

```
selling-ai-chatbots-voice-agents/
  README.md              # this file
  outreach/               # cold outreach templates, DM scripts
  proposals/               # per-prospect proposal docs
  pitch-deck/             # deck source (if built)
  leads.md                 # pipeline tracking
```

---

## Next steps

- [ ] Define outreach channel(s) — WhatsApp DM, Instagram DM, cold email, Fiverr/Upwork gig copy?
- [ ] Draft outreach templates per ICP segment (restaurant / salon / clinic / D2C)
- [ ] Build a lightweight pipeline tracker (leads.md or Sheet)
