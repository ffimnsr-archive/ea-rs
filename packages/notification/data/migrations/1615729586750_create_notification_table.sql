-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.notification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  title VARCHAR (100) NOT NULL,
  description TEXT NULL DEFAULT NULL,
  class SMALLINT NULL DEFAULT NULL,
  is_read BOOL NOT NULL DEFAULT false,
  is_published BOOL NOT NULL DEFAULT false,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_notification_user_id ON public.notification (user_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.notification
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.notification;
DROP INDEX IF EXISTS ix_notification_user_id;
DROP TABLE IF EXISTS public.notification;
