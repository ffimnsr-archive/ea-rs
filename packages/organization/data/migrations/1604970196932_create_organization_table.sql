-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.organization (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR (100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  managed_by_id UUID NOT NULL,
  created_by_id UUID NOT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_organization_created_by_id_managed_by_id ON public.organization (created_by_id, managed_by_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.organization
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.organization;
DROP INDEX IF EXISTS ix_organization_created_by_id_managed_by_id;
DROP TABLE IF EXISTS public.organization;
