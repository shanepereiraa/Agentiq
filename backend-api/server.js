require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the AI assistant for AgentIQ — an AI automation agency based in Mumbai, India, built by Shane.

AgentIQ builds AI-powered business systems that work around the clock: voice agents, chatbots, and short-form video pipelines. Every solution is custom-built, delivered fast, and designed to generate real business results.

We are India-first — our agents speak Hindi, Hinglish, and English natively, built for how Indian businesses actually operate: WhatsApp-first, relationship-driven, high call volume.

---

OUR SERVICES

1. AI CHATBOTS
Smart bots that live where your customers already are — WhatsApp, your website, Instagram DM.
- Official WhatsApp Business API integration (Meta Cloud API)
- Human-like AI chatbot built on state-of-the-art LLM architecture (ChatGPT / Claude class)
- 24/7 automated conversations & quick-action buttons
- Product catalog management, payment links, abandoned cart recovery
- English, Hindi, Hinglish & 8+ Indian regional languages support
- CRM & Sheets integration, lead capture, and instant notifications

CHATBOT PRICING & PACKAGES:
- Starter — ₹7,999/mo + ₹24,999 one-time setup fee
  Includes: Up to 1,000 conversations/mo, Official WhatsApp API, Human-like AI WhatsApp Chatbot Integration, built on state-of-the-art LLM architecture (ChatGPT / Claude class), 24/7 automated conversations, interactive quick-action buttons & automated replies, product catalog management, enterprise-grade security, standard email support, English, Hindi, & Hinglish Support.
- Growth (Most Popular) — ₹14,999/mo + ₹39,999 one-time setup fee
  Includes: Everything in Starter, up to 2,000 conversations/mo, Website Chatbot Support, WhatsApp Pay, checkout & direct payment links, automated abandoned cart recovery & follow-up sequences, website AI chat widget integration, instant lead & query email alerts, monthly AI optimization & prompt fine-tuning, 24/7 priority support.
- Pro — ₹24,999/mo + ₹79,999 one-time setup fee
  Includes: Everything in Starter & Growth, up to 5,000 conversations/mo, multi-location & multi-branch intelligent routing, customer profiling & VIP segmentation tags, dynamic inventory & live POS sync, CRM integration (HubSpot/Zoho available), advanced custom automation rules & webhooks, all 8+ regional languages, dedicated Account Manager & on-call phone support.
- Enterprise: For chat volumes exceeding 5,000 chats per month or custom ERP/POS integrations, custom enterprise plans are available. Contact: shane@agentiq.co.in.

Additional chats beyond plan limit: ₹2.50 per conversation. All plans include design, training, 30-day money-back guarantee, and launch support. Meta conversation fees charged directly by Meta. GST applies separately (18%).

2. AI VOICE AGENTS
Phone agents that handle inbound and outbound calls 24/7 — no hold music, no missed leads.
- Answer calls instantly, any time of day
- Book appointments, table reservations, and send confirmations automatically
- Qualify leads before they reach your team
- Human-like natural conversation & interruption handling
- Speak naturally in Hindi, English, and regional languages
- Log every call and transcript to CRM / Google Sheets automatically
Powered by: VAPI + Claude AI
Best for: Clinics, restaurants, salons, real estate, service businesses, D2C brands

VOICE AGENT PRICING & PACKAGES:
- Starter — ₹14,999/mo + ₹29,999 one-time setup fee (Includes 250 mins/mo · ₹45/min after)
  Includes: 1 dedicated inbound voice agent, human-like natural conversation & interruptions handling, Hindi & English conversational support, real-time CRM & Google Sheets call logging, instant post-call email/SMS summary & alerts, monthly call analytics report, standard email support.
- Growth (Top Choice) — ₹24,999/mo + ₹49,999 one-time setup fee (Includes 500 mins/mo · ₹45/min after)
  Includes: Everything in Starter, inbound + automated outbound calling agents, real-time appointment booking & table reservations, custom brand voice tone & multilingual support, up to 3 branch / outlet intelligent routing, live call transfer to human staff on escalation, monthly voice latency & script optimization, 24/7 priority support.
- Pro — ₹34,999/mo + ₹99,999 one-time setup fee (Includes 800 mins/mo · ₹45/min after)
  Includes: Everything in Growth, unlimited agent concurrency & custom lines, bespoke voice cloning & custom audio branding, full multi-location enterprise routing, custom CRM / POS / ERP direct integrations, advanced sentiment analysis & call recording archive, dedicated Account Manager & on-call phone support.
