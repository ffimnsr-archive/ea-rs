-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR (100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  managed_by_id UUID NULL,
  created_by_id UUID NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT organizations_managed_by_id_fkey FOREIGN KEY (managed_by_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT organizations_created_by_id_fkey FOREIGN KEY (created_by_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX organizations_index ON public.organizations (created_by_id, managed_by_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.organizations
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.organizations;
DROP INDEX IF EXISTS organizations_index;
DROP TABLE IF EXISTS public.organizations;
