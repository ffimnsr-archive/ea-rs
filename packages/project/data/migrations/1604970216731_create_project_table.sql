-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.project (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  public_code VARCHAR (50) UNIQUE NOT NULL,
  name VARCHAR (100) NOT NULL,
  description TEXT NOT NULL,
  parent_organization_id UUID NULL,
  managed_by_id UUID NULL,
  created_by_id UUID NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_project_parent_organization_id ON public.project (parent_organization_id);
CREATE INDEX ix_project_managed_by_id ON public.project (managed_by_id);
CREATE INDEX ix_project_created_by_id ON public.project (created_by_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.project
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.project;
DROP INDEX IF EXISTS ix_project_parent_organization_id;
DROP INDEX IF EXISTS ix_project_managed_by_id;
DROP INDEX IF EXISTS ix_project_created_by_id;
DROP TABLE IF EXISTS public.project;
