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
├── content/          Astro Content Collections (member/project/event files + yaml)
├── content.config.ts Collection schemas and Zod validation
├── layouts/          Shared document layout
├── pages/            Home, members, events, works, services, and contact routes
└── styles/           Global and page-specific styles
templates/            Starter .md/.yaml files for authoring new collection entries
scripts/              Content migration and hydration tools
public/               Images, portraits, fonts, and other static assets
```

The home page is [`src/pages/index.astro`](src/pages/index.astro). Work and service detail pages use the reusable showcase template and data in [`src/data/showcase-pages.ts`](src/data/showcase-pages.ts). Shared components live in [`src/components/common`](src/components/common), while home-only components live in [`src/components/home`](src/components/home).

## Content collections

Site content lives in Astro Content Collections defined in `src/content.config.ts`:

| Collection | Format | Location |
| --- | --- | --- |
| members | One Markdown file per member | `src/content/members/` |
| projects | One Markdown file per project | `src/content/projects/` |
| events | One Markdown file per event | `src/content/events/` |
| achievements | Single YAML list | `src/content/achievements.yaml` |
| groups | Single YAML list | `src/content/groups.yaml` |

- The filename of a member/project/event file becomes its URL slug.
- Relationships use collection references by id (for example a member's `projects:` list).
- Dates are ISO strings (`date: "2026-11-20"`) and upcoming/past state is computed; there is no manual `isUpcoming` flag.
- The schema rejects unknown fields and validates URLs, dates, and references during `astro build`.
- Starter templates for each collection are in [`templates/`](templates/).

### Hydrating member data from bytely

The BYTE member dossier app (`bytely.nyahost.in`) records member-supplied data. To pull it into the member collection:

```sh
# Credentials — never commit these. Copy .env.example to .env and fill in.
cp .env.example .env

# Dry run: shows what would change without touching files
node scripts/hydrate-from-bytely.mjs

# Apply the changes to src/content/members/
node scripts/hydrate-from-bytely.mjs --apply

# Include draft dossiers (off by default)
node scripts/hydrate-from-bytely.mjs --apply --include-drafts
```

The script is idempotent: only previously-empty fields are filled, never overwritten, and duplicate dossiers are resolved by content richness, status priority, then recency.

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
