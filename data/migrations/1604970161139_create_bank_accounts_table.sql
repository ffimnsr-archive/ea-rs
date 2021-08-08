-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.bank_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  account_name VARCHAR (100) NOT NULL,
  account_no VARCHAR (60) NOT NULL,
  bank_address TEXT NULL,
  bank_branch VARCHAR (45) NULL,
  bank_name VARCHAR (60) NULL,
  bank_swift_code VARCHAR (60) NULL,
  bank_routing_number VARCHAR (45) NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT bank_accounts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX bank_accounts_index ON public.bank_accounts (user_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.bank_accounts
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.bank_accounts;
DROP INDEX IF EXISTS bank_accounts_index;
DROP TABLE IF EXISTS public.bank_accounts;
