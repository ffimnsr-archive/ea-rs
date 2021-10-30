-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.event (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  title VARCHAR (100) NOT NULL,
  location TEXT NULL DEFAULT NULL,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT NULL DEFAULT NULL,
  is_all_day BOOL NOT NULL DEFAULT false,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_event_user_id ON public.event (user_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.event
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.event;
DROP INDEX IF EXISTS ix_event_user_id;
DROP TABLE IF EXISTS public.event;
