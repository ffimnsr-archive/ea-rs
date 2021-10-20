-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.talent_pool (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_talent_pool_user_id ON public.talent_pool (user_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.talent_pool
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.talent_pool;
DROP INDEX IF EXISTS ix_talent_pool_user_id;
DROP TABLE IF EXISTS public.talent_pool;
