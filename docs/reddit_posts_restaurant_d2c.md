# Reddit Posts: Restaurant AI Assistant & D2C AI Shopping Assistant

> **Status: draft, needs a source-check pass before posting.**
> - Every `[VERIFY]` marker below is a claim that needs a real citation or should be softened/removed before posting — don't post with markers still in.
> - Stack described is the **current real AgentIQ stack** (direct Anthropic/Claude API calls, Meta WhatsApp Cloud API, Render/Vercel hosting, Google Sheets/Airtable for logging). **n8n is intentionally left out** — you confirmed it's not actually in use for these products; don't add it back without checking first.
> - Follow the same ground rules as `OFF_PAGE_AEO_PLAYBOOK.md`: disclose affiliation, lead with value not the pitch, don't fabricate metrics, read each subreddit's self-promo rules before posting.

---

## Topic 1: Restaurant AI Assistant

### Post A — r/IndiaTech (market/business framing)

**Title:** `Indian restaurants are missing a huge % of WhatsApp enquiries after hours — and most owners don't know AI can fix it`

```markdown
The National Restaurant Association of India (NRAI) represents over 500,000 member restaurants, and broader estimates of India's total food service and dining outlets — including informal and unorganized ones — run well past a million. From what I've seen building for this space, a tiny fraction use any form of chat automation — most are still manually answering "what are your timings," "do you have parking," "is this dish available" on WhatsApp, one message at a time, whenever the owner or a staff member happens to check their phone.

The pattern that's obvious once you talk to enough restaurant owners: the job isn't "we need a chatbot." It's "I need to stop losing a customer because nobody answered WhatsApp at 11pm."

A few things I've learned building AI WhatsApp assistants for restaurants here:

1. **The buyer changes completely by restaurant size.** A single-owner cafe (1–10 staff) wants something that's just *live* — the owner IS the business, so setup speed and zero-maintenance matter more than features. A 10–50 staff casual dining spot with a manager cares more about staff time saved and weekly menu updates not breaking things. A 50+ staff premium/multi-location chain cares about brand consistency and never getting a fact wrong in front of a high-ticket customer — accuracy matters more than speed there.
2. **Hallucinated menu info is a dealbreaker, not a minor bug.** If the bot invents a price or claims a dish is available when it's 86'd, that's worse than no bot at all — it damages trust with the actual customer, not just the software. We use retrieval (RAG) over the live menu instead of letting the model freewheel, specifically so it can't invent prices or dishes.
3. **Human handoff has to be instant and unambiguous.** The bot needs to know its limits — reservations, refunds, complaints — and hand off to a real person immediately rather than trying to "sound helpful" and guessing.

Curious whether others building for Indian SMBs (not enterprise) have seen the same size-based segmentation, or if restaurants are a special case.

(Disclosure: I run AgentIQ, a done-for-you AI chatbot agency for Indian restaurants, clinics, salons, and D2C brands. Not pitching here, genuinely interested in how others think about SMB segmentation for this kind of product.)
```

---

### Post B — r/buildinpublic (founder story / build narrative)

**Title:** `Building AI WhatsApp assistants for restaurants taught me pricing tiers should follow "who runs the inbox," not headcount`

```markdown
When we started pricing our restaurant WhatsApp AI assistant, the obvious move was to tier by restaurant size (small / medium / large). That turned out to be the wrong axis.

What actually matters is **who is answering WhatsApp today, and what breaks if that stops working:**

- **Owner-operated (1–10 staff):** the owner IS the business. They don't want a dashboard to manage — they want it live fast and left alone. Pitch that landed: "never miss a WhatsApp enquiry again, live in 48 hours."
- **Has a manager, menu changes weekly (10–50 staff):** the pain isn't missed messages, it's staff answering the same FAQ 40 times a day, and stale menu info going out because nobody updated the bot after the weekly menu changed. Pitch: "your staff stop answering the same questions, your menu updates itself."
- **Brand-conscious, high ticket, multi-location (50+ staff):** getting it *wrong* in front of a customer costs more than being slow. This tier cares about the AI never inventing a fact more than it cares about raw speed.

Built the actual product around that: reservation flow (name/guests/date/time/special requests), FAQ flow (timings/location/menu/parking/delivery), lead capture for catering-type enquiries, and a human handoff path that triggers a notification to the owner or on-duty manager rather than trying to resolve everything itself.

Stack, for anyone curious: Claude (Anthropic) as the model, RAG over the live menu so it can't hallucinate prices/availability, Meta's WhatsApp Cloud API directly (no third-party chatbot builder in between), Google Sheets/Airtable for logging while we're still small.

Numbers so far: `[VERIFY — only fill in with a real, current figure, e.g. active restaurant clients, avg setup time, or messages handled/month]`

(I run AgentIQ — an AI chatbot/voice agent agency for Indian SMBs. Sharing because the segmentation lesson surprised me, not trying to sell here.)
```

