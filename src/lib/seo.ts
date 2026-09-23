export type JsonLd = Record<string, unknown>;

export const SITE_URL = new URL('https://bytesoc.dev');
export const SITE_NAME = 'BYTE MAIT';
export const ORGANIZATION_ID = `${SITE_URL.href}#organization`;
export const WEBSITE_ID = `${SITE_URL.href}#website`;
export const MAIT_ID = 'https://www.mait.ac.in/#organization';

export const DEFAULT_DESCRIPTION =
  'BYTE MAIT is the official technology society of Maharaja Agrasen Institute of Technology, Delhi, building projects across software, AI/ML, robotics, and research.';

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
