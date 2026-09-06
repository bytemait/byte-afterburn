import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 4323;
const HOST = '0.0.0.0';
const baseDir = path.resolve('reference/portx/files');
const siteDir = path.join(baseDir, 'portx.framer.ai');
const renderedDir = path.resolve('reference/portx/rendered');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  let filePath = null;

  if (pathname === '/' || pathname === '/index.html') {
    const p1 = path.join(siteDir, 'index.html', 'index.html');
    const p2 = path.join(renderedDir, '_.html');
    filePath = fs.existsSync(p1) ? p1 : p2;
  } else if (pathname.startsWith('/framerusercontent.com/')) {
    filePath = path.join(baseDir, pathname);
  } else if (pathname.startsWith('/app.framerstatic.com/')) {
    filePath = path.join(baseDir, pathname);
  } else {
    // Try siteDir directly
    let candidate = path.join(siteDir, pathname);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      filePath = candidate;
    } else if (fs.existsSync(candidate + '.html')) {
      filePath = candidate + '.html';
    } else if (fs.existsSync(path.join(candidate, 'index.html'))) {
      filePath = path.join(candidate, 'index.html');
    } else {
      // Try baseDir
      let alt = path.join(baseDir, pathname);
      if (fs.existsSync(alt) && fs.statSync(alt).isFile()) {
        filePath = alt;
      }
    }
  }

  if (!filePath || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`File not found: ${pathname}`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(`Read error: ${err.message}`);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Portx mirror server running at http://${HOST}:${PORT}`);
});
