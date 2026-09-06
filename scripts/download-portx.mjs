import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const origin = 'https://portx.framer.ai';
const root = path.resolve('reference/portx');
await fs.mkdir(root, { recursive: true });
const records = new Map(), skipped = new Set(), routes = new Set([origin + '/']);
const queue = new Set(), processed = new Set();
const pending = new Set();
const imagePattern = /\.(?:png|jpe?g|webp|gif|svg|ico|avif|bmp)(?:[?#]|$)/i;
const assetPattern = /\.(?:m?js|css|woff2?|ttf|otf|eot|map|json|wasm|mp4|webm|mp3|ogg)(?:[?#]|$)/i;
function resolve(raw, base) {
 try { const u = new URL(raw.replaceAll('&amp;', '&'), base); u.hash = ''; return /^https?:$/.test(u.protocol) ? u.href : null; } catch { return null; }
}
function enqueue(raw, base) {
 const url = resolve(raw, base);
 if (!url) return;
 const host = new URL(url).hostname;
 if (!['portx.framer.ai','framerusercontent.com','framerusercontent.dev','app.framerstatic.com','fonts.gstatic.com','fonts.googleapis.com','www.gstatic.com','www.google.com','framer.com','framer.github.io'].includes(host)) return;
 if (imagePattern.test(url)) { skipped.add(url); return; }
 if (assetPattern.test(url) && !processed.has(url)) queue.add(url);
}
function discover(text, url) {
 for (const m of text.matchAll(/(?:https?:)?\/\/[^\s"'`<>\\)]+/g)) enqueue(m[0], url);
 for (const m of text.matchAll(/(?:from\s*|import\s*\(?|export[^;]*?from\s*)["']([^"']+)["']/g)) enqueue(m[1], url);
 for (const m of text.matchAll(/["']((?:\.\.?\/|\/)[^"'\s]+\.(?:m?js|css|woff2?|ttf|otf|map|json|wasm)(?:\?[^"']*)?)["']/g)) enqueue(m[1], url);
 for (const m of text.matchAll(/url\(\s*["']?([^\s)'";]+)["']?\s*\)/g)) enqueue(m[1], url);
 for (const m of text.matchAll(/sourceMappingURL\s*=\s*([^\s*]+)/g)) enqueue(m[1], url);
}
async function save(url, body, type, status, headers = {}) {
 if (records.get(url)?.file) return;
 if (type.startsWith('image/') || imagePattern.test(url)) { skipped.add(url); return; }
 const u = new URL(url);
 let file = path.join('files', u.hostname, decodeURIComponent(u.pathname).replace(/^\/+/, '') || '');
 if (u.pathname.endsWith('/')) file = path.join(file, 'index.html');
 if (!path.extname(file)) file += type.includes('html') ? '.html' : '.bin';
 if (u.search) { const ext = path.extname(file); file = file.slice(0, -ext.length) + '--' + crypto.createHash('sha256').update(u.search).digest('hex').slice(0, 10) + ext; }
 const destination = path.resolve(root, file);
 if (!destination.startsWith(root + path.sep)) return;
 await fs.mkdir(path.dirname(destination), { recursive: true });
 await fs.writeFile(destination, body);
 records.set(url, { url, file, status, contentType: type, bytes: body.length, sha256: crypto.createHash('sha256').update(body).digest('hex') });
 if (!u.pathname.endsWith('.map') && (/javascript|text\/css|text\/html/.test(type) || /\.(?:m?js|css|html)$/.test(u.pathname))) discover(body.toString(), url);
 for (const h of ['sourcemap', 'x-sourcemap']) if (headers[h]) enqueue(headers[h], url);
}
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || '/root/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await context.route('**/*', async route => {
 if (route.request().resourceType() === 'image' || imagePattern.test(route.request().url())) { skipped.add(route.request().url()); await route.abort(); }
 else await route.continue();
});
context.on('response', response => {
 const url = response.url(), type = response.headers()['content-type'] || '';
 if (!/^https?:/.test(url) || /image\//.test(type)) return;
 if (!['document', 'script', 'stylesheet', 'font', 'media'].includes(response.request().resourceType()) && !assetPattern.test(url)) return;
 const task = (async () => {
  try { if (response.ok()) await save(url, await response.body(), type, response.status(), response.headers()); else records.set(url, { url, status: response.status(), error: response.statusText() }); }
  catch (e) { if (!records.has(url)) records.set(url, { url, error: e.message }); }
 })(); pending.add(task); task.finally(() => pending.delete(task));
});
const visited = new Set();
for (const route of routes) {
 if (visited.has(route)) continue;
 visited.add(route); console.log('Page:', route);
 const page = await context.newPage();
 try {
  await page.goto(route, { waitUntil: 'networkidle', timeout: 45000 });
  await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 850) { scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } scrollTo(0, 0); });
  const links = await page.locator('a[href]').evaluateAll(as => as.map(a => a.href));
  for (const link of links) { const u = new URL(link); if (u.origin === origin && !assetPattern.test(u.href) && !imagePattern.test(u.href)) { u.hash = ''; u.search = ''; routes.add(u.href); } }
  const markup = await page.content();
  const name = new URL(route).pathname.replace(/\W+/g, '_') || 'home';
  await fs.mkdir(path.join(root, 'rendered'), { recursive: true });
  await fs.writeFile(path.join(root, 'rendered', name + '.html'), markup);
  const styles = await page.locator('style').allTextContents();
  await fs.writeFile(path.join(root, 'rendered', name + '.inline.css'), styles.join('\n\n'));
  const refs = await page.locator('script[src],link[href]').evaluateAll(es => es.map(e => e.src || e.href));
  refs.forEach(ref => enqueue(ref, route));
  if (new URL(route).pathname === '/') {
   for (const width of [1024, 390]) { await page.setViewportSize({ width, height: 900 }); await page.waitForTimeout(350); }
   const buttons = page.locator('button');
   for (let i = 0; i < await buttons.count(); i++) { const button = buttons.nth(i); const text = await button.innerText().catch(() => ''); if (/monthly|yearly|menu/i.test(text + ' ' + (await button.getAttribute('aria-label') || ''))) await button.click({ timeout: 1500 }).catch(() => {}); }
   const hoverables = page.locator('a').filter({ hasText: /BRANDING|UI\/UX|FRAMER|ANIMATION/ });
   for (let i = 0; i < Math.min(await hoverables.count(), 10); i++) await hoverables.nth(i).hover({ timeout: 1500 }).catch(() => {});
  }
 } catch (e) { records.set('page:' + route, { url: route, error: e.message }); }
 await page.close();
}
await Promise.allSettled([...pending]);
await browser.close();
async function fetchAsset(url, optional = false) {
 if (processed.has(url) || records.get(url)?.file) return;
 processed.add(url);
 try {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) { records.set(url, { url, status: response.status, optional, error: response.statusText }); return; }
  await save(url, Buffer.from(await response.arrayBuffer()), response.headers.get('content-type') || '', response.status, Object.fromEntries(response.headers));
 } catch (e) { records.set(url, { url, optional, error: e.message }); }
}
while (queue.size) {
 const batch = [...queue].slice(0, 8); batch.forEach(u => queue.delete(u));
 await Promise.all(batch.map(u => fetchAsset(u))); console.log('Assets saved:', [...records.values()].filter(r => r.file).length, 'queued:', queue.size);
}
// Probe standard map companions only after explicit dependencies have been collected.
const scripts = [...records.values()].filter(r => r.file && /\.(?:m?js|css)(?:\?|$)/.test(r.url));
for (let i = 0; i < scripts.length; i += 8) await Promise.all(scripts.slice(i, i + 8).map(r => { const u = new URL(r.url); u.pathname += '.map'; return fetchAsset(u.href, true); }));
while (queue.size) { const batch = [...queue].slice(0, 8); batch.forEach(u => queue.delete(u)); await Promise.all(batch.map(u => fetchAsset(u))); }
const result = { source: origin, capturedAt: new Date().toISOString(), pages: [...visited], excludedImages: skipped.size, records: [...records.values()] };
await fs.writeFile(path.join(root, 'manifest.json'), JSON.stringify(result, null, 2));
await fs.writeFile(path.join(root, 'excluded-images.json'), JSON.stringify([...skipped], null, 2));
const saved = result.records.filter(r => r.file);
const summary = { pages: visited.size, files: saved.length, bytes: saved.reduce((n,r) => n+r.bytes,0), sourceMaps: saved.filter(r=>r.file.endsWith('.map')).length, failed: result.records.filter(r=>!r.file).length, excludedImages: skipped.size };
await fs.writeFile(path.join(root, 'summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
