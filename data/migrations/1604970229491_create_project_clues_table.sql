-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.project_clues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NULL,
  requirements TEXT NULL DEFAULT NULL,
  environments TEXT NULL DEFAULT NULL,
  repository_http_url TEXT NULL DEFAULT NULL,
  repository_ssh_url TEXT NULL DEFAULT NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT project_clues_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX project_clues_index ON public.project_clues (project_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.project_clues
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.project_clues;
DROP INDEX IF EXISTS project_clues_index;
DROP TABLE IF EXISTS public.project_clues;
