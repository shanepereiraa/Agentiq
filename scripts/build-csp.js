#!/usr/bin/env node
// Computes CSP script-src hashes for every inline <script> block across the
// site's HTML pages and writes them into vercel.json's script-src directive.
//
// Why hashes instead of 'unsafe-inline': this is a static site with no
// per-request server, so nonces (which need fresh generation per request)
// aren't available without adding an edge-middleware layer. Hashes are
// static and computable at build time, which fits a plain static deploy.
//
// Why a script instead of hand-maintained hashes: the inline scripts here
// change often (analytics config, feature JS). A hard-coded hash list would
// silently break (CSP-blocked, no visible error) on every edit unless
// someone remembers to recompute it. Run `npm run build:csp` after editing
// any inline <script> block and before deploying.
//
// <script type="application/ld+json"> blocks are intentionally excluded —
// they're inert data, never executed as script, and not governed by
// script-src in any browser's CSP enforcement.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const PAGES = [
  'index.html', 'clinics.html', 'restaurants.html', 'salons.html',
  'blog/index.html',
  'blog/whatsapp-business-api-vs-chatbot-restaurants.html',
  'blog/ai-chatbot-pricing-india-2026-guide.html',
  'blog/ai-voice-agents-reduce-missed-calls-no-shows.html',
  'blog/d2c-whatsapp-order-support-automation.html',
  'blog/instagram-dm-automation-salons-guide.html',
  'blog/ai-chatbot-vs-hiring-staff-cost-comparison.html',
];
const VERCEL_JSON = path.join(ROOT, 'vercel.json');

function extractInlineScripts(html) {
  const scripts = [];
  const re = /<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1] || '';
    if (/\bsrc\s*=/i.test(attrs)) continue; // external script, no hash needed
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) continue; // inert data
    scripts.push(m[2]);
  }
  return scripts;
}

function sha256Base64(content) {
  return crypto.createHash('sha256').update(content, 'utf8').digest('base64');
}

const hashes = new Set();
for (const page of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  for (const script of extractInlineScripts(html)) {
    hashes.add(`'sha256-${sha256Base64(script)}'`);
  }
}

const sortedHashes = Array.from(hashes).sort();

const vercelConfig = JSON.parse(fs.readFileSync(VERCEL_JSON, 'utf8'));
const headerRule = vercelConfig.headers.find((h) => h.source === '/(.*)');
const cspHeader = headerRule.headers.find((h) => h.key === 'Content-Security-Policy');

const scriptSrcRe = /script-src [^;]*;/;
const newScriptSrc = `script-src 'self' 'wasm-unsafe-eval' blob: ${sortedHashes.join(' ')} https://esm.sh https://www.googletagmanager.com https://*.daily.co;`;

if (!scriptSrcRe.test(cspHeader.value)) {
  throw new Error('Could not find script-src directive in vercel.json CSP header');
}
cspHeader.value = cspHeader.value.replace(scriptSrcRe, newScriptSrc);

fs.writeFileSync(VERCEL_JSON, JSON.stringify(vercelConfig, null, 2) + '\n');

console.log(`Computed ${sortedHashes.length} inline script hash(es) across ${PAGES.length} pages.`);
console.log('vercel.json script-src updated.');
