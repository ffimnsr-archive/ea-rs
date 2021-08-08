-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.activity_feeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  description TEXT NULL DEFAULT NULL,
  activity_type SMALLINT NULL DEFAULT NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT activity_feeds_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX activity_feeds_index ON public.activity_feeds (user_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.activity_feeds
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.activity_feeds;
DROP INDEX IF EXISTS activity_feeds_index;
DROP TABLE IF EXISTS public.activity_feeds;
