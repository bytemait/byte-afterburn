/**
 * Maps technology names (as used in projects.ts) to Devicons CDN SVG URLs.
 * Returns null when no icon is available — callers should show a fallback.
 */

const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const techLogos: Record<string, string> = {
  'Python':        `${BASE}/python/python-original.svg`,
  'JavaScript':    `${BASE}/javascript/javascript-original.svg`,
  'TypeScript':    `${BASE}/typescript/typescript-original.svg`,
  'React':         `${BASE}/react/react-original.svg`,
  'React Native':  `${BASE}/react/react-original.svg`,
  'Node.js':       `${BASE}/nodejs/nodejs-original.svg`,
  'Arduino':       `${BASE}/arduino/arduino-original.svg`,
  'C++':           `${BASE}/cplusplus/cplusplus-original.svg`,
  'TensorFlow':    `${BASE}/tensorflow/tensorflow-original.svg`,
  'Scrapy':        `${BASE}/python/python-original.svg`,      // Scrapy is Python-based
  'OpenAI API':    `${BASE}/openal/openal-original.svg`,       // closest available icon
  'CAD':           null as unknown as string,                   // no devicon
  'Networking':    null as unknown as string,                   // no devicon
};

/**
 * Look up a technology logo URL.
 * Case-insensitive match against the map keys.
 */
export function getTechLogo(name: string): string | null {
  // Try exact match first
  if (name in techLogos) return techLogos[name] ?? null;

  // Case-insensitive fallback
  const lower = name.toLowerCase();
  for (const [key, url] of Object.entries(techLogos)) {
    if (key.toLowerCase() === lower) return url ?? null;
  }

  return null;
}
