-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS priv.audit_trail_logs (
  event_id SERIAL PRIMARY KEY,
  event_type VARCHAR (40) NOT NULL,
  object_name VARCHAR (100) NOT NULL,
  object_id TEXT NULL DEFAULT NULL,
  user_id UUID NULL DEFAULT NULL,
  old_data TEXT NULL DEFAULT NULL,
  new_data TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- !DOWN
DROP TABLE IF EXISTS priv.audit_trail_logs;
DROP SCHEMA IF EXISTS priv CASCADE;
