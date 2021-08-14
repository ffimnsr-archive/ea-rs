-- # Put the your SQL below migration seperator.
-- !UP
CREATE TABLE IF NOT EXISTS public.account (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    global_id UUID UNIQUE NOT NULL,
    public_code VARCHAR (30) UNIQUE NOT NULL,
    username VARCHAR(60) UNIQUE NOT NULL,
    avatar TEXT NOT NULL,
    given_name VARCHAR(50) NULL,
    family_name VARCHAR(50) NULL,
    middle_name VARCHAR(50) NULL,
    email VARCHAR(90) UNIQUE NOT NULL,
    email_verified BOOL NOT NULL DEFAULT false,
    is_deleted BOOL NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trigger_set_update_timestamp
BEFORE UPDATE ON public.account
FOR EACH ROW
EXECUTE PROCEDURE public.set_update_timestamp();

CREATE INDEX ix_account_created_at
ON public.account USING btree (created_at ASC NULLS LAST);

CREATE INDEX ix_account_id_created_at
ON public.account USING btree (id ASC NULLS LAST, created_at ASC NULLS LAST);

-- !DOWN
DROP INDEX ix_account_id_created_at;
DROP INDEX ix_account_created_at;
DROP TRIGGER IF EXISTS trigger_set_update_timestamp ON public.account;
DROP TABLE IF EXISTS public.account;
