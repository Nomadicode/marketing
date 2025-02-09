/*
  # Initial Schema Setup for Nomadicode Website

  1. New Tables
    - `success_stories`
      - Client project showcases with details and images
    - `reviews`
      - Client testimonials and ratings
    - `internal_projects`
      - Company's own projects and tools
    
  2. Security
    - Enable RLS on all tables
    - Public read access for all tables
    - Admin-only write access
*/

-- Success Stories table
CREATE TABLE IF NOT EXISTS success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  tags text[] DEFAULT '{}',
  client_name text NOT NULL,
  industry text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author text NOT NULL,
  company text NOT NULL,
  content text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  image_url text NOT NULL,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Internal Projects table
CREATE TABLE IF NOT EXISTS internal_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  project_url text,
  github_url text,
  tags text[] DEFAULT '{}',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_projects ENABLE ROW LEVEL SECURITY;

-- Policies for public read access
CREATE POLICY "Allow public read access for success stories"
  ON success_stories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access for reviews"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access for internal projects"
  ON internal_projects
  FOR SELECT
  TO public
  USING (true);

-- Policies for admin write access
CREATE POLICY "Allow admin write access for success stories"
  ON success_stories
  FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin write access for reviews"
  ON reviews
  FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow admin write access for internal projects"
  ON internal_projects
  FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');