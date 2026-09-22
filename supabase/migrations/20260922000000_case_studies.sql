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
    'Genealogy & family history',
    'A genealogy tool that grew into a way to tell someone''s whole story.',
    'A tool for preserving family history, built on records that were often the only surviving copy of a family Bible.',
    'The owner wanted to add yearbook records to the platform.',
    'Yearbooks don''t just name people. They name classmates, friends, schools, and towns. That''s a different kind of information than a family tree normally captures.',
    'We treated the yearbook feature as a way to unlock relationships beyond family: communities, schools, and the places people moved through.',
    'The platform can now start telling a richer story of a life, not just a lineage.',
    'If we followed that thread further, it could start showing how communities and towns moved and changed together over time — not just who''s related, but who knew whom, and where.',
    NULL,
    NULL,
    NULL,
    true,
    10
  ),
  (
    'easygiftlists',
    'EasyGiftLists',
    'Consumer product',
    'A simple idea about gift lists, built and shipped.',
    'A simple idea about gift lists, taken from a sketch to something people actually use.',
    'A straightforward idea: make it easy to build and share a gift list.',
    'The simplest version of the idea was also the most useful one.',
    'Built and shipped it, keeping the experience as uncomplicated as the idea itself.',
    'A working product people can point friends and family to.',
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
    'Workflow & operations',
    'Understanding a workflow well enough to rebuild it.',
    'Understanding an existing workflow well enough to rebuild it properly.',
    'A process that had grown into something nobody fully trusted anymore.',
    'The real friction wasn''t where anyone initially pointed us.',
    'Rebuilt the parts that mattered, in an order that let the team keep working the whole time.',
    'A system the team actually relies on now.',
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
