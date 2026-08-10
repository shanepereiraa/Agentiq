#!/usr/bin/env node
// Backend health/security check for the Render service every lead form and
// the AI chat widget depend on (https://agentiq-chatbot.onrender.com).
//
// This is a BLACK-BOX check against the live service. The repo does contain
// a backend-api/server.js, but it defines no /lead route at all (every form
// on this site POSTs to /lead) and its system prompt describes a completely
// different product/pricing structure than agentiq.co.in — so it can't be
// trusted as an accurate description of what's actually deployed. Test the
// real thing, not a file that might be stale or unrelated.
//
// By default this only exercises read-only / idempotent endpoints (/health,
// CORS preflight, a light rate-limit probe). It does NOT submit a real lead
// to /lead unless you pass --live-lead-test, because that writes a real row
// into AgentIQ's live CRM/sheet — don't run that flag as part of routine CI.
//
// Usage:
//   node scripts/backend-health-check.js
//   node scripts/backend-health-check.js --live-lead-test   (writes a clearly-marked test lead)
//
// Requires Node 18+ (uses global fetch).

const BASE = process.env.AGENTIQ_API_BASE || 'https://agentiq-chatbot.onrender.com';
const ORIGIN = 'https://agentiq.co.in';
const LIVE_LEAD_TEST = process.argv.includes('--live-lead-test');

const results = [];
function record(name, pass, detail) {
  results.push({ name, pass, detail });
  console.log(`${pass ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`);
}

async function timedFetch(url, opts) {
  const start = Date.now();
  const res = await fetch(url, opts);
  return { res, ms: Date.now() - start };
}

async function checkHealth() {
  try {
    const { res, ms } = await timedFetch(`${BASE}/health`);
    record('GET /health returns 200', res.status === 200, `status=${res.status}, ${ms}ms`);
    if (ms > 10000) {
      console.log(`  ⚠ ${ms}ms is slow enough to suggest a cold start — confirms the 45s frontend`);
      console.log('    timeout on /api/chat and the pre-warm ping on chat-open are load-bearing, not decorative.');
    }
  } catch (e) {
    record('GET /health returns 200', false, e.message);
  }
}

async function checkCorsPreflight(path) {
  try {
    const { res } = await timedFetch(`${BASE}${path}`, {
      method: 'OPTIONS',
      headers: {
        Origin: ORIGIN,
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type',
      },
    });
    const allowOrigin = res.headers.get('access-control-allow-origin');
    const scoped = allowOrigin === ORIGIN;
    const wildcard = allowOrigin === '*';
    record(
      `OPTIONS ${path} scopes CORS to ${ORIGIN}, not a wildcard`,
      scoped,
      `access-control-allow-origin=${allowOrigin || '(none)'}${wildcard ? ' — WILDCARD, any site could call this endpoint from a browser' : ''}`
    );
  } catch (e) {
    record(`OPTIONS ${path} CORS check`, false, e.message);
  }
}

async function checkRateLimit() {
  // Fire 25 rapid, side-effect-free GET /health requests and see if a 429
  // ever shows up. This only probes whatever limiter (if any) applies to
  // /health — /lead and /api/chat may have separate limiter configs not
  // exercised here, since hammering /api/chat burns real Anthropic API
  // spend and hammering /lead writes real rows. Treat this as a smoke test,
  // not a full rate-limit audit of every route.
  const N = 25;
  const promises = Array.from({ length: N }, () => fetch(`${BASE}/health`).then((r) => r.status).catch(() => 'ERR'));
  const statuses = await Promise.all(promises);
  const got429 = statuses.includes(429);
  const errCount = statuses.filter((s) => s === 'ERR').length;
  record(
    `${N} rapid GET /health requests: rate-limit behavior observed`,
    true, // informational, not pass/fail — no rate limit on /health isn't necessarily wrong
    `statuses=${JSON.stringify(statuses)}${got429 ? ' (429 seen — a limiter is active on /health)' : ' (no 429 — /health has no limiter, or its threshold is above ' + N + ' req/burst)'}${errCount ? `, ${errCount} network errors` : ''}`
  );
}

async function checkLeadEndpointStructure() {
  // Without submitting real data: confirm the endpoint exists and rejects a
  // clearly-invalid body sensibly (4xx with a JSON error), rather than a raw
  // 500 or a hang. This exercises input-validation behavior without writing
  // a lead.
  try {
    const { res, ms } = await timedFetch(`${BASE}/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}), // deliberately empty — should be rejected, not crash
    });
    const isClientError = res.status >= 400 && res.status < 500;
    let bodyText = '';
    try { bodyText = await res.text(); } catch (_) {}
    record(
      'POST /lead with an empty body is rejected cleanly (4xx), not a 500/hang',
      isClientError,
      `status=${res.status}, ${ms}ms, body=${bodyText.slice(0, 200)}`
    );
  } catch (e) {
    record('POST /lead with an empty body is rejected cleanly (4xx), not a 500/hang', false, e.message);
  }
}

async function liveLeadTest() {
  if (!LIVE_LEAD_TEST) {
    console.log('\n(skipped: live /lead submission test — pass --live-lead-test to run it.');
    console.log(' This writes a real, clearly-marked test row into AgentIQ\'s live CRM/sheet.)');
    return;
  }
  console.log('\n⚠ --live-lead-test passed: submitting a real, clearly-marked test lead to /lead...');
  try {
    const { res, ms } = await timedFetch(`${BASE}/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '[HEALTH CHECK — DO NOT ACTION]',
        email: 'health-check@agentiq.co.in',
        phone: '0000000000',
        businessName: 'Automated health check — scripts/backend-health-check.js',
        industry: 'Internal Test',
        notes: `Automated backend-health-check.js live lead test, run at ${new Date().toISOString()}`,
      }),
    });
    record('POST /lead with a valid payload succeeds', res.ok, `status=${res.status}, ${ms}ms`);
  } catch (e) {
    record('POST /lead with a valid payload succeeds', false, e.message);
  }
}

async function main() {
  console.log(`Backend health check — target: ${BASE}\n`);
  await checkHealth();
  await checkCorsPreflight('/lead');
  await checkCorsPreflight('/api/chat');
  await checkLeadEndpointStructure();
  await checkRateLimit();
  await liveLeadTest();

  const failed = results.filter((r) => !r.pass);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
  if (failed.length) {
    console.log('Failed checks:');
    failed.forEach((f) => console.log(`  - ${f.name}`));
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error('Health check crashed:', e);
  process.exitCode = 1;
});
