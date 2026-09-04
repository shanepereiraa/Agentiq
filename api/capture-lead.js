export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, business, message } = req.body || {};

    const rawName = String(name || '').trim();
    const rawPhone = String(phone || '').trim();
    const cleanPhone = rawPhone.replace(/[\s\-\(\)]/g, '');

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 8) {
      return res.status(400).json({ error: 'Valid phone number is required' });
    }

    const payload = {
      name: rawName ? rawName.slice(0, 60) : 'Anonymous',
      phone: cleanPhone.slice(0, 20),
      business: String(business || 'General').trim().slice(0, 80),
      message: String(message || '').trim().slice(0, 500),
      timestamp: new Date().toISOString(),
      source: 'website_floating_chatbot'
    };

    // Forward to Render backend webhook for Google Sheets synchronization
    // Use a 2.5s timeout so Render cold starts never hang the serverless function
    try {
      await fetch('https://agentiq-chatbot.onrender.com/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://agentiq.co.in'
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(2500)
      });
    } catch (renderErr) {
      console.error('[API] Render webhook error:', renderErr.message);
    }

    return res.status(200).json({
      success: true,
      message: 'Lead captured successfully'
    });
  } catch (error) {
    console.error('[API] Lead capture error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
