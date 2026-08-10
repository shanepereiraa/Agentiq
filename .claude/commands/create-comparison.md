---
description: Generate a new AgentIQ-vs-competitor comparison landing page (HTML + schema + sitemap + footer links)
argument-hint: [competitor name, e.g. WATI, AiSensy, Yellow.ai]
---

# Create Comparison Page: $ARGUMENTS

Generate a standalone, root-level comparison landing page for AgentIQ vs. the competitor named in `$ARGUMENTS` (e.g. "WATI" → `agentiq-vs-wati.html`, "Yellow.ai" → `agentiq-vs-yellowai.html` — slugify: lowercase, strip punctuation/spaces to hyphens).

## Ground rule — no fabricated competitor facts

This is the single most important constraint. Every claim about the competitor must be sourced and verifiable, or explicitly marked as unverified. Do not invent pricing, feature lists, or positioning for the competitor. AgentIQ's own facts (pricing, plans, differentiation language) are pre-verified and safe to reuse verbatim from `index.html`'s JSON-LD / `llms.txt`.

## Steps

1. **Check for existing research.** Look for `docs/content-templates/agentiq-vs-<slug>.md`. If it exists and has real (non-`[VERIFY]`) facts about the competitor, use those. If it doesn't exist, or is still full of `[VERIFY]` placeholders, either:
   - Research the competitor's current public pricing/features page yourself (WebFetch/WebSearch) and cite the source + date checked for every fact you add, or
   - If you cannot verify a fact, write the comparison honestly around what IS known, and explicitly note what's unverified rather than guessing. A comparison page with fewer, honest claims beats one with fabricated specifics — inaccurate claims about a named competitor carry real legal/reputational risk.

2. **Read `docs/content-templates/comparison-page-template.md`** for the structural pattern (frontmatter, comparison table, "when X might be better fit" section, FAQ).

3. **Generate the HTML page** at the repo root (`agentiq-vs-<slug>.html`), matching the site's existing design system — copy the header/nav/footer/mobile-nav pattern and Tailwind class conventions from `ai-chatbot-india.html` (closest existing analog: a root-level, keyword-targeted landing page).
   - **Header Container:** Must use the floating pill container style (`<header class="fixed top-3 left-3 right-3 z-50"><nav aria-label="Primary" class="relative max-w-6xl mx-auto glass rounded-2xl px-4 sm:px-5 py-3 flex items-center justify-between">`).
   - **Header Navigation:** Must use the standardized 7 navigation items in this exact order: `Chatbots` (`/ai-chatbot-india`), `Voice Agents` (`/ai-voice-agents-india`), `Try Bot` (`/try-your-bot`), `Industries` (`/#industries`), `Pricing` (`/#pricing`), `Blog` (`/blog`), `FAQ` (`/#faq`).
   - **CTA Button:** Must use sentence case `"Book a demo"` and match the homepage pill-shaped white background & hover styling (`px-4 py-2 rounded-xl bg-white text-ink hover:bg-cyan hover:text-white transition-colors duration-200`) across desktop and mobile menus.
   - **Footer Structure:** Must use the standardized 5-column footer with circular social icons (WhatsApp, Instagram, Facebook, LinkedIn, Email) in Column 1 (Brand), 5 link columns (Brand, Services, Company, Solutions in India, Contact), and full-width bottom copyright bar (`© 2026 AgentIQ. All rights reserved.`).
   - Required sections:
     - Hero: H1 stating the comparison plainly (e.g. "AgentIQ vs WATI: Done-for-You AI Chatbot or Self-Serve WhatsApp Platform?")
     - Comparison table: AgentIQ column uses real site facts; competitor column uses only sourced facts, `[VERIFY]` items omitted rather than guessed
     - "When [Competitor] might be the better fit" — write this honestly; a comparison that only disparages the competitor reads as biased to both readers and AI answer engines, which hurts citation-worthiness
     - "When AgentIQ is the better fit" — reuse the site's existing done-for-you-vs-self-serve framing (see `index.html`'s FAQPage schema, question "How does AgentIQ differ from self-serve platforms like WATI or AiSensy?")
     - FAQ section (visible `<details>/<summary>` accordion, matching the pattern in `ai-chatbot-india.html`)
     - Lead capture CTA (WhatsApp deep link + demo form, matching the div-based `#book` pattern in `ai-chatbot-india.html` — including `data-mcp-*` attributes on the form fields, per this site's agent-transactability standard)

4. **Structured data** — three JSON-LD blocks in `<head>`:
   - `BreadcrumbList` (AgentIQ → this page)
   - `Service` with `"provider": {"@id": "https://agentiq.co.in/#org"}` (link to the existing Organization entity, don't redefine it)
   - `FAQPage` — must exactly mirror the visible FAQ accordion content, 1:1

5. **AEO discovery layer** in `<head>`:
   - `<meta name="ai-summary" content="...">` — a dense, factual one-paragraph summary AI engines can lift directly, following the pattern on other pages
   - `<link rel="ai-content" href="/llms-full.txt">`

6. **Register the page**:
   - Add it to `sitemap.xml` with `priority 0.8`
   - Add a link to it in the "Solutions in India" footer column on the primary landing pages (`index.html`, `restaurants.html`, `salons.html`, `clinics.html`, `d2c-ecommerce.html`, `ai-chatbot-india.html`, `ai-voice-agents-india.html`)
   - Add the new file to the `PAGES` array in `scripts/build-csp.js` (required — it has inline `<script>` blocks that need CSP hashes)

7. **Build integrity** — run `npm run build:all` (rebuilds `tailwind.min.css` and regenerates `vercel.json`'s CSP `script-src` hashes to include the new page). Validate every JSON-LD block on the new page parses as JSON before finishing.

8. Report a summary of what was created/changed and wait for explicit approval before committing — never commit automatically.
