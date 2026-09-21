#!/usr/bin/env node
// Rewrites every <lastmod> in sitemap.xml from the backing HTML file's real
// modification date, so crawlers see which pages actually changed instead of
// one uniform date. Run before deploying: `npm run build:sitemap`

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');
const SITE_ORIGIN = 'https://agentiq.co.in';

// cleanUrls is on in vercel.json, so "/pricing" is served from pricing.html
// and a directory path like "/blog" is served from blog/index.html.
function urlToFile(pageUrl) {
  const urlPath = pageUrl.replace(SITE_ORIGIN, '').replace(/\/$/, '');
  if (urlPath === '') return 'index.html';
  const dirIndex = path.join(urlPath.slice(1), 'index.html');
  if (fs.existsSync(path.join(ROOT, dirIndex))) return dirIndex;
  return `${urlPath.slice(1)}.html`;
}

function runGit(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
}

// Uncommitted edits are about to ship, so they count as modified today;
// otherwise use the date of the last commit that touched the file.
function lastModifiedDate(relativeFile) {
  const hasLocalChanges = runGit(['status', '--porcelain', '--', relativeFile]) !== '';
  if (hasLocalChanges) return new Date().toISOString().slice(0, 10);
  return runGit(['log', '-1', '--format=%cs', '--', relativeFile]);
}

function main() {
  const sitemapXml = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const missingFiles = [];

  const updatedXml = sitemapXml.replace(
    /<loc>([^<]+)<\/loc>(\s*)<lastmod>[^<]*<\/lastmod>/g,
    (fullMatch, pageUrl, whitespace) => {
      const relativeFile = urlToFile(pageUrl);
      if (!fs.existsSync(path.join(ROOT, relativeFile))) {
        missingFiles.push(`${pageUrl} -> ${relativeFile}`);
        return fullMatch;
      }
      const modifiedDate = lastModifiedDate(relativeFile);
      // A file that was never committed has no git date; keep the old value.
      if (!modifiedDate) return fullMatch;
      return `<loc>${pageUrl}</loc>${whitespace}<lastmod>${modifiedDate}</lastmod>`;
    }
  );

  fs.writeFileSync(SITEMAP_PATH, updatedXml);
  if (missingFiles.length > 0) {
    console.warn(`No backing file for ${missingFiles.length} URL(s):\n  ${missingFiles.join('\n  ')}`);
    process.exitCode = 1;
  }
  console.log('sitemap.xml lastmod values updated.');
}

try {
  main();
} catch (error) {
  console.error('Failed to update sitemap lastmod:', error.message);
  process.exit(1);
}
