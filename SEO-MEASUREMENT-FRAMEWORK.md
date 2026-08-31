# SEO Measurement Baseline & Reporting Framework — agentiq.co.in

**Working document.** Fill the blank cells as exports arrive. Do not estimate — where a number needs GSC / GA4 / a rank tracker / a backlink tool, the cell reads `TBD — awaiting export`.

- **Business goal:** Google organic top 10 for `ai chatbot india` / `ai chatbots india` in 8–14 months, via a 4-tier keyword ladder.
- **Hub page:** `/ai-chatbot-india`
- **Deploy:** push to `main` → Vercel.
- **Only quantitative inputs used here:** `audit-results.json` (audit run `2026-08-25T15:03:35`, overall `83/100`, `scores.scoring_version = 1`), `FULL-AUDIT-REPORT.md`, `sitemap.xml` (34 URLs).
- **Framework created:** 2026-08-30. **Month 1 = Sep 2026.**

---

## 1. Baseline Scorecard

All scores from `audit-results.json → scores.categories`; weights from `scores.weights`. Overall `83` (`scores.overall`), score confidence `Medium` (`FULL-AUDIT-REPORT.md`). RAG: 🟢 ≥90 · 🟡 60–89 · 🔴 <60.

| Category (audit key) | Weight | Score | RAG | What it means for ranking | Trend (next run) |
|---|---:|---:|:--:|---|---|
| Performance & Core Web Vitals (`pagespeed`) | 13 | 0 | 🔴 | **Highest-weighted lever.** Score is a **measurement error** — `data.sections.pagespeed.error = "Rate limited by Google API"`, `performance_score = null`. CWV (LCP/INP/CLS) is a real Google ranking factor and is currently **unmeasured**. Cannot tell if this is a real problem until re-run with `PAGESPEED_API_KEY`. | |
| On-Page SEO (`onpage`) | 10 | 100 | 🟢 | Title, meta description, canonical, viewport, `lang`, robots meta all present (`data.sections.onpage`). Homepage `word_count = 3576`. No action; hold the line on new pages. | |
| Broken Links (`broken_links`) | 10 | 88 | 🟡 | `data.sections.broken_links`: 25 links checked, **1 broken** — `https://www.linkedin.com/in/shanepereiraa/` returns `status 999` (LinkedIn anti-bot; may not be truly dead but audit + crawlers flag it). 5 redirecting `wa.me`/social links are healthy 301/302. Broken links leak crawl equity and trust. | |
| Robots & Crawlers (`robots`) | 8 | 96 | 🟢 | `data.sections.robots`: Googlebot/Bingbot allowed, sitemap declared, Bytespider blocked. Issue: **3 AI crawlers not explicitly managed** — `ChatGPT-User, CCBot, FacebookBot` (inherit `*` = allowed). Minor; AEO hygiene, not organic-rank. | |
| Internal Links (`internal_links`) | 8 | 80 | 🟡 | `data.sections.internal_links`: 16 pages crawled, 298 internal links. **12 near-orphan blog posts** with ≤1 incoming link (`orphan_candidates`) — all 12 Tier-2/Tier-3 supporting posts. Weak internal linking caps how fast the blog cluster can rank and pass equity to `/ai-chatbot-india`. | |
| Readability (`readability`) | 8 | 64 | 🟡 | `data.sections.readability`: Flesch `38.7` ("Very Difficult / college"), FK grade `12.8`, avg sentence `19.7` words, `18.9%` complex words. Hard-to-scan copy depresses engagement/dwell — a soft ranking signal and a conversion drag. | |
| Security Headers (`security`) | 8 | 100 | 🟢 | `data.sections.security`: HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all present. No action. | |
| Link Profile (`link_profile`) | 7 | 65 | 🟡 | `data.sections.link_profile`: 20 pages crawled. **4 true orphan pages, zero inbound internal links** (`orphan_pages.urls`): `/tools/whatsapp-link-generator`, `/tools/staff-vs-ai-calculator`, **`/agentiq-vs-aisensy`, `/agentiq-vs-interakt`**. The last two are **Tier-1 target pages** — currently unlinked, so they cannot rank. `unique_external_domains = 4` here is **outbound** (wa.me, instagram, linkedin, facebook), not referring domains. | |
| AI Search / llms.txt (`llms_txt`) | 5 | 100 | 🟢 | `data.sections.llms_txt`: `llms.txt` + `llms-full.txt` both 200, quality `100`. No action. | |
| Social Meta (`social`) | 5 | 85 | 🟡 | `data.sections.social`: all OG + Twitter tags present, `issues = []`, `recommendations = []`. 85 is a rubric floor with no stated defect — no fix identified; recheck next run. | |
| Entity SEO (`entity`) | 5 | 0 | 🔴 | **Mostly real.** `data.sections.entity`: Critical — "No Organization/Person entity found in JSON-LD"; `sameas_count = 0`; missing sameAs to LinkedIn, X, Wikidata, Wikipedia. NOTE: `data.sections.onpage.schema` **does** contain an `Organization`/`ProfessionalService` block (`@id …#organization`) with `sameAs = [instagram only]` — the entity module did not pick it up (likely a parser mismatch, cf. the `article` check crash). **Real gaps regardless:** no `Person` schema (E-E-A-T for a founder-led agency), `sameAs` has only Instagram. Directly weakens the brand/knowledge-graph signals Tier-1 comparison pages lean on. | |
| Hreflang (`hreflang`) | 5 | 0 | 🔴 | **Not a real problem — scoring artifact.** `data.sections.hreflang`: `implementation_method = "none"`, and the check itself states "If this is a single-language site, hreflang is not needed." Site is single-locale `en-IN` (India-only). `summary` shows 0 critical/high/medium/low. Optional cleanup: add a self-referencing `en-IN` + `x-default` tag to zero the artifact. | |
| Content Uniqueness (`duplicate_content`) | 5 | 100 | 🟢 | `data.sections.duplicate_content`: 0 exact/near duplicates across 30 pages, avg `864` words. **2 thin pages** flagged (not scored down): `/try-your-bot` (270 w) and `/results` (219 w), threshold 300. Both are conversion pages — expand for indexing quality. | |
| Redirects (`redirects`) | 3 | 100 | 🟢 | `data.sections.redirects`: 0 hops on canonical, no loops, no mixed protocol. No action. | |
| Article schema (`article`) | — (no weight in `scores.weights`) | 0 | ⚪ | **Measurement error, unweighted — ignore.** `data.sections.article.error` = Python `TypeError: cannot use 'list' as a set element` in `article_seo.py`. Not counted in the overall. Re-run after the skill bug is fixed. | |

