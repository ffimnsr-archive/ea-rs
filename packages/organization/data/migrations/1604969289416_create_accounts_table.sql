-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  global_id UUID UNIQUE NOT NULL,
  public_code VARCHAR (30) UNIQUE NOT NULL,
  username VARCHAR(60) UNIQUE NOT NULL,
  avatar TEXT NOT NULL,
  email VARCHAR(90) UNIQUE NOT NULL,
  given_name VARCHAR(50) NULL,
  family_name VARCHAR(50) NULL,
  email_verified BOOL NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.accounts
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.accounts;
DROP TABLE IF EXISTS public.accounts;
