-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.work_experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  title VARCHAR (100) NOT NULL,
  organization VARCHAR (200) NOT NULL,
  location VARCHAR (200) NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  description TEXT NULL DEFAULT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_work_experience_user_id ON public.work_experience (user_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.work_experience
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.work_experience;
DROP INDEX IF EXISTS ix_work_experience_user_id;
DROP TABLE IF EXISTS public.work_experience;