### Zeros: real problem vs measurement error

| Zero-scoring category | Weight | Verdict | Action |
|---|---:|---|---|
| `pagespeed` (CWV) | 13 | **Measurement error** (Google API rate-limit) hiding a **potentially real** problem. CWV is genuinely unmeasured. | Set `PAGESPEED_API_KEY` in `.env`, re-run audit, then treat LCP/INP/CLS as the top lever. |
| `entity` | 5 | **Real** (partly). Org schema exists but wasn't detected; `Person` schema + `sameAs` (LinkedIn/X) genuinely missing. | Add `Person` + expand `Organization.sameAs`; re-run to confirm detection. |
| `hreflang` | 5 | **Not a real problem.** Single-language India site; the check says hreflang isn't needed. | Optional: self-referencing `en-IN` + `x-default` to clear the 0. Low priority. |
| `article` | 0 (unweighted) | **Measurement error.** Script crashed. | Re-run after `article_seo.py` fix. No ranking impact. |

---

## 2. KPI Framework

### 2a. Leading indicators — controllable, review **weekly**

| Metric | Source | Cadence | Current baseline | Target curve (Month = calendar) |
|---|---|---|---|---|
| Referring domains (unique) | Ahrefs Webmaster Tools (free) → Backlink profile → Referring domains | Weekly | `TBD — awaiting export` (audit `unique_external_domains = 4` is **outbound**, not inbound) | ≥5 by M2 (Oct) · ≥8 by M3 (Nov) · ≥12 by M5 (Jan) · **≥15 by M6 (Feb)** · 15–30 by M8 (Apr) |
| New pages published (net, indexable) | `sitemap.xml` diff on `main` + manual log | Weekly | 34 URLs (`sitemap.xml`: 13 blog + 4 comparison + 3 vertical + tools + core) | +2–4 / month; Tier-2 vertical+geo pages prioritised M2–M5 |
| Pages indexed | GSC → Pages (Indexing) report → "Indexed" count | Weekly | `TBD — awaiting export` | ≥30 of 34 by M2 · ≥95% of submitted by M4 |
| CWV pass rate (mobile, % of URLs "Good") | GSC → Core Web Vitals (mobile); cross-check PageSpeed Insights per template | Weekly (monthly for field data to populate) | `TBD — awaiting export`; audit `performance_score = null` (rate-limited) | Measured by M1 (Sep) · **all templates "Good" (LCP <2.5s, INP <200ms, CLS <0.1) by M2 (Oct)** |
| Internal links → `/ai-chatbot-india` | Audit re-run (`data.sections.link_profile.top_linked_pages`) + GSC → Links → Top linked pages (internal) | Weekly | **55** (`link_profile`, 20-page crawl) / **16** (`internal_links` module, 16-page crawl) | ≥70 by M2 · ≥90 by M4 (every vertical + blog post links the hub with a descriptive anchor) |
| Audit score (overall + the 6 amber/red categories) | Re-run the SEO audit skill (same tool as `audit-results.json`) | Weekly (or per significant deploy) | **83** overall; red/amber: `pagespeed 0`, `entity 0`, `hreflang 0`, `link_profile 65`, `readability 64`, `internal_links 80`, `broken_links 88`, `social 85` | ≥88 by M1 · ≥92 by M3 · ≥95 by M6 |
| Orphan / near-orphan page count | Audit (`link_profile.orphan_pages.count` + `internal_links.orphan_candidates`) | Weekly | **4 true orphans + 12 near-orphans = 16** | ≤4 by M1 · **0 by M2** |

