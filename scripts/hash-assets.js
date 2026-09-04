#!/usr/bin/env node
// Content-hashes tailwind.min.css and agentiq-widgets.js for immutable caching,
// generates versioned copies (e.g. tailwind.<hash>.min.css), updates references
// across all HTML files, and cleans up prior versioned artifacts.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');

function getHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 8);
}

function getAllHtmlFiles(dir, relative = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const relPath = relative ? path.join(relative, file) : file;
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== '.claude-flow' && file !== 'react-widgets' && file !== '_archive') {
        results = results.concat(getAllHtmlFiles(filePath, relPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(relPath);
    }
  }
  return results;
}

function hashAssets() {
  const cssPath = path.join(ROOT, 'tailwind.min.css');
  const widgetsPath = path.join(ROOT, 'react-widgets', 'dist', 'agentiq-widgets.js');

  if (!fs.existsSync(cssPath)) {
    throw new Error(`CSS file not found at ${cssPath}. Run npm run build:css first.`);
  }
  if (!fs.existsSync(widgetsPath)) {
    throw new Error(`Widgets JS file not found at ${widgetsPath}. Run npm run build:widgets first.`);
  }

  const cssHash = getHash(cssPath);
  const jsHash = getHash(widgetsPath);

  const hashedCssName = `tailwind.${cssHash}.min.css`;
  const hashedJsName = `agentiq-widgets.${jsHash}.js`;

  const hashedCssPath = path.join(ROOT, hashedCssName);
  const hashedJsPath = path.join(ROOT, 'react-widgets', 'dist', hashedJsName);

  // Write versioned copies
  fs.copyFileSync(cssPath, hashedCssPath);
  fs.copyFileSync(widgetsPath, hashedJsPath);

  // Clean up prior versioned copies in root
  const rootFiles = fs.readdirSync(ROOT);
  for (const f of rootFiles) {
    if (/^tailwind\.[a-f0-9]{8}\.min\.css$/.test(f) && f !== hashedCssName) {
      fs.unlinkSync(path.join(ROOT, f));
      console.log(`Cleaned up old CSS asset: ${f}`);
    }
  }

  // Clean up prior versioned copies in react-widgets/dist
  const distDir = path.join(ROOT, 'react-widgets', 'dist');
  const distFiles = fs.readdirSync(distDir);
  for (const f of distFiles) {
    if (/^agentiq-widgets\.[a-f0-9]{8}\.js$/.test(f) && f !== hashedJsName) {
      fs.unlinkSync(path.join(distDir, f));
      console.log(`Cleaned up old JS asset: ${f}`);
    }
  }

  // Update references in all HTML files
  const htmlFiles = getAllHtmlFiles(ROOT);
  const cssRegex = /(['"])\/tailwind(?:\.[a-f0-9]{8})?\.min\.css\1/g;
  const jsRegex = /(['"])\/react-widgets\/dist\/agentiq-widgets(?:\.[a-f0-9]{8})?\.js\1/g;

  let updatedCount = 0;
  for (const relPath of htmlFiles) {
    const fullPath = path.join(ROOT, relPath);
    const original = fs.readFileSync(fullPath, 'utf8');
    let updated = original.replace(cssRegex, `$1/tailwind.${cssHash}.min.css$1`);
    updated = updated.replace(jsRegex, `$1/react-widgets/dist/agentiq-widgets.${jsHash}.js$1`);
    if (updated !== original) {
      fs.writeFileSync(fullPath, updated, 'utf8');
      updatedCount++;
    }
  }

  console.log(`Asset hashing complete:`);
  console.log(`  CSS: ${hashedCssName}`);
  console.log(`  JS:  ${hashedJsName}`);
  console.log(`Updated asset references in ${updatedCount} HTML files.`);
}

hashAssets();
