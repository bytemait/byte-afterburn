// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';
import { readdirSync } from 'node:fs';

const projectSlugs = readdirSync(new URL('./src/content/projects/', import.meta.url))
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.replace(/\.md$/, ''));
const nonCanonicalPaths = new Set([
  '/members/pratham-gupta/',
  ...projectSlugs.map((slug) => `/works/${slug}/`),
]);

// https://astro.build/config
export default defineConfig({
  site: 'https://bytesoc.dev',

  server: {
    host: '0.0.0.0'
  },

  integrations: [
    react(),
    sitemap({
      filter: (page) => !nonCanonicalPaths.has(new URL(page).pathname),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});