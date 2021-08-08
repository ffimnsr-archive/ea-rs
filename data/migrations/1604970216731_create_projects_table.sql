-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  public_code VARCHAR (50) UNIQUE NOT NULL,
  name VARCHAR (100) NOT NULL,
  description TEXT NOT NULL,
  parent_organization_id UUID NULL,
  managed_by_id UUID NULL,
  created_by_id UUID NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT projects_parent_organization_id_fkey FOREIGN KEY (parent_organization_id) REFERENCES public.organizations (id) ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT projects_managed_by_id_fkey FOREIGN KEY (managed_by_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT projects_created_by_id_fkey FOREIGN KEY (created_by_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX projects_index ON public.projects (parent_organization_id, managed_by_id, created_by_id);


CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.projects;
DROP INDEX IF EXISTS projects_index;
DROP TABLE IF EXISTS public.projects;
