-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.withdrawal_request (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  amount NUMERIC (19, 4) NULL DEFAULT NULL,
  reference_no VARCHAR (60) NULL DEFAULT NULL,
  remarks TEXT NULL DEFAULT NULL,
  approved_by_id UUID NULL,
  approved_at TIMESTAMPTZ NULL DEFAULT NULL,
  status SMALLINT NULL DEFAULT NULL,
  is_deleted BOOL NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_withdrawal_request_user_id_approved_by_id ON public.withdrawal_request (user_id, approved_by_id);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.withdrawal_request
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.withdrawal_request;
DROP INDEX IF EXISTS ix_withdrawal_request_user_id_approved_by_id;
DROP TABLE IF EXISTS public.withdrawal_request;
