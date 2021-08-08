-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.site_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  is_opt_in_marketing BOOL NULL,
  is_opt_in_usage_statistics BOOL NULL,
  is_opt_in_experimental BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT site_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX site_preferences_index ON public.site_preferences (user_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.site_preferences
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.site_preferences;
DROP INDEX IF EXISTS site_preferences_index;
DROP TABLE IF EXISTS public.site_preferences;
