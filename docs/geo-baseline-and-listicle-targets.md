# GEO Baseline & Listicle-Inclusion Targets — agentiq.co.in

**Run:** 2026-09-01. Method: Claude WebSearch (US index) on the 4 queries below, reading the AI-generated answer summary + the organic result set it drew from. A live Perplexity/ChatGPT cross-check was blocked by a session rate limit — repeat that step from a browser (see "How to finish the baseline").

---

## 1. Baseline — is AgentIQ cited?

| Query | AgentIQ in the AI answer? | Who *is* named |
|---|---|---|
| `best AI chatbot company in India 2026` | **No** | Cyfuture AI, Haptik, Yellow.ai, Infosys, Verloop.io, Instinctools (via GoodFirms) |
| `best AI voice agent companies India` | **No** | SquadStack, MyOperator, Vyora AI, Caller Digital, Ringg AI, DialNexa; global: Cognigy, Ada, Parloa, Kore.ai, PolyAI, Haptik |
| `best WhatsApp chatbot for small business India` | **No** | WATI, Interakt, Kommunicate, AiSensy, Gupshup, Verloop |
| `AgentIQ agentiq.co.in AI chatbot` (branded) | Own site ranks; description accurate | — |

**Verdict:** zero citation coverage on all three category queries — matches the Aug-18 competitive benchmark. AI answer engines are pulling from third-party roundups and directories (GoodFirms, Clutch) that don't list AgentIQ. On-page work alone will not fix this; AgentIQ has to appear *in the sources those engines cite*.

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

### Tier A — independent roundups, highest leverage (pitch first)

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

## 4. How to finish the baseline (do from a browser, ~20 min)

The WebSearch summary above is a proxy. For the real GEO picture, ask each engine directly and record the **cited sources**:

1. **Perplexity** (perplexity.ai, no login) — ask: "best AI chatbot company in India", "best AI voice agent for small business in India", "WATI alternative for Indian SMBs", "what is AgentIQ". Screenshot the Sources panel each time; note if agentiq.co.in appears and which roundups it cites.
2. **ChatGPT** (chatgpt.com, needs login) — same 4 prompts with web search on.
3. **Google** — same 4 as a normal search; note whether an **AI Overview** renders and what it links.
4. Log results in a small table (query · engine · AgentIQ cited? · top 3 sources cited). Re-run monthly — this is the GEO KPI.

---

## 5. Next actions

- [ ] Finish the live baseline (browser, §4) — establishes the monthly GEO KPI
- [ ] Qualify Tier-A targets 1–10 (visit each: live? Top-N? AgentIQ absent? editorial contact?)
- [ ] Personalize + send the playbook email to qualified Tier-A targets (Shane's inbox — one per publisher, disclose affiliation)
- [ ] Create AgentIQ (India) profiles: Crunchbase, Clutch, GoodFirms, G2
- [ ] Add every new profile/listing URL to `Organization.sameAs` in `index.html` as they go live
- [ ] Re-run this baseline monthly; track "queries where AgentIQ is cited" in `SEO-MEASUREMENT-FRAMEWORK.md`