### 2b. Lagging indicators — outcome, review **monthly**

Per **keyword tier** (query lists in §4c). All rows: `TBD — awaiting export` until GSC history accrues.

| Metric | Source | Cadence | Current baseline | Target curve |
|---|---|---|---|---|
| Impressions — Tier 1 (comparison/brand) | GSC Performance, query filter = Tier-1 list | Monthly | TBD | >0 / indexed by M1 · ramping M2–M3 |
| Avg position — Tier 1 | GSC Performance, same filter | Monthly | TBD | **≤10 by M3 (Nov)** · ≤5 by M5 (Jan) |
| Clicks — Tier 1 | GSC Performance | Monthly | TBD | First clicks by M3 · compounding M4+ |
| CTR — Tier 1 | GSC Performance | Monthly | TBD | ≥3% once avg position ≤10 |
| Impressions / Avg position / Clicks / CTR — Tier 2 (vertical+geo) | GSC Performance, Tier-2 filter | Monthly | TBD | Impressions >0 by M2 · **avg position ≤10 by M5 (Jan)** |
| Impressions / Avg position / Clicks / CTR — Tier 3 (service/intent) | GSC Performance, Tier-3 filter | Monthly | TBD | Impressions >0 by M4 · **avg position ≤10 by M8 (Apr)** |
| Impressions / Avg position / Clicks / CTR — Tier 4 (head terms) | GSC Performance, Tier-4 filter | Monthly | TBD | Impressions climbing by M6 · **top 10 by M8–M14** |
| Organic sessions | GA4 → exploration (see §4b), Session default channel group = "Organic Search" | Monthly | `TBD — awaiting export` | Positive MoM trend from M3; step-change when Tier-2 ranks |
| Demo-booking conversions from organic | GA4 → same exploration, Key event = demo booking (form submit `/#book` and/or `wa.me` demo click), filtered to Organic Search | Monthly | `TBD — awaiting export` (AgentIQ leads are in-memory per `CLAUDE.md` — GA4 event is the system of record) | ≥1 by M3 · compounding with Tier-2/3 traffic |
| Organic landing pages — top 10 by sessions | GA4 exploration, dimension = Landing page + query string | Monthly | `TBD — awaiting export` | `/ai-chatbot-india` + comparison pages enter top 10 by M4 |

---

## 3. Weekly Report Template

Copy this block into a new dated note each week (e.g. `reports/2026-W37.md`). Paste raw GSC / rank-tracker / Ahrefs exports into the cells.

