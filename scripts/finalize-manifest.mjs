import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve('reference/portx');
const filesDir = path.join(root, 'files');
const allowedHosts = new Set(['portx.framer.ai', 'framerusercontent.com', 'framerusercontent.dev', 'app.framerstatic.com', 'fonts.gstatic.com', 'fonts.googleapis.com', 'www.gstatic.com', 'www.google.com', 'framer.com', 'framer.github.io']);
const records = new Map();
const imagePattern = /\.(?:png|jpe?g|webp|gif|svg|ico|avif|bmp)(?:[?#]|$)/i;
const assetPattern = /\.(?:m?js|css|woff2?|ttf|otf|eot|map|json|wasm)(?:[?#]|$)/i;

async function walk(dir) {
 const entries = await fs.readdir(dir, { withFileTypes: true });
 for (const entry of entries) {
  const full = path.join(dir, entry.name);
  if (entry.isDirectory()) await walk(full);
  else if (entry.isFile()) {
   const rel = path.relative(root, full);
   const p = path.relative(filesDir, full).split(path.sep);
   const host = p[0];
   const pathname = '/' + p.slice(1).join('/');
   const stat = await fs.stat(full);
   const buf = await fs.readFile(full);
   records.set(`https://${host}${pathname}`, {
    url: `https://${host}${pathname}`,
    file: rel,
    status: 200,
    bytes: stat.size,
    sha256: crypto.createHash('sha256').update(buf).digest('hex')
   });
  }
 }
}

await walk(filesDir);

// Verify that all direct page modules, chunks, and corresponding maps have been retrieved.
const queue = new Set();
for (const [url, r] of records.entries()) {
 if (r.file.endsWith('.js') || r.file.endsWith('.mjs') || r.file.endsWith('.html') || r.file.endsWith('.css')) {
  const text = (await fs.readFile(path.join(root, r.file))).toString();
  for (const m of text.matchAll(/https:\/\/[a-zA-Z0-9.-]+[^\s"'`<>\\)]+/g)) {
   try {
    const u = new URL(m[0]);
    if (allowedHosts.has(u.hostname) && !imagePattern.test(u.pathname) && assetPattern.test(u.pathname)) {
     if (!records.has(u.href.split('#')[0])) queue.add(u.href.split('#')[0]);
    }
   } catch {}
  }
 }
}

async function fetchOne(url) {
 try {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) { records.set(url, { url, status: res.status, error: res.statusText }); return; }
  const buf = Buffer.from(await res.arrayBuffer());
  const u = new URL(url);
  let file = path.join('files', u.hostname, decodeURIComponent(u.pathname).replace(/^\/+/, ''));
  if (file.endsWith(path.sep) || !path.extname(file)) file += '.bin';
  const dest = path.join(root, file);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buf);
  records.set(url, { url, file, status: res.status, bytes: buf.length, sha256: crypto.createHash('sha256').update(buf).digest('hex') });
 } catch (e) { records.set(url, { url, error: e.message }); }
}

const list = [...queue];
for (let i = 0; i < list.length; i += 12) {
 await Promise.all(list.slice(i, i + 12).map(fetchOne));
}

const saved = [...records.values()].filter(r => r.file);
const maps = saved.filter(r => r.file.endsWith('.map'));
const js = saved.filter(r => /\.(?:m?js)$/.test(r.file));
const css = saved.filter(r => r.file.endsWith('.css'));
const fonts = saved.filter(r => /\.(?:woff2?|ttf|otf)$/.test(r.file));
const html = saved.filter(r => r.file.endsWith('.html'));

const summary = {
 totalSavedFiles: saved.length,
 totalBytes: saved.reduce((n, r) => n + r.bytes, 0),
 byType: {
  javaScript: js.length,
  css: css.length,
  sourceMaps: maps.length,
  fonts: fonts.length,
  html: html.length,
  other: saved.length - js.length - css.length - maps.length - fonts.length - html.length
 },
 failedOrMissing: [...records.values()].filter(r => !r.file).length
 };

await fs.writeFile(path.join(root, 'summary.json'), JSON.stringify(summary, null, 2));
await fs.writeFile(path.join(root, 'manifest.json'), JSON.stringify({ source: 'https://portx.framer.ai', capturedAt: new Date().toISOString(), summary, records: [...records.values()] }, null, 2));
console.log(JSON.stringify(summary, null, 2));
