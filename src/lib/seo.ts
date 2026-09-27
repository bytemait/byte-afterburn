export type JsonLd = Record<string, unknown>;

export const SITE_URL = new URL('https://bytesoc.dev');
export const SITE_NAME = 'BYTE MAIT';
export const ORGANIZATION_ID = `${SITE_URL.href}#organization`;
export const WEBSITE_ID = `${SITE_URL.href}#website`;
export const MAIT_ID = 'https://www.mait.ac.in/#organization';

export const DEFAULT_DESCRIPTION =
  'We’re BYTE, the technical society at MAIT for people who want to make things happen. We build projects, explore research, host & participate in hackathons, and create space for students to learn with one another. Whether it starts with code, a circuit, a design, or a wild idea, we turn curiosity into work that matters!';

export const DEFAULT_SOCIAL_IMAGE = '/og-image.webp';
export const DEFAULT_SOCIAL_IMAGE_ALT = 'BYTE MAIT members at Maharaja Agrasen Institute of Technology';

export const absoluteUrl = (path: string) => new URL(path, SITE_URL).href;

export const toMetaDescription = (value: string, maxLength = 160) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  const shortened = normalized.slice(0, maxLength - 1).replace(/\s+\S*$/, '');
  return `${shortened}…`;
};

export const breadcrumbJsonLd = (
  items: Array<{ name: string; path: string }>,
): JsonLd => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