---

## Topic 2: D2C AI Shopping Assistant

### Post C — r/AI_Agents (technical/architecture framing)

**Title:** `Building a WhatsApp shopping assistant for D2C brands: order tracking, product Q&A, and why we didn't let the model touch inventory directly`

```markdown
Been building AI WhatsApp assistants for D2C brands (apparel, accessories — think brands in the ₹500–3000 AOV range) and wanted to share some architecture decisions, since most public write-ups on this are US-enterprise-focused.

**Core flows we built:**
- Product FAQ (sizing, shipping, COD, returns, stock availability)
- Order tracking (order number → shipping status → delivery ETA)
- Product recommendation (category suggestions, upsell/cross-sell)
- Support escalation (human handoff + support ticket creation)

**A few decisions that mattered more than expected:**

1. **The model never queries live inventory/order state directly — it calls a tool.** Order status and stock availability come from an actual API/database lookup, not the model reasoning over cached context. This eliminates an entire class of "the bot said it shipped but it didn't" failures.
2. **COD questions are disproportionately common** for Indian D2C — way more than shipping speed questions. If your FAQ flow doesn't treat COD as a first-class intent, you'll see a lot of fallback-to-human traffic for something a template can answer instantly.
3. **Recommendation ≠ generic upsell.** A generic "you might also like X" reads as spam in a support-style WhatsApp thread. What worked better: only surface a recommendation when it's directly relevant to what the customer already asked about (e.g., they ask about a hoodie in a sold-out size → suggest the closest in-stock alternative, not a random bestseller).
4. **Escalation has to preserve context.** If a human takes over mid-conversation, they need the full thread + structured summary (what the customer wants, what's been tried), not just "customer says bot isn't helping."

Stack: Claude (Anthropic) for the conversational layer, Meta WhatsApp Cloud API, structured tool-calls for order/inventory lookups, Node.js/Express backend on Render.

Would be curious how others handle the "model calls a tool vs. model reasons over stuffed context" tradeoff for order status specifically — feels like an easy place to get burned.

(Disclosure: I run AgentIQ, a done-for-you AI chatbot agency working with Indian D2C brands. Sharing the architecture because I think it's underdiscussed for non-US-enterprise D2C, not to pitch.)
```

---

### Post D — r/buildinpublic (founder story)

**Title:** `What D2C brands actually ask for vs. what I assumed they'd want from an AI WhatsApp assistant`

```markdown
Went in assuming D2C brands would want the AI assistant to focus on conversion — upsell, cross-sell, "close the sale." What they actually asked for first, almost every time: **stop the support backlog.**

The real daily pain: "Where's my order," "does this run small," "can I pay COD," repeated hundreds of times a day across WhatsApp DMs, Instagram DMs, and email, with no single view of it. Conversion-boosting features were a distant second priority — brands wanted the operational pain gone before they'd even think about using AI to sell more.

What we ended up building first: order tracking (plug into the order/shipping API, not the model guessing), a proper FAQ layer for sizing/COD/returns/stock, and only then a recommendation layer — and even that only fires when it's directly relevant to what the customer already asked, not as a generic "check out our bestsellers."

Numbers so far: `[VERIFY — only fill in with a real, current figure]`

(I run AgentIQ — building AI WhatsApp assistants for Indian D2C brands. Not a pitch, genuinely surprised support-backlog-relief beat conversion as the #1 ask.)
```

---

## Posting checklist (same as the Naina post)

1. Replace every `[VERIFY]` marker with a real, sourced number — or remove the sentence.
2. Post A's market stat now cites NRAI's public 500,000+ member figure plus a hedged "well past a million" for the broader informal/unorganized market — double-check NRAI's number is still current at post time.
3. Read current self-promo rules for each target subreddit before posting — they change.
4. Post at most one per subreddit per posting window; don't burst all four at once.
5. Reply to comments within the first 2 hours for algorithmic reach.
