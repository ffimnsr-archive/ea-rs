-- # Put the your SQL below migration seperator.
-- !UP
DO $$
BEGIN
    PERFORM dblink_exec('', 'CREATE DATABASE ea_project WITH OWNER = ea');
    EXCEPTION WHEN DUPLICATE_DATABASE THEN
    RAISE NOTICE 'Not creating database ea_project -- it already exists';
END
$$;

-- !DOWN
DROP DATABASE IF EXISTS ea_project;
