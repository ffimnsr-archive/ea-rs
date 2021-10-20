-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.site_preference (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  is_opt_in_marketing BOOL NOT NULL DEFAULT false,
  is_opt_in_usage_statistics BOOL NOT NULL DEFAULT false,
  is_opt_in_experimental BOOL NOT NULL DEFAULT false,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_site_preference_user_id ON public.site_preference (user_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.site_preference
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.site_preference;
DROP INDEX IF EXISTS ix_site_preference_user_id;
DROP TABLE IF EXISTS public.site_preference;
