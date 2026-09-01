# GEO Baseline & Listicle-Inclusion Targets — agentiq.co.in

**Run:** 2026-09-01. Two passes: (a) Claude WebSearch (US index) on the category queries; (b) **live checks in Perplexity (5 queries) and Google AI Overview (2 queries)** from a browser. Results below are the live pass. Re-run monthly — this table is the GEO KPI.

---

## 1. Baseline — is AgentIQ cited? (live, 2026-09-01)

### Perplexity

| Query | AgentIQ cited? | Who Perplexity named | Publishers it leaned on |
|---|---|---|---|
| best AI chatbot company in India for small business | **No** | Hyperleap AI (#1), SmatBot, Botsify, Inceptimind, Gupshup | hyperleap.io (own blog), cyfuture, viewgates, inceptimind |
| best AI voice agent for small business in India | **No** | Vyora AI, Bolna AI, Edesy, DialNexa, Tabbly.io | edesy, vyora, dialnexa, tabbly, caller.digital, myoperator |
| WATI alternative for Indian small businesses | **No** | AiSensy, Interakt, Go4whatsup, Gallabox, DoubleTick, WatEase | scalifylabs, ynexgen, go4whatsup, watease, sleekflow |
| what is AgentIQ agentiq.co.in Mumbai chatbot agency | **Yes — accurate** | AgentIQ India (correct: done-for-you agency, verticals, pricing matches `llms-full.txt`, founder Shane Pereira from LinkedIn) | agentiq.co.in, linkedin.com |
| `AgentIQ` (bare) | **Yes — but 3rd of ~7** | NVIDIA AgentIQ toolkit (#1), Agent IQ banking / agentiq.com (#2), **AgentIQ India (#3)**, then agentiq.app, agentiq.io, agentiqai.tech, a Play Store app | docs.nvidia.com, agentiq.com, agentiq.co.in |

### Google AI Overview

| Query | AI Overview shown? | AgentIQ cited? | Named | Sources AI Overview linked |
|---|---|---|---|---|
| best AI chatbot company in India for small business | Yes | **No** | Haptik (Jio), Yellow.ai; budget: WATI, Engati | **WACTO** ("Choosing the Right Chatbot Companies in India (2026)"), **WebXion** ("Top 10 AI Chatbot Providers for Website & WhatsApp in India", 3 Jul 2026) |
| wati alternative india | Yes | **No** | AiSensy, Interakt, Gupshup | AiSensy blog ("11 Best Wati Alternatives in 2026"), **RichAutomate** ("Best Wati Alternative India 2026 (Ranked)") |

**Verdict:** zero citation on every category / "alternative" query in both engines. Branded (disambiguated) is accurate — the `Person` schema + LinkedIn `sameAs` are working. Bare "AgentIQ" is buried at #3 behind NVIDIA's toolkit and the funded US `agentiq.com`.

**What the engines actually cite:** vendor-authored roundups (hyperleap's own blog), small SEO-aggregator sites (WACTO, WebXion, RichAutomate, scalifylabs, ynexgen, viewgates, edesy), and directories (GoodFirms, Clutch). None list AgentIQ. On-page work will not fix this — AgentIQ has to get *into those roundups*.

### Brand-collision finding (new, and material)

The branded search surfaced **three unrelated entities** sharing the name:
- **agentiq.com** — a US customer-engagement company that raised a **$10M Series A**; has a **Crunchbase profile** ("Agent IQ") that outranks agentiq.co.in's own Crunchbase presence (AgentIQ India appears to have none).
- **a5corp.com/agentiq** — a Salesforce-assistant product.
- **agentiqworld.com** — a conference series (ex–"Chatbot Summit").

Consequence for GEO: an AI engine asked "what is AgentIQ" is as likely to describe the funded US company as the Mumbai agency. This dilutes entity strength and is why `entity` scored 0 in the audit despite valid schema.

**Mitigations (no new claims required):**
1. Create an **agentiq.co.in Crunchbase profile** — "AgentIQ (India)" / disambiguated — and add it to `Organization.sameAs`. Crunchbase feeds Google's Knowledge Graph.
2. Always brand as **"AgentIQ (Mumbai)"** or **"AgentIQ — agentiq.co.in"** in every outreach subject/first line so editors and crawlers disambiguate.
3. Consider a firmer legal-name in schema (e.g. a registered entity name) if one exists.

---

## 2. Listicle-inclusion target list

Discovered fresh 2026-09-01. **Not yet fully qualified** — before emailing any, confirm: (a) live & updated within ~12 months, (b) a genuine multi-vendor "Top N" (not a single-vendor sponsored post or a competitor's own blog), (c) AgentIQ not already listed, (d) a real editorial/author contact (not a sales inbox). Use the email template in `OFF_PAGE_AEO_PLAYBOOK.md` §1 Step 3.

### Tier S — directly cited by Google AI Overview / Perplexity on 2026-09-01 (pitch these first)

| # | URL / publisher | Category | Why |
|---|---|---|---|
| S1 | **WACTO** — "Choosing the Right Chatbot Companies in India (2026)" (search `wacto choosing chatbot companies india`) | Chatbot | Cited *in* the Google AI Overview for the head query. Third playbook-hypothesis name — **confirmed live and influential**. |
| S2 | **WebXion** — "Top 10 AI Chatbot Providers for Website & WhatsApp in India" (3 Jul 2026) | Chatbot / WhatsApp | Cited in the same AI Overview. |
| S3 | **RichAutomate** — "Best Wati Alternative India 2026 (Ranked)" | WhatsApp / alternative | Cited in the Google AI Overview for `wati alternative india`. |
| S4 | **hyperleap.io** blog — its "best chatbot for Indian SMBs" roundup | Chatbot | Perplexity's #1 source for the small-business query (it cites Hyperleap's own post as "frequently cited as best overall"). |
| S5 | **edesy** blog — its AI voice agent roundup | Voice | Perplexity's primary source for the voice query. |
| S6 | scalifylabs / ynexgen / viewgates — WhatsApp & chatbot roundups | Mixed | Small aggregators Perplexity pulled from; low domain authority but they feed the answer. Qualify each. |

### Tier A — independent roundups, high leverage

| # | URL | Category | Notes |
|---|---|---|---|
| 1 | https://teleglobals.com/blog/ai-chatbot-development-companies-india | Chatbot | Playbook hypothesis — **confirmed live**. Agency blog; likely open to additions. |
| 2 | https://caller.digital/blog/top-10-voice-ai-agents-india-2026 | Voice | Playbook hypothesis — **confirmed live**, 2026-dated. Caller Digital is itself a vendor — they list competitors, so an addition is plausible; verify tone isn't hostile. |
| 3 | https://www.q3tech.com/blogs/chatbot-development-companies-india/ | Chatbot | Dev-agency blog, "2026" in title. |
| 4 | https://go4customer.com/blog/chatbot/top-10-chatbot-companies-in-india-for-2026 | Chatbot | BPO blog; India-focused; 2026-dated. |
| 5 | https://levitation.in/top-ai-chatbot-companies-india | Chatbot | Agency blog. |
| 6 | https://dialnexa.com/blogs/top-12-voice-ai-companies-in-india/ | Voice | "Top 12… Full Comparison" — comparison format is ideal for an addition. |
| 7 | https://dg10.agency/blog/whatsapp-ai-chatbots-india | WhatsApp | Agency blog, India-specific. |
| 8 | https://cxwizard.app/blog/best-whatsapp-chatbots-india | WhatsApp | 2026-dated. |
| 9 | https://dgasskyworld.com/blog/best-whatsapp-chatbot-for-business-in-india/ | WhatsApp | "2026 Guide". |
| 10 | https://www.ojiva.ai/blogs/best-whatsapp-chatbot-for-business-in-india/ | WhatsApp | Vendor blog — verify it lists competitors. |

### Tier B — larger publishers / vendor blogs (lower reply rate, higher authority if landed)

| # | URL | Category | Notes |
|---|---|---|---|
| 11 | https://cyfuture.ai/blog/top-ai-chatbot-companies-in-india | Chatbot | Cyfuture is a vendor and ranks #1 in its own list — addition unlikely but high authority. |
| 12 | https://myoperator.com/blog/top-10-voice-ai-agents-india-2026 | Voice | MyOperator vendor blog. |
| 13 | https://www.ringg.ai/blog/best-ai-voice-agent-companies | Voice | Ringg vendor blog. |
| 14 | https://www.squadstack.ai/voicebot/top-ai-agent-companies-in-india | Voice | SquadStack vendor blog. |
| 15 | https://respond.io/blog/best-whatsapp-chatbots | WhatsApp | Global publisher; not India-specific; hard to land. |
| 16 | https://www.kommunicate.io/blog/best-whatsapp-ai-chatbots/ | WhatsApp | Kommunicate vendor blog. |

### Directories — create/claim a profile (playbook lever #2, not email outreach)

| Directory | URL | Action |
|---|---|---|
| Crunchbase | https://www.crunchbase.com/organization/agent-iq (wrong entity) | Create a distinct **AgentIQ (India)** org profile. KG signal. |
| Clutch | https://clutch.co/in/developers/artificial-intelligence/chatbots | Create company profile + first client reviews. This page ranks for the head term. |
| GoodFirms | https://www.goodfirms.co/bot-development/india | Same — profile + reviews. AI answers cited "per GoodFirms". |
| G2 | (search: g2.com AI chatbot India) | Profile + reviews. |
| Product Hunt | (search) | One-time launch. |

---

## 3. Outreach tracking sheet (columns)

| Article URL | Category | Publisher | Contact name | Contact email | Qualified? (Y/N + why) | Personalization hook | Sent date | Follow-up date (+10 biz days) | Response | Outcome (added / declined / no reply) | Live URL if added |

Rules (from playbook): one polite follow-up only, then stop. Log the live URL of any addition — it becomes a `sameAs` / monitoring candidate.

---

## 4. Baseline status & monthly re-run

**Done 2026-09-01:** Perplexity ×5, Google AI Overview ×2 (see §1). AgentIQ absent from every category/alternative query in both engines.

**Still to add (needs your login):**
- **ChatGPT** (chatgpt.com, web search on) — same 4 category prompts + "what is AgentIQ".
- **Google AI Overview** on the remaining queries: `best AI voice agent India`, `best whatsapp chatbot small business india`, `AI chatbot for restaurants india`.

**Monthly re-run:** repeat the §1 tables. Track "# of category queries where AgentIQ is cited (0 of 4)" as the GEO KPI in `SEO-MEASUREMENT-FRAMEWORK.md`. First non-zero result should follow the first 2–3 listicle placements.

---

## 5. Next actions

- [ ] Finish the live baseline (browser, §4) — establishes the monthly GEO KPI
- [ ] Qualify Tier-A targets 1–10 (visit each: live? Top-N? AgentIQ absent? editorial contact?)
- [ ] Personalize + send the playbook email to qualified Tier-A targets (Shane's inbox — one per publisher, disclose affiliation)
- [ ] Create AgentIQ (India) profiles: Crunchbase, Clutch, GoodFirms, G2
- [ ] Add every new profile/listing URL to `Organization.sameAs` in `index.html` as they go live
- [ ] Re-run this baseline monthly; track "queries where AgentIQ is cited" in `SEO-MEASUREMENT-FRAMEWORK.md`
