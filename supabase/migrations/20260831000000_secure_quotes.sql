-- Quotes are written only by the server-side API route using the Supabase service role.
-- Do not add an anon/authenticated insert policy: that would bypass server validation.
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public write access for quotes" ON public.quotes;
DROP POLICY IF EXISTS "Allow admin read access for quotes" ON public.quotes;

REVOKE ALL ON TABLE public.quotes FROM anon, authenticated;
