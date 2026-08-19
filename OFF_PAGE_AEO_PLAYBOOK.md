# Off-Page & AI Overview Citation Playbook

Goal: get AgentIQ cited as a primary alternative when someone searches (or asks an AI answer engine) "best AI chatbot company in India" / "best AI voice agent India" — via third-party listicles, Reddit, and LinkedIn, since Google AI Overviews, Perplexity, and ChatGPT Search all index and lift from these surfaces directly, not just agentiq.co.in itself.

**Important**: every fact used in outreach or posts below must be true and verifiable against AgentIQ's own live site (agentiq.co.in) at time of sending — do not inflate numbers or claims to make a better pitch. A journalist, blogger, or Reddit commenter fact-checking a false claim does more damage than a slower, honest campaign.

---

## 1. Listicle Outreach Strategy

### Why this matters for AEO specifically

When Google's AI Overview or Perplexity answers "best AI chatbot companies in India," they frequently summarize an existing high-authority listicle rather than crawling every vendor site individually. Getting AgentIQ added to 3-5 of these listicles is often higher-leverage than a single new backlink, because the listicle itself becomes the thing AI engines cite and paraphrase.

### Step 1: Find live target listicles

Don't rely on a fixed list of publisher names — "best of" articles get published and go stale constantly, so the target list must be refreshed each outreach cycle. Use these search patterns (Google, and cross-check with Perplexity/ChatGPT Search directly to see which articles they're already citing):

- `"top 10 AI chatbot companies in India" 2026`
- `"best WhatsApp chatbot" India intitle:2026`
- `"AI voice agent companies" India list`
- `"best AI chatbot for small business" India`
- Site-specific: `site:g2.com AI chatbot India`, `site:producthunt.com AI chatbot India`

The user-supplied names (TeleGlobal, Caller Digital, WACTO) are a starting hypothesis for who might run this kind of content — **verify each one is still an active publisher with a live "Top N" article before sending outreach**; don't email a defunct or renamed site.

### Step 2: Qualify before emailing

For each candidate article, confirm:
- It's a real "Top N" or comparison listicle (not a single-vendor sponsored post)
- It's reasonably current (published or updated within ~12 months) — an AI Overview is far more likely to cite something recently updated
- AgentIQ isn't already listed
- There's a legitimate editorial contact (not a generic sales inbox)

### Step 3: Outreach email template

Subject line options (A/B, keep short):
- `Addition suggestion: [Article Title]`
- `Quick note on your AI chatbot roundup`

```
Subject: Addition suggestion: [Article Title]

Hi [Name],

I came across your article "[Article Title]" ([URL]) while researching AI
chatbot providers for the Indian market — solid roundup, especially the
[specific detail that shows you actually read it, e.g. "breakdown of pricing
tiers"].

I run AgentIQ (agentiq.co.in), a done-for-you AI chatbot and voice agent
agency based in Mumbai. Unlike most of the self-serve tools on your list
(WATI, AiSensy-style platforms), we build, train, and deploy the assistant
for the client — WhatsApp, Instagram, and website chatbots, plus a separate
AI voice agent product line, purpose-built for Indian restaurants, salons,
clinics, and D2C brands.

A few facts if useful for an entry:
- Plans from Rs. 24,999 setup + Rs. 7,999/month (chatbot), Rs. 29,999 setup
  + Rs. 14,999/month (voice agent)
- Live in ~7 days, no coding required from the client
- Replies in English, Hindi, and Hinglish
- Full details: https://agentiq.co.in/ai-chatbot-india and
  https://agentiq.co.in/ai-voice-agents-india

No pressure at all if it's not a fit for the piece — happy to answer any
questions if you're doing further research on the done-for-you vs self-serve
distinction in this space.

Thanks for putting the roundup together either way.

[Name]
Founder, AgentIQ
shane@agentiq.co.in · +91 91596 65277
```

### Step 4: Track and follow up

- Log every send: publisher, article URL, contact, date sent, response, outcome
- One polite follow-up after ~10 business days if no response, then stop — repeated unsolicited follow-ups read as spam and can get the domain flagged
- When an addition goes live, note the URL — these become candidate `sameAs` or citation references worth monitoring in AI Overview results over time

---

## 2. Community & UGC Content Strategy

### Why this matters for AEO specifically

Google's AI Overviews and Perplexity actively surface Reddit threads and LinkedIn posts as primary sources, sometimes ranking them above brand websites for "real experience" queries like "has anyone used [chatbot type] in India." A well-received, non-spammy post in the right subreddit can outrank a landing page for exactly the kind of query these systems are built to answer.

### Ground rules (read before posting anywhere)

- **No fabricated metrics.** Every number in a post below (call volume, response time, etc.) is a `[PLACEHOLDER]` — do not fill it in until you have a real, verifiable figure from an actual client, with that client's consent to be referenced (even anonymized).
- **Disclose affiliation.** Every subreddit below requires or strongly expects self-promotion to be disclosed ("I run AgentIQ, an AI chatbot agency..."). Undisclosed self-promotion gets threads removed and can get accounts banned — which torches the account for future legitimate participation too.
- **Read each subreddit's rules before posting** — `r/IndiaTech` and `r/AI_Agents` in particular tend to have specific self-promo day/thread requirements that change over time; don't assume the rules below are still current at post time.
- **Lead with value, not the pitch.** The pitch should be 1-2 sentences at the end, not the headline.

