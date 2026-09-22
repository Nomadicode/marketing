CREATE TABLE public.case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  slug text NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text NOT NULL CHECK (char_length(name) <= 100),
  tag text CHECK (char_length(tag) <= 80),
  blurb text CHECK (char_length(blurb) <= 280),
  summary text CHECK (char_length(summary) <= 400),
  started text CHECK (char_length(started) <= 400),
  discovered text CHECK (char_length(discovered) <= 400),
  did text CHECK (char_length(did) <= 400),
  went text CHECK (char_length(went) <= 400),
  next_step text CHECK (char_length(next_step) <= 400),
  technical text CHECK (char_length(technical) <= 600),
  image_url text CHECK (
    image_url IS NULL OR image_url ~ '^(https://|/)'
  ),
  project_url text CHECK (
    project_url IS NULL OR project_url ~ '^https://'
  ),
  is_published boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0 CHECK (sort_order >= 0)
);

CREATE INDEX case_studies_public_display_order_idx
  ON public.case_studies (sort_order, name)
  WHERE is_published = true;

CREATE TRIGGER case_studies_set_updated_at
  BEFORE UPDATE ON public.case_studies
  FOR EACH ROW
  EXECUTE FUNCTION public.set_catalog_updated_at();

ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.case_studies TO anon, authenticated;

CREATE POLICY "Published case studies are publicly readable"
  ON public.case_studies
  FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

INSERT INTO public.case_studies (
  slug,
  name,
  tag,
  blurb,
  summary,
  started,
  discovered,
  did,
  went,
  next_step,
  technical,
  image_url,
  project_url,
  is_published,
  sort_order
)
VALUES
  (
    'bible-rescue',
    'Bible Rescue',
    'Website migration & nonprofit tools',
    'Moved Bible Rescue from WordPress to a modern website, then added tools for alerts and Bible submissions.',
    'Bible Rescue preserves and shares records from family Bibles. It needed a current website and clearer ways for people to stay informed and contribute records.',
    'The organization needed to move beyond its WordPress site while making it easier to collect Bible records from the people who find them.',
    'The website needed to support the work, not just describe it: visitors needed a direct path to submit a Bible record and receive updates.',
    'Rebuilt the Bible Rescue website, converted it from WordPress, and added an alert system and Bible intake form.',
    'A current website with clearer ways for people to follow the work and contribute Bible records.',
    NULL,
    NULL,
    NULL,
    'https://biblerescue.org',
    true,
    10
  ),
  (
    'easygiftlists',
    'EasyGiftLists',
    'Universal gift lists',
    'A gift-list app that keeps choices open across retailers.',
    'EasyGiftLists makes it simple to create and share a gift list with items from wherever they are found.',
    'Gift ideas rarely live at one retailer, but most registries and wish lists do.',
    'The useful version needed to keep the process simple without limiting where people could add items or shop.',
    'Built and launched a straightforward product for creating and sharing gift lists across retailers.',
    'A live product that gives friends and family more flexibility in how they find and buy gifts.',
    NULL,
    NULL,
    NULL,
    'https://easygiftlists.com',
    true,
    20
  ),
  (
    'nex',
    'Nex',
    'Local food ordering',
    'A food-ordering platform built around the realities of smaller Colombian communities.',
    'Nex explored a simpler way for local restaurants and their customers to manage food orders and delivery.',
    'Local food orders often depended on WhatsApp, calls, and someone being available to respond.',
    'A useful alternative had to work with local businesses and customers as they already operated, not assume the infrastructure of a large city.',
    'Built a digital ordering and delivery experience for local restaurants and their customers.',
    'A more direct path between local restaurants and customers, designed for smaller Colombian communities.',
    NULL,
    NULL,
    '/nex-icon.png',
    NULL,
    true,
    30
  ),
  (
    'travel-with-me',
    'Travel With Me',
    'Travel planning',
    'An idea for planning trips together, explored from concept toward something real.',
    'An idea for planning trips together, explored from concept toward something real.',
    'A concept for making group trip planning less chaotic.',
    'The hardest part of group travel isn''t the planning, it''s the deciding.',
    'Prototyped the pieces that address that directly.',
    'A clearer picture of what the product needs to be.',
    'Could grow into a way to actually help a group land on a plan, not just compare notes.',
    NULL,
    NULL,
    NULL,
    true,
    40
  ),
  (
    'ventur',
    'Ventur',
    'Early-stage product',
    'An early-stage idea we helped shape and build alongside its founder.',
    'An early-stage idea we helped shape and build alongside its founder.',
    'A founder with an idea and a rough sense of the problem.',
    'The version worth building was smaller than the original pitch.',
    'Built the smaller, sharper version first.',
    'A real product to test with real people.',
    NULL,
    NULL,
    NULL,
    NULL,
    true,
    50
  )
ON CONFLICT (slug) DO NOTHING;