```markdown
# SEO Weekly — Week of ____  (Month __ of 14)

## A. Leading indicators
| Metric | Last wk | This wk | Δ | Target this month | On track? |
|---|---|---|---|---|---|
| Referring domains |  |  |  |  |  |
| New indexable pages published (cum.) |  |  |  |  |  |
| Pages indexed (GSC) |  |  |  |  |  |
| CWV templates "Good" / total |  |  |  |  |  |
| Internal links → /ai-chatbot-india |  |  |  |  |  |
| Audit score (overall) |  |  |  |  |  |
| Orphan + near-orphan pages |  |  |  |  |  |

## B. Rank tracker — 30 seeded queries (avg position)
| Tier | Query | Last wk | This wk | Δ | In top 10? |
|---|---|---|---|---|---|
| 1 | agentiq vs wati |  |  |  |  |
| 1 | wati alternative india |  |  |  |  |
| ... (full list §4c) |  |  |  |  |  |

## C. GSC Performance (last 7 days vs prior 7 days) — by tier
| Tier | Impr. | Δ Impr. | Clicks | Δ Clicks | Avg pos | Δ pos | CTR |
|---|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |  |
| 4 |  |  |  |  |  |  |  |

## D. Off-page (this week)
- New referring domains: ____  (list: ____)
- Lost referring domains: ____
- Outreach sent / replies / links landed: ___ / ___ / ___

## E. Shipped this week
- Pages: ____
- Fixes from §5: ____

## F. Read-this-as… (fill 2–3 lines)
- 
```

### Interpretation guide — "read this as…"

| Signal | Good week | Bad week / act now |
|---|---|---|
| **Tier-1 avg position** | Moving toward 10 (e.g. 30→22→15). New Tier-1 queries appearing in GSC with impressions. | Flat >30 for 3+ weeks after the comparison pages are linked & indexed → content/intent mismatch on those pages, or still not indexed (check GSC Pages). |
| **Impressions (any tier)** | Rising even if clicks lag — you're gaining coverage; clicks follow position. | Impressions falling week-on-week with no algo event → indexing loss or cannibalisation; check Pages report + `site:` for duplicate URLs. |
| **Referring domains** | Net +1 or more most weeks; on pace for ≥15 by M6. | Net 0 for 3+ consecutive weeks → **links aren't landing**: outreach volume too low, targets too high-authority, or asset (comparison page / tool / data post) not link-worthy yet. Switch to easier targets (local directories, niche roundups, HARO-style, partner sites) and pitch the free tools + pricing-data blog posts. |
| **CWV templates "Good"** | Trending to all-green; INP the usual laggard. | Any template drops from "Good" after a deploy → a script/CSS/image regression shipped to `main`; bisect the last deploy. |
| **Internal links → hub** | Climbing as new pages ship (every new page links the hub). | Flat while pages ship → new templates missing the hub link; fix the template. |
| **Audit score** | Ratchets up as §5 items close; never regresses. | Drops after a deploy → new page missing schema/meta/canonical, or a new broken link; diff against last clean run. |
| **Clicks vs position** | Position ≤10 **and** CTR ≥3%. | Position ≤10 but CTR <1% → title/meta not compelling for that query; rewrite the SERP snippet. |

---

## 4. Data-Collection Setup

### 4a. Google Search Console — exports per tier

**Prereqs:** verify `https://agentiq.co.in` (Domain property preferred) and submit `https://agentiq.co.in/sitemap.xml`. GSC starts collecting from verification date — history is not backfilled, so verify **now**; every tier row above stays `TBD — awaiting export` until ~16 days of data exist.

For **each tier** run one export:

1. GSC → **Performance** → Search results.
2. Date range: **Last 3 months** (rolling); for the weekly report use **Compare → last 7 days vs previous 7 days**.
3. Toggle on all four metrics: Clicks, Impressions, CTR, Average position.
4. **Query filter → Custom (regex)** — paste the tier's alternation regex:
   - **Tier 1:** `agentiq vs |wati alternative|aisensy vs|interakt alternative|yellow\.?ai alternative|aisensy alternative|wati vs`
   - **Tier 2:** `chatbot for restaurants|chatbot for clinics|salon booking chatbot|chatbot for salons|clinic appointment chatbot|d2c whatsapp chatbot|reservation chatbot|voice agent for clinics`
   - **Tier 3:** `done for you (ai |whatsapp )?chatbot|chatbot agency india|managed (ai |whatsapp )?chatbot`
   - **Tier 4:** `^ai chatbots? india$|best ai chatbot for business india|^whatsapp chatbot india$`
