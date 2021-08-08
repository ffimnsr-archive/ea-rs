-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.withdrawal_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,
  amount DECIMAL NULL DEFAULT NULL,
  reference_no VARCHAR (60) NULL DEFAULT NULL,
  remarks TEXT NULL DEFAULT NULL,
  approved_by_id UUID NULL,
  approved_at TIMESTAMPTZ NULL DEFAULT NULL,
  status SMALLINT NULL DEFAULT NULL,
  is_deleted BOOL NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT withdrawal_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL,
  CONSTRAINT withdrawal_requests_approved_by_id_fkey FOREIGN KEY (approved_by_id) REFERENCES public.user_clues (id) ON UPDATE NO ACTION ON DELETE SET NULL
);

CREATE INDEX withdrawal_requests_index ON public.withdrawal_requests (user_id, approved_by_id);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.withdrawal_requests
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- !DOWN
DROP TRIGGER IF EXISTS set_timestamp ON public.withdrawal_requests;
DROP INDEX IF EXISTS withdrawal_requests_index;
DROP TABLE IF EXISTS public.withdrawal_requests;
