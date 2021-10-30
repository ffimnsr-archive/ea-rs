-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.project_member (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  project_id UUID NULL,
  work_function_id UUID NULL,
  start_date DATE NULL DEFAULT NULL,
  end_date DATE NULL DEFAULT NULL,
  status SMALLINT NULL DEFAULT NULL,
  remarks TEXT NULL DEFAULT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_project_member_user_id ON public.project_member (user_id);
CREATE INDEX ix_project_member_project_id ON public.project_member (project_id);
CREATE INDEX ix_project_member_work_function_id ON public.project_member (work_function_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.project_member
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.project_member;
DROP INDEX IF EXISTS ix_project_member_work_function_id;
DROP INDEX IF EXISTS ix_project_member_project_id;
DROP INDEX IF EXISTS ix_project_member_user_id;
DROP TABLE IF EXISTS public.project_member;
