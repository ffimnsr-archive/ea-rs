-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.work_experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  title VARCHAR (100) NOT NULL,
  organization VARCHAR (200) NOT NULL,
  location VARCHAR (200) NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  description TEXT NULL DEFAULT NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT work_experiences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX work_experiences_index ON public.work_experiences (user_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.work_experiences
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.work_experiences;
DROP INDEX IF EXISTS work_experiences_index;
DROP TABLE IF EXISTS public.work_experiences;
