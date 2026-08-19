export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, business, message, timestamp } = req.body || {};

    if (!name && !phone) {
      return res.status(400).json({ error: 'Name or phone is required' });
    }

    const payload = {
      name: name || 'Anonymous',
      phone: phone || '',
      business: business || 'General',
      message: message || '',
      timestamp: timestamp || new Date().toISOString(),
      source: 'website_floating_chatbot'
    };

    // Forward to Render backend webhook for Google Sheets synchronization
    try {
      await fetch('https://agentiq-chatbot.onrender.com/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (renderErr) {
      console.error('[API] Render webhook error:', renderErr);
    }

    return res.status(200).json({
      success: true,
      message: 'Lead captured successfully',
      data: payload
    });
  } catch (error) {
    console.error('[API] Lead capture error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
