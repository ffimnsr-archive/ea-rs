-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  title VARCHAR (100) NOT NULL,
  location TEXT NULL DEFAULT NULL,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT NULL DEFAULT NULL,
  is_all_day BOOL NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT events_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX events_index ON public.events (user_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.events;
DROP INDEX IF EXISTS events_index;
DROP TABLE IF EXISTS public.events;