5. Export → Google Sheets (one tab per tier). Also **Page filter → URL contains `/ai-chatbot-india`** and export that page's queries separately (hub-page tracking).
6. **Pages report** (Indexing → Pages): export weekly; record "Indexed" count and any "Not indexed" reasons. Feeds *Pages indexed* leading indicator.
7. **Links report** → Internal links → Top linked pages: record the row for `/ai-chatbot-india`. Feeds *Internal links → hub*.
8. **Core Web Vitals** (Experience → Core Web Vitals → Mobile): record Good/Needs-improvement/Poor URL counts weekly.

### 4b. GA4 exploration — organic landing pages + conversions

1. GA4 → **Explore** → blank exploration. Name: *Organic Landing Pages & Demo Conversions*.
2. **Dimensions:** Landing page + query string; Session default channel group; Session source / medium.
3. **Metrics:** Sessions; Engaged sessions; Engagement rate; Key events; Session key event rate; (add the demo-booking key event once created).
4. **Rows:** Landing page + query string. **Columns:** none. **Values:** Sessions, Key events.
5. **Filter:** `Session default channel group` exactly matches `Organic Search`.
6. Sort by Sessions desc → this is the *Organic landing pages top 10* row; the Key events column is *demo-booking conversions from organic*.
7. **Create the conversion event** first if absent: GA4 → Admin → Events → Create event (or mark existing as key event) for the demo action(s): form submission on `/#book` and outbound click to `wa.me/919159665277` containing `book a demo`. Mark as **Key event**. (Per `CLAUDE.md`, AgentIQ leads are in-memory only — GA4 is the durable conversion record.)
8. Date range: month-to-date + previous month for comparison. Export monthly.

### 4c. Free rank tracker — 30 seeded queries

Use **one** free option (all allow ~daily checks for a small keyword set): Google Search Console's own position data (free, but averaged), **Serpple free tier**, **SEO Gets** (GSC-connected, free), or a manual weekly `google.com/search?q=…&gl=in&hl=en&num=20` incognito check logged to a sheet. Seed with **`gl=IN`, `hl=en`, device = mobile**, target URL noted per query.

| # | Tier | Query | Target URL |
|---:|:--:|---|---|
| 1 | 1 | agentiq vs wati | /agentiq-vs-wati |
| 2 | 1 | wati alternative india | /agentiq-vs-wati |
| 3 | 1 | aisensy vs interakt | /agentiq-vs-aisensy |
| 4 | 1 | agentiq vs aisensy | /agentiq-vs-aisensy |
| 5 | 1 | agentiq vs interakt | /agentiq-vs-interakt |
| 6 | 1 | agentiq vs yellow.ai | /agentiq-vs-yellow-ai |
| 7 | 1 | aisensy alternative | /agentiq-vs-aisensy |
| 8 | 1 | interakt alternative india | /agentiq-vs-interakt |
| 9 | 1 | wati vs aisensy | /agentiq-vs-wati |
| 10 | 1 | yellow.ai alternative india | /agentiq-vs-yellow-ai |
| 11 | 2 | ai chatbot for restaurants india | /restaurants |
| 12 | 2 | whatsapp chatbot for clinics | /clinics |
| 13 | 2 | salon booking chatbot india | /salons |
| 14 | 2 | whatsapp chatbot for restaurants | /restaurants |
| 15 | 2 | ai chatbot for salons india | /salons |
| 16 | 2 | clinic appointment chatbot india | /clinics |
| 17 | 2 | d2c whatsapp chatbot india | /d2c-ecommerce |
| 18 | 2 | restaurant reservation chatbot india | /restaurants |
| 19 | 2 | whatsapp chatbot for d2c ecommerce | /d2c-ecommerce |
| 20 | 2 | ai voice agent for clinics india | /ai-voice-agents-india |
| 21 | 3 | done for you ai chatbot | /ai-chatbot-india |
| 22 | 3 | whatsapp chatbot agency india | /ai-chatbot-india |
| 23 | 3 | managed ai chatbot service | /ai-chatbot-india |
| 24 | 3 | ai chatbot agency india | /ai-chatbot-india |
| 25 | 3 | done for you whatsapp chatbot india | /ai-chatbot-india |
| 26 | 3 | managed whatsapp chatbot india | /ai-chatbot-india |
| 27 | 4 | ai chatbot india | /ai-chatbot-india |
| 28 | 4 | ai chatbots india | /ai-chatbot-india |
| 29 | 4 | best ai chatbot for business india | /ai-chatbot-india |
| 30 | 4 | whatsapp chatbot india | /ai-chatbot-india |