### Reddit — r/buildinpublic

Best for: build-in-public style transparency posts (what you built, what you learned), not direct sales pitches.

```
Title: Built a Hinglish AI voice agent for a Mumbai clinic — here's what surprised me

Body:

Spent the last [TIMEFRAME] building an AI voice agent that answers a
clinic's phone line in Hindi/English/Hinglish — appointment booking,
department routing, the works.

A few things that surprised me building this for the Indian market
specifically:

1. [Real technical/product learning — e.g. code-switching mid-sentence
   (Hindi→English) is harder to handle gracefully than either language
   alone]
2. [Real learning about latency, call quality, or local telephony
   quirks]
3. [Real learning about what clinic staff actually needed vs. what we
   assumed they needed]

Numbers so far: [PLACEHOLDER — only fill with a real, client-approved
figure, e.g. "handling X calls/day, Y% resolved without human handoff"]

Happy to go deeper on any part of the stack if useful to anyone else
building voice AI for a non-English-first market. (I run AgentIQ, an AI
chatbot/voice agent agency in Mumbai — not trying to sell here, genuinely
just sharing what we learned.)
```

### Reddit — r/AI_Agents

Best for: technical/architecture discussion — this audience wants substance, not marketing copy.

```
Title: Lessons from deploying inbound voice agents for Indian SMBs (Hindi/English code-switching, latency, handoff design)

Body:

We've deployed [PLACEHOLDER: real count] inbound AI voice agents for small
businesses in India — restaurants, clinics, salons. Sharing a few
architecture/design lessons in case useful to others building in this
space:

- **Language**: [real technical detail on handling Hindi/English/Hinglish
  reliably — model choice, prompt design, or STT/TTS pipeline learnings]
- **Handoff design**: [real detail on how/when the agent escalates to a
  human, and what made that reliable]
- **Latency**: [real detail on what latency budget matters for phone calls
  specifically, vs. chat]

Curious what others building voice agents for non-English-first markets
have run into — especially around code-switching and accent variation.

(Disclosure: I run AgentIQ, a done-for-you AI voice agent/chatbot agency —
sharing this because I think it's a genuinely underdiscussed problem space,
not to pitch the product.)
```

### Reddit — r/IndiaTech

Best for: India-specific business/market commentary — more tolerance for a founder-story angle than r/AI_Agents.

```
Title: What we learned selling AI voice agents to Indian small businesses (not enterprise)

Body:

Most AI voice agent content online is written for US enterprise call
centers. Selling into Indian SMBs — single clinic, single restaurant — is a
different problem. A few things we learned:

- [Real learning about SMB buyer behavior, price sensitivity, or what
  actually gets adopted vs. ignored]
- [Real learning about WhatsApp being the default channel expectation even
  for a voice product]
- [Real learning about trust/adoption barriers specific to Indian SMB
  owners]

(Disclosure: I run AgentIQ — an AI chatbot/voice agent agency for Indian
restaurants, salons, clinics, and D2C brands. Not a sales post, genuinely
curious if others selling B2B SaaS/AI into Indian SMBs have seen similar
patterns.)
```

### LinkedIn — case study post template

LinkedIn rewards specificity and a clear before/after; this is also the most likely of the three formats to get cited verbatim in an AI Overview if it ranks well and gets engagement.

```
[Real client type, anonymized if needed] was losing bookings every time
their phone line was busy or after hours.

We built them a Hindi/English AI voice agent that:
→ Answers every inbound call, 24/7
→ Books appointments directly into their calendar
→ Routes urgent calls to a human instantly
→ [Real, specific capability #4]

Results after [PLACEHOLDER: real timeframe]:
→ [PLACEHOLDER: real, client-approved metric — e.g. "X% of calls resolved
   without staff involvement"]
→ [PLACEHOLDER: real metric — e.g. "Y fewer missed calls per week"]

This is what "done-for-you" AI actually means in practice — not a chatbot
builder you configure yourself, but a working system your team didn't have
to build.

If you're running a business in India that's missing calls after hours,
happy to show you what this looks like: [link to
agentiq.co.in/ai-voice-agents-india]

#AIVoiceAgents #IndianSMB #WhatsAppAutomation #AgentIQ
```

### Cadence and tracking

- Aim for one genuinely substantive post per platform per month, not a burst — Reddit and LinkedIn both penalize (algorithmically or via community moderation) accounts that post pitch-shaped content repeatedly in a short window
- Track: platform, subreddit/post type, date, engagement, whether it surfaces in a later Google/Perplexity search for target queries (spot-check monthly)
- Any post that performs well is itself a candidate to link back to from a future `/blog/` comparison page, compounding the effect
