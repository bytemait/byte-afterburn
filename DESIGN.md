# Portx landing page

## Scope and visual authority
The user supplied `inspo/snapshot.png`, a 1024 × 12662 full-page Portx reference. The landing route recreates that reference and its copy, rather than the former B.Y.T.E. landing design. Existing `/events` and `/members` pages remain unchanged. Reference copy, commercial claims, pricing, and external social destinations need owner confirmation before production use.

## Direction
An oversized two-line wordmark, asymmetric four-column portfolio, spacious service typography, sculptural about artwork, dimensional award rows, and a warm sunset footer. This is a reference-led recreation, not a new brand direction.

- Background: #101010
- Foreground: #ffffff
- Panel: #242424
- Secondary: #929292
- Accent: #ff4608
- Availability: #63d91c
- Typeface: self-hosted Clash Display, 400/600/700, for display and controls; Inter for body copy. Font files sourced from the live reference.
- Desktop page width: 90%, maximum 1600px.
- Project images: 15px corners. Action controls: thin white outlines and pill shapes.
- Mobile: reflowed project gallery, compact navigation, two-column testimonials, stacked pricing.

## Motion
GSAP provides the opening wordmark sequence, scroll-linked service images and highlighting, statistics count-up, testimonial drift, and footer orb movement. CSS supplies continuous seal/orbit rotation, the availability marquee, project hover states, and award depth. Reduced-motion preferences disable motion while retaining visible content.

The video was not inspected. A subsequent Playwright pass inspected https://portx.framer.ai at 1024px and 1440px, including the live service section. The hero typography and positions now follow measured live CSS. Motion remains a reconstruction rather than a copy of the Framer runtime.

## Assets and limitations
The original screenshot crops remain under `public/portx/` for reference, but the landing now uses live-site assets under `public/portx/original/`. `sources.json` records their Framer CDN origins. Raster images are optimized to WebP. The portrait WebP is extracted from the embedded image in the reference SVG. About and quote typography is now HTML, not baked into screenshots. Original logos, avatars, hero artwork, and the transparent seal replace stand-ins. Asset usage rights should be verified before publishing.

## Interactions
Project cards open accessible native dialogs with a preview and project description. Pricing switches between reference yearly prices and calculated monthly equivalents (yearly / 0.9, rounded); this is presentation only, not checkout. FAQ uses native details/summary. Contact and subscription links open email. CV links to the Google Drive destination exposed by the live reference. Social destinations are platform homepages until real profile URLs are supplied.

## Verification
Production Astro build succeeds. Browser checks at 1024px and 390px cover horizontal overflow, runtime errors, project dialog open/close, menu, billing toggle, and FAQ expansion. Desktop and mobile screenshots were reviewed and image sizing corrected.

## Live-reference improvement pass
Playwright compared the live reference and local route at desktop widths and tested the local mobile route at 390px. The 1440px wordmark uses 252px Clash Display with 188px lines, matching the reference. Tablet navigation and hero reflow follow the live 1024px layout. Original-source artwork replaces all rendered screenshot crops. Build and interaction tests pass with no runtime errors, missing images, or horizontal overflow.
