-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.activity_feed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  description TEXT NULL DEFAULT NULL,
  activity_type SMALLINT NULL DEFAULT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_activity_feed_user_id ON public.activity_feed (user_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.activity_feed
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.activity_feed;
DROP INDEX IF EXISTS ix_activity_feed_user_id;
DROP TABLE IF EXISTS public.activity_feed;
