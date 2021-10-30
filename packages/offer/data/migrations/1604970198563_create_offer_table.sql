-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.offer (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  employer_organization_id UUID NULL,
  employer_id UUID NULL,
  is_accepted BOOL NOT NULL DEFAULT false,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_offer_user_id ON public.offer (user_id);
CREATE INDEX ix_offer_employer_organization_id ON public.offer (employer_organization_id);
CREATE INDEX ix_offer_employer_id ON public.offer (employer_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.offer
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.offer;
DROP INDEX IF EXISTS ix_offer_employer_id;
DROP INDEX IF EXISTS ix_offer_employer_organization_id;
DROP INDEX IF EXISTS ix_offer_user_id;
DROP TABLE IF EXISTS public.offer;
