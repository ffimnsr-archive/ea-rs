-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.bank_account (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  account_name VARCHAR (100) NOT NULL,
  account_no VARCHAR (60) NOT NULL,
  bank_address TEXT NULL,
  bank_branch VARCHAR (45) NULL,
  bank_name VARCHAR (60) NULL,
  bank_swift_code VARCHAR (60) NULL,
  bank_routing_number VARCHAR (45) NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_bank_account_user_id ON public.bank_account (user_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.bank_account
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.bank_account;
DROP INDEX IF EXISTS ix_bank_account_user_id;
DROP TABLE IF EXISTS public.bank_account;
