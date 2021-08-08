-- # Put the your SQL below migration seperator.
-- !UP
CREATE SCHEMA IF NOT EXISTS public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- !DOWN
DROP FUNCTION IF EXISTS public.trigger_set_timestamp;
DROP SCHEMA IF EXISTS public CASCADE;
DROP EXTENSION IF EXISTS "uuid-ossp";
