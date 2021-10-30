-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.project_clue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NULL,
  requirements TEXT NULL DEFAULT NULL,
  environments TEXT NULL DEFAULT NULL,
  repository_http_url TEXT NULL DEFAULT NULL,
  repository_ssh_url TEXT NULL DEFAULT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_project_clue_project_id ON public.project_clue (project_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.project_clue
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.project_clue;
DROP INDEX IF EXISTS ix_project_clue_project_id;
DROP TABLE IF EXISTS public.project_clue;
