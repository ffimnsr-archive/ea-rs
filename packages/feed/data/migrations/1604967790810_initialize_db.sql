-- # Put the your SQL below migration seperator.
-- !UP
CREATE SCHEMA IF NOT EXISTS public;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION public.set_update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- !DOWN
DROP FUNCTION IF EXISTS public.set_update_timestamp;
DROP EXTENSION IF EXISTS "uuid-ossp";
DROP SCHEMA IF EXISTS public CASCADE;
