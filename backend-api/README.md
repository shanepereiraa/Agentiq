# AgentIQ Chatbot API Reference

The production backend microservice for AgentIQ is maintained in its own dedicated repository:
**`~/Projects/agentiq-chatbot`** (hosted on Render at `https://agentiq-chatbot.onrender.com`).

### Architecture & Endpoints
- `GET /health` — Service health check & uptime probe
- `POST /lead` — Validates and persists leads directly to Google Sheets via Google Sheets API v4
- `POST /api/chat` (and `/chat`) — Claude Haiku 4.5 streaming chatbot response bridge with rate limiting and origin enforcement
- `POST /webhook/vapi` — Telephony webhook handling call completions and call-summary persistence
