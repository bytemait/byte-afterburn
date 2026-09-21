/**
 * Maps technology names (as used in projects.ts) to Devicons CDN SVG URLs.
 * Returns null when no icon is available — callers should show a fallback.
 */

const BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const techLogos: Record<string, string> = {
  'Python':               `${BASE}/python/python-original.svg`,
  'JavaScript':           `${BASE}/javascript/javascript-original.svg`,
  'TypeScript':           `${BASE}/typescript/typescript-original.svg`,
  'React':                `${BASE}/react/react-original.svg`,
  'React Native':         `${BASE}/react/react-original.svg`,
  'Node.js':              `${BASE}/nodejs/nodejs-original.svg`,
  'Arduino':              `${BASE}/arduino/arduino-original.svg`,
  'C++':                  `${BASE}/cplusplus/cplusplus-original.svg`,
  'C/C++':                `${BASE}/cplusplus/cplusplus-original.svg`,
  'C':                    `${BASE}/c/c-original.svg`,
  'TensorFlow':           `${BASE}/tensorflow/tensorflow-original.svg`,
  'PyTorch':              `${BASE}/pytorch/pytorch-original.svg`,
  'Pandas':               `${BASE}/pandas/pandas-original.svg`,
  'OpenCV':               `${BASE}/opencv/opencv-original.svg`,
  'Flutter':              `${BASE}/flutter/flutter-original.svg`,
  'Expo':                 `${BASE}/react/react-original.svg`,
  'Kotlin':               `${BASE}/kotlin/kotlin-original.svg`,
  'Kotlin / Swift':       `${BASE}/kotlin/kotlin-original.svg`,
  'Swift':                `${BASE}/swift/swift-original.svg`,
  'Supabase':             `${BASE}/supabase/supabase-original.svg`,
  'Supabase / Firebase':  `${BASE}/supabase/supabase-original.svg`,
  'Firebase':             `${BASE}/firebase/firebase-plain.svg`,
  'Astro':                `${BASE}/astro/astro-original.svg`,
  'Tailwind':             `${BASE}/tailwindcss/tailwindcss-original.svg`,
  'Raspberry Pi':         `${BASE}/raspberrypi/raspberrypi-original.svg`,
  'ROS':                  `${BASE}/ros/ros-original.svg`,
  'Linux':                `${BASE}/linux/linux-original.svg`,
  'Figma':                `${BASE}/figma/figma-original.svg`,
  'Canva':                `${BASE}/canva/canva-original.svg`,
  'Docker':               `${BASE}/docker/docker-original.svg`,
  'FastAPI':              `${BASE}/fastapi/fastapi-original.svg`,
  'Next.js':              `${BASE}/nextjs/nextjs-original.svg`,
  'Notion':               `${BASE}/notion/notion-original.svg`,
  'Git':                  `${BASE}/git/git-original.svg`,
  'GitHub':               `${BASE}/github/github-original.svg`,
  'Scrapy':               `${BASE}/python/python-original.svg`,
  'OpenAI API':           `${BASE}/openal/openal-original.svg`,
  'CAD':                  null as unknown as string,
  'Networking':           null as unknown as string,
  'PCB Design':           null as unknown as string,
  'Burp Suite':           null as unknown as string,
  'Wireshark':            null as unknown as string,
  'Community':            null as unknown as string,
  'Event Ops':            null as unknown as string,
  'Sponsorships':         null as unknown as string,
  'Content Creation':     null as unknown as string,
  'PR & Media':           null as unknown as string,
};

/**
 * Look up a technology logo URL.
 * Case-insensitive match against the map keys, with slash-split fallback.
 */
export function getTechLogo(name: string): string | null {
  if (!name) return null;

  // Exact match
  if (name in techLogos) return techLogos[name] ?? null;

  // Case-insensitive match
  const lower = name.toLowerCase().trim();
  for (const [key, url] of Object.entries(techLogos)) {
    if (key.toLowerCase() === lower) return url ?? null;
  }

  // If compound like "Kotlin / Swift", try first part
  if (name.includes('/')) {
    const parts = name.split('/').map((p) => p.trim());
    for (const part of parts) {
      const found = getTechLogo(part);
      if (found) return found;
    }
  }

  return null;
}
