# AgentIQ

AI-powered chatbots and voice agents for Indian businesses — live in 7 days, no code needed.

**Website:** https://agentiq.co.in

---

## Project Structure

```
agentiq/
├── website/        Main website (agentiq.co.in) — includes Naina voice widget
├── backend-api/    Chatbot API backend (Express + Claude Haiku 4.5)
```

### Related repos
- **agentiq-chatbot** (`~/Projects/agentiq-chatbot/`) — deployed chatbot backend on Vercel
  - GitHub: https://github.com/shanepereiraa/agentiq-backend
  - Vercel project: agentiq-chatbot

---

## Voice Agent — Naina

Managed entirely in the Vapi dashboard (no local codebase).

- **Platform:** Vapi
- **Assistant ID:** `e699b5d0-7cf8-4809-ab19-ed8687ab830f`
- **Model:** Claude Haiku 4.5 (Anthropic)
- **Transcriber:** Google Gemini 2.0 Flash (Multilingual)
- **Voice:** Naina (Vapi)
- **Avg cost:** ~$0.08/min | **Avg latency:** ~1,950ms
- **Status:** Published

The widget is embedded in `website/index.html` — Vapi public key and assistant ID are hardcoded there.

---

## Chatbot Backend

Two versions exist:

| Version | Location | Status |
|---|---|---|
| v1 (deployed) | `~/Projects/agentiq-chatbot/` | Live on Vercel |
| v2 (updated) | `backend-api/` | Not yet deployed |

`backend-api/` has helmet, rate limiting, and a more detailed system prompt.

### Required env vars (backend-api)
```
ANTHROPIC_API_KEY=
ADMIN_TOKEN=
ALLOWED_ORIGIN=https://agentiq.co.in
PORT=3001
```
