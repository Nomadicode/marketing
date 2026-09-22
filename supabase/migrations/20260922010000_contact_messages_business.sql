ALTER TABLE public.contact_messages
  ADD COLUMN business text CHECK (char_length(business) <= 200);
