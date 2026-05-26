# CLAUDE.md — AgentIQ Website

## Project overview

Single-page static marketing website for **AgentIQ** (`agentiq.co.in`), an AI automation agency targeting Indian SMBs. The site showcases three services — AI Voice Agents, AI Chatbots, and AI Short-form Video — and includes an embedded live chatbot powered by a hosted backend.

**Repository contents:**
```
index.html   # entire site (HTML + CSS + JS, ~1000 lines, single file)
README.md    # one-line placeholder
```

No build system, no package manager, no test suite. Everything is self-contained in `index.html`.

---

## Architecture

### Single-file design
All HTML, CSS, and JavaScript live in `index.html`. There is no bundler, compiler, or framework. Styles are written with CSS custom properties (variables) defined on `:root`. JavaScript is vanilla ES6 with no external dependencies beyond Google Fonts.

### External dependencies (CDN only)
| Resource | Purpose |
|---|---|
| Google Fonts — Geist | Body/UI typeface |
| Google Fonts — Instrument Serif | Display/headline typeface |

### Backend API
The embedded chatbot POSTs to:
```
https://agentiq-backend-production-da1a.up.railway.app/api/chat
```
This is a Railway-hosted service. The frontend sends `{ messages: cwHistory }` and expects `{ reply: string }` back. The system prompt is embedded directly in the JS (`CW_SYSTEM` const at line ~923).

---

## Design system

### Color tokens (CSS custom properties)
```css
--bg:        #0A0A0B   /* page background */
--bg-2:      #111114
--surface:   #16161A   /* card backgrounds */
--surface-2: #1C1C22
--border:    rgba(255,255,255,0.08)
--border-2:  rgba(255,255,255,0.14)
--text:      #F5F4F2   /* primary text */
--text-2:    #A8A6A1   /* secondary text */
--text-3:    #62605C   /* muted/tertiary */
--accent:    #D4FF3D   /* lime green — primary CTA/brand color */
--accent-dim:#B8E635
--blue:      #6FB4FF
--pink:      #FF9DDB
--orange:    #FF9C5A
```

### Typography
- **Display/headings** — `'Instrument Serif'`, serif, italic variants used for stylistic contrast
- **UI/body** — `'Geist'`, sans-serif, weights 300–700
- Responsive sizing via `clamp()` throughout

### Key UI conventions
- CTA color is always `var(--accent)` (#D4FF3D) with `#0A0A0B` text on it
- Hover states: accent lightens to `#DDFF52`, elements scale or translate by small amounts (1.03×, -2px)
- All interactive elements use `transition: 0.15s–0.3s ease`
- Border-radius: `100px` for pill shapes, `20–28px` for cards, `12–14px` for smaller surfaces
- Grain overlay applied via SVG `feTurbulence` filter on `body::before` at 4% opacity

---

## Page structure

| Section | ID | Description |
|---|---|---|
| Nav | `<nav>` | Fixed floating pill nav with logo, links, CTA |
| Hero | `#hero` | Full-viewport headline with orbit rings and glow |
| Wordmark marquee | `.wordmark-row` | Scrolling brand name strip |
| Services | `#services` | Three service cards (Voice / Chat / Video) |
| Why us | `#why` | 4-item benefit grid |
| Process | `#process` | 4-step timeline (Day 0 → Day 1 → Day 2 → Ongoing) |
| CTA / Contact | `#contact` | Email/WhatsApp capture form |
| Footer | `<footer>` | Logo, nav links, copyright |
| Chat widget | `#chat-launcher` / `#chat-window` | Fixed bottom-right AI chatbot |

---

## Chatbot widget

The chatbot is fully client-side rendered except for AI responses. Key globals:
- `cwHistory` — array of `{role, content}` message objects sent to the API
- `cwTyping` — boolean lock to prevent concurrent sends
- `cwOpen` — toggle state for the chat window

Key functions:
```
cwToggle()     — open/close the chat window
cwSend()       — collect input, POST to API, render response
cwAddBot(text, qr[])  — render a bot message with optional quick-reply buttons
cwAddUser(text)       — render a user message
cwShowTyping() / cwHideTyping() — animated typing indicator
cwQuick(text)  — populate input and immediately send (used by quick-reply buttons)
```

The system prompt (`CW_SYSTEM`) includes pricing tiers, product info, and behavior instructions — update it directly in `index.html` when pricing or services change.

### Chatbot pricing (embedded in JS, keep in sync)
| Tier | Price (INR) | Delivery |
|---|---|---|
| Starter Bot | ₹5,085 | 2 days |
| Business Bot | ₹12,205 | 4 days |
| Pro AI Bot | ₹25,426 | 6 days |

---

## Development workflow

### Running locally
No build step needed. Open `index.html` directly in a browser:
```bash
# Option 1 — direct file open
open index.html

# Option 2 — simple local server (avoids CORS issues with fetch)
python3 -m http.server 8080
# then open http://localhost:8080
```

The chatbot's `fetch` to the Railway backend requires network access; it will fail gracefully (shows an error bubble) if the backend is unreachable.

### Making changes
1. Edit `index.html` directly — CSS is in `<style>` blocks, JS is in `<script>` at the bottom
2. Test in a browser — check mobile responsiveness at ≤768px and ≤900px breakpoints
3. Commit and push to the working branch

### Git branching
- `main` — production branch
- `claude/claude-md-docs-VjyvU` — current AI development branch (push here)

### Deployment
The site is deployed as a static site (likely GitHub Pages or similar). Pushing to `main` should trigger deployment. No build artifacts are generated.

---

## Key conventions

- **No frameworks** — keep it vanilla. Don't introduce React, Vue, or any JS framework.
- **No build tooling** — don't add webpack, vite, or npm. The single-file constraint is intentional.
- **Inline everything** — all CSS and JS stays in `index.html` unless the project explicitly moves to multi-file.
- **Mobile-first breakpoints** — `@media(max-width: 768px)` for nav, `@media(max-width: 900px)` for service rows and process grid.
- **Accessibility** — use `aria-label` on icon-only buttons (already on chat launcher and send button).
- **No comments** in HTML/CSS/JS unless a non-obvious workaround. The code is readable via naming.
- **Accent color** is the brand identity — never change `--accent: #D4FF3D` without explicit approval.

---

## Content owned by AgentIQ (do not change without instruction)
- Pricing figures in `CW_SYSTEM` JS const
- Phone numbers and WhatsApp references
- The Railway backend URL (`CW_API`)
- Copyright line in footer
- Service descriptions and bullet points
