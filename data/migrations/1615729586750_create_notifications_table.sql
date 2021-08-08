-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  title VARCHAR (100) NOT NULL,
  description TEXT NULL DEFAULT NULL,
  class SMALLINT NULL DEFAULT NULL,
  is_read BOOL NULL,
  is_published BOOL NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX notifications_index ON public.notifications (user_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.notifications
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.notifications;
DROP INDEX IF EXISTS notifications_index;
DROP TABLE IF EXISTS public.notifications;
