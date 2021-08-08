-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  employer_organization_id UUID NULL,
  employer_id UUID NULL,
  is_accepted BOOL NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT offers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT offers_employer_organization_id_fkey FOREIGN KEY (employer_organization_id) REFERENCES public.organizations (id) ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT offers_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX offers_index ON public.offers (user_id, employer_organization_id, employer_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.offers
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.offers;
DROP INDEX IF EXISTS offers_index;
DROP TABLE IF EXISTS public.offers;