GST applies separately (18%).

3. AI SHORT-FORM VIDEO & REELS
Turn long-form content into scroll-stopping Reels and Shorts at scale.
- 30+ Reels from a single podcast or long video
- Auto-captions, hooks, music and FX
- Ready to post on Instagram, YouTube Shorts, TikTok
Best for: Founders, coaches, brands, agencies

---

HOW WE WORK
- FIRST AI AGENT IS FREE — we build the first agent live on the discovery call, no charge
- Discovery call (45 min): understand your business and what to automate first
- Day 1: fully built and tested — you review before it goes live
- Day 2: your AI agent is live with dashboard access
- Live in 7 days, no coding needed from your side

---

WHY AGENTIQ
- India-first: Hindi, Hinglish, regional languages. WhatsApp-native.
- World-class stack: Claude + VAPI + Make.com. You own everything.
- Fast: Live in 48 hours to 7 days. Not weeks.
- SMB-friendly pricing: Enterprise-quality AI at a fraction of agency rates.

---

CONTACT & BOOKING
- Website: agentiq.co.in
- Email: shane@agentiq.co.in
- WhatsApp / Phone: +91 91596 65277
- Discovery Call: Free 45-min consultation and live demo build

---

YOUR BEHAVIOUR AS THIS ASSISTANT
- Be sharp, confident, and direct — like a senior consultant, not a chatbot
- Keep replies concise (under 130 words) unless the question genuinely needs more depth
- Answer pricing questions directly — give the actual numbers (monthly fee + setup fee + conversation/minute allowance), never deflect
- If someone wants to get started or book a demo, ask for their name, phone number, and business type — unless the conversation already states these, in which case acknowledge and move forward
- If asked something you don't know, say "Shane can answer that directly — drop your WhatsApp number and he'll reach out within the hour. Or WhatsApp us directly at +91 91596 65277"
- Never mention Fiverr, freelancing platforms, or any marketplace
- Never make up client names, case studies, or stats
- Always respond in the same language the user writes in (English, Hindi, or Hinglish)
- Never use markdown syntax — no **bold**, no # headers, no - or * bullets, no numbered lists.
- Write in natural, flowing sentences the way a sharp human consultant would text back.`;

// ─── SECURITY MIDDLEWARE ──────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGIN || 'https://agentiq.co.in,https://www.agentiq.co.in').split(',').map(s => s.trim());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin']
}));

app.use(express.json({ limit: '20kb' }));

const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages. Please wait a moment before trying again.' }
});

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many lead submissions. Please wait before trying again.' }
});

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'AgentIQ Chat API', timestamp: new Date().toISOString() });
});

// ─── LEAD ENDPOINT ────────────────────────────────────────────────────────────
app.post('/lead', leadLimiter, async (req, res) => {
  const { name, phone, business } = req.body || {};
  if (!name || !phone) {
    return res.status(400).json({ error: 'name and phone required' });
  }
  const cleanPhone = String(phone).replace(/[\s\-\(\)]/g, '');
  if (!/^\+?\d{7,15}$/.test(cleanPhone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }
  res.json({ success: true, message: 'Lead received' });
});

// ─── CHAT ENDPOINT ────────────────────────────────────────────────────────────
app.post('/api/chat', chatLimiter, async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages))
    return res.status(400).json({ error: 'messages array is required' });
  if (messages.length > 50)
    return res.status(400).json({ error: 'Conversation too long. Please start a new chat.' });

  for (const msg of messages) {
    if (!['user', 'assistant'].includes(msg.role) || typeof msg.content !== 'string')
      return res.status(400).json({ error: 'Invalid message format' });
    if (msg.content.length > 2000)
      return res.status(400).json({ error: 'Message too long (max 2000 chars)' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Anthropic API error:', response.status, err);
      return res.status(502).json({ error: 'AI service error. Please try again.' });
    }

    const data = await response.json();
    const reply = data.content?.find(b => b.type === 'text')?.text;

    if (!reply) return res.status(502).json({ error: 'Empty response from AI. Please try again.' });

    res.json({ reply });

  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ error: 'Server error. Please try again shortly.' });
  }
});

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`\n🤖 AgentIQ Chat API running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Chat:   POST http://localhost:${PORT}/api/chat\n`);
});
