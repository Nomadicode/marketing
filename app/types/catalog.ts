export const catalogIconKeys = [
  'box',
  'gift',
  'layout-dashboard',
  'building-2',
  'briefcase-business',
  'sparkles',
] as const;

export type CatalogIconKey = (typeof catalogIconKeys)[number];
export type CatalogLinkType = 'internal' | 'external';
export type CatalogStatus = 'active' | 'coming_soon';

export type CatalogEntry = {
  slug: string;
  name: string;
  description: string | null;
  href: string | null;
  linkType: CatalogLinkType;
  iconKey: CatalogIconKey;
  iconUrl: string | null;
  status: CatalogStatus;
};
