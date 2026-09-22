import { createClient } from '@supabase/supabase-js';
import {
  catalogIconKeys,
  type CatalogEntry,
  type CatalogIconKey,
  type CatalogLinkType,
  type CatalogStatus,
} from '@/app/types/catalog';
import type { CaseStudy } from '@/app/types/case-study';

type ProductRow = {
  slug: string;
  name: string;
  description: string | null;
  href: string | null;
  link_type: CatalogLinkType;
  icon_key: CatalogIconKey;
  icon_url: string | null;
  status: CatalogStatus;
};

type ClientRow = {
  slug: string;
  name: string;
  description: string | null;
  website_url: string | null;
  icon_key: CatalogIconKey;
  icon_url: string | null;
};

function isCatalogIconKey(value: unknown): value is CatalogIconKey {
  return (
    typeof value === 'string' &&
    catalogIconKeys.includes(value as CatalogIconKey)
  );
}

function isCatalogLinkType(value: unknown): value is CatalogLinkType {
  return value === 'internal' || value === 'external';
}

function isCatalogStatus(value: unknown): value is CatalogStatus {
  return value === 'active' || value === 'coming_soon';
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

function isProductRow(value: unknown): value is ProductRow {
  if (!value || typeof value !== 'object') return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.slug === 'string' &&
    typeof row.name === 'string' &&
    isNullableString(row.description) &&
    isNullableString(row.href) &&
    isCatalogLinkType(row.link_type) &&
    isCatalogIconKey(row.icon_key) &&
    isNullableString(row.icon_url) &&
    isCatalogStatus(row.status)
  );
}

type CaseStudyRow = {
  slug: string;
  name: string;
  tag: string | null;
  blurb: string | null;
  summary: string | null;
  started: string | null;
  discovered: string | null;
  did: string | null;
  went: string | null;
  next_step: string | null;
  technical: string | null;
  image_url: string | null;
  project_url: string | null;
};

function isCaseStudyRow(value: unknown): value is CaseStudyRow {
  if (!value || typeof value !== 'object') return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.slug === 'string' &&
    typeof row.name === 'string' &&
    isNullableString(row.tag) &&
    isNullableString(row.blurb) &&
    isNullableString(row.summary) &&
    isNullableString(row.started) &&
    isNullableString(row.discovered) &&
    isNullableString(row.did) &&
    isNullableString(row.went) &&
    isNullableString(row.next_step) &&
    isNullableString(row.technical) &&
    isNullableString(row.image_url) &&
    isNullableString(row.project_url)
  );
}

function isClientRow(value: unknown): value is ClientRow {
  if (!value || typeof value !== 'object') return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.slug === 'string' &&
    typeof row.name === 'string' &&
    isNullableString(row.description) &&
    isNullableString(row.website_url) &&
    isCatalogIconKey(row.icon_key) &&
    isNullableString(row.icon_url)
  );
}

function getCatalogClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function getPublishedProducts(): Promise<CatalogEntry[]> {
  const supabase = getCatalogClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('products')
    .select(
      'slug, name, description, href, link_type, icon_key, icon_url, status',
    )
    .eq('is_published', true)
    .order('sort_order')
    .order('name');

  if (error) throw new Error(`Unable to load products: ${error.message}`);
  if (!Array.isArray(data)) {
    throw new Error('The product catalog returned an invalid record.');
  }
  const products = data.filter(isProductRow);
  if (products.length !== data.length) {
    throw new Error('The product catalog returned an invalid record.');
  }

  return products.map((product) => ({
    slug: product.slug,
    name: product.name,
    description: product.description,
    href: product.href,
    linkType: product.link_type,
    iconKey: product.icon_key,
    iconUrl: product.icon_url,
    status: product.status,
  }));
}

export async function getPublishedClients(): Promise<CatalogEntry[]> {
  const supabase = getCatalogClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('clients')
    .select('slug, name, description, website_url, icon_key, icon_url')
    .eq('is_published', true)
    .order('sort_order')
    .order('name');

  if (error) throw new Error(`Unable to load clients: ${error.message}`);
  if (!Array.isArray(data)) {
    throw new Error('The client catalog returned an invalid record.');
  }
  const clients = data.filter(isClientRow);
  if (clients.length !== data.length) {
    throw new Error('The client catalog returned an invalid record.');
  }

  return clients.map((client) => ({
    slug: client.slug,
    name: client.name,
    description: client.description,
    href: client.website_url,
    linkType: 'external',
    iconKey: client.icon_key,
    iconUrl: client.icon_url,
    status: 'active',
  }));
}

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  const supabase = getCatalogClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('case_studies')
    .select(
      'slug, name, tag, blurb, summary, started, discovered, did, went, next_step, technical, image_url, project_url',
    )
    .eq('is_published', true)
    .order('sort_order')
    .order('name');

  if (error) throw new Error(`Unable to load case studies: ${error.message}`);
  if (!Array.isArray(data)) {
    throw new Error('The case study catalog returned an invalid record.');
  }
  const caseStudies = data.filter(isCaseStudyRow);
  if (caseStudies.length !== data.length) {
    throw new Error('The case study catalog returned an invalid record.');
  }

  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
    name: caseStudy.name,
    tag: caseStudy.tag,
    blurb: caseStudy.blurb,
    summary: caseStudy.summary,
    started: caseStudy.started,
    discovered: caseStudy.discovered,
    did: caseStudy.did,
    went: caseStudy.went,
    nextStep: caseStudy.next_step,
    technical: caseStudy.technical,
    imageUrl: caseStudy.image_url,
    projectUrl: caseStudy.project_url,
  }));
}
