-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.work_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  work_function_id UUID NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT work_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT work_preferences_work_function_id_fkey FOREIGN KEY (work_function_id) REFERENCES public.work_functions (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX work_preferences_index ON public.work_preferences (user_id, work_function_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.work_preferences
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.work_preferences;
DROP INDEX IF EXISTS work_preferences_index;
DROP TABLE IF EXISTS public.work_preferences;
