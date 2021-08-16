-- # Put the your SQL below migration seperator.
-- !UP
CREATE DATABASE ea_address
WITH
    ENCODING = 'UTF8'
    OWNER = ea
    CONNECTION_LIMIT = 120;

-- !DOWN
DROP DATABASE IF EXISTS ea_address;
