-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.project_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  project_id UUID NULL,
  work_function_id UUID NULL,
  start_date DATE NULL DEFAULT NULL,
  end_date DATE NULL DEFAULT NULL,
  status SMALLINT NULL DEFAULT NULL,
  remarks TEXT NULL DEFAULT NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT project_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT project_members_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects (id) ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT project_members_work_function_id_fkey FOREIGN KEY (work_function_id) REFERENCES public.work_functions (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX project_members_index ON public.project_members (user_id, project_id, work_function_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.project_members
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.project_members;
DROP INDEX IF EXISTS project_members_index;
DROP TABLE IF EXISTS public.project_members;