### 4d. Referring domains — Ahrefs Webmaster Tools (free)

1. ahrefs.com/webmaster-tools → add & verify `agentiq.co.in` (DNS or the existing GSC verification).
2. Wait for first crawl (24–72h), then Dashboard → **Backlink profile → Referring domains**.
3. Weekly: export Referring domains (CSV). Record **count**, **new**, **lost**. This is the source for the off-page target (**15–30 referring domains in 6 months**).
4. Cross-check with GSC → Links → External links → Top linking sites (GSC undercounts but is a free second source).
5. Baseline today: `TBD — awaiting export`. (Audit's `link_profile.top_external_domains` = wa.me/instagram/linkedin/facebook are **outbound** links from the site, not backlinks.)

### 4e. Unblock the audit's CWV check

- `data.sections.pagespeed.error` = `"Rate limited by Google API. Wait a few minutes or add an API key."` and `FULL-AUDIT-REPORT.md` Measurement Notes: set `PAGESPEED_API_KEY`.
- Action: get a PageSpeed Insights API key (Google Cloud console → enable "PageSpeed Insights API" → create API key), add `PAGESPEED_API_KEY=…` to `.env` (see `.env.example`), or pass `--api-key` to the audit CLI.
- Then re-run the audit so `pagespeed` returns a real score instead of `0` and LCP/INP/CLS diagnostics populate. Until then, the weight-13 category is **unmeasured**, not zero.
- Also re-run after `article_seo.py` is patched (currently crashes with `TypeError: cannot use 'list' as a set element`).

---

## 5. Fix List — ranked by (ranking impact ÷ effort)

Every item traces to `audit-results.json` / `FULL-AUDIT-REPORT.md`. "Wtd. pts" = `weight × points recoverable to 100` (rough leverage on the overall score). Ranking-impact column is the effect on the keyword ladder, which can outweigh the score math.

| # | Fix | Audit source | Sev. | Weight | Effort | Wtd. pts | Ranking impact | Why this rank |
|---:|---|---|---|---:|:--:|---:|---|---|
| 1 | **Fix the 1 broken link** `https://www.linkedin.com/in/shanepereiraa/` (update URL, or replace with a working profile link / remove). | `broken_links` score 88; `data.sections.broken_links.broken[0]` status 999; `FULL-AUDIT-REPORT.md` Critical | Critical | 10 | Trivial (1 line) | ~1.2 | Restores crawl trust; stops equity leak sitewide (link is in the global footer). | Critical severity, weight 10, ~2 min. Best ratio on the board. |
| 2 | **Set `PAGESPEED_API_KEY` in `.env` and re-run the audit** to measure CWV (§4e). Then fix whatever LCP/INP/CLS issues surface on each template. | `pagespeed` score 0; `data.sections.pagespeed.error` (rate-limited); `environment_fixes` "Performance measurement incomplete" | Info→ TBD | **13** | Trivial to measure; **Low–High to fix** | up to **13** | **Highest-weighted lever.** CWV is a confirmed Google ranking factor and gates every tier. Currently a blind spot. | Weight 13, and you can't act on the single biggest factor while it's unmeasured. Measuring is trivial; do it now. |
| 3 | **Add `Person` schema (founder) + expand `Organization.sameAs`** to include LinkedIn, X, Facebook (already have Instagram). Keep the existing `Organization`/`ProfessionalService` block. | `entity` score 0; `data.sections.entity.issues` (Critical: no Organization/Person; missing sameAs ×4); note: `onpage.schema` shows Org block exists with `sameAs=[instagram]` only | Critical | 5 | Low (JSON-LD edit) | ~5 | E-E-A-T + brand/knowledge-graph signal that **Tier-1 comparison pages** and "agency" Tier-3 terms depend on. | Weight 5 fully recoverable, low effort, and disproportionate value for brand + comparison queries. Re-run to confirm the module detects it. |
| 4 | **Internal-link the 4 orphan pages.** Priority: `/agentiq-vs-aisensy` and `/agentiq-vs-interakt` (**Tier-1 targets**) — link from nav/footer "Compare" menu, the hub `/ai-chatbot-india`, and relevant blog posts. Also link `/tools/whatsapp-link-generator` and `/tools/staff-vs-ai-calculator` from blog + hub. | `link_profile` score 65; `data.sections.link_profile.orphan_pages.urls`; `FULL-AUDIT-REPORT.md` Critical | Critical | 7 | Low | ~2.5 | **Unblocks 2 of the 3 Tier-1 pages** — an orphan page effectively cannot rank. Direct hit on the 1–3 month goal. | Weight 7 + the ranking impact is immediate and on the critical path for Tier 1. Just behind entity because it's more template/link plumbing. |
| 5 | **Internal-link the 12 near-orphan blog posts** (each has ≤1 incoming link). Add contextual links from the 3 vertical pages, the hub, and post-to-post "related" blocks. Every post links up to `/ai-chatbot-india` with a descriptive anchor. | `internal_links` score 80; `data.sections.internal_links.orphan_candidates` (12 URLs) | Warning | 8 | Low–Med | ~1.6 | Builds the Tier-2/Tier-3 topical cluster and funnels equity to the hub; raises *Internal links → hub* KPI. | Weight 8 but only ~20 pts recoverable; supports Tier 2/3 (2–8 month window), not Tier 1. Mechanical, no content risk. |
| 6 | **Add explicit robots.txt rules for `ChatGPT-User`, `CCBot`, `FacebookBot`** (allow, matching the other AI bots). | `robots` score 96; `data.sections.robots.issues` (3 AI crawlers not managed) | Warning | 8 | Trivial (3 lines) | ~0.3 | AEO/citation hygiene; negligible organic-rank effect. | Tiny score gain but 2-minute change — worth doing in the same commit as #1. |
| 7 | **Add self-referencing `hreflang="en-IN"` + `x-default`** on all pages (or in the sitemap). | `hreflang` score 0; `data.sections.hreflang` (check states hreflang not needed for single-language sites) | Info | 5 | Trivial | ~5 (artifact only) | None on ranking — clears a scoring artifact, tidies international signals. | Not a real problem (§1), but 5 artifact points for a trivial template change. Low urgency; batch it. |
| 8 | **Expand the 2 thin pages** `/try-your-bot` (270 w) and `/results` (219 w) past the 300-word substantive-content threshold. | `duplicate_content` `thin_content` array; score already 100 (no score delta) | Warning | 5 | Med (copy) | 0 | Better indexing quality + conversion clarity on two money pages; no score movement. | No score gain, moderate effort — but these are conversion-critical pages, so keep on the list. |
| 9 | **Readability rewrite** toward Flesch ~50+: shorter sentences (target 15–18 words), 2–4-sentence paragraphs, plainer vocabulary on hub + vertical + comparison pages. | `readability` score 64; `data.sections.readability` (Flesch 38.7, FK 12.8, 18.9% complex words) | Warning | 8 | **High** (ongoing content work) | ~2.9 | Improves dwell/engagement (soft signal) and conversion; compounds as pages rank. | Weight 8 and ~36 pts recoverable, but high, ongoing effort — schedule as a rolling task, not a one-shot. Lowest ratio of the real fixes. |

**Sequencing:** ship #1, #3, #6, #7 in one deploy to `main` this week (all trivial); do #2 (measure) in parallel; then #4 and #5 (internal linking) next; #8 and #9 as rolling content work. Re-run the audit after each deploy and log the overall score in the weekly report.

**Not on the list (no defect identified):** `social` (85 with `issues=[]`), `onpage`, `security`, `redirects`, `llms_txt`, `duplicate_content` (all 🟢), `article` (unweighted measurement error — re-run after script fix).
