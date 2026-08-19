# Live Inbound Test Call Setup (Vapi + Dedicated Phone Number)

This guide details how to connect a live dedicated phone number (Indian DID or US/International toll-free/local) to **Naina (AgentIQ's AI Voice Assistant)** via Vapi, so prospects can dial a real phone number 24/7.

---

## 1. Architecture Overview

```
Caller Dials (+91 / +1 Number)
            │
            ▼
Telephony Carrier (Twilio / Exotel / Plivo / SIP Trunk)
            │
            ▼ (SIP / Webhook Forwarding)
Vapi.ai Voice Engine
            │
      ┌─────┴─────────────────────────┐
      ▼                               ▼
Deepgram Nova-2 (STT)           Claude 3.5 Haiku / Sonnet (LLM)
      │                               │
      └──────────────┬────────────────┘
                     ▼
             ElevenLabs / Azure Swara (TTS)
                     │
                     ▼
      Natural Audio Streamed to Caller (<620ms Latency)
```

---

## 2. Setup Method 1: Twilio Direct Integration (Easiest — 5 Minutes)

If you have a Twilio account:

1. **Link Twilio to Vapi:**
   - Go to [Vapi Dashboard](https://dashboard.vapi.ai) $\rightarrow$ **Settings** $\rightarrow$ **Telephony / Integrations**.
   - Add your Twilio **Account SID** and **Auth Token**.
2. **Assign Phone Number:**
   - In Vapi $\rightarrow$ **Phone Numbers** $\rightarrow$ Click **Import Number**.
   - Select your Twilio phone number.
   - Under **Assistant**, select **Naina (AgentIQ Voice Assistant)**.
3. **Configure Server Webhooks (Auto-configured by Vapi):**
   - Vapi automatically sets Twilio Voice Webhook URL to:
     `https://api.vapi.ai/telephony/twilio/incoming`
4. **Test the Call:**
   - Dial the number from any mobile device $\rightarrow$ Naina will answer immediately in under 1 second.

---

## 3. Setup Method 2: Indian +91 DID via Exotel / Plivo (TRAI-Compliant India Number)

In India, inbound PSTN calling requires local telecom compliance. You can route inbound calls from an Indian Exotel/Plivo virtual number directly into Vapi using SIP Forwarding:

### Step A: Configure Custom SIP Trunk in Vapi
1. In Vapi $\rightarrow$ **Phone Numbers** $\rightarrow$ Click **Create SIP Trunk / Number**.
2. Set Trunk Name: `AgentIQ India Inbound (Exotel)`.
3. Note your unique Vapi SIP Inbound URI:
   `sip:<ASSISTANT_ID>@sip.vapi.ai`

### Step B: Configure Inbound Applet on Exotel
1. Log into your [Exotel Dashboard](https://my.exotel.com).
2. Go to **App Bazaar** $\rightarrow$ Create New Applet.
3. Add a **Passthru Applet** or **Connect Applet** $\rightarrow$ Select **SIP Forwarding**.
4. Set destination SIP URI: `sip:<ASSISTANT_ID>@sip.vapi.ai`.
5. Link your purchased Exotel +91 virtual number to this applet.

---

## 4. Post-Call Automation & Google Sheets Logging

Configure the Vapi assistant to automatically log all inbound calls and WhatsApp summaries:

1. **Vapi Assistant Settings:**
   - In Assistant Config $\rightarrow$ **Server URL / Webhook**:
     `https://agentiq-chatbot.onrender.com/vapi-webhook`
2. **Payload Received on `call.ended`:**
   ```json
   {
     "message": {
       "type": "end-of-call-report",
       "call": {
         "id": "call_12345",
         "customer": { "number": "+919876543210" }
       },
       "transcript": "Caller: Hi, I'd like to book an appointment for tomorrow...",
       "summary": "Caller booked a consultation with Dr. Sharma for Thursday at 5:00 PM.",
       "analysis": {
         "structuredData": {
           "name": "Rohan Gupta",
           "intent": "Doctor Consultation",
           "date": "2026-08-20",
           "time": "17:00"
         }
       }
     }
   }
   ```
3. **Instant Actions Triggered by AgentIQ Bridge:**
   - Appends row to Client's **Google Sheet** (Caller Name, Phone, Intent, Time, Summary).
   - Sends instant WhatsApp notification to the Business Owner via Meta Cloud API.

---

## 5. Adding the Live Test Number to the Website

Once the number is active, update the pill badge on [index.html](file:///Users/shanepereira/Projects/agentiq/index.html) and [ai-voice-agents-india.html](file:///Users/shanepereira/Projects/agentiq/ai-voice-agents-india.html):

```html
<a href="tel:+91XXXXXXXXXX" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/20 transition-all">
  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
  📞 Dial Our 24/7 Live Test Line: +91 XXXXX XXXXX
</a>
```
