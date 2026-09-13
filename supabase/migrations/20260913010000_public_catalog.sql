CREATE TYPE public.catalog_status AS ENUM ('active', 'coming_soon');
CREATE TYPE public.catalog_link_type AS ENUM ('internal', 'external');

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text NOT NULL CHECK (char_length(name) <= 100),
  description text CHECK (char_length(description) <= 280),
  href text,
  link_type public.catalog_link_type NOT NULL DEFAULT 'external',
  icon_key text NOT NULL DEFAULT 'box' CHECK (
    icon_key IN (
      'box',
      'gift',
      'layout-dashboard',
      'building-2',
      'briefcase-business',
      'sparkles'
    )
  ),
  icon_url text CHECK (
    icon_url IS NULL OR icon_url ~ '^(https://|/)'
  ),
  status public.catalog_status NOT NULL DEFAULT 'active',
  is_published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0 CHECK (sort_order >= 0),
  CONSTRAINT products_active_link_required CHECK (
    status = 'coming_soon' OR href IS NOT NULL
  ),
  CONSTRAINT products_href_format CHECK (
    href IS NULL OR (
      (link_type = 'internal' AND href ~ '^/') OR
      (link_type = 'external' AND href ~ '^https://')
    )
  )
);

CREATE TABLE public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text NOT NULL CHECK (char_length(name) <= 100),
  description text CHECK (char_length(description) <= 280),
  website_url text CHECK (
    website_url IS NULL OR website_url ~ '^https://'
  ),
  icon_key text NOT NULL DEFAULT 'building-2' CHECK (
    icon_key IN (
      'box',
      'gift',
      'layout-dashboard',
      'building-2',
      'briefcase-business',
      'sparkles'
    )
  ),
  icon_url text CHECK (
    icon_url IS NULL OR icon_url ~ '^(https://|/)'
  ),
  is_published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0 CHECK (sort_order >= 0)
);

CREATE INDEX products_public_display_order_idx
  ON public.products (sort_order, name)
  WHERE is_published = true;

CREATE INDEX clients_public_display_order_idx
  ON public.clients (sort_order, name)
  WHERE is_published = true;

CREATE FUNCTION public.set_catalog_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.set_catalog_updated_at();

CREATE TRIGGER clients_set_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.set_catalog_updated_at();

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.products, public.clients TO anon, authenticated;

CREATE POLICY "Published products are publicly readable"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Published clients are publicly readable"
  ON public.clients
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

INSERT INTO public.products (
  slug,
  name,
  description,
  href,
  link_type,
  icon_key,
  icon_url,
  is_published,
  sort_order
)
VALUES
  (
    'flowdek',
    'FlowDek',
    'Embedded estimates, scheduling, notifications, and reviews for service businesses.',
    '/flowdek',
    'internal',
    'layout-dashboard',
    '/flowdek-logo.svg',
    true,
    10
  ),
  (
    'easygiftlists',
    'EasyGiftLists',
    NULL,
    'https://easygiftlists.com',
    'external',
    'gift',
    NULL,
    true,
    20
  )
ON CONFLICT (slug) DO NOTHING;
