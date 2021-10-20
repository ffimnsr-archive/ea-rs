-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.work_preference (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  work_function_id UUID NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_work_preference_user_id ON public.work_preference (user_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.work_preference
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.work_preference;
DROP INDEX IF EXISTS ix_work_preference_user_id;
DROP TABLE IF EXISTS public.work_preference;
