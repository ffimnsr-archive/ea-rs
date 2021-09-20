-- # Put the your SQL below migration seperator.
-- !UP
DO $$
BEGIN
    CREATE ROLE ea WITH PASSWORD 'postgres';
    EXCEPTION WHEN DUPLICATE_OBJECT THEN
    RAISE NOTICE 'Not creating role ea -- it already exists';
END
$$;

CREATE EXTENSION IF NOT EXISTS dblink;

-- !DOWN
DROP EXTENSION IF EXISTS dblink;
DROP USER ea;
