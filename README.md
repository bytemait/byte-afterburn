# Byte Afterburn

Byte Afterburn is the website for BYTE, a student-led technology society. It presents the society’s work, events, departments, members, testimonials, and ways to get involved through an interactive visual experience built around an animated node mesh.

## Stack

- [Astro](https://astro.build/) for the site and static route generation
- React for interactive sections and client-side motion
- Tailwind CSS through Vite
- Cloudflare adapter for production deployment

## Project structure

```text
src/
├── components/
│   ├── common/       Shared navigation, footer, transitions, mesh, and showcase UI
│   ├── events/       Event detail components
│   └── home/         Home page sections and interactions
├── data/             Event and work/service content
├── layouts/          Shared document layout
├── pages/            Home, members, events, works, services, and contact routes
└── styles/           Global and page-specific styles
public/               Images, portraits, fonts, and other static assets
```

The home page is [`src/pages/index.astro`](src/pages/index.astro). Work and service detail pages use the reusable showcase template and data in [`src/data/showcase-pages.ts`](src/data/showcase-pages.ts). Shared components live in [`src/components/common`](src/components/common), while home-only components live in [`src/components/home`](src/components/home).

## Development

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

The development server is configured to listen on `0.0.0.0`. To choose a port, pass Astro’s usual flags, for example `npm run dev -- --port 4321`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate the production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run generate-types` | Generate Cloudflare types with Wrangler |
| `npm run astro ...` | Run an Astro CLI command |

## Deployment

The site uses `@astrojs/cloudflare` and is configured for Cloudflare deployment. Run `npm run build` before publishing to verify that all routes and assets generate correctly.
