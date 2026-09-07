import fs from 'node:fs/promises';
import path from 'node:path';

const mapDir = path.resolve('reference/portx/files/framerusercontent.com/sites/5pGy6DlEOUjcmDWu0Lghg5');
const outDir = path.resolve('reference/portx/recovered-sources');
await fs.mkdir(outDir, { recursive: true });

const maps = (await fs.readdir(mapDir)).filter(name => name.endsWith('.map'));
const manifest = [];

for (const mapName of maps) {
  let map;
  try { map = JSON.parse(await fs.readFile(path.join(mapDir, mapName), 'utf8')); }
  catch { continue; }
  const sources = map.sources || [];
  const contents = map.sourcesContent || [];
  for (let index = 0; index < sources.length; index++) {
    const content = contents[index];
    if (typeof content !== 'string') continue;
    const source = sources[index];
    const normalized = source.replace(/^https:\//, 'https://');
    let rel;
    try {
      const parsed = new URL(normalized);
      rel = path.join(parsed.hostname, parsed.pathname.replace(/^\//, ''));
    } catch {
      rel = path.join('_relative', source.replace(/^\.?\//, '').replaceAll('..', '_up_'));
    }
    if (!path.extname(rel)) rel += '.js';
    const target = path.join(outDir, rel);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);
    manifest.push({ map: mapName, source, file: path.relative(outDir, target), bytes: Buffer.byteLength(content) });
  }
}

await fs.writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify({ maps: maps.length, extracted: manifest.length, bytes: manifest.reduce((n, x) => n + x.bytes, 0) }, null, 2));
